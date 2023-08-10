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
    <div class="container h-full mx-auto my-10">
        <h2 class="h2 font-semibold w-full text-center">Create a Quizzable</h2>
        <form method="POST" action="?/quiz" class="w-1/2 grid grid-cols-2 gap-5 mx-auto mt-10">
            <button disabled={!$currentUser.verified} formaction="?/flashcards" class="card p-5 py-16 card-hover">
                <h1 class="h3">Create Flashcards</h1>
            </button>
            <button disabled={!$currentUser.verified} formaction="?/quiz" class="card p-5 py-16 card-hover">
                <h1 class="h3">Create a Quiz</h1>
            </button>
        </form>
    </div>
</main>
{:else}
    <Loading />
{/if}