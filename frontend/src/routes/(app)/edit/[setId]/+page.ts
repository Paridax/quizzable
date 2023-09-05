import { pb } from '$lib/pocketbase.js';
import type { Card, PublicSet } from '$lib/types.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const set = await pb.collection('quizzables').getOne(params.setId, {
        expand: "studyItems"
    })
    .catch(e => {
        console.log(e);
        throw redirect(303, '/home');
    }) as PublicSet & { expand: { studyItems: Card[] } };

    if (set?.author !== pb.authStore.model?.id) {
        throw redirect(303, `/${params.setId}`);
    }

    if (set.draft === true) {
        throw redirect(303, `/create/${params.setId}`);
    }

    if (set.type === "quiz") {
        set.expand.studyItems.forEach((card) => {
            if (card.type === 'text') {
                card.text_answer = card.definitionA1.split(',');
            } else {
                card.text_answer = [];
            }
        });
    }

	return {
		setId: params.setId,
		set: set,
		cards: set.expand.studyItems.sort((a, b) => a.position - b.position),
		tags: set.tags.length > 0 ? set.tags.split(',') : [],
		synced: true
	};
};
