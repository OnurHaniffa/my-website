import type { RequestHandler } from './$types';
import { blogPosts } from '$lib/data/blog-posts';

const SITE_URL = 'https://onurhaniffa.com';

const pages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly', lastmod: '2026-03-27' },
	{ path: '/services/', priority: '0.9', changefreq: 'monthly', lastmod: '2026-02-10' },
	{ path: '/work/', priority: '0.9', changefreq: 'monthly', lastmod: '2026-02-10' },
	{ path: '/about/', priority: '0.8', changefreq: 'monthly', lastmod: '2026-02-10' },
	{ path: '/contact/', priority: '0.8', changefreq: 'monthly', lastmod: '2026-02-10' },
	{ path: '/blog/', priority: '0.8', changefreq: 'weekly', lastmod: '2026-02-15' }
];

const locales = ['en', 'tr'] as const;

function getLocalePath(path: string, locale: string): string {
	if (locale === 'en') return path;
	return `/tr${path === '/' ? '/' : path}`;
}

function generateUrlEntry(path: string, lastmod: string, changefreq: string, priority: string): string {
	const alternates = locales
		.map(
			(locale) =>
				`    <xhtml:link rel="alternate" hreflang="${locale}" href="${SITE_URL}${getLocalePath(path, locale)}" />`
		)
		.join('\n');

	const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${path}" />`;

	return `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternates}
${xDefault}
  </url>
  <url>
    <loc>${SITE_URL}/tr${path === '/' ? '/' : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternates}
${xDefault}
  </url>`;
}

export const GET: RequestHandler = async () => {
	// Generate URLs for static pages
	const pageUrls = pages
		.map((page) => generateUrlEntry(page.path, page.lastmod, page.changefreq, page.priority))
		.join('\n');

	// Generate URLs for blog posts
	const blogUrls = blogPosts
		.map((post) =>
			generateUrlEntry(`/blog/${post.slug}/`, post.date, 'monthly', '0.7')
		)
		.join('\n');

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pageUrls}
${blogUrls}
</urlset>`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
