import type { LayoutServerLoad } from './$types';
import { getHeaderSettings, getFooterSettings, getSiteSettings } from '$lib/data/directus';

export const load: LayoutServerLoad = async ({ locals }) => {
	const [headerSettings, footerSettings, siteSettings] = await Promise.all([
		getHeaderSettings(),
		getFooterSettings(),
		getSiteSettings()
	]);

	return {
		headerSettings,
		footerSettings,
		siteSettings,
		locale: locals.locale ?? 'en'
	};
};
