import { writable } from "svelte/store";
import type PocketBase from "pocketbase";
import { setContext, getContext } from "svelte";

const contextKey = "pocketbase-client-context";

export function setPocketbaseContext(client: PocketBase): void {
  setContext(contextKey, client);
}

export function getPocketbaseContext(): PocketBase {
  return getContext(contextKey);
}