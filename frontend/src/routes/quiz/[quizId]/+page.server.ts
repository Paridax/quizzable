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
	userleft: async ({ locals, request }) => {
        console.log("userleft");
        const data = readForm(await request.formData()) as {
            id: string;
        }

        pb.collection('soloQuizzes').update(data.id, {
            userIsTaking: false
        });

        return;
	}
} satisfies Actions;
