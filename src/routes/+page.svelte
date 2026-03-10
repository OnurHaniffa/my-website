<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Container, Section } from '$lib/components/layout';
	import { Counter } from '$lib/components/ui/animations';
	import { sanitizeSvgContent } from '$lib/utils/sanitize';
	import { t, getLocalePath } from '$lib/i18n/index.svelte';

	let { data } = $props();

	// Use CMS data with fallbacks
	const projects = data.projects;
	const settings = data.siteSettings;

	const fallbackServices = $derived([
		{
			id: 1, sort: 1,
			title: t('home.service_1_title'),
			description: t('home.service_1_desc'),
			icon: '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>',
			features: [t('home.service_1_f1'), t('home.service_1_f2'), t('home.service_1_f3')],
			color_class: 'primary'
		},
		{
			id: 2, sort: 2,
			title: t('home.service_2_title'),
			description: t('home.service_2_desc'),
			icon: '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
			features: [t('home.service_2_f1'), t('home.service_2_f2'), t('home.service_2_f3')],
			color_class: 'accent'
		},
		{
			id: 3, sort: 3,
			title: t('home.service_3_title'),
			description: t('home.service_3_desc'),
			icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
			features: [t('home.service_3_f1'), t('home.service_3_f2'), t('home.service_3_f3')],
			color_class: 'green'
		}
	]);

	const services = $derived(data.services?.length ? data.services : fallbackServices);

	const serviceColorMap: Record<string, { shadow: string; ring: string; iconBg: string; iconHover: string; iconText: string; check: string }> = {
		primary: { shadow: 'hover:shadow-primary/25', ring: 'hover:ring-primary/40', iconBg: 'bg-primary/10', iconHover: 'group-hover:bg-primary group-hover:text-primary-foreground', iconText: 'text-primary group-hover:text-white', check: 'text-primary' },
		accent: { shadow: 'hover:shadow-accent/25', ring: 'hover:ring-accent/40', iconBg: 'bg-accent/10', iconHover: 'group-hover:bg-accent group-hover:text-accent-foreground', iconText: 'text-accent group-hover:text-white', check: 'text-accent' },
		green: { shadow: 'hover:shadow-green-500/25', ring: 'hover:ring-green-500/40', iconBg: 'bg-green-500/10 dark:bg-green-500/20', iconHover: 'group-hover:bg-green-500 group-hover:text-white', iconText: 'text-green-600 dark:text-green-400 group-hover:text-white', check: 'text-green-600 dark:text-green-400' }
	};
	const defaultServiceColor = serviceColorMap.primary;

	const fallbackWhyMePoints = $derived([
		{
			id: 1, sort: 1,
			title: t('home.why_1_title'),
			description: t('home.why_1_desc'),
			icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
			color_class: 'primary'
		},
		{
			id: 2, sort: 2,
			title: t('home.why_2_title'),
			description: t('home.why_2_desc'),
			icon: '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
			color_class: 'accent'
		},
		{
			id: 3, sort: 3,
			title: t('home.why_3_title'),
			description: t('home.why_3_desc'),
			icon: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
			color_class: 'primary'
		},
		{
			id: 4, sort: 4,
			title: t('home.why_4_title'),
			description: t('home.why_4_desc'),
			icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
			color_class: 'green'
		}
	]);

	const whyMePoints = $derived(data.whyMePoints?.length ? data.whyMePoints : fallbackWhyMePoints);

	const whyMeColorMap: Record<string, { ring: string; iconBg: string; iconHover: string; iconText: string }> = {
		primary: { ring: 'dark:hover:ring-primary/30 dark:hover:shadow-primary/20', iconBg: 'bg-primary/10 dark:bg-primary/20', iconHover: 'group-hover:bg-primary group-hover:text-primary-foreground', iconText: 'text-primary group-hover:text-inherit' },
		accent: { ring: 'dark:hover:ring-accent/30 dark:hover:shadow-accent/20', iconBg: 'bg-accent/10 dark:bg-accent/20', iconHover: 'group-hover:bg-accent group-hover:text-accent-foreground', iconText: 'text-accent group-hover:text-inherit' },
		green: { ring: 'dark:hover:ring-green-500/30 dark:hover:shadow-green-500/20', iconBg: 'bg-green-500/10 dark:bg-green-500/20', iconHover: 'group-hover:bg-green-500 group-hover:text-white', iconText: 'text-green-600 dark:text-green-400 group-hover:text-white' }
	};
	const defaultWhyMeColor = whyMeColorMap.primary;

	let heroContent: HTMLDivElement;
	let heroMockup: HTMLDivElement;
	let curlyLine: SVGSVGElement;
	let servicesSection: HTMLDivElement;
	let serviceCards: HTMLDivElement;
	let projectsSection: HTMLDivElement;
	let whyMeSection: HTMLDivElement;

	onMount(() => {
		// Check for reduced motion preference
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Skip animations if reduced motion is preferred or elements don't exist
		if (prefersReducedMotion || !heroContent || !heroMockup || !curlyLine) {
			return () => {};
		}

		// Set initial states
		gsap.set([heroContent, heroMockup], { opacity: 0, y: 30 });
		gsap.set(curlyLine, { opacity: 0 });

		// Hero timeline - staggered entrance
		const heroTl = gsap.timeline({ delay: 0.1 });

		const curlyPath = curlyLine.querySelector('path');

		heroTl
			.to(heroContent, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: 'power2.out'
			})
			.to(heroMockup, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: 'power2.out'
			}, '-=0.5')
			.to(curlyLine, {
				opacity: 1,
				duration: 0.3
			}, '-=0.3');

		if (curlyPath) {
			heroTl.fromTo(curlyPath,
				{ strokeDashoffset: 300 },
				{ strokeDashoffset: 0, duration: 4, ease: 'power2.out' },
				'-=0.2'
			);
		}

		// Scroll-triggered animations using IntersectionObserver (lighter than ScrollTrigger)
		const observerOptions = { threshold: 0.15, rootMargin: '0px' };

		const animateOnScroll = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const target = entry.target as HTMLElement;

					if (target === servicesSection) {
						gsap.fromTo(servicesSection.querySelector('.section-header'),
							{ opacity: 0, y: 40 },
							{ opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
						);
						gsap.fromTo(serviceCards?.children || [],
							{ opacity: 0, y: 50 },
							{ opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
						);
					}

					if (target === projectsSection) {
						gsap.fromTo(projectsSection.querySelector('.section-header'),
							{ opacity: 0, y: 40 },
							{ opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
						);
						gsap.fromTo(projectsSection.querySelectorAll('.project-card'),
							{ opacity: 0, y: 50 },
							{ opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.2 }
						);
					}

					if (target === whyMeSection) {
						gsap.fromTo(whyMeSection.querySelector('.section-header'),
							{ opacity: 0, y: 40 },
							{ opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
						);
						gsap.fromTo(whyMeSection.querySelectorAll('.why-card'),
							{ opacity: 0, y: 50 },
							{ opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
						);
					}

					observer.unobserve(target);
				}
			});
		};

		const scrollObserver = new IntersectionObserver(animateOnScroll, observerOptions);

		// Set initial states for scroll sections
		if (servicesSection) {
			gsap.set(servicesSection.querySelector('.section-header'), { opacity: 0 });
			gsap.set(serviceCards?.children || [], { opacity: 0 });
			scrollObserver.observe(servicesSection);
		}
		if (projectsSection) {
			gsap.set(projectsSection.querySelector('.section-header'), { opacity: 0 });
			gsap.set(projectsSection.querySelectorAll('.project-card'), { opacity: 0 });
			scrollObserver.observe(projectsSection);
		}
		if (whyMeSection) {
			gsap.set(whyMeSection.querySelector('.section-header'), { opacity: 0 });
			gsap.set(whyMeSection.querySelectorAll('.why-card'), { opacity: 0 });
			scrollObserver.observe(whyMeSection);
		}

		return () => {
			scrollObserver.disconnect();
			heroTl.kill();
		};
	});
</script>

<svelte:head>
	<title>{settings?.site_title ?? t('home.meta_title')}</title>
	<meta name="description" content={settings?.site_description ?? t('home.meta_description')} />
	<meta property="og:title" content={settings?.site_title ?? t('home.meta_title')} />
	<meta property="og:description" content={settings?.site_description ?? t('home.og_description')} />
	<meta name="twitter:title" content={settings?.site_title ?? t('home.meta_title')} />
	<meta name="twitter:description" content={settings?.site_description ?? t('home.og_description')} />
</svelte:head>

<!-- Hero Section -->
<Section padding="none" class="relative overflow-hidden">
	<!-- BIG BOLD GLOW - prominent ambient effect -->
	<div class="absolute inset-0 -z-10">
		<div class="absolute inset-0 bg-gradient-to-br from-background via-background to-muted"></div>
		<!-- MAIN GLOW - Big red presence in corner -->
		<div class="absolute -top-[100px] -right-[100px] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:-top-[200px] lg:-right-[200px] lg:w-[1000px] lg:h-[1000px] hero-glow-main"></div>
		<!-- Secondary blue glow - bottom left -->
		<div class="absolute -bottom-[150px] -left-[150px] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:-bottom-[300px] lg:-left-[300px] lg:w-[900px] lg:h-[900px] hero-glow-blue"></div>
		<!-- Center ambient fill -->
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] sm:w-[800px] sm:h-[600px] lg:w-[1200px] lg:h-[800px] hero-glow-center"></div>
		<!-- Subtle grain texture -->
		<div class="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] pointer-events-none mix-blend-overlay"
			style="background-image: url('data:image/svg+xml,%3Csvg viewBox=&apos;0 0 400 400&apos; xmlns=&apos;http://www.w3.org/2000/svg&apos;%3E%3Cfilter id=&apos;noise&apos;%3E%3CfeTurbulence type=&apos;fractalNoise&apos; baseFrequency=&apos;0.9&apos; numOctaves=&apos;4&apos; /%3E%3C/filter%3E%3Crect width=&apos;100%25&apos; height=&apos;100%25&apos; filter=&apos;url(%23noise)&apos; /%3E%3C/svg%3E');"></div>
	</div>

	<!-- Decorative circles - hidden on mobile -->
	<div aria-hidden="true" class="hidden lg:block absolute top-20 right-[10%] w-72 h-72 rounded-full border border-primary/10 pointer-events-none"></div>
	<div aria-hidden="true" class="hidden lg:block absolute top-40 right-[15%] w-48 h-48 rounded-full border border-accent/10 pointer-events-none"></div>
	<div aria-hidden="true" class="hidden lg:block absolute bottom-20 left-[5%] w-64 h-64 rounded-full border border-primary/5 pointer-events-none"></div>
	<div aria-hidden="true" class="hidden lg:block absolute -bottom-20 right-[20%] w-96 h-96 rounded-full bg-primary/[0.03] pointer-events-none"></div>

	<Container class="relative pt-6 pb-10 lg:pt-10 lg:pb-14">
		<div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
			<!-- Left Content -->
			<div bind:this={heroContent} class="space-y-3 sm:space-y-4">
				<Badge variant="outline" class="border-primary/40 text-primary bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
					<span class="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
					{settings?.hero_badge_text ?? t('home.hero_badge')}
				</Badge>

				<!-- Headline with animated underline -->
				<div class="relative">
					<h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15]">
						{t('home.hero_pre')} <span class="relative inline-block pb-2">{t('home.hero_highlight_prefix')}<span class="text-primary">{settings?.hero_highlight_word ?? t('home.hero_highlight')}</span>
							<!-- Curly underline -->
							<svg bind:this={curlyLine} class="absolute bottom-0 left-0 w-full h-3" viewBox="0 0 200 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
								<path
									d="M0 12 Q 25 2, 50 12 T 100 12 T 150 12 T 200 12"
									stroke="currentColor"
									stroke-width="4"
									stroke-linecap="round"
									class="text-primary"
									fill="none"
									style="stroke-dasharray: 300; stroke-dashoffset: 300;"
								/>
							</svg>
						</span> {t('home.hero_post')}
					</h1>
				</div>

				<!-- Description -->
				<p class="text-lg text-muted-foreground/90 max-w-md leading-relaxed">
					{settings?.hero_description ?? t('home.hero_description')}
				</p>

				<!-- Quick Stats -->
				<div class="flex flex-wrap gap-6 sm:gap-8 py-2">
					<div class="text-center">
						<p class="text-3xl font-bold text-primary">&le;<Counter value={24} duration={2500} suffix={t('home.stat_1_suffix')} /></p>
						<p class="text-sm text-muted-foreground">{settings?.stat_1_label ?? t('home.stat_1_label')}</p>
					</div>
					<div class="hidden sm:block w-px bg-border"></div>
					<div class="text-center">
						<p class="text-3xl font-bold"><Counter value={2} duration={1800} />&ndash;<Counter value={3} duration={2200} delay={300} /> {t('home.stat_2_suffix')}</p>
						<p class="text-sm text-muted-foreground">{settings?.stat_2_label ?? t('home.stat_2_label')}</p>
					</div>
					<div class="hidden sm:block w-px bg-border"></div>
					<div class="text-center">
						<p class="text-3xl font-bold text-green-600 dark:text-green-400">{settings?.stat_3_value ?? t('home.stat_3_value')}</p>
						<p class="text-sm text-muted-foreground">{settings?.stat_3_label ?? t('home.stat_3_label')}</p>
					</div>
				</div>

				<div class="flex flex-wrap gap-4">
					<Button size="lg" href={getLocalePath('/work')} class="group text-sm px-8 py-5 rounded-full shadow-2xl shadow-primary/40 hover:shadow-[0_20px_50px_-10px] hover:shadow-primary/50 hover:scale-[1.02] font-semibold focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none transition-all duration-300">
						{settings?.view_work_button ?? t('home.view_work')}
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
					</Button>
					<Button size="lg" variant="ghost" href={getLocalePath('/contact')} class="text-sm px-6 py-5 rounded-full border border-border/60 hover:bg-foreground/5 hover:border-foreground/30 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none transition-colors duration-300">
						{settings?.lets_talk_button ?? t('home.lets_talk')}
					</Button>
				</div>
			</div>

			<!-- Generic Website Demo Mockup -->
			<div bind:this={heroMockup} class="relative">
				<!-- Browser mockup -->
				<div class="relative bg-card rounded-2xl shadow-2xl border-2 border-border/50 overflow-hidden">
					<!-- Browser header -->
					<div class="flex items-center gap-2 px-4 py-3 bg-muted/80 border-b">
						<div class="flex gap-1.5">
							<div class="w-3 h-3 rounded-full bg-rose-400"></div>
							<div class="w-3 h-3 rounded-full bg-amber-400"></div>
							<div class="w-3 h-3 rounded-full bg-emerald-400"></div>
						</div>
						<div class="flex-1 mx-4">
							<div class="bg-background/80 rounded-lg px-4 py-1.5 text-sm text-muted-foreground flex items-center gap-2 border">
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
								yourwebsite.com
							</div>
						</div>
					</div>

					<!-- Hero image website demo -->
					<div class="aspect-[4/3] relative overflow-hidden">
						<img
							src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=450&fit=crop&q=50&fm=webp"
							alt="Professional website design mockup showing a modern business website"
							fetchpriority="high"
							width="600"
							height="450"
							class="absolute inset-0 w-full h-full object-cover"
						/>
						<div class="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/70 to-stone-900/50"></div>

						<div class="relative h-full p-6 flex flex-col">
							<div class="flex items-center justify-between mb-auto">
								<div class="flex items-center gap-2">
									<div class="w-6 h-6 rounded bg-white/20"></div>
									<span class="text-[10px] text-white/90 font-semibold">YourBrand</span>
								</div>
								<div class="flex gap-4">
									<span class="text-[8px] text-white/60">Home</span>
									<span class="text-[8px] text-white/60">Services</span>
									<span class="text-[8px] text-white/60">About</span>
									<span class="text-[8px] text-white/90 font-medium">Contact</span>
								</div>
							</div>

							<div class="flex-1 flex flex-col justify-center max-w-[70%]">
								<p class="text-[8px] text-amber-400 font-medium uppercase tracking-wider mb-2">Your Tagline Here</p>
								<h2 class="text-white text-lg sm:text-xl font-bold leading-tight mb-3">
									Your headline goes here
								</h2>
								<p class="text-[9px] text-white/70 leading-relaxed mb-4">
									This is where your compelling description would go. A few lines about what makes your business special.
								</p>
								<div class="flex gap-2">
									<div class="px-3 py-1.5 bg-amber-500 rounded text-[8px] text-stone-900 font-semibold">Get Started</div>
									<div class="px-3 py-1.5 border border-white/30 rounded text-[8px] text-white/90">Learn More</div>
								</div>
							</div>

							<div class="flex gap-6 pt-4 border-t border-white/10 mt-auto">
								<div>
									<p class="text-white text-sm font-bold">5.0</p>
									<p class="text-[7px] text-white/50">Client Rating</p>
								</div>
								<div>
									<p class="text-white text-sm font-bold">Fast</p>
									<p class="text-[7px] text-white/50">Delivery</p>
								</div>
								<div>
									<p class="text-white text-sm font-bold">24/7</p>
									<p class="text-[7px] text-white/50">Support</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Phone mockup -->
				<div class="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 lg:-bottom-8 lg:-right-8">
					<div class="bg-zinc-900 rounded-[2rem] shadow-2xl p-1.5 w-24 lg:w-32 relative">
						<div class="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-zinc-700/50 via-transparent to-zinc-800/50 pointer-events-none"></div>
						<div class="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-zinc-800 rounded-full z-10"></div>
						<div class="rounded-[1.5rem] aspect-[9/16] relative overflow-hidden">
							<img
								src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=150&h=260&fit=crop&q=40&fm=webp"
								alt="Mobile responsive website design preview"
								loading="lazy"
								width="150"
								height="260"
								class="absolute inset-0 w-full h-full object-cover"
							/>
							<div class="absolute inset-0 bg-gradient-to-b from-stone-900/90 via-stone-900/70 to-stone-900/90"></div>
							<div class="relative h-full p-3 flex flex-col">
								<div class="flex items-center gap-1 mb-3">
									<div class="w-3 h-3 rounded bg-white/20"></div>
									<span class="text-[6px] text-white/90 font-semibold">YourBrand</span>
								</div>
								<div class="flex-1 flex flex-col justify-center">
									<p class="text-[5px] text-amber-400 font-medium uppercase mb-1">Tagline</p>
									<p class="text-[8px] text-white font-bold leading-tight mb-2">Your headline goes here</p>
									<div class="w-12 h-4 bg-amber-500 rounded flex items-center justify-center">
										<span class="text-[5px] text-stone-900 font-semibold">Get Started</span>
									</div>
								</div>
							</div>
						</div>
						<div class="absolute -right-0.5 top-20 w-0.5 h-8 bg-zinc-700 rounded-l"></div>
						<div class="absolute -left-0.5 top-16 w-0.5 h-5 bg-zinc-700 rounded-r"></div>
						<div class="absolute -left-0.5 top-24 w-0.5 h-5 bg-zinc-700 rounded-r"></div>
					</div>
				</div>
			</div>
		</div>
	</Container>
</Section>

<!-- Subtle section separator -->
<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- Services Section -->
<Section padding="lg" background="muted">
	<Container>
		<div bind:this={servicesSection}>
			<div class="text-center max-w-2xl mx-auto mb-16 pt-10 lg:pt-14 section-header">
				<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">{settings?.services_badge ?? t('home.services_badge')}</Badge>
				<h2 class="text-4xl font-bold tracking-tight sm:text-5xl">
					{settings?.services_section_title ?? t('home.services_title')}
				</h2>
				<p class="mt-4 text-lg text-muted-foreground">
					{settings?.services_section_subtitle ?? t('home.services_subtitle')}
				</p>
			</div>

			<div bind:this={serviceCards} class="grid gap-8 md:grid-cols-3">
				{#each services as service, index}
					{@const colors = serviceColorMap[service.color_class] ?? defaultServiceColor}
					<Card class="group h-full border-0 bg-card hover:shadow-[0_25px_60px_-20px] {colors.shadow} hover:-translate-y-2 rounded-2xl transition-all duration-500 ring-1 ring-border/50 {colors.ring}">
						<CardHeader>
							<div class="w-14 h-14 rounded-2xl {colors.iconBg} flex items-center justify-center mb-4 {colors.iconHover} transition-all duration-300">
								<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="{colors.iconText} transition-colors duration-300">{@html sanitizeSvgContent(service.icon)}</svg>
							</div>
							<CardTitle class="text-xl">{service.title}</CardTitle>
							<CardDescription class="text-base">{service.description}</CardDescription>
						</CardHeader>
						<CardContent>
							<ul class="space-y-2 text-sm text-muted-foreground">
								{#each (service.features ?? []) as feature}
									<li class="flex items-center gap-2">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="{colors.check}"><path d="M20 6 9 17l-5-5"/></svg>
										{feature}
									</li>
								{/each}
							</ul>
						</CardContent>
					</Card>
				{/each}
			</div>

			<div class="mt-12 text-center">
				<Button variant="outline" href={getLocalePath('/services')} class="group px-8 py-6 rounded-full text-base border-2 hover:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none">
					{settings?.explore_services_button ?? t('home.explore_services')}
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
				</Button>
			</div>
		</div>
	</Container>
</Section>

<!-- Subtle section separator -->
<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- Featured Work Section -->
<Section padding="lg" class="relative">
	<Container>
		<div bind:this={projectsSection}>
			<div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 pt-10 lg:pt-14 section-header">
				<div>
					<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">{settings?.portfolio_badge ?? t('home.portfolio_badge')}</Badge>
					<h2 class="text-4xl font-bold tracking-tight sm:text-5xl">
						{settings?.portfolio_section_title ?? t('home.portfolio_title')}
					</h2>
					<p class="mt-4 text-lg text-muted-foreground">
						{settings?.portfolio_section_subtitle ?? t('home.portfolio_subtitle')}
					</p>
				</div>
				<Button variant="outline" href={getLocalePath('/work')} class="group px-6 py-5 rounded-full border-2 hover:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none">
					{settings?.view_all_work_button ?? t('home.view_all_work')}
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
				</Button>
			</div>

			<div class="grid gap-8 md:grid-cols-2">
				{#each projects as project, index}
					<a href="{getLocalePath('/work')}?filter={index === 0 ? 'client' : 'concept'}" class="group block project-card focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:rounded-2xl">
						<Card class="overflow-hidden border border-border/30 shadow-lg hover:shadow-2xl hover:-translate-y-1 rounded-2xl transition-all duration-500
							{index === 0
								? 'hover:border-amber-500/40 bg-gradient-to-b from-slate-900/5 to-transparent dark:from-slate-800/20'
								: 'hover:border-orange-400/50 bg-gradient-to-b from-orange-50/50 to-transparent dark:from-orange-950/20'}">
							<div class="relative aspect-[16/10] overflow-hidden {index === 0 ? 'bg-slate-900' : 'bg-orange-50'}">
								<img
									src={index === 0 ? '/images/projects/joe-screenshot-light.png' : '/images/projects/dentist-screenshot.jpg'}
									loading="lazy"
									alt={project.title}
									class="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
								/>

								<div class="absolute top-4 left-4 z-10">
									{#if project.isClientWork}
										<Badge class="{index === 0 ? 'bg-amber-500/90' : 'bg-green-500/90'} text-white shadow-lg">
											<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-1"><path d="M20 6 9 17l-5-5"/></svg>
											{t('home.client_work')}
										</Badge>
									{:else}
										<Badge class="{index === 0 ? 'bg-slate-800/90 text-amber-400' : 'bg-white/90 text-orange-600'} shadow-lg">
											{t('home.demo_project')}
										</Badge>
									{/if}
								</div>

								{#if project.liveUrl}
									<div class="absolute top-4 right-4 z-10">
										<div class="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm shadow-lg
											{index === 0 ? 'bg-slate-800/90 text-white' : 'bg-white/90 text-gray-700'}">
											<span class="w-2 h-2 {index === 0 ? 'bg-amber-400' : 'bg-green-500'} rounded-full"></span>
											{t('home.live')}
										</div>
									</div>
								{/if}

								<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6
									{index === 0 ? 'bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent' : 'bg-gradient-to-t from-orange-900/80 via-transparent to-transparent'}">
									<span class="px-4 py-2 rounded-full text-sm font-medium shadow-lg
										{index === 0 ? 'bg-amber-500 text-slate-900' : 'bg-orange-500 text-white'}">
										{t('home.view_project')}
									</span>
								</div>
							</div>

							<CardContent class="p-6">
								<div class="flex items-start justify-between gap-4">
									<div class="space-y-2">
										<div class="flex items-center gap-2">
											<Badge variant="outline" class="text-xs {index === 0 ? 'border-amber-500/50 text-amber-600 dark:text-amber-400' : 'border-orange-400/50 text-orange-600 dark:text-orange-400'}">{project.industry}</Badge>
											<span class="text-xs text-muted-foreground">{project.year}</span>
										</div>
										<h3 class="text-xl font-bold {index === 0 ? 'group-hover:text-amber-500' : 'group-hover:text-orange-500'} transition-colors">{project.title}</h3>
										<p class="text-muted-foreground line-clamp-2">{project.tagline}</p>
									</div>
									<div class="flex-shrink-0 w-11 h-11 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300
										{index === 0
											? 'bg-amber-500/10 group-hover:bg-amber-500 group-hover:text-slate-900'
											: 'bg-orange-500/10 group-hover:bg-orange-500 group-hover:text-white'}">
										<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
									</div>
								</div>
							</CardContent>
						</Card>
					</a>
				{/each}
			</div>
		</div>
	</Container>
</Section>

<!-- CMS Source Indicator (proof of concept) -->
{#if data.isFromCms}
<div class="bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 text-center py-2 text-sm font-medium">
	Content loaded from Directus CMS
</div>
{/if}

<!-- Subtle section separator -->
<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- Why Choose Me Section -->
<Section padding="lg" background="muted">
	<Container>
		<div bind:this={whyMeSection}>
			<div class="text-center max-w-2xl mx-auto mb-16 pt-10 lg:pt-14 section-header">
				<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">{settings?.why_me_badge ?? t('home.why_me_badge')}</Badge>
				<h2 class="text-4xl font-bold tracking-tight sm:text-5xl">
					{settings?.why_me_section_title ?? t('home.why_me_title')}
				</h2>
				<p class="mt-4 text-lg text-muted-foreground">
					{settings?.why_me_section_subtitle ?? t('home.why_me_subtitle')}
				</p>
			</div>

			<div class="grid gap-6 sm:grid-cols-2">
				{#each whyMePoints as point, index}
					{@const colors = whyMeColorMap[point.color_class] ?? defaultWhyMeColor}
					<Card class="why-card group h-full border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:shadow-xl rounded-2xl transition-all duration-300 ring-1 ring-border/30 dark:bg-surface-1/50 dark:ring-border/40 {colors.ring} dark:hover:shadow-[0_0_30px_-5px]">
						<CardContent class="p-8">
							<div class="w-14 h-14 rounded-2xl {colors.iconBg} flex items-center justify-center mb-6 {colors.iconHover} transition-all duration-300">
								<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="{colors.iconText}">{@html sanitizeSvgContent(point.icon)}</svg>
							</div>
							<h3 class="text-xl font-bold mb-3">{point.title}</h3>
							<p class="text-muted-foreground">{point.description}</p>
						</CardContent>
					</Card>
				{/each}
			</div>

			<div class="mt-12 text-center">
				<Button href={getLocalePath('/about')} variant="outline" class="group px-8 py-6 rounded-full text-base border-2 hover:bg-foreground/5 hover:border-foreground/20 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none transition-colors duration-150">
					{settings?.learn_more_button ?? t('home.learn_more')}
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform duration-150 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
				</Button>
			</div>
		</div>
	</Container>
</Section>

<style>
	/* BIG BOLD GLOW EFFECTS - prominent presence */
	.hero-glow-main {
		background: radial-gradient(ellipse,
			hsl(0 85% 55% / 0.5) 0%,
			hsl(0 80% 50% / 0.35) 25%,
			hsl(0 75% 45% / 0.15) 50%,
			transparent 75%
		);
	}

	/* Dark mode: slightly more saturated, brighter accent */
	:global(.dark) .hero-glow-main {
		background: radial-gradient(ellipse,
			hsl(0 80% 50% / 0.6) 0%,
			hsl(0 75% 45% / 0.4) 25%,
			hsl(0 70% 40% / 0.2) 50%,
			transparent 75%
		);
	}

	.hero-glow-blue {
		background: radial-gradient(ellipse,
			hsl(220 90% 60% / 0.4) 0%,
			hsl(220 85% 55% / 0.25) 30%,
			hsl(220 80% 50% / 0.1) 55%,
			transparent 75%
		);
	}

	/* Dark mode: enhanced blue glow */
	:global(.dark) .hero-glow-blue {
		background: radial-gradient(ellipse,
			hsl(220 85% 55% / 0.5) 0%,
			hsl(220 80% 50% / 0.3) 30%,
			hsl(220 75% 45% / 0.15) 55%,
			transparent 75%
		);
	}

	.hero-glow-center {
		background: radial-gradient(ellipse,
			hsl(var(--primary) / 0.12) 0%,
			hsl(var(--primary) / 0.05) 40%,
			transparent 70%
		);
	}

	/* Dark mode: more visible center glow */
	:global(.dark) .hero-glow-center {
		background: radial-gradient(ellipse,
			oklch(0.68 0.18 260 / 0.2) 0%,
			oklch(0.68 0.18 260 / 0.08) 40%,
			transparent 70%
		);
	}

	/* Respect reduced motion */
	@media (prefers-reduced-motion: reduce) {
		:global(*) {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}
</style>
