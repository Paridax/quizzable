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

    let saving = false;
    let syncCount = 2;
    let syncedWithServer = true;

    $: { data; notSynced(); console.log("data changed"); }

    function notSynced() {
        // Wait for the initial data changes to be done
        if (syncCount > 0) {
            syncCount--;
            return;
        }
        syncedWithServer = false;
    }

    onMount(() => {
        // loop through all the cards and set the correct_answers to itself (to refresh the children)
        data.cards.forEach((card) => {
            console.log(card.id);
            card.correct_answers = [...card.correct_answers];
        });
    });

    const deletedCards: string[] = [];

    let card = {
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

    $: console.log(card);

    const deleteCard = (index: number) => {
        if (!data.cards[index].new) {
            deletedCards.push(data.cards[index].id);
        }
        console.log(index);
        data.cards.splice(index, 1);
        data.cards = [...data.cards];
        syncedWithServer = false;
    }

    async function handleSave() {
        saving = true;
        console.log("saving...");

        const response = await sendToServer("?/savequiz", {
            set: data.set,
            cards: data.cards,
            tags: data.tags,
            deletedCards: deletedCards,
            message: "hello!",
            numberobject: 123
        });
        console.log(response);
        if (response.type !== "success") {
            console.log()
            toastStore.trigger({
                message: response.body?.message,
                background: "variant-filled-error",
                timeout: 5000
            });

            saving = false;
            return;
        }
        toastStore.trigger({
            message: "Saved your quiz draft!",
            background: "variant-filled-success",
            timeout: 5000
        });
        syncCount = 2;
        data.cards = response.body.cards;
        data.set = response.body.set;
        data.tags = response.body.tags;
        console.log(response);
        syncedWithServer = true;
        saving = false;
    }

    async function handlePublish() {
        console.log("publishing...");

        if (!syncedWithServer) {
            await handleSave();
        }

        const response = await sendToServer("?/publish", {
            set: data.set,
            setId: data.setId,
            draft: data.set.draft,
            cards: data.cards,
        });

        if (response.type !== "success") {
            toastStore.trigger({
                message: response.body?.message,
                background: "variant-filled-error",
                timeout: 5000
            });
            return;
        }

        toastStore.trigger({
            message: "Published your flashcards!",
            background: "variant-filled-success",
            timeout: 5000
        });

        goto(`/${data.setId}`);
    }
</script>

<div class="xl:px-72">
    <div class="flex items-center justify-between">
        <h3 class="h3 font-bold">Create a Quiz</h3>
        <div class="flex items-center justify-center gap-5">
            <h1>
                {#if syncedWithServer}
                    Saved
                {:else}
                    Save now
                {/if}
            </h1>
            <button on:click|preventDefault={handleSave} disabled={syncedWithServer} class="btn variant-filled-secondary">
            {#if saving}
                <Loading />
            {:else}
                Save
            {/if}
            </button>
            <button on:click|preventDefault={handlePublish} class="btn variant-filled-primary">Publish</button>
        </div>
    </div>
    <div class="my-5 grid grid-cols-3 gap-5">
        <!-- TITLE -->
        <label class="label col-span-2">
            <span class="text-surface-600-300-token">Title<span class="text-error-500-400-token">*</span></span>
            <input type="text" bind:value={data.set["title"]} name="title" placeholder="Title" class="input" />
        </label>
        <label class="label col-span-1">
            <span class="text-surface-600-300-token">Visibility<span class="text-error-500-400-token">*</span></span>
            <select class="select" bind:value={data.set["visibility"]}>
                <option value="public">Public</option>
                <option value="unlisted">Unlisted</option>
                <option value="private">Private</option>
            </select>
        </label>
        <label class="label col-span-2">
            <span class="text-surface-600-300-token">Description</span>
            <textarea class="select w-full" placeholder="Enter a short description of your flashcards..." rows={2} bind:value={data.set["description"]} />
        </label>
        <label class="label col-span-1">
            <span class="text-surface-600-300-token">Tags</span>
            <InputChip bind:value={data["tags"]} validation={(text) => {
                console.log(text);
                // regex only allow alphanumeric characters
                return /^[a-zA-Z0-9]+$/.test(text);
            }} name="chips" placeholder="Press enter to submit a word..." max={10} maxlength={15} on:invalid={(error) => {
                console.log(error);
            }} />
        </label>
    </div>
    <hr class="my-10" />
    <div class="flex flex-col gap-10">
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
                        if (!card["term_or_question"].trim().length) {
                            toastStore.trigger({ message: 'Please fill out all required fields.', background: 'variant-filled-error' });
                            return;
                        }

                        if (card.type === "single" || card.type === "multi" || card.type === "order") {
                            if (!card["definition_a1"].trim().length || !card["a2"].trim().length) {
                                toastStore.trigger({ message: 'Please fill out all required fields.', background: 'variant-filled-error' });
                                return;
                            }

                            if (card.shown_answers > 2 && !card["a3"].trim().length) {
                                toastStore.trigger({ message: 'Please fill out all required fields.', background: 'variant-filled-error' });
                                return;
                            }

                            if (card.shown_answers > 3 && !card["a4"].trim().length) {
                                toastStore.trigger({ message: 'Please fill out all required fields.', background: 'variant-filled-error' });
                                return;
                            }
                        }

                        if (card.type === "text") {
                            if (!card["text_answer"].length) {
                                toastStore.trigger({ message: 'Please fill out all required fields.', background: 'variant-filled-error' });
                                return;
                            }
                        }

                        const newCard = {
                            "id": Math.round(Math.random() * 1000000),
                            "term_or_question": card["term_or_question"].trim(),
                            "definition_a1": card["definition_a1"].trim(),
                            "a2": card["a2"].trim(),
                            "a3": card["a3"].trim(),
                            "a4": card["a4"].trim(),
                            "time_seconds": card["time_seconds"],
                            "type": card["type"],
                            "text_answer": card["text_answer"],
                            "shown_answers": card["shown_answers"],
                            "correct_answers": card["correct_answers"],
                            "new": true
                        };

                        card = {
                            term_or_question: "",
                            definition_a1: "",
                            a2: "",
                            a3: "",
                            a4: "",
                            time_seconds: card.time_seconds,
                            type: card.type,
                            text_answer: [],
                            shown_answers: 2,
                            correct_answers: [1],
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
                        }, 1);
                    }}>Create Question</button>
                    </div>
                </div>
                <EditQuizQuestion card={card} />
            </div>
        </form>
    </div>
</div>