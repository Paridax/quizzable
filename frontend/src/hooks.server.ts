import { pb } from '$lib/pocketbase';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { allowRouteAccess } from '$lib/protection';

export const handle: Handle = async ({ event, resolve }) => {
    const targetUrl = new URL(event.request.url);

	// Before response
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	if (pb.authStore.isValid) {
		try {
			await pb.collection('users').authRefresh();
		} catch (e) {
			pb.authStore.clear();
		}
	}

	event.locals.pb = pb;
	event.locals.user = structuredClone(pb.authStore.model);


	const response = await resolve(event);

	// After response
	response.headers.set(
        'set-cookie',
		pb.authStore.exportToCookie({ httpOnly: false, secure: false })
    );

    // check if url pathname in guest or auth only routes
    const destRoute = allowRouteAccess(targetUrl.pathname, event.locals.user);

    if (destRoute !== targetUrl.pathname) {
        throw redirect(303, destRoute);
    }

    return response;
};
