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
	import { LanguageSwitcher } from '$lib/components/ui/language-switcher';
	import { browser } from '$app/environment';
	import { t } from '$lib/i18n/index.svelte';
	import type { DirectusHeaderSettings } from '$lib/data/directus';

	let { settings = null }: { settings?: DirectusHeaderSettings | null } = $props();

	const defaultNavItems = [
		{ href: '/', labelKey: 'nav.home' },
		{ href: '/work', labelKey: 'nav.work' },
		{ href: '/services', labelKey: 'nav.services' },
		{ href: '/about', labelKey: 'nav.about' }
	];

	const navItems = $derived(
		settings?.nav_items?.length
			? settings.nav_items
			: defaultNavItems.map((item) => ({ href: item.href, label: t(item.labelKey) }))
	);

	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);
	let isDark = $state(false);

	// Initialize theme from localStorage or system preference
	$effect(() => {
		if (browser) {
			const stored = localStorage.getItem('theme');
			if (stored) {
				isDark = stored === 'dark';
			} else {
				isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			}
			updateTheme();
		}
	});

	function updateTheme() {
		if (isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	function toggleTheme() {
		isDark = !isDark;
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
		updateTheme();
	}

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
			<a href="/" data-sveltekit-reload class="group flex items-center gap-3 transition-all duration-300 group-hover:opacity-80">
				<!-- Decorative line -->
				<div class="hidden sm:block w-8 h-[2px] bg-foreground/80"></div>
				<!-- Logo text -->
				<div class="flex flex-col items-center">
					<span class="text-lg sm:text-xl font-black tracking-[0.15em] uppercase">{settings?.logo_text ?? 'Onur Haniffa'}</span>
					<span class="text-[8px] sm:text-[9px] text-muted-foreground tracking-[0.3em] uppercase">{settings?.logo_subtitle ?? 'Est. 2025'}</span>
				</div>
				<!-- Decorative line -->
				<div class="hidden sm:block w-8 h-[2px] bg-foreground/80"></div>
			</a>

			<!-- Desktop Navigation -->
			<nav class="hidden md:flex items-center gap-1">
				{#each navItems as item}
					<a
						href={item.href}
						class="group relative px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 rounded-xl
							{isActive(item.href, $page.url.pathname)
								? 'text-primary bg-primary/10 shadow-sm'
								: 'text-muted-foreground hover:text-foreground hover:bg-muted/70'}"
					>
						<span class="relative z-10 uppercase transition-transform duration-300 group-hover:translate-x-0.5">{item.label}</span>
						<!-- Active indicator line -->
						{#if isActive(item.href, $page.url.pathname)}
							<span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"></span>
						{/if}
						<!-- Hover underline animation -->
						<span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary/50 rounded-full transition-all duration-300 group-hover:w-4 {isActive(item.href, $page.url.pathname) ? 'opacity-0' : 'opacity-100'}"></span>
					</a>
				{/each}
			</nav>

			<!-- Desktop CTA + Menu Button -->
			<div class="flex items-center gap-3">
				<!-- Language Switcher -->
				<LanguageSwitcher />

				<!-- Theme Toggle - Pill shaped with sliding indicator -->
				<button
					onclick={toggleTheme}
					class="theme-toggle group relative inline-flex items-center h-9 w-16 rounded-full p-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
						{isDark
							? 'bg-gradient-to-r from-indigo-950 to-slate-900 shadow-inner shadow-indigo-950/50'
							: 'bg-gradient-to-r from-amber-100 to-sky-100 shadow-inner shadow-amber-200/50'}"
					aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
				>
					<!-- Sliding circle indicator -->
					<span
						class="absolute h-7 w-7 rounded-full shadow-lg transition-all duration-500 ease-out flex items-center justify-center
							{isDark
								? 'translate-x-7 bg-gradient-to-br from-slate-700 to-slate-800 shadow-indigo-500/20'
								: 'translate-x-0 bg-gradient-to-br from-amber-300 to-orange-400 shadow-orange-400/40'}"
					>
						<!-- Sun rays (visible in light mode) -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="transition-all duration-300 {isDark ? 'opacity-0 scale-75' : 'opacity-100 scale-100 text-amber-700'}"
						>
							<circle cx="12" cy="12" r="5"/>
						</svg>
						<!-- Moon (visible in dark mode) -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="absolute transition-all duration-300 {isDark ? 'opacity-100 scale-100 text-indigo-200' : 'opacity-0 scale-75'}"
						>
							<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
						</svg>
					</span>
					<!-- Background decorations -->
					<span class="absolute left-2 transition-opacity duration-300 {isDark ? 'opacity-100' : 'opacity-0'}">
						<span class="block w-1 h-1 rounded-full bg-white/40"></span>
					</span>
					<span class="absolute left-3.5 top-2 transition-opacity duration-300 {isDark ? 'opacity-100' : 'opacity-0'}">
						<span class="block w-0.5 h-0.5 rounded-full bg-white/30"></span>
					</span>
					<span class="absolute right-2.5 bottom-2.5 transition-opacity duration-300 {isDark ? 'opacity-0' : 'opacity-100'}">
						<span class="block w-1.5 h-1.5 rounded-full bg-sky-400/60"></span>
					</span>
				</button>

				<Button href={settings?.cta_href ?? '/contact'} class="hidden md:inline-flex group relative overflow-hidden shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300">
					<span class="relative z-10">{settings?.cta_text ?? t('nav.lets_talk')}</span>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="relative z-10 ml-1 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
				</Button>

				<!-- Menu Button - mobile only -->
				<Sheet bind:open={mobileMenuOpen}>
					<SheetTrigger class="md:hidden">
					{#snippet child({ props })}
						<button
							{...props}
							class="group relative inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 h-11 w-11 bg-muted/50 border border-border/50 hover:border-primary/30 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10"
							aria-label="Toggle menu"
						>
							<div class="relative w-5 h-4 flex flex-col justify-between">
								<!-- Top line -->
								<span
									class="block h-0.5 bg-current transform transition-all duration-300 ease-out origin-center
										{mobileMenuOpen ? 'w-5 translate-y-[7px] rotate-45 bg-primary' : 'w-5 group-hover:w-4 group-hover:bg-primary'}"
								></span>
								<!-- Middle line -->
								<span
									class="block h-0.5 bg-current transition-all duration-300 ease-out
										{mobileMenuOpen ? 'w-5 opacity-0 scale-x-0' : 'w-3.5 opacity-100 scale-x-100 group-hover:w-5 group-hover:bg-primary'}"
								></span>
								<!-- Bottom line -->
								<span
									class="block h-0.5 bg-current transform transition-all duration-300 ease-out origin-center
										{mobileMenuOpen ? 'w-5 -translate-y-[7px] -rotate-45 bg-primary' : 'w-4 group-hover:w-5 group-hover:bg-primary'}"
								></span>
							</div>
						</button>
					{/snippet}
				</SheetTrigger>
				<SheetContent side="right" class="w-[320px] sm:w-[420px] border-l-0 overflow-hidden p-0 backdrop-blur-2xl">
					<!-- Full background with gradient -->
					<div class="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30"></div>

					<!-- Decorative elements -->
					<div class="absolute inset-0 overflow-hidden pointer-events-none">
						<!-- Large gradient orbs -->
						<div class="absolute -top-32 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
						<div class="absolute -bottom-40 -left-32 w-96 h-96 bg-accent/8 rounded-full blur-3xl"></div>

						<!-- Decorative lines -->
						<div class="absolute top-20 right-8 w-px h-32 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
						<div class="absolute bottom-40 left-8 w-px h-24 bg-gradient-to-b from-transparent via-accent/20 to-transparent"></div>

						<!-- Corner accent -->
						<div class="absolute top-0 right-0 w-32 h-32">
							<div class="absolute top-4 right-4 w-16 h-16 border border-primary/10 rounded-2xl rotate-12"></div>
							<div class="absolute top-8 right-8 w-12 h-12 border border-primary/5 rounded-xl rotate-12"></div>
						</div>

						<!-- Dotted pattern -->
						<div class="absolute inset-0 opacity-[0.015]" style="background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 20px 20px;"></div>
					</div>

					<!-- Content -->
					<div class="relative h-full flex flex-col p-6 pt-8">
						<!-- Header -->
						<div class="flex items-center justify-between mb-12">
							<div class="flex items-center gap-3">
								<div class="w-6 h-[2px] bg-foreground/80"></div>
								<div class="flex flex-col items-center">
									<span class="text-xl font-black tracking-[0.15em] uppercase">{settings?.logo_text ?? 'Onur Haniffa'}</span>
									<span class="text-[9px] text-muted-foreground tracking-[0.3em] uppercase">{settings?.logo_subtitle ?? 'Est. 2025'}</span>
								</div>
								<div class="w-6 h-[2px] bg-foreground/80"></div>
							</div>
						</div>

						<!-- Navigation -->
						<nav class="flex flex-col gap-2 flex-1">
							<p class="text-[10px] text-muted-foreground/60 uppercase tracking-[0.2em] mb-3 px-2">{t('nav.navigation')}</p>
							{#each navItems as item, i}
								<a
									href={item.href}
									onclick={() => (mobileMenuOpen = false)}
									class="group relative flex items-center gap-5 px-4 py-5 transition-all duration-300 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
										{isActive(item.href, $page.url.pathname)
											? 'text-foreground bg-primary/10 shadow-xl shadow-primary/10 scale-[1.02] ring-1 ring-primary/20'
											: 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}"
									style="animation: slideInNav 0.4s cubic-bezier(0.16, 1, 0.3, 1) {0.1 + i * 0.05}s both;"
								>
									<!-- Number indicator -->
									<span class="text-[11px] font-mono w-6 {isActive(item.href, $page.url.pathname) ? 'text-primary' : 'text-muted-foreground/40 group-hover:text-primary/60'} transition-colors">0{i + 1}</span>

									<!-- Vertical line -->
									<div class="w-px h-6 {isActive(item.href, $page.url.pathname) ? 'bg-primary/40' : 'bg-border/50 group-hover:bg-primary/30'} transition-colors"></div>

									<!-- Label -->
									<span class="text-lg font-bold tracking-tight transition-all duration-300 group-hover:translate-x-1">{item.label}</span>

									<!-- Active indicator -->
									{#if isActive(item.href, $page.url.pathname)}
										<div class="ml-auto w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50"></div>
									{:else}
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-auto opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-40 group-hover:translate-x-0"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
									{/if}
								</a>
							{/each}
						</nav>

						<!-- CTA Section - Fixed at bottom -->
						<div class="pt-8 mt-auto border-t border-border/30">
							<!-- Language + Theme row -->
							<div class="flex items-center justify-between px-2 mb-6">
								<span class="text-[10px] text-muted-foreground/60 uppercase tracking-[0.2em]">{t('nav.appearance')}</span>
								<div class="flex items-center gap-3">
									<LanguageSwitcher />
									<button
										onclick={toggleTheme}
										class="relative inline-flex items-center h-10 w-20 rounded-full p-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
											{isDark
												? 'bg-gradient-to-r from-indigo-950 to-slate-900'
												: 'bg-gradient-to-r from-amber-100 to-sky-100'}"
										aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
									>
										<!-- Sliding indicator -->
										<span
											class="absolute h-8 w-8 rounded-full shadow-lg transition-all duration-500 ease-out flex items-center justify-center
												{isDark
													? 'translate-x-10 bg-gradient-to-br from-slate-700 to-slate-800'
													: 'translate-x-0 bg-gradient-to-br from-amber-300 to-orange-400'}"
										>
											<!-- Sun -->
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="currentColor"
												class="transition-all duration-300 {isDark ? 'opacity-0 scale-75' : 'opacity-100 scale-100 text-amber-700'}"
											>
												<circle cx="12" cy="12" r="5"/>
											</svg>
											<!-- Moon -->
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="currentColor"
												class="absolute transition-all duration-300 {isDark ? 'opacity-100 scale-100 text-indigo-200' : 'opacity-0 scale-75'}"
											>
												<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
											</svg>
										</span>
										<!-- Stars for dark mode -->
										<span class="absolute left-2.5 top-2 transition-opacity duration-300 {isDark ? 'opacity-100' : 'opacity-0'}">
											<span class="block w-1 h-1 rounded-full bg-white/50"></span>
										</span>
										<span class="absolute left-4 bottom-2.5 transition-opacity duration-300 {isDark ? 'opacity-100' : 'opacity-0'}">
											<span class="block w-0.5 h-0.5 rounded-full bg-white/40"></span>
										</span>
										<!-- Cloud for light mode -->
										<span class="absolute right-3 bottom-2 transition-opacity duration-300 {isDark ? 'opacity-0' : 'opacity-100'}">
											<span class="block w-2 h-2 rounded-full bg-sky-300/70"></span>
										</span>
									</button>
								</div>
							</div>

							<p class="text-[10px] text-muted-foreground/60 uppercase tracking-[0.2em] mb-3 px-2">{t('nav.ready_to_start')}</p>
							<Button class="w-full h-14 text-base font-semibold rounded-2xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300" href={settings?.cta_href ?? '/contact'} onclick={() => (mobileMenuOpen = false)}>
								{settings?.cta_text ?? t('nav.lets_talk')}
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
							</Button>
							<a href="mailto:contact@onurhaniffa.com" class="flex items-center justify-center gap-2 mt-4 px-4 py-3 text-[13px] text-muted-foreground hover:text-primary bg-muted/30 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:bg-muted/50">
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
								contact@onurhaniffa.com
							</a>
						</div>
					</div>
				</SheetContent>
				</Sheet>
			</div>
		</div>
	</Container>
</header>

<style>
	@keyframes slideInNav {
		from {
			opacity: 0;
			transform: translateX(-12px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	/* Respect reduced motion preference */
	@media (prefers-reduced-motion: reduce) {
		:global(a[style*="animation"]) {
			animation: none !important;
			opacity: 1 !important;
			transform: none !important;
		}
	}
</style>
