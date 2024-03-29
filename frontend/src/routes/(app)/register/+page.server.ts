import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData()) as {
			username: string;
			email: string;
			password: string;
			passwordConfirm: string;
		};

		try {
            if (!data.email) throw {
                data: {
                    data: {
                        identity: {code: "required", message: "Cannot be blank."}
                    }
                }
            }
			await locals.pb.collection('users').create({
				username: data.username,
				email: data.email,
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				displayName: data.username,
                authorization: "user",
                supporterLevel: "standard"
			});
            locals.pb.collection('users').requestVerification(data.email);
			await locals.pb.collection('users').authWithPassword(data.email, data.password);
		} catch (e) {
			// return error messages for each field, if no message, leave blank
			return {
				status: 400,
                error: true,
				body: {
					...e.data
				}
			};
		}

		throw redirect(303, '/home');
	}
};
