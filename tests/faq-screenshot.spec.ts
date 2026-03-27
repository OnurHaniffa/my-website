import { test } from '@playwright/test';

test('capture FAQ section', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto('/', { waitUntil: 'networkidle' });
	await page.waitForTimeout(3500);

	const faq = page.locator('text=Frequently Asked').first();
	await faq.scrollIntoViewIfNeeded();
	await page.waitForTimeout(600);
	await page.screenshot({ path: 'tests/screenshots/faq-section.png' });
	
	// Scroll down to see more FAQs
	await page.evaluate(() => window.scrollBy(0, 400));
	await page.waitForTimeout(400);
	await page.screenshot({ path: 'tests/screenshots/faq-section-2.png' });
});
