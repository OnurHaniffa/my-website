<script lang="ts">
	import { Container } from '$lib/components/layout';
	import { Button } from '$lib/components/ui/button';

	const currentYear = new Date().getFullYear();
</script>

<!-- Curved top edge - wave separates page from dark footer -->
<div class="relative">
	<!-- Gradient glow above wave - creates visual separation especially in dark mode -->
	<div class="absolute inset-x-0 bottom-0 h-56 pointer-events-none">
		<!-- Primary color glow - enhanced for dark mode -->
		<div class="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-primary/[0.06] dark:from-transparent dark:via-primary/[0.10] dark:to-primary/[0.18]"></div>
		<!-- Horizontal accent line - brighter in dark mode -->
		<div class="absolute bottom-24 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent dark:via-primary/50"></div>
	</div>

	<!-- Wave SVG -->
	<svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="relative w-full h-auto" preserveAspectRatio="none">
		<!-- Wave fill - use surface color for better integration -->
		<path d="M0 80V40C360 70 720 10 1080 40C1260 55 1380 70 1440 80V80H0Z" class="fill-[oklch(0.15_0.01_260)] dark:fill-[oklch(0.11_0.025_250)]"/>
		<!-- Highlight stroke along wave crest - more prominent in dark mode -->
		<path d="M0 40C360 70 720 10 1080 40C1260 55 1380 70 1440 80" class="stroke-border/30 dark:stroke-primary/50" stroke-width="1.5" fill="none"/>
	</svg>
</div>

<footer class="relative overflow-hidden -mt-1" style="background: oklch(0.15 0.01 260);">
	<!-- Ambient background elements - simplified for performance -->
	<div class="absolute inset-0 pointer-events-none overflow-hidden">
		<!-- Large decorative text -->
		<div class="absolute -right-10 top-10 select-none opacity-[0.02]">
			<span class="text-[20rem] md:text-[28rem] font-black leading-none tracking-tighter text-white">Hi</span>
		</div>

		<!-- Minimal decorative elements - static for performance -->
		<div class="absolute top-[20%] right-[15%] w-2 h-2 bg-cyan-400/20 rounded-full"></div>
		<div class="absolute top-[60%] left-[10%] w-2 h-2 bg-rose-500/15 rounded-full"></div>
		<div class="absolute bottom-[30%] right-[20%] w-1.5 h-1.5 bg-primary/20 rounded-full"></div>
	</div>

	<Container class="relative">
		<div class="py-16 md:py-24">
			<!-- Main CTA Section -->
			<div class="text-center mb-16 md:mb-20">
				<h2 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-white">
					Ready to <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">stand out</span> online?
				</h2>
				<p class="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
					Let's talk about your project. No pressure, no sales pitch—just a friendly conversation to see if we're a good fit.
				</p>
				<div class="flex flex-wrap justify-center gap-4">
					<Button href="/contact" variant="secondary" size="lg" class="group rounded-full px-10 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
						Start a project
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
					</Button>
					<a href="mailto:contact@onurhaniffa.com" class="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all text-base">
						contact@onurhaniffa.com
					</a>
				</div>
			</div>

			<!-- Footer grid -->
			<div class="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6 py-12 border-t border-white/10">
				<!-- Brand - takes more space -->
				<div class="col-span-2 md:col-span-5 lg:col-span-4">
					<a href="/" class="inline-flex items-center gap-3 mb-5 group transition-all group-hover:opacity-80">
						<div class="w-6 h-[2px] bg-white/80"></div>
						<div class="flex flex-col items-center">
							<span class="text-xl font-black tracking-[0.15em] uppercase text-white">Onur Haniffa</span>
							<span class="text-[9px] text-gray-400 tracking-[0.3em] uppercase">Est. 2025</span>
						</div>
						<div class="w-6 h-[2px] bg-white/80"></div>
					</a>
					<p class="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
						Crafting beautiful websites that turn curious visitors into loyal customers.
					</p>
					<div class="flex items-center gap-4">
						<a href="https://www.linkedin.com/in/onurhaniffa/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all" aria-label="LinkedIn">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
						</a>
						<a href="mailto:contact@onurhaniffa.com" class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all" aria-label="Email">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
						</a>
					</div>
				</div>

				<!-- Spacer on large screens -->
				<div class="hidden lg:block lg:col-span-2"></div>

				<!-- Pages -->
				<div class="col-span-1 md:col-span-2">
					<h4 class="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-5">Explore</h4>
					<nav class="flex flex-col gap-3">
						<a href="/" class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">Home</a>
						<a href="/work" class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">Work</a>
						<a href="/services" class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">Services</a>
						<a href="/about" class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">About</a>
					</nav>
				</div>

				<!-- Contact -->
				<div class="col-span-1 md:col-span-3 lg:col-span-2">
					<h4 class="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-5">Contact</h4>
					<div class="flex flex-col gap-3">
						<a href="/contact" class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">Get in touch</a>
						<a href="mailto:contact@onurhaniffa.com" class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">contact@onurhaniffa.com</a>
						<p class="text-sm text-gray-500 mt-2">Based in Europe</p>
						<p class="text-sm text-gray-500">Replies within 24h</p>
					</div>
				</div>
			</div>

			<!-- Bottom bar -->
			<div class="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
				<p class="text-sm text-gray-500">
					&copy; {currentYear} Onur Haniffa. All rights reserved.
				</p>
				<p class="text-sm text-gray-500">
					Designed with passion
				</p>
			</div>
		</div>
	</Container>
</footer>
