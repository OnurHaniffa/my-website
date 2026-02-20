<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Container, Section } from '$lib/components/layout';
	import { InView } from '$lib/components/ui/animations';
	import { blogPosts } from '$lib/data/blog-posts';
	import { getLocale, getLocalePath } from '$lib/i18n/index.svelte';

	const locale = $derived(getLocale());
	const isEn = $derived(locale === 'en');

	const posts = $derived(blogPosts.map(post => ({
		slug: post.slug,
		title: isEn ? post.title : post.titleTr,
		description: isEn ? post.description : post.descriptionTr,
		date: new Date(post.date).toLocaleDateString(isEn ? 'en-US' : 'tr-TR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}),
		readTime: isEn ? post.readTime : post.readTimeTr,
		category: isEn ? post.category : post.categoryTr
	})));
</script>

<svelte:head>
	{#if isEn}
		<title>Web Design Blog Istanbul | Tips & Insights | Onur Haniffa</title>
		<meta name="description" content="Web design and development blog by Istanbul-based designer Onur Haniffa. Tips on web design, SEO, SvelteKit, and growing your business online." />
		<meta property="og:title" content="Web Design Blog Istanbul | Tips & Insights | Onur Haniffa" />
		<meta property="og:description" content="Web design tips, SEO insights, and development tutorials from an Istanbul-based web designer." />
	{:else}
		<title>Web Tasarım Blog | İpuçları & Bilgiler | Onur Haniffa</title>
		<meta name="description" content="İstanbul merkezli tasarımcı Onur Haniffa'nın web tasarım ve geliştirme blogu. Web tasarım, SEO, SvelteKit ve işletmenizi çevrimiçi büyütme hakkında ipuçları." />
		<meta property="og:title" content="Web Tasarım Blog | İpuçları & Bilgiler | Onur Haniffa" />
		<meta property="og:description" content="İstanbul merkezli web tasarımcıdan web tasarım ipuçları, SEO bilgileri ve geliştirme eğitimleri." />
	{/if}
</svelte:head>

<Section padding="none" class="relative pt-32 pb-12 lg:pt-40 lg:pb-16">
	<Container>
		<div class="max-w-3xl">
			<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
				Blog
			</Badge>
			<h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-4">
				{isEn ? 'Insights & Articles' : 'Bilgiler & Makaleler'}
			</h1>
			<p class="text-lg text-muted-foreground leading-relaxed">
				{isEn
					? 'Thoughts on web design, development, and building successful websites for businesses.'
					: 'Web tasarım, geliştirme ve işletmeler için başarılı web siteleri oluşturma hakkında düşünceler.'}
			</p>
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<Section padding="lg">
	<Container>
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each posts as post, i}
				<InView animation="fade-up" delay={i * 100}>
					<a href={getLocalePath(`/blog/${post.slug}`)} class="group block h-full">
						<article class="h-full p-6 rounded-2xl bg-card border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-primary/30">
							<div class="flex items-center gap-3 mb-4">
								<Badge variant="outline" class="text-xs">{post.category}</Badge>
								<span class="text-xs text-muted-foreground">{post.readTime}</span>
							</div>
							<h2 class="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
								{post.title}
							</h2>
							<p class="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
								{post.description}
							</p>
							<div class="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
								<time class="text-xs text-muted-foreground">{post.date}</time>
								<span class="text-sm font-medium text-primary group-hover:underline">
									{isEn ? 'Read more' : 'Devamını oku'} &rarr;
								</span>
							</div>
						</article>
					</a>
				</InView>
			{/each}
		</div>
	</Container>
</Section>
