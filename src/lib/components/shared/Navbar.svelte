<script>
	import { resolve } from '$app/paths';
	import DrawerClose from '../ui/drawer/drawer-close.svelte';
	import DrawerContent from '../ui/drawer/drawer-content.svelte';
	import DrawerTrigger from '../ui/drawer/drawer-trigger.svelte';
	import Drawer from '../ui/drawer/drawer.svelte';
	import { Menu } from '@lucide/svelte';

	// const listButton = [
	// 	{
	// 		title: 'Home',
	// 		path: '/'
	// 	},
	// 	{
	// 		title: 'Blog',
	// 		path: '/blog'
	// 	}
	// ];
</script>

<nav class="flex justify-between p-8">
	<h4>Diru</h4>
	<Drawer direction="top">
		<DrawerTrigger>
			<Menu />
		</DrawerTrigger>
		<DrawerContent>
			<div class="flex h-full flex-col">
				<DrawerClose class="p-20 text-center">
					<a href={resolve('/')}>Home</a>
				</DrawerClose>
			</div>
		</DrawerContent>
	</Drawer>
</nav>
