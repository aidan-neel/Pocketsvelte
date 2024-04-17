<script lang="ts">
	import { getPocketbaseContext } from "$lib/stores/Context.js"
	import type PocketBase from 'pocketbase';
	import { userStore } from '$lib/stores/UserStore.js';

	const client: PocketBase = getPocketbaseContext(); 

	const user = userStore(client);
</script>

{#if $user !== undefined && $user !== null}
	{JSON.stringify($user)}
{:else}
	<p>Loading...</p>
{/if}