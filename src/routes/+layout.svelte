<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import Navbar from '$lib/components/shared/Navbar.svelte';
	import Footer from '$lib/components/shared/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head
	><link rel="icon" href={favicon} />
	<title>Diru Log</title>
</svelte:head>

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
