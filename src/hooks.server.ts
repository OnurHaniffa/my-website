import type { Handle } from '@sveltejs/kit';

// Redirects for old/changed URLs
const redirects: Record<string, string> = {
	'/work/designs-by-joe': '/work',
	'/work/dental-clinic-template': '/work',
	'/work/joe': '/work',
	'/work/pearl-dental': '/work'
};

export const handle: Handle = async ({ event, resolve }) => {
	const redirect = redirects[event.url.pathname];
	if (redirect) {
		return new Response(null, {
			status: 301,
			headers: { Location: redirect }
		});
	}
	return resolve(event);
};
