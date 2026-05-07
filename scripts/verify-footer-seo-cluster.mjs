// Playwright verify: footer SEO link cluster shows on TR routes, hidden on EN.
import { chromium } from 'playwright';

const BASE = 'http://localhost:5173';

async function main() {
	const browser = await chromium.launch();
	const failures = [];
	const passes = [];

	const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
	const page = await ctx.newPage();

	// Test 1: TR route — cluster present, all 13 links there
	await page.goto(`${BASE}/kadikoy-web-tasarim/`, { waitUntil: 'networkidle' });
	await page.waitForTimeout(800);

	const trFooter = await page.locator('footer').textContent();
	if (trFooter?.includes('Hizmet Bölgeleri') && trFooter?.includes('İstanbul Web Tasarım'))
		passes.push(`✓ TR route: cluster headings present`);
	else
		failures.push(`✗ TR route: cluster missing`);

	// District-page links (matches /kadikoy-web-tasarim/, /besiktas-web-tasarim/, etc.)
	// Pattern: /[slug]-web-tasarim/ — but EXCLUDES /web-tasarim-istanbul/ (cornerstone)
	const trDistrictLinks = await page
		.locator('footer a[href$="-web-tasarim/"]:not([href="/web-tasarim-istanbul/"])')
		.evaluateAll((els) => els.map((e) => e.getAttribute('href')));
	const uniqueDistrictLinks = [...new Set(trDistrictLinks)];
	if (uniqueDistrictLinks.length === 10)
		passes.push(`✓ TR route: all 10 district links in footer`);
	else failures.push(`✗ TR route: ${uniqueDistrictLinks.length} district links (want 10)`);

	// Verify cornerstone links present
	const cornerstoneLinks = ['/web-sitesi-fiyatlari/', '/kurumsal-web-sitesi-yaptirma/', '/web-tasarim-istanbul/'];
	for (const c of cornerstoneLinks) {
		const found = await page.locator(`footer a[href="${c}"]`).count();
		if (found >= 1) passes.push(`✓ TR route: cornerstone ${c} linked`);
		else failures.push(`✗ TR route: cornerstone ${c} NOT linked`);
	}

	await ctx.close();

	// Test 2: EN homepage — cluster ABSENT
	const enCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
	const enPage = await enCtx.newPage();
	await enPage.goto(`${BASE}/`, { waitUntil: 'networkidle' });
	await enPage.waitForTimeout(800);

	const enFooter = await enPage.locator('footer').textContent();
	const hasCluster = enFooter?.includes('Hizmet Bölgeleri');
	if (!hasCluster) passes.push(`✓ EN homepage: cluster correctly hidden`);
	else failures.push(`✗ EN homepage: cluster leaked into EN footer`);

	const enDistrictLinks = await enPage.locator('footer a[href$="-web-tasarim/"]').count();
	if (enDistrictLinks === 0) passes.push(`✓ EN homepage: 0 TR-route links in footer`);
	else failures.push(`✗ EN homepage: ${enDistrictLinks} TR-route links leaked`);

	await enCtx.close();
	await browser.close();

	console.log(`\n══ FOOTER SEO CLUSTER VERIFY ══\n`);
	passes.forEach((p) => console.log('  ' + p));
	if (failures.length > 0) {
		console.log(`\nFAILURES:`);
		failures.forEach((f) => console.log('  ' + f));
		process.exit(1);
	}
	console.log(`\n✓ All ${passes.length} checks passed`);
}

main().catch((e) => {
	console.error(e);
	process.exit(2);
});
