import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';

export default ({ mode }: { mode: string }) => {
	// Extends 'process.env.*' with VITE_*-variables from '.env.(mode=production|development)'
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };
	let PORT = Number(process.env.PORT) || 3000;
	if (mode === 'production') PORT = 3001;
	return defineConfig({
		plugins: [sveltekit()],
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}']
		},
		server: {
			port: PORT
		}
	});
};
