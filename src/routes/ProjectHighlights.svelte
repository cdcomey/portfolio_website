<script>
    import { base } from '$app/paths';
    const datacom = `${base}/assets/masada_test.png`;
    const gsf = `${base}/assets/git_safari.png`;
</script>

<section>
    <h1>Project Highlights</h1>
    <div class="big-project-title-page-alt">
            <div class="project-image-backdrop-black">
                <img loading="lazy" src={datacom} class="big-project-image-title-page" alt="DATACOM">
            </div>

            <div class="big-project-description">
                <div>
                    <h1>DATACOM</h1>
                    <h3>Source-Agnostic Data Visualization Program</h3>
                    <hr width="100%">
                </div>
                <br>
                <div>
                    <p>
                        I wrote a general-purpose 3D visualization engine using OpenGL and Rust to serve as a visual terminal interface for a multitude of projects I have been developing. 
                        DATACOM is a source-agnostic program (meaning it can take data from any source, provided correct formatting) and can recieve and display multiple incoming datastreams.
                    </p>
                    <br>
                    <p>
                        Originally intended to serve as a command-and-control interface for UAV swarm behavior, DATACOM has evolved into a more general-purpose interface.
                    </p>
                </div>
                <br>
                <!-- <p>
                    To read more about it, <a href="projects/DATACOM">click here</a>.
                </p> -->
            </div>
            
    </div>

    <br><br>

    <div class="big-project-title-page-alt">
            <div class="project-image-backdrop-black">
                <img loading="lazy" src={gsf} class="big-project-image-title-page" alt="Git Safari">
            </div>

            <div class="big-project-description">
                <div>
                    <h1>Git Safari</h1>
                    <h3>Urban Exploration Social Site for Github Enthusiasts</h3>
                    <hr width="100%">
                </div>
                <br>
                <div>
                    <p>
                        I've always loved San Francisco and the people in it. The more time I spend in the city, the more I've noticed that people are working outside the office more. I see people at coffee shops, people in parks, and even people near famous landmarks. 
                    </p>
                    <br>
                    <p>
                        I've always been a little more outdoorsy than most, so I wanted to help encourage that. I thought if people are going to keep working on weekends, they may as well have a nicer place to do it! I built a website to encourage people to find new spots and share them with other users by gamifying the experience, adding points for github contributions made from unique locations. The rarer the location, the more points! I'm working on building a recommendation algorithm to help people find spots they may not have thought about before.
                    </p>
                </div>
                <br>
                <!-- <p>
                    To read more about it, <a href="projects/DATACOM">click here</a>.
                </p> -->
            </div>
            
    </div>

</section>



<style>
    .big-project-title-page-alt {
        display: grid;
        grid-template-columns: 1fr 2fr;
        /* background-color: #22272b; */
        /* background-color: #0f1112E6; */
        border-radius: 25px;
        /* margin-top: 1%;
        margin-bottom: 1%;
        padding: 5%; */
        align-items: center;
    }

    .big-project-description {
        display: flex;
        flex-direction: column;
        padding: 0% 5%; /* Adjust the padding as needed */
        align-content: flex-start;
    }

    .project-image-backdrop-white {
        /* background-color: #FFFFFFCC; */
        /* background-color: #000000FF; */
        background-color: #f5f5f500;
        display: flex;
        padding: 0%;
        border-radius: 5%;
        height: 100%;
        width: 100%;
    }

    img {
    object-fit: scale-down;
    /* width: 80%; */
    /* border: 10%; */
    /* border-radius: 10%; */
    padding: 5%;
    }
    @media (max-width: 60em){
        /* .big-project-title-page {
            display: flex;
            flex-direction: column;
        } */
        .big-project-title-page-alt{
            display: flex;
            flex-direction: column;
        }
    }
</style>