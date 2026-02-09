export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "portfolio_website/_app",
	assets: new Set([".DS_Store",".nojekyll","favicon.ico"]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.C0cMw6lw.js",app:"_app/immutable/entry/app.B_xr5a2C.js",imports:["_app/immutable/entry/start.C0cMw6lw.js","_app/immutable/chunks/Bwxo8F4K.js","_app/immutable/chunks/5JQ8Pm-n.js","_app/immutable/chunks/CvcC6P8I.js","_app/immutable/entry/app.B_xr5a2C.js","_app/immutable/chunks/5JQ8Pm-n.js","_app/immutable/chunks/B8HxeWkk.js","_app/immutable/chunks/CLDMBHh4.js","_app/immutable/chunks/CvcC6P8I.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
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
