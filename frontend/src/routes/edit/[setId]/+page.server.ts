import { readForm } from '$lib/utils';
import type { Actions } from '@sveltejs/kit';

type ClientCard = {
    id: string;
    type: 'card' | 'single' | 'multi' | 'order' | 'text';
    term_or_question: string;
    definition_a1: string;
    a2: string;
    a3: string;
    a4: string;
    correct_answers: string[];
    text_answer: string[];
    shown_answers: number;
    time_seconds: string;
    new: boolean;
}

export const actions: Actions = {
	savecards: async ({ locals, request }) => {
		console.log('saving the set');

		const data = readForm(await request.formData()) as {
			set: {
				title: string;
				description: string;
				draft: boolean;
				visibility: 'public' | 'private' | 'unlisted';
				id: string;
			};
			cards: {
				id: string;
				term_or_question: string;
				definition_a1: string;
				position: number;
				new: true | undefined;
			}[];
			tags: string[];
			deletedCards: string[];
		};

		console.log('checking title');
		if (data.set.title.trim().length === 0) {
			return {
				type: 'error',
				message: 'Flashcards title cannot be empty.',
				status: 400
			};
		}

		if (data.cards.length < 3) {
			return {
				type: 'error',
				message: 'You don\'t have enough cards. You need at least 3.',
				status: 400
			};
		}

		// update the set
		const set = {
			title: data.set.title.trim(),
			description: data.set.description.trim(),
			visibility: data.set.visibility,
			tags: data.tags.join(',') // convert the array to a string
		};

		console.log('updating set');
		const updatedSet = await locals.pb
			.collection('quizzables')
			.update(data.set.id, set)
			.catch((e) => {
				console.log(e);
				return {
					type: 'error',
					message: 'There was a problem updating the set. ' + e.message,
					status: 500
				};
			});

		data.set = structuredClone(updatedSet);

		async function updateCard(card, index: number) {
			console.log(index, card.id);
			const cardData = {
				term_or_question: card.term_or_question,
				definition_a1: card.definition_a1,
				position: index
			};
			if (!card.term_or_question || !card.definition_a1) {
				throw {
					cardNum: index + 1,
					message: `Missing a term or definition.`
				};
			}

			if (card.new) {
				cardData['quizzable'] = data.set.id;
				cardData['type'] = 'card';
				const card = structuredClone(
					await locals.pb
						.collection('study_items')
						.create(cardData, { $autoCancel: false })
						.catch((e) => {
							throw {
								...e,
								message: e.message,
								cardNum: index + 1
							};
						})
				);

				data.cards[index] = card;
			} else {
				await locals.pb
					.collection('study_items')
					.update(card.id, cardData, { $autoCancel: false })
					.catch((e) => {
						throw {
							...e,
							message: e.message,
							cardNum: index + 1
						};
					});
			}
		}

		const cardPromises = data.cards.map((card, index) => updateCard(card, index));

		try {
			await Promise.all(cardPromises).catch((e) => {
				console.log(e);
				throw {
					type: 'error',
					message: `There was a problem updating a card (card #${e.cardNum}). ${e.message}`,
					status: 500
				};
			});
		} catch (e) {
			return e;
		}

		data.deletedCards.forEach((cardId) => {
			locals.pb
				.collection('study_items')
				.delete(cardId)
				.catch((e) => {
					console.log(e);
					return {
						type: 'error',
						message: 'There was a problem deleting a card. ' + e.message,
						status: 500
					};
				});
		});

		return {
			status: 200,
			setId: data.set.id,
			set: data.set,
			tags: data.set.tags.length > 0 ? data.set.tags.split(',') : [],
			cards: data.cards
		};
	},

	savequiz: async ({ locals, request }) => {
		console.log('saving the quiz');

		const data = readForm(await request.formData()) as {
			set: {
				title: string;
				description: string;
				draft: boolean;
				visibility: 'public' | 'private' | 'unlisted';
				id: string;
			};
			cards: ClientCard[];
			tags: string[];
			deletedCards: string[];
		};

		console.log('checking title');
		if (data.set.title.trim().length === 0) {
			return {
				type: 'error',
				message: 'Quiz title cannot be empty.',
				status: 400
			};
		}

        if (data.cards.length < 3) {
            return {
                type: 'error',
                message: "You don't have enough questions. You need at least 3.",
                status: 400
            };
        }

		// update the set
		const set = {
			title: data.set.title.trim(),
			description: data.set.description.trim(),
			visibility: data.set.visibility,
			tags: data.tags.join(',') // convert the array to a string
		};

		console.log('updating quiz');
        try {
            const updatedSet = await locals.pb
                .collection('quizzables')
                .update(data.set.id, set)
                .catch((e) => {
                    console.log(e);
                    throw {
                        type: 'error',
                        message: 'There was a problem updating the quiz. ' + e.message,
                        status: 500
                    };
                });

                data.set = structuredClone(updatedSet);
        } catch (e) {
            return e;
        }


		async function updateCard(card: ClientCard, index: number) {
			console.log(index, card.id);
			const cardData = {
				term_or_question: card.term_or_question,
				definition_a1: card.definition_a1.trim(),
				a2: card.a2.trim(),
				a3: card.a3.trim(),
				a4: card.a4.trim(),
				position: index,
				type: card.type,
				time_seconds: Number(card.time_seconds),
				correct_answers: card.correct_answers,
				shown_answers: card.shown_answers
			};

			if (cardData.shown_answers < 2 || cardData.shown_answers > 4) {
				throw {
					cardNum: index + 1,
					message: 'Invalid number of shown answers.'
				};
			}

			if (
				!cardData.term_or_question ||
				!cardData.definition_a1 ||
				(card.type !== "text" && !cardData.a2) ||
				(card.shown_answers >= 3 && !cardData.a3) ||
				(card.shown_answers >= 4 && !cardData.a4)
			) {
				throw {
					cardNum: index + 1,
					message: `Missing required fields.`
				};
			}

			if (card.new) {
				cardData['quizzable'] = data.set.id;
				if (cardData.type === 'card') {
					throw {
						cardNum: index + 1,
						message: 'Invalid question type.'
					};
				}

				const card = structuredClone(
					await locals.pb
						.collection('study_items')
						.create(cardData, { $autoCancel: false })
						.catch((e) => {
							throw {
								...e,
								message: e.message,
								cardNum: index + 1
							};
						})
				);

				data.cards[index] = card;
			} else {
				await locals.pb
					.collection('study_items')
					.update(card.id, cardData, { $autoCancel: false })
					.catch((e) => {
						throw {
							...e,
							message: e.message,
							cardNum: index + 1
						};
					});
			}

			if (card.type === 'text') {
				card.text_answer = card.definition_a1.trim() ? card.definition_a1.split(',') : [];
			}
		}

		const cardPromises = data.cards.map((card, index) => updateCard(card, index));

		try {
			await Promise.all(cardPromises).catch((e) => {
				console.log(e);
				throw {
					type: 'error',
					message: `There was a problem updating a question (question #${e.cardNum}). ${e.message}`,
					status: 500
				};
			});
		} catch (e) {
			return e;
		}

		data.deletedCards.forEach((cardId) => {
			locals.pb
				.collection('study_items')
				.delete(cardId)
				.catch((e) => {
					console.log(e);
					return {
						type: 'error',
						message: 'There was a problem deleting a question. ' + e.message,
						status: 500
					};
				});
		});

		return {
			status: 200,
			setId: data.set.id,
			set: data.set,
			tags: data.set.tags ? data.set.tags.split(',') : [],
			cards: data.cards
		};
	}
} satisfies Actions;
