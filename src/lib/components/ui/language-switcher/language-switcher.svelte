<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getLocale, type Locale } from '$lib/i18n/index.svelte';

	const languages: { code: Locale; flag: string; label: string }[] = [
		{ code: 'en', flag: '\ud83c\uddec\ud83c\udde7', label: 'EN' },
		{ code: 'tr', flag: '\ud83c\uddf9\ud83c\uddf7', label: 'TR' }
	];

	let open = $state(false);
	let dropdownRef: HTMLDivElement;

	const current = $derived(languages.find((l) => l.code === getLocale()) ?? languages[0]);

	function select(code: Locale) {
		open = false;
		const currentPath = $page.url.pathname;

		if (code === 'tr') {
			// Navigate to /tr/... version
			const cleanPath = currentPath.replace(/^\/tr/, '') || '/';
			const newPath = `/tr${cleanPath === '/' ? '' : cleanPath}`;
			goto(newPath);
		} else {
			// Navigate to English version (strip /tr prefix)
			const cleanPath = currentPath.replace(/^\/tr/, '') || '/';
			goto(cleanPath);
		}
	}

	function handleClickOutside(e: MouseEvent) {
		if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
			open = false;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			open = false;
		}
	}

	$effect(() => {
		if (open) {
			document.addEventListener('click', handleClickOutside);
			document.addEventListener('keydown', handleKeydown);
			return () => {
				document.removeEventListener('click', handleClickOutside);
				document.removeEventListener('keydown', handleKeydown);
			};
		}
	});
</script>

<div class="relative" bind:this={dropdownRef}>
	<button
		onclick={() => (open = !open)}
		class="inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-sm font-medium transition-all duration-200
			border border-border/50 bg-muted/50 hover:bg-muted hover:border-border
			focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
		aria-label="Change language"
		aria-expanded={open}
		aria-haspopup="listbox"
	>
		<span class="text-base leading-none">{current.flag}</span>
		<span class="text-xs font-semibold tracking-wide">{current.label}</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="12"
			height="12"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="text-muted-foreground transition-transform duration-200 {open ? 'rotate-180' : ''}"
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	</button>

	{#if open}
		<div
			class="absolute top-full right-0 mt-2 min-w-[120px] rounded-xl border border-border/50 bg-popover shadow-lg shadow-black/10 overflow-hidden z-50"
			role="listbox"
			aria-label="Select language"
		>
			{#each languages as lang}
				<button
					onclick={() => select(lang.code)}
					role="option"
					aria-selected={lang.code === getLocale()}
					class="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-muted/80
						{lang.code === getLocale()
						? 'bg-primary/10 text-primary font-semibold'
						: 'text-foreground'}"
				>
					<span class="text-base leading-none">{lang.flag}</span>
					<span>{lang.label}</span>
					{#if lang.code === getLocale()}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="ml-auto text-primary"
						>
							<path d="M20 6 9 17l-5-5" />
						</svg>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>
