<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Container, Section } from '$lib/components/layout';
	import { InView } from '$lib/components/ui/animations';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { projects } from '$lib/data/projects';

	let mounted = $state(false);
	let dentistIframeLoaded = $state(false);
	let joeIframeLoaded = $state(false);
	let dentistIframeError = $state(false);
	let joeIframeError = $state(false);

	// Iframe timeout duration (15 seconds)
	const IFRAME_TIMEOUT = 15000;

	type FilterType = 'concept' | 'client';

	// Read initial filter from URL query param
	const initialFilter = $page.url.searchParams.get('filter');
	let activeFilter = $state<FilterType>(
		initialFilter === 'client' ? 'client' : 'concept'
	);

	// Get project data
	const pearlDental = projects.find(p => p.slug === 'pearl-dental');
	const designsByJoe = projects.find(p => p.slug === 'joe');

	// Click-to-load iframes for performance
	let loadDentalIframe = $state(false);
	let loadJoeIframe = $state(false);
	let dentalTimeoutId: ReturnType<typeof setTimeout> | null = null;
	let joeTimeoutId: ReturnType<typeof setTimeout> | null = null;

	// Start iframe timeout when loading begins
	function startDentalIframeLoad() {
		loadDentalIframe = true;
		dentistIframeError = false;
		dentalTimeoutId = setTimeout(() => {
			if (!dentistIframeLoaded) {
				dentistIframeError = true;
			}
		}, IFRAME_TIMEOUT);
	}

	function startJoeIframeLoad() {
		loadJoeIframe = true;
		joeIframeError = false;
		joeTimeoutId = setTimeout(() => {
			if (!joeIframeLoaded) {
				joeIframeError = true;
			}
		}, IFRAME_TIMEOUT);
	}

	function handleDentalIframeLoad() {
		dentistIframeLoaded = true;
		if (dentalTimeoutId) clearTimeout(dentalTimeoutId);
	}

	function handleJoeIframeLoad() {
		joeIframeLoaded = true;
		if (joeTimeoutId) clearTimeout(joeTimeoutId);
	}

	function retryDentalIframe() {
		dentistIframeLoaded = false;
		dentistIframeError = false;
		loadDentalIframe = false;
		// Small delay then retry
		setTimeout(() => startDentalIframeLoad(), 100);
	}

	function retryJoeIframe() {
		joeIframeLoaded = false;
		joeIframeError = false;
		loadJoeIframe = false;
		setTimeout(() => startJoeIframeLoad(), 100);
	}

	// Parallax scroll state
	let scrollY = $state(0);
	let dentalSectionRef = $state<HTMLElement | null>(null);
	let joeSectionRef = $state<HTMLElement | null>(null);
	let dentalSectionTop = $state(0);
	let joeSectionTop = $state(0);

	// Preview mode toggle (iframe vs video)
	type PreviewMode = 'iframe' | 'video';
	let dentalPreviewMode = $state<PreviewMode>('iframe');
	let joePreviewMode = $state<PreviewMode>('iframe');

	// Before/After slider position (0-100)
	let beforeAfterPosition = $state(50);
	let isDragging = $state(false);

	function handleSliderMove(e: MouseEvent | TouchEvent, container: HTMLElement) {
		if (!isDragging) return;
		const rect = container.getBoundingClientRect();
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const x = clientX - rect.left;
		const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
		beforeAfterPosition = percent;
	}

	onMount(() => {
		mounted = true;

		// Track scroll for parallax
		const handleScroll = () => {
			scrollY = window.scrollY;
			if (dentalSectionRef) {
				dentalSectionTop = dentalSectionRef.getBoundingClientRect().top + window.scrollY;
			}
			if (joeSectionRef) {
				joeSectionTop = joeSectionRef.getBoundingClientRect().top + window.scrollY;
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	});

	// Calculate parallax offset for circles
	function getParallaxOffset(sectionTop: number, speed: number = 0.1): number {
		if (!browser) return 0;
		const relativeScroll = scrollY - sectionTop + window.innerHeight;
		return relativeScroll * speed;
	}
</script>

<svelte:head>
	<title>Work | Onur Haniffa</title>
	<meta name="description" content="Selected projects showcasing strategy, design, and real results. See how I help businesses succeed online with modern web design." />
	<meta property="og:title" content="Work | Onur Haniffa" />
	<meta property="og:description" content="Selected projects showcasing strategy, design, and real results. See how I help businesses succeed online." />
</svelte:head>

<style>
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.animate-fade-in {
		animation: fadeIn 0.4s ease-out forwards;
	}

	/* Filter toggle slider */
	.filter-slider {
		width: calc(50% - 6px);
		left: 6px;
		transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1), background-color 300ms ease, box-shadow 300ms ease;
	}
	.filter-slider.slide-left {
		transform: translateX(0);
	}
	.filter-slider.slide-right {
		transform: translateX(calc(100% + 6px));
	}

	.gradient-text-dental {
		background: linear-gradient(135deg, #4a7c59 0%, #2d5a3d 50%, #c4a574 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.gradient-text-joe {
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #c9a227 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	@media (prefers-reduced-motion: reduce) {
		.animate-fade-in {
			animation: none;
			opacity: 1;
		}
	}
</style>

<!-- Hero Section - Bold asymmetric design -->
<Section padding="none" class="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
	<!-- Decorative elements - hidden on mobile -->
	<div class="hidden lg:block absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
	<div class="hidden lg:block absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

	<Container>
		<div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
			<!-- Main headline - 8 cols -->
			<div class="lg:col-span-8">
				<div
					class="transition-all duration-700 ease-out"
					class:opacity-0={!mounted}
					class:translate-y-8={!mounted}
					class:opacity-100={mounted}
					class:translate-y-0={mounted}
				>
					<span class="hidden sm:block text-[100px] sm:text-[140px] lg:text-[200px] font-black leading-[0.8] text-foreground/5 dark:text-foreground/[0.08] select-none -mb-8 sm:-mb-12 lg:-mb-16">WORK</span>
					<h1 class="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl relative z-10">
						<span class="sm:hidden">Work</span> that <span class="text-primary">speaks</span> for itself
					</h1>
				</div>
			</div>

			<!-- Side content - 4 cols -->
			<div class="lg:col-span-4">
				<p
					class="text-lg text-muted-foreground leading-relaxed transition-all duration-700 ease-out"
					class:opacity-0={!mounted}
					class:translate-y-6={!mounted}
					class:opacity-100={mounted}
					class:translate-y-0={mounted}
					style="transition-delay: 100ms;"
				>
					A mix of client work and passion projects, each built with the same care and attention to detail.
				</p>
			</div>
		</div>

		<!-- Project Toggle Slider - centered -->
		<div
			class="mt-12 flex justify-center transition-all duration-700 ease-out"
			class:opacity-0={!mounted}
			class:translate-y-6={!mounted}
			class:opacity-100={mounted}
			class:translate-y-0={mounted}
			style="transition-delay: 200ms;"
		>
			<div class="filter-toggle relative flex items-center bg-muted/80 dark:bg-muted/50 backdrop-blur-sm rounded-full p-1.5 border border-border/50 shadow-sm">
				<div
					class="filter-slider absolute top-1.5 bottom-1.5 rounded-full shadow-lg transition-all duration-300"
					class:slide-left={activeFilter === 'concept'}
					class:slide-right={activeFilter === 'client'}
					style="background-color: {activeFilter === 'concept' ? '#4a7c59' : '#3b82f6'}; box-shadow: 0 10px 15px -3px {activeFilter === 'concept' ? 'rgba(74, 124, 89, 0.35)' : 'rgba(59, 130, 246, 0.35)'};"
				></div>

				<button
					onclick={() => activeFilter = 'concept'}
					class="relative z-10 px-8 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 {activeFilter === 'concept'
						? 'text-white'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					Concept Build
				</button>
				<button
					onclick={() => activeFilter = 'client'}
					class="relative z-10 px-8 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 {activeFilter === 'client'
						? 'text-white'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					Live Project
				</button>
			</div>
		</div>
	</Container>
</Section>

<!-- ═══════════════════════════════════════════════════════════════════════════
     PEARL DENTAL SECTION
     ═══════════════════════════════════════════════════════════════════════════ -->
{#if activeFilter === 'concept'}
<div class="animate-fade-in">
<section bind:this={dentalSectionRef} class="relative py-20 lg:py-32 overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-br from-[#f8f5f0] via-[#f5f0e8] to-[#e8f0e8] dark:from-[#1a1a1a] dark:via-[#1f1f1f] dark:to-[#1a1a1a]"></div>
	<div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent"></div>
	<div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>

	<Container class="relative">
		<!-- Project Number & Title Header -->
		<div class="flex items-end justify-between mb-12 lg:mb-16">
			<div>
				<span class="text-[120px] lg:text-[180px] font-bold leading-none text-[#4a7c59]/10 dark:text-[#4a7c59]/20 select-none">01</span>
			</div>
			<div class="text-right pb-4">
				<Badge class="mb-3 bg-[#4a7c59]/10 text-[#4a7c59] border-[#4a7c59]/20">Healthcare</Badge>
				<h2 class="text-4xl lg:text-6xl font-bold tracking-tight gradient-text-dental">Pearl Dental</h2>
				<p class="mt-2 text-lg text-[#4a7c59] font-medium">Modern dental care, designed for you</p>
			</div>
		</div>

		<!-- Main Screenshot with floating circular cards -->
		<div class="relative">
			<div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
				<img
					src="/images/projects/dentist-screenshot.jpg"
					alt="Pearl Dental Homepage"
					loading="lazy"
					class="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-[#2d5a3d]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
			</div>

			<!-- Floating circular cards with parallax -->
			<div class="hidden lg:flex absolute -right-8 top-8 bottom-8 flex-col justify-center gap-6">
				<!-- Tech circle -->
				<div
					class="w-32 h-32 rounded-full bg-[#4a7c59] shadow-xl flex flex-col items-center justify-center text-center p-4 hover:scale-105 transition-transform"
					style="transform: translateY({getParallaxOffset(dentalSectionTop, -0.05)}px)"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/80 mb-2"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
					<span class="text-[10px] text-white/70 uppercase tracking-wider">Built With</span>
					<span class="text-xs text-white font-medium mt-0.5">SvelteKit</span>
				</div>

				<!-- Design circle -->
				<div
					class="w-28 h-28 rounded-full bg-[#c4a574] shadow-xl flex flex-col items-center justify-center text-center p-4 hover:scale-105 transition-transform -ml-4"
					style="transform: translateY({getParallaxOffset(dentalSectionTop, -0.08)}px)"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/80 mb-1"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
					<span class="text-[10px] text-white/70 uppercase tracking-wider">UI/UX</span>
					<span class="text-xs text-white font-medium mt-0.5">Design</span>
				</div>

				<!-- SEO circle -->
				<div
					class="w-24 h-24 rounded-full bg-white shadow-xl border-2 border-[#4a7c59]/20 flex flex-col items-center justify-center text-center p-3 hover:scale-105 transition-transform"
					style="transform: translateY({getParallaxOffset(dentalSectionTop, -0.12)}px)"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#4a7c59] mb-1"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
					<span class="text-[10px] text-[#5a5a5a] uppercase tracking-wider">SEO</span>
					<span class="text-xs text-[#4a7c59] font-medium mt-0.5">Optimized</span>
				</div>
			</div>

			<!-- Bottom floating info circles with parallax -->
			<div class="hidden lg:flex absolute -bottom-12 left-1/2 -translate-x-1/2 gap-4">
				<!-- Year circle -->
				<div
					class="w-20 h-20 rounded-full bg-white shadow-lg border border-[#c4a574]/30 flex flex-col items-center justify-center hover:scale-105 transition-transform"
					style="transform: translateY({getParallaxOffset(dentalSectionTop, -0.03)}px)"
				>
					<span class="text-xl font-bold text-[#c4a574]">2025</span>
					<span class="text-[8px] text-[#5a5a5a] uppercase tracking-wider">Year</span>
				</div>

				<!-- Demo badge circle -->
				<div
					class="w-24 h-24 rounded-full bg-[#f5f0e8] dark:bg-surface-2 shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform"
					style="transform: translateY({getParallaxOffset(dentalSectionTop, -0.06)}px)"
				>
					<div class="w-3 h-3 bg-[#4a7c59] rounded-full mb-1"></div>
					<span class="text-xs text-[#4a7c59] font-medium">Demo</span>
					<span class="text-[8px] text-[#5a5a5a] uppercase">Project</span>
				</div>

				<!-- Responsive circle -->
				<div
					class="w-20 h-20 rounded-full bg-white shadow-lg border border-[#4a7c59]/20 flex flex-col items-center justify-center hover:scale-105 transition-transform"
					style="transform: translateY({getParallaxOffset(dentalSectionTop, -0.04)}px)"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#4a7c59] mb-0.5"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>
					<span class="text-[8px] text-[#5a5a5a] uppercase tracking-wider">Mobile</span>
				</div>
			</div>

			<!-- Mobile: horizontal scrolling circles -->
			<div class="flex lg:hidden gap-3 mt-6 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
				<div class="flex-shrink-0 w-24 h-24 rounded-full bg-[#4a7c59] shadow-lg flex flex-col items-center justify-center text-center p-3">
					<span class="text-[10px] text-white/70 uppercase tracking-wider">Built With</span>
					<span class="text-sm text-white font-medium">SvelteKit</span>
				</div>
				<div class="flex-shrink-0 w-24 h-24 rounded-full bg-[#c4a574] shadow-lg flex flex-col items-center justify-center text-center p-3">
					<span class="text-[10px] text-white/70 uppercase tracking-wider">UI/UX</span>
					<span class="text-sm text-white font-medium">Design</span>
				</div>
				<div class="flex-shrink-0 w-24 h-24 rounded-full bg-white shadow-lg border border-[#4a7c59]/20 flex flex-col items-center justify-center text-center p-3">
					<span class="text-[10px] text-[#5a5a5a] uppercase tracking-wider">SEO</span>
					<span class="text-sm text-[#4a7c59] font-medium">Optimized</span>
				</div>
				<div class="flex-shrink-0 w-24 h-24 rounded-full bg-[#f5f0e8] dark:bg-surface-2 shadow-lg flex flex-col items-center justify-center text-center p-3">
					<span class="text-xl font-bold text-[#c4a574]">2025</span>
					<span class="text-[8px] text-[#5a5a5a] uppercase">Year</span>
				</div>
			</div>
		</div>

		<!-- Project Description -->
		<div class="mt-20 lg:mt-28">
			<div class="grid lg:grid-cols-2 gap-8 lg:gap-16">
				<!-- The Challenge -->
				<div class="bg-white dark:bg-surface-2 p-8 lg:p-10 rounded-2xl shadow-sm dark:shadow-lg dark:shadow-black/20 border border-[#c4a574]/20 dark:border-border/50">
					<div class="flex items-center gap-3 mb-4">
						<div class="w-10 h-10 rounded-full bg-[#4a7c59]/10 dark:bg-[#4a7c59]/20 flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#4a7c59] dark:text-[#6a9c79]"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
						</div>
						<h3 class="text-lg font-bold text-[#2d2d2d] dark:text-white">The Challenge</h3>
					</div>
					<p class="text-[#5a5a5a] dark:text-gray-300 leading-relaxed">
						Most dental websites feel cold and clinical, or outdated and unprofessional. Pearl Dental needed a site that builds trust instantly while remaining warm and approachable—making new patients feel confident before they even book.
					</p>
				</div>

				<!-- The Solution -->
				<div class="bg-white dark:bg-surface-2 p-8 lg:p-10 rounded-2xl shadow-sm dark:shadow-lg dark:shadow-black/20 border border-[#c4a574]/20 dark:border-border/50">
					<div class="flex items-center gap-3 mb-4">
						<div class="w-10 h-10 rounded-full bg-[#c4a574]/20 dark:bg-[#c4a574]/30 flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#c4a574] dark:text-[#d4b584]"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
						</div>
						<h3 class="text-lg font-bold text-[#2d2d2d] dark:text-white">The Solution</h3>
					</div>
					<p class="text-[#5a5a5a] dark:text-gray-300 leading-relaxed">
						I designed a clean, modern website with trust-building elements like reviews, years of expertise, and clear service presentation. The warm color palette and friendly imagery balance professionalism with approachability.
					</p>
				</div>
			</div>
		</div>

		<!-- Pull Quote - ORIGINAL STYLING -->
		<div class="mt-16 lg:mt-20 relative">
			<div class="max-w-3xl mx-auto text-center">
				<p class="text-2xl lg:text-3xl font-light text-[#2d2d2d] dark:text-gray-200 leading-relaxed italic">
					<span class="text-[#c4a574] font-serif text-4xl">'</span>The goal was simple: make patients feel <span class="font-semibold text-[#4a7c59] not-italic">welcome</span> before they even walk through the door.<span class="text-[#c4a574] font-serif text-4xl">'</span>
				</p>
				<!-- Decorative line -->
				<div class="mt-8 flex items-center justify-center gap-3">
					<div class="w-12 h-[2px] bg-[#c4a574]"></div>
					<div class="w-2 h-2 bg-[#4a7c59] rounded-full"></div>
					<div class="w-12 h-[2px] bg-[#c4a574]"></div>
				</div>
			</div>
		</div>

		<!-- Interactive Preview Section -->
		<InView animation="fade-up" class="mt-16 lg:mt-24 -mx-4 lg:-mx-16 xl:-mx-24">
			<div class="text-center mb-10 px-4 lg:px-16 xl:px-24">
				<p class="text-sm font-medium text-[#4a7c59] tracking-widest uppercase mb-2">Interactive Preview</p>
				<h3 class="text-2xl lg:text-3xl font-bold text-[#2d2d2d]">Experience it live</h3>
			</div>

			<div class="relative overflow-hidden shadow-2xl bg-white dark:bg-surface-1 border border-[#c4a574]/20 dark:border-border/50 mx-4 lg:mx-8">
				<div class="bg-[#f5f0e8] dark:bg-surface-2 px-4 py-3 flex items-center gap-3 border-b border-[#4a7c59]/10 dark:border-border/40">
					<div class="flex gap-1.5">
						<div class="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
						<div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
						<div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
					</div>
					<div class="flex-1 flex justify-center">
						<span class="text-sm text-[#5a5a5a]">{pearlDental?.liveUrl?.replace('https://', '') ?? 'pearl-dental.vercel.app'}</span>
					</div>
				</div>

				<div class="relative bg-[#faf7f2] dark:bg-surface-1" style="height: 75vh; min-height: 600px; max-height: 900px;">
					{#if !loadDentalIframe}
						<div class="absolute inset-0 flex items-center justify-center">
							<div class="text-center">
								<img src={pearlDental?.screenshotDesktop ?? '/images/projects/dentist-screenshot.jpg'} alt="Pearl Dental Preview" loading="lazy" class="w-full h-full object-cover object-top absolute inset-0 opacity-30" />
								<div class="relative z-10">
									<button
										onclick={startDentalIframeLoad}
										class="px-6 py-3 bg-[#4a7c59] text-white font-medium hover:bg-[#3d6a4a] transition-colors shadow-lg"
									>
										Load Interactive Demo
									</button>
									<p class="mt-3 text-sm text-[#5a5a5a]">Click to load the live site</p>
								</div>
							</div>
						</div>
					{:else if dentistIframeError}
						<div class="absolute inset-0 flex items-center justify-center bg-[#faf7f2] dark:bg-surface-1 z-10">
							<div class="text-center p-6">
								<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-[#c4a574]">
									<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>
								</svg>
								<p class="text-[#2d2d2d] font-medium mb-2">Unable to load preview</p>
								<p class="text-sm text-[#5a5a5a] mb-4">The site may be temporarily unavailable</p>
								<div class="flex gap-3 justify-center">
									<button
										onclick={retryDentalIframe}
										class="px-4 py-2 bg-[#4a7c59] text-white text-sm font-medium hover:bg-[#3d6a4a] transition-colors rounded"
									>
										Try Again
									</button>
									<a
										href={pearlDental?.liveUrl ?? 'https://pearl-dental.vercel.app'}
										target="_blank"
										rel="noopener noreferrer"
										class="px-4 py-2 border border-[#4a7c59] text-[#4a7c59] text-sm font-medium hover:bg-[#4a7c59]/5 transition-colors rounded"
									>
										Open in New Tab
									</a>
								</div>
							</div>
						</div>
					{:else}
						{#if !dentistIframeLoaded}
							<div class="absolute inset-0 flex items-center justify-center bg-[#faf7f2] dark:bg-surface-1 z-10">
								<div class="text-center">
									<div class="w-8 h-8 border-3 border-[#4a7c59]/20 border-t-[#4a7c59] rounded-full animate-spin mx-auto mb-3"></div>
									<p class="text-sm text-[#5a5a5a]">Loading preview...</p>
								</div>
							</div>
						{/if}
						<iframe
							src={pearlDental?.liveUrl ?? 'https://pearl-dental.vercel.app'}
							title="Pearl Dental Live Preview"
							class="w-full h-full border-0"
							onload={handleDentalIframeLoad}
						></iframe>
					{/if}
				</div>
			</div>
		</InView>
	</Container>
</section>
</div>
{/if}

<!-- ═══════════════════════════════════════════════════════════════════════════
     DESIGNS BY JOE SECTION
     ═══════════════════════════════════════════════════════════════════════════ -->
{#if activeFilter === 'client'}
<div class="animate-fade-in">
<section class="relative py-20 lg:py-32 overflow-hidden">
	<!-- Dark background with accent glows -->
	<div class="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#172554]"></div>
	<!-- Subtle gold glow top-left -->
	<div class="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#c9a227]/10 rounded-full blur-3xl"></div>
	<!-- Blue glow bottom-right -->
	<div class="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-[#3b82f6]/15 rounded-full blur-3xl"></div>
	<!-- Subtle grid pattern -->
	<div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 50px 50px;"></div>

	<Container class="relative">
		<!-- Project Number & Title Header - FLIPPED from Pearl (title LEFT, number RIGHT) -->
		<div class="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16 gap-4">
			<div class="text-left pb-6 flex-1">
				<Badge class="mb-3 bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/30">Fan Art & Illustration</Badge>
				<h2 class="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight gradient-text-joe pb-4">Designs by Joe</h2>
				<p class="mt-2 text-lg text-[#c9a227] font-medium">Fan art for the fans</p>
			</div>
			<div class="hidden lg:block flex-shrink-0">
				<span class="text-[120px] lg:text-[160px] font-bold leading-none text-[#3b82f6]/25 select-none">02</span>
			</div>
		</div>

		<!-- Grid layout - FLIPPED: Circles LEFT, Screenshot RIGHT -->
		<div class="grid grid-cols-12 gap-6 lg:gap-8 items-center">
			<!-- Circular cards column - LEFT (desktop only) -->
			<div class="hidden lg:flex lg:col-span-2 flex-col items-center gap-6">
				<!-- Tech circle -->
				<div class="w-28 h-28 rounded-full bg-[#3b82f6] shadow-xl flex flex-col items-center justify-center text-center p-4 hover:scale-105 transition-transform">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/80 mb-1"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
					<span class="text-[9px] text-white/70 uppercase tracking-wider">Built With</span>
					<span class="text-xs text-white font-medium">SvelteKit</span>
				</div>

				<!-- Artworks circle -->
				<div class="w-24 h-24 rounded-full bg-[#c9a227] shadow-xl flex flex-col items-center justify-center text-center p-3 hover:scale-105 transition-transform -ml-6">
					<span class="text-xl font-bold text-white">200+</span>
					<span class="text-[9px] text-white/70 uppercase tracking-wider">Artworks</span>
				</div>

				<!-- Year circle -->
				<div class="w-16 h-16 rounded-full bg-slate-700/80 shadow-lg border border-[#c9a227]/30 flex flex-col items-center justify-center hover:scale-105 transition-transform -ml-4">
					<span class="text-sm font-bold text-[#c9a227]">2025</span>
				</div>
			</div>

			<!-- Main Screenshot - spans 10 columns on desktop -->
			<div class="col-span-12 lg:col-span-10 relative">
				<div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
					<img
						src="/images/projects/joe-screenshot-light.png"
						alt="Designs by Joe Homepage"
						loading="lazy"
						class="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-[#1e293b]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
				</div>
			</div>
		</div>

		<!-- Mobile: horizontal scrolling circles -->
		<div class="flex lg:hidden gap-3 mt-6 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
			<div class="flex-shrink-0 w-24 h-24 rounded-full bg-[#3b82f6] shadow-lg flex flex-col items-center justify-center text-center p-3">
				<span class="text-[10px] text-white/70 uppercase tracking-wider">Built With</span>
				<span class="text-sm text-white font-medium">SvelteKit</span>
			</div>
			<div class="flex-shrink-0 w-24 h-24 rounded-full bg-[#c9a227] shadow-lg flex flex-col items-center justify-center text-center p-3">
				<span class="text-xl font-bold text-white">200+</span>
				<span class="text-[9px] text-white/70 uppercase">Artworks</span>
			</div>
			<div class="flex-shrink-0 w-24 h-24 rounded-full bg-slate-700/80 shadow-lg border border-[#c9a227]/30 flex flex-col items-center justify-center text-center p-3">
				<span class="text-xl font-bold text-[#c9a227]">2025</span>
				<span class="text-[8px] text-slate-300 uppercase">Year</span>
			</div>
		</div>

		<!-- Project Description - Challenge & Solution -->
		<div class="mt-20 lg:mt-28">
			<div class="grid lg:grid-cols-2 gap-8 lg:gap-16">
				<!-- The Challenge -->
				<div class="bg-white/5 backdrop-blur-sm p-8 lg:p-10 rounded-2xl border border-white/10">
					<div class="flex items-center gap-3 mb-4">
						<div class="w-10 h-10 rounded-full bg-[#3b82f6]/20 flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#3b82f6]"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
						</div>
						<h3 class="text-lg font-bold text-white">The Challenge</h3>
					</div>
					<p class="text-slate-300 leading-relaxed">
						Joe needed a bold, eye-catching portfolio to showcase 200+ artworks and attract commission clients from various fandoms. The site needed to feel premium while staying true to the creative, fan-driven nature of the work.
					</p>
				</div>

				<!-- The Solution -->
				<div class="bg-white/5 backdrop-blur-sm p-8 lg:p-10 rounded-2xl border border-white/10">
					<div class="flex items-center gap-3 mb-4">
						<div class="w-10 h-10 rounded-full bg-[#c9a227]/20 flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#c9a227]"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
						</div>
						<h3 class="text-lg font-bold text-white">The Solution</h3>
					</div>
					<p class="text-slate-300 leading-relaxed">
						I designed a dark, immersive portfolio with smooth animations that puts the artwork front and center. The layout features a striking hero section and intuitive navigation between portfolio pieces and commission information.
					</p>
				</div>
			</div>
		</div>

		<!-- Testimonial Quote -->
		<div class="mt-16 lg:mt-20 relative">
			<div class="max-w-3xl mx-auto text-center">
				<p class="text-2xl lg:text-3xl font-light text-white leading-relaxed italic">
					<span class="text-[#c9a227] font-serif text-4xl">"</span>Onur did an excellent job on my website. He was great to communicate with and <span class="font-semibold text-[#3b82f6] not-italic">delivered on every point</span> needed for my website.<span class="text-[#c9a227] font-serif text-4xl">"</span>
				</p>
				<!-- Author -->
				<div class="mt-8 flex items-center justify-center gap-4">
					<div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a227] to-[#a68a1f] flex items-center justify-center text-white font-bold text-lg">J</div>
					<div class="text-left">
						<p class="text-[#c9a227] font-semibold">Joe</p>
						<p class="text-sm text-slate-400">Fan Artist & Illustrator</p>
					</div>
				</div>
				<!-- Decorative line -->
				<div class="mt-8 flex items-center justify-center gap-3">
					<div class="w-12 h-[2px] bg-[#3b82f6]"></div>
					<div class="w-2 h-2 bg-[#c9a227] rounded-full"></div>
					<div class="w-12 h-[2px] bg-[#3b82f6]"></div>
				</div>
			</div>
		</div>

		<!-- Interactive Preview Section -->
		<InView animation="fade-up" class="mt-20 lg:mt-28 -mx-4 lg:-mx-16 xl:-mx-24">
			<div class="text-center mb-10 px-4 lg:px-16 xl:px-24">
				<p class="text-sm font-medium text-[#3b82f6] tracking-widest uppercase mb-2">Interactive Preview</p>
				<h3 class="text-2xl lg:text-3xl font-bold text-white">Experience it live</h3>
			</div>

			<div class="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-800 border border-white/10 mx-4 lg:mx-8">
				<div class="bg-slate-700 px-4 py-3 flex items-center gap-3 border-b border-white/10">
					<div class="flex gap-1.5">
						<div class="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
						<div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
						<div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
					</div>
					<div class="flex-1 flex justify-center">
						<span class="text-sm text-slate-300">{designsByJoe?.liveUrl?.replace('https://', '') ?? 'designsbyjoe.net'}</span>
					</div>
				</div>

				<div class="relative bg-slate-800" style="height: 75vh; min-height: 600px; max-height: 900px;">
					{#if !loadJoeIframe}
						<div class="absolute inset-0 flex items-center justify-center">
							<div class="text-center">
								<img src="/images/projects/joe-screenshot-light.png" alt="Designs by Joe Preview" loading="lazy" class="w-full h-full object-cover object-top absolute inset-0 opacity-30" />
								<div class="relative z-10">
									<button
										onclick={startJoeIframeLoad}
										class="px-6 py-3 bg-[#3b82f6] text-white rounded-xl font-medium hover:bg-[#2563eb] transition-colors shadow-lg"
									>
										Load Interactive Demo
									</button>
									<p class="mt-3 text-sm text-slate-300">Click to load the live site</p>
								</div>
							</div>
						</div>
					{:else if joeIframeError}
						<div class="absolute inset-0 flex items-center justify-center bg-slate-800 z-10">
							<div class="text-center p-6">
								<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-[#c9a227]">
									<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>
								</svg>
								<p class="text-white font-medium mb-2">Unable to load preview</p>
								<p class="text-sm text-slate-400 mb-4">The site may be temporarily unavailable</p>
								<div class="flex gap-3 justify-center">
									<button
										onclick={retryJoeIframe}
										class="px-4 py-2 bg-[#3b82f6] text-white text-sm font-medium hover:bg-[#2563eb] transition-colors rounded"
									>
										Try Again
									</button>
									<a
										href={designsByJoe?.liveUrl ?? 'https://designsbyjoe.net'}
										target="_blank"
										rel="noopener noreferrer"
										class="px-4 py-2 border border-[#3b82f6] text-[#3b82f6] text-sm font-medium hover:bg-[#3b82f6]/10 transition-colors rounded"
									>
										Open in New Tab
									</a>
								</div>
							</div>
						</div>
					{:else}
						{#if !joeIframeLoaded}
							<div class="absolute inset-0 flex items-center justify-center bg-slate-800 z-10">
								<div class="text-center">
									<div class="w-8 h-8 border-3 border-[#3b82f6]/20 border-t-[#3b82f6] rounded-full animate-spin mx-auto mb-3"></div>
									<p class="text-sm text-slate-300">Loading preview...</p>
								</div>
							</div>
						{/if}
						<iframe
							src={designsByJoe?.liveUrl ?? 'https://designsbyjoe.net'}
							title="Designs by Joe Live Preview"
							class="w-full h-full border-0"
							onload={handleJoeIframeLoad}
						></iframe>
					{/if}
				</div>
			</div>
		</InView>
	</Container>
</section>
</div>
{/if}

<!-- ═══════════════════════════════════════════════════════════════════════════
     CTA SECTION
     ═══════════════════════════════════════════════════════════════════════════ -->
<Section padding="lg" class="relative overflow-hidden">
	<Container size="content">
		<InView animation="fade-up" class="text-center">
			<span class="text-[80px] lg:text-[120px] font-bold leading-none text-primary/10 dark:text-primary/20 select-none">03</span>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl -mt-8">
				Have a project in mind?
			</h2>
			<p class="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
				I'd love to hear about it and explore how we can bring your vision to life together.
			</p>
			<div class="mt-10 flex items-center justify-center gap-3">
				<div class="w-16 h-[2px] bg-primary/30"></div>
				<div class="w-3 h-3 bg-primary rounded-full"></div>
				<div class="w-16 h-[2px] bg-primary/30"></div>
			</div>
		</InView>
	</Container>
</Section>
