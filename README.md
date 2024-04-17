# Pocketsvelte
Cybernetically enhanced Pocketbase apps

## What is Pocketsvelte?

Pocketsvelte is a minimal yet powerful library for integrating Pocketbase with Svelte. It is designed to be simple to use, yet flexible enough to handle a wide variety of use cases.

It's heavily inspired by Fireship's [SvelteFire](https://github.com/codediodeio/sveltefire) and I give him all the credit for the idea and the initial implementation.

## Installation

```bash
npm install @neel/pocketsvelte
```

## Usage

```svelte

<script lang="ts">
	type User = {z
		// any fields you want here
	}

	// Initiate an empty User object
	let user: User;

	type Post = {
		// any fields you want here
	}

	// Initiate an empty Post object
	let post: Post;
</script>
<!-- Set the global context with the PocketbaseApp component! -->
<PocketbaseApp client={client}> 

	<!-- Get the current user, which returns a signed-out slot -->
	<User let:user type={user}> <!-- Optionally, add the empty User object to cast a type. -->
		
		<!-- If you cast a type, you'll have intellisense in your IDE. -->
		<p>Welcome, {user.id}!</p> 
		
		<!-- Now, when you pass the {user} as a `type` it knows to cast the data. -->
		<Record collection="users" id={user.id} type={user} let:data />	
			<!-- Use the newly retrieved data -->
			<p>{data.name}</p>
		</Record>

		<Collection let:data type={post} collection="posts" start={0} end={50}>
			{#each data as post_data}

			{/each}
...
```

Each component has a `type` prop that you can use to cast the data to a specific type. This is useful for intellisense in your IDE.

Each component is using an underlying Svelte store to manage the data reactively. You can use the stores to access Pocketbase data reactively with Svelte's `$` syntax.

```svelte
<script>
	import { recordStore } from '@aaidan5899/pocketsvelte';
	import { pocketbaseClient } from './pocketbase'; // Import your Pocketbase client

	const post = recordStore(pocketbaseClient, 'post_id');
</script>

{$post?.content}
```

Alternatively, if you're using TypeScript, you can cast the store to a specific type.

```svelte
<script lang="ts">
	import { recordStore } from '@aaidan5899/pocketsvelte';
	import { pocketbaseClient } from './pocketbase'; // Import your Pocketbase client

	type Post = {
		// any fields you want here
	}

	const post = recordStore<Post>(pocketbaseClient, 'post_id'); // cast with <>
</script>

{$post?.content} <!-- Now you have type intellisense -->
```

Currently, Pocketsvelte does not have any written documentation. The components are super simple, so you can read into the source code to see how they work. I will be writing documentation soon.