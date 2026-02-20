import type { RequestHandler } from './$types';

const SITE_URL = 'https://onurhaniffa.com';

const pages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/services/', priority: '0.9', changefreq: 'monthly' },
	{ path: '/work/', priority: '0.9', changefreq: 'monthly' },
	{ path: '/about/', priority: '0.8', changefreq: 'monthly' },
	{ path: '/contact/', priority: '0.8', changefreq: 'monthly' },
	{ path: '/istanbul-web-design/', priority: '0.9', changefreq: 'monthly' },
	{ path: '/blog/', priority: '0.8', changefreq: 'weekly' }
];

const locales = ['en', 'tr'] as const;

function getLocalePath(path: string, locale: string): string {
	if (locale === 'en') return path;
	return `/tr${path === '/' ? '/' : path}`;
}

export const GET: RequestHandler = async () => {
	const today = new Date().toISOString().split('T')[0];

	const urls = pages
		.map((page) => {
			const alternates = locales
				.map(
					(locale) =>
						`    <xhtml:link rel="alternate" hreflang="${locale}" href="${SITE_URL}${getLocalePath(page.path, locale)}" />`
				)
				.join('\n');

			const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${page.path}" />`;

			return `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${alternates}
${xDefault}
  </url>
  <url>
    <loc>${SITE_URL}/tr${page.path === '/' ? '/' : page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${alternates}
${xDefault}
  </url>`;
		})
		.join('\n');

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
