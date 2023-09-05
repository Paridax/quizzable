import type { Card, Set } from '$lib/types';
import { readForm } from '$lib/utils';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	savecards: async ({ locals, request }) => {
		console.log('saving the set');

		const data = readForm(await request.formData()) as {
			set: Set;
			cards: (Card & {
				new: true | undefined;
			})[];
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

		async function updateCard(card: Card, index: number) {
			console.log(index, card.id);
			const cardData = {
				termOrQuestion: card.termOrQuestion,
				definitionA1: card.definitionA1,
				position: index,
				quizzable: undefined as string | undefined,
				type: undefined as string | undefined
			};

			if (!card.termOrQuestion || !card.definitionA1) {
				throw {
					cardNum: index + 1,
					message: `Missing a term or definition.`
				};
			}

			if (card.new) {
				cardData.quizzable = data.set.id;
				cardData.type = 'card';
				const card = structuredClone(
					(await locals.pb
						.collection('studyItems')
						.create(cardData, { $autoCancel: false })
						.catch((e) => {
							throw {
								...e,
								message: e.message,
								cardNum: index + 1
							};
						})) as Card & { new: true | undefined }
				);

				data.cards[index] = card;
			} else {
				await locals.pb
					.collection('studyItems')
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
					message: `There was a problem updating a card (Card #${e.cardNum}). ${e.message}`,
					status: 500
				};
			});
		} catch (e) {
			return e;
		}

		data.deletedCards.forEach((cardId) => {
			locals.pb
				.collection('studyItems')
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

		// update the set
		const set = {
			title: data.set.title.trim(),
			description: data.set.description.trim(),
			visibility: data.set.visibility,
			tags: data.tags.join(','), // convert the array to a string
			studyItems: data.cards.map((card) => card.id)
		};

		console.log('updating set');
		const updatedSet = (await locals.pb
			.collection('quizzables')
			.update(data.set.id, set)
			.catch((e) => {
				console.log(e);
				return {
					type: 'error',
					message: 'There was a problem updating the set. ' + e.message,
					status: 500
				};
			})) as Set;

		data.set = structuredClone(updatedSet);

		return {
			status: 200,
			setId: data.set.id,
			set: data.set,
			tags: data.set.tags.length > 0 ? data.set.tags.split(',') : [],
			cards: data.cards
		};
	},

	savequiz: async ({ locals, request }) => {
		const data = readForm(await request.formData()) as {
			set: Set;
			cards: Card[];
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

		async function updateCard(card: Card, index: number) {
			console.log(index, card.id);
			const cardData = {
				termOrQuestion: card.termOrQuestion,
				definitionA1: card.definitionA1.trim(),
				a2: card.a2.trim(),
				a3: card.a3.trim(),
				a4: card.a4.trim(),
				position: index,
				type: card.type,
				timeSeconds: Number(card.timeSeconds),
				correctAnswers: card.correctAnswers,
				shownAnswers: card.shownAnswers,
				quizzable: undefined as string | undefined
			};

			if (cardData.shownAnswers < 2 || cardData.shownAnswers > 4) {
				throw {
					cardNum: index + 1,
					message: 'Invalid number of shown answers.'
				};
			}

			if (
				!cardData.termOrQuestion ||
				!cardData.definitionA1 ||
				(card.type !== 'text' && !cardData.a2) ||
				(card.shownAnswers >= 3 && !cardData.a3) ||
				(card.shownAnswers >= 4 && !cardData.a4)
			) {
				throw {
					cardNum: index + 1,
					message: `Missing required fields.`
				};
			}

			if (card.new) {
				cardData.quizzable = data.set.id;
				if (cardData.type === 'card') {
					throw {
						cardNum: index + 1,
						message: 'Invalid question type.'
					};
				}

				const card = structuredClone(
					(await locals.pb
						.collection('studyItems')
						.create(cardData, { $autoCancel: false })
						.catch((e) => {
							throw {
								...e,
								message: e.message,
								cardNum: index + 1
							};
						})) as Card
				);

				data.cards[index] = card;
			} else {
				await locals.pb
					.collection('studyItems')
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
				card.text_answer = card.definitionA1.trim() ? card.definitionA1.split(',') : [];
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
				.collection('studyItems')
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

		// update the set
		const set = {
			title: data.set.title.trim(),
			description: data.set.description.trim(),
			visibility: data.set.visibility,
			tags: data.tags.join(','), // convert the array to a string
			studyItems: data.cards.map((card) => card.id)
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

			data.set = structuredClone(updatedSet) as Set;
		} catch (e) {
			return e;
		}

		return {
			status: 200,
			setId: data.set.id,
			set: data.set,
			tags: data.set.tags ? data.set.tags.split(',') : [],
			cards: data.cards
		};
	},

	publish: async ({ locals, request }) => {
		console.log('publishing the set');

		const data = readForm(await request.formData()) as {
			set: {
				id: string;
				title: string;
				description: string;
				visibility: string;
				tags: string[];
				type: 'quiz' | 'card';
			};
			setId: string;
			draft: boolean;
			cards: Card[];
		};

		console.log(data);

		if (data.cards.length < 3) {
			return {
				type: 'error',
				message: `You need at least 3 ${
					data.set.type === 'quiz' ? 'questions' : 'cards'
				} to publish a Quizzable.`,
				status: 400
			};
		}

		if (!data.draft) {
			return {
				type: 'error',
				message: 'This set is already published.',
				status: 400
			};
		}

		await locals.pb
			.collection('quizzables')
			.update(data.setId, {
				draft: false
			})
			.catch((e) => {
				console.log(e);
				return {
					type: 'error',
					message: 'There was a problem publishing the set. ' + e.message,
					status: 500
				};
			});

		return {
			status: 200,
			message: 'Published the set!'
		};
	},

	delete: async ({ locals, request }) => {
		const data = readForm(await request.formData()) as {
			setId: string;
		};

		return await locals.pb
			.collection('quizzables')
			.delete(data.setId)
			.then(() => {
				return {
					status: 200,
					message: 'Deleted the Quizzable!'
				};
			})
			.catch((e) => {
				console.log(e);
				return {
					type: 'error',
					message: 'There was a problem deleting the set. ' + e.message,
					status: 500
				};
			});
	}
} satisfies Actions;
