<script lang="ts">
	import DistrictPage from '$lib/components/sections/DistrictPage.svelte';
	import { getDistrict } from '$lib/data/districts';

	const district = getDistrict('kartal')!;
</script>

<DistrictPage {district} />
