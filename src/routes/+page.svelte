<script>
  import { onMount } from 'svelte';

  // ─── Data ──────────────────────────────────
  const skills = [
    { category: 'Languages',     items: ['Java','Python','Rust','JavaScript / TypeScript','C / C++','SQL'] },
    { category: 'Technologies',  items: ['React','Jest','PyTorch','WGPU','RedwoodJS'] },
    { category: 'Platforms',     items: ['Windows','macOS','Ubuntu','CI/CD','TCP Networking'] },
    { category: 'Domains',       items: ['3D Graphics & Rendering','AI / ML','Robotics Interfaces','Fintech / Payments'] }
  ];

  // ─── Scroll-reveal ────────────────────────
  let revealEls = [];

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  });

  // ─── Smooth nav scroll ─────────────────────
  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<!-- ════════════════════════════════════════════════
     GLOBAL STYLES
     ════════════════════════════════════════════════ -->
<style>
  /* ─── Reveal animation ─── */
  :global(.reveal) {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s cubic-bezier(.4,0,.2,1),
                transform 0.7s cubic-bezier(.4,0,.2,1);
  }
  :global(.reveal.revealed) {
    opacity: 1;
    transform: translateY(0);
  }

  /* stagger children */
  .stagger .reveal:nth-child(1) { transition-delay: 0.05s; }
  .stagger .reveal:nth-child(2) { transition-delay: 0.13s; }
  .stagger .reveal:nth-child(3) { transition-delay: 0.21s; }
  .stagger .reveal:nth-child(4) { transition-delay: 0.29s; }
  .stagger .reveal:nth-child(5) { transition-delay: 0.37s; }
  .stagger .reveal:nth-child(6) { transition-delay: 0.45s; }

  /* ─── NAV ─── */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.1rem 2rem;
    background: rgba(10,14,26,.75);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--clr-border);
  }
  .nav-logo {
    font-family: var(--font-display);
    font-size: 1.4rem;
    letter-spacing: .06em;
    color: var(--clr-text-bright);
  }
  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }
  .nav-links a {
    font-size: .88rem;
    font-weight: 500;
    color: var(--clr-text-dim);
    letter-spacing: .04em;
    text-transform: uppercase;
    transition: color var(--transition);
    cursor: pointer;
  }
  .nav-links a:hover { color: var(--clr-accent); }

  /* ─── HERO ─── */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 6rem 1.5rem 4rem;
    overflow: hidden;
  }
  /* ambient glow blobs */
  .hero::before, .hero::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: .25;
    pointer-events: none;
  }
  .hero::before {
    width: 500px; height: 500px;
    background: var(--clr-accent);
    top: -120px; left: -100px;
  }
  .hero::after {
    width: 400px; height: 400px;
    background: #6366f1;
    bottom: -80px; right: -80px;
  }

  .hero-badge {
    display: inline-block;
    background: var(--clr-surface-2);
    border: 1px solid var(--clr-border);
    color: var(--clr-accent);
    font-size: .82rem;
    font-weight: 500;
    letter-spacing: .08em;
    text-transform: uppercase;
    padding: .4rem 1rem;
    border-radius: 999px;
    margin-bottom: 1.4rem;
    animation: fadeDown .8s .2s both;
  }
  @keyframes fadeDown {
    from { opacity:0; transform: translateY(-14px); }
    to   { opacity:1; transform: translateY(0); }
  }

  .hero h1 {
    font-family: var(--font-display);
    font-size: clamp(3.2rem, 9vw, 7.5rem);
    line-height: 1;
    letter-spacing: -.02em;
    color: var(--clr-text-bright);
    animation: fadeUp .9s .3s both;
  }
  .hero h1 .line2 {
    display: block;
    color: var(--clr-accent);
  }

  .hero-sub {
    max-width: 560px;
    margin: 1.6rem auto 0;
    font-size: 1.05rem;
    color: var(--clr-text-dim);
    font-weight: 300;
    line-height: 1.7;
    animation: fadeUp .9s .5s both;
  }

  .hero-cta {
    margin-top: 2.6rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    animation: fadeUp .9s .65s both;
  }

  @keyframes fadeUp {
    from { opacity:0; transform: translateY(20px); }
    to   { opacity:1; transform: translateY(0); }
  }

  /* ─── BUTTONS ─── */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    padding: .7rem 1.6rem;
    border-radius: var(--radius);
    font-family: var(--font-body);
    font-size: .92rem;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: transform var(--transition), box-shadow var(--transition), background var(--transition);
  }
  .btn:hover { transform: translateY(-2px); }

  .btn-primary {
    background: var(--clr-accent);
    color: #fff;
    box-shadow: 0 4px 20px var(--clr-accent-glow);
  }
  .btn-primary:hover { box-shadow: 0 6px 32px var(--clr-accent-glow); }

  .btn-ghost {
    background: transparent;
    color: var(--clr-text);
    border: 1px solid var(--clr-border);
  }
  .btn-ghost:hover { border-color: var(--clr-accent); color: var(--clr-accent); }

  /* ─── SECTIONS ─── */
  section {
    padding: 7rem 1.5rem;
    max-width: 1050px;
    margin: 0 auto;
  }
  .section-label {
    font-size: .78rem;
    font-weight: 500;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--clr-accent);
    margin-bottom: .6rem;
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3rem);
    color: var(--clr-text-bright);
    letter-spacing: .02em;
    margin-bottom: 1rem;
  }
  .section-desc {
    max-width: 560px;
    color: var(--clr-text-dim);
    font-weight: 300;
    margin-bottom: 3rem;
  }

  /* ─── ABOUT STRIP ─── */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }
  .about-text p {
    color: var(--clr-text-dim);
    font-weight: 300;
    margin-bottom: 1rem;
    line-height: 1.8;
  }
  .about-text p strong { color: var(--clr-text-bright); font-weight: 500; }

  .about-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
  }
  .stat-card {
    background: var(--clr-surface);
    border: 1px solid var(--clr-border);
    border-radius: var(--radius);
    padding: 1.5rem;
    transition: border-color var(--transition), transform var(--transition);
  }
  .stat-card:hover {
    border-color: var(--clr-accent);
    transform: translateY(-3px);
  }
  .stat-num {
    font-family: var(--font-display);
    font-size: 2.2rem;
    color: var(--clr-accent);
    line-height: 1;
  }
  .stat-label {
    font-size: .82rem;
    color: var(--clr-text-dim);
    margin-top: .35rem;
  }

  /* ─── FEATURED PROJECT (DATACOM) ─── */
  .featured-project {
    background: var(--clr-surface);
    border: 1px solid var(--clr-border);
    border-radius: 18px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    min-height: 420px;
  }
  .featured-visual {
    background: linear-gradient(135deg, #0f1a2e 0%, #1a2744 50%, #0f1a2e 100%);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    min-height: 300px;
  }
  /* Grid lines */
  .featured-visual::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(59,130,246,.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,.12) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  /* Central hex icon placeholder */
  .datacom-icon {
    position: relative;
    z-index: 1;
    width: 110px; height: 110px;
    border: 2px solid var(--clr-accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 40px var(--clr-accent-glow), inset 0 0 30px rgba(59,130,246,.08);
    animation: pulse 3s ease-in-out infinite;
  }
  .datacom-icon svg { width: 52px; height: 52px; }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 40px var(--clr-accent-glow), inset 0 0 30px rgba(59,130,246,.08); }
    50%      { box-shadow: 0 0 60px var(--clr-accent-glow), inset 0 0 50px rgba(59,130,246,.15); }
  }
  /* orbit dots */
  .orbit {
    position: absolute;
    width: 200px; height: 200px;
    border: 1px solid rgba(59,130,246,.2);
    border-radius: 50%;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    animation: spin 12s linear infinite;
  }
  .orbit.slow { animation-duration: 18s; width: 260px; height: 260px; }
  .orbit-dot {
    position: absolute;
    width: 10px; height: 10px;
    background: var(--clr-accent);
    border-radius: 50%;
    top: -5px; left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 8px var(--clr-accent);
  }
  @keyframes spin { to { transform: translate(-50%,-50%) rotate(360deg); } }

  .featured-content {
    padding: 2.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .featured-tag {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    font-size: .78rem;
    font-weight: 500;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: var(--clr-accent);
    margin-bottom: 1rem;
  }
  .featured-tag .dot {
    width: 7px; height: 7px;
    background: var(--clr-accent);
    border-radius: 50%;
    animation: blink 1.8s ease-in-out infinite;
  }
  @keyframes blink {
    0%,100% { opacity:1; } 50% { opacity:.3; }
  }
  .featured-content h3 {
    font-family: var(--font-display);
    font-size: 2.2rem;
    color: var(--clr-text-bright);
    letter-spacing: .03em;
    margin-bottom: .8rem;
  }
  .featured-content p {
    color: var(--clr-text-dim);
    font-weight: 300;
    line-height: 1.75;
    margin-bottom: 1.2rem;
  }
  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    margin-bottom: 1.6rem;
  }
  .tag {
    background: var(--clr-surface-2);
    border: 1px solid var(--clr-border);
    color: var(--clr-text-dim);
    font-size: .78rem;
    padding: .3rem .75rem;
    border-radius: 999px;
  }
  .perf-badge {
    display: inline-flex;
    align-items: center;
    gap: .4rem;
    background: rgba(59,130,246,.1);
    border: 1px solid rgba(59,130,246,.3);
    color: var(--clr-accent);
    font-size: .82rem;
    font-weight: 500;
    padding: .35rem .8rem;
    border-radius: var(--radius-sm);
    margin-bottom: .8rem;
  }

  /* ─── OTHER PROJECTS ─── */
  .project-card {
    background: var(--clr-surface);
    border: 1px solid var(--clr-border);
    border-radius: var(--radius);
    padding: 2rem;
    transition: border-color var(--transition), transform var(--transition);
  }
  .project-card:hover {
    border-color: var(--clr-accent);
    transform: translateY(-4px);
  }
  .project-card h4 {
    font-family: var(--font-display);
    font-size: 1.35rem;
    color: var(--clr-text-bright);
    margin-bottom: .5rem;
    letter-spacing: .03em;
  }
  .project-card p {
    color: var(--clr-text-dim);
    font-weight: 300;
    font-size: .92rem;
    line-height: 1.7;
  }
  .project-date {
    font-size: .78rem;
    color: var(--clr-text-dim);
    margin-bottom: .8rem;
  }

  /* ─── EXPERIENCE ─── */
  .exp-card {
    background: var(--clr-surface);
    border: 1px solid var(--clr-border);
    border-radius: var(--radius);
    padding: 2rem 2.2rem;
    position: relative;
  }
  .exp-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: var(--clr-accent);
    border-radius: 3px 0 0 3px;
  }
  .exp-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: .5rem;
    margin-bottom: .7rem;
  }
  .exp-header h4 {
    font-family: var(--font-display);
    font-size: 1.35rem;
    color: var(--clr-text-bright);
    letter-spacing: .03em;
  }
  .exp-header .exp-date {
    font-size: .8rem;
    color: var(--clr-text-dim);
  }
  .exp-company {
    font-size: .9rem;
    color: var(--clr-accent);
    font-weight: 500;
    margin-bottom: .6rem;
  }
  .exp-card p {
    color: var(--clr-text-dim);
    font-weight: 300;
    font-size: .92rem;
    line-height: 1.7;
  }

  /* ─── EDUCATION ─── */
  .edu-card {
    background: var(--clr-surface);
    border: 1px solid var(--clr-border);
    border-radius: var(--radius);
    padding: 2rem 2.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .edu-card h4 {
    font-family: var(--font-display);
    font-size: 1.35rem;
    color: var(--clr-text-bright);
    letter-spacing: .03em;
  }
  .edu-card .edu-school {
    font-size: .92rem;
    color: var(--clr-accent);
    margin-top: .15rem;
  }
  .edu-right {
    text-align: right;
  }
  .edu-right .gpa {
    font-family: var(--font-display);
    font-size: 1.6rem;
    color: var(--clr-text-bright);
  }
  .edu-right .gpa span { color: var(--clr-text-dim); font-family: var(--font-body); font-size: .85rem; }
  .edu-right .edu-date { font-size: .8rem; color: var(--clr-text-dim); margin-top: .2rem; }

  /* ─── SKILLS ─── */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.2rem;
  }
  .skill-group {
    background: var(--clr-surface);
    border: 1px solid var(--clr-border);
    border-radius: var(--radius);
    padding: 1.6rem;
    transition: border-color var(--transition);
  }
  .skill-group:hover { border-color: var(--clr-accent); }
  .skill-group h5 {
    font-size: .78rem;
    font-weight: 500;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: var(--clr-accent);
    margin-bottom: .9rem;
  }
  .skill-group ul {
    list-style: none;
  }
  .skill-group li {
    color: var(--clr-text-dim);
    font-size: .9rem;
    padding: .35rem 0;
    border-bottom: 1px solid var(--clr-border);
    font-weight: 300;
  }
  .skill-group li:last-child { border-bottom: none; }

  /* ─── CONTACT ─── */
  .contact-strip {
    background: var(--clr-surface);
    border: 1px solid var(--clr-border);
    border-radius: 18px;
    padding: 4rem 2rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .contact-strip::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(59,130,246,.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .contact-strip h3 {
    font-family: var(--font-display);
    font-size: 2.4rem;
    color: var(--clr-text-bright);
    letter-spacing: .03em;
    margin-bottom: .6rem;
    position: relative;
  }
  .contact-strip p {
    color: var(--clr-text-dim);
    font-weight: 300;
    max-width: 480px;
    margin: 0 auto 2rem;
    position: relative;
  }
  .contact-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    position: relative;
  }

  /* ─── FOOTER ─── */
  footer {
    text-align: center;
    padding: 2.5rem 1.5rem;
    border-top: 1px solid var(--clr-border);
    color: var(--clr-text-dim);
    font-size: .82rem;
  }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 720px) {
    nav { padding: .9rem 1.2rem; }
    .nav-links { gap: 1rem; }
    .nav-links a { font-size: .78rem; }

    .about-grid { grid-template-columns: 1fr; }
    .featured-project { grid-template-columns: 1fr; }
    .featured-visual { min-height: 240px; }
    .edu-card { flex-direction: column; text-align: left; }
    .edu-right { text-align: left; }
  }
</style>

<!-- ════════════════════════════════════════════════
     NAV
     ════════════════════════════════════════════════ -->
<nav>
  <span class="nav-logo">CC</span>
  <ul class="nav-links">
    <li><a on:click={() => scrollTo('about')}>About</a></li>
    <li><a on:click={() => scrollTo('projects')}>Projects</a></li>
    <li><a on:click={() => scrollTo('experience')}>Experience</a></li>
    <li><a on:click={() => scrollTo('skills')}>Skills</a></li>
    <li><a on:click={() => scrollTo('contact')}>Contact</a></li>
  </ul>
</nav>

<!-- ════════════════════════════════════════════════
     HERO
     ════════════════════════════════════════════════ -->
<section class="hero" id="hero">
  <span class="hero-badge">📍 UC Davis &nbsp;·&nbsp; Software Developer</span>
  <h1>
    Charles Comey
    <span class="line2">Build. Ship. Scale.</span>
  </h1>
  <p class="hero-sub">
    I build robust software — from real-time 3D robotics interfaces to interactive tools — with a focus on performance, clean architecture, and cross-platform compatibility.
  </p>
  <div class="hero-cta">
    <a href="mailto:charlesdcomey@gmail.com" class="btn btn-primary">Get in Touch</a>
    <a on:click={() => scrollTo('projects')} class="btn btn-ghost">View Projects</a>
  </div>
</section>

<!-- ════════════════════════════════════════════════
     ABOUT
     ════════════════════════════════════════════════ -->
<section id="about">
  <div class="reveal">
    <span class="section-label">About Me</span>
    <h2 class="section-title">A developer who ships.</h2>
  </div>
  <div class="about-grid">
    <div class="about-text reveal">
      <p>
        I'm a <strong>B.S. Computer Science graduate</strong> from UC Davis (3.52 GPA), passionate about building software that pushes boundaries — especially at the intersection of <strong>graphics, networking, and robotics</strong>.
      </p>
      <p>
        My work spans low-level graphics pipelines in Rust all the way up to user-facing interactive tools. I care about writing code that's <strong>performant, maintainable, and genuinely useful.</strong>
      </p>
    </div>
    <div class="about-stats stagger">
      <div class="stat-card reveal">
        <div class="stat-num">3.52</div>
        <div class="stat-label">GPA — UC Davis</div>
      </div>
      <div class="stat-card reveal">
        <div class="stat-num">3998<span style="font-size:1rem">%</span></div>
        <div class="stat-label">Performance Gain</div>
      </div>
      <div class="stat-card reveal">
        <div class="stat-num">6+</div>
        <div class="stat-label">Languages</div>
      </div>
      <div class="stat-card reveal">
        <div class="stat-num">2</div>
        <div class="stat-label">Open-Source Projects</div>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════
     PROJECTS — DATACOM FEATURED
     ════════════════════════════════════════════════ -->
<section id="projects">
  <div class="reveal">
    <span class="section-label">Projects</span>
    <h2 class="section-title">Things I've Built</h2>
    <p class="section-desc">Open-source projects that demonstrate how I approach complex engineering problems end-to-end.</p>
  </div>

  <!-- DATACOM hero card -->
  <div class="featured-project reveal">
    <div class="featured-visual">
      <!-- orbiting rings -->
      <div class="orbit slow"><div class="orbit-dot"></div></div>
      <div class="orbit"><div class="orbit-dot"></div></div>
      <!-- icon -->
      <div class="datacom-icon">
        <!-- simple "signal / wave" SVG icon -->
        <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 36 L14 24 L22 30 L30 16 L38 22 L46 10" stroke="#3b82f6" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="46" cy="10" r="3" fill="#3b82f6"/>
        </svg>
      </div>
    </div>
    <div class="featured-content">
      <span class="featured-tag"><span class="dot"></span> Featured Project — Ongoing</span>
      <h3>DATACOM</h3>
      <div class="perf-badge">⚡ 3998% faster after pipeline rewrite</div>
      <p>
        A general-purpose, open-source 3D visualization engine built in <strong style="color:var(--clr-text-bright)">Rust + WGPU</strong>. DATACOM is a source-agnostic, cross-platform command &amp; control interface for robotics — supporting real-time multi-telemetry swarm control out of the box.
      </p>
      <div class="tag-row">
        <span class="tag">Rust</span>
        <span class="tag">WGPU</span>
        <span class="tag">3D Graphics</span>
        <span class="tag">Robotics</span>
        <span class="tag">TCP / Networking</span>
      </div>
      <a href="https://github.com/cdcomey/DATACOM" class="btn btn-ghost" style="align-self:flex-start;">GitHub →</a>
    </div>
  </div>

  <!-- Other projects row -->
  <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1.2rem; margin-top:1.4rem;">
    <div class="project-card reveal">
      <div class="project-date">May 2020 – May 2025</div>
      <h4>Interactive US History Timeline</h4>
      <p>
        An open-source Java Swing study tool that lets users build fully custom interactive timelines — adding events, periods, tags, images, and descriptions.
      </p>
      <div class="tag-row" style="margin-top:1rem;">
        <span class="tag">Java</span>
        <span class="tag">Swing</span>
        <span class="tag">Open Source</span>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════
     EXPERIENCE + EDUCATION
     ════════════════════════════════════════════════ -->
<section id="experience">
  <div class="reveal">
    <span class="section-label">Experience</span>
    <h2 class="section-title">Work & Education</h2>
  </div>

  <div class="exp-card reveal" style="margin-bottom:1.2rem;">
    <div class="exp-header">
      <h4>Software Intern</h4>
      <span class="exp-date">Jul 2023 – Sep 2023</span>
    </div>
    <div class="exp-company">Avtal — Digital Collections Company</div>
    <p>
      Designed and implemented automated test suites in TypeScript using RedwoodJS and Jest to validate user authentication and sign-up flows for a fintech startup modernizing payment-collection compliance. Worked independently on test-case development while receiving regular feedback from my supervisor.
    </p>
  </div>

  <div class="edu-card reveal">
    <div>
      <h4>B.S. Computer Science</h4>
      <div class="edu-school">University of California, Davis</div>
    </div>
    <div class="edu-right">
      <div class="gpa">3.52 <span>/ 4.0</span></div>
      <div class="edu-date">Sep 2020 – Jun 2024</div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════
     SKILLS
     ════════════════════════════════════════════════ -->
<section id="skills">
  <div class="reveal">
    <span class="section-label">Skills</span>
    <h2 class="section-title">Tech Stack</h2>
    <p class="section-desc">A versatile toolkit built across coursework, internships, and personal projects.</p>
  </div>
  <div class="skills-grid stagger">
    {#each skills as group}
      <div class="skill-group reveal">
        <h5>{group.category}</h5>
        <ul>
          {#each group.items as item}
            <li>{item}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</section>

<!-- ════════════════════════════════════════════════
     CONTACT
     ════════════════════════════════════════════════ -->
<section id="contact" style="padding-bottom:3rem;">
  <div class="contact-strip reveal">
    <h3>Let's Work Together</h3>
    <p>I'm currently open to junior developer roles. Shoot me a message — I'd love to chat.</p>
    <div class="contact-links">
      <a href="mailto:charlesdcomey@gmail.com" class="btn btn-primary">Email Me</a>
      <a href="#" class="btn btn-ghost">LinkedIn</a>
      <a href="#" class="btn btn-ghost">GitHub</a>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════
     FOOTER
     ════════════════════════════════════════════════ -->
<footer>
  <p>© 2025 Charles Comey — Built with SvelteKit</p>
</footer>
