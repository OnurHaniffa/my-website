<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Container, Section } from '$lib/components/layout';
	import { InView } from '$lib/components/ui/animations';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	let { data } = $props();
	const ps = data.pageSettings;

	let mounted = $state(false);
	let formState = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let curlyLine: SVGSVGElement;
	let prefersReducedMotion = $state(false);

	// Form fields
	let name = $state('');
	let email = $state('');
	let company = $state('');
	let message = $state('');
	let honeypot = $state(''); // Honeypot field for spam prevention

	onMount(() => {
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		mounted = true;

		// Animate the curly underline
		if (!prefersReducedMotion && curlyLine) {
			const curlyPath = curlyLine.querySelector('path');
			if (curlyPath) {
				gsap.fromTo(
					curlyPath,
					{ strokeDashoffset: 300 },
					{ strokeDashoffset: 0, duration: 4.5, ease: 'power2.out', delay: 0.5 }
				);
			}
		}
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		formState = 'submitting';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, company, message, _gotcha: honeypot })
			});

			if (!response.ok) {
				throw new Error('Failed to send message');
			}

			formState = 'success';

			// Reset form after success
			name = '';
			email = '';
			company = '';
			message = '';
		} catch (err) {
			console.error('Form submission error:', err);
			formState = 'error';
		}
	}
</script>

<svelte:head>
	<title>Contact | Onur Haniffa</title>
	<meta name="description" content="Let's talk about your project. Get in touch for a free consultation about your web design and development needs. Quick response guaranteed." />
	<meta property="og:title" content="Contact | Onur Haniffa" />
	<meta property="og:description" content="Let's talk about your project. Get in touch for a free consultation about your web design and development needs." />
</svelte:head>

<!-- Hero Section -->
<Section padding="lg" class="relative overflow-hidden">
	<!-- Background decoration - simple gradient for performance -->
	<div class="absolute inset-0 -z-10 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.02]"></div>

	<Container>
		<div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
			<!-- Left: Content -->
			<div>
				<div
					class="transition-all duration-700 ease-out"
					class:opacity-0={!mounted}
					class:translate-y-6={!mounted}
					class:opacity-100={mounted}
					class:translate-y-0={mounted}
				>
					<Badge variant="outline" class="mb-6 border-primary/30 text-primary">
						{ps?.hero_badge ?? "Let's Talk"}
					</Badge>
				</div>

				<h1
					class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl transition-all duration-700 ease-out"
					class:opacity-0={!mounted}
					class:translate-y-8={!mounted}
					class:opacity-100={mounted}
					class:translate-y-0={mounted}
					style="transition-delay: 100ms;"
				>
					{ps?.hero_heading ?? 'Start a'} <span class="relative inline-block"><span class="text-primary">{ps?.hero_highlight ?? 'conversation'}</span>
						<!-- Curly underline -->
						<svg bind:this={curlyLine} class="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-4" viewBox="0 0 200 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
							<path
								d="M0 12 Q 25 2, 50 12 T 100 12 T 150 12 T 200 12"
								stroke="currentColor"
								stroke-width="4"
								stroke-linecap="round"
								class="text-primary"
								fill="none"
								style="stroke-dasharray: 300; stroke-dashoffset: 300;"
							/>
						</svg>
					</span>
				</h1>

				<p
					class="mt-6 text-lg text-muted-foreground leading-relaxed transition-all duration-700 ease-out"
					class:opacity-0={!mounted}
					class:translate-y-6={!mounted}
					class:opacity-100={mounted}
					class:translate-y-0={mounted}
					style="transition-delay: 200ms;"
				>
					{ps?.hero_description ?? "Tell me about your project and goals. I'll get back to you within 24 hours with thoughts on how we can work together."}
				</p>

				<!-- Contact Info -->
				<div
					class="mt-12 space-y-8 transition-all duration-700 ease-out"
					class:opacity-0={!mounted}
					class:translate-y-6={!mounted}
					class:opacity-100={mounted}
					class:translate-y-0={mounted}
					style="transition-delay: 300ms;"
				>
					<div class="flex items-start gap-4 group cursor-pointer">
						<div
							class="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-3 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-primary transition-transform duration-300 group-hover:scale-110"
								><rect width="20" height="16" x="2" y="4" rx="2" /><path
									d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
								/></svg
							>
						</div>
						<div class="transition-transform duration-300 group-hover:translate-x-1">
							<p class="font-medium">Email</p>
							<a
								href="mailto:{ps?.email ?? 'contact@onurhaniffa.com'}"
								class="text-muted-foreground hover:text-primary transition-colors"
							>
								{ps?.email ?? 'contact@onurhaniffa.com'}
							</a>
						</div>
					</div>

					<div class="flex items-start gap-4 group">
						<div
							class="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110 group-hover:-rotate-3 group-hover:border-accent/40 group-hover:shadow-lg group-hover:shadow-accent/10"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-accent transition-transform duration-300 group-hover:scale-110"
								><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg
							>
						</div>
						<div class="transition-transform duration-300 group-hover:translate-x-1">
							<p class="font-medium">Response Time</p>
							<p class="text-muted-foreground">{ps?.response_time ?? 'Within 24 hours'}</p>
						</div>
					</div>

					<div class="flex items-start gap-4 group">
						<div
							class="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-3 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-primary transition-transform duration-300 group-hover:scale-110"
								><circle cx="12" cy="12" r="10" /><path
									d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
								/><path d="M2 12h20" /></svg
							>
						</div>
						<div class="transition-transform duration-300 group-hover:translate-x-1">
							<p class="font-medium">Availability</p>
							<p class="text-muted-foreground">{ps?.availability ?? 'European time zones (CET/CEST)'}</p>
						</div>
					</div>

					<a href="https://www.linkedin.com/in/onurhaniffa/" target="_blank" rel="noopener noreferrer" class="flex items-start gap-4 group cursor-pointer">
						<div
							class="w-12 h-12 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#0A66C2]/20 group-hover:scale-110 group-hover:-rotate-3 group-hover:border-[#0A66C2]/40 group-hover:shadow-lg group-hover:shadow-[#0A66C2]/10"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-[#0A66C2] transition-transform duration-300 group-hover:scale-110"
								><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg
							>
						</div>
						<div class="transition-transform duration-300 group-hover:translate-x-1">
							<p class="font-medium">LinkedIn</p>
							<p class="text-muted-foreground group-hover:text-[#0A66C2] transition-colors">Connect with me</p>
						</div>
					</a>
				</div>

				</div>

			<!-- Right: Form -->
			<div
				class="transition-all duration-1000 ease-out"
				class:opacity-0={!mounted}
				class:scale-95={!mounted}
				class:translate-x-8={!mounted}
				class:opacity-100={mounted}
				class:scale-100={mounted}
				class:translate-x-0={mounted}
				style="transition-delay: 200ms;"
			>
				<div
					class="p-6 sm:p-8 lg:p-10 rounded-2xl bg-card border border-border/50 shadow-xl shadow-primary/5"
				>
					{#if formState === 'success'}
						<div class="text-center py-8">
							<div
								class="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="32"
									height="32"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="text-green-500"
									><path d="M20 6 9 17l-5-5" /></svg
								>
							</div>
							<h3 class="text-2xl font-bold mb-2">Message Sent!</h3>
							<p class="text-muted-foreground mb-6">
								Thanks for reaching out. I'll get back to you within 24 hours.
							</p>
							<Button variant="outline" onclick={() => (formState = 'idle')}>
								Send Another Message
							</Button>
						</div>
					{:else if formState === 'error'}
						<div class="text-center py-8">
							<div
								class="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="32"
									height="32"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="text-red-500"
									><circle cx="12" cy="12" r="10" /><line x1="15" x2="9" y1="9" y2="15" /><line x1="9" x2="15" y1="9" y2="15" /></svg
								>
							</div>
							<h3 class="text-2xl font-bold mb-2">Something went wrong</h3>
							<p class="text-muted-foreground mb-6">
								Please try again or email me directly at contact@onurhaniffa.com
							</p>
							<Button variant="outline" onclick={() => (formState = 'idle')}>
								Try Again
							</Button>
						</div>
					{:else}
						<form onsubmit={handleSubmit} class="space-y-7">
							<div class="space-y-2">
								<label for="name" class="text-sm font-medium">Name *</label>
								<Input
									id="name"
									type="text"
									placeholder="John Doe"
									bind:value={name}
									required
									autocomplete="name"
									class="h-12 bg-background/50 border-border/60 transition-all duration-200 focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-background"
								/>
							</div>

							<div class="space-y-2">
								<label for="email" class="text-sm font-medium">Email *</label>
								<Input
									id="email"
									type="email"
									placeholder="john@company.com"
									bind:value={email}
									required
									autocomplete="email"
									class="h-12 bg-background/50 border-border/60 transition-all duration-200 focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-background"
								/>
							</div>

							<div class="space-y-2">
								<label for="company" class="text-sm font-medium">
									Company <span class="text-muted-foreground">(optional)</span>
								</label>
								<Input
									id="company"
									type="text"
									placeholder="Acme Inc."
									bind:value={company}
									autocomplete="organization"
									class="h-12 bg-background/50 border-border/60 transition-all duration-200 focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-background"
								/>
							</div>

							<div class="space-y-2">
								<label for="message" class="text-sm font-medium">Message *</label>
								<Textarea
									id="message"
									placeholder="Tell me about your project, goals, and timeline..."
									bind:value={message}
									required
									rows={5}
									class="resize-none bg-background/50 border-border/60 transition-all duration-200 focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-background"
								/>
							</div>

							<!-- Honeypot for spam -->
							<input type="text" name="_gotcha" bind:value={honeypot} style="display:none" autocomplete="off" tabindex="-1" />

							<Button
								type="submit"
								size="lg"
								class="w-full h-12 group transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02]"
								disabled={formState === 'submitting'}
							>
								{#if formState === 'submitting'}
									<svg
										class="animate-spin -ml-1 mr-2 h-4 w-4"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											class="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
										></circle>
										<path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Sending...
								{:else}
									Send Message
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="ml-2 transition-transform duration-300 group-hover:translate-x-1"
										><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg
									>
								{/if}
							</Button>

							<p class="text-xs text-muted-foreground text-center">
								I respect your privacy. Your information will never be shared.
							</p>
						</form>
					{/if}
				</div>
			</div>
		</div>
	</Container>
</Section>

<!-- FAQ Section -->
<Section padding="lg" background="muted">
	<Container size="content">
		<InView animation="fade-up" class="text-center mb-10">
			<h2 class="text-2xl font-bold tracking-tight">{ps?.faq_heading ?? 'Common Questions'}</h2>
		</InView>

		<div class="space-y-5">
			{#each data.faqs ?? [
				{
					question: 'What information should I include in my message?',
					answer: 'Share your project goals, timeline, and any specific requirements. The more context you provide, the better I can understand how to help.'
				},
				{
					question: 'How quickly will you respond?',
					answer: "I typically respond within 24 hours during business days. For urgent inquiries, mention it in your message and I'll prioritize accordingly."
				},
				{
					question: 'Do you offer free consultations?',
					answer: "Yes! Our initial conversation is always free. It's an opportunity for both of us to see if we're a good fit for working together."
				}
			] as faq}
				<InView animation="fade-up">
					<div class="p-6 rounded-xl bg-background border border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
						<h3 class="font-semibold mb-2">{faq.question}</h3>
						<p class="text-sm text-muted-foreground">{faq.answer}</p>
					</div>
				</InView>
			{/each}
		</div>
	</Container>
</Section>
