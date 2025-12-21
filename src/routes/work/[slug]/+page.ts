import { error } from '@sveltejs/kit';
import { getProject, projects } from '$lib/data/projects';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const project = getProject(params.slug);

	if (!project) {
		throw error(404, 'Project not found');
	}

	// Get next and previous projects for navigation
	const currentIndex = projects.findIndex((p) => p.slug === params.slug);
	const nextProject = projects[(currentIndex + 1) % projects.length];
	const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

	return {
		project,
		nextProject,
		prevProject
	};
};
