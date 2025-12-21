<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Container, Section } from '$lib/components/layout';
	import { InView } from '$lib/components/ui/animations';
	import { onMount } from 'svelte';

	let mounted = $state(false);
	let dentistIframeLoaded = $state(false);
	let joeIframeLoaded = $state(false);

	type FilterType = 'dental' | 'joe';
	let activeFilter = $state<FilterType>('dental');

	// Click-to-load iframes for performance
	let loadDentalIframe = $state(false);
	let loadJoeIframe = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Work | Haniffa Design Studio</title>
	<meta
		name="description"
		content="Selected projects showcasing strategy, design, and real results. See how I help businesses succeed online."
	/>
</svelte:head>

<style>
	/* Fade in animation */
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.animate-fade-in {
		animation: fadeIn 0.3s ease-out forwards;
	}

	/* Gradient text */
	.gradient-text-dental {
		background: linear-gradient(135deg, #4a7c59 0%, #2d5a3d 50%, #c4a574 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.gradient-text-joe {
		background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #c9a227 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
</style>

<!-- Hero Section -->
<Section padding="lg" class="relative overflow-hidden">

	<Container>
		<div class="max-w-3xl mx-auto text-center">
			<h1
				class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl transition-all duration-700 ease-out"
				class:opacity-0={!mounted}
				class:translate-y-8={!mounted}
				class:opacity-100={mounted}
				class:translate-y-0={mounted}
			>
				Work that <span class="text-primary">speaks</span> for itself
			</h1>

			<p
				class="mt-6 text-lg text-muted-foreground leading-relaxed transition-all duration-700 ease-out"
				class:opacity-0={!mounted}
				class:translate-y-6={!mounted}
				class:opacity-100={mounted}
				class:translate-y-0={mounted}
				style="transition-delay: 100ms;"
			>
				Real projects with real results. Each piece showcases strategic thinking, clean
				execution, and measurable impact.
			</p>

			<!-- Project Toggle Slider -->
			<div
				class="mt-10 flex justify-center transition-all duration-700 ease-out"
				class:opacity-0={!mounted}
				class:translate-y-6={!mounted}
				class:opacity-100={mounted}
				class:translate-y-0={mounted}
				style="transition-delay: 200ms;"
			>
				<div class="relative flex items-center bg-muted rounded-full p-1.5">
					<!-- Sliding background indicator -->
					<div
						class="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full transition-all duration-500 ease-out {activeFilter === 'dental'
							? 'left-1.5 bg-[#4a7c59] shadow-lg shadow-[#4a7c59]/30'
							: 'left-[calc(50%+3px)] bg-[#3b82f6] shadow-lg shadow-[#3b82f6]/30'}"
					></div>

					<!-- Buttons -->
					<button
						onclick={() => activeFilter = 'dental'}
						class="relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 {activeFilter === 'dental'
							? 'text-white'
							: 'text-muted-foreground hover:text-foreground'}"
					>
						Healthcare
					</button>
					<button
						onclick={() => activeFilter = 'joe'}
						class="relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 {activeFilter === 'joe'
							? 'text-white'
							: 'text-muted-foreground hover:text-foreground'}"
					>
						Creative
					</button>
				</div>
			</div>
		</div>
	</Container>
</Section>

<!-- ═══════════════════════════════════════════════════════════════════════════
     PEARL DENTAL SECTION
     ═══════════════════════════════════════════════════════════════════════════ -->
{#if activeFilter === 'dental'}
<div class="animate-fade-in">
<section class="relative py-20 lg:py-32 overflow-hidden">
	<!-- Full-bleed background -->
	<div class="absolute inset-0 bg-gradient-to-br from-[#f8f5f0] via-[#f5f0e8] to-[#e8f0e8]"></div>
	<!-- Top fade from page background -->
	<div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent"></div>
	<!-- Bottom fade to next section -->
	<div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>


	<Container class="relative">
		<!-- Project Number & Title Header -->
		<div class="flex items-end justify-between mb-12 lg:mb-16">
			<div>
				<span class="text-[120px] lg:text-[180px] font-bold leading-none text-[#4a7c59]/10 select-none">01</span>
			</div>
			<div class="text-right pb-4">
				<Badge class="mb-3 bg-[#4a7c59]/10 text-[#4a7c59] border-[#4a7c59]/20">
					Healthcare
				</Badge>
				<h2 class="text-4xl lg:text-6xl font-bold tracking-tight gradient-text-dental">
					Pearl Dental
				</h2>
				<p class="mt-2 text-lg text-[#4a7c59] font-medium">
					Modern dental care, designed for you
				</p>
			</div>
		</div>

		<!-- Main Visual + Info Grid -->
		<div class="grid lg:grid-cols-12 gap-6 lg:gap-8">

			<!-- Large Screenshot with overlay info -->
			<div class="lg:col-span-8 relative">
				<div class="relative group">
					<!-- Main image container -->
					<div class="relative overflow-hidden glow-dental">
						<img
							src="/images/projects/dentist-screenshot.png"
							alt="Pearl Dental Homepage"
							class="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
						/>
						<!-- Gradient overlay on hover -->
						<div class="absolute inset-0 bg-gradient-to-t from-[#2d5a3d]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

						<!-- Floating CTA on image -->
						<div class="absolute bottom-6 left-6 right-6 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
							<Button href="https://pearl-dental.vercel.app" target="_blank" class="bg-white text-[#4a7c59] hover:bg-white/90 shadow-xl">
								Live Demo
							</Button>
						</div>
					</div>

				</div>
			</div>

			<!-- Side Info -->
			<div class="lg:col-span-4 flex flex-col gap-6 mt-8 lg:mt-0">

				<!-- Description - Borderless with accent line -->
				<div class="border-l-4 border-[#c4a574] pl-5">
					<p class="text-[#5a5a5a] leading-relaxed text-lg italic">
						"Most dental websites feel cold and clinical. Pearl Dental needed the opposite—a warm, approachable site that builds trust instantly."
					</p>
				</div>

				<!-- Tech Stack - Inline pills -->
				<div>
					<p class="text-xs font-semibold text-[#4a7c59] uppercase tracking-wider mb-3">Built With</p>
					<div class="flex flex-wrap gap-2">
						{#each ['SvelteKit', 'Tailwind', 'Vercel'] as tech}
							<span class="text-xs px-3 py-1.5 bg-[#4a7c59]/10 text-[#4a7c59] font-medium">
								{tech}
							</span>
						{/each}
					</div>
				</div>

				<!-- Deliverables - Compact list with left accent -->
				<div class="bg-[#4a7c59] p-5">
					<div class="flex flex-wrap gap-x-4 gap-y-2">
						{#each ['Design', 'Development', 'SEO', 'Booking UX'] as item}
							<span class="text-white/90 text-sm flex items-center gap-1.5">
								<span class="w-1.5 h-1.5 bg-[#c4a574] rounded-full"></span>
								{item}
							</span>
						{/each}
					</div>
				</div>

				<!-- Meta row - Horizontal layout -->
				<div class="flex items-center justify-between py-3 border-t border-b border-[#c4a574]/30">
					<div class="flex items-center gap-2">
						<span class="w-2 h-2 bg-[#4a7c59] rounded-full"></span>
						<span class="text-sm text-[#5a5a5a]">Demo Project</span>
					</div>
					<span class="text-lg font-bold text-[#c4a574]">2025</span>
				</div>
			</div>
		</div>

		<!-- Pull Quote / Highlight Section -->
		<div class="mt-16 lg:mt-24 relative">
			<div class="max-w-3xl mx-auto text-center">
				<!-- Large decorative quote -->
				<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" class="mx-auto text-[#c4a574]/30 mb-4"><path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.165 1.4.615 2.52 1.35 3.35.732.833 1.646 1.25 2.742 1.25.967 0 1.768-.29 2.402-.876.627-.576.942-1.365.942-2.368v.01z"/></svg>
				<p class="text-2xl lg:text-3xl font-light text-[#2d2d2d] leading-relaxed">
					The goal was simple: make patients feel <span class="font-semibold text-[#4a7c59]">welcome</span> before they even walk through the door.
				</p>
				<!-- Decorative line -->
				<div class="mt-8 flex items-center justify-center gap-3">
					<div class="w-12 h-[2px] bg-[#c4a574]"></div>
					<div class="w-2 h-2 bg-[#4a7c59] rounded-full"></div>
					<div class="w-12 h-[2px] bg-[#c4a574]"></div>
				</div>
			</div>
		</div>

		<!-- Interactive Preview Section -->
		<InView animation="fade-up" class="mt-16 lg:mt-24">
			<div class="text-center mb-10">
				<p class="text-sm font-medium text-[#4a7c59] tracking-widest uppercase mb-2">Interactive Preview</p>
				<h3 class="text-2xl lg:text-3xl font-bold text-[#2d2d2d]">Experience it live</h3>
			</div>

				<div class="relative overflow-hidden shadow-xl bg-white border border-[#c4a574]/20">
				<!-- Simple Browser Chrome -->
				<div class="bg-[#f5f0e8] px-4 py-3 flex items-center gap-3 border-b border-[#4a7c59]/10">
					<div class="flex gap-1.5">
						<div class="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
						<div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
						<div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
					</div>
					<div class="flex-1 flex justify-center">
						<span class="text-sm text-[#5a5a5a]">pearl-dental.vercel.app</span>
					</div>
				</div>

				<!-- Iframe or Load Button -->
				<div class="relative bg-[#faf7f2]" style="height: 500px;">
					{#if !loadDentalIframe}
						<div class="absolute inset-0 flex items-center justify-center">
							<div class="text-center">
								<img src="/images/projects/dentist-screenshot.png" alt="Pearl Dental Preview" class="w-full h-full object-cover object-top absolute inset-0 opacity-30" />
								<div class="relative z-10">
									<button
										onclick={() => loadDentalIframe = true}
										class="px-6 py-3 bg-[#4a7c59] text-white font-medium hover:bg-[#3d6a4a] transition-colors shadow-lg"
									>
										Load Interactive Demo
									</button>
									<p class="mt-3 text-sm text-[#5a5a5a]">Click to load the live site</p>
								</div>
							</div>
						</div>
					{:else}
						{#if !dentistIframeLoaded}
							<div class="absolute inset-0 flex items-center justify-center bg-[#faf7f2] z-10">
								<div class="w-8 h-8 border-3 border-[#4a7c59]/20 border-t-[#4a7c59] rounded-full animate-spin"></div>
							</div>
						{/if}
						<iframe
							src="https://pearl-dental.vercel.app"
							title="Pearl Dental Live Preview"
							class="w-full h-full border-0"
							onload={() => dentistIframeLoaded = true}
						></iframe>
					{/if}
				</div>
			</div>
		</InView>
	</Container>
</section>
</div>
{/if}

<!-- ═══════════════════════════════════════════════════════════════════════════
     DESIGNS BY JOE SECTION
     ═══════════════════════════════════════════════════════════════════════════ -->
{#if activeFilter === 'joe'}
<div class="animate-fade-in">
<section class="relative py-20 lg:py-32 overflow-hidden">
	<!-- Lighter blue background -->
	<div class="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#475569]"></div>
	<!-- Top fade from previous section -->
	<div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent"></div>
	<!-- Bottom fade to next section -->
	<div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>


	<Container class="relative">
		<!-- Project Number & Title Header -->
		<div class="flex items-end justify-between mb-12 lg:mb-16">
			<div class="text-left">
				<Badge class="mb-3 bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/30">
					Fan Art & Illustration
				</Badge>
				<h2 class="text-4xl lg:text-6xl font-bold tracking-tight gradient-text-joe">
					Designs by Joe
				</h2>
				<p class="mt-2 text-lg text-[#c9a227] font-medium">
					Fan art for the fans
				</p>
			</div>
			<div>
				<span class="text-[120px] lg:text-[180px] font-bold leading-none text-[#3b82f6]/10 select-none">02</span>
			</div>
		</div>

		<!-- Main Visual + Info Grid (Reversed layout) -->
		<div class="grid lg:grid-cols-12 gap-6 lg:gap-8">

			<!-- Side Info Cards -->
			<div class="lg:col-span-4 flex flex-col gap-4 order-2 lg:order-1 mt-8 lg:mt-0">

				<!-- Description Card -->
				<div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex-1">
					<p class="text-slate-200 leading-relaxed">
						Portfolio website for a fan artist specializing in pin designs, trading cards, logos, and stickers. Dark, immersive design that puts the artwork front and center.
					</p>
				</div>

				<!-- Services -->
				<div class="bg-gradient-to-br from-[#3b82f6] to-[#2563eb] rounded-2xl p-6 text-white">
					<p class="text-sm font-medium opacity-80 mb-3">Services</p>
					<div class="flex flex-wrap gap-2">
						{#each ['Web Design', 'Development', 'Branding'] as service}
							<span class="text-sm px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
								{service}
							</span>
						{/each}
					</div>
				</div>

				<!-- Results -->
				<div class="bg-gradient-to-br from-[#c9a227] to-[#a78820] rounded-2xl p-6 text-white">
					<p class="text-sm font-medium opacity-80 mb-3">Key Results</p>
					<ul class="space-y-2">
						{#each ['200+ artworks showcased', 'Commission inquiries up', 'Sub-2s load times'] as result}
							<li class="flex items-center gap-2 text-sm">
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
								{result}
							</li>
						{/each}
					</ul>
				</div>

				<!-- Client Work Badge -->
				<div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-[#c9a227]/30 flex items-center justify-between">
					<div class="flex items-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#c9a227]"><path d="M20 6 9 17l-5-5"/></svg>
						<span class="text-sm text-slate-200">Client Work</span>
					</div>
					<span class="text-2xl font-bold text-white">2025</span>
				</div>
			</div>

			<!-- Large Screenshot with overlay -->
			<div class="lg:col-span-8 relative order-1 lg:order-2">
				<div class="relative group">
					<!-- Main image container -->
					<div class="relative rounded-[2rem] overflow-hidden glow-joe">
						<img
							src="/images/projects/joe-screenshot.png"
							alt="Designs by Joe Homepage"
							class="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
						/>
						<!-- Gradient overlay on hover -->
						<div class="absolute inset-0 bg-gradient-to-t from-[#0a0f1a]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

						<!-- Floating CTA on image -->
						<div class="absolute bottom-6 left-6 right-6 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
							<Button href="https://designsbyjoe.net" target="_blank" class="bg-[#3b82f6] text-white hover:bg-[#2563eb] shadow-xl shadow-[#3b82f6]/25">
								Live Demo
							</Button>
						</div>
					</div>

					<!-- Floating artworks count - overlapping -->
					<div class="absolute -bottom-6 -left-4 lg:-left-8 bg-white rounded-2xl p-5 shadow-xl border border-slate-200">
						<div class="flex items-center gap-4">
							<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#2563eb] flex items-center justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
							</div>
							<div>
								<p class="text-3xl font-bold text-slate-800">200+</p>
								<p class="text-sm text-slate-500">Artworks</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Testimonial -->
		<InView animation="fade-up" class="mt-16 lg:mt-20">
			<div class="max-w-3xl mx-auto">
				<div class="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/20">
					<!-- Quote mark -->
					<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" class="absolute -top-6 left-8 text-[#c9a227]/40"><path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.165 1.4.615 2.52 1.35 3.35.732.833 1.646 1.25 2.742 1.25.967 0 1.768-.29 2.402-.876.627-.576.942-1.365.942-2.368v.01z"/></svg>

					<p class="text-xl lg:text-2xl text-white italic leading-relaxed">
						"The website perfectly captures my style and has helped me land bigger clients. The whole process was smooth and collaborative."
					</p>
					<div class="mt-6 flex items-center gap-4">
						<div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a227] to-[#a78820] flex items-center justify-center text-white font-bold text-lg">
							J
						</div>
						<div>
							<p class="text-[#c9a227] font-semibold">Joe</p>
							<p class="text-sm text-slate-300">Fan Artist & Illustrator</p>
						</div>
					</div>
				</div>
			</div>
		</InView>

		<!-- Interactive Preview Section -->
		<InView animation="fade-up" class="mt-20 lg:mt-28">
			<div class="text-center mb-10">
				<p class="text-sm font-medium text-[#3b82f6] tracking-widest uppercase mb-2">Interactive Preview</p>
				<h3 class="text-2xl lg:text-3xl font-bold text-white">Experience it live</h3>
			</div>

				<div class="relative rounded-2xl overflow-hidden shadow-xl bg-slate-800 border border-white/20">
				<!-- Simple Browser Chrome -->
				<div class="bg-slate-700 px-4 py-3 flex items-center gap-3 border-b border-white/10">
					<div class="flex gap-1.5">
						<div class="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
						<div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
						<div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
					</div>
					<div class="flex-1 flex justify-center">
						<span class="text-sm text-slate-300">designsbyjoe.net</span>
					</div>
				</div>

				<!-- Iframe or Load Button -->
				<div class="relative bg-slate-800" style="height: 500px;">
					{#if !loadJoeIframe}
						<div class="absolute inset-0 flex items-center justify-center">
							<div class="text-center">
								<img src="/images/projects/joe-screenshot.png" alt="Designs by Joe Preview" class="w-full h-full object-cover object-top absolute inset-0 opacity-30" />
								<div class="relative z-10">
									<button
										onclick={() => loadJoeIframe = true}
										class="px-6 py-3 bg-[#3b82f6] text-white rounded-xl font-medium hover:bg-[#2563eb] transition-colors shadow-lg"
									>
										Load Interactive Demo
									</button>
									<p class="mt-3 text-sm text-slate-300">Click to load the live site</p>
								</div>
							</div>
						</div>
					{:else}
						{#if !joeIframeLoaded}
							<div class="absolute inset-0 flex items-center justify-center bg-slate-800 z-10">
								<div class="w-8 h-8 border-3 border-[#3b82f6]/20 border-t-[#3b82f6] rounded-full animate-spin"></div>
							</div>
						{/if}
						<iframe
							src="https://designsbyjoe.net"
							title="Designs by Joe Live Preview"
							class="w-full h-full border-0"
							onload={() => joeIframeLoaded = true}
						></iframe>
					{/if}
				</div>
			</div>
		</InView>
	</Container>
</section>
</div>
{/if}

<!-- ═══════════════════════════════════════════════════════════════════════════
     CTA SECTION
     ═══════════════════════════════════════════════════════════════════════════ -->
<Section padding="lg" class="relative overflow-hidden">
	<Container size="content">
		<InView animation="fade-up" class="text-center">
			<span class="text-[80px] lg:text-[120px] font-bold leading-none text-primary/10 select-none">03</span>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl -mt-8">
				Your project?
			</h2>
			<p class="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
				Have a project in mind? I'd love to hear about it and discuss how we can work together.
			</p>
			<div class="mt-10 flex flex-wrap justify-center gap-4">
				<Button size="lg" href="/contact" class="group">
					Start a Conversation
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
				</Button>
				<Button size="lg" variant="outline" href="/services" class="group hover:border-primary/50">
					View Services
				</Button>
			</div>
		</InView>
	</Container>
</Section>
