export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "portfolio_website/_app",
	assets: new Set([".DS_Store","favicon.ico","favicon_io/.DS_Store","favicon_io/about.txt","favicon_io/android-chrome-192x192.png","favicon_io/android-chrome-512x512.png","favicon_io/apple-touch-icon.png","favicon_io/favicon-16x16.png","favicon_io/favicon-32x32.png","favicon_io/site.webmanifest","favicon_io.zip"]),
	mimeTypes: {".txt":"text/plain",".png":"image/png",".webmanifest":"application/manifest+json",".zip":"application/zip"},
	_: {
		client: {start:"_app/immutable/entry/start.Cggv2nQc.js",app:"_app/immutable/entry/app.Jaw70hXx.js",imports:["_app/immutable/entry/start.Cggv2nQc.js","_app/immutable/chunks/CfNSYe8x.js","_app/immutable/chunks/5JQ8Pm-n.js","_app/immutable/chunks/CvcC6P8I.js","_app/immutable/entry/app.Jaw70hXx.js","_app/immutable/chunks/5JQ8Pm-n.js","_app/immutable/chunks/B8HxeWkk.js","_app/immutable/chunks/CLDMBHh4.js","_app/immutable/chunks/CvcC6P8I.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
