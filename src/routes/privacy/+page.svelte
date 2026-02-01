<script lang="ts">
	import { Container, Section } from '$lib/components/layout';
	import { InView } from '$lib/components/ui/animations';

	let { data } = $props();
	const ps = data.pageSettings;
</script>

<svelte:head>
	<title>{ps?.meta_title ?? 'Privacy Policy | Onur Haniffa'}</title>
	<meta name="description" content={ps?.meta_description ?? "Privacy Policy for Onur Haniffa Web Design. Learn how I collect, use, and protect your personal information."} />
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<Section padding="lg">
	<Container size="content">
		<InView animation="fade-up">
			<h1 class="text-4xl font-bold tracking-tight mb-4">{ps?.title ?? 'Privacy Policy'}</h1>
			<p class="text-muted-foreground mb-8">Last updated: {ps?.last_updated ?? 'December 2024'}</p>
		</InView>

		{#if ps?.content}
		<div class="prose prose-gray dark:prose-invert max-w-none">
			{@html ps.content}
		</div>
		{:else}
		<div class="prose prose-gray dark:prose-invert max-w-none">
			<InView animation="fade-up" delay={100}>
				<section class="mb-12">
					<h2 class="text-2xl font-semibold mb-4">Introduction</h2>
					<p class="text-muted-foreground leading-relaxed">
						Haniffa Design Studio ("I", "me", "my") respects your privacy and is committed
						to protecting your personal data. This privacy policy explains how I collect,
						use, and safeguard your information when you visit my website or use my
						services.
					</p>
				</section>
			</InView>

			<InView animation="fade-up" delay={150}>
				<section class="mb-12">
					<h2 class="text-2xl font-semibold mb-4">Information I Collect</h2>
					<p class="text-muted-foreground leading-relaxed mb-4">
						I may collect the following types of information:
					</p>
					<ul class="space-y-3 text-muted-foreground">
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>
								<strong class="text-foreground">Contact Information:</strong> Name, email
								address, and company name when you submit the contact form.
							</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>
								<strong class="text-foreground">Usage Data:</strong> Anonymous analytics
								data about how you interact with the website (pages visited, time spent).
							</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>
								<strong class="text-foreground">Technical Data:</strong> Browser type,
								device information, and IP address (anonymized where possible).
							</span>
						</li>
					</ul>
				</section>
			</InView>

			<InView animation="fade-up" delay={200}>
				<section class="mb-12">
					<h2 class="text-2xl font-semibold mb-4">How I Use Your Information</h2>
					<p class="text-muted-foreground leading-relaxed mb-4">
						Your information is used solely for:
					</p>
					<ul class="space-y-3 text-muted-foreground">
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>Responding to your inquiries and providing requested services</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>Improving the website experience based on usage patterns</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>Sending project-related communications (only if you've engaged my services)</span>
						</li>
					</ul>
					<p class="text-muted-foreground leading-relaxed mt-4">
						I will <strong class="text-foreground">never</strong> sell, rent, or share your
						personal information with third parties for marketing purposes.
					</p>
				</section>
			</InView>

			<InView animation="fade-up" delay={250}>
				<section class="mb-12">
					<h2 class="text-2xl font-semibold mb-4">Cookies & Analytics</h2>
					<p class="text-muted-foreground leading-relaxed mb-4">
						This website uses privacy-focused analytics that do not track individual users
						or use cookies for advertising. Any analytics tools used are configured to:
					</p>
					<ul class="space-y-3 text-muted-foreground">
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>Not use cookies or store personal identifiers</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>Anonymize IP addresses</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>Comply with GDPR and other privacy regulations</span>
						</li>
					</ul>
				</section>
			</InView>

			<InView animation="fade-up" delay={300}>
				<section class="mb-12">
					<h2 class="text-2xl font-semibold mb-4">Your Rights (GDPR)</h2>
					<p class="text-muted-foreground leading-relaxed mb-4">
						Under the General Data Protection Regulation (GDPR), you have the right to:
					</p>
					<ul class="space-y-3 text-muted-foreground">
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>Access the personal data I hold about you</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>Request correction of inaccurate data</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>Request deletion of your data</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>Object to processing of your data</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
							<span>Data portability</span>
						</li>
					</ul>
					<p class="text-muted-foreground leading-relaxed mt-4">
						To exercise any of these rights, please contact me at
						<a href="mailto:contact@onurhaniffa.com" class="text-primary hover:underline"
							>contact@onurhaniffa.com</a
						>.
					</p>
				</section>
			</InView>

			<InView animation="fade-up" delay={350}>
				<section class="mb-12">
					<h2 class="text-2xl font-semibold mb-4">Data Security</h2>
					<p class="text-muted-foreground leading-relaxed">
						I implement appropriate technical and organizational measures to protect your
						personal data against unauthorized access, alteration, disclosure, or
						destruction. This website uses HTTPS encryption for all data transmission.
					</p>
				</section>
			</InView>

			<InView animation="fade-up" delay={400}>
				<section class="mb-12">
					<h2 class="text-2xl font-semibold mb-4">Data Retention</h2>
					<p class="text-muted-foreground leading-relaxed">
						I retain your contact form submissions and related correspondence for as long
						as necessary to fulfill the purposes for which they were collected, or as
						required by law. Project-related data may be retained for up to 7 years for
						legal and tax purposes.
					</p>
				</section>
			</InView>

			<InView animation="fade-up" delay={450}>
				<section class="mb-12">
					<h2 class="text-2xl font-semibold mb-4">Third-Party Services</h2>
					<p class="text-muted-foreground leading-relaxed">
						This website may use third-party services for hosting, analytics, or form
						processing. These services have their own privacy policies governing how they
						handle your data. I only work with services that are GDPR-compliant.
					</p>
				</section>
			</InView>

			<InView animation="fade-up" delay={500}>
				<section class="mb-12">
					<h2 class="text-2xl font-semibold mb-4">Changes to This Policy</h2>
					<p class="text-muted-foreground leading-relaxed">
						I may update this privacy policy from time to time. Any changes will be posted
						on this page with an updated revision date. I encourage you to review this
						policy periodically.
					</p>
				</section>
			</InView>

			<InView animation="fade-up" delay={550}>
				<section
					class="p-6 rounded-2xl bg-muted/50 border border-border/50"
				>
					<h2 class="text-xl font-semibold mb-4">Contact</h2>
					<p class="text-muted-foreground leading-relaxed">
						If you have any questions about this privacy policy or how I handle your data,
						please contact me at:
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
