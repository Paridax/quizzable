import type { Record } from 'pocketbase';

interface User extends Record {
	id: string;
	displayName: string;
	username: string;
	avatar: string;
	bio: string;
	created_at: string;
	updated_at: string;
	verifiedCreator: boolean;
}

interface Card extends Record {
	id: string;
	type: 'card' | 'single' | 'multi' | 'order' | 'text';
	termOrQuestion: string;
	definitionA1: string;
	a2: string;
	a3: string;
	a4: string;
	correctAnswers: string[];
	shownAnswers: number;
	timeSeconds: number;
	new: boolean;
}

interface Set extends Record {
	id: string;
	title: string;
	author: User | string;
	description: string;
	draft: boolean;
	visibility: string;
	type: 'quiz' | 'card';
}

interface PublicSet extends Set {
	views: number;
	likes: number;
}

interface SoloQuiz extends Record {
	quizzable: string | Set;
	user: string | User;
	questions: string[];
	currentQuestion: number;
	completedQuiz: boolean;
	completedQuestions: string[];
	userIsTaking: boolean;
}

interface QuizQuestion extends Record {
	id: string;
	type: 'card' | 'single' | 'multi' | 'order' | 'text';
	termOrQuestion: string;
	definitionA1: string;
	a2: string;
	a3: string;
	a4: string;
	shownAnswers: number;
	timeSeconds: number;
	created: string;
}

export type { User, Card, Set, PublicSet, SoloQuiz, QuizQuestion };
