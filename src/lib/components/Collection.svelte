<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import { getPocketbaseContext } from "$lib/stores/Context.js";
    import type PocketBase from 'pocketbase';
    import { collectionStore, type CollectionStore } from '$lib/stores/CollectionStore.js'; // Adjusted import
    import type { RecordModel, RecordListOptions } from "pocketbase";

	export let client = undefined;
    const ctx: PocketBase = getPocketbaseContext();

    if (!ctx && !client) {
        console.error("Pocketbase client not found");
    }

	client = ctx;

	type T = $$Generic;

    export let collection: string;
    export let type: T | undefined = undefined
	export let query: RecordListOptions | undefined = undefined; // Adjusted query prop
	export let start: number = 0; // Adjusted start prop
	export let end: number = 50; // Adjusted end prop

	type ExtendedRecord<T> = T & RecordModel;

	const data: CollectionStore<ExtendedRecord<T>[]> = collectionStore<ExtendedRecord<T>>(
		client, 
		collection, 
		start,
		end,
		query,
	);

    interface $$Slots {
        default: { data: ExtendedRecord<typeof type>[] };
        loading: {};
    }
</script>

{#if $data !== undefined && $data !== null}
    <slot data={$data} />
{:else}
    <slot name="loading" />
{/if}
