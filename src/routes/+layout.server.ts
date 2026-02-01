import type { LayoutServerLoad } from './$types';
import { getHeaderSettings, getFooterSettings } from '$lib/data/directus';

export const load: LayoutServerLoad = async () => {
	const [headerSettings, footerSettings] = await Promise.all([
		getHeaderSettings(),
		getFooterSettings()
	]);

	return {
		headerSettings,
		footerSettings
	};
};
