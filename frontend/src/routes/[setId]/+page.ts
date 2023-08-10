import { pb } from '$lib/pocketbase.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const set = await pb.collection('quizzables').getOne(params.setId)
    .catch(e => {
        console.log(e);
        throw redirect(303, '/home');
    });

    if (set.author === pb.authStore.model?.id && set.draft === true) {
        throw redirect(303, `/create/${params.setId}`);
    }

    const cards = await pb.collection('study_items').getFullList({
			filter: `quizzable = "${params.setId}" && type ${set.type === "quiz" ? "!" : ""}= "card"`, // Look for all non-cards if quiz
            sort: 'position'
		})
        .catch(e => {
            console.log(e);
            throw redirect(303, '/home');
        });

    if (set.type === "quiz") {
        cards.forEach(card => {
            if (card.type === "text") {
                card.text_answer = card.definition_a1.split(',');
            } else {
                card.text_answer = [];
            }
        });
    }

	return {
		setId: params.setId,
		set: set,
		cards: cards
	};
};