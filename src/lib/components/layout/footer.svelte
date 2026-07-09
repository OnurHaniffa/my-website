<script lang="ts">
	import { Container } from '$lib/components/layout';
	import { Button } from '$lib/components/ui/button';
	import { t, getLocale, getLocalePath } from '$lib/i18n/index.svelte';
	import type { DirectusFooterSettings } from '$lib/data/directus';
	import { districts } from '$lib/data/districts';
	import { industries } from '$lib/data/industries';
	import { comparisons } from '$lib/data/comparisons';

	function comparisonLabel(c: { optionA: { name: string }; optionB: { name: string } }) {
		return `${c.optionA.name} vs ${c.optionB.name}`;
	}

	let { settings = null }: { settings?: DirectusFooterSettings | null } = $props();

	const currentYear = new Date().getFullYear();

	// SEO internal linking — only render the district + cornerstone link cluster
	// on the Turkish locale, since these pages are TR-only. Distributes PageRank
	// from every page on the site to our 13 TR landing pages, accelerating their
	// ranking signal.
	const showSeoLinkCluster = $derived(getLocale() === 'tr');

	// CMS (Directus) only stores English content. When locale is TR, the i18n
	// translations have the proper Turkish copy — use those FIRST and only fall
	// back to CMS for English. Without this gate, every TR page renders the
	// footer in English because `settings?.field ?? t(...)` lets CMS win.
	function cmsOrT(field: keyof DirectusFooterSettings, key: string): string {
		if (getLocale() === 'tr') return t(key);
		return ((settings?.[field] as string | undefined) ?? t(key));
	}

	// CTA heading composition logic, extracted for readability:
	//   - On TR locale OR when CMS has no cta_heading: render the full
	//     translated three-part heading (pre + highlight + post).
	//   - On EN locale with CMS-provided cta_heading: render just CMS pre +
	//     highlight (CMS owns the entire heading text).
	const showCtaPost = $derived(getLocale() === 'tr' || !settings?.cta_heading);
</script>

<!-- Curved top edge - wave separates page from dark footer -->
<div class="relative">
	<!-- Gradient glow above wave - creates visual separation especially in dark mode -->
	<div class="absolute inset-x-0 bottom-0 h-56 pointer-events-none">
		<!-- Primary color glow - enhanced for dark mode -->
		<div class="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-primary/[0.06] dark:from-transparent dark:via-primary/[0.10] dark:to-primary/[0.18]"></div>
		<!-- Horizontal accent line - brighter in dark mode -->
		<div class="absolute bottom-24 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent dark:via-primary/50"></div>
	</div>

	<!-- Wave SVG -->
	<svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="relative w-full h-auto" preserveAspectRatio="none">
		<!-- Wave fill - use surface color for better integration -->
		<path d="M0 80V40C360 70 720 10 1080 40C1260 55 1380 70 1440 80V80H0Z" class="fill-[oklch(0.15_0.01_260)] dark:fill-[oklch(0.11_0.025_250)]"/>
		<!-- Highlight stroke along wave crest - more prominent in dark mode -->
		<path d="M0 40C360 70 720 10 1080 40C1260 55 1380 70 1440 80" class="stroke-border/30 dark:stroke-primary/50" stroke-width="1.5" fill="none"/>
	</svg>
</div>

<footer class="relative overflow-hidden -mt-1" style="background: oklch(0.15 0.01 260);">
	<!-- Ambient background elements - simplified for performance -->
	<div class="absolute inset-0 pointer-events-none overflow-hidden">
		<!-- Large decorative text -->
		<div class="absolute -right-10 top-10 select-none opacity-[0.02]">
			<span class="text-[20rem] md:text-[28rem] font-black leading-none tracking-tighter text-white">Hi</span>
		</div>

		<!-- Minimal decorative elements - static for performance -->
	</div>

	<Container class="relative">
		<div class="py-16 md:py-24">
			<!-- Main CTA Section -->
			<div class="text-center mb-16 md:mb-20">
				<h2 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-white">
					{cmsOrT('cta_heading', 'footer.cta_pre')} {cmsOrT('cta_highlight', 'footer.cta_highlight')} {showCtaPost ? t('footer.cta_post') : ''}
				</h2>
				<p class="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
					{cmsOrT('cta_description', 'footer.cta_description')}
				</p>
				<div class="flex flex-wrap justify-center gap-4">
					<Button href={getLocalePath('/contact')} variant="secondary" size="lg" class="group rounded-md px-10 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
						{cmsOrT('cta_button_text', 'footer.cta_button')}
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
					</Button>
					<a href="mailto:{settings?.email ?? 'contact@onurhaniffa.com'}" class="inline-flex items-center gap-3 px-8 py-4 rounded-md border border-white/20 text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all text-base">
						{settings?.email ?? 'contact@onurhaniffa.com'}
					</a>
				</div>
			</div>

			<!-- Footer grid -->
			<div class="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6 py-12 border-t border-white/10">
				<!-- Brand - takes more space -->
				<div class="col-span-2 md:col-span-5 lg:col-span-4">
					<a href={getLocalePath('/')} class="inline-flex items-center gap-4 mb-5 group transition-all group-hover:opacity-80">
						<img src="/favicon-192x192.png" alt="Onur Haniffa logo" width="48" height="48" class="rounded-xl" />
						<div class="flex flex-col items-center">
							<span class="text-xl font-black tracking-[0.15em] uppercase text-white">{settings?.brand_name ?? 'Onur Haniffa'}</span>
							<span class="text-[9px] text-gray-400 tracking-[0.3em] uppercase">{settings?.brand_subtitle ?? 'Est. 2025'}</span>
						</div>
					</a>
					<p class="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
						{cmsOrT('tagline', 'footer.tagline')}
					</p>
					<div class="flex items-center gap-4">
						<a href="https://wa.me/905428324550" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 flex items-center justify-center text-[#25D366] hover:text-[#25D366] transition-all" aria-label="WhatsApp">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
						</a>
						<a href="tel:+905428324550" class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all" aria-label="Phone">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
						</a>
						<a href={settings?.linkedin_url ?? 'https://www.linkedin.com/in/onurhaniffa/'} target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all" aria-label="LinkedIn">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
						</a>
						<a href="mailto:{settings?.email ?? 'contact@onurhaniffa.com'}" class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all" aria-label="Email">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
						</a>
					</div>
				</div>

				<!-- Spacer on large screens -->
				<div class="hidden lg:block lg:col-span-2"></div>

				<!-- Pages -->
				<div class="col-span-1 md:col-span-2">
					<h4 class="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-5">{cmsOrT('pages_heading', 'footer.explore')}</h4>
					<nav class="flex flex-col gap-3">
						<a href={getLocalePath('/')} class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">{t('footer.home')}</a>
						<a href={getLocalePath('/work')} class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">{t('footer.work')}</a>
						<a href={getLocalePath('/services')} class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">{t('footer.services')}</a>
						<a href={getLocalePath('/about')} class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">{t('footer.about')}</a>
						<a href={getLocalePath('/blog')} class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">{t('footer.blog')}</a>
					</nav>
				</div>

				<!-- Contact -->
				<div class="col-span-1 md:col-span-3 lg:col-span-2">
					<h4 class="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-5">{cmsOrT('contact_heading', 'footer.contact')}</h4>
					<div class="flex flex-col gap-3">
						<a href={getLocalePath('/contact')} class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">{t('footer.get_in_touch')}</a>
						<a href="tel:+905428324550" class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">+90 542 832 45 50</a>
						<a href="https://wa.me/905428324550" target="_blank" rel="noopener noreferrer" class="text-sm text-[#25D366] hover:text-[#20BD5A] hover:translate-x-1 transition-all">WhatsApp</a>
						<a href="mailto:{settings?.email ?? 'contact@onurhaniffa.com'}" class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">{settings?.email ?? 'contact@onurhaniffa.com'}</a>
						<p class="text-sm text-gray-500 mt-2">{cmsOrT('location', 'footer.based_in')}</p>
					</div>
				</div>
			</div>

			<!-- TR-only SEO link cluster: 5 cornerstones + 10 districts + 8 industries + 6 comparisons.
			     Lives between the main footer grid and the bottom copyright bar.
			     Hidden entirely on EN locale to avoid English-speaking visitors
			     seeing a wall of Turkish-named links. Distributes PageRank from
			     every page on the site to all 29 TR landing pages. -->
			{#if showSeoLinkCluster}
				<div class="pt-8 border-t border-white/10">
					<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
						<div>
							<h4 class="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-4">Hizmetler</h4>
							<nav class="flex flex-col gap-2.5">
								<a href="/web-tasarim-istanbul/" class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">İstanbul Web Tasarım</a>
								<a href="/web-sitesi-fiyatlari/" class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">Web Sitesi Fiyatları</a>
								<a href="/kurumsal-web-sitesi-yaptirma/" class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">Kurumsal Web Sitesi</a>
								<a href="/e-ticaret-sitesi-yaptirma/" class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">E-Ticaret Sitesi</a>
								<a href="/web-sitesi-yenileme/" class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">Web Sitesi Yenileme</a>
							</nav>
						</div>
						<div>
							<h4 class="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-4">Sektörler</h4>
							<nav class="grid grid-cols-2 gap-x-4 gap-y-2.5">
								{#each industries as i}
									<a href={`/${i.slug}-web-sitesi/`} class="text-sm text-gray-400 hover:text-white transition-all">{i.name}</a>
								{/each}
							</nav>
						</div>
						<div>
							<h4 class="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-4">Karşılaştırmalar</h4>
							<nav class="flex flex-col gap-2.5">
								{#each comparisons as c}
									<a href={`/${c.slug}/`} class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">{comparisonLabel(c)}</a>
								{/each}
							</nav>
						</div>
						<div>
							<h4 class="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-4">Hizmet Bölgeleri</h4>
							<nav class="grid grid-cols-2 gap-x-4 gap-y-2.5">
								{#each districts as d}
									<a href={`/${d.slug}-web-tasarim/`} class="text-sm text-gray-400 hover:text-white transition-all">{d.name}</a>
								{/each}
							</nav>
						</div>
					</div>
				</div>
			{/if}

			<!-- Bottom bar -->
			<div class="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
				<p class="text-sm text-gray-500">
					&copy; {currentYear} {settings?.brand_name ?? 'Onur Haniffa'}. {t('footer.copyright_suffix')}
				</p>
				<p class="text-sm text-gray-500">
					{cmsOrT('bottom_tagline', 'footer.designed_with')}
				</p>
			</div>
		</div>
	</Container>
</footer>
