// Playwright verification for the rebuilt district page.
// Asserts the specific issues the user flagged are fixed.
// Run: node scripts/verify-district-page.mjs

import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const URL = 'http://localhost:5173/kadikoy-web-tasarim/';
const SHOTS_DIR = '/tmp/district-verify';
fs.mkdirSync(SHOTS_DIR, { recursive: true });

async function main() {
	const browser = await chromium.launch();
	const failures = [];
	const checks = [];

	// ── DESKTOP CHECK ──
	const desktopCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
	const dPage = await desktopCtx.newPage();
	const consoleErrors = [];
	dPage.on('pageerror', (e) => consoleErrors.push(e.message));
	dPage.on('console', (msg) => {
		if (msg.type() === 'error') consoleErrors.push(msg.text());
	});

	await dPage.goto(URL, { waitUntil: 'networkidle' });
	await dPage.waitForTimeout(1500);

	const desktopShot = path.join(SHOTS_DIR, 'desktop-full.png');
	await dPage.screenshot({ path: desktopShot, fullPage: true });
	checks.push(`✓ Desktop full-page screenshot saved: ${desktopShot}`);

	const heroShot = path.join(SHOTS_DIR, 'desktop-hero.png');
	await dPage.screenshot({ path: heroShot, fullPage: false });
	checks.push(`✓ Desktop hero (above fold) saved: ${heroShot}`);

	// CHECK 1: Hero contains the browser mockup (img tag with /images/projects/)
	const mockupImgs = await dPage.locator('img[src*="/images/projects/"]').count();
	if (mockupImgs >= 2) {
		checks.push(`✓ Hero mockup images present (${mockupImgs} project screenshots loaded)`);
	} else {
		failures.push(`✗ Hero mockup MISSING — found ${mockupImgs} project images, expected ≥2`);
	}

	// CHECK 2: H1 contains district name
	const h1Text = await dPage.locator('h1').first().textContent();
	if (h1Text?.includes('Kadıköy')) {
		checks.push(`✓ H1 correct: "${h1Text?.trim()}"`);
	} else {
		failures.push(`✗ H1 wrong: "${h1Text}"`);
	}

	// CHECK 3: Locale set to TR — body text should be Turkish
	const bodyText = await dPage.locator('body').textContent();
	const turkishMarkers = ['Yerel İçgörü', 'Sabit Fiyat', 'Sık Sorulan', 'Yakın İlçeler'];
	const missingMarkers = turkishMarkers.filter((m) => !bodyText?.includes(m));
	if (missingMarkers.length === 0) {
		checks.push(`✓ All Turkish section markers present`);
	} else {
		failures.push(`✗ Missing TR markers: ${missingMarkers.join(', ')}`);
	}

	// CHECK 4a: HEADER nav locale — must be Turkish
	const navText = await dPage.locator('header').textContent();
	const navHasTrMarker = ['Anasayfa', 'İletişim', 'Hizmetler', 'Hakkımda', 'Çalışmalar'].some((m) =>
		navText?.includes(m)
	);
	const navHasEnMarker = ['Home', 'Services', 'About', 'Work', 'Contact'].some(
		(m) => navText?.includes(m) && !navText?.includes('Hakkımda') // Hakkımda is the TR for About
	);
	if (navHasTrMarker && !navHasEnMarker) {
		checks.push(`✓ Header in Turkish (no English markers detected)`);
	} else if (navHasTrMarker && navHasEnMarker) {
		failures.push(`✗ Header is MIXED locale — found both TR and EN nav text`);
	} else {
		failures.push(`✗ Header is in English: "${navText?.slice(0, 120)}…"`);
	}

	// CHECK 4b: FOOTER locale — must be Turkish
	const footerText = await dPage.locator('footer').textContent();
	const footerHasTrMarker = [
		'Hizmetler',
		'İletişim',
		'Tüm hakları',
		'Gizlilik',
		'İstanbul',
		'Hakkımda'
	].some((m) => footerText?.includes(m));
	const footerHasEnMarker = ['All rights reserved', 'Privacy', 'Services', 'Contact', 'About'].some(
		(m) => footerText?.includes(m)
	);
	if (footerHasTrMarker && !footerHasEnMarker) {
		checks.push(`✓ Footer in Turkish (no English markers detected)`);
	} else if (footerHasEnMarker) {
		failures.push(
			`✗ FOOTER IS IN ENGLISH (or mixed): "${footerText?.slice(0, 200).replace(/\s+/g, ' ')}…"`
		);
	} else {
		checks.push(`⚠ Footer locale unclear: "${footerText?.slice(0, 120)}…"`);
	}

	// CHECK 4c: <html lang="tr"> attribute
	const htmlLang = await dPage.evaluate(() => document.documentElement.getAttribute('lang'));
	if (htmlLang === 'tr') {
		checks.push(`✓ <html lang="tr"> set correctly`);
	} else {
		failures.push(`✗ <html lang="${htmlLang}"> — should be "tr"`);
	}

	// CHECK 5: FAQs all start closed (no aria-expanded="true" on initial load)
	const openFaqs = await dPage.locator('button[aria-expanded="true"]').count();
	if (openFaqs === 0) {
		checks.push(`✓ All FAQs start closed (uniform appearance)`);
	} else {
		failures.push(`✗ ${openFaqs} FAQ(s) auto-open — should all start closed`);
	}

	// CHECK 6: Badge layout — measure each badge in the hero and verify no overlap
	// Heuristic: get bounding rects of all elements with class containing "rounded-full"
	// in the first viewport — verify no two overlap
	const heroBadges = await dPage.evaluate(() => {
		const els = Array.from(document.querySelectorAll('.relative.pt-12 .inline-flex'));
		return els.map((el) => {
			const r = el.getBoundingClientRect();
			return { text: el.textContent?.trim().slice(0, 40), x: r.x, y: r.y, w: r.width, h: r.height };
		});
	});
	checks.push(`Hero badges/CTAs found: ${heroBadges.length}`);
	let overlapFound = false;
	for (let i = 0; i < heroBadges.length; i++) {
		for (let j = i + 1; j < heroBadges.length; j++) {
			const a = heroBadges[i], b = heroBadges[j];
			const overlap =
				a.x < b.x + b.w &&
				a.x + a.w > b.x &&
				a.y < b.y + b.h &&
				a.y + a.h > b.y;
			if (overlap) {
				overlapFound = true;
				failures.push(`✗ Hero element overlap: "${a.text}" overlaps "${b.text}"`);
			}
		}
	}
	if (!overlapFound) checks.push(`✓ No hero element overlap (${heroBadges.length} elements measured)`);

	// CHECK 7: Marquee strip present
	const marquee = await dPage.locator('.proof-marquee').count();
	if (marquee >= 1) {
		checks.push(`✓ Marquee strip rendered`);
	} else {
		failures.push(`✗ Marquee strip MISSING`);
	}

	// CHECK 8: Console errors
	if (consoleErrors.length === 0) {
		checks.push(`✓ No console errors`);
	} else {
		failures.push(`✗ Console errors: ${consoleErrors.slice(0, 3).join(' | ')}`);
	}

	await desktopCtx.close();

	// ── MOBILE CHECK ──
	const mobileCtx = await browser.newContext({
		viewport: { width: 390, height: 844 },
		isMobile: true,
		hasTouch: true,
		userAgent:
			'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
	});
	const mPage = await mobileCtx.newPage();
	await mPage.goto(URL, { waitUntil: 'networkidle' });
	await mPage.waitForTimeout(1500);

	const mobileShot = path.join(SHOTS_DIR, 'mobile-full.png');
	await mPage.screenshot({ path: mobileShot, fullPage: true });
	checks.push(`✓ Mobile full-page screenshot saved: ${mobileShot}`);

	const mobileHeroShot = path.join(SHOTS_DIR, 'mobile-hero.png');
	await mPage.screenshot({ path: mobileHeroShot, fullPage: false });
	checks.push(`✓ Mobile hero saved: ${mobileHeroShot}`);

	// Mobile-specific: verify hero CTA button visible above fold
	const ctaInView = await mPage.evaluate(() => {
		const cta = document.querySelector('a[href*="wa.me"]');
		if (!cta) return false;
		const r = cta.getBoundingClientRect();
		return r.top >= 0 && r.top < window.innerHeight;
	});
	if (ctaInView) {
		checks.push(`✓ Mobile WhatsApp CTA visible above fold`);
	} else {
		failures.push(`✗ Mobile WhatsApp CTA below fold (or not found)`);
	}

	await mobileCtx.close();
	await browser.close();

	// REPORT
	console.log('\n══════════════════ VERIFY REPORT ══════════════════');
	console.log(`URL: ${URL}\n`);
	console.log('PASSING:');
	checks.forEach((c) => console.log('  ' + c));
	if (failures.length > 0) {
		console.log('\nFAILURES:');
		failures.forEach((f) => console.log('  ' + f));
		console.log(`\n✗ ${failures.length} failure(s) — page NOT verified`);
		process.exit(1);
	} else {
		console.log('\n✓ All checks passed');
		process.exit(0);
	}
}

main().catch((e) => {
	console.error('verify script error:', e);
	process.exit(2);
});
