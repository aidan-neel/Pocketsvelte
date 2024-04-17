<script lang="ts">
	import Collection from '$lib/components/Collection.svelte';
	
	type DataType = {
		content: string;
	};

	let obj: DataType;
</script>

<Collection query={{
	'filter': 'content = "HERHERHERH"' // example of filtering
}} type={obj} let:data collection="posts">
	<div class="flex flex-col gap-4">
		{#each data as item}
			<p>
				{item.content}
			</p>
		{/each}
	</div>
</Collection>
