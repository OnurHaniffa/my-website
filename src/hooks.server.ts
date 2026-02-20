import type { Handle } from '@sveltejs/kit';

// Redirects for old/changed URLs
const redirects: Record<string, string> = {
	'/work/designs-by-joe': '/work',
	'/work/dental-clinic-template': '/work',
	'/work/joe': '/work',
	'/work/pearl-dental': '/work'
};

export const handle: Handle = async ({ event, resolve }) => {
	// Check redirects first
	const redirect = redirects[event.url.pathname];
	if (redirect) {
		return new Response(null, {
			status: 301,
			headers: { Location: redirect }
		});
	}

	// Detect locale from URL path
	const locale = event.url.pathname.startsWith('/tr') ? 'tr' : 'en';
	event.locals.locale = locale;

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('lang="en"', `lang="${locale}"`);
		}
	});

	return response;
};
