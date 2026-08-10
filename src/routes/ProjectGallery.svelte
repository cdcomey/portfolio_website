<script>
    import { base } from '$app/paths';
    import ProjectCard from '$lib/ProjectCard.svelte';
    // import Header from '../../Header.svelte';
    const gsf = `${base}/assets/git_safari.png`;
    const datacom_default = `${base}/assets/masada_test.png`;
    const proc_diag = `${base}/assets/datacom_process_diag_black.png`;
    const timeline_thumb = `${base}/assets/timeline_thumbnail.png`;
    // TODO: replace with a real thumbnail dropped into static/assets/
    const claude_datacom_thumb = `${base}/assets/bee_and_flower_tn.png`;
</script>

<!-- <Header/> -->
<section id="misc-projects" class="dark centered">
    <h1>Project Gallery</h1>

    <br>

    <div class="project-grid">

        <!-- <div class="project">
            <a href="{base}/"><img src={gsf} alt="MultiVAC Demo"></a>
            <a href="{base}/"><h2>Git Safari</h2></a>
            <a href="{base}/"><h3>UrbEx For Programmers</h3></a>
            <a href="{base}/"><p>Brief Description Lorem Ipsum </p></a>
        </div> -->

        <!-- <div class="project">
            <a href="{base}/projects/datacom"><img src={datacom_default} alt="MultiVAC Demo"></a>
            <a href="{base}/projects/datacom"><h2>DATACOM</h2></a>
            <a href="{base}/projects/datacom"><h3>Subtitle</h3></a>
            <a href="{base}/projects/datacom"><p>Brief Description Lorem Ipsum </p></a>
        </div> -->

        <!-- <div class="project">
            <a href="{base}/"><img src={datacom_default} alt="MultiVAC Demo"></a>
            <a href="{base}/"><h2>CLAUDECOM</h2></a>
            <a href="{base}/"><h3>DATACOM Integration with Claude</h3></a>
            <a href="{base}/"><p>Brief Description Lorem Ipsum </p></a>
        </div> -->

        <!-- <div class="project">
            <a href="{base}/"><img src={datacom_default} alt="MultiVAC Demo"></a>
            <a href="{base}/"><h2>Memory Safety across Large Networks</h2></a>
            <a href="{base}/"><h3>Subtitle</h3></a>
            <a href="{base}/"><p>Brief Description Lorem Ipsum </p></a>
        </div> -->

        <ProjectCard
            href="{base}/projects/dc-packets"
            imageSrc={proc_diag}
            title="DATACOM Packet Interface"
            subtitle="Asynchronous Networked Graphics Interface"
            description="Custom data packet protocol for transmitting asynchronous graphical information over network"
        />

        <ProjectCard
            href="{base}/projects/graphics-engine"
            imageSrc={proc_diag}
            title="DATACOM Graphics Engine"
            subtitle="Multicamera Setup and Recording"
            description="Fast rendering system for 3D telemetry visualization"
        />

        <!-- <div class="project">
            <a href="{base}/projects/dc-packets"><img src={proc_diag} alt="MultiVAC Demo"></a>
            <a href="{base}/projects/dc-packets"><h2>DATACOM Packet Interface</h2></a>
            <a href="{base}/projects/dc-packets"><h3>Asynchronous Networked Graphics Interface</h3></a>
            <a href="{base}/projects/dc-packets"><p>Custom data packet protocol for transmitting asynchronous graphical information over network </p></a>
        </div> -->

        <ProjectCard
            href="{base}/projects/claude-datacom"
            imageSrc={claude_datacom_thumb}
            title="Claude-DATACOM Interface"
            subtitle=""
            description="An interface to allow Claude to generate objects and behaviors in a real-time 3D scene"
        />

        <ProjectCard
            href="{base}/projects/timeline"
            imageSrc={timeline_thumb}
            title="Interactive History Timeline"
            subtitle="Canvas Port of a Java Desktop App"
            description="Browser-based timeline viewer rendering thousands of events and periods to canvas"
        />

        <!-- <div class="project">
            <a href="{base}/"><img src={datacom_default} alt="DATACOM Graphics Pic"></a>
            <a href="{base}/"><h2> DATACOM Graphics Engine </h2></a>
            <a href="{base}/"><h3>Mutlicamera Setup and Recording</h3></a>
            <a href="{base}/"><p>Brief Description Lorem Ipsum </p></a>
        </div> -->

        <!-- <div class="project">
            <a href="{base}/"><img src={datacom_default} alt="MultiVAC Demo"></a>
            <a href="{base}/"><h2>Graphics Hierarchy</h2></a>
            <a href="{base}/"><h3>Dependent Object Interface</h3></a>
            <a href="{base}/"><p>Brief Description Lorem Ipsum </p></a>
        </div> -->

        <!-- <div class="project">
            <a href="{base}/"><img src={datacom_default} alt="MultiVAC Demo"></a>
            <a href="{base}/"><h2>DATACOM Video Rendering</h2></a>
            <a href="{base}/"><h3>Video Rendering Interface</h3></a>
            <a href="{base}/"><p>Brief Description Lorem Ipsum </p></a>
        </div> -->


        

        <!-- <ProjectCard
            href="{base}/projects/clementine"
            imageSrc="{base}/assets/poster_req_review.png"
            title="Clementine"
            subtitle="Space Systems Engineering"
            description="As part of a team of 5, I was tasked with reverse-engineering the 1993 Clementine lunar flyby probe in order to modify the spacecraft to prevent an ADCS error that caused mission failure."
        /> -->

        <!-- <ProjectCard
            href="{base}/projects/flat-plate-drag"
            imageSrc="{base}/assets/Prob1bResults1.png"
            title="Flat Plate Drag"
            subtitle="CFD & Fluid Flow Analysis"
            description="Two-dimensional analysis of subsonic fluid flow over a flat plate using numerical methods"
        /> -->
    </div>
</section>

<style>
    .project-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 20px;
    }

    @media (max-width: 1024px) {
        .project-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media (max-width: 768px) {
        .project-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 480px) {
        .project-grid {
            grid-template-columns: repeat(1, 1fr);
        }
    }

    .project:hover {
        scale: 1.02;
    }

    .project:hover img {
        opacity: 100%;
    }



    a {
        color: #FFFFFF;
        text-decoration: none;
    }

    a:hover {
        text-decoration: none;
    }

    p {
        padding: 5%;
    }

    h3 {
        font-style: italic;
    }

    .project {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        /* text-align: center; */
        /* background-color: #22272b; */
    }

    img {
        aspect-ratio: 1 / 1;
        width: 100%;
        opacity: 80%;
        object-fit: cover;
        background-color: #000000;

    }
</style>