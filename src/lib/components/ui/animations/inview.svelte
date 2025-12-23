<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		threshold?: number;
		delay?: number;
		duration?: number;
		once?: boolean;
		animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade' | 'scale' | 'none';
		class?: string;
	}

	let {
		children,
		threshold = 0.1,
		delay = 0,
		duration = 500,
		once = true,
		animation = 'fade-up',
		class: className = '',
		...restProps
	}: Props = $props();

	let element: HTMLDivElement;
	// Start visible for SSR, then hide on mount for animation
	let mounted = $state(false);
	let isVisible = $state(true);

	const animationStyles = {
		'fade-up': {
			initial: 'opacity: 0; transform: translateY(24px);',
			visible: 'opacity: 1; transform: translateY(0);'
		},
		'fade-down': {
			initial: 'opacity: 0; transform: translateY(-24px);',
			visible: 'opacity: 1; transform: translateY(0);'
		},
		'fade-left': {
			initial: 'opacity: 0; transform: translateX(-24px);',
			visible: 'opacity: 1; transform: translateX(0);'
		},
		'fade-right': {
			initial: 'opacity: 0; transform: translateX(24px);',
			visible: 'opacity: 1; transform: translateX(0);'
		},
		fade: {
			initial: 'opacity: 0;',
			visible: 'opacity: 1;'
		},
		scale: {
			initial: 'opacity: 0; transform: scale(0.92);',
			visible: 'opacity: 1; transform: scale(1);'
		},
		none: {
			initial: '',
			visible: ''
		}
	};

	onMount(() => {
		mounted = true;
		// Reset to hidden state for animation
		isVisible = false;

		// Use requestAnimationFrame to ensure DOM is ready
		requestAnimationFrame(() => {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							isVisible = true;
							if (once) {
								observer.unobserve(element);
							}
						} else if (!once) {
							isVisible = false;
						}
					});
				},
				{ threshold, rootMargin: '50px' }
			);

			if (element) {
				observer.observe(element);
			}

			return () => observer.disconnect();
		});
	});

	// Show content by default on SSR, animate on client
	const currentStyle = $derived(() => {
		if (!mounted) {
			// SSR: show content
			return animationStyles[animation].visible;
		}
		return isVisible ? animationStyles[animation].visible : animationStyles[animation].initial;
	});
</script>

<div
	bind:this={element}
	class={className}
	style="{currentStyle()} transition: opacity {duration}ms ease-out, transform {duration}ms ease-out; transition-delay: {delay}ms;"
	{...restProps}
>
	{@render children()}
</div>
