<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import Navbar from '$lib/components/shared/Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head
	><link rel="icon" href={favicon} />
	<title>Diru Log</title>
</svelte:head>

<ModeWatcher />
<div class="container mx-auto max-w-4xl">
	<Navbar />
	{@render children()}
</div>
