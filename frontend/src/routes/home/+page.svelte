<script lang="ts">
	import { currentUser } from '$lib/pocketbase';
	import Loading from '../../components/Loading.svelte';
	import QuizzableCard from '../../components/QuizzableCard.svelte';

    interface Set {
        id: string;
        title: string;
        description: string;
        draft: boolean;
        visibility: string;
        type: 'quiz' | 'card';
        views: number;
        likes: number;
    }

    export let data: {
        publishedSets: Set[];
        draftSets: Set[];
    };
</script>

<head>
    <title>Home | Quizzable</title>
</head>

{#if $currentUser}
<div class="xl:px-72 container h-full mx-auto">
	<div class="space-y-5 py-10">
		<h2 class="h2 font-bold w-full text-center">Welcome to Quizzable, {$currentUser?.displayName}!</h2>
	</div>
    <div class="mt-10 flex flex-col gap-5">
        <div>
            <h3 class="h3 font-semibold">Published Quizzables</h3>
            <div class="grid grid-cols-3 gap-5 my-5">
                {#each data.publishedSets as set}
                    <QuizzableCard {set} />
                {:else}
                    <div class="col-span-3 py-24 flex items-center justify-center">
                        <p class="p">No published sets...</p>
                    </div>
                {/each}
            </div>
        </div>
        <div>
            <h3 class="h3 font-semibold">Draft Quizzables</h3>
            <div class="grid grid-cols-3 gap-5 my-5">
                {#each data.draftSets as set}
                    <QuizzableCard {set} />
                {/each}
                <a href="/create" class="hover:variant-filled-primary group flex flex-col items-center justify-center gap-2 card py-24 card-hover relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <p class="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-5 group-hover:translate-y-4 transition-all ease-out group-hover:opacity-100 opacity-0">Create</p>
                </a>
            </div>
        </div>
    </div>
</div>
{:else}
<div class="lg:max-w h-96 mx-auto flex items-center justify-center">
    <Loading />
</div>
{/if}

