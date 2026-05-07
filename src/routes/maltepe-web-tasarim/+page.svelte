<script lang="ts">
	import DistrictPage from '$lib/components/sections/DistrictPage.svelte';
	import { getDistrict } from '$lib/data/districts';

	const district = getDistrict('maltepe')!;
</script>

<DistrictPage {district} />
