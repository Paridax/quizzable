<script lang="ts">
	import { currentUser } from '$lib/pocketbase';
	const guestLinks = {
		Home: '/',
		Login: '/login',
		Register: '/register'
	};

	const userLinks = {
		Home: '/',
		Profile: '/profile',
		Logout: '/logout'
	};
</script>

<div class="w-full">
	<nav class="flex items-center h-16 mx-auto container justify-between">
		<h1>Quizzable</h1>
		<ul class="flex items-center justify-between gap-5">
			{#if $currentUser}
				{#each Object.keys(userLinks) as link}
					<li>
						<a class="btn variant-soft-primary" href={userLinks[link]}>{link}</a>
					</li>
				{/each}
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
