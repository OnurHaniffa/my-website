<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { Button } from '$lib/components/ui/button';
	import { Container, Section } from '$lib/components/layout';
	import { t, getLocalePath } from '$lib/i18n/index.svelte';

	let { data } = $props();
	const ps = data.pageSettings;

	let heroSection: HTMLDivElement;
	let philosophySection: HTMLDivElement;
	let toolsSection: HTMLDivElement;
	let factsSection: HTMLDivElement;

	const fallbackPhilosophy = $derived([
		{
			number: '01',
			title: t('about.philosophy_1_title'),
			description: t('about.philosophy_1_desc'),
			gradient: 'from-primary/20 via-primary/5 to-transparent',
			accent: 'bg-primary',
			iconBg: 'bg-primary/10',
			icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
		},
		{
			number: '02',
			title: t('about.philosophy_2_title'),
			description: t('about.philosophy_2_desc'),
			gradient: 'from-accent/20 via-accent/5 to-transparent',
			accent: 'bg-accent',
			iconBg: 'bg-accent/10',
			icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z'
		},
		{
			number: '03',
			title: t('about.philosophy_3_title'),
			description: t('about.philosophy_3_desc'),
			gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
			accent: 'bg-emerald-500',
			iconBg: 'bg-emerald-500/10',
			icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10'
		}
	]);

	const philosophy = $derived(data.philosophyCards?.length
		? data.philosophyCards.map(c => ({
				number: c.number,
				title: c.title,
				description: c.description,
				gradient: c.gradient,
				accent: c.accent,
				iconBg: c.icon_bg,
				icon: c.icon
			}))
		: fallbackPhilosophy);

	const fallbackToolGroups = $derived([
		{
			label: t('about.build'),
			tools: [
				{ name: 'SvelteKit', badge: t('about.primary'), icon: 'svelte' },
				{ name: 'Svelte 5', icon: 'svelte' },
				{ name: 'TypeScript', icon: 'typescript' }
			]
		},
		{
			label: t('about.style'),
			tools: [
				{ name: 'Tailwind CSS', icon: 'tailwind' },
				{ name: 'shadcn/ui', icon: 'shadcn' },
				{ name: 'Figma', icon: 'figma' }
			]
		},
		{
			label: t('about.ship'),
			tools: [
				{ name: 'Vercel', icon: 'vercel' },
				{ name: 'Git', icon: 'git' }
			]
		}
	]);

	const toolGroups = $derived(data.toolGroups?.length
		? data.toolGroups.map(g => ({
				label: g.label,
				tools: g.tools
			}))
		: fallbackToolGroups);

	// SVG paths for tool icons (consistent stroke style)
	const toolIcons: Record<string, string> = {
		svelte: 'M18.12 2.29C15.66.17 11.86.53 9.81 2.93L5.43 8.16a7.36 7.36 0 0 0-1.56 5.68 6.1 6.1 0 0 0 .71 2.17 6.63 6.63 0 0 0-1 2.44 6.88 6.88 0 0 0 1.17 5.25c2.46 2.12 6.26 1.76 8.31-.64l4.38-5.23a7.36 7.36 0 0 0 1.56-5.68 6.1 6.1 0 0 0-.71-2.17 6.63 6.63 0 0 0 1-2.44 6.88 6.88 0 0 0-1.17-5.25z',
		typescript: 'M3 3h18v18H3V3zm10.5 9.5v6m0-6h3m-6 0h3m-4.5 0v6',
		tailwind: 'M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.11 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.48 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35.98 1 2.11 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35-.98-1-2.11-2.15-4.59-2.15z',
		shadcn: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
		figma: 'M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5zM12 2h3.5a3.5 3.5 0 1 1 0 7H12V2zm0 7h3.5a3.5 3.5 0 1 1 0 7H12v-7zm-7 7a3.5 3.5 0 0 1 3.5-3.5H12v3.5a3.5 3.5 0 1 1-7 0zM5 12a3.5 3.5 0 0 1 3.5-3.5H12v7H8.5A3.5 3.5 0 0 1 5 12z',
		vercel: 'M12 2L2 19.5h20L12 2z',
		git: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4'
	};

	const fallbackQuickFacts = $derived([
		{ icon: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Zm-8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', label: t('about.fact_1_label'), value: t('about.fact_1_value'), bg: 'bg-gradient-to-br from-blue-500/10 to-blue-500/5', color: 'text-blue-500', border: 'border-t-blue-500' },
		{ icon: 'M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm-6 7 3-3 2 2 4-4', label: t('about.fact_2_label'), value: t('about.fact_2_value'), bg: 'bg-gradient-to-br from-purple-500/10 to-purple-500/5', color: 'text-purple-500', border: 'border-t-purple-500' },
		{ icon: 'M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5', label: t('about.fact_3_label'), value: t('about.fact_3_value'), bg: 'bg-gradient-to-br from-orange-500/10 to-orange-500/5', color: 'text-orange-500', border: 'border-t-orange-500' },
		{ icon: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z', label: t('about.fact_4_label'), value: t('about.fact_4_value'), bg: 'bg-gradient-to-br from-indigo-500/10 to-indigo-500/5', color: 'text-indigo-500', border: 'border-t-indigo-500' },
		{ icon: 'M12 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 6v7m-5 4h10a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Z', label: t('about.fact_5_label'), value: t('about.fact_5_value'), bg: 'bg-gradient-to-br from-emerald-500/10 to-emerald-500/5', color: 'text-emerald-500', border: 'border-t-emerald-500' },
		{ icon: 'M22 10v6M2 10l10-5 10 5-10 5-10-5ZM6 12v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5M12 7v15', label: t('about.fact_6_label'), value: t('about.fact_6_value'), bg: 'bg-gradient-to-br from-rose-500/10 to-rose-500/5', color: 'text-rose-500', border: 'border-t-rose-500' }
	]);

	const quickFacts = $derived(data.quickFacts?.length ? data.quickFacts : fallbackQuickFacts);

	const fallbackAcademicRoles = $derived([
		{
			icon: 'M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 0 1-1.591.659H9.061a2.25 2.25 0 0 1-1.591-.659L5 14.5m14 0V17a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2.5',
			role: t('about.researcher'),
			place: t('about.bukemlab'),
			description: t('about.researcher_desc')
		},
		{
			icon: 'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25',
			role: t('about.teaching_assistant'),
			place: t('about.acibadem'),
			description: t('about.ta_desc')
		}
	]);

	const academicRoles = $derived(data.academicRoles?.length ? data.academicRoles : fallbackAcademicRoles);

	onMount(() => {
		// Check for reduced motion preference
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			return () => {};
		}

		// Hero animations with null safety
		const heroItems = heroSection?.querySelectorAll('.hero-item');
		if (heroItems && heroItems.length > 0) {
			gsap.set(heroItems, { opacity: 0, y: 40 });
			gsap.to(heroItems, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				stagger: 0.12,
				ease: 'power3.out',
				delay: 0.1
			});
		}

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const target = entry.target as HTMLElement;

					if (target === philosophySection) {
						const cards = philosophySection.querySelectorAll('.philosophy-card');
						if (cards.length > 0) {
							gsap.fromTo(cards,
								{ opacity: 0, y: 40, rotateX: -10 },
								{ opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
							);
						}
					}

					if (target === toolsSection) {
						const items = toolsSection.querySelectorAll('.tool-item');
						if (items.length > 0) {
							gsap.fromTo(items,
								{ opacity: 0, scale: 0.8 },
								{ opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.7)' }
							);
						}
					}

					if (target === factsSection) {
						const cards = factsSection.querySelectorAll('.fact-card');
						if (cards.length > 0) {
							gsap.fromTo(cards,
								{ opacity: 0, y: 30, scale: 0.95 },
								{ opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
							);
						}
					}

					observer.unobserve(target);
				}
			});
		}, { threshold: 0.15 });

		[philosophySection, toolsSection, factsSection].forEach(section => {
			if (section) {
				gsap.set(section.querySelectorAll('.philosophy-card, .tool-item, .fact-card'), { opacity: 0 });
				observer.observe(section);
			}
		});

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>{ps?.meta_title ?? t('about.meta_title')}</title>
	<meta name="description" content={ps?.meta_description ?? t('about.meta_description')} />
	<meta property="og:title" content={ps?.meta_title ?? t('about.meta_title')} />
	<meta property="og:description" content={ps?.meta_description ?? t('about.og_description')} />
	<meta name="twitter:title" content={ps?.meta_title ?? t('about.meta_title')} />
	<meta name="twitter:description" content={ps?.meta_description ?? t('about.og_description')} />
</svelte:head>

<!-- Hero -->
<Section padding="none" class="relative overflow-hidden">
	<!-- Background - simple gradient for performance -->
	<div class="absolute inset-0 -z-10">
		<div class="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30"></div>
	</div>

	<!-- Decorative SVG shapes -->
	<svg class="hidden lg:block absolute top-24 left-[15%] w-16 h-16 text-primary/15" viewBox="0 0 100 100" fill="none">
		<path d="M20 50 Q 35 20, 50 50 T 80 50" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
	</svg>
	<svg class="hidden lg:block absolute bottom-32 right-[20%] w-12 h-12 text-accent/15" viewBox="0 0 100 100" fill="none">
		<circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="3" stroke-dasharray="10 5"/>
	</svg>

	<Container class="relative pt-32 pb-16 lg:pt-40 lg:pb-20">
		<div bind:this={heroSection} class="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
			<!-- Text content -->
			<div class="lg:col-span-3 space-y-6">
				<h1 class="hero-item text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.1]">
					{ps?.hero_heading ?? t('about.hero_heading')} <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{ps?.hero_name ?? t('about.hero_name')}</span>
					<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="inline-block animate-wave origin-bottom-right text-amber-500">
						<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v0 M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v6 M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8 M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
					</svg>
				</h1>

				<p class="hero-item text-lg text-muted-foreground leading-relaxed max-w-xl">
					{@html ps?.hero_description_1 ?? t('about.hero_desc_1')}
				</p>

				<p class="hero-item text-base text-muted-foreground/90 leading-relaxed max-w-xl">
					{ps?.hero_description_2 ?? t('about.hero_desc_2')}
				</p>

				<div class="hero-item flex flex-wrap gap-4 pt-2">
					<Button size="lg" href={getLocalePath('/contact')} class="rounded-full px-8 shadow-lg shadow-primary/25 group">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 group-hover:scale-110 transition-transform">
							<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
						</svg>
						{t('about.get_in_touch')}
					</Button>
					<Button size="lg" variant="outline" href={getLocalePath('/work')} class="rounded-full px-8 group">
						{t('about.view_my_work')}
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
					</Button>
				</div>
			</div>

			<!-- Photo with visual treatment -->
			<div class="hero-item lg:col-span-2">
				<div class="relative group">
					<!-- Animated swaying decorative ring -->
					<div class="absolute -inset-4 rounded-[2rem] border-2 border-dashed border-primary/20 animate-sway"></div>
					<!-- Second ring with offset animation -->
					<div class="absolute -inset-6 rounded-[2.5rem] border border-dashed border-accent/10 animate-sway-reverse"></div>

					<!-- Main photo container -->
					<div class="relative aspect-[3/4] rounded-3xl overflow-hidden border-2 border-border/50 shadow-xl bg-gradient-to-br from-primary/10 via-muted to-accent/10 transform-gpu group-hover:scale-[1.02] transition-transform duration-200">
						<div class="w-full h-full flex items-center justify-center">
							<div class="text-center">
								<div class="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center shadow-lg transform-gpu group-hover:scale-110 transition-transform duration-200">
									<span class="text-4xl font-bold text-white">OH</span>
								</div>
								<p class="text-sm text-muted-foreground font-medium">{t('about.photo_coming_soon')}</p>
							</div>
						</div>
					</div>

					<!-- Floating badge -->
					<div class="absolute -top-3 -right-3 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white shadow-lg transform-gpu hover:scale-105 transition-transform duration-150">
						<span class="text-sm font-bold">{t('about.sveltekit_dev')}</span>
					</div>
				</div>
			</div>
		</div>
	</Container>
</Section>

<!-- Design Philosophy -->
<Section padding="none" background="none" class="relative overflow-hidden pt-20 lg:pt-24 pb-16 lg:pb-20">
	<!-- Background with simple gradient -->
	<div class="absolute inset-0 -z-10">
		<div class="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900"></div>
	</div>

	<!-- Decorative SVG shapes -->
	<svg class="hidden lg:block absolute top-20 right-[10%] w-16 h-16 text-primary/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
		<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
	</svg>

	<Container>
		<div bind:this={philosophySection}>
			<div class="max-w-2xl mb-16">
				<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M3 3l18 18 M3 17V3h14"/>
					</svg>
					{ps?.philosophy_badge ?? t('about.philosophy_badge')}
				</div>
				<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
					{ps?.philosophy_heading ?? t('about.philosophy_heading')}
				</h2>
				<p class="mt-4 text-lg text-muted-foreground">{ps?.philosophy_subheading ?? t('about.philosophy_subheading')}</p>
			</div>

			<div class="grid md:grid-cols-3 gap-6">
				{#each philosophy as item, index}
					<div class="philosophy-card group relative">
						<!-- Card with colored left border accent -->
						<div class="relative h-full {index === 0 ? 'p-8 pb-12' : index === 1 ? 'p-8 pb-10' : 'p-8 pb-14'} rounded-3xl bg-background dark:bg-surface-1 border border-border/50 dark:border-border/60 border-l-[3px] {item.accent === 'bg-primary' ? 'border-l-primary' : item.accent === 'bg-accent' ? 'border-l-accent' : 'border-l-emerald-500'} overflow-hidden transform-gpu hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-[0_0_30px_-5px] dark:hover:shadow-primary/20 {index === 0 ? 'hover:scale-[1.01]' : index === 1 ? 'hover:scale-[1.02]' : 'hover:scale-[1.015]'} transition-all duration-200 hover:border-primary/30 dark:hover:border-primary/40">
							<!-- Gradient background on hover -->
							<div class="absolute inset-0 bg-gradient-to-br {item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

							<!-- Icon -->
							<div class="relative w-14 h-14 rounded-2xl {item.iconBg} flex items-center justify-center mb-6 transform-gpu group-hover:scale-110 transition-transform duration-200">
								<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-foreground">
									<path d={item.icon} />
								</svg>
							</div>

							<!-- Number - alternating position -->
							<span class="absolute {index === 1 ? 'bottom-6 right-6' : 'top-6 right-6'} text-7xl font-black text-muted-foreground/[0.1] group-hover:text-muted-foreground/[0.15] transition-colors duration-200 select-none">{item.number}</span>

							<div class="relative">
								<h3 class="text-xl font-bold mb-3">{item.title}</h3>
								<p class="text-muted-foreground leading-[1.7]">{item.description}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</Container>
</Section>

<!-- Tools -->
<Section padding="none" class="relative overflow-hidden pt-16 lg:pt-20 pb-16 lg:pb-20">
	<!-- Background - simple for performance -->
	<div class="absolute inset-0 -z-10">
		<div class="absolute inset-0 bg-white dark:bg-surface-0"></div>
	</div>

	<!-- Decorative SVG shapes -->
	<svg class="hidden lg:block absolute top-16 left-[10%] w-14 h-14 text-primary/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
		<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
	</svg>
	<svg class="hidden lg:block absolute bottom-20 right-[8%] w-10 h-10 text-accent/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
		<circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
	</svg>

	<Container>
		<div bind:this={toolsSection}>
			<!-- Two column layout -->
			<div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
				<!-- Left: Content -->
				<div>
					<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
						</svg>
						{ps?.tools_badge ?? t('about.tools_badge')}
					</div>
					<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
						{ps?.tools_heading ?? t('about.tools_heading')}
						<span class="block h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full mt-4"></span>
					</h2>
					<p class="text-lg text-muted-foreground max-w-md">
						{ps?.tools_description ?? t('about.tools_desc')}
					</p>
				</div>

				<!-- Right: Tools visual (app window) -->
				<div class="relative">
					<!-- Decorative accent shapes -->
					<div class="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl -z-10 rotate-12 opacity-80"></div>
					<div class="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-accent/50 to-primary/50 rounded-2xl -z-10 -rotate-6 opacity-60"></div>

					<!-- Main card -->
					<div class="group/card relative rounded-3xl bg-slate-950/95 p-6 sm:p-8 shadow-xl overflow-hidden ring-0 hover:ring-1 hover:ring-primary/20 transition-all duration-300">

						<!-- Window chrome -->
						<div class="relative z-10 flex items-center gap-2 mb-6">
							<div class="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 hover:scale-110 transition-all duration-150 cursor-pointer"></div>
							<div class="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 hover:scale-110 transition-all duration-150 cursor-pointer"></div>
							<div class="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 hover:scale-110 transition-all duration-150 cursor-pointer"></div>
							<span class="ml-3 text-xs text-white/30 font-mono">{t('about.stack_config')}</span>
						</div>

						<!-- Grouped tools -->
						<div class="relative z-10 space-y-6">
							{#each toolGroups as group}
								<div class="tool-item">
									<!-- Group header -->
									<div class="flex items-center gap-2 mb-3">
										<span class="text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase">{group.label}</span>
										<div class="flex-1 h-px bg-white/10"></div>
									</div>
									<!-- Tools in group with hover -->
									<div class="space-y-2">
										{#each group.tools as tool}
											<div class="group/tool flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.12] border border-white/[0.05] hover:border-white/15 transition-colors duration-100 cursor-default">
												<!-- Icon -->
												<div class="w-9 h-9 rounded-lg bg-white/10 group-hover/tool:bg-white/15 flex items-center justify-center shrink-0 transition-colors duration-100">
													<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-white/70 group-hover/tool:text-white group-hover/tool:rotate-6 transition-all duration-200 transform-gpu">
														<path d={toolIcons[tool.icon]} />
													</svg>
												</div>
												<!-- Name -->
												<span class="text-sm text-white/80 font-medium group-hover/tool:text-white transition-colors duration-100">{tool.name}</span>
												<!-- Badge -->
												{#if tool.badge}
													<span class="ml-auto px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-semibold uppercase tracking-wide">{tool.badge}</span>
												{/if}
											</div>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</Container>
</Section>

<!-- Quick Facts -->
<Section padding="none" class="relative overflow-hidden pt-24 lg:pt-32 pb-16 lg:pb-20">
	<!-- Simple optimized background - no heavy blurs -->
	<div class="absolute inset-0 -z-10">
		<div class="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background"></div>
	</div>

	<!-- Lightweight decorative elements - static, no blur -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div class="absolute top-20 right-[15%] w-32 h-32 rounded-full border border-primary/10"></div>
		<div class="absolute bottom-32 left-[10%] w-24 h-24 rounded-full border border-accent/10"></div>
	</div>

	<Container class="relative z-10">
		<div bind:this={factsSection}>
			<div class="text-center mb-12">
				<span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-sm font-medium mb-4">
					{ps?.facts_badge ?? t('about.facts_badge')}
				</span>
				<h2 class="text-3xl sm:text-4xl font-bold tracking-tight">{ps?.facts_heading ?? t('about.facts_heading')}</h2>
				<p class="mt-3 text-muted-foreground">{ps?.facts_subheading ?? t('about.facts_subheading')}</p>
			</div>

			<!-- Premium grid layout - single column on mobile for better tap targets -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
				{#each quickFacts as fact, i}
					<div class="group relative">
						<div class="relative h-full p-5 sm:p-6 rounded-2xl bg-card dark:bg-surface-1 border border-border/50 dark:border-border/60 border-t-2 {fact.border} hover:border-border hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-[0_0_25px_-5px] dark:hover:shadow-primary/15 transform-gpu hover:-translate-y-2 transition-all duration-300 overflow-hidden text-center">
							<!-- Colored gradient glow on hover -->
							<div class="absolute inset-0 {fact.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

							<!-- Decorative corner accent -->
							<div class="absolute top-0 right-0 w-16 h-16 {fact.bg} rounded-bl-[3rem] opacity-50"></div>

							<!-- Icon with ring and rotation on hover -->
							<div class="relative w-14 h-14 mx-auto mb-4 rounded-2xl {fact.bg} flex items-center justify-center ring-1 ring-border/50 group-hover:ring-2 transition-all duration-300" style="--tw-ring-color: var(--tw-border-opacity);">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{fact.color} transform-gpu group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
									<path d={fact.icon} />
								</svg>
							</div>

							<!-- Text with improved contrast -->
							<p class="relative text-[10px] sm:text-xs text-muted-foreground/80 uppercase tracking-widest mb-1.5 font-semibold">{fact.label}</p>
							<p class="relative font-bold text-base sm:text-lg {fact.color}">{fact.value}</p>
						</div>
					</div>
				{/each}
			</div>

			<!-- Academic Roles -->
			<div class="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto mt-8">
				{#each academicRoles as role}
					<div class="group relative">
						<div class="relative h-full p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 dark:from-surface-1 dark:to-surface-1/80 border border-border/40 hover:border-border/60 hover:shadow-lg dark:hover:shadow-primary/5 transform-gpu hover:-translate-y-1 transition-all duration-300 overflow-hidden">
							<!-- Subtle gradient overlay on hover -->
							<div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

							<!-- Content - horizontal layout -->
							<div class="relative flex items-start gap-4">
								<!-- Icon container -->
								<div class="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
									<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
										<path d={role.icon} />
									</svg>
								</div>

								<!-- Text content -->
								<div class="flex-1 min-w-0">
									<p class="text-xs text-muted-foreground/70 uppercase tracking-wider font-medium mb-1">{role.role}</p>
									<h3 class="font-bold text-lg text-foreground mb-1.5">{role.place}</h3>
									<p class="text-sm text-muted-foreground leading-relaxed">{role.description}</p>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Fun tagline -->
			<div class="mt-10 text-center">
				<p class="inline-flex items-center gap-2 text-sm text-muted-foreground">
					<span class="text-lg">🚀</span>
					{t('about.tagline')}
				</p>
			</div>
		</div>
	</Container>
</Section>

<!-- Small availability note -->
<Section padding="sm" class="pb-8">
	<Container>
		<div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
			<div class="flex items-center gap-3">
				<span class="relative flex h-3 w-3">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
					<span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
				</span>
				<span class="text-sm text-muted-foreground">{ps?.availability_text ?? t('about.availability')}</span>
			</div>
			<span class="hidden sm:block text-muted-foreground/30">|</span>
			<span class="text-sm text-muted-foreground">{ps?.availability_location ?? t('about.availability_location')}</span>
		</div>
	</Container>
</Section>

<style>
	/* Hand wave animation */
	@keyframes wave {
		0%, 100% { transform: rotate(0deg); }
		25% { transform: rotate(20deg); }
		75% { transform: rotate(-10deg); }
	}

	.animate-wave {
		animation: wave 1.5s ease-in-out 2;
	}

	/* Sway animation for photo frame - GPU accelerated */
	@keyframes sway {
		0%, 100% {
			transform: translateX(0) rotate(0deg);
		}
		50% {
			transform: translateX(8px) rotate(1deg);
		}
	}

	@keyframes sway-reverse {
		0%, 100% {
			transform: translateX(0) rotate(0deg);
		}
		50% {
			transform: translateX(-6px) rotate(-0.5deg);
		}
	}

	.animate-sway {
		animation: sway 4s ease-in-out infinite;
		will-change: transform;
	}

	.animate-sway-reverse {
		animation: sway-reverse 5s ease-in-out infinite;
		will-change: transform;
	}

	@media (prefers-reduced-motion: reduce) {
		.animate-wave,
		.animate-sway,
		.animate-sway-reverse {
			animation: none;
		}
	}
</style>
