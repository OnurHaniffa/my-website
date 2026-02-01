import type { PageServerLoad } from './$types';
import { getPrivacyPageSettings } from '$lib/data/directus';

export const load: PageServerLoad = async () => {
	const pageSettings = await getPrivacyPageSettings();

	return {
		pageSettings
	};
};
