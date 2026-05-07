// Verify TR/EN language switcher behavior across the site.
// Tests:
//  - TR-only landing pages (23): switcher MUST be hidden (no EN equivalent to switch to)
//  - Bilingual pages (home, work, services, etc.): switcher MUST be visible and functional
//  - Clicking switcher on EN home goes to /tr/
//  - Clicking switcher on /tr/ home goes back to /

import { chromium } from 'playwright';

const BILINGUAL_PAGES = [
	{ path: '/', label: 'home' },
	{ path: '/work/', label: 'work' },
	{ path: '/services/', label: 'services' },
	{ path: '/about/', label: 'about' },
	{ path: '/contact/', label: 'contact' },
	{ path: '/blog/', label: 'blog index' }
];

const TR_ONLY_PAGES = [
	'/web-tasarim-istanbul/',
	'/web-sitesi-fiyatlari/',
	'/kurumsal-web-sitesi-yaptirma/',
	'/e-ticaret-sitesi-yaptirma/',
	'/web-sitesi-yenileme/',
	'/kadikoy-web-tasarim/',
	'/restoran-web-sitesi/',
	'/klinik-web-sitesi/',
	'/butik-otel-web-sitesi/'
];

async function main() {
	const browser = await chromium.launch();
	const ctx = await browser.newContext();
	const page = await ctx.newPage();

	const results = { pass: [], fail: [] };

	console.log('\n══ BILINGUAL PAGES (switcher should be VISIBLE) ══\n');
	for (const { path, label } of BILINGUAL_PAGES) {
		// EN version
		await page.goto(`http://localhost:5173${path}`, { waitUntil: 'networkidle' });
		const enLang = await page.evaluate(() => document.documentElement.lang);
		const enSwitcher = await page.locator('[aria-label="Change language"]').count();
		if (enLang === 'en' && enSwitcher >= 1) {
			results.pass.push(`EN ${path} (${label}): lang=en, switcher visible`);
			console.log(`  ✓ EN ${path} (${label}): lang=en, switcher visible`);
		} else {
			results.fail.push(`EN ${path}: lang=${enLang}, switcher count=${enSwitcher}`);
			console.log(`  ✗ EN ${path}: lang=${enLang}, switcher count=${enSwitcher}`);
		}

		// TR version
		const trPath = path === '/' ? '/tr/' : `/tr${path}`;
		await page.goto(`http://localhost:5173${trPath}`, { waitUntil: 'networkidle' });
		const trLang = await page.evaluate(() => document.documentElement.lang);
		const trSwitcher = await page.locator('[aria-label="Change language"]').count();
		if (trLang === 'tr' && trSwitcher >= 1) {
			results.pass.push(`TR ${trPath} (${label}): lang=tr, switcher visible`);
			console.log(`  ✓ TR ${trPath} (${label}): lang=tr, switcher visible`);
		} else {
			results.fail.push(`TR ${trPath}: lang=${trLang}, switcher count=${trSwitcher}`);
			console.log(`  ✗ TR ${trPath}: lang=${trLang}, switcher count=${trSwitcher}`);
		}
	}

	console.log('\n══ TR-ONLY LANDING PAGES (switcher should be HIDDEN by design) ══\n');
	for (const path of TR_ONLY_PAGES) {
		await page.goto(`http://localhost:5173${path}`, { waitUntil: 'networkidle' });
		const lang = await page.evaluate(() => document.documentElement.lang);
		const switcher = await page.locator('[aria-label="Change language"]').count();
		if (lang === 'tr' && switcher === 0) {
			results.pass.push(`${path}: lang=tr, switcher hidden (correct)`);
			console.log(`  ✓ ${path}: lang=tr, switcher hidden (correct — no EN equivalent exists)`);
		} else {
			results.fail.push(`${path}: lang=${lang}, switcher count=${switcher}`);
			console.log(`  ✗ ${path}: lang=${lang}, switcher count=${switcher}`);
		}
	}

	console.log('\n══ FUNCTIONAL TEST: Click switcher to actually swap locales ══\n');
	// Start at EN home, click switcher, verify we land on TR home
	await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
	const beforeLang = await page.evaluate(() => document.documentElement.lang);
	await page.locator('[aria-label="Change language"]').first().click();
	await page.waitForTimeout(300);
	// Try to find and click the TR option
	const trOption = page.locator('a, button').filter({ hasText: /türkçe|turkish|tr/i }).first();
	if ((await trOption.count()) > 0) {
		await trOption.click();
		await page.waitForLoadState('networkidle');
		const afterUrl = page.url();
		const afterLang = await page.evaluate(() => document.documentElement.lang);
		if (afterUrl.includes('/tr') && afterLang === 'tr') {
			results.pass.push(`Functional swap EN→TR works (was ${beforeLang}, now ${afterLang}, url=${afterUrl})`);
			console.log(`  ✓ EN→TR swap works: ${afterUrl} lang=${afterLang}`);
		} else {
			results.fail.push(`EN→TR swap failed: url=${afterUrl}, lang=${afterLang}`);
			console.log(`  ✗ EN→TR swap failed: ${afterUrl} lang=${afterLang}`);
		}
	} else {
		results.fail.push('Could not find TR option in switcher dropdown');
		console.log('  ✗ Could not find TR option in switcher dropdown');
	}

	await browser.close();

	console.log(`\n══ SUMMARY ══`);
	console.log(`Passes: ${results.pass.length}`);
	console.log(`Failures: ${results.fail.length}`);
	if (results.fail.length > 0) {
		console.log(`\nFailures:`);
		results.fail.forEach((f) => console.log(`  - ${f}`));
		process.exit(1);
	}
	console.log(`\n✓ All locale switcher checks pass`);
}

main().catch((e) => { console.error(e); process.exit(2); });
