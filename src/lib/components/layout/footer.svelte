<script lang="ts">
	import { Container } from '$lib/components/layout';
	import { Button } from '$lib/components/ui/button';

	const currentYear = new Date().getFullYear();
</script>

<!-- Curved top edge - wave separates page from dark footer -->
<div class="bg-background">
	<svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto" preserveAspectRatio="none">
		<path d="M0 60V30C360 60 720 0 1080 30C1260 45 1380 60 1440 60V60H0Z" style="fill: oklch(0.15 0.01 260);"/>
	</svg>
</div>

<footer class="relative overflow-hidden -mt-1" style="background: oklch(0.15 0.01 260);">
	<!-- Ambient background elements -->
	<div class="absolute inset-0 pointer-events-none overflow-hidden">
		<!-- Large decorative text -->
		<div class="absolute -right-10 top-10 select-none opacity-[0.02]">
			<span class="text-[20rem] md:text-[28rem] font-black leading-none tracking-tighter text-white">Hi</span>
		</div>

		<!-- Gradient orbs -->
		<div class="absolute top-10 left-[5%] w-[400px] h-[400px] bg-primary/[0.08] rounded-full blur-[120px]"></div>
		<div class="absolute bottom-20 right-[10%] w-[300px] h-[300px] bg-blue-500/[0.06] rounded-full blur-[100px]"></div>
		<div class="absolute top-[40%] right-[40%] w-[200px] h-[200px] bg-accent/[0.04] rounded-full blur-[80px]"></div>

		<!-- Floating particles - scattered throughout -->
		<div class="absolute top-[10%] left-[8%] w-1.5 h-1.5 bg-red-500/30 rounded-full animate-float"></div>
		<div class="absolute top-[15%] right-[12%] w-2 h-2 bg-cyan-400/25 rounded-full animate-float animation-delay-500"></div>
		<div class="absolute top-[20%] left-[15%] w-2 h-2 bg-primary/20 rounded-full animate-float animation-delay-1000"></div>
		<div class="absolute top-[25%] right-[25%] w-1 h-1 bg-yellow-400/25 rounded-full animate-float animation-delay-1500"></div>
		<div class="absolute top-[30%] left-[40%] w-2.5 h-2.5 bg-rose-500/20 rounded-full animate-float animation-delay-2000"></div>
		<div class="absolute top-[35%] right-[20%] w-3 h-3 bg-blue-400/20 rounded-full animate-float animation-delay-2500"></div>
		<div class="absolute top-[40%] left-[55%] w-1.5 h-1.5 bg-emerald-400/25 rounded-full animate-float animation-delay-3000"></div>
		<div class="absolute top-[45%] right-[45%] w-2 h-2 bg-white/15 rounded-full animate-float animation-delay-500"></div>
		<div class="absolute top-[50%] left-[25%] w-1 h-1 bg-orange-400/25 rounded-full animate-float animation-delay-1000"></div>
		<div class="absolute top-[55%] right-[30%] w-2 h-2 bg-primary/20 rounded-full animate-float animation-delay-1500"></div>
		<div class="absolute top-[60%] left-[70%] w-2.5 h-2.5 bg-red-400/20 rounded-full animate-float animation-delay-2000"></div>
		<div class="absolute top-[65%] right-[60%] w-1.5 h-1.5 bg-violet-400/20 rounded-full animate-float animation-delay-2500"></div>
		<div class="absolute top-[70%] left-[35%] w-2 h-2 bg-cyan-300/20 rounded-full animate-float animation-delay-3000"></div>
		<div class="absolute top-[75%] right-[15%] w-1 h-1 bg-pink-400/25 rounded-full animate-float animation-delay-500"></div>
		<div class="absolute top-[80%] left-[50%] w-3 h-3 bg-amber-400/15 rounded-full animate-float animation-delay-1000"></div>
		<div class="absolute top-[85%] right-[35%] w-1.5 h-1.5 bg-red-500/20 rounded-full animate-float animation-delay-1500"></div>
		<div class="absolute bottom-[15%] left-[10%] w-2 h-2 bg-teal-400/20 rounded-full animate-float animation-delay-2000"></div>
		<div class="absolute bottom-[10%] right-[8%] w-2.5 h-2.5 bg-rose-400/20 rounded-full animate-float animation-delay-2500"></div>

		<!-- Geometric shapes -->
		<div class="absolute top-[18%] left-[80%] w-6 h-6 border border-red-400/[0.08] rotate-45 animate-spin-slow"></div>
		<div class="absolute top-[25%] right-[35%] w-8 h-8 border border-cyan-400/[0.06] rotate-45 animate-spin-slow"></div>
		<div class="absolute top-[45%] left-[12%] w-4 h-4 border border-emerald-400/[0.1] rounded-full animate-pulse"></div>
		<div class="absolute bottom-[35%] left-[20%] w-5 h-5 border border-violet-400/[0.08] rounded-full animate-pulse"></div>
		<div class="absolute top-[60%] left-[60%] w-6 h-6 border border-orange-400/[0.06] rounded-lg rotate-12 animate-float animation-delay-2000"></div>
		<div class="absolute bottom-[20%] right-[25%] w-7 h-7 border border-pink-400/[0.07] rotate-12 animate-spin-slow"></div>
		<div class="absolute top-[38%] right-[8%] w-5 h-5 border border-yellow-400/[0.08] rounded-lg rotate-45 animate-float animation-delay-1000"></div>
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
					<a href="mailto:hello@ohaniffa.com" class="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all text-base">
						hello@ohaniffa.com
					</a>
				</div>
			</div>

			<!-- Footer grid -->
			<div class="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6 py-12 border-t border-white/10">
				<!-- Brand - takes more space -->
				<div class="col-span-2 md:col-span-5 lg:col-span-4">
					<a href="/" class="inline-flex items-center gap-3 mb-5 group">
						<div class="w-11 h-11 rounded-xl bg-primary flex items-center justify-center transition-all group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20">
							<span class="text-primary-foreground font-black text-xl italic">O</span>
						</div>
						<div>
							<span class="font-black text-xl block leading-none text-white">Haniffa</span>
							<span class="text-[10px] text-gray-400 tracking-[0.2em] uppercase">Design Studio</span>
						</div>
					</a>
					<p class="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
						Crafting beautiful websites that turn curious visitors into loyal customers.
					</p>
					<div class="flex items-center gap-4">
						<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all" aria-label="LinkedIn">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
						</a>
						<a href="mailto:hello@ohaniffa.com" class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all" aria-label="Email">
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
						<a href="mailto:hello@ohaniffa.com" class="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">hello@ohaniffa.com</a>
						<p class="text-sm text-gray-500 mt-2">Based in Europe</p>
						<p class="text-sm text-gray-500">Replies within 24h</p>
					</div>
				</div>
			</div>

			<!-- Bottom bar -->
			<div class="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
				<p class="text-sm text-gray-500">
					&copy; {currentYear} Haniffa Design Studio. All rights reserved.
				</p>
				<p class="text-sm text-gray-500">
					Designed with passion
				</p>
			</div>
		</div>
	</Container>
</footer>
