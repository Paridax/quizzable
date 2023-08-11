import type { Record } from "pocketbase";

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
    term_or_question: string;
    definition_a1: string;
    a2: string;
    a3: string;
    a4: string;
    correct_answers: string[];
    shown_answers: number;
    time_seconds: string;
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
};

export type { User, Card, Set, PublicSet };