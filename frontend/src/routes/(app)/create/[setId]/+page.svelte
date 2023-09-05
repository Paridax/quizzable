<script lang="ts">
	import EditFlashcards from '$lib/components/EditFlashcards.svelte';
	import { constructDebounce, sendToServer } from '$lib/utils';
	import { InputChip, toastStore } from '@skeletonlabs/skeleton';
	import Loading from '$lib/components/Loading.svelte';
	import { goto } from '$app/navigation';
	import TextInput from '$lib/components/TextInput.svelte';
	import TextArea from '$lib/components/TextArea.svelte';
	import EditQuiz from '$lib/components/EditQuiz.svelte';
	import { Dialog, Transition } from '@rgossiaux/svelte-headlessui';

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
            termOrQuestion: string;
            definitionA1: string;
            a2: string;
            a3: string;
            a4: string;
            correctAnswers: string[];
            shownAnswers: number;
            timeSeconds: string;
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
    let discardDialog = false;
    let dialogTransition = false;
    $: if (discardDialog === true) {
        dialogTransition = true;
    }

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

    async function handleDelete() {
        console.log("deleting...");

        const response = await sendToServer("?/delete", {
            setId: data.setId,
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
            message: `Deleted your ${quizOrFlashcards.toLowerCase()} draft!`,
            background: "variant-filled-success",
            timeout: 5000
        });

        goto('/home');
    }
</script>

<head>
    <title>{title} | Quizzable</title>
</head>
{#if !data.set}
    <Loading />
{:else}

<Dialog class="fixed top-0 left-0 w-screen h-screen" open={discardDialog} on:close={() => (discardDialog = false)}>
    <div class="w-full h-full" on:click={() => dialogTransition = false} />

    <Transition
        show={dialogTransition}
        enter="transition-all duration-100 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        on:introend={() => console.log("opened")}
        leave="duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        class="flex flex-col gap-2.5 absolute right-0 card mt-5 p-5 z-40 shadow-lg w-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl"
        on:outroend={() => discardDialog = false}
    >
        <h3 class="h3 font-bold">Discard Draft</h3>
        <p class="p">
            Are you sure you want to discard your draft? This action is permanent and <span class="text-error-500 font-bold">can never be undone</span>.
        </p>
        <div class="flex gap-5 w-full items-end mt-2">
            <button on:click={() => dialogTransition = false} class="btn grow variant-filled-secondary">
                Cancel
            </button>
            <button on:click={() => handleDelete()} class="btn grow variant-filled-error">
                Discard
            </button>
        </div>
    </Transition>
</Dialog>

<div class="container mx-auto my-10">
    <div class="xl:max-w-4xl mx-auto px-5">
        <div class="flex items-center justify-between">
            <h3 class="h3 font-bold">{title}</h3>
            <div class="flex items-center justify-center gap-5">
                <button on:click={() => discardDialog = true} class="btn variant-filled-secondary hover:variant-filled-error">
                    Discard Draft
                </button>
                <button on:click={() => handleSave(false)} disabled={saving ? saving : syncedWithServer} class="btn variant-filled-secondary">
                {#if saving}
                    <Loading />
                {:else}
                    {#if syncedWithServer}
                        Saved
                    {:else}
                        Save
                    {/if}
                {/if}
                </button>
                <button on:click={() => handlePublish()} class="btn variant-filled-primary">Publish</button>
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