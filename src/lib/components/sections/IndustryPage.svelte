<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Container, Section } from '$lib/components/layout';
	import { InView, Counter } from '$lib/components/ui/animations';
	import type { Industry } from '$lib/data/industries';

	let { industry }: { industry: Industry } = $props();

	const whatsappNumber = '905428324550';
	const whatsappUrl = $derived(
		`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(industry.whatsappPrefill)}`
	);

	const heroScreenshots = [
		{ src: '/images/projects/joe-fresh-desktop.png', mobile: '/images/projects/joe-fresh-mobile.png', label: 'Designs by Joe', url: 'designsbyjoe.net' },
		{ src: '/images/projects/dentist-screenshot.jpg', mobile: '/images/projects/dental-mobile-real.png', label: 'Pearl Dental', url: 'pearldental.com' },
		{ src: '/images/projects/ivory-ai-screenshot.png', mobile: '/images/projects/ivory-ai-mobile.png', label: 'Ivory AI', url: 'ivoryai.net' }
	];
	let currentScreenshot = $state(0);
	let showStickyCta = $state(false);
	let openFaq = $state<number | null>(null);
	let heroContent: HTMLDivElement;
	let heroMockup: HTMLDivElement;

	function toggleFaq(i: number) {
		openFaq = openFaq === i ? null : i;
	}

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const handleScroll = () => { showStickyCta = window.scrollY > 600; };
		window.addEventListener('scroll', handleScroll, { passive: true });

		let screenshotInterval: ReturnType<typeof setInterval> | null = null;
		const startRotation = () => {
			if (screenshotInterval) return;
			screenshotInterval = setInterval(() => {
				currentScreenshot = (currentScreenshot + 1) % heroScreenshots.length;
			}, 4000);
		};
		const stopRotation = () => {
			if (screenshotInterval) { clearInterval(screenshotInterval); screenshotInterval = null; }
		};
		const handleVisibility = () => {
			if (document.visibilityState === 'visible') startRotation();
			else stopRotation();
		};
		startRotation();
		document.addEventListener('visibilitychange', handleVisibility);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let heroTl: any = null;
		if (!prefersReducedMotion && heroContent && heroMockup) {
			import('gsap').then(({ gsap }) => {
				if (!heroContent || !heroMockup) return;
				gsap.set([heroContent, heroMockup], { opacity: 0, y: 30 });
				heroTl = gsap.timeline({ delay: 0.1 });
				heroTl
					.to(heroContent, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
					.to(heroMockup, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');
			}).catch(() => {});
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('visibilitychange', handleVisibility);
			stopRotation();
			heroTl?.kill?.();
		};
	});
</script>

<svelte:head>
	<title>{industry.name} Web Sitesi — {industry.priceRange.split(' - ')[0]} | Onur Haniffa</title>
	<meta
		name="description"
		content={`${industry.name} web sitesi yaptırma — ${industry.priceContext} Şeffaf fiyat, KVKK uyumlu, mobil-öncelikli. WhatsApp'tan ücretsiz teklif alın.`}
	/>

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: industry.faq.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a }
		}))
	}).replace(/</g, '\\u003c')}</script>`}

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Service',
		'@id': `https://onurhaniffa.com/${industry.slug}-web-sitesi/#service`,
		name: `${industry.name} Web Sitesi Yaptırma`,
		serviceType: 'Web Design',
		provider: { '@id': 'https://onurhaniffa.com/#business' },
		areaServed: { '@type': 'Country', name: 'Türkiye' }
	}).replace(/</g, '\\u003c')}</script>`}
</svelte:head>

<!-- HERO -->
<Section padding="none" class="relative overflow-hidden min-h-[calc(100vh-85px)] flex flex-col justify-center">
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		<div class="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-background to-muted/80"></div>
		<div class="absolute -top-[100px] -left-[150px] w-[800px] h-[700px] ind-glow-topleft rounded-full"></div>
		<div class="absolute -top-[200px] -right-[200px] w-[900px] h-[900px] ind-glow-accent rounded-full"></div>
		<div class="absolute -bottom-[300px] -left-[300px] w-[800px] h-[800px] ind-glow-primary rounded-full"></div>
	</div>

	<Container class="relative pt-12 pb-12 lg:pt-20 lg:pb-20">
		<div class="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
			<div bind:this={heroContent} class="space-y-5">
				<Badge variant="outline" class="border-primary/40 text-primary bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
					<span class="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" aria-hidden="true"></span>
					{industry.name} Web Sitesi
				</Badge>

				<h1 class="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
					{industry.headline.split('—')[0].trim()} <br class="hidden sm:block" />{industry.headline.split('—')[1]?.trim() ?? ''}
				</h1>

				<p class="text-lg text-muted-foreground leading-relaxed max-w-lg">
					{industry.subhead}
				</p>

				<div class="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-border bg-transparent">
					<span class="text-sm font-semibold text-foreground">{industry.priceRange}</span>
				</div>

				<div class="flex flex-wrap gap-8 sm:gap-10 py-2">
					<div class="text-center">
						<p class="text-3xl font-black text-primary tabular-nums"><Counter value={50} duration={2000} suffix="+" /></p>
						<p class="text-xs text-muted-foreground mt-0.5">Tamamlanmış Proje</p>
					</div>
					<div class="hidden sm:block w-px bg-border self-stretch"></div>
					<div class="text-center">
						<p class="text-3xl font-black tabular-nums">5.0</p>
						<p class="text-xs text-muted-foreground mt-0.5 flex items-center justify-center gap-1">
							<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
							Google Puanı
						</p>
					</div>
					<div class="hidden sm:block w-px bg-border self-stretch"></div>
					<div class="text-center">
						<p class="text-3xl font-black tabular-nums">24sa</p>
						<p class="text-xs text-muted-foreground mt-0.5">İçinde Yanıt</p>
					</div>
				</div>

				<div class="flex flex-wrap gap-4 pt-2">
					<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-base shadow-2xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 hover:scale-[1.02] transition-all duration-300">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
						WhatsApp'tan Teklif Al
					</a>
					<Button size="lg" variant="ghost" href="/web-sitesi-fiyatlari/" class="text-base px-8 py-4 rounded-full border border-border/60 hover:bg-foreground/5">Fiyatları Gör</Button>
				</div>
			</div>

			<div bind:this={heroMockup} class="relative">
				<div class="relative bg-card rounded-2xl shadow-2xl border-2 border-border/50 overflow-hidden">
					<div class="flex items-center gap-2 px-4 py-3 bg-muted/80 border-b">
						<div class="flex gap-1.5" aria-hidden="true">
							<div class="w-3 h-3 rounded-full bg-rose-400"></div>
							<div class="w-3 h-3 rounded-full bg-amber-400"></div>
							<div class="w-3 h-3 rounded-full bg-emerald-400"></div>
						</div>
						<div class="flex-1 mx-4">
							<div class="bg-background/80 rounded-lg px-4 py-1.5 text-sm text-muted-foreground flex items-center gap-2 border">
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
								<span class="truncate font-mono text-xs">{heroScreenshots[currentScreenshot].url}</span>
							</div>
						</div>
					</div>
					<div class="aspect-[16/10] relative overflow-hidden bg-muted">
						{#each heroScreenshots as screenshot, i}
							<img src={screenshot.src} alt={screenshot.label} class="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 {i === currentScreenshot ? 'opacity-100' : 'opacity-0'}" loading={i === 0 ? 'eager' : 'lazy'} width="640" height="400" />
						{/each}
						<div class="absolute bottom-3 left-3 z-10">
							<div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
								<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
								{heroScreenshots[currentScreenshot].label}
							</div>
						</div>
						<div class="absolute bottom-3 right-3 flex gap-1.5 z-10">
							{#each heroScreenshots as _, i}
								<button onclick={() => { currentScreenshot = i; }} class="w-2 h-2 rounded-full transition-all duration-300 {i === currentScreenshot ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}" aria-label="Show {heroScreenshots[i].label}"></button>
							{/each}
						</div>
					</div>
				</div>
				<div class="hidden lg:block absolute -bottom-6 -right-6 w-36 rounded-2xl shadow-2xl border-2 border-border/50 bg-card overflow-hidden z-10">
					<div class="flex items-center justify-center py-1 bg-muted/80 border-b">
						<div class="w-12 h-1 rounded-full bg-border" aria-hidden="true"></div>
					</div>
					<div class="aspect-[9/16] relative overflow-hidden bg-muted">
						{#each heroScreenshots as screenshot, i}
							<img src={screenshot.mobile} alt="{screenshot.label} mobile" class="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 {i === currentScreenshot ? 'opacity-100' : 'opacity-0'}" loading="lazy" width="144" height="256" />
						{/each}
					</div>
				</div>
			</div>
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- INDUSTRY CONTEXT -->
<Section padding="lg" class="relative overflow-hidden">
	<Container size="content">
		<InView animation="fade-up">
			<div class="text-center mb-10">
				<p class="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
					{industry.name} İçgörü
				</p>
				<h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
					{industry.name} İçin Web Sitesi Neden Önemli?
				</h2>
			</div>
		</InView>

		<InView animation="fade-up" delay={100}>
			<p class="text-base text-muted-foreground leading-relaxed mb-10">
				{industry.openingPara}
			</p>
		</InView>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- KEY PAIN POINTS + FEATURES -->
<Section padding="lg" background="muted" class="relative overflow-hidden">
	<Container>
		<InView animation="fade-up">
			<div class="text-center mb-12">
				<p class="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
					Yaygın Sorunlar
				</p>
				<h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
					{industry.name} Sitelerinde En Sık Karşılaşılan Sorunlar
				</h2>
			</div>
		</InView>

		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-16">
			{#each industry.keyPainPoints as pain, i}
				<InView animation="fade-up" delay={i * 80}>
					<div class="h-full p-6 rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-all">
						<div class="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
						</div>
						<h3 class="text-base font-bold mb-2">{pain.title}</h3>
						<p class="text-sm text-muted-foreground leading-relaxed">{pain.desc}</p>
					</div>
				</InView>
			{/each}
		</div>

		<InView animation="fade-up">
			<div class="text-center mb-10">
				<p class="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
					Çözüm
				</p>
				<h3 class="text-2xl sm:text-3xl font-bold tracking-tight">
					{industry.name} Sitenizde Olması Gerekenler
				</h3>
			</div>
		</InView>

		<div class="max-w-3xl mx-auto p-6 rounded-2xl bg-card border border-border/50">
			<ul class="grid sm:grid-cols-2 gap-x-6 gap-y-3">
				{#each industry.featureList as feat, i}
					<InView animation="fade-up" delay={i * 30}>
						<li class="flex items-start gap-2.5 text-sm">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="shrink-0 mt-0.5 text-emerald-500" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
							<span>{feat}</span>
						</li>
					</InView>
				{/each}
			</ul>
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- PRICING STRIP -->
<Section padding="lg" class="relative overflow-hidden">
	<Container>
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-10">
				<p class="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
					{industry.name} Fiyat Aralığı
				</p>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
					{industry.priceRange}
				</h2>
				<p class="text-base text-muted-foreground mt-4">
					{industry.priceContext} Net teklif keşif görüşmesinden sonra, sözleşmede yazılı sabit fiyat.
				</p>
			</div>
		</InView>

		<div class="text-center">
			<a href="/web-sitesi-fiyatlari/" class="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
				Tüm fiyat detaylarını gör
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
			</a>
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- FAQ -->
<Section padding="lg" background="muted" class="relative overflow-hidden">
	<Container size="content">
		<InView animation="fade-up">
			<div class="text-center mb-12">
				<p class="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
					{industry.name} SSS
				</p>
				<h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
					Sık Sorulan Sorular
				</h2>
			</div>
		</InView>

		<div class="space-y-3 max-w-3xl mx-auto">
			{#each industry.faq as faq, i}
				<InView animation="fade-up" delay={i * 30}>
					<div class="overflow-hidden rounded-xl border bg-card transition-all {openFaq === i ? 'border-primary/30 shadow-md' : 'border-border'}">
						<button onclick={() => toggleFaq(i)} aria-expanded={openFaq === i} class="w-full px-5 py-4 text-left flex items-center justify-between gap-4">
							<span class="flex items-center gap-3">
								<span class="shrink-0 w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center {openFaq === i ? 'bg-primary text-white' : ''}">{i + 1}</span>
								<span class="font-medium text-sm sm:text-base">{faq.q}</span>
							</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground transition-transform {openFaq === i ? 'rotate-180' : ''}"><path d="m6 9 6 6 6-6"/></svg>
						</button>
						{#if openFaq === i}
							<div class="px-5 pb-5">
								<p class="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
							</div>
						{/if}
					</div>
				</InView>
			{/each}
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- FINAL CTA -->
<Section padding="lg" class="relative overflow-hidden">
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] ind-cta-glow rounded-full"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-primary/10 cta-ring-1"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/5 cta-ring-2"></div>
	</div>

	<Container size="content">
		<InView animation="scale">
			<div class="relative text-center py-8">
				<div class="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-primary/20 rounded-tl-xl" aria-hidden="true"></div>
				<div class="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-primary/20 rounded-br-xl" aria-hidden="true"></div>

				<p class="mb-6 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">Teklif Al</p>
				<h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl mb-3">
					{industry.name} Sitenizi Konuşalım
				</h2>
				<p class="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
					WhatsApp'tan yazın, 24 saat içinde projenize özel sabit fiyat teklifi gönderiyorum. Görüşme ücretsiz.
				</p>

				<div class="flex flex-wrap items-center justify-center gap-4">
					<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-base shadow-2xl shadow-[#25D366]/40 transition-all duration-300">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
						WhatsApp'tan Yazın
					</a>
					<Button variant="ghost" href="/contact/" class="px-8 py-[1.15rem] rounded-full border border-border/60">E-posta Gönder</Button>
				</div>
			</div>
		</InView>
	</Container>
</Section>

{#if showStickyCta}
	<div class="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-border bg-card/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.12)]">
		<div class="flex items-center justify-between px-4 py-3">
			<div>
				<p class="text-sm font-semibold">{industry.name} Sitesi Teklifi</p>
				<p class="text-xs text-muted-foreground">24sa içinde yanıt</p>
			</div>
			<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-lg shadow-[#25D366]/30">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
				Teklif Al
			</a>
		</div>
	</div>
{/if}

<style>
	.cta-ring-1 { animation: ring-pulse 4s ease-in-out infinite; }
	.cta-ring-2 { animation: ring-pulse 4s ease-in-out infinite 1s; }
	@keyframes ring-pulse {
		0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
		50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.1; }
	}
	@media (prefers-reduced-motion: reduce) {
		.cta-ring-1, .cta-ring-2 { animation: none; }
	}
</style>
