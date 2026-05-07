<script lang="ts">
	import ComparisonPage from '$lib/components/sections/ComparisonPage.svelte';
	import { getComparison } from '$lib/data/comparisons';

	const comparison = getComparison('yurtdisi-vs-yerli-web-tasarimci')!;
</script>

<ComparisonPage {comparison} />
