<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import Navbar from '$lib/components/shared/Navbar.svelte';
	import Footer from '$lib/components/shared/Footer.svelte';
	import { dev, browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import NavigationSplash from '$lib/components/shared/NavigationSplash.svelte';

	let { children } = $props();

	afterNavigate((nav) => {
		if (nav.type === 'enter') return;

		if (!dev && browser && window.goatcounter?.count) {
			window.goatcounter.count({
				path: location.pathname + location.search
			});
		}
	});
</script>

<svelte:head
	><link rel="icon" href={favicon} />
	<title>Diru Log</title>
	{#if !dev}
		<script
			data-goatcounter="https://diru.goatcounter.com/count"
			async
			src="//gc.zgo.at/count.js"
		></script>
	{/if}
</svelte:head>

<NavigationSplash />
<ModeWatcher />
<div class="relative container mx-auto flex min-h-svh max-w-4xl flex-col">
	<Navbar />
	<main class="flex-1">{@render children()}</main>
	<Footer />
</div>

<svg class="hidden">
	<filter id="noiseFilter">
		<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
		<feColorMatrix type="saturate" values="0" />
	</filter>
</svg>

<style>
	:global(body)::before {
		content: '';
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0.1;
		z-index: 9999;
		pointer-events: none;
		filter: url(#noiseFilter);
	}
</style>
