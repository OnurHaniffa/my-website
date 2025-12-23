<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// Step data - edit labels, descriptions, colors here
	const steps = [
		{
			id: '01',
			title: 'Discovery',
			description: 'We talk about your goals & vision',
			color: '#0d9488' // teal
		},
		{
			id: '02',
			title: 'Design',
			description: 'Mockups & iteration until you love it',
			color: '#f97316' // orange
		},
		{
			id: '03',
			title: 'Develop',
			description: 'Clean code built for performance',
			color: '#e11d48' // rose
		},
		{
			id: '04',
			title: 'Launch',
			description: 'Go live with ongoing support & training',
			color: '#eab308' // yellow
		}
	];

	let sectionRef = $state<HTMLElement | null>(null);
	let isVisible = $state(false);
	let prefersReducedMotion = $state(false);

	onMount(() => {
		if (browser) {
			prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			if (prefersReducedMotion) {
				isVisible = true;
				return;
			}

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting && !isVisible) {
							isVisible = true;
							observer.disconnect();
						}
					});
				},
				{ threshold: 0.15 }
			);

			if (sectionRef) {
				observer.observe(sectionRef);
			}

			return () => observer.disconnect();
		}
	});

	/*
	 * SVG GEOMETRY EXPLANATION:
	 *
	 * Each "linked diagram" is TWO overlapping circles that create an infinity/chain look.
	 * We use SVG masks to:
	 * 1. Create thick donut rings (outer circle minus inner circle)
	 * 2. Split each ring into left/right halves with different colors
	 * 3. Handle the overlap region cleanly
	 *
	 * ViewBox: 600 x 300 per diagram
	 * Ring outer radius: 120
	 * Ring inner radius: 70 (thickness = 50, about 42% of radius for bold look)
	 * Circle centers: left at x=150, right at x=450 (overlap in middle)
	 */
</script>

<section
	bind:this={sectionRef}
	class="relative py-20 md:py-28 lg:py-32 overflow-hidden"
	class:is-visible={isVisible}
	aria-labelledby="process-heading"
>
	<!-- Subtle background with light grain texture -->
	<div class="absolute inset-0 bg-gradient-to-b from-slate-50 to-slate-100/80 dark:from-slate-900 dark:to-slate-800/80"></div>
	<div class="absolute inset-0 opacity-[0.03]" style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E&quot;);"></div>

	<div class="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="text-center mb-16 md:mb-20">
			<span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
				</svg>
				The Process
			</span>
			<h2 id="process-heading" class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
				How we <span class="text-primary">work</span> together
			</h2>
			<p class="text-muted-foreground text-lg max-w-xl mx-auto">
				A simple, collaborative approach that keeps you in the loop at every stage.
			</p>
		</div>

		<!-- Desktop: Two linked ring diagrams side by side -->
		<div class="hidden lg:flex justify-center items-start gap-8 xl:gap-12">
			<!-- LEFT DIAGRAM: Steps 01 & 02 -->
			<div class="relative diagram-container" style="--diagram-index: 0">
				<svg viewBox="0 0 600 340" class="w-[500px] xl:w-[560px] h-auto" aria-hidden="true">
					<defs>
						<!-- Mask for left ring donut (outer - inner) -->
						<mask id="leftRingMask1">
							<rect width="100%" height="100%" fill="black"/>
							<circle cx="180" cy="170" r="120" fill="white"/>
							<circle cx="180" cy="170" r="70" fill="black"/>
						</mask>
						<!-- Mask for right ring donut -->
						<mask id="rightRingMask1">
							<rect width="100%" height="100%" fill="black"/>
							<circle cx="420" cy="170" r="120" fill="white"/>
							<circle cx="420" cy="170" r="70" fill="black"/>
						</mask>
						<!-- Clip to hide overlap on back ring -->
						<clipPath id="leftClip1">
							<rect x="0" y="0" width="300" height="340"/>
						</clipPath>
						<clipPath id="rightClip1">
							<rect x="300" y="0" width="300" height="340"/>
						</clipPath>
					</defs>

					<!-- Back ring (right side - Design/Orange) rendered first -->
					<g mask="url(#rightRingMask1)">
						<!-- Full orange ring -->
						<circle cx="420" cy="170" r="120" fill={steps[1].color}/>
						<!-- Clip the left portion that would overlap -->
						<circle cx="420" cy="170" r="120" fill={steps[1].color}/>
					</g>

					<!-- Front ring (left side - Discovery/Teal) rendered on top -->
					<g mask="url(#leftRingMask1)">
						<circle cx="180" cy="170" r="120" fill={steps[0].color}/>
					</g>

					<!-- Large faded text inside rings -->
					<text
						x="145"
						y="180"
						text-anchor="middle"
						class="ring-label-text"
						fill="white"
						opacity="0.22"
					>
						{steps[0].title}
					</text>
					<text
						x="455"
						y="180"
						text-anchor="middle"
						class="ring-label-text"
						fill="white"
						opacity="0.22"
					>
						{steps[1].title}
					</text>

					<!-- Connector lines and dots -->
					<!-- Step 01: bottom-left -->
					<line x1="145" y1="290" x2="145" y2="310" stroke="#94a3b8" stroke-width="1.5"/>
					<circle cx="145" cy="315" r="3" fill="#94a3b8"/>

					<!-- Step 02: top-center (at the join) -->
					<line x1="300" y1="50" x2="300" y2="30" stroke="#94a3b8" stroke-width="1.5"/>
					<circle cx="300" cy="25" r="3" fill="#94a3b8"/>
				</svg>

				<!-- Step labels positioned outside SVG -->
				<div class="step-label step-label-01">
					<span class="step-number">{steps[0].id}</span>
					<p class="step-desc">{steps[0].description}</p>
				</div>
				<div class="step-label step-label-02">
					<p class="step-desc">{steps[1].description}</p>
					<span class="step-number">{steps[1].id}</span>
				</div>
			</div>

			<!-- RIGHT DIAGRAM: Steps 03 & 04 -->
			<div class="relative diagram-container" style="--diagram-index: 1">
				<svg viewBox="0 0 600 340" class="w-[500px] xl:w-[560px] h-auto" aria-hidden="true">
					<defs>
						<mask id="leftRingMask2">
							<rect width="100%" height="100%" fill="black"/>
							<circle cx="180" cy="170" r="120" fill="white"/>
							<circle cx="180" cy="170" r="70" fill="black"/>
						</mask>
						<mask id="rightRingMask2">
							<rect width="100%" height="100%" fill="black"/>
							<circle cx="420" cy="170" r="120" fill="white"/>
							<circle cx="420" cy="170" r="70" fill="black"/>
						</mask>
					</defs>

					<!-- Back ring (right side - Launch/Yellow) -->
					<g mask="url(#rightRingMask2)">
						<circle cx="420" cy="170" r="120" fill={steps[3].color}/>
					</g>

					<!-- Front ring (left side - Develop/Rose) -->
					<g mask="url(#leftRingMask2)">
						<circle cx="180" cy="170" r="120" fill={steps[2].color}/>
					</g>

					<!-- Large faded text -->
					<text
						x="145"
						y="180"
						text-anchor="middle"
						class="ring-label-text"
						fill="white"
						opacity="0.22"
					>
						{steps[2].title}
					</text>
					<text
						x="455"
						y="180"
						text-anchor="middle"
						class="ring-label-text"
						fill="white"
						opacity="0.22"
					>
						{steps[3].title}
					</text>

					<!-- Connector lines -->
					<!-- Step 03: bottom-center -->
					<line x1="300" y1="290" x2="300" y2="310" stroke="#94a3b8" stroke-width="1.5"/>
					<circle cx="300" cy="315" r="3" fill="#94a3b8"/>

					<!-- Step 04: top-right -->
					<line x1="455" y1="50" x2="455" y2="30" stroke="#94a3b8" stroke-width="1.5"/>
					<circle cx="455" cy="25" r="3" fill="#94a3b8"/>
				</svg>

				<!-- Step labels -->
				<div class="step-label step-label-03">
					<span class="step-number">{steps[2].id}</span>
					<p class="step-desc">{steps[2].description}</p>
				</div>
				<div class="step-label step-label-04">
					<p class="step-desc">{steps[3].description}</p>
					<span class="step-number">{steps[3].id}</span>
				</div>
			</div>
		</div>

		<!-- Tablet: Stacked diagrams -->
		<div class="hidden md:flex lg:hidden flex-col items-center gap-16">
			<!-- Diagram 1 -->
			<div class="relative diagram-container" style="--diagram-index: 0">
				<svg viewBox="0 0 600 340" class="w-full max-w-[520px] h-auto" aria-hidden="true">
					<defs>
						<mask id="leftRingMaskT1">
							<rect width="100%" height="100%" fill="black"/>
							<circle cx="180" cy="170" r="120" fill="white"/>
							<circle cx="180" cy="170" r="70" fill="black"/>
						</mask>
						<mask id="rightRingMaskT1">
							<rect width="100%" height="100%" fill="black"/>
							<circle cx="420" cy="170" r="120" fill="white"/>
							<circle cx="420" cy="170" r="70" fill="black"/>
						</mask>
					</defs>
					<g mask="url(#rightRingMaskT1)">
						<circle cx="420" cy="170" r="120" fill={steps[1].color}/>
					</g>
					<g mask="url(#leftRingMaskT1)">
						<circle cx="180" cy="170" r="120" fill={steps[0].color}/>
					</g>
					<text x="145" y="180" text-anchor="middle" class="ring-label-text" fill="white" opacity="0.22">{steps[0].title}</text>
					<text x="455" y="180" text-anchor="middle" class="ring-label-text" fill="white" opacity="0.22">{steps[1].title}</text>
				</svg>
				<div class="flex justify-between mt-6 px-4">
					<div class="text-center">
						<span class="text-3xl font-bold text-foreground">{steps[0].id}</span>
						<p class="text-sm text-muted-foreground mt-1 max-w-[180px]">{steps[0].description}</p>
					</div>
					<div class="text-center">
						<span class="text-3xl font-bold text-foreground">{steps[1].id}</span>
						<p class="text-sm text-muted-foreground mt-1 max-w-[180px]">{steps[1].description}</p>
					</div>
				</div>
			</div>

			<!-- Diagram 2 -->
			<div class="relative diagram-container" style="--diagram-index: 1">
				<svg viewBox="0 0 600 340" class="w-full max-w-[520px] h-auto" aria-hidden="true">
					<defs>
						<mask id="leftRingMaskT2">
							<rect width="100%" height="100%" fill="black"/>
							<circle cx="180" cy="170" r="120" fill="white"/>
							<circle cx="180" cy="170" r="70" fill="black"/>
						</mask>
						<mask id="rightRingMaskT2">
							<rect width="100%" height="100%" fill="black"/>
							<circle cx="420" cy="170" r="120" fill="white"/>
							<circle cx="420" cy="170" r="70" fill="black"/>
						</mask>
					</defs>
					<g mask="url(#rightRingMaskT2)">
						<circle cx="420" cy="170" r="120" fill={steps[3].color}/>
					</g>
					<g mask="url(#leftRingMaskT2)">
						<circle cx="180" cy="170" r="120" fill={steps[2].color}/>
					</g>
					<text x="145" y="180" text-anchor="middle" class="ring-label-text" fill="white" opacity="0.22">{steps[2].title}</text>
					<text x="455" y="180" text-anchor="middle" class="ring-label-text" fill="white" opacity="0.22">{steps[3].title}</text>
				</svg>
				<div class="flex justify-between mt-6 px-4">
					<div class="text-center">
						<span class="text-3xl font-bold text-foreground">{steps[2].id}</span>
						<p class="text-sm text-muted-foreground mt-1 max-w-[180px]">{steps[2].description}</p>
					</div>
					<div class="text-center">
						<span class="text-3xl font-bold text-foreground">{steps[3].id}</span>
						<p class="text-sm text-muted-foreground mt-1 max-w-[180px]">{steps[3].description}</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Mobile: Simple vertical list -->
		<div class="md:hidden">
			<div class="relative pl-10">
				<div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-rose-500 to-yellow-500 rounded-full"></div>
				<div class="space-y-8">
					{#each steps as step, i}
						<div
							class="relative mobile-step"
							style="--step-index: {i}; --step-color: {step.color}"
						>
							<div
								class="absolute -left-6 top-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white"
								style="background: {step.color}"
							>
								{step.id}
							</div>
							<div class="pl-6 pt-1">
								<span
									class="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
									style="background: {step.color}20; color: {step.color}"
								>
									{step.title}
								</span>
								<p class="text-sm text-muted-foreground leading-relaxed">
									{step.description}
								</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Ring label text styling */
	.ring-label-text {
		font-size: 42px;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}

	/* Step labels outside SVG (Desktop) */
	.step-label {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		width: 200px;
	}

	.step-number {
		font-size: 2.75rem;
		font-weight: 800;
		color: var(--foreground);
		line-height: 1;
	}

	.step-desc {
		font-size: 0.875rem;
		color: var(--muted-foreground);
		line-height: 1.4;
		max-width: 180px;
	}

	/* Position step labels for left diagram */
	.step-label-01 {
		bottom: -80px;
		left: 45px;
	}

	.step-label-02 {
		top: -70px;
		left: 50%;
		transform: translateX(-50%);
	}

	/* Position step labels for right diagram */
	.step-label-03 {
		bottom: -80px;
		left: 50%;
		transform: translateX(-50%);
	}

	.step-label-04 {
		top: -70px;
		right: 20px;
	}

	/* Diagram container for positioning */
	.diagram-container {
		position: relative;
		padding-top: 80px;
		padding-bottom: 100px;
	}

	/* Animation: fade in diagrams */
	.diagram-container {
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 600ms ease-out, transform 600ms ease-out;
		transition-delay: calc(var(--diagram-index) * 150ms);
	}

	.is-visible .diagram-container {
		opacity: 1;
		transform: translateY(0);
	}

	/* Mobile step animation */
	.mobile-step {
		opacity: 0;
		transform: translateX(-10px);
		transition: opacity 400ms ease-out, transform 400ms ease-out;
		transition-delay: calc(100ms + var(--step-index) * 80ms);
	}

	.is-visible .mobile-step {
		opacity: 1;
		transform: translateX(0);
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.diagram-container,
		.mobile-step {
			transition: none !important;
			opacity: 1 !important;
			transform: none !important;
		}
	}

	/* Responsive adjustments */
	@media (min-width: 1024px) and (max-width: 1280px) {
		.step-number {
			font-size: 2.25rem;
		}
		.step-desc {
			font-size: 0.8rem;
			max-width: 160px;
		}
		.diagram-container {
			padding-top: 60px;
			padding-bottom: 80px;
		}
	}
</style>
