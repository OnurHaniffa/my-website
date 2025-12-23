<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const steps = [
		{ id: '1', title: 'Discovery', desc: 'We talk about your goals, audience, and vision to establish direction.', color: '#9333ea' },
		{ id: '2', title: 'Design', desc: 'Mockups and iteration until every detail feels right.', color: '#22c55e' },
		{ id: '3', title: 'Develop', desc: 'Clean, performant code built with modern tech.', color: '#14b8a6' },
		{ id: '4', title: 'Launch', desc: 'Go live with confidence and ongoing support.', color: '#3b82f6' }
	];

	let ref: HTMLElement | null = $state(null);
	let visible = $state(false);

	onMount(() => {
		if (browser) {
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
				visible = true;
				return;
			}
			const obs = new IntersectionObserver(([e]) => {
				if (e?.isIntersecting) { visible = true; obs.disconnect(); }
			}, { threshold: 0.2 });
			if (ref) obs.observe(ref);
			return () => obs.disconnect();
		}
	});
</script>

<section bind:this={ref} class="py-20 md:py-28 bg-slate-100" class:visible aria-labelledby="proc-h">
	<div class="max-w-5xl mx-auto px-4">
		<div class="text-center mb-14">
			<span class="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">The Process</span>
			<h2 id="proc-h" class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
				How we <span class="text-primary">work</span> together
			</h2>
			<p class="text-slate-500 text-lg max-w-xl mx-auto">A simple, collaborative approach that keeps you in the loop.</p>
		</div>

		<!-- Pipe Diagram -->
		<div class="hidden sm:block">
			<svg viewBox="0 0 800 220" class="w-full max-w-3xl mx-auto">
				<defs>
					<linearGradient id="pipeG" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stop-color="#1a1a2e"/>
						<stop offset="50%" stop-color="#2d2d44"/>
						<stop offset="100%" stop-color="#1a1a2e"/>
					</linearGradient>
					<radialGradient id="capG"><stop offset="0%" stop-color="#3d3d5c"/><stop offset="100%" stop-color="#1a1a2e"/></radialGradient>

					{#each steps as s, i}
						<linearGradient id="b{i}" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stop-color="#111" stop-opacity="0.6"/>
							<stop offset="15%" stop-color={s.color}/>
							<stop offset="50%" stop-color={s.color}/>
							<stop offset="85%" stop-color={s.color}/>
							<stop offset="100%" stop-color="#111" stop-opacity="0.6"/>
						</linearGradient>
						<linearGradient id="bt{i}" x1="0%" y1="100%" x2="0%" y2="0%">
							<stop offset="0%" stop-color="transparent"/>
							<stop offset="100%" stop-color="rgba(255,255,255,0.35)"/>
						</linearGradient>
						<linearGradient id="bb{i}" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stop-color="transparent"/>
							<stop offset="100%" stop-color="rgba(0,0,0,0.4)"/>
						</linearGradient>
					{/each}
				</defs>

				<!-- Pipe -->
				<rect x="20" y="85" width="760" height="50" rx="25" fill="url(#pipeG)"/>
				<ellipse cx="20" cy="110" rx="10" ry="25" fill="url(#capG)"/>
				<ellipse cx="780" cy="110" rx="10" ry="25" fill="url(#capG)"/>
				<rect x="20" y="90" width="760" height="12" rx="6" fill="rgba(255,255,255,0.03)"/>

				{#each steps as s, i}
					{@const x = 70 + i * 175}
					<g class="band" style="--d:{i}">
						<!-- 3D Band shape - curved ribbon wrapping around pipe -->
						<path
							d="M {x+10} 25
							   C {x-15} 25, {x-25} 60, {x-25} 110
							   C {x-25} 160, {x-15} 195, {x+10} 195
							   L {x+90} 195
							   C {x+115} 195, {x+125} 160, {x+125} 110
							   C {x+125} 60, {x+115} 25, {x+90} 25
							   Z"
							fill="url(#b{i})"
						/>

						<!-- Top highlight curve -->
						<path
							d="M {x+10} 25
							   C {x-15} 25, {x-25} 60, {x-25} 85
							   L {x+125} 85
							   C {x+125} 60, {x+115} 25, {x+90} 25
							   Z"
							fill="url(#bt{i})"
						/>

						<!-- Bottom shadow curve -->
						<path
							d="M {x-25} 135
							   C {x-25} 160, {x-15} 195, {x+10} 195
							   L {x+90} 195
							   C {x+115} 195, {x+125} 160, {x+125} 135
							   Z"
							fill="url(#bb{i})"
						/>

						<!-- Inner pipe shadow (hole where pipe goes through) -->
						<ellipse cx={x+50} cy="110" rx="35" ry="18" fill="rgba(0,0,0,0.35)"/>

						<!-- Text -->
						<text x={x+50} y="70" text-anchor="middle" fill="white" font-size="12" font-weight="800" letter-spacing="1">STEP {s.id}</text>
						<text x={x+50} y="150" text-anchor="middle" fill="rgba(255,255,255,0.85)" font-size="9" font-weight="500">
							<tspan x={x+50} dy="0">{s.desc.split(' ').slice(0,4).join(' ')}</tspan>
							<tspan x={x+50} dy="12">{s.desc.split(' ').slice(4,8).join(' ')}</tspan>
							<tspan x={x+50} dy="12">{s.desc.split(' ').slice(8).join(' ')}</tspan>
						</text>
					</g>
				{/each}
			</svg>
		</div>

		<!-- Mobile -->
		<div class="sm:hidden space-y-3">
			{#each steps as s, i}
				<div class="mcard rounded-xl p-4 text-white" style="--d:{i}; background:{s.color}">
					<span class="text-xs font-bold opacity-70">STEP {s.id}</span>
					<h3 class="font-bold mt-1">{s.title}</h3>
					<p class="text-sm opacity-80 mt-1">{s.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.band { opacity:0; transform:translateY(15px); transition:all .5s ease; transition-delay:calc(var(--d)*.12s) }
	.visible .band { opacity:1; transform:translateY(0) }
	.mcard { opacity:0; transform:translateX(-15px); transition:all .4s ease; transition-delay:calc(var(--d)*.1s) }
	.visible .mcard { opacity:1; transform:translateX(0) }
	@media(prefers-reduced-motion:reduce) { .band,.mcard { opacity:1!important; transform:none!important; transition:none!important } }
</style>
