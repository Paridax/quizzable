<script lang="ts">
	import { currentUser } from '$lib/pocketbase';
	import { logout } from '$lib/utils';

    import {
        Menu, MenuButton, MenuItems, MenuItem, Transition

    } from '@rgossiaux/svelte-headlessui';
	import { toastStore } from '@skeletonlabs/skeleton';
	import Loading from './Loading.svelte';

	const guestLinks = {
		Login: '/login',
		Register: '/register'
	};

    function remindUserToVerify() {
        toastStore.trigger({
            message: 'You cannot create Quizzables until you verify your account.',
            background: 'variant-filled-error',
            timeout: 1000 * 5,
        });
    }
</script>

<div class="w-full bg-surface-100-800-token shadow-xl px-5 z-30">
	<nav class="flex items-center h-16 mx-auto container justify-between">
        <a href={$currentUser ? "/home" : "/"} class="p-2 pl-0">
            <h1 class="font-bold logo h3 text-primary-500">Quizzable</h1>
        </a>
		<ul class="flex items-center justify-between gap-5">
			{#if $currentUser}
                <li>
                    {#if $currentUser.verified}
                        <a class="btn hidden md:block text-surface-900-50-token hover:variant-soft-primary" href="/create">Create</a>
                    {:else}
                        <button class="btn hidden md:block text-surface-900-50-token hover:variant-soft-primary" on:click={remindUserToVerify}>Create</button>
                    {/if}
                </li>
                <li>
                    <a class="btn hidden md:block text-surface-900-50-token hover:variant-soft-primary" href="/home">Home</a>
                </li>
                <li>
                    <a class="btn hidden md:block variant-soft-warning hover:variant-filled-warning" href="/plans">Upgrade</a>
                </li>
                <li>
                    <Menu class="relative" let:open>
                        <MenuButton class="btn variant-soft-secondary hover:variant-soft-primary" let:open>
                            <span>Account</span>
                            <span class="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 transition-transform duration-200 ease-in-out" class:rotate-180={open}>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </span>
                        </MenuButton>
                        <Transition
                            show={open}
                            enter="transition-all duration-100 ease-out"
                            enterFrom="opacity-0 translate-y-2"
                            enterTo="opacity-100 translate-y-0"
                            leave="duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-2"
                            class="flex flex-col gap-2.5 absolute right-0 card mt-5 p-5 z-40 w-64 shadow-lg"
                        >
                            <a href={`/user/${$currentUser.username}`} class="px-4 mb-2.5 w-full">
                                <h1 class="text-lg h4 font-semibold text-surface-900-50-token truncate">{$currentUser.displayName}</h1>
                                <p class="text-xs font-medium text-surface-600-300-token">@{$currentUser.username}</p>
                            </a>
                            <div class="flex md:hidden flex-col gap-2.5">
                                <MenuItem let:active>
                                    <a href="/plans" class:variant-filled-warning={active} class:variant-soft-warning={!active} class="btn text-left w-full">
                                        <div class="w-full">
                                            Upgrade
                                        </div>
                                    </a>
                                </MenuItem>
                                <hr />
                                <div class="flex flex-col gap-0.5">
                                    <MenuItem let:active>
                                        <a href="/create" class:variant-soft-secondary={active} class="btn text-left w-full">
                                            <div class="w-full">
                                                Create
                                            </div>
                                        </a>
                                    </MenuItem>
                                    <MenuItem let:active>
                                        <a href="/home" class:variant-soft-secondary={active} class="btn text-left w-full">
                                            <div class="w-full">
                                                Home
                                            </div>
                                        </a>
                                    </MenuItem>
                                </div>
                            </div>
                            <hr />
                            <div class="flex flex-col gap-0.5">
                                <MenuItem let:active>
                                    <a href="/profile" class:variant-soft-secondary={active} class="btn text-left w-full">
                                        <div class="w-full">
                                            Profile
                                        </div>
                                    </a>
                                </MenuItem>
                                <MenuItem let:active>
                                    <a href={`/${$currentUser.username}/sets`} class:variant-soft-secondary={active} class="btn text-left w-full">
                                        <div class="w-full">
                                            My Sets
                                        </div>
                                    </a>
                                </MenuItem>
                                <MenuItem let:active>
                                    <a href="/settings" class:variant-soft-secondary={active} class="btn text-left w-full">
                                        <div class="w-full">
                                            Account Settings
                                        </div>
                                    </a>
                                </MenuItem>
                                <MenuItem let:active>
                                <button class="btn w-full" on:click={() => logout()} class:variant-soft-error={active}>
                                    <div class="w-full text-left text-error-400-500-token flex items-center justify-left gap-2">
                                        <!-- <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                                <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clip-rule="evenodd" />
                                            </svg>
                                        </span> -->
                                        <span>Logout</span>
                                    </div>
                                </button>
                                </MenuItem>
                            </div>
                        </Transition>
                    </Menu>
                </li>
                <!-- <li>
                    <button class="btn variant-soft-error" on:click={() => logout()}>Logout</button>
                </li> -->
			{:else if !$currentUser}
				{#each Object.keys(guestLinks) as link}
					<li>
						<a class="btn variant-soft-primary" href={guestLinks[link]}>{link}</a>
					</li>
				{/each}
            {:else}
            <li>
                <Loading />
            </li>
			{/if}
		</ul>
	</nav>
</div>
