// Port of Date.java. Years are plain signed integers; negative years are BC.
// There is no year zero in the display convention: year 0 renders as "1 BC".

import type { EventDate } from './types.js';

export const MONTH_NAMES = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December',
] as const;

const MONTH_LENGTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as const;

export function isLeapYear(year: number): boolean {
	if (year % 400 === 0) return true;
	if (year % 100 === 0) return false;
	return year % 4 === 0;
}

export function yearLength(year: number): number {
	return isLeapYear(year) ? 366 : 365;
}

export function monthString(d: EventDate): string {
	return MONTH_NAMES[d.month - 1] ?? '';
}

/**
 * Date.getDayOfYear (Date.java:73-83). One-based, so January 1 is day 1 — which is
 * why events sit one day-width to the right of their own notch. Faithful to Java.
 *
 * Note the leap day is added for any month >= 3, so in a leap year Feb 29 and Mar 1
 * both return 60 and therefore compare EQUAL. Comparing [y, m, d] instead would
 * silently reorder that pair and change which events count as duplicates.
 */
export function dayOfYear(d: EventDate): number {
	let num = 0;
	for (let i = 0; i < d.month - 1; i++) num += MONTH_LENGTHS[i]!;
	num += d.day;
	if (d.month >= 3 && isLeapYear(d.year)) num++;
	return num;
}

/** Date.compareTo (Date.java:165-169). */
export function compareDates(a: EventDate, b: EventDate): number {
	if (a.year === b.year) return dayOfYear(a) - dayOfYear(b);
	return a.year - b.year;
}

export function datesEqual(a: EventDate, b: EventDate): boolean {
	return a.month === b.month && a.day === b.day && a.year === b.year;
}

/** Date.yearString (Date.java:111-124). */
export function yearString(year: number, modernDating: boolean): string {
	if (year >= 1000) return String(year);
	if (year > 0) return modernDating ? `${year} CE` : `AD ${year}`;
	return modernDating ? `${-year + 1} BCE` : `${-year + 1} BC`;
}

/** Date.longForm (Date.java:58-61), e.g. "March 15, 2015 (10 years ago)". */
export function longForm(d: EventDate, currentYear: number, modernDating: boolean): string {
	const yearsAgo = currentYear - d.year;
	return `${monthString(d)} ${d.day}, ${yearString(d.year, modernDating)}` +
		` (${yearsAgo} year${yearsAgo === 1 ? '' : 's'} ago)`;
}

/**
 * Date.dateDiff (Date.java:128-156), e.g. "3 years, 2 months, 1 day long".
 * The correction at Date.java:147 reuses the already-negative dayDiff; preserved.
 */
export function dateDiff(d1: EventDate, d2: EventDate): string {
	if (datesEqual(d1, d2)) return '';
	let s = '';
	let yearDiff = d2.year - d1.year;
	let monthDiff = d2.month - d1.month;
	let dayDiff = d2.day - d1.day;

	if (yearDiff > 0 && monthDiff >= 0) s += `${yearDiff} year${yearDiff === 1 ? '' : 's'}`;
	if (yearDiff > 0 && monthDiff < 0) {
		yearDiff--;
		monthDiff += 12;
		if (yearDiff > 0) s = `${yearDiff} year${yearDiff === 1 ? '' : 's'}`;
	} else if (yearDiff > 0 && monthDiff === 0 && dayDiff < 0) {
		yearDiff--;
		monthDiff = 11;
		dayDiff = MONTH_LENGTHS[d1.month - 1]! - dayDiff + 1;
		s = '';
	}
	if (monthDiff > 0) s += `${s.length > 0 ? ', ' : ''}${monthDiff} month${monthDiff === 1 ? '' : 's'}`;
	if (dayDiff > 0) s += `${s.length > 0 ? ', ' : ''}${dayDiff} day${dayDiff === 1 ? '' : 's'}`;

	return `${s} long`;
}

/** Snapshot taken once at boot, matching GenericEvent's static `today`. */
const now = new Date();
export const TODAY: EventDate = {
	month: now.getMonth() + 1,
	day: now.getDate(),
	year: now.getFullYear(),
};
