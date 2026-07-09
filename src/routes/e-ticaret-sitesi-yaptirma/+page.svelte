<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Container, Section } from '$lib/components/layout';
	import { InView, Counter } from '$lib/components/ui/animations';
	import CornerstoneCluster from '$lib/components/sections/CornerstoneCluster.svelte';

	const whatsappNumber = '905428324550';
	const whatsappMessage =
		'Merhaba, e-ticaret sitesi yaptırmak için fiyat teklifi almak istiyorum.';
	const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

	const heroScreenshots = [
		{ src: '/images/projects/joe-fresh-desktop.png', mobile: '/images/projects/joe-fresh-mobile.png', label: 'Designs by Joe', url: 'designsbyjoe.net' },
		{ src: '/images/projects/ivory-ai-screenshot.png', mobile: '/images/projects/ivory-ai-mobile.png', label: 'Ivory AI', url: 'ivoryai.net' },
		{ src: '/images/projects/dentist-screenshot.jpg', mobile: '/images/projects/dental-mobile-real.png', label: 'Pearl Dental', url: 'pearldental.com' }
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

	const features = [
		{
			title: 'Türkiye Ödeme Altyapıları',
			desc: 'Iyzico, PayTR, Param, Sipay — tek tıkla taksitli ödeme. Komisyon karşılaştırması açıkça gösteriliyor, gizli kapanma kuralı yok.',
			icon: 'M3 10h18M7 15h2m4 0h6M3 8a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8z'
		},
		{
			title: 'Ürün Yönetim Paneli',
			desc: '5.000+ ürünü hızlıca yönetebileceğiniz admin panel. CSV içe/dışa aktarma, toplu fiyat güncelleme, stok takibi.',
			icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
		},
		{
			title: 'Kargo & Sipariş Otomasyonu',
			desc: 'MNG, Yurtiçi, Aras Kargo entegrasyonu. Sipariş geldiğinde otomatik kargo barkodu + müşteriye SMS/email takip kodu.',
			icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
		},
		{
			title: 'Stok & Varyant Yönetimi',
			desc: 'Beden, renk, boyut varyantları. Stok 0 olunca otomatik gizleme. Düşük stok uyarıları size email + WhatsApp olarak.',
			icon: 'M4 7v10l9 5 9-5V7l-9-5-9 5z M4 7l9 5 9-5'
		},
		{
			title: 'KVKK Uyumlu Veri İşleme',
			desc: 'Müşteri verisi, fatura bilgisi, ödeme bilgisi — KVKK + ePosta İzni Yönetmeliği\'ne uygun. Açık rıza, veri saklama süresi, silme talebi otomatik.',
			icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
		},
		{
			title: 'SEO + Schema Markup',
			desc: 'Her ürün için Product schema (fiyat, stok, yorumlar). Google Shopping ile uyumlu. Kategori sayfaları, breadcrumbs, hızlı arama.',
			icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
		}
	];

	const pricingTiers = [
		{
			name: 'Başlangıç E-Ticaret',
			price: '50.000+ TL',
			subtitle: 'Küçük katalog (<200 ürün), tek varyant',
			features: [
				'200 ürüne kadar katalog',
				'Iyzico veya PayTR ödeme entegrasyonu',
				'Mobil uyumlu, hızlı yüklenen tasarım',
				'Temel SEO + Product schema',
				'Sipariş yönetim paneli',
				'1 kargo entegrasyonu',
				'4-5 hafta teslimat',
				'1 ay ücretsiz destek'
			],
			msg: 'Başlangıç E-Ticaret paketi (50.000 TL) hakkında bilgi almak istiyorum.',
			highlight: false
		},
		{
			name: 'Profesyonel E-Ticaret',
			price: '80.000+ TL',
			subtitle: 'Orta ölçek (200-2.000 ürün), çoklu varyant',
			features: [
				'Sınırsız ürün katalog',
				'Çoklu ödeme: Iyzico + PayTR + havale',
				'Beden/renk/boyut varyant yönetimi',
				'Çoklu kargo entegrasyonu (MNG, Yurtiçi, Aras)',
				'Email/SMS sipariş bildirimleri',
				'Indirim/kupon kodu sistemi',
				'Müşteri yorumları + Trustpilot entegrasyonu',
				'5-6 hafta teslimat',
				'3 ay ücretsiz destek'
			],
			msg: 'Profesyonel E-Ticaret paketi (80.000 TL) hakkında bilgi almak istiyorum.',
			highlight: true
		},
		{
			name: 'Enterprise E-Ticaret',
			price: '150.000+ TL',
			subtitle: 'Büyük ölçek, çok dilli, B2B/B2C hibrit',
			features: [
				'Sınırsız ürün, çoklu mağaza',
				'B2B fiyatlandırma + müşteri özel fiyat',
				'Çok dilli (TR + EN + opsiyonel)',
				'ERP/CRM entegrasyonu (Logo, Mikro, Netsis)',
				'Toplu sipariş + fatura altyapısı',
				'Pazar yeri entegrasyonu (Trendyol, Hepsiburada)',
				'Özel raporlama dashboard',
				'6-10+ hafta teslimat',
				'6 ay ücretsiz destek + SLA'
			],
			msg: 'Enterprise E-Ticaret paketi hakkında detaylı bilgi almak istiyorum.',
			highlight: false
		}
	];

	const faqs = [
		{
			question: 'E-ticaret sitesi yaptırma fiyatı ne kadar?',
			answer:
				"Standart küçük katalog 50.000 TL'den (200 ürüne kadar, tek ödeme entegrasyonu). Orta ölçek 80.000 TL'den (sınırsız ürün, varyantlar, çoklu kargo). Enterprise 150.000 TL'den (B2B, çok dilli, ERP entegrasyonu). Net fiyat keşif görüşmesinden sonra — saatlik sürpriz yok."
		},
		{
			question: 'Iyzico, PayTR, Param — hangisini önerirsiniz?',
			answer:
				"Çoğu KOBİ için Iyzico — en yaygın, en kolay onboarding, taksit imkanı geniş, KOBİ dostu fiyat (3,49% komisyon başlangıç). PayTR daha düşük komisyon (2,99%) ama onboarding biraz daha sıkı. Param ve Sipay özel sektör/B2B için daha uygun. Birden fazlasını da entegre edebiliriz — müşteri seçer."
		},
		{
			question: 'Trendyol/Hepsiburada satıyorum, kendi sitemi yapmak gerekli mi?',
			answer:
				"Evet ve hayır. Trendyol'da %15-25 komisyon ödüyorsunuz, müşteri verisi onlarda kalıyor (e-mail listesi yok), markanız onların altında görünmez. Kendi siteniz olduğunda bu komisyondan kurtulup direkt sadık müşteri kitlesi oluşturabiliyorsunuz — pazaryerini KEEP edip, kendi sitenizi PARALEL kullanmanız ideal."
		},
		{
			question: 'Stok takibi otomatik mi?',
			answer:
				"Evet — sipariş gelince stoktan otomatik düşüyor. Stok 0 olunca ürün gizleniyor (ya da 'tükendi' rozeti gösteriliyor — sizin tercihiniz). Düşük stok için size email + WhatsApp uyarı geliyor. Manuel müdahale gerekmiyor."
		},
		{
			question: 'Kargo entegrasyonu nasıl çalışıyor?',
			answer:
				"Sipariş onaylandığında: (1) MNG/Yurtiçi/Aras API'sine otomatik kargo kaydı oluşturuluyor, (2) barkod ve kargo etiketi PDF olarak adminden indirilebiliyor, (3) müşteriye otomatik SMS/email takip kodu gönderiliyor, (4) kargo durumu sitenizde 'Hesabım' sayfasında güncel takip ediliyor."
		},
		{
			question: 'WooCommerce / Opencart / Ticimax\'tan farkınız ne?',
			answer:
				"WooCommerce + Wordpress = ucuz ama yavaş, güvenlik açıkları, eklenti karmaşası, güncel kalmak zor. Ticimax/T-Soft = aylık ödeme, kişiselleştirme sınırlı, marka kimliği zayıf. Benim yaklaşımım: SvelteKit/Next.js ile özel kodlama — hızlı, güvenli, markaya özel, aylık ödeme yok (sadece domain + hosting maliyetleri var)."
		},
		{
			question: 'KVKK ve fatura konusunda neler dikkat ediyorum?',
			answer:
				"KVKK uyumlu form altyapısı standart — açık rıza, gizlilik politikası, veri saklama prosedürü. Müşterinin 'verilerimi sil' talebine 30 gün içinde cevap verme prosedürü dahil. e-Fatura entegrasyonu için Logo, Mikro, Netsis sistemleriyle çalışıyoruz."
		},
		{
			question: 'Yayın sonrası sürekli destek lazım mı?',
			answer:
				"E-ticaret sitelerinde tavsiye edilir — yeni ödeme yöntemleri (taksit oranı değişimi, yeni kart formatları), kargo entegrasyon güncellemeleri, KVKK regülasyon değişiklikleri rutin oluyor. Ayda 2.500-5.000 TL'lik bakım sözleşmesi ile bunları sizin için yönetiyorum, isterseniz."
		}
	];
</script>

<svelte:head>
	<title>E-Ticaret Sitesi Yaptırma — 50.000 TL'den | Onur Haniffa</title>
	<meta
		name="description"
		content="E-ticaret sitesi yaptırma fiyatları — Başlangıç 50.000 TL'den, Profesyonel 80.000 TL'den, Enterprise 150.000 TL'den. Iyzico/PayTR ödeme, MNG/Yurtiçi/Aras kargo, KVKK uyumlu. Şeffaf fiyat. WhatsApp'tan ücretsiz teklif."
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
		'@type': 'Service',
		'@id': 'https://onurhaniffa.com/e-ticaret-sitesi-yaptirma/#service',
		name: 'E-Ticaret Sitesi Yaptırma',
		serviceType: 'E-commerce Web Development',
		provider: { '@id': 'https://onurhaniffa.com/#business' },
		areaServed: { '@type': 'Country', name: 'Türkiye' },
		offers: [
			{ '@type': 'Offer', name: 'Başlangıç', price: '50000', priceCurrency: 'TRY' },
			{ '@type': 'Offer', name: 'Profesyonel', price: '80000', priceCurrency: 'TRY' },
			{ '@type': 'Offer', name: 'Enterprise', price: '150000', priceCurrency: 'TRY' }
		]
	}).replace(/</g, '\\u003c')}</script>`}
</svelte:head>

<!-- HERO -->
<Section padding="none" class="relative overflow-hidden min-h-[calc(100vh-85px)] flex flex-col justify-center">
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		<div class="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-background to-muted/80"></div>
		<div class="absolute -top-[100px] -left-[150px] w-[800px] h-[700px] eticaret-glow-topleft rounded-full"></div>
		<div class="absolute -top-[200px] -right-[200px] w-[900px] h-[900px] eticaret-glow-accent rounded-full"></div>
		<div class="absolute -bottom-[300px] -left-[300px] w-[800px] h-[800px] eticaret-glow-primary rounded-full"></div>
	</div>

	<Container class="relative pt-12 pb-12 lg:pt-20 lg:pb-20">
		<div class="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
			<div bind:this={heroContent} class="space-y-5">
				<Badge variant="outline" class="border-primary/40 text-primary bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
					<span class="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" aria-hidden="true"></span>
					E-Ticaret • Türkiye Pazarı
				</Badge>

				<h1 class="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
					E-Ticaret Sitesi <br class="hidden sm:block" />Yaptırma
				</h1>

				<p class="text-lg text-muted-foreground leading-relaxed max-w-lg">
					Iyzico/PayTR ödeme, MNG/Yurtiçi/Aras kargo, KVKK uyumlu, Trendyol/Hepsiburada bağımlılığından çıkış. Trendyol'a %15-25 komisyon ödemeyi durdurun, kendi sadık müşteri kitlenizi oluşturun.
				</p>

				<div class="flex flex-wrap gap-2">
					<a href="#fiyatlar" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-transparent hover:bg-primary/15 transition-colors">
						<span class="text-sm font-semibold text-foreground">Başlangıç 50.000 TL</span>
					</a>
					<a href="#fiyatlar" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-transparent hover:bg-primary/15 transition-colors">
						<span class="text-sm font-semibold text-foreground">Profesyonel 80.000 TL</span>
					</a>
					<a href="#fiyatlar" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-transparent hover:bg-primary/15 transition-colors">
						<span class="text-sm font-semibold text-foreground">Enterprise 150.000 TL</span>
					</a>
				</div>

				<div class="flex flex-wrap gap-8 sm:gap-10 py-2">
					<div class="text-center">
						<p class="text-3xl font-black text-primary tabular-nums"><Counter value={50} duration={2000} suffix="+" /></p>
						<p class="text-xs text-muted-foreground mt-0.5">Tamamlanmış Proje</p>
					</div>
					<div class="hidden sm:block w-px bg-border self-stretch"></div>
					<div class="text-center">
						<p class="text-3xl font-black tabular-nums">4-10<span class="text-xl">hf</span></p>
						<p class="text-xs text-muted-foreground mt-0.5">Teslimat</p>
					</div>
					<div class="hidden sm:block w-px bg-border self-stretch"></div>
					<div class="text-center">
						<p class="text-3xl font-black tabular-nums">0<span class="text-xl">%</span></p>
						<p class="text-xs text-muted-foreground mt-0.5">Aylık Ücret</p>
					</div>
				</div>

				<div class="flex flex-wrap gap-4 pt-2">
					<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-base shadow-2xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 hover:scale-[1.02] transition-all duration-300">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
						WhatsApp'tan Teklif Al
					</a>
					<Button size="lg" variant="ghost" href="#fiyatlar" class="text-base px-8 py-4 rounded-full border border-border/60 hover:bg-foreground/5">Fiyatları Gör</Button>
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

<!-- FEATURES -->
<Section padding="lg" class="relative overflow-hidden">
	<Container>
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-14">
				<p class="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">Özellikler</p>
				<h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
					E-Ticaret İçin Türkiye Pazarına Özel Altyapı
				</h2>
				<p class="text-lg text-muted-foreground mt-4">
					Türkiye'de e-ticaret farklı kurallarla işliyor — ödeme yöntemleri, kargo, KVKK, e-Fatura. Standart "global" çözümler boğuluyor. Lokal altyapı şart.
				</p>
			</div>
		</InView>

		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
			{#each features as feat, i}
				<InView animation="fade-up" delay={i * 80}>
					<div class="h-full p-6 rounded-2xl bg-card border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all">
						<div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
							<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d={feat.icon}/></svg>
						</div>
						<h3 class="text-base font-bold mb-2">{feat.title}</h3>
						<p class="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
					</div>
				</InView>
			{/each}
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- PRICING -->
<Section padding="lg" id="fiyatlar" class="relative overflow-hidden bg-muted/30 dark:bg-muted/10">
	<div class="absolute inset-0 -z-[2] eticaret-grid-bg opacity-[0.04] dark:opacity-[0.05]" aria-hidden="true"></div>

	<Container>
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-14">
				<p class="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">Fiyat Paketleri</p>
				<h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
					Şeffaf Sabit Fiyat
				</h2>
				<p class="text-lg text-muted-foreground mt-4">
					Aylık ödeme yok. Sözleşmede ne yazıyorsa o teslim ediliyor.
				</p>
			</div>
		</InView>

		<div class="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto items-stretch">
			{#each pricingTiers as tier, i}
				<InView animation="fade-up" delay={i * 100}>
					<div class="relative flex flex-col h-full rounded-2xl transition-all duration-300 {tier.highlight ? 'bg-primary text-white md:scale-[1.04] shadow-2xl shadow-primary/25 z-10 border-2 border-primary' : 'bg-card border border-border/50 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30'}">
						{#if tier.highlight}
							<div class="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
								<div class="px-5 py-1.5 rounded-full bg-amber-400 text-amber-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-400/40 flex items-center gap-1.5">
									<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
									En Popüler
								</div>
							</div>
						{/if}

						<div class="relative p-7 pt-10 flex-1">
							<h3 class="text-lg font-bold mb-1 {tier.highlight ? 'text-white/90' : ''}">{tier.name}</h3>
							<p class="text-xs mb-3 {tier.highlight ? 'text-white/70' : 'text-muted-foreground'}">{tier.subtitle}</p>
							<p class="text-3xl font-extrabold mt-2 mb-6 tabular-nums {tier.highlight ? 'text-white' : 'text-primary'}">{tier.price}</p>
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
							<a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Merhaba! ' + tier.msg)}`} target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02] {tier.highlight ? 'bg-white text-primary hover:bg-white/90 shadow-lg' : 'bg-[#25D366] hover:bg-[#20BD5A] text-white shadow hover:shadow-lg'}">
								WhatsApp'tan Teklif Al
							</a>
						</div>
					</div>
				</InView>
			{/each}
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- FAQ -->
<Section padding="lg" class="relative overflow-hidden">
	<Container size="content">
		<InView animation="fade-up">
			<div class="text-center mb-12">
				<p class="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">SSS</p>
				<h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
					E-Ticaret Hakkında Sık Sorulan Sorular
				</h2>
			</div>
		</InView>

		<div class="space-y-3 max-w-3xl mx-auto">
			{#each faqs as faq, i}
				<InView animation="fade-up" delay={i * 30}>
					<div class="overflow-hidden rounded-xl border bg-card transition-all {openFaq === i ? 'border-primary/30 shadow-md' : 'border-border'}">
						<button onclick={() => toggleFaq(i)} aria-expanded={openFaq === i} class="w-full px-5 py-4 text-left flex items-center justify-between gap-4">
							<span class="flex items-center gap-3">
								<span class="shrink-0 w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center {openFaq === i ? 'bg-primary text-white' : ''}">{i + 1}</span>
								<span class="font-medium text-sm sm:text-base">{faq.question}</span>
							</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground transition-transform {openFaq === i ? 'rotate-180' : ''}"><path d="m6 9 6 6 6-6"/></svg>
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

<CornerstoneCluster cornerstonePath="/e-ticaret-sitesi-yaptirma/" />

<!-- FINAL CTA -->
<Section padding="lg" class="relative overflow-hidden">
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] eticaret-cta-glow rounded-full"></div>
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
					E-Ticaret Sitenizi Konuşalım
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
				<p class="text-sm font-semibold">E-Ticaret Sitesi Teklifi</p>
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
	.eticaret-grid-bg { background-image: linear-gradient(oklch(0.42 0.15 262 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.42 0.15 262 / 0.3) 1px, transparent 1px); background-size: 40px 40px; }
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
