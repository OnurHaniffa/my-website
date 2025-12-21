<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		/** Max width variant */
		size?: 'default' | 'content' | 'full';
	};

	let {
		ref = $bindable(null),
		class: className,
		size = 'default',
		children,
		...restProps
	}: Props = $props();

	const sizeClasses = {
		default: 'max-w-[75rem]',    // 1200px - page container
		content: 'max-w-[42.5rem]',  // 680px - reading width
		full: 'max-w-none'           // full width
	};
</script>

<div
	bind:this={ref}
	data-slot="container"
	class={cn(
		'mx-auto w-full px-4 sm:px-6 lg:px-8',
		sizeClasses[size],
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
