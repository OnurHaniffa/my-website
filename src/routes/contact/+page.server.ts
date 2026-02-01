import type { PageServerLoad } from './$types';
import { getContactPageSettings, getContactFaqs } from '$lib/data/directus';

export const load: PageServerLoad = async () => {
	const [pageSettings, faqs] = await Promise.all([
		getContactPageSettings(),
		getContactFaqs()
	]);

	return {
		pageSettings,
		faqs
	};
};
