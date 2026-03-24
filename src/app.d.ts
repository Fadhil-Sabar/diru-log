// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		goatcounter?: {
			count?: (vars: { path: string; title?: string; referrer?: string; event?: boolean }) => void;
		};
	}

  interface Platform {
    env: {
      log: KVNamespace;
    };
  }
}

export {};
