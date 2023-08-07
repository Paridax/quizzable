<script lang="ts">
	import { InputChip } from "@skeletonlabs/skeleton";
	import NumberInput from "./NumberInput.svelte";

    export let card: {
        id: string;
        type: "card" | "single" | "multi" | "order" | "text";
        term_or_question: string;
        definition_a1: string;
        a2: string;
        a3: string;
        a4: string;
        correct_answers: number[];
        text_answer: string[];
        shown_answers: number;
        time_seconds: string;
        new: boolean;
    };

    $: if (card.type === "single" && card.correct_answers.length > 1) {
        card.correct_answers = [card.correct_answers[0]];
    }

    function manageSelectAnswers(answer: number, card: {
        correct_answers: number[];
        type: string;
    }) {
        if (card.type === "single") {
            if (!card.correct_answers.includes(answer)) {
                card.correct_answers = [answer];
            }
        } else if (card.type === "multi") {
            if (card.correct_answers.includes(answer) && card.correct_answers.length > 1) {
                card.correct_answers.splice(card.correct_answers.indexOf(answer), 1);
            } else {
                card.correct_answers.push(answer);
            }
        }

        return card.correct_answers;
    }
</script>

<div class="grid grid-cols-4 gap-5">
    <label class="label col-span-2">
        <span class="text-surface-600-300-token">Question<span class="text-error-500-400-token">*</span></span>
        <input id="new-card-q" type="text" bind:value={card["term_or_question"]} name="question" placeholder="Question" class="input" />
    </label>
    <label class="label col-span-1">
        <span class="text-surface-600-300-token">Type<span class="text-error-500-400-token">*</span></span>
        <select class="select" bind:value={card["type"]}>
            <option value="single">Single Answer</option>
            <option value="multi">Multiple Answers</option>
            <option value="order">Order Answers</option>
            <option value="text">Text Answer</option>
        </select>
    </label>
    <label class="label col-span-1">
        <span class="text-surface-600-300-token">Time to answer (sec)<span class="text-error-500-400-token">*</span></span>
        <NumberInput bind:value={card["time_seconds"]} name="time" max={999} min={1} placeholder="Duration (sec)" classes="input" />
    </label>
    <hr class="col-span-4" />
    {#if card.type !== "text"}
    <div class="col-span-4 flex justify-between items-center">
        <h1 class="h4 font-semibold">Answers</h1>
        <div class="flex justify-between gap-5">
                <button class="w-1/2 btn variant-filled-secondary" on:click|preventDefault={() => { card.shown_answers++; card.correct_answers = [1]; }} disabled={card.shown_answers >= 4}>Add an Option</button>
                <button class="w-1/2 btn variant-soft-error" on:click|preventDefault={() => { card.shown_answers--; card.correct_answers = [1];}} disabled={card.shown_answers <= 2}>Remove an Option</button>
            </div>
        </div>
    {/if}
    {#if card["type"] === "text"}
        <label class="label col-span-4">
            <span class="text-surface-600-300-token">Correct Responses<span class="text-error-500-400-token">*</span></span>
            <InputChip bind:value={card["text_answer"]} validation={(text) => {
                console.log(text);
                // regex only allow alphanumeric characters
                return /^[a-zA-Z0-9!.@'#$%^&*()_+-= ]+$/.test(text);
            }} name="chips" placeholder="Enter correct responses..." max={10} maxlength={50} on:invalid={(error) => {
                console.log(error);
            }} />
        </label>
    {:else if card["type"] === "single" || card["type"] === "multi" || card["type"] === "order"}
        <label class="label col-span-2">
            <span class="text-surface-600-300-token">Option 1<span class="text-error-500-400-token">*</span></span>
            <div class="flex">
                <input id="new-card-q" type="text" bind:value={card["definition_a1"]} name="question" placeholder="Lorem ipsum dolor sit amet..." class="input" class:rounded-r-none={card.type !== "order"} />
                <button
                    class:variant-filled-primary={card.correct_answers.includes(1)}
                    class:variant-filled-secondary={!card.correct_answers.includes(1)}
                    class:hidden={card.type === "order"}
                    class="btn rounded-l-none w-[42px]" on:click|preventDefault={() => card.correct_answers = manageSelectAnswers(1, card)}>
                <span class="icon">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                </span>
            </button>
            </div>
        </label>
        <label class="label col-span-2">
            <span class="text-surface-600-300-token">Option 2<span class="text-error-500-400-token">*</span></span>
            <div class="flex">
                <input id="new-card-q" type="text" bind:value={card["a2"]} name="question" placeholder="Lorem ipsum dolor sit amet..." class="input" class:rounded-r-none={card.type !== "order"} />
                <button
                    class:variant-filled-primary={card.correct_answers.includes(2)}
                    class:variant-filled-secondary={!card.correct_answers.includes(2)}
                    class:hidden={card.type === "order"}
                    class="btn rounded-l-none w-[42px]" on:click|preventDefault={() => card.correct_answers = manageSelectAnswers(2, card)}>
                <span class="icon">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                </span>
            </button>
            </div>
        </label>
        {#if card.shown_answers >= 3}
            <label class="label col-span-2">
                <span class="text-surface-600-300-token">Option 3<span class="text-error-500-400-token">*</span></span>
                <div class="flex">
                    <input id="new-card-q" type="text" bind:value={card["a3"]} name="question" placeholder="Lorem ipsum dolor sit amet..." class="input" class:rounded-r-none={card.type !== "order"} />
                    <button
                        class:variant-filled-primary={card.correct_answers.includes(3)}
                        class:variant-filled-secondary={!card.correct_answers.includes(3)}
                        class:hidden={card.type === "order"}
                        class="btn rounded-l-none w-[42px]" on:click|preventDefault={() => card.correct_answers = manageSelectAnswers(3, card)}>
                    <span class="icon">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                    </span>
                </button>
                </div>
            </label>
        {/if}
        {#if card.shown_answers >= 4}
            <label class="label col-span-2">
                <span class="text-surface-600-300-token">Option 4<span class="text-error-500-400-token">*</span></span>
                <div class="flex">
                    <input id="new-card-q" type="text" bind:value={card["a4"]} name="question" placeholder="Lorem ipsum dolor sit amet..." class="input" class:rounded-r-none={card.type !== "order"} />
                    <button
                        class:variant-filled-primary={card.correct_answers.includes(4)}
                        class:variant-filled-secondary={!card.correct_answers.includes(4)}
                        class:hidden={card.type === "order"}
                        class="btn rounded-l-none w-[42px]" on:click|preventDefault={() => card.correct_answers = manageSelectAnswers(4, card)}>
                    <span class="icon">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                    </span>
                </button>
                </div>
            </label>
        {/if}
    {/if}
</div>