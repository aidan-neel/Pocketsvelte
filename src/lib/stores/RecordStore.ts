import { writable, type Writable } from "svelte/store";
import type PocketBase from "pocketbase";
import type { RecordSubscription, UnsubscribeFunc } from "pocketbase";
import type { RecordModel } from "pocketbase";

export type RecordStore<T> = {
	subscribe: (cb: (value: T | null) => void) => void | (() => void);
	id: string;
	unsubscribe: () => Promise<void>;
};

export function recordStore<T = RecordModel>(
    client: PocketBase,
    id: string,
    collection: string,
): RecordStore<T> {
    let unsubscribe: UnsubscribeFunc | null = null;

    const { subscribe, set } = writable<T | null>(null);

    if (!globalThis.window || !client) {
        console.error("No window or PocketBase client available.");
        return { subscribe, id, unsubscribe: async () => {} };
    }

    (async () => {
        try {
			set(await client.collection(collection).getOne(id));

            unsubscribe = await client.collection(collection).subscribe(id, (e) => {
                if (e.record) {
                    set(e.record as unknown as T);
                } else {
                    console.error("Event does not contain record data:", e);
                }
            });
        } catch (error) {
            console.error('Error setting up subscription:', error);
        }
    })();

    return {
        subscribe, 
        id,
        unsubscribe: async () => unsubscribe ? await unsubscribe() : undefined
    };
}

