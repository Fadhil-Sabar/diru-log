<script lang="ts">
	import BlogLayout from '$lib/components/blog/BlogLayout.svelte';

	let { data } = $props();
</script>

<BlogLayout {...data.meta} views={data.views}>
	<data.content />
</BlogLayout>
