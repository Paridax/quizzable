import { readForm } from '$lib/utils';
import type { Actions } from '@sveltejs/kit';

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
				message: 'Quizzable title cannot be empty.',
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

			if (card.new) {
				cardData['quizzable'] = data.set.id;
				cardData['type'] = 'card';
				const card = structuredClone(
					await locals.pb
						.collection('study_items')
						.create(cardData, { $autoCancel: false })
						.catch((e) => {
							console.log(e);
							return {
								type: 'error',
								message: 'There was a problem creating a card. ' + e.message,
								status: 500
							};
						})
				);

				data.cards[index] = card;
			} else {
				await locals.pb
					.collection('study_items')
					.update(card.id, cardData, { $autoCancel: false })
					.catch((e) => {
						console.log(e);
						return {
							type: 'error',
							message: 'There was a problem updating a card. ' + e.message,
							status: 500
						};
					});
			}
		}

		const cardPromises = data.cards.map((card, index) => updateCard(card, index));

		await Promise.all(cardPromises).catch((e) => {
			console.log(e);
			return {
				type: 'error',
				message: 'There was a problem updating a card. ' + e.message,
				status: 500
			};
		});

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

	publish: async ({ locals, request }) => {
		console.log('publishing the set');

		const data = readForm(await request.formData()) as {
			setId: string;
			draft: boolean;
		};

		console.log(data);

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
	}
} satisfies Actions;
