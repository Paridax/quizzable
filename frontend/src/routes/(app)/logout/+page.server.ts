import { redirect } from '@sveltejs/kit';
import type { Action } from '@sveltejs/kit';

export const actions: Action = {
    default: async ({ locals }) => {
        locals.pb.authStore.clear();
        locals.user = null;
        throw redirect(303, '/');
    }
}