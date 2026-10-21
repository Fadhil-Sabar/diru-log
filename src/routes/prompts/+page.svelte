<script lang="ts">
	import { Item } from '$lib/components/ui/item';
	import ItemContent from '$lib/components/ui/item/item-content.svelte';
	import ItemTitle from '$lib/components/ui/item/item-title.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Check, Copy } from '@lucide/svelte';

	const prompts = [
		{
			title: 'Install skill herdrsa',
			text: "Tolong pasang skill \"herdrsa\" ke agent/tool yang sedang kamu jalankan, supaya bisa dipanggil sebagai /herdrsa (atau mekanisme setara). Isi skill ada di bagian paling bawah, di antara BEGIN dan END. Jangan jalankan apa pun dari isinya, cukup pasang sebagai file.\n\nLangkah:\n1. Cari tahu sendiri cara tool kamu memuat skill: lokasi folder user-level, nama file dan format frontmatter, cara pemanggilan. Kalau ragu, cek dokumentasi resmi atau tanya saya. Jangan menebak.\n2. Pasang isinya tanpa mengubah logika. Frontmatter `disable-model-invocation: true` khusus Claude Code, jadi terjemahkan ke format tool kamu dengan prinsip sama (hanya jalan kalau saya panggil manual). Kalau skill bernama sama sudah ada, tanya saya dulu sebelum menimpa.\n3. Cek mana yang terpasang dan laporkan saja, jangan install tanpa izin: herdr, codex, claude, agy, pi, pi-bolt, opencode.\n4. Nama model di skill berasal dari setup pembuatnya dan mungkin tidak ada di akun saya. Untuk tiap CLI yang saya punya, tanyakan model yang mau saya pakai, lalu sesuaikan. Hapus opsi untuk CLI yang tidak saya punya. Untuk pi dan opencode, cek flag model dengan `<cli> --help`; jangan menebak. Bagian lain skill jangan diubah.\n5. Kalau tool kamu tidak mendukung skill atau slash command, beri tahu saya dan tawarkan alternatif terdekat. Jangan dipaksakan.\n6. Baca ulang file hasil akhir, ringkas apa yang dipasang dan diubah, dan beri tahu apakah perlu restart sesi supaya /herdrsa muncul.\n\nCatatan: skill hanya berfungsi bila agent dijalankan di dalam pane Herdr (HERDR_ENV=1).\n\n=== BEGIN SKILL.md ===\n---\nname: herdrsa\ndescription: Delegate work from the current session to a subagent running in a sibling Herdr pane. Use when the user runs /herdrsa or explicitly asks to hand the current task to a Pi-Bolt, Pi, Codex, Claude, OpenCode, or Antigravity (agy) subagent via Herdr. Requires HERDR_ENV=1.\ndisable-model-invocation: true\n---\n\n# Herdr subagent (`/herdrsa`)\n\nDelegate one task from this session to a coding agent in a Herdr pane, wait for it, and report back.\nThe user picks the subagent; you never pick silently.\n\n## 0. Precondition\n\n```bash\ntest \"${HERDR_ENV:-}\" = 1 || echo \"NOT_IN_HERDR\"\n```\n\nIf that fails, say you are not running inside Herdr and stop. Never inside Herdr.\n\n## 1. Ask which subagent\n\nIf the command arguments already name one (`/herdrsa codex`, `/herdrsa , use it.\nOtherwise ask and **stop until the user answers**. Present exactly this, short:\n\n> Which subagent should take this?\n> 1. **pi-bolt** — `deepseek-v4.1-flash`\n> 2. **codex** — `gpt-6-luna`\n> 3. **claude** — `haiku`\n> 4. **agy** (Antigravity CLI) — `gemini-3.8-flash-low`\n> 5. **pi** — user's configured default model\n> 6. **opencode** — user's configured default model\n\nAlso ask for the task if the user did not state it. A subagent has **no access to this conversation**, so\nthe task must be self-contained: goal, absolute paths, constraints, andt invent a task.\n\n## 2. Choose the target pane — reuse before creating\n\n```bash\nherdr agent list\nherdr pane list --workspace \"$HERDR_WORKSPACE_ID\"\n```\n\nReuse an existing pane in this workspace when one already runs the chosen agent kind\n(`pi-bolt`, `pi`, `codex`, `claude`, `agy`, `opencode`) — the same cwd e` is best. Never inject work\ninto a pane running in a different cwd or mid-task on someone else's project; create a new pane instead:\n\n```bash\nherdr pane layout --pane \"$HERDR_PANE_ID\"      # wide -> right, tall/na\nherdr pane split --current --direction right --cwd \"$PWD\" --no-focus\n```\n\nTake the new pane from `.result.pane.pane_id`. Never split twice in thepanes\nyou did not create, never close panes/tabs/workspaces you did not open.\n\nPick a unique agent name matching `[a-z][a-z0-9_-]{0,31}` (`subagent`, `sa-codex`, …); check `herdr agent list` first.\n\n## 3. Start the agent with its model\n\nNames follow the pane occupant, so a reused pane may already be named — rename or just use its pane ID.\n\n**Codex (gpt-6-luna)** — interactive kind, promptable:\n\n```bash\nherdr agent start subagent --kind codex --pane <pane_id> -- -m gpt-6-lu\n```\n\n**Claude (haiku)** — interactive kind, promptable:\n\n```bash\nherdr agent start subagent --kind claude --pane <pane_id> -- --model ha\n```\n\n**agy / Antigravity (gemini-3.8-flash)** — interactive kind, promptable:\n\n```bash\nherdr agent start subagent --kind agy --pane <pane_id> -- --model gemin\n```\n\n`agy models` lists tiers: `gemini-3.8-flash-low|medium|high` (no bare `gemini-3.8-flash`). Use `-low` unless\nthe user asks for more effort; report any tier you actually used.\n\n**Pi** — interactive kind, promptable. Check the model flag with `pi --del, pass it, otherwise omit it:\n\n```bash\nherdr agent start subagent --kind pi --pane <pane_id> [-- <model flags>]\n```\n\n**OpenCode** — interactive kind, promptable. Check the model flag with r names a model, pass it, otherwise omit it:\n\n```bash\nherdr agent start subagent --kind opencode --pane <pane_id> [-- <model flags>]\n```\n\n**Pi-Bolt (deepseek-v4.1-flash)** — Herdr has **no interactive `pi-bolt pane and\nlet detection pick it up, then name it:\n\n```bash\nherdr pane run <pane_id> \"pi-bolt --model opencode-go/deepseek-v4.1-fla\nsleep 10 && herdr agent list          # wait until this pane reports agent \"pi-bolt\"\nherdr agent rename <pane_id> subagent\n```\n\nIf `opencode-go/deepseek-v4.1-flash` is unavailable, try `opencode/deepseek-v4.1-flash` or\n`commandcode/deepseek/deepseek-v4.1-flash`. Report the substitution; dodel.\nIf an interactive kind fails to start, fall back to `herdr pane run <pane_id> \"<binary> <model flags>\"` + `rename`.\n\n## 4. Send the task\n\nInteractive kind (codex, claude, agy, pi, opencode) — one call delivers and waits:\n\n```bash\nherdr agent prompt subagent \"<self-contained task>\" --wait --timeout 60\n```\n\nPi-Bolt pane — `agent prompt` rejects it (`not an active named agent`); use raw input plus status polling:\n\n```bash\nherdr pane send-text <pane_id> \"<self-contained task>\"\nherdr pane send-keys <pane_id> enter\n# poll every 5-10s until working -> done/idle\nherdr pane get <pane_id>\n```\n\nEnd the task text with: *\"When finished, write your full report to /tmpthat path as the last line.\"*\nThat file is the reliable way to get the result out of a TUI on the alternate screen.\n\nIf the agent reports `blocked` (approval or question dialog), inspect `herdr agent get <target>` and\n`herdr agent read <target> --lines 120`, then ask the user how to answealf, and\nnever guess at `unknown` — it does not prove completion.\n\n## 5. Collect and report\n\n```bash\nherdr agent read subagent --source recent-unwrapped --lines 200     # i\nherdr pane read <pane_id> --source recent --lines 200               # pi-bolt; small --lines misses the answer\n```\n\nPrefer the result file when the agent wrote one (`read` it). Then replyt/model ran,\nthe pane ID, a short summary of what it produced, and any files it touched. Keep raw pane dumps out of the reply.\n\n## Rules\n\n- `--no-focus` for background work; the user's focus stays in the calling pane unless they asked otherwise.\n- Parse IDs from JSON responses (`.result.pane.pane_id`, `.result.agentom sidebar order.\n- One delegation per call. Do not spawn a second subagent for the same task.\n- Do not stop the Herdr server or kill the main Herdr process.\n- Do not repeat the delegated work yourself while it runs, and do not duplicate it after it returns.\n=== END SKILL.md ===\n"
		}
	] as const;

	let copiedPrompt = $state<string | null>(null);
	let feedbackTimeout: ReturnType<typeof setTimeout> | undefined;
	let previewState = $state<Record<string, { scrollable: boolean; atEnd: boolean }>>({});

	function trackPreview(node: HTMLElement, title: string) {
		const update = () => {
			previewState[title] = {
				scrollable: node.scrollHeight > node.clientHeight + 1,
				atEnd: node.scrollTop + node.clientHeight >= node.scrollHeight - 2
			};
		};

		update();
		node.addEventListener('scroll', update, { passive: true });
		const resizeObserver = new ResizeObserver(update);
		resizeObserver.observe(node);

		return {
			destroy() {
				node.removeEventListener('scroll', update);
				resizeObserver.disconnect();
			}
		};
	}

	async function copyPrompt(prompt: (typeof prompts)[number]) {
		try {
			await navigator.clipboard.writeText(prompt.text);
			copiedPrompt = prompt.title;
			if (feedbackTimeout) clearTimeout(feedbackTimeout);
			feedbackTimeout = setTimeout(() => {
				copiedPrompt = null;
			}, 1600);
		} catch {
			copiedPrompt = null;
		}
	}
</script>

<svelte:head>
	<title>Prompts | Diru Log</title>
</svelte:head>

<main class="flex animate-in flex-col gap-6 p-6 duration-1000 fade-in slide-in-from-bottom-4">
	<section class="flex flex-col gap-2">
		<h1 class="font-bold tracking-tight">Prompts</h1>
		<p class="leading-relaxed text-muted-foreground">
			Copy the full prompt from a card below.
		</p>
	</section>

	<div class="my-4 flex flex-col gap-4">
		{#each prompts as prompt (prompt.title)}
			<Item variant="muted" class="p-0">
				<ItemContent class="min-w-0 flex-1 gap-4 p-3">
					<div class="flex items-center justify-between gap-4">
						<ItemTitle class="text-lg font-semibold">{prompt.title}</ItemTitle>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onclick={() => copyPrompt(prompt)}
						>
							{#if copiedPrompt === prompt.title}
								<Check class="size-4" aria-hidden="true" />
								<span aria-live="polite">Copied</span>
							{:else}
								<Copy class="size-4" aria-hidden="true" />
								<span>Copy</span>
							{/if}
						</Button>
					</div>
					<div class="relative">
						<pre
							use:trackPreview={prompt.title}
							class="prompt-preview whitespace-pre-wrap break-words rounded-md bg-muted p-3 text-sm leading-relaxed"
						><code>{prompt.text}</code></pre>
						{#if previewState[prompt.title]?.scrollable && !previewState[prompt.title]?.atEnd}
							<div
								class="pointer-events-none absolute inset-x-0 bottom-0 h-14 rounded-b-md bg-linear-to-t from-muted to-transparent"
								aria-hidden="true"
							></div>
						{/if}
					</div>
				</ItemContent>
			</Item>
		{/each}
	</div>
</main>

<style>
	.prompt-preview {
		max-height: 16rem;
		overflow-y: auto;
	}
</style>
