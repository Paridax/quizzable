<script lang="ts">
	import { sendToServer } from '$lib/utils';
    import { toastStore, InputChip } from '@skeletonlabs/skeleton';
	import Loading from './Loading.svelte';
	import { goto } from '$app/navigation';

    export let data: {
        setId: string;
        set: {
            title: string;
            visibility: string;
            description: string;
            draft: boolean;
        };
        cards: object[];
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

    const deletedCards: string[] = [];
    const card = {
        term_or_question: "",
        definition_a1: "",
    }

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

        const response = await sendToServer("?/savecards", {
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
            message: "Saved your flashcards draft!",
            background: "variant-filled-success",
            timeout: 5000
        });
        syncCount = 1;
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
            draft: data.set.draft
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

        goto(`/q/${data.setId}`);
    }
</script>

<div class="xl:px-72">
    <div class="flex items-center justify-between">
        <h3 class="h3 font-bold">Create Flashcards</h3>
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
    <form class="my-5 grid grid-cols-3 gap-5">
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
            <span class="text-surface-600-300-token">Tags (a-z, 0-9)</span>
            <InputChip bind:value={data["tags"]} validation={(text) => {
                console.log(text);
                // regex only allow alphanumeric characters
                return /^[a-zA-Z0-9]+$/.test(text);
            }} name="chips" placeholder="Press enter to submit a tag..." max={10} maxlength={15} on:invalid={(error) => {
                console.log(error);
            }} />
        </label>
    </form>
    <hr class="mt-10" />
    <div class="flex items-right my-5">
        <button class="btn variant-soft-secondary ml-auto" disabled={data.cards.length === 0} on:click|preventDefault={() => {
            // loop through all cards and swap term and definition
            if (data.cards.length == 0) return;

            data.cards.forEach((card) => {
                const temp = card.term_or_question;
                card.term_or_question = card.definition_a1;
                card.definition_a1 = temp;
            });

            data.cards = [...data.cards];
        }}>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
            </span>
            <span>Swap Term & Definition</span>
        </button>
    </div>
    <div class="flex flex-col gap-10">
        {#each data.cards as card, cardNum}
            <form>
                <div class="card card w-full p-5 group">
                    <div class="flex justify-between mb-5 items-center">
                        <h3 class="h3 font-bold">{cardNum + 1}</h3>
                        <div class="flex justify-between gap-2.5 opacity-0 group-hover:opacity-100">
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
                    <div class="grid grid-cols-2 gap-5">
                        <label class="label col-span-1">
                            <span class="text-surface-600-300-token">Term<span class="text-error-500-400-token">*</span></span>
                            <input type="text" bind:value={card["term_or_question"]} name="question" placeholder="Question" class="input" />
                        </label>
                        <label class="label col-span-1">
                            <span class="text-surface-600-300-token">Definition<span class="text-error-500-400-token">*</span></span>
                            <input type="text" bind:value={card["definition_a1"]} name="answer" placeholder="Answer" class="input" />
                        </label>
                    </div>
                </div>
            </form>
        {:else}
            <div class="w-full h-24 flex items-center justify-center">
                <h1 class="font-semibold text-surface-500-400-token">There are no cards in this set...</h1>
            </div>
        {/each}
        <form>
            <div class="card card variant-ringed-primary bg-surface-0-1000-token w-full p-5">
                <div class="flex justify-between mb-5 items-center">
                    <h3 class="h3 font-bold">Create a New Card</h3>
                    <div class="flex justify-between gap-5">
                    <button class="btn variant-soft-primary" on:click|preventDefault={() => {
                        console.log("new card");
                        if (!card["term_or_question"].trim().length || !card["definition_a1"].trim().length) {
                            toastStore.trigger({ message: 'Please fill out all required fields.', background: 'variant-filled-error' });
                            return;
                        }

                        const newCard = {
                            "id": Math.round(Math.random() * 1000000),
                            "term_or_question": card["term_or_question"].trim(),
                            "definition_a1": card["definition_a1"].trim(),
                            "new": true
                        };

                        card["term_or_question"] = "";
                        card["definition_a1"] = "";

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
                    }}>Create Card</button>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-5">
                    <label class="label col-span-1">
                        <span class="text-surface-600-300-token">Term<span class="text-error-500-400-token">*</span></span>
                        <input id="new-card-q" type="text" bind:value={card["term_or_question"]} name="question" placeholder="Quizzable" class="input" />
                    </label>
                    <label class="label col-span-1">
                        <span class="text-surface-600-300-token">Definition<span class="text-error-500-400-token">*</span></span>
                        <input type="text" bind:value={card["definition_a1"]} name="answer" placeholder="A website for studying flashcards" class="input" />
                    </label>
                </div>
            </div>
        </form>
    </div>
</div>