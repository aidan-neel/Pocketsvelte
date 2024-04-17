<script lang="ts">
	import User from '$lib/components/User.svelte';
	import { type AuthModel } from 'pocketbase';
	import type PocketBase from 'pocketbase';
	import { getPocketbaseContext } from '$lib/stores/Context.js';

	type User = AuthModel & {
		name: string;
		avatar: string;
	};

	const client: PocketBase = getPocketbaseContext();

	let Type: User;
</script>

<User let:user let:refresh type={Type}>
	<p>
		{user.name}
	</p>
	<button  class="bg-blue-500 ml-2 p-4 text-white" on:click={() => {
		client.authStore?.clear();
		refresh();
	}}>
		Sign Out
	</button>
	<div slot="signed-out" let:refresh>
		Signed Out
		<button class="bg-red-500 ml-2 p-4 text-white" on:click={() => {
			const email = "123@gmail.com";
			const password = "string123";

			client.collection('users').authWithPassword(email, password);
			refresh();
		}}>
			Sign In
		</button>
	</div>
</User>