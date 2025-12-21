<script lang="ts">
	/**
	 * Full-Width Hero - Cinematic, edge-to-edge showcase
	 */
	interface Props {
		desktopImage?: string;
		liveUrl?: string;
		title: string;
		tagline?: string;
		variant?: 'primary' | 'accent';
		class?: string;
	}

	let {
		desktopImage,
		liveUrl,
		title,
		tagline,
		variant = 'primary',
		class: className = ''
	}: Props = $props();

	let isHovered = $state(false);

	const accentColor = variant === 'primary' ? 'primary' : 'accent';
</script>

<div
	class="relative group {className}"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	role="presentation"
>
	<!-- Main image container -->
	<div class="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border/10">
		<!-- Screenshot -->
		<div class="aspect-[21/9] md:aspect-[2.5/1] relative overflow-hidden">
			{#if desktopImage}
				<img
					src={desktopImage}
					alt="{title} showcase"
					class="w-full h-full object-cover object-top transition-transform duration-[4s] ease-out"
					style="transform: scale({isHovered ? 1.08 : 1});"
				/>
			{:else}
				<div class="w-full h-full bg-gradient-to-br from-{accentColor}/10 via-muted to-{accentColor}/5 flex items-center justify-center">
					<div class="text-center space-y-4">
						<div class="w-20 h-20 rounded-2xl bg-{accentColor}/10 mx-auto flex items-center justify-center animate-pulse">
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-{accentColor}/50">
								<rect width="18" height="18" x="3" y="3" rx="2"/>
								<circle cx="9" cy="9" r="2"/>
								<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
							</svg>
						</div>
						<p class="text-lg text-muted-foreground">Full Width Screenshot</p>
					</div>
				</div>
			{/if}

			<!-- Gradient overlays -->
			<div class="absolute inset-0 bg-gradient-to-r from-background/90 via-background/20 to-transparent"></div>
			<div class="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
		</div>

		<!-- Content overlay -->
		<div class="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14">
			<div class="max-w-xl">
				<!-- Title -->
				<h3
					class="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight transition-transform duration-500"
					style="transform: translateY({isHovered ? -8 : 0}px);"
				>
					{title}
				</h3>

				<!-- Tagline -->
				{#if tagline}
					<p
						class="mt-2 md:mt-3 text-lg md:text-xl text-{accentColor} font-medium transition-all duration-500"
						style="transform: translateY({isHovered ? -4 : 0}px); opacity: {isHovered ? 1 : 0.8};"
					>
						{tagline}
					</p>
				{/if}

				<!-- CTA -->
				{#if liveUrl}
					<div
						class="mt-6 transition-all duration-500"
						style="transform: translateY({isHovered ? 0 : 10}px); opacity: {isHovered ? 1 : 0};"
					>
						<a
							href={liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-3 px-6 py-3 bg-{accentColor} text-{accentColor}-foreground rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="12" cy="12" r="10"/>
								<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
								<path d="M2 12h20"/>
							</svg>
							Explore Live Site
						</a>
					</div>
				{/if}
			</div>
		</div>

		<!-- Corner accent -->
		<div class="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48">
			<div
				class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-{accentColor}/20 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 transition-all duration-700"
				class:scale-150={isHovered}
				class:opacity-100={isHovered}
				class:opacity-50={!isHovered}
			></div>
		</div>
	</div>
</div>
