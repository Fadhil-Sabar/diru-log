<script lang="ts">
	import { Item } from '$lib/components/ui/item';
	import ItemContent from '$lib/components/ui/item/item-content.svelte';
	import ItemDescription from '$lib/components/ui/item/item-description.svelte';
	import ItemMedia from '$lib/components/ui/item/item-media.svelte';
	import ItemTitle from '$lib/components/ui/item/item-title.svelte';
	import { resolve } from '$app/paths';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Diru Log</title>
</svelte:head>

<main class="flex animate-in flex-col gap-6 p-6 duration-1000 fade-in slide-in-from-bottom-4">
	<section class="flex flex-col gap-2">
		<h1 class="font-bold tracking-tight">Hello, I'm Fadhil!</h1>
		<p class="max-w-lg leading-relaxed text-muted-foreground">
			This is simply my notes where I write down everything I've learned. Linux, vibe coding, tech
			tips, or daily life.
		</p>
	</section>

	<div class="my-4 flex flex-col gap-4">
		<div class="flex items-center justify-between">
			<h4 class="text-xl font-semibold">Recent Posts</h4>
			{#if data.blogs.length > 3}
				<a
					href={resolve('/blog' as any)}
					class="text-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					View all posts →
				</a>
			{/if}
		</div>

		<div class="flex flex-col gap-4">
			{#each data.blogs.slice(0, 3) as blog, i (blog)}
				<div
					class="animate-in duration-700 fade-in slide-in-from-bottom-2"
					style="animation-delay: {i * 100}ms"
				>
					<Item
						variant="muted"
						class="group flex items-center gap-4 p-3 transition-colors hover:bg-secondary/50"
					>
						{#snippet child({ props })}
							<a href={resolve((blog.slug ? '/blog/' + blog.slug : '/') as any)} {...props}>
								<ItemMedia variant="image" class="shrink-0">
									<Badge
										class="border-none bg-primary/10 text-[10px] font-bold text-primary uppercase transition-colors hover:bg-primary/20"
									>
										{blog.meta.lang}
									</Badge>
								</ItemMedia>
								<ItemContent class="min-w-0 flex-1">
									<div class="flex items-baseline justify-between gap-2">
										<ItemTitle class="line-clamp-1 transition-colors group-hover:text-primary">
											{blog.meta.title}
										</ItemTitle>
										<span class="text-[10px] whitespace-nowrap text-muted-foreground">
											{new Date(blog.meta.date).toLocaleDateString('en-US', {
												month: 'short',
												day: 'numeric',
												year: 'numeric'
											})}
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
