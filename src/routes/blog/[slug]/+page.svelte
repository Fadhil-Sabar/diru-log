<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />
</svelte:head>

<article class="prose p-4">
	<header class="mb-8">
		<h1 class="text-[2em]">{data.meta.title}</h1>
		<div class="mt-2 flex gap-2 flex-col text-sm text-gray-500">
			<span>{data.meta.date} | {data.meta.writer}</span>
      <div class="flex gap-2">
			{#if data.meta.tags}
				{#each data.meta.tags as tag (tag)}
          <Badge variant="secondary">{tag}</Badge>
				{/each}
			{/if}

      </div>
		</div>
	</header>

	<div class="content">
		<data.content />
	</div>
</article>
