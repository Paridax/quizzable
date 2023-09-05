<script lang="ts">
	// Color theming for the app
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of app CSS
	import '../app.postcss';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { Toast, toastStore, type ToastSettings, autoModeWatcher } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	import { onMount, onDestroy } from 'svelte';
	import { currentUser, pb } from '$lib/pocketbase';
	import { logout } from '$lib/utils';

	const cookieToast: ToastSettings = {
		message:
			'We use cookies to improve your experience on our site. By using our site, you consent to cookies. <a href="/legal/cookies" class="anchor">Learn More</a>',
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

	let verificationToast: undefined | string = undefined;

	let currentUserExists = $currentUser ? true : false;
	$: {
		if (currentUserExists !== ($currentUser ? true : false)) {
			currentUserExists = $currentUser ? true : false;
			refreshCurrentUserHooks();
		}
		console.log(currentUserExists);
	}

	function refreshCurrentUserHooks() {
		console.log('Refreshing user data hooks');
		pb.collection('users').unsubscribe();
		if (!$currentUser) {
			if (verificationToast) {
				toastStore.close(verificationToast);
				verificationToast = undefined;
			}
			return;
		}

		if (!$currentUser?.verified) {
			console.log('User is not verified');
			verificationToast = toastStore.trigger({
				message: 'Your account is not verified. Please check your email for a verification link.',
				timeout: 1000 * 1000, // 1000 seconds
				hideDismiss: true,
				action: {
					label: 'Resend Verification Email',
					response: async () => {
						await pb.collection('users').requestVerification($currentUser?.email);
						toastStore.trigger({
							message: 'Verification email sent.',
							timeout: 1000 * 5 // 5 seconds
						});
					}
				}
			});
		}

		console.log('Subscribing to user data changes');
		pb.collection('users').subscribe($currentUser.id, (change) => {
			if (change.action === 'delete') {
				pb.collection('users').unsubscribe($currentUser?.id);
				console.log('Account deleted');
				logout();
			}

			if (change.action === 'update') {
				console.log('User data changed', change);
				if ($currentUser?.verified === false && change.record?.verified === true) {
					toastStore.trigger({
						message: 'Your account has been verified.',
						background: 'variant-filled-success',
						timeout: 1000 * 5 // 5 seconds
					});
				}

				$currentUser = change.record;
				pb.collection('users').authRefresh();
				if (verificationToast) {
					toastStore.close(verificationToast);
					verificationToast = undefined;
				}
			}
		});
	}

	onMount(() => {
		// Check if the user has accepted cookies
		if (window && window.localStorage.getItem('cookies') === null) {
			// If not, show the cookie consent banner
			toastStore.trigger(cookieToast);
		}

		refreshCurrentUserHooks();
	});

	onDestroy(() => {
		console.log('Unsubscribing from user data changes');
		if ($currentUser) {
			pb.collection('users').unsubscribe($currentUser?.id);
		}
	});
</script>

<svelte:head
	>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head
>
<Toast />

<div class="app w-full">
	<div class="min-h-screen w-full flex flex-col h-full overflow-x-hidden">
		<slot />
	</div>
</div>
