// Library entry point. Importing this module has no side effects beyond registering
// the stylesheet — nothing mounts, nothing reads the DOM, nothing touches `window`.
// That makes it safe to import at the top level of a SvelteKit component even though
// the module also gets evaluated during server-side rendering.
//
// Call mountViewer / mountTimeline from onMount (or any browser-only path).

import './ui/viewer.css';

export { mountViewer } from './ui/viewer.js';
export type { ViewerHandle, ViewerOptions } from './ui/viewer.js';
export type {
	TimelineData, TimelineEvent, TimelineImage, Category,
	TimelineConfig, EventDate, EventType,
} from './model/types.js';
export { plainText } from './model/rtf.js';

import { mountViewer, type ViewerHandle, type ViewerOptions } from './ui/viewer.js';
import type { TimelineData } from './model/types.js';

export interface TimelineSummary {
	name: string;
	events: number;
	periods: number;
	firstYear: number;
	lastYear: number;
}

/**
 * Where the converted JSON and images live, relative to the page.
 * Override when your static assets are served from somewhere else.
 */
export const DEFAULT_BASE = 'data';

export async function listTimelines(base = DEFAULT_BASE): Promise<TimelineSummary[]> {
	const res = await fetch(`${base}/index.json`);
	if (!res.ok) throw new Error(`Could not load the timeline index (${res.status})`);
	return res.json() as Promise<TimelineSummary[]>;
}

export async function loadTimeline(name: string, base = DEFAULT_BASE): Promise<TimelineData> {
	const res = await fetch(`${base}/${encodeURIComponent(name)}.json`);
	if (!res.ok) throw new Error(`Could not load the timeline "${name}" (${res.status})`);
	return res.json() as Promise<TimelineData>;
}

/**
 * Load a timeline by name and mount it, in one call.
 *
 * Image paths inside the JSON are stored relative to the data directory, so a non-default
 * `base` is applied to them too.
 */
export async function mountTimeline(
	container: HTMLElement,
	name: string,
	base = DEFAULT_BASE,
	options?: ViewerOptions,
): Promise<ViewerHandle> {
	const data = await loadTimeline(name, base);
	return mountViewer(container, rebaseImages(data, base), options);
}

/**
 * The converter writes image paths as "data/<Name>/images/<file>". If the data is served
 * from a different prefix, rewrite them to match.
 */
export function rebaseImages(data: TimelineData, base: string): TimelineData {
	if (base === DEFAULT_BASE) return data;
	const prefix = `${DEFAULT_BASE}/`;
	for (const event of data.events) {
		for (const image of event.images) {
			if (image.src.startsWith(prefix)) {
				image.src = `${base}/${image.src.slice(prefix.length)}`;
			}
		}
	}
	return data;
}
