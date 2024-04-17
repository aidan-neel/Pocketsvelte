<script lang="ts">
    import type { Writable } from "svelte/store";
    import { getPocketbaseContext } from "$lib/stores/Context.js";
    import type PocketBase from 'pocketbase';
    import { recordStore, type RecordStore } from '$lib/stores/RecordStore.js';
    import type { RecordModel } from "pocketbase";

	export let client = undefined;
    const ctx: PocketBase = getPocketbaseContext();

    if (!ctx && !client) {
        console.error("Pocketbase client not found");
    }

	client = ctx;

	type T = $$Generic;

    export let id: string;
    export let collection: string;
    export let type: T | undefined = undefined
	export let where: string | undefined = undefined;
    type ExtendedRecord<T> = T & RecordModel;

    const data: RecordStore<ExtendedRecord<typeof type>> = recordStore<ExtendedRecord<typeof type>>(
		client, 
		id, 
		collection,
	);

    interface $$Slots {
        default: { data: ExtendedRecord<typeof type> };
        loading: {};
    }
</script>

{#if $data !== undefined && $data !== null}
    <slot data={$data} />
{:else}
    <slot name="loading" />
{/if}
