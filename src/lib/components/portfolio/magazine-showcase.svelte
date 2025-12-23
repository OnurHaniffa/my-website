<script lang="ts">
	/**
	 * Magazine Showcase - Editorial/print-inspired layout
	 * Sophisticated, premium feel with layered typography
	 */
	interface Props {
		desktopImage?: string;
		mobileImage?: string;
		liveUrl?: string;
		title: string;
		tagline?: string;
		category?: string;
		year?: string;
		variant?: 'primary' | 'accent';
		class?: string;
	}

	let {
		desktopImage,
		mobileImage,
		liveUrl,
		title,
		tagline,
		category,
		year,
		variant = 'primary',
		class: className = ''
	}: Props = $props();

	let isHovered = $state(false);

	const accentColor = $derived(variant === 'primary' ? 'primary' : 'accent');
</script>

<div
	class="relative group {className}"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	role="presentation"
>
	<!-- Editorial layout grid -->
	<div class="grid grid-cols-12 gap-4 md:gap-6 items-stretch">
		<!-- Left column - Typography & info -->
		<div class="col-span-12 md:col-span-4 flex flex-col justify-between py-6 md:py-10 order-2 md:order-1">
			<!-- Category & year -->
			<div class="flex items-center gap-4 mb-6">
				{#if category}
					<span class="text-xs font-medium tracking-[0.3em] uppercase text-{accentColor}">{category}</span>
				{/if}
				{#if category && year}
					<span class="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
				{/if}
				{#if year}
					<span class="text-xs font-medium tracking-wide text-muted-foreground">{year}</span>
				{/if}
			</div>

			<!-- Title - Large editorial style -->
			<div class="space-y-4 flex-grow">
				<h3
					class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] transition-all duration-500"
					style="transform: translateX({isHovered ? 10 : 0}px);"
				>
					{title}
				</h3>
				{#if tagline}
					<p
						class="text-lg text-muted-foreground leading-relaxed transition-all duration-500"
						style="transform: translateX({isHovered ? 5 : 0}px); opacity: {isHovered ? 1 : 0.8};"
					>
						{tagline}
					</p>
				{/if}
			</div>

			<!-- CTA -->
			{#if liveUrl}
				<div class="mt-8">
					<a
						href={liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="group/link inline-flex items-center gap-3 text-{accentColor} font-medium transition-all duration-300 hover:gap-5"
					>
						<span class="relative">
							View Project
							<span
								class="absolute bottom-0 left-0 h-[2px] bg-{accentColor} transition-all duration-300"
								style="width: {isHovered ? '100%' : '0%'};"
							></span>
						</span>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-hover/link:translate-x-2">
							<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
						</svg>
					</a>
				</div>
			{/if}

			<!-- Decorative line -->
			<div class="hidden md:block mt-10">
				<div class="w-16 h-[3px] bg-{accentColor}/30 rounded-full transition-all duration-500" style="width: {isHovered ? '80px' : '64px'};"></div>
			</div>
		</div>

		<!-- Right column - Images -->
		<div class="col-span-12 md:col-span-8 relative order-1 md:order-2">
			<!-- Main desktop image -->
			<div
				class="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 {isHovered ? (variant === 'primary' ? 'shadow-primary/20' : 'shadow-accent/20') : ''}"
				style="transform: translateY({isHovered ? -8 : 0}px);"
			>
				<div class="aspect-[4/3] relative overflow-hidden">
					{#if desktopImage}
						<img
							src={desktopImage}
							alt="{title} desktop"
							class="w-full h-full object-cover object-top transition-transform duration-[3s]"
							style="transform: scale({isHovered ? 1.05 : 1});"
						/>
					{:else}
						<div class="w-full h-full bg-gradient-to-br from-{accentColor}/10 via-muted to-{accentColor}/5 flex items-center justify-center">
							<div class="text-center space-y-4">
								<div class="w-20 h-20 rounded-2xl bg-{accentColor}/10 mx-auto flex items-center justify-center">
									<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-{accentColor}/50">
										<rect width="18" height="18" x="3" y="3" rx="2"/>
										<circle cx="9" cy="9" r="2"/>
										<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
									</svg>
								</div>
								<p class="text-muted-foreground">Main Screenshot</p>
							</div>
						</div>
					{/if}

					<!-- Film grain overlay -->
					<div class="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none bg-noise"></div>

					<!-- Gradient vignette -->
					<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.15)_100%)]"></div>
				</div>

				<!-- Image border accent -->
				<div
					class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-{accentColor} via-{accentColor}/50 to-transparent transition-opacity duration-500"
					class:opacity-0={!isHovered}
					class:opacity-100={isHovered}
				></div>
			</div>

			<!-- Floating mobile mockup -->
			<div
				class="absolute -bottom-6 -left-4 md:-left-8 w-[70px] md:w-[90px] z-10 transition-all duration-700"
				style="transform: translateY({isHovered ? 8 : 0}px) rotate({isHovered ? -4 : -2}deg);"
			>
				<div class="relative rounded-[16px] overflow-hidden shadow-2xl border-[3px] border-gray-800 bg-gray-900">
					<!-- Notch -->
					<div class="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-3 bg-gray-900 rounded-b-xl z-10"></div>

					<div class="aspect-[9/19] bg-gray-950">
						{#if mobileImage || desktopImage}
							<img
								src={mobileImage || desktopImage}
								alt="{title} mobile"
								class="w-full h-full object-cover object-top"
							/>
						{:else}
							<div class="w-full h-full bg-gradient-to-br from-{accentColor}/10 to-muted"></div>
						{/if}
					</div>
				</div>
			</div>

			<!-- Floating caption card -->
			<div
				class="absolute -bottom-4 right-4 md:right-8 bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border/50 transition-all duration-500 hidden sm:block"
				style="transform: translateY({isHovered ? -8 : 0}px);"
			>
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 rounded-full bg-{accentColor}/10 flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-{accentColor}">
							<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
						</svg>
					</div>
					<div>
						<p class="text-xs text-muted-foreground">Live Website</p>
						<p class="text-sm font-medium truncate max-w-[120px]">{liveUrl?.replace('https://', '').split('/')[0] || 'View Demo'}</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Background decorative elements -->
	<div class="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-bl from-{accentColor}/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
	<div
		class="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-{accentColor}/5 to-transparent rounded-full blur-3xl pointer-events-none transition-transform duration-700"
		style="transform: scale({isHovered ? 1.2 : 1});"
	></div>
</div>
