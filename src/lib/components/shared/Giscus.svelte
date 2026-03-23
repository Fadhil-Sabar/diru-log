<script lang="ts">
	import { mode } from 'mode-watcher';
</script>

<div class="giscus-wrapper pt-6">
	{#key mode.current}
		<script
			src="https://giscus.app/client.js"
			data-repo="Fadhil-Sabar/diru-log"
			data-repo-id="R_kgDORb2jOw"
			data-category="log"
			data-category-id="DIC_kwDORb2jO84C3hjC"
			data-mapping="url"
			data-strict="0"
			data-reactions-enabled="1"
			data-emit-metadata="0"
			data-input-position="bottom"
			data-theme={mode.current}
			data-lang="en"
			crossorigin="anonymous"
			async
		>
		</script>
	{/key}
</div>
