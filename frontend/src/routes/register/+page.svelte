<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
    import { debounce } from "$lib/utils";
	import { pb } from "$lib/pocketbase";
	import { identity } from "svelte/internal";
	import Loading from "../../components/Loading.svelte";

	let username = '';
	let email = '';
	let password = '';
	let passwordConfirm = '';

    let loading = false;

    $: console.log(password, passwordConfirm);

    const checkUsername = debounce((debounced) => {
        console.log(debounced);
    }, 1000)

    $: if (username.trim().length > 0) checkUsername(username);

    let errors = {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        displayName: '',
        identity: ''
    }
</script>

<main>
	<div>
		<form class="flex flex-col gap-2 w-96 mx-auto my-24" method="POST" on:submit={() => {loading = true;}} use:enhance={() => {
            return async ({result}) => {
                console.log(result);
                loading = false;
                errors = {
                    username: '',
                    email: '',
                    password: '',
                    passwordConfirm: '',
                    displayName: '',
                    identity: ''
                }
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
            }
        }}>
		    <h3 class="h3 font-semibold w-full text-center">Create your Quizzable account!</h3>
			<input name="username" type="text" class="input" id="username" bind:value={username} placeholder="Username" />
            {#if errors?.username || errors?.displayName}<p class="text-sm font-semibold text-error-500 text-center w-full">{errors?.username || errors?.displayName}</p>{/if}
			<input name="email" type="text" class="input" bind:value={email} placeholder="Email" />
            {#if errors?.identity || errors?.email}<p class="text-sm font-semibold text-error-500 text-center w-full">{errors?.identity || errors?.email}</p>{/if}
			<input name="password" type="password" class="input" bind:value={password} placeholder="Password" />
            {#if errors?.password}<p class="text-sm font-semibold text-error-500 text-center w-full">{errors?.password}</p>{/if}
			<input name="passwordConfirm" type="password" class="input" bind:value={passwordConfirm} placeholder="Confirm Password" />
            {#if errors?.passwordConfirm}<p class="text-sm font-semibold text-error-500 text-center w-full">{errors?.passwordConfirm}</p>{/if}
			<button class="btn variant-filled-primary">
                {#if loading}
                <Loading />
                {:else}
                Create Account
                {/if}
            </button>
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
