<!--
  Drop-in Svelte component wrapping the timeline viewer.

  Works in Svelte 4 and 5 (classic syntax; a runes version is in the README).

  Usage:
    <Timeline name="USA" base="/timeline-data" />

  Three things matter:
  1. mountViewer touches the DOM, so it must run in onMount, never during SSR.
  2. The viewer fills its container, so give the wrapper a real height.
  3. The converted data must be served as a static asset at `base`.
     SvelteKit serves `static/`; a plain Vite + Svelte app serves `public/`.
-->
<script>
	import { onMount } from 'svelte';
	// No file extension: a '.js' specifier does not resolve to the '.ts' source from
	// inside a .svelte file, but the directory index does.
	import { mountTimeline } from '$lib/timeline';
	import '$lib/timeline/ui/viewer.css';

	/** Timeline name, matching the JSON filename the converter produced. */
	export let name = 'USA';
	/** Where the converted data is served from, relative or absolute. */
	export let base = '/timeline-data';
	/** Focus on mount so shortcuts work without a click. Off by default: focusing scrolls the page. */
	export let autofocus = false;

	let container;
	let handle = null;
	let error = null;

	// Remount when the requested timeline changes.
	$: if (container && name) void show(name);

	async function show(which) {
		try {
			error = null;
			handle?.destroy();
			handle = null;
			handle = await mountTimeline(container, which, base, { autofocus });
		} catch (e) {
			error = e instanceof Error ? e.message : String(e);
		}
	}

	onMount(() => {
		void show(name);
		return () => handle?.destroy();
	});
</script>

<div class="timeline-wrapper">
	{#if error}
		<p class="timeline-error">Could not load the timeline: {error}</p>
	{/if}
	<div class="timeline-host" bind:this={container}></div>
</div>

<style>
	.timeline-wrapper {
		position: relative;
		width: 100%;
	}

	/* The viewer scales to fill its container, so the container needs a height.
	   The source is 1700x950 (~16:9); aspect-ratio keeps it proportional. */
	.timeline-host {
		width: 100%;
		aspect-ratio: 1700 / 950;
		min-height: 420px;
	}

	.timeline-error {
		padding: 12px 16px;
		background: #fdd;
		color: #900;
		font-size: 14px;
	}
</style>
