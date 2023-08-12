<script lang="ts">
	import { currentUser } from "$lib/pocketbase";
    import type { Card, PublicSet } from "$lib/types";
	import { sendToServer, shorthandNumber } from "$lib/utils";
	import { Transition } from "@rgossiaux/svelte-headlessui";
	import { popup, toastStore, type PopupSettings } from "@skeletonlabs/skeleton";
	import LikeButton from "../../components/LikeButton.svelte";

    export let data: {
        setId: string;
        set: PublicSet;
        cards: Card[];
		userLikesThis: boolean;
    };

    let userLikesThis = data.userLikesThis;

    const popupHover: PopupSettings = {
        event: 'hover',
        target: 'popupHover',
        placement: 'top'
    };

    let liking = false;

    async function handleLikeToggle() {
        if (liking) return;
        userLikesThis = !userLikesThis;

        if (userLikesThis) {
            data.set.likes += 1;
        } else {
            data.set.likes -= 1;
        }

        liking = true;
        const response = await sendToServer('?/like', {
            setId: data.set.id
        });
        liking = false;

        if (response.type === "error") {
            userLikesThis = !userLikesThis;

            if (userLikesThis) {
                data.set.likes += 1;
            } else {
                data.set.likes -= 1;
            }

            toastStore.trigger({
                message: response.body?.message,
                background: "variant-filled-error",
                timeout: 5000
            });
        }

        if (response.type === "success") {
            userLikesThis = response.body?.value;
            data.set.likes = response.body?.likes;
        }
    }
</script>

<div id="heading" class="w-full h-36 md:h-48 lg:h-96 absolute left-0 bg-gradient-to-br" />
<div class="small-container mx-auto py-20 px-5 md:px-0 mt-36 md:mt-48 lg:mt-96 flex flex-col gap-2">
    <div class="w-full flex justify-between items-end gap-5">
        <div class="grow shrink overflow-hidden">
            <p class="tagline variant-primary w-min">Quiz</p>
            <h2 class="h2 font-bold truncate">{data.set.title}</h2>
        </div>
        <div class="shrink-0 hidden sm:flex items-center gap-5">
            <LikeButton toggle={handleLikeToggle} bind:liked={userLikesThis} bind:likeCount={data.set.likes} />
            {#if typeof data.set.author !== "string" && data.set.author.id === $currentUser?.id}
                <a href={`/edit/${data.set.id}`} class="btn variant-soft-secondary">Edit</a>
            {/if}
        </div>
    </div>
    {#if typeof data.set.author !== "string"}
    <div class="font-semibold h4 text-lg flex gap-1 items-center w-full overflow-hidden mr-20">
        <span class="text-surface-500-400-token">by</span>
        <a href={`/user/${data.set.author.username}`} class="block p font-semibold flex gap-1 items-center max-w-full ">
            <span class="text-surface-900-50-token hover:underline truncate">{data.set.author.displayName}</span>
            {#if data.set.author.verifiedCreator}
            <a on:click|stopPropagation href="/help/verified-creator" use:popup={popupHover}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-primary-500 [&>*]:pointer-events-none">
                    <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                </svg>
            </a>

            <div class="card p-2 px-4 text-base variant-filled-primary z-20 shadow-xl" data-popup="popupHover">
                <p>Verified Creator</p>
                <p class="underline text-xs w-full text-center">Click to learn more</p>
            </div>

            <p class="text-surface-500-400-token font-semibold text-sm ml-1 mr-10 shrink-0">@{data.set.author.username}</p>
            {/if}
        </a>
    </div>
    {/if}
    <div>
        <p class="p w-full line-clamp-3">
            {data.set.description}
        </p>
    </div>
    <div class="flex mt-1 justify-between items-center">
        <p class="shrink-0 flex items-center">
            {data.set.card_count} Questions
        </p>
        <div class="shrink-0 flex sm:hidden items-center justify-end gap-5">
            <LikeButton class="shrink-0" toggle={handleLikeToggle} bind:liked={userLikesThis} bind:likeCount={data.set.likes} />
            {#if typeof data.set.author !== "string" && data.set.author.id === $currentUser?.id}
                <a href={`/edit/${data.set.id}`} class="btn variant-soft-secondary">Edit</a>
            {/if}
        </div>
    </div>
    <div class="flex gap-2.5 flex-wrap mt-3">
        {#each data.set.tags.split(',') as tag}
            <span class="chip variant-filled-secondary p">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                    </svg>
                </span>
                <span>{tag}</span>
            </span>
        {/each}
    </div>
    <hr class="my-7" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <h3 class="h4 md:col-span-2 font-semibold">Example Questions</h3>
        <div class="card p-5 px-7">
            <span class="text-surface-500-400-token font-bold">1.</span> {data.cards[0].term_or_question}
        </div>
        <div class="card p-5 px-7">
            <span class="text-surface-500-400-token font-bold">2.</span> {data.cards[1].term_or_question}
        </div>
        {#if data.cards.length > 7}
            <div class="card p-5 px-7">
                <span class="text-surface-500-400-token font-bold">3.</span> {data.cards[2].term_or_question}
            </div>
        {/if}
    </div>
    <hr class="my-7" />
    <button class="card variant-filled-primary w-full flex items-center justify-center py-12 card-hover transition-all hover:bg-gradient-to-br hover:to-warning from-primary to-primary">
        <h3 class="h3 font-semibold">Start the Quiz</h3>
    </button>
</div>

<style>
    #heading {
        background-color:#99ffc4;
        background-image:
            radial-gradient(at 36% 75%, hsla(347,91%,72%,1) 0px, transparent 50%),
            radial-gradient(at 58% 78%, hsla(136,82%,76%,1) 0px, transparent 50%),
            radial-gradient(at 47% 67%, hsla(48,79%,62%,1) 0px, transparent 50%),
            radial-gradient(at 49% 38%, hsla(28,82%,74%,1) 0px, transparent 50%),
            radial-gradient(at 25% 36%, hsla(228,66%,65%,1) 0px, transparent 50%),
            radial-gradient(at 5% 99%, hsla(289,87%,77%,1) 0px, transparent 50%),
            radial-gradient(at 94% 23%, hsla(294,64%,60%,1) 0px, transparent 50%);

        background-size: 500px 300px;
        background-size: cover;
    }
</style>