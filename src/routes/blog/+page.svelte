<script lang="ts">
	import { Item } from '$lib/components/ui/item';
	import ItemContent from '$lib/components/ui/item/item-content.svelte';
	import ItemDescription from '$lib/components/ui/item/item-description.svelte';
	import ItemMedia from '$lib/components/ui/item/item-media.svelte';
	import ItemTitle from '$lib/components/ui/item/item-title.svelte';
	import { resolve } from '$app/paths';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	let { data } = $props();

	let searchQuery = $state('');

	let filteredBlogs = $derived(
		data.blogs.filter(
			(blog) =>
				blog.meta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				blog.meta.description.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);
</script>

<svelte:head>
	<title>Blog | Diru Log</title>
</svelte:head>

<main class="flex animate-in flex-col gap-8 p-8 duration-700 fade-in slide-in-from-bottom-4">
	<section class="flex flex-col gap-4">
		<h1 class="font-bold tracking-tight">Blog Posts</h1>
		<p class="leading-relaxed text-muted-foreground">All my notes and thoughts in one place.</p>
	</section>

	<div class="relative">
		<input
			type="text"
			placeholder="Search posts..."
			bind:value={searchQuery}
			class="w-full rounded-lg border border-border bg-secondary/30 p-3 pl-4 transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none"
		/>
	</div>

	<div class="grid gap-4">
		{#each filteredBlogs as blog, i (blog)}
			<div
				class="animate-in duration-500 fade-in slide-in-from-bottom-2"
				style="animation-delay: {i * 50}ms"
			>
				<Item class="group transition-colors hover:bg-secondary/50">
					<a
						href={resolve((blog.slug ? '/blog/' + blog.slug : '/') as any)}
						class="flex items-center gap-4 p-4"
					>
						<ItemMedia variant="image" class="shrink-0">
							<Badge
								class="border-none bg-primary/10 text-xs font-bold text-primary uppercase transition-colors hover:bg-primary/20"
							>
								{blog.meta.lang}
							</Badge>
						</ItemMedia>
						<ItemContent class="min-w-0 flex-1">
							<div class="mb-1 flex items-baseline justify-between gap-4">
								<ItemTitle
									class="line-clamp-1 text-lg font-semibold transition-colors group-hover:text-primary"
								>
									{blog.meta.title}
								</ItemTitle>
								<span class="text-xs whitespace-nowrap text-muted-foreground">
									{new Date(blog.meta.date).toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric',
										year: 'numeric'
									})}
								</span>
							</div>
							<ItemDescription class="line-clamp-2 text-sm leading-relaxed">
								{blog.meta.description}
							</ItemDescription>
						</ItemContent>
					</a>
				</Item>
			</div>
		{:else}
			<p class="text-center text-muted-foreground py-12">No posts found matching your search.</p>
		{/each}
	</div>
</main>
