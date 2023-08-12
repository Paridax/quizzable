<script lang="ts">
	import type { Card, PublicSet } from "$lib/types";
	import Loading from "../../components/Loading.svelte";
	import QuizPage from "./QuizPage.svelte";

    export let data: {
        setId: string;
        set: PublicSet;
        cards: Card[];
		userLikesThis: boolean;
    };
</script>

{#if !data}
    <head>
        <title>Quizzable</title>
    </head>

    <Loading />
{:else}
<head>
    <title>{data.set.title} | Quizzable</title>
</head>

<div>
    {#if data.set.type === 'quiz'}
        <QuizPage {data} />
    {:else}
        <!-- <FlashcardsPage {data} /> -->
        <p>This page isn't done yet.</p>
        <a href="/home" class="btn variant-soft-primary mt-1">Return Home</a>
    {/if}
</div>
{/if}