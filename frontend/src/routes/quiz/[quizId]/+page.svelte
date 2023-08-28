<script lang="ts">
	import type { Set, SoloQuiz } from "$lib/types";

    export let data: {
        quiz: SoloQuiz;
        quizzable: Set;
    }

    let completedQuestions = 0;
    let totalQuestions = 0;

    $: {
        totalQuestions = data.quiz.questions.length;
        completedQuestions = data.quiz.completedQuestions.length;
    }
</script>

<div class="container mx-auto px-5 xl:max-w-4xl my-20">
    <div class="w-full flex justify-between items-center">
        <h1 class="h3 font-semibold">{data.quizzable.title} Quiz</h1>
        <div class="flex items-center">
            <span class="text-gray-500 mr-2">Completed {completedQuestions} / {totalQuestions}</span>
        </div>
    </div>
</div>