export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "portfolio_website/_app",
	assets: new Set([".DS_Store",".nojekyll","assets/cloud.obj","assets/cloud_reduced.obj","assets/git_safari.png","assets/golden_gate_bridge.obj","assets/masada_test.png","assets/profile_dithered.jpg","favicon.ico"]),
	mimeTypes: {".obj":"model/obj",".png":"image/png",".jpg":"image/jpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.xKI0QIs8.js",app:"_app/immutable/entry/app.B8rJHUsi.js",imports:["_app/immutable/entry/start.xKI0QIs8.js","_app/immutable/chunks/Df78Uhop.js","_app/immutable/chunks/BcDmWqF4.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/dleD8H4C.js","_app/immutable/chunks/BuXbBVMb.js","_app/immutable/entry/app.B8rJHUsi.js","_app/immutable/chunks/BcDmWqF4.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/tw80ZIh0.js","_app/immutable/chunks/DE39thma.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/BuXbBVMb.js","_app/immutable/chunks/Dq4TU1P0.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/claudecom",
				pattern: /^\/claudecom\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/datacom",
				pattern: /^\/datacom\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/dc-packets",
				pattern: /^\/dc-packets\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/git-safari",
				pattern: /^\/git-safari\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/graphics-engine",
				pattern: /^\/graphics-engine\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/hierarchy-gfx-interface",
				pattern: /^\/hierarchy-gfx-interface\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/memory-safety",
				pattern: /^\/memory-safety\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/us-history-timeline",
				pattern: /^\/us-history-timeline\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
