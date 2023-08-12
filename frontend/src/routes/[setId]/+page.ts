import { pb } from '$lib/pocketbase.js';
import type { Card, PublicSet, User } from '$lib/types.js';
import { redirect, error } from '@sveltejs/kit';

export const load = async ({ params,  }) => {
    const set = (await pb
			.collection('public_quizzables')
			.getOne(params.setId)
			.catch((e) => {
				console.log(e);
				throw error(404, 'Page not found');
			})) as PublicSet;

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
        }) as Card[];

    const author = await pb.collection('public_users').getOne(typeof set.author === 'string' ? set.author : set.author.id)
    .catch(e => {
        console.log(e);
        return {
            id: '0',
            displayName: 'Deleted User',
            username: 'null',
            avatar: '',
            bio: '',
        } as User;
    }) as User;

    if (set.type === "quiz") {
        cards.forEach(card => {
            if (card.type === "text") {
                card.text_answer = card.definition_a1.split(',');
            } else {
                card.text_answer = [];
            }
        });
    }

    const userLikesThis = pb.authStore.model ? await pb.collection('likes').getFirstListItem(`user = "${pb.authStore.model.id}" && quizzable = "${params.setId}"`)
    .then(() => true)
    .catch(() => false)
    : false;

    if (pb.authStore.model) {
        const dateCutoff = new Date();
        const dateCutoffString = `${dateCutoff.getFullYear()}-${(dateCutoff.getMonth() + 1)
					.toString()
					.padStart(2, '0')}-${(dateCutoff.getDate()).toString().padStart(2, '0')}`;
        console.log(`user = "${pb.authStore.model.id}" && quizzable = "${params.setId} && created > "${dateCutoffString}"`);
        await pb.collection('quizzable_views').getFirstListItem(`user = "${pb.authStore.model.id}" && quizzable = "${params.setId}" && created > "${dateCutoffString}"`)
        .catch(() => {
            pb.collection('quizzable_views')
            .create({
                user: pb.authStore.model?.id,
                quizzable: params.setId
            })
            .then(() => (set.views += 1))
            .catch((e) => console.log(e));
            return false;
        });
    }

	return {
		setId: params.setId,
		set: {
			...set,
			author
		},
		cards: cards.sort((a, b) => a.position - b.position),
		userLikesThis: userLikesThis
	};
};
