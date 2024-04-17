<script lang="ts">
    import type { Writable } from "svelte/store";
    import { getPocketbaseContext } from "$lib/stores/Context.js";
    import type PocketBase from 'pocketbase';
    import { userStore, type UserRecordStore, type DefaultAuthModel } from '$lib/stores/UserStore.js';

	export let client: PocketBase = undefined;
    const ctx: PocketBase = getPocketbaseContext();

    if (!ctx && !client) {
        console.error("Pocketbase client not found");
    }

	client = ctx;

	type T = $$Generic;

    export let type: T | undefined = undefined;

    type ExtendedRecord<T> = T & DefaultAuthModel
    let data: UserRecordStore<ExtendedRecord<typeof type>> = userStore<ExtendedRecord<typeof type>>(client);

	/**
	 * Refresh the user data from the server
	 */
	function refresh() {
		data = userStore<ExtendedRecord<typeof type>>(client);
		console.log(data);
	}

    interface $$Slots {
        default: { user: ExtendedRecord<typeof type>, refresh: () => void };
        "signed-out": {};
    }
</script>

{#key $data}
	{#if $data !== undefined && $data !== null}
		<slot user={$data} refresh={refresh} />
	{:else}
		<slot refresh={refresh} name="signed-out" />
	{/if}
{/key}
