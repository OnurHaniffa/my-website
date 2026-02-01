import type { PageServerLoad } from './$types';
import {
	getProjects,
	getServices,
	getWhyMePoints,
	getSiteSettings,
	toFrontendProject
} from '$lib/data/directus';
import type {
	DirectusService,
	DirectusWhyMePoint,
	DirectusSiteSettings
} from '$lib/data/directus';
import { projects as fallbackProjects } from '$lib/data/projects';

export const load: PageServerLoad = async () => {
	// Fetch all CMS data in parallel
	const [cmsProjects, cmsServices, cmsWhyMePoints, cmsSiteSettings] = await Promise.all([
		getProjects(),
		getServices(),
		getWhyMePoints(),
		getSiteSettings()
	]);

	return {
		projects: cmsProjects ? cmsProjects.map(toFrontendProject) : fallbackProjects,
		services: cmsServices,
		whyMePoints: cmsWhyMePoints,
		siteSettings: cmsSiteSettings,
		isFromCms: !!(cmsProjects && cmsServices && cmsWhyMePoints && cmsSiteSettings)
	};
};
