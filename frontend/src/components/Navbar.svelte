<script lang="ts">
	import { currentUser } from '$lib/pocketbase';
	import { logout } from '$lib/utils';
    import { UserIcon } from '@rgossiaux/svelte-heroicons/outline';

    import {
        Menu, MenuButton, MenuItems, MenuItem
    } from '@rgossiaux/svelte-headlessui';

	const guestLinks = {
		Login: '/login',
		Register: '/register'
	};
</script>

<div class="w-full">
	<nav class="flex items-center h-16 mx-auto container justify-between">
        <a href={$currentUser ? "/home" : "/"} class="p-2 pl-0">
            <h1 class="font-bold logo h3 text-primary-500">Quizzable</h1>
        </a>
		<ul class="flex items-center justify-between gap-5">
			{#if $currentUser}
                <li>
                    <a class="btn variant-soft-secondary" href="/create">Create</a>
                </li>
                <li>
                    <a class="btn variant-soft-warning" href="/plans">Upgrade</a>
                </li>
                <li>
                    <Menu class="relative">
                        <MenuButton class="btn variant-soft-primary">
                            <span>{$currentUser.displayName}</span>
                            <span>
                                <UserIcon class="w-5 h-5" />
                            </span>
                        </MenuButton>
                        <MenuItems class="flex flex-col gap-2.5 absolute right-0 card mt-2.5 p-5">
                            <div class="px-4 my-2">
                                <p class="text-lg font-semibold">{$currentUser.displayName}</p>
                                <p class="text-xs font-medium text-surface-600-300-token">@{$currentUser.username}</p>
                            </div>
                            <hr />
                            <div class="flex flex-col">
                                <a href="/profile" class="btn hover:variant-soft-secondary text-left">
                                    <div class="w-full">
                                        Profile
                                    </div>
                                </a>
                                <a href={`/${$currentUser.username}/sets`} class="btn hover:variant-soft-secondary text-left">
                                    <div class="w-full">
                                        My Sets
                                    </div>
                                </a>
                                <a href="/settings" class="btn hover:variant-soft-secondary">
                                    <div class="w-full">
                                        Account Settings
                                    </div>
                                </a>
                                <button class="btn hover:variant-soft-error" on:click={() => logout()}>
                                    <div class="w-full text-left text-error-400-500-token">
                                        Logout
                                    </div>
                                </button>
                            </div>
                        </MenuItems>
                    </Menu>
                </li>
                <!-- <li>
                    <button class="btn variant-soft-error" on:click={() => logout()}>Logout</button>
                </li> -->
			{:else}
				{#each Object.keys(guestLinks) as link}
					<li>
						<a class="btn variant-soft-primary" href={guestLinks[link]}>{link}</a>
					</li>
				{/each}
			{/if}
		</ul>
	</nav>
</div>
