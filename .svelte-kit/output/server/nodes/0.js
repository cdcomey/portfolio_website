import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.BXxgLZja.js","_app/immutable/chunks/CLDMBHh4.js","_app/immutable/chunks/5JQ8Pm-n.js","_app/immutable/chunks/BnIksHCF.js"];
export const stylesheets = ["_app/immutable/assets/0.B2dbTKGU.css"];
export const fonts = [];
