import type { PageServerLoad } from './$types';
import {
	getServicesPageSettings,
	getServicesDetailed,
	getServicesFaqs
} from '$lib/data/directus';

export const load: PageServerLoad = async () => {
	const [pageSettings, servicesDetailed, faqs] = await Promise.all([
		getServicesPageSettings(),
		getServicesDetailed(),
		getServicesFaqs()
	]);

	return {
		pageSettings,
		servicesDetailed,
		faqs
	};
};
