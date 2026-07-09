<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Container, Section } from '$lib/components/layout';
	import { InView } from '$lib/components/ui/animations';

	const whatsappNumber = '905428324550';

	// Estimate model — mirrors the real pricing tiers used across the site
	// (web-sitesi-fiyatlari + the cost blog post). Ranges in TL.
	type Opt = { id: string; label: string; desc?: string; min: number; max: number };

	const siteTypes: Opt[] = [
		{ id: 'landing', label: 'Tek Sayfa / Landing', desc: 'Tek sayfa, kampanya veya tanıtım', min: 15000, max: 30000 },
		{ id: 'kurumsal', label: 'Kurumsal Site', desc: '5-10 sayfa, çok bölümlü işletme sitesi', min: 30000, max: 60000 },
		{ id: 'cms', label: 'Gelişmiş Site + CMS', desc: 'Blog, kendi yönetebileceğin içerik', min: 50000, max: 100000 },
		{ id: 'eticaret', label: 'E-Ticaret Sitesi', desc: 'Online satış, ödeme, ürün yönetimi', min: 75000, max: 180000 },
		{ id: 'uygulama', label: 'Özel Web Uygulaması', desc: 'Panel, veritabanı, entegrasyon', min: 120000, max: 400000 }
	];

	const features: Opt[] = [
		{ id: 'multilang', label: 'Çok dilli (TR + İngilizce)', min: 8000, max: 20000 },
		{ id: 'blog', label: 'Blog / içerik yönetimi (CMS)', min: 5000, max: 15000 },
		{ id: 'booking', label: 'Online randevu / rezervasyon', min: 5000, max: 15000 },
		{ id: 'payment', label: 'Online ödeme altyapısı', min: 10000, max: 25000 },
		{ id: 'seo', label: 'Gelişmiş SEO kurulumu', min: 8000, max: 20000 },
		{ id: 'design', label: 'Özel tasarım & animasyon', min: 5000, max: 15000 },
		{ id: 'content', label: 'Profesyonel içerik & metin yazımı', min: 5000, max: 20000 }
	];

	let selectedType = $state('kurumsal');
	let selected = $state<Record<string, boolean>>({});

	const typeObj = $derived(siteTypes.find((t) => t.id === selectedType)!);
	const chosenFeatures = $derived(features.filter((f) => selected[f.id]));
	const estMin = $derived(typeObj.min + chosenFeatures.reduce((s, f) => s + f.min, 0));
	const estMax = $derived(typeObj.max + chosenFeatures.reduce((s, f) => s + f.max, 0));

	const fmt = (n: number) => n.toLocaleString('tr-TR');

	const whatsappUrl = $derived.by(() => {
		const feats = chosenFeatures.map((f) => f.label).join(', ') || 'ek özellik yok';
		const msg = `Merhaba! Maliyet hesaplayıcıyı kullandım:\n• Site tipi: ${typeObj.label}\n• Özellikler: ${feats}\n• Tahmini aralık: ${fmt(estMin)} - ${fmt(estMax)} TL\nNet teklif alabilir miyim?`;
		return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
	});

	function toggle(id: string) {
		selected = { ...selected, [id]: !selected[id] };
	}

	let showStickyCta = $state(false);
	let heroEl: HTMLDivElement;
	onMount(() => {
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const onScroll = () => { showStickyCta = window.scrollY > 700; };
		window.addEventListener('scroll', onScroll, { passive: true });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let tl: any = null;
		if (!prefersReduced && heroEl) {
			import('gsap').then(({ gsap }) => {
				if (!heroEl) return;
				gsap.from(heroEl, { opacity: 0, y: 24, duration: 0.7, ease: 'power2.out' });
			}).catch(() => {});
		}
		return () => { window.removeEventListener('scroll', onScroll); tl?.kill?.(); };
	});

	const faqs = [
		{ q: 'Bu hesaplayıcı gerçek fiyatı veriyor mu?', a: 'Tahmini bir aralık veriyor — projenin gerçek kapsamına göre değişir. Net fiyat, kısa bir keşif görüşmesinden sonra sözleşmede sabitlenir. Saatlik sürpriz yok.' },
		{ q: 'Fiyatlar neye göre belirleniyor?', a: 'Sayfa sayısı, tasarımın özgünlüğü, içerik miktarı, entegrasyonlar (ödeme, randevu, çok dil) ve SEO kapsamı ana etkenler. Hesaplayıcı bu kalemleri aralık olarak topluyor.' },
		{ q: 'Hosting ve alan adı dahil mi?', a: 'Bu tahmin geliştirme maliyetini gösterir. Alan adı (yıllık ~200-1.500 TL) ve hosting (yıllık ~1.200-12.000 TL) ayrı, küçük kalemlerdir ve sizin adınıza alınır.' },
		{ q: 'Ödemeyi nasıl yapıyoruz?', a: 'Genelde başlangıçta bir ön ödeme, kalan kısım teslimde. Net plan teklifte yazılı olur.' }
	];
	let openFaq = $state<number | null>(null);
</script>

<svelte:head>
	<title>Web Sitesi Maliyet Hesaplama 2026 | Anında Tahmini Fiyat</title>
	<meta name="description" content="Web sitesi maliyetini saniyeler içinde hesaplayın. Site tipini ve özellikleri seçin, 2026 güncel TL fiyat aralığını anında görün. Ücretsiz, kayıt yok." />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
	}).replace(/</g, '\\u003c')}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'Web Sitesi Maliyet Hesaplayıcı',
		applicationCategory: 'BusinessApplication',
		operatingSystem: 'Web',
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
		provider: { '@id': 'https://onurhaniffa.com/#business' }
	}).replace(/</g, '\\u003c')}</script>`}
</svelte:head>

<!-- HERO + CALCULATOR -->
<Section padding="none" class="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		<div class="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-background to-muted/80"></div>
		<div class="absolute -top-[120px] -right-[160px] w-[760px] h-[760px] calc-glow-accent rounded-full"></div>
		<div class="absolute -bottom-[260px] -left-[220px] w-[720px] h-[720px] calc-glow-primary rounded-full"></div>
	</div>

	<Container>
		<div bind:this={heroEl} class="max-w-2xl mx-auto text-center mb-10">
			<p class="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
				<span class="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" aria-hidden="true"></span>
				Ücretsiz · Kayıt yok
			</p>
			<h1 class="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl leading-[1.08]">
				Web Sitesi Maliyetini Anında Hesapla
			</h1>
			<p class="mt-5 text-lg text-muted-foreground leading-relaxed">
				Site tipini ve istediğin özellikleri seç — 2026 güncel TL fiyat aralığını saniyesinde gör. Saatlik sürpriz yok, net rakam.
			</p>
		</div>

		<div class="grid lg:grid-cols-5 gap-6 lg:gap-8 max-w-6xl mx-auto">
			<!-- Inputs -->
			<div class="lg:col-span-3 space-y-7">
				<!-- Site type -->
				<div>
					<h2 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">1. Ne tür bir site?</h2>
					<div class="grid sm:grid-cols-2 gap-3">
						{#each siteTypes as t}
							<button
								type="button"
								onclick={() => (selectedType = t.id)}
								aria-pressed={selectedType === t.id}
								class="text-left p-4 rounded-xl border-2 transition-all {selectedType === t.id ? 'border-primary bg-primary/5 shadow-md' : 'border-border/60 bg-card hover:border-primary/40'}"
							>
								<div class="flex items-center justify-between gap-2 mb-1">
									<span class="font-bold text-sm">{t.label}</span>
									<span class="shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center {selectedType === t.id ? 'border-primary bg-primary' : 'border-border'}">
										{#if selectedType === t.id}<span class="w-1.5 h-1.5 rounded-full bg-white"></span>{/if}
									</span>
								</div>
								{#if t.desc}<p class="text-xs text-muted-foreground leading-snug">{t.desc}</p>{/if}
								<p class="text-xs font-semibold text-primary mt-2">{fmt(t.min)}–{fmt(t.max)} TL</p>
							</button>
						{/each}
					</div>
				</div>

				<!-- Features -->
				<div>
					<h2 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">2. Ek özellikler (opsiyonel)</h2>
					<div class="grid sm:grid-cols-2 gap-2.5">
						{#each features as f}
							<button
								type="button"
								onclick={() => toggle(f.id)}
								aria-pressed={!!selected[f.id]}
								class="flex items-center gap-3 text-left p-3 rounded-xl border transition-all {selected[f.id] ? 'border-primary/50 bg-primary/5' : 'border-border/60 bg-card hover:border-primary/30'}"
							>
								<span class="shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center {selected[f.id] ? 'border-primary bg-primary text-white' : 'border-border'}">
									{#if selected[f.id]}
										<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
									{/if}
								</span>
								<span class="text-sm font-medium leading-snug">{f.label}</span>
							</button>
						{/each}
					</div>
				</div>
			</div>

			<!-- Result panel -->
			<div class="lg:col-span-2">
				<div class="lg:sticky lg:top-24 rounded-2xl border-2 border-primary/30 bg-card shadow-xl overflow-hidden">
					<div class="p-6 border-b border-border/60 bg-gradient-to-br from-primary/[0.07] to-transparent">
						<p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Tahmini maliyet</p>
						<p class="text-3xl sm:text-4xl font-black tracking-tight tabular-nums">
							{fmt(estMin)}–{fmt(estMax)}
						</p>
						<p class="text-sm text-muted-foreground mt-1">TL <span class="text-xs">(geliştirme, KDV hariç)</span></p>
					</div>
					<div class="p-6 space-y-4">
						<div class="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
							<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
							<span>Bu bir tahmini aralıktır. Net fiyat, kısa bir keşif görüşmesinden sonra sözleşmede sabitlenir.</span>
						</div>
						<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2.5 w-full px-6 py-4 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-base shadow-xl shadow-[#25D366]/30 hover:scale-[1.02] transition-all">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
							Net Teklif Al (WhatsApp)
						</a>
						<a href="/web-sitesi-fiyatlari/" class="block text-center text-sm font-medium text-primary hover:underline">
							Detaylı fiyat kademelerini gör →
						</a>
					</div>
				</div>
			</div>
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- FAQ -->
<Section padding="lg" background="muted" class="relative overflow-hidden">
	<Container size="content">
		<InView animation="fade-up">
			<div class="text-center mb-10">
				<p class="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">SSS</p>
				<h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">Sık Sorulan Sorular</h2>
			</div>
		</InView>
		<div class="space-y-3 max-w-3xl mx-auto">
			{#each faqs as faq, i}
				<InView animation="fade-up" delay={i * 30}>
					<div class="overflow-hidden rounded-xl border bg-card transition-all {openFaq === i ? 'border-primary/30 shadow-md' : 'border-border'}">
						<button onclick={() => (openFaq = openFaq === i ? null : i)} aria-expanded={openFaq === i} class="w-full px-5 py-4 text-left flex items-center justify-between gap-4">
							<span class="font-medium text-sm sm:text-base">{faq.q}</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground transition-transform {openFaq === i ? 'rotate-180' : ''}"><path d="m6 9 6 6 6-6"/></svg>
						</button>
						{#if openFaq === i}
							<div class="px-5 pb-5"><p class="text-muted-foreground text-sm leading-relaxed">{faq.a}</p></div>
						{/if}
					</div>
				</InView>
			{/each}
		</div>
	</Container>
</Section>

{#if showStickyCta}
	<div class="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-border bg-card/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.12)]">
		<div class="flex items-center justify-between px-4 py-3">
			<div>
				<p class="text-sm font-semibold tabular-nums">{fmt(estMin)}–{fmt(estMax)} TL</p>
				<p class="text-xs text-muted-foreground">tahmini maliyet</p>
			</div>
			<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-lg shadow-[#25D366]/30">
				Net Teklif Al
			</a>
		</div>
	</div>
{/if}

<style>
</style>
