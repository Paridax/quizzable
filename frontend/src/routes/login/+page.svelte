<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/pocketbase';
	let email = '';
	let password = '';
    let error = '';
</script>

<main>
	<div>
		<form class="flex flex-col gap-2 w-96 mx-auto my-24" method="POST" use:enhance={() => {
            return async ({result}) => {
                if (result?.data?.error) {
                    error = result?.data?.message == "Failed to authenticate." ? "Invalid credentials." : result?.data?.message;
                } else {
                    error = "";
                }
                pb.authStore.loadFromCookie(document.cookie);
                await applyAction(result);
            }
        }}>
		    <h3 class="h3 font-semibold w-full text-center">Log in to your Quizzable account!</h3>
			<input type="text" name="email" class="input" bind:value={email} placeholder="Email or Username" />
			<input type="password" name="password" class="input" bind:value={password} placeholder="Password" />
            <p class="text-sm font-semibold text-error-300-600-token text-center w-full">{error}</p>
			<button class="btn variant-filled-primary">Log in</button>
		</form>
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