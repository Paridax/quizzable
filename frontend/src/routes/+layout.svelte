<script lang="ts">
	// Color theming for the app
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of app CSS
	import '../app.postcss';
	import Navbar from '../components/Navbar.svelte';
</script>

<div class="app min-h-screen w-full">
	<main class="w-full">
		<Navbar />
		<slot />
	</main>
</div>
