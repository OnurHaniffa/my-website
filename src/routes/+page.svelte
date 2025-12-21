<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Container, Section } from '$lib/components/layout';
	import { InView, Counter } from '$lib/components/ui/animations';
	import { projects } from '$lib/data/projects';

</script>

<svelte:head>
	<title>Haniffa Design Studio | Websites That Convert</title>
	<meta name="description" content="I design websites that turn visitors into customers. Modern, professional web design built with strategy and clarity." />
</svelte:head>

<!-- Hero Section -->
<Section padding="none" class="relative overflow-hidden">
	<!-- Ambient background with optimized glow -->
	<div class="absolute inset-0 -z-10">
		<div class="absolute inset-0 bg-gradient-to-br from-background via-background to-muted"></div>
		<!-- Glowing orbs - animate only when motion is allowed -->
		<div class="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] glow-orb"></div>
		<div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] glow-orb-delayed"></div>
		<div class="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] glow-orb-slow"></div>
	</div>

	<!-- Floating particles and shapes -->
	<div class="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
		<!-- Circles -->
		<div class="particle absolute top-[15%] left-[8%] w-3 h-3 bg-primary/50 rounded-full"></div>
		<div class="particle-delayed absolute top-[25%] right-[12%] w-4 h-4 bg-accent/40 rounded-full"></div>
		<div class="particle-slow absolute bottom-[20%] left-[15%] w-2 h-2 bg-primary/40 rounded-full"></div>
		<div class="particle absolute top-[40%] right-[8%] w-3 h-3 bg-primary/30 rounded-full"></div>
		<div class="particle-delayed absolute bottom-[35%] right-[20%] w-2.5 h-2.5 bg-accent/50 rounded-full"></div>
		<div class="particle-slow absolute top-[60%] left-[5%] w-2 h-2 bg-accent/30 rounded-full"></div>

		<!-- Hollow circles -->
		<div class="particle absolute top-[30%] right-[25%] w-6 h-6 border-2 border-primary/20 rounded-full"></div>
		<div class="particle-delayed absolute bottom-[25%] left-[25%] w-8 h-8 border-2 border-accent/15 rounded-full"></div>
		<div class="particle-slow absolute top-[70%] right-[30%] w-5 h-5 border border-primary/25 rounded-full"></div>

		<!-- Squares -->
		<div class="particle-rotate absolute top-[20%] left-[35%] w-4 h-4 border border-accent/20 rotate-45"></div>
		<div class="particle-rotate-delayed absolute bottom-[30%] right-[35%] w-6 h-6 border-2 border-primary/15 rotate-12"></div>
		<div class="particle-rotate absolute top-[50%] left-[45%] w-3 h-3 bg-primary/10 rotate-45"></div>

		<!-- Dots cluster -->
		<div class="particle absolute top-[45%] left-[12%] w-1.5 h-1.5 bg-primary/60 rounded-full"></div>
		<div class="particle-delayed absolute top-[47%] left-[14%] w-1 h-1 bg-accent/50 rounded-full"></div>
		<div class="particle-slow absolute top-[44%] left-[16%] w-1.5 h-1.5 bg-primary/40 rounded-full"></div>
	</div>

	<Container class="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
		<div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
			<!-- Left Content -->
			<div class="space-y-8">
				<Badge variant="outline" class="border-primary/30 text-primary bg-primary/5 px-4 py-1.5">
					<span class="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
					Available for Projects
				</Badge>

				<!-- Headline with animated underline -->
				<div class="relative">
					<h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
						I build websites that turn visitors <span class="relative inline-block">into <span class="text-primary">customers</span>
							<!-- Animated curly underline -->
							<svg class="absolute -bottom-2 left-0 w-full h-4 curly-line" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
								<path
									d="M0 10 Q 25 0, 50 10 T 100 10 T 150 10 T 200 10"
									stroke="currentColor"
									stroke-width="2.5"
									stroke-linecap="round"
									class="text-primary"
									fill="none"
								/>
							</svg>
						</span>
					</h1>
				</div>

				<!-- Description -->
				<p class="text-xl text-muted-foreground max-w-lg leading-relaxed">
					From first click to final conversion—I design and develop websites that don't just look good, they deliver real business results.
				</p>

				<!-- Quick Stats -->
				<div class="flex flex-wrap gap-6 py-4">
					<div class="text-center">
						<p class="text-3xl font-bold text-primary">≤<Counter value={24} duration={2500} suffix="h" /></p>
						<p class="text-sm text-muted-foreground">Response time</p>
					</div>
					<div class="w-px bg-border"></div>
					<div class="text-center">
						<p class="text-3xl font-bold"><Counter value={2} duration={1800} />–<Counter value={3} duration={2200} delay={300} /> wks</p>
						<p class="text-sm text-muted-foreground">Avg. project</p>
					</div>
					<div class="w-px bg-border"></div>
					<div class="text-center">
						<p class="text-3xl font-bold text-green-600">SEO</p>
						<p class="text-sm text-muted-foreground">Optimized</p>
					</div>
				</div>

				<div class="flex flex-wrap gap-4">
					<Button size="lg" href="/work" class="group text-base px-8 py-6 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
						View My Work
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
					</Button>
					<Button size="lg" variant="outline" href="/contact" class="text-base px-8 py-6 rounded-full border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300">
						Let's Talk
					</Button>
				</div>
			</div>

			<!-- Creative Collage Style Browser Mockup -->
			<div class="relative">
				<!-- Glow behind mockup -->
				<div class="absolute inset-0 bg-primary/10 rounded-3xl blur-[60px] scale-90 -z-10"></div>

				<!-- Browser mockup -->
				<div class="relative bg-card rounded-2xl shadow-2xl border-2 border-border/50 overflow-hidden">
					<!-- Browser header -->
					<div class="flex items-center gap-2 px-4 py-3 bg-muted/80 border-b">
						<div class="flex gap-1.5">
							<div class="w-3 h-3 rounded-full bg-rose-400"></div>
							<div class="w-3 h-3 rounded-full bg-amber-400"></div>
							<div class="w-3 h-3 rounded-full bg-emerald-400"></div>
						</div>
						<div class="flex-1 mx-4">
							<div class="bg-background/80 rounded-lg px-4 py-1.5 text-sm text-muted-foreground flex items-center gap-2 border">
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
								creativestudio.com
							</div>
						</div>
					</div>

					<!-- Creative collage content -->
					<div class="aspect-[4/3] bg-[#f5f3ef] dark:bg-stone-900 p-5 relative overflow-hidden">
						<!-- Top nav hint -->
						<div class="flex justify-center gap-4 mb-3">
							<span class="text-[8px] text-stone-500 font-medium">Work</span>
							<span class="text-[8px] text-stone-400">Studio</span>
						</div>

						<!-- Headline -->
						<p class="text-[9px] sm:text-[11px] text-stone-800 dark:text-stone-200 text-center max-w-[90%] mx-auto leading-relaxed mb-2">
							A creative studio <em class="font-serif">crafting digital experiences</em> at the intersection of <em class="font-serif">design, strategy, and storytelling.</em>
						</p>

						<!-- Scattered photos collage -->
						<div class="relative h-[55%]">
							<!-- Photo 1 - Top left, tilted -->
							<div class="absolute top-0 left-[5%] w-[35%] aspect-[4/3] rounded-lg overflow-hidden shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-300">
								<img
									src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=225&fit=crop"
									alt="Team collaboration"
									class="w-full h-full object-cover"
								/>
							</div>

							<!-- Photo 2 - Center, larger -->
							<div class="absolute top-[10%] left-[30%] w-[40%] aspect-[4/3] rounded-lg overflow-hidden shadow-2xl transform rotate-3 z-10 hover:rotate-0 transition-transform duration-300">
								<img
									src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=225&fit=crop"
									alt="Analytics dashboard"
									class="w-full h-full object-cover"
								/>
							</div>

							<!-- Photo 3 - Right side -->
							<div class="absolute top-[5%] right-[2%] w-[30%] aspect-square rounded-lg overflow-hidden shadow-xl transform rotate-6 hover:rotate-0 transition-transform duration-300">
								<img
									src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=200&fit=crop"
									alt="Developer working"
									class="w-full h-full object-cover"
								/>
							</div>

							<!-- Photo 4 - Bottom left -->
							<div class="absolute bottom-[5%] left-[8%] w-[28%] aspect-[3/4] rounded-lg overflow-hidden shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
								<img
									src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=180&h=240&fit=crop"
									alt="Creative meeting"
									class="w-full h-full object-cover"
								/>
							</div>

							<!-- Photo 5 - Bottom right -->
							<div class="absolute bottom-[0%] right-[5%] w-[35%] aspect-video rounded-lg overflow-hidden shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
								<img
									src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=280&h=160&fit=crop"
									alt="Modern workspace"
									class="w-full h-full object-cover"
								/>
							</div>
						</div>

						<!-- Description block - bottom left -->
						<div class="absolute bottom-8 left-4 max-w-[35%]">
							<p class="text-[7px] font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">Featured Work</p>
							<p class="text-[6px] text-stone-500 dark:text-stone-400 leading-relaxed">
								Strategic websites and digital products built for brands ready to grow. Every pixel crafted with purpose.
							</p>
						</div>

						<!-- Bottom CTA -->
						<div class="absolute bottom-3 left-1/2 -translate-x-1/2">
							<span class="text-[8px] text-stone-600 dark:text-stone-400 font-medium tracking-wide underline underline-offset-2">Explore Projects →</span>
						</div>
					</div>
				</div>

				<!-- Floating phone mockup with matching style -->
				<div class="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 phone-float">
					<div class="bg-zinc-900 rounded-[2rem] shadow-2xl p-1.5 w-24 lg:w-32 relative">
						<div class="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-zinc-700/50 via-transparent to-zinc-800/50 pointer-events-none"></div>
						<div class="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-zinc-800 rounded-full z-10"></div>
						<div class="bg-[#f5f3ef] dark:bg-stone-900 rounded-[1.5rem] aspect-[9/16] p-2 pt-4 relative overflow-hidden">
							<!-- Mobile collage preview -->
							<div class="text-[5px] text-center text-stone-700 dark:text-stone-300 mb-2 leading-tight px-1">
								A creative studio <em>crafting digital experiences</em>
							</div>
							<div class="relative h-[75%]">
								<div class="absolute top-0 left-1 w-[45%] aspect-square rounded overflow-hidden shadow transform -rotate-6">
									<img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=80&h=80&fit=crop" alt="" class="w-full h-full object-cover" />
								</div>
								<div class="absolute top-[15%] right-1 w-[50%] aspect-[4/3] rounded overflow-hidden shadow-lg transform rotate-3 z-10">
									<img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&h=60&fit=crop" alt="" class="w-full h-full object-cover" />
								</div>
								<div class="absolute bottom-2 left-[20%] w-[55%] aspect-video rounded overflow-hidden shadow transform -rotate-2">
									<img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=80&h=45&fit=crop" alt="" class="w-full h-full object-cover" />
								</div>
							</div>
						</div>
						<div class="absolute -right-0.5 top-20 w-0.5 h-8 bg-zinc-700 rounded-l"></div>
						<div class="absolute -left-0.5 top-16 w-0.5 h-5 bg-zinc-700 rounded-r"></div>
						<div class="absolute -left-0.5 top-24 w-0.5 h-5 bg-zinc-700 rounded-r"></div>
					</div>
				</div>
			</div>
		</div>
	</Container>
</Section>

<!-- Services Section -->
<Section padding="lg" background="muted" class="relative overflow-hidden">
	<!-- Ambient glow -->
	<div class="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px]"></div>
	<div class="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[60px]"></div>

	<!-- Floating particles -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div class="particle absolute top-[10%] right-[10%] w-2 h-2 bg-primary/30 rounded-full"></div>
		<div class="particle-delayed absolute bottom-[20%] left-[8%] w-3 h-3 bg-accent/25 rounded-full"></div>
		<div class="particle-slow absolute top-[50%] right-[5%] w-2 h-2 border border-primary/20 rounded-full"></div>
	</div>

	<Container class="relative">
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-16">
				<Badge variant="outline" class="mb-6 border-primary/30 text-primary bg-primary/5">Services</Badge>
				<h2 class="text-4xl font-bold tracking-tight sm:text-5xl">
					What I <span class="text-primary">do</span>
				</h2>
				<p class="mt-4 text-lg text-muted-foreground">
					End-to-end web solutions tailored to help your business succeed online.
				</p>
			</div>
		</InView>

		<div class="grid gap-8 md:grid-cols-3">
			<InView animation="fade-up">
				<Card class="group h-full border-2 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 rounded-2xl">
					<CardHeader>
						<div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 transition-colors group-hover:bg-primary/20">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
						</div>
						<CardTitle class="text-xl">Website Design</CardTitle>
						<CardDescription class="text-base">
							Strategic design that converts visitors into customers. Clean, modern, and built entirely around your goals.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ul class="space-y-2 text-sm text-muted-foreground">
							<li class="flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary"><path d="M20 6 9 17l-5-5"/></svg>
								User research & strategy
							</li>
							<li class="flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary"><path d="M20 6 9 17l-5-5"/></svg>
								Custom UI/UX design
							</li>
							<li class="flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary"><path d="M20 6 9 17l-5-5"/></svg>
								Mobile-first approach
							</li>
						</ul>
					</CardContent>
				</Card>
			</InView>

			<InView animation="fade-up" delay={100}>
				<Card class="group h-full border-2 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 rounded-2xl">
					<CardHeader>
						<div class="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 transition-colors group-hover:bg-accent/20">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
						</div>
						<CardTitle class="text-xl">Development</CardTitle>
						<CardDescription class="text-base">
							Fast, accessible websites that search engines love. Built with modern technology that scales.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ul class="space-y-2 text-sm text-muted-foreground">
							<li class="flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-accent"><path d="M20 6 9 17l-5-5"/></svg>
								Lightning-fast loading
							</li>
							<li class="flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-accent"><path d="M20 6 9 17l-5-5"/></svg>
								SEO best practices
							</li>
							<li class="flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-accent"><path d="M20 6 9 17l-5-5"/></svg>
								Accessible to everyone
							</li>
						</ul>
					</CardContent>
				</Card>
			</InView>

			<InView animation="fade-up" delay={200}>
				<Card class="group h-full border-2 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 rounded-2xl">
					<CardHeader>
						<div class="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4 transition-colors group-hover:bg-green-500/20">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
						</div>
						<CardTitle class="text-xl">Ongoing Support</CardTitle>
						<CardDescription class="text-base">
							Peace of mind after launch. Regular updates, security monitoring, and priority support.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ul class="space-y-2 text-sm text-muted-foreground">
							<li class="flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-600"><path d="M20 6 9 17l-5-5"/></svg>
								Regular updates
							</li>
							<li class="flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-600"><path d="M20 6 9 17l-5-5"/></svg>
								Security monitoring
							</li>
							<li class="flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-600"><path d="M20 6 9 17l-5-5"/></svg>
								Priority support
							</li>
						</ul>
					</CardContent>
				</Card>
			</InView>
		</div>

		<InView animation="fade-up" delay={300} class="mt-12 text-center">
			<Button variant="outline" href="/services" class="group px-8 py-6 rounded-full text-base border-2 hover:border-primary/50">
				Explore All Services
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
			</Button>
		</InView>
	</Container>
</Section>

<!-- Featured Work Section -->
<Section padding="lg" class="relative overflow-hidden">
	<!-- Ambient glow -->
	<div class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>
	<div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px]"></div>

	<!-- Floating particles -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div class="particle absolute top-[15%] left-[12%] w-3 h-3 bg-primary/35 rounded-full"></div>
		<div class="particle-delayed absolute top-[35%] right-[18%] w-4 h-4 bg-accent/25 rounded-full"></div>
		<div class="particle-slow absolute bottom-[25%] right-[12%] w-2 h-2 bg-primary/30 rounded-full"></div>
		<div class="particle absolute top-[25%] left-[8%] w-8 h-8 border-2 border-accent/15 rotate-45"></div>
		<div class="particle-delayed absolute bottom-[20%] right-[8%] w-6 h-6 border-2 border-primary/15 rounded-full"></div>
	</div>

	<Container class="relative">
		<InView animation="fade-up">
			<div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
				<div>
					<Badge variant="outline" class="mb-6 border-primary/30 text-primary bg-primary/5">Portfolio</Badge>
					<h2 class="text-4xl font-bold tracking-tight sm:text-5xl">
						Recent <span class="text-primary">Projects</span>
					</h2>
					<p class="mt-4 text-lg text-muted-foreground">
						Real projects, real results. See what I can do for you.
					</p>
				</div>
				<Button variant="outline" href="/work" class="group px-6 py-5 rounded-full border-2 hover:border-primary/50">
					View All Work
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
				</Button>
			</div>
		</InView>

		<!-- Project Grid -->
		<div class="grid gap-8 md:grid-cols-2">
			{#each projects as project, index}
				<InView animation="fade-up" delay={index * 100}>
					<a href="/work/{project.slug}" class="group block">
						<Card class="overflow-hidden border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 rounded-2xl
							{index === 0
								? 'border-slate-800/20 hover:border-amber-500/40 bg-gradient-to-b from-slate-900/5 to-transparent dark:from-slate-800/20'
								: 'border-orange-200/30 hover:border-orange-400/50 bg-gradient-to-b from-orange-50/50 to-transparent dark:from-orange-950/20'}">
							<!-- Project Screenshot -->
							<div class="relative aspect-[16/10] overflow-hidden {index === 0 ? 'bg-slate-900' : 'bg-orange-50'}">
								<img
									src={index === 0 ? '/images/projects/joe-screenshot.png' : '/images/projects/dentist-screenshot.png'}
									alt={project.title}
									class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
								/>

								<!-- Badge -->
								<div class="absolute top-4 left-4 z-10">
									{#if project.isClientWork}
										<Badge class="{index === 0 ? 'bg-amber-500/90' : 'bg-green-500/90'} text-white shadow-lg backdrop-blur-sm">
											<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-1"><path d="M20 6 9 17l-5-5"/></svg>
											Client Work
										</Badge>
									{:else}
										<Badge class="{index === 0 ? 'bg-slate-800/90 text-amber-400' : 'bg-white/90 text-orange-600'} backdrop-blur-sm shadow-lg">
											Demo Project
										</Badge>
									{/if}
								</div>

								<!-- Live site indicator -->
								{#if project.liveUrl}
									<div class="absolute top-4 right-4 z-10">
										<div class="flex items-center gap-2 px-3 py-1.5 backdrop-blur-sm rounded-full text-sm shadow-lg
											{index === 0 ? 'bg-slate-800/90 text-white' : 'bg-white/90 text-gray-700'}">
											<span class="w-2 h-2 {index === 0 ? 'bg-amber-400' : 'bg-green-500'} rounded-full animate-pulse"></span>
											Live
										</div>
									</div>
								{/if}

								<!-- Hover overlay -->
								<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6
									{index === 0 ? 'bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent' : 'bg-gradient-to-t from-orange-900/80 via-transparent to-transparent'}">
									<span class="px-4 py-2 rounded-full text-sm font-medium shadow-lg
										{index === 0 ? 'bg-amber-500 text-slate-900' : 'bg-orange-500 text-white'}">
										View Project
									</span>
								</div>
							</div>

							<!-- Project Info -->
							<CardContent class="p-6">
								<div class="flex items-start justify-between gap-4">
									<div class="space-y-2">
										<div class="flex items-center gap-2">
											<Badge variant="outline" class="text-xs {index === 0 ? 'border-amber-500/50 text-amber-600 dark:text-amber-400' : 'border-orange-400/50 text-orange-600 dark:text-orange-400'}">{project.industry}</Badge>
											<span class="text-xs text-muted-foreground">{project.year}</span>
										</div>
										<h3 class="text-xl font-bold transition-colors {index === 0 ? 'group-hover:text-amber-500' : 'group-hover:text-orange-500'}">{project.title}</h3>
										<p class="text-muted-foreground line-clamp-2">{project.tagline}</p>
									</div>
									<div class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
										{index === 0
											? 'bg-amber-500/10 group-hover:bg-amber-500 group-hover:text-slate-900'
											: 'bg-orange-500/10 group-hover:bg-orange-500 group-hover:text-white'}">
										<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
									</div>
								</div>
							</CardContent>
						</Card>
					</a>
				</InView>
			{/each}
		</div>
	</Container>
</Section>

<!-- Why Choose Me Section -->
<Section padding="lg" background="muted" class="relative overflow-hidden">
	<!-- Ambient glow -->
	<div class="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px]"></div>
	<div class="absolute bottom-0 right-0 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[70px]"></div>

	<!-- Floating particles -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div class="particle absolute top-[20%] right-[15%] w-2.5 h-2.5 bg-primary/30 rounded-full"></div>
		<div class="particle-delayed absolute bottom-[15%] left-[10%] w-3 h-3 bg-accent/25 rounded-full"></div>
		<div class="particle-slow absolute top-[40%] left-[5%] w-5 h-5 border border-primary/20 rounded-full"></div>
		<div class="particle absolute bottom-[30%] right-[8%] w-4 h-4 border border-accent/15 rotate-45"></div>
	</div>

	<Container class="relative">
		<InView animation="fade-up">
			<div class="text-center max-w-2xl mx-auto mb-16">
				<Badge variant="outline" class="mb-6 border-primary/30 text-primary bg-primary/5">Why Me</Badge>
				<h2 class="text-4xl font-bold tracking-tight sm:text-5xl">
					Why work <span class="text-primary">with me</span>
				</h2>
				<p class="mt-4 text-lg text-muted-foreground">
					No agencies, no hand-offs—just direct communication and dedicated attention.
				</p>
			</div>
		</InView>

		<div class="grid gap-6 sm:grid-cols-2">
			<InView animation="fade-up">
				<Card class="group h-full border-2 transition-all duration-300 hover:border-primary/30 hover:shadow-xl rounded-2xl">
					<CardContent class="p-8">
						<div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 transition-colors group-hover:bg-primary/20">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
						</div>
						<h3 class="text-xl font-bold mb-3">Clear Communication</h3>
						<p class="text-muted-foreground">
							No jargon, no fluff. I keep you in the loop with straightforward updates so you always know where your project stands.
						</p>
					</CardContent>
				</Card>
			</InView>

			<InView animation="fade-up" delay={100}>
				<Card class="group h-full border-2 transition-all duration-300 hover:border-accent/30 hover:shadow-xl rounded-2xl">
					<CardContent class="p-8">
						<div class="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 transition-colors group-hover:bg-accent/20">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>
						</div>
						<h3 class="text-xl font-bold mb-3">Results-Focused</h3>
						<p class="text-muted-foreground">
							Every design decision is made with your goals in mind. I care about how your website performs, not just how it looks.
						</p>
					</CardContent>
				</Card>
			</InView>

			<InView animation="fade-up" delay={200}>
				<Card class="group h-full border-2 transition-all duration-300 hover:border-primary/30 hover:shadow-xl rounded-2xl">
					<CardContent class="p-8">
						<div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 transition-colors group-hover:bg-primary/20">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
						</div>
						<h3 class="text-xl font-bold mb-3">Fast Delivery</h3>
						<p class="text-muted-foreground">
							Most projects launch within 2-3 weeks. You get a quality website without the endless wait times.
						</p>
					</CardContent>
				</Card>
			</InView>

			<InView animation="fade-up" delay={300}>
				<Card class="group h-full border-2 transition-all duration-300 hover:border-green-500/30 hover:shadow-xl rounded-2xl">
					<CardContent class="p-8">
						<div class="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 transition-colors group-hover:bg-green-500/20">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
						</div>
						<h3 class="text-xl font-bold mb-3">Full Ownership</h3>
						<p class="text-muted-foreground">
							Your website, your code, your content. No lock-ins or hidden fees—you own everything when we're done.
						</p>
					</CardContent>
				</Card>
			</InView>
		</div>

		<InView animation="fade-up" delay={400} class="mt-12 text-center">
			<Button href="/about" variant="outline" class="group px-8 py-6 rounded-full text-base border-2 transition-all duration-150 hover:!bg-foreground/5 hover:!border-foreground/20 hover:!text-foreground">
				Learn More About Me
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform duration-150 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
			</Button>
		</InView>
	</Container>
</Section>

<style>
	/* TASK 4: All animations respect prefers-reduced-motion */
	@media (prefers-reduced-motion: reduce) {
		.particle,
		.particle-delayed,
		.particle-slow,
		.particle-rotate,
		.particle-rotate-delayed,
		.phone-float,
		.glow-orb,
		.glow-orb-delayed,
		.glow-orb-slow {
			animation: none !important;
		}
	}

	/* Floating particles - simple Y translate */
	.particle {
		will-change: transform;
		animation: float 6s ease-in-out infinite;
	}

	.particle-delayed {
		will-change: transform;
		animation: float 6s ease-in-out infinite;
		animation-delay: 2s;
	}

	.particle-slow {
		will-change: transform;
		animation: float 8s ease-in-out infinite;
		animation-delay: 1s;
	}

	/* Rotating particles */
	.particle-rotate {
		will-change: transform;
		animation: float-rotate 10s ease-in-out infinite;
	}

	.particle-rotate-delayed {
		will-change: transform;
		animation: float-rotate 12s ease-in-out infinite;
		animation-delay: 3s;
	}

	/* Phone float animation */
	.phone-float {
		will-change: transform;
		animation: phone-bob 4s ease-in-out infinite;
	}

	/* Glow orb animations - subtle opacity pulse */
	.glow-orb {
		will-change: opacity;
		animation: glow-pulse 8s ease-in-out infinite;
	}

	.glow-orb-delayed {
		will-change: opacity;
		animation: glow-pulse 8s ease-in-out infinite;
		animation-delay: 2s;
	}

	.glow-orb-slow {
		will-change: opacity;
		animation: glow-pulse 10s ease-in-out infinite;
		animation-delay: 4s;
	}

	@keyframes float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-15px); }
	}

	@keyframes float-rotate {
		0%, 100% { transform: translateY(0) rotate(0deg); }
		50% { transform: translateY(-10px) rotate(180deg); }
	}

	@keyframes phone-bob {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-12px); }
	}

	@keyframes glow-pulse {
		0%, 100% { opacity: 0.6; }
		50% { opacity: 1; }
	}

	/* Animated curly underline */
	.curly-line path {
		stroke-dasharray: 400;
		stroke-dashoffset: 400;
		animation: draw-curly 1.5s ease-out 0.5s forwards;
	}

	@keyframes draw-curly {
		to {
			stroke-dashoffset: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.curly-line path {
			animation: none;
			stroke-dashoffset: 0;
		}
	}
</style>
