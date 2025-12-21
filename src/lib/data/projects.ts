export type ShowcaseType =
	| 'default'      // Laptop + phone mockup
	| 'browser'      // Clean browser window
	| 'bento'        // Bento grid layout
	| 'floating'     // Floating screenshots
	| 'fullwidth'    // Cinematic full-width
	| 'isometric'    // 3D isometric view
	| 'magazine'     // Editorial style
	| 'stacked'      // Stacked windows
	| 'live-demo';   // Interactive iframe embed

export interface Project {
	slug: string;
	title: string;
	tagline: string;
	description: string;
	thumbnail: string;
	screenshotDesktop?: string;
	screenshotMobile?: string;
	industry: string;
	services: string[];
	year: string;
	challenge: string;
	solution: string;
	results: string[];
	testimonial?: {
		quote: string;
		author: string;
		role: string;
	};
	images: string[];
	liveUrl?: string;
	isClientWork: boolean;
	// Showcase display options
	showcaseType?: ShowcaseType;
	enableLiveDemo?: boolean; // Whether to show interactive iframe demo
}

export const projects: Project[] = [
	{
		slug: 'designs-by-joe',
		title: 'Designs by Joe',
		tagline: 'Fan art for the fans',
		description: 'Portfolio website for a fan artist and illustrator specializing in pin designs, trading cards, logos, and stickers inspired by popular fandoms.',
		thumbnail: '/images/projects/designsbyjoe-thumb.jpg',
		screenshotDesktop: '/images/projects/joe-screenshot.png',
		screenshotMobile: '/images/projects/designsbyjoe-mobile.png',
		industry: 'Fan Art & Illustration',
		services: ['Web Design', 'Development', 'Branding'],
		year: '2025',
		challenge:
			'Joe needed a bold, eye-catching portfolio to showcase 200+ artworks and attract commission clients from various fandoms. The site needed to feel premium while staying true to the creative, fan-driven nature of the work.',
		solution:
			'I designed a dark, immersive portfolio with smooth animations that puts the artwork front and center. The layout features a striking hero section and intuitive navigation between portfolio pieces and commission information.',
		results: [
			'Professional online presence established',
			'Increased commission inquiries',
			'Sub-2 second load times',
			'Mobile-optimized experience'
		],
		testimonial: {
			quote:
				'The website perfectly captures my style and has helped me land bigger clients. The whole process was smooth and collaborative.',
			author: 'Joe',
			role: 'Fan Artist & Illustrator'
		},
		images: [
			'/images/projects/designsbyjoe-hero.jpg',
			'/images/projects/designsbyjoe-mobile.jpg',
			'/images/projects/designsbyjoe-detail.jpg'
		],
		liveUrl: 'https://designsbyjoe.net',
		isClientWork: true,
		showcaseType: 'magazine',
		enableLiveDemo: false
	},
	{
		slug: 'dental-clinic-template',
		title: 'Pearl Dental',
		tagline: 'Modern dental care, designed for you',
		description: 'A warm, trustworthy website for a dental practice featuring same-week appointments, service showcases, and easy booking flows.',
		thumbnail: '/images/projects/dental-thumb.jpg',
		screenshotDesktop: '/images/projects/dentist-screenshot.png',
		screenshotMobile: '/images/projects/dental-mobile.png',
		industry: 'Healthcare',
		services: ['UI/UX Design', 'Frontend Development', 'Template Design'],
		year: '2025',
		challenge:
			'Healthcare websites often feel clinical and cold, or outdated and unprofessional. The goal was to create a site that builds trust while remaining warm and approachable.',
		solution:
			'I designed a clean, modern dental website with trust-building elements like reviews, years of expertise, and clear service presentation. The warm color palette and friendly imagery balance professionalism with approachability.',
		results: [
			'Conversion-optimized layout',
			'Trust-building design elements',
			'Fully responsive design',
			'Accessible and WCAG compliant'
		],
		images: [
			'/images/projects/dental-hero.jpg',
			'/images/projects/dental-services.jpg',
			'/images/projects/dental-booking.jpg'
		],
		liveUrl: 'https://pearl-dental.vercel.app',
		isClientWork: false,
		showcaseType: 'live-demo',
		enableLiveDemo: true
	}
];

export function getProject(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
	return projects;
}
