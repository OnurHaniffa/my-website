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

	function markdownToHtml(md: string): string {
		let html = md
			// Headings
			.replace(/^### (.*$)/gim, '<h3>$1</h3>')
			.replace(/^## (.*$)/gim, '<h2>$1</h2>')
			// Bold
			.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
			// List items
			.replace(/^- (.*$)/gim, '<li>$1</li>');

		// Wrap consecutive <li> in <ul>
		html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

		// Split into blocks by double newline
		const blocks = html.split(/\n\n+/);
		const processed = blocks.map(block => {
			const trimmed = block.trim();
			if (!trimmed) return '';
			// Don't wrap if already an HTML block element
			if (/^<(h[2-6]|ul|ol|li|blockquote|div|table|pre)/.test(trimmed)) {
				return trimmed;
			}
			// Wrap plain text in <p>, handle single newlines as <br>
			return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
		});

		return processed.filter(Boolean).join('\n');
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
<Section padding="none" class="relative pt-24 pb-6 lg:pt-28 lg:pb-8">
	<Container size="content">
		<a href={getLocalePath('/blog')} class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
			{isEn ? 'Back to Blog' : 'Bloga Dön'}
		</a>

		<div class="flex items-center gap-3 mb-4">
			<Badge variant="outline" class="text-xs">{category}</Badge>
			<span class="text-xs text-muted-foreground">{readTime}</span>
			<span class="text-xs text-muted-foreground">&middot;</span>
			<time class="text-xs text-muted-foreground">{formattedDate}</time>
		</div>

		<h1 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
			{title}
		</h1>

		<p class="text-lg text-muted-foreground leading-relaxed mb-6">
			{description}
		</p>

		<div class="flex items-center gap-3 pb-6 border-b border-border">
			<div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">OH</div>
			<div>
				<p class="font-medium text-sm">Onur Haniffa</p>
				<p class="text-xs text-muted-foreground">{isEn ? 'Web Designer & Developer' : 'Web Tasarımcı & Geliştirici'}</p>
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

		<!-- CTA -->
		<div class="mt-16 p-8 rounded-2xl bg-muted/50 border border-border/50 text-center">
			<h3 class="text-2xl font-bold mb-3">
				{isEn ? 'Need a Website?' : 'Bir Web Sitesine mi İhtiyacınız Var?'}
			</h3>
			<p class="text-muted-foreground mb-6">
				{isEn
					? "Let's discuss your project. Free consultation, no commitment."
					: 'Projenizi tartışalım. Ücretsiz danışmanlık, taahhüt yok.'}
			</p>
			<Button href={getLocalePath('/contact')} class="rounded-full px-8 shadow-lg shadow-primary/25">
				{isEn ? 'Get in Touch' : 'İletişime Geçin'}
			</Button>
		</div>
	</Container>
</Section>

<style>
	/* Blog article typography */
	.blog-content :global(h2) {
		font-size: 1.75rem;
		font-weight: 700;
		letter-spacing: -0.025em;
		color: var(--foreground);
		margin-top: 3rem;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid hsl(var(--border) / 0.3);
	}

	.blog-content :global(h2:first-child) {
		margin-top: 0;
	}

	.blog-content :global(h3) {
		font-size: 1.25rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		color: var(--foreground);
		margin-top: 2rem;
		margin-bottom: 0.75rem;
	}

	.blog-content :global(p) {
		font-size: 1.0625rem;
		line-height: 1.8;
		color: hsl(var(--muted-foreground));
		margin-bottom: 1.25rem;
	}

	.blog-content :global(strong) {
		color: var(--foreground);
		font-weight: 600;
	}

	.blog-content :global(ul) {
		margin-top: 0.5rem;
		margin-bottom: 1.5rem;
		padding-left: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.blog-content :global(li) {
		font-size: 1.0625rem;
		line-height: 1.7;
		color: hsl(var(--muted-foreground));
		padding-left: 1.5rem;
		position: relative;
	}

	.blog-content :global(li::before) {
		content: '';
		position: absolute;
		left: 0;
		top: 0.7em;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: hsl(var(--primary));
		opacity: 0.7;
	}

	.blog-content :global(a) {
		color: hsl(var(--primary));
		text-decoration: none;
		font-weight: 500;
	}

	.blog-content :global(a:hover) {
		text-decoration: underline;
	}

	/* Responsive adjustments */
	@media (min-width: 640px) {
		.blog-content :global(h2) {
			font-size: 2rem;
		}
		.blog-content :global(h3) {
			font-size: 1.375rem;
		}
	}
</style>
