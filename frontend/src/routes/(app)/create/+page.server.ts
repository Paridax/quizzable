import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
    flashcards: async ({ locals }) => {
        console.log("test");
        if (!locals.user) {
            throw new Error("You must be logged in to create a flashcard set.");
        }

        // Create a new flashcards set and redirect the user to the create/setId page
        const data = {
            type: 'card',
            visibility: 'public',
            title: 'New Flashcards Set (Draft)',
            description: '',
            author: locals.user.id,
            draft: true,
            verified: false
        };


        const record = await locals.pb.collection('quizzables').create(data);

        throw redirect(303, `/create/${record.id}`);
    },

    quiz: async ({ locals }) => {
        if (!locals.user) {
            throw new Error('You must be logged in to create a quiz.');
        }

        // Create a new quiz and redirect the user to the create/setId page
        const data = {
            type: 'quiz',
            visibility: 'public',
            title: 'New Quiz (Draft)',
            description: '',
            author: locals.user.id,
            draft: true,
            verified: false
        };

        const record = await locals.pb.collection('quizzables').create(data);

        throw redirect(303, `/create/${record.id}`);
    }
};
