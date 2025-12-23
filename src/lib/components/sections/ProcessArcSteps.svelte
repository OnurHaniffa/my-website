<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	interface ProcessStep {
		id: string;
		title: string;
		description: string;
		color: string;
		colorDark: string;
	}

	// Data-driven steps - edit titles, descriptions, colors here
	const steps: ProcessStep[] = [
		{
			id: '01',
			title: 'DISCOVER',
			description: 'We discuss your goals, audience, and vision.',
			color: '#14b8a6', // teal-500
			colorDark: '#0d9488'
		},
		{
			id: '02',
			title: 'DESIGN',
			description: 'Mockups and iteration until it feels right.',
			color: '#f97316', // orange-500
			colorDark: '#ea580c'
		},
		{
			id: '03',
			title: 'DEVELOP',
			description: 'Clean, performant code built to last.',
			color: '#f43f5e', // rose-500
			colorDark: '#e11d48'
		},
		{
			id: '04',
			title: 'REFINE',
			description: 'Testing and polishing every detail.',
			color: '#8b5cf6', // violet-500
			colorDark: '#7c3aed'
		},
		{
			id: '05',
			title: 'LAUNCH',
			description: 'Go live with confidence and support.',
			color: '#eab308', // yellow-500
			colorDark: '#ca8a04'
		}
	];

	let sectionRef = $state<HTMLElement | null>(null);
	let isVisible = $state(false);
	let prefersReducedMotion = $state(false);

	onMount(() => {
		if (browser) {
			prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			// If reduced motion, show immediately
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
				{ threshold: 0.2, rootMargin: '0px' }
			);

			if (sectionRef) {
				observer.observe(sectionRef);
			}

			return () => observer.disconnect();
		}
	});

	// SVG Geometry Configuration
	// Each arc is a half-donut. We arrange 5 arcs alternating up/down.
	// Arc positions: 01=up, 02=down, 03=up, 04=down, 05=up
	const config = {
		segmentWidth: 180,    // Width per segment
		arcRadius: 70,        // Outer radius of arc
		arcThickness: 28,     // Thickness of the donut band
		channelHeight: 8,     // Height of connecting channel
		totalWidth: 900,      // 5 segments × 180
		viewBoxHeight: 280    // Total height for the wave
	};

	// Generate arc path (half donut)
	function createArcPath(cx: number, cy: number, outerR: number, innerR: number, isTop: boolean): string {
		if (isTop) {
			// Arc opens downward (top position)
			return `
				M ${cx - outerR} ${cy}
				A ${outerR} ${outerR} 0 0 1 ${cx + outerR} ${cy}
				L ${cx + innerR} ${cy}
				A ${innerR} ${innerR} 0 0 0 ${cx - innerR} ${cy}
				Z
			`;
		} else {
			// Arc opens upward (bottom position)
			return `
				M ${cx - outerR} ${cy}
				A ${outerR} ${outerR} 0 0 0 ${cx + outerR} ${cy}
				L ${cx + innerR} ${cy}
				A ${innerR} ${innerR} 0 0 1 ${cx - innerR} ${cy}
				Z
			`;
		}
	}

	// Calculate positions for each step
	const segmentData = steps.map((step, i) => {
		const isTop = i % 2 === 0; // 0, 2, 4 are top; 1, 3 are bottom
		const cx = config.segmentWidth / 2 + i * config.segmentWidth;
		const cy = isTop ? 100 : 180; // Baseline for arc
		const outerR = config.arcRadius;
		const innerR = config.arcRadius - config.arcThickness;

		return {
			...step,
			index: i,
			isTop,
			cx,
			cy,
			path: createArcPath(cx, cy, outerR, innerR, isTop),
			// Text positions
			labelY: isTop ? cy - outerR / 2 - 5 : cy + outerR / 2 + 5,
			numberY: isTop ? cy + 30 : cy - 30,
			descY: isTop ? cy + 55 : cy - 55
		};
	});

	// Create the connecting channel path (white bridge between arcs)
	function createChannelPath(): string {
		const h = config.channelHeight;
		const midY = 140; // Middle of the wave
		let path = `M 0 ${midY - h / 2}`;

		// Draw channel that connects all arcs
		for (let i = 0; i < 5; i++) {
			const cx = config.segmentWidth / 2 + i * config.segmentWidth;
			const isTop = i % 2 === 0;
			const innerR = config.arcRadius - config.arcThickness;

			if (isTop) {
				// Curve up through the arc
				path += ` L ${cx - innerR} ${midY - h / 2}`;
				path += ` Q ${cx - innerR} ${100 - innerR}, ${cx} ${100 - innerR}`;
				path += ` Q ${cx + innerR} ${100 - innerR}, ${cx + innerR} ${midY - h / 2}`;
			} else {
				// Curve down through the arc
				path += ` L ${cx - innerR} ${midY - h / 2}`;
				path += ` Q ${cx - innerR} ${180 + innerR}, ${cx} ${180 + innerR}`;
				path += ` Q ${cx + innerR} ${180 + innerR}, ${cx + innerR} ${midY - h / 2}`;
			}
		}
		path += ` L ${config.totalWidth} ${midY - h / 2}`;
		path += ` L ${config.totalWidth} ${midY + h / 2}`;

		// Return path (mirror for bottom)
		for (let i = 4; i >= 0; i--) {
			const cx = config.segmentWidth / 2 + i * config.segmentWidth;
			const isTop = i % 2 === 0;
			const innerR = config.arcRadius - config.arcThickness;

			if (isTop) {
				path += ` L ${cx + innerR} ${midY + h / 2}`;
				path += ` Q ${cx + innerR} ${100 - innerR + h}, ${cx} ${100 - innerR + h}`;
				path += ` Q ${cx - innerR} ${100 - innerR + h}, ${cx - innerR} ${midY + h / 2}`;
			} else {
				path += ` L ${cx + innerR} ${midY + h / 2}`;
				path += ` Q ${cx + innerR} ${180 + innerR - h}, ${cx} ${180 + innerR - h}`;
				path += ` Q ${cx - innerR} ${180 + innerR - h}, ${cx - innerR} ${midY + h / 2}`;
			}
		}
		path += ` L 0 ${midY + h / 2} Z`;
		return path;
	}
</script>

<section
	bind:this={sectionRef}
	class="relative py-16 md:py-20 lg:py-24 overflow-hidden"
	class:is-visible={isVisible}
	aria-labelledby="process-heading"
>
	<!-- Subtle background -->
	<div class="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/20 pointer-events-none"></div>

	<div class="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
		<!-- Section Header -->
		<div class="text-center mb-10 md:mb-14">
			<span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
				</svg>
				How It Works
			</span>
			<h2 id="process-heading" class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
				My <span class="text-primary">Process</span>
			</h2>
		</div>

		<!-- Desktop/Tablet: Connected Wave SVG -->
		<div class="hidden md:block process-wave-container">
			<div class="relative mx-auto" style="max-width: {config.totalWidth}px;">
				<!-- The Wave SVG -->
				<svg
					viewBox="0 0 {config.totalWidth} {config.viewBoxHeight}"
					class="w-full h-auto process-wave-svg"
					preserveAspectRatio="xMidYMid meet"
					aria-hidden="true"
				>
					<defs>
						<!-- Gradients for each arc -->
						{#each segmentData as seg}
							<linearGradient id="arc-grad-{seg.index}" x1="0%" y1="0%" x2="100%" y2="100%">
								<stop offset="0%" stop-color={seg.color} />
								<stop offset="100%" stop-color={seg.colorDark} />
							</linearGradient>
							<!-- Dark overlay for depth -->
							<linearGradient id="arc-overlay-{seg.index}" x1="0%" y1={seg.isTop ? "0%" : "100%"} x2="0%" y2={seg.isTop ? "100%" : "0%"}>
								<stop offset="0%" stop-color="rgba(0,0,0,0)" />
								<stop offset="100%" stop-color="rgba(0,0,0,0.25)" />
							</linearGradient>
						{/each}

						<!-- Clip path for reveal animation -->
						<clipPath id="wave-reveal-clip">
							<rect
								x="0" y="0"
								width={config.totalWidth}
								height={config.viewBoxHeight}
								class="reveal-rect"
							/>
						</clipPath>
					</defs>

					<g clip-path="url(#wave-reveal-clip)">
						<!-- Connecting channel (white bridge) -->
						<path
							d="M 0 136
								 L 48 136 Q 48 58, 90 32 Q 132 58, 132 136
								 L 228 136 Q 228 222, 270 248 Q 312 222, 312 136
								 L 408 136 Q 408 58, 450 32 Q 492 58, 492 136
								 L 588 136 Q 588 222, 630 248 Q 672 222, 672 136
								 L 768 136 Q 768 58, 810 32 Q 852 58, 852 136
								 L 900 136
								 L 900 144
								 L 852 144 Q 852 66, 810 40 Q 768 66, 768 144
								 L 672 144 Q 672 230, 630 256 Q 588 230, 588 144
								 L 492 144 Q 492 66, 450 40 Q 408 66, 408 144
								 L 312 144 Q 312 230, 270 256 Q 228 230, 228 144
								 L 132 144 Q 132 66, 90 40 Q 48 66, 48 144
								 L 0 144 Z"
							fill="white"
							fill-opacity="0.95"
							class="channel-path"
						/>

						<!-- Arc 1: DISCOVER (top) -->
						<g class="arc-group" style="--arc-index: 0">
							<path d={createArcPath(90, 100, 68, 42, true)} fill="url(#arc-grad-0)" />
							<path d={createArcPath(90, 100, 68, 42, true)} fill="url(#arc-overlay-0)" />
							<text x="90" y="72" text-anchor="middle" class="arc-label">{steps[0].title}</text>
						</g>

						<!-- Arc 2: DESIGN (bottom) -->
						<g class="arc-group" style="--arc-index: 1">
							<path d={createArcPath(270, 180, 68, 42, false)} fill="url(#arc-grad-1)" />
							<path d={createArcPath(270, 180, 68, 42, false)} fill="url(#arc-overlay-1)" />
							<text x="270" y="208" text-anchor="middle" class="arc-label">{steps[1].title}</text>
						</g>

						<!-- Arc 3: DEVELOP (top) -->
						<g class="arc-group" style="--arc-index: 2">
							<path d={createArcPath(450, 100, 68, 42, true)} fill="url(#arc-grad-2)" />
							<path d={createArcPath(450, 100, 68, 42, true)} fill="url(#arc-overlay-2)" />
							<text x="450" y="72" text-anchor="middle" class="arc-label">{steps[2].title}</text>
						</g>

						<!-- Arc 4: REFINE (bottom) -->
						<g class="arc-group" style="--arc-index: 3">
							<path d={createArcPath(630, 180, 68, 42, false)} fill="url(#arc-grad-3)" />
							<path d={createArcPath(630, 180, 68, 42, false)} fill="url(#arc-overlay-3)" />
							<text x="630" y="208" text-anchor="middle" class="arc-label">{steps[3].title}</text>
						</g>

						<!-- Arc 5: LAUNCH (top) -->
						<g class="arc-group" style="--arc-index: 4">
							<path d={createArcPath(810, 100, 68, 42, true)} fill="url(#arc-grad-4)" />
							<path d={createArcPath(810, 100, 68, 42, true)} fill="url(#arc-overlay-4)" />
							<text x="810" y="72" text-anchor="middle" class="arc-label">{steps[4].title}</text>
						</g>
					</g>
				</svg>

				<!-- Text blocks positioned over the SVG -->
				<div class="absolute inset-0 pointer-events-none">
					<!-- Step 01: Below arc (top arc) -->
					<div class="step-text step-text-below" style="left: 10%; --step-index: 0">
						<div class="connector-dot"></div>
						<div class="connector-line"></div>
						<span class="step-number">{steps[0].id}</span>
						<p class="step-desc">{steps[0].description}</p>
					</div>

					<!-- Step 02: Above arc (bottom arc) -->
					<div class="step-text step-text-above" style="left: 30%; --step-index: 1">
						<p class="step-desc">{steps[1].description}</p>
						<span class="step-number">{steps[1].id}</span>
						<div class="connector-line"></div>
						<div class="connector-dot"></div>
					</div>

					<!-- Step 03: Below arc (top arc) -->
					<div class="step-text step-text-below" style="left: 50%; --step-index: 2">
						<div class="connector-dot"></div>
						<div class="connector-line"></div>
						<span class="step-number">{steps[2].id}</span>
						<p class="step-desc">{steps[2].description}</p>
					</div>

					<!-- Step 04: Above arc (bottom arc) -->
					<div class="step-text step-text-above" style="left: 70%; --step-index: 3">
						<p class="step-desc">{steps[3].description}</p>
						<span class="step-number">{steps[3].id}</span>
						<div class="connector-line"></div>
						<div class="connector-dot"></div>
					</div>

					<!-- Step 05: Below arc (top arc) -->
					<div class="step-text step-text-below" style="left: 90%; --step-index: 4">
						<div class="connector-dot"></div>
						<div class="connector-line"></div>
						<span class="step-number">{steps[4].id}</span>
						<p class="step-desc">{steps[4].description}</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Mobile: Vertical Timeline -->
		<div class="md:hidden">
			<div class="relative pl-8">
				<!-- Vertical line -->
				<div class="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-rose-500 to-yellow-500 rounded-full"></div>

				<div class="space-y-8">
					{#each steps as step, i}
						<div
							class="relative mobile-step"
							style="--step-index: {i}; --step-color: {step.color}"
						>
							<!-- Step marker -->
							<div
								class="absolute -left-5 top-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white"
								style="background: linear-gradient(135deg, {step.color}, {step.colorDark})"
							>
								{step.id}
							</div>

							<!-- Content -->
							<div class="pl-6 pt-1">
								<span
									class="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
									style="background: {step.color}20; color: {step.colorDark}"
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
	/* ============================================
	   REVEAL ANIMATION
	   ============================================ */

	/* Initial state: clip rect at x=0, width=0 */
	.reveal-rect {
		transform: scaleX(0);
		transform-origin: left center;
		transition: transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.is-visible .reveal-rect {
		transform: scaleX(1);
	}

	/* Text blocks: staggered fade in */
	.step-text {
		opacity: 0;
		transform: translateY(8px);
		transition: opacity 400ms ease-out, transform 400ms ease-out;
		transition-delay: calc(200ms + var(--step-index) * 100ms);
	}

	.is-visible .step-text {
		opacity: 1;
		transform: translateY(0);
	}

	/* Mobile steps stagger */
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

	/* ============================================
	   WAVE SVG STYLING
	   ============================================ */

	.process-wave-svg {
		display: block;
	}

	.arc-label {
		font-size: 13px;
		font-weight: 700;
		fill: white;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
	}

	.channel-path {
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
	}

	/* Arc hover effect */
	.arc-group {
		transition: transform 150ms ease-out, filter 150ms ease-out;
		cursor: default;
	}

	.arc-group:hover {
		filter: brightness(1.08) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
	}

	/* ============================================
	   TEXT BLOCKS (Desktop)
	   ============================================ */

	.step-text {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 180px;
		transform: translateX(-50%);
		text-align: center;
	}

	.step-text-below {
		top: 58%;
	}

	.step-text-above {
		top: 2%;
		flex-direction: column-reverse;
	}

	.step-number {
		font-size: 2.5rem;
		font-weight: 800;
		color: var(--foreground);
		line-height: 1;
		margin: 4px 0;
	}

	.step-desc {
		font-size: 0.8rem;
		color: var(--muted-foreground);
		line-height: 1.4;
		max-width: 160px;
	}

	.connector-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--muted-foreground);
		opacity: 0.5;
	}

	.connector-line {
		width: 1px;
		height: 20px;
		border-left: 1px dashed var(--muted-foreground);
		opacity: 0.4;
	}

	/* ============================================
	   REDUCED MOTION
	   ============================================ */

	@media (prefers-reduced-motion: reduce) {
		.reveal-rect,
		.step-text,
		.mobile-step,
		.arc-group {
			transition: none !important;
			animation: none !important;
		}

		.reveal-rect {
			transform: scaleX(1) !important;
		}

		.step-text,
		.mobile-step {
			opacity: 1 !important;
			transform: none !important;
		}
	}

	/* ============================================
	   RESPONSIVE
	   ============================================ */

	@media (max-width: 1024px) {
		.process-wave-container {
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;
			padding-bottom: 1rem;
		}

		.process-wave-container > div {
			min-width: 800px;
		}
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		.step-number {
			font-size: 2rem;
		}

		.step-desc {
			font-size: 0.75rem;
		}
	}
</style>
