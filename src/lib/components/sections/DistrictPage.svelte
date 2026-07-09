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


	let showStickyCta = $state(false);
	let openFaq = $state<number | null>(null); // start closed — uniform appearance

	function toggleFaq(i: number) {
		openFaq = openFaq === i ? null : i;
	}

	onMount(() => {
		// Locale is forced to TR server-side via hooks.server.ts.
		// No need to setLocale on mount — header + footer already render in Turkish.


		const handleScroll = () => {
			showStickyCta = window.scrollY > 600;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });



		return () => {
			window.removeEventListener('scroll', handleScroll);
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
<Section padding="none" class="relative border-b border-border overflow-hidden">
	<!-- Atmosphere: giant drifting Fraunces ampersand -->
	<span aria-hidden="true" class="hero-glyph font-display italic select-none pointer-events-none absolute -right-[6%] -top-[12%] leading-none text-foreground/[0.045]">&amp;</span>

	<Container class="relative pt-16 pb-16 lg:pt-24 lg:pb-24">
		<p class="hero-reveal text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium" style="--stagger: 0">
			{district.name} — İstanbul Web Tasarım · Yeni projelere açık
		</p>

		<h1 class="hero-reveal font-display font-semibold text-[clamp(3rem,7.5vw,6.5rem)] leading-[1.03] tracking-tight mt-7 max-w-[16ch]" style="--stagger: 1">
			{district.name} <em class="font-display italic font-medium">Web Tasarım</em>
		</h1>

		<p class="hero-reveal text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-[54ch] mt-9" style="--stagger: 2">
			{district.character}
		</p>

		<!-- Facts line -->
		<p class="hero-reveal text-xs uppercase tracking-[0.18em] text-muted-foreground mt-9 pt-4 border-t border-border max-w-2xl" style="--stagger: 3">
			50+ proje · 5.0 Google (9 değerlendirme) · 15.000 TL'den · 2–6 hafta
		</p>

		<!-- CTAs -->
		<div class="hero-reveal flex flex-wrap items-center gap-7 mt-8" style="--stagger: 4">
			<a
				href={whatsappUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-base transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
				</svg>
				WhatsApp'tan Teklif Al
			</a>
			<a
				href="/web-sitesi-fiyatlari/"
				class="group inline-flex items-center gap-1.5 text-base font-medium text-foreground underline underline-offset-8 decoration-border hover:decoration-foreground transition-colors duration-200"
			>
				Fiyatları Gör
				<span aria-hidden="true" class="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
			</a>
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
						<span class="text-sm font-semibold whitespace-nowrap">5.0 · 9 Google Değerlendirmesi</span>
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

	<Container size="content">
		<InView animation="fade-up">
			<div class="text-center mb-10">
				<p class="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
					{district.name} Yerel İçgörü
				</p>
				<h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
					{district.name}'de Web Sitesi Neden Önemli?
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

	<Container>
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-14">
				<p class="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
					Şeffaf Fiyatlandırma
				</p>
				<h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
					{district.name} İçin Sabit Fiyat
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

	<Container size="content">
		<InView animation="fade-up">
			<div class="text-center mb-12">
				<p class="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
					{district.name} SSS
				</p>
				<h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
					Sık Sorulan Sorular
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
					<p class="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
						Yakın İlçeler
					</p>
					<h2 class="text-2xl sm:text-3xl font-bold tracking-tight">
						{district.name} Yakınında Hizmet Verdiğim İlçeler
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

				<p class="mb-6 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
					Teklif Al
				</p>
				<h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl mb-3">
					{district.name}'de Web Sitesi Yaptırın
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
	/* Editorial hero (v4 language) */
	.hero-reveal {
		opacity: 0;
		transform: translateY(14px);
		animation: hero-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
		animation-delay: calc(var(--stagger) * 90ms);
	}
	@keyframes hero-rise {
		to { opacity: 1; transform: translateY(0); }
	}
	.hero-glyph {
		font-size: clamp(24rem, 42vw, 46rem);
		animation: glyph-drift 16s ease-in-out infinite alternate;
	}
	@keyframes glyph-drift {
		from { transform: translateY(0) rotate(0deg); }
		to { transform: translateY(22px) rotate(1.2deg); }
	}
	@media (prefers-reduced-motion: reduce) {
		.hero-reveal { animation: none; opacity: 1; transform: none; }
		.hero-glyph { animation: none; }
	}

	/* ===== Hero glows (matched to homepage palette) ===== */

	/* Pricing section */
	.district-grid-bg {
		background-image:
			linear-gradient(oklch(0.42 0.15 262 / 0.3) 1px, transparent 1px),
			linear-gradient(90deg, oklch(0.42 0.15 262 / 0.3) 1px, transparent 1px);
		background-size: 40px 40px;
	}

	/* CTA glows */

	/* Gradient text */

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
