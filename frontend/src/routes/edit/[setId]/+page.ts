import { pb } from '$lib/pocketbase.js';
import type { Card, PublicSet } from '$lib/types.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const set = await pb.collection('quizzables').getOne(params.setId, {
        expand: "study_items"
    })
    .catch(e => {
        console.log(e);
        throw redirect(303, '/home');
    }) as PublicSet & { expand: { study_items: Card[] } };

    if (set?.author !== pb.authStore.model?.id) {
        throw redirect(303, `/${params.setId}`);
    }

    if (set.draft === true) {
        throw redirect(303, `/create/${params.setId}`);
    }

    if (set.type === "quiz") {
        set.expand.study_items.forEach((card) => {
            if (card.type === 'text') {
                card.text_answer = card.definition_a1.split(',');
            } else {
                card.text_answer = [];
            }
        });
    }

	return {
		setId: params.setId,
		set: set,
		cards: set.expand.study_items.sort((a, b) => a.position - b.position),
		tags: set.tags.length > 0 ? set.tags.split(',') : [],
		synced: true
	};
};
