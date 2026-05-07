<script lang="ts">
	import ComparisonPage from '$lib/components/sections/ComparisonPage.svelte';
	import { getComparison } from '$lib/data/comparisons';

	const comparison = getComparison('ucuz-vs-kaliteli-web-sitesi')!;
</script>

<ComparisonPage {comparison} />
