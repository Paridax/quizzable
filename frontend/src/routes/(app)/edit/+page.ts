import { pb } from '$lib/pocketbase.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
    if (pb.authStore.model) {
        throw redirect(303, `/home`);
    } else {
        throw redirect(303, `/login`);
    }
}
