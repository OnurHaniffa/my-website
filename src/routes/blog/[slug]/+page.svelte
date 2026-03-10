<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Container, Section } from '$lib/components/layout';
	import { getLocale, getLocalePath } from '$lib/i18n/index.svelte';

	let { data } = $props();
	const post = data.post;

	const locale = $derived(getLocale());
	const isEn = $derived(locale === 'en');

	const title = $derived(isEn ? post.title : post.titleTr);
	const description = $derived(isEn ? post.description : post.descriptionTr);
	const content = $derived(isEn ? post.content : post.contentTr);
	const category = $derived(isEn ? post.category : post.categoryTr);
	const readTime = $derived(isEn ? post.readTime : post.readTimeTr);
	const formattedDate = $derived(new Date(post.date).toLocaleDateString(isEn ? 'en-US' : 'tr-TR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}));

	// Count h2 headings for numbering
	let h2Counter = 0;

	function markdownToHtml(md: string): string {
		h2Counter = 0;

		let html = md
			// h3 first (before h2)
			.replace(/^### (.*$)/gim, '<h3>$1</h3>')
			// h2 with section numbering and decorative styling
			.replace(/^## (.*$)/gim, () => {
				h2Counter++;
				return `</section><section class="blog-section"><h2><span class="h2-number">0${h2Counter}</span>$1</h2>`;
			})
			// Bold
			.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
			// Inline code
			.replace(/`([^`]+)`/g, '<code>$1</code>')
			// List items
			.replace(/^- (.*$)/gim, '<li>$1</li>');

		// Wrap consecutive <li> in <ul>
		html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

		// Detect pricing patterns and wrap in card (e.g., "15,000 - 30,000 TL" or "$500 - $1,500")
		html = html.replace(
			/<h3>(.*?(?:Tier|Kademe|Landing|E-Commerce|E-Ticaret|Business|Kurumsal|Advanced|Gelişmiş|Custom|Özel).*?)<\/h3>/gi,
			'<div class="pricing-card"><h3>$1</h3>'
		);
		// Close pricing cards before next h3 or h2 or section end
		html = html.replace(/<div class="pricing-card">([\s\S]*?)(?=<div class="pricing-card">|<\/section>|<h2|$)/g, (match) => {
			if (!match.endsWith('</div>')) return match + '</div>';
			return match;
		});

		// Detect numbered lists (1. 2. 3. etc)
		html = html.replace(/^(\d+)\.\s+(.*$)/gim, '<li class="numbered"><span class="num">$1</span>$2</li>');
		html = html.replace(/(<li class="numbered">.*<\/li>\n?)+/g, (match) => `<ol class="numbered-list">${match}</ol>`);

		// Split into blocks by double newline
		const blocks = html.split(/\n\n+/);
		const processed = blocks.map(block => {
			const trimmed = block.trim();
			if (!trimmed) return '';
			if (/^<(h[2-6]|ul|ol|li|blockquote|div|section|\/section|table|pre|code)/.test(trimmed)) {
				return trimmed;
			}
			return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
		});

		let result = processed.filter(Boolean).join('\n');
		// Clean up empty section tags
		result = result.replace(/<\/section><section class="blog-section">/, '<section class="blog-section">');
		// Ensure last section is closed
		if (result.includes('<section class="blog-section">') && !result.endsWith('</section>')) {
			result += '</section>';
		}

		return result;
	}

	const htmlContent = $derived(markdownToHtml(content));
</script>

<svelte:head>
	<title>{title} | Onur Haniffa Blog</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={post.date} />
	<meta property="article:author" content="Onur Haniffa" />
	<meta property="article:section" content={category} />
	<meta property="article:tag" content={isEn ? post.category : post.categoryTr} />
	<meta name="twitter:title" content={`${title} | Onur Haniffa Blog`} />
	<meta name="twitter:description" content={description} />

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: title,
		description: description,
		datePublished: post.date,
		author: {
			'@type': 'Person',
			name: 'Onur Haniffa',
			url: 'https://onurhaniffa.com'
		},
		publisher: {
			'@type': 'Organization',
			name: 'Onur Haniffa',
			url: 'https://onurhaniffa.com'
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://onurhaniffa.com/blog/${post.slug}`
		}
	})}</script>`}
</svelte:head>

<!-- Blog Header -->
<Section padding="none" class="relative pt-24 pb-0 lg:pt-28">
	<!-- Subtle background gradient -->
	<div class="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent pointer-events-none"></div>

	<Container size="content" class="relative">
		<a href={getLocalePath('/blog')} class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:-translate-x-1"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
			{isEn ? 'Back to Blog' : 'Bloga Dön'}
		</a>

		<div class="flex items-center gap-3 mb-5">
			<Badge variant="outline" class="text-xs border-primary/30 text-primary bg-primary/5">{category}</Badge>
			<span class="text-xs text-muted-foreground">{readTime}</span>
			<span class="text-xs text-muted-foreground">&middot;</span>
			<time class="text-xs text-muted-foreground">{formattedDate}</time>
		</div>

		<h1 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-5 leading-[1.15]">
			{title}
		</h1>

		<p class="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
			{description}
		</p>

		<!-- Author row with share hint -->
		<div class="flex items-center justify-between pb-8 border-b border-border/50">
			<div class="flex items-center gap-3">
				<div class="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-sm ring-2 ring-primary/20">OH</div>
				<div>
					<p class="font-semibold text-sm">Onur Haniffa</p>
					<p class="text-xs text-muted-foreground">{isEn ? 'Web Designer & Developer, Istanbul' : 'Web Tasarımcı & Geliştirici, İstanbul'}</p>
				</div>
			</div>
		</div>
	</Container>
</Section>

<!-- Blog Body -->
<Section padding="none" class="py-10 lg:py-14">
	<Container size="content">
		<article class="blog-content">
			{@html htmlContent}
		</article>

		<!-- CTA Card -->
		<div class="mt-16 relative overflow-hidden rounded-2xl border border-primary/20">
			<div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"></div>
			<div class="relative p-8 sm:p-10 text-center">
				<div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
				</div>
				<h3 class="text-2xl font-bold mb-2">
					{isEn ? 'Ready to Start Your Project?' : 'Projenize Başlamaya Hazır mısınız?'}
				</h3>
				<p class="text-muted-foreground mb-6 max-w-md mx-auto">
					{isEn
						? "Free consultation — let's discuss what you need and I'll give you a clear quote."
						: 'Ücretsiz danışmanlık — ihtiyaçlarınızı konuşalım, size net bir teklif sunayım.'}
				</p>
				<div class="flex flex-wrap justify-center gap-3">
					<Button href={getLocalePath('/contact')} class="rounded-full px-8 shadow-lg shadow-primary/25">
						{isEn ? 'Get a Free Quote' : 'Ücretsiz Teklif Alın'}
					</Button>
					<a href="https://wa.me/905428324550" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 transition-colors text-sm font-medium">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
						WhatsApp
					</a>
				</div>
			</div>
		</div>
	</Container>
</Section>

<style>
	/* ═══════════════════════════════════════════════
	   BLOG ARTICLE TYPOGRAPHY & VISUAL DESIGN
	   ═══════════════════════════════════════════════ */

	/* --- Sections --- */
	.blog-content :global(.blog-section) {
		margin-top: 3rem;
		padding-top: 2.5rem;
		border-top: 1px solid hsl(var(--border) / 0.4);
	}

	.blog-content :global(.blog-section:first-child) {
		margin-top: 0;
		padding-top: 0;
		border-top: none;
	}

	/* --- H2 Headings with number accent --- */
	.blog-content :global(h2) {
		font-size: 1.75rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		color: var(--foreground);
		margin-bottom: 1.25rem;
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		line-height: 1.3;
	}

	.blog-content :global(.h2-number) {
		font-size: 0.875rem;
		font-weight: 700;
		color: hsl(var(--primary));
		background: hsl(var(--primary) / 0.1);
		padding: 0.25rem 0.625rem;
		border-radius: 0.5rem;
		flex-shrink: 0;
		font-variant-numeric: tabular-nums;
	}

	/* --- H3 Subheadings --- */
	.blog-content :global(h3) {
		font-size: 1.25rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--foreground);
		margin-top: 2rem;
		margin-bottom: 0.75rem;
		padding-left: 0.875rem;
		border-left: 3px solid hsl(var(--primary) / 0.4);
	}

	/* --- Paragraphs --- */
	.blog-content :global(p) {
		font-size: 1.0625rem;
		line-height: 1.85;
		color: hsl(var(--muted-foreground));
		margin-bottom: 1.5rem;
	}

	/* --- Bold / Strong --- */
	.blog-content :global(strong) {
		color: var(--foreground);
		font-weight: 600;
	}

	/* --- Inline code --- */
	.blog-content :global(code) {
		font-size: 0.9em;
		background: hsl(var(--muted));
		padding: 0.15rem 0.4rem;
		border-radius: 0.25rem;
		font-family: ui-monospace, monospace;
	}

	/* --- Unordered lists --- */
	.blog-content :global(ul) {
		margin-top: 0.75rem;
		margin-bottom: 1.75rem;
		padding: 1.25rem 1.5rem;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
		background: hsl(var(--muted) / 0.4);
		border-radius: 0.75rem;
		border: 1px solid hsl(var(--border) / 0.3);
	}

	.blog-content :global(li) {
		font-size: 1rem;
		line-height: 1.7;
		color: hsl(var(--muted-foreground));
		padding-left: 1.25rem;
		position: relative;
	}

	.blog-content :global(li::before) {
		content: '';
		position: absolute;
		left: 0;
		top: 0.65em;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: hsl(var(--primary));
		opacity: 0.6;
	}

	/* --- Numbered lists --- */
	.blog-content :global(.numbered-list) {
		margin-top: 0.75rem;
		margin-bottom: 1.75rem;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		counter-reset: none;
		background: none;
		border: none;
	}

	.blog-content :global(.numbered) {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 0.875rem 1rem;
		background: hsl(var(--muted) / 0.3);
		border-radius: 0.625rem;
		border: 1px solid hsl(var(--border) / 0.2);
		padding-left: 1rem;
	}

	.blog-content :global(.numbered::before) {
		display: none;
	}

	.blog-content :global(.num) {
		flex-shrink: 0;
		width: 1.75rem;
		height: 1.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: hsl(var(--primary) / 0.1);
		color: hsl(var(--primary));
		font-size: 0.8rem;
		font-weight: 700;
	}

	/* --- Pricing cards --- */
	.blog-content :global(.pricing-card) {
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		padding: 1.5rem;
		border-radius: 1rem;
		background: hsl(var(--card));
		border: 1px solid hsl(var(--border) / 0.5);
		box-shadow: 0 1px 3px hsl(var(--foreground) / 0.04);
		transition: border-color 0.2s, box-shadow 0.2s;
	}

	.blog-content :global(.pricing-card:hover) {
		border-color: hsl(var(--primary) / 0.3);
		box-shadow: 0 4px 20px hsl(var(--primary) / 0.08);
	}

	.blog-content :global(.pricing-card h3) {
		border-left: 3px solid hsl(var(--primary));
		color: var(--foreground);
		font-size: 1.2rem;
		margin-top: 0;
		margin-bottom: 1rem;
	}

	.blog-content :global(.pricing-card ul) {
		background: hsl(var(--muted) / 0.25);
		margin-bottom: 0.75rem;
	}

	/* --- Links --- */
	.blog-content :global(a) {
		color: hsl(var(--primary));
		text-decoration: underline;
		text-decoration-color: hsl(var(--primary) / 0.3);
		text-underline-offset: 2px;
		font-weight: 500;
		transition: text-decoration-color 0.2s;
	}

	.blog-content :global(a:hover) {
		text-decoration-color: hsl(var(--primary));
	}

	/* --- Responsive --- */
	@media (min-width: 640px) {
		.blog-content :global(h2) {
			font-size: 2rem;
		}
		.blog-content :global(h3) {
			font-size: 1.375rem;
		}
		.blog-content :global(.pricing-card) {
			padding: 2rem;
		}
	}
</style>
