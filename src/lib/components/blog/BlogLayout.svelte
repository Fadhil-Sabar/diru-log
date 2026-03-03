<script lang="ts">
	import type { TMetaData } from '$lib/types';

	let { title, date, description, category, tags, writer, lang, children }: TMetaData = $props();

	const url = 'https://domainanda.com'; // Ganti dengan domain Anda

	const formatDate = (dateString: string) => {
		return new Intl.DateTimeFormat('id-ID', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(new Date(dateString));
	};
</script>

<svelte:head>
	<title>{title} | {writer}</title>
	<meta name="description" content={description} />
	<meta name="author" content={writer} />
	<link rel="canonical" href={url} />

	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content="Blog Fadhil" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>

<article class="blog-container">
	<header>
		<span class="category">{category}</span>
		<h1>{title}</h1>
		<div class="meta">
			<time datetime={date}>{formatDate(date)}</time>
			<span class="separator">•</span>
			<span>Oleh {writer}</span>
		</div>

		<div class="tags">
			{#each tags as tag}
				<span class="tag">#{tag}</span>
			{/each}
		</div>
	</header>

	<hr />

	<div class="content">
		{@render children()}
	</div>
</article>
