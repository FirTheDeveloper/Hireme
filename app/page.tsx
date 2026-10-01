const applications = [
  {
    department: "Community",
    title: "Community Moderator",
    description: "Shape a welcoming player experience across events, support, and the spaces between them.",
    tags: ["Part-time", "Remote"],
    applicants: "12 open spots",
    accent: "coral",
  },
  {
    department: "Development",
    title: "Gameplay Scripter",
    description: "Build expressive systems and memorable moments for our next Roblox experience.",
    tags: ["Contract", "Experienced"],
    applicants: "3 open spots",
    accent: "violet",
  },
  {
    department: "Creative",
    title: "Environment Artist",
    description: "Turn early sketches into places players want to get lost in, from lobby to endgame.",
    tags: ["Part-time", "Portfolio"],
    applicants: "1 open spot",
    accent: "orange",
  },
  {
    department: "Community",
    title: "Events Coordinator",
    description: "Own the rhythm of community events and make every calendar moment feel intentional.",
    tags: ["Volunteer", "Flexible"],
    applicants: "8 open spots",
    accent: "pink",
  },
];

function ArrowIcon() {
  return <span aria-hidden="true" className="arrow-icon">↗</span>;
}

export default function Home() {
  return (
    <main className="portal-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Astral home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>ASTRAL</span>
        </a>
        <div className="nav-links">
          <a href="#openings">Open applications</a>
          <a href="#about">About the group</a>
        </div>
        <a className="button button-quiet" href="#login">Sign in <ArrowIcon /></a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> ASTRAL GROUP / APPLICATIONS</p>
          <h1>Make something<br /><em>worth joining.</em></h1>
          <p className="hero-summary">We are building worlds with people who care about the details. Find an open role, tell us where you fit, and let&apos;s make the next thing together.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#openings">Explore openings <ArrowIcon /></a>
            <a className="text-link" href="#about">What we value <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="orbit-art" aria-hidden="true">
          <div className="orbit orbit-large"><span /></div>
          <div className="orbit orbit-medium"><span /></div>
          <div className="orbit orbit-small"><span /></div>
          <div className="orbit-core"><strong>A</strong></div>
          <span className="orbit-label label-one">PLAY / CREATE</span>
          <span className="orbit-label label-two">03.26</span>
        </div>
      </section>

      <section className="signal-bar" aria-label="Group overview">
        <div><span className="signal-value">04</span><span className="signal-label">open applications</span></div>
        <div><span className="signal-value">03</span><span className="signal-label">departments</span></div>
        <div><span className="signal-value">24h</span><span className="signal-label">typical response</span></div>
        <p>Roblox account required to apply <span className="verified-mark">✓</span></p>
      </section>

      <section className="openings-section" id="openings">
        <div className="section-heading">
          <div><p className="eyebrow">THE CURRENT SIGNAL</p><h2>Open applications</h2></div>
          <p className="section-note">Roles that are live right now.<br />No quiet backchannels required.</p>
        </div>
        <div className="application-grid">
          {applications.map((application, index) => (
            <article className={`application-card accent-${application.accent}`} key={application.title}>
              <div className="card-topline"><span>{application.department}</span><span>0{index + 1}</span></div>
              <h3>{application.title}</h3>
              <p>{application.description}</p>
              <div className="card-footer">
                <div className="tag-list">{application.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <span className="spots">{application.applicants}</span>
              </div>
              <a className="card-link" href="#login" aria-label={`View ${application.title} application`}>View application <ArrowIcon /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-number">01</div>
        <div>
          <p className="eyebrow">A NOTE FROM THE GROUP</p>
          <h2>Good work has a pulse.</h2>
          <p className="about-copy">Astral is a Roblox group for curious builders, careful collaborators, and people who want their work to feel alive. Our applications are built to give you room to show how you think, not just tick boxes.</p>
        </div>
        <div className="about-aside"><span>YOUR NEXT<br />CHAPTER</span><ArrowIcon /></div>
      </section>

      <footer className="footer">
        <a className="brand" href="#top"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>ASTRAL</span></a>
        <span>Applications powered by HireMe</span>
        <span>Roblox group portal · 2026</span>
      </footer>
    </main>
  );
}