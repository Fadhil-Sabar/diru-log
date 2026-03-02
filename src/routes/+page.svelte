<script lang="ts">
	import { Item } from '$lib/components/ui/item';
	import ItemContent from '$lib/components/ui/item/item-content.svelte';
	import ItemDescription from '$lib/components/ui/item/item-description.svelte';
	import ItemMedia from '$lib/components/ui/item/item-media.svelte';
	import ItemTitle from '$lib/components/ui/item/item-title.svelte';
	import { resolve } from '$app/paths';

	let posts = [
		{
			title: 'First post of my blog',
			description: 'This is my first ever post of my blog',
			slug: 'first-post-of-my-blog'
		}
	];
</script>

<main class="flex flex-col gap-2 p-8">
	<h3>Welcome!</h3>

	<p>This is simply my notes for everything I've learn.</p>

	<div class="my-4 flex flex-col gap-2">
		<h4>Recent Posts</h4>
		<div class="flex w-full max-w-md flex-col gap-6">
			<div class="flex w-full max-w-md flex-col gap-4">
				{#each posts as post (post)}
					<Item variant="muted">
						{#snippet child({ props })}
							<a href={resolve(post.slug ? '/blog/' + post.slug : '/')} {...props}>
								<ItemMedia variant="image">
									<img
										src="https://picsum.photos/32/32"
										alt={post.title}
										width="32"
										height="32"
										class="size-8 rounded object-cover grayscale"
									/>
								</ItemMedia>
								<ItemContent>
									<ItemTitle class="line-clamp-1">
										{post.title}
									</ItemTitle>
									<ItemDescription>{post.description}</ItemDescription>
								</ItemContent>
							</a>
						{/snippet}
					</Item>
				{/each}
			</div>
		</div>
	</div>
</main>
