<script lang="ts">
	import Record from '$lib/components/Record.svelte';

	type DataType = {
		content: string;
	};

	let obj: DataType;
</script>

<Record collection="posts" id="mxpop2j3nmunk0g" type={obj} let:data>
	{data.content}
</Record>
