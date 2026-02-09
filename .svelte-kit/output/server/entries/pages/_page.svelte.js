import { x as ensure_array_like } from "../../chunks/index.js";
import { l as escape_html } from "../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const skills = [
      {
        category: "Languages",
        items: [
          "Java",
          "Python",
          "Rust",
          "JavaScript / TypeScript",
          "C / C++",
          "SQL"
        ]
      },
      {
        category: "Technologies",
        items: ["React", "Jest", "PyTorch", "WGPU", "RedwoodJS"]
      },
      {
        category: "Platforms",
        items: ["Windows", "macOS", "Ubuntu", "CI/CD", "TCP Networking"]
      },
      {
        category: "Domains",
        items: [
          "3D Graphics & Rendering",
          "AI / ML",
          "Robotics Interfaces",
          "Fintech / Payments"
        ]
      }
    ];
    $$renderer2.push(`<nav class="svelte-1uha8ag"><span class="nav-logo svelte-1uha8ag">CC</span> <ul class="nav-links svelte-1uha8ag"><li class="svelte-1uha8ag"><a class="svelte-1uha8ag">About</a></li> <li class="svelte-1uha8ag"><a class="svelte-1uha8ag">Projects</a></li> <li class="svelte-1uha8ag"><a class="svelte-1uha8ag">Experience</a></li> <li class="svelte-1uha8ag"><a class="svelte-1uha8ag">Skills</a></li> <li class="svelte-1uha8ag"><a class="svelte-1uha8ag">Contact</a></li></ul></nav> <section class="hero svelte-1uha8ag" id="hero"><span class="hero-badge svelte-1uha8ag">📍 UC Davis  ·  Software Developer</span> <h1 class="svelte-1uha8ag">Charles Comey <span class="line2 svelte-1uha8ag">Build. Ship. Scale.</span></h1> <p class="hero-sub svelte-1uha8ag">I build robust software — from real-time 3D robotics interfaces to interactive tools — with a focus on performance, clean architecture, and cross-platform compatibility.</p> <div class="hero-cta svelte-1uha8ag"><a href="mailto:charlesdcomey@gmail.com" class="btn btn-primary svelte-1uha8ag">Get in Touch</a> <a class="btn btn-ghost svelte-1uha8ag">View Projects</a></div></section> <section id="about" class="svelte-1uha8ag"><div class="reveal svelte-1uha8ag"><span class="section-label svelte-1uha8ag">About Me</span> <h2 class="section-title svelte-1uha8ag">A developer who ships.</h2></div> <div class="about-grid svelte-1uha8ag"><div class="about-text reveal svelte-1uha8ag"><p class="svelte-1uha8ag">I'm a <strong class="svelte-1uha8ag">B.S. Computer Science graduate</strong> from UC Davis (3.52 GPA), passionate about building software that pushes boundaries — especially at the intersection of <strong class="svelte-1uha8ag">graphics, networking, and robotics</strong>.</p> <p class="svelte-1uha8ag">My work spans low-level graphics pipelines in Rust all the way up to user-facing interactive tools. I care about writing code that's <strong class="svelte-1uha8ag">performant, maintainable, and genuinely useful.</strong></p></div> <div class="about-stats stagger svelte-1uha8ag"><div class="stat-card reveal svelte-1uha8ag"><div class="stat-num svelte-1uha8ag">3.52</div> <div class="stat-label svelte-1uha8ag">GPA — UC Davis</div></div> <div class="stat-card reveal svelte-1uha8ag"><div class="stat-num svelte-1uha8ag">3998<span style="font-size:1rem" class="svelte-1uha8ag">%</span></div> <div class="stat-label svelte-1uha8ag">Performance Gain</div></div> <div class="stat-card reveal svelte-1uha8ag"><div class="stat-num svelte-1uha8ag">6+</div> <div class="stat-label svelte-1uha8ag">Languages</div></div> <div class="stat-card reveal svelte-1uha8ag"><div class="stat-num svelte-1uha8ag">2</div> <div class="stat-label svelte-1uha8ag">Open-Source Projects</div></div></div></div></section> <section id="projects" class="svelte-1uha8ag"><div class="reveal svelte-1uha8ag"><span class="section-label svelte-1uha8ag">Projects</span> <h2 class="section-title svelte-1uha8ag">Things I've Built</h2> <p class="section-desc svelte-1uha8ag">Open-source projects that demonstrate how I approach complex engineering problems end-to-end.</p></div> <div class="featured-project reveal svelte-1uha8ag"><div class="featured-visual svelte-1uha8ag"><div class="orbit slow svelte-1uha8ag"><div class="orbit-dot svelte-1uha8ag"></div></div> <div class="orbit svelte-1uha8ag"><div class="orbit-dot svelte-1uha8ag"></div></div> <div class="datacom-icon svelte-1uha8ag"><svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-1uha8ag"><path d="M6 36 L14 24 L22 30 L30 16 L38 22 L46 10" stroke="#3b82f6" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" class="svelte-1uha8ag"></path><circle cx="46" cy="10" r="3" fill="#3b82f6" class="svelte-1uha8ag"></circle></svg></div></div> <div class="featured-content svelte-1uha8ag"><span class="featured-tag svelte-1uha8ag"><span class="dot svelte-1uha8ag"></span> Featured Project — Ongoing</span> <h3 class="svelte-1uha8ag">DATACOM</h3> <div class="perf-badge svelte-1uha8ag">⚡ 3998% faster after pipeline rewrite</div> <p class="svelte-1uha8ag">A general-purpose, open-source 3D visualization engine built in <strong style="color:var(--clr-text-bright)" class="svelte-1uha8ag">Rust + WGPU</strong>. DATACOM is a source-agnostic, cross-platform command &amp; control interface for robotics — supporting real-time multi-telemetry swarm control out of the box.</p> <div class="tag-row svelte-1uha8ag"><span class="tag svelte-1uha8ag">Rust</span> <span class="tag svelte-1uha8ag">WGPU</span> <span class="tag svelte-1uha8ag">3D Graphics</span> <span class="tag svelte-1uha8ag">Robotics</span> <span class="tag svelte-1uha8ag">TCP / Networking</span></div> <a href="https://github.com/cdcomey/DATACOM" class="btn btn-ghost svelte-1uha8ag" style="align-self:flex-start;">GitHub →</a></div></div> <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1.2rem; margin-top:1.4rem;" class="svelte-1uha8ag"><div class="project-card reveal svelte-1uha8ag"><div class="project-date svelte-1uha8ag">May 2020 – May 2025</div> <h4 class="svelte-1uha8ag">Interactive US History Timeline</h4> <p class="svelte-1uha8ag">An open-source Java Swing study tool that lets users build fully custom interactive timelines — adding events, periods, tags, images, and descriptions.</p> <div class="tag-row svelte-1uha8ag" style="margin-top:1rem;"><span class="tag svelte-1uha8ag">Java</span> <span class="tag svelte-1uha8ag">Swing</span> <span class="tag svelte-1uha8ag">Open Source</span></div></div></div></section> <section id="experience" class="svelte-1uha8ag"><div class="reveal svelte-1uha8ag"><span class="section-label svelte-1uha8ag">Experience</span> <h2 class="section-title svelte-1uha8ag">Work &amp; Education</h2></div> <div class="exp-card reveal svelte-1uha8ag" style="margin-bottom:1.2rem;"><div class="exp-header svelte-1uha8ag"><h4 class="svelte-1uha8ag">Software Intern</h4> <span class="exp-date svelte-1uha8ag">Jul 2023 – Sep 2023</span></div> <div class="exp-company svelte-1uha8ag">Avtal — Digital Collections Company</div> <p class="svelte-1uha8ag">Designed and implemented automated test suites in TypeScript using RedwoodJS and Jest to validate user authentication and sign-up flows for a fintech startup modernizing payment-collection compliance. Worked independently on test-case development while receiving regular feedback from my supervisor.</p></div> <div class="edu-card reveal svelte-1uha8ag"><div class="svelte-1uha8ag"><h4 class="svelte-1uha8ag">B.S. Computer Science</h4> <div class="edu-school svelte-1uha8ag">University of California, Davis</div></div> <div class="edu-right svelte-1uha8ag"><div class="gpa svelte-1uha8ag">3.52 <span class="svelte-1uha8ag">/ 4.0</span></div> <div class="edu-date svelte-1uha8ag">Sep 2020 – Jun 2024</div></div></div></section> <section id="skills" class="svelte-1uha8ag"><div class="reveal svelte-1uha8ag"><span class="section-label svelte-1uha8ag">Skills</span> <h2 class="section-title svelte-1uha8ag">Tech Stack</h2> <p class="section-desc svelte-1uha8ag">A versatile toolkit built across coursework, internships, and personal projects.</p></div> <div class="skills-grid stagger svelte-1uha8ag"><!--[-->`);
    const each_array = ensure_array_like(skills);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let group = each_array[$$index_1];
      $$renderer2.push(`<div class="skill-group reveal svelte-1uha8ag"><h5 class="svelte-1uha8ag">${escape_html(group.category)}</h5> <ul class="svelte-1uha8ag"><!--[-->`);
      const each_array_1 = ensure_array_like(group.items);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let item = each_array_1[$$index];
        $$renderer2.push(`<li class="svelte-1uha8ag">${escape_html(item)}</li>`);
      }
      $$renderer2.push(`<!--]--></ul></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section id="contact" style="padding-bottom:3rem;" class="svelte-1uha8ag"><div class="contact-strip reveal svelte-1uha8ag"><h3 class="svelte-1uha8ag">Let's Work Together</h3> <p class="svelte-1uha8ag">I'm currently open to junior developer roles. Shoot me a message — I'd love to chat.</p> <div class="contact-links svelte-1uha8ag"><a href="mailto:charlesdcomey@gmail.com" class="btn btn-primary svelte-1uha8ag">Email Me</a> <a href="#" class="btn btn-ghost svelte-1uha8ag">LinkedIn</a> <a href="#" class="btn btn-ghost svelte-1uha8ag">GitHub</a></div></div></section> <footer class="svelte-1uha8ag"><p class="svelte-1uha8ag">© 2025 Charles Comey — Built with SvelteKit</p></footer>`);
  });
}
export {
  _page as default
};
