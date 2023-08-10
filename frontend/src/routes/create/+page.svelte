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

{#if $currentUser}
<main>
    <div class="container h-full mx-auto my-48">
        <h2 class="h2 font-semibold w-full text-center">Create a Quizzable</h2>
        <form method="POST" action="?/quiz" class="w-1/2 grid grid-cols-2 gap-5 mx-auto mt-10">
            <button disabled={!$currentUser.verified} formaction="?/flashcards" class="relative group hover:variant-filled-primary card p-5 py-32 card-hover">
                <h1 class="h3 font-semibold">Create Flashcards</h1>
                <p class="text-sm p w-2/3 mx-auto mt-2 absolute left-1/2 -translate-x-1/2 top-1/2 translate-y-7 group-hover:translate-y-5 transition-all group-hover:opacity-100 opacity-0">Flashcards are a great way to memorize things</p>
            </button>
            <button disabled={!$currentUser.verified} formaction="?/quiz" class="relative group hover:variant-filled-primary card p-5 py-32 card-hover">
                <h1 class="h3 font-semibold">Create a Quiz</h1>
                <p class="text-sm p w-2/3 mx-auto mt-2 absolute left-1/2 -translate-x-1/2 top-1/2 translate-y-7 group-hover:translate-y-5 transition-all group-hover:opacity-100 opacity-0">Quizzes are a great way to test your knowledge</p>
            </button>
        </form>
    </div>
</main>
{:else}
    <Loading />
{/if}