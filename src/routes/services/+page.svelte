<script lang="ts">
	import { Container, Section } from '$lib/components/layout';
	import { InView } from '$lib/components/ui/animations';
	import { ProcessChainRings } from '$lib/components/sections';
	import { onMount, tick } from 'svelte';
	import { browser } from '$app/environment';
	import { animate } from 'motion';
	import { sanitizeSvgContent } from '$lib/utils/sanitize';
	import { t } from '$lib/i18n/index.svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const motionAnimate = animate as any;

	let { data } = $props();
	const ps = data.pageSettings;

	let mounted = $state(false);
	let openFaq = $state<number | null>(null);
	let activeService = $state(0);
	let prevService = $state(0);
	let prefersReducedMotion = $state(false);
	let bgRef: HTMLElement | null = $state(null);
	let panelRefs: HTMLElement[] = $state([]);

	// Smooth service switch with Motion One
	async function switchService(newIndex: number) {
		if (newIndex === activeService || prefersReducedMotion) {
			activeService = newIndex;
			return;
		}

		prevService = activeService;
		const oldPanel = panelRefs[activeService];

		// Fade out current panel
		if (oldPanel) {
			await motionAnimate(oldPanel, { opacity: 0 }, { duration: 0.15, easing: 'ease-out' }).finished;
		}

		activeService = newIndex;
		await tick();

		// Fade in new panel
		const newPanel = panelRefs[newIndex];
		if (newPanel) {
			newPanel.style.opacity = '0';
			motionAnimate(newPanel, { opacity: 1 }, { duration: 0.2, easing: 'ease-out' });
		}
	}

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			event.preventDefault();
			switchService(activeService === 0 ? 2 : activeService - 1);
		} else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			event.preventDefault();
			switchService(activeService === 2 ? 0 : activeService + 1);
		}
	}

	const fallbackServices = $derived([
		{
			id: 0,
			title: t('services.service_1_title'),
			shortTitle: t('services.service_1_short'),
			description: t('services.service_1_desc'),
			icon: `<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>`,
			color: '#e11d48',
			lightColor: '#fecdd3',
			bento: {
				process: [t('services.service_1_process_1'), t('services.service_1_process_2'), t('services.service_1_process_3')],
				deliverables: [t('services.service_1_del_1'), t('services.service_1_del_2'), t('services.service_1_del_3')],
				timeline: t('services.service_1_timeline')
			}
		},
		{
			id: 1,
			title: t('services.service_2_title'),
			shortTitle: t('services.service_2_short'),
			description: t('services.service_2_desc'),
			icon: `<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>`,
			color: '#2563eb',
			lightColor: '#bfdbfe',
			bento: {
				process: [t('services.service_2_process_1'), t('services.service_2_process_2'), t('services.service_2_process_3')],
				deliverables: [t('services.service_2_del_1'), t('services.service_2_del_2'), t('services.service_2_del_3')],
				timeline: t('services.service_2_timeline')
			}
		},
		{
			id: 2,
			title: t('services.service_3_title'),
			shortTitle: t('services.service_3_short'),
			description: t('services.service_3_desc'),
			icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>`,
			color: '#059669',
			lightColor: '#a7f3d0',
			bento: {
				process: [t('services.service_3_process_1'), t('services.service_3_process_2'), t('services.service_3_process_3')],
				deliverables: [t('services.service_3_del_1'), t('services.service_3_del_2'), t('services.service_3_del_3')],
				timeline: t('services.service_3_timeline')
			}
		}
	]);

	const services = $derived(data.servicesDetailed?.length
		? data.servicesDetailed.map((s, i) => ({
				id: i,
				title: s.title,
				shortTitle: s.short_title,
				description: s.description,
				icon: s.icon,
				color: s.color,
				lightColor: s.light_color,
				bento: {
					process: s.process,
					deliverables: s.deliverables,
					timeline: s.timeline
				}
			}))
		: fallbackServices);

	const fallbackFaqs = $derived([
		{ question: t('services.faq_1_q'), answer: t('services.faq_1_a') },
		{ question: t('services.faq_2_q'), answer: t('services.faq_2_a') },
		{ question: t('services.faq_3_q'), answer: t('services.faq_3_a') },
		{ question: t('services.faq_4_q'), answer: t('services.faq_4_a') },
		{ question: t('services.faq_5_q'), answer: t('services.faq_5_a') },
		{ question: t('services.faq_6_q'), answer: t('services.faq_6_a') }
	]);

	const faqs = $derived(data.faqs?.length ? data.faqs : fallbackFaqs);

	// Gauge arc calculations for semi-circle (180 degrees, 3 segments of 60 degrees each)
	const gaugeConfig = {
		cx: 200,
		cy: 200,
		innerRadius: 80,
		outerRadius: 160,
		startAngle: 180, // Left side (9 o'clock)
		segmentAngle: 60 // Each segment is 60 degrees
	};

	function polarToCartesian(cx: number, cy: number, radius: number, angleInDegrees: number) {
		const angleInRadians = (angleInDegrees * Math.PI) / 180;
		return {
			x: cx + radius * Math.cos(angleInRadians),
			y: cy + radius * Math.sin(angleInRadians)
		};
	}

	function describeArc(cx: number, cy: number, innerR: number, outerR: number, startAngle: number, endAngle: number) {
		const start_outer = polarToCartesian(cx, cy, outerR, endAngle);
		const end_outer = polarToCartesian(cx, cy, outerR, startAngle);
		const start_inner = polarToCartesian(cx, cy, innerR, endAngle);
		const end_inner = polarToCartesian(cx, cy, innerR, startAngle);
		const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

		return [
			'M', start_outer.x, start_outer.y,
			'A', outerR, outerR, 0, largeArcFlag, 0, end_outer.x, end_outer.y,
			'L', end_inner.x, end_inner.y,
			'A', innerR, innerR, 0, largeArcFlag, 1, start_inner.x, start_inner.y,
			'Z'
		].join(' ');
	}

	// Create arc path for curved text (follows the outer edge of segment)
	function describeTextArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
		const start = polarToCartesian(cx, cy, radius, startAngle);
		const end = polarToCartesian(cx, cy, radius, endAngle);
		const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

		return [
			'M', start.x, start.y,
			'A', radius, radius, 0, largeArcFlag, 1, end.x, end.y
		].join(' ');
	}

	// Generate arc paths for each segment
	const segments = $derived(services.map((service, i) => {
		const startAngle = gaugeConfig.startAngle + i * gaugeConfig.segmentAngle;
		const endAngle = startAngle + gaugeConfig.segmentAngle;
		const midAngle = startAngle + gaugeConfig.segmentAngle / 2;
		const labelRadius = (gaugeConfig.innerRadius + gaugeConfig.outerRadius) / 2;
		const labelPos = polarToCartesian(gaugeConfig.cx, gaugeConfig.cy, labelRadius, midAngle);
		// Text arc just outside the gauge
		const textArcRadius = gaugeConfig.outerRadius + 12;
		const textArcPath = describeTextArc(gaugeConfig.cx, gaugeConfig.cy, textArcRadius, startAngle, endAngle);

		return {
			...service,
			path: describeArc(gaugeConfig.cx, gaugeConfig.cy, gaugeConfig.innerRadius, gaugeConfig.outerRadius, startAngle, endAngle),
			labelX: labelPos.x,
			labelY: labelPos.y,
			midAngle,
			textArcPath,
			startAngle,
			endAngle
		};
	}));

	onMount(() => {
		mounted = true;
		if (browser) {
			prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		}
	});
</script>

<svelte:head>
	<title>{ps?.meta_title ?? t('services.meta_title')}</title>
	<meta name="description" content={ps?.meta_description ?? t('services.meta_description')} />
	<meta property="og:title" content={ps?.meta_title ?? t('services.meta_title')} />
	<meta property="og:description" content={ps?.meta_description ?? t('services.og_description')} />
	<meta name="twitter:title" content={ps?.meta_title ?? t('services.meta_title')} />
	<meta name="twitter:description" content={ps?.meta_description ?? t('services.og_description')} />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map(faq => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer
			}
		}))
	})}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Service',
		provider: {
			'@type': 'ProfessionalService',
			name: 'Onur Haniffa',
			url: 'https://onurhaniffa.com'
		},
		serviceType: 'Web Design and Development',
		areaServed: [
			{ '@type': 'City', name: 'Istanbul' },
			{ '@type': 'Country', name: 'Turkey' }
		],
		description: ps?.meta_description ?? t('services.meta_description'),
		offers: {
			'@type': 'Offer',
			availability: 'https://schema.org/InStock',
			priceCurrency: 'USD'
		}
	})}</script>`}
</svelte:head>

<style>
	/* Gauge segment styling */
	.gauge-segment {
		cursor: pointer;
		transition: transform 150ms ease-out, filter 150ms ease-out;
		transform-origin: 200px 200px;
		outline: none;
		-webkit-tap-highlight-color: transparent;
	}
	.gauge-segment:hover {
		filter: brightness(1.1);
	}
	.gauge-segment:focus {
		outline: none;
	}
	.gauge-segment:focus-visible path {
		stroke: white;
		stroke-width: 3;
	}
	.gauge-segment.active {
		filter: brightness(1.05) drop-shadow(0 0 20px var(--segment-color));
	}
	.gauge-segment.active path {
		transform: scale(1.03);
		transform-origin: 200px 200px;
	}

	/* Remove focus ring from SVG container */
	:global(svg[role="tablist"]) {
		outline: none;
		-webkit-tap-highlight-color: transparent;
	}
	:global(svg[role="tablist"]:focus) {
		outline: none;
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.gauge-segment,
		.gauge-segment path,
		.bento-card,
		.spin-ring,
		.spin-ring-reverse {
			transition: none !important;
			animation: none !important;
		}
	}

	/* Bento card hover */
	.bento-card {
		transition: transform 200ms ease-out, box-shadow 200ms ease-out, border-color 200ms ease-out;
		will-change: transform;
	}
	.bento-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 30px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px var(--service-color, hsl(var(--primary)));
		border-color: var(--service-color, hsl(var(--primary)));
	}
	/* Dark mode: add glow effect on hover */
	:global(.dark) .bento-card:hover {
		box-shadow:
			0 8px 30px -10px rgba(0, 0, 0, 0.4),
			0 0 0 1px var(--service-color, oklch(0.68 0.18 260)),
			0 0 25px -5px var(--service-color, oklch(0.68 0.18 260 / 0.3));
	}
	.bento-card:focus-visible {
		outline: 2px solid hsl(var(--ring));
		outline-offset: 2px;
	}

	/* Rotating ring - lightweight */
	@keyframes spin-slow {
		from { transform: translate(-50%, -50%) rotate(0deg); }
		to { transform: translate(-50%, -50%) rotate(360deg); }
	}
	.spin-ring {
		animation: spin-slow 90s linear infinite;
	}
	.spin-ring-reverse {
		animation: spin-slow 70s linear infinite reverse;
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.spin-ring,
		.spin-ring-reverse {
			animation: none !important;
		}
		.bento-card {
			transition: none !important;
		}
	}

	/* FAQ accordion - simple show/hide, no janky animations */
	.faq-answer {
		display: none;
	}
	.faq-answer.open {
		display: block;
	}

</style>

<!-- Hero -->
<Section padding="none" class="relative pt-24 pb-8 lg:pt-32 lg:pb-12">
	<Container>
		<div
			class="transition-all duration-700 ease-out"
			class:opacity-0={!mounted}
			class:translate-y-8={!mounted}
		>
			<span class="text-[60px] sm:text-[100px] lg:text-[140px] font-black leading-[0.8] text-foreground/5 dark:text-foreground/[0.08] select-none block -mb-4 sm:-mb-8">{t('services.watermark')}</span>
			<h1 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl relative z-10 mb-4">
				{ps?.hero_heading ?? t('services.hero_heading')} <span class="text-primary">{ps?.hero_highlight ?? t('services.hero_highlight')}</span>
			</h1>
			<p class="text-lg sm:text-xl text-muted-foreground max-w-2xl relative z-10">
				{ps?.hero_description ?? t('services.hero_description')}
			</p>
		</div>
	</Container>
</Section>

<!-- Speedometer Services Section -->
<Section padding="lg" class="relative overflow-visible">
	<!-- Simple background gradient - NO blur filters for performance -->
	<div
		class="absolute inset-0 transition-colors duration-300 ease-out"
		style="background: radial-gradient(ellipse 120% 80% at 30% 50%, {services[activeService].lightColor}25 0%, {services[activeService].color}08 40%, transparent 70%);"
	></div>

	<!-- Decorative rings - overflow visible, static colors -->
	<div class="absolute inset-0 pointer-events-none overflow-visible">
		<div class="spin-ring absolute top-1/2 left-1/2 w-[900px] h-[900px] rounded-full border-2 border-dashed border-primary/[0.04]"></div>
		<div class="spin-ring-reverse absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full border border-primary/[0.03]"></div>
		<div class="spin-ring absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full border border-dotted border-primary/[0.04]" style="animation-duration: 60s;"></div>
	</div>

	<!-- Simple edge fades - no blur -->
	<div class="absolute top-0 left-0 right-0 h-20 pointer-events-none bg-gradient-to-b from-background to-transparent"></div>
	<div class="absolute bottom-0 left-0 right-0 h-20 pointer-events-none bg-gradient-to-t from-background to-transparent"></div>

	<Container class="relative z-10">
		<div class="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

			<!-- Speedometer Gauge -->
			<div class="relative flex items-center justify-center w-full lg:w-[50%]">
				<InView animation="scale">
					<svg
						class="w-[340px] h-[280px] sm:w-[440px] sm:h-[360px] lg:w-[520px] lg:h-[420px]"
						viewBox="0 0 400 340"
						role="tablist"
						tabindex="0"
						aria-label="Service categories"
						onkeydown={handleKeydown}
					>
						<defs>
							<!-- Gradients for each segment -->
							{#each services as service, i}
								<linearGradient id="grad-{i}" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stop-color={service.lightColor} />
									<stop offset="100%" stop-color={service.color} />
								</linearGradient>
								<filter id="glow-{i}" x="-50%" y="-50%" width="200%" height="200%">
									<feGaussianBlur stdDeviation="8" result="blur" />
									<feFlood flood-color={service.color} flood-opacity="0.5" />
									<feComposite in2="blur" operator="in" />
									<feMerge>
										<feMergeNode />
										<feMergeNode in="SourceGraphic" />
									</feMerge>
								</filter>
							{/each}
						</defs>

						<!-- Outer decorative arc -->
						<path
							d={describeArc(200, 200, 165, 170, 180, 360)}
							fill="none"
							stroke="currentColor"
							stroke-width="1"
							class="text-border/40"
							stroke-dasharray="4 4"
						/>

						<!-- Gauge segments -->
						{#each segments as segment, i}
							<g
								class="gauge-segment {activeService === i ? 'active' : ''}"
								style="--segment-color: {segment.color}"
								onclick={() => switchService(i)}
								onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchService(i); }}}
								role="tab"
								tabindex={activeService === i ? 0 : -1}
								aria-selected={activeService === i}
								aria-controls="service-panel-{i}"
								id="service-tab-{i}"
							>
								<path
									d={segment.path}
									fill="url(#grad-{i})"
									filter={activeService === i ? `url(#glow-${i})` : 'none'}
									class="transition-all duration-200"
								/>
								<!-- Segment icon -->
								<g transform="translate({segment.labelX - 12}, {segment.labelY - 12})">
									<circle cx="12" cy="12" r="16" fill="white" fill-opacity="0.25" />
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										{@html sanitizeSvgContent(segment.icon)}
									</svg>
								</g>
							</g>
						{/each}

						<!-- Center hub -->
						<circle cx="200" cy="200" r="75" fill="currentColor" class="text-background" />
						<circle cx="200" cy="200" r="75" fill="none" stroke="currentColor" stroke-width="2" class="text-border" />
						<circle cx="200" cy="200" r="65" fill="none" stroke="currentColor" stroke-width="1" class="text-border/30" stroke-dasharray="4 4" />

						<!-- Hub content -->
						<g transform="translate(200, 185)">
							<text text-anchor="middle" class="text-[11px] font-bold uppercase tracking-[0.2em] fill-current text-muted-foreground">{t('services.hub_label')}</text>
						</g>
						<g transform="translate(200, 210)">
							<text text-anchor="middle" class="text-[28px] font-black fill-current text-foreground">3</text>
						</g>

						<!-- Curved segment labels -->
						{#each segments as segment, i}
							<defs>
								<path id="textArc-{i}" d={segment.textArcPath} fill="none" />
							</defs>
							<text
								class="transition-opacity duration-200 {activeService === i ? 'opacity-100' : 'opacity-60'}"
								style="fill: {segment.color}"
							>
								<textPath
									href="#textArc-{i}"
									startOffset="50%"
									text-anchor="middle"
									class="text-[13px] font-bold uppercase tracking-[0.12em]"
								>
									{segment.shortTitle}
								</textPath>
							</text>
						{/each}
					</svg>
				</InView>
			</div>

			<!-- Bento Content Panel -->
			<div class="w-full lg:w-[50%]">
				{#each services as service, i}
					<div
						bind:this={panelRefs[i]}
						id="service-panel-{i}"
						role="tabpanel"
						aria-labelledby="service-tab-{i}"
						class="{activeService === i ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'}"
						hidden={activeService !== i}
					>
						{#if activeService === i}
							<InView animation="fade-up">
								<!-- Header -->
								<div class="mb-8">
									<div
										class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-5 shadow-sm"
										style="background: {service.color}20; color: {service.color}; box-shadow: 0 0 20px -5px {service.color}30;"
									>
										<span class="w-2 h-2 rounded-full animate-pulse" style="background: {service.color}"></span>
										0{service.id + 1}
									</div>
									<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">{service.title}</h2>
									<p class="text-muted-foreground text-lg leading-relaxed max-w-lg">{service.description}</p>
								</div>

								<!-- Bento Grid -->
								<div class="grid grid-cols-2 gap-3 sm:gap-4">
									<!-- Process Card -->
									<div class="bento-card group relative col-span-2 sm:col-span-1 p-6 sm:p-5 rounded-2xl bg-background/80 backdrop-blur-sm border border-border dark:bg-surface-1/80 dark:border-border/60 min-h-[140px] overflow-hidden" style="--service-color: {service.color}">
										<!-- Decorative corner glow -->
										<div class="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: radial-gradient(circle, {service.color}20 0%, transparent 70%);"></div>

										<div class="flex items-center gap-2 mb-4 relative">
											<div class="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110" style="background: {service.color}15">
												<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={service.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
													<path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
												</svg>
											</div>
											<span class="text-sm font-semibold text-foreground">{t('services.process_label')}</span>
										</div>
										<div class="space-y-2 relative">
											{#each service.bento.process as step, idx}
												<div class="flex items-center gap-3">
													<span class="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0" style="background: {service.color}15; color: {service.color}">{idx + 1}</span>
													<span class="text-sm text-muted-foreground">{step}</span>
												</div>
											{/each}
										</div>
									</div>

									<!-- Deliverables Card -->
									<div class="bento-card group relative col-span-2 sm:col-span-1 p-6 sm:p-5 rounded-2xl bg-background/80 backdrop-blur-sm border border-border dark:bg-surface-1/80 dark:border-border/60 min-h-[140px] overflow-hidden" style="--service-color: {service.color}">
										<!-- Decorative corner glow -->
										<div class="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: radial-gradient(circle, {service.color}20 0%, transparent 70%);"></div>

										<div class="flex items-center gap-2 mb-4 relative">
											<div class="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110" style="background: {service.color}15">
												<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={service.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
													<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
												</svg>
											</div>
											<span class="text-sm font-semibold text-foreground">{t('services.deliverables_label')}</span>
										</div>
										<div class="flex flex-wrap gap-2 relative">
											{#each service.bento.deliverables as item}
												<span class="px-3 py-1.5 rounded-full text-xs font-medium transition-transform hover:scale-105" style="background: {service.color}10; color: {service.color}">{item}</span>
											{/each}
										</div>
									</div>

									<!-- Timeline Card - Full width, centered -->
									<div class="bento-card group relative col-span-2 p-6 sm:p-5 rounded-2xl bg-background/80 backdrop-blur-sm border border-border dark:bg-surface-1/80 dark:border-border/60 overflow-hidden" style="--service-color: {service.color}">
										<!-- Decorative shimmer -->
										<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: linear-gradient(90deg, transparent 0%, {service.color}05 50%, transparent 100%);"></div>

										<div class="flex items-center justify-between relative">
											<div class="flex items-center gap-3">
												<div class="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style="background: {service.color}15">
													<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={service.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
														<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
													</svg>
												</div>
												<div>
													<span class="text-sm font-semibold text-foreground block">{t('services.timeline_label')}</span>
													<span class="text-xs text-muted-foreground">{t('services.estimated_duration')}</span>
												</div>
											</div>
											<p class="text-2xl sm:text-3xl font-bold" style="color: {service.color}">{service.bento.timeline}</p>
										</div>
									</div>
								</div>
							</InView>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</Container>
</Section>

<!-- Process - Chain Ring Diagrams -->
<ProcessChainRings />

<!-- Section divider -->
<div class="relative h-px my-12 md:my-16">
	<div class="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent"></div>
</div>

<!-- Testimonial -->
<Section padding="none" class="py-8 md:py-12 relative overflow-hidden">
	<!-- Background visuals - simplified for performance -->
	<div class="absolute inset-0 pointer-events-none">
		<!-- Decorative rings -->
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/[0.04]"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-dashed border-primary/[0.06]"></div>

		<!-- Subtle grid pattern -->
		<div class="absolute inset-0 opacity-[0.015]" style="background-image: radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0); background-size: 40px 40px;"></div>
	</div>

	<Container size="content" class="relative z-10">
		<InView animation="fade-up">
			<div class="relative">
				<!-- Large quote mark background -->
				<div class="absolute -top-2 left-4 md:left-8 text-[120px] md:text-[180px] leading-none font-serif text-primary/[0.08] select-none pointer-events-none">"</div>

				<div class="relative flex flex-col md:flex-row items-center gap-6 md:gap-10 px-6 md:px-12 py-8">
					<!-- Author - left side on desktop -->
					<div class="flex md:flex-col items-center gap-3 md:gap-2 flex-shrink-0">
						<div class="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg ring-4 ring-primary/10">{ps?.testimonial_initial ?? t('services.testimonial_initial')}</div>
						<div class="text-left md:text-center">
							<p class="font-semibold text-foreground">{ps?.testimonial_author ?? t('services.testimonial_author')}</p>
							<p class="text-xs text-muted-foreground">{ps?.testimonial_role ?? t('services.testimonial_role')}</p>
						</div>
					</div>

					<!-- Divider -->
					<div class="hidden md:block w-px h-20 bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>

					<!-- Quote -->
					<blockquote class="flex-1">
						<p class="text-lg md:text-xl text-foreground leading-relaxed">
							"{ps?.testimonial_quote ?? t('services.testimonial_quote')}"
						</p>
					</blockquote>
				</div>

				<!-- Subtle bottom accent -->
				<div class="h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
			</div>
		</InView>
	</Container>
</Section>

<!-- FAQ -->
<Section padding="lg" class="pb-24">
	<Container>
		<InView animation="fade-up" class="text-center mb-10">
			<h2 class="text-2xl sm:text-3xl font-bold tracking-tight">{ps?.faq_heading ?? t('services.faq_heading')}</h2>
		</InView>

		<div class="grid md:grid-cols-2 gap-4">
			{#each faqs as faq, i}
				<InView animation="fade-up" delay={i * 50}>
					<div class="faq-item overflow-hidden rounded-xl border bg-card transition-all duration-200 {openFaq === i ? 'border-primary/30 shadow-md' : 'border-border hover:border-primary/20'}">
						<button
							onclick={() => toggleFaq(i)}
							aria-expanded={openFaq === i}
							class="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
						>
							<span class="font-medium text-sm sm:text-base">{faq.question}</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-muted-foreground flex-shrink-0 transition-transform duration-200 {openFaq === i ? 'rotate-180' : ''}"
							><path d="m6 9 6 6 6-6"/></svg>
						</button>
						<!-- Answer -->
						<div class="faq-answer px-5 pb-4 {openFaq === i ? 'open' : ''}">
							<p class="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
						</div>
					</div>
				</InView>
			{/each}
		</div>

	</Container>
</Section>
