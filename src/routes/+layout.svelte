<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Header, Footer } from '$lib/components/layout';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { inject } from '@vercel/analytics';

	// Initialize Vercel Analytics
	inject();

	let { children } = $props();

	// Site-wide SEO defaults
	const siteUrl = 'https://onurhaniffa.com';
	const siteName = 'Onur Haniffa';
	const defaultDescription = 'Professional web designer and developer creating fast, modern websites that convert visitors into customers. Based in Europe, available worldwide.';
	const defaultImage = `${siteUrl}/og-image.png`;

	// Scroll to top on navigation/reload
	afterNavigate(() => {
		window.scrollTo({ top: 0, behavior: 'instant' });
	});
</script>

<svelte:head>
	<!-- Favicon -->
	<link rel="icon" href={favicon} />

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
	<meta name="author" content="Onur Haniffa" />
	<meta name="robots" content="index, follow" />
	<meta name="theme-color" content="#3b82f6" />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
