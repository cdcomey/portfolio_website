
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
		RouteId(): "/" | "/claudecom" | "/datacom" | "/dc-packets" | "/git-safari" | "/graphics-engine" | "/hierarchy-gfx-interface" | "/memory-safety" | "/us-history-timeline";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/claudecom": Record<string, never>;
			"/datacom": Record<string, never>;
			"/dc-packets": Record<string, never>;
			"/git-safari": Record<string, never>;
			"/graphics-engine": Record<string, never>;
			"/hierarchy-gfx-interface": Record<string, never>;
			"/memory-safety": Record<string, never>;
			"/us-history-timeline": Record<string, never>
		};
		Pathname(): "/" | "/claudecom" | "/datacom" | "/dc-packets" | "/git-safari" | "/graphics-engine" | "/hierarchy-gfx-interface" | "/memory-safety" | "/us-history-timeline";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.DS_Store" | "/.nojekyll" | "/assets/cloud.obj" | "/assets/cloud_reduced.obj" | "/assets/git_safari.png" | "/assets/golden_gate_bridge.obj" | "/assets/masada_test.png" | "/assets/profile_dithered.jpg" | "/favicon.ico" | string & {};
	}
}