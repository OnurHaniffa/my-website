// Single source of truth for routes whose URL slug is Turkish — programmatic
// SEO landing pages targeting Turkish keywords with NO English equivalent.
//
// Used by:
//   - hooks.server.ts → forces locale='tr' server-side
//   - language-switcher.svelte → hides toggle (no EN to switch to)
//   - +layout.server.ts → exposes isTrOnlyRoute to client (drives switcher visibility
//     from server data, eliminates SPA nav flicker)
//
// IMPORTANT: This is an EXPLICIT allowlist, not a regex. Adding a new TR-only
// page MUST update this file. Regex matching ('*-web-tasarim') is unsafe —
// future routes with similar slugs would silently get force-Turked.

const TR_ONLY_PATHS: ReadonlySet<string> = new Set([
	// Cornerstone landing pages
	'/web-sitesi-fiyatlari',
	'/web-tasarim-istanbul', // shipped 2026-05-07
	'/kurumsal-web-sitesi-yaptirma', // shipped 2026-05-07
	'/e-ticaret-sitesi-yaptirma', // shipped 2026-05-07
	'/web-sitesi-yenileme', // not yet built

	// Programmatic district pages
	'/kadikoy-web-tasarim',
	'/besiktas-web-tasarim',
	'/sisli-web-tasarim',
	'/beyoglu-web-tasarim',
	'/uskudar-web-tasarim',
	'/atasehir-web-tasarim',
	'/maltepe-web-tasarim',
	'/bakirkoy-web-tasarim',
	'/pendik-web-tasarim',
	'/kartal-web-tasarim'

	// Industry pages — directories created but content deferred. When pages are
	// shipped, add their slugs here:
	//   '/restoran-web-sitesi',
	//   '/klinik-web-sitesi',
	//   '/avukat-web-sitesi',
	//   '/oto-galeri-web-sitesi',
	//   '/spor-salonu-web-sitesi',
	//   '/guzellik-salonu-web-sitesi',
	//   '/kafe-web-sitesi',
	//   '/butik-otel-web-sitesi'
]);

export function isTrOnlyRoute(pathname: string): boolean {
	// Normalize trailing slash for matching (trailingSlash='always' produces /foo/)
	const normalized = pathname.replace(/\/$/, '');
	return TR_ONLY_PATHS.has(normalized);
}

export function listTrOnlyPaths(): string[] {
	return Array.from(TR_ONLY_PATHS);
}
