import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData()) as {
			username: string;
			email: string;
			password: string;
			passwordConfirm: string;
		};

		console.log(data);

		try {
			await locals.pb.collection('users').create({
				username: data.username,
				email: data.email,
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				displayName: data.username
			});
			await locals.pb.collection('users').authWithPassword(data.email, data.password);
		} catch (e) {
			console.error(e);
			console.log(e.data);
			// return error messages for each field, if no message, leave blank
			return {
				status: 400,
				body: {
					username: '',
					email: '',
					password: '',
					passwordConfirm: ''
				}
			};
		}

		throw redirect(303, '/home');
	}
};
