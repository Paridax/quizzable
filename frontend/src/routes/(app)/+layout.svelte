<script>
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar />
<main class="grow flex flex-col">
	<slot />
</main>
<Footer />
