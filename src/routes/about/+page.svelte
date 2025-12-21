<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Container, Section } from '$lib/components/layout';
	import { InView, Counter } from '$lib/components/ui/animations';

	const approaches = [
		{
			title: 'Strategy First',
			description: 'Every design decision is grounded in your business goals. I ask the right questions before I start designing.'
		},
		{
			title: 'Clear Communication',
			description: 'No jargon, no disappearing acts. You will always know where your project stands and what comes next.'
		},
		{
			title: 'Quality Over Speed',
			description: 'I take the time to get things right. You will receive work that is thoughtful, polished, and built to last.'
		},
		{
			title: 'Your Success is My Success',
			description: 'I am invested in your results, not just delivering files. Your website should actively help your business grow.'
		},
		{
			title: 'Modern Tech, Proven Methods',
			description: 'I use cutting-edge tools but stick to established design principles. Your site will be both innovative and reliable.'
		},
		{
			title: 'Long-Term Partnership',
			description: 'I am not just here for one project. I am available for ongoing support and future improvements as your business evolves.'
		}
	];

	const approachIcons = [
		'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-14a6 6 0 0 0-6 6h2a4 4 0 0 1 8 0h2a6 6 0 0 0-6-6z',
		'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
		'M12 3l-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z',
		'M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.7V17a1 1 0 0 1-1 1.2C8 18.8 7 20.2 7 22M14 14.7V17a1 1 0 0 0 1 1.2c1 .5 2 2 2 3.8M18 2H6v7a6 6 0 0 0 12 0V2z',
		'M16 18l6-6-6-6M8 6l-6 6 6 6',
		'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10'
	];
</script>

<svelte:head>
	<title>About | Haniffa Design Studio</title>
	<meta
		name="description"
		content="Learn about Onur Haniffa, a web designer helping businesses succeed online with modern, strategic design."
	/>
</svelte:head>

<!-- Hero Section -->
<Section padding="lg" class="relative overflow-hidden">
	<!-- Background decoration -->
	<div class="absolute inset-0 -z-10">
		<div
			class="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"
		></div>
		<div
			class="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"
		></div>
	</div>

	<Container>
		<div class="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
			<!-- Content -->
			<InView animation="fade-up">
				<Badge variant="outline" class="mb-6 border-primary/30 text-primary">About Me</Badge>
				<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
					I'm Onur—I help businesses <span class="text-primary">succeed online</span>
				</h1>
				<p class="mt-6 text-lg text-muted-foreground leading-relaxed">
					I'm a web designer and developer based in Europe, specializing in creating
					modern, strategic websites that turn visitors into customers. I believe great
					design should be accessible to businesses of all sizes.
				</p>
				<p class="mt-4 text-muted-foreground leading-relaxed">
					When I'm not designing, you'll find me exploring new technologies, learning about
					business strategy, or enjoying a good coffee. I bring the same curiosity and
					attention to detail to every project I take on.
				</p>

				<div class="mt-8 flex flex-wrap gap-4">
					<Button href="/contact" class="group">
						Let's Work Together
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
					<Button variant="outline" href="/work" class="hover:border-primary/50">
						See My Work
					</Button>
				</div>
			</InView>

			<!-- Photo -->
			<InView animation="fade-left" delay={100}>
				<div class="relative">
					<!-- Main photo container -->
					<div
						class="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 border border-border/50"
					>
						<div class="w-full h-full flex items-center justify-center">
							<div class="text-center">
								<div
									class="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 mx-auto mb-4 flex items-center justify-center"
								>
									<span class="text-3xl font-bold text-primary/60">OH</span>
								</div>
								<span class="text-muted-foreground text-sm">Profile Photo</span>
							</div>
						</div>
					</div>

					<!-- Decorative elements -->
					<div
						class="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10"
					></div>
					<div
						class="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-2xl -z-10"
					></div>
				</div>
			</InView>
		</div>
	</Container>
</Section>

<!-- Stats Section -->
<Section padding="lg" background="muted">
	<Container>
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each [
				{ value: 5, suffix: '+', label: 'Years Experience' },
				{ value: 20, suffix: '+', label: 'Projects Delivered' },
				{ value: 100, suffix: '%', label: 'Client Ownership' },
				{ value: 24, suffix: 'h', label: 'Response Time' }
			] as stat, index}
				<InView animation="fade-up" delay={index * 100}>
					<div class="text-center p-6 rounded-2xl bg-background border border-border/50">
						<p class="text-4xl font-bold text-primary">
							<Counter value={stat.value} suffix={stat.suffix} delay={index * 150} />
						</p>
						<p class="text-sm text-muted-foreground mt-2">{stat.label}</p>
					</div>
				</InView>
			{/each}
		</div>
	</Container>
</Section>

<!-- My Approach Section -->
<Section padding="lg">
	<Container>
		<InView animation="fade-up" class="text-center max-w-2xl mx-auto mb-10">
			<Badge variant="outline" class="mb-4 border-accent/30 text-accent">My Approach</Badge>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">How I work</h2>
			<p class="mt-4 text-muted-foreground">
				I believe in straightforward collaboration and delivering real value. Here's what you
				can expect when we work together.
			</p>
		</InView>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each approaches as approach, index}
				<InView animation="fade-up" delay={index * 100}>
					<div
						class="p-6 rounded-2xl bg-muted/50 border border-border/50 h-full transition-all duration-300 hover:bg-muted hover:shadow-lg hover:-translate-y-1 group"
					>
						<div
							class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-primary"
							>
								<path d={approachIcons[index]} />
							</svg>
						</div>
						<h3 class="font-semibold mb-2">{approach.title}</h3>
						<p class="text-sm text-muted-foreground">{approach.description}</p>
					</div>
				</InView>
			{/each}
		</div>
	</Container>
</Section>

<!-- Skills & Tools Section -->
<Section padding="lg" background="muted">
	<Container>
		<div class="grid gap-12 lg:grid-cols-2">
			<!-- Design Skills -->
			<InView animation="fade-up">
				<h3 class="text-xl font-bold mb-6 flex items-center gap-3">
					<div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
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
							><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path
								d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
							/></svg
						>
					</div>
					Design
				</h3>
				<div class="flex flex-wrap gap-2">
					{#each ['UI/UX Design', 'Figma', 'Visual Design', 'Wireframing', 'Prototyping', 'Design Systems', 'Responsive Design', 'Accessibility'] as skill}
						<span
							class="px-4 py-2 rounded-full bg-background border border-border/50 text-sm hover:border-primary/30 hover:bg-primary/5 transition-colors duration-300"
						>
							{skill}
						</span>
					{/each}
				</div>
			</InView>

			<!-- Development Skills -->
			<InView animation="fade-up" delay={100}>
				<h3 class="text-xl font-bold mb-6 flex items-center gap-3">
					<div class="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
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
							><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg
						>
					</div>
					Development
				</h3>
				<div class="flex flex-wrap gap-2">
					{#each ['SvelteKit', 'React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'HTML/CSS', 'JavaScript', 'Git'] as skill}
						<span
							class="px-4 py-2 rounded-full bg-background border border-border/50 text-sm hover:border-accent/30 hover:bg-accent/5 transition-colors duration-300"
						>
							{skill}
						</span>
					{/each}
				</div>
			</InView>
		</div>
	</Container>
</Section>

<!-- CTA Section -->
<Section padding="lg">
	<Container size="content">
		<InView animation="fade-up" class="text-center">
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Let's create something great</h2>
			<p class="mt-4 text-lg text-muted-foreground">
				Ready to start a project? I'd love to hear about your goals and see how I can help.
			</p>
			<div class="mt-8 flex flex-wrap justify-center gap-4">
				<Button size="lg" href="/contact" class="group">
					Get in Touch
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
					href="mailto:hello@ohaniffa.com"
					class="hover:border-primary/50"
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
						class="mr-2"
						><rect width="20" height="16" x="2" y="4" rx="2" /><path
							d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
						/></svg
					>
					hello@ohaniffa.com
				</Button>
			</div>
		</InView>
	</Container>
</Section>
