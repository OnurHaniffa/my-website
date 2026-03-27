import { test } from '@playwright/test';

test('final verification screenshots', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto('/', { waitUntil: 'networkidle' });
	await page.waitForTimeout(3500);

	// Hero
	await page.screenshot({ path: 'tests/screenshots/final-01-hero.png' });

	// Portfolio (case study columns)
	const portfolio = page.locator('text=Recent').first();
	await portfolio.scrollIntoViewIfNeeded();
	await page.waitForTimeout(800);
	await page.screenshot({ path: 'tests/screenshots/final-02-portfolio.png' });

	// Scroll down to see full portfolio
	await page.evaluate(() => window.scrollBy(0, 500));
	await page.waitForTimeout(400);
	await page.screenshot({ path: 'tests/screenshots/final-02b-portfolio-bottom.png' });

	// Pricing
	const pricing = page.locator('text=Transparent').first();
	await pricing.scrollIntoViewIfNeeded();
	await page.waitForTimeout(800);
	await page.screenshot({ path: 'tests/screenshots/final-03-pricing.png' });

	// Pricing cards detail
	await page.evaluate(() => window.scrollBy(0, 350));
	await page.waitForTimeout(400);
	await page.screenshot({ path: 'tests/screenshots/final-04-pricing-cards.png' });

	// Testimonials
	const test2 = page.locator('text=What Clients').first();
	await test2.scrollIntoViewIfNeeded();
	await page.waitForTimeout(600);
	await page.evaluate(() => window.scrollBy(0, 200));
	await page.waitForTimeout(400);
	await page.screenshot({ path: 'tests/screenshots/final-05-testimonials.png' });

	// Full page
	await page.screenshot({ path: 'tests/screenshots/final-00-full.png', fullPage: true });
});
