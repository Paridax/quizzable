import { pb } from '$lib/pocketbase.js';
import type { Set, SoloQuiz } from '$lib/types.js';
import { redirect, error } from '@sveltejs/kit';

export const load = async ({ params, }) => {
    if (!pb.authStore.model) {
        throw redirect(303, '/login');
    }

    const quiz = (await pb
            .collection('soloQuizzes')
            .getOne(params.quizId)
            .catch((e) => {
                console.log(e);
                throw error(404, 'Quiz not found');
            })) as SoloQuiz;

    if (pb.authStore.model.id !== quiz.user) {
        throw redirect(303, '/home');
    }

    if (quiz.completedQuiz) {
        throw redirect(303, `/quiz/${params.quizId}/results`);
    }

    if (typeof quiz.quizzable !== "string") {
        throw redirect(303, `/quiz/${params.quizId}/results`);
    }

    const quizzable = (await pb
            .collection('quizzables')
            .getOne(quiz.quizzable)
            .catch((e) => {
                console.log(e);
                throw error(404, 'Page not found');
            }
        )) as Set;

    const data = {
        quizzable: quizzable.id,
        user: pb.authStore.model.id,
        questions: quiz.questions,
        currentQuestion: quiz.currentQuestion,
        completedQuestions: quiz.completedQuestions
    };

    return {
        quiz: data,
        quizzable
    };
};
