
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/projects" | "/projects/claudecom" | "/projects/datacom" | "/projects/dc-packets" | "/projects/git-safari" | "/projects/graphics-engine" | "/projects/hierarchy-gfx-interface" | "/projects/memory-safety" | "/projects/us-history-timeline";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/projects": Record<string, never>;
			"/projects/claudecom": Record<string, never>;
			"/projects/datacom": Record<string, never>;
			"/projects/dc-packets": Record<string, never>;
			"/projects/git-safari": Record<string, never>;
			"/projects/graphics-engine": Record<string, never>;
			"/projects/hierarchy-gfx-interface": Record<string, never>;
			"/projects/memory-safety": Record<string, never>;
			"/projects/us-history-timeline": Record<string, never>
		};
		Pathname(): "/" | "/projects/claudecom" | "/projects/datacom" | "/projects/dc-packets" | "/projects/git-safari" | "/projects/graphics-engine" | "/projects/hierarchy-gfx-interface" | "/projects/memory-safety" | "/projects/us-history-timeline";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.DS_Store" | "/.nojekyll" | "/assets/cloud.obj" | "/assets/cloud_reduced.obj" | "/assets/git_safari.png" | "/assets/golden_gate_bridge.obj" | "/assets/masada_test.png" | "/assets/profile_dithered.jpg" | "/favicon.ico" | string & {};
	}
}