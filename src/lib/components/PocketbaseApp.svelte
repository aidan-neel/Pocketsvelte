<script lang="ts">
	import type PocketBase from 'pocketbase';
	import { setPocketbaseContext } from "$lib/stores/Context.js"

	type $$Props = {
		PocketbaseClient: PocketBase
	}

	export let PocketbaseClient: $$Props["PocketbaseClient"];

	if (PocketbaseClient) {
		setPocketbaseContext(PocketbaseClient);
	} else {
		console.error("Pocketbase client not found");
	}
</script>

<slot
client={PocketbaseClient}
/>