// Single source of truth for "which blog posts cluster around which cornerstone."
//
// Used by:
//   - CornerstoneCluster.svelte → renders "Bu konuda daha fazlası" section
//     on cornerstone pages, listing related blog posts as cards.
//
// Keys are cornerstone paths (with leading + trailing slash to match the
// canonical URL). Values are ordered arrays of blog post slugs — order
// is display priority (most relevant first).
//
// Editing rules:
//   - Each cornerstone should have 4-7 cluster posts.
//   - A blog post can appear in multiple clusters by design (same content
//     may be relevant to multiple cornerstones).
//   - When you add a new blog post, add it to its primary cornerstone here.
//   - When you add a new cornerstone, add an empty array entry here so the
//     CornerstoneCluster component renders gracefully (or skip the section).

export const cornerstoneClusters: Record<string, string[]> = {
	'/web-tasarim-istanbul/': [
		'seo-nedir-isletmeler-icin-rehber',
		'istanbul-dijital-pazarlama-rehberi-2026',
		'istanbul-kucuk-isletme-web-sitesi-rehberi',
		'sosyal-medya-mi-web-sitesi-mi',
		'google-ads-mi-seo-mu-isletmeler-icin-karsilastirma',
		'web-tasarim-trendleri-2026',
		'kurumsal-web-sitesi-neden-onemli'
	],
	'/web-sitesi-fiyatlari/': [
		'web-sitesi-maliyeti-istanbul-2026',
		'web-tasarimci-secerken-10-soru',
		'sosyal-medya-mi-web-sitesi-mi',
		'istanbul-kucuk-isletme-web-sitesi-rehberi'
	],
	'/kurumsal-web-sitesi-yaptirma/': [
		'kurumsal-web-sitesi-neden-onemli',
		'web-sitesi-guvenligi-rehberi-2026',
		'mobil-uyumlu-web-sitesi-neden-sart',
		'web-sitesi-donusum-orani-artirma',
		'avukat-hukuk-burosu-web-sitesi-tasarimi'
	],
	'/e-ticaret-sitesi-yaptirma/': [
		'e-ticaret-web-sitesi-kurma-rehberi-2026',
		'web-sitesi-donusum-orani-artirma',
		'web-sitesi-hizi-ve-seo-iliskisi',
		'mobil-uyumlu-web-sitesi-neden-sart'
	],
	'/web-sitesi-yenileme/': [
		'wordpress-mu-ozel-yazilim-mi',
		'web-sitesi-hizi-ve-seo-iliskisi',
		'web-tasarim-trendleri-2026',
		'mobil-uyumlu-web-sitesi-neden-sart',
		'neden-sveltekit-en-iyi-framework',
		'web-sitesi-guvenligi-rehberi-2026'
	]
};

export function getClusterForCornerstone(path: string): string[] {
	return cornerstoneClusters[path] ?? [];
}
