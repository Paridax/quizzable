<script lang="ts">
	import TextArea from './TextArea.svelte';

    export let card: {
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
    };
</script>


<div class="grid grid-cols-2 gap-5">
    <TextArea label="Term" required maxlength={100} bind:value={card.termOrQuestion} name="question" />
    <TextArea label="Definition" required maxlength={100} bind:value={card.definitionA1} name="answer" />
</div>