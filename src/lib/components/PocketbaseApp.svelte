<script lang="ts">
	import type PocketBase from 'pocketbase';
	import { setPocketbaseContext } from "$lib/stores/Context.js"

	export let client: PocketBase;

	setPocketbaseContext(client);
</script>

<slot
client={client}
/>