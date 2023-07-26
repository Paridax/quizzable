<script lang="ts">
	import { currentUser } from '$lib/pocketbase';

</script>

<div class="lg:max-w h-full mx-auto">
	<div class="space-y-5 py-10">
		<h2 class="h2 font-bold w-full text-center">Welcome, {$currentUser?.displayName}!</h2>
        <h2 class="h3 font-semibold w-full text-center text-gray-500">@{$currentUser?.username}</h2>
	</div>
</div>
