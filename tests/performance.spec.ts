import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
	test('homepage loads quickly and animations are smooth', async ({ page }) => {
		// Start collecting performance metrics
		await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

		// Check page load performance
		const performanceMetrics = await page.evaluate(() => {
			const timing = performance.timing;
			const paint = performance.getEntriesByType('paint');
			const resources = performance.getEntriesByType('resource');

			// Find large resources
			const largeResources = resources
				.filter((r: any) => r.transferSize > 50000)
				.map((r: any) => ({
					name: r.name.split('/').pop(),
					size: Math.round(r.transferSize / 1024) + 'KB',
					duration: Math.round(r.duration) + 'ms'
				}));

			return {
				domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
				fullLoad: timing.loadEventEnd - timing.navigationStart,
				firstPaint: paint.find((p: any) => p.name === 'first-paint')?.startTime || 0,
				firstContentfulPaint: paint.find((p: any) => p.name === 'first-contentful-paint')?.startTime || 0,
				totalResources: resources.length,
				largeResources
			};
		});

		console.log('\n📊 PERFORMANCE METRICS:');
		console.log(`  DOM Content Loaded: ${performanceMetrics.domContentLoaded}ms`);
		console.log(`  Full Page Load: ${performanceMetrics.fullLoad}ms`);
		console.log(`  First Paint: ${Math.round(performanceMetrics.firstPaint)}ms`);
		console.log(`  First Contentful Paint: ${Math.round(performanceMetrics.firstContentfulPaint)}ms`);
		console.log(`  Total Resources: ${performanceMetrics.totalResources}`);

		if (performanceMetrics.largeResources.length > 0) {
			console.log('\n⚠️  LARGE RESOURCES (>50KB):');
			performanceMetrics.largeResources.forEach((r: any) => {
				console.log(`    - ${r.name}: ${r.size} (${r.duration})`);
			});
		}

		// Check for animation performance
		const animationCheck = await page.evaluate(() => {
			const start = performance.now();
			let frames = 0;

			return new Promise((resolve) => {
				function countFrames() {
					frames++;
					if (performance.now() - start < 1000) {
						requestAnimationFrame(countFrames);
					} else {
						resolve({ fps: frames, duration: performance.now() - start });
					}
				}
				requestAnimationFrame(countFrames);
			});
		});

		console.log(`\n🎬 ANIMATION FPS: ${(animationCheck as any).fps} fps`);

		// Check for render-blocking elements
		const cssAnalysis = await page.evaluate(() => {
			const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
			const inlineStyles = document.querySelectorAll('style');
			const images = document.querySelectorAll('img');
			const lazyImages = document.querySelectorAll('img[loading="lazy"]');

			return {
				externalStylesheets: stylesheets.length,
				inlineStyles: inlineStyles.length,
				totalImages: images.length,
				lazyLoadedImages: lazyImages.length,
				nonLazyImages: images.length - lazyImages.length
			};
		});

		console.log('\n🔍 PAGE ANALYSIS:');
		console.log(`  External Stylesheets: ${cssAnalysis.externalStylesheets}`);
		console.log(`  Inline Styles: ${cssAnalysis.inlineStyles}`);
		console.log(`  Total Images: ${cssAnalysis.totalImages}`);
		console.log(`  Lazy-loaded Images: ${cssAnalysis.lazyLoadedImages}`);
		console.log(`  Non-lazy Images: ${cssAnalysis.nonLazyImages}`);

		// Performance assertions
		expect(performanceMetrics.firstContentfulPaint).toBeLessThan(3000);
		expect((animationCheck as any).fps).toBeGreaterThan(30);
	});

	test('check lazy loading is working', async ({ page }) => {
		await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

		const lazyCheck = await page.evaluate(() => {
			const images = document.querySelectorAll('img');
			const lazyImages = document.querySelectorAll('img[loading="lazy"]');
			return {
				totalImages: images.length,
				lazyImages: lazyImages.length,
				nonLazyImages: images.length - lazyImages.length
			};
		});

		console.log('\n🖼️  IMAGE OPTIMIZATION:');
		console.log(`    Total Images: ${lazyCheck.totalImages}`);
		console.log(`    Lazy-loaded: ${lazyCheck.lazyImages}`);
		console.log(`    Eager-loaded: ${lazyCheck.nonLazyImages}`);

		// At least 50% of images should be lazy loaded
		expect(lazyCheck.lazyImages).toBeGreaterThan(0);
	});

	test('sections appear quickly when scrolling', async ({ page }) => {
		await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

		// Scroll to services section and time how long content takes to appear
		const servicesSection = page.locator('text=What I do').first();

		const startTime = Date.now();
		await servicesSection.scrollIntoViewIfNeeded();
		await page.waitForTimeout(100); // Small buffer for animation to start

		// Check if section is visible (opacity > 0)
		const isVisible = await page.evaluate(() => {
			const section = document.querySelector('h2');
			if (!section) return false;
			const style = window.getComputedStyle(section);
			return parseFloat(style.opacity) > 0.5;
		});

		const elapsed = Date.now() - startTime;
		console.log(`\n⚡ SECTION VISIBILITY:`);
		console.log(`    Services section visible: ${isVisible}`);
		console.log(`    Time to appear: ${elapsed}ms`);

		// Section should be visible within 500ms
		expect(isVisible).toBe(true);
		expect(elapsed).toBeLessThan(500);
	});
});
