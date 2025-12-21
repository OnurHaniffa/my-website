<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	type Props = WithElementRef<HTMLAttributes<HTMLElement>> & {
		/** Padding size */
		padding?: 'default' | 'sm' | 'lg' | 'none';
		/** Background variant */
		background?: 'default' | 'muted' | 'card';
		/** HTML element to render */
		as?: 'section' | 'div' | 'article';
	};

	let {
		ref = $bindable(null),
		class: className,
		padding = 'default',
		background = 'default',
		as = 'section',
		children,
		...restProps
	}: Props = $props();

	const paddingClasses = {
		none: '',
		sm: 'py-12 md:py-16',       // 48px / 64px
		default: 'py-16 md:py-24',  // 64px / 96px
		lg: 'py-20 md:py-32'        // 80px / 128px
	};

	const backgroundClasses = {
		default: 'bg-background',
		muted: 'bg-muted',
		card: 'bg-card'
	};
</script>

<svelte:element
	this={as}
	bind:this={ref}
	data-slot="section"
	class={cn(
		paddingClasses[padding],
		backgroundClasses[background],
		className
	)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
