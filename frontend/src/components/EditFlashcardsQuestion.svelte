<script lang="ts">
	import TextArea from './TextArea.svelte';

    export let card: {
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
    };
</script>


<div class="grid grid-cols-2 gap-5">
    <TextArea label="Term" required maxlength={100} bind:value={card.term_or_question} name="question" />
    <TextArea label="Definition" required maxlength={100} bind:value={card.definition_a1} name="answer" />
</div>