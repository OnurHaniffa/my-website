import type { PageServerLoad } from './$types';
import { getWorkPageSettings, getProjects, toFrontendProject } from '$lib/data/directus';
import { projects as fallbackProjects } from '$lib/data/projects';

export const load: PageServerLoad = async () => {
	const [pageSettings, cmsProjects] = await Promise.all([
		getWorkPageSettings(),
		getProjects()
	]);

	return {
		pageSettings,
		projects: cmsProjects ? cmsProjects.map(toFrontendProject) : fallbackProjects
	};
};
