<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />
</svelte:head>

<article class="prose max-w-none p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
	<header class="mb-12">
		<a href="/" class="no-underline text-muted-foreground hover:text-foreground inline-flex items-center gap-2 mb-6 transition-colors text-sm">
			← Back to home
		</a>
		<h1 class="text-4xl font-bold tracking-tight mb-4">{data.meta.title}</h1>
		<div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
			<div class="flex items-center gap-2">
				<span class="font-medium text-foreground">{data.meta.writer}</span>
				<span>•</span>
				<time datetime={data.meta.date}>
					{new Date(data.meta.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
				</time>
			</div>
			<div class="flex gap-2">
				{#if data.meta.tags}
					{#each data.meta.tags as tag (tag)}
						<Badge variant="secondary" class="bg-secondary/50 hover:bg-secondary transition-colors border-none">{tag}</Badge>
					{/each}
				{/if}
			</div>
		</div>
	</header>

	<div class="content">
		<data.content />
	</div>

	<script
		src="https://giscus.app/client.js"
		data-repo="Fadhil-Sabar/diru-log"
		data-repo-id="R_kgDORb2jOw"
		data-category="log"
		data-category-id="DIC_kwDORb2jO84C3hjC"
		data-mapping="url"
		data-strict="0"
		data-reactions-enabled="1"
		data-emit-metadata="0"
		data-input-position="bottom"
		data-theme="preferred_color_scheme"
		data-lang="en"
		crossorigin="anonymous"
		async
	>
	</script>
</article>
