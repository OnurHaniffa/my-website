/**
 * Directus CMS client for fetching content.
 * Falls back to hardcoded data if Directus is unavailable.
 */

import { env } from '$env/dynamic/private';

const DIRECTUS_URL = env.DIRECTUS_URL || 'http://localhost:8055';

interface DirectusResponse<T> {
	data: T;
}

// ─── Types matching Directus collections ─────────────────────────────────────

export interface DirectusProject {
	id: number;
	status: string;
	sort: number;
	slug: string;
	title: string;
	tagline: string;
	description: string;
	thumbnail: string;
	screenshot_desktop: string | null;
	screenshot_mobile: string | null;
	industry: string;
	services: string[];
	year: string;
	challenge: string;
	solution: string;
	results: string[];
	testimonial_quote: string | null;
	testimonial_author: string | null;
	testimonial_role: string | null;
	images: string[];
	live_url: string | null;
	is_client_work: boolean;
	showcase_type: string;
	enable_live_demo: boolean;
}

export interface DirectusService {
	id: number;
	sort: number;
	title: string;
	description: string;
	icon: string;
	features: string[];
	color_class: string;
}

export interface DirectusWhyMePoint {
	id: number;
	sort: number;
	title: string;
	description: string;
	icon: string;
	color_class: string;
}

export interface DirectusSiteSettings {
	id: number;
	site_title: string;
	site_description: string;
	hero_badge_text: string;
	hero_headline: string;
	hero_highlight_word: string;
	hero_description: string;
	stat_1_value: string;
	stat_1_label: string;
	stat_2_value: string;
	stat_2_label: string;
	stat_3_value: string;
	stat_3_label: string;
	services_section_title: string;
	services_section_subtitle: string;
	portfolio_section_title: string;
	portfolio_section_subtitle: string;
	why_me_section_title: string;
	why_me_section_subtitle: string;
	site_url: string;
	theme_color: string;
	og_image: string;
	linkedin_url: string;
	services_badge: string;
	portfolio_badge: string;
	why_me_badge: string;
	view_work_button: string;
	lets_talk_button: string;
	explore_services_button: string;
	view_all_work_button: string;
	learn_more_button: string;
}

// ─── Page Settings Singletons ────────────────────────────────────────────────

export interface DirectusServicesPageSettings {
	id: number;
	hero_heading: string;
	hero_highlight: string;
	hero_description: string;
	testimonial_quote: string;
	testimonial_author: string;
	testimonial_role: string;
	testimonial_initial: string;
	faq_heading: string;
	meta_title: string;
	meta_description: string;
}

export interface DirectusAboutPageSettings {
	id: number;
	hero_heading: string;
	hero_name: string;
	hero_description_1: string;
	hero_description_2: string;
	philosophy_badge: string;
	philosophy_heading: string;
	philosophy_subheading: string;
	tools_badge: string;
	tools_heading: string;
	tools_description: string;
	facts_badge: string;
	facts_heading: string;
	facts_subheading: string;
	availability_text: string;
	availability_location: string;
	meta_title: string;
	meta_description: string;
}

export interface DirectusContactPageSettings {
	id: number;
	hero_badge: string;
	hero_heading: string;
	hero_highlight: string;
	hero_description: string;
	email: string;
	response_time: string;
	availability: string;
	faq_heading: string;
	meta_title: string;
	meta_description: string;
}

export interface DirectusWorkPageSettings {
	id: number;
	hero_heading: string;
	hero_highlight: string;
	hero_description: string;
	cta_number: string;
	cta_heading: string;
	cta_description: string;
	meta_title: string;
	meta_description: string;
	filter_concept_label: string;
	filter_client_label: string;
	challenge_heading: string;
	solution_heading: string;
	preview_label: string;
	preview_heading: string;
	load_demo_text: string;
	pearl_pull_quote: string;
}

export interface DirectusPrivacyPageSettings {
	id: number;
	title: string;
	last_updated: string;
	content: string; // Rich text / HTML
	meta_title: string;
	meta_description: string;
}

export interface DirectusHeaderSettings {
	id: number;
	logo_text: string;
	logo_subtitle: string;
	cta_text: string;
	cta_href: string;
	nav_items: { href: string; label: string }[];
}

export interface DirectusFooterSettings {
	id: number;
	cta_heading: string;
	cta_highlight: string;
	cta_description: string;
	tagline: string;
	email: string;
	location: string;
	response_time: string;
	linkedin_url: string;
	brand_name: string;
	brand_subtitle: string;
	bottom_tagline: string;
	cta_button_text: string;
	pages_heading: string;
	contact_heading: string;
}

// ─── Regular Collections ─────────────────────────────────────────────────────

export interface DirectusServiceDetailed {
	id: number;
	sort: number;
	title: string;
	short_title: string;
	description: string;
	icon: string;
	color: string;
	light_color: string;
	process: string[];
	deliverables: string[];
	timeline: string;
}

export interface DirectusFaq {
	id: number;
	sort: number;
	question: string;
	answer: string;
}

export interface DirectusPhilosophyCard {
	id: number;
	sort: number;
	number: string;
	title: string;
	description: string;
	gradient: string;
	accent: string;
	icon_bg: string;
	icon: string;
}

export interface DirectusToolGroup {
	id: number;
	sort: number;
	label: string;
	tools: { name: string; icon: string; badge?: string }[];
}

export interface DirectusQuickFact {
	id: number;
	sort: number;
	icon: string;
	label: string;
	value: string;
	bg: string;
	color: string;
	border: string;
}

export interface DirectusAcademicRole {
	id: number;
	sort: number;
	icon: string;
	role: string;
	place: string;
	description: string;
}

// ─── Convert Directus project to frontend Project type ───────────────────────

import type { Project } from './projects';

export function toFrontendProject(dp: DirectusProject): Project {
	return {
		slug: dp.slug,
		title: dp.title,
		tagline: dp.tagline,
		description: dp.description,
		thumbnail: dp.thumbnail,
		screenshotDesktop: dp.screenshot_desktop ?? undefined,
		screenshotMobile: dp.screenshot_mobile ?? undefined,
		industry: dp.industry,
		services: dp.services,
		year: dp.year,
		challenge: dp.challenge,
		solution: dp.solution,
		results: dp.results,
		testimonial: dp.testimonial_quote
			? {
					quote: dp.testimonial_quote,
					author: dp.testimonial_author ?? '',
					role: dp.testimonial_role ?? ''
				}
			: undefined,
		images: dp.images,
		liveUrl: dp.live_url ?? undefined,
		isClientWork: Boolean(dp.is_client_work),
		showcaseType: dp.showcase_type as Project['showcaseType'],
		enableLiveDemo: Boolean(dp.enable_live_demo)
	};
}

// ─── Fetch helpers ───────────────────────────────────────────────────────────

async function fetchFromDirectus<T>(endpoint: string): Promise<T | null> {
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 3000);
		const res = await fetch(`${DIRECTUS_URL}${endpoint}`, {
			headers: { 'Content-Type': 'application/json' },
			signal: controller.signal
		});
		clearTimeout(timeoutId);
		if (!res.ok) return null;
		const json: DirectusResponse<T> = await res.json();
		return json.data;
	} catch (err) {
		const reason = err instanceof Error ? err.message : 'unknown error';
		console.warn(`[Directus] Failed to fetch ${endpoint}: ${reason}, using fallback data`);
		return null;
	}
}

// ─── Existing fetchers ───────────────────────────────────────────────────────

export async function getProjects(): Promise<DirectusProject[] | null> {
	return fetchFromDirectus<DirectusProject[]>(
		'/items/projects?filter[status][_eq]=published&sort=sort'
	);
}

export async function getServices(): Promise<DirectusService[] | null> {
	return fetchFromDirectus<DirectusService[]>('/items/services?sort=sort');
}

export async function getWhyMePoints(): Promise<DirectusWhyMePoint[] | null> {
	return fetchFromDirectus<DirectusWhyMePoint[]>('/items/why_me_points?sort=sort');
}

export async function getSiteSettings(): Promise<DirectusSiteSettings | null> {
	return fetchFromDirectus<DirectusSiteSettings>('/items/site_settings');
}

// ─── Page Settings fetchers ──────────────────────────────────────────────────

export async function getServicesPageSettings(): Promise<DirectusServicesPageSettings | null> {
	return fetchFromDirectus<DirectusServicesPageSettings>('/items/services_page_settings');
}

export async function getAboutPageSettings(): Promise<DirectusAboutPageSettings | null> {
	return fetchFromDirectus<DirectusAboutPageSettings>('/items/about_page_settings');
}

export async function getContactPageSettings(): Promise<DirectusContactPageSettings | null> {
	return fetchFromDirectus<DirectusContactPageSettings>('/items/contact_page_settings');
}

export async function getWorkPageSettings(): Promise<DirectusWorkPageSettings | null> {
	return fetchFromDirectus<DirectusWorkPageSettings>('/items/work_page_settings');
}

export async function getPrivacyPageSettings(): Promise<DirectusPrivacyPageSettings | null> {
	return fetchFromDirectus<DirectusPrivacyPageSettings>('/items/privacy_page_settings');
}

export async function getHeaderSettings(): Promise<DirectusHeaderSettings | null> {
	return fetchFromDirectus<DirectusHeaderSettings>('/items/header_settings');
}

export async function getFooterSettings(): Promise<DirectusFooterSettings | null> {
	return fetchFromDirectus<DirectusFooterSettings>('/items/footer_settings');
}

// ─── Regular collection fetchers ─────────────────────────────────────────────

export async function getServicesDetailed(): Promise<DirectusServiceDetailed[] | null> {
	return fetchFromDirectus<DirectusServiceDetailed[]>('/items/services_detailed?sort=sort');
}

export async function getServicesFaqs(): Promise<DirectusFaq[] | null> {
	return fetchFromDirectus<DirectusFaq[]>('/items/services_faqs?sort=sort');
}

export async function getPhilosophyCards(): Promise<DirectusPhilosophyCard[] | null> {
	return fetchFromDirectus<DirectusPhilosophyCard[]>('/items/philosophy_cards?sort=sort');
}

export async function getToolGroups(): Promise<DirectusToolGroup[] | null> {
	return fetchFromDirectus<DirectusToolGroup[]>('/items/tool_groups?sort=sort');
}

export async function getQuickFacts(): Promise<DirectusQuickFact[] | null> {
	return fetchFromDirectus<DirectusQuickFact[]>('/items/quick_facts?sort=sort');
}

export async function getAcademicRoles(): Promise<DirectusAcademicRole[] | null> {
	return fetchFromDirectus<DirectusAcademicRole[]>('/items/academic_roles?sort=sort');
}

export async function getContactFaqs(): Promise<DirectusFaq[] | null> {
	return fetchFromDirectus<DirectusFaq[]>('/items/contact_faqs?sort=sort');
}
