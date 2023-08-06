import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
		};

		try {
            if (!data.email || !data.password) {
                return {
                    error: true,
                    status: 400,
                    message: "Please fill in all fields."
                }
            }
			await locals.pb.collection('users').authWithPassword(data.email, data.password);
		} catch (e) {
            if (!e.data.message) {
                return {
                    error: true,
                    status: 400,
                    message: "Couldn't connect to the server."
                }
            }
			// return error messages for each field, if no message, leave blank
			return {
				error: true,
				status: 400,
				message: e.data.message
			};
		}

		throw redirect(303, '/home');
	}
};
