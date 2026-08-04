<script>
    import { base } from '$app/paths';
    import Header from '../../Header.svelte';
    import ProjectSection from '$lib/ProjectSection.svelte';
    import Timeline from '$lib/Timeline.svelte';
</script>

<Header></Header>

<section class="high-level-description centered">

    <ProjectSection imagePosition="none">
        <div slot="description">
            <h1>Interactive History Timeline</h1>
            <hr width="100%">
            <p>A browser port of a timeline viewer I originally wrote as a Java/Swing desktop application. The whole drawing layer was rewritten against the HTML canvas API in TypeScript, preserving the original paint order and layout math so the rendered output matches the desktop build.</p>
            <br>
            <p>The viewer works inside a fixed 1700x950 coordinate space - the same one the Swing version used — and the entire stage is CSS-scaled to fit whatever container it is mounted into. That keeps every hard-coded pixel position in the original source meaningful while still letting the timeline embed responsively in a page like this one.</p>
            <br>
            <p>Timelines are authored elsewhere and converted to JSON ahead of time. Each file carries events, multi-year periods, and image events, along with category definitions that drive the color coding. Titles and descriptions are stored as RTF markup and parsed at render time, so styling from the original documents survives the trip.</p>
            <br>
            <p>The timeline below is loaded from a converted dataset of United States history — roughly 1,800 events and 335 periods. Click into it to focus, then use the arrow keys to pan and scroll to zoom. Click an event to open its details.</p>
        </div>
    </ProjectSection>

    <div class="timeline-embed">
        <Timeline name="USA" base="{base}/timeline-data" />
    </div>

</section>

<style>
    section {
        background-size: cover;
        position: relative;
        min-height: 90vh;
        display: flex;
        flex-direction: column;
    }

    .centered {
        align-content: center;
    }

    /* The section is a flex column with align-items: flex-start, so stretch the
       embed back out to full width and give the viewer room to scale into. */
    .timeline-embed {
        align-self: stretch;
        width: 100%;
        margin-bottom: 5%;
    }
</style>
