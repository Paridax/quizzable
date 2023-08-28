<script lang="ts">
	import { InputChip, popup, type PopupSettings } from "@skeletonlabs/skeleton";
	import NumberInput from "./NumberInput.svelte";
	import TextInput from "./TextInput.svelte";
	import { bind } from "svelte/internal";

    export let card: {
        id: string;
        type: "card" | "single" | "multi" | "order" | "text";
        termOrQuestion: string;
        definitionA1: string;
        a2: string;
        a3: string;
        a4: string;
        correctAnswers: string[];
        text_answer: string[];
        shownAnswers: number;
        timeSeconds: string;
        new: boolean;
    };

    const options = [{num: 1, bind: "definitionA1", order: "First"}, {num: 2, bind: "a2", order: "Second"}, {num: 3, bind: "a3", order: "Third"}, {num: 4, bind: "a4", order: "Fourth"}];

    $: if (card.type === "single" && card.correctAnswers.length > 1) {
        card.correctAnswers = [card.correctAnswers[0]];
    }
    $: if (card.type === "text") card.definitionA1 = card.text_answer.join(",");

    function manageSelectAnswers(answer: "1" | "2" | "3" | "4", card: {
        correctAnswers: string[];
        type: string;
    }) {
        if (card.type === "single") {
            if (!card.correctAnswers.includes(answer)) {
                card.correctAnswers = [answer];
            }
        } else if (card.type === "multi") {
            if (card.correctAnswers.includes(answer) && card.correctAnswers.length > 1) {
                card.correctAnswers.splice(card.correctAnswers.indexOf(answer), 1);
            } else {
                card.correctAnswers.push(answer);
            }
        }

        return card.correctAnswers;
    }

    const popupHovers: PopupSettings[] = [
        {
            event: 'hover',
            target: 'popupHover1',
            placement: 'top'
        },
        {
            event: 'hover',
            target: 'popupHover2',
            placement: 'top'
        },
        {
            event: 'hover',
            target: 'popupHover3',
            placement: 'top'
        },
        {
            event: 'hover',
            target: 'popupHover4',
            placement: 'top'
        }];
</script>

{#each popupHovers as popupHover}
    <div class="card p-2 px-4 text-sm variant-filled-surface z-20 shadow-xl" data-popup={popupHover.target}>
        <p>Mark answer as correct</p>
    </div>
{/each}

<div class="grid grid-cols-4 gap-5">
    <TextInput bind:value={card["termOrQuestion"]} name="question" label="Question" required placeholder="Here is a question...?" max={200} maxlength={200} class="col-span-2" />
    <label class="label col-span-1">
        <span class="text-surface-600-300-token">Question Type<span class="text-error-500-400-token">*</span></span>
        <select class="select" bind:value={card["type"]}>
            <option value="single">Single Answer</option>
            <option value="multi">Multiple Answers</option>
            <option value="order">Order Answers</option>
            <option value="text">Text Answer</option>
        </select>
    </label>
    <label class="label col-span-1">
        <span class="text-surface-600-300-token">Time to answer (sec)<span class="text-error-500-400-token">*</span></span>
        <NumberInput bind:value={card["timeSeconds"]} name="time" max={999} min={1} classes="input" />
    </label>
    <hr class="col-span-4" />
    {#if card.type !== "text"}
    <div class="col-span-4 flex justify-between items-center">
        <h1 class="h4 font-semibold text-surface-600-300-token">{card.type === "order" ? "Correct Order" : card.type === "single" ? "Answers" : "Multiple Correct Answers"}</h1>
        <div class="flex justify-right gap-2.5">
                <button class="btn w-[2.625rem] h-[2.625rem] variant-filled-secondary" on:click|preventDefault={() => { card.shownAnswers++; card.correctAnswers = ["1"]; }} disabled={card.shownAnswers >= 4}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </span>
                </button>
                <button class="btn w-[2.625rem] h-[2.625rem] variant-soft-error" on:click|preventDefault={() => { card.shownAnswers--; card.correctAnswers = ["1"];}} disabled={card.shownAnswers <= 2}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    {/if}
    {#if card["type"] === "text"}
        <label class="label col-span-4">
            <span class="text-surface-600-300-token">Correct Responses<span class="text-error-500-400-token">*</span></span>
            <InputChip bind:value={card["text_answer"]} validation={(text) => {
                console.log(text);
                // regex only allow alphanumeric characters
                return /^[a-zA-Z0-9\!\.\@\'\#\$\%\^\&\*\(\)\_\+\-\=\\\/ ]+$/.test(text);
            }} name="chips" placeholder="Enter correct responses..." max={10} maxlength={50} on:invalid={(error) => {
                console.log(error);
            }} />
        </label>
    {:else if card["type"] === "single" || card["type"] === "multi" || card["type"] === "order"}
        {#each options as option}
            {#if card.shownAnswers >= option.num}
                <label class="label col-span-2">
                    <span class="text-surface-600-300-token">
                        {card.type === "order" ? option.order : `Option ${option.num}`}<span class="text-error-500-400-token">*</span></span>
                    <div class="flex">
                        <input id="new-card-q" type="text" bind:value={card[option.bind]} name="question" placeholder="Here is an answer to a question..." class="input" class:rounded-r-none={card.type !== "order"} />
                        <button
                            class:variant-filled-primary={card.correctAnswers.includes(option.num.toString())}
                            class:variant-filled-secondary={!card.correctAnswers.includes(option.num.toString())}
                            class:hidden={card.type === "order"}
                            class="btn rounded-l-none w-[42px]" on:click|preventDefault={() => card.correctAnswers = manageSelectAnswers(option.num.toString(), card)}
                            use:popup={popupHovers[option.num - 1]}
                            >
                            <span class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" class:opacity-10={!card.correctAnswers.includes(option.num.toString())} class:opacity-100={card.correctAnswers.includes(option.num.toString())} fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </label>
            {/if}
        {/each}
    {/if}
</div>