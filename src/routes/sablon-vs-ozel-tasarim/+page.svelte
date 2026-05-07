<script lang="ts">
	import ComparisonPage from '$lib/components/sections/ComparisonPage.svelte';
	import { getComparison } from '$lib/data/comparisons';

	const comparison = getComparison('sablon-vs-ozel-tasarim')!;
</script>

<ComparisonPage {comparison} />
