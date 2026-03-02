<script lang="ts">
	import { resolve } from '$app/paths';
	import DrawerClose from '../ui/drawer/drawer-close.svelte';
	import DrawerContent from '../ui/drawer/drawer-content.svelte';
	import DrawerTrigger from '../ui/drawer/drawer-trigger.svelte';
	import Drawer from '../ui/drawer/drawer.svelte';
	import { Menu, Github } from '@lucide/svelte';
	import { page } from '$app/state';

	const navLinks = [
		{ title: 'Home', path: '/' },
		{ title: 'Blog', path: '/blog' }
	];
</script>

<nav class="flex items-center justify-between p-8 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
	<div class="flex items-center gap-8">
		<h4 class="text-xl font-bold tracking-tighter hover:text-primary transition-colors">
			<a href={resolve('/')}>Diru Log</a>
		</h4>
		
		<div class="hidden md:flex items-center gap-6">
			{#each navLinks as link}
				<a 
					href={resolve(link.path as any)} 
					class="text-sm font-medium transition-colors hover:text-primary {page.url.pathname === link.path ? 'text-primary' : 'text-muted-foreground'}"
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
			class="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
		>
			<Github size={20} />
		</a>

		<div class="md:hidden">
			<Drawer direction="top">
				<DrawerTrigger class="p-2 rounded-md hover:bg-secondary transition-colors">
					<Menu size={24} />
				</DrawerTrigger>
				<DrawerContent class="h-full w-full">
					<div class="flex flex-col p-8 gap-6 h-full">
						<h4 class="text-xl font-bold mb-4">Menu</h4>
						{#each navLinks as link}
							<DrawerClose>
								<a 
									href={resolve(link.path as any)} 
									class="text-lg font-medium hover:text-primary transition-colors {page.url.pathname === link.path ? 'text-primary' : 'text-foreground'}"
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

