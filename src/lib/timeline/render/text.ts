// Font metrics and styled-run drawing — the port of GenericEvent.drawString /
// formattedLength, plus the FontMetrics calls the layout depends on.
//
// This matters more than it looks: measured text width decides event box widths,
// which alignment branch is taken, and whether a period's title detaches below its
// bar. Get the measurement wrong and the layout diverges, not just the glyphs.

import { splitRTFString, type FormattedString, type FontType } from '../model/rtf.js';

/** Java: new Font("Helvetica", <style>, 14). */
export const FONT_SIZE = 14;

/**
 * Java's FontMetrics.getHeight() = ascent + descent + leading. Helvetica 14 reports
 * 17 in the AWT toolkit this was built against. It is used as a baseline offset for
 * every label, so it is pinned to a constant rather than derived from the browser's
 * metrics — otherwise labels would shift depending on the fallback font.
 */
export const FONT_HEIGHT = 17;

const FONT_CSS: Record<FontType, string> = {
	DEFAULT: `${FONT_SIZE}px Helvetica, Arial, sans-serif`,
	ITALIC: `italic ${FONT_SIZE}px Helvetica, Arial, sans-serif`,
	BOLD: `bold ${FONT_SIZE}px Helvetica, Arial, sans-serif`,
	BOLDITALIC: `bold italic ${FONT_SIZE}px Helvetica, Arial, sans-serif`,
};

export const BOLD_FONT = FONT_CSS.BOLD;

/**
 * Measures styled runs. Both the width cache and the parsed-title cache are keyed by
 * the raw markup string, so repeated layout passes over the same events are cheap.
 * The Java original re-measured everything every frame.
 */
export class TextMeasurer {
	private readonly ctx: CanvasRenderingContext2D;
	private readonly widthCache = new Map<string, number>();
	private readonly runCache = new Map<string, FormattedString[]>();

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
	}

	runs(markup: string): FormattedString[] {
		let cached = this.runCache.get(markup);
		if (!cached) {
			cached = splitRTFString(markup);
			this.runCache.set(markup, cached);
		}
		return cached;
	}

	/** GenericEvent.formattedLength: the summed width of every styled run. */
	formattedLength(markup: string): number {
		const cached = this.widthCache.get(markup);
		if (cached !== undefined) return cached;

		const saved = this.ctx.font;
		let length = 0;
		for (const run of this.runs(markup)) {
			this.ctx.font = FONT_CSS[run.fontType];
			length += this.ctx.measureText(run.text).width;
		}
		this.ctx.font = saved;

		// Java accumulates ints from FontMetrics.stringWidth, so widths are whole pixels.
		const rounded = Math.round(length);
		this.widthCache.set(markup, rounded);
		return rounded;
	}

	measureWith(font: string, text: string): number {
		const saved = this.ctx.font;
		this.ctx.font = font;
		const w = this.ctx.measureText(text).width;
		this.ctx.font = saved;
		return Math.round(w);
	}

	/** Fonts affect measurement, so a font load has to invalidate everything cached. */
	clearCache(): void {
		this.widthCache.clear();
	}
}

/** GenericEvent.drawString: walk the runs, switching font, advancing x by each width. */
export function drawStyledString(
	ctx: CanvasRenderingContext2D,
	measurer: TextMeasurer,
	markup: string,
	x: number,
	y: number,
): void {
	for (const run of measurer.runs(markup)) {
		ctx.font = FONT_CSS[run.fontType];
		ctx.fillText(run.text, x, y);
		x += ctx.measureText(run.text).width;
	}
}
