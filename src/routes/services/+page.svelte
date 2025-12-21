<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { Container, Section } from '$lib/components/layout';
	import { InView } from '$lib/components/ui/animations';

	let openFaq = $state<number | null>(null);

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}

	const services = [
		{
			title: 'Website Design & Development',
			description: 'A complete solution from strategy to launch. Beautiful design meets solid engineering.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>`,
			features: [
				'Discovery call to understand your goals',
				'Custom design tailored to your brand',
				'Mobile-first, responsive development',
				'SEO optimization built-in',
				'Performance-focused architecture',
				'Launch support & handover'
			],
			highlight: true
		},
		{
			title: 'Website Redesign',
			description: 'Transform your outdated site into a modern, high-performing digital presence.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>`,
			features: [
				'Audit of your current site',
				'UX improvements & modernization',
				'Content migration assistance',
				'Updated tech stack',
				'Improved performance & SEO',
				'Training on new features'
			],
			highlight: false
		},
		{
			title: 'Ongoing Maintenance',
			description: 'Keep your site secure, updated, and running smoothly. Peace of mind included.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>`,
			features: [
				'Regular security updates',
				'Performance monitoring',
				'Content updates (as needed)',
				'Monthly reports',
				'Priority support',
				'Bug fixes included'
			],
			highlight: false
		}
	];

	const faqs = [
		{
			question: 'How much does a website cost?',
			answer: 'Every project is unique, so pricing depends on scope and complexity. Most projects range from €3,000 to €10,000+. I provide detailed quotes after our initial conversation, so you know exactly what you\'re paying before we start.'
		},
		{
			question: 'How long does a project take?',
			answer: 'A typical website takes 4-8 weeks from start to finish. This includes discovery, design, development, and revisions. More complex projects or those requiring extensive content may take longer. I\'ll give you a realistic timeline during our initial call.'
		},
		{
			question: 'Do I own my website?',
			answer: 'Absolutely. You own 100% of your website, including all code, design assets, and content. I don\'t lock you into proprietary systems. Your site is yours to keep, modify, or move as you see fit.'
		},
		{
			question: 'Can you work with my existing brand?',
			answer: 'Yes! I can work with your existing brand guidelines, or help you refine and expand them for the web. If you don\'t have established branding yet, I can create a cohesive visual identity as part of the design process.'
		},
		{
			question: 'What technologies do you use?',
			answer: 'I use modern, industry-standard technologies like SvelteKit, React, and Tailwind CSS. My focus is on choosing the right tool for each project—prioritizing performance, maintainability, and your specific needs.'
		},
		{
			question: 'Do you offer payment plans?',
			answer: 'Yes. I typically structure payments in milestones: a deposit to begin, a mid-project payment, and final payment upon launch. This keeps the project moving smoothly while spreading out the investment.'
		}
	];
</script>

<svelte:head>
	<title>Services | Haniffa Design Studio</title>
	<meta
		name="description"
		content="Professional web design and development services for growing businesses. From complete builds to redesigns and ongoing support."
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
		<InView animation="fade-up" class="max-w-2xl">
			<Badge variant="outline" class="mb-6 border-primary/30 text-primary">Services</Badge>
			<h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
				Services designed for <span class="text-primary">growing businesses</span>
			</h1>
			<p class="mt-6 text-lg text-muted-foreground leading-relaxed">
				I partner with small and medium businesses to create websites that look professional,
				work beautifully, and drive results. Here's how I can help.
			</p>
		</InView>
	</Container>
</Section>

<!-- Services Section -->
<Section padding="lg">
	<Container>
		<div class="space-y-10">
			{#each services as service, index}
				<InView animation="fade-up" delay={index * 100}>
					<Card
						class="relative overflow-hidden border-border/50 {service.highlight
							? 'border-primary/30 shadow-lg shadow-primary/5'
							: ''} hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
					>
						{#if service.highlight}
							<div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-accent"></div>
						{/if}

						<div class="grid md:grid-cols-3 gap-10 p-10">
							<!-- Service Info -->
							<div class="md:col-span-2">
								<div class="flex items-start gap-4 mb-6">
									<div
										class="w-14 h-14 rounded-xl {service.highlight
											? 'bg-primary/10'
											: 'bg-muted'} flex items-center justify-center flex-shrink-0"
									>
										<span class="{service.highlight ? 'text-primary' : 'text-muted-foreground'}">
											{@html service.icon}
										</span>
									</div>
									<div>
										<div class="flex items-center gap-3">
											<h2 class="text-2xl font-bold">{service.title}</h2>
											{#if service.highlight}
												<Badge variant="default" class="text-xs">Most Popular</Badge>
											{/if}
										</div>
										<p class="mt-2 text-muted-foreground">{service.description}</p>
									</div>
								</div>

								<!-- Features Grid -->
								<div class="grid sm:grid-cols-2 gap-3">
									{#each service.features as feature}
										<div class="flex items-start gap-2">
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
												class="{service.highlight ? 'text-primary' : 'text-accent'} mt-0.5 flex-shrink-0"
												><path d="M20 6 9 17l-5-5" /></svg
											>
											<span class="text-sm text-muted-foreground">{feature}</span>
										</div>
									{/each}
								</div>
							</div>

							<!-- CTA Side -->
							<div class="flex flex-col justify-center items-start md:items-center md:text-center">
								<p class="text-sm text-muted-foreground mb-4">
									{#if service.highlight}
										Starting from <span class="text-2xl font-bold text-foreground block">€4,000</span>
									{:else}
										<span class="text-2xl font-bold text-foreground block">Custom Quote</span>
									{/if}
								</p>
								<Button
									href="/contact"
									variant={service.highlight ? 'default' : 'outline'}
									class="w-full md:w-auto group"
								>
									Get a Quote
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="ml-1 transition-transform duration-300 group-hover:translate-x-1"
										><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
									>
								</Button>
							</div>
						</div>
					</Card>
				</InView>
			{/each}
		</div>
	</Container>
</Section>

<!-- Process Section -->
<Section padding="lg" background="muted">
	<Container>
		<InView animation="fade-up" class="text-center max-w-2xl mx-auto mb-12">
			<Badge variant="outline" class="mb-4 border-primary/20 text-primary">Process</Badge>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">How we'll work together</h2>
			<p class="mt-4 text-muted-foreground">
				A straightforward process designed to get you from idea to launch smoothly.
			</p>
		</InView>

		<div class="grid gap-8 md:grid-cols-4">
			{#each [
				{ step: '01', title: 'Discovery', description: 'We talk about your goals, audience, and vision. I ask questions, you share your story.' },
				{ step: '02', title: 'Design', description: 'I create mockups and iterate based on your feedback until the design feels right.' },
				{ step: '03', title: 'Development', description: 'I build your site with clean code, optimized performance, and attention to detail.' },
				{ step: '04', title: 'Launch', description: 'We go live! I handle deployment and make sure everything runs smoothly.' }
			] as process, index}
				<InView animation="fade-up" delay={index * 100}>
					<div class="relative p-6 rounded-2xl bg-background border border-border/50 h-full">
						<span
							class="text-5xl font-bold text-primary/10 absolute top-4 right-4"
						>
							{process.step}
						</span>
						<h3 class="text-lg font-semibold mb-2">{process.title}</h3>
						<p class="text-sm text-muted-foreground">{process.description}</p>
					</div>
				</InView>
			{/each}
		</div>
	</Container>
</Section>

<!-- FAQ Section -->
<Section padding="lg">
	<Container size="content">
		<InView animation="fade-up" class="text-center mb-10">
			<Badge variant="outline" class="mb-4 border-accent/30 text-accent">FAQ</Badge>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Common questions</h2>
		</InView>

		<div class="space-y-5">
			{#each faqs as faq, index}
				<InView animation="fade-up" delay={index * 50}>
					<div
						class="border border-border/50 rounded-xl overflow-hidden transition-all duration-300 {openFaq === index ? 'bg-muted/50 shadow-lg' : 'bg-background hover:bg-muted/30'}"
					>
						<button
							onclick={() => toggleFaq(index)}
							class="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
						>
							<span class="font-medium">{faq.question}</span>
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
								class="text-muted-foreground flex-shrink-0 transition-transform duration-300 {openFaq === index ? 'rotate-180' : ''}"
								><path d="m6 9 6 6 6-6" /></svg
							>
						</button>
						<div
							class="overflow-hidden transition-all duration-300 {openFaq === index ? 'max-h-96' : 'max-h-0'}"
						>
							<div class="px-6 pb-5 text-muted-foreground leading-relaxed">
								{faq.answer}
							</div>
						</div>
					</div>
				</InView>
			{/each}
		</div>
	</Container>
</Section>

<!-- CTA Section -->
<Section padding="lg" background="muted">
	<Container size="content">
		<InView animation="fade-up" class="text-center">
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				Ready to get started?
			</h2>
			<p class="mt-4 text-lg text-muted-foreground">
				Let's talk about your project. I'll give you an honest assessment and clear next steps.
			</p>
			<div class="mt-8 flex flex-wrap justify-center gap-4">
				<Button size="lg" href="/contact" class="group">
					Schedule a Call
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
						class="ml-1 transition-transform duration-300 group-hover:translate-x-1"
						><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
					>
				</Button>
				<Button
					size="lg"
					variant="outline"
					href="/work"
					class="group hover:border-primary/50 transition-colors duration-300"
				>
					See My Work
				</Button>
			</div>
		</InView>
	</Container>
</Section>
