import { writable, type Writable } from "svelte/store";
import type PocketBase from "pocketbase";
import type { UnsubscribeFunc } from "pocketbase";

export type UserRecordStore<T extends DefaultAuthModel> = {
	subscribe: (cb: (value: T | null) => void) => void | (() => void);
	unsubscribe: () => Promise<void>;
	uid: string;
};

export type DefaultAuthModel = {
	id: string;
	email: string;
	password: string;
	created: number;
	updated: number;
}

export function userStore<T extends DefaultAuthModel>(
	client: PocketBase,
): UserRecordStore<T> {
	let unsubscribe: UnsubscribeFunc | null = null;

    const { subscribe, set } = writable<T | null>(null);

	if (!globalThis.window || !client) {
		console.error("No window or PocketBase client available.");
		return { subscribe, uid: "", unsubscribe: async () => {} };
	}

	try {
		set(client.authStore.model as T);
	} catch(err) {
		console.error('Error setting up subscription:', err);
	}

	return {
		subscribe,
		uid: client.authStore?.model?.uid,
		unsubscribe: async () => unsubscribe ? await unsubscribe() : undefined
	};
}
