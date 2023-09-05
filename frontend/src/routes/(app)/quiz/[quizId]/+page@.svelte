<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import type { QuizQuestion, Set, SoloQuiz } from '$lib/types';
	import { onMount } from 'svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { sendToServer } from '$lib/utils';
	import { goto } from '$app/navigation';

	export let data: {
		quiz: SoloQuiz;
		quizzable: Set;
	};

	let completedQuestions = 0;
	let totalQuestions = 0;

	$: {
		totalQuestions = data.quiz.questions.length;
		completedQuestions = data.quiz.completedQuestions.length;
	}

	onMount(async () => {
		pb.collection('soloQuizzes').subscribe(data.quiz.id, function (e) {
			console.log(e.action);

			if (e.action === 'update') {
				data.quiz = e.record as SoloQuiz;
			}
		});

		await getQuestion();
	});

	let currentQuestion: QuizQuestion | null = null;
	let timeLeft = 0;
	let percentTimeLeft = 1;
	$: {
		percentTimeLeft = (timeLeft - 500) / ((currentQuestion?.timeSeconds ?? 30) * 1000);
		console.log(percentTimeLeft);
	}

	async function getQuestion() {
		console.log('Getting question');
		currentQuestion = null;
		const questionData = await sendToServer('?/getquestion', {});

		if (questionData.status === 200) {
			currentQuestion = questionData.body.question;
			console.log(currentQuestion);

			if (questionData.body?.quizOver) {
				goto(`/quiz/${data.quiz.id}/results`);
				return;
			}

			if (!currentQuestion) throw new Error('Question not found');

			const questionStartTime = new Date(currentQuestion.created).getTime();
			const questionEndTime = questionStartTime + currentQuestion.timeSeconds * 1000;

			timeLeft = questionEndTime - Date.now();

			if (timeLeft <= 0) {
				await getQuestion();
			} else {
				setTimeout(() => {
					getQuestion();
				}, timeLeft);

				function updateTimeLeft() {
					setTimeout(() => {
						timeLeft = questionEndTime - Date.now();
						if (timeLeft <= 0) {
							timeLeft = 0;
							return;
						}
						updateTimeLeft();
					}, 500);
				}
				updateTimeLeft();
			}
		}
	}

	function submitSingleAnswer(chosenAnswer: number) {
		return;
	}
</script>

<head>
	<title>{data.quizzable.title} Quiz | Quizzable</title>
</head>

<div class="container mx-auto px-5 my-20">
	<div class="w-full flex justify-between items-center">
		<h1 class="h3 font-semibold p">{data.quizzable.title} Quiz</h1>
		<div class="flex items-center">
			<span class="text-gray-500"
				>Completed {completedQuestions} / {totalQuestions} - {Math.floor(timeLeft / 1000)} seconds</span
			>
		</div>
	</div>
	<div class="h-1 rounded-full w-full variant-filled-secondary overflow-hidden">
		<div
			class="h-full rounded-full variant-filled-primary duration-[600ms] ease-linear time-left-bar"
			style="--width: {percentTimeLeft};"
		/>
	</div>
	<div class="w-full gap-5 flex flex-col">
		{#if !currentQuestion}
			<div class="w-full h-96 flex items-center justify-center">
				<Loading />
			</div>
		{:else}
			<div class="h-72 flex items-center">
				<h1 class="h2 font-semibold w-full text-center">{currentQuestion.termOrQuestion}</h1>
			</div>
			{#if currentQuestion.type === 'single'}
				<div
					class="h-72 grid gap-5 grid-cols-2"
					class:grid-cols-4={currentQuestion.shownAnswers === 4}
					class:grid-cols-3={currentQuestion.shownAnswers === 3}
				>
					<button class="card p-10 card-hover hover:variant-filled-primary active:scale-[97%]">
						<h1 class="h3 font-medium">{currentQuestion.definitionA1}</h1>
					</button>
					<button class="card p-10 card-hover hover:variant-filled-primary active:scale-[97%]">
						<h1 class="h3 font-medium">{currentQuestion.a2}</h1>
					</button>
					{#if currentQuestion.shownAnswers > 2}
						<button class="card p-10 card-hover hover:variant-filled-primary active:scale-[97%]">
							<h1 class="h3 font-medium">{currentQuestion.a3}</h1>
						</button>
					{/if}
					{#if currentQuestion.shownAnswers > 3}
						<button class="card p-10 card-hover hover:variant-filled-primary active:scale-[97%]">
							<h1 class="h3 font-medium">{currentQuestion.a4}</h1>
						</button>
					{/if}
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	.time-left-bar {
		width: calc(var(--width) * 100%);
	}
</style>
