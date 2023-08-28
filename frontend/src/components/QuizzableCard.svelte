<script lang="ts">
	import { pb } from "$lib/pocketbase";
	import type { User } from "$lib/types";
	import { shorthandNumber } from "$lib/utils";
	import { onMount } from "svelte";

    interface Set {
        id: string;
        author: string;
        title: string;
        description: string;
        draft: boolean;
        visibility: string;
        type: 'quiz' | 'card';
        views: number;
        likes: number;
    }

    export let set: Set;
    let visibility = 'Public';

    $: visibility = set.visibility === 'public' ? 'Public' : set.visibility === 'unlisted' ? 'Unlisted' : 'Private';

    export let authorUsername = '';

    onMount(async () => {
        const author: User = await pb.collection('publicUsers').getOne(set.author, { $autoCancel: false });
        console.log(author);
        authorUsername = author ? author?.username : '';
    });
</script>

<a href={set.draft ? `/create/${set.id}` : `/${set.id}`} class="relative group hover:variant-filled-primary flex flex-col gap-2.5 justify-start card block p-5 pt-20 card-hover">
    <div>
        <p class="text-xs uppercase font-semibold p">{set.type === 'quiz' ? 'Quiz' : 'Flashcards'}</p>
        <h1 class="h4 w-full font-semibold">{set.title}</h1>
        {#if authorUsername}
            <p class="text-sm p-dark">by <a on:click|stopPropagation href={`/user/${authorUsername}`}>@{authorUsername}</a></p>
        {/if}
    </div>
    <div class="flex flex-col gap-2.5">
        <p class="w-full line-clamp-2 break-words text-surface-600-300-token text-sm">{set.description ? set.description : "No description."}</p>
        <div class="flex gap-2.5 items-center flex-wrap">
            {#if set.draft}
            <span class="chip variant-filled-secondary">Draft</span>
            {:else}
            <span class="chip variant-filled-primary group-hover:variant-filled">{visibility}</span>
            <span class="chip variant-filled-secondary p flex gap-1 items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                {shorthandNumber(set.likes)}
            </span>
            <span class="chip variant-filled-secondary p flex gap-1 items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                    <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
                </svg>
                {shorthandNumber(set.views)}
            </span>
            {/if}
        </div>
    </div>
</a>