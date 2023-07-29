<script lang="ts">
	import { currentUser } from '$lib/pocketbase';

</script>

<div class="lg:max-w h-full mx-auto">
	<div class="space-y-5 py-10">
		<h2 class="h2 font-bold w-full text-center">Welcome, {$currentUser?.displayName}!</h2>
        <h2 class="h3 font-semibold w-full text-center text-gray-500">@{$currentUser?.username}</h2>
        {#if $currentUser?.verified === false}
            <p class="w-1/2 text-center mx-auto text-warning-600-300-token">
                You have not verified your email address yet. Please check your email for a verification link.
            </p>
        {:else}
            <p class="w-1/2 text-center mx-auto p text-success-600-300-token">
                You're verified!
            </p>
        {/if}
	</div>
</div>
