<script lang="ts">
	import { onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		value: number;
		duration?: number;
		delay?: number;
		suffix?: string;
		prefix?: string;
		class?: string;
	}

	let {
		value,
		duration = 2000,
		delay = 0,
		suffix = '',
		prefix = '',
		class: className = '',
		...restProps
	}: Props = $props();

	let element: HTMLSpanElement;
	// Start with the final value for SSR to avoid flash-of-zero
	let displayValue = $state(value);
	let targetValue = $derived(value);
	let hasAnimated = $state(false);
	let mounted = $state(false);

	function easeOutCubic(t: number): number {
		return 1 - Math.pow(1 - t, 3);
	}

	function animateCounter() {
		if (hasAnimated) return;
		hasAnimated = true;

		const startTime = performance.now();
		const startValue = 0;
		const endValue = targetValue;

		function update(currentTime: number) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const easedProgress = easeOutCubic(progress);

			displayValue = Math.round(startValue + (endValue - startValue) * easedProgress);

			if (progress < 1) {
				requestAnimationFrame(update);
			} else {
				displayValue = endValue;
			}
		}

		requestAnimationFrame(update);
	}

	onMount(() => {
		mounted = true;
		// Reset to 0 for animation on client
		displayValue = 0;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasAnimated) {
						setTimeout(() => {
							animateCounter();
						}, delay);
						observer.unobserve(element);
					}
				});
			},
			{ threshold: 0.3, rootMargin: '50px' }
		);

		if (element) {
			observer.observe(element);
		}

		return () => observer.disconnect();
	});
</script>

<span bind:this={element} class={className} {...restProps}>
	{prefix}{displayValue}{suffix}
</span>
