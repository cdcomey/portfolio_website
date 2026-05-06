<script>

</script>

<!-- <section>

    <div class="landing-class-grid-split">
        <div>
            <p>charliecomey@freelance<p>
        </div>
        <div></div>
        <div></div>

        <div>
            <p>software engineer</p>
            <p>previously@avtal</p>
        </div>
        <div class='blank-space'></div>
        <div class='blank-space'></div>
        <div class='blank-space'></div>
        <div class='blank-space'></div>

        <div>
            <p>education</p>
        </div>
        <div><br></div>
        <div><br></div>
        <div>
            <p>B.S. UC Davis</p>
            <p>GPA: 3.52</p>
            <p>Member: Davis Computer Science Club</p>
            <p>Member: Davis Cybersecurity Club</p> 
        </div>

        <div class='blank-space'></div>
        <div class='blank-space'></div>
        <div class='blank-space'></div>
        <div class='blank-space'></div>

        <div>
            <p>key_skills</p>
        </div>
        <div><br></div>
        <div><br></div>
        <div>
            <p>rust</p>
            <p>c/c++</p>
            <p>sql</p>
            <p>3d graphics pipelining and rendering</p>
            <p>ai/ml</p>
            <p>network-focused graphics architecture</p>
        </div>
        
        

    </div>



</section> -->


<section class="landing-page" id="landing">

    <!-- <img class="landing-background-animation" src={background_animation}/> -->
    <!-- <canvas id="bg"></canvas> -->

    <div bind:this={container} class="scene-container"></div>
    <div class="landing-background-gradient-overlay"></div>
    <div class="landing-background-gradient-overlay-bottom"></div>
    <div>
            <!-- <h1>JACK RHYS COMEY</h1> -->
            <h1>Charlie Comey</h1>
            <p>Software Engineer</p>
            <p>Previously at: Avtal</p>
            <!-- <p>2021 NASA ARMD University Design Challenge Winner</p> -->
    </div>
    <br>
    <div>
        <!-- <hr> -->
        <h2>EDUCATION</h2>
        <hr>
        <p>B.S. UC Davis: Computer Science</p>
        <p>GPA: 3.52</p>
        <p>Member: Davis Computer Science Club</p>
        <p>Member: Davis Cybersecurity Club</p> 
        <!-- <hr> -->
    </div>
    <br>
    <div>
        <!-- <hr> -->
        <h2>KEY SKILLS</h2>
        <hr>
        <p>Rust | C/C++ | SQL | JavaScript/TypeScript | Java </p>
        <p>3D Graphics Pipelining and Rendering |  AI/ML </p>
        <p>Network-focused graphics Architecture</p>
        <!-- <p>Modern Controller/Navigation Design</p> -->
        <!-- <hr> -->
    </div>
    <br>
    <div class="landing-page-icon-grid">
        <!-- <img width=40% src={gear_pic} alt={gear_alt}/>
        <img width=40% src={rocket_pic} alt={rocket_alt}/> -->
        <div class="empty"></div>
        <p></p>
        <p></p>
        <div class="empty"></div>
        
    </div>

    <div class="empty"></div>


</section>


<style>
    section {
        font-family: 'Courier', 'Inconsolata', 'Courier', system-ui;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 90%;
        padding: 5vh 5vw;
        display: flex;
        align-items: flex-start;
        min-height: 90vh;
        text-align: center;
        justify-content: space-between;
        background: #000000;      
        overflow: hidden;        
        z-index: 0;
        position: relative;
        top: 0;
        left: 0;
    }
    
    .landing-class-grid-split{
        display: grid;
        grid-template-columns: 2fr 2fr;
        text-align: left;
        align-content: center;
        place-items: left;
        padding: 5%;
    }

    .blank-space {
        padding: 20px;
    }

    .scene-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }

    div {
        min-width: 35%;
        text-wrap: pretty;
        /* max-width: 40%; */
        /* display: flex;
        flex-direction: column; */
    }

    /* .landing-background-animation {
        position: absolute;
        top: 0;
        left: 30%;
        width: 100%;
        height: 100%;
        z-index: -2;
    } */

    hr {
        align: left;
    }
    
    .landing-background-gradient-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(110deg, rgba(15, 17, 18, 0.8) 40%, rgba(15, 17, 18, 0.0) 80%, rgba(15, 17, 18, 0.0));
        z-index: -1;
    }

    .landing-background-gradient-overlay-bottom {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(-5deg, rgba(15, 17, 18, 1), rgba(15, 17, 18, 0.2), 20%, rgba(15, 17, 18, 0) 25%, rgba(15, 17, 18, 0));
        z-index: -1;
    }

    .landing-page {
        display: flex;
        align-items: flex-start;
        min-height: 90vh;
        text-align: left;
        justify-content: space-between;
        /* background: linear-gradient(to left, rgba(32,39,49,0) 80%,
              rgba(32,39,49,1)), url(http://foo.com/image.jpg); */
        background: #000000;      
        overflow: hidden;        
        /* font-variant: small-caps; */
        z-index: 0;
        position: relative;
        top: 0;
        left: 0;
    }
    

    .landing-page-icon-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 5fr;
        /* grid-template-rows: fr 1fr; */
        width: 100%;
        text-align: center;
        align-content: left;
        place-items: center;
    }

    .landing-page h1 {
        line-height: 1.5;
        /* font-family: 'JetBrains Mono', monospace; */
        /* font-weight: bold; */
        /* font-variant: small-caps; */
        color: #FFFFFF;
    }

    .landing-page h2 {
        /* line-height: 1.5; */
        /* font-family: 'JetBrains Mono', monospace; */
        font-weight: bold;
        /* font-variant: small-caps; */
        color: #FFFFFF;
    }

    .landing-page p {
        /* font-family: 'JetBrains Mono', monospace; */
        /* font-family: 'Helvetica', sans-serif; */
        color: #FFFFFF;
    }

    /* @font-face {
        font-family: 'JetBrains Mono';
        src: url('https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/web/woff2/JetBrainsMono-Bold.woff2') format('woff2'),
            url('https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/web/woff/JetBrainsMono-Bold.woff') format('woff');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
    } */


</style>