// Port of the layout half of Timeline.java: where every notch, event box, period bar
// and connector line lands. This is deliberately a close transliteration — the pixel
// math, the integer truncation, and the collision loops all match the Java.
//
// Two things are NOT transliterated, both because the original is quadratic and ran on
// every single repaint:
//   1. Events are bucketed by year once instead of rescanning the whole set per notch.
//      Equivalent, because the per-notch filter is exactly `year == currentYear` and
//      the events are already sorted.
//   2. Results are cached by the caller and recomputed only when state changes.
// Output is identical; see the notes on the `break` at Timeline.java:343 below.

import { compareDates, dayOfYear, yearLength, yearString, TODAY } from '../model/date.js';
import type { EventDate, TimelineEvent } from '../model/types.js';
import { cssColor } from '../model/types.js';
import type { TextMeasurer } from '../render/text.js';
import { BOLD_FONT, FONT_HEIGHT } from '../render/text.js';

export const SCREEN_WIDTH = 1700;
export const SCREEN_HEIGHT = 950;

const LINE_LENGTH = 25;
export const NOTCH_WIDTH = 3;
export const NOTCH_HEIGHT = 10;
const EVENT_HEIGHT = 30;
const PERIOD_HEIGHT = 30;

/** Java int division truncates toward zero — Math.floor would be wrong for negatives. */
const idiv = (a: number, b: number): number => Math.trunc(a / b);

export interface LayoutRect {
	x: number;
	y: number;
	width: number;
	height: number;
	x2: number;
	y2: number;
	event: TimelineEvent | null;
	detached: boolean;
	color: string;
}

function rect(
	x: number, y: number, width: number, height: number,
	color: string, event: TimelineEvent | null = null, detached = false,
): LayoutRect {
	return { x, y, width, height, x2: x + width, y2: y + height, event, detached, color };
}

export interface Notch {
	x: number;
	label: string;
	labelX: number;
	labelY: number;
}

export interface Geometry {
	t1x: [number, number, number];
	t2x: [number, number, number];
	t1y: [number, number, number];
	connectingLineY: number;
	connectingLineHeight: number;
	notchY: number;
	numberOfNotches: number;
	space: number;
}

export interface ViewState {
	centerYear: number;
	zoomLevel: number;
	lineCenter: number;
	hideMinorEvents: boolean;
	expandedStart: number;
	expandedEnd: number;
	tagFilter: string[];
	/** -1 hide tagged, 0 show all, 1 show only tagged. */
	taggedEventsVisibility: -1 | 0 | 1;
	modernDating: boolean;
	darkMode: boolean;
}

export interface LayoutResult {
	geom: Geometry;
	notches: Notch[];
	eventRects: LayoutRect[];
	periodRects: LayoutRect[];
	lineRects: LayoutRect[];
	leftDate: EventDate;
	rightDate: EventDate;
}

export interface ImageSize {
	width: number;
	height: number;
}

// -------------------------------------------------------------------- geometry

/**
 * The constructor's fixed geometry (Timeline.java:44-79, :503-509).
 * Note the `(int)` casts sit in different places for x and y: the x coordinate
 * truncates the sqrt BEFORE dividing, the y coordinate divides in floating point and
 * truncates after. That asymmetry is why the arrow is not symmetric, and it is
 * reproduced rather than tidied up.
 */
export function computeGeometry(zoomLevel: number, lineCenter: number): Geometry {
	const armX = idiv(SCREEN_WIDTH, Math.trunc(LINE_LENGTH * Math.SQRT2));
	const t1x: [number, number, number] = [0, armX, armX];
	const t2x: [number, number, number] = [SCREEN_WIDTH, SCREEN_WIDTH - armX, SCREEN_WIDTH - armX];

	const connectingLineHeight = idiv(SCREEN_HEIGHT, 5 * LINE_LENGTH);
	const connectingLineWidth = t2x[2] - t1x[2];

	const armY = SCREEN_HEIGHT / (LINE_LENGTH * Math.SQRT2); // floating point, per Java
	const t1y: [number, number, number] = [
		lineCenter,
		Math.trunc(lineCenter + armY),
		Math.trunc(lineCenter - armY),
	];
	const connectingLineY = idiv(t1y[1] + t1y[2] - connectingLineHeight, 2);
	const notchY = t1y[0] - NOTCH_HEIGHT;

	const numberOfNotches = zoomLevel + 1;
	const newLineWidth = connectingLineWidth - NOTCH_WIDTH * numberOfNotches;
	const space = idiv(newLineWidth, numberOfNotches - 1);

	return { t1x, t2x, t1y, connectingLineY, connectingLineHeight, notchY, numberOfNotches, space };
}

// --------------------------------------------------------------------- filters

/** Timeline.shouldSkipMinorEvent (:127-140). */
function shouldSkipMinorEvent(e: TimelineEvent, state: ViewState): boolean {
	if (!state.hideMinorEvents || !e.minor) return false;

	// A period the user has expanded shows its minor events again.
	const start = e.date.year;
	let end = start;
	if (e.type === 'Period') {
		end = e.present ? TODAY.year : (e.endDate?.year ?? start);
	}
	return !(end >= state.expandedStart && start <= state.expandedEnd);
}

/** Timeline.shouldSkipEventFromTag (:142-187). Tri-state, not a boolean. */
function shouldSkipEventFromTag(eventTags: string[], state: ViewState): boolean {
	const tags = state.tagFilter;
	if (tags.length === 0) return false;

	if (state.taggedEventsVisibility === -1) {
		for (const each of tags) {
			if (eventTags.includes(each)) return true;
		}
		return false;
	}

	if (state.taggedEventsVisibility === 1) {
		for (const each of tags) {
			if (eventTags.includes(each)) return false;
		}
		return true;
	}

	return false;
}

// ---------------------------------------------------------------------- layout

/** The shared year -> x formula (Timeline.java:236, :241, :326, :351). */
function dateToX(d: EventDate, leftYear: number, space: number, lengthOfYear: number): number {
	return Math.trunc(
		(d.year - leftYear) * (space + NOTCH_WIDTH) +
		idiv(SCREEN_WIDTH, Math.trunc(LINE_LENGTH * Math.SQRT2)) +
		dayOfYear(d) * ((space + NOTCH_WIDTH) / lengthOfYear),
	);
}

function imageEventHeight(
	e: TimelineEvent, x1: number, x2: number, imageSizes: Map<string, ImageSize>,
): number {
	const first = e.images[0];
	if (!first) return 0;
	const size = imageSizes.get(first.src);
	if (!size) return 0; // Java's findDims returns [0,0] when the file can't be read
	return fitDims(size, x2 - x1, SCREEN_HEIGHT).height;
}

/** MyImage.findDimsWithImage (:33-59). Case 3 tiebreaks on absolute overflow. */
export function fitDims(size: ImageSize, maxWidth: number, maxHeight: number): ImageSize {
	let { width, height } = size;
	if (width > maxWidth && height <= maxHeight) {
		height = Math.trunc((maxWidth / width) * height);
		width = maxWidth;
	} else if (width <= maxWidth && height > maxHeight) {
		width = Math.trunc((maxHeight / height) * width);
		height = maxHeight;
	} else if (width > maxWidth && height > maxHeight) {
		if (height - maxHeight >= width - maxWidth) {
			width = Math.trunc((maxHeight / height) * width);
			height = maxHeight;
		} else {
			height = Math.trunc((maxWidth / width) * height);
			width = maxWidth;
		}
	}
	return { width, height };
}

export function layout(
	events: readonly TimelineEvent[],
	state: ViewState,
	measurer: TextMeasurer,
	imageSizes: Map<string, ImageSize>,
): LayoutResult {
	const geom = computeGeometry(state.zoomLevel, state.lineCenter);
	const { space, numberOfNotches, connectingLineY } = geom;
	const timelineColor = state.darkMode ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';

	const leftDate: EventDate = { month: 1, day: 1, year: state.centerYear - idiv(numberOfNotches, 2) };
	const rightDate: EventDate = { month: 1, day: 1, year: state.centerYear + idiv(numberOfNotches - 1, 2) };

	const eventRects: LayoutRect[] = [];
	const periodRects: LayoutRect[] = [];
	const lineRects: LayoutRect[] = [];
	const notches: Notch[] = [];

	// Bucket the non-period events by year. The Java loop rescans the whole sorted set
	// once per notch and `break`s at the first event past rightDate (:343-344) — since
	// the set is date-sorted, that break is equivalent to dropping those events here.
	// Consequence worth knowing: in the RIGHTMOST year only January 1 events appear,
	// because rightDate is Jan 1 of that year. That is existing behavior, not a bug I added.
	const byYear = new Map<number, TimelineEvent[]>();
	for (const e of events) {
		if (e.type === 'Period') continue;
		if (compareDates(e.date, rightDate) > 0) continue;
		if (shouldSkipEventFromTag(e.tags, state)) continue;
		if (shouldSkipMinorEvent(e, state)) continue;
		let bucket = byYear.get(e.date.year);
		if (!bucket) byYear.set(e.date.year, (bucket = []));
		bucket.push(e);
	}

	// `eventX1` is declared outside the per-event loop in Java, so when none of the
	// three alignment branches match it silently keeps the previous event's value.
	// Preserved: fixing it here would move labels relative to the Java build.
	let eventX1 = -1;

	let notchPosition = idiv(numberOfNotches, -2);
	for (let i = 0; i < numberOfNotches; i++, notchPosition++) {
		// --- drawNotchAndYear (:109-123)
		const notchX = i * (space + NOTCH_WIDTH) + geom.t1x[2];
		const currentYear = state.centerYear + notchPosition;
		const currentYearLength = yearLength(currentYear);
		const label = yearString(currentYear, state.modernDating);
		notches.push({
			x: notchX,
			label,
			labelX: notchX - idiv(measurer.measureWith(BOLD_FONT, label), 2),
			labelY: geom.notchY - FONT_HEIGHT,
		});

		// --- findEventCoords (:317-410)
		if (TODAY.year === currentYear) {
			const todayX = dateToX(TODAY, leftDate.year, space, currentYearLength);
			lineRects.push(rect(todayX, 0, NOTCH_WIDTH, SCREEN_HEIGHT, timelineColor));
		}

		for (const e of byYear.get(currentYear) ?? []) {
			const lineX = dateToX(e.date, leftDate.year, space, currentYearLength);
			const titleLength = measurer.formattedLength(e.title);

			const leftAlignX = lineX;
			const centerAlignX = lineX - idiv(titleLength + NOTCH_WIDTH, 2);
			const rightAlignX = lineX - titleLength;
			const width = titleLength + 10;
			const alignment = e.alignment ?? 'Centered';

			if (rightAlignX + width >= SCREEN_WIDTH || leftAlignX <= 0) continue;

			if ((alignment === 'Left-aligned' && leftAlignX + width <= SCREEN_WIDTH) || centerAlignX < 0) {
				eventX1 = leftAlignX;
			} else if (
				(alignment === 'Left-aligned' && centerAlignX <= SCREEN_WIDTH && leftAlignX > SCREEN_WIDTH) ||
				(alignment === 'Centered' && centerAlignX >= 0 && centerAlignX + width <= SCREEN_WIDTH) ||
				(alignment === 'Right-aligned' && centerAlignX >= 0 && rightAlignX < 0)
			) {
				eventX1 = centerAlignX;
			} else if (centerAlignX + width > SCREEN_WIDTH || (alignment === 'Right-aligned' && leftAlignX >= 0)) {
				eventX1 = rightAlignX;
			}

			const eventX2 = eventX1 + width;
			const height = e.type === 'ImageEvent'
				? imageEventHeight(e, eventX1, eventX2, imageSizes) + EVENT_HEIGHT + 5
				: EVENT_HEIGHT;
			let eventY1 = connectingLineY - height - 40;

			// Stack upward until clear of everything already placed. The `j = 0` reset
			// is followed by the loop's `j++`, so it actually restarts at index 1.
			for (let j = 0; j < eventRects.length; j++) {
				const r = eventRects[j]!;
				if (
					eventX2 >= r.x && eventX1 <= r.x + r.width &&
					eventY1 + height >= r.y && eventY1 <= r.y + r.height
				) {
					eventY1 = r.y - height - 5;
					j = 0;
				}
			}

			eventRects.push(rect(eventX1, eventY1, eventX2 - eventX1, height, cssColor(e.color), e));
			lineRects.push(rect(
				lineX, eventY1 + height, NOTCH_WIDTH, connectingLineY - (eventY1 + height), cssColor(e.color),
			));
		}
	}

	// --- findPeriodCoords (:189-305). Periods span the whole visible range rather than
	// any one year, so they are placed once, outside the notch loop.
	for (const p of events) {
		if (p.type !== 'Period') continue;

		const periodDate = p.date;
		const periodDate2 = p.present ? TODAY : p.endDate;
		if (!periodDate2) continue; // date2 is null only when `present`, which is handled above

		if (compareDates(periodDate, rightDate) > 0) break; // sorted, so nothing later can show
		if (compareDates(periodDate2, leftDate) < 0) continue;
		if (shouldSkipEventFromTag(p.tags, state)) continue;
		if (shouldSkipMinorEvent(p, state)) continue;

		let periodY1 = connectingLineY + geom.connectingLineHeight + NOTCH_WIDTH;

		// Each edge is scaled by the length of the year that edge actually falls in, so
		// a period's width never depends on which notch we happen to be drawing.
		const startsOffScreen = compareDates(periodDate, leftDate) < 0;
		const endsOffScreen = compareDates(periodDate2, rightDate) > 0;
		const periodX1 = startsOffScreen
			? geom.t1x[1]
			: dateToX(periodDate, leftDate.year, space, yearLength(periodDate.year));
		let periodX2 = endsOffScreen
			? geom.t2x[1]
			: dateToX(periodDate2, leftDate.year, space, yearLength(periodDate2.year));

		// Periods stack downward.
		for (let j = 0; j < periodRects.length; j++) {
			const r = periodRects[j]!;
			if (periodX2 > r.x && periodX1 < r.x2 && periodY1 + PERIOD_HEIGHT >= r.y && periodY1 <= r.y2) {
				periodY1 += PERIOD_HEIGHT + 5;
				j = 0;
			}
		}

		// A sliver clinging to the edge of the screen isn't worth drawing.
		if (
			periodX2 - periodX1 < 10 &&
			(compareDates(periodDate2, leftDate) === 0 || compareDates(periodDate, rightDate) === 0) &&
			periodDate.year !== periodDate2.year
		) continue;

		periodRects.push(rect(periodX1, periodY1, periodX2 - periodX1, PERIOD_HEIGHT, cssColor(p.color), p));

		// A period running past either edge trails off in a dashed line.
		if (startsOffScreen) {
			lineRects.push(rect(
				0, periodY1 + idiv(PERIOD_HEIGHT + NOTCH_WIDTH, 2), periodX1, NOTCH_WIDTH, cssColor(p.color),
			));
		}
		if (endsOffScreen) {
			lineRects.push(rect(
				periodX2, periodY1 + idiv(PERIOD_HEIGHT + NOTCH_WIDTH, 2),
				SCREEN_WIDTH - periodX2, NOTCH_WIDTH, cssColor(p.color),
			));
		}

		// Too narrow for its own label? Detach the label into a second, clickable box.
		const titleLength = measurer.formattedLength(p.title);
		if (titleLength >= periodX2 - periodX1 - 5) {
			periodX2 = periodX1 + titleLength + 10;
			const oldPeriodY1 = periodY1;
			periodY1 += 2 * PERIOD_HEIGHT + 10;
			// Note: no `j = 0` reset in this loop, unlike the one above.
			for (let j = 0; j < periodRects.length; j++) {
				const r = periodRects[j]!;
				if (periodX2 > r.x && periodX1 < r.x2 && periodY1 + PERIOD_HEIGHT >= r.y && periodY1 <= r.y2) {
					periodY1 += PERIOD_HEIGHT + 5;
				}
			}
			if (oldPeriodY1 + PERIOD_HEIGHT + 5 >= periodY1) periodY1 += PERIOD_HEIGHT + 5;

			periodRects.push(
				rect(periodX1, periodY1, periodX2 - periodX1, PERIOD_HEIGHT, cssColor(p.color), p, true),
			);
			lineRects.push(rect(
				periodX1, oldPeriodY1 + PERIOD_HEIGHT, NOTCH_WIDTH,
				periodY1 - (oldPeriodY1 + PERIOD_HEIGHT), cssColor(p.color),
			));
		}
	}

	return { geom, notches, eventRects, periodRects, lineRects, leftDate, rightDate };
}

/** Timeline.setTextColor (:521-523). The 0.670 coefficient is verbatim from the Java. */
export function textColorFor(rgb: readonly [number, number, number]): string {
	return rgb[0] * 0.299 + rgb[1] * 0.67 + rgb[2] * 0.114 > 150
		? 'rgb(0, 0, 0)'
		: 'rgb(255, 255, 255)';
}
