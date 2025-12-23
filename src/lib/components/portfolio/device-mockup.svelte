<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { onMount } from 'svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		liveUrl?: string;
		title: string;
		variant?: 'primary' | 'accent';
		class?: string;
	}

	let {
		liveUrl,
		title,
		variant = 'primary',
		class: className = '',
		...restProps
	}: Props = $props();

	let isVisible = $state(false);
	let iframeLoaded = $state(false);
	let containerEl: HTMLDivElement;

	// Lazy load iframe when component comes into view
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					isVisible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1, rootMargin: '200px' }
		);

		if (containerEl) {
			observer.observe(containerEl);
		}

		return () => observer.disconnect();
	});

	const gradientClass = $derived(
		variant === 'primary'
			? 'from-primary/20 via-primary/10 to-primary/5'
			: 'from-accent/20 via-accent/10 to-accent/5'
	);

	const accentColor = $derived(variant === 'primary' ? 'primary' : 'accent');
</script>

<div bind:this={containerEl} class="relative group {className}" {...restProps}>
	<!-- Main Laptop Mockup -->
	<div class="relative transition-all duration-700 ease-out group-hover:scale-[1.02]">
		<!-- Laptop Screen -->
		<div
			class="relative rounded-t-xl border-[8px] border-gray-800 bg-gray-800 shadow-2xl overflow-hidden"
		>
			<!-- Screen bezel reflection -->
			<div
				class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-10"
			></div>

			<!-- Screen content -->
			<div class="aspect-[16/10] bg-gradient-to-br {gradientClass} relative overflow-hidden">
				{#if liveUrl && isVisible}
					<!-- Live website iframe -->
					<div class="absolute inset-0">
						<!-- Loading skeleton -->
						{#if !iframeLoaded}
							<div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br {gradientClass}">
								<div class="text-center">
									<div class="w-8 h-8 border-2 border-{accentColor}/30 border-t-{accentColor} rounded-full animate-spin mx-auto mb-3"></div>
									<span class="text-sm text-muted-foreground">Loading preview...</span>
								</div>
							</div>
						{/if}
						<iframe
							src={liveUrl}
							title="{title} preview"
							class="w-full h-full border-0 transition-opacity duration-500 {iframeLoaded ? 'opacity-100' : 'opacity-0'}"
							loading="lazy"
							sandbox="allow-scripts allow-same-origin"
							onload={() => (iframeLoaded = true)}
							style="transform: scale(1); transform-origin: top left;"
						></iframe>
					</div>

					<!-- Hover overlay with CTA -->
					<div
						class="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6 z-20"
					>
						<a
							href={liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 px-6 py-3 bg-{accentColor} text-{accentColor}-foreground rounded-full font-medium text-sm shadow-lg shadow-{accentColor}/25 hover:shadow-{accentColor}/40 transition-all duration-300 hover:scale-105 translate-y-4 group-hover:translate-y-0"
						>
							Open Full Site
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline
									points="15 3 21 3 21 9"
								/><line x1="10" x2="21" y1="14" y2="3" /></svg
							>
						</a>
					</div>
				{:else}
					<!-- Placeholder when no URL or not yet visible -->
					<div class="absolute inset-0 flex items-center justify-center">
						<div class="text-center p-8">
							<div class="space-y-3 max-w-[80%] mx-auto">
								<div class="h-3 w-20 bg-{accentColor}/30 rounded mx-auto"></div>
								<div class="h-6 bg-foreground/10 rounded"></div>
								<div class="h-6 w-3/4 bg-foreground/10 rounded mx-auto"></div>
								<div class="h-3 bg-muted/50 rounded mt-6"></div>
								<div class="h-3 w-5/6 bg-muted/50 rounded"></div>
								<div class="flex gap-2 mt-6 justify-center">
									<div class="h-8 w-24 bg-{accentColor}/40 rounded-lg"></div>
									<div class="h-8 w-24 bg-border rounded-lg"></div>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- Laptop Base -->
		<div class="relative">
			<!-- Notch -->
			<div class="mx-auto w-20 h-1 bg-gray-700 rounded-b-lg"></div>
			<!-- Base -->
			<div
				class="mx-auto w-[80%] h-3 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-xl"
			></div>
			<!-- Shadow under laptop -->
			<div
				class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[60%] h-4 bg-black/20 blur-xl rounded-full transition-all duration-500 group-hover:w-[70%] group-hover:bg-black/30"
			></div>
		</div>
	</div>

	<!-- Floating Phone Mockup -->
	<div
		class="absolute -right-4 -bottom-4 md:right-8 md:-bottom-8 w-[100px] md:w-[140px] transition-all duration-700 ease-out group-hover:translate-x-2 group-hover:translate-y-2 group-hover:rotate-3 z-30"
	>
		<div
			class="relative rounded-[20px] border-[4px] border-gray-800 bg-gray-800 shadow-xl overflow-hidden"
		>
			<!-- Phone notch -->
			<div
				class="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-gray-800 rounded-b-xl z-20"
			></div>

			<!-- Phone screen -->
			<div class="aspect-[9/19] bg-gradient-to-br {gradientClass} relative overflow-hidden">
				{#if liveUrl && isVisible}
					<!-- Scale down the iframe for mobile preview -->
					<div class="absolute inset-0 overflow-hidden">
						<iframe
							src={liveUrl}
							title="{title} mobile preview"
							class="border-0 pointer-events-none"
							loading="lazy"
							sandbox="allow-scripts allow-same-origin"
							style="width: 375px; height: 812px; transform: scale(0.35); transform-origin: top left;"
						></iframe>
					</div>
				{:else}
					<!-- Mobile placeholder -->
					<div class="p-3 pt-6 space-y-2">
						<div class="h-2 w-8 bg-{accentColor}/30 rounded"></div>
						<div class="h-3 bg-foreground/10 rounded"></div>
						<div class="h-3 w-3/4 bg-foreground/10 rounded"></div>
						<div class="h-2 bg-muted/50 rounded mt-3"></div>
						<div class="h-2 bg-muted/50 rounded"></div>
						<div class="h-5 w-16 bg-{accentColor}/40 rounded mt-3"></div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Decorative elements -->
	<div
		class="absolute -top-6 -left-6 w-20 h-20 bg-{accentColor}/10 rounded-2xl -z-10 transition-all duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2"
	></div>
	<div
		class="absolute -bottom-8 -right-8 w-28 h-28 bg-{accentColor}/5 rounded-full -z-10 transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2"
	></div>
</div>
