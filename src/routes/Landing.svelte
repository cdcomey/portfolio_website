<script>
    import * as THREE from 'three';
    import { onMount, onDestroy } from 'svelte';
    import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
    import { base } from '$app/paths';
    import {
        colors,
        createBasicScene,
        createFresnelMaterials,
        createWireframeFresnelMesh,
        disposeScene
    } from '$lib/three-utils.js';

    const cadplot = `${base}/assets/trifecta/trifecta_cad.png`;
    const pos_plot = `${base}/assets/trifecta/Trifecta_0_pos_plot.png`;
    const att_plot = `${base}/assets/trifecta/Trifecta_0_att_plot.png`;
    const cube_plot = `${base}/assets/trifecta/run_full_plot_anim.gif`;

    let container;
    let scene, camera, renderer, animationFrameId;

    const CLOUD_COUNT = 30;
    const cloudOrbitCenter = new THREE.Vector3(0, 0, 0);
    const cloudBaseAltitude = 0.20;
    const cloudLinearSpeed = 0.01;
    const cloudScale = 0.08;
    const cloudRadii = [
        0.45, 0.72, 0.58, 0.88, 0.63, 0.78, 0.51, 0.95, 0.67, 0.82,
        0.49, 0.86, 0.61, 0.74, 0.92, 0.54, 0.69, 0.81, 0.57, 0.90,
        0.66, 0.43, 0.79, 0.84, 0.62, 0.97, 0.53, 0.71, 0.87, 0.60
    ];
    const cloudInitialAngles = [
        0.12, 0.85, 1.41, 2.07, 2.93, 3.31, 3.97, 4.62, 5.18, 5.84,
        0.41, 1.13, 1.78, 2.34, 2.71, 3.58, 4.21, 4.85, 5.42, 6.07,
        0.27, 0.96, 1.55, 2.22, 3.04, 3.79, 4.43, 5.05, 5.71, 6.21
    ];
    const cloudAltitudes = [
        0.04, -0.02, 0.07, -0.05, 0.01, 0.06, -0.03, 0.03, -0.06, 0.05,
       -0.04, 0.02, -0.07, 0.05, -0.01, -0.06, 0.03, -0.03, 0.06, -0.05,
        0.08, -0.08, 0.02, -0.04, 0.07, -0.07, 0.04, -0.02, 0.05, -0.05
    ];
    const cloudOrientations = [
        0.31, 1.92, 4.71, 0.84, 3.27, 5.62, 2.18, 0.05, 4.13, 1.47,
        2.85, 5.94, 0.66, 3.78, 1.21, 4.55, 2.49, 6.02, 0.97, 3.42,
        5.28, 1.74, 4.36, 0.42, 2.61, 5.05, 1.09, 3.91, 5.71, 2.33
    ];

    onMount(() => {
        const sceneSetup = createBasicScene(container, {
            fov: 30,
            cameraPosition: new THREE.Vector3(0.2, 0.4, 0.03),
            cameraTarget: new THREE.Vector3(0, 0, 0),
            useContainerSize: true
        });
        scene = sceneSetup.scene;
        camera = sceneSetup.camera;
        renderer = sceneSetup.renderer;

        const loader = new OBJLoader();
        const clock = new THREE.Clock();
        const clouds = [];

        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            const dt = clock.getDelta();
            for (const c of clouds) {
                c.angle += (cloudLinearSpeed / c.radius) * dt;
                c.group.position.set(
                    cloudOrbitCenter.x + Math.cos(c.angle) * c.radius,
                    cloudOrbitCenter.y + Math.sin(c.angle) * c.radius,
                    cloudOrbitCenter.z + cloudBaseAltitude + c.altitude
                );
            }
            renderer.render(scene, camera);
        }

        function normalizeToUnitCube(object) {
            const box = new THREE.Box3().setFromObject(object);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            const maxAxis = Math.max(size.x, size.y, size.z);
            if (maxAxis === 0) return;
            const scale = 1 / maxAxis;
            object.position.sub(center.multiplyScalar(scale));
            object.scale.multiplyScalar(scale);
        }

        loader.load(
            `${base}/assets/golden_gate_bridge.obj`,
            function(bridge_geom) {
                const bridge_group = new THREE.Group();
                bridge_geom.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        const solidWireframeMesh = createWireframeFresnelMesh(
                            child.geometry,
                            createFresnelMaterials(new THREE.Color('#ff4f00'))
                        );
                        bridge_group.add(solidWireframeMesh);
                    }
                });
                bridge_group.rotation.x = Math.PI / 2;
                normalizeToUnitCube(bridge_group);
                scene.add(bridge_group);
            },
        );

        loader.load(
            `${base}/assets/cloud_reduced.obj`,
            function(cloud_obj) {
                const cloudMaterials = createFresnelMaterials(new THREE.Color('#ffffff'));

                const cloudTemplate = new THREE.Group();
                cloud_obj.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        cloudTemplate.add(createWireframeFresnelMesh(child.geometry, cloudMaterials));
                    }
                });
                normalizeToUnitCube(cloudTemplate);

                for (let i = 0; i < CLOUD_COUNT; i++) {
                    const instance = cloudTemplate.clone(true);
                    instance.scale.multiplyScalar(cloudScale);
                    instance.rotation.z = cloudOrientations[i];

                    const radius = cloudRadii[i];
                    const angle = cloudInitialAngles[i];
                    const altitude = cloudAltitudes[i];
                    instance.position.set(
                        cloudOrbitCenter.x + Math.cos(angle) * radius,
                        cloudOrbitCenter.y + Math.sin(angle) * radius,
                        cloudOrbitCenter.z + cloudBaseAltitude + altitude
                    );

                    scene.add(instance);
                    clouds.push({ group: instance, radius, angle, altitude });
                }
            },
        );

        animate();
    });

    onDestroy(() => {
        disposeScene(scene, renderer, animationFrameId);
    });

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
        background: linear-gradient(110deg, rgba(0.0, 0.0, 0.0, 0.8) 40%, rgba(15, 17, 18, 0.0) 80%, rgba(15, 17, 18, 0.0));
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