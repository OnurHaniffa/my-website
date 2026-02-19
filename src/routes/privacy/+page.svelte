<script lang="ts">
	import { Container, Section } from '$lib/components/layout';
	import { InView } from '$lib/components/ui/animations';
	import { t } from '$lib/i18n/index.svelte';

	let { data } = $props();
	const ps = data.pageSettings;
</script>

<svelte:head>
	<title>{ps?.meta_title ?? t('privacy.meta_title')}</title>
	<meta name="description" content={ps?.meta_description ?? t('privacy.meta_description')} />
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<Section padding="lg">
	<Container size="content">
		<InView animation="fade-up">
			<h1 class="text-4xl font-bold tracking-tight mb-4">{ps?.title ?? t('privacy.title')}</h1>
			<p class="text-muted-foreground mb-8">Last updated: {ps?.last_updated ?? t('privacy.last_updated')}</p>
		</InView>

		{#if ps?.content}
		<div class="prose prose-gray dark:prose-invert max-w-none">
			{@html ps.content}
		</div>
		{:else}
		<div class="prose prose-gray dark:prose-invert max-w-none">
			<InView animation="fade-up" delay={100}>
				<section class="mb-12">
					<h2 class="text-2xl font-semibold mb-4">{t('privacy.intro_heading')}</h2>
					<p class="text-muted-foreground leading-relaxed">
						{t('privacy.intro_text')}
					</p>
				</section>
			</InView>

			<InView animation="fade-up" delay={150}>
				<section class="mb-12">
					<h2 class="text-2xl font-semibold mb-4">{t('privacy.collect_heading')}</h2>
					<p class="text-muted-foreground leading-relaxed mb-4">
						{t('privacy.collect_intro')}
					</p>
					<ul class="space-y-3 text-muted-foreground">
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>
								<strong class="text-foreground">{t('privacy.collect_1_label')}</strong> {t('privacy.collect_1_text')}
							</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>
								<strong class="text-foreground">{t('privacy.collect_2_label')}</strong> {t('privacy.collect_2_text')}
							</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>
								<strong class="text-foreground">{t('privacy.collect_3_label')}</strong> {t('privacy.collect_3_text')}
							</span>
						</li>
					</ul>
				</section>
			</InView>

			<InView animation="fade-up" delay={200}>
				<section class="mb-12">
					<h2 class="text-2xl font-semibold mb-4">{t('privacy.use_heading')}</h2>
					<p class="text-muted-foreground leading-relaxed mb-4">
						{t('privacy.use_intro')}
					</p>
					<ul class="space-y-3 text-muted-foreground">
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>{t('privacy.use_1')}</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>{t('privacy.use_2')}</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>{t('privacy.use_3')}</span>
						</li>
					</ul>
					<p class="text-muted-foreground leading-relaxed mt-4">{t('privacy.use_outro')}</p>
				</section>
			</InView>

			<InView animation="fade-up" delay={250}>
				<section class="mb-12">
					<h2 class="text-2xl font-semibold mb-4">{t('privacy.cookies_heading')}</h2>
					<p class="text-muted-foreground leading-relaxed mb-4">
						{t('privacy.cookies_intro')}
					</p>
					<ul class="space-y-3 text-muted-foreground">
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>{t('privacy.cookies_1')}</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>{t('privacy.cookies_2')}</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>{t('privacy.cookies_3')}</span>
						</li>
					</ul>
				</section>
			</InView>

			<InView animation="fade-up" delay={300}>
				<section class="mb-12">
					<h2 class="text-2xl font-semibold mb-4">{t('privacy.gdpr_heading')}</h2>
					<p class="text-muted-foreground leading-relaxed mb-4">
						{t('privacy.gdpr_intro')}
					</p>
					<ul class="space-y-3 text-muted-foreground">
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>{t('privacy.gdpr_1')}</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>{t('privacy.gdpr_2')}</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>{t('privacy.gdpr_3')}</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>{t('privacy.gdpr_4')}</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>{t('privacy.gdpr_5')}</span>
						</li>
					</ul>
					<p class="text-muted-foreground leading-relaxed mt-4">
						{t('privacy.gdpr_outro')} <a href="mailto:contact@onurhaniffa.com" class="text-primary hover:underline"
							>contact@onurhaniffa.com</a
						>.
					</p>
				</section>
			</InView>

			<InView animation="fade-up" delay={350}>
				<section class="mb-12">
					<h2 class="text-2xl font-semibold mb-4">{t('privacy.security_heading')}</h2>
					<p class="text-muted-foreground leading-relaxed">
						{t('privacy.security_text')}
					</p>
				</section>
			</InView>

			<InView animation="fade-up" delay={400}>
				<section class="mb-12">
					<h2 class="text-2xl font-semibold mb-4">{t('privacy.retention_heading')}</h2>
					<p class="text-muted-foreground leading-relaxed">
						{t('privacy.retention_text')}
					</p>
				</section>
			</InView>

			<InView animation="fade-up" delay={450}>
				<section class="mb-12">
					<h2 class="text-2xl font-semibold mb-4">{t('privacy.third_party_heading')}</h2>
					<p class="text-muted-foreground leading-relaxed">
						{t('privacy.third_party_text')}
					</p>
				</section>
			</InView>

			<InView animation="fade-up" delay={500}>
				<section class="mb-12">
					<h2 class="text-2xl font-semibold mb-4">{t('privacy.changes_heading')}</h2>
					<p class="text-muted-foreground leading-relaxed">
						{t('privacy.changes_text')}
					</p>
				</section>
			</InView>

			<InView animation="fade-up" delay={550}>
				<section
					class="p-6 rounded-2xl bg-muted/50 border border-border/50"
				>
					<h2 class="text-xl font-semibold mb-4">{t('privacy.contact_heading')}</h2>
					<p class="text-muted-foreground leading-relaxed">
						{t('privacy.contact_text')}
					</p>
					<p class="mt-4">
						<a href="mailto:contact@onurhaniffa.com" class="text-primary hover:underline font-medium">
							contact@onurhaniffa.com
						</a>
					</p>
				</section>
			</InView>
		</div>
		{/if}
	</Container>
</Section>
