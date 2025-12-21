<script lang="ts">
	/**
	 * Isometric Showcase - 3D isometric perspective view
	 * Creates an eye-catching angled view of the website
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

	const accentColor = variant === 'primary' ? 'primary' : 'accent';
</script>

<div
	class="relative group {className}"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	role="presentation"
>
	<!-- Background glow -->
	<div
		class="absolute inset-0 bg-gradient-to-br from-{accentColor}/30 via-{accentColor}/10 to-transparent rounded-[3rem] blur-3xl transition-all duration-700 -z-10"
		class:opacity-0={!isHovered}
		class:opacity-100={isHovered}
		class:scale-110={isHovered}
	></div>

	<!-- Grid background -->
	<div class="absolute inset-0 opacity-10">
		<div class="absolute inset-0 bg-[linear-gradient(rgba(var(--{accentColor}-rgb),0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--{accentColor}-rgb),0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"></div>
	</div>

	<!-- Isometric container -->
	<div class="relative py-12 px-8">
		<!-- 3D Transform wrapper -->
		<div
			class="relative transition-all duration-700 ease-out"
			style="
				transform: perspective(1200px) rotateX({isHovered ? 10 : 15}deg) rotateY({isHovered ? -8 : -12}deg) rotateZ({isHovered ? 1 : 2}deg) scale({isHovered ? 1.02 : 1});
				transform-style: preserve-3d;
			"
		>
			<!-- Desktop screen -->
			<div class="relative">
				<!-- Screen frame -->
				<div
					class="relative rounded-xl overflow-hidden shadow-2xl transition-shadow duration-500 {isHovered ? (variant === 'primary' ? 'shadow-primary/30' : 'shadow-accent/30') : ''}"
					style="transform: translateZ(20px);"
				>
					<!-- Browser chrome -->
					<div class="flex items-center gap-2 px-4 py-2.5 bg-gray-900 border-b border-gray-800">
						<div class="flex gap-1.5">
							<div class="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
							<div class="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
							<div class="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
						</div>
						<div class="flex-1 mx-2">
							<div class="bg-gray-800 rounded px-3 py-1 text-xs text-gray-400 text-center max-w-48 mx-auto truncate">
								{liveUrl?.replace('https://', '') || 'yoursite.com'}
							</div>
						</div>
					</div>

					<!-- Screen content -->
					<div class="aspect-[16/10] relative bg-gray-950">
						{#if desktopImage}
							<img
								src={desktopImage}
								alt="{title} preview"
								class="w-full h-full object-cover object-top transition-transform duration-[2s]"
								style="transform: scale({isHovered ? 1.03 : 1});"
							/>
						{:else}
							<div class="w-full h-full bg-gradient-to-br from-{accentColor}/20 via-muted to-{accentColor}/10 flex items-center justify-center">
								<div class="text-center space-y-3">
									<div class="w-16 h-16 rounded-2xl bg-{accentColor}/20 mx-auto flex items-center justify-center">
										<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-{accentColor}">
											<rect width="18" height="18" x="3" y="3" rx="2"/>
											<circle cx="9" cy="9" r="2"/>
											<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
										</svg>
									</div>
									<p class="text-muted-foreground text-sm">Desktop View</p>
								</div>
							</div>
						{/if}

						<!-- Scan line effect -->
						<div
							class="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
							style="background-size: 100% 4px; animation: scan 8s linear infinite;"
						></div>
					</div>
				</div>

				<!-- 3D shadow layers -->
				<div
					class="absolute inset-0 bg-{accentColor}/10 rounded-xl -z-10 transition-all duration-500"
					style="transform: translateZ(-10px) translateY(8px);"
				></div>
				<div
					class="absolute inset-0 bg-{accentColor}/5 rounded-xl -z-20 transition-all duration-500"
					style="transform: translateZ(-20px) translateY(16px);"
				></div>
			</div>

			<!-- Floating mobile device -->
			<div
				class="absolute -right-4 bottom-0 w-[80px] md:w-[100px] transition-all duration-700 z-10"
				style="
					transform: translateZ(40px) translateY({isHovered ? -10 : 0}px);
					transform-style: preserve-3d;
				"
			>
				<div class="relative rounded-[20px] overflow-hidden shadow-2xl border-4 border-gray-800 bg-gray-900">
					<!-- Phone notch -->
					<div class="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-gray-900 rounded-b-xl z-10"></div>

					<div class="aspect-[9/19] relative bg-gray-950">
						{#if mobileImage || desktopImage}
							<img
								src={mobileImage || desktopImage}
								alt="{title} mobile"
								class="w-full h-full object-cover object-top"
							/>
						{:else}
							<div class="w-full h-full bg-gradient-to-br from-{accentColor}/20 to-muted flex items-center justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-{accentColor}/50">
									<rect width="14" height="20" x="5" y="2" rx="2"/>
									<path d="M12 18h.01"/>
								</svg>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<!-- Hover overlay with CTA -->
		{#if liveUrl}
			<div
				class="absolute inset-0 flex items-center justify-center transition-all duration-500 pointer-events-none"
				class:opacity-0={!isHovered}
				class:opacity-100={isHovered}
			>
				<a
					href={liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="pointer-events-auto inline-flex items-center gap-3 px-8 py-4 bg-{accentColor} text-{accentColor}-foreground rounded-2xl font-semibold shadow-2xl shadow-{accentColor}/30 transition-all duration-300 hover:scale-105 hover:shadow-{accentColor}/50"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
					</svg>
					Explore Live
				</a>
			</div>
		{/if}
	</div>

	<!-- Floating decorative elements -->
	<div
		class="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-{accentColor}/20 to-transparent rounded-2xl transition-all duration-700 -z-10"
		style="transform: translate({isHovered ? -12 : 0}px, {isHovered ? -12 : 0}px) rotate(-12deg);"
	></div>
	<div
		class="absolute bottom-4 right-4 w-20 h-20 bg-gradient-to-br from-{accentColor}/10 to-transparent rounded-full transition-all duration-700 -z-10"
		style="transform: translate({isHovered ? 12 : 0}px, {isHovered ? 12 : 0}px);"
	></div>
</div>

<style>
	@keyframes scan {
		0% { background-position: 0 -100%; }
		100% { background-position: 0 200%; }
	}
</style>
