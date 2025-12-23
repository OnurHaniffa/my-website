<script lang="ts">
	/**
	 * Live Demo Showcase - Interactive iframe embed of live websites
	 * Allows visitors to interact with the actual demo site directly on your portfolio
	 */
	import { onMount } from 'svelte';

	interface Props {
		liveUrl: string;
		title: string;
		tagline?: string;
		variant?: 'primary' | 'accent';
		class?: string;
	}

	let {
		liveUrl,
		title,
		tagline,
		variant = 'primary',
		class: className = ''
	}: Props = $props();

	let isLoading = $state(true);
	let isExpanded = $state(false);
	let viewMode = $state<'desktop' | 'tablet' | 'mobile'>('desktop');
	let iframeRef = $state<HTMLIFrameElement | null>(null);
	let hasError = $state(false);

	const accentColor = $derived(variant === 'primary' ? 'primary' : 'accent');

	// Viewport sizes for different devices
	const viewportSizes = {
		desktop: { width: '100%', height: '100%' },
		tablet: { width: '768px', height: '1024px' },
		mobile: { width: '375px', height: '812px' }
	};

	function handleIframeLoad() {
		isLoading = false;
	}

	function handleIframeError() {
		isLoading = false;
		hasError = true;
	}

	function toggleExpand() {
		isExpanded = !isExpanded;
		if (isExpanded) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	function openInNewTab() {
		window.open(liveUrl, '_blank', 'noopener,noreferrer');
	}

	onMount(() => {
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<!-- Expanded fullscreen overlay -->
{#if isExpanded}
	<div class="fixed inset-0 z-50 bg-background/95 backdrop-blur-md">
		<!-- Header controls -->
		<div class="absolute top-0 left-0 right-0 h-14 bg-card/80 backdrop-blur-sm border-b border-border/50 flex items-center justify-between px-4 z-10">
			<div class="flex items-center gap-4">
				<button
					onclick={toggleExpand}
					class="p-2 rounded-lg hover:bg-muted transition-colors"
					aria-label="Close preview"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M18 6 6 18"/><path d="m6 6 12 12"/>
					</svg>
				</button>
				<div>
					<h3 class="font-semibold">{title}</h3>
					<p class="text-xs text-muted-foreground truncate max-w-xs">{liveUrl}</p>
				</div>
			</div>

			<!-- Device switcher -->
			<div class="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
				<button
					onclick={() => viewMode = 'desktop'}
					class="p-2 rounded-md transition-colors {viewMode === 'desktop' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}"
					title="Desktop view"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>
					</svg>
				</button>
				<button
					onclick={() => viewMode = 'tablet'}
					class="p-2 rounded-md transition-colors {viewMode === 'tablet' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}"
					title="Tablet view"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="12" x2="12.01" y1="18" y2="18"/>
					</svg>
				</button>
				<button
					onclick={() => viewMode = 'mobile'}
					class="p-2 rounded-md transition-colors {viewMode === 'mobile' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}"
					title="Mobile view"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>
					</svg>
				</button>
			</div>

			<button
				onclick={openInNewTab}
				class="flex items-center gap-2 px-4 py-2 bg-{accentColor} text-{accentColor}-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>
				</svg>
				Open in New Tab
			</button>
		</div>

		<!-- Iframe container -->
		<div class="absolute top-14 left-0 right-0 bottom-0 flex items-center justify-center bg-muted/30 p-4">
			<div
				class="bg-background rounded-lg shadow-2xl overflow-hidden transition-all duration-500 {viewMode === 'desktop' ? 'w-full h-full' : ''}"
				style="{viewMode !== 'desktop' ? `width: ${viewportSizes[viewMode].width}; height: ${viewportSizes[viewMode].height}; max-height: calc(100vh - 6rem);` : ''}"
			>
				<iframe
					src={liveUrl}
					title="{title} live preview"
					class="w-full h-full border-0"
					loading="lazy"
					sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
				></iframe>
			</div>
		</div>
	</div>
{/if}

<!-- Main showcase card -->
<div class="relative group {className}">
	<!-- Glow effect -->
	<div class="absolute -inset-4 bg-gradient-to-r from-{accentColor}/20 via-{accentColor}/10 to-{accentColor}/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10"></div>

	<!-- Browser frame -->
	<div class="rounded-xl overflow-hidden border border-border/50 bg-card shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-{accentColor}/10">
		<!-- Browser header -->
		<div class="flex items-center gap-3 px-4 py-3 bg-muted/50 border-b border-border/50">
			<!-- Traffic lights -->
			<div class="flex gap-2">
				<div class="w-3 h-3 rounded-full bg-red-400/80"></div>
				<div class="w-3 h-3 rounded-full bg-yellow-400/80"></div>
				<div class="w-3 h-3 rounded-full bg-green-400/80"></div>
			</div>

			<!-- URL bar -->
			<div class="flex-1 flex items-center gap-2 px-4 py-1.5 bg-background rounded-lg border border-border/50">
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500">
					<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
					<path d="M7 11V7a5 5 0 0 1 10 0v4"/>
				</svg>
				<span class="text-sm text-muted-foreground truncate">
					{liveUrl.replace('https://', '')}
				</span>
			</div>

			<!-- Live indicator -->
			<div class="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full">
				<span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
				<span class="text-xs font-medium text-green-600 dark:text-green-400">LIVE</span>
			</div>
		</div>

		<!-- Iframe preview area -->
		<div class="relative aspect-[16/10] overflow-hidden bg-muted">
			{#if isLoading}
				<div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-{accentColor}/10 via-background to-{accentColor}/5">
					<div class="text-center space-y-4">
						<div class="w-12 h-12 rounded-full border-4 border-{accentColor}/20 border-t-{accentColor} animate-spin mx-auto"></div>
						<p class="text-sm text-muted-foreground">Loading live preview...</p>
					</div>
				</div>
			{/if}

			{#if hasError}
				<div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-{accentColor}/10 via-background to-{accentColor}/5">
					<div class="text-center space-y-4 p-8">
						<div class="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground">
								<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
							</svg>
						</div>
						<div>
							<p class="text-muted-foreground">Preview not available</p>
							<p class="text-xs text-muted-foreground/70 mt-1">Click below to view the live site</p>
						</div>
					</div>
				</div>
			{:else}
				<iframe
					bind:this={iframeRef}
					src={liveUrl}
					title="{title} preview"
					class="w-full h-full border-0 pointer-events-none"
					class:opacity-0={isLoading}
					class:opacity-100={!isLoading}
					loading="lazy"
					sandbox="allow-scripts allow-same-origin"
					onload={handleIframeLoad}
					onerror={handleIframeError}
				></iframe>
			{/if}

			<!-- Hover overlay with actions -->
			<div class="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent flex flex-col items-center justify-end pb-8 opacity-0 group-hover:opacity-100 transition-all duration-300">
				<div class="text-center space-y-4">
					{#if tagline}
						<p class="text-{accentColor} font-medium">{tagline}</p>
					{/if}
					<div class="flex gap-3">
						<button
							onclick={toggleExpand}
							class="inline-flex items-center gap-2 px-6 py-3 bg-{accentColor} text-{accentColor}-foreground rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/>
							</svg>
							Interactive Demo
						</button>
						<button
							onclick={openInNewTab}
							class="inline-flex items-center gap-2 px-6 py-3 bg-background/90 backdrop-blur-sm text-foreground rounded-full font-medium border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>
							</svg>
							Open Site
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Title below -->
	<div class="mt-4 text-center">
		<h3 class="font-bold text-lg">{title}</h3>
		{#if tagline}
			<p class="text-sm text-muted-foreground mt-1">{tagline}</p>
		{/if}
	</div>
</div>
