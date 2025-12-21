<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Container, Section } from '$lib/components/layout';
	import { InView } from '$lib/components/ui/animations';
	import { onMount } from 'svelte';

	let mounted = $state(false);
	let formState = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');

	// Form fields
	let name = $state('');
	let email = $state('');
	let company = $state('');
	let message = $state('');

	onMount(() => {
		mounted = true;
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		formState = 'submitting';

		// Simulate form submission - replace with actual form handler
		// e.g., Formspree, Resend, or your own API
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// For demo purposes, always succeed
		formState = 'success';

		// Reset form after success
		name = '';
		email = '';
		company = '';
		message = '';
	}
</script>

<svelte:head>
	<title>Contact | Haniffa Design Studio</title>
	<meta
		name="description"
		content="Let's talk about your project. Get in touch for a free consultation about your web design needs."
	/>
</svelte:head>

<!-- Hero Section -->
<Section padding="lg" class="relative overflow-hidden">
	<!-- Background decoration -->
	<div class="absolute inset-0 -z-10">
		<div
			class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
		></div>
		<div
			class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl"
		></div>
	</div>

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
						Let's Talk
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
					Start a <span class="text-primary">conversation</span>
				</h1>

				<p
					class="mt-6 text-lg text-muted-foreground leading-relaxed transition-all duration-700 ease-out"
					class:opacity-0={!mounted}
					class:translate-y-6={!mounted}
					class:opacity-100={mounted}
					class:translate-y-0={mounted}
					style="transition-delay: 200ms;"
				>
					Tell me about your project and goals. I'll get back to you within 24 hours with
					thoughts on how we can work together.
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
					<div class="flex items-start gap-4 group">
						<div
							class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110"
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
								class="text-primary"
								><rect width="20" height="16" x="2" y="4" rx="2" /><path
									d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
								/></svg
							>
						</div>
						<div>
							<p class="font-medium">Email</p>
							<a
								href="mailto:hello@ohaniffa.com"
								class="text-muted-foreground hover:text-primary transition-colors"
							>
								hello@ohaniffa.com
							</a>
						</div>
					</div>

					<div class="flex items-start gap-4 group">
						<div
							class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110"
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
								class="text-accent"
								><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg
							>
						</div>
						<div>
							<p class="font-medium">Response Time</p>
							<p class="text-muted-foreground">Within 24 hours</p>
						</div>
					</div>

					<div class="flex items-start gap-4 group">
						<div
							class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110"
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
								class="text-primary"
								><circle cx="12" cy="12" r="10" /><path
									d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
								/><path d="M2 12h20" /></svg
							>
						</div>
						<div>
							<p class="font-medium">Availability</p>
							<p class="text-muted-foreground">European time zones (CET/CEST)</p>
						</div>
					</div>
				</div>

				<!-- Social Links -->
				<div
					class="mt-12 pt-10 border-t border-border/50 transition-all duration-700 ease-out"
					class:opacity-0={!mounted}
					class:translate-y-6={!mounted}
					class:opacity-100={mounted}
					class:translate-y-0={mounted}
					style="transition-delay: 400ms;"
				>
					<p class="text-sm font-medium mb-4">Find me on</p>
					<div class="flex gap-4">
						<a
							href="https://linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
							class="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
							aria-label="LinkedIn"
						>
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
								><path
									d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
								/><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg
							>
						</a>
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noopener noreferrer"
							class="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
							aria-label="Twitter"
						>
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
								><path
									d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
								/></svg
							>
						</a>
					</div>
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
					class="p-10 rounded-2xl bg-card border border-border/50 shadow-xl shadow-primary/5"
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
									class="h-12"
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
									class="h-12"
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
									class="h-12"
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
									class="resize-none"
								/>
							</div>

							<!-- Honeypot for spam -->
							<input type="text" name="_gotcha" style="display:none" />

							<Button
								type="submit"
								size="lg"
								class="w-full h-12 group"
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
			<h2 class="text-2xl font-bold tracking-tight">Common Questions</h2>
		</InView>

		<div class="space-y-5">
			{#each [
				{
					q: 'What information should I include in my message?',
					a: 'Share your project goals, timeline, and any specific requirements. The more context you provide, the better I can understand how to help.'
				},
				{
					q: 'How quickly will you respond?',
					a: "I typically respond within 24 hours during business days. For urgent inquiries, mention it in your message and I'll prioritize accordingly."
				},
				{
					q: 'Do you offer free consultations?',
					a: "Yes! Our initial conversation is always free. It's an opportunity for both of us to see if we're a good fit for working together."
				}
			] as faq}
				<InView animation="fade-up">
					<div class="p-6 rounded-xl bg-background border border-border/50">
						<h3 class="font-semibold mb-2">{faq.q}</h3>
						<p class="text-sm text-muted-foreground">{faq.a}</p>
					</div>
				</InView>
			{/each}
		</div>
	</Container>
</Section>
