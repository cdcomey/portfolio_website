<script>
    import { base } from '$app/paths';
    import Header from '../../Header.svelte';
    import ProjectSection from '$lib/ProjectSection.svelte';
    import ProjectSectionBigPic from '$lib/ProjectSectionBigPic.svelte';

    const cubes = `${base}/assets/cubes.mp4`;
    const bridge = `${base}/assets/bridge.mp4`;
</script>

<Header></Header>

<section class="high-level-description centered">

    <ProjectSectionBigPic>
        <div slot="description">
            <h1>DATACOM Graphics Engine</h1>
            <!-- <h3>Visual Command and Control Terminal for Air and Space</h3>
            <h4>Ongoing</h4> -->
            <hr width="100%">
            <p>The render pipeline is built around winit, for window management, and WGPU for everything else. We create a State object to manage wgpu objects.</p>
            <br>
            <p>Once the scene file has been constructed, we initialize our primary wgpu objects that will be used to interface with the GPU. These include:</p>
            <ul>
                <li>The window, using winit</li>
                <li>A wgpu Surface attached to the window, where the graphics will be displayed</li>
                <li>A Device, which creates the primary GPU interface, including buffers, bind groups, commands, and samplers to be sent</li>
                <li>A Queue, which will send buffers and commands to the GPU</li>
                <li>A SurfaceConfiguration for metadata</li>
                <li>A binding for group layouts for various matrices to be passed into shaders</li>
                <li>Other layouts for various render pipelines</li>
                <li>A Scene object, containing data like viewports and entities gathered from the scene file</li>
                <li>A depth texture, to be used for depth stencils</li>
            </ul>
            
            
        </div>
        <div slot="image">
            <video loading="lazy" src={bridge} autoplay loop muted playsinline></video>
        </div>
    </ProjectSectionBigPic>


    <ProjectSection imagePosition="right">
        <div slot="description">
        <h1>Shaders</h1>
        <!-- <hr width="1%"> -->
            <p>Many of the objects have different rendering requirements, and so require their own shaders and render pipelines. There is a lot of overlap between them, though. Each pipeline needs a set of bind groups, which are matrices to be passed into the shaders. The main four we use are for the camera, each model’s transform matrix, the texture and sampler for text, and a transform matrix for UI elements. The layouts for these bind groups are created in the state, and will be passed around to the relevant objects to construct the actual bind groups.</p>
            <br>
            <p>All shaders in DATACOM are divided into four categories. There is the standard wireframe shader for models, of which all other shaders are derivative. It uses the camera and transform matrices. A second shader is for a solid black model of every wireframe, which provides the 'solid' wireframe appearance. It is the same as the wirefram shader, but does not require a color input. The terrain shader differs in that it uses floor function to closely follow below the camera. This creates the illusion of an infinitely spanning terrain. The final shader, for text, differs by requiring texture coordinates of the rendered font, and uses a purpose-built 2D transform matrix instead of the  3D camera transform.</p>
            <br>
        </div>

    </ProjectSection>

    <ProjectSection imagePosition="right">
        <div slot="description">
            <h1>Rendering Pipelines</h1>
            <p>Now that we've got our shaders, we'll render each element through one of a few rendering pipelines. Most objects will use a common rendering pipeline, but text rendering needs its own layout. It's a UI element, and so will not a camera transform, but will instead use a 2D transform matrix to move it to the correct position on screen.</p>
            <br>
            <p> Most objects use the solid wireframe rendering pipeline, which renders each object twice to achieve the 'solid wireframe' effect. The object is first rendered as a solid black model with no lighting, to make each surface opaque. The wireframes are then rendered on top of the object. There is a seperate 2D rendering pipeline for other UI and graphical elements, such as progress bars, lines, and text.</p>
            <br>
            <p>To prevent z-fighting on these double-rendered objects, we also need to add depth stencils. There are three: one for the solid objects, one for other 3D objects, like the wireframes, and one for UI elements, which will always sit on top.</p>
        </div>
        
    </ProjectSection>

    <ProjectSection imagePosition="right">
        <div slot="description">
            <h1>Scene Assembly</h1>
            <p>The scene is constructed by first gathering all elements to be rendered: entity models, terrain,  text, and helper axes displayed at the origin.</p>
            <br>
            <p>Within the scene file are components to assemble the model for each entity, given a list of necessary object files. Upon being created, each entity reads its associated obj files and loads the data into vertex and index buffers, containing vertex data and indices of objects, with a position and color within the scene. These buffers are stored as Mesh objects within the entity. The meshes are used to build a bind group to be passed into a shader. The Axes and Terrain objects are fairly similar, but do not require a object file, and are instead generated programmatically. Several of the terrain’s attributes, like its position or color, can be optionally specified in the scene file, using a Config object.</p>
            <br>
            <p>Text generation is more complex, and will have it's own article. Each character is drawn like a model, with an image of the font being sampled as the texture and placed onto a rectangle. Each character requires it's own struct and their own shaders.</p>
            <br>
            <p>The last order of business is the viewports. If we want multiple camera angles on the same scene, we can divide the screen into seperate viewports. Each viewport has its own camera and a border to distinguish them from other viewports. Viewport settings are defined in the <b>scene file</b>. Each viewport draws the scene within its window using that viewport’s camera.</p>
            <br>
            <p>Once all these elements are ready, we construct the scene in the window. We run an event loop, which handles device events like key and mouse action, and window events, like resizing and closing. It also handles redraw requests, which happen every frame. We use the device to create a command encoder, which contains a RenderPass. Each object that needs to be drawn has a turn setting its bind groups and render pipeline, then calling RenderPipeline::draw_indexed(). These calls are stored in the encoder, which is then submitted through the queue to the GPU to be executed.</p>
        </div>
        <div slot="image">
            <video loading="lazy" src={cubes} autoplay loop muted playsinline></video>
        </div>
    </ProjectSection>


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


    ul {
    display: block;
    list-style-type: disc;
    margin-top: 1em;
    margin-bottom: 1 em;
    margin-left: 0;
    margin-right: 0;
    padding-left: 40px;
    }

</style>
