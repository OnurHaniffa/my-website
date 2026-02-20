<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Container, Section } from '$lib/components/layout';
	import { InView } from '$lib/components/ui/animations';
	import { t, getLocale, getLocalePath } from '$lib/i18n/index.svelte';

	const locale = $derived(getLocale());
	const isEn = $derived(locale === 'en');

	const faqs = $derived(isEn ? [
		{
			question: 'How much does a website cost in Istanbul?',
			answer: 'Every project is different. After our discovery call, I provide a fixed quote based on your specific needs. Most projects range from affordable starter sites to comprehensive custom builds. No hourly surprises or hidden fees.'
		},
		{
			question: 'How long does it take to build a website?',
			answer: 'Most websites launch within 2-6 weeks depending on complexity. Simple sites can be done faster, while larger projects with custom features may take a bit longer. I always provide a clear timeline upfront.'
		},
		{
			question: 'Do you work with businesses outside Istanbul?',
			answer: 'Absolutely! While I am based in Istanbul, I work with clients worldwide. Communication is done remotely via video calls, email, and project management tools. Time zones are never an issue.'
		},
		{
			question: 'Will my website be optimized for Google?',
			answer: 'Yes, every website I build includes SEO best practices: fast loading speeds, mobile responsiveness, proper meta tags, structured data, and clean code. This gives you the best foundation to rank in search results.'
		},
		{
			question: 'Can you redesign my existing website?',
			answer: 'Yes! Website redesigns are one of my core services. I audit your current site, identify what works and what does not, then create a modern, high-performing version that better serves your business goals.'
		}
	] : [
		{
			question: '\u0130stanbul\'da bir web sitesi ne kadara mal olur?',
			answer: 'Her proje farklıdır. Ke\u015fif g\u00f6r\u00fc\u015fmemizden sonra, \u00f6zel ihtiya\u00e7larınıza g\u00f6re sabit bir fiyat teklifi sunuyorum. Saatlik s\u00fcrpriz veya gizli \u00fccret yok.'
		},
		{
			question: 'Bir web sitesi yapmak ne kadar s\u00fcrer?',
			answer: '\u00c7o\u011fu web sitesi karma\u015fıklı\u011fına ba\u011flı olarak 2-6 hafta i\u00e7inde yayına alınır. Basit siteler daha hızlı tamamlanabilir, \u00f6zel \u00f6zellikler gerektiren b\u00fcy\u00fck projeler biraz daha uzun s\u00fcrebilir.'
		},
		{
			question: '\u0130stanbul dı\u015fındaki i\u015fletmelerle \u00e7alı\u015fıyor musunuz?',
			answer: 'Kesinlikle! \u0130stanbul merkezli olmama ra\u011fmen d\u00fcnya genelinde m\u00fc\u015fterilerle \u00e7alı\u015fıyorum. \u0130leti\u015fim g\u00f6r\u00fcnt\u00fcl\u00fc aramalar, e-posta ve proje y\u00f6netim ara\u00e7ları \u00fczerinden yapılır.'
		},
		{
			question: 'Web sitem Google i\u00e7in optimize edilecek mi?',
			answer: 'Evet, in\u015fa etti\u011fim her web sitesi SEO en iyi uygulamalarını i\u00e7erir: hızlı y\u00fckleme, mobil uyumluluk, do\u011fru meta etiketleri, yapılandırılmı\u015f veri ve temiz kod.'
		},
		{
			question: 'Mevcut web sitemi yeniden tasarlayabilir misiniz?',
			answer: 'Evet! Web sitesi yenileme temel hizmetlerimden biridir. Mevcut sitenizi denetler, neyin i\u015fe yaradı\u011fını belirler ve i\u015f hedeflerinize daha iyi hizmet eden modern, y\u00fcksek performanslı bir s\u00fcr\u00fcm olu\u015ftururum.'
		}
	]);

	let openFaq = $state<number | null>(null);

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}
</script>

<svelte:head>
	{#if isEn}
		<title>Web Designer Istanbul | Professional Website Design & Development</title>
		<meta name="description" content="Looking for a professional web designer in Istanbul? I create fast, modern, SEO-optimized websites that convert visitors into customers. Custom design, mobile-first, free consultation. Get your website built by an Istanbul-based expert." />
		<meta property="og:title" content="Web Designer Istanbul | Professional Website Design & Development" />
		<meta property="og:description" content="Professional web designer in Istanbul. Fast, modern websites that convert visitors into customers. Free consultation." />
	{:else}
		<title>İstanbul Web Tasarımcı | Profesyonel Web Sitesi Tasarım & Geliştirme</title>
		<meta name="description" content="İstanbul'da profesyonel web tasarımcı mı arıyorsunuz? Ziyaretçileri müşteriye dönüştüren hızlı, modern, SEO optimize web siteleri yapıyorum. Özel tasarım, mobil uyumlu, ücretsiz danışmanlık." />
		<meta property="og:title" content="İstanbul Web Tasarımcı | Profesyonel Web Sitesi Tasarım & Geliştirme" />
		<meta property="og:description" content="İstanbul'da profesyonel web tasarımcı. Hızlı, modern web siteleri. Ücretsiz danışmanlık." />
	{/if}

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		name: 'Onur Haniffa - Web Design Istanbul',
		url: 'https://onurhaniffa.com/istanbul-web-design/',
		image: 'https://onurhaniffa.com/og-image.png',
		description: isEn
			? 'Professional web designer in Istanbul creating fast, modern websites that convert visitors into customers.'
			: 'İstanbul\'da profesyonel web tasarımcı. Ziyaretçileri müşteriye dönüştüren hızlı, modern web siteleri.',
		email: 'contact@onurhaniffa.com',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Istanbul',
			addressRegion: 'Istanbul',
			addressCountry: 'TR'
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: 41.0082,
			longitude: 28.9784
		},
		areaServed: [
			{ '@type': 'City', name: 'Istanbul' },
			{ '@type': 'Country', name: 'Turkey' },
			{ '@type': 'Continent', name: 'Europe' }
		],
		serviceType: ['Web Design', 'Web Development', 'Website Redesign', 'SEO'],
		priceRange: '$$'
	})}</script>`}

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map(faq => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer
			}
		}))
	})}</script>`}
</svelte:head>

<!-- Hero -->
<Section padding="none" class="relative overflow-hidden">
	<div class="absolute inset-0 -z-10">
		<div class="absolute inset-0 bg-gradient-to-br from-background via-background to-muted"></div>
		<div class="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] lg:w-[800px] lg:h-[800px] bg-primary/10 rounded-full"></div>
		<div class="absolute -bottom-[150px] -left-[150px] w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] bg-accent/10 rounded-full"></div>
	</div>

	<Container class="relative pt-36 pb-24 lg:pt-44 lg:pb-36">
		<div class="max-w-4xl">
			<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
				<span class="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
				{isEn ? 'Istanbul-Based Web Designer' : 'İstanbul Merkezli Web Tasarımcı'}
			</Badge>

			<h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
				{#if isEn}
					Professional <span class="text-primary">Web Design</span> in Istanbul
				{:else}
					İstanbul'da Profesyonel <span class="text-primary">Web Tasarım</span>
				{/if}
			</h1>

			<p class="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
				{#if isEn}
					I design and develop fast, modern websites for businesses in Istanbul and worldwide. Every site is custom-built, SEO-optimized, and designed to convert visitors into customers.
				{:else}
					İstanbul ve dünya genelindeki işletmeler için hızlı, modern web siteleri tasarlıyor ve geliştiriyorum. Her site özel yapım, SEO optimize ve ziyaretçileri müşteriye dönüştürmek için tasarlanmıştır.
				{/if}
			</p>

			<div class="flex flex-wrap gap-4">
				<Button size="lg" href={getLocalePath('/contact')} class="group text-base px-10 py-7 rounded-full shadow-2xl shadow-primary/40 hover:shadow-primary/50 hover:scale-[1.02] font-semibold transition-all duration-300">
					{isEn ? 'Get a Free Quote' : 'Ücretsiz Teklif Alın'}
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
				</Button>
				<Button size="lg" variant="ghost" href={getLocalePath('/work')} class="text-base px-8 py-6 rounded-full border border-border/60 hover:bg-foreground/5 transition-colors duration-300">
					{isEn ? 'View My Work' : 'Çalışmalarımı Gör'}
				</Button>
			</div>
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- Why Istanbul -->
<Section padding="lg" background="muted">
	<Container>
		<div class="text-center max-w-2xl mx-auto mb-16">
			<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
				{isEn ? 'Local Expertise' : 'Yerel Uzmanlık'}
			</Badge>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				{isEn ? 'Why Choose an Istanbul-Based Web Designer?' : 'Neden İstanbul Merkezli Bir Web Tasarımcı Seçmelisiniz?'}
			</h2>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			<InView animation="fade-up">
				<div class="p-8 rounded-2xl bg-card border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
					<div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
					</div>
					<h3 class="text-xl font-bold mb-3">{isEn ? 'Local Market Knowledge' : 'Yerel Pazar Bilgisi'}</h3>
					<p class="text-muted-foreground">
						{isEn
							? 'I understand the Turkish market, local business culture, and what resonates with customers in Istanbul and Turkey. Your website will speak directly to your target audience.'
							: 'Türk pazarını, yerel iş kültürünü ve İstanbul\'daki müşterilerin beklentilerini anlıyorum. Web siteniz doğrudan hedef kitlenize hitap edecek.'}
					</p>
				</div>
			</InView>

			<InView animation="fade-up" delay={100}>
				<div class="p-8 rounded-2xl bg-card border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
					<div class="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
					</div>
					<h3 class="text-xl font-bold mb-3">{isEn ? 'Bilingual Communication' : 'İki Dilli İletişim'}</h3>
					<p class="text-muted-foreground">
						{isEn
							? 'Fluent in both Turkish and English, I build websites that work perfectly in both languages. Perfect for businesses targeting local and international customers.'
							: 'Türkçe ve İngilizce akıcı olarak iletişim kuruyorum. Yerel ve uluslararası müşterileri hedefleyen işletmeler için iki dilde mükemmel çalışan web siteleri yapıyorum.'}
					</p>
				</div>
			</InView>

			<InView animation="fade-up" delay={200}>
				<div class="p-8 rounded-2xl bg-card border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
					<div class="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600 dark:text-green-400"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
					</div>
					<h3 class="text-xl font-bold mb-3">{isEn ? 'Lightning-Fast Websites' : 'Yıldırım Hızında Web Siteleri'}</h3>
					<p class="text-muted-foreground">
						{isEn
							? 'Built with SvelteKit and modern technology, your website loads instantly. Fast sites rank higher on Google and convert more visitors into customers.'
							: 'SvelteKit ve modern teknoloji ile inşa edilen web siteniz anında yüklenir. Hızlı siteler Google\'da daha üst sıralarda yer alır ve daha fazla ziyaretçiyi müşteriye dönüştürür.'}
					</p>
				</div>
			</InView>
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- Services Overview -->
<Section padding="lg">
	<Container>
		<div class="text-center max-w-2xl mx-auto mb-16">
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				{isEn ? 'Web Design Services in Istanbul' : 'İstanbul\'da Web Tasarım Hizmetleri'}
			</h2>
			<p class="mt-4 text-lg text-muted-foreground">
				{isEn
					? 'From brand-new websites to complete redesigns, I offer end-to-end web solutions for businesses of all sizes.'
					: 'Sıfırdan web sitelerinden komple yeniden tasarıma kadar, her büyüklükteki işletme için uçtan uca web çözümleri sunuyorum.'}
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each [
				{
					titleEn: 'Custom Website Design',
					titleTr: 'Özel Web Sitesi Tasarımı',
					descEn: 'Unique, conversion-focused websites designed from scratch. No templates, no generic solutions.',
					descTr: 'Sıfırdan tasarlanmış benzersiz, dönüşüm odaklı web siteleri. Şablon yok, genel çözümler yok.',
					icon: 'M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z'
				},
				{
					titleEn: 'Website Redesign',
					titleTr: 'Web Sitesi Yenileme',
					descEn: 'Transform your outdated site into a modern, high-performing conversion machine.',
					descTr: 'Eski web sitenizi modern, yüksek performanslı bir dönüşüm makinesine dönüştürün.',
					icon: 'M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5 M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16 M16 16h5v5'
				},
				{
					titleEn: 'SEO Optimization',
					titleTr: 'SEO Optimizasyonu',
					descEn: 'Every site is built with SEO best practices so you rank higher in Google search results.',
					descTr: 'Her site, Google arama sonuçlarında daha üst sıralarda yer almanız için SEO en iyi uygulamalarıyla inşa edilir.',
					icon: 'M11 11 8 8m0 0H5m3 0v3 M21 21l-3-3m0 0h-3m3 0v-3 M3 21l3-3m0 0h3m-3 0v-3 M21 3l-3 3m0 0h3m-3 0V3'
				},
				{
					titleEn: 'Mobile-First Design',
					titleTr: 'Önce Mobil Tasarım',
					descEn: 'Responsive websites that look and work perfectly on every device, from phones to desktops.',
					descTr: 'Telefonlardan masaüstüne kadar her cihazda mükemmel görünen ve çalışan duyarlı web siteleri.',
					icon: 'M5 2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M12 18h.01'
				},
				{
					titleEn: 'E-Commerce Websites',
					titleTr: 'E-Ticaret Web Siteleri',
					descEn: 'Online stores that make it easy for customers to browse, buy, and come back for more.',
					descTr: 'Müşterilerin kolayca göz atmasını, satın almasını ve tekrar gelmesini sağlayan online mağazalar.',
					icon: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0'
				},
				{
					titleEn: 'Ongoing Support',
					titleTr: 'Sürekli Destek',
					descEn: 'Your site stays fast, secure, and up-to-date with regular maintenance and priority support.',
					descTr: 'Düzenli bakım ve öncelikli destek ile siteniz hızlı, güvenli ve güncel kalır.',
					icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10 M9 12l2 2 4-4'
				}
			] as service}
				<InView animation="fade-up">
					<div class="group p-6 rounded-2xl bg-card border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
						<div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary group-hover:text-white transition-colors"><path d={service.icon}/></svg>
						</div>
						<h3 class="text-lg font-bold mb-2">{isEn ? service.titleEn : service.titleTr}</h3>
						<p class="text-sm text-muted-foreground">{isEn ? service.descEn : service.descTr}</p>
					</div>
				</InView>
			{/each}
		</div>

		<div class="mt-12 text-center">
			<Button variant="outline" href={getLocalePath('/services')} class="group px-8 py-6 rounded-full text-base border-2 hover:border-primary/50">
				{isEn ? 'View All Services' : 'Tüm Hizmetleri Gör'}
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
			</Button>
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- FAQ Section -->
<Section padding="lg" background="muted">
	<Container size="content">
		<InView animation="fade-up" class="text-center mb-10">
			<h2 class="text-2xl sm:text-3xl font-bold tracking-tight">
				{isEn ? 'Frequently Asked Questions' : 'Sık Sorulan Sorular'}
			</h2>
			<p class="mt-3 text-muted-foreground">
				{isEn ? 'Common questions about web design services in Istanbul' : 'İstanbul\'da web tasarım hizmetleri hakkında sık sorulan sorular'}
			</p>
		</InView>

		<div class="space-y-4">
			{#each faqs as faq, i}
				<InView animation="fade-up" delay={i * 50}>
					<div class="overflow-hidden rounded-xl border bg-card transition-all duration-200 {openFaq === i ? 'border-primary/30 shadow-md' : 'border-border hover:border-primary/20'}">
						<button
							onclick={() => toggleFaq(i)}
							aria-expanded={openFaq === i}
							class="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
						>
							<span class="font-medium text-sm sm:text-base">{faq.question}</span>
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
							><path d="m6 9 6 6 6-6"/></svg>
						</button>
						{#if openFaq === i}
							<div class="px-5 pb-4">
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

<!-- CTA -->
<Section padding="lg">
	<Container size="content">
		<div class="text-center">
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
				{isEn ? 'Ready to Get Started?' : 'Başlamaya Hazır mısınız?'}
			</h2>
			<p class="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
				{isEn
					? 'Let\'s talk about your project. I offer free consultations and respond within 24 hours.'
					: 'Projeniz hakkında konuşalım. Ücretsiz danışmanlık sunuyorum ve 24 saat içinde yanıt veriyorum.'}
			</p>
			<Button size="lg" href={getLocalePath('/contact')} class="group text-base px-10 py-7 rounded-full shadow-2xl shadow-primary/40 hover:shadow-primary/50 hover:scale-[1.02] font-semibold transition-all duration-300">
				{isEn ? 'Start Your Project' : 'Projenizi Başlatın'}
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
			</Button>
		</div>
	</Container>
</Section>
