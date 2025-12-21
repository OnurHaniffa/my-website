<script lang="ts">
	/**
	 * Browser Window Style - Clean, minimal browser frame
	 */
	interface Props {
		desktopImage?: string;
		liveUrl?: string;
		title: string;
		variant?: 'primary' | 'accent';
		class?: string;
	}

	let {
		desktopImage,
		liveUrl,
		title,
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
	<!-- Glow effect -->
	<div
		class="absolute -inset-4 bg-gradient-to-r from-{accentColor}/20 via-{accentColor}/10 to-{accentColor}/20 rounded-3xl blur-2xl transition-all duration-500 -z-10"
		class:opacity-0={!isHovered}
		class:opacity-100={isHovered}
	></div>

	<!-- Browser Window -->
	<div
		class="rounded-xl overflow-hidden border border-border/50 bg-card shadow-2xl transition-all duration-500 {isHovered ? (variant === 'primary' ? 'shadow-primary/10' : 'shadow-accent/10') : ''}"
		style="transform: scale({isHovered ? 1.02 : 1});"
	>
		<!-- Browser Header -->
		<div class="flex items-center gap-3 px-4 py-3 bg-muted/50 border-b border-border/50">
			<!-- Traffic lights -->
			<div class="flex gap-2">
				<div class="w-3 h-3 rounded-full bg-red-400/80 transition-transform duration-300 hover:scale-110"></div>
				<div class="w-3 h-3 rounded-full bg-yellow-400/80 transition-transform duration-300 hover:scale-110"></div>
				<div class="w-3 h-3 rounded-full bg-green-400/80 transition-transform duration-300 hover:scale-110"></div>
			</div>

			<!-- URL Bar -->
			<div class="flex-1 flex items-center gap-2 px-4 py-1.5 bg-background rounded-lg border border-border/50">
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500">
					<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
					<path d="M7 11V7a5 5 0 0 1 10 0v4"/>
				</svg>
				<span class="text-sm text-muted-foreground truncate">
					{liveUrl?.replace('https://', '') || 'yoursite.com'}
				</span>
			</div>

			<!-- Browser actions -->
			<div class="flex gap-2">
				<div class="w-8 h-8 rounded-lg bg-background/50 flex items-center justify-center">
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted-foreground"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
				</div>
			</div>
		</div>

		<!-- Browser Content -->
		<div class="aspect-[16/10] relative overflow-hidden bg-muted">
			{#if desktopImage}
				<img
					src={desktopImage}
					alt="{title} preview"
					class="w-full h-full object-cover object-top transition-transform duration-[2s] ease-out"
					style="transform: scale({isHovered ? 1.05 : 1});"
				/>
			{:else}
				<!-- Placeholder -->
				<div class="absolute inset-0 bg-gradient-to-br from-{accentColor}/10 via-background to-{accentColor}/5 flex items-center justify-center">
					<div class="text-center space-y-4">
						<div class="w-16 h-16 rounded-2xl bg-{accentColor}/10 mx-auto flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-{accentColor}/50">
								<rect width="18" height="18" x="3" y="3" rx="2"/>
								<circle cx="9" cy="9" r="2"/>
								<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
							</svg>
						</div>
						<p class="text-sm text-muted-foreground">Screenshot</p>
					</div>
				</div>
			{/if}

			<!-- Hover overlay -->
			{#if liveUrl}
				<div
					class="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex items-end justify-center pb-8 transition-all duration-300"
					class:opacity-0={!isHovered}
					class:opacity-100={isHovered}
				>
					<a
						href={liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 px-6 py-3 bg-{accentColor} text-{accentColor}-foreground rounded-full font-medium shadow-lg transition-all duration-300 hover:scale-105"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
							<polyline points="15 3 21 3 21 9"/>
							<line x1="10" x2="21" y1="14" y2="3"/>
						</svg>
						Visit Site
					</a>
				</div>
			{/if}
		</div>
	</div>
</div>
