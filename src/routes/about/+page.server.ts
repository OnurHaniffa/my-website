import type { PageServerLoad } from './$types';
import {
	getAboutPageSettings,
	getPhilosophyCards,
	getToolGroups,
	getQuickFacts,
	getAcademicRoles
} from '$lib/data/directus';

export const load: PageServerLoad = async () => {
	const [pageSettings, philosophyCards, toolGroups, quickFacts, academicRoles] =
		await Promise.all([
			getAboutPageSettings(),
			getPhilosophyCards(),
			getToolGroups(),
			getQuickFacts(),
			getAcademicRoles()
		]);

	return {
		pageSettings,
		philosophyCards,
		toolGroups,
		quickFacts,
		academicRoles
	};
};
