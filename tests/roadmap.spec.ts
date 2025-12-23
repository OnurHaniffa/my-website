import { test, expect } from '@playwright/test';

test.describe('Process Roadmap S-Curve', () => {
	test('roadmap displays correctly with all 4 segments', async ({ page }) => {
		await page.goto('http://localhost:5173/services');
		await page.waitForLoadState('networkidle');

		// Check the SVG exists
		const svg = page.locator('[data-testid="roadmap-svg"]');
		await expect(svg).toBeVisible();

		// Check all 4 segments exist and are visible
		for (let i = 1; i <= 4; i++) {
			const segment = page.locator(`[data-testid="segment-${i}"]`);
			await expect(segment).toBeVisible();
		}

		// Check all 4 labels exist
		const labels = ['Discovery', 'Design', 'Develop', 'Launch'];
		for (let i = 0; i < labels.length; i++) {
			const label = page.locator(`[data-testid="label-${i + 1}"]`);
			await expect(label).toBeVisible();
			await expect(label).toHaveText(labels[i]);
		}

		// Check segment colors
		const segment1 = page.locator('[data-testid="segment-1"]');
		const segment2 = page.locator('[data-testid="segment-2"]');
		const segment3 = page.locator('[data-testid="segment-3"]');
		const segment4 = page.locator('[data-testid="segment-4"]');

		await expect(segment1).toHaveAttribute('fill', '#0d9488'); // Teal
		await expect(segment2).toHaveAttribute('fill', '#f97316'); // Orange
		await expect(segment3).toHaveAttribute('fill', '#e11d48'); // Rose
		await expect(segment4).toHaveAttribute('fill', '#eab308'); // Amber

		console.log('✅ All 4 segments visible with correct colors');
	});

	test('numbers are positioned correctly (01,03 below - 02,04 above)', async ({ page }) => {
		await page.goto('http://localhost:5173/services');
		await page.waitForLoadState('networkidle');

		// Check that 02 and 04 appear BEFORE the SVG (above)
		const topSection = page.locator('.hidden.md\\:block.relative > .absolute.top-0');
		await expect(topSection.locator('text=02')).toBeVisible();
		await expect(topSection.locator('text=04')).toBeVisible();

		// Check that 01 and 03 appear AFTER the SVG (below)
		const bottomSection = page.locator('.hidden.md\\:block.relative > .flex').last();
		await expect(bottomSection.locator('text=01')).toBeVisible();
		await expect(bottomSection.locator('text=03')).toBeVisible();

		console.log('✅ Numbers positioned correctly: 02,04 above | 01,03 below');
	});

	test('S-curve forms a connected flowing shape', async ({ page }) => {
		await page.goto('http://localhost:5173/services');
		await page.waitForLoadState('networkidle');

		// Take a screenshot for visual verification
		const svg = page.locator('[data-testid="roadmap-svg"]');
		await svg.screenshot({ path: 'tests/screenshots/roadmap-s-curve.png' });

		// Verify the segments are in order from left to right
		const segment1Box = await page.locator('[data-testid="segment-1"]').boundingBox();
		const segment2Box = await page.locator('[data-testid="segment-2"]').boundingBox();
		const segment3Box = await page.locator('[data-testid="segment-3"]').boundingBox();
		const segment4Box = await page.locator('[data-testid="segment-4"]').boundingBox();

		if (segment1Box && segment2Box && segment3Box && segment4Box) {
			// Each segment's RIGHT edge should extend further right than previous
			// (segments connect/overlap at endpoints, so we check right edge)
			const seg1Right = segment1Box.x + segment1Box.width;
			const seg2Right = segment2Box.x + segment2Box.width;
			const seg3Right = segment3Box.x + segment3Box.width;
			const seg4Right = segment4Box.x + segment4Box.width;

			expect(seg2Right).toBeGreaterThan(seg1Right);
			expect(seg3Right).toBeGreaterThan(seg2Right);
			expect(seg4Right).toBeGreaterThan(seg3Right);
			console.log('✅ Segments flow from left to right');
		}
	});

	test('descriptions match the process steps', async ({ page }) => {
		await page.goto('http://localhost:5173/services');
		await page.waitForLoadState('networkidle');

		// Target only the desktop layout
		const desktopLayout = page.locator('.hidden.md\\:block.relative');

		// Check descriptions for steps with numbers below (01, 03)
		await expect(desktopLayout.locator('text=We talk about your')).toBeVisible();
		await expect(desktopLayout.locator('text=Clean code built')).toBeVisible();

		// Check descriptions for steps with numbers above (02, 04)
		await expect(desktopLayout.locator('text=Mockups & iteration').first()).toBeVisible();
		await expect(desktopLayout.locator('text=Go live with ongoing').first()).toBeVisible();

		console.log('✅ All descriptions visible and correct');
	});
});
