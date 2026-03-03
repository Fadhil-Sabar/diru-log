<script lang="ts">
	import { Github, Linkedin, Mail } from '@lucide/svelte';

	const currentYear = new Date().getFullYear();
</script>

<footer class="border-t border-border/50 bg-background/50 py-12">
	<div class="container mx-auto flex max-w-4xl flex-col gap-6 px-6">
		<div class="grid gap-12 md:grid-cols-3">
			<div class="flex flex-col items-center gap-2">
				<div class="flex items-center gap-3">
					<a
						href="https://github.com/Fadhil-Sabar"
						target="_blank"
						rel="noopener noreferrer"
						class="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
						aria-label="GitHub"
					>
						<Github size={18} />
					</a>
					<a
						href="mailto:sabarfadhil@gmail.com"
						class="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
						aria-label="Email"
					>
						<Mail size={18} />
					</a>
					<a
						href="https://www.linkedin.com/in/fadhil-andriawan-71b875212/"
						target="_blank"
						rel="noopener noreferrer"
						class="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
						aria-label="LinkedIn"
					>
						<Linkedin size={18} />
					</a>
				</div>
			</div>
		</div>

		<div
			class="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row"
		>
			<p>&copy; {currentYear} Diru. All rights reserved.</p>
		</div>
	</div>
</footer>
