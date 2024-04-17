import { writable, type Writable } from "svelte/store";
import type PocketBase from "pocketbase";
import type { RecordListOptions, RecordModel, UnsubscribeFunc } from "pocketbase";

export type CollectionStore<T> = {
    subscribe: (cb: (value: T[] | null) => void) => void | (() => void);
    unsubscribe: () => Promise<void>;
};

export function collectionStore<T = RecordModel>(
    client: PocketBase,
    collection: string,
	start: number,
	end: number,
    query?: RecordListOptions // Optional query parameters for filtering, sorting, etc.
): CollectionStore<T[]> {
    let unsubscribe: UnsubscribeFunc | null = null;
    const { subscribe, set } = writable<T[] | null>(null);

    if (!globalThis.window || !client) {
        console.error("No window or PocketBase client available.");
        return { subscribe, unsubscribe: async () => {} };
    }

    (async () => {
        try {
            const initialList = await client.collection(collection).getList(start, end, query);
            set(initialList.items as T[]);
            unsubscribe = await client.collection(collection).subscribe('*', (e) => {
                if (e.record) {
                    if(e.action === "create" || "update" || "delete") {
						const newList = [...(initialList.items as T[])];
						const index = newList.findIndex((item) => item.id === e.record.id);
						if (index !== -1) {
							if (e.action === "delete") {
								newList.splice(index, 1);
							} else {
								newList[index] = e.record as unknown as T;
							}
						} else {
							if (e.action === "create") {
								newList.push(e.record as unknown as T);
							}
						}

						set(newList);
					}
                } else {
                    console.error("Event does not contain valid changes:", e);
                }
            });
        } catch (error) {
            console.error('Error setting up collection subscription:', error);
        }
    })();

    return {
        subscribe,
        unsubscribe: async () => unsubscribe ? await unsubscribe() : undefined
    };
}
