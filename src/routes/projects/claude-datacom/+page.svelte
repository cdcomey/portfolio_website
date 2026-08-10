<script>
    import { base } from '$app/paths';
    import Header from '../../Header.svelte';
    import ProjectSection from '$lib/ProjectSection.svelte';

    // One entry per demo video. Add/remove entries here and the sections below
    // rebuild themselves — no markup to copy around.
    const demos = [
        {
            src: `${base}/assets/cube_spin.mp4`,
            title: 'Spinning Cube',
            body: 'The "Hello World" of the group. This one was my first test: a basic cube spinning with some text in the background.'
        },
        {
            src: `${base}/assets/bee_and_flower.mp4`,
            title: 'Bee and Flower',
            body: 'This one\'s a flower and a bee! The wing flapping was unprompted.'
        },
        {
            src: `${base}/assets/turbofan.mp4`,
            title: 'Jet Engine',
            body: 'This one was a jet engine internal exploded view. The models are kind of basic but it could do a lot with an actual cad model.'
        },
        {
            src: `${base}/assets/orbital_track.mp4`,
            title: 'Orbital Track',
            body: 'This one was unprompted! I told it it had a free hand to draw and this is what it came up with.'
        },
        {
            src: `${base}/assets/crane.mp4`,
            title: 'Origami Crane',
            body: 'This one was Opus 4.8\'s attempt at folding an origami crane. I don\'t think it\'s made it through CraneBench yet.'
        }
    ];
</script>

<Header></Header>

<section class="high-level-description centered">

    <ProjectSection imagePosition="none">
        <div slot="description">
            <h1>Claude-DATACOM Interface</h1>
            <hr width="100%">
            <p>Ever wished Claude could just *show* you what it was talking about, instead of just telling? Using DATACOM, Claude can now visualize, animate, render, and record video of any concept you can think of. Anything like a product demo, data visualization animation, or even displays for your existing toolset can now be easily rendered and iterated on. Any kind of agent can be hooked up with DATACOM as a visualization front end, allowing for a new way of interacting with LLMs. </p>
        </div>
    </ProjectSection>

    {#each demos as demo, i}
        <ProjectSection imagePosition={i % 2 === 0 ? 'right' : 'left'}>
            <div slot="description">
                <h1>{demo.title}</h1>
                <p>{demo.body}</p>
            </div>
            <div slot="image">
                <video
                    src={demo.src}
                    autoplay
                    loop
                    muted
                    playsinline
                    preload="metadata"
                ></video>
            </div>
        </ProjectSection>
    {/each}

</section>

<style>
    section {
        background-size: cover;
        position: relative;
        z-index: -10;
        min-height: 90vh;
        display: flex;
        flex-direction: column;
    }

    .centered {
        align-content: center;
    }

    /* ProjectSection only sizes <img>, so videos need this or they render at
       their intrinsic width and stretch the grid column. */
    section :global(video) {
        display: block;
        width: 100%;
        height: auto;
        object-fit: contain;
    }
</style>
