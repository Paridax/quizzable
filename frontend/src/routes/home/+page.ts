import { pb } from '$lib/pocketbase.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params,  }) => {
    if (!pb.authStore.model) {
        throw redirect(303, '/login');
    }

    const publishedSets = await pb.collection('publicQuizzables').getFullList({
            filter: `author = "${pb.authStore.model.id}" && draft = false`,
    });

    const draftSets = await pb.collection('publicQuizzables').getFullList({
			filter: `author = "${pb.authStore.model.id}" && draft = true`
		});

    return {
        publishedSets: publishedSets,
        draftSets: draftSets,
    };
};
