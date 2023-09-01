import { pb } from '$lib/pocketbase';
import { readForm } from '$lib/utils';
import type { Actions } from '@sveltejs/kit';

type ClientCard = {
	id: string;
	type: 'card' | 'single' | 'multi' | 'order' | 'text';
	termOrQuestion: string;
	definitionA1: string;
	a2: string;
	a3: string;
	a4: string;
	correctAnswers: string[];
	text_answer: string[];
	shownAnswers: number;
	timeSeconds: string;
	new: boolean;
};

export const actions: Actions = {
	like: async ({ locals, request }) => {
		const data = readForm(await request.formData()) as {
			setId: string;
		};

		// check if user is logged in
		if (!locals.user)
			return {
				type: 'error',
				message: 'You must be logged in to like a set.',
				status: 401
			};

		// check if set exists
		const set = await pb
			.collection('publicQuizzables')
			.getOne(data.setId)
			.catch(() => null);

		if (!set)
			return {
				type: 'error',
				message: 'Set not found.',
				status: 404
			};

		const alreadyLiked = await pb
			.collection('likes')
			.getFirstListItem(`user = "${locals.user.id}" && quizzable = "${data.setId}"`)
			.catch(() => undefined);

		if (alreadyLiked) {
			await pb.collection('likes').delete(alreadyLiked.id);
			return {
				status: 200,
				message: 'Unliked',
				value: false,
				likes: set.likes - 1
			};
		}

		await pb.collection('likes').create({
			user: locals.user.id,
			quizzable: data.setId
		});

		return {
			status: 200,
			message: 'Liked',
			value: true,
			likes: set.likes + 1
		};
	}
} satisfies Actions;
