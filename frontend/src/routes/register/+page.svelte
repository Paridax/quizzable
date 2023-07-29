<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
    import { debounce } from "$lib/utils";
	import { pb } from "$lib/pocketbase";

	let username = '';
	let email = '';
	let password = '';
	let passwordConfirm = '';

    $: console.log(password, passwordConfirm);

    const checkUsername = debounce((debounced) => {
        console.log(debounced);
    }, 1000)

    $: if (username.trim().length > 0) checkUsername(username);
</script>

<main>
	<div>
		<form class="flex flex-col gap-2 w-96 mx-auto my-24" method="POST" use:enhance={() => {
            return async ({result}) => {
                pb.authStore.loadFromCookie(document.cookie);
                await applyAction(result);
            }
        }}>
		    <h3 class="h3 font-semibold w-full text-center">Create your Quizzable account!</h3>
			<input name="username" type="text" class="input" id="username" bind:value={username} placeholder="Username" />
			<input name="email" type="text" class="input" bind:value={email} placeholder="Email" />
			<input name="password" type="password" class="input" bind:value={password} placeholder="Password" />
			<input name="passwordConfirm" type="password" class="input" bind:value={passwordConfirm} placeholder="Confirm Password" />
			<button class="btn variant-filled-primary">Create account</button>
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
