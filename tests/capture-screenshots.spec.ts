import { test } from '@playwright/test';

test('capture fresh project screenshots', async ({ page }) => {
	// Try to capture Designs by Joe in light mode
	try {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('https://designsbyjoe.net', { waitUntil: 'networkidle', timeout: 15000 });
		await page.waitForTimeout(3000);
		await page.screenshot({ path: 'static/images/projects/joe-fresh-desktop.png' });

		// Mobile
		await page.setViewportSize({ width: 390, height: 844 });
		await page.waitForTimeout(1000);
		await page.screenshot({ path: 'static/images/projects/joe-fresh-mobile.png' });
	} catch (e) {
		console.log('Could not capture designsbyjoe.net:', e);
	}

	// Try Pearl Dental mobile
	try {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto('https://pearldental.com', { waitUntil: 'networkidle', timeout: 15000 });
		await page.waitForTimeout(2000);
		await page.screenshot({ path: 'static/images/projects/dental-fresh-mobile.png' });
	} catch (e) {
		console.log('Could not capture pearldental.com:', e);
	}
});

test('screenshot current page issues', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto('http://localhost:5175/', { waitUntil: 'networkidle' });
	await page.waitForTimeout(3500);

	// Hero
	await page.screenshot({ path: 'tests/screenshots/issue-hero.png' });

	// Portfolio
	const portfolio = page.locator('text=Recent').first();
	await portfolio.scrollIntoViewIfNeeded();
	await page.waitForTimeout(800);
	await page.screenshot({ path: 'tests/screenshots/issue-portfolio.png' });

	// Pricing
	const pricing = page.locator('text=Transparent').first();
	await pricing.scrollIntoViewIfNeeded();
	await page.waitForTimeout(800);
	await page.screenshot({ path: 'tests/screenshots/issue-pricing.png' });

	// CTA
	const cta = page.locator('text=Start Your Project on WhatsApp').first();
	await cta.scrollIntoViewIfNeeded();
	await page.waitForTimeout(500);
	await page.screenshot({ path: 'tests/screenshots/issue-cta.png' });
});
