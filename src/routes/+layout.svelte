<script lang="ts">
	import '../app.css';
	import { Header, Footer, WhatsAppButton } from '$lib/components/layout';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { inject } from '@vercel/analytics';
	import { initLocale, setLocaleFromServer, getLocale } from '$lib/i18n/index.svelte';

	// Initialize Vercel Analytics
	inject();

	let { children, data } = $props();

	// Set locale from server data first (for SSR correctness)
	$effect(() => {
		setLocaleFromServer(data.locale as 'en' | 'tr');
	});

	// Then initialize from URL on client
	initLocale();

	const locale = $derived(data.locale ?? 'en');

	// Site-wide SEO defaults from CMS
	const ss = data.siteSettings;
	const siteUrl = ss?.site_url ?? 'https://onurhaniffa.com';
	const siteName = ss?.site_title?.split('|')[0]?.trim() ?? 'Onur Haniffa';
	const defaultDescription = ss?.site_description ?? 'Professional web designer in Istanbul. I build fast, modern websites that convert visitors into customers. Custom design, SEO-optimized, mobile-first.';
	const ogImage = ss?.og_image ?? '/og-image.png';
	const defaultImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
	const themeColor = ss?.theme_color ?? '#3b82f6';

	// Build canonical and alternate URLs
	const currentPath = $derived($page.url.pathname);
	const cleanPath = $derived(currentPath.replace(/^\/tr/, '') || '/');
	const canonicalUrl = $derived(`${siteUrl}${currentPath}`);
	const enUrl = $derived(`${siteUrl}${cleanPath}`);
	const trUrl = $derived(`${siteUrl}/tr${cleanPath === '/' ? '' : cleanPath}`);

	// JSON-LD structured data for organization/local business
	const jsonLd = $derived(JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': ['ProfessionalService', 'LocalBusiness'],
				'@id': `${siteUrl}/#business`,
				name: 'Onur Haniffa - Web Design & Development',
				url: siteUrl,
				logo: `${siteUrl}/favicon-192x192.png`,
				image: defaultImage,
				description: 'Professional web designer and developer in Istanbul creating fast, modern websites that convert visitors into customers.',
				email: 'contact@onurhaniffa.com',
				founder: {
					'@type': 'Person',
					name: 'Onur Haniffa',
					jobTitle: 'Web Designer & Developer',
					url: siteUrl,
					sameAs: [
						'https://www.linkedin.com/in/onurhaniffa/'
					]
				},
				address: {
					'@type': 'PostalAddress',
					addressLocality: 'Istanbul',
					addressCountry: 'TR'
				},
				geo: {
					'@type': 'GeoCoordinates',
					latitude: 41.0082,
					longitude: 28.9784
				},
				areaServed: [
					{ '@type': 'City', name: 'Istanbul' },
					{ '@type': 'Country', name: 'Turkey' },
					{ '@type': 'Continent', name: 'Europe' }
				],
				serviceType: [
					'Web Design',
					'Web Development',
					'Website Redesign',
					'UI/UX Design',
					'SEO Optimization',
					'Web Site Yapımı',
					'Web Tasarım',
					'Kurumsal Web Sitesi',
					'E-Ticaret Web Sitesi',
					'Web Yazılım'
				],
				availableLanguage: ['English', 'Turkish'],
				priceRange: '$$',
				openingHoursSpecification: {
					'@type': 'OpeningHoursSpecification',
					dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
					opens: '09:00',
					closes: '18:00'
				},
				aggregateRating: {
					'@type': 'AggregateRating',
					ratingValue: '5',
					reviewCount: '2',
					bestRating: '5'
				}
			},
			{
				'@type': 'WebSite',
				'@id': `${siteUrl}/#website`,
				url: siteUrl,
				name: 'Onur Haniffa',
				publisher: { '@id': `${siteUrl}/#business` },
				inLanguage: ['en', 'tr']
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${siteUrl}${currentPath}#breadcrumb`,
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Home',
						item: siteUrl
					},
					...(cleanPath !== '/' ? [{
						'@type': 'ListItem',
						position: 2,
						name: cleanPath.replace(/^\//, '').replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
						item: `${siteUrl}${cleanPath}`
					}] : [])
				]
			}
		]
	}));

	// Scroll to top on navigation/reload
	afterNavigate(() => {
		window.scrollTo({ top: 0, behavior: 'instant' });
	});
</script>

<svelte:head>
	<!-- Favicon - Google requires min 48x48, larger sizes look better -->
	<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
	<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
	<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="shortcut icon" href="/favicon-48x48.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/site.webmanifest" />

	<!-- Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

	<!-- Canonical URL -->
	<link rel="canonical" href={canonicalUrl} />

	<!-- hreflang alternate links for multilingual SEO -->
	<link rel="alternate" hreflang="en" href={enUrl} />
	<link rel="alternate" hreflang="tr" href={trUrl} />
	<link rel="alternate" hreflang="x-default" href={enUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:image" content={defaultImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content={locale === 'tr' ? 'tr_TR' : 'en_US'} />
	<meta property="og:locale:alternate" content={locale === 'tr' ? 'en_US' : 'tr_TR'} />

	<!-- RSS Feed -->
	<link rel="alternate" type="application/rss+xml" title="Onur Haniffa Blog" href="/rss.xml" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={defaultImage} />

	<!-- Additional SEO -->
	<meta name="author" content={siteName} />
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	<meta name="theme-color" content={themeColor} />
	<meta name="geo.region" content="TR-34" />
	<meta name="geo.placename" content="Istanbul" />
	<meta name="geo.position" content="41.0082;28.9784" />
	<meta name="ICBM" content="41.0082, 28.9784" />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Header settings={data.headerSettings} />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer settings={data.footerSettings} />
</div>
<WhatsAppButton />
