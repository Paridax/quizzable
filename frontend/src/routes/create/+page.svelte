<script lang="ts">
    import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import Loading from '../../components/Loading.svelte';
	import { currentUser } from '$lib/pocketbase';

    const newSet = {
        name: '',
        description: '',
        questions: [
            {
                question: '',
                answers: [
                    {
                        answer: '',
                        correct: false
                    }
                ]
            }
        ]
    };

    let tabSet = 0;
</script>

<div class="w-full grow py-10 flex items-center justify-center flex-col">
    {#if $currentUser}
        <h2 class="h2 font-semibold w-full text-center">Create a Quizzable</h2>
        <p class="p text-sm w-96 mt-2">
            Quizzables are a great way to test your knowledge and memorize things. You can create a flashcard set or a quiz.
        </p>
        <form method="POST" action="?/quiz" class="mt-10 lg:w-min flex justify-center gap-5 mx-auto flex-wrap lg:flex-nowrap">
            <button disabled={!$currentUser.verified} formaction="?/flashcards" class="w-72 md:w-96 relative group hover:variant-filled-primary card p-5 py-24 md:py-32 card-hover">
                <h1 class="h3 font-semibold">Create Flashcards</h1>
                <p class="text-sm p w-2/3 mx-auto mt-2 absolute left-1/2 -translate-x-1/2 top-1/2 translate-y-7 group-hover:translate-y-5 transition-all group-hover:opacity-100 opacity-0">Flashcards are a great way to memorize things</p>
            </button>
            <button disabled={!$currentUser.verified} formaction="?/quiz" class="w-72 md:w-96 relative group hover:variant-filled-primary card p-5 py-24 md:py-32 card-hover">
                <h1 class="h3 font-semibold">Create a Quiz</h1>
                <p class="text-sm p w-2/3 mx-auto mt-2 absolute left-1/2 -translate-x-1/2 top-1/2 translate-y-7 group-hover:translate-y-5 transition-all group-hover:opacity-100 opacity-0">Quizzes are a great way to test your knowledge</p>
            </button>
        </form>
    {:else}
        <Loading />
    {/if}
</div>