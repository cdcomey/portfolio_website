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
		client: {start:"_app/immutable/entry/start.CoXsFeEI.js",app:"_app/immutable/entry/app.52Cy27iU.js",imports:["_app/immutable/entry/start.CoXsFeEI.js","_app/immutable/chunks/Dc4uJae_.js","_app/immutable/chunks/5JQ8Pm-n.js","_app/immutable/chunks/CvcC6P8I.js","_app/immutable/entry/app.52Cy27iU.js","_app/immutable/chunks/5JQ8Pm-n.js","_app/immutable/chunks/B8HxeWkk.js","_app/immutable/chunks/CLDMBHh4.js","_app/immutable/chunks/CvcC6P8I.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/portfolio_website/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
