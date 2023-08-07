<script lang="ts">
	import CreateFlashcards from '../../../components/CreateFlashcards.svelte';
	import Loading from '../../../components/Loading.svelte';
    import CreateQuiz from './../../../components/CreateQuiz.svelte';
    export let data: {
        setId: string;
        set: object;
        cards: object[];
    };
</script>

<head>
    <title>Create {data.set?.type === "quiz" ? "a Quiz" : "Flashcards"} | Quizzable</title>
</head>
{#if !data.set}
    <Loading />
{:else}
    <div class="container mx-auto my-10">
        {#if data.set?.type === "quiz"}
            <CreateQuiz data={data} />
        {:else}
            <CreateFlashcards data={data} />
        {/if}
    </div>
{/if}