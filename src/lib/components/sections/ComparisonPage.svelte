<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Container, Section } from '$lib/components/layout';
	import { InView } from '$lib/components/ui/animations';
	import type { Comparison } from '$lib/data/comparisons';

	let { comparison }: { comparison: Comparison } = $props();

	const whatsappNumber = '905428324550';
	const whatsappUrl = $derived(
		`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(comparison.whatsappPrefill)}`
	);

	let showStickyCta = $state(false);
	let openFaq = $state<number | null>(null);
	let heroContent: HTMLDivElement;
	let heroTable: HTMLDivElement;

	function toggleFaq(i: number) {
		openFaq = openFaq === i ? null : i;
	}

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const handleScroll = () => {
			showStickyCta = window.scrollY > 600;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let heroTl: any = null;
		if (!prefersReducedMotion && heroContent && heroTable) {
			import('gsap')
				.then(({ gsap }) => {
					if (!heroContent || !heroTable) return;
					gsap.set([heroContent, heroTable], { opacity: 0, y: 30 });
					heroTl = gsap.timeline({ delay: 0.1 });
					heroTl
						.to(heroContent, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
						.to(heroTable, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');
				})
				.catch(() => {});
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
			heroTl?.kill?.();
		};
	});
</script>

<svelte:head>
	<title>{comparison.metaTitle}</title>
	<meta name="description" content={comparison.metaDescription} />

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: comparison.faq.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') }
		}))
	}).replace(/</g, '\\u003c')}</script>`}

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Article',
		'@id': `https://onurhaniffa.com/${comparison.slug}/#article`,
		headline: comparison.heroH1,
		description: comparison.metaDescription,
		author: { '@id': 'https://onurhaniffa.com/#business' },
		publisher: { '@id': 'https://onurhaniffa.com/#business' }
	}).replace(/</g, '\\u003c')}</script>`}
</svelte:head>

<!-- HERO -->
<Section padding="none" class="relative overflow-hidden min-h-[calc(100vh-85px)] flex flex-col justify-center">
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		<div class="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-background to-muted/80"></div>
		<div class="absolute -top-[100px] -left-[150px] w-[800px] h-[700px] cmp-glow-topleft rounded-full"></div>
		<div class="absolute -top-[200px] -right-[200px] w-[900px] h-[900px] cmp-glow-accent rounded-full"></div>
		<div class="absolute -bottom-[300px] -left-[300px] w-[800px] h-[800px] cmp-glow-primary rounded-full"></div>
	</div>

	<Container class="relative pt-12 pb-12 lg:pt-20 lg:pb-20">
		<div class="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
			<div bind:this={heroContent} class="space-y-6 lg:col-span-2">
				<Badge variant="outline" class="border-primary/40 text-primary bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
					<span class="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" aria-hidden="true"></span>
					Karşılaştırma · 2026
				</Badge>

				<h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.05]">
					{comparison.optionA.name}
					<span class="text-muted-foreground font-light text-3xl sm:text-4xl lg:text-5xl">vs</span>
					<br class="hidden sm:block" />
					<span class="cmp-gradient-text">{comparison.optionB.name}</span>
				</h1>

				<p class="text-lg text-muted-foreground leading-relaxed">
					{comparison.heroSubtitle}
				</p>

				<div class="flex flex-wrap gap-4 pt-2">
					<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-base shadow-2xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 hover:scale-[1.02] transition-all duration-300">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
						Bana Uygun Olanı Konuşalım
					</a>
					<Button size="lg" variant="ghost" href="#karsilastirma" class="text-base px-8 py-4 rounded-full border border-border/60 hover:bg-foreground/5">Karşılaştırmayı Gör</Button>
				</div>
			</div>

			<div bind:this={heroTable} class="lg:col-span-3 grid sm:grid-cols-2 gap-4">
				<!-- Option A card -->
				<div class="rounded-2xl bg-card border-2 border-border/60 p-6 hover:border-primary/40 transition-colors">
					<div class="flex items-center gap-2 mb-3">
						<div class="w-2 h-2 rounded-full bg-amber-500"></div>
						<span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Seçenek A</span>
					</div>
					<h2 class="text-2xl font-bold mb-2">{comparison.optionA.name}</h2>
					<p class="text-sm text-muted-foreground leading-relaxed">{comparison.optionA.tagline}</p>
				</div>

				<!-- Option B card -->
				<div class="rounded-2xl bg-card border-2 border-primary/40 p-6 shadow-md relative">
					<div class="absolute -top-2 right-4 px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider">Genelde Önerilen</div>
					<div class="flex items-center gap-2 mb-3">
						<div class="w-2 h-2 rounded-full bg-emerald-500"></div>
						<span class="text-xs font-semibold uppercase tracking-wider text-primary">Seçenek B</span>
					</div>
					<h2 class="text-2xl font-bold mb-2">{comparison.optionB.name}</h2>
					<p class="text-sm text-muted-foreground leading-relaxed">{comparison.optionB.tagline}</p>
				</div>
			</div>
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- COMPARISON TABLE -->
<Section padding="lg" id="karsilastirma" class="relative overflow-hidden">
	<Container size="content">
		<InView animation="fade-up">
			<div class="text-center mb-12">
				<Badge variant="outline" class="mb-5 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					Yan Yana Karşılaştırma
				</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
					{comparison.optionA.name} ve {comparison.optionB.name} <span class="cmp-gradient-text">Hangi Kriterlerde Farklı?</span>
				</h2>
			</div>
		</InView>

		<!-- Desktop table -->
		<InView animation="fade-up">
			<div class="hidden md:block overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
				<table class="w-full">
					<thead>
						<tr class="bg-muted/50 border-b border-border">
							<th class="text-left px-6 py-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground w-1/4">Kriter</th>
							<th class="text-left px-6 py-4 text-sm font-bold w-3/8">
								<div class="flex items-center gap-2">
									<div class="w-2 h-2 rounded-full bg-amber-500"></div>
									{comparison.optionA.name}
								</div>
							</th>
							<th class="text-left px-6 py-4 text-sm font-bold w-3/8">
								<div class="flex items-center gap-2">
									<div class="w-2 h-2 rounded-full bg-emerald-500"></div>
									{comparison.optionB.name}
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{#each comparison.comparisonRows as row, i}
							<tr class="border-b border-border/40 last:border-0 {i % 2 === 1 ? 'bg-muted/20' : ''}">
								<td class="px-6 py-4 text-sm font-medium align-top">{row.aspect}</td>
								<td class="px-6 py-4 text-sm text-muted-foreground align-top leading-relaxed">{row.a}</td>
								<td class="px-6 py-4 text-sm text-foreground align-top leading-relaxed">{row.b}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</InView>

		<!-- Mobile stacked cards -->
		<div class="md:hidden space-y-4">
			{#each comparison.comparisonRows as row, i}
				<InView animation="fade-up" delay={i * 30}>
					<div class="rounded-xl border border-border bg-card p-4">
						<p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{row.aspect}</p>
						<div class="space-y-3">
							<div class="flex gap-3">
								<div class="shrink-0 mt-1">
									<div class="w-2 h-2 rounded-full bg-amber-500"></div>
								</div>
								<div>
									<p class="text-xs font-bold mb-0.5">{comparison.optionA.name}</p>
									<p class="text-sm text-muted-foreground leading-relaxed">{row.a}</p>
								</div>
							</div>
							<div class="flex gap-3">
								<div class="shrink-0 mt-1">
									<div class="w-2 h-2 rounded-full bg-emerald-500"></div>
								</div>
								<div>
									<p class="text-xs font-bold mb-0.5">{comparison.optionB.name}</p>
									<p class="text-sm leading-relaxed">{row.b}</p>
								</div>
							</div>
						</div>
					</div>
				</InView>
			{/each}
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- WHEN TO CHOOSE WHICH -->
<Section padding="lg" background="muted" class="relative overflow-hidden">
	<Container>
		<InView animation="fade-up">
			<div class="text-center mb-12">
				<Badge variant="outline" class="mb-5 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					Karar Rehberi
				</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
					Hangi Senaryoda <span class="cmp-gradient-text">Hangisi Daha Mantıklı?</span>
				</h2>
			</div>
		</InView>

		<div class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
			<InView animation="fade-up">
				<div class="h-full p-7 rounded-2xl bg-card border-2 border-amber-500/30 shadow-sm">
					<div class="flex items-center gap-3 mb-5">
						<div class="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
						</div>
						<div>
							<p class="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">Seçenek A</p>
							<h3 class="text-xl font-bold">{comparison.whenToChooseA.headline}</h3>
						</div>
					</div>
					<ul class="space-y-3">
						{#each comparison.whenToChooseA.reasons as reason}
							<li class="flex items-start gap-3 text-sm">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="shrink-0 mt-0.5 text-amber-500" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
								<span class="leading-relaxed">{reason}</span>
							</li>
						{/each}
					</ul>
				</div>
			</InView>

			<InView animation="fade-up" delay={80}>
				<div class="h-full p-7 rounded-2xl bg-card border-2 border-primary/40 shadow-md">
					<div class="flex items-center gap-3 mb-5">
						<div class="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
						</div>
						<div>
							<p class="text-xs font-semibold uppercase tracking-wider text-primary">Seçenek B</p>
							<h3 class="text-xl font-bold">{comparison.whenToChooseB.headline}</h3>
						</div>
					</div>
					<ul class="space-y-3">
						{#each comparison.whenToChooseB.reasons as reason}
							<li class="flex items-start gap-3 text-sm">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="shrink-0 mt-0.5 text-emerald-500" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
								<span class="leading-relaxed">{reason}</span>
							</li>
						{/each}
					</ul>
				</div>
			</InView>
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- HONEST TAKE -->
<Section padding="lg" class="relative overflow-hidden">
	<Container size="content">
		<InView animation="fade-up">
			<div class="text-center mb-10">
				<Badge variant="outline" class="mb-5 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					Tasarımcı Notu
				</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
					<span class="cmp-gradient-text">Dürüst Görüşüm</span>
				</h2>
			</div>
		</InView>

		<InView animation="fade-up" delay={100}>
			<div class="relative max-w-3xl mx-auto p-8 rounded-2xl bg-card border border-border/50 shadow-sm">
				<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" class="absolute -top-4 left-6 text-primary/30" aria-hidden="true"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
				<p class="text-base sm:text-lg text-foreground leading-relaxed">
					{comparison.honestTake}
				</p>
			</div>
		</InView>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- FAQ -->
<Section padding="lg" background="muted" class="relative overflow-hidden">
	<Container size="content">
		<InView animation="fade-up">
			<div class="text-center mb-12">
				<Badge variant="outline" class="mb-5 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					SSS
				</Badge>
				<h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
					Sık Sorulan <span class="cmp-gradient-text">Sorular</span>
				</h2>
			</div>
		</InView>

		<div class="space-y-3 max-w-3xl mx-auto">
			{#each comparison.faq as faq, i}
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
								<p class="text-muted-foreground text-sm leading-relaxed">{@html faq.a}</p>
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
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] cmp-cta-glow rounded-full"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-primary/10 cmp-ring-1"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/5 cmp-ring-2"></div>
	</div>

	<Container size="content">
		<InView animation="scale">
			<div class="relative text-center py-8">
				<div class="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-primary/20 rounded-tl-xl" aria-hidden="true"></div>
				<div class="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-primary/20 rounded-br-xl" aria-hidden="true"></div>

				<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">Karar Aşamasında mısınız?</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-3">
					Sizin Senaryonuzda <span class="cmp-gradient-text">Hangisi Daha Doğru?</span>
				</h2>
				<p class="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
					Projenizi 10 dakika konuşup hangi seçeneğin işinize uygun olduğunu söyleyebiliriz. Satış değil — danışma. Görüşme ücretsiz.
				</p>

				<div class="flex flex-wrap items-center justify-center gap-4">
					<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-base shadow-2xl shadow-[#25D366]/40 transition-all duration-300">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
						WhatsApp'tan Sorun
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
				<p class="text-sm font-semibold">Hangisi Size Uygun?</p>
				<p class="text-xs text-muted-foreground">10 dakika konuşalım</p>
			</div>
			<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-lg shadow-[#25D366]/30">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
				Soru Sor
			</a>
		</div>
	</div>
{/if}

<style>
	.cmp-glow-topleft { background: radial-gradient(ellipse, oklch(0.55 0.24 260 / 0.22) 0%, oklch(0.55 0.24 260 / 0.12) 30%, transparent 75%); }
	:global(.dark) .cmp-glow-topleft { background: radial-gradient(ellipse, oklch(0.68 0.18 260 / 0.30) 0%, oklch(0.68 0.18 260 / 0.16) 30%, transparent 75%); }
	.cmp-glow-accent { background: radial-gradient(ellipse, oklch(0.58 0.22 25 / 0.30) 0%, oklch(0.58 0.22 25 / 0.18) 25%, transparent 72%); }
	:global(.dark) .cmp-glow-accent { background: radial-gradient(ellipse, oklch(0.68 0.20 25 / 0.40) 0%, oklch(0.68 0.20 25 / 0.22) 25%, transparent 72%); }
	.cmp-glow-primary { background: radial-gradient(ellipse, oklch(0.55 0.24 260 / 0.32) 0%, oklch(0.55 0.24 260 / 0.18) 30%, transparent 75%); }
	:global(.dark) .cmp-glow-primary { background: radial-gradient(ellipse, oklch(0.68 0.18 260 / 0.42) 0%, oklch(0.68 0.18 260 / 0.24) 30%, transparent 75%); }
	.cmp-cta-glow { background: radial-gradient(ellipse, oklch(0.55 0.24 260 / 0.06) 0%, transparent 60%); }
	:global(.dark) .cmp-cta-glow { background: radial-gradient(ellipse, oklch(0.55 0.24 260 / 0.12) 0%, transparent 60%); }
	.cmp-gradient-text { background: linear-gradient(135deg, oklch(0.55 0.24 260), oklch(0.58 0.22 25)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
	:global(.dark) .cmp-gradient-text { background: linear-gradient(135deg, oklch(0.72 0.20 260), oklch(0.72 0.18 25)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
	.cmp-ring-1 { animation: cmp-ring-pulse 4s ease-in-out infinite; }
	.cmp-ring-2 { animation: cmp-ring-pulse 4s ease-in-out infinite 1s; }
	@keyframes cmp-ring-pulse {
		0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
		50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.1; }
	}
	@media (prefers-reduced-motion: reduce) {
		.cmp-ring-1, .cmp-ring-2 { animation: none; }
	}
</style>
