<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/pocketbase';
	import Loading from '$lib/components/Loading.svelte';

	let username = '';
	let email = '';
	let password = '';
	let passwordConfirm = '';

	let loading = false;

	$: console.log(password, passwordConfirm);

	$: if (username.trim().length > 0) checkUsername(username);

	let errors = {
		username: '',
		email: '',
		password: '',
		passwordConfirm: '',
		displayName: '',
		identity: ''
	};
</script>

<head>
	<title>Create an account | Quizzable</title>
</head>

<main>
	<div class="max-w-md mx-auto my-28">
		<div class=" p-5 card w-full">
			<h2 class="h2 font-bold w-full text-center mb-5">Register</h2>
			<form
				class="flex flex-col gap-2.5 w-full"
				method="POST"
				on:submit={() => {
					loading = true;
				}}
				use:enhance={() => {
					return async ({ result }) => {
						console.log(result);
						loading = false;
						errors = {
							username: '',
							email: '',
							password: '',
							passwordConfirm: '',
							displayName: '',
							identity: ''
						};
						if (result?.data?.error) {
							if (result?.data?.body?.data) {
								// loop through data object
								for (const [key, value] of Object.entries(result.data.body.data)) {
									console.log(key, value?.message);
									errors[key] = value?.message;
									console.log(errors);
								}
							}
						} else {
							pb.authStore.loadFromCookie(document.cookie);
							await applyAction(result);
						}
					};
				}}
			>
				<label class="label">
					<span class="text-surface-600-300-token"
						>Username (a-z, 0-9)<span class="text-error-500-400-token">*</span></span
					>
					<input name="username" type="text" class="input" id="username" bind:value={username} />
					{#if errors?.username || errors?.displayName}<p
							class="text-sm font-semibold text-error-500 text-center w-full"
						>
							{errors?.username || errors?.displayName}
						</p>{/if}
				</label>
				<label class="label">
					<span class="text-surface-600-300-token"
						>Email Address<span class="text-error-500-400-token">*</span></span
					>
					<input name="email" id="email" type="text" class="input" bind:value={email} />
					{#if errors?.identity || errors?.email}<p
							class="text-sm font-semibold text-error-500 text-center w-full"
						>
							{errors?.identity || errors?.email}
						</p>{/if}
				</label>
				<label class="label">
					<span class="text-surface-600-300-token"
						>Password<span class="text-error-500-400-token">*</span></span
					>
					<input name="password" type="password" class="input" bind:value={password} />
					{#if errors?.password}<p class="text-sm font-semibold text-error-500 text-center w-full">
							{errors?.password}
						</p>{/if}
				</label>
				<label class="label">
					<span class="text-surface-600-300-token"
						>Confirm Password<span class="text-error-500-400-token">*</span></span
					>
					<input
						name="passwordConfirm"
						type="password"
						class="input"
						bind:value={passwordConfirm}
					/>
					{#if errors?.passwordConfirm}<p
							class="text-sm font-semibold text-error-500 text-center w-full"
						>
							{errors?.passwordConfirm}
						</p>{/if}
				</label>
				<button class="btn variant-filled-primary">
					{#if loading}
						<Loading />
					{:else}
						Create Account
					{/if}
				</button>
				<p class="text-sm text-surface-700-200-token text-center mt-2.5">
					Already have an account? <a
						href="/login"
						class="text-surface-700-200-token hover:text-surface-800-100-token font-semibold"
						>Login</a
					>
				</p>
			</form>
		</div>
		<p class="text-xs text-surface-500-400-token text-center mt-2.5 w-3/4 mx-auto">
			By creating an account on Quizzable, you agree to our <a
				href="/legal/terms"
				class="text-surface-500-400-token hover:text-surface-600-300-token underline"
				>Terms of Service</a
			>
			and
			<a
				href="/legal/privacy"
				class="text-surface-500-400-token hover:text-surface-600-300-token underline"
				>Privacy Policy</a
			>.
		</p>
	</div>
</main>

<style>
	input,
	button {
		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 15px;
		padding-right: 15px;
	}
</style>
