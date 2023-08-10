<script lang="ts">
	import NumberInput from './NumberInput.svelte';
	import { sendToServer } from '$lib/utils';
    import { toastStore, InputChip } from '@skeletonlabs/skeleton';
	import Loading from './Loading.svelte';
	import { goto } from '$app/navigation';
	import EditQuizQuestion from './EditQuizQuestion.svelte';
	import { onMount } from 'svelte';

    export let data: {
        setId: string;
        set: {
            title: string;
            visibility: string;
            description: string;
            draft: boolean;
        };
        cards: {
            id: string;
            type: "card" | "single" | "multi" | "order" | "text";
            term_or_question: string;
            definition_a1: string;
            a2: string;
            a3: string;
            a4: string;
            correct_answers: string[];
            shown_answers: number;
            time_seconds: string;
            new: boolean;
        }[];
        tags: string[];
        syncedWithServer: boolean;
        synced: boolean;
    };

    export let saving = false;
    export let syncCount = 2;
    export let syncedWithServer = true;
    export let deletedCards: string[] = [];

    onMount(() => {
        // loop through all the cards and set the correct_answers to itself (to refresh the children)
        data.cards.forEach((card) => {
            console.log(card.id);
            card.correct_answers = [...card.correct_answers];
        });
    });


    let question = {
        term_or_question: "",
        definition_a1: "",
        a2: "",
        a3: "",
        a4: "",
        time_seconds: "30",
        type: "single",
        text_answer: [],
        shown_answers: 2,
        correct_answers: ["1"],
    }

    $: console.log(question);

    const deleteCard = (index: number) => {
        if (!data.cards[index].new) {
            deletedCards.push(data.cards[index].id);
        }
        console.log(index);
        data.cards.splice(index, 1);
        data.cards = [...data.cards];
        syncedWithServer = false;
    }
</script>

<div class="flex flex-col gap-10 mt-10">
    {#each data.cards as card, cardNum}
        <div class="card card w-full p-5 group">
            <div class="flex justify-between mb-5 items-center">
                <h3 class="h3 font-bold">Question {cardNum + 1}</h3>
                <div class="opacity-0  justify-between gap-2.5 flex group-hover:opacity-100">
                    <button class="btn variant-filled-secondary w-[2.625rem] h-[2.625rem]" on:click|preventDefault={() => {
                        console.log("move up");
                        if (cardNum != 0) {
                            data.cards.splice(cardNum - 1, 0, data.cards.splice(cardNum, 1)[0]);
                        }

                        data.cards = [...data.cards];
                        syncedWithServer = false;
                    }} disabled={cardNum == 0}>
                        <span class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>
                        </span>
                    </button>
                    <button class="btn variant-filled-secondary w-[2.625rem] h-[2.625rem]" on:click|preventDefault={() => {
                        console.log("move down");
                        if (cardNum != data.cards.length - 1) {
                            data.cards.splice(cardNum + 1, 0, data.cards.splice(cardNum, 1)[0]);
                        }

                        data.cards = [...data.cards];
                        syncedWithServer = false;
                    }} disabled={cardNum == data.cards.length - 1}>
                        <span class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </span>
                    </button>
                    <button class="btn variant-soft-error w-[2.625rem] h-[2.625rem]" on:click|preventDefault={() => {
                        deleteCard(cardNum);
                    }}>
                        <span class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
            <EditQuizQuestion bind:card={card} />
        </div>
    {:else}
        <div class="w-full h-24 flex items-center justify-center">
            <h1 class="font-semibold text-surface-500-400-token">There are no questions in this quiz...</h1>
        </div>
    {/each}
    <form>
        <div class="card card variant-ringed-primary bg-surface-0-1000-token w-full p-5">
            <div class="flex justify-between mb-5 items-center">
                <h3 class="h3 font-bold">Create a New Question</h3>
                <div class="flex justify-between gap-5">
                <button class="btn variant-soft-primary" on:click|preventDefault={() => {
                    console.log("new card");
                    if (!question["term_or_question"].trim().length) {
                        toastStore.trigger({ message: 'Please fill out all required fields.', background: 'variant-filled-error' });
                        return;
                    }

                    if (question.type === "single" || question.type === "multi" || question.type === "order") {
                        if (!question["definition_a1"].trim().length || !question["a2"].trim().length) {
                            toastStore.trigger({ message: 'Please fill out all required fields.', background: 'variant-filled-error' });
                            return;
                        }

                        if (question.shown_answers > 2 && !question["a3"].trim().length) {
                            toastStore.trigger({ message: 'Please fill out all required fields.', background: 'variant-filled-error' });
                            return;
                        }

                        if (question.shown_answers > 3 && !question["a4"].trim().length) {
                            toastStore.trigger({ message: 'Please fill out all required fields.', background: 'variant-filled-error' });
                            return;
                        }
                    }

                    if (question.type === "text") {
                        if (!question["text_answer"].length) {
                            toastStore.trigger({ message: 'Please fill out all required fields.', background: 'variant-filled-error' });
                            return;
                        }
                    }

                    const newCard = {
                        "id": Math.round(Math.random() * 1000000),
                        "term_or_question": question["term_or_question"].trim(),
                        "definition_a1": question["definition_a1"].trim(),
                        "a2": question["a2"].trim(),
                        "a3": question["a3"].trim(),
                        "a4": question["a4"].trim(),
                        "time_seconds": question["time_seconds"],
                        "type": question["type"],
                        "text_answer": question["text_answer"],
                        "shown_answers": question["shown_answers"],
                        "correct_answers": question["correct_answers"],
                        "new": true
                    };

                    question = {
                        term_or_question: "",
                        definition_a1: "",
                        a2: "",
                        a3: "",
                        a4: "",
                        time_seconds: question.time_seconds,
                        type: question.type,
                        text_answer: [],
                        shown_answers: 2,
                        correct_answers: ["1"],
                    };

                    data.cards = [
                        ...data.cards,
                        newCard
                    ];
                    syncedWithServer = false;

                    // focus on "new-card-q" input
                    document.getElementById("new-card-q")?.focus();

                    // scroll to bottom of page after 1 frame, because the DOM hasn't updated yet
                    setTimeout(() => {
                        window.scrollTo(0, document.body.scrollHeight);
                    }, 0);
                }}>Create Question</button>
                </div>
            </div>
            <EditQuizQuestion card={question} />
        </div>
    </form>
</div>