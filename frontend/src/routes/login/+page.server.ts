import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
		};

		console.log(data);

		try {
			await locals.pb.collection('users').authWithPassword(data.email, data.password);
		} catch (e) {
			console.error(e);
			console.log(e.data);
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
