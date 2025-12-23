<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { animate, stagger, inView } from 'motion';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const motionAnimate = animate as any;

	let sectionRef: HTMLElement | null = $state(null);
	let cardsRef: HTMLElement | null = $state(null);
	let progressRef: HTMLElement | null = $state(null);
	let prefersReducedMotion = $state(false);

	onMount(() => {
		if (browser) {
			prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			if (prefersReducedMotion) return;

			// Animate cards when in view
			if (cardsRef) {
				inView(cardsRef, () => {
					// Animate progress line - GPU accelerated with transform
					if (progressRef) {
						motionAnimate(
							progressRef,
							{ transform: ['scaleX(0)', 'scaleX(1)'] },
							{ duration: 0.8, easing: [0.4, 0, 0.2, 1] }
						);
					}

					// Animate cards with stagger - GPU accelerated
					const cards = cardsRef!.querySelectorAll('.process-card');
					motionAnimate(
						cards,
						{ opacity: [0, 1], transform: ['translateY(16px) translateZ(0)', 'translateY(0) translateZ(0)'] },
						{ duration: 0.4, delay: stagger(0.08), easing: [0.25, 0.1, 0.25, 1] }
					);
				}, { amount: 0.15 });
			}
		}
	});

	const steps = [
		{
			num: '01',
			title: 'Discovery',
			subtitle: 'Understanding your world',
			description: 'We dive into your business, audience, and goals. No generic questionnaires—just a real conversation about what success looks like for you.',
			details: ['Business goals & challenges', 'Target audience research'],
			icon: `<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round"/>`,
			color: '#0d9488',
			lightColor: '#ccfbf1'
		},
		{
			num: '02',
			title: 'Strategy',
			subtitle: 'Mapping the blueprint',
			description: 'Before any design work begins, the user journey, content structure, and conversion paths are mapped out. Strategy first, pixels later.',
			details: ['Information architecture', 'User flow mapping', 'Content strategy'],
			icon: `<path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke-linecap="round" stroke-linejoin="round"/>`,
			color: '#6366f1',
			lightColor: '#e0e7ff'
		},
		{
			num: '03',
			title: 'Design',
			subtitle: 'Bringing ideas to life',
			description: 'This is where vision becomes visual. You\'ll see your brand come alive with beauty balanced with usability.',
			details: ['Responsive layouts', 'Iterative refinement'],
			icon: `<path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round"/>`,
			color: '#f97316',
			lightColor: '#ffedd5'
		},
		{
			num: '04',
			title: 'Build',
			subtitle: 'Code that performs',
			description: 'Clean, modern code that loads fast and works flawlessly. No bloated templates—just development that\'s built to scale.',
			details: ['Modern tech stack', 'SEO implementation', 'Cross-browser testing'],
			icon: `<path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke-linecap="round" stroke-linejoin="round"/>`,
			color: '#e11d48',
			lightColor: '#ffe4e6'
		},
		{
			num: '05',
			title: 'Launch',
			subtitle: 'Going live with confidence',
			description: 'Your site goes live with thorough testing and a smooth handoff. I\'ll walk you through everything and stick around to make sure it\'s perfect.',
			details: ['Final QA & testing', 'Launch preparation', 'Ongoing support'],
			icon: `<path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-linecap="round" stroke-linejoin="round"/>`,
			color: '#eab308',
			lightColor: '#fef9c3'
		}
	];
</script>

<section
	bind:this={sectionRef}
	class="relative py-20 md:py-28 lg:py-32 overflow-hidden"
	aria-labelledby="process-heading"
>
	<!-- Background gradient -->
	<div class="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background"></div>

	<!-- Subtle dot pattern -->
	<div class="absolute inset-0 opacity-[0.02]" style="background-image: radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0); background-size: 32px 32px;"></div>

	<div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="text-center mb-16 md:mb-20">
			<span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
				The Process
			</span>
			<h2 id="process-heading" class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
				From first call to <span class="text-primary">final launch</span>
			</h2>
			<p class="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
				A transparent, collaborative process designed to eliminate surprises and deliver results.
			</p>
		</div>

		<!-- Desktop: Horizontal Timeline -->
		<div class="hidden lg:block relative pb-20" bind:this={cardsRef}>
			<!-- Progress line background -->
			<div class="absolute top-[60px] left-[10%] right-[10%] h-1 bg-border/50 rounded-full"></div>
			<!-- Animated progress line -->
			<div
				bind:this={progressRef}
				class="absolute top-[60px] left-[10%] h-1 bg-gradient-to-r from-teal-500 via-indigo-500 via-orange-500 via-rose-500 to-yellow-500 rounded-full"
				style="width: 80%; transform: {prefersReducedMotion ? 'scaleX(1)' : 'scaleX(0)'}; transform-origin: left;"
			></div>

			<div class="grid grid-cols-5 gap-6 items-stretch">
				{#each steps as step, i}
					<div
						class="process-card group"
						style="--color: {step.color}; --light-color: {step.lightColor}; opacity: {prefersReducedMotion ? 1 : 0}"
					>
						<!-- Number badge with ring -->
						<div class="step-badge">
							<div class="step-badge-ring"></div>
							<div class="step-badge-inner">
								{step.num}
							</div>
						</div>

						<!-- Card content -->
						<div class="card-inner">
							<!-- Icon -->
							<div class="step-icon">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									{@html step.icon}
								</svg>
							</div>

							<!-- Text -->
							<div class="card-text">
								<h3 class="text-lg font-bold mb-1">{step.title}</h3>
								<p class="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-3">{step.subtitle}</p>
								<p class="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
							</div>
						</div>

						<!-- Details tooltip - absolute positioned -->
						<div class="step-details">
							<ul class="space-y-1.5">
								{#each step.details as detail}
									<li class="flex items-center gap-2 text-xs text-muted-foreground">
										<svg class="w-3 h-3 flex-shrink-0" style="color: {step.color}" viewBox="0 0 20 20" fill="currentColor">
											<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
										</svg>
										{detail}
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Tablet: 2-column grid -->
		<div class="hidden md:grid lg:hidden grid-cols-2 gap-6">
			{#each steps as step, i}
				<div
					class="tablet-card"
					style="--color: {step.color}; --light-color: {step.lightColor}"
				>
					<div class="flex items-start gap-4">
						<div class="tablet-icon">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								{@html step.icon}
							</svg>
							<span class="tablet-num">{step.num}</span>
						</div>
						<div class="flex-1">
							<h3 class="text-lg font-bold mb-1">{step.title}</h3>
							<p class="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-2">{step.subtitle}</p>
							<p class="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Mobile: Vertical timeline -->
		<div class="md:hidden relative">
			<!-- Vertical progress line -->
			<div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-indigo-500 via-orange-500 via-rose-500 to-yellow-500 rounded-full"></div>

			<div class="space-y-6">
				{#each steps as step, i}
					<div
						class="mobile-card relative pl-16"
						style="--color: {step.color}; --light-color: {step.lightColor}"
					>
						<!-- Timeline node -->
						<div class="absolute left-3 top-4 w-7 h-7 rounded-full bg-background border-2 flex items-center justify-center" style="border-color: {step.color}">
							<span class="text-[10px] font-bold" style="color: {step.color}">{step.num}</span>
						</div>

						<!-- Card -->
						<div class="mobile-card-inner">
							<div class="flex items-center gap-3 mb-3">
								<div class="mobile-step-icon w-10 h-10 rounded-lg flex items-center justify-center" style="--light-color: {step.lightColor}; --color: {step.color}">
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={step.color} stroke-width="2">
										{@html step.icon}
									</svg>
								</div>
								<div>
									<h3 class="text-base font-bold leading-tight">{step.title}</h3>
									<p class="text-xs text-muted-foreground">{step.subtitle}</p>
								</div>
							</div>
							<p class="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	/* Desktop Cards */
	.process-card {
		position: relative;
		padding-top: 80px;
		display: flex;
		flex-direction: column;
	}

	/* Card inner - minimal transitions for performance */
	.card-inner {
		position: relative;
		padding: 1.25rem;
		flex: 1;
		display: flex;
		flex-direction: column;
		background: linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card)) 50%, var(--light-color) 150%);
		border: 1px solid hsl(var(--border));
		border-radius: 1rem;
		text-align: center;
		box-shadow: 0 4px 20px -8px rgba(0, 0, 0, 0.08);
		transform: translateY(0) translateZ(0);
		transition: transform 0.15s ease-out, border-color 0.15s ease-out;
		will-change: transform;
		overflow: hidden;
	}

	:global(.dark) .card-inner {
		background: linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card)) 80%, color-mix(in oklch, var(--color) 15%, transparent) 150%);
	}

	.process-card:hover .card-inner {
		transform: translateY(-4px) translateZ(0);
		border-color: var(--color);
	}

	/* Text content area */
	.card-text {
		margin-top: 1rem;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	/* Number badge with ring effect */
	.step-badge {
		position: absolute;
		top: 44px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
	}
	.step-badge-ring {
		position: absolute;
		inset: -4px;
		border-radius: 50%;
		border: 2px solid var(--color);
		opacity: 0.3;
		transform: scale(1) translateZ(0);
		transition: transform 0.15s ease-out, opacity 0.15s ease-out;
		will-change: transform, opacity;
	}
	.process-card:hover .step-badge-ring {
		opacity: 0.6;
		transform: scale(1.15) translateZ(0);
	}
	.step-badge-inner {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: var(--color);
		color: white;
		font-size: 0.75rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 12px -2px var(--color);
	}

	/* Icon */
	.step-icon {
		width: 52px;
		height: 52px;
		margin: 0 auto;
		border-radius: 0.875rem;
		background: var(--light-color);
		color: var(--color);
		display: flex;
		align-items: center;
		justify-content: center;
		transform: scale(1) translateZ(0);
		transition: transform 0.15s ease-out;
		will-change: transform;
	}

	:global(.dark) .step-icon {
		background: color-mix(in oklch, var(--color) 25%, transparent);
	}

	.process-card:hover .step-icon {
		transform: scale(1.08) translateZ(0);
	}

	/* Details tooltip - absolute positioned overlay */
	.step-details {
		position: absolute;
		left: 0;
		right: 0;
		top: 100%;
		margin-top: 0.5rem;
		padding: 0.75rem 1rem;
		background: hsl(var(--card));
		border: 1px solid var(--color);
		border-radius: 0.75rem;
		box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.15);
		opacity: 0;
		transform: translateY(-8px) translateZ(0);
		pointer-events: none;
		transition: opacity 0.15s ease-out, transform 0.15s ease-out;
		z-index: 20;
	}
	.process-card:hover .step-details {
		opacity: 1;
		transform: translateY(0) translateZ(0);
		pointer-events: auto;
	}

	/* Tablet Cards */
	.tablet-card {
		padding: 1.25rem;
		background: linear-gradient(135deg, hsl(var(--card)) 0%, var(--light-color) 200%);
		border: 1px solid hsl(var(--border));
		border-radius: 1rem;
		box-shadow: 0 2px 12px -4px rgba(0, 0, 0, 0.06);
	}

	:global(.dark) .tablet-card {
		background: linear-gradient(135deg, hsl(var(--card)) 0%, color-mix(in oklch, var(--color) 10%, transparent) 200%);
	}

	.tablet-icon {
		position: relative;
		width: 48px;
		height: 48px;
		flex-shrink: 0;
		border-radius: 0.75rem;
		background: var(--light-color);
		color: var(--color);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global(.dark) .tablet-icon {
		background: color-mix(in oklch, var(--color) 25%, transparent);
	}
	.tablet-num {
		position: absolute;
		top: -6px;
		right: -6px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--color);
		color: white;
		font-size: 0.6rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Mobile Cards */
	.mobile-card-inner {
		padding: 1rem;
		background: linear-gradient(135deg, hsl(var(--card)) 0%, var(--light-color) 250%);
		border: 1px solid hsl(var(--border));
		border-radius: 0.875rem;
		box-shadow: 0 2px 12px -4px rgba(0, 0, 0, 0.06);
	}

	:global(.dark) .mobile-card-inner {
		background: linear-gradient(135deg, hsl(var(--card)) 0%, color-mix(in oklch, var(--color) 10%, transparent) 250%);
	}

	.mobile-step-icon {
		background: var(--light-color);
	}

	:global(.dark) .mobile-step-icon {
		background: color-mix(in oklch, var(--color) 25%, transparent);
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.process-card,
		.card-inner,
		.step-icon,
		.step-details,
		.step-badge-ring {
			transition: none !important;
		}
	}
</style>
