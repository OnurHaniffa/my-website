// Playwright verify for /web-tasarim-istanbul/
import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const URL = 'http://localhost:5173/web-tasarim-istanbul/';
const SHOTS = '/tmp/istanbul-verify';
fs.mkdirSync(SHOTS, { recursive: true });

async function main() {
	const browser = await chromium.launch();
	const failures = [];
	const passes = [];

	const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
	const page = await ctx.newPage();
	const errors = [];
	page.on('pageerror', (e) => errors.push(e.message));
	page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

	await page.goto(URL, { waitUntil: 'networkidle' });
	await page.waitForTimeout(1500);
	await page.screenshot({ path: path.join(SHOTS, 'desktop-full.png'), fullPage: true });

	const lang = await page.evaluate(() => document.documentElement.getAttribute('lang'));
	if (lang === 'tr') passes.push(`✓ <html lang="tr">`); else failures.push(`✗ lang=${lang}`);

	const switcher = await page.locator('[aria-label="Change language"]').count();
	if (switcher === 0) passes.push(`✓ Language switcher hidden`); else failures.push(`✗ Switcher rendered`);

	const h1 = await page.locator('h1').first().textContent();
	if (h1?.includes('İstanbul') && h1?.includes('Web Tasarım')) passes.push(`✓ H1: "${h1?.trim()}"`);
	else failures.push(`✗ H1: "${h1}"`);

	const sections = ['Karşılaştırma', 'Hizmet Bölgeleri', 'Şeffaf Fiyatlandırma', 'İstanbul SSS'];
	for (const s of sections) {
		const found = await page.locator(`text=${s}`).first().isVisible().catch(() => false);
		if (found) passes.push(`✓ "${s}" rendered`); else failures.push(`✗ "${s}" missing`);
	}

	// Comparison table — should have 6 rows (one per criteria)
	const tableRows = await page.locator('table tbody tr').count();
	if (tableRows >= 6) passes.push(`✓ Comparison table has ${tableRows} rows`);
	else failures.push(`✗ Comparison table only ${tableRows} rows`);

	// District links — should be 10 internal links to /[slug]-web-tasarim/
	const districtLinks = await page.locator('a[href$="-web-tasarim/"]').count();
	if (districtLinks >= 10) passes.push(`✓ ${districtLinks} district links present (SEO juice)`);
	else failures.push(`✗ Only ${districtLinks} district links`);

	const footer = await page.locator('footer').textContent();
	const tr = ['Tüm hakları', 'İletişime geçin'].some((m) => footer?.includes(m));
	const en = ['All rights', 'Get in touch'].some((m) => footer?.includes(m));
	if (tr && !en) passes.push(`✓ Footer in TR`);
	else failures.push(`✗ Footer locale: TR=${tr} EN=${en}`);

	const faqSchema = await page.evaluate(() => {
		return Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
			.some((s) => (s.textContent || '').includes('"@type":"FAQPage"'));
	});
	if (faqSchema) passes.push(`✓ FAQPage schema`);
	else failures.push(`✗ FAQ schema missing`);

	const lbSchema = await page.evaluate(() => {
		return Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
			.some((s) => (s.textContent || '').includes('"@type":"LocalBusiness"'));
	});
	if (lbSchema) passes.push(`✓ LocalBusiness schema`);
	else failures.push(`✗ LB schema missing`);

	if (errors.length === 0) passes.push(`✓ No console errors`);
	else failures.push(`✗ Errors: ${errors.slice(0, 3).join(' | ')}`);

	await ctx.close();
	await browser.close();

	console.log(`\n══ ISTANBUL VERIFY ══\n`);
	passes.forEach((p) => console.log('  ' + p));
	if (failures.length > 0) {
		console.log(`\nFAILURES:`);
		failures.forEach((f) => console.log('  ' + f));
		process.exit(1);
	}
	console.log(`\n✓ All ${passes.length} checks passed`);
}
main().catch((e) => { console.error(e); process.exit(2); });
