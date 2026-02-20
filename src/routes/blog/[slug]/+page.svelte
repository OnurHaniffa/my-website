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
</script>

<svelte:head>
	<title>{title} | Onur Haniffa Blog</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={post.date} />
	<meta property="article:author" content="Onur Haniffa" />

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

<Section padding="none" class="relative pt-32 pb-8 lg:pt-40 lg:pb-12">
	<Container size="content">
		<a href={getLocalePath('/blog')} class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
			{isEn ? 'Back to Blog' : 'Bloga Dön'}
		</a>

		<div class="flex items-center gap-3 mb-4">
			<Badge variant="outline" class="text-xs">{category}</Badge>
			<span class="text-xs text-muted-foreground">{readTime}</span>
			<span class="text-xs text-muted-foreground">&middot;</span>
			<time class="text-xs text-muted-foreground">{formattedDate}</time>
		</div>

		<h1 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
			{title}
		</h1>

		<p class="text-lg text-muted-foreground leading-relaxed mb-8">
			{description}
		</p>

		<div class="flex items-center gap-3 pb-8 border-b border-border">
			<div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">OH</div>
			<div>
				<p class="font-medium text-sm">Onur Haniffa</p>
				<p class="text-xs text-muted-foreground">{isEn ? 'Web Designer & Developer' : 'Web Tasarımcı & Geliştirici'}</p>
			</div>
		</div>
	</Container>
</Section>

<Section padding="lg">
	<Container size="content">
		<article class="prose prose-lg dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
			{@html content
				.replace(/^## (.*$)/gim, '<h2>$1</h2>')
				.replace(/^### (.*$)/gim, '<h3>$1</h3>')
				.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
				.replace(/^- (.*$)/gim, '<li>$1</li>')
				.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
				.replace(/\n\n/g, '</p><p>')
				.replace(/^(?!<[hul])/gm, '<p>')
				.replace(/<p><\/p>/g, '')
				.replace(/<p>(<[hul])/g, '$1')
				.replace(/(<\/[hul][l2-6]?>)<\/p>/g, '$1')
			}
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
