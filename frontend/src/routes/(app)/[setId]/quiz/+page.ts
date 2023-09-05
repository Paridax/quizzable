import { pb } from '$lib/pocketbase.js';
import type { Card, PublicSet, User } from '$lib/types.js';
import { redirect, error } from '@sveltejs/kit';

export const load = async ({ params }) => {
    if (!pb.authStore.model) {
        throw redirect(303, '/login');
    }

    const quizzable = (await pb
            .collection('publicQuizzables')
            .getOne(params.setId)
            .catch((e) => {
                console.log(e);
                throw error(404, 'Page not found');
            })) as PublicSet;

    if (quizzable.type === "card") {
        throw redirect(303, `/${params.setId}`);
    }

    const questions = await pb.collection('studyItems').getFullList(
        {
            filter: `quizzable = "${params.setId}" && type != "card"`, // Look for all non-cards if quiz
        }
    ).catch(e => {
        console.log(e);
        throw redirect(303, '/home');
    }) as Card[];

    const randomizeCardOrder = (cards: Card[]) => {
        const cardsCopy = [...cards];
        const randomizedCardIds = [];
        while (cardsCopy.length > 0) {
            const randomIndex = Math.floor(Math.random() * cardsCopy.length);
            randomizedCardIds.push(cardsCopy[randomIndex].id);
            cardsCopy.splice(randomIndex, 1);
        }
        return randomizedCardIds;
    };

    const randomizedCardIds = randomizeCardOrder(questions);

    const data = {
        quizzable: quizzable.id,
        user: pb.authStore.model.id,
        questions: randomizedCardIds,
        currentQuestion: 1,
        completedQuiz: false,
        completedQuestions: []
    };

    const soloQuiz = await pb.collection('soloQuizzes').create(data);

    throw redirect(303, `/quiz/${soloQuiz.id}`);
};
