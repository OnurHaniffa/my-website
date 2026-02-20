import type { Reroute } from '@sveltejs/kit';

export const reroute: Reroute = ({ url }) => {
	const pathname = url.pathname;

	// Strip /tr prefix and map to the same routes
	if (pathname === '/tr' || pathname === '/tr/') {
		return '/';
	}

	if (pathname.startsWith('/tr/')) {
		return pathname.replace(/^\/tr/, '');
	}
};
