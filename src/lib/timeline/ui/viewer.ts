// The viewer shell: the port of Screen.java's view-mode behavior.
//
// Everything lives inside a fixed 1700x950 coordinate space — the same one the Swing
// build uses — and the whole stage is CSS-scaled to fit whatever container it is
// mounted into. That keeps every hard-coded pixel position in the Java meaningful
// while still letting the thing embed responsively in a page.
//
// Edit mode is deliberately absent; this is the read-only phase.

import { longForm, dateDiff, yearString, TODAY } from '../model/date.js';
import { plainText } from '../model/rtf.js';
import { rtfToHtml } from '../model/rtf-html.js';
import type { TimelineData, TimelineEvent } from '../model/types.js';
import {
	layout, SCREEN_HEIGHT, SCREEN_WIDTH,
	type ImageSize, type LayoutResult, type ViewState,
} from '../layout/layout.js';
import { DARK_BACKGROUND, hitTest, LIGHT_BACKGROUND, render } from '../render/renderer.js';
import { TextMeasurer } from '../render/text.js';

export interface ViewerOptions {
	/**
	 * Where keyboard shortcuts are listened for.
	 *
	 * 'container' (default) attaches to the viewer itself, which is made focusable.
	 * Shortcuts work once you click into it and never steal arrow keys or F-keys from
	 * the surrounding page — the right choice when embedding in a real site.
	 *
	 * 'window' matches the Swing build, which installs a global KeyEventDispatcher
	 * (Screen.java:105) so shortcuts fire no matter what has focus.
	 */
	captureKeys?: 'container' | 'window';
	/** Focus the viewer on mount so shortcuts work without a click first. Off by default: focusing scrolls the page to it. */
	autofocus?: boolean;
}

export interface ViewerHandle {
	destroy(): void;
	getState(): Readonly<ViewState>;
	/** Give the viewer keyboard focus. */
	focus(): void;
}

export function mountViewer(
	container: HTMLElement,
	data: TimelineData,
	options: ViewerOptions = {},
): ViewerHandle {
	const captureKeys = options.captureKeys ?? 'container';
	// ---------------------------------------------------------------- state

	const state: ViewState = {
		centerYear: data.config.centerYear,
		zoomLevel: data.config.zoomLevel,
		lineCenter: Math.trunc(SCREEN_HEIGHT / 2),
		// Most events have nothing written for them, so they start collapsed
		// (Screen.java:123).
		hideMinorEvents: true,
		expandedStart: Number.MAX_SAFE_INTEGER,
		expandedEnd: Number.MIN_SAFE_INTEGER,
		tagFilter: [],
		taggedEventsVisibility: 0,
		modernDating: true,
		darkMode: true, // Screen.java:122
	};

	let selectedEvent: TimelineEvent | null = null;
	let showTagHider = false;
	let controlKeyDown = false;
	let shiftKeyDown = false;
	let lastLayout: LayoutResult | null = null;
	let imageIndex = 0;

	// ---------------------------------------------------------------- DOM

	container.classList.add('tl-container');
	container.innerHTML = '';

	const stage = el('div', 'tl-stage');
	const canvas = document.createElement('canvas');
	canvas.width = SCREEN_WIDTH;
	canvas.height = SCREEN_HEIGHT;
	canvas.className = 'tl-canvas';
	stage.appendChild(canvas);

	const detailPanel = el('div', 'tl-detail');
	const detailBody = el('div', 'tl-detail-body');
	const expandButton = el('button', 'tl-button tl-expand') as HTMLButtonElement;
	const imagePanel = el('div', 'tl-images');
	detailPanel.appendChild(detailBody);
	// The expand button sits below the description pane in stage coordinates, not
	// inside it, so it stays put while the description scrolls.
	stage.append(detailPanel, expandButton, imagePanel);

	const tagMenu = el('div', 'tl-tagmenu');
	const tagList = el('div', 'tl-taglist');
	const tagSelect = document.createElement('select');
	tagSelect.className = 'tl-select';
	const addTagButton = button('Add Tag');
	const removeTagButton = button('Remove Tag');
	const showTaggedButton = button('Show Only Tagged Events');
	const hideTaggedButton = button('Hide Tagged Events');
	tagMenu.append(
		tagList, tagSelect, addTagButton, removeTagButton, showTaggedButton, hideTaggedButton,
	);
	stage.appendChild(tagMenu);

	const help = el('div', 'tl-help');
	help.innerHTML =
		'<b>F2</b> BC/BCE &nbsp; <b>F3</b> tags &nbsp; <b>F4</b> light/dark &nbsp; ' +
		'<b>F5</b> minor events &nbsp; <b>&larr; &rarr;</b> scroll &nbsp; ' +
		'<b>&uarr; &darr;</b> move &nbsp; <b>Ctrl -/=</b> zoom &nbsp; <b>Esc</b> deselect';
	stage.appendChild(help);

	container.appendChild(stage);

	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('Canvas 2D is unavailable');
	const measurer = new TextMeasurer(ctx);

	for (const tag of data.tags) {
		const option = document.createElement('option');
		option.value = tag;
		option.textContent = tag;
		tagSelect.appendChild(option);
	}

	// ---------------------------------------------------------------- images

	const imageSizes = new Map<string, ImageSize>();
	const images = new Map<string, HTMLImageElement>();

	function preloadImages(): void {
		const sources = new Set<string>();
		for (const e of data.events) for (const img of e.images) sources.add(img.src);
		for (const src of sources) {
			const img = new Image();
			img.onload = () => {
				imageSizes.set(src, { width: img.naturalWidth, height: img.naturalHeight });
				images.set(src, img);
				// An image event's box height depends on its image, so relayout on arrival.
				scheduleDraw();
			};
			img.src = src;
		}
	}

	// ---------------------------------------------------------------- drawing

	let drawQueued = false;
	function scheduleDraw(): void {
		if (drawQueued) return;
		drawQueued = true;
		requestAnimationFrame(() => {
			drawQueued = false;
			draw();
		});
	}

	function draw(): void {
		container.style.background = state.darkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND;
		container.classList.toggle('tl-dark', state.darkMode);

		// The Java hides the timeline entirely while an event is selected or the tag
		// menu is open (Screen.java:420), rather than drawing it behind the panels.
		const showTimeline = selectedEvent === null && !showTagHider;

		if (showTimeline) {
			lastLayout = layout(data.events, state, measurer, imageSizes);
			render(ctx!, lastLayout, state, { measurer, images });
		} else {
			lastLayout = null;
			ctx!.fillStyle = state.darkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND;
			ctx!.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
		}

		detailPanel.style.display = selectedEvent ? 'block' : 'none';
		expandButton.style.display = selectedEvent?.type === 'Period' ? 'block' : 'none';
		imagePanel.style.display = selectedEvent && selectedEvent.images.length > 0 ? 'block' : 'none';
		tagMenu.style.display = showTagHider ? 'block' : 'none';
		help.style.display = showTimeline ? 'block' : 'none';

		if (selectedEvent) renderDetail(selectedEvent);
		if (showTagHider) renderTagList();
	}

	// ------------------------------------------------------- selection panel

	function renderDetail(e: TimelineEvent): void {
		// Event.toString(currentYear, modernDating) / Period.toString(...) — the header
		// the Swing description pane shows above the title and body.
		// "N years ago" counts from today, not from the year the timeline is centred on
		// (Screen.java:1277 passes GenericEvent.today().getYear()).
		let header = longForm(e.date, TODAY.year, state.modernDating);
		if (e.type === 'Period') {
			const end = e.present ? null : e.endDate;
			header += ' - ' + (e.present || !end
				? 'present'
				: `${longForm(end, TODAY.year, state.modernDating)} : ${dateDiff(e.date, end)}`);
		}

		const parts = [`<div class="tl-date">${escapeText(header)}</div>`];
		if (e.tags.length > 0) {
			parts.push(`<div class="tl-tags">Tags: ${escapeText(e.tags.join(', '))}</div>`);
		}
		parts.push(`<h2 class="tl-title">${rtfToHtml(e.title) || escapeText(plainText(e.title))}</h2>`);
		const body = rtfToHtml(e.description);
		parts.push(body || '<p class="tl-empty">No description written for this event.</p>');
		detailBody.innerHTML = parts.join('');

		// Only periods can be expanded, and only in view mode (Screen.java:1263).
		if (e.type === 'Period') {
			const endYear = e.present ? TODAY.year : (e.endDate?.year ?? e.date.year);
			expandButton.style.display = 'block';
			expandButton.textContent =
				`Expand to ${yearString(e.date.year, state.modernDating)} - ` +
				`${yearString(endYear, state.modernDating)}`;
		} else {
			expandButton.style.display = 'none';
		}

		renderImages(e);
	}

	function renderImages(e: TimelineEvent): void {
		if (e.images.length === 0) {
			imagePanel.innerHTML = '';
			return;
		}
		if (imageIndex >= e.images.length) imageIndex = 0;
		const current = e.images[imageIndex]!;
		const nav = e.images.length > 1
			? `<div class="tl-imagenav">
					<button class="tl-button" data-nav="prev">^ ^ ^</button>
					<span>${imageIndex + 1} / ${e.images.length}</span>
					<button class="tl-button" data-nav="next">v v v</button>
				</div>`
			: '';
		imagePanel.innerHTML =
			`<img src="${escapeText(current.src)}" alt="${escapeText(current.caption)}">` +
			(current.caption ? `<div class="tl-caption">${escapeText(current.caption)}</div>` : '') +
			nav;
	}

	imagePanel.addEventListener('click', (ev) => {
		const target = (ev.target as HTMLElement).closest('[data-nav]');
		if (!target || !selectedEvent) return;
		const dir = target.getAttribute('data-nav') === 'next' ? 1 : -1;
		const count = selectedEvent.images.length;
		imageIndex = (imageIndex + dir + count) % count;
		renderImages(selectedEvent);
	});

	// Screen.expandPeriod (:585-606): rescope to the period, then deselect, because the
	// timeline is only drawn when nothing is selected.
	expandButton.addEventListener('click', () => {
		const e = selectedEvent;
		if (!e || e.type !== 'Period') return;
		const start = e.date.year;
		const end = e.present ? TODAY.year : (e.endDate?.year ?? start);
		const span = end - start + 1;
		state.expandedStart = start;
		state.expandedEnd = end;
		state.zoomLevel = Math.max(1, span - 1);
		state.centerYear = start + Math.trunc(span / 2);
		selectedEvent = null;
		scheduleDraw();
	});

	// ------------------------------------------------------------- tag menu

	function renderTagList(): void {
		tagList.innerHTML = state.tagFilter.length === 0
			? '<span class="tl-empty">none</span>'
			: escapeText(state.tagFilter.join(', '));
		showTaggedButton.classList.toggle('tl-active', state.taggedEventsVisibility === 1);
		hideTaggedButton.classList.toggle('tl-active', state.taggedEventsVisibility === -1);
	}

	addTagButton.addEventListener('click', () => {
		const tag = tagSelect.value;
		if (tag && !state.tagFilter.includes(tag)) state.tagFilter.push(tag);
		scheduleDraw();
	});
	removeTagButton.addEventListener('click', () => {
		state.tagFilter = state.tagFilter.filter((t) => t !== tagSelect.value);
		scheduleDraw();
	});
	showTaggedButton.addEventListener('click', () => {
		state.taggedEventsVisibility = 1;
		showTagHider = false;
		scheduleDraw();
	});
	// An empty selection resets to "show all" rather than hiding everything
	// (Screen.java:506-515).
	hideTaggedButton.addEventListener('click', () => {
		state.taggedEventsVisibility = state.tagFilter.length === 0 ? 0 : -1;
		showTagHider = false;
		scheduleDraw();
	});

	// --------------------------------------------------------------- input

	function canvasCoords(ev: MouseEvent): { x: number; y: number } {
		const rect = canvas.getBoundingClientRect();
		return {
			x: ((ev.clientX - rect.left) / rect.width) * SCREEN_WIDTH,
			y: ((ev.clientY - rect.top) / rect.height) * SCREEN_HEIGHT,
		};
	}

	function onClick(ev: MouseEvent): void {
		// No layout means the timeline isn't on screen right now (something is selected,
		// or the tag menu is open), so a click on the empty canvas dismisses it.
		if (!lastLayout) {
			if (selectedEvent) {
				selectedEvent = null;
				scheduleDraw();
			}
			return;
		}
		const { x, y } = canvasCoords(ev);
		const hit = hitTest(lastLayout, x, y);
		if (hit) {
			selectedEvent = hit;
			imageIndex = 0;
		} else if (selectedEvent) {
			selectedEvent = null;
		} else {
			return;
		}
		scheduleDraw();
	}

	function onMouseMove(ev: MouseEvent): void {
		if (!lastLayout) {
			canvas.style.cursor = 'default';
			return;
		}
		const { x, y } = canvasCoords(ev);
		canvas.style.cursor = hitTest(lastLayout, x, y) ? 'pointer' : 'default';
	}

	/** Screen.scrollTimeline (:1164-1178). */
	function scrollTimeline(direction: number): void {
		let amount = direction;
		if (controlKeyDown && shiftKeyDown) amount *= 1000;
		else if (shiftKeyDown) amount *= 100;
		else if (controlKeyDown) amount *= 10;
		if (selectedEvent !== null) amount = 0;
		state.centerYear += amount;
	}

	function onKeyDown(ev: KeyboardEvent): void {
		// In 'window' mode the listener is global, so check the viewer is actually the
		// thing being interacted with before claiming the key.
		if (captureKeys === 'window') {
			const active = document.activeElement;
			if (!container.contains(active) && active !== document.body) return;
		}

		let handled = true;
		switch (ev.key) {
			case 'Shift': shiftKeyDown = true; handled = false; break;
			case 'Control': controlKeyDown = true; handled = false; break;
			case 'Escape':
				selectedEvent = null;
				showTagHider = false;
				break;
			case 'ArrowLeft': scrollTimeline(-1); break;
			case 'ArrowRight': scrollTimeline(1); break;
			case 'ArrowUp': state.lineCenter -= 10; break;
			case 'ArrowDown': state.lineCenter += 10; break;
			case '-':
			case '_':
				if (!controlKeyDown) return;
				state.zoomLevel += 1;
				break;
			case '=':
			case '+':
				if (!controlKeyDown) return;
				state.zoomLevel = Math.max(1, state.zoomLevel - 1);
				break;
			case 'F2': state.modernDating = !state.modernDating; break;
			case 'F3':
				showTagHider = !showTagHider;
				selectedEvent = null;
				break;
			case 'F4': state.darkMode = !state.darkMode; break;
			case 'F5':
				state.hideMinorEvents = !state.hideMinorEvents;
				// Toggling minor events also clears any period expansion.
				state.expandedStart = Number.MAX_SAFE_INTEGER;
				state.expandedEnd = Number.MIN_SAFE_INTEGER;
				break;
			default: handled = false;
		}

		if (handled) ev.preventDefault();
		scheduleDraw();
	}

	function onKeyUp(ev: KeyboardEvent): void {
		if (ev.key === 'Shift') shiftKeyDown = false;
		if (ev.key === 'Control') controlKeyDown = false;
	}

	// -------------------------------------------------------------- scaling

	function fit(): void {
		const scale = Math.min(
			container.clientWidth / SCREEN_WIDTH,
			container.clientHeight / SCREEN_HEIGHT,
		);
		stage.style.transform = `scale(${scale})`;
		stage.style.left = `${(container.clientWidth - SCREEN_WIDTH * scale) / 2}px`;
		stage.style.top = `${(container.clientHeight - SCREEN_HEIGHT * scale) / 2}px`;
	}

	const resizeObserver = new ResizeObserver(fit);
	resizeObserver.observe(container);

	// Focusable so keyboard shortcuts have somewhere to land without a global listener.
	const keyTarget: HTMLElement | Window = captureKeys === 'window' ? window : container;
	if (captureKeys === 'container') {
		container.tabIndex = 0;
		container.addEventListener('pointerdown', () => container.focus());
	}

	canvas.addEventListener('click', onClick);
	canvas.addEventListener('mousemove', onMouseMove);
	keyTarget.addEventListener('keydown', onKeyDown as EventListener);
	keyTarget.addEventListener('keyup', onKeyUp as EventListener);

	preloadImages();
	fit();
	draw();
	if (options.autofocus && captureKeys === 'container') container.focus();

	return {
		destroy(): void {
			resizeObserver.disconnect();
			keyTarget.removeEventListener('keydown', onKeyDown as EventListener);
			keyTarget.removeEventListener('keyup', onKeyUp as EventListener);
			container.innerHTML = '';
			container.classList.remove('tl-container', 'tl-dark');
			container.removeAttribute('tabindex');
		},
		getState: () => state,
		focus: () => container.focus(),
	};
}

// ------------------------------------------------------------------ helpers

function el(tag: string, className: string): HTMLElement {
	const node = document.createElement(tag);
	node.className = className;
	return node;
}

function button(label: string): HTMLButtonElement {
	const b = document.createElement('button');
	b.className = 'tl-button';
	b.textContent = label;
	return b;
}

function escapeText(s: string): string {
	return s.replace(/[&<>"]/g, (c) =>
		c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : '&quot;');
}
