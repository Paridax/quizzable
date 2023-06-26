<script lang="ts">
	// Your custom Skeleton theme:
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
</script>

<div class="app min-h-screen w-full">
	<main class="w-full">
		<slot />
	</main>
</div>
