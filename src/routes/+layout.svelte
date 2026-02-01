<script lang="ts">
	import '../app.css';
	import { Header, Footer } from '$lib/components/layout';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { inject } from '@vercel/analytics';

	// Initialize Vercel Analytics
	inject();

	let { children, data } = $props();

	// Site-wide SEO defaults from CMS
	const ss = data.siteSettings;
	const siteUrl = ss?.site_url ?? 'https://onurhaniffa.com';
	const siteName = ss?.site_title?.split('|')[0]?.trim() ?? 'Onur Haniffa';
	const defaultDescription = ss?.site_description ?? 'Professional web designer and developer creating fast, modern websites that convert visitors into customers. Based in Europe, available worldwide.';
	const ogImage = ss?.og_image ?? '/og-image.png';
	const defaultImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
	const themeColor = ss?.theme_color ?? '#3b82f6';

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
	<link rel="canonical" href="{siteUrl}{$page.url.pathname}" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{siteUrl}{$page.url.pathname}" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:image" content={defaultImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={defaultImage} />

	<!-- Additional SEO -->
	<meta name="author" content={siteName} />
	<meta name="robots" content="index, follow" />
	<meta name="theme-color" content={themeColor} />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Header settings={data.headerSettings} />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer settings={data.footerSettings} />
</div>
