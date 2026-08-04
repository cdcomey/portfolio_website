// Port of GenericEvent.splitRTFString / Screen.escapeRTF.
//
// Titles and descriptions are stored as RTF fragments, not plain text. These two
// functions are a matched pair and together define that storage format: escapeRTF
// writes it, splitRTFString reads it back into runs of text that share a font.
// Change one and you must change the other.

export type FontType = 'DEFAULT' | 'ITALIC' | 'BOLD' | 'BOLDITALIC';

// The Java enum's ordinal order is load-bearing: FontType.values()[bold*2 + italic].
const FONT_BY_ORDINAL: readonly FontType[] = ['DEFAULT', 'ITALIC', 'BOLD', 'BOLDITALIC'];

export interface FormattedString {
	fontType: FontType;
	text: string;
}

function isLetter(c: string): boolean {
	return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
}

function isDigit(c: string): boolean {
	return c >= '0' && c <= '9';
}

function saveFrag(
	isBold: boolean,
	isItalic: boolean,
	frag: string,
	fragList: FormattedString[],
): void {
	if (frag.length === 0) return;
	fragList.push({ fontType: FONT_BY_ORDINAL[(isBold ? 2 : 0) + (isItalic ? 1 : 0)]!, text: frag });
}

// Splits the stored markup into runs of text that share a font.
// This understands the same closed set of escapes that escapeRTF produces:
// \b \b0 \i \i0 for styling, \\ \{ \} for literals, and the hex and unicode escapes
// for characters outside ASCII. Any other control word is skipped, not drawn literally.
export function splitRTFString(title: string | null | undefined): FormattedString[] {
	const result: FormattedString[] = [];
	if (title == null) return result;

	let isBold = false;
	let isItalic = false;
	let frag = '';

	for (let i = 0; i < title.length; i++) {
		const c = title[i]!;
		if (c !== '\\') {
			frag += c;
			continue;
		}
		if (i + 1 >= title.length) break; // a lone trailing backslash, nothing to escape

		const next = title[i + 1]!;

		// an escaped literal
		if (next === '\\' || next === '{' || next === '}') {
			frag += next;
			i++;
			continue;
		}

		// \'XX, a character given as two hex digits
		if (next === "'" && i + 3 < title.length) {
			const hex = title.slice(i + 2, i + 4);
			if (/^[0-9a-fA-F]{2}$/.test(hex)) {
				frag += String.fromCharCode(parseInt(hex, 16));
				i += 3;
				continue;
			}
			// not valid hex, fall through and treat it as an unknown control word
		}

		// a control word is a backslash, then letters, then an optional numeric parameter
		let j = i + 1;
		while (j < title.length && isLetter(title[j]!)) j++;
		const paramStart = j;
		while (j < title.length && isDigit(title[j]!)) j++;

		if (paramStart === i + 1) { // no letters followed, so this isn't a control word
			frag += c;
			continue;
		}

		const word = title.slice(i + 1, paramStart);
		const param = title.slice(paramStart, j);
		if (j < title.length && title[j] === ' ') j++; // a single space delimits the word

		if (word === 'b' || word === 'i') {
			saveFrag(isBold, isItalic, frag, result);
			frag = '';

			const on = param !== '0';
			if (word === 'b') isBold = on;
			else isItalic = on;
		} else if (word === 'u' && param.length > 0) {
			// Java casts the decimal parameter straight to a char, so it truncates to 16 bits.
			frag += String.fromCharCode(Number(param) & 0xffff);
			if (j < title.length && title[j] === '?') j++; // the ASCII substitute character
		} else if (word === 'par' || word === 'tab') {
			frag += ' '; // titles are drawn on a single line
		}
		// any other control word carries no meaning for us, so it's dropped

		i = j - 1;
	}

	saveFrag(isBold, isItalic, frag, result);

	return result;
}

// The inverse. Kept in the viewer because the converter round-trips through it,
// and the editor phase will need it directly.
export function escapeRTF(text: string): string {
	let out = '';
	for (const ch of text) {
		const code = ch.codePointAt(0)!;
		if (ch === '\\' || ch === '{' || ch === '}') out += '\\' + ch;
		else if (ch === '\n') out += '\\par\n';
		else if (code < 128) out += ch;
		else if (code < 256) out += "\\'" + code.toString(16).padStart(2, '0');
		else out += '\\u' + code + '?';
	}
	return out;
}

// Convenience for places that want the text with all markup stripped, e.g. search,
// alt text, or the document title.
export function plainText(markup: string | null | undefined): string {
	return splitRTFString(markup).map((s) => s.text).join('');
}
