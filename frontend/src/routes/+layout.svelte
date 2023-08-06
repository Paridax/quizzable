<script lang="ts">
	// Color theming for the app
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of app CSS
	import '../app.postcss';
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';
	import { Toast, toastStore, type ToastSettings, autoModeWatcher } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

    const cookieToast: ToastSettings = {
        message: 'We use cookies to improve your experience on our site. By using our site, you consent to cookies. <a href="/legal/cookies" class="anchor">Learn More</a>',
	    timeout: 1000 * 1000, // 1000 seconds
        hideDismiss: true,
        action: {
            label: 'I Understand',
            response: () => {
                if (window) {
                    window.localStorage.setItem('cookies', 'accepted');
                }
            }
        }
    };

    onMount(() => {
        // Check if the user has accepted cookies
        if (window && window.localStorage.getItem('cookies') === null) {
            // If not, show the cookie consent banner
            toastStore.trigger(cookieToast);
        }
    });
</script>

<svelte:head>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head>
<Toast />

<div class="app min-h-screen w-full">
	<div class="w-full px-5">
		<Navbar />
        <main>
            <slot />
        </main>
        <Footer />
	</div>
</div>
