const features = [
  { number: "01", title: "Explore ghats", description: "Find designated river access points and practical location information.", icon: "⌖" },
  { number: "02", title: "Plan your visit", description: "Organise places you want to visit and prepare for your journey.", icon: "▤" },
  { number: "03", title: "Find facilities", description: "Look up verified accommodation, transport and essential services.", icon: "⌂" },
  { number: "04", title: "Stay informed", description: "Read clearly sourced announcements and important visitor updates.", icon: "◉" },
];
function App() {
  return <main>
    <nav className="nav container" aria-label="Main navigation">
      <a className="brand" href="#" aria-label="PushkaraConnect home"><span className="brand-mark">P</span><span>Pushkara<span className="brand-light">Connect</span></span></a>
      <div className="nav-links"><a href="#features">Explore</a><a href="#about">About</a><a className="nav-cta" href="mailto:hello@pushkaraconnect.in">Get updates <span>↗</span></a></div>
    </nav>
    <section className="hero container">
      <div className="hero-copy">
        <div className="eyebrow"><span className="live-dot" /> BUILT FOR THE GODAVARI</div>
        <h1>Every pilgrim.<br /><em>Every journey.</em><br />Connected.</h1>
        <p className="hero-description">A simpler way to prepare for Godavari Pushkaralu 2027. Discover places, find useful services and plan your visit with confidence.</p>
        <div className="hero-actions"><a className="primary-button" href="#features">Explore the platform <span>→</span></a><a className="text-link" href="#about">Why PushkaraConnect?</a></div>
        <p className="hero-note">A community-focused information platform · Andhra Pradesh & Telangana</p>
      </div>
      <div className="hero-art" aria-label="Illustration of a river at sunrise"><div className="sun" /><div className="river-label">THE GODAVARI</div><div className="river river-one" /><div className="river river-two" /><div className="river river-three" /><div className="temple">⌂</div><div className="art-caption"><span>01 / 2027</span><span>A journey of faith</span></div></div>
    </section>
    <section className="features-section" id="features"><div className="container">
      <div className="section-heading"><div><div className="eyebrow">THE PLATFORM</div><h2>Everything you need,<br /><em>in one place.</em></h2></div><p>Useful information for a more organised pilgrimage — designed around the needs of pilgrims and local communities.</p></div>
      <div className="feature-grid">{features.map((feature) => <article className="feature-card" key={feature.number}><div className="feature-top"><span>{feature.number}</span><span className="feature-icon">{feature.icon}</span></div><h3>{feature.title}</h3><p>{feature.description}</p><span className="card-arrow">↗</span></article>)}</div>
    </div></section>
    <section className="about-section container" id="about"><div className="about-mark">P.</div><div><div className="eyebrow">OUR PURPOSE</div><h2>Technology that helps<br /><em>people come together.</em></h2><p>PushkaraConnect is an independent project in development. Public information will be published only after its source and verification status are checked. It is not an official government service.</p></div></section>
    <footer className="footer container"><a className="brand" href="#"><span className="brand-mark">P</span><span>Pushkara<span className="brand-light">Connect</span></span></a><span>Made with care for the Godavari community · 2026</span></footer>
  </main>;
}
export default App;
