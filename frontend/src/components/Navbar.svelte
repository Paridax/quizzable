<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { currentUser } from '$lib/pocketbase';
    import { pb } from '$lib/pocketbase';

	const guestLinks = {
		Login: '/login',
		Register: '/register'
	};

	const userLinks = {
		Home: '/home',
		Profile: '/profile'
	};
</script>

<div class="w-full">
	<nav class="flex items-center h-16 mx-auto container justify-between">
        <a href={$currentUser ? "/home" : "/"} class="p-2 pl-0">
            <h1>Quizzable</h1>
        </a>
		<ul class="flex items-center justify-between gap-5">
			{#if $currentUser}
				{#each Object.keys(userLinks) as link}
					<li>
						<a class="btn variant-soft-primary" href={userLinks[link]}>{link}</a>
					</li>
				{/each}
                <li>
                    <form method="POST" action="/logout" use:enhance={() => {
                        return async ({result}) => {
                            pb.authStore.clear();
                            await applyAction(result);
                        }
                    }}>
                        <button class="btn variant-soft-error">Logout</button>
                    </form>
                </li>
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
