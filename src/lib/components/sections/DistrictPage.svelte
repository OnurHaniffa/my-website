<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Container, Section } from '$lib/components/layout';
	import { InView } from '$lib/components/ui/animations';
	import type { District } from '$lib/data/districts';
	import { getDistrict } from '$lib/data/districts';

	let { district }: { district: District } = $props();

	const whatsappNumber = '905428324550';
	const whatsappMessage = $derived(
		`Merhaba, ${district.name} için web sitesi fiyat teklifi almak istiyorum.`
	);
	const whatsappUrl = $derived(
		`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
	);

	// Hero rotating screenshots — same trio as homepage / pricing page
	const heroScreenshots = [
		{
			src: '/images/projects/joe-fresh-desktop.png',
			mobile: '/images/projects/joe-fresh-mobile.png',
			label: 'Designs by Joe',
			url: 'designsbyjoe.net'
		},
		{
			src: '/images/projects/dentist-screenshot.jpg',
			mobile: '/images/projects/dental-mobile-real.png',
			label: 'Pearl Dental',
			url: 'pearldental.com'
		},
		{
			src: '/images/projects/ivory-ai-screenshot.png',
			mobile: '/images/projects/ivory-ai-mobile.png',
			label: 'Ivory AI',
			url: 'ivoryai.net'
		}
	];
	let currentScreenshot = $state(0);

	let showStickyCta = $state(false);
	let openFaq = $state<number | null>(null); // start closed — uniform appearance
	let heroContent: HTMLDivElement;
	let heroMockup: HTMLDivElement;

	function toggleFaq(i: number) {
		openFaq = openFaq === i ? null : i;
	}

	onMount(() => {
		// Locale is forced to TR server-side via hooks.server.ts.
		// No need to setLocale on mount — header + footer already render in Turkish.

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const handleScroll = () => {
			showStickyCta = window.scrollY > 600;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });

		// Screenshot rotation — pause when tab is backgrounded so we don't
		// burn battery / fire useless reactive updates on a hidden tab.
		let screenshotInterval: ReturnType<typeof setInterval> | null = null;
		const startRotation = () => {
			if (screenshotInterval) return;
			screenshotInterval = setInterval(() => {
				currentScreenshot = (currentScreenshot + 1) % heroScreenshots.length;
			}, 4000);
		};
		const stopRotation = () => {
			if (screenshotInterval) {
				clearInterval(screenshotInterval);
				screenshotInterval = null;
			}
		};
		const handleVisibility = () => {
			if (document.visibilityState === 'visible') startRotation();
			else stopRotation();
		};
		startRotation();
		document.addEventListener('visibilitychange', handleVisibility);

		// GSAP is ~70KB gzipped; lazy-import to keep these district pages fast.
		// Only animate when reduced-motion is OFF and refs are mounted.
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let heroTl: any = null;
		if (!prefersReducedMotion && heroContent && heroMockup) {
			import('gsap')
				.then(({ gsap }) => {
					if (!heroContent || !heroMockup) return;
					gsap.set([heroContent, heroMockup], { opacity: 0, y: 30 });
					heroTl = gsap.timeline({ delay: 0.1 });
					heroTl
						.to(heroContent, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
						.to(heroMockup, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');
				})
				.catch(() => {
					// GSAP failed to load — silently fall through. Static layout still works.
				});
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('visibilitychange', handleVisibility);
			stopRotation();
			heroTl?.kill?.();
		};
	});

	const faqs = $derived([
		{
			question: `${district.name}'de web sitesi yaptırmak ne kadar tutar?`,
			answer: `Standart kurumsal site 15.000 TL'den, e-ticaret 50.000 TL'den, özel projeler 70.000 TL üzeri başlıyor. ${district.name} için fiziki ofise gelmemize gerek yok — tüm süreç görüntülü görüşme + dijital sözleşme ile yürüyor. Net teklif keşif görüşmesinden sonra veriliyor; saatlik sürpriz yok.`
		},
		{
			question: `Sadece ${district.name}'de mi çalışıyorsunuz?`,
			answer: `${district.name} dahil İstanbul'un her ilçesinde, Türkiye genelinde ve dünya çapında çalışıyorum. Görüşmeler video konferans üzerinden yapılır, sözleşme ve teslim tamamen dijitaldir.`
		},
		{
			question: 'Web sitesi ne kadar sürede yapılır?',
			answer:
				'Standart kurumsal site 2-3 hafta, orta ölçek site 3-4 hafta, e-ticaret 4-6 hafta. Net tarih sözleşmede yazılı; gecikme olursa indirim taahhüdü var.'
		},
		{
			question: 'SEO uyumlu olacak mı?',
			answer: `Her site SEO altyapısı ile teslim ediliyor: hızlı yükleme, mobil uyumluluk, doğru meta etiketleri, schema markup, temiz kod. ${district.name} için yerel aramalarda görünmek isteyen müşterilere yerel SEO odaklı yapı kuruyorum.`
		},
		{
			question: 'Mevcut siteyi yenilemek mi, sıfırdan yapmak mı?',
			answer:
				'Mevcut sitenizi ücretsiz incelerim ve hangi yolun daha mantıklı olduğunu söylerim. Genelde içerik mevcutsa yenileme daha hızlı ve uygun fiyatlı, ancak bazı eski sitelerde yeniden başlamak daha temiz oluyor.'
		},
		{
			question: 'Yayın sonrası destek var mı?',
			answer:
				'Tüm projelerde ilk 1-3 ay arası ücretsiz destek dahil (paket boyutuna göre). Sonrası için aylık bakım sözleşmesi sunuyorum — içerik güncellemesi, güvenlik, performans izleme.'
		}
	]);

	const nearby = $derived(
		district.microCopy.nearbyDistricts
			.map((s) => getDistrict(s))
			.filter((d): d is District => Boolean(d))
	);
</script>

<svelte:head>
	<!-- Title kept ≤60 chars (Google truncates beyond that). titleSuffix dropped. -->
	<title>{district.name} Web Tasarım — Freelance | Onur Haniffa</title>
	<meta
		name="description"
		content={`${district.name}'de web sitesi yaptırma. Kurumsal site 15.000 TL'den, e-ticaret 50.000 TL'den. Şeffaf fiyat, 2-6 hafta teslim. WhatsApp'tan ücretsiz teklif.`}
	/>
	<link rel="canonical" href={`https://onurhaniffa.com/${district.slug}-web-tasarim/`} />

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: { '@type': 'Answer', text: faq.answer }
		}))
	}).replace(/</g, '\\u003c')}</script>`}

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		'@id': `https://onurhaniffa.com/${district.slug}-web-tasarim/#business`,
		name: `Onur Haniffa — ${district.name} Web Tasarım`,
		url: `https://onurhaniffa.com/${district.slug}-web-tasarim/`,
		image: 'https://onurhaniffa.com/og-image.png',
		priceRange: '15.000 TL - 70.000 TL',
		areaServed: { '@type': 'AdministrativeArea', name: `${district.name}, İstanbul` },
		address: { '@type': 'PostalAddress', addressLocality: 'İstanbul', addressCountry: 'TR' },
		telephone: '+905428324550',
		// Reference the global business entity to avoid Google deduping us.
		parentOrganization: { '@id': 'https://onurhaniffa.com/#business' }
	}).replace(/</g, '\\u003c')}</script>`}
</svelte:head>

<!-- ====================================================
     HERO — 2-Column with rotating browser mockup
     ==================================================== -->
<Section
	padding="none"
	class="relative overflow-hidden min-h-[calc(100vh-85px)] flex flex-col justify-center"
>
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		<div class="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-background to-muted/80"></div>
		<div class="absolute -top-[50px] -left-[100px] w-[500px] h-[500px] lg:-top-[100px] lg:-left-[150px] lg:w-[800px] lg:h-[700px] district-glow-topleft rounded-full"></div>
		<div class="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] lg:-top-[200px] lg:-right-[200px] lg:w-[900px] lg:h-[900px] district-glow-accent rounded-full"></div>
		<div class="absolute -bottom-[150px] -left-[150px] w-[400px] h-[400px] lg:-bottom-[300px] lg:-left-[300px] lg:w-[800px] lg:h-[800px] district-glow-primary rounded-full"></div>
	</div>

	<!-- Decorative rings -->
	<div aria-hidden="true" class="hidden lg:block absolute top-24 right-[8%] w-80 h-80 rounded-full border border-primary/10 pointer-events-none"></div>
	<div aria-hidden="true" class="hidden lg:block absolute top-44 right-[13%] w-52 h-52 rounded-full border border-accent/10 pointer-events-none"></div>
	<div aria-hidden="true" class="hidden lg:block absolute bottom-24 left-[4%] w-60 h-60 rounded-full border border-primary/5 pointer-events-none"></div>

	<Container class="relative pt-12 pb-12 lg:pt-20 lg:pb-20">
		<div class="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
			<!-- Left: Content -->
			<div bind:this={heroContent} class="space-y-5">
				<Badge
					variant="outline"
					class="border-primary/40 text-primary bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
				>
					<span class="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" aria-hidden="true"></span>
					{district.name} • İstanbul Web Tasarım
				</Badge>

				<h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
					{district.name} <span class="text-primary">Web Tasarım</span>
				</h1>

				<p class="text-lg text-muted-foreground leading-relaxed max-w-lg">
					{district.character}
				</p>

				<!-- Price anchor -->
				<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
					<span class="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true"></span>
					<span class="text-sm font-semibold text-primary">15.000 TL'den başlıyor • 2-6 hafta teslimat</span>
				</div>

				<!-- Trust stats -->
				<div class="flex flex-wrap gap-8 sm:gap-10 py-2">
					<div class="text-center">
						<p class="text-3xl font-black text-primary tabular-nums">50+</p>
						<p class="text-xs text-muted-foreground mt-0.5">Tamamlanmış Proje</p>
					</div>
					<div class="hidden sm:block w-px bg-border self-stretch"></div>
					<div class="text-center">
						<p class="text-3xl font-black tabular-nums">5.0</p>
						<p class="text-xs text-muted-foreground mt-0.5 flex items-center justify-center gap-1">
							<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
							Google Puanı
						</p>
					</div>
					<div class="hidden sm:block w-px bg-border self-stretch"></div>
					<div class="text-center">
						<p class="text-3xl font-black tabular-nums">24sa</p>
						<p class="text-xs text-muted-foreground mt-0.5">İçinde Yanıt</p>
					</div>
				</div>

				<!-- CTAs -->
				<div class="flex flex-wrap gap-4 pt-2">
					<a
						href={whatsappUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-base shadow-2xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 hover:scale-[1.02] transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
						</svg>
						WhatsApp'tan Teklif Al
					</a>
					<Button
						size="lg"
						variant="ghost"
						href="/web-sitesi-fiyatlari/"
						class="text-base px-8 py-4 rounded-full border border-border/60 hover:bg-foreground/5 hover:border-foreground/30 transition-colors duration-300"
					>
						Fiyatları Gör
					</Button>
				</div>
			</div>

			<!-- Right: Browser mockup with rotating screenshots -->
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
							<img
								src={screenshot.src}
								alt={screenshot.label}
								class="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 {i === currentScreenshot ? 'opacity-100' : 'opacity-0'}"
								loading={i === 0 ? 'eager' : 'lazy'}
								width="640"
								height="400"
							/>
						{/each}
						<div class="absolute bottom-3 left-3 z-10">
							<div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
								<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
								{heroScreenshots[currentScreenshot].label}
							</div>
						</div>
						<div class="absolute bottom-3 right-3 flex gap-1.5 z-10">
							{#each heroScreenshots as _, i}
								<button
									onclick={() => { currentScreenshot = i; }}
									class="w-2 h-2 rounded-full transition-all duration-300 {i === currentScreenshot ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}"
									aria-label="Show {heroScreenshots[i].label}"
								></button>
							{/each}
						</div>
					</div>
				</div>

				<!-- Floating phone mockup -->
				<div class="hidden lg:block absolute -bottom-6 -right-6 w-36 rounded-2xl shadow-2xl border-2 border-border/50 bg-card overflow-hidden z-10">
					<div class="flex items-center justify-center py-1 bg-muted/80 border-b">
						<div class="w-12 h-1 rounded-full bg-border" aria-hidden="true"></div>
					</div>
					<div class="aspect-[9/16] relative overflow-hidden bg-muted">
						{#each heroScreenshots as screenshot, i}
							<img
								src={screenshot.mobile}
								alt="{screenshot.label} mobile"
								class="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 {i === currentScreenshot ? 'opacity-100' : 'opacity-0'}"
								loading="lazy"
								width="144"
								height="256"
							/>
						{/each}
					</div>
					<div class="absolute bottom-2 left-0 right-0 flex justify-center z-10">
						<span class="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-[8px] font-medium">{heroScreenshots[currentScreenshot].label}</span>
					</div>
				</div>
			</div>
		</div>
	</Container>
</Section>

<!-- ====================================================
     SOCIAL PROOF MARQUEE
     ==================================================== -->
<div class="relative border-y border-border/50 bg-gradient-to-r from-muted/50 via-primary/[0.03] to-muted/50 overflow-hidden">
	<div class="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
	<div class="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

	<div class="proof-marquee py-4">
		<div class="proof-marquee-track">
			{#each [0, 1] as _dup}
				<div class="flex items-center gap-8 shrink-0 px-4">
					<div class="flex items-center gap-2 shrink-0">
						<div class="flex gap-0.5">
							{#each [1, 2, 3, 4, 5] as _}
								<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
							{/each}
						</div>
						<span class="text-sm font-semibold whitespace-nowrap">5 Yıldızlı Google Yorumları</span>
					</div>
					<span class="text-primary/30" aria-hidden="true">•</span>
					<div class="flex items-center gap-2 shrink-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary" aria-hidden="true"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
						<span class="text-sm font-semibold whitespace-nowrap">50+ Teslim Edilen Proje</span>
					</div>
					<span class="text-primary/30" aria-hidden="true">•</span>
					<div class="flex items-center gap-2 shrink-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
						<span class="text-sm font-semibold whitespace-nowrap">24 Saat İçinde Yanıt</span>
					</div>
					<span class="text-primary/30" aria-hidden="true">•</span>
					<div class="flex items-center gap-2 shrink-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
						<span class="text-sm font-semibold whitespace-nowrap">Sabit Fiyat — Sürpriz Yok</span>
					</div>
					<span class="text-primary/30" aria-hidden="true">•</span>
					<div class="flex items-center gap-2 shrink-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
						<span class="text-sm font-semibold whitespace-nowrap">İstanbul Geneli Hizmet</span>
					</div>
					<span class="text-primary/30" aria-hidden="true">•</span>
				</div>
			{/each}
		</div>
	</div>
</div>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- ====================================================
     LOCAL CONTEXT
     ==================================================== -->
<Section padding="lg" class="relative overflow-hidden">
	<div class="absolute top-16 right-[8%] w-20 h-20 rounded-full border border-primary/10 pointer-events-none" aria-hidden="true"></div>
	<div class="absolute bottom-24 left-[6%] w-14 h-14 rounded-full border border-primary/8 pointer-events-none" aria-hidden="true"></div>

	<Container size="content">
		<InView animation="fade-up">
			<div class="text-center mb-10">
				<Badge variant="outline" class="mb-5 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					{district.name} Yerel İçgörü
				</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
					{district.name}'de Web Sitesi <span class="district-gradient-text">Neden Önemli?</span>
				</h2>
				<div class="mx-auto mt-4 mb-5 flex items-center justify-center gap-2" aria-hidden="true">
					<div class="w-8 h-0.5 rounded-full bg-primary/30"></div>
					<div class="w-2 h-2 rounded-full bg-primary"></div>
					<div class="w-8 h-0.5 rounded-full bg-primary/30"></div>
				</div>
			</div>
		</InView>

		<InView animation="fade-up" delay={100}>
			<p class="text-base text-muted-foreground leading-relaxed mb-10">
				{district.openingPara}
			</p>
		</InView>

		<div class="grid sm:grid-cols-2 gap-5">
			<InView animation="fade-up" delay={150}>
				<div class="p-6 rounded-2xl border border-border/50 bg-card hover:shadow-lg transition-all">
					<div class="text-xs font-semibold uppercase tracking-wider text-primary mb-3">{district.name} Yoğun Bölgeler</div>
					<div class="flex flex-wrap gap-2">
						{#each district.neighborhoods as n}
							<span class="text-sm font-medium px-3 py-1.5 rounded-md bg-primary/10 text-primary border border-primary/15">{n}</span>
						{/each}
					</div>
				</div>
			</InView>
			<InView animation="fade-up" delay={200}>
				<div class="p-6 rounded-2xl border border-border/50 bg-card hover:shadow-lg transition-all">
					<div class="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Hizmet Verdiğim Sektörler</div>
					<ul class="space-y-2">
						{#each district.industryMix as ind}
							<li class="text-sm text-muted-foreground flex items-start gap-2.5">
								<span class="shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
								{ind}
							</li>
						{/each}
					</ul>
				</div>
			</InView>
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- ====================================================
     PRICING STRIP
     ==================================================== -->
<Section padding="lg" class="relative overflow-hidden bg-muted/30 dark:bg-muted/10">
	<div class="absolute inset-0 -z-[2] district-grid-bg opacity-[0.04] dark:opacity-[0.05]" aria-hidden="true"></div>
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] district-pricing-glow rounded-full -z-[1]" aria-hidden="true"></div>

	<Container>
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-14">
				<Badge variant="outline" class="mb-5 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					Şeffaf Fiyatlandırma
				</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
					{district.name} İçin <span class="district-gradient-text">Sabit Fiyat</span>
				</h2>
				<p class="text-lg text-muted-foreground mt-4">Gizli ücret yok. KDV dahil. Sözleşmede ne yazıyorsa o.</p>
			</div>
		</InView>

		<div class="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto items-stretch">
			{#each [
				{ name: 'Başlangıç', price: '15.000+ TL', desc: '1-5 sayfa, mobil uyumlu, temel SEO. 2 hafta teslim.', features: ['Mobil uyumlu tasarım', 'Temel SEO kurulumu', 'İletişim formu + WhatsApp', '1 ay ücretsiz destek'], highlight: false, msg: 'Başlangıç paketi (15.000 TL)' },
				{ name: 'Profesyonel', price: '30.000+ TL', desc: '5-15 sayfa, özel tasarım, blog + CMS. 3-4 hafta.', features: ['Özel tasarım — şablon değil', 'Gelişmiş SEO + Analytics', 'Blog + içerik yönetim paneli', '3 ay ücretsiz destek'], highlight: true, msg: 'Profesyonel paketi (30.000 TL)' },
				{ name: 'E-Ticaret', price: '50.000+ TL', desc: 'Tam online mağaza, ödeme + stok yönetimi. 4-6 hafta.', features: ['Iyzico/PayTR ödeme entegrasyonu', 'Ürün yönetim paneli', 'Stok + kargo entegrasyonları', '3 ay ücretsiz destek'], highlight: false, msg: 'E-Ticaret paketi (50.000 TL)' }
			] as tier, i}
				<InView animation="fade-up" delay={i * 100}>
					<div class="relative flex flex-col h-full rounded-2xl transition-all duration-300 {tier.highlight ? 'bg-primary text-white md:scale-[1.04] shadow-2xl shadow-primary/25 z-10 border-2 border-primary' : 'bg-card border border-border/50 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30'}">
						{#if tier.highlight}
							<div class="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
								<div class="px-5 py-1.5 rounded-full bg-amber-400 text-amber-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-400/40 flex items-center gap-1.5">
									<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
									En Popüler
								</div>
							</div>
						{/if}

						<div class="relative p-7 pt-10 flex-1">
							<h3 class="text-lg font-bold mb-1 {tier.highlight ? 'text-white/90' : ''}">{tier.name}</h3>
							<p class="text-3xl font-extrabold mt-2 mb-4 tabular-nums {tier.highlight ? 'text-white' : 'text-primary'}">{tier.price}</p>
							<p class="text-sm leading-relaxed mb-5 {tier.highlight ? 'text-white/80' : 'text-muted-foreground'}">{tier.desc}</p>
							<ul class="space-y-2.5 mb-6">
								{#each tier.features as feat}
									<li class="flex items-start gap-2 text-sm {tier.highlight ? 'text-white/85' : 'text-muted-foreground'}">
										<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="shrink-0 mt-0.5 {tier.highlight ? 'text-amber-300' : 'text-primary'}" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
										{feat}
									</li>
								{/each}
							</ul>
						</div>

						<div class="relative p-7 pt-0">
							<a
								href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Merhaba! ' + tier.msg + ' hakkında ' + district.name + ' için bilgi almak istiyorum.')}`}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02] {tier.highlight ? 'bg-white text-primary hover:bg-white/90 shadow-lg' : 'bg-[#25D366] hover:bg-[#20BD5A] text-white shadow hover:shadow-lg'}"
							>
								WhatsApp'tan Teklif Al
							</a>
						</div>
					</div>
				</InView>
			{/each}
		</div>

		<InView animation="fade-up" delay={300}>
			<p class="text-center text-sm text-muted-foreground mt-8">
				Domain (~150 TL/yıl) ve hosting (~200 TL/ay) ayrıdır — şeffaf paylaşılır, üzerine bir şey eklenmez.
			</p>
		</InView>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- ====================================================
     FAQ — single column, all closed by default
     ==================================================== -->
<Section padding="lg" background="muted" class="relative overflow-hidden">
	<div class="absolute top-12 right-[5%] w-40 h-40 rounded-full border border-primary/5 pointer-events-none" aria-hidden="true"></div>
	<div class="absolute bottom-12 left-[3%] w-24 h-24 rounded-full border border-accent/5 pointer-events-none" aria-hidden="true"></div>

	<Container size="content">
		<InView animation="fade-up">
			<div class="text-center mb-12">
				<Badge variant="outline" class="mb-5 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					{district.name} SSS
				</Badge>
				<h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
					Sık Sorulan <span class="district-gradient-text">Sorular</span>
				</h2>
				<div class="mx-auto mt-4 mb-4 flex items-center justify-center gap-1.5" aria-hidden="true">
					<div class="w-12 h-0.5 rounded-full bg-primary/30"></div>
					<div class="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
					<div class="w-12 h-0.5 rounded-full bg-primary/30"></div>
				</div>
			</div>
		</InView>

		<div class="space-y-3 max-w-3xl mx-auto">
			{#each faqs as faq, i}
				<InView animation="fade-up" delay={i * 30}>
					<div class="overflow-hidden rounded-xl border bg-card transition-all {openFaq === i ? 'border-primary/30 shadow-md' : 'border-border hover:border-primary/20'}">
						<button
							onclick={() => toggleFaq(i)}
							aria-expanded={openFaq === i}
							class="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-inset"
						>
							<span class="flex items-center gap-3">
								<span class="shrink-0 w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center transition-colors {openFaq === i ? 'bg-primary text-white' : ''}">{i + 1}</span>
								<span class="font-medium text-sm sm:text-base">{faq.question}</span>
							</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground flex-shrink-0 transition-transform {openFaq === i ? 'rotate-180' : ''}" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
						</button>
						{#if openFaq === i}
							<div class="px-5 pb-5">
								<p class="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
							</div>
						{/if}
					</div>
				</InView>
			{/each}
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- ====================================================
     NEARBY DISTRICTS — internal SEO links
     ==================================================== -->
{#if nearby.length > 0}
	<Section padding="lg" class="relative overflow-hidden">
		<Container size="content">
			<InView animation="fade-up">
				<div class="text-center mb-10">
					<Badge variant="outline" class="mb-5 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
						Yakın İlçeler
					</Badge>
					<h2 class="text-2xl sm:text-3xl font-bold tracking-tight">
						{district.name} Yakınında <span class="district-gradient-text">Hizmet Verdiğim İlçeler</span>
					</h2>
				</div>
			</InView>

			<div class="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
				{#each nearby as nd, i}
					<InView animation="fade-up" delay={i * 80}>
						<a href={`/${nd.slug}-web-tasarim/`} class="group block p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all">
							<div class="font-semibold text-base mb-1 group-hover:text-primary transition-colors">{nd.name} Web Tasarım</div>
							<div class="text-xs text-muted-foreground line-clamp-2 mb-3">{nd.titleSuffix}</div>
							<div class="flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
								Sayfaya Git
								<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
							</div>
						</a>
					</InView>
				{/each}
			</div>
		</Container>
	</Section>

	<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
{/if}

<!-- ====================================================
     FINAL CTA
     ==================================================== -->
<Section padding="lg" class="relative overflow-hidden">
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] district-cta-glow rounded-full"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-primary/10 cta-ring-1"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/5 cta-ring-2"></div>
	</div>

	<Container size="content">
		<InView animation="scale">
			<div class="relative text-center py-8">
				<div class="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-primary/20 rounded-tl-xl" aria-hidden="true"></div>
				<div class="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-primary/20 rounded-br-xl" aria-hidden="true"></div>

				<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					Teklif Al
				</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-3">
					{district.name}'de <span class="district-gradient-text">Web Sitesi Yaptırın</span>
				</h2>
				<div class="mx-auto mt-4 mb-6 flex items-center justify-center gap-2" aria-hidden="true">
					<div class="w-6 h-0.5 rounded-full bg-[#25D366]/40"></div>
					<div class="w-2 h-2 rounded-full bg-[#25D366]"></div>
					<div class="w-20 h-0.5 rounded-full bg-gradient-to-r from-[#25D366] to-primary"></div>
					<div class="w-2 h-2 rounded-full bg-primary"></div>
					<div class="w-6 h-0.5 rounded-full bg-primary/40"></div>
				</div>
				<p class="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
					WhatsApp'tan yazın, 24 saat içinde projenize özel sabit fiyat teklifi gönderiyorum. Görüşme ücretsiz, hiçbir zorunluluk yok.
				</p>

				<div class="flex flex-wrap items-center justify-center gap-4">
					<a
						href={whatsappUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-base shadow-2xl shadow-[#25D366]/40 transition-all duration-300"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
						</svg>
						WhatsApp'tan Yazın
					</a>
					<Button variant="ghost" href="/contact/" class="px-8 py-[1.15rem] rounded-full border border-border/60">
						E-posta Gönder
					</Button>
				</div>
			</div>
		</InView>
	</Container>
</Section>

<!-- Sticky mobile CTA -->
{#if showStickyCta}
	<div class="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-border bg-card/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.12)]">
		<div class="flex items-center justify-between px-4 py-3">
			<div>
				<p class="text-sm font-semibold">{district.name} için teklif</p>
				<p class="text-xs text-muted-foreground">24sa içinde yanıt</p>
			</div>
			<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-lg shadow-[#25D366]/30">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
				</svg>
				WhatsApp
			</a>
		</div>
	</div>
{/if}

<style>
	/* ===== Hero glows (matched to homepage palette) ===== */
	.district-glow-topleft {
		background: radial-gradient(ellipse, oklch(0.55 0.24 260 / 0.22) 0%, oklch(0.55 0.24 260 / 0.12) 30%, oklch(0.55 0.24 260 / 0.04) 55%, transparent 75%);
	}
	:global(.dark) .district-glow-topleft {
		background: radial-gradient(ellipse, oklch(0.68 0.18 260 / 0.30) 0%, oklch(0.68 0.18 260 / 0.16) 30%, oklch(0.68 0.18 260 / 0.06) 55%, transparent 75%);
	}
	.district-glow-accent {
		background: radial-gradient(ellipse, oklch(0.58 0.22 25 / 0.45) 0%, oklch(0.58 0.22 25 / 0.28) 25%, oklch(0.58 0.22 25 / 0.12) 50%, transparent 72%);
	}
	:global(.dark) .district-glow-accent {
		background: radial-gradient(ellipse, oklch(0.68 0.20 25 / 0.55) 0%, oklch(0.68 0.20 25 / 0.35) 25%, oklch(0.68 0.20 25 / 0.18) 50%, transparent 72%);
	}
	.district-glow-primary {
		background: radial-gradient(ellipse, oklch(0.55 0.24 260 / 0.38) 0%, oklch(0.55 0.24 260 / 0.22) 30%, oklch(0.55 0.24 260 / 0.08) 55%, transparent 75%);
	}
	:global(.dark) .district-glow-primary {
		background: radial-gradient(ellipse, oklch(0.68 0.18 260 / 0.48) 0%, oklch(0.68 0.18 260 / 0.28) 30%, oklch(0.68 0.18 260 / 0.12) 55%, transparent 75%);
	}

	/* Pricing section */
	.district-grid-bg {
		background-image:
			linear-gradient(oklch(0.55 0.24 260 / 0.3) 1px, transparent 1px),
			linear-gradient(90deg, oklch(0.55 0.24 260 / 0.3) 1px, transparent 1px);
		background-size: 40px 40px;
	}
	.district-pricing-glow {
		background: radial-gradient(ellipse, oklch(0.75 0.15 85 / 0.08) 0%, transparent 70%);
	}
	:global(.dark) .district-pricing-glow {
		background: radial-gradient(ellipse, oklch(0.75 0.15 85 / 0.12) 0%, transparent 70%);
	}

	/* CTA glows */
	.district-cta-glow {
		background: radial-gradient(ellipse, oklch(0.55 0.24 260 / 0.06) 0%, transparent 60%);
	}
	:global(.dark) .district-cta-glow {
		background: radial-gradient(ellipse, oklch(0.55 0.24 260 / 0.12) 0%, transparent 60%);
	}

	/* Gradient text */
	.district-gradient-text {
		background: linear-gradient(135deg, oklch(0.55 0.24 260), oklch(0.58 0.22 25));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	:global(.dark) .district-gradient-text {
		background: linear-gradient(135deg, oklch(0.72 0.20 260), oklch(0.72 0.18 25));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* Marquee */
	.proof-marquee {
		overflow: hidden;
	}
	.proof-marquee-track {
		display: flex;
		animation: scroll 35s linear infinite;
		width: max-content;
	}
	@keyframes scroll {
		from { transform: translateX(0); }
		to { transform: translateX(-50%); }
	}

	/* CTA rings */
	.cta-ring-1 { animation: ring-pulse 4s ease-in-out infinite; }
	.cta-ring-2 { animation: ring-pulse 4s ease-in-out infinite 1s; }
	@keyframes ring-pulse {
		0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
		50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.1; }
	}

	@media (prefers-reduced-motion: reduce) {
		.proof-marquee-track,
		.cta-ring-1,
		.cta-ring-2 {
			animation: none;
		}
	}
</style>
