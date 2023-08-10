<script lang="ts">
	import EditFlashcards from './../../../components/EditFlashcards.svelte';
	import { constructDebounce, sendToServer } from '$lib/utils';
	import { InputChip, toastStore } from '@skeletonlabs/skeleton';
	import Loading from '../../../components/Loading.svelte';
	import { goto } from '$app/navigation';
	import TextInput from '../../../components/TextInput.svelte';
	import TextArea from '../../../components/TextArea.svelte';
	import EditQuiz from '../../../components/EditQuiz.svelte';

    export let data: {
        setId: string;
        set: {
            title: string;
            type: "quiz" | "card";
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

    const deletedCards: string[] = [];
    let saving = false;
    let syncCount = 2;
    let syncedWithServer = true;

    let saveUrl = "";
    let title = "";
    let saveSuccessMessage = "";
    let quizOrFlashcards = data.set.type === "quiz" ? "Quiz" : "Flashcards";

    if (data.set?.type === "quiz") {
        saveUrl = "?/savequiz";
        title = "Create a Quiz";
    } else {
        saveUrl = "?/savecards";
        title = "Create Flashcards";
    }

    $: { data; notSynced(); console.log("data changed"); }

    function notSynced() {
        // Wait for the initial data changes to be done
        if (syncCount > 0) {
            syncCount--;
            return;
        }
        syncedWithServer = false;
    }

    const autosaveCallback = constructDebounce(() => {
        if (!syncedWithServer) handleSave(true);
    }, 3000);

    $: if (!syncedWithServer) autosaveCallback(data);

    async function handleSave(autosave: boolean = false) {
        saving = true;
        console.log("saving...");

        const response = await sendToServer(saveUrl, {
            set: data.set,
            cards: data.cards,
            tags: data.tags,
            deletedCards: deletedCards
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
            message: `Successfully ${autosave ? 'auto' : ''}saved your ${quizOrFlashcards.toLowerCase()} draft!`,
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
            await handleSave(false);
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
            message: `Published your ${quizOrFlashcards.toLowerCase()}!`,
            background: "variant-filled-success",
            timeout: 5000
        });

        goto(`/${data.setId}`);
    }
</script>

<head>
    <title>{title} | Quizzable</title>
</head>
{#if !data.set}
    <Loading />
{:else}
<div class="container mx-auto my-10">
    <div class="xl:px-72">
        <div class="flex items-center justify-between">
            <h3 class="h3 font-bold">{title}</h3>
            <div class="flex items-center justify-center gap-5">
                <button on:click|preventDefault={() => handleSave(false)} disabled={syncedWithServer} class="btn variant-filled-secondary">
                {#if saving}
                    <Loading />
                {:else}
                    {#if syncedWithServer}
                        Saved
                    {:else}
                        Save now
                    {/if}
                {/if}
                </button>
                <button on:click|preventDefault={() => handlePublish()} class="btn variant-filled-primary">Publish</button>
            </div>
        </div>
        <form class="my-5 grid grid-cols-3 gap-5">
            <TextInput label="Title" class="col-span-2" name="title" maxlength={50} required placeholder="New Flashcards Set" bind:value={data.set.title} />
            <label class="label col-span-1">
                <span class="text-surface-600-300-token">Visibility<span class="text-error-500-400-token">*</span></span>
                <select class="select" bind:value={data.set.visibility}>
                    <option value="public">Public</option>
                    <option value="unlisted">Unlisted</option>
                    <option value="private">Private</option>
                </select>
            </label>
            <TextArea class="col-span-2" rows={3} required label="Description" placeholder={`Enter a description of your ${data.set?.type === "quiz" ? "quiz" : "flashcards"} here...`} bind:value={data.set["description"]} maxlength={200} />
            <label class="label col-span-1">
                <span class="text-surface-600-300-token">Tags (a-z, 0-9)</span>
                <InputChip bind:value={data.tags} validation={(text) => {
                    console.log(text);
                    // regex only allow alphanumeric characters
                    return /^[a-zA-Z0-9]+$/.test(text);
                }} name="chips" placeholder="Press enter to submit a tag..." max={10} maxlength={15} />
            </label>
        </form>
        <hr class="mt-10" />
            {#if data.set?.type === "quiz"}
                <EditQuiz bind:data={data} />
            {:else}
                <EditFlashcards bind:data={data} {saving} {syncCount} {syncedWithServer} {deletedCards} />
            {/if}
        </div>
    </div>
{/if}