<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Container, Section } from '$lib/components/layout';
	import { InView, Counter } from '$lib/components/ui/animations';
	import { t, getLocale, getLocalePath } from '$lib/i18n/index.svelte';
	import { blogPosts } from '$lib/data/blog-posts';

	const locale = $derived(getLocale());
	const isEn = $derived(locale === 'en');
	const latestPosts = $derived(blogPosts.slice(0, 3));

	const whatsappNumber = '905428324550';
	const whatsappMessages = {
		en: 'Hello! I would like to learn more about your web design services.',
		tr: 'Merhaba! Web sitesi hakkında bilgi almak istiyorum.'
	};
	const whatsappUrl = $derived(
		`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessages[locale as 'en' | 'tr'])}`
	);

	// Hero screenshot rotation — all light mode, full opacity
	const heroScreenshots = [
		{ src: '/images/projects/joe-fresh-desktop.png', mobile: '/images/projects/joe-fresh-mobile.png', label: 'Designs by Joe', url: 'designsbyjoe.net' },
		{ src: '/images/projects/dentist-screenshot.jpg', mobile: '/images/projects/dental-mobile-real.png', label: 'Pearl Dental', url: 'pearldental.com' },
		{ src: '/images/projects/ivory-ai-screenshot.png', mobile: '/images/projects/ivory-ai-mobile.png', label: 'Ivory AI', url: 'ivoryai.net' }
	];
	let currentScreenshot = $state(0);

	let showStickyCta = $state(false);
	let heroContent: HTMLDivElement;
	let heroMockup: HTMLDivElement;
	// roadmapPath removed — process section uses CSS timeline instead

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Scroll handler for sticky CTA
		const handleScroll = () => {
			showStickyCta = window.scrollY > 600;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });

		// Screenshot rotation
		const screenshotInterval = setInterval(() => {
			currentScreenshot = (currentScreenshot + 1) % heroScreenshots.length;
		}, 4000);

		// Hero GSAP animation
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

	const faqs = $derived(
		isEn
			? [
					{
						question: 'How much does a website cost in Istanbul?',
						answer:
							'Every project is different. After our discovery call, I provide a fixed quote based on your specific needs. Most projects range from affordable starter sites to comprehensive custom builds. No hourly surprises or hidden fees.'
					},
					{
						question: 'How long does it take to build a website?',
						answer:
							'Most websites launch within 2-6 weeks depending on complexity. Simple sites can be done faster, while larger projects with custom features may take a bit longer. I always provide a clear timeline upfront.'
					},
					{
						question: 'Do you work with businesses outside Istanbul?',
						answer:
							'Absolutely! While I am based in Istanbul, I work with clients worldwide. Communication is done remotely via video calls, email, and project management tools. Time zones are never an issue.'
					},
					{
						question: 'Will my website be optimized for Google?',
						answer:
							'Yes, every website I build includes SEO best practices: fast loading speeds, mobile responsiveness, proper meta tags, structured data, and clean code. This gives you the best foundation to rank in search results.'
					},
					{
						question: 'Can you redesign my existing website?',
						answer:
							'Yes! Website redesigns are one of my core services. I audit your current site, identify what works and what does not, then create a modern, high-performing version that better serves your business goals.'
					}
				]
			: [
					{
						question: "İstanbul'da web site yapımı fiyatları ne kadar?",
						answer:
							'Web site yapımı fiyatları projenin kapsamına göre değişir. Basit kurumsal web sitesi, e-ticaret sitesi veya özel web yazılım projeleri için farklı fiyatlandırmalar sunuyorum. Keşif görüşmemizden sonra ihtiyaçlarınıza özel sabit fiyat teklifi veriyorum. Gizli ücret veya saatlik sürpriz yok.'
					},
					{
						question: 'Web sitesi ne kadar sürede yapılır?',
						answer:
							'Web site yapımı süresi projenin büyüklüğüne bağlıdır. Basit kurumsal web sitesi 2-3 haftada, orta ölçekli projeler 3-4 haftada, e-ticaret gibi kapsamlı projeler 4-6 haftada tamamlanır. Her projeye başlamadan önce net bir zaman çizelgesi sunuyorum.'
					},
					{
						question: "İstanbul dışındaki işletmelerle çalışıyor musunuz?",
						answer:
							"Kesinlikle! İstanbul merkezli olmama rağmen Türkiye genelinde ve dünya çapında müşterilerle çalışıyorum. İletişim görüntülü aramalar, e-posta ve proje yönetim araçları üzerinden yapılır. Saat farkı hiçbir zaman sorun olmaz."
					},
					{
						question: 'Kurumsal web sitesi neden önemlidir?',
						answer:
							"Profesyonel bir kurumsal web sitesi, şirketinizin dijital vitrinidir. Müşterilerinizin %90'ı bir işletmeyi araştırırken önce web sitesine bakar. Kurumsal web sitesi güvenilirlik oluşturur, marka bilinirliğinizi artırır ve 7/24 çalışan bir satış temsilcisi gibi hizmet verir."
					},
					{
						question: 'SEO uyumlu web sitesi nasıl yapılır?',
						answer:
							"SEO uyumlu web sitesi yapımında hızlı yükleme süresi, mobil uyumluluk, doğru meta etiketleri, yapılandırılmış veri (schema markup), temiz kod yapısı ve kaliteli içerik optimizasyonu kritik öneme sahiptir. İnşa ettiğim her web sitesi Google'da üst sıralarda yer almanız için bu teknik SEO standartlarına uygun olarak geliştirilir."
					},
					{
						question: 'Web sitemi yaptırdıktan sonra destek alabilir miyim?',
						answer:
							'Evet! Tüm projelerimde yayın sonrası teknik destek sunuyorum. Güvenlik güncellemeleri, içerik değişiklikleri, performans izleme ve yeni özellik ekleme gibi konularda sürekli destek alabilirsiniz. Web siteniz her zaman güncel ve güvenli kalır.'
					},
					{
						question: 'E-ticaret sitesi yaptırmak istiyorum, neler sunuyorsunuz?',
						answer:
							"Güvenli ödeme altyapısı, ürün yönetim paneli, stok takibi, kargo entegrasyonu ve mobil uyumlu tasarım sunuyorum. İşletmenizi online satışa açarak müşteri kitlenizi genişletebilirsiniz."
					},
					{
						question: 'Web sitem Google için optimize edilecek mi?',
						answer:
							"Evet, inşa ettiğim her web sitesi SEO en iyi uygulamalarını içerir: hızlı yükleme, mobil uyumluluk, doğru meta etiketleri, yapılandırılmış veri ve temiz kod. Google'da daha üst sıralarda yer almanız için teknik SEO altyapısı standart olarak dahildir."
					},
					{
						question: 'Mobil uyumlu web sitesi neden gereklidir?',
						answer:
							"Türkiye'de internet kullanıcılarının %80'inden fazlası mobil cihazlardan erişim sağlıyor. Google da mobil uyumlu siteleri arama sonuçlarında önceliklendirir. Tüm web sitelerimi responsive (duyarlı) tasarım ile geliştiriyorum — telefondan tablete, masaüstünden büyük ekrana kadar her cihazda mükemmel çalışır."
					},
					{
						question: 'Mevcut web sitemi yeniden tasarlayabilir misiniz?',
						answer:
							'Evet! Web sitesi yenileme temel hizmetlerimden biridir. Mevcut sitenizi detaylı olarak denetler, neyin işe yaradığını belirler ve iş hedeflerinize daha iyi hizmet eden modern, hızlı ve SEO uyumlu bir sürüm oluştururum.'
					}
				]
	);

	let openFaq = $state<number | null>(null);

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}

	const portfolioProjects = $derived([
		{
			title: 'Designs by Joe',
			descEn: 'Portfolio & e-commerce site for a fan art illustrator',
			descTr: 'Fan sanatı illüstratörü için portfolyo ve e-ticaret sitesi',
			screenshot: '/images/projects/joe-fresh-desktop.png',
			liveUrl: 'https://designsbyjoe.net',
			theme: 'violet' as const,
			challengeEn: [
				'Old WordPress site was slow and hard to update',
				'No way to showcase 200+ artworks effectively',
				'Zero online sales — all commissions via DMs'
			],
			challengeTr: [
				'Eski WordPress sitesi yavaş ve güncellenmesi zordu',
				'200+ eseri etkili şekilde sergileme imkanı yoktu',
				'Online satış sıfır — tüm siparişler DM üzerinden'
			],
			solutionEn: [
				'Dynamic gallery with lazy-loaded images and filtering',
				'Built-in cart system for print sales',
				'3× faster load times, 40% more inquiries'
			],
			solutionTr: [
				'Tembel yüklemeli dinamik galeri ve filtreleme',
				'Baskı satışı için entegre sepet sistemi',
				'3 kat daha hızlı, taleplerde %40 artış'
			],
			tech: ['SvelteKit', 'Tailwind', 'Stripe']
		},
		{
			title: 'Ivory AI',
			descEn: 'SaaS landing page for an AI chatbot platform',
			descTr: 'AI chatbot platformu için SaaS açılış sayfası',
			screenshot: '/images/projects/ivory-ai-screenshot.png',
			liveUrl: 'https://ivoryai.net',
			theme: 'blue' as const,
			challengeEn: [
				'No online presence — enterprise clients couldn\'t evaluate the product',
				'Complex pricing needed a clear, interactive breakdown',
				'Low visitor-to-trial conversion on the old site'
			],
			challengeTr: [
				'Online varlık yok — kurumsal müşteriler ürünü değerlendiremiyordu',
				'Karmaşık fiyatlandırma net ve interaktif bir sunum gerektiriyordu',
				'Eski sitede düşük ziyaretçi-deneme dönüşüm oranı'
			],
			solutionEn: [
				'Conversion-focused design with live demo embed',
				'Interactive pricing calculator with CRM integration',
				'2.8% conversion rate in the first month'
			],
			solutionTr: [
				'Canlı demo ile dönüşüm odaklı tasarım',
				'CRM entegrasyonlu interaktif fiyat hesaplayıcı',
				'İlk ayda %2.8 dönüşüm oranı'
			],
			tech: ['SvelteKit', 'OpenAI', 'Vercel']
		},
		{
			title: 'Pearl Dental',
			descEn: 'Modern website for a dental clinic with online booking',
			descTr: 'Online randevu sistemli modern diş kliniği sitesi',
			screenshot: '/images/projects/dentist-screenshot.jpg',
			liveUrl: getLocalePath('/work'),
			theme: 'teal' as const,
			challengeEn: [
				'All appointments were phone-only — missed calls meant lost patients',
				'No online credibility or trust signals',
				'Outdated site that didn\'t reflect the clinic\'s quality'
			],
			challengeTr: [
				'Tüm randevular telefon ile — kaçan aramalar kayıp hasta demekti',
				'Online güvenilirlik veya güven sinyalleri yoktu',
				'Kliniğin kalitesini yansıtmayan eski bir site'
			],
			solutionEn: [
				'Appointment booking system integrated with clinic calendar',
				'Google reviews, before/after gallery, credentials section',
				'65% of new appointments now come through the website'
			],
			solutionTr: [
				'Klinik takvimi ile entegre randevu sistemi',
				'Google yorumları, önce/sonra galerisi, hekim bilgileri',
				'Yeni randevuların %65\'i artık web sitesinden geliyor'
			],
			tech: ['SvelteKit', 'Directus', 'Tailwind']
		}
	]);

	const pricingTiers = $derived([
		{
			nameEn: 'Starter',
			nameTr: 'Başlangıç',
			price: '15,000+ TL',
			featuresEn: [
				'1-5 pages',
				'Mobile responsive design',
				'Basic SEO setup',
				'Contact form + WhatsApp button',
				'2-week delivery'
			],
			featuresTr: [
				'1-5 sayfa',
				'Mobil uyumlu tasarım',
				'Temel SEO kurulumu',
				'İletişim formu + WhatsApp butonu',
				'2 haftalık teslimat'
			],
			msgEn: "Hello! I'm interested in the Starter package.",
			msgTr: 'Merhaba! Başlangıç paketi hakkında bilgi almak istiyorum.',
			highlighted: false
		},
		{
			nameEn: 'Professional',
			nameTr: 'Profesyonel',
			price: '30,000+ TL',
			featuresEn: [
				'5-15 pages',
				'Custom design',
				'Advanced SEO + Analytics',
				'Blog integration',
				'CMS panel',
				'3-4 week delivery'
			],
			featuresTr: [
				'5-15 sayfa',
				'Özel tasarım',
				'Gelişmiş SEO + Analytics',
				'Blog entegrasyonu',
				'İçerik yönetim paneli',
				'3-4 haftalık teslimat'
			],
			msgEn: "Hello! I'm interested in the Professional package.",
			msgTr: 'Merhaba! Profesyonel paketi hakkında bilgi almak istiyorum.',
			highlighted: true
		},
		{
			nameEn: 'E-Commerce',
			nameTr: 'E-Ticaret',
			price: '50,000+ TL',
			featuresEn: [
				'Full online store',
				'Payment gateway integration',
				'Product management panel',
				'Inventory + shipping tools',
				'SEO + Analytics',
				'4-6 week delivery'
			],
			featuresTr: [
				'Tam online mağaza',
				'Ödeme altyapısı entegrasyonu',
				'Ürün yönetim paneli',
				'Stok + kargo araçları',
				'SEO + Analytics',
				'4-6 haftalık teslimat'
			],
			msgEn: "Hello! I'm interested in the E-Commerce package.",
			msgTr: 'Merhaba! E-Ticaret paketi hakkında bilgi almak istiyorum.',
			highlighted: false
		}
	]);

	const testimonials = $derived([
		{
			quoteEn:
				'Onur did an excellent job on my website. He was great to communicate with and delivered on every point needed for my website.',
			quoteTr:
				'Onur web sitemde mükemmel bir iş çıkardı. İletişim kurmak çok keyifliydi ve web sitesi için gereken her noktayı eksiksiz teslim etti.',
			author: 'Joe',
			initials: 'J',
			roleEn: 'Fan Artist & Illustrator',
			roleTr: 'Fan Sanatçısı & İllüstratör',
			color: 'bg-violet-500',
			verified: true,
			source: 'Google'
		},
		{
			quoteEn:
				'A very talented and helpful developer. He made the entire process of creating the marketplace site easy. The end result is excellent. Thanks again.',
			quoteTr:
				'Çok yetenekli ve yardımsever bir geliştirici. Pazar yeri sitesinin oluşturulma sürecini çok kolaylaştırdı. Sonuç mükemmel. Tekrar teşekkürler.',
			author: 'Selin T.',
			initials: 'ST',
			roleEn: 'E-Commerce Owner',
			roleTr: 'E-Ticaret İşletmecisi',
			color: 'bg-teal-500',
			verified: true,
			source: 'Google'
		},
		{
			quoteEn:
				'The design was very successful. Onur delivered exactly what we needed.',
			quoteTr:
				'Tasarım çok başarılıydı. Onur tam ihtiyacımız olanı teslim etti.',
			author: 'Furkan A.',
			initials: 'FA',
			roleEn: 'E-Commerce Owner',
			roleTr: 'E-Ticaret İşletmecisi',
			color: 'bg-amber-500',
			verified: true,
			source: 'Google'
		}
	]);

	const processSteps = $derived([
		{
			step: '01',
			titleEn: 'Discovery & Planning',
			titleTr: 'Keşif & Planlama',
			descEn: 'We start with a free discovery call to understand your business, target audience, and goals. I research your competitors and create a detailed sitemap and project roadmap.',
			descTr: 'İşletmenizin hedeflerini, hedef kitlenizi ve ihtiyaçlarınızı anlamak için ücretsiz bir keşif görüşmesi yapıyoruz. Rakiplerinizi araştırıp detaylı site haritası ve proje yol haritası oluşturuyorum.',
			icon: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z',
			colorClass: 'process-step-discovery',
			bulletsEn: ['Free consultation call', 'Competitor analysis', 'Sitemap & wireframes'],
			bulletsTr: ['Ücretsiz danışmanlık', 'Rakip analizi', 'Site haritası & wireframe']
		},
		{
			step: '02',
			titleEn: 'Design',
			titleTr: 'Tasarım',
			descEn: 'I create pixel-perfect mockups tailored to your brand — colors, typography, imagery, all working together. You get unlimited revisions until the design feels right.',
			descTr: 'Markanıza özel piksel mükemmelliğinde tasarımlar oluşturuyorum — renkler, yazı tipleri, görseller hepsi uyum içinde. Tasarım doğru hissedene kadar sınırsız revizyon.',
			icon: 'M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z',
			colorClass: 'process-step-design',
			bulletsEn: ['Custom mockups', 'Unlimited revisions', 'Mobile-first approach'],
			bulletsTr: ['Özel tasarım', 'Sınırsız revizyon', 'Mobil öncelikli']
		},
		{
			step: '03',
			titleEn: 'Development',
			titleTr: 'Geliştirme',
			descEn: 'Your approved design gets built with cutting-edge technology. Lightning-fast load times, bulletproof security, and SEO baked in from line one of code.',
			descTr: 'Onaylanan tasarımınız son teknoloji ile hayata geçiyor. Işık hızında yükleme, güçlü güvenlik ve ilk satırdan itibaren SEO entegrasyonu.',
			icon: 'M16 18l6-6-6-6 M8 6l-6 6 6 6',
			colorClass: 'process-step-develop',
			bulletsEn: ['Modern tech stack', 'Performance optimized', 'SEO from day one'],
			bulletsTr: ['Modern teknoloji', 'Performans optimize', 'Baştan SEO']
		},
		{
			step: '04',
			titleEn: 'Launch & Support',
			titleTr: 'Yayınlama & Destek',
			descEn: 'After thorough testing across all devices, your site goes live. I provide ongoing technical support, security updates, and performance monitoring to keep it running smoothly.',
			descTr: 'Tüm cihazlarda kapsamlı testlerden sonra siteniz yayına alınıyor. Teknik destek, güvenlik güncellemeleri ve performans izleme hizmetleriyle sorunsuz çalışmasını sağlıyorum.',
			icon: 'M5 12l5 5L20 7',
			colorClass: 'process-step-launch',
			bulletsEn: ['Cross-device testing', 'Ongoing support', 'Performance monitoring'],
			bulletsTr: ['Tüm cihazlarda test', 'Sürekli destek', 'Performans izleme']
		}
	]);

	// Industry data with unique colors and animation classes
	const industries = $derived([
		{
			titleEn: 'Corporate Websites',
			titleTr: 'Kurumsal Web Sitesi',
			descEn: 'Professional corporate websites that establish credibility and showcase your brand.',
			descTr: 'Şirketinizin güvenilirliğini artıran profesyonel kurumsal web sitesi yapımı.',
			icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10',
			color: 'corporate',
			animClass: 'industry-corporate'
		},
		{
			titleEn: 'E-Commerce',
			titleTr: 'E-Ticaret Web Sitesi',
			descEn: 'Online stores with secure payments, inventory management, and seamless shopping.',
			descTr: 'Güvenli ödeme, stok yönetimi ve sorunsuz alışveriş deneyimi sunan e-ticaret sitesi.',
			icon: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0',
			color: 'ecommerce',
			animClass: 'industry-ecommerce'
		},
		{
			titleEn: 'Restaurant & Cafe',
			titleTr: 'Restoran & Kafe',
			descEn: 'Appetizing websites with online menus, reservations, and location info.',
			descTr: 'Online menü, rezervasyon ve konum bilgisi içeren restoran web sitesi.',
			icon: 'M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3',
			color: 'restaurant',
			animClass: 'industry-restaurant'
		},
		{
			titleEn: 'Healthcare & Clinic',
			titleTr: 'Sağlık & Klinik',
			descEn: 'Trust-building websites for clinics, dentists, and medical professionals.',
			descTr: 'Klinik ve sağlık profesyonelleri için güven oluşturan web sitesi.',
			icon: 'M22 12h-4l-3 9L9 3l-3 9H2',
			color: 'healthcare',
			animClass: 'industry-healthcare'
		},
		{
			titleEn: 'Start-up & SaaS',
			titleTr: 'Start-up & SaaS',
			descEn: 'High-converting landing pages and product websites for tech companies.',
			descTr: 'Teknoloji şirketleri için yüksek dönüşümlü landing page ve ürün sitesi.',
			icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
			color: 'startup',
			animClass: 'industry-startup'
		},
		{
			titleEn: 'Portfolio & Personal',
			titleTr: 'Kişisel & Portfolyo',
			descEn: 'Stunning portfolio websites for freelancers and creatives to showcase their work.',
			descTr: 'Freelancer ve kreatifler için etkileyici portfolyo sitesi yapımı.',
			icon: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
			color: 'portfolio',
			animClass: 'industry-portfolio'
		}
	]);
</script>

<svelte:head>
	{#if isEn}
		<title>Onur Haniffa | Web Designer Istanbul — Websites That Convert</title>
		<meta
			name="description"
			content="Looking for a professional web designer in Istanbul? I create fast, modern, SEO-optimized websites that convert visitors into customers. Custom design, mobile-first, free consultation. Get your website built by an Istanbul-based expert."
		/>
		<meta
			property="og:title"
			content="Onur Haniffa | Web Designer Istanbul — Websites That Convert"
		/>
		<meta
			property="og:description"
			content="Professional web designer in Istanbul. Fast, modern websites that convert visitors into customers. Free consultation."
		/>
		<meta
			name="twitter:title"
			content="Onur Haniffa | Web Designer Istanbul — Websites That Convert"
		/>
		<meta
			name="twitter:description"
			content="Professional web designer in Istanbul. Fast, modern websites that convert visitors into customers. Free consultation."
		/>
	{:else}
		<title>Web Site Yapımı İstanbul | Web Tasarım & Geliştirme Hizmetleri | Onur Haniffa</title>
		<meta
			name="description"
			content="İstanbul'da web site yapımı ve web tasarım hizmetleri. Kurumsal web sitesi, e-ticaret sitesi, SEO uyumlu ve mobil uyumlu web siteleri yapıyorum. Profesyonel web yazılım, özel tasarım, ücretsiz danışmanlık."
		/>
		<meta
			property="og:title"
			content="Web Site Yapımı İstanbul | Web Tasarım & Geliştirme Hizmetleri"
		/>
		<meta
			property="og:description"
			content="İstanbul'da web site yapımı, kurumsal web sitesi, e-ticaret ve SEO uyumlu web tasarım hizmetleri. Ücretsiz danışmanlık."
		/>
		<meta
			name="twitter:title"
			content="Web Site Yapımı İstanbul | Web Tasarım & Geliştirme Hizmetleri"
		/>
		<meta
			name="twitter:description"
			content="İstanbul'da web site yapımı, kurumsal web sitesi, e-ticaret ve SEO uyumlu web tasarım hizmetleri. Ücretsiz danışmanlık."
		/>
	{/if}

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer
			}
		}))
	}).replace(/</g, '\\u003c')}</script>`}
</svelte:head>

<!-- ====================================================
     HERO — 2-Column with rotating browser mockup
     ==================================================== -->
<Section padding="none" class="relative overflow-hidden min-h-[calc(100vh-85px)] flex flex-col justify-center">
	<!-- Glow background — strong top-left primary glow -->
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		<div class="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-background to-muted/80"></div>
		<!-- Top-left prominent glow near heading -->
		<div class="absolute -top-[50px] -left-[100px] w-[500px] h-[500px] lg:-top-[100px] lg:-left-[150px] lg:w-[800px] lg:h-[700px] hero-glow-topleft rounded-full"></div>
		<div class="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] lg:-top-[200px] lg:-right-[200px] lg:w-[900px] lg:h-[900px] hero-glow-accent rounded-full"></div>
		<div class="absolute -bottom-[150px] -left-[150px] w-[400px] h-[400px] lg:-bottom-[300px] lg:-left-[300px] lg:w-[800px] lg:h-[800px] hero-glow-primary rounded-full"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] lg:w-[1100px] lg:h-[700px] hero-glow-center"></div>
		<div
			class="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] pointer-events-none mix-blend-overlay"
			style="background-image: url('data:image/svg+xml,%3Csvg viewBox=&apos;0 0 400 400&apos; xmlns=&apos;http://www.w3.org/2000/svg&apos;%3E%3Cfilter id=&apos;noise&apos;%3E%3CfeTurbulence type=&apos;fractalNoise&apos; baseFrequency=&apos;0.9&apos; numOctaves=&apos;4&apos; /%3E%3C/filter%3E%3Crect width=&apos;100%25&apos; height=&apos;100%25&apos; filter=&apos;url(%23noise)&apos; /%3E%3C/svg%3E');"
		></div>
	</div>

	<!-- Decorative rings -->
	<div aria-hidden="true" class="hidden lg:block absolute top-24 right-[8%] w-80 h-80 rounded-full border border-primary/10 pointer-events-none"></div>
	<div aria-hidden="true" class="hidden lg:block absolute top-44 right-[13%] w-52 h-52 rounded-full border border-accent/10 pointer-events-none"></div>
	<div aria-hidden="true" class="hidden lg:block absolute bottom-24 left-[4%] w-60 h-60 rounded-full border border-primary/5 pointer-events-none"></div>

	<Container class="relative pt-16 pb-16 lg:pt-24 lg:pb-24">
		<div class="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
			<!-- Left: Content -->
			<div bind:this={heroContent} class="space-y-5">
				<Badge
					variant="outline"
					class="border-primary/40 text-primary bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
				>
					<span class="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" aria-hidden="true"></span>
					{isEn ? 'Istanbul-Based Web Designer' : 'İstanbul Web Site Yapımı & Tasarım'}
				</Badge>

				<h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
					{#if isEn}
						Professional <span class="text-primary">Web Design</span><br class="hidden sm:block" /> in Istanbul
					{:else}
						İstanbul'da <span class="text-primary">Web Tasarım</span><br class="hidden sm:block" /> & Geliştirme
					{/if}
				</h1>

				<p class="text-lg text-muted-foreground leading-relaxed max-w-lg">
					{#if isEn}
						I design and build fast, modern websites for businesses across Turkey and worldwide. Every site is custom-built, SEO-optimized, and designed to convert.
					{:else}
						Türkiye genelinde ve dünya çapında kurumsal web sitesi, e-ticaret sitesi ve portfolyo siteleri yapıyorum. SEO uyumlu, mobil uyumlu ve dönüşüm odaklı.
					{/if}
				</p>

				<!-- Price anchor -->
				<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
					<span class="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true"></span>
					<span class="text-sm font-semibold text-primary">
						{isEn ? 'Starting from 15,000 TL' : "Fiyatlar 15.000 TL'den başlıyor"}
					</span>
				</div>

				<!-- Stats -->
				<div class="flex flex-wrap gap-8 sm:gap-10 py-2">
					<div class="text-center">
						<p class="text-3xl font-black text-primary tabular-nums">
							<Counter value={50} duration={2000} suffix="+" />
						</p>
						<p class="text-xs text-muted-foreground mt-0.5">
							{isEn ? 'Projects' : 'Proje'}
						</p>
					</div>
					<div class="hidden sm:block w-px bg-border self-stretch"></div>
					<div class="text-center">
						<p class="text-3xl font-black tabular-nums">
							<Counter value={5} duration={1800} suffix=".0" />
						</p>
						<p class="text-xs text-muted-foreground mt-0.5 flex items-center justify-center gap-1">
							<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
							{isEn ? 'Star Rating' : 'Yıldız Puan'}
						</p>
					</div>
					<div class="hidden sm:block w-px bg-border self-stretch"></div>
					<div class="text-center">
						<p class="text-3xl font-black tabular-nums">
							<Counter value={2} duration={1500} />-<Counter value={6} duration={2000} delay={200} />
						</p>
						<p class="text-xs text-muted-foreground mt-0.5">
							{isEn ? 'Week Delivery' : 'Hafta Teslimat'}
						</p>
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
						{isEn ? 'Write on WhatsApp' : 'WhatsApp ile Yazın'}
					</a>
					<Button
						size="lg"
						variant="ghost"
						href={getLocalePath('/work')}
						class="text-base px-8 py-[1.15rem] rounded-full border border-border/60 hover:bg-foreground/5 hover:border-foreground/30 transition-colors duration-300 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none"
					>
						{isEn ? 'See My Work' : 'Çalışmalarımı Gör'}
					</Button>
				</div>
			</div>

			<!-- Right: Browser mockup with rotating screenshots -->
			<div bind:this={heroMockup} class="relative">
				<div class="relative bg-card rounded-2xl shadow-2xl border-2 border-border/50 overflow-hidden">
					<!-- Browser chrome -->
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

					<!-- Screenshot area -->
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

						<!-- Project label overlay -->
						<div class="absolute bottom-3 left-3 z-10">
							<div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
								<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
								{heroScreenshots[currentScreenshot].label}
							</div>
						</div>

						<!-- Rotation dots -->
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

				<!-- Floating phone mockup — rotates with desktop -->
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
					<!-- Phone label -->
					<div class="absolute bottom-2 left-0 right-0 flex justify-center z-10">
						<span class="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-[8px] font-medium">{heroScreenshots[currentScreenshot].label}</span>
					</div>
				</div>
			</div>
		</div>
	</Container>
</Section>

<!-- ====================================================
     SOCIAL PROOF STRIP
     ==================================================== -->
<div class="relative border-y border-border/50 bg-gradient-to-r from-muted/50 via-primary/[0.03] to-muted/50 overflow-hidden">
	<!-- Gradient fade edges -->
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
						<span class="text-sm font-semibold whitespace-nowrap">{isEn ? '5-Star Google Reviews' : '5 Yıldızlı Google Değerlendirmeler'}</span>
					</div>
					<span class="text-primary/30" aria-hidden="true">&#x2022;</span>
					<div class="flex items-center gap-2 shrink-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary" aria-hidden="true"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
						<span class="text-sm font-semibold whitespace-nowrap">{isEn ? '50+ Projects Delivered' : '50+ Teslim Edilen Proje'}</span>
					</div>
					<span class="text-primary/30" aria-hidden="true">&#x2022;</span>
					<div class="flex items-center gap-2 shrink-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
						<span class="text-sm font-semibold whitespace-nowrap">{isEn ? '24h Response Time' : '24 Saat İçinde Yanıt'}</span>
					</div>
					<span class="text-primary/30" aria-hidden="true">&#x2022;</span>
					<div class="flex items-center gap-2 shrink-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
						<span class="text-sm font-semibold whitespace-nowrap">{isEn ? 'Turkey-Wide Service' : 'Türkiye Geneli Hizmet'}</span>
					</div>
					<span class="text-primary/30" aria-hidden="true">&#x2022;</span>
					<div class="flex items-center gap-2 shrink-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
						<span class="text-sm font-semibold whitespace-nowrap">{isEn ? '100% Secure & Fast' : '%100 Güvenli & Hızlı'}</span>
					</div>
					<span class="text-primary/30" aria-hidden="true">&#x2022;</span>
				</div>
			{/each}
		</div>
	</div>
</div>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- ====================================================
     PORTFOLIO — Clean full-screenshot showcase
     ==================================================== -->
<Section padding="lg" class="relative overflow-hidden">
	<Container>
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-14">
				<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					{isEn ? 'Portfolio' : 'Portfolyo'}
				</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
					{#if isEn}
						Recent <span class="case-gradient-text">Work</span>
					{:else}
						Son <span class="case-gradient-text">Çalışmalar</span>
					{/if}
				</h2>
			</div>
		</InView>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
			{#each portfolioProjects as project, i}
				{@const tc1 = {
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
						<!-- Screenshot with subtle themed shadow beneath -->
						<div class="overflow-hidden m-3 mb-0 rounded-lg shadow-sm">
							<img
								src={project.screenshot}
								alt={project.title}
								class="w-full h-auto transition-transform duration-500 ease-out group-hover:scale-[1.03]"
								loading="lazy"
							/>
						</div>

						<!-- Content -->
						<div class="flex flex-col flex-1 px-5 pt-5 pb-5 gap-4">
							<div>
								<h3 class="text-lg font-bold tracking-tight">{project.title}</h3>
								<p class="text-sm text-muted-foreground mt-1 leading-relaxed">
									{isEn ? project.descEn : project.descTr}
								</p>
							</div>

							<!-- Challenge -->
							<div>
								<span class="inline-block text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md {tc1.label} mb-2.5">
									{isEn ? 'Challenge' : 'Sorun'}
								</span>
								<ul class="space-y-1.5">
									{#each (isEn ? project.challengeEn : project.challengeTr) as bullet}
										<li class="flex items-start gap-2.5 text-[13px] text-muted-foreground leading-snug">
											<span class="shrink-0 w-1.5 h-1.5 rounded-full {tc1.dot} mt-1.5" aria-hidden="true"></span>
											{bullet}
										</li>
									{/each}
								</ul>
							</div>

							<!-- Solution -->
							<div>
								<span class="inline-block text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md {tc1.label} mb-2.5">
									{isEn ? 'What I Built' : 'Çözüm'}
								</span>
								<ul class="space-y-1.5">
									{#each (isEn ? project.solutionEn : project.solutionTr) as bullet}
										<li class="flex items-start gap-2.5 text-[13px] text-muted-foreground leading-snug">
											<span class="shrink-0 w-1.5 h-1.5 rounded-full {tc1.dot} mt-1.5" aria-hidden="true"></span>
											{bullet}
										</li>
									{/each}
								</ul>
							</div>

							<!-- Tech tags + CTA row -->
							<div class="mt-auto pt-3 flex items-end justify-between gap-3">
								<div class="flex flex-wrap gap-1.5">
									{#each project.tech as tag}
										<span class="text-[11px] font-medium px-2.5 py-1 rounded-full {tc1.tag}">{tag}</span>
									{/each}
								</div>
								<span class="shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold px-3.5 py-2 rounded-lg {tc1.cta} transition-colors duration-200 shadow-sm">
									{isEn ? 'View' : 'Gör'}
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
				href={getLocalePath('/work')}
				class="group px-8 py-6 rounded-full text-base border-2 hover:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none"
			>
				{isEn ? 'View All Projects' : 'Tüm Projeleri Gör'}
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
			</Button>
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- ====================================================
     PRICING — Premium cards with depth and hierarchy
     ==================================================== -->
<Section padding="lg" class="relative overflow-hidden pricing-section bg-muted/30 dark:bg-muted/10">
	<!-- Background pattern grid -->
	<div class="absolute inset-0 -z-[2] pricing-grid-bg opacity-[0.04] dark:opacity-[0.05]" aria-hidden="true"></div>
	<!-- Section glow accent -->
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] pricing-glow rounded-full -z-[1]" aria-hidden="true"></div>
	<!-- Decorative floating circles -->
	<div class="absolute top-16 left-[8%] w-20 h-20 rounded-full border border-primary/10 pointer-events-none" aria-hidden="true"></div>
	<div class="absolute bottom-24 right-[6%] w-14 h-14 rounded-full border border-primary/8 pointer-events-none" aria-hidden="true"></div>

	<Container>
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-16">
				<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					{isEn ? 'Pricing' : 'Fiyatlandırma'}
				</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
					{#if isEn}
						Transparent <span class="pricing-gradient-text">Pricing</span>
					{:else}
						Şeffaf <span class="pricing-gradient-text">Fiyatlandırma</span>
					{/if}
				</h2>
				<!-- Decorative underline -->
				<div class="mx-auto mt-4 mb-5 flex items-center justify-center gap-2" aria-hidden="true">
					<div class="w-8 h-0.5 rounded-full bg-primary/30"></div>
					<div class="w-2 h-2 rounded-full bg-primary"></div>
					<div class="w-8 h-0.5 rounded-full bg-primary/30"></div>
				</div>
				<p class="text-lg text-muted-foreground">
					{isEn ? 'No hidden fees. Fixed quotes. No surprises.' : 'Gizli ücret yok. Sabit fiyat. Sürpriz yok.'}
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
							<!-- Most Popular badge — inside card, no overflow issues -->
							<div class="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
								<div class="px-5 py-1.5 rounded-full bg-amber-400 text-amber-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-400/40 flex items-center gap-1.5">
									<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
									{isEn ? 'Most Popular' : 'En Popüler'}
								</div>
							</div>
							<!-- Shimmer effect -->
							<div class="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none" aria-hidden="true">
								<div class="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
							</div>
						{:else}
							<!-- Subtle gradient for non-highlighted cards -->
							<div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.03] opacity-0 group-hover/price:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true"></div>
						{/if}

						<div class="relative p-7 pt-10 pb-0 flex-1">
							<h3 class="text-lg font-bold mb-1 {tier.highlighted ? 'text-white/90' : ''}">{isEn ? tier.nameEn : tier.nameTr}</h3>
							<p class="text-3xl font-extrabold mt-2 mb-6 tabular-nums {tier.highlighted ? 'text-white' : 'text-primary'}">{tier.price}</p>
							<ul class="space-y-3 mb-6">
								{#each (isEn ? tier.featuresEn : tier.featuresTr) as feature}
									<li class="flex items-start gap-2.5 text-sm {tier.highlighted ? 'text-white/80' : 'text-muted-foreground'}">
										<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="{tier.highlighted ? 'text-amber-300' : 'text-primary'} shrink-0 mt-0.5" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
										{feature}
									</li>
								{/each}
							</ul>
						</div>

						<div class="relative p-7 pt-0">
							<a
								href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(isEn ? tier.msgEn : tier.msgTr)}`}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 {tier.highlighted
									? 'bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl focus-visible:ring-white/30'
									: 'bg-[#25D366] hover:bg-[#20BD5A] text-white hover:shadow-lg hover:shadow-[#25D366]/30 focus-visible:ring-[#25D366]/30'}"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
								</svg>
								{isEn ? 'Get a Quote' : 'Teklif Al'}
							</a>
						</div>
					</div>
				</InView>
			{/each}
		</div>

		<InView animation="fade-up" delay={300}>
			<p class="text-center text-sm text-muted-foreground mt-8">
				{isEn
					? 'All prices are fixed quotes. VAT included. No hidden fees.'
					: 'Tüm fiyatlar sabit tekliftir. KDV dahildir. Gizli ücret yoktur.'}
			</p>
		</InView>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- ====================================================
     PROCESS — S-Shaped Roadmap
     ==================================================== -->
<Section padding="lg" class="relative overflow-hidden">
	<!-- Decorative floating shapes -->
	<div class="absolute top-16 left-[8%] w-20 h-20 rounded-full border border-primary/10 process-float-1 pointer-events-none" aria-hidden="true"></div>
	<div class="absolute bottom-24 right-[6%] w-14 h-14 rounded-full border border-accent/10 process-float-2 pointer-events-none" aria-hidden="true"></div>
	<div class="absolute top-1/3 right-[12%] w-3 h-3 rounded-full bg-primary/20 process-float-3 pointer-events-none" aria-hidden="true"></div>

	<Container>
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-10 relative">
				<Badge variant="outline" class="mb-4 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					{isEn ? 'My Process' : 'Çalışma Sürecim'}
				</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
					{#if isEn}
						How I Build <span class="process-gradient-text">Your Website</span>
					{:else}
						Web Site Yapımı <span class="process-gradient-text">Süreci</span>
					{/if}
				</h2>
				<!-- Decorative underline -->
				<div class="mx-auto mt-3 mb-4 flex items-center justify-center gap-2" aria-hidden="true">
					<div class="w-8 h-0.5 rounded-full bg-primary/40"></div>
					<div class="w-2 h-2 rounded-full bg-primary"></div>
					<div class="w-16 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent"></div>
					<div class="w-2 h-2 rounded-full bg-accent"></div>
					<div class="w-8 h-0.5 rounded-full bg-accent/40"></div>
				</div>
				<p class="text-base text-muted-foreground">
					{isEn
						? 'A clear, transparent process from discovery to launch.'
						: "Keşiften yayınlamaya kadar şeffaf bir süreç."}
				</p>
			</div>
		</InView>

		<!-- Process steps — alternating left/right with connecting road -->
		<div class="relative max-w-3xl mx-auto">
			<!-- Vertical road line (desktop) -->
			<div class="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 rounded-full" aria-hidden="true">
				<div class="w-full h-full road-line"></div>
			</div>

			<!-- Mobile vertical line -->
			<div class="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary/15 to-primary/30" aria-hidden="true"></div>

			<div class="space-y-5 md:space-y-8">
				{#each processSteps as step, i}
					<InView animation="fade-up" delay={i * 150}>
						<div class="relative flex items-start gap-4 md:gap-0 {i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}">
							<!-- Mobile: step circle on left -->
							<div class="md:hidden shrink-0 w-12 h-12 rounded-full {step.colorClass}-bg text-white flex items-center justify-center text-sm font-black z-10 {step.colorClass}-shadow">
								{step.step}
							</div>

							<!-- Desktop: card on one side -->
							<div class="flex-1 md:w-[calc(50%-2.5rem)] {i % 2 === 0 ? 'md:pr-14' : 'md:pl-14'}">
								<div class="p-5 md:p-6 rounded-2xl bg-card border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group {step.colorClass}-card relative overflow-hidden">

									<!-- Animated illustration area -->
									<div class="absolute top-4 right-4 w-20 h-20 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" aria-hidden="true">
										{#if i === 0}
											<!-- Discovery: animated magnifying glass with orbit -->
											<svg width="80" height="80" viewBox="0 0 80 80" class="process-anim-scan">
												<circle cx="35" cy="35" r="18" fill="none" stroke="oklch(0.55 0.24 260)" stroke-width="2" opacity="0.3"/>
												<circle cx="35" cy="35" r="12" fill="oklch(0.55 0.24 260 / 0.08)"/>
												<line x1="49" y1="49" x2="65" y2="65" stroke="oklch(0.55 0.24 260)" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
												<!-- Orbiting dot -->
												<circle cx="35" cy="17" r="3" fill="oklch(0.55 0.24 260)" opacity="0.6" class="process-orbit-dot"/>
											</svg>
										{:else if i === 1}
											<!-- Design: animated color swatches -->
											<svg width="80" height="80" viewBox="0 0 80 80">
												<rect x="8" y="8" width="20" height="20" rx="5" fill="oklch(0.55 0.22 300 / 0.6)" class="process-anim-dot-1"/>
												<rect x="34" y="8" width="20" height="20" rx="5" fill="oklch(0.65 0.18 50 / 0.6)" class="process-anim-dot-2"/>
												<rect x="8" y="34" width="20" height="20" rx="5" fill="oklch(0.6 0.20 145 / 0.6)" class="process-anim-dot-3"/>
												<rect x="34" y="34" width="20" height="20" rx="5" fill="oklch(0.55 0.24 260 / 0.6)" class="process-anim-dot-1" style="animation-delay: 0.6s;"/>
												<!-- Pen cursor -->
												<path d="M60 16l-4 4M56 20l2-8 6 6-8 2z" fill="oklch(0.55 0.22 300)" opacity="0.7" class="process-anim-pen"/>
											</svg>
										{:else if i === 2}
											<!-- Development: animated terminal -->
											<svg width="80" height="80" viewBox="0 0 80 80">
												<rect x="5" y="10" width="70" height="55" rx="6" fill="oklch(0.15 0.02 260)" stroke="oklch(0.6 0.18 180 / 0.3)" stroke-width="1.5"/>
												<!-- Terminal dots -->
												<circle cx="16" cy="20" r="3" fill="oklch(0.65 0.2 25)"/>
												<circle cx="26" cy="20" r="3" fill="oklch(0.75 0.18 85)"/>
												<circle cx="36" cy="20" r="3" fill="oklch(0.6 0.2 145)"/>
												<!-- Code lines typing -->
												<rect x="14" y="32" width="35" height="3" rx="1.5" fill="oklch(0.6 0.18 180 / 0.6)" class="process-code-line-1"/>
												<rect x="14" y="40" width="25" height="3" rx="1.5" fill="oklch(0.55 0.22 300 / 0.4)" class="process-code-line-2"/>
												<rect x="14" y="48" width="40" height="3" rx="1.5" fill="oklch(0.55 0.24 260 / 0.4)" class="process-code-line-3"/>
												<!-- Blinking cursor -->
												<rect x="56" y="48" width="2" height="3" rx="0.5" fill="oklch(0.6 0.18 180)" class="process-cursor-blink"/>
											</svg>
										{:else}
											<!-- Launch: animated rocket with exhaust -->
											<svg width="80" height="80" viewBox="0 0 80 80" class="process-anim-rocket">
												<!-- Exhaust particles -->
												<circle cx="32" cy="62" r="4" fill="oklch(0.75 0.18 50 / 0.5)" class="process-exhaust-1"/>
												<circle cx="40" cy="68" r="3" fill="oklch(0.65 0.2 25 / 0.4)" class="process-exhaust-2"/>
												<circle cx="36" cy="72" r="5" fill="oklch(0.75 0.18 50 / 0.3)" class="process-exhaust-3"/>
												<!-- Rocket body -->
												<path d="M40 10c-6 8-10 20-10 30l6 8h8l6-8c0-10-4-22-10-30z" fill="oklch(0.6 0.20 145)" opacity="0.8"/>
												<!-- Rocket window -->
												<circle cx="40" cy="28" r="5" fill="oklch(0.85 0.12 200)" opacity="0.7"/>
												<!-- Fins -->
												<path d="M30 40l-6 12 6-4z" fill="oklch(0.55 0.24 260 / 0.6)"/>
												<path d="M50 40l6 12-6-4z" fill="oklch(0.55 0.24 260 / 0.6)"/>
												<!-- Stars -->
												<circle cx="15" cy="15" r="1.5" fill="oklch(0.75 0.18 85)" class="process-star-1"/>
												<circle cx="65" cy="22" r="1" fill="oklch(0.75 0.18 85)" class="process-star-2"/>
												<circle cx="60" cy="50" r="1.5" fill="oklch(0.75 0.18 85)" class="process-star-3"/>
											</svg>
										{/if}
									</div>

									<div class="flex items-center gap-3 mb-4">
										<div class="w-12 h-12 rounded-xl {step.colorClass}-icon flex items-center justify-center transition-colors duration-300">
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="{step.colorClass}-icon-text transition-colors duration-300" aria-hidden="true"><path d={step.icon} /></svg>
										</div>
										<div>
											<h3 class="text-lg font-bold">{isEn ? step.titleEn : step.titleTr}</h3>
											<span class="text-xs font-semibold {step.colorClass}-icon-text uppercase tracking-wider">{step.step}</span>
										</div>
									</div>
									<p class="text-sm text-muted-foreground leading-relaxed mb-4">{isEn ? step.descEn : step.descTr}</p>

									<!-- Bullet points -->
									<ul class="space-y-2">
										{#each (isEn ? step.bulletsEn : step.bulletsTr) as bullet}
											<li class="flex items-center gap-2 text-sm">
												<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="{step.colorClass}-icon-text flex-shrink-0" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
												<span class="text-muted-foreground">{bullet}</span>
											</li>
										{/each}
									</ul>
								</div>
							</div>

							<!-- Desktop: center node -->
							<div class="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-14 h-14 rounded-full {step.colorClass}-bg text-white items-center justify-center text-sm font-black z-10 {step.colorClass}-shadow ring-4 ring-background">
								{step.step}
							</div>

							<!-- Desktop: empty space on other side -->
							<div class="hidden md:block md:w-[calc(50%-2.5rem)]"></div>
						</div>
					</InView>
				{/each}
			</div>
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- ====================================================
     TESTIMONIALS — Spotlight cards with initial avatars
     ==================================================== -->
<Section padding="lg" background="muted" class="relative overflow-hidden">
	<!-- Section glow -->
	<div class="absolute top-0 right-0 w-[400px] h-[400px] testimonial-glow rounded-full -z-[1]" aria-hidden="true"></div>

	<Container>
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-16 relative">
				<!-- Large decorative quote mark -->
				<div class="absolute -top-4 left-1/2 -translate-x-1/2 text-[120px] leading-none font-serif text-primary/[0.06] pointer-events-none select-none" aria-hidden="true">&ldquo;</div>

				<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					{isEn ? 'Client Reviews' : 'Müşteri Yorumları'}
				</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
					{#if isEn}
						What Clients <span class="testimonial-gradient-text">Say</span>
					{:else}
						Müşterilerimiz Ne <span class="testimonial-gradient-text">Diyor?</span>
					{/if}
				</h2>
				<p class="mt-4 text-lg text-muted-foreground">
					{isEn
						? 'Real reviews from real clients on Google.'
						: "Google'daki gerçek müşteri yorumları."}
				</p>
				<!-- Star rating summary -->
				<div class="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
					<div class="flex gap-0.5">
						{#each [1, 2, 3, 4, 5] as _}
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
						{/each}
					</div>
					<span class="text-sm font-semibold text-amber-600 dark:text-amber-400">5.0</span>
					<span class="text-xs text-muted-foreground">{isEn ? 'on Google' : "Google'da"}</span>
				</div>
			</div>
		</InView>

		<div class="grid gap-6 md:grid-cols-3">
			{#each testimonials as testimonial, i}
				<InView animation="fade-up" delay={i * 100}>
					<div class="flex flex-col p-7 rounded-2xl bg-card border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
						<!-- Stars -->
						<div class="flex items-center gap-0.5 mb-4" aria-label="5 out of 5 stars">
							{#each [1, 2, 3, 4, 5] as _}
								<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
							{/each}
						</div>

						<blockquote class="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
							"{isEn ? testimonial.quoteEn : testimonial.quoteTr}"
						</blockquote>

						<div class="flex items-center gap-3 pt-4 border-t border-border/50 mt-auto">
							<!-- Avatar with initials -->
							<div class="w-10 h-10 rounded-full {testimonial.color} flex items-center justify-center text-white text-sm font-bold shrink-0">
								{testimonial.initials}
							</div>
							<div class="flex-1 min-w-0">
								<p class="font-semibold text-sm">{testimonial.author}</p>
								<p class="text-xs text-muted-foreground">{isEn ? testimonial.roleEn : testimonial.roleTr}</p>
							</div>
							{#if testimonial.verified}
								<div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-[10px] font-medium text-muted-foreground shrink-0">
									<!-- Google G icon -->
									<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
										<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
										<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
										<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
										<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
									</svg>
									Google Review
								</div>
							{/if}
						</div>
					</div>
				</InView>
			{/each}
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- ====================================================
     INDUSTRY SOLUTIONS — Unique colors + micro-animations
     ==================================================== -->
<Section padding="lg" class="relative overflow-hidden">
	<!-- Section glow -->
	<div class="absolute bottom-0 left-0 w-[400px] h-[400px] industry-glow rounded-full -z-[1]" aria-hidden="true"></div>

	<Container>
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-16">
				<Badge variant="outline" class="mb-6 border-accent/40 text-accent bg-accent/10 text-xs font-semibold uppercase tracking-wider">
					{isEn ? 'Industry Solutions' : 'Sektörel Çözümler'}
				</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
					{isEn ? 'Websites for Every Industry' : 'Her Sektöre Özel Web Site Yapımı'}
				</h2>
				<p class="mt-4 text-lg text-muted-foreground">
					{isEn
						? 'Tailored web solutions designed for the unique needs of your industry.'
						: "Her sektöre özel, profesyonel web site yapımı ve web tasarım hizmetleri."}
				</p>
			</div>
		</InView>

		<div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
			{#each industries as industry, i}
				<InView animation="fade-up" delay={i * 75}>
					<div class="group p-6 rounded-2xl bg-card border border-border/50 transition-all duration-300 {industry.animClass} overflow-hidden relative">
						<!-- Animated background effect on hover -->
						<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 industry-bg-{industry.color}" aria-hidden="true"></div>

						<div class="relative">
							<div class="w-12 h-12 rounded-xl industry-icon-{industry.color} flex items-center justify-center mb-4 transition-all duration-300">
								<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="industry-icon-text-{industry.color} transition-colors duration-300" aria-hidden="true"><path d={industry.icon} /></svg>
							</div>
							<h3 class="text-base font-bold mb-2">{isEn ? industry.titleEn : industry.titleTr}</h3>
							<p class="text-sm text-muted-foreground leading-relaxed">{isEn ? industry.descEn : industry.descTr}</p>
						</div>

						<!-- Micro-animation elements (per industry) -->
						{#if industry.color === 'restaurant'}
							<!-- Coffee steam -->
							<div class="absolute top-4 right-4 opacity-0 group-hover:opacity-60 transition-opacity duration-500" aria-hidden="true">
								<div class="flex gap-1">
									<div class="w-0.5 h-4 bg-orange-400/60 rounded-full steam-1"></div>
									<div class="w-0.5 h-5 bg-orange-400/40 rounded-full steam-2"></div>
									<div class="w-0.5 h-3 bg-orange-400/50 rounded-full steam-3"></div>
								</div>
							</div>
						{:else if industry.color === 'healthcare'}
							<!-- Heartbeat line -->
							<div class="absolute top-5 right-4 opacity-0 group-hover:opacity-50 transition-opacity duration-500" aria-hidden="true">
								<svg width="60" height="20" viewBox="0 0 60 20" fill="none">
									<path d="M0 10 L15 10 L20 2 L25 18 L30 6 L35 14 L40 10 L60 10" stroke="oklch(0.7 0.15 180)" stroke-width="1.5" fill="none" class="heartbeat-line" />
								</svg>
							</div>
						{:else if industry.color === 'startup'}
							<!-- Lightning flash -->
							<div class="absolute top-4 right-4 opacity-0 group-hover:opacity-60 transition-opacity duration-300" aria-hidden="true">
								<svg width="16" height="24" viewBox="0 0 16 24" fill="oklch(0.75 0.18 300 / 0.6)" class="lightning-flash">
									<path d="M9 0L0 14h7l-2 10 11-14H9l2-10z" />
								</svg>
							</div>
						{:else if industry.color === 'ecommerce'}
							<!-- Shopping bag bounce -->
							<div class="absolute top-4 right-4 opacity-0 group-hover:opacity-50 transition-opacity duration-500" aria-hidden="true">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="oklch(0.7 0.18 150)" stroke-width="1.5" class="bag-bounce"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" /></svg>
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
     FAQ
     ==================================================== -->
<Section padding="lg" background="muted" class="relative overflow-hidden">
	<!-- Decorative elements -->
	<div class="absolute top-12 right-[5%] w-40 h-40 rounded-full border border-primary/5 pointer-events-none" aria-hidden="true"></div>
	<div class="absolute bottom-12 left-[3%] w-24 h-24 rounded-full border border-accent/5 pointer-events-none" aria-hidden="true"></div>

	<Container>
		<InView animation="fade-up">
			<div class="text-center mb-12">
				<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					{isEn ? 'FAQ' : 'SSS'}
				</Badge>
				<h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
					{#if isEn}
						Frequently Asked <span class="faq-gradient-text">Questions</span>
					{:else}
						Sık Sorulan <span class="faq-gradient-text">Sorular</span>
					{/if}
				</h2>
				<!-- Decorative divider -->
				<div class="mx-auto mt-4 mb-4 flex items-center justify-center gap-1.5" aria-hidden="true">
					<div class="w-12 h-0.5 rounded-full bg-primary/30"></div>
					<div class="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
					<div class="w-12 h-0.5 rounded-full bg-primary/30"></div>
				</div>
				<p class="text-muted-foreground">
					{isEn
						? 'Common questions about web design services in Istanbul'
						: "İstanbul'da web tasarım hizmetleri hakkında sık sorulan sorular"}
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
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-muted-foreground flex-shrink-0 transition-transform duration-200 {openFaq === i ? 'rotate-180' : ''}"
								aria-hidden="true"
							><path d="m6 9 6 6 6-6" /></svg>
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
     BLOG — Latest articles
     ==================================================== -->
<Section class="bg-muted/30">
	<Container>
		<InView animation="fade-up">
			<div class="text-center mb-10">
				<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					Blog
				</Badge>
				<h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
					{isEn ? 'Latest Articles' : 'Son Yazılar'}
				</h2>
				<p class="text-muted-foreground mt-3 max-w-xl mx-auto">
					{isEn ? 'Tips, guides, and insights about web design and development' : 'Web tasarım ve geliştirme hakkında ipuçları, rehberler ve içgörüler'}
				</p>
			</div>
		</InView>
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each latestPosts as post, i}
				<InView animation="fade-up" delay={i * 100}>
					<a href={getLocalePath(`/blog/${post.slug}/`)} class="group block bg-card rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all overflow-hidden h-full">
						<div class="p-6">
							<div class="flex items-center gap-2 mb-3">
								<span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{isEn ? post.category : post.categoryTr}</span>
								<span class="text-xs text-muted-foreground">{isEn ? post.readTime : post.readTimeTr}</span>
							</div>
							<h3 class="font-semibold leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-2">
								{isEn ? post.title : post.titleTr}
							</h3>
							<p class="text-sm text-muted-foreground line-clamp-2">
								{isEn ? post.description : post.descriptionTr}
							</p>
							<div class="mt-4 text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
								{isEn ? 'Read more' : 'Devamını oku'}
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
							</div>
						</div>
					</a>
				</InView>
			{/each}
		</div>
		<div class="text-center mt-8">
			<a href={getLocalePath('/blog/')} class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
				{isEn ? 'View all articles' : 'Tüm yazıları görüntüle'}
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
			</a>
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- ====================================================
     FINAL CTA — Light section with glows and depth
     ==================================================== -->
<Section padding="lg" class="relative overflow-hidden">
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] cta-glow rounded-full"></div>
		<!-- Animated rings -->
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-primary/10 cta-ring-1"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/5 cta-ring-2"></div>
	</div>

	<Container size="content">
		<InView animation="scale">
			<div class="relative text-center py-8">
				<!-- Decorative corner accents -->
				<div class="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-primary/20 rounded-tl-xl" aria-hidden="true"></div>
				<div class="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-primary/20 rounded-br-xl" aria-hidden="true"></div>

				<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					{isEn ? "Let's Talk" : 'Konuşalım'}
				</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-2">
					{#if isEn}
						Let's Talk About <span class="cta-gradient-text">Your Project</span>
					{:else}
						<span class="cta-gradient-text">Projenizi</span> Konuşalım
					{/if}
				</h2>
				<!-- Decorative line -->
				<div class="mx-auto mt-4 mb-6 flex items-center justify-center gap-2" aria-hidden="true">
					<div class="w-6 h-0.5 rounded-full bg-[#25D366]/40"></div>
					<div class="w-2 h-2 rounded-full bg-[#25D366]"></div>
					<div class="w-20 h-0.5 rounded-full bg-gradient-to-r from-[#25D366] to-primary"></div>
					<div class="w-2 h-2 rounded-full bg-primary"></div>
					<div class="w-6 h-0.5 rounded-full bg-primary/40"></div>
				</div>
				<p class="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
					{isEn
						? "Got a project in mind? I'd love to hear about it. Free consultation, fixed quotes, no pressure."
						: 'Aklınızda bir proje mi var? Dinlemekten memnuniyet duyarım. Ücretsiz danışmanlık, sabit fiyat, hiçbir zorunluluk yok.'}
				</p>

				<!-- Improved trust badges with icons -->
				<div class="flex flex-wrap items-center justify-center gap-5 mb-10">
					{#each [
						{ icon: 'M20 6 9 17l-5-5', textEn: 'Free Consultation', textTr: 'Ücretsiz Danışmanlık' },
						{ icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', textEn: 'Fixed Pricing', textTr: 'Sabit Fiyat' },
						{ icon: 'M12 6v6l4 2', textEn: '24h Response', textTr: '24 Saat Yanıt' }
					] as badge}
						<div class="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 border border-border/50">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#25D366]" aria-hidden="true"><path d={badge.icon} /></svg>
							<span class="text-xs font-semibold">{isEn ? badge.textEn : badge.textTr}</span>
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
						{isEn ? 'Start Your Project on WhatsApp' : "WhatsApp'tan Projenizi Başlatın"}
					</a>
					<Button
						variant="ghost"
						href={getLocalePath('/contact')}
						class="px-8 py-[1.15rem] rounded-full border border-border/60 hover:bg-foreground/5 hover:border-foreground/30 transition-colors duration-300 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none"
					>
						{isEn ? 'Send an Email' : 'E-posta Gönder'}
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
		aria-label={isEn ? 'Quick contact' : 'Hızlı iletişim'}
	>
		<div class="flex items-center justify-between px-4 py-3">
			<div>
				<p class="text-sm font-semibold">{isEn ? 'Free Consultation' : 'Ücretsiz Danışmanlık'}</p>
				<p class="text-xs text-muted-foreground">{isEn ? 'Reply within 24h' : '24 saat yanıt'}</p>
			</div>
			<a
				href={whatsappUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
				</svg>
				WhatsApp
			</a>
		</div>
	</div>
{/if}

<style>
	/* ===== Hero Glows ===== */
	.hero-glow-accent {
		background: radial-gradient(
			ellipse,
			oklch(0.58 0.22 25 / 0.45) 0%,
			oklch(0.58 0.22 25 / 0.28) 25%,
			oklch(0.58 0.22 25 / 0.12) 50%,
			transparent 72%
		);
	}
	:global(.dark) .hero-glow-accent {
		background: radial-gradient(
			ellipse,
			oklch(0.68 0.20 25 / 0.55) 0%,
			oklch(0.68 0.20 25 / 0.35) 25%,
			oklch(0.68 0.20 25 / 0.18) 50%,
			transparent 72%
		);
	}
	.hero-glow-primary {
		background: radial-gradient(
			ellipse,
			oklch(0.55 0.24 260 / 0.38) 0%,
			oklch(0.55 0.24 260 / 0.22) 30%,
			oklch(0.55 0.24 260 / 0.08) 55%,
			transparent 75%
		);
	}
	:global(.dark) .hero-glow-primary {
		background: radial-gradient(
			ellipse,
			oklch(0.68 0.18 260 / 0.48) 0%,
			oklch(0.68 0.18 260 / 0.28) 30%,
			oklch(0.68 0.18 260 / 0.12) 55%,
			transparent 75%
		);
	}
	.hero-glow-center {
		background: radial-gradient(
			ellipse,
			oklch(0.55 0.24 260 / 0.08) 0%,
			oklch(0.55 0.24 260 / 0.03) 40%,
			transparent 70%
		);
	}
	:global(.dark) .hero-glow-center {
		background: radial-gradient(
			ellipse,
			oklch(0.68 0.18 260 / 0.14) 0%,
			oklch(0.68 0.18 260 / 0.05) 40%,
			transparent 70%
		);
	}

	/* ===== Section-specific glows ===== */
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
	.industry-glow {
		background: radial-gradient(ellipse, oklch(0.58 0.22 25 / 0.06) 0%, transparent 70%);
	}
	:global(.dark) .industry-glow {
		background: radial-gradient(ellipse, oklch(0.58 0.22 25 / 0.10) 0%, transparent 70%);
	}
	.cta-glow {
		background: radial-gradient(ellipse, oklch(0.55 0.24 260 / 0.06) 0%, transparent 60%);
	}
	:global(.dark) .cta-glow {
		background: radial-gradient(ellipse, oklch(0.55 0.24 260 / 0.12) 0%, transparent 60%);
	}

	/* ===== Hero top-left glow ===== */
	.hero-glow-topleft {
		background: radial-gradient(
			ellipse,
			oklch(0.55 0.24 260 / 0.22) 0%,
			oklch(0.55 0.24 260 / 0.12) 30%,
			oklch(0.55 0.24 260 / 0.04) 55%,
			transparent 75%
		);
	}
	:global(.dark) .hero-glow-topleft {
		background: radial-gradient(
			ellipse,
			oklch(0.68 0.18 260 / 0.30) 0%,
			oklch(0.68 0.18 260 / 0.16) 30%,
			oklch(0.68 0.18 260 / 0.06) 55%,
			transparent 75%
		);
	}

	/* ===== Case Study Columns ===== */
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

	/* ===== Pricing section ===== */
	.pricing-grid-bg {
		background-image:
			linear-gradient(oklch(0.55 0.24 260 / 0.3) 1px, transparent 1px),
			linear-gradient(90deg, oklch(0.55 0.24 260 / 0.3) 1px, transparent 1px);
		background-size: 40px 40px;
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

	/* ===== Industry card colors ===== */
	/* Corporate - Navy blue */
	.industry-icon-corporate { background: oklch(0.55 0.20 260 / 0.1); }
	.industry-icon-text-corporate { color: oklch(0.55 0.20 260); }
	:global(.dark) .industry-icon-corporate { background: oklch(0.65 0.18 260 / 0.2); }
	:global(.dark) .industry-icon-text-corporate { color: oklch(0.75 0.15 260); }
	.industry-corporate:hover .industry-icon-corporate { background: oklch(0.55 0.20 260); }
	.industry-corporate:hover .industry-icon-text-corporate { color: white; }
	.industry-bg-corporate { background: radial-gradient(ellipse at top right, oklch(0.55 0.20 260 / 0.04) 0%, transparent 60%); }

	/* E-commerce - Green */
	.industry-icon-ecommerce { background: oklch(0.7 0.18 150 / 0.1); }
	.industry-icon-text-ecommerce { color: oklch(0.6 0.18 150); }
	:global(.dark) .industry-icon-ecommerce { background: oklch(0.7 0.18 150 / 0.2); }
	:global(.dark) .industry-icon-text-ecommerce { color: oklch(0.75 0.15 150); }
	.industry-ecommerce:hover .industry-icon-ecommerce { background: oklch(0.6 0.18 150); }
	.industry-ecommerce:hover .industry-icon-text-ecommerce { color: white; }
	.industry-bg-ecommerce { background: radial-gradient(ellipse at top right, oklch(0.7 0.18 150 / 0.04) 0%, transparent 60%); }

	/* Restaurant - Warm orange */
	.industry-icon-restaurant { background: oklch(0.75 0.16 60 / 0.1); }
	.industry-icon-text-restaurant { color: oklch(0.65 0.18 50); }
	:global(.dark) .industry-icon-restaurant { background: oklch(0.75 0.16 60 / 0.2); }
	:global(.dark) .industry-icon-text-restaurant { color: oklch(0.8 0.14 60); }
	.industry-restaurant:hover .industry-icon-restaurant { background: oklch(0.65 0.18 50); }
	.industry-restaurant:hover .industry-icon-text-restaurant { color: white; }
	.industry-bg-restaurant { background: radial-gradient(ellipse at top right, oklch(0.75 0.16 60 / 0.04) 0%, transparent 60%); }

	/* Healthcare - Teal */
	.industry-icon-healthcare { background: oklch(0.7 0.15 180 / 0.1); }
	.industry-icon-text-healthcare { color: oklch(0.6 0.15 180); }
	:global(.dark) .industry-icon-healthcare { background: oklch(0.7 0.15 180 / 0.2); }
	:global(.dark) .industry-icon-text-healthcare { color: oklch(0.75 0.12 180); }
	.industry-healthcare:hover .industry-icon-healthcare { background: oklch(0.6 0.15 180); }
	.industry-healthcare:hover .industry-icon-text-healthcare { color: white; }
	.industry-bg-healthcare { background: radial-gradient(ellipse at top right, oklch(0.7 0.15 180 / 0.04) 0%, transparent 60%); }

	/* Startup - Electric purple */
	.industry-icon-startup { background: oklch(0.65 0.22 300 / 0.1); }
	.industry-icon-text-startup { color: oklch(0.55 0.22 300); }
	:global(.dark) .industry-icon-startup { background: oklch(0.65 0.22 300 / 0.2); }
	:global(.dark) .industry-icon-text-startup { color: oklch(0.75 0.18 300); }
	.industry-startup:hover .industry-icon-startup { background: oklch(0.55 0.22 300); }
	.industry-startup:hover .industry-icon-text-startup { color: white; }
	.industry-bg-startup { background: radial-gradient(ellipse at top right, oklch(0.65 0.22 300 / 0.04) 0%, transparent 60%); }

	/* Portfolio - Rose */
	.industry-icon-portfolio { background: oklch(0.65 0.18 350 / 0.1); }
	.industry-icon-text-portfolio { color: oklch(0.6 0.20 350); }
	:global(.dark) .industry-icon-portfolio { background: oklch(0.65 0.18 350 / 0.2); }
	:global(.dark) .industry-icon-text-portfolio { color: oklch(0.75 0.15 350); }
	.industry-portfolio:hover .industry-icon-portfolio { background: oklch(0.6 0.20 350); }
	.industry-portfolio:hover .industry-icon-text-portfolio { color: white; }
	.industry-bg-portfolio { background: radial-gradient(ellipse at top right, oklch(0.65 0.18 350 / 0.04) 0%, transparent 60%); }

	/* Industry hover shadow colors */
	.industry-corporate:hover { box-shadow: 0 20px 40px oklch(0.55 0.20 260 / 0.1); transform: translateY(-4px); }
	.industry-ecommerce:hover { box-shadow: 0 20px 40px oklch(0.6 0.18 150 / 0.1); transform: translateY(-4px); }
	.industry-restaurant:hover { box-shadow: 0 20px 40px oklch(0.65 0.18 50 / 0.1); transform: translateY(-4px); }
	.industry-healthcare:hover { box-shadow: 0 20px 40px oklch(0.6 0.15 180 / 0.1); transform: translateY(-4px); }
	.industry-startup:hover { box-shadow: 0 20px 40px oklch(0.55 0.22 300 / 0.1); transform: translateY(-4px); }
	.industry-portfolio:hover { box-shadow: 0 20px 40px oklch(0.6 0.20 350 / 0.1); transform: translateY(-4px); }

	/* ===== Micro-animations ===== */

	/* Coffee steam */
	.steam-1, .steam-2, .steam-3 {
		animation: steam 2s ease-in-out infinite;
	}
	.steam-2 { animation-delay: 0.3s; }
	.steam-3 { animation-delay: 0.6s; }

	@keyframes steam {
		0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.6; }
		50% { transform: translateY(-6px) scaleY(1.3); opacity: 0.2; }
	}

	/* Heartbeat ECG line */
	.heartbeat-line {
		stroke-dasharray: 120;
		stroke-dashoffset: 120;
		animation: heartbeat 2s linear infinite;
	}
	@keyframes heartbeat {
		to { stroke-dashoffset: 0; }
	}

	/* Lightning flash */
	.lightning-flash {
		animation: flash 2s ease-in-out infinite;
	}
	@keyframes flash {
		0%, 100% { opacity: 0.2; transform: scale(0.9); }
		10% { opacity: 0.8; transform: scale(1.1); }
		20% { opacity: 0.1; transform: scale(0.95); }
		30% { opacity: 0.6; transform: scale(1); }
		40% { opacity: 0.2; transform: scale(0.9); }
	}

	/* Shopping bag bounce */
	.bag-bounce {
		animation: bounce-bag 1.5s ease-in-out infinite;
	}
	@keyframes bounce-bag {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-4px); }
	}

	/* ===== Process micro-animations ===== */
	.process-anim-scan {
		animation: process-scan 2.5s ease-in-out infinite;
	}
	@keyframes process-scan {
		0%, 100% { transform: translate(0, 0) scale(1); }
		50% { transform: translate(3px, -3px) scale(1.1); }
	}

	.process-anim-dot-1 { animation: process-dot-bounce 1.8s ease-in-out infinite; }
	.process-anim-dot-2 { animation: process-dot-bounce 1.8s ease-in-out 0.2s infinite; }
	.process-anim-dot-3 { animation: process-dot-bounce 1.8s ease-in-out 0.4s infinite; }
	@keyframes process-dot-bounce {
		0%, 100% { transform: scale(1); opacity: 0.7; }
		50% { transform: scale(1.35); opacity: 1; }
	}

	.process-anim-code {
		animation: process-code-pulse 2s ease-in-out infinite;
	}
	@keyframes process-code-pulse {
		0%, 100% { opacity: 0.5; transform: scaleX(1); }
		50% { opacity: 0.9; transform: scaleX(1.05); }
	}

	.process-anim-rocket {
		animation: process-rocket-lift 2s ease-in-out infinite;
	}
	@keyframes process-rocket-lift {
		0%, 100% { transform: translate(0, 0) rotate(0deg); }
		50% { transform: translate(3px, -4px) rotate(-8deg); }
	}

	/* ===== Process illustration animations ===== */
	.process-orbit-dot {
		animation: process-orbit 3s linear infinite;
		transform-origin: 35px 35px;
	}
	@keyframes process-orbit {
		to { transform: rotate(360deg); }
	}

	.process-anim-pen {
		animation: process-pen-draw 2s ease-in-out infinite;
	}
	@keyframes process-pen-draw {
		0%, 100% { transform: translate(0, 0); }
		50% { transform: translate(-4px, 4px); }
	}

	.process-code-line-1 { animation: process-type 2s ease-in-out infinite; }
	.process-code-line-2 { animation: process-type 2s ease-in-out 0.3s infinite; }
	.process-code-line-3 { animation: process-type 2s ease-in-out 0.6s infinite; }
	@keyframes process-type {
		0% { opacity: 0.2; transform: scaleX(0.3); transform-origin: left; }
		50%, 100% { opacity: 0.6; transform: scaleX(1); transform-origin: left; }
	}

	.process-cursor-blink {
		animation: cursor-blink 1s step-end infinite;
	}
	@keyframes cursor-blink {
		0%, 50% { opacity: 1; }
		51%, 100% { opacity: 0; }
	}

	.process-exhaust-1 { animation: exhaust-pulse 1.2s ease-in-out infinite; }
	.process-exhaust-2 { animation: exhaust-pulse 1.2s ease-in-out 0.2s infinite; }
	.process-exhaust-3 { animation: exhaust-pulse 1.2s ease-in-out 0.4s infinite; }
	@keyframes exhaust-pulse {
		0%, 100% { transform: scale(1); opacity: 0.4; }
		50% { transform: scale(1.5); opacity: 0.1; }
	}

	.process-star-1 { animation: star-twinkle 2s ease-in-out infinite; }
	.process-star-2 { animation: star-twinkle 2s ease-in-out 0.5s infinite; }
	.process-star-3 { animation: star-twinkle 2s ease-in-out 1s infinite; }
	@keyframes star-twinkle {
		0%, 100% { opacity: 0.3; transform: scale(1); }
		50% { opacity: 1; transform: scale(1.4); }
	}

	/* ===== Social proof marquee ===== */
	.proof-marquee {
		overflow: hidden;
		white-space: nowrap;
	}
	.proof-marquee-track {
		display: flex;
		animation: marquee-scroll 30s linear infinite;
		width: max-content;
	}
	@keyframes marquee-scroll {
		0% { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}

	/* ===== Process road line ===== */
	.road-line {
		background: repeating-linear-gradient(
			to bottom,
			oklch(0.55 0.24 260 / 0.25) 0px,
			oklch(0.55 0.24 260 / 0.25) 12px,
			transparent 12px,
			transparent 24px
		);
	}
	:global(.dark) .road-line {
		background: repeating-linear-gradient(
			to bottom,
			oklch(0.68 0.18 260 / 0.3) 0px,
			oklch(0.68 0.18 260 / 0.3) 12px,
			transparent 12px,
			transparent 24px
		);
	}

	/* ===== Process gradient heading ===== */
	.process-gradient-text {
		background: linear-gradient(135deg, oklch(0.55 0.24 260), oklch(0.58 0.22 300));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	:global(.dark) .process-gradient-text {
		background: linear-gradient(135deg, oklch(0.72 0.20 260), oklch(0.75 0.18 300));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* Process floating decorations */
	.process-float-1 { animation: process-float 6s ease-in-out infinite; }
	.process-float-2 { animation: process-float 8s ease-in-out infinite reverse; }
	.process-float-3 { animation: process-float 4s ease-in-out infinite; }
	@keyframes process-float {
		0%, 100% { transform: translateY(0); opacity: 0.4; }
		50% { transform: translateY(-12px); opacity: 0.8; }
	}

	/* ===== Process step colors ===== */
	/* Discovery - Blue */
	.process-step-discovery-bg { background: oklch(0.55 0.24 260); }
	.process-step-discovery-shadow { box-shadow: 0 8px 24px oklch(0.55 0.24 260 / 0.35); }
	.process-step-discovery-icon { background: oklch(0.55 0.24 260 / 0.1); }
	.process-step-discovery-icon-text { color: oklch(0.55 0.24 260); }
	.process-step-discovery-card:hover { border-color: oklch(0.55 0.24 260 / 0.3); }
	:global(.dark) .process-step-discovery-icon { background: oklch(0.65 0.20 260 / 0.2); }
	:global(.dark) .process-step-discovery-icon-text { color: oklch(0.72 0.18 260); }

	/* Design - Purple */
	.process-step-design-bg { background: oklch(0.55 0.22 300); }
	.process-step-design-shadow { box-shadow: 0 8px 24px oklch(0.55 0.22 300 / 0.35); }
	.process-step-design-icon { background: oklch(0.55 0.22 300 / 0.1); }
	.process-step-design-icon-text { color: oklch(0.55 0.22 300); }
	.process-step-design-card:hover { border-color: oklch(0.55 0.22 300 / 0.3); }
	:global(.dark) .process-step-design-icon { background: oklch(0.65 0.20 300 / 0.2); }
	:global(.dark) .process-step-design-icon-text { color: oklch(0.72 0.18 300); }

	/* Develop - Teal */
	.process-step-develop-bg { background: oklch(0.6 0.18 180); }
	.process-step-develop-shadow { box-shadow: 0 8px 24px oklch(0.6 0.18 180 / 0.35); }
	.process-step-develop-icon { background: oklch(0.6 0.18 180 / 0.1); }
	.process-step-develop-icon-text { color: oklch(0.6 0.18 180); }
	.process-step-develop-card:hover { border-color: oklch(0.6 0.18 180 / 0.3); }
	:global(.dark) .process-step-develop-icon { background: oklch(0.7 0.15 180 / 0.2); }
	:global(.dark) .process-step-develop-icon-text { color: oklch(0.75 0.14 180); }

	/* Launch - Green */
	.process-step-launch-bg { background: oklch(0.6 0.20 145); }
	.process-step-launch-shadow { box-shadow: 0 8px 24px oklch(0.6 0.20 145 / 0.35); }
	.process-step-launch-icon { background: oklch(0.6 0.20 145 / 0.1); }
	.process-step-launch-icon-text { color: oklch(0.6 0.20 145); }
	.process-step-launch-card:hover { border-color: oklch(0.6 0.20 145 / 0.3); }
	:global(.dark) .process-step-launch-icon { background: oklch(0.7 0.18 145 / 0.2); }
	:global(.dark) .process-step-launch-icon-text { color: oklch(0.75 0.15 145); }

	/* ===== Testimonial gradient heading ===== */
	.testimonial-gradient-text {
		background: linear-gradient(135deg, oklch(0.7 0.16 85), oklch(0.65 0.18 50));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	:global(.dark) .testimonial-gradient-text {
		background: linear-gradient(135deg, oklch(0.8 0.14 85), oklch(0.78 0.15 50));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* ===== FAQ gradient heading ===== */
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

	/* ===== CTA gradient heading ===== */
	.cta-gradient-text {
		background: linear-gradient(135deg, oklch(0.55 0.24 260), oklch(0.50 0.20 160));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	:global(.dark) .cta-gradient-text {
		background: linear-gradient(135deg, oklch(0.72 0.20 260), oklch(0.68 0.18 160));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* CTA animated rings */
	.cta-ring-1 {
		animation: cta-pulse 4s ease-in-out infinite;
	}
	.cta-ring-2 {
		animation: cta-pulse 6s ease-in-out infinite reverse;
	}
	@keyframes cta-pulse {
		0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
		50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.8; }
	}

	/* ===== Reduced motion ===== */
	@media (prefers-reduced-motion: reduce) {
		:global(*) {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}
</style>
