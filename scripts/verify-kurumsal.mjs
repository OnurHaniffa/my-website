// Playwright verification for /kurumsal-web-sitesi-yaptirma/.
import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const URL = 'http://localhost:5173/kurumsal-web-sitesi-yaptirma/';
const SHOTS = '/tmp/kurumsal-verify';
fs.mkdirSync(SHOTS, { recursive: true });

async function main() {
	const browser = await chromium.launch();
	const failures = [];
	const passes = [];

	const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
	const page = await ctx.newPage();
	const consoleErrors = [];
	page.on('pageerror', (e) => consoleErrors.push(e.message));
	page.on('console', (msg) => {
		if (msg.type() === 'error') consoleErrors.push(msg.text());
	});

	await page.goto(URL, { waitUntil: 'networkidle' });
	await page.waitForTimeout(1500);

	await page.screenshot({ path: path.join(SHOTS, 'desktop-full.png'), fullPage: true });
	await page.screenshot({ path: path.join(SHOTS, 'desktop-hero.png'), fullPage: false });

	const lang = await page.evaluate(() => document.documentElement.getAttribute('lang'));
	if (lang === 'tr') passes.push(`✓ <html lang="tr">`);
	else failures.push(`✗ lang=${lang}, want tr`);

	const switcherCount = await page.locator('[aria-label="Change language"]').count();
	if (switcherCount === 0) passes.push(`✓ Language switcher hidden (TR-only)`);
	else failures.push(`✗ Language switcher visible (${switcherCount}× found)`);

	const h1 = await page.locator('h1').first().textContent();
	if (h1?.includes('Kurumsal Web Sitesi') && h1?.includes('Yaptırma'))
		passes.push(`✓ H1: "${h1?.trim()}"`);
	else failures.push(`✗ H1: "${h1}"`);

	const mockupImgs = await page.locator('img[src*="/images/projects/"]').count();
	if (mockupImgs >= 4) passes.push(`✓ Hero mockup images present (${mockupImgs} loaded)`);
	else failures.push(`✗ Hero mockup count=${mockupImgs}`);

	// Verify all required sections
	const sections = ['Neden Önemli', 'Süreç', 'Şeffaf', 'Portfolyo', 'Sık Sorulan'];
	for (const s of sections) {
		const found = await page.locator(`text=${s}`).first().isVisible().catch(() => false);
		if (found) passes.push(`✓ Section "${s}" rendered`);
		else failures.push(`✗ Section "${s}" missing`);
	}

	// Pricing tiers
	const has15K = await page.locator('text=15.000+ TL').first().isVisible().catch(() => false);
	const has30K = await page.locator('text=30.000+ TL').first().isVisible().catch(() => false);
	const has70K = await page.locator('text=70.000+ TL').first().isVisible().catch(() => false);
	if (has15K && has30K && has70K) passes.push(`✓ All 3 pricing tiers visible`);
	else failures.push(`✗ Pricing tiers: 15K=${has15K}, 30K=${has30K}, 70K=${has70K}`);

	// Footer in TR
	const footer = await page.locator('footer').textContent();
	const hasTr = ['Tüm hakları', 'İletişime geçin'].some((m) => footer?.includes(m));
	const hasEn = ['All rights', 'Get in touch'].some((m) => footer?.includes(m));
	if (hasTr && !hasEn) passes.push(`✓ Footer in Turkish`);
	else failures.push(`✗ Footer locale mismatch (TR=${hasTr}, EN=${hasEn})`);

	// FAQ schema present
	const faqSchema = await page.evaluate(() => {
		const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
		return scripts.some((s) => (s.textContent || '').includes('"@type":"FAQPage"'));
	});
	if (faqSchema) passes.push(`✓ FAQPage schema present`);
	else failures.push(`✗ FAQPage schema missing`);

	const serviceSchema = await page.evaluate(() => {
		const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
		return scripts.some((s) => (s.textContent || '').includes('"@type":"Service"'));
	});
	if (serviceSchema) passes.push(`✓ Service schema present`);
	else failures.push(`✗ Service schema missing`);

	if (consoleErrors.length === 0) passes.push(`✓ No console errors`);
	else failures.push(`✗ Console errors: ${consoleErrors.slice(0, 3).join(' | ')}`);

	await ctx.close();

	// Mobile
	const mctx = await browser.newContext({
		viewport: { width: 390, height: 844 },
		isMobile: true,
		hasTouch: true
	});
	const mpage = await mctx.newPage();
	await mpage.goto(URL, { waitUntil: 'networkidle' });
	await mpage.waitForTimeout(1000);
	await mpage.screenshot({ path: path.join(SHOTS, 'mobile-full.png'), fullPage: true });
	const ctaInView = await mpage.evaluate(() => {
		const cta = document.querySelector('a[href*="wa.me"]');
		if (!cta) return false;
		const r = cta.getBoundingClientRect();
		return r.top >= 0 && r.top < window.innerHeight;
	});
	if (ctaInView) passes.push(`✓ Mobile WhatsApp CTA above fold`);
	else failures.push(`✗ Mobile CTA below fold`);
	await mctx.close();

	await browser.close();

	console.log(`\n══════ KURUMSAL VERIFY ══════\n`);
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
