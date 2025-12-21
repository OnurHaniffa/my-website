<script lang="ts">
	/**
	 * Stacked Windows Showcase - Multiple overlapping windows
	 * Shows different pages/views in a cascading layout
	 */
	interface Props {
		images: string[];
		liveUrl?: string;
		title: string;
		variant?: 'primary' | 'accent';
		class?: string;
	}

	let {
		images = [],
		liveUrl,
		title,
		variant = 'primary',
		class: className = ''
	}: Props = $props();

	let activeIndex = $state(0);
	let isHovered = $state(false);

	const accentColor = variant === 'primary' ? 'primary' : 'accent';

	// Ensure we have at least 3 placeholder slots
	const displayImages = [...images];
	while (displayImages.length < 3) {
		displayImages.push('');
	}

	function setActive(index: number) {
		activeIndex = index;
	}

	function getTransform(index: number): string {
		const offset = index - activeIndex;
		const xOffset = offset * 30;
		const yOffset = offset * 20;
		const rotate = offset * 3;
		const scale = 1 - Math.abs(offset) * 0.05;
		const zIndex = 10 - Math.abs(offset);

		return `translateX(${xOffset}px) translateY(${yOffset}px) rotate(${rotate}deg) scale(${scale})`;
	}

	function getZIndex(index: number): number {
		return 10 - Math.abs(index - activeIndex);
	}
</script>

<div
	class="relative group {className}"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	role="presentation"
>
	<!-- Glow background -->
	<div
		class="absolute inset-0 bg-gradient-to-br from-{accentColor}/20 to-{accentColor}/5 rounded-3xl blur-3xl transition-all duration-700 -z-10"
		class:opacity-0={!isHovered}
		class:opacity-100={isHovered}
		class:scale-110={isHovered}
	></div>

	<!-- Main stacked area -->
	<div class="relative h-[350px] md:h-[450px] mx-auto max-w-2xl">
		<!-- Stacked windows -->
		{#each displayImages.slice(0, 3) as image, index}
			<button
				class="absolute left-1/2 top-1/2 w-[85%] max-w-xl -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-{accentColor}"
				style="
					transform: translate(-50%, -50%) {getTransform(index)};
					z-index: {getZIndex(index)};
				"
				onclick={() => setActive(index)}
				onkeydown={(e) => e.key === 'Enter' && setActive(index)}
				aria-label="View page {index + 1}"
			>
				<!-- Window frame -->
				<div
					class="rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ring-1 ring-border/20 {index === activeIndex ? (variant === 'primary' ? 'shadow-primary/25 ring-primary/30' : 'shadow-accent/25 ring-accent/30') : ''}"
				>
					<!-- Browser header -->
					<div class="flex items-center gap-2 px-4 py-2.5 bg-gray-900 border-b border-gray-800">
						<div class="flex gap-1.5">
							<div class="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
							<div class="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
							<div class="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
						</div>
						<div class="flex-1 mx-2">
							<div class="bg-gray-800 rounded px-3 py-1 text-xs text-gray-400 text-center">
								Page {index + 1}
							</div>
						</div>
					</div>

					<!-- Screen content -->
					<div class="aspect-[16/10] relative bg-gray-950 overflow-hidden">
						{#if image}
							<img
								src={image}
								alt="{title} page {index + 1}"
								class="w-full h-full object-cover object-top transition-transform duration-[2s]"
								class:scale-105={index === activeIndex && isHovered}
							/>
						{:else}
							<div class="w-full h-full bg-gradient-to-br from-{accentColor}/15 via-muted to-{accentColor}/10 flex items-center justify-center">
								<div class="text-center space-y-3">
									<div class="w-12 h-12 rounded-xl bg-{accentColor}/15 mx-auto flex items-center justify-center">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-{accentColor}/60">
											<rect width="18" height="18" x="3" y="3" rx="2"/>
											<circle cx="9" cy="9" r="2"/>
											<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
										</svg>
									</div>
									<p class="text-sm text-muted-foreground">Page {index + 1}</p>
								</div>
							</div>
						{/if}

						<!-- Active indicator glow -->
						{#if index === activeIndex}
							<div class="absolute inset-0 ring-2 ring-{accentColor}/50 ring-inset rounded-b-xl pointer-events-none"></div>
						{/if}
					</div>
				</div>
			</button>
		{/each}
	</div>

	<!-- Navigation dots -->
	<div class="flex justify-center gap-2 mt-6">
		{#each displayImages.slice(0, 3) as _, index}
			<button
				class="w-2.5 h-2.5 rounded-full transition-all duration-300 {index === activeIndex ? `bg-${accentColor} scale-125` : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'}"
				onclick={() => setActive(index)}
				aria-label="Go to page {index + 1}"
			></button>
		{/each}
	</div>

	<!-- Title and CTA -->
	<div class="text-center mt-8">
		<h3 class="text-xl font-bold">{title}</h3>
		{#if liveUrl}
			<a
				href={liveUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 mt-4 text-{accentColor} font-medium hover:underline transition-all duration-300"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
				</svg>
				View Live Site
			</a>
		{/if}
	</div>

	<!-- Background decorations -->
	<div
		class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-{accentColor}/10 to-transparent rounded-full blur-2xl -z-10 transition-all duration-700"
		style="transform: translate({isHovered ? 10 : 0}px, {isHovered ? -10 : 0}px);"
	></div>
	<div
		class="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-{accentColor}/10 to-transparent rounded-full blur-2xl -z-10 transition-all duration-700"
		style="transform: translate({isHovered ? -10 : 0}px, {isHovered ? 10 : 0}px);"
	></div>
</div>
