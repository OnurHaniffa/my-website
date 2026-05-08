<script lang="ts">
	import { Container, Section } from '$lib/components/layout';
	import { Badge } from '$lib/components/ui/badge';
	import { InView } from '$lib/components/ui/animations';
	import { blogPosts } from '$lib/data/blog-posts';
	import { getClusterForCornerstone } from '$lib/data/cornerstone-clusters';

	type Props = {
		cornerstonePath: string;
		heading?: string;
	};

	let { cornerstonePath, heading = 'Bu Konuda Daha Fazlası' }: Props = $props();

	const slugs = getClusterForCornerstone(cornerstonePath);
	const posts = slugs
		.map((slug) => blogPosts.find((p) => p.slug === slug))
		.filter((p): p is NonNullable<typeof p> => Boolean(p));

	function truncate(s: string, n: number) {
		return s.length <= n ? s : s.slice(0, n - 1).trimEnd() + '…';
	}
</script>

{#if posts.length > 0}
	<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
	<Section padding="lg" background="muted" class="relative overflow-hidden">
		<Container>
			<InView animation="fade-up">
				<div class="text-center mb-12">
					<Badge
						variant="outline"
						class="mb-5 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider"
					>
						İlgili Yazılar
					</Badge>
					<h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
						<span class="cluster-gradient-text">{heading}</span>
					</h2>
					<p class="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
						Bu sayfadaki konuları derinleştiren, gerçek projelerden örneklerle yazdığım blog yazıları.
					</p>
				</div>
			</InView>

			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
				{#each posts as post, i}
					<InView animation="fade-up" delay={i * 60}>
						<a
							href={`/blog/${post.slug}/`}
							class="group h-full flex flex-col p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/40 hover:shadow-lg transition-all"
						>
							<div class="flex items-center gap-2 mb-3">
								<span class="text-[10px] font-semibold uppercase tracking-wider text-primary px-2 py-0.5 rounded-full bg-primary/10">{post.categoryTr}</span>
								<span class="text-xs text-muted-foreground">·</span>
								<span class="text-xs text-muted-foreground">{post.readTimeTr}</span>
							</div>
							<h3 class="text-base font-bold mb-2 leading-snug group-hover:text-primary transition-colors">
								{post.titleTr}
							</h3>
							<p class="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
								{truncate(post.descriptionTr, 140)}
							</p>
							<span class="inline-flex items-center gap-1.5 text-sm font-medium text-primary mt-auto">
								Devamı
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="transition-transform group-hover:translate-x-0.5"
									aria-hidden="true"
								>
									<path d="M5 12h14" />
									<path d="m12 5 7 7-7 7" />
								</svg>
							</span>
						</a>
					</InView>
				{/each}
			</div>

			<div class="text-center mt-10">
				<a
					href="/blog/"
					class="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary hover:underline"
				>
					Tüm yazılara göz at
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M5 12h14" />
						<path d="m12 5 7 7-7 7" />
					</svg>
				</a>
			</div>
		</Container>
	</Section>

	<style>
		.cluster-gradient-text {
			background: linear-gradient(135deg, oklch(0.55 0.24 260), oklch(0.58 0.22 25));
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
		}
		:global(.dark) .cluster-gradient-text {
			background: linear-gradient(135deg, oklch(0.72 0.2 260), oklch(0.72 0.18 25));
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
		}
	</style>
{/if}
