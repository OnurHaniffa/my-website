import type { Handle } from '@sveltejs/kit';
import { isTrOnlyRoute } from '$lib/i18n/tr-only-routes';

// Redirects for old/changed URLs
const redirects: Record<string, string> = {
	'/work/designs-by-joe': '/work',
	'/work/dental-clinic-template': '/work',
	'/work/joe': '/work',
	'/work/pearl-dental': '/work',
	'/istanbul-web-design': '/',
	'/istanbul-web-design/': '/',
	'/tr/istanbul-web-design': '/tr/',
	'/tr/istanbul-web-design/': '/tr/'
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

	// Locale signals (in priority order):
	//  1. /tr/ URL prefix → explicit Turkish locale
	//  2. Turkish-keyword slug routes (per src/lib/i18n/tr-only-routes.ts)
	//  3. Otherwise: English
	const isTrPath = event.url.pathname.startsWith('/tr');
	const isTrSlug = isTrOnlyRoute(event.url.pathname);
	const locale = isTrPath || isTrSlug ? 'tr' : 'en';
	event.locals.locale = locale;
	event.locals.isTrOnlyRoute = isTrSlug;

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('lang="en"', `lang="${locale}"`);
		}
	});

	return response;
};
