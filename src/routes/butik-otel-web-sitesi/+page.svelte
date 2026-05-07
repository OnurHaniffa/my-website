<script lang="ts">
	import IndustryPage from '$lib/components/sections/IndustryPage.svelte';
	import { getIndustry } from '$lib/data/industries';

	const industry = getIndustry('butik-otel')!;
</script>

<IndustryPage {industry} />
