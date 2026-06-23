// Verify the cost calculator: renders, is TR, estimate updates on input,
// WhatsApp CTA reflects selections, no console errors.
import { chromium } from 'playwright';

const URL = 'http://localhost:5173/web-sitesi-maliyet-hesaplama/';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

const out = [];
await page.goto(URL, { waitUntil: 'networkidle' });

// lang
const lang = await page.evaluate(() => document.documentElement.lang);
out.push(lang === 'tr' ? '✓ lang=tr' : `✗ lang=${lang}`);

// no horizontal scroll
const hScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
out.push(hScroll ? '✗ horizontal scroll' : '✓ no horizontal scroll');

// read the estimate text
async function estimate() {
	return (await page.locator('.calc-gradient-text.tabular-nums, p.tabular-nums .calc-gradient-text').first().textContent().catch(() => null))
		|| (await page.locator('text=/\\d[\\d.]*–\\d[\\d.]*/').first().textContent());
}
const before = await page.locator('p.tabular-nums').first().textContent();
out.push(`default estimate: ${before?.trim()}`);

// switch site type to E-Ticaret → estimate should change/increase
await page.getByRole('button', { name: /E-Ticaret Sitesi/ }).click();
await page.waitForTimeout(150);
const afterType = await page.locator('p.tabular-nums').first().textContent();
out.push(afterType !== before ? `✓ estimate updates on type change → ${afterType?.trim()}` : `✗ estimate did NOT change on type change`);

// toggle a feature (Çok dilli) → estimate should increase further
await page.getByRole('button', { name: /Çok dilli/ }).click();
await page.waitForTimeout(150);
const afterFeat = await page.locator('p.tabular-nums').first().textContent();
out.push(afterFeat !== afterType ? `✓ estimate updates on feature toggle → ${afterFeat?.trim()}` : `✗ estimate did NOT change on feature toggle`);

// WhatsApp CTA present + reflects selection
const waHref = await page.locator('a[href^="https://wa.me/"]').first().getAttribute('href');
const decoded = decodeURIComponent(waHref || '');
out.push(/E-Ticaret/.test(decoded) && /Çok dilli/.test(decoded) ? '✓ WhatsApp msg reflects selections' : '✗ WhatsApp msg missing selections');

// FAQ schema + WebApplication schema
const schemas = await page.evaluate(() => Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((s) => s.textContent || ''));
out.push(schemas.some((s) => s.includes('FAQPage')) ? '✓ FAQ schema' : '✗ FAQ schema missing');
out.push(schemas.some((s) => s.includes('WebApplication')) ? '✓ WebApplication schema' : '✗ WebApplication schema missing');

out.push(errors.length === 0 ? '✓ 0 console errors' : `✗ ${errors.length} errors: ${errors[0]?.slice(0,90)}`);

await page.screenshot({ path: '/tmp/calculator.png', fullPage: false });
await browser.close();

console.log(out.join('\n'));
const failed = out.filter((l) => l.startsWith('✗'));
if (failed.length) { console.log(`\n${failed.length} FAILURES`); process.exit(1); }
console.log('\n✓ calculator verified');
