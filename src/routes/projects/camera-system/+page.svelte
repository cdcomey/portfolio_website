<script>
    import Header from '../../Header.svelte';
    import ProjectSection from '$lib/ProjectSection.svelte';
</script>

<Header></Header>

<section class="high-level-description centered">

    <ProjectSection imagePosition="none">
        <div slot="description">
            <h1>Dynamic, Flexible Camera System</h1>
            <hr width="100%">
            <p>Scenes can have multiple cameras, each with its own viewport. More precisely, a viewport contains a camera name, used for functions to target cameras, a camera controller, containing the camera itself and its behaviors, and a camera projection. Currently, viewports (and therefore cameras) are set upon scene construction, and cannot be added to or destroyed mid-run. The user can only control one camera at a time, brought into focus by clicking its viewport.</p>
        </div>
    </ProjectSection>

    <ProjectSection imagePosition="none">
        <div slot="description">
            <h1>Camera Behaviors</h1>
            <p>Cameras use two behaviors, one for position (ie where the camera is) and another for rotation (ie where the camera is looking). They ended up being a lot like the behaviors for models, so they’re treated similarly in the render and update functions. In State::update(), the camera transforms are updated right after the models’ transforms are. The camera’s rotation is also updated after its position, which is important for rotational behaviors that depend on its position. The positional behaviors are as follows:</p>
            <ul>
                <li><b>Streamed(Stream stream)</b>: a server will be sending transform data through a network to the client. Each packet has metadata assigning it to a certain camera, and will be stored in a ring buffer. Every frame, the camera will attempt to consume the next appropriate element of the buffer, and move to the position indicated by the data. Packets will be of a standard size, and contain room for both positional and rotational data. Cameras will attempt to move once per frame, but will move as data comes in, so will stall if there’s a lapse in transmission.</li>
                <li><b>Orbit(speed, point, distance, axis)</b>: constantly orbits around a point, at a constant (linear, not rotational) speed and direction. To start, it calculates the axis of rotation, by taking the cross product of the vector from the point to the camera, and of the direction field. Every timestep, we take the vector from the point to the camera, rotate it slightly forward, and set the camera’s new position to be at the end of that new vector. This direct assignment is to prevent the camera’s orbit from decaying over long periods of time.</li>
                <li><b>FreeRoam(speed)</b>: the original camera movement method. The camera can be moved in six directions with the keyboard. Left-right movement is relative to the camera’s rotation, but up-down and forward-backward movement are absolute. This is to make it more intuitive to move around while looking up or down.</li>
                <li><b>TrackingEntity(target, distance, direction)</b>: follows a moving object, offset by a certain direction and distance. The offset is absolute, so tracking a spinning object does not cause the camera to flip around wildly.</li>
            </ul>
            <br>
            <p>The rotational behaviors are as follows:</p>
            <ul>
                <li><b>Streamed(source, stream)</b>: similar to the positional version. Positional and rotational data are assigned to distinct buffers, though they are read from the same packets.</li>
                <li><b>FocusedOnPoint(target)</b>: look at a point. Calculate forward and right vectors, then calculate the up vector using the first two.</li>
                <li><b>FocusedOnEntity(target)</b>: similar to the above, but looking at an entity instead.</li>
                <li><b>UserControlled(sensitivity)</b>: click and drag the mouse to look around. There is no pitch clamp, allowing the camera to loop. This is because the pitch-clamp can get in the way of bird’s eye or worm’s eye views.</li>
                <li><b>AboutOwnAxis(axis, speed)</b>: the camera spins about an axis at a certain speed, in a local direction.</li>
            </ul>
        </div>
    </ProjectSection>

    <ProjectSection imagePosition="none">
        <div slot="description">
            <h1>Combining Behaviors</h1>
            <p>By combining camera behaviors in the right way, we can produce exciting ways of viewing a scene. A camera whose position follows an entity, but whose rotation is user controlled, produces an on-rails experience, where the user can examine the view set up for them at their leisure. A camera whose position is user controlled, but whose rotation is focused on a point or entity, allows the user to examine that point from any angle. By placing a tracking camera inside the object it’s tracking, we can take the perspective of the object, allowing for immersive first-person experiences. A camera rotating about its axis can give us a cinematic 360-degree view of a scene. And of course, cameras that change transform from streamed data can be manipulated in an unlimited number of ways, allowing for custom, dynamic sequences.</p>
        </div>
    </ProjectSection>

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

    ul {
        display: block;
        list-style-type: disc;
        margin-top: 1em;
        margin-bottom: 1em;
        margin-left: 0;
        margin-right: 0;
        padding-left: 40px;
    }

    li {
        margin-bottom: 1em;
    }
</style>
