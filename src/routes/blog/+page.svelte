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
		data.blogs.filter((blog) =>
			blog.meta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			blog.meta.description.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);
</script>

<svelte:head>
	<title>Blog | Diru Log</title>
</svelte:head>

<main class="flex flex-col gap-8 p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
	<section class="flex flex-col gap-4">
		<h1 class="text-4xl font-bold tracking-tight">Blog Posts</h1>
		<p class="text-muted-foreground leading-relaxed">
			All my notes and thoughts in one place.
		</p>
	</section>

	<div class="relative">
		<input
			type="text"
			placeholder="Search posts..."
			bind:value={searchQuery}
			class="w-full p-3 pl-4 rounded-lg bg-secondary/30 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
		/>
	</div>

	<div class="grid gap-4">
		{#each filteredBlogs as blog, i (blog)}
			<div class="animate-in fade-in slide-in-from-bottom-2 duration-500" style="animation-delay: {i * 50}ms">
				<Item variant="muted" class="hover:bg-secondary/50 transition-colors group">
					{#snippet child({ props })}
						<a href={resolve((blog.slug ? '/blog/' + blog.slug : '/') as any)} {...props} class="flex items-center gap-4 p-4">
							<ItemMedia variant="image" class="shrink-0">
								<Badge class="bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-none uppercase text-xs font-bold">
									{blog.meta.lang}
								</Badge>
							</ItemMedia>
							<ItemContent class="flex-1 min-w-0">
								<div class="flex items-baseline justify-between gap-4 mb-1">
									<ItemTitle class="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
										{blog.meta.title}
									</ItemTitle>
									<span class="text-xs text-muted-foreground whitespace-nowrap">
										{new Date(blog.meta.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
									</span>
								</div>
								<ItemDescription class="line-clamp-2 text-sm leading-relaxed">
									{blog.meta.description}
								</ItemDescription>
							</ItemContent>
						</a>
					{/snippet}
				</Item>
			</div>
		{:else}
			<p class="text-center text-muted-foreground py-12">No posts found matching your search.</p>
		{/each}
	</div>
</main>
