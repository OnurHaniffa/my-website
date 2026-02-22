import type { RequestHandler } from './$types';
import { blogPosts } from '$lib/data/blog-posts';

const SITE_URL = 'https://onurhaniffa.com';

export const GET: RequestHandler = async () => {
	const items = blogPosts
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.map(
			(post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${SITE_URL}/blog/${post.slug}/</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}/</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
    </item>`
		)
		.join('\n');

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Onur Haniffa - Web Design Blog</title>
    <description>Web design and development insights from Istanbul-based designer Onur Haniffa. Tips on web design, SEO, SvelteKit, and growing your business online.</description>
    <link>${SITE_URL}/blog/</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>contact@onurhaniffa.com (Onur Haniffa)</managingEditor>
    <webMaster>contact@onurhaniffa.com (Onur Haniffa)</webMaster>
    <image>
      <url>${SITE_URL}/favicon-192x192.png</url>
      <title>Onur Haniffa - Web Design Blog</title>
      <link>${SITE_URL}/blog/</link>
    </image>
${items}
  </channel>
</rss>`;

	return new Response(rss.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
