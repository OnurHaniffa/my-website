<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Container, Section } from '$lib/components/layout';
	import { Counter } from '$lib/components/ui/animations';
	import { projects } from '$lib/data/projects';

	let heroContent: HTMLDivElement;
	let heroMockup: HTMLDivElement;
	let curlyLine: SVGSVGElement;
	let servicesSection: HTMLDivElement;
	let serviceCards: HTMLDivElement;
	let projectsSection: HTMLDivElement;
	let whyMeSection: HTMLDivElement;

	onMount(() => {
		// Check for reduced motion preference
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Skip animations if reduced motion is preferred or elements don't exist
		if (prefersReducedMotion || !heroContent || !heroMockup || !curlyLine) {
			return () => {};
		}

		// Set initial states
		gsap.set([heroContent, heroMockup], { opacity: 0, y: 30 });
		gsap.set(curlyLine, { opacity: 0 });

		// Hero timeline - staggered entrance
		const heroTl = gsap.timeline({ delay: 0.1 });

		const curlyPath = curlyLine.querySelector('path');

		heroTl
			.to(heroContent, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: 'power2.out'
			})
			.to(heroMockup, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: 'power2.out'
			}, '-=0.5')
			.to(curlyLine, {
				opacity: 1,
				duration: 0.3
			}, '-=0.3');

		if (curlyPath) {
			heroTl.fromTo(curlyPath,
				{ strokeDashoffset: 300 },
				{ strokeDashoffset: 0, duration: 4, ease: 'power2.out' },
				'-=0.2'
			);
		}

		// Scroll-triggered animations using IntersectionObserver (lighter than ScrollTrigger)
		const observerOptions = { threshold: 0.15, rootMargin: '0px' };

		const animateOnScroll = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const target = entry.target as HTMLElement;

					if (target === servicesSection) {
						gsap.fromTo(servicesSection.querySelector('.section-header'),
							{ opacity: 0, y: 40 },
							{ opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
						);
						gsap.fromTo(serviceCards?.children || [],
							{ opacity: 0, y: 50 },
							{ opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
						);
					}

					if (target === projectsSection) {
						gsap.fromTo(projectsSection.querySelector('.section-header'),
							{ opacity: 0, y: 40 },
							{ opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
						);
						gsap.fromTo(projectsSection.querySelectorAll('.project-card'),
							{ opacity: 0, y: 50 },
							{ opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.2 }
						);
					}

					if (target === whyMeSection) {
						gsap.fromTo(whyMeSection.querySelector('.section-header'),
							{ opacity: 0, y: 40 },
							{ opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
						);
						gsap.fromTo(whyMeSection.querySelectorAll('.why-card'),
							{ opacity: 0, y: 50 },
							{ opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
						);
					}

					observer.unobserve(target);
				}
			});
		};

		const scrollObserver = new IntersectionObserver(animateOnScroll, observerOptions);

		// Set initial states for scroll sections
		if (servicesSection) {
			gsap.set(servicesSection.querySelector('.section-header'), { opacity: 0 });
			gsap.set(serviceCards?.children || [], { opacity: 0 });
			scrollObserver.observe(servicesSection);
		}
		if (projectsSection) {
			gsap.set(projectsSection.querySelector('.section-header'), { opacity: 0 });
			gsap.set(projectsSection.querySelectorAll('.project-card'), { opacity: 0 });
			scrollObserver.observe(projectsSection);
		}
		if (whyMeSection) {
			gsap.set(whyMeSection.querySelector('.section-header'), { opacity: 0 });
			gsap.set(whyMeSection.querySelectorAll('.why-card'), { opacity: 0 });
			scrollObserver.observe(whyMeSection);
		}

		return () => {
			scrollObserver.disconnect();
			heroTl.kill();
		};
	});
</script>

<svelte:head>
	<title>Haniffa Design Studio | Websites That Convert</title>
	<meta name="description" content="I design websites that turn visitors into customers. Modern, professional web design built with strategy and clarity." />
</svelte:head>

<!-- Hero Section -->
<Section padding="none" class="relative overflow-hidden">
	<!-- BIG BOLD GLOW - prominent ambient effect -->
	<div class="absolute inset-0 -z-10">
		<div class="absolute inset-0 bg-gradient-to-br from-background via-background to-muted"></div>
		<!-- MAIN GLOW - Big red presence in corner -->
		<div class="absolute -top-[100px] -right-[100px] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:-top-[200px] lg:-right-[200px] lg:w-[1000px] lg:h-[1000px] hero-glow-main"></div>
		<!-- Secondary blue glow - bottom left -->
		<div class="absolute -bottom-[150px] -left-[150px] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:-bottom-[300px] lg:-left-[300px] lg:w-[900px] lg:h-[900px] hero-glow-blue"></div>
		<!-- Center ambient fill -->
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] sm:w-[800px] sm:h-[600px] lg:w-[1200px] lg:h-[800px] hero-glow-center"></div>
		<!-- Subtle grain texture -->
		<div class="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] pointer-events-none mix-blend-overlay"
			style="background-image: url('data:image/svg+xml,%3Csvg viewBox=&apos;0 0 400 400&apos; xmlns=&apos;http://www.w3.org/2000/svg&apos;%3E%3Cfilter id=&apos;noise&apos;%3E%3CfeTurbulence type=&apos;fractalNoise&apos; baseFrequency=&apos;0.9&apos; numOctaves=&apos;4&apos; /%3E%3C/filter%3E%3Crect width=&apos;100%25&apos; height=&apos;100%25&apos; filter=&apos;url(%23noise)&apos; /%3E%3C/svg%3E');"></div>
	</div>

	<!-- Decorative circles - hidden on mobile -->
	<div aria-hidden="true" class="hidden lg:block absolute top-20 right-[10%] w-72 h-72 rounded-full border border-primary/10 pointer-events-none"></div>
	<div aria-hidden="true" class="hidden lg:block absolute top-40 right-[15%] w-48 h-48 rounded-full border border-accent/10 pointer-events-none"></div>
	<div aria-hidden="true" class="hidden lg:block absolute bottom-20 left-[5%] w-64 h-64 rounded-full border border-primary/5 pointer-events-none"></div>
	<div aria-hidden="true" class="hidden lg:block absolute -bottom-20 right-[20%] w-96 h-96 rounded-full bg-primary/[0.03] pointer-events-none"></div>

	<Container class="relative pt-36 pb-24 lg:pt-44 lg:pb-36">
		<div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
			<!-- Left Content -->
			<div bind:this={heroContent} class="space-y-6 sm:space-y-8 lg:space-y-10">
				<Badge variant="outline" class="border-primary/40 text-primary bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
					<span class="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
					Available for Projects
				</Badge>

				<!-- Headline with animated underline -->
				<div class="relative">
					<h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
						I build websites that turn visitors <span class="relative inline-block">into <span class="text-primary">customers</span>
							<!-- Curly underline -->
							<svg bind:this={curlyLine} class="absolute -bottom-6 left-0 w-full h-6" viewBox="0 0 200 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
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
				</div>

				<!-- Description -->
				<p class="text-lg text-muted-foreground/90 max-w-md leading-relaxed">
					From first click to final conversion—I design and develop websites that don't just look good, they deliver real business results.
				</p>

				<!-- Quick Stats -->
				<div class="flex flex-wrap gap-6 sm:gap-8 py-4">
					<div class="text-center">
						<p class="text-3xl font-bold text-primary">≤<Counter value={24} duration={2500} suffix="h" /></p>
						<p class="text-sm text-muted-foreground">Response time</p>
					</div>
					<div class="hidden sm:block w-px bg-border"></div>
					<div class="text-center">
						<p class="text-3xl font-bold"><Counter value={2} duration={1800} />–<Counter value={3} duration={2200} delay={300} /> wks</p>
						<p class="text-sm text-muted-foreground">Avg. project</p>
					</div>
					<div class="hidden sm:block w-px bg-border"></div>
					<div class="text-center">
						<p class="text-3xl font-bold text-green-600 dark:text-green-400">SEO</p>
						<p class="text-sm text-muted-foreground">Optimized</p>
					</div>
				</div>

				<div class="flex flex-wrap gap-4">
					<Button size="lg" href="/work" class="group text-base px-10 py-7 rounded-full shadow-2xl shadow-primary/40 hover:shadow-[0_20px_50px_-10px] hover:shadow-primary/50 hover:scale-[1.02] font-semibold focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none transition-all duration-300">
						View My Work
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
					</Button>
					<Button size="lg" variant="ghost" href="/contact" class="text-base px-8 py-6 rounded-full border border-border/60 hover:bg-foreground/5 hover:border-foreground/30 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none transition-colors duration-300">
						Let's Talk
					</Button>
				</div>
			</div>

			<!-- Generic Website Demo Mockup -->
			<div bind:this={heroMockup} class="relative">
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
								yourwebsite.com
							</div>
						</div>
					</div>

					<!-- Hero image website demo -->
					<div class="aspect-[4/3] relative overflow-hidden">
						<img
							src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=450&fit=crop&q=75"
							alt="Professional team"
							fetchpriority="high"
							class="absolute inset-0 w-full h-full object-cover"
						/>
						<div class="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/70 to-stone-900/50"></div>

						<div class="relative h-full p-6 flex flex-col">
							<div class="flex items-center justify-between mb-auto">
								<div class="flex items-center gap-2">
									<div class="w-6 h-6 rounded bg-white/20"></div>
									<span class="text-[10px] text-white/90 font-semibold">YourBrand</span>
								</div>
								<div class="flex gap-4">
									<span class="text-[8px] text-white/60">Home</span>
									<span class="text-[8px] text-white/60">Services</span>
									<span class="text-[8px] text-white/60">About</span>
									<span class="text-[8px] text-white/90 font-medium">Contact</span>
								</div>
							</div>

							<div class="flex-1 flex flex-col justify-center max-w-[70%]">
								<p class="text-[8px] text-amber-400 font-medium uppercase tracking-wider mb-2">Your Tagline Here</p>
								<h2 class="text-white text-lg sm:text-xl font-bold leading-tight mb-3">
									Your headline goes here
								</h2>
								<p class="text-[9px] text-white/70 leading-relaxed mb-4">
									This is where your compelling description would go. A few lines about what makes your business special.
								</p>
								<div class="flex gap-2">
									<div class="px-3 py-1.5 bg-amber-500 rounded text-[8px] text-stone-900 font-semibold">Get Started</div>
									<div class="px-3 py-1.5 border border-white/30 rounded text-[8px] text-white/90">Learn More</div>
								</div>
							</div>

							<div class="flex gap-6 pt-4 border-t border-white/10 mt-auto">
								<div>
									<p class="text-white text-sm font-bold">100+</p>
									<p class="text-[7px] text-white/50">Happy Clients</p>
								</div>
								<div>
									<p class="text-white text-sm font-bold">5 Stars</p>
									<p class="text-[7px] text-white/50">Average Rating</p>
								</div>
								<div>
									<p class="text-white text-sm font-bold">24/7</p>
									<p class="text-[7px] text-white/50">Support</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Phone mockup -->
				<div class="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 lg:-bottom-8 lg:-right-8">
					<div class="bg-zinc-900 rounded-[2rem] shadow-2xl p-1.5 w-24 lg:w-32 relative">
						<div class="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-zinc-700/50 via-transparent to-zinc-800/50 pointer-events-none"></div>
						<div class="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-zinc-800 rounded-full z-10"></div>
						<div class="rounded-[1.5rem] aspect-[9/16] relative overflow-hidden">
							<img
								src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=150&h=260&fit=crop&q=70"
								alt=""
								loading="lazy"
								class="absolute inset-0 w-full h-full object-cover"
							/>
							<div class="absolute inset-0 bg-gradient-to-b from-stone-900/90 via-stone-900/70 to-stone-900/90"></div>
							<div class="relative h-full p-3 flex flex-col">
								<div class="flex items-center gap-1 mb-3">
									<div class="w-3 h-3 rounded bg-white/20"></div>
									<span class="text-[6px] text-white/90 font-semibold">YourBrand</span>
								</div>
								<div class="flex-1 flex flex-col justify-center">
									<p class="text-[5px] text-amber-400 font-medium uppercase mb-1">Tagline</p>
									<p class="text-[8px] text-white font-bold leading-tight mb-2">Your headline goes here</p>
									<div class="w-12 h-4 bg-amber-500 rounded flex items-center justify-center">
										<span class="text-[5px] text-stone-900 font-semibold">Get Started</span>
									</div>
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

<!-- Subtle section separator -->
<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- Services Section -->
<Section padding="lg" background="muted">
	<Container>
		<div bind:this={servicesSection}>
			<div class="text-center max-w-2xl mx-auto mb-16 pt-10 lg:pt-14 section-header">
				<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">Services</Badge>
				<h2 class="text-4xl font-bold tracking-tight sm:text-5xl">
					What I <span class="text-primary">do</span>
				</h2>
				<p class="mt-4 text-lg text-muted-foreground">
					End-to-end web solutions tailored to help your business succeed online.
				</p>
			</div>

			<div bind:this={serviceCards} class="grid gap-8 md:grid-cols-3">
				<Card class="group h-full border-0 bg-card hover:shadow-[0_25px_60px_-20px] hover:shadow-primary/25 hover:-translate-y-2 rounded-2xl transition-all duration-500 ring-1 ring-border/50 hover:ring-primary/40">
					<CardHeader>
						<div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary group-hover:text-white transition-colors duration-300"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
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

				<Card class="group h-full border-0 bg-card hover:shadow-[0_25px_60px_-20px] hover:shadow-accent/25 hover:-translate-y-2 rounded-2xl transition-all duration-500 ring-1 ring-border/50 hover:ring-accent/40">
					<CardHeader>
						<div class="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent group-hover:text-white transition-colors duration-300"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
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

				<Card class="group h-full border-0 bg-card hover:shadow-[0_25px_60px_-20px] hover:shadow-green-500/25 hover:-translate-y-2 rounded-2xl transition-all duration-500 ring-1 ring-border/50 hover:ring-green-500/40">
					<CardHeader>
						<div class="w-14 h-14 rounded-2xl bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center mb-4 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600 dark:text-green-400 group-hover:text-white transition-colors duration-300"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
						</div>
						<CardTitle class="text-xl">Ongoing Support</CardTitle>
						<CardDescription class="text-base">
							Peace of mind after launch. Regular updates, security monitoring, and priority support.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ul class="space-y-2 text-sm text-muted-foreground">
							<li class="flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-600 dark:text-green-400"><path d="M20 6 9 17l-5-5"/></svg>
								Regular updates
							</li>
							<li class="flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-600 dark:text-green-400"><path d="M20 6 9 17l-5-5"/></svg>
								Security monitoring
							</li>
							<li class="flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-600 dark:text-green-400"><path d="M20 6 9 17l-5-5"/></svg>
								Priority support
							</li>
						</ul>
					</CardContent>
				</Card>
			</div>

			<div class="mt-12 text-center">
				<Button variant="outline" href="/services" class="group px-8 py-6 rounded-full text-base border-2 hover:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none">
					Explore All Services
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
				</Button>
			</div>
		</div>
	</Container>
</Section>

<!-- Subtle section separator -->
<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- Featured Work Section -->
<Section padding="lg" class="relative">
	<Container>
		<div bind:this={projectsSection}>
			<div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 pt-10 lg:pt-14 section-header">
				<div>
					<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">Portfolio</Badge>
					<h2 class="text-4xl font-bold tracking-tight sm:text-5xl">
						Recent <span class="text-primary">Projects</span>
					</h2>
					<p class="mt-4 text-lg text-muted-foreground">
						Real projects, real results. See what I can do for you.
					</p>
				</div>
				<Button variant="outline" href="/work" class="group px-6 py-5 rounded-full border-2 hover:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none">
					View All Work
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
				</Button>
			</div>

			<div class="grid gap-8 md:grid-cols-2">
				{#each projects as project, index}
					<a href="/work" class="group block project-card focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:rounded-2xl">
						<Card class="overflow-hidden border border-border/30 shadow-lg hover:shadow-2xl hover:-translate-y-1 rounded-2xl transition-all duration-500
							{index === 0
								? 'hover:border-amber-500/40 bg-gradient-to-b from-slate-900/5 to-transparent dark:from-slate-800/20'
								: 'hover:border-orange-400/50 bg-gradient-to-b from-orange-50/50 to-transparent dark:from-orange-950/20'}">
							<div class="relative aspect-[16/10] overflow-hidden {index === 0 ? 'bg-slate-900' : 'bg-orange-50'}">
								<img
									src={index === 0 ? '/images/projects/joe-screenshot-light.png' : '/images/projects/dentist-screenshot.jpg'}
									loading="lazy"
									alt={project.title}
									class="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
								/>

								<div class="absolute top-4 left-4 z-10">
									{#if project.isClientWork}
										<Badge class="{index === 0 ? 'bg-amber-500/90' : 'bg-green-500/90'} text-white shadow-lg">
											<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-1"><path d="M20 6 9 17l-5-5"/></svg>
											Client Work
										</Badge>
									{:else}
										<Badge class="{index === 0 ? 'bg-slate-800/90 text-amber-400' : 'bg-white/90 text-orange-600'} shadow-lg">
											Demo Project
										</Badge>
									{/if}
								</div>

								{#if project.liveUrl}
									<div class="absolute top-4 right-4 z-10">
										<div class="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm shadow-lg
											{index === 0 ? 'bg-slate-800/90 text-white' : 'bg-white/90 text-gray-700'}">
											<span class="w-2 h-2 {index === 0 ? 'bg-amber-400' : 'bg-green-500'} rounded-full"></span>
											Live
										</div>
									</div>
								{/if}

								<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6
									{index === 0 ? 'bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent' : 'bg-gradient-to-t from-orange-900/80 via-transparent to-transparent'}">
									<span class="px-4 py-2 rounded-full text-sm font-medium shadow-lg
										{index === 0 ? 'bg-amber-500 text-slate-900' : 'bg-orange-500 text-white'}">
										View Project
									</span>
								</div>
							</div>

							<CardContent class="p-6">
								<div class="flex items-start justify-between gap-4">
									<div class="space-y-2">
										<div class="flex items-center gap-2">
											<Badge variant="outline" class="text-xs {index === 0 ? 'border-amber-500/50 text-amber-600 dark:text-amber-400' : 'border-orange-400/50 text-orange-600 dark:text-orange-400'}">{project.industry}</Badge>
											<span class="text-xs text-muted-foreground">{project.year}</span>
										</div>
										<h3 class="text-xl font-bold {index === 0 ? 'group-hover:text-amber-500' : 'group-hover:text-orange-500'} transition-colors">{project.title}</h3>
										<p class="text-muted-foreground line-clamp-2">{project.tagline}</p>
									</div>
									<div class="flex-shrink-0 w-11 h-11 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300
										{index === 0
											? 'bg-amber-500/10 group-hover:bg-amber-500 group-hover:text-slate-900'
											: 'bg-orange-500/10 group-hover:bg-orange-500 group-hover:text-white'}">
										<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
									</div>
								</div>
							</CardContent>
						</Card>
					</a>
				{/each}
			</div>
		</div>
	</Container>
</Section>

<!-- Subtle section separator -->
<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

<!-- Why Choose Me Section -->
<Section padding="lg" background="muted">
	<Container>
		<div bind:this={whyMeSection}>
			<div class="text-center max-w-2xl mx-auto mb-16 pt-10 lg:pt-14 section-header">
				<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">Why Me</Badge>
				<h2 class="text-4xl font-bold tracking-tight sm:text-5xl">
					Why work <span class="text-primary">with me</span>
				</h2>
				<p class="mt-4 text-lg text-muted-foreground">
					No agencies, no hand-offs—just direct communication and dedicated attention.
				</p>
			</div>

			<div class="grid gap-6 sm:grid-cols-2">
				<Card class="why-card group h-full border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:shadow-xl rounded-2xl transition-all duration-500 ring-1 ring-border/30">
					<CardContent class="p-8">
						<div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary group-hover:text-inherit"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
						</div>
						<h3 class="text-xl font-bold mb-3">Clear Communication</h3>
						<p class="text-muted-foreground">
							No jargon, no fluff. I keep you in the loop with straightforward updates so you always know where your project stands.
						</p>
					</CardContent>
				</Card>

				<Card class="why-card group h-full border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:shadow-xl rounded-2xl transition-all duration-500 ring-1 ring-border/30">
					<CardContent class="p-8">
						<div class="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent group-hover:text-inherit"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>
						</div>
						<h3 class="text-xl font-bold mb-3">Results-Focused</h3>
						<p class="text-muted-foreground">
							Every design decision is made with your goals in mind. I care about how your website performs, not just how it looks.
						</p>
					</CardContent>
				</Card>

				<Card class="why-card group h-full border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:shadow-xl rounded-2xl transition-all duration-500 ring-1 ring-border/30">
					<CardContent class="p-8">
						<div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary group-hover:text-inherit"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
						</div>
						<h3 class="text-xl font-bold mb-3">Fast Delivery</h3>
						<p class="text-muted-foreground">
							Most projects launch within 2-3 weeks. You get a quality website without the endless wait times.
						</p>
					</CardContent>
				</Card>

				<Card class="why-card group h-full border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:shadow-xl rounded-2xl transition-all duration-500 ring-1 ring-border/30">
					<CardContent class="p-8">
						<div class="w-14 h-14 rounded-2xl bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600 dark:text-green-400 group-hover:text-inherit"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
						</div>
						<h3 class="text-xl font-bold mb-3">Full Ownership</h3>
						<p class="text-muted-foreground">
							Your website, your code, your content. No lock-ins or hidden fees—you own everything when we're done.
						</p>
					</CardContent>
				</Card>
			</div>

			<div class="mt-12 text-center">
				<Button href="/about" variant="outline" class="group px-8 py-6 rounded-full text-base border-2 hover:bg-foreground/5 hover:border-foreground/20 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none transition-colors duration-150">
					Learn More About Me
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform duration-150 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
				</Button>
			</div>
		</div>
	</Container>
</Section>

<style>
	/* BIG BOLD GLOW EFFECTS - prominent presence */
	.hero-glow-main {
		background: radial-gradient(ellipse,
			hsl(0 85% 55% / 0.5) 0%,
			hsl(0 80% 50% / 0.35) 25%,
			hsl(0 75% 45% / 0.15) 50%,
			transparent 75%
		);
	}

	.hero-glow-blue {
		background: radial-gradient(ellipse,
			hsl(220 90% 60% / 0.4) 0%,
			hsl(220 85% 55% / 0.25) 30%,
			hsl(220 80% 50% / 0.1) 55%,
			transparent 75%
		);
	}

	.hero-glow-center {
		background: radial-gradient(ellipse,
			hsl(var(--primary) / 0.12) 0%,
			hsl(var(--primary) / 0.05) 40%,
			transparent 70%
		);
	}

	/* Respect reduced motion */
	@media (prefers-reduced-motion: reduce) {
		:global(*) {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}
</style>
