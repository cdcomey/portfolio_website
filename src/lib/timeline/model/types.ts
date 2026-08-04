// The shape of the JSON emitted by tools/convert.mjs.

export interface EventDate {
	month: number;
	day: number;
	year: number;
}

export type EventType = 'Event' | 'ImageEvent' | 'Period';

/** "Left-aligned" | "Centered" | "Right-aligned"; null on periods, which never use it. */
export type Alignment = string | null;

export interface TimelineImage {
	src: string;
	caption: string;
}

export interface TimelineEvent {
	type: EventType;
	/** RTF markup, not plain text. Run it through splitRTFString before drawing. */
	title: string;
	/** RTF markup. */
	description: string;
	date: EventDate;
	/** null when the period runs to the present, and on non-periods. */
	endDate: EventDate | null;
	present: boolean;
	color: [number, number, number];
	category: string;
	alignment: Alignment;
	tags: string[];
	images: TimelineImage[];
	/** Precomputed: no description written, so it collapses away by default. */
	minor: boolean;
}

export interface Category {
	name: string;
	color: [number, number, number];
	colorLabel: string;
}

export interface TimelineConfig {
	centerYear: number;
	zoomLevel: number;
}

export interface TimelineData {
	title: string;
	config: TimelineConfig;
	categories: Category[];
	tags: string[];
	/** Sorted by the Java TreeSet comparator: date, then raw title. */
	events: TimelineEvent[];
}

export function isPeriod(e: TimelineEvent): boolean {
	return e.type === 'Period';
}

export function isImageEvent(e: TimelineEvent): boolean {
	return e.type === 'ImageEvent';
}

export function cssColor(rgb: readonly [number, number, number]): string {
	return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}
