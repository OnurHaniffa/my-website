<script lang="ts">
	/**
	 * Bento Grid - Asymmetric grid with multiple views
	 */
	interface Props {
		desktopImage?: string;
		mobileImage?: string;
		liveUrl?: string;
		title: string;
		tagline?: string;
		services?: string[];
		variant?: 'primary' | 'accent';
		class?: string;
	}

	let {
		desktopImage,
		mobileImage,
		liveUrl,
		title,
		tagline,
		services = [],
		variant = 'primary',
		class: className = ''
	}: Props = $props();

	let isHovered = $state(false);

	const accentColor = $derived(variant === 'primary' ? 'primary' : 'accent');
</script>

<div
	class="group {className}"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	role="presentation"
>
	<div class="grid grid-cols-4 grid-rows-3 gap-3 md:gap-4 h-[400px] md:h-[500px]">
		<!-- Main large screenshot -->
		<div class="col-span-3 row-span-2 relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-border/10 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-{accentColor}/10">
			{#if desktopImage}
				<img
					src={desktopImage}
					alt="{title} main view"
					class="w-full h-full object-cover object-top transition-transform duration-[3s] ease-out"
					style="transform: scale({isHovered ? 1.05 : 1});"
				/>
			{:else}
				<div class="w-full h-full bg-gradient-to-br from-{accentColor}/10 via-muted to-{accentColor}/5 flex items-center justify-center">
					<div class="text-center space-y-3">
						<div class="w-16 h-16 rounded-2xl bg-{accentColor}/10 mx-auto flex items-center justify-center animate-pulse">
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-{accentColor}/50">
								<rect width="18" height="18" x="3" y="3" rx="2"/>
								<circle cx="9" cy="9" r="2"/>
								<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
							</svg>
						</div>
						<p class="text-muted-foreground">Desktop View</p>
					</div>
				</div>
			{/if}

			<!-- Gradient overlay -->
			<div class="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

			<!-- Live site button -->
			{#if liveUrl}
				<a
					href={liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="absolute bottom-4 left-4 inline-flex items-center gap-2 px-5 py-2.5 bg-{accentColor} text-{accentColor}-foreground rounded-full font-medium text-sm shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"/>
						<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
						<path d="M2 12h20"/>
					</svg>
					Live Site
				</a>
			{/if}
		</div>

		<!-- Mobile screenshot -->
		<div class="col-span-1 row-span-2 relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-border/10 transition-all duration-500 hover:scale-[1.02]">
			{#if mobileImage}
				<img
					src={mobileImage}
					alt="{title} mobile view"
					class="w-full h-full object-cover object-top"
				/>
			{:else}
				<div class="w-full h-full bg-gradient-to-br from-{accentColor}/5 via-muted to-{accentColor}/10 flex items-center justify-center">
					<div class="text-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-{accentColor}/40 mx-auto mb-2">
							<rect width="14" height="20" x="5" y="2" rx="2"/>
							<path d="M12 18h.01"/>
						</svg>
						<p class="text-xs text-muted-foreground">Mobile</p>
					</div>
				</div>
			{/if}
		</div>

		<!-- Info card -->
		<div class="col-span-2 row-span-1 relative rounded-2xl overflow-hidden bg-card border border-border/50 p-4 md:p-5 flex flex-col justify-center transition-all duration-300 hover:border-{accentColor}/30 hover:shadow-lg">
			<h3 class="font-bold text-lg md:text-xl truncate">{title}</h3>
			{#if tagline}
				<p class="text-sm text-{accentColor} font-medium mt-1 truncate">{tagline}</p>
			{/if}
		</div>

		<!-- Services/Tags card -->
		<div class="col-span-2 row-span-1 relative rounded-2xl overflow-hidden bg-muted/50 border border-border/50 p-4 flex items-center transition-all duration-300 hover:bg-muted">
			<div class="flex flex-wrap gap-2">
				{#each services.slice(0, 3) as service}
					<span class="text-xs px-3 py-1 rounded-full bg-background border border-border/50 text-muted-foreground">
						{service}
					</span>
				{/each}
				{#if services.length === 0}
					<span class="text-xs text-muted-foreground">Web Design • Development</span>
				{/if}
			</div>
		</div>
	</div>
</div>
