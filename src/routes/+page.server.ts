import type { PageServerLoad } from './$types';
import {
	getProjects,
	getServices,
	getWhyMePoints,
	toFrontendProject
} from '$lib/data/directus';
import { projects as fallbackProjects } from '$lib/data/projects';

export const load: PageServerLoad = async () => {
	// Fetch CMS data in parallel (siteSettings comes from layout loader)
	const [cmsProjects, cmsServices, cmsWhyMePoints] = await Promise.all([
		getProjects(),
		getServices(),
		getWhyMePoints()
	]);

	return {
		projects: cmsProjects ? cmsProjects.map(toFrontendProject) : fallbackProjects,
		services: cmsServices,
		whyMePoints: cmsWhyMePoints,
		isFromCms: !!(cmsProjects && cmsServices && cmsWhyMePoints)
	};
};
