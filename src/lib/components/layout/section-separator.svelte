<script lang="ts">
	import { cn } from '$lib/utils.js';

	type Props = {
		/** Separator variant */
		variant?: 'line' | 'glow' | 'wave';
		/** Additional classes */
		class?: string;
	};

	let { variant = 'glow', class: className }: Props = $props();
</script>

{#if variant === 'line'}
	<!-- Simple gradient line -->
	<div
		class={cn(
			'w-full h-px bg-gradient-to-r from-transparent via-border to-transparent dark:via-primary/30',
			className
		)}
	></div>
{:else if variant === 'glow'}
	<!-- Glow separator with gradient halo -->
	<div class={cn('relative w-full', className)}>
		<!-- Gradient glow above line -->
		<div class="absolute inset-x-0 -top-12 h-24 pointer-events-none">
			<div class="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-primary/[0.05] dark:from-transparent dark:via-primary/[0.06] dark:to-primary/[0.12]"></div>
		</div>
		<!-- Accent line -->
		<div class="relative h-px bg-gradient-to-r from-transparent via-border to-transparent dark:via-primary/40"></div>
	</div>
{:else if variant === 'wave'}
	<!-- Wave SVG separator -->
	<div class={cn('relative w-full overflow-hidden', className)}>
		<!-- Gradient glow -->
		<div class="absolute inset-x-0 bottom-0 h-16 pointer-events-none">
			<div class="absolute inset-0 bg-gradient-to-b from-transparent to-primary/[0.08] dark:to-primary/[0.15]"></div>
		</div>
		<!-- Wave SVG -->
		<svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="relative w-full h-auto" preserveAspectRatio="none">
			<path
				d="M0 40V20C360 35 720 5 1080 20C1260 27.5 1380 35 1440 40V40H0Z"
				class="fill-muted dark:fill-surface-1"
			/>
			<path
				d="M0 20C360 35 720 5 1080 20C1260 27.5 1380 35 1440 40"
				class="stroke-transparent dark:stroke-primary/30"
				stroke-width="1"
				fill="none"
			/>
		</svg>
	</div>
{/if}
