<script lang="ts">
	/**
	 * Floating Screenshots - No frames, just clean images with shadows
	 */
	interface Props {
		desktopImage?: string;
		mobileImage?: string;
		liveUrl?: string;
		title: string;
		variant?: 'primary' | 'accent';
		class?: string;
	}

	let {
		desktopImage,
		mobileImage,
		liveUrl,
		title,
		variant = 'primary',
		class: className = ''
	}: Props = $props();

	let isHovered = $state(false);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let containerEl: HTMLDivElement;

	function handleMouseMove(e: MouseEvent) {
		if (!containerEl) return;
		const rect = containerEl.getBoundingClientRect();
		mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
		mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
	}

	const accentColor = variant === 'primary' ? 'primary' : 'accent';
</script>

<div
	bind:this={containerEl}
	class="relative group perspective-1000 {className}"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => {
		isHovered = false;
		mouseX = 0;
		mouseY = 0;
	}}
	onmousemove={handleMouseMove}
	role="presentation"
>
	<!-- Background glow -->
	<div
		class="absolute inset-0 bg-gradient-to-br from-{accentColor}/20 to-transparent rounded-3xl blur-3xl transition-all duration-700 -z-10"
		class:opacity-0={!isHovered}
		class:opacity-100={isHovered}
		class:scale-110={isHovered}
	></div>

	<!-- Main desktop screenshot -->
	<div
		class="relative transition-all duration-500 ease-out"
		style="transform: rotateY({mouseX * 0.5}deg) rotateX({-mouseY * 0.5}deg);"
	>
		<div
			class="rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ring-1 ring-border/10 {isHovered ? (variant === 'primary' ? 'shadow-primary/20' : 'shadow-accent/20') : ''}"
			style="transform: scale({isHovered ? 1.02 : 1});"
		>
			{#if desktopImage}
				<img
					src={desktopImage}
					alt="{title} desktop"
					class="w-full aspect-[16/10] object-cover object-top"
				/>
			{:else}
				<div class="w-full aspect-[16/10] bg-gradient-to-br from-{accentColor}/10 via-muted to-{accentColor}/5 flex items-center justify-center">
					<div class="text-center space-y-3">
						<div class="w-14 h-14 rounded-xl bg-{accentColor}/10 mx-auto flex items-center justify-center animate-pulse">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-{accentColor}/50">
								<rect width="18" height="18" x="3" y="3" rx="2"/>
								<circle cx="9" cy="9" r="2"/>
								<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
							</svg>
						</div>
						<p class="text-sm text-muted-foreground">Desktop Screenshot</p>
					</div>
				</div>
			{/if}

			<!-- Gradient overlay -->
			<div class="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

			<!-- CTA on hover -->
			{#if liveUrl}
				<div
					class="absolute inset-0 flex items-center justify-center transition-all duration-300"
					class:opacity-0={!isHovered}
					class:opacity-100={isHovered}
				>
					<a
						href={liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 px-8 py-4 bg-background/90 backdrop-blur-sm text-foreground rounded-full font-medium shadow-2xl border border-border/50 transition-all duration-300 hover:bg-background hover:scale-105"
					>
						View Live Site
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
						</svg>
					</a>
				</div>
			{/if}
		</div>

		<!-- Floating mobile screenshot -->
		{#if mobileImage || !desktopImage}
			<div
				class="absolute -right-4 -bottom-8 md:-right-8 md:-bottom-12 w-[80px] md:w-[110px] transition-all duration-700 ease-out z-10"
				style="transform: translateX({isHovered ? 10 : 0}px) translateY({isHovered ? 10 : 0}px) rotate({isHovered ? 8 : 4}deg);"
			>
				<div class="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/20 bg-background">
					{#if mobileImage}
						<img
							src={mobileImage}
							alt="{title} mobile"
							class="w-full aspect-[9/16] object-cover object-top"
						/>
					{:else}
						<div class="w-full aspect-[9/16] bg-gradient-to-br from-{accentColor}/10 to-muted flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-{accentColor}/40">
								<rect width="14" height="20" x="5" y="2" rx="2"/>
								<path d="M12 18h.01"/>
							</svg>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>

	<!-- Decorative elements -->
	<div
		class="absolute -top-4 -left-4 w-20 h-20 bg-{accentColor}/10 rounded-2xl -z-10 transition-all duration-500"
		style="transform: translate({isHovered ? -8 : 0}px, {isHovered ? -8 : 0}px) rotate(-6deg);"
	></div>
	<div
		class="absolute -bottom-6 -right-6 w-24 h-24 bg-{accentColor}/5 rounded-full -z-10 transition-all duration-500"
		style="transform: translate({isHovered ? 8 : 0}px, {isHovered ? 8 : 0}px);"
	></div>
</div>

<style>
	.perspective-1000 {
		perspective: 1000px;
	}
</style>
