<script lang="ts">
	import ComparisonPage from '$lib/components/sections/ComparisonPage.svelte';
	import { getComparison } from '$lib/data/comparisons';

	const comparison = getComparison('wix-vs-ozel-web-sitesi')!;
</script>

<ComparisonPage {comparison} />
