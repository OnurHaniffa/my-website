// Comprehensive end-to-end Playwright verification across the full SEO suite.
// Catches: button overlaps, locale mismatches, console errors, schema validity.
// Tests representative pages (1 cornerstone + 1 district + 1 industry) + EN homepage.

import { chromium } from 'playwright';

const PAGES = [
	{ url: 'http://localhost:5173/web-tasarim-istanbul/', type: 'cornerstone', expectLang: 'tr' },
	{ url: 'http://localhost:5173/kurumsal-web-sitesi-yaptirma/', type: 'cornerstone', expectLang: 'tr' },
	{ url: 'http://localhost:5173/e-ticaret-sitesi-yaptirma/', type: 'cornerstone', expectLang: 'tr' },
	{ url: 'http://localhost:5173/web-sitesi-yenileme/', type: 'cornerstone', expectLang: 'tr' },
	{ url: 'http://localhost:5173/web-sitesi-fiyatlari/', type: 'cornerstone', expectLang: 'tr' },
	{ url: 'http://localhost:5173/kadikoy-web-tasarim/', type: 'district', expectLang: 'tr' },
	{ url: 'http://localhost:5173/besiktas-web-tasarim/', type: 'district', expectLang: 'tr' },
	{ url: 'http://localhost:5173/restoran-web-sitesi/', type: 'industry', expectLang: 'tr' },
	{ url: 'http://localhost:5173/klinik-web-sitesi/', type: 'industry', expectLang: 'tr' },
	{ url: 'http://localhost:5173/avukat-web-sitesi/', type: 'industry', expectLang: 'tr' },
	{ url: 'http://localhost:5173/butik-otel-web-sitesi/', type: 'industry', expectLang: 'tr' },
	{ url: 'http://localhost:5173/', type: 'home', expectLang: 'en' }
];

async function checkPage(browser, { url, type, expectLang }) {
	const failures = [];
	const passes = [];
	const errors = [];

	const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
	const page = await ctx.newPage();
	page.on('pageerror', (e) => errors.push(e.message));
	page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

	try {
		await page.goto(url, { waitUntil: 'networkidle', timeout: 25_000 });
		await page.waitForTimeout(800);

		// 1. Lang attribute correct
		const lang = await page.evaluate(() => document.documentElement.getAttribute('lang'));
		if (lang === expectLang) passes.push(`lang=${lang}`);
		else failures.push(`lang=${lang} (want ${expectLang})`);

		// 2. Language switcher visibility
		const switcherCount = await page.locator('[aria-label="Change language"]').count();
		if (type === 'home' && switcherCount >= 1) passes.push(`switcher visible on home`);
		else if (type !== 'home' && switcherCount === 0) passes.push(`switcher hidden on TR-only`);
		else failures.push(`switcher count=${switcherCount} (type=${type})`);

		// 3. Button overlap detection on hero — get all hero CTAs and verify no two overlap
		const heroCtaRects = await page.evaluate(() => {
			// Find first <section> (hero) and grab all clickable elements
			const hero = document.querySelector('section');
			if (!hero) return [];
			const els = Array.from(hero.querySelectorAll('a, button')).filter((el) => {
				const r = el.getBoundingClientRect();
				return r.width > 50 && r.height > 20 && el.offsetParent !== null;
			});
			return els.map((el) => {
				const r = el.getBoundingClientRect();
				return { text: el.textContent?.trim().slice(0, 30), x: r.x, y: r.y, w: r.width, h: r.height };
			});
		});

		let overlaps = 0;
		for (let i = 0; i < heroCtaRects.length; i++) {
			for (let j = i + 1; j < heroCtaRects.length; j++) {
				const a = heroCtaRects[i], b = heroCtaRects[j];
				const overlap = a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
				// Allow contained-within (e.g., button inside link wrapper)
				const aContainsB = a.x <= b.x && a.y <= b.y && a.x + a.w >= b.x + b.w && a.y + a.h >= b.y + b.h;
				const bContainsA = b.x <= a.x && b.y <= a.y && b.x + b.w >= a.x + a.w && b.y + b.h >= a.y + a.h;
				if (overlap && !aContainsB && !bContainsA) {
					overlaps++;
					failures.push(`overlap: "${a.text}" × "${b.text}"`);
				}
			}
		}
		if (overlaps === 0) passes.push(`no hero button overlaps (${heroCtaRects.length} measured)`);

		// 4. Footer locale matches expected
		const footerText = await page.locator('footer').textContent();
		if (type !== 'home') {
			const trMarkers = ['Tüm hakları', 'İletişime geçin'].some((m) => footerText?.includes(m));
			if (trMarkers) passes.push(`footer in TR`);
			else failures.push(`footer not in TR`);
		} else {
			// Home is EN
			const enMarkers = ['All rights', 'Get in touch'].some((m) => footerText?.includes(m));
			if (enMarkers) passes.push(`footer in EN`);
			else failures.push(`footer not in EN`);
		}

		// 5. Console errors
		if (errors.length === 0) passes.push(`0 console errors`);
		else failures.push(`${errors.length} console errors: ${errors[0]?.slice(0, 80)}`);

		// 6. Schema present (for TR-only pages)
		if (type !== 'home') {
			const hasFaq = await page.evaluate(() =>
				Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
					.some((s) => (s.textContent || '').includes('"@type":"FAQPage"'))
			);
			if (hasFaq) passes.push(`FAQPage schema`);
			else failures.push(`FAQPage schema missing`);
		}
	} catch (e) {
		failures.push(`page load error: ${e.message?.slice(0, 100)}`);
	} finally {
		await ctx.close();
	}

	return { url, passes, failures };
}

async function main() {
	const browser = await chromium.launch();
	let totalPasses = 0;
	let totalFailures = 0;
	const allFailures = [];

	for (const p of PAGES) {
		const r = await checkPage(browser, p);
		totalPasses += r.passes.length;
		totalFailures += r.failures.length;
		const status = r.failures.length === 0 ? '✓' : '✗';
		console.log(`${status} ${r.url.replace('http://localhost:5173', '')}`);
		r.passes.forEach((p) => console.log(`    ✓ ${p}`));
		r.failures.forEach((f) => {
			console.log(`    ✗ ${f}`);
			allFailures.push(`${r.url}: ${f}`);
		});
	}

	await browser.close();

	console.log(`\n══ FULL SEO SUITE REPORT ══`);
	console.log(`Pages tested: ${PAGES.length}`);
	console.log(`Total passes: ${totalPasses}`);
	console.log(`Total failures: ${totalFailures}`);

	if (totalFailures > 0) {
		console.log(`\nALL FAILURES:`);
		allFailures.forEach((f) => console.log('  ' + f));
		process.exit(1);
	}
	console.log(`\n✓ All ${PAGES.length} pages pass all checks`);
}

main().catch((e) => { console.error(e); process.exit(2); });
