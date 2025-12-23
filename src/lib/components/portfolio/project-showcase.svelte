<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { onMount } from 'svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
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
		class: className = '',
		...restProps
	}: Props = $props();

	let isVisible = $state(false);
	let isHovered = $state(false);
	let containerEl: HTMLDivElement;
	let mouseX = $state(0);
	let mouseY = $state(0);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					isVisible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1, rootMargin: '100px' }
		);

		if (containerEl) {
			observer.observe(containerEl);
		}

		return () => observer.disconnect();
	});

	function handleMouseMove(e: MouseEvent) {
		if (!containerEl) return;
		const rect = containerEl.getBoundingClientRect();
		mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
		mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
	}

	const gradientClass = $derived(
		variant === 'primary'
			? 'from-primary/30 via-primary/10 to-accent/20'
			: 'from-accent/30 via-accent/10 to-primary/20'
	);

	const glowColor = $derived(variant === 'primary' ? 'primary' : 'accent');
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
	{...restProps}
>
	<!-- Animated background glow -->
	<div
		class="absolute -inset-4 bg-gradient-to-r {gradientClass} rounded-3xl blur-2xl opacity-0 transition-all duration-700 -z-10"
		class:opacity-60={isHovered}
		class:scale-105={isHovered}
	></div>

	<!-- Floating particles -->
	<div class="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
		{#each Array(5) as _, i}
			<div
				class="absolute w-2 h-2 rounded-full bg-{glowColor}/40 animate-float"
				style="
					left: {20 + i * 15}%;
					top: {10 + i * 18}%;
					animation-delay: {i * 0.5}s;
					animation-duration: {3 + i * 0.5}s;
				"
			></div>
		{/each}
	</div>

	<!-- Main Laptop Mockup -->
	<div
		class="relative transition-all duration-500 ease-out"
		style="transform: rotateY({mouseX * 0.3}deg) rotateX({-mouseY * 0.3}deg) scale({isHovered ? 1.02 : 1});"
	>
		<!-- Laptop Screen -->
		<div
			class="relative rounded-t-2xl border-[8px] border-gray-900 bg-gray-900 shadow-2xl overflow-hidden transition-shadow duration-500 {isHovered ? (variant === 'primary' ? 'shadow-primary/20' : 'shadow-accent/20') : ''}"
		>
			<!-- Screen bezel reflection -->
			<div
				class="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none z-10"
			></div>

			<!-- Screen content -->
			<div class="aspect-[16/10] relative overflow-hidden bg-gray-950">
				{#if desktopImage}
					<!-- Screenshot image with Ken Burns effect -->
					<div class="absolute inset-0 overflow-hidden">
						<img
							src={desktopImage}
							alt="{title} desktop preview"
							class="w-full h-full object-cover object-top transition-all duration-[3s] ease-out"
							class:scale-110={isHovered}
							class:opacity-0={!isVisible}
							class:opacity-100={isVisible}
							style="transition: transform 3s ease-out, opacity 0.5s ease-out;"
						/>
					</div>

					<!-- Gradient overlay for depth -->
					<div class="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent"></div>
				{:else}
					<!-- Animated placeholder -->
					<div class="absolute inset-0 bg-gradient-to-br {gradientClass} flex items-center justify-center">
						<div class="text-center p-8 space-y-4">
							<div class="relative">
								<div class="w-16 h-16 rounded-2xl bg-{glowColor}/20 mx-auto flex items-center justify-center animate-pulse">
									<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-{glowColor}">
										<rect width="18" height="18" x="3" y="3" rx="2"/>
										<circle cx="9" cy="9" r="2"/>
										<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
									</svg>
								</div>
								<!-- Animated ring -->
								<div class="absolute inset-0 w-16 h-16 mx-auto rounded-2xl border-2 border-{glowColor}/30 animate-ping"></div>
							</div>
							<p class="text-sm text-muted-foreground">Screenshot coming soon</p>
						</div>
					</div>
				{/if}

				<!-- Hover overlay with CTA -->
				{#if liveUrl}
					<div
						class="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent flex items-end justify-center pb-8 z-20 transition-all duration-500"
						class:opacity-0={!isHovered}
						class:opacity-100={isHovered}
					>
						<a
							href={liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 px-6 py-3 bg-{glowColor} text-{glowColor}-foreground rounded-full font-medium text-sm shadow-lg shadow-{glowColor}/30 hover:shadow-{glowColor}/50 transition-all duration-300 hover:scale-105 translate-y-4"
							class:translate-y-0={isHovered}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="12" cy="12" r="10"/>
								<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
								<path d="M2 12h20"/>
							</svg>
							Visit Live Site
						</a>
					</div>
				{/if}
			</div>
		</div>

		<!-- Laptop Base with reflection -->
		<div class="relative">
			<div class="mx-auto w-24 h-1.5 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg"></div>
			<div class="mx-auto w-[85%] h-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-xl shadow-lg"></div>
			<!-- Reflection line -->
			<div class="mx-auto w-[60%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent mt-0.5"></div>
		</div>

		<!-- Shadow under laptop -->
		<div
			class="absolute -bottom-6 left-1/2 -translate-x-1/2 h-8 blur-2xl rounded-full transition-all duration-500 {isHovered ? 'w-[80%] bg-black/40' : 'w-[70%] bg-black/30'}"
		></div>
	</div>

	<!-- Floating Phone Mockup -->
	<div
		class="absolute -right-2 -bottom-2 md:right-4 md:-bottom-4 w-[90px] md:w-[120px] transition-all duration-700 ease-out z-30"
		style="transform: translateX({isHovered ? 8 : 0}px) translateY({isHovered ? 8 : 0}px) rotate({isHovered ? 6 : 3}deg);"
	>
		<div class="relative rounded-[24px] border-[4px] border-gray-900 bg-gray-900 shadow-xl overflow-hidden">
			<!-- Phone notch -->
			<div class="absolute top-1 left-1/2 -translate-x-1/2 w-14 h-5 bg-gray-900 rounded-b-2xl z-20 flex items-center justify-center">
				<div class="w-8 h-2 bg-gray-800 rounded-full"></div>
			</div>

			<!-- Phone screen -->
			<div class="aspect-[9/19] relative overflow-hidden bg-gray-950">
				{#if mobileImage || desktopImage}
					<img
						src={mobileImage || desktopImage}
						alt="{title} mobile preview"
						class="w-full h-full object-cover object-top transition-opacity duration-500"
						class:opacity-0={!isVisible}
						class:opacity-100={isVisible}
					/>
				{:else}
					<div class="absolute inset-0 bg-gradient-to-br {gradientClass}">
						<div class="p-4 pt-8 space-y-2">
							<div class="h-2 w-10 bg-{glowColor}/40 rounded animate-pulse"></div>
							<div class="h-3 bg-white/10 rounded"></div>
							<div class="h-3 w-3/4 bg-white/10 rounded"></div>
							<div class="h-2 bg-white/5 rounded mt-4"></div>
							<div class="h-2 bg-white/5 rounded"></div>
							<div class="h-6 w-16 bg-{glowColor}/50 rounded-lg mt-4"></div>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- Phone shadow -->
		<div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-black/20 blur-lg rounded-full"></div>
	</div>

	<!-- Decorative floating elements -->
	<div
		class="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-{glowColor}/20 to-transparent rounded-3xl -z-10 transition-all duration-700"
		style="transform: translate({isHovered ? -8 : 0}px, {isHovered ? -8 : 0}px) rotate({isHovered ? -12 : -6}deg);"
	></div>
	<div
		class="absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br from-{glowColor}/10 to-transparent rounded-full -z-10 transition-all duration-700"
		style="transform: translate({isHovered ? 8 : 0}px, {isHovered ? 8 : 0}px);"
	></div>

	<!-- Corner accent -->
	<div class="absolute top-0 right-0 w-20 h-20 overflow-hidden -z-10">
		<div
			class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-{glowColor}/20 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 transition-all duration-500"
			class:scale-150={isHovered}
		></div>
	</div>
</div>

<style>
	@keyframes float {
		0%, 100% {
			transform: translateY(0) rotate(0deg);
			opacity: 0.4;
		}
		50% {
			transform: translateY(-20px) rotate(180deg);
			opacity: 0.8;
		}
	}

	:global(.animate-float) {
		animation: float 4s ease-in-out infinite;
	}

	:global(.perspective-1000) {
		perspective: 1000px;
	}
</style>
