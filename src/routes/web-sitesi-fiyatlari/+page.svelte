<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Container, Section } from '$lib/components/layout';
	import { InView, Counter } from '$lib/components/ui/animations';
	import CornerstoneCluster from '$lib/components/sections/CornerstoneCluster.svelte';

	const whatsappNumber = '905428324550';
	// Pricing-intent message — matches what they searched for
	const whatsappMessage =
		'Merhaba! Web sitesi fiyat teklifi almak istiyorum.';
	const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

	// Hero rotating screenshots — same as homepage
	const heroScreenshots = [
		{ src: '/images/projects/joe-fresh-desktop.png', mobile: '/images/projects/joe-fresh-mobile.png', label: 'Designs by Joe', url: 'designsbyjoe.net' },
		{ src: '/images/projects/dentist-screenshot.jpg', mobile: '/images/projects/dental-mobile-real.png', label: 'Pearl Dental', url: 'pearldental.com' },
		{ src: '/images/projects/ivory-ai-screenshot.png', mobile: '/images/projects/ivory-ai-mobile.png', label: 'Ivory AI', url: 'ivoryai.net' }
	];
	let currentScreenshot = $state(0);

	let showStickyCta = $state(false);
	let heroContent: HTMLDivElement;
	let heroMockup: HTMLDivElement;

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const handleScroll = () => {
			showStickyCta = window.scrollY > 600;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });

		const screenshotInterval = setInterval(() => {
			currentScreenshot = (currentScreenshot + 1) % heroScreenshots.length;
		}, 4000);

		let heroTl: gsap.core.Timeline | null = null;
		if (!prefersReducedMotion && heroContent && heroMockup) {
			gsap.set([heroContent, heroMockup], { opacity: 0, y: 30 });
			heroTl = gsap.timeline({ delay: 0.1 });
			heroTl
				.to(heroContent, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
				.to(heroMockup, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
			clearInterval(screenshotInterval);
			heroTl?.kill();
		};
	});

	// Pricing tiers — same data as homepage
	const pricingTiers = [
		{
			name: 'Başlangıç',
			price: '15.000+ TL',
			subtitle: 'Tanıtım & küçük işletme siteleri',
			features: [
				'1-5 sayfa',
				'Mobil uyumlu tasarım',
				'Temel SEO kurulumu',
				'İletişim formu + WhatsApp butonu',
				'2 haftalık teslimat',
				'1 ay ücretsiz destek'
			],
			msg: 'Merhaba! Başlangıç paketi (15.000 TL) hakkında fiyat almak istiyorum.',
			highlighted: false
		},
		{
			name: 'Profesyonel',
			price: '30.000+ TL',
			subtitle: 'Kurumsal siteler & marka vitrinleri',
			features: [
				'5-15 sayfa',
				'Özel tasarım — şablon değil',
				'Gelişmiş SEO + Analytics',
				'Blog entegrasyonu',
				'İçerik yönetim paneli',
				'3-4 haftalık teslimat',
				'3 ay ücretsiz destek'
			],
			msg: 'Merhaba! Profesyonel paketi (30.000 TL) hakkında fiyat almak istiyorum.',
			highlighted: true
		},
		{
			name: 'E-Ticaret',
			price: '50.000+ TL',
			subtitle: 'Tam fonksiyonel online mağazalar',
			features: [
				'Tam online mağaza',
				'Ödeme altyapısı (iyzico/PayTR)',
				'Ürün yönetim paneli',
				'Stok + kargo entegrasyonları',
				'SEO + Analytics',
				'4-6 haftalık teslimat',
				'3 ay ücretsiz destek'
			],
			msg: 'Merhaba! E-Ticaret paketi (50.000 TL) hakkında fiyat almak istiyorum.',
			highlighted: false
		}
	];

	// Portfolio — same 3 projects as homepage, kept for trust
	const portfolioProjects = [
		{
			title: 'Designs by Joe',
			desc: 'Fan sanatı illüstratörü için portfolyo ve e-ticaret sitesi',
			screenshot: '/images/projects/joe-fresh-desktop.png',
			liveUrl: 'https://designsbyjoe.net',
			theme: 'violet' as const,
			challenge: ['200+ eseri sergileme imkanı yoktu', 'Online satış sıfırdı'],
			solution: ['Dinamik galeri + sepet sistemi', '3 kat daha hızlı, %40 artan talep'],
			tech: ['SvelteKit', 'Tailwind', 'Stripe']
		},
		{
			title: 'Ivory AI',
			desc: 'AI chatbot platformu için SaaS açılış sayfası',
			screenshot: '/images/projects/ivory-ai-screenshot.png',
			liveUrl: 'https://ivoryai.net',
			theme: 'blue' as const,
			challenge: ['Online varlık yok, ürün değerlendirilmiyordu', 'Düşük dönüşüm oranı'],
			solution: ['Canlı demo + interaktif fiyat hesaplayıcı', "İlk ayda %2.8 dönüşüm"],
			tech: ['SvelteKit', 'OpenAI', 'Vercel']
		},
		{
			title: 'Pearl Dental',
			desc: 'Online randevu sistemli modern diş kliniği sitesi',
			screenshot: '/images/projects/dentist-screenshot.jpg',
			liveUrl: '/work',
			theme: 'teal' as const,
			challenge: ['Tüm randevular telefonla, kaçan aramalar = kayıp hasta', 'Online güven sinyalleri yoktu'],
			solution: ['Klinik takvimi entegrasyonu', "Yeni randevuların %65'i siteden geliyor"],
			tech: ['SvelteKit', 'Directus', 'Tailwind']
		}
	];

	// Pricing-focused FAQs — the questions buyers actually ask before quoting
	const faqs = [
		{
			question: 'Web sitesi fiyatları neye göre belirleniyor?',
			answer:
				"Fiyatı 4 şey belirler: sayfa sayısı, özel tasarım vs şablon, ek özellikler (blog, e-ticaret, çok dilli yapı, üyelik) ve içerik üretimi (metin/görsel sizden mi yoksa benden mi). Keşif görüşmesinden sonra projenize sabit fiyat veriyorum — saatlik sürpriz yok."
		},
		{
			question: '15.000 TL\'lik bir site neyi içeriyor?',
			answer:
				'5 sayfaya kadar mobil uyumlu, hızlı yüklenen, temel SEO altyapısı kurulu kurumsal site. İletişim formu, WhatsApp butonu, Google Maps entegrasyonu dahil. 2 haftada teslim. Sonradan büyütmek isteyen müşteriler genelde bu paketle başlıyor.'
		},
		{
			question: 'Ödeme nasıl alınıyor? Taksit var mı?',
			answer:
				'Standart: %50 başlangıçta, %50 yayına alırken. Daha büyük projelerde 3 taksite bölünebiliyor (sözleşmede yazılı). Havale, Iyzico veya kredi kartı kabul ediyorum. Fatura kesiliyor.'
		},
		{
			question: 'Ne kadar sürede teslim ediyorsunuz?',
			answer:
				'Başlangıç paketi 2 hafta, Profesyonel 3-4 hafta, E-Ticaret 4-6 hafta. Hızlı teslimat gerekirse +%20 acil ücreti ile 1 haftaya kadar inebiliyorum (kapasite uygunsa). Net tarih sözleşmede.'
		},
		{
			question: 'Gizli ücret olacak mı? Sonradan ek fiyat çıkar mı?',
			answer:
				"Hayır. Sözleşmede ne yazıyorsa o teslim ediliyor, fiyat o fiyat. Domain (yıllık ~150 TL) ve hosting (~ayda 200 TL) ayrı kalemler — bu zorunlu maliyetleri açıkça paylaşıyorum, ben üzerine bir şey eklemiyorum."
		},
		{
			question: 'Site yayına alındıktan sonra destek alabilir miyim?',
			answer:
				'Tüm paketlerde ilk ay (Başlangıç) veya 3 ay (Profesyonel/E-Ticaret) ücretsiz destek dahil. Sonrası için aylık bakım sözleşmesi (içerik güncellemeleri, güvenlik, performans izleme) sunuyorum, isteğe bağlı.'
		},
		{
			question: 'Mevcut sitemi yenilemek istiyorum, fiyat aynı mı?',
			answer:
				'Yenileme genelde sıfırdan yapımdan biraz daha az tutuyor çünkü içerikleriniz hazır. Mevcut sitenizi ücretsiz inceliyorum, neyin tutulup neyin değişmesi gerektiğini paylaşıyorum, sonra net fiyat veriyorum.'
		},
		{
			question: 'İstanbul dışındaki işletmelerle çalışıyor musunuz?',
			answer:
				'Evet. Türkiye geneli ve dünya çapında çalışıyorum. Görüşmeler video konferans üzerinden, sözleşme ve teslim tamamen dijital. İstanbul\'da olmamak fark etmiyor.'
		}
	];

	let openFaq = $state<number | null>(0);
	function toggleFaq(i: number) {
		openFaq = openFaq === i ? null : i;
	}
</script>

<svelte:head>
	<title>Web Sitesi Fiyatları 2026 | İstanbul'da Web Sitesi Yaptırma — 15.000 TL'den</title>
	<meta
		name="description"
		content="Web sitesi fiyatları ne kadar? Kurumsal site 15.000 TL'den, e-ticaret 50.000 TL'den. Şeffaf, sabit fiyat. 2-6 haftada teslim. WhatsApp'tan ücretsiz teklif alın."
	/>
	<meta property="og:title" content="Web Sitesi Fiyatları 2026 | 15.000 TL'den Başlayan" />
	<meta
		property="og:description"
		content="İstanbul'da web sitesi yaptırma fiyatları. Şeffaf, sabit fiyat. Gizli ücret yok. WhatsApp'tan teklif alın."
	/>
	<link rel="canonical" href="https://onurhaniffa.com/web-sitesi-fiyatlari/" />

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: { '@type': 'Answer', text: faq.answer }
		}))
	}).replace(/</g, '\\u003c')}</script>`}
</svelte:head>

<!-- ====================================================
     HERO — Pricing-first, search-intent matched
     ==================================================== -->
<Section padding="none" class="relative overflow-hidden min-h-[calc(100vh-85px)] flex flex-col justify-center">
	<!-- Glow background — same DNA as homepage -->
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		<div class="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-background to-muted/80"></div>
		<div class="absolute -top-[50px] -left-[100px] w-[500px] h-[500px] lg:-top-[100px] lg:-left-[150px] lg:w-[800px] lg:h-[700px] hero-glow-topleft rounded-full"></div>
		<div class="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] lg:-top-[200px] lg:-right-[200px] lg:w-[900px] lg:h-[900px] hero-glow-accent rounded-full"></div>
		<div class="absolute -bottom-[150px] -left-[150px] w-[400px] h-[400px] lg:-bottom-[300px] lg:-left-[300px] lg:w-[800px] lg:h-[800px] hero-glow-primary rounded-full"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] lg:w-[1100px] lg:h-[700px] hero-glow-center"></div>
	</div>

	<!-- Decorative rings -->
	<div aria-hidden="true" class="hidden lg:block absolute top-24 right-[8%] w-80 h-80 rounded-full border border-primary/10 pointer-events-none"></div>
	<div aria-hidden="true" class="hidden lg:block absolute top-44 right-[13%] w-52 h-52 rounded-full border border-accent/10 pointer-events-none"></div>
	<div aria-hidden="true" class="hidden lg:block absolute bottom-24 left-[4%] w-60 h-60 rounded-full border border-primary/5 pointer-events-none"></div>

	<Container class="relative pt-16 pb-16 lg:pt-24 lg:pb-24">
		<div class="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
			<!-- Left: Pricing-first content -->
			<div bind:this={heroContent} class="space-y-5">
				<Badge
					variant="outline"
					class="border-primary/40 text-primary bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
				>
					<span class="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" aria-hidden="true"></span>
					Şeffaf Fiyat • İstanbul
				</Badge>

				<h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
					Web Sitesi Fiyatları
					<br class="hidden sm:block" />
					<span class="text-primary">15.000 TL'den</span> başlıyor
				</h1>

				<p class="text-lg text-muted-foreground leading-relaxed max-w-lg">
					Kurumsal site, e-ticaret ve özel projeler için sabit fiyat teklifi.
					Saatlik sürpriz yok, gizli ücret yok. WhatsApp'tan yazın, 24 saat içinde
					detaylı fiyat teklifi alın.
				</p>

				<!-- Three pricing anchors — clickable to scroll to pricing -->
				<div class="flex flex-wrap gap-2 pt-1">
					<a href="#fiyatlar" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors">
						<span class="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true"></span>
						<span class="text-sm font-semibold text-primary">Başlangıç 15.000 TL</span>
					</a>
					<a href="#fiyatlar" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors">
						<span class="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true"></span>
						<span class="text-sm font-semibold text-primary">Profesyonel 30.000 TL</span>
					</a>
					<a href="#fiyatlar" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors">
						<span class="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true"></span>
						<span class="text-sm font-semibold text-primary">E-Ticaret 50.000 TL</span>
					</a>
				</div>

				<!-- Stats: trust signals -->
				<div class="flex flex-wrap gap-8 sm:gap-10 py-2">
					<div class="text-center">
						<p class="text-3xl font-black text-primary tabular-nums">
							<Counter value={50} duration={2000} suffix="+" />
						</p>
						<p class="text-xs text-muted-foreground mt-0.5">Teslim Edilmiş Proje</p>
					</div>
					<div class="hidden sm:block w-px bg-border self-stretch"></div>
					<div class="text-center">
						<p class="text-3xl font-black tabular-nums">
							<Counter value={5} duration={1800} suffix=".0" />
						</p>
						<p class="text-xs text-muted-foreground mt-0.5 flex items-center justify-center gap-1">
							<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
							Google Puanı
						</p>
					</div>
					<div class="hidden sm:block w-px bg-border self-stretch"></div>
					<div class="text-center">
						<p class="text-3xl font-black tabular-nums">24<span class="text-xl">sa</span></p>
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
						WhatsApp'tan Fiyat Al
					</a>
					<Button
						size="lg"
						variant="ghost"
						href="#fiyatlar"
						class="text-base px-8 py-4 rounded-full border border-border/60 hover:bg-foreground/5 hover:border-foreground/30 transition-colors duration-300 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none"
					>
						Fiyatları İncele
					</Button>
				</div>
			</div>

			<!-- Right: Browser mockup -->
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
     PRICING — Moved to position #2 (was #4 on homepage)
     ==================================================== -->
<Section padding="lg" id="fiyatlar" class="relative overflow-hidden pricing-section bg-muted/30 dark:bg-muted/10">
	<div class="absolute inset-0 -z-[2] pricing-grid-bg opacity-[0.04] dark:opacity-[0.05]" aria-hidden="true"></div>
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] pricing-glow rounded-full -z-[1]" aria-hidden="true"></div>
	<div class="absolute top-16 left-[8%] w-20 h-20 rounded-full border border-primary/10 pointer-events-none" aria-hidden="true"></div>
	<div class="absolute bottom-24 right-[6%] w-14 h-14 rounded-full border border-primary/8 pointer-events-none" aria-hidden="true"></div>

	<Container>
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-16">
				<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					Fiyat Paketleri
				</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
					Şeffaf <span class="pricing-gradient-text">Fiyatlandırma</span>
				</h2>
				<div class="mx-auto mt-4 mb-5 flex items-center justify-center gap-2" aria-hidden="true">
					<div class="w-8 h-0.5 rounded-full bg-primary/30"></div>
					<div class="w-2 h-2 rounded-full bg-primary"></div>
					<div class="w-8 h-0.5 rounded-full bg-primary/30"></div>
				</div>
				<p class="text-lg text-muted-foreground">
					Sabit fiyat. Gizli ücret yok. KDV dahil.
				</p>
			</div>
		</InView>

		<div class="grid gap-8 md:grid-cols-3 items-stretch">
			{#each pricingTiers as tier, i}
				<InView animation="fade-up" delay={i * 100}>
					<div
						class="relative flex flex-col h-full rounded-2xl transition-all duration-300 group/price {tier.highlighted
							? 'bg-primary text-white md:scale-[1.04] shadow-2xl shadow-primary/25 hover:shadow-primary/40 z-10 border-2 border-primary'
							: 'bg-card border border-border/50 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30'}"
					>
						{#if tier.highlighted}
							<div class="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
								<div class="px-5 py-1.5 rounded-full bg-amber-400 text-amber-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-400/40 flex items-center gap-1.5">
									<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
									En Popüler
								</div>
							</div>
							<div class="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none" aria-hidden="true">
								<div class="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
							</div>
						{:else}
							<div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.03] opacity-0 group-hover/price:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true"></div>
						{/if}

						<div class="relative p-7 pt-10 pb-0 flex-1">
							<h3 class="text-lg font-bold mb-1 {tier.highlighted ? 'text-white/90' : ''}">{tier.name}</h3>
							<p class="text-xs {tier.highlighted ? 'text-white/70' : 'text-muted-foreground'} mb-3">{tier.subtitle}</p>
							<p class="text-3xl font-extrabold mt-2 mb-6 tabular-nums {tier.highlighted ? 'text-white' : 'text-primary'}">{tier.price}</p>
							<ul class="space-y-3 mb-6">
								{#each tier.features as feature}
									<li class="flex items-start gap-2.5 text-sm {tier.highlighted ? 'text-white/80' : 'text-muted-foreground'}">
										<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="{tier.highlighted ? 'text-amber-300' : 'text-primary'} shrink-0 mt-0.5" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
										{feature}
									</li>
								{/each}
							</ul>
						</div>

						<div class="relative p-7 pt-0">
							<a
								href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(tier.msg)}`}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 {tier.highlighted
									? 'bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl focus-visible:ring-white/30'
									: 'bg-[#25D366] hover:bg-[#20BD5A] text-white hover:shadow-lg hover:shadow-[#25D366]/30 focus-visible:ring-[#25D366]/30'}"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
								</svg>
									WhatsApp'tan Teklif Al
							</a>
						</div>
					</div>
				</InView>
			{/each}
		</div>

		<InView animation="fade-up" delay={300}>
			<p class="text-center text-sm text-muted-foreground mt-8">
				Tüm fiyatlar sabit tekliftir. KDV dahildir. Domain (~150 TL/yıl) ve hosting (~200 TL/ay) ayrıdır — şeffaf paylaşılır, üzerine bir şey eklenmez.
			</p>
		</InView>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- ====================================================
     SOCIAL PROOF STRIP
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
						<span class="text-sm font-semibold whitespace-nowrap">5 Yıldızlı Google Değerlendirmeler</span>
					</div>
					<span class="text-primary/30" aria-hidden="true">&#x2022;</span>
					<div class="flex items-center gap-2 shrink-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary" aria-hidden="true"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
						<span class="text-sm font-semibold whitespace-nowrap">50+ Teslim Edilen Proje</span>
					</div>
					<span class="text-primary/30" aria-hidden="true">&#x2022;</span>
					<div class="flex items-center gap-2 shrink-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
						<span class="text-sm font-semibold whitespace-nowrap">24 Saat İçinde Yanıt</span>
					</div>
					<span class="text-primary/30" aria-hidden="true">&#x2022;</span>
					<div class="flex items-center gap-2 shrink-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
						<span class="text-sm font-semibold whitespace-nowrap">Sabit Fiyat — Sürpriz Yok</span>
					</div>
					<span class="text-primary/30" aria-hidden="true">&#x2022;</span>
					<div class="flex items-center gap-2 shrink-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
						<span class="text-sm font-semibold whitespace-nowrap">2-6 Hafta Teslimat</span>
					</div>
					<span class="text-primary/30" aria-hidden="true">&#x2022;</span>
				</div>
			{/each}
		</div>
	</div>
</div>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- ====================================================
     PORTFOLIO — Proof of work
     ==================================================== -->
<Section padding="lg" class="relative overflow-hidden">
	<Container>
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-14">
				<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					Portfolyo
				</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
					Son <span class="case-gradient-text">Çalışmalar</span>
				</h2>
				<p class="mt-4 text-base text-muted-foreground">
					Bu paketlerle ne tür siteler teslim ettiğimi görün — gerçek müşteriler, gerçek sonuçlar.
				</p>
			</div>
		</InView>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
			{#each portfolioProjects as project, i}
				{@const tc = {
					violet: { label: 'bg-violet-500 text-white', dot: 'bg-violet-400', tag: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300', cta: 'bg-violet-500 hover:bg-violet-600 text-white' },
					blue: { label: 'bg-blue-500 text-white', dot: 'bg-blue-400', tag: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300', cta: 'bg-blue-500 hover:bg-blue-600 text-white' },
					teal: { label: 'bg-teal-500 text-white', dot: 'bg-teal-400', tag: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300', cta: 'bg-teal-500 hover:bg-teal-600 text-white' }
				}[project.theme]}
				{@const isExternal = project.liveUrl.startsWith('http')}
				<InView animation="fade-up" delay={i * 150}>
					<a
						href={project.liveUrl}
						target={isExternal ? '_blank' : undefined}
						rel={isExternal ? 'noopener noreferrer' : undefined}
						class="group relative flex flex-col h-full rounded-xl bg-card border border-border/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
					>
						<div class="overflow-hidden m-3 mb-0 rounded-lg shadow-sm">
							<img
								src={project.screenshot}
								alt={project.title}
								class="w-full h-auto transition-transform duration-500 ease-out group-hover:scale-[1.03]"
								loading="lazy"
							/>
						</div>

						<div class="flex flex-col flex-1 px-5 pt-5 pb-5 gap-4">
							<div>
								<h3 class="text-lg font-bold tracking-tight">{project.title}</h3>
								<p class="text-sm text-muted-foreground mt-1 leading-relaxed">{project.desc}</p>
							</div>

							<div>
								<span class="inline-block text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md {tc.label} mb-2.5">Sorun</span>
								<ul class="space-y-1.5">
									{#each project.challenge as bullet}
										<li class="flex items-start gap-2.5 text-[13px] text-muted-foreground leading-snug">
											<span class="shrink-0 w-1.5 h-1.5 rounded-full {tc.dot} mt-1.5" aria-hidden="true"></span>
											{bullet}
										</li>
									{/each}
								</ul>
							</div>

							<div>
								<span class="inline-block text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md {tc.label} mb-2.5">Çözüm</span>
								<ul class="space-y-1.5">
									{#each project.solution as bullet}
										<li class="flex items-start gap-2.5 text-[13px] text-muted-foreground leading-snug">
											<span class="shrink-0 w-1.5 h-1.5 rounded-full {tc.dot} mt-1.5" aria-hidden="true"></span>
											{bullet}
										</li>
									{/each}
								</ul>
							</div>

							<div class="mt-auto pt-3 flex items-end justify-between gap-3">
								<div class="flex flex-wrap gap-1.5">
									{#each project.tech as tag}
										<span class="text-[11px] font-medium px-2.5 py-1 rounded-full {tc.tag}">{tag}</span>
									{/each}
								</div>
								<span class="shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold px-3.5 py-2 rounded-lg {tc.cta} transition-colors duration-200 shadow-sm">
									Gör
									<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
								</span>
							</div>
						</div>
					</a>
				</InView>
			{/each}
		</div>

		<div class="mt-14 text-center">
			<Button
				variant="outline"
				href="/work"
				class="group px-8 py-6 rounded-full text-base border-2 hover:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none"
			>
				Tüm Projeleri Gör
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
			</Button>
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- ====================================================
     "WHAT YOU GET FOR THE PRICE" — pricing-tied process strip
     ==================================================== -->
<Section padding="lg" background="muted" class="relative overflow-hidden">
	<div class="absolute top-0 right-0 w-[400px] h-[400px] testimonial-glow rounded-full -z-[1]" aria-hidden="true"></div>

	<Container>
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-12">
				<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					Fiyatın İçinde Ne Var?
				</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
					Ödediğiniz <span class="pricing-gradient-text">Fiyatın</span> Karşılığı
				</h2>
				<p class="mt-4 text-base text-muted-foreground">
					Her pakette dahil olan adımlar — keşiften yayına kadar.
				</p>
			</div>
		</InView>

		<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
			{#each [
				{
					num: '01',
					title: 'Keşif & Strateji',
					desc: 'Ücretsiz görüşme, hedef kitle analizi, rakip incelemesi, site haritası.',
					bullets: ['Ücretsiz danışmanlık', 'Site haritası', 'İçerik planı']
				},
				{
					num: '02',
					title: 'Tasarım',
					desc: 'Şablon değil, markaya özel tasarım. Onayınız olmadan kod yazılmıyor.',
					bullets: ['Özel tasarım', 'Mobil + masaüstü', '2 revizyon turu']
				},
				{
					num: '03',
					title: 'Geliştirme',
					desc: 'Hızlı, güvenli, SEO uyumlu kod. Performans hedefi: 90+ PageSpeed.',
					bullets: ['SvelteKit/Next.js', 'SEO altyapısı', 'Hız optimizasyonu']
				},
				{
					num: '04',
					title: 'Yayına Alma',
					desc: 'Test, Google Analytics kurulumu, domain bağlama, ardından destek.',
					bullets: ['Test + lansman', 'Analytics kurulumu', '1-3 ay destek']
				}
			] as step, i}
				<InView animation="fade-up" delay={i * 80}>
					<div class="relative h-full p-6 rounded-2xl bg-card border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
						<div class="text-3xl font-black text-primary/20 mb-2 tabular-nums">{step.num}</div>
						<h3 class="text-base font-bold mb-2">{step.title}</h3>
						<p class="text-sm text-muted-foreground leading-relaxed mb-4">{step.desc}</p>
						<ul class="space-y-1.5">
							{#each step.bullets as b}
								<li class="flex items-center gap-2 text-xs">
									<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-primary flex-shrink-0" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
									<span class="text-muted-foreground">{b}</span>
								</li>
							{/each}
						</ul>
					</div>
				</InView>
			{/each}
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- ====================================================
     TESTIMONIALS — Real Google reviews
     ==================================================== -->
<Section padding="lg" class="relative overflow-hidden">
	<Container>
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-14 relative">
				<div class="absolute -top-4 left-1/2 -translate-x-1/2 text-[120px] leading-none font-serif text-primary/[0.06] pointer-events-none select-none" aria-hidden="true">&ldquo;</div>

				<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					Müşteri Yorumları
				</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
					Müşterilerimiz Ne <span class="testimonial-gradient-text">Diyor?</span>
				</h2>
				<p class="mt-4 text-base text-muted-foreground">
					Google'daki gerçek müşteri yorumları.
				</p>
				<div class="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
					<div class="flex gap-0.5">
						{#each [1, 2, 3, 4, 5] as _}
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
						{/each}
					</div>
					<span class="text-sm font-semibold text-amber-600 dark:text-amber-400">5.0</span>
					<span class="text-xs text-muted-foreground">Google'da</span>
				</div>
			</div>
		</InView>

		<div class="grid gap-6 md:grid-cols-3">
			{#each [
				{ quote: 'Onur web sitemde mükemmel bir iş çıkardı. İletişim kurmak çok keyifliydi ve web sitesi için gereken her noktayı eksiksiz teslim etti.', author: 'Joe', initials: 'J', role: 'Fan Sanatçısı & İllüstratör', color: 'bg-violet-500' },
				{ quote: 'Çok yetenekli ve yardımsever bir geliştirici. Pazar yeri sitesinin oluşturulma sürecini çok kolaylaştırdı. Sonuç mükemmel. Tekrar teşekkürler.', author: 'Selin T.', initials: 'ST', role: 'E-Ticaret İşletmecisi', color: 'bg-teal-500' },
				{ quote: 'Tasarım çok başarılıydı. Onur tam ihtiyacımız olanı teslim etti.', author: 'Furkan A.', initials: 'FA', role: 'E-Ticaret İşletmecisi', color: 'bg-amber-500' }
			] as t, i}
				<InView animation="fade-up" delay={i * 100}>
					<div class="flex flex-col p-7 rounded-2xl bg-card border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
						<div class="flex items-center gap-0.5 mb-4" aria-label="5 üzerinden 5">
							{#each [1, 2, 3, 4, 5] as _}
								<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
							{/each}
						</div>
						<blockquote class="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">"{t.quote}"</blockquote>
						<div class="flex items-center gap-3 pt-4 border-t border-border/50 mt-auto">
							<div class="w-10 h-10 rounded-full {t.color} flex items-center justify-center text-white text-sm font-bold shrink-0">{t.initials}</div>
							<div class="flex-1 min-w-0">
								<p class="font-semibold text-sm">{t.author}</p>
								<p class="text-xs text-muted-foreground">{t.role}</p>
							</div>
							<div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-[10px] font-medium text-muted-foreground shrink-0">
								<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
									<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
									<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
									<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
									<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
								</svg>
								Google
							</div>
						</div>
					</div>
				</InView>
			{/each}
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- ====================================================
     FAQ — Pricing-focused
     ==================================================== -->
<Section padding="lg" background="muted" class="relative overflow-hidden">
	<div class="absolute top-12 right-[5%] w-40 h-40 rounded-full border border-primary/5 pointer-events-none" aria-hidden="true"></div>
	<div class="absolute bottom-12 left-[3%] w-24 h-24 rounded-full border border-accent/5 pointer-events-none" aria-hidden="true"></div>

	<Container>
		<InView animation="fade-up">
			<div class="text-center mb-12">
				<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					Fiyat SSS
				</Badge>
				<h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
					Fiyatlandırma Hakkında <span class="faq-gradient-text">Sorular</span>
				</h2>
				<p class="text-muted-foreground mt-4">
					Teklif istemeden önce müşterilerin en çok sorduğu sorular.
				</p>
			</div>
		</InView>

		<div class="grid md:grid-cols-2 gap-3">
			{#each faqs as faq, i}
				<InView animation="fade-up" delay={i * 40}>
					<div
						class="overflow-hidden rounded-xl border bg-card transition-all duration-200 {openFaq === i
							? 'border-primary/30 shadow-md'
							: 'border-border hover:border-primary/20'}"
					>
						<button
							onclick={() => toggleFaq(i)}
							aria-expanded={openFaq === i}
							class="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-inset"
						>
							<span class="flex items-center gap-3">
								<span class="shrink-0 w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center {openFaq === i ? 'bg-primary text-white' : ''} transition-colors duration-200">{i + 1}</span>
								<span class="font-medium text-sm sm:text-base">{faq.question}</span>
							</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground flex-shrink-0 transition-transform duration-200 {openFaq === i ? 'rotate-180' : ''}" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
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

<CornerstoneCluster cornerstonePath="/web-sitesi-fiyatlari/" />

<!-- ====================================================
     FINAL CTA
     ==================================================== -->
<Section padding="lg" class="relative overflow-hidden">
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] cta-glow rounded-full"></div>
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
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-2">
					Projenize <span class="cta-gradient-text">Sabit Fiyat</span>
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

				<div class="flex flex-wrap items-center justify-center gap-5 mb-10">
					{#each [
						{ icon: 'M20 6 9 17l-5-5', text: 'Ücretsiz Görüşme' },
						{ icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', text: 'Sabit Fiyat' },
						{ icon: 'M12 6v6l4 2', text: '24sa İçinde Yanıt' }
					] as badge}
						<div class="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 border border-border/50">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#25D366]" aria-hidden="true"><path d={badge.icon} /></svg>
							<span class="text-xs font-semibold">{badge.text}</span>
						</div>
					{/each}
				</div>

				<div class="flex flex-wrap items-center justify-center gap-4">
					<a
						href={whatsappUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="group inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-base shadow-2xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 hover:scale-[1.02] transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
							<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
						</svg>
						WhatsApp'tan Fiyat İste
					</a>
					<Button
						variant="ghost"
						href="/contact/"
						class="px-8 py-[1.15rem] rounded-full border border-border/60 hover:bg-foreground/5 hover:border-foreground/30 transition-colors duration-300 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none"
					>
						E-posta Gönder
					</Button>
				</div>
			</div>
		</InView>
	</Container>
</Section>

<!-- ====================================================
     STICKY MOBILE CTA BAR
     ==================================================== -->
{#if showStickyCta}
	<div
		class="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-border bg-card/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.12)]"
		role="complementary"
		aria-label="Hızlı iletişim"
	>
		<div class="flex items-center justify-between px-4 py-3">
			<div>
				<p class="text-sm font-semibold">Sabit Fiyat Teklifi</p>
				<p class="text-xs text-muted-foreground">24sa içinde yanıt</p>
			</div>
			<a
				href={whatsappUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-sm shadow-lg shadow-[#25D366]/30"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
				</svg>
				Fiyat Al
			</a>
		</div>
	</div>
{/if}

<style>
	/* ===== Hero Glows (mirrored from homepage) ===== */
	.hero-glow-accent {
		background: radial-gradient(ellipse, oklch(0.58 0.22 25 / 0.45) 0%, oklch(0.58 0.22 25 / 0.28) 25%, oklch(0.58 0.22 25 / 0.12) 50%, transparent 72%);
	}
	:global(.dark) .hero-glow-accent {
		background: radial-gradient(ellipse, oklch(0.68 0.20 25 / 0.55) 0%, oklch(0.68 0.20 25 / 0.35) 25%, oklch(0.68 0.20 25 / 0.18) 50%, transparent 72%);
	}
	.hero-glow-primary {
		background: radial-gradient(ellipse, oklch(0.55 0.24 260 / 0.38) 0%, oklch(0.55 0.24 260 / 0.22) 30%, oklch(0.55 0.24 260 / 0.08) 55%, transparent 75%);
	}
	:global(.dark) .hero-glow-primary {
		background: radial-gradient(ellipse, oklch(0.68 0.18 260 / 0.48) 0%, oklch(0.68 0.18 260 / 0.28) 30%, oklch(0.68 0.18 260 / 0.12) 55%, transparent 75%);
	}
	.hero-glow-center {
		background: radial-gradient(ellipse, oklch(0.55 0.24 260 / 0.08) 0%, oklch(0.55 0.24 260 / 0.03) 40%, transparent 70%);
	}
	:global(.dark) .hero-glow-center {
		background: radial-gradient(ellipse, oklch(0.68 0.18 260 / 0.14) 0%, oklch(0.68 0.18 260 / 0.05) 40%, transparent 70%);
	}
	.hero-glow-topleft {
		background: radial-gradient(ellipse, oklch(0.55 0.24 260 / 0.22) 0%, oklch(0.55 0.24 260 / 0.12) 30%, oklch(0.55 0.24 260 / 0.04) 55%, transparent 75%);
	}
	:global(.dark) .hero-glow-topleft {
		background: radial-gradient(ellipse, oklch(0.68 0.18 260 / 0.30) 0%, oklch(0.68 0.18 260 / 0.16) 30%, oklch(0.68 0.18 260 / 0.06) 55%, transparent 75%);
	}

	/* ===== Section glows ===== */
	.pricing-glow {
		background: radial-gradient(ellipse, oklch(0.75 0.15 85 / 0.08) 0%, transparent 70%);
	}
	:global(.dark) .pricing-glow {
		background: radial-gradient(ellipse, oklch(0.75 0.15 85 / 0.12) 0%, transparent 70%);
	}
	.testimonial-glow {
		background: radial-gradient(ellipse, oklch(0.6 0.18 260 / 0.06) 0%, transparent 70%);
	}
	:global(.dark) .testimonial-glow {
		background: radial-gradient(ellipse, oklch(0.6 0.18 260 / 0.10) 0%, transparent 70%);
	}
	.cta-glow {
		background: radial-gradient(ellipse, oklch(0.55 0.24 260 / 0.06) 0%, transparent 60%);
	}
	:global(.dark) .cta-glow {
		background: radial-gradient(ellipse, oklch(0.55 0.24 260 / 0.12) 0%, transparent 60%);
	}

	/* ===== Gradient text ===== */
	.case-gradient-text {
		background: linear-gradient(135deg, oklch(0.55 0.24 260), oklch(0.58 0.22 25));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	:global(.dark) .case-gradient-text {
		background: linear-gradient(135deg, oklch(0.72 0.20 260), oklch(0.72 0.18 25));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.pricing-gradient-text {
		background: linear-gradient(135deg, oklch(0.55 0.24 260), oklch(0.50 0.20 200));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	:global(.dark) .pricing-gradient-text {
		background: linear-gradient(135deg, oklch(0.72 0.20 260), oklch(0.68 0.18 200));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.testimonial-gradient-text {
		background: linear-gradient(135deg, oklch(0.55 0.24 260), oklch(0.6 0.18 260));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	:global(.dark) .testimonial-gradient-text {
		background: linear-gradient(135deg, oklch(0.72 0.20 260), oklch(0.72 0.16 260));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.faq-gradient-text {
		background: linear-gradient(135deg, oklch(0.55 0.24 260), oklch(0.58 0.22 25));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	:global(.dark) .faq-gradient-text {
		background: linear-gradient(135deg, oklch(0.72 0.20 260), oklch(0.72 0.18 25));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.cta-gradient-text {
		background: linear-gradient(135deg, oklch(0.55 0.24 260), oklch(0.58 0.22 25));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	:global(.dark) .cta-gradient-text {
		background: linear-gradient(135deg, oklch(0.72 0.20 260), oklch(0.72 0.18 25));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* ===== Pricing grid background ===== */
	.pricing-grid-bg {
		background-image:
			linear-gradient(oklch(0.55 0.24 260 / 0.3) 1px, transparent 1px),
			linear-gradient(90deg, oklch(0.55 0.24 260 / 0.3) 1px, transparent 1px);
		background-size: 40px 40px;
	}

	/* ===== Marquee ===== */
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

	/* ===== CTA rings ===== */
	.cta-ring-1 {
		animation: ring-pulse 4s ease-in-out infinite;
	}
	.cta-ring-2 {
		animation: ring-pulse 4s ease-in-out infinite 1s;
	}
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
