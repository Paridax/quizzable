<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/pocketbase';
	import Loading from '../../components/Loading.svelte';
	let email = '';
	let password = '';
    let error = '';
    let loading = false;
</script>

<head>
    <title>Login | Quizzable</title>
</head>

<main>
    <div class="max-w-md mx-auto my-32">
        <div class=" p-5 card w-full">
            <h2 class="h2 font-bold w-full text-center mb-5">Login</h2>
            <form class="flex flex-col gap-2.5 w-full" on:submit={() => {loading = true;}} method="POST" use:enhance={() => {
                return async ({result}) => {
                    loading = false;
                    console.log(result);
                    if (result?.data?.error) {
                        error = result?.data?.message == "Failed to authenticate." ? "Invalid credentials." : result?.data?.message;
                    } else {
                        error = "";
                    }
                    pb.authStore.loadFromCookie(document.cookie);
                    await applyAction(result);
                }
            }}>
                <label class="label">
                    <span class="text-surface-600-300-token">Email or Username<span class="text-error-500-400-token">*</span></span>
                    <input type="text" name="email" class="input" bind:value={email} />
                </label>
                <label class="label">
                    <span class="text-surface-600-300-token">Password<span class="text-error-500-400-token">*</span></span>
                    <input type="password" name="password" class="input" bind:value={password} />
                </label>
                <a href="/login/forgot" class="text-sm text-surface-600-300-token ml-auto mb-2.5">Forgot password?</a>
                {#if error}<p class="text-sm font-semibold text-error-300-600-token text-center w-full">{error}</p>{/if}
                <button class="btn variant-filled-primary">
                    {#if loading}
                    <Loading />
                    {:else}
                    Log in
                    {/if}
                </button>
                <p class="text-sm text-surface-700-200-token text-center mt-2.5">Don't have an account? <a href="/register" class="text-surface-700-200-token hover:text-surface-800-100-token font-semibold">Register</a></p>
            </form>
        </div>
        <p class="text-xs text-surface-500-400-token text-center mt-2.5">By using Quizzable, you agree to our <a href="/legal/terms" class="text-surface-500-400-token hover:text-surface-600-300-token underline">Terms of Service</a> and <a href="/legal/privacy" class="text-surface-500-400-token hover:text-surface-600-300-token underline">Privacy Policy</a>.</p>
    </div>
</main>

<style>
	input, button {
		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 15px;
		padding-right: 15px;
	}
</style>