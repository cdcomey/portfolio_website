// Renders stored markup as HTML for the description panel.
//
// This is splitRTFString with one deliberate difference: \par ends a paragraph rather
// than collapsing to a space. Titles are drawn on a single canvas line so flattening
// is right there, but descriptions are multi-paragraph. The Swing build draws the same
// distinction — its description pane feeds real RTF to RTFEditorKit instead of going
// through splitRTFString.

import type { FontType } from './rtf.js';

const FONT_BY_ORDINAL: readonly FontType[] = ['DEFAULT', 'ITALIC', 'BOLD', 'BOLDITALIC'];

function isLetter(c: string): boolean {
	return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
}

function isDigit(c: string): boolean {
	return c >= '0' && c <= '9';
}

function escapeHtml(s: string): string {
	return s.replace(/[&<>]/g, (c) => (c === '&' ? '&amp;' : c === '<' ? '&lt;' : '&gt;'));
}

function wrapStyle(fontType: FontType, text: string): string {
	switch (fontType) {
		case 'BOLD': return `<strong>${text}</strong>`;
		case 'ITALIC': return `<em>${text}</em>`;
		case 'BOLDITALIC': return `<strong><em>${text}</em></strong>`;
		default: return text;
	}
}

export function rtfToHtml(markup: string | null | undefined): string {
	if (markup == null) return '';

	const paragraphs: string[] = [];
	let current = '';
	let isBold = false;
	let isItalic = false;
	let frag = '';

	const flushRun = (): void => {
		if (frag.length === 0) return;
		const style = FONT_BY_ORDINAL[(isBold ? 2 : 0) + (isItalic ? 1 : 0)]!;
		current += wrapStyle(style, escapeHtml(frag));
		frag = '';
	};
	const endParagraph = (): void => {
		flushRun();
		paragraphs.push(current);
		current = '';
	};

	for (let i = 0; i < markup.length; i++) {
		const c = markup[i]!;
		if (c !== '\\') {
			// Bare newlines are the record format's own line breaks, not content.
			if (c !== '\n') frag += c;
			continue;
		}
		if (i + 1 >= markup.length) break;

		const next = markup[i + 1]!;
		// A backslash immediately before a newline is this format's hard line break
		// (the endStr the Java writer uses); a blank line is two of them in a row.
		if (next === '\n') {
			endParagraph();
			i++;
			continue;
		}
		if (next === '\\' || next === '{' || next === '}') {
			frag += next;
			i++;
			continue;
		}
		if (next === "'" && i + 3 < markup.length) {
			const hex = markup.slice(i + 2, i + 4);
			if (/^[0-9a-fA-F]{2}$/.test(hex)) {
				frag += String.fromCharCode(parseInt(hex, 16));
				i += 3;
				continue;
			}
		}

		let j = i + 1;
		while (j < markup.length && isLetter(markup[j]!)) j++;
		const paramStart = j;
		while (j < markup.length && isDigit(markup[j]!)) j++;

		if (paramStart === i + 1) {
			frag += c;
			continue;
		}

		const word = markup.slice(i + 1, paramStart);
		const param = markup.slice(paramStart, j);
		if (j < markup.length && markup[j] === ' ') j++;

		if (word === 'b' || word === 'i') {
			flushRun();
			const on = param !== '0';
			if (word === 'b') isBold = on;
			else isItalic = on;
		} else if (word === 'u' && param.length > 0) {
			frag += String.fromCharCode(Number(param) & 0xffff);
			if (j < markup.length && markup[j] === '?') j++;
		} else if (word === 'par') {
			endParagraph();
		} else if (word === 'tab') {
			frag += '\t';
		}

		i = j - 1;
	}
	endParagraph();

	return paragraphs
		.map((p) => p.trim())
		.filter((p) => p.length > 0)
		.map((p) => `<p>${p}</p>`)
		.join('');
}
