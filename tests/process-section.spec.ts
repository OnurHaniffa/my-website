import { test, expect } from '@playwright/test';

test.describe('FAQ Section', () => {
	test('FAQ answers should appear as overlays without shifting page', async ({ page }) => {
		await page.goto('/services');

		// Wait for FAQ section
		await page.waitForSelector('.faq-item', { timeout: 10000 });

		// Get initial page height
		const initialHeight = await page.evaluate(() => document.body.scrollHeight);

		// Click each FAQ and check answer appears without major page shift
		const faqItems = await page.locator('.faq-item').all();

		for (let i = 0; i < faqItems.length; i++) {
			const item = faqItems[i];
			const button = item.locator('button');

			// Click to open
			await button.click();
			await page.waitForTimeout(250);

			// Check answer tooltip is visible
			const answer = item.locator('.absolute');
			await expect(answer).toBeVisible();

			// Check page height hasn't changed significantly
			const currentHeight = await page.evaluate(() => document.body.scrollHeight);
			expect(Math.abs(currentHeight - initialHeight)).toBeLessThanOrEqual(20);

			console.log(`FAQ ${i + 1}: answer visible, page height stable`);

			// Click to close
			await button.click();
			await page.waitForTimeout(100);
		}
	});
});

test.describe('Process Section', () => {
	test('all process cards should have the same height', async ({ page }) => {
		await page.goto('/services');

		// Wait for the process section to be visible
		await page.waitForSelector('.process-card', { timeout: 10000 });

		// Get all process cards
		const cards = await page.locator('.process-card .card-inner').all();
		expect(cards.length).toBe(5);

		// Get heights of all cards
		const heights: number[] = [];
		for (const card of cards) {
			const box = await card.boundingBox();
			if (box) {
				heights.push(Math.round(box.height));
			}
		}

		// All heights should be equal (within 2px tolerance for rendering differences)
		const firstHeight = heights[0];
		for (const height of heights) {
			expect(Math.abs(height - firstHeight)).toBeLessThanOrEqual(2);
		}

		console.log('Card heights:', heights);
	});

	test('text should not overflow outside cards', async ({ page }) => {
		await page.goto('/services');

		await page.waitForSelector('.process-card', { timeout: 10000 });

		// Check each card's text is contained within the card
		const cards = await page.locator('.process-card').all();

		for (let i = 0; i < cards.length; i++) {
			const card = cards[i];
			const cardInner = card.locator('.card-inner');
			const cardText = card.locator('.card-text');

			const cardBox = await cardInner.boundingBox();
			const textBox = await cardText.boundingBox();

			if (cardBox && textBox) {
				// Text should be within card bounds
				expect(textBox.y).toBeGreaterThanOrEqual(cardBox.y);
				expect(textBox.y + textBox.height).toBeLessThanOrEqual(cardBox.y + cardBox.height + 5);

				console.log(`Card ${i + 1}: text fits within bounds`);
			}
		}
	});

	test('hovering should show tooltip without shifting page', async ({ page }) => {
		await page.goto('/services');

		await page.waitForSelector('.process-card', { timeout: 10000 });

		// Get initial page height
		const initialHeight = await page.evaluate(() => document.body.scrollHeight);

		// Hover over each card and check tooltip appears
		const cards = await page.locator('.process-card').all();

		for (let i = 0; i < cards.length; i++) {
			const card = cards[i];

			// Hover over the card
			await card.hover();

			// Wait a bit for animation
			await page.waitForTimeout(200);

			// Check tooltip is visible
			const tooltip = card.locator('.step-details');
			await expect(tooltip).toBeVisible();

			// Check page height hasn't changed significantly (tooltip should overlay, not push)
			// Allow up to 20px tolerance for hover animations and minor rendering differences
			const currentHeight = await page.evaluate(() => document.body.scrollHeight);
			expect(Math.abs(currentHeight - initialHeight)).toBeLessThanOrEqual(20);

			console.log(`Card ${i + 1}: tooltip visible, page height stable`);
		}
	});
});
