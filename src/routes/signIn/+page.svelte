<script lang="ts">
	import { getPocketbaseContext } from '$lib/stores/Context.js';
	import type PocketBase from 'pocketbase';
	
	export let email: string = "123@gmail.com";
	export let password: string = "string123";

	const client: PocketBase = getPocketbaseContext();
</script>

<input type="text" bind:value={email} placeholder="Email" class="border border-gray-300 rounded-md p-2">
<input type="password" bind:value={password} placeholder="Password" class="border border-gray-300 rounded-md p-2">

<button on:click={async() => {
	const authData = await client.collection('users').authWithPassword(email, password);
	console.log(authData);
}} type="submit" class="bg-blue-500 text-white rounded-md p-2">Sign In</button>