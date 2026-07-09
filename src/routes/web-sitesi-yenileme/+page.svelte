<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Container, Section } from '$lib/components/layout';
	import { InView, Counter } from '$lib/components/ui/animations';
	import CornerstoneCluster from '$lib/components/sections/CornerstoneCluster.svelte';

	const whatsappNumber = '905428324550';
	const whatsappMessage =
		'Merhaba, mevcut sitemi yenilemek istiyorum, ücretsiz site denetimi alabilir miyim?';
	const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

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

	// Signs your site needs renewal — checklist (resonates with "yenileme" intent)
	const signs = [
		{
			title: 'Mobilde menü çalışmıyor veya zoom gerekiyor',
			desc: '2026\'da ziyaretçilerin büyük çoğunluğu telefondan giriyor. Mobilde okunmayan menü = direkt müşteri kaybı.',
			icon: 'M5 4h4l2 3h7a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z'
		},
		{
			title: 'Site 5+ saniyede açılıyor',
			desc: 'Google PageSpeed 50 altı sıralamada penalize ediliyor. Eski WordPress + tema + plugin yığını çoğu yenileme sebebi.',
			icon: 'M13 10V3L4 14h7v7l9-11h-7z'
		},
		{
			title: 'Site 2018-2020\'den kalma şablon',
			desc: 'Tasarım dili eskimiş, müşteri "bu firma aktif mi?" sorusunu soruyor. Modern tasarım = kurumsal güven.',
			icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
		},
		{
			title: 'CMS panele girmek zor / kimse güncelleyemiyor',
			desc: 'Eski WordPress + 30 plugin + güncellemeyi yapmaya korkuyorsunuz. Modern CMS panel = 5 dakikada içerik güncellemesi.',
			icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
		},
		{
			title: 'Google\'da rakipleriniz size göre yukarıda',
			desc: 'SEO altyapısı yoksa, kaç para harcasanız da ön sayfada görünmek zor. Yenileme = SEO sıfırdan kurulması demek.',
			icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
		},
		{
			title: 'WhatsApp/iletişim formu eksik veya bozuk',
			desc: 'Ziyaretçi ulaşmak istediğinde "Bana ulaşın" diyen statik bir sayfa görüyor. Form yok, WhatsApp yok = kayıp lead.',
			icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
		}
	];

	const processSteps = [
		{
			num: '01',
			title: 'Ücretsiz Site Denetimi',
			desc: 'Mevcut sitenizi ücretsiz inceliyorum. PageSpeed skoru, mobil uyum, SEO altyapısı, broken linkler, içerik analizi. Detaylı PDF rapor + öneri listesi gönderiyorum. Söz vermek zorunda değilsiniz.',
			bullets: ['PageSpeed + Core Web Vitals raporu', 'Mobil/masaüstü ekran kayıtları', 'SEO + erişilebilirlik checklist', 'Yenileme yol haritası önerisi']
		},
		{
			num: '02',
			title: 'Karar: Yenileme mi Sıfırdan mı?',
			desc: 'Bazen yenileme mantıklı (içerik iyi, sadece tasarım/teknoloji eski), bazen sıfırdan başlamak daha hızlı + uygun. Net cevap veriyorum, sizi yanlış yola itmem.',
			bullets: ['İçerik denetimi: ne tutuluyor', 'Teknik borç: yenilenebilir mi yoksa yeniden mi', 'Maliyet karşılaştırması', 'Net öneri: A veya B']
		},
		{
			num: '03',
			title: 'Tasarım & Geliştirme',
			desc: 'Mevcut markanızı + içeriklerinizi modern bir altyapıya taşıyoruz. SvelteKit/Next.js, hızlı, mobil-öncelikli, SEO uyumlu. Onayınız olmadan kod yazımına geçilmiyor.',
			bullets: ['Modern stack (SvelteKit/Next.js)', 'Mobil-öncelikli tasarım', 'SEO + schema markup', 'CMS admin paneli']
		},
		{
			num: '04',
			title: 'Migration & Yayın',
			desc: 'Mevcut URL yapınız korunuyor (SEO\'yu bozmamak için). 301 yönlendirme, indeksleme prosedürü, Search Console transfer dahil. Domain ve hosting planınız değişmiyor.',
			bullets: ['301 yönlendirme planı', 'Search Console + Analytics transfer', 'Eski URL → yeni URL haritası', 'Test + canlı yayın']
		}
	];

	const pricingTiers = [
		{
			name: 'Mini Yenileme',
			price: '12.000+ TL',
			subtitle: 'Mevcut tasarım çoğu zaman tutuluyor, sadece teknik altyapı yenileniyor',
			features: [
				'Mevcut tasarım korunarak modern altyapıya geçiş',
				'PageSpeed 90+ optimizasyonu',
				'Mobil uyum düzeltmeleri',
				'SEO altyapı kurulumu (schema, sitemap)',
				'301 yönlendirme planı',
				'2-3 hafta teslimat'
			],
			msg: 'Mini Yenileme paketi (12.000 TL) hakkında bilgi almak istiyorum.',
			highlight: false
		},
		{
			name: 'Standart Yenileme',
			price: '25.000+ TL',
			subtitle: 'Tasarım modernleşiyor + içerik mimarisi düzelttiriyor + teknik altyapı sıfırdan',
			features: [
				'Markaya uygun yeni tasarım',
				'İçerik mimarisi yenilenmesi (5-10 sayfa)',
				'Modern CMS + admin paneli',
				'Gelişmiş SEO + Analytics',
				'KVKK uyumlu form altyapısı',
				'Migration + 301 yönlendirme planı',
				'3-4 hafta teslimat',
				'2 ay ücretsiz destek'
			],
			msg: 'Standart Yenileme paketi (25.000 TL) hakkında bilgi almak istiyorum.',
			highlight: true
		},
		{
			name: 'Tam Yeniden Yapım',
			price: '40.000+ TL',
			subtitle: 'Eski siteniz fazla bozuk → sıfırdan yeni site, eski URL\'leri korunarak',
			features: [
				'Sıfırdan tasarım + geliştirme',
				'Tam kapsamlı SEO + içerik stratejisi',
				'Tüm eski URL\'ler 301 yönlendirme ile korunur',
				'Çoklu dil (TR + EN) opsiyonu',
				'Custom integration (CRM, payment, vs)',
				'4-6+ hafta teslimat',
				'3 ay ücretsiz destek'
			],
			msg: 'Tam Yeniden Yapım paketi hakkında bilgi almak istiyorum.',
			highlight: false
		}
	];

	const faqs = [
		{
			question: 'Web sitesi yenileme fiyatı ne kadar?',
			answer:
				"Mevcut sitenizin durumuna göre değişir. Mini Yenileme 12.000 TL'den (tasarım korunarak teknik altyapı yenilenmesi), Standart Yenileme 25.000 TL'den (yeni tasarım + içerik mimarisi), Tam Yeniden Yapım 40.000 TL'den (sıfırdan başlama). Ücretsiz site denetimi sonrası net teklif veriyorum."
		},
		{
			question: 'Mevcut SEO sıralamamı kaybeder miyim?',
			answer:
				"Doğru yapıldığında HAYIR — kaybetmezsiniz, hatta artar. Tüm eski URL'ler 301 yönlendirme ile korunuyor, Search Console transfer ediliyor, schema markup eklenir, hız artar. Yanlış yapılan yenilemelerde sıralama düşüşü olur — bu yüzden migration planı kritik. Sözleşmede 'sıralama kaybı tazminat' garantisi de verebiliyorum."
		},
		{
			question: 'Yenileme ne kadar sürede tamamlanır?',
			answer:
				'Mini Yenileme 2-3 hafta, Standart 3-4 hafta, Tam Yeniden Yapım 4-6+ hafta. Site canlı kalmaya devam ediyor, yeni site hazır olunca tek seferde geçiş yapılıyor. Kesintisiz, müşterileriniz herhangi bir aksaklık görmüyor.'
		},
		{
			question: 'Mevcut sitedeki içerikleri korumak istiyorum, mümkün mü?',
			answer:
				'Evet — tüm metinleriniz, fotoğraflarınız, blog yazılarınız, ürünleriniz korunuyor. Yenileme = içeriği daha iyi sergileme, yeni içerik üretme zorunluluğu yok. (Tabii istiyorsanız ek içerik üretebiliyoruz, ayrı kalem olarak.)'
		},
		{
			question: 'Domain ve hosting değişecek mi?',
			answer:
				"Hayır — aynı domain (onurhaniffa.com gibi) korunuyor. Hosting değişebilir (Vercel, Cloudflare gibi modern platformlara taşımayı öneriyorum — daha hızlı, daha güvenli). Ayda ~200 TL ek hosting maliyeti olabiliyor, mevcut hosting iptali ile dengelenebiliyor."
		},
		{
			question: 'WordPress\'ten Svelte/Next.js\'e geçmek değer mi?',
			answer:
				"Çoğu durumda evet. WordPress + tema + plugin yığını yavaş, güvenlik açıklı, güncellemesi zor. Svelte/Next.js modern bir altyapı — hızlı, güvenli, otomatik güncellemeler. Tek dezavantaj: çok eklenti dependent ise (örneğin WooCommerce + 50 eklenti) migration karmaşık olabilir. Ücretsiz denetimimde söylüyorum."
		},
		{
			question: 'Sitemde KVKK eksik, yenileme bunu çözecek mi?',
			answer:
				"Evet — yenileme paketinde KVKK uyumlu altyapı standart. Açık rıza metni, gizlilik politikası, çerez politikası, veri saklama prosedürü, müşteri 'verimi sil' talep akışı. Sağlık sektörü gibi özel nitelikli veri toplayan siteler için ek katmanlar uygulanır."
		},
		{
			question: 'Ücretsiz site denetiminde ne alıyorum?',
			answer:
				"PDF rapor: PageSpeed skoru + Core Web Vitals, mobil ekran kayıtları, broken linkler, eksik SEO öğeleri, schema markup durumu, KVKK uyum checklist, görsel optimizasyon önerileri. Ortalama 8-15 sayfalık detaylı rapor. Söz vermek zorunda değilsiniz, raporu kullanıp başka biriyle yenileme yapabilirsiniz — işim güzel teklif vermek, baskı yapmak değil."
		}
	];
</script>

<svelte:head>
	<title>Web Sitesi Yenileme — Ücretsiz Denetim | Onur Haniffa</title>
	<meta
		name="description"
		content="Mevcut web sitenizi yenileyin — Mini 12.000 TL'den, Standart 25.000 TL'den, Tam Yeniden Yapım 40.000 TL'den. SEO sıralamanız korunur, eski URL'ler 301 yönlendirme ile transfer edilir. Ücretsiz site denetimi alın."
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
		'@id': 'https://onurhaniffa.com/web-sitesi-yenileme/#service',
		name: 'Web Sitesi Yenileme',
		serviceType: 'Website Redesign',
		provider: { '@id': 'https://onurhaniffa.com/#business' },
		areaServed: { '@type': 'Country', name: 'Türkiye' },
		offers: [
			{ '@type': 'Offer', name: 'Mini Yenileme', price: '12000', priceCurrency: 'TRY' },
			{ '@type': 'Offer', name: 'Standart Yenileme', price: '25000', priceCurrency: 'TRY' },
			{ '@type': 'Offer', name: 'Tam Yeniden Yapım', price: '40000', priceCurrency: 'TRY' }
		]
	}).replace(/</g, '\\u003c')}</script>`}
</svelte:head>

<!-- HERO -->
<Section padding="none" class="relative overflow-hidden min-h-[calc(100vh-85px)] flex flex-col justify-center">
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		<div class="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-background to-muted/80"></div>
		<div class="absolute -top-[100px] -left-[150px] w-[800px] h-[700px] yen-glow-topleft rounded-full"></div>
		<div class="absolute -top-[200px] -right-[200px] w-[900px] h-[900px] yen-glow-accent rounded-full"></div>
		<div class="absolute -bottom-[300px] -left-[300px] w-[800px] h-[800px] yen-glow-primary rounded-full"></div>
	</div>

	<Container class="relative pt-12 pb-12 lg:pt-20 lg:pb-20">
		<div class="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
			<div bind:this={heroContent} class="space-y-5">
				<Badge variant="outline" class="border-primary/40 text-primary bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
					<span class="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" aria-hidden="true"></span>
					Web Sitesi Yenileme • Ücretsiz Denetim
				</Badge>

				<h1 class="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
					Web Sitesi <br class="hidden sm:block" />Yenileme
				</h1>

				<p class="text-lg text-muted-foreground leading-relaxed max-w-lg">
					Mevcut siteniz yavaş, eski moda veya mobilde bozuk mu? Ücretsiz denetim ile başlayın — PDF rapor + yol haritası, söz vermek zorunda değilsiniz. SEO sıralamanız korunarak yenileme.
				</p>

				<div class="flex flex-wrap gap-2">
					<a href="#fiyatlar" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-transparent hover:bg-primary/15 transition-colors">
						<span class="text-sm font-semibold text-foreground">Mini 12.000 TL</span>
					</a>
					<a href="#fiyatlar" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-transparent hover:bg-primary/15 transition-colors">
						<span class="text-sm font-semibold text-foreground">Standart 25.000 TL</span>
					</a>
					<a href="#fiyatlar" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-transparent hover:bg-primary/15 transition-colors">
						<span class="text-sm font-semibold text-foreground">Tam 40.000 TL</span>
					</a>
				</div>

				<div class="flex flex-wrap gap-8 sm:gap-10 py-2">
					<div class="text-center">
						<p class="text-3xl font-black text-primary tabular-nums"><Counter value={50} duration={2000} suffix="+" /></p>
						<p class="text-xs text-muted-foreground mt-0.5">Tamamlanmış Proje</p>
					</div>
					<div class="hidden sm:block w-px bg-border self-stretch"></div>
					<div class="text-center">
						<p class="text-3xl font-black tabular-nums">2-6<span class="text-xl">hf</span></p>
						<p class="text-xs text-muted-foreground mt-0.5">Teslimat</p>
					</div>
					<div class="hidden sm:block w-px bg-border self-stretch"></div>
					<div class="text-center">
						<p class="text-3xl font-black tabular-nums">0<span class="text-xl">tl</span></p>
						<p class="text-xs text-muted-foreground mt-0.5">Site Denetimi</p>
					</div>
				</div>

				<div class="flex flex-wrap gap-4 pt-2">
					<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-base shadow-2xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 hover:scale-[1.02] transition-all duration-300">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
						Ücretsiz Denetim İste
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

<!-- 6 SIGNS YOUR SITE NEEDS RENEWAL -->
<Section padding="lg" class="relative overflow-hidden">
	<Container>
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-14">
				<p class="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
					Yenileme Belirtileri
				</p>
				<h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
					Sitenizin Yenilenmesi Gerekiyor mu?
				</h2>
				<p class="text-lg text-muted-foreground mt-4">
					6 belirti — birden fazlasıyla karşılaşıyorsanız yenileme zamanı.
				</p>
			</div>
		</InView>

		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
			{#each signs as sign, i}
				<InView animation="fade-up" delay={i * 80}>
					<div class="h-full p-6 rounded-2xl bg-card border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all">
						<div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
							<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d={sign.icon}/></svg>
						</div>
						<h3 class="text-base font-bold mb-2">{sign.title}</h3>
						<p class="text-sm text-muted-foreground leading-relaxed">{sign.desc}</p>
					</div>
				</InView>
			{/each}
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- PROCESS -->
<Section padding="lg" background="muted" class="relative overflow-hidden">
	<Container>
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-12">
				<p class="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">Süreç</p>
				<h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
					Ücretsiz Denetimden Yayına
				</h2>
				<p class="text-lg text-muted-foreground mt-4">
					4 adımlı şeffaf süreç. Söz vermek zorunda değilsiniz, denetimi alın ve karar verin.
				</p>
			</div>
		</InView>

		<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
			{#each processSteps as step, i}
				<InView animation="fade-up" delay={i * 80}>
					<div class="relative h-full p-6 rounded-2xl bg-card border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all">
						<div class="text-3xl font-black text-primary/20 mb-2 tabular-nums">{step.num}</div>
						<h3 class="text-base font-bold mb-2">{step.title}</h3>
						<p class="text-sm text-muted-foreground leading-relaxed mb-4">{step.desc}</p>
						<ul class="space-y-1.5">
							{#each step.bullets as b}
								<li class="flex items-center gap-2 text-xs">
									<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-primary flex-shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
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

<!-- PRICING -->
<Section padding="lg" id="fiyatlar" class="relative overflow-hidden bg-muted/30 dark:bg-muted/10">
	<div class="absolute inset-0 -z-[2] yen-grid-bg opacity-[0.04] dark:opacity-[0.05]" aria-hidden="true"></div>

	<Container>
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-14">
				<p class="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">Fiyat Paketleri</p>
				<h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
					Yenileme Fiyat Paketleri
				</h2>
				<p class="text-lg text-muted-foreground mt-4">
					Mevcut sitenizin durumuna göre 3 paket. Ücretsiz denetim sonrası size hangisinin uyduğunu söylüyorum.
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
					Yenileme Hakkında Sık Sorulan Sorular
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

<CornerstoneCluster cornerstonePath="/web-sitesi-yenileme/" />

<!-- FINAL CTA -->
<Section padding="lg" class="relative overflow-hidden">
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] yen-cta-glow rounded-full"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-primary/10 cta-ring-1"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/5 cta-ring-2"></div>
	</div>

	<Container size="content">
		<InView animation="scale">
			<div class="relative text-center py-8">
				<div class="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-primary/20 rounded-tl-xl" aria-hidden="true"></div>
				<div class="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-primary/20 rounded-br-xl" aria-hidden="true"></div>

				<p class="mb-6 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">Ücretsiz Denetim</p>
				<h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl mb-3">
					Sitenizi Ücretsiz İnceleyim
				</h2>
				<p class="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
					WhatsApp'tan sitenizi gönderin, 24-48 saat içinde detaylı PDF rapor + yol haritası gönderiyorum. Söz vermek zorunda değilsiniz.
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
				<p class="text-sm font-semibold">Ücretsiz Site Denetimi</p>
				<p class="text-xs text-muted-foreground">24-48sa içinde rapor</p>
			</div>
			<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-lg shadow-[#25D366]/30">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
				Denetim İste
			</a>
		</div>
	</div>
{/if}

<style>
	.yen-grid-bg { background-image: linear-gradient(oklch(0.42 0.15 262 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.42 0.15 262 / 0.3) 1px, transparent 1px); background-size: 40px 40px; }
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
