<script lang="ts">
	import DistrictPage from '$lib/components/sections/DistrictPage.svelte';
	import { getDistrict } from '$lib/data/districts';

	const district = getDistrict('pendik')!;
</script>

<DistrictPage {district} />
