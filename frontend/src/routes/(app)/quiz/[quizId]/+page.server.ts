import { pb } from '$lib/pocketbase';
import type { Card, QuizQuestion, SoloQuiz } from '$lib/types';
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
	getquestion: async (request) => {
		// Get the quizId from the URL
		const quizId = request.params.quizId;

		if (!quizId) return { status: 400, message: 'No quizId provided' };

		const quiz = (await pb
			.collection('soloQuizzes')
			.getOne(quizId)
			.catch((err) => {
				console.log(err);
				return null;
			})) as SoloQuiz;

		if (!quiz) return { status: 404, message: 'Quiz not found' };

		if (pb.authStore.model?.id !== quiz.user) {
			return { status: 403, message: 'Unauthorized' };
		}

		// check if the number of completed questions matches the current question
		if (quiz.completedQuestions.length === quiz.currentQuestion) {
			// there is an ongoing question
			// check if the question time is already up
			const question = (await pb
				.collection('quizQuestion')
				.getOne(quiz.completedQuestions[quiz.currentQuestion - 1], {
					expand: 'studyItem'
				})) as QuizQuestion & {
				expand: { studyItem: Card };
			};

			if (question.answered === true) {
				quiz.currentQuestion++;
			} else {
				const questionStartTime = new Date(question.created).getTime();
				const questionTimeToAnswer = question.expand.studyItem.timeSeconds;

				const timeNow = new Date().getTime();

				if (timeNow - questionStartTime > questionTimeToAnswer * 1000) {
					// time is up
					question.answered = true;
					question.correct = false;
					question.answerTime = questionTimeToAnswer;
					await pb.collection('quizQuestion').update(question.id, question);
					quiz.currentQuestion++;
					// go onto the next part below
				} else {
					// time is not up
					return {
						status: 200,
						question: {
							id: question.id,
							type: question.expand.studyItem.type,
							termOrQuestion: question.expand.studyItem.termOrQuestion,
							definitionA1: question.expand.studyItem.definitionA1,
							a2: question.expand.studyItem.a2,
							a3: question.expand.studyItem.a3,
							a4: question.expand.studyItem.a4,
							shownAnswers: question.expand.studyItem.shownAnswers,
							timeSeconds: question.expand.studyItem.timeSeconds,
							created: question.created
						}
					};
				}
			}
		}

		if (quiz.currentQuestion >= quiz.questions.length) {
			// quiz is over
			quiz.completedQuiz = true;
			await pb.collection('soloQuizzes').update(quiz.id, quiz);
			return { status: 200, quizOver: true };
		}

		if (quiz.completedQuestions.length < quiz.currentQuestion) {
			// if this is less then we make a new question
			const newQuestion = (await pb.collection('quizQuestion').create(
				{
					user: quiz.user,
					quiz: quiz.id,
					studyItem: quiz.questions[quiz.currentQuestion],
					answered: false,
					correct: false
				},
				{ expand: 'studyItem' }
			)) as QuizQuestion & { expand: { studyItem: Card } };

			// add the new question to the quiz
			quiz.completedQuestions.push(newQuestion.id);

			console.log('working');
			await pb
				.collection('soloQuizzes')
				.update(quiz.id, quiz)
				.catch((err) => {
					console.log(err.response.data);
				});
			console.log('working_done');

			return {
				status: 200,
				question: {
					id: newQuestion.id,
					type: newQuestion.expand.studyItem.type,
					termOrQuestion: newQuestion.expand.studyItem.termOrQuestion,
					definitionA1: newQuestion.expand.studyItem.definitionA1,
					a2: newQuestion.expand.studyItem.a2,
					a3: newQuestion.expand.studyItem.a3,
					a4: newQuestion.expand.studyItem.a4,
					shownAnswers: newQuestion.expand.studyItem.shownAnswers,
					timeSeconds: newQuestion.expand.studyItem.timeSeconds,
					created: newQuestion.created
				}
			};
		}
	}
} satisfies Actions;
