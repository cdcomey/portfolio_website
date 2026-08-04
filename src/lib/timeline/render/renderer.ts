// Canvas port of the drawing half of Timeline.java + Rectangle.java.
// Paint order matters and is preserved: axis, then connector lines, then periods,
// then events — lines go down first so label text is never covered (Timeline.java:439).

import {
	NOTCH_HEIGHT, NOTCH_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH,
	textColorFor, fitDims, type LayoutRect, type LayoutResult, type ViewState,
} from '../layout/layout.js';
import type { TimelineEvent } from '../model/types.js';
import { BOLD_FONT, drawStyledString, FONT_HEIGHT, type TextMeasurer } from './text.js';

/** Screen.java:132-133. Dark mode is the default (Screen.java:122). */
export const LIGHT_BACKGROUND = 'rgb(230, 230, 230)';
export const DARK_BACKGROUND = 'rgb(40, 40, 40)';

const CORNER_SPACING = 5;

export interface RenderDeps {
	measurer: TextMeasurer;
	images: Map<string, HTMLImageElement>;
}

/**
 * Rectangle.drawDashedLine (:89-108). Orientation is chosen by which side is longer,
 * so the same routine serves vertical event stems and horizontal period trails.
 */
function drawDashedLine(ctx: CanvasRenderingContext2D, r: LayoutRect, length: number, space: number): void {
	ctx.fillStyle = r.color;
	if (r.width < r.height) {
		for (let i = r.y; i < r.y + r.height; i += length + space) {
			const h = i + length > r.y + r.height ? r.y + r.height - i : length;
			ctx.fillRect(r.x, i, r.width, h);
		}
	} else {
		for (let i = r.x; i < r.x + r.width; i += length + space) {
			const w = i + length > r.x + r.width ? r.x + r.width - i : length;
			ctx.fillRect(i, r.y, w, r.height);
		}
	}
}

/**
 * Rectangle.drawMe (:67-87). The Java builds a rounded rect out of two overlapping
 * fillRects plus four corner discs; roundRect with radius 5 is the same shape.
 */
function drawRoundedRect(ctx: CanvasRenderingContext2D, r: LayoutRect): void {
	ctx.fillStyle = r.color;
	if (r.width > 2 * CORNER_SPACING) {
		ctx.beginPath();
		ctx.roundRect(r.x, r.y, r.width, r.height, CORNER_SPACING);
		ctx.fill();
	} else {
		ctx.fillRect(r.x, r.y, r.width, r.height);
	}
}

/** An image event shows its first image inside its own box (Rectangle.java:81-86). */
function drawImageEventContents(
	ctx: CanvasRenderingContext2D, r: LayoutRect, deps: RenderDeps,
): void {
	const e = r.event;
	if (!e || e.type !== 'ImageEvent') return;
	const first = e.images[0];
	if (!first) return;
	const img = deps.images.get(first.src);
	if (!img || !img.complete || img.naturalWidth === 0) return;

	const maxWidth = r.width - 2 * CORNER_SPACING;
	const maxHeight = r.height - 2 * CORNER_SPACING;
	const { width, height } = fitDims(
		{ width: img.naturalWidth, height: img.naturalHeight }, maxWidth, maxHeight,
	);
	// xCentered = true, yCentered = false, anchored at (x + width/2, y + 30).
	ctx.drawImage(img, r.x + Math.trunc(r.width / 2) - Math.trunc(width / 2), r.y + 30, width, height);
}

function drawLabel(
	ctx: CanvasRenderingContext2D, deps: RenderDeps, r: LayoutRect, event: TimelineEvent,
): void {
	ctx.fillStyle = textColorFor(event.color);
	drawStyledString(ctx, deps.measurer, event.title, r.x + 5, r.y + FONT_HEIGHT + 3);
}

export function render(
	ctx: CanvasRenderingContext2D,
	result: LayoutResult,
	state: ViewState,
	deps: RenderDeps,
): void {
	const { geom } = result;
	const timelineColor = state.darkMode ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';

	ctx.fillStyle = state.darkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND;
	ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

	ctx.textBaseline = 'alphabetic';

	// --- drawBasicLine (:99-107): an arrow at each end, and the bar between them.
	ctx.fillStyle = timelineColor;
	for (const xs of [geom.t1x, geom.t2x]) {
		ctx.beginPath();
		ctx.moveTo(xs[0], geom.t1y[0]);
		ctx.lineTo(xs[1], geom.t1y[1]);
		ctx.lineTo(xs[2], geom.t1y[2]);
		ctx.closePath();
		ctx.fill();
	}
	ctx.fillRect(geom.t1x[2], geom.connectingLineY, geom.t2x[2] - geom.t1x[2], geom.connectingLineHeight);

	// --- notches and their year labels
	ctx.font = BOLD_FONT;
	for (const notch of result.notches) {
		ctx.fillStyle = timelineColor;
		ctx.fillRect(notch.x, geom.notchY, NOTCH_WIDTH, NOTCH_HEIGHT);
		ctx.fillText(notch.label, notch.labelX, notch.labelY);
	}

	// --- connector lines first, so event text draws over them
	for (const r of result.lineRects) {
		drawDashedLine(ctx, r, NOTCH_HEIGHT, NOTCH_WIDTH);
	}

	// --- periods
	for (const r of result.periodRects) {
		drawRoundedRect(ctx, r);
		const e = r.event;
		if (!e) continue;
		// A title too wide for its bar is drawn in the detached box instead, not here.
		if (r.detached || deps.measurer.formattedLength(e.title) < r.width - 5) {
			drawLabel(ctx, deps, r, e);
		}
	}

	// --- events
	for (const r of result.eventRects) {
		drawRoundedRect(ctx, r);
		drawImageEventContents(ctx, r, deps);
		const e = r.event;
		if (e) drawLabel(ctx, deps, r, e);
	}
}

/**
 * Hit testing (Screen.java:1138-1157). Events are tested before periods and the first
 * hit wins, so an event label sitting over a period bar selects the event.
 */
export function hitTest(result: LayoutResult, x: number, y: number): TimelineEvent | null {
	for (const r of [...result.eventRects, ...result.periodRects]) {
		if (x >= r.x && x <= r.x2 && y >= r.y && y <= r.y2 && r.event) return r.event;
	}
	return null;
}
