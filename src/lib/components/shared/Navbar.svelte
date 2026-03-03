<script lang="ts">
	import { resolve } from '$app/paths';
	import DrawerClose from '../ui/drawer/drawer-close.svelte';
	import DrawerContent from '../ui/drawer/drawer-content.svelte';
	import DrawerTrigger from '../ui/drawer/drawer-trigger.svelte';
	import Drawer from '../ui/drawer/drawer.svelte';
	import { Menu, Github, X, SunIcon, MoonIcon } from '@lucide/svelte';
	import { page } from '$app/state';
	import { toggleMode } from 'mode-watcher';
	import Button from '../ui/button/button.svelte';

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
		<Button onclick={toggleMode} variant="outline" size="icon">
			<SunIcon
				class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90"
			/>
			<MoonIcon
				class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>

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
