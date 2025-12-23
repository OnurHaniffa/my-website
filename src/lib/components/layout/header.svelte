<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import {
		Sheet,
		SheetContent,
		SheetHeader,
		SheetTitle,
		SheetTrigger
	} from '$lib/components/ui/sheet';
	import { Container } from '$lib/components/layout';
	import { browser } from '$app/environment';

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/work', label: 'Work' },
		{ href: '/services', label: 'Services' },
		{ href: '/about', label: 'About' }
	];

	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);

	$effect(() => {
		if (browser) {
			const handleScroll = () => {
				scrolled = window.scrollY > 20;
			};
			handleScroll();
			window.addEventListener('scroll', handleScroll, { passive: true });
			return () => window.removeEventListener('scroll', handleScroll);
		}
	});

	function isActive(href: string, currentPath: string): boolean {
		if (href === '/') {
			return currentPath === '/';
		}
		return currentPath.startsWith(href);
	}
</script>

<!-- Premium accent line at top - hides on scroll -->
<div
	class="h-1 w-full bg-gradient-to-r from-primary via-primary/80 to-accent transition-all duration-300"
	class:opacity-0={scrolled}
	class:h-0={scrolled}
></div>

<header
	class="sticky top-0 z-50 w-full transition-all duration-300 {scrolled
		? 'bg-muted/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border/50'
		: 'bg-muted/80 backdrop-blur-md border-b border-transparent'}"
>
	<Container>
		<div class="flex items-center justify-between transition-all duration-300 {scrolled ? 'h-16' : 'h-20'}">
			<!-- Logo -->
			<a href="/" data-sveltekit-reload class="group flex items-center gap-3">
				<!-- Logo mark -->
				<div class="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/25">
					<span class="text-primary-foreground font-black text-xl italic">O</span>
					<div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
				</div>
				<!-- Logo text -->
				<div class="flex flex-col">
					<span class="font-black text-xl tracking-tight leading-none">Haniffa</span>
					<span class="text-[10px] text-muted-foreground tracking-[0.2em] uppercase font-medium">Design Studio</span>
				</div>
			</a>

			<!-- Desktop Navigation -->
			<nav class="hidden md:flex items-center gap-1">
				{#each navItems as item}
					<a
						href={item.href}
						class="relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 rounded-lg group
							{isActive(item.href, $page.url.pathname)
								? 'text-primary bg-primary/10'
								: 'text-muted-foreground hover:text-foreground hover:bg-muted'}"
					>
						<span class="relative z-10 uppercase">{item.label}</span>
						<!-- Active indicator dot -->
						{#if isActive(item.href, $page.url.pathname)}
							<span class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
						{/if}
					</a>
				{/each}
			</nav>

			<!-- Desktop CTA -->
			<div class="hidden md:flex items-center">
				<Button href="/contact" class="group relative overflow-hidden shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
					<span class="relative z-10">Let's Talk</span>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="relative z-10 ml-1 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
				</Button>
			</div>

			<!-- Mobile Menu Button -->
			<Sheet bind:open={mobileMenuOpen}>
				<SheetTrigger class="md:hidden">
					{#snippet child({ props })}
						<button
							{...props}
							class="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/10 hover:text-primary h-10 w-10"
							aria-label="Toggle menu"
						>
							<div class="relative w-5 h-4 flex flex-col justify-between">
								<!-- Animated hamburger lines - equally spaced -->
								<span
									class="block h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out origin-center
										{mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}"
								></span>
								<span
									class="block h-0.5 w-5 bg-current transition-all duration-300 ease-in-out
										{mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}"
								></span>
								<span
									class="block h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out origin-center
										{mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}"
								></span>
							</div>
						</button>
					{/snippet}
				</SheetTrigger>
				<SheetContent side="right" class="w-[300px] sm:w-[400px] border-l-primary/20">
					<SheetHeader>
						<SheetTitle class="text-left flex items-center gap-3">
							<div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
								<span class="text-primary-foreground font-bold text-sm">O</span>
							</div>
							<span>Haniffa</span>
						</SheetTitle>
					</SheetHeader>
					<nav class="flex flex-col gap-1 mt-8">
						{#each navItems as item}
							<a
								href={item.href}
								onclick={() => (mobileMenuOpen = false)}
								class="px-4 py-4 text-lg font-semibold tracking-wide transition-all duration-300 rounded-xl
									{isActive(item.href, $page.url.pathname)
										? 'text-primary bg-primary/5'
										: 'text-muted-foreground hover:text-foreground hover:bg-muted hover:translate-x-1'}"
							>
								<span class="uppercase">{item.label}</span>
							</a>
						{/each}
						<div class="pt-6 mt-6 border-t">
							<Button class="w-full h-12 text-base" href="/contact" onclick={() => (mobileMenuOpen = false)}>
								Let's Talk
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
							</Button>
						</div>
					</nav>
				</SheetContent>
			</Sheet>
		</div>
	</Container>
</header>
