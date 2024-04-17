import User from './components/User.svelte';
import PocketbaseApp from './components/PocketbaseApp.svelte';
import Collection from './components/Collection.svelte';
import Record from './components/Record.svelte';

import { recordStore, type RecordStore } from './stores/RecordStore.js';
import { collectionStore, type CollectionStore } from './stores/CollectionStore.js';
import { userStore, type UserRecordStore, type DefaultAuthModel } from './stores/UserStore.js';
import { getPocketbaseContext, setPocketbaseContext } from './stores/Context.js';

export {
	User,
	PocketbaseApp,
	Collection,
	Record,
	recordStore,
	collectionStore,
	userStore,
	getPocketbaseContext,
	setPocketbaseContext,
}

export type {
	RecordStore,
	CollectionStore,
	UserRecordStore,
	DefaultAuthModel,
}