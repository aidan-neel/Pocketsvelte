<script>
	import PocketbaseApp from "$lib/components/PocketbaseApp.svelte";
	import PocketbaseClient from "$lib/dev/pocketbase";
	import "../app.pcss";
</script>

<PocketbaseApp client={PocketbaseClient}>
	<main class="w-screen text-black bg-zinc-100 h-screen flex items-center justify-center">
		<slot></slot>
		
		<div class="absolute bottom-8 items-center justify-center flex flex-row gap-8 w-auto p-4 bg-zinc-300 border border-zinc-400 rounded-lg">
			<a href="/record" class="text-black hover:text-black/80">Record</a>
			<a href="/collection" class="text-black hover:text-black/80">Collection</a>
			<a href="/signIn" class="text-black hover:text-black/80">Sign In</a>
			<a href="/userStore" class="text-black hover:text-black/80">User Store</a>
			<a href="/user" class="text-black hover:text-black/80">User</a>
		</div>
	</main>
</PocketbaseApp>