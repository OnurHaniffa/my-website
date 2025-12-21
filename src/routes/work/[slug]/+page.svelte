<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Container, Section } from '$lib/components/layout';
	import { InView, Counter } from '$lib/components/ui/animations';
	import { DeviceMockup } from '$lib/components/portfolio';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();
	const { project, nextProject } = data;

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>{project.title} | Haniffa Design Studio</title>
	<meta name="description" content={project.description} />
</svelte:head>

<!-- Hero Section -->
<Section padding="lg" class="relative overflow-hidden">
	<!-- Background decoration -->
	<div class="absolute inset-0 -z-10">
		<div
			class="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"
		></div>
		<div
			class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"
		></div>
	</div>

	<Container>
		<!-- Back link -->
		<a
			href="/work"
			class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
		>
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
				class="transition-transform duration-300 group-hover:-translate-x-1"
				><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg
			>
			Back to Work
		</a>

		<div class="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
			<!-- Content -->
			<div>
				<div
					class="flex flex-wrap gap-3 mb-6 transition-all duration-700 ease-out"
					class:opacity-0={!mounted}
					class:translate-y-4={!mounted}
					class:opacity-100={mounted}
					class:translate-y-0={mounted}
				>
					{#if project.isClientWork}
						<Badge class="bg-green-500/90 text-white border-none">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="mr-1"
								><path d="M20 6 9 17l-5-5" /></svg
							>
							Client Work
						</Badge>
					{:else}
						<Badge variant="outline" class="border-accent/50 text-accent">
							Demo Project
						</Badge>
					{/if}
					<Badge variant="outline" class="border-primary/30 text-primary">
						{project.industry}
					</Badge>
				</div>

				<h1
					class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl transition-all duration-700 ease-out"
					class:opacity-0={!mounted}
					class:translate-y-6={!mounted}
					class:opacity-100={mounted}
					class:translate-y-0={mounted}
					style="transition-delay: 100ms;"
				>
					{project.title}
				</h1>

				<p
					class="mt-4 text-xl text-primary font-medium transition-all duration-700 ease-out"
					class:opacity-0={!mounted}
					class:translate-y-4={!mounted}
					class:opacity-100={mounted}
					class:translate-y-0={mounted}
					style="transition-delay: 150ms;"
				>
					{project.tagline}
				</p>

				<p
					class="mt-6 text-lg text-muted-foreground leading-relaxed transition-all duration-700 ease-out"
					class:opacity-0={!mounted}
					class:translate-y-4={!mounted}
					class:opacity-100={mounted}
					class:translate-y-0={mounted}
					style="transition-delay: 200ms;"
				>
					{project.description}
				</p>

				<!-- Quick Stats -->
				<div
					class="mt-8 flex flex-wrap gap-8 pt-6 border-t border-border/50 transition-all duration-700 ease-out"
					class:opacity-0={!mounted}
					class:translate-y-4={!mounted}
					class:opacity-100={mounted}
					class:translate-y-0={mounted}
					style="transition-delay: 250ms;"
				>
					<div>
						<p class="text-sm text-muted-foreground">Year</p>
						<p class="font-semibold">{project.year}</p>
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Industry</p>
						<p class="font-semibold">{project.industry}</p>
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Services</p>
						<p class="font-semibold">{project.services.slice(0, 2).join(', ')}</p>
					</div>
				</div>

				<!-- CTAs -->
				<div
					class="mt-8 flex flex-wrap gap-4 transition-all duration-700 ease-out"
					class:opacity-0={!mounted}
					class:translate-y-4={!mounted}
					class:opacity-100={mounted}
					class:translate-y-0={mounted}
					style="transition-delay: 300ms;"
				>
					{#if project.liveUrl}
						<Button size="lg" href={project.liveUrl} target="_blank" class="group">
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
								><circle cx="12" cy="12" r="10" /><path
									d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
								/><path d="M2 12h20" /></svg
							>
							View Live Site
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
								><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline
									points="15 3 21 3 21 9"
								/><line x1="10" x2="21" y1="14" y2="3" /></svg
							>
						</Button>
					{/if}
					<Button variant="outline" href="/contact" class="group hover:border-primary/50">
						Start a Similar Project
					</Button>
				</div>
			</div>

			<!-- Device Mockup -->
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
				<DeviceMockup title={project.title} liveUrl={project.liveUrl} variant="primary" />
			</div>
		</div>
	</Container>
</Section>

<!-- Challenge & Solution -->
<Section padding="default" background="muted">
	<Container>
		<div class="grid gap-8 lg:grid-cols-2 lg:gap-12">
			<!-- Challenge -->
			<InView animation="fade-up">
				<div
					class="p-8 rounded-2xl bg-background border border-border/50 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
				>
					<div
						class="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-6"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="text-red-500"
							><path
								d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
							/><path d="M12 9v4" /><path d="M12 17h.01" /></svg
						>
					</div>
					<h2 class="text-2xl font-bold mb-4">The Challenge</h2>
					<p class="text-muted-foreground leading-relaxed">
						{project.challenge}
					</p>
				</div>
			</InView>

			<!-- Solution -->
			<InView animation="fade-up" delay={100}>
				<div
					class="p-8 rounded-2xl bg-background border border-border/50 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
				>
					<div
						class="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-6"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="text-green-500"
							><path
								d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
							/><path d="m9 12 2 2 4-4" /></svg
						>
					</div>
					<h2 class="text-2xl font-bold mb-4">The Solution</h2>
					<p class="text-muted-foreground leading-relaxed">
						{project.solution}
					</p>
				</div>
			</InView>
		</div>
	</Container>
</Section>

<!-- Results -->
<Section padding="default">
	<Container>
		<InView animation="fade-up" class="text-center mb-12">
			<Badge variant="outline" class="mb-4 border-primary/20 text-primary">Impact</Badge>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">The Results</h2>
			<p class="mt-4 text-muted-foreground max-w-xl mx-auto">
				Measurable outcomes that demonstrate the impact of thoughtful design and development.
			</p>
		</InView>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each project.results as result, index}
				<InView animation="fade-up" delay={index * 100}>
					<div
						class="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border/50 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
					>
						<div
							class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110"
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
								><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline
									points="16 7 22 7 22 13"
								/></svg
							>
						</div>
						<p class="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
							{result}
						</p>
					</div>
				</InView>
			{/each}
		</div>
	</Container>
</Section>

<!-- Gallery -->
<Section padding="default" background="muted">
	<Container>
		<InView animation="fade-up" class="mb-12">
			<h2 class="text-2xl font-bold tracking-tight">Project Gallery</h2>
			<p class="mt-2 text-muted-foreground">
				A closer look at the design details and user experience.
			</p>
		</InView>

		<div class="grid gap-6 md:grid-cols-2">
			{#each project.images as image, index}
				<InView animation="fade-up" delay={index * 100}>
					<div
						class="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border border-border/50 transition-all duration-300 hover:shadow-xl {index ===
						0
							? 'md:col-span-2 aspect-[21/9]'
							: ''}"
					>
						<div class="w-full h-full flex items-center justify-center group cursor-pointer">
							<div
								class="text-center transition-transform duration-300 group-hover:scale-110"
							>
								<div
									class="w-16 h-16 rounded-xl bg-primary/20 mx-auto mb-3 flex items-center justify-center"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="text-primary/60"
										><rect width="18" height="18" x="3" y="3" rx="2" /><circle
											cx="9"
											cy="9"
											r="2"
										/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg
									>
								</div>
								<span class="text-muted-foreground text-sm">
									{index === 0 ? 'Hero Image' : `Detail ${index}`}
								</span>
							</div>
						</div>
					</div>
				</InView>
			{/each}
		</div>
	</Container>
</Section>

<!-- Testimonial -->
{#if project.testimonial}
	<Section padding="default">
		<Container size="content">
			<InView animation="scale" class="text-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="56"
					height="56"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="mx-auto text-primary/20 mb-8"
					><path
						d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z"
					/><path
						d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
					/></svg
				>

				<blockquote
					class="text-2xl sm:text-3xl font-medium leading-relaxed text-foreground"
				>
					"{project.testimonial.quote}"
				</blockquote>

				<div class="mt-10 flex items-center justify-center gap-4">
					<div
						class="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
					>
						<span class="font-semibold"
							>{project.testimonial.author
								.split(' ')
								.map((n) => n[0])
								.join('')}</span
						>
					</div>
					<div class="text-left">
						<p class="font-semibold text-lg">{project.testimonial.author}</p>
						<p class="text-muted-foreground">{project.testimonial.role}</p>
					</div>
				</div>
			</InView>
		</Container>
	</Section>
{/if}

<!-- Next Project -->
<Section padding="lg" background="muted">
	<Container>
		<InView animation="fade-up">
			<div class="text-center mb-10">
				<p class="text-sm text-muted-foreground mb-2 uppercase tracking-wider">Next Project</p>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">{nextProject.title}</h2>
				<p class="mt-2 text-lg text-muted-foreground">{nextProject.tagline}</p>
			</div>

			<a href="/work/{nextProject.slug}" class="group block max-w-4xl mx-auto">
				<div
					class="aspect-[21/9] rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5 border border-border/50 transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]"
				>
					<div class="w-full h-full flex items-center justify-center">
						<div
							class="text-center transition-all duration-300 group-hover:scale-110"
						>
							<div
								class="w-20 h-20 rounded-2xl bg-accent/20 mx-auto mb-4 flex items-center justify-center"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="40"
									height="40"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="text-accent/60 transition-transform duration-300 group-hover:translate-x-2"
									><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
								>
							</div>
							<span
								class="text-muted-foreground group-hover:text-foreground transition-colors font-medium"
								>View Project</span
							>
						</div>
					</div>
				</div>
			</a>
		</InView>
	</Container>
</Section>

<!-- CTA -->
<Section padding="lg">
	<Container size="content">
		<InView animation="fade-up" class="text-center">
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				Like what you see?
			</h2>
			<p class="mt-4 text-lg text-muted-foreground">
				Let's discuss how I can help bring your vision to life.
			</p>
			<div class="mt-8 flex flex-wrap justify-center gap-4">
				<Button size="lg" href="/contact" class="group">
					Start a Conversation
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
					class="hover:border-primary/50"
				>
					Back to Portfolio
				</Button>
			</div>
		</InView>
	</Container>
</Section>
