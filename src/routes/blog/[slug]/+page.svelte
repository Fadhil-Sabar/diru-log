<script lang="ts">
	import Giscus from '$lib/components/shared/Giscus.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} | {data.meta.writer}</title>
	<meta name="description" content={data.meta.description} />
	<meta name="author" content={data.meta.writer} />
	<link rel="canonical" href={data.url.toString()} />

	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:site_name" content="Blog Fadhil" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:description" content={data.meta.description} />
</svelte:head>

<article class="prose max-w-none animate-in p-8 duration-700 fade-in slide-in-from-bottom-4">
	<header class="mb-12">
		<a
			href="/"
			class="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
		>
			← Back to home
		</a>
		<h1 class="mb-4 text-4xl font-bold tracking-tight">{data.meta.title}</h1>
		<div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
			<div class="flex items-center gap-2">
				<span class="font-medium text-foreground">{data.meta.writer}</span>
				<span>•</span>
				<time datetime={data.meta.date}>
					{new Date(data.meta.date).toLocaleDateString('en-US', {
						month: 'long',
						day: 'numeric',
						year: 'numeric'
					})}
				</time>
			</div>
			<div class="flex gap-2">
				{#if data.meta.tags}
					{#each data.meta.tags as tag (tag)}
						<Badge
							variant="secondary"
							class="border-none bg-secondary/50 transition-colors hover:bg-secondary">{tag}</Badge
						>
					{/each}
				{/if}
			</div>
		</div>
	</header>

	<div class="content">
		<data.content />
	</div>

	<Giscus />
</article>
