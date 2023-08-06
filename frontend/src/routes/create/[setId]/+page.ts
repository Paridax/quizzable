import { pb } from '$lib/pocketbase.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const set = await pb.collection('quizzables').getOne(params.setId)
    .catch(e => {
        console.log(e);
        throw redirect(303, '/home');
    });

    if (set?.author !== pb.authStore.model?.id) {
        throw redirect(303, `/q/${params.setId}`);
    }

    if (set.draft === false) {
        throw redirect(303, `/edit/${params.setId}`);
    }

    const cards = await pb.collection('study_items').getFullList({
			filter: `quizzable = "${params.setId}" && type = "card"`,
            sort: 'position'
		})
        .catch(e => {
            console.log(e);
            throw redirect(303, '/home');
        });

	return {
		setId: params.setId,
		set: set,
		cards: cards,
		tags: set.tags.length > 0 ? set.tags.split(',') : [],
		synced: true
	};
};
