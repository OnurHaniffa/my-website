import { test } from '@playwright/test';

test('extra section screenshots', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto('/', { waitUntil: 'networkidle' });
	await page.waitForTimeout(3500);

	// Process section
	const process = page.locator('text=How I Build').first();
	await process.scrollIntoViewIfNeeded();
	await page.waitForTimeout(800);
	await page.screenshot({ path: 'tests/screenshots/extra-process.png' });

	// Scroll down to see more process
	await page.evaluate(() => window.scrollBy(0, 400));
	await page.waitForTimeout(400);
	await page.screenshot({ path: 'tests/screenshots/extra-process-2.png' });

	// Industry section
	const industry = page.locator('text=Industry').first();
	await industry.scrollIntoViewIfNeeded();
	await page.waitForTimeout(600);
	await page.screenshot({ path: 'tests/screenshots/extra-industry.png' });

	// CTA
	const cta = page.locator('text=Start Your Project on WhatsApp').first();
	await cta.scrollIntoViewIfNeeded();
	await page.waitForTimeout(500);
	await page.screenshot({ path: 'tests/screenshots/extra-cta.png' });
});
