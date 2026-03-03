<script lang="ts">
	import { resolve } from '$app/paths';
	import DrawerClose from '../ui/drawer/drawer-close.svelte';
	import DrawerContent from '../ui/drawer/drawer-content.svelte';
	import DrawerTrigger from '../ui/drawer/drawer-trigger.svelte';
	import Drawer from '../ui/drawer/drawer.svelte';
	import { Menu, Github, X } from '@lucide/svelte';
	import { page } from '$app/state';

	const navLinks = [
		{ title: 'Home', path: '/' },
		{ title: 'Blog', path: '/blog' }
	];
</script>

<nav
	class="sticky top-0 z-50 flex items-center justify-between border-b border-border/50 bg-background/80 px-6 py-4 backdrop-blur-md"
>
	<div class="flex items-center gap-8">
		<h4 class="text-xl font-bold tracking-tighter transition-colors hover:text-primary">
			<a href={resolve('/')}>Diru Log</a>
		</h4>

		<div class="hidden items-center gap-6 md:flex">
			{#each navLinks as link}
				<a
					href={resolve(link.path as any)}
					class="text-sm font-medium transition-colors hover:text-primary {page.url.pathname ===
					link.path
						? 'text-primary'
						: 'text-muted-foreground'}"
				>
					{link.title}
				</a>
			{/each}
		</div>
	</div>

	<div class="flex items-center gap-4">
		<a
			href="https://github.com/Fadhil-Sabar"
			target="_blank"
			rel="noopener noreferrer"
			class="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
		>
			<Github size={20} />
		</a>

		<div class="md:hidden">
			<Drawer direction="top">
				<DrawerTrigger class="rounded-md p-2 transition-colors hover:bg-secondary">
					<Menu size={24} />
				</DrawerTrigger>
				<DrawerContent class="w-full">
					<div class="flex min-h-fit flex-col gap-6 p-8">
						<div class="flex justify-end">
							<DrawerClose>
								<X />
							</DrawerClose>
						</div>
						{#each navLinks as link}
							<DrawerClose>
								<a
									href={resolve(link.path as any)}
									class="text-lg font-medium transition-colors hover:text-primary {page.url
										.pathname === link.path
										? 'text-primary'
										: 'text-foreground'}"
								>
									{link.title}
								</a>
							</DrawerClose>
						{/each}
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	</div>
</nav>
