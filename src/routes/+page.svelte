<script lang="ts">
	import { Item } from '$lib/components/ui/item';
	import ItemContent from '$lib/components/ui/item/item-content.svelte';
	import ItemDescription from '$lib/components/ui/item/item-description.svelte';
	import ItemMedia from '$lib/components/ui/item/item-media.svelte';
	import ItemTitle from '$lib/components/ui/item/item-title.svelte';
	import { resolve } from '$app/paths';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	let {data} = $props()
</script>

<main class="flex flex-col gap-6 p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
	<section class="flex flex-col gap-2">
		<h1 class="font-bold tracking-tight">Hello, I'm Fadhil!</h1>
		<p class="text-muted-foreground max-w-lg leading-relaxed">
			This is my personal log where I notes down everything I've learned. 
			From Linux adventures to web development and beyond.
		</p>
	</section>

	<div class="my-4 flex flex-col gap-4">
		<div class="flex items-center justify-between">
			<h4 class="text-xl font-semibold">Recent Posts</h4>
			{#if data.blogs.length > 3}
				<a href={resolve('/blog' as any)} class="text-sm text-muted-foreground hover:text-foreground transition-colors">
					View all posts →
				</a>
			{/if}
		</div>
		
		<div class="flex flex-col gap-4">
			{#each data.blogs.slice(0, 3) as blog, i (blog)}
				<div class="animate-in fade-in slide-in-from-bottom-2 duration-700" style="animation-delay: {i * 100}ms">
					<Item variant="muted" class="hover:bg-secondary/50 transition-colors group">
						{#snippet child({ props })}
							<a href={resolve((blog.slug ? '/blog/' + blog.slug : '/') as any)} {...props} class="flex items-center gap-4 p-3">
								<ItemMedia variant="image" class="shrink-0">
									<Badge class="bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-none uppercase text-[10px] font-bold">
										{blog.meta.lang}
									</Badge>
								</ItemMedia>
								<ItemContent class="flex-1 min-w-0">
									<div class="flex items-baseline justify-between gap-2">
										<ItemTitle class="line-clamp-1 group-hover:text-primary transition-colors">
											{blog.meta.title}
										</ItemTitle>
										<span class="text-[10px] text-muted-foreground whitespace-nowrap">
											{new Date(blog.meta.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
										</span>
									</div>
									<ItemDescription class="line-clamp-1 text-xs">
										{blog.meta.description}
									</ItemDescription>
								</ItemContent>
							</a>
						{/snippet}
					</Item>
				</div>
			{/each}
		</div>
	</div>
</main>

