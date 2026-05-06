<script>
    import { base } from '$app/paths';

    let profile_pic = `${base}/assets/profile_dithered.jpg`;
</script>

<section id="about">

    <div class = "about-grid">
        <div>
        <img loading="lazy" src={profile_pic} alt="Profile Picture">
        </div>
        <div class>
                <h1>About Me</h1>
                <br>
                <p>
                    Hi! I’m Charlie Comey, a backend-systems engineer and 3D graphics enthusiast. I graduated from UC Davis in 2024 with a Bachelor's degree in Computer Science, and have been pursuing a career in software engineering since. I'm a Bay Area native and long-time resident. I’m passionate about low-level systems with a focus on performance and safety.
                </p>
                <br>
                <p>
                    In the new tech industry brought about by LLM's and other AI systems, the need to handle that kind of problem is increasingly urgent. Inevitably, almost every company that lays off engineers faces a major technical crisis within six months. AI designed and built systems just can't plan at scale like that, but I can.
                </p>
                <br>
                <p>At the same time, it's never been easier for anyone to create. The sheer amount of new content and use will overwhelm platforms and force users to migrate. I'm used to fixing that.</p>
                <br>
                <p>Don't get stuck in the same loop as everyone else. Hire me, and sleep better at night knowing your system is safe.</p>
        </div>
    </div>
    
</section>


<style>
    .about-grid {
    display: grid;
    /* grid-row: 1; */
    grid-template-columns: 3fr 3fr;
    padding: 5%;
    align-items: left;
  }

  .about-grid img {
    object-fit: scale-down;
    width: 80%;
    border: 10%;
    border-radius: 10%;
    padding: 5%;
  }

  .shaded-background-about {
    background-color: #0f1112CC;
    /* display: flex; */
    /* flex-direction: row; */
    padding: 5%;
    border-radius: 20px;
  }

</style>