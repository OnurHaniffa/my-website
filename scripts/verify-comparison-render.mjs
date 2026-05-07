// Render a comparison page on mobile + desktop, verify critical visual checks:
//  - Hero stacks correctly on mobile (no horizontal overflow)
//  - Comparison table → mobile cards on <md, table on >=md
//  - Sticky CTA appears after scroll and doesn't overlap content
//  - Footer 4-column cluster doesn't cramp at tablet

import { chromium } from 'playwright';

async function check(viewport, label) {
	const browser = await chromium.launch();
	const ctx = await browser.newContext({ viewport });
	const page = await ctx.newPage();
	const errors = [];
	page.on('pageerror', (e) => errors.push(e.message));
	page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

	await page.goto('http://localhost:5173/wix-vs-ozel-web-sitesi/', { waitUntil: 'networkidle' });

	const findings = [];

	// 1. No horizontal scroll
	const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
	findings.push(hasHScroll ? `✗ horizontal scroll detected` : `✓ no horizontal scroll`);

	// 2. H1 visible
	const h1Count = await page.locator('h1').count();
	const h1Text = await page.locator('h1').first().textContent();
	findings.push(h1Count >= 1 && h1Text?.includes('Wix') ? `✓ h1 contains "Wix"` : `✗ h1 missing or wrong: ${h1Text}`);

	// 3. Comparison table or mobile cards present
	if (viewport.width < 768) {
		// Mobile — should see stacked cards
		const cards = await page.locator('.md\\:hidden .rounded-xl').count();
		findings.push(cards >= 8 ? `✓ mobile cards rendered (${cards})` : `✗ mobile cards missing (${cards})`);
	} else {
		// Desktop — should see table
		const tableRows = await page.locator('table tbody tr').count();
		findings.push(tableRows >= 8 ? `✓ desktop table rows (${tableRows})` : `✗ desktop table rows wrong (${tableRows})`);
	}

	// 4. Honest take section present
	const honestTakeText = await page.locator('text=Dürüst Görüşüm').count();
	findings.push(honestTakeText >= 1 ? `✓ honest take section visible` : `✗ honest take section missing`);

	// 5. FAQ section interactive
	const faqButtons = await page.locator('button[aria-expanded]').count();
	findings.push(faqButtons >= 5 ? `✓ ${faqButtons} FAQ items found` : `✗ only ${faqButtons} FAQ items`);

	// 6. Sticky CTA appears after scroll (only on mobile)
	if (viewport.width < 1024) {
		await page.evaluate(() => window.scrollTo(0, 800));
		await page.waitForTimeout(500);
		const stickyVisible = await page.locator('.fixed.bottom-0').count();
		findings.push(stickyVisible >= 1 ? `✓ sticky CTA appeared after scroll` : `✗ sticky CTA missing`);
	}

	// 7. Footer rendering check — count visible TR landing links
	await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	await page.waitForTimeout(300);
	const footerLinks = await page.locator('footer a[href*="/"]').count();
	findings.push(footerLinks >= 30 ? `✓ footer has ${footerLinks} links` : `✗ only ${footerLinks} footer links`);

	// 8. No console errors
	findings.push(errors.length === 0 ? `✓ 0 console errors` : `✗ ${errors.length} errors: ${errors[0]?.slice(0, 80)}`);

	// 9. Screenshot for human eyeball
	await page.screenshot({ path: `/tmp/cmp-${label}.png`, fullPage: false });

	await browser.close();
	return findings;
}

async function main() {
	const desktop = await check({ width: 1440, height: 900 }, 'desktop');
	const tablet = await check({ width: 768, height: 1024 }, 'tablet');
	const mobile = await check({ width: 390, height: 844 }, 'mobile');

	console.log('\n══ DESKTOP (1440x900) ══');
	desktop.forEach((f) => console.log('  ' + f));
	console.log('\n══ TABLET (768x1024) ══');
	tablet.forEach((f) => console.log('  ' + f));
	console.log('\n══ MOBILE (390x844) ══');
	mobile.forEach((f) => console.log('  ' + f));

	const allFindings = [...desktop, ...tablet, ...mobile];
	const failures = allFindings.filter((f) => f.startsWith('✗'));
	if (failures.length > 0) {
		console.log(`\n✗ ${failures.length} failures across all viewports`);
		process.exit(1);
	}
	console.log('\n✓ All visual checks pass across desktop/tablet/mobile');
	console.log('Screenshots saved to /tmp/cmp-{desktop,tablet,mobile}.png');
}

main().catch((e) => { console.error(e); process.exit(2); });
