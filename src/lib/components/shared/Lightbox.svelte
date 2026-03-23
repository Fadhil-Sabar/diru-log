<script lang="ts">
	import {Dialog, DialogContent} from '$lib/components/ui/dialog';

	interface Props {
		src: string | null;
		onClose: () => void;
	}
	let { src, onClose }: Props = $props();

	let open = $derived(src !== null);
</script>

<Dialog
	{open}
	onOpenChange={(val) => {
		if (!val) onClose();
	}}
>
	<DialogContent class="max-w-[90vw] border-none bg-black/90 p-0 shadow-none">
		{#if src}
			<img {src} alt="Preview" class="max-h-[90vh] w-full rounded object-contain" />
		{/if}
	</DialogContent>
</Dialog>

<style>
	:global(.content img) {
		cursor: zoom-in;
		transition: opacity 0.2s;
	}
	:global(.content img:hover) {
		opacity: 0.9;
	}
</style>
