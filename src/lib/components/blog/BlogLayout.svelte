<script lang="ts">
	import type { TMetaData } from '$lib/types';
	import type { Snippet } from 'svelte';
	import Giscus from '../shared/Giscus.svelte';
	import Badge from '../ui/badge/badge.svelte';

	interface IProps extends TMetaData {
		children: Snippet;
	}
	let { children, ...data }: IProps = $props();

	const url = 'https://log.fadhil-andriawan.dev';
	let contentElement = $state<HTMLElement | null>(null);

	const formatDate = (dateString: string) => {
		return new Intl.DateTimeFormat('id-ID', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(new Date(dateString));
	};

	const calculateReadingTime = (element: HTMLElement | null) => {
		if (!element) return 0;
		const text = element.innerText;
		const wordsPerMinute = 200;
		const wordCount = text.trim().split(/\s+/).length;
		return Math.ceil(wordCount / wordsPerMinute);
	};

	let readingTime = $state(0);

	$effect(() => {
		readingTime = calculateReadingTime(contentElement as HTMLElement);
	});
</script>

<svelte:head>
	<title>{data.title} | {data.writer}</title>
	<meta name="description" content={data.description} />
	<meta name="author" content={data.writer} />
	<link rel="canonical" href={url} />

	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.title} />
	<meta property="og:description" content={data.description} />
	<meta property="og:site_name" content="Blog Fadhil" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.title} />
	<meta name="twitter:description" content={data.description} />
</svelte:head>

<article class="prose max-w-none animate-in p-8 duration-700 fade-in slide-in-from-bottom-4">
	<header class="mb-12">
		<a
			href="/"
			class="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
		>
			← Back to home
		</a>
		<h1 class="mb-4 text-4xl font-bold tracking-tight">{data.title}</h1>
		<div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
			<div class="flex items-center gap-2">
				<span class="font-medium text-foreground">{data.writer}</span>
				<span>•</span>
				<Badge variant="secondary">{readingTime} min read</Badge>
				<span>•</span>
				<time datetime={data.date}>
					{formatDate(data.date)}
				</time>
			</div>
			<div class="flex gap-2">
				{#if data.tags}
					{#each data.tags as tag (tag)}
						<Badge
							variant="secondary"
							class="border-none bg-secondary/50 transition-colors hover:bg-secondary">{tag}</Badge
						>
					{/each}
				{/if}
			</div>
		</div>
	</header>

	<div class="content" bind:this={contentElement}>
		{@render children()}
	</div>

	<Giscus />
</article>
