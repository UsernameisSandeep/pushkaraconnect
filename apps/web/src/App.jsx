import React, { useEffect, useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const features = [
  { number: "01", title: "Explore locations", description: "Discover places being researched for the pilgrim information directory.", icon: "⌖" },
  { number: "02", title: "Plan your visit", description: "Organise places you want to visit and prepare for your journey.", icon: "▤" },
  { number: "03", title: "Find facilities", description: "Look up accommodation, transport and essential services as they are verified.", icon: "⌂" },
  { number: "04", title: "Stay informed", description: "Read sourced announcements with clear verification information.", icon: "◉" },
];

function App() {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [dataSource, setDataSource] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function loadLocations() {
      try {
        setLoading(true);
        setLoadError("");
        const response = await fetch(`${API_URL}/api/locations`, { signal: controller.signal });
        if (!response.ok) throw new Error("The locations service returned an error.");
        const result = await response.json();
        setLocations(result.data || []);
        setDataSource(result.meta?.source || "");
      } catch (error) {
        if (error.name !== "AbortError") setLoadError("We couldn't load the location directory. Please check that the API server is running.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadLocations();
    return () => controller.abort();
  }, []);

  const filteredLocations = useMemo(() => locations.filter((place) => {
    const searchable = `${place.name} ${place.district} ${place.state}`.toLowerCase();
    return searchable.includes(search.toLowerCase()) && (stateFilter === "All" || place.state === stateFilter);
  }), [locations, search, stateFilter]);

  const displayStatus = (status) => status === "RESEARCH_CANDIDATE" ? "Research candidate" : status.replaceAll("_", " ").toLowerCase();

  return <main>
    <nav className="nav container" aria-label="Main navigation">
      <a className="brand" href="#" aria-label="PushkaraConnect home"><span className="brand-mark">P</span><span>Pushkara<span className="brand-light">Connect</span></span></a>
      <div className="nav-links"><a href="#ghats">Explore</a><a href="#about">About</a><a className="nav-cta" href="mailto:hello@pushkaraconnect.in">Get updates <span>↗</span></a></div>
    </nav>

    <section className="hero container">
      <div className="hero-copy">
        <div className="eyebrow"><span className="live-dot" /> BUILT FOR THE GODAVARI</div>
        <h1>Every pilgrim.<br /><em>Every journey.</em><br />Connected.</h1>
        <p className="hero-description">A simpler way to prepare for Godavari Pushkaralu 2027. Discover places, find useful services and plan your visit with confidence.</p>
        <div className="hero-actions"><a className="primary-button" href="#ghats">Explore locations <span>→</span></a><a className="text-link" href="#about">Why PushkaraConnect?</a></div>
        <p className="hero-note">A community-focused information platform · Andhra Pradesh & Telangana</p>
      </div>
      <div className="hero-art" aria-label="Illustration of a river at sunrise"><div className="sun" /><div className="river-label">THE GODAVARI</div><div className="river river-one" /><div className="river river-two" /><div className="river river-three" /><div className="temple">⌂</div><div className="art-caption"><span>01 / 2027</span><span>A journey of faith</span></div></div>
    </section>

    <section className="features-section" id="features"><div className="container">
      <div className="section-heading"><div><div className="eyebrow">THE PLATFORM</div><h2>Everything you need,<br /><em>in one place.</em></h2></div><p>Useful information for a more organised pilgrimage — designed around the needs of pilgrims and local communities.</p></div>
      <div className="feature-grid">{features.map((feature) => <article className="feature-card" key={feature.number}><div className="feature-top"><span>{feature.number}</span><span className="feature-icon">{feature.icon}</span></div><h3>{feature.title}</h3><p>{feature.description}</p><span className="card-arrow">↗</span></article>)}</div>
    </div></section>

    <section className="directory-section" id="ghats"><div className="container">
      <div className="eyebrow">START EXPLORING</div>
      <div className="directory-heading"><div><h2>Godavari location<br /><em>research directory.</em></h2><p>Explore places currently being researched for the platform.</p></div><span className="directory-count">{filteredLocations.length} places</span></div>
      <div className="directory-notice"><strong>Important:</strong> These are research candidates, not a list of officially designated bathing ghats. Access, bathing permission, facilities and safety information must be confirmed with the relevant authorities before publication.</div>
      <div className="directory-controls">
        <label className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search place, district or state..." aria-label="Search locations" /></label>
        <div className="filter-buttons" aria-label="Filter by state">
          {["All", "Andhra Pradesh", "Telangana"].map((state) => <button key={state} className={stateFilter === state ? "filter-button active" : "filter-button"} onClick={() => setStateFilter(state)}>{state}</button>)}
        </div>
      </div>
      {loading && <p className="empty-state">Loading locations from the PushkaraConnect API…</p>}
      {loadError && <p className="empty-state" role="alert">{loadError}</p>}
      {!loading && !loadError && <div className="directory-source">Directory source: {dataSource === "postgresql" ? "PostgreSQL database" : "API sample records — database not connected yet"}</div>}
      {!loading && !loadError && <div className="location-grid">{filteredLocations.map((place) => <article className="location-card" key={place.id}>
        <div className="location-card-top"><span className="location-pin">⌖</span><span className="status-pill">{displayStatus(place.status)}</span></div>
        <h3>{place.name}</h3><p className="location-district">{place.district} · {place.state}</p><p className="location-note">{place.note}</p>
        <div className="location-card-footer">Verification pending <span>↗</span></div>
      </article>)}</div>}
      {!loading && !loadError && filteredLocations.length === 0 && <p className="empty-state">No matching places. Try another search or state filter.</p>}
    </div></section>

    <section className="about-section container" id="about"><div className="about-mark">P.</div><div><div className="eyebrow">OUR PURPOSE</div><h2>Technology that helps<br /><em>people come together.</em></h2><p>PushkaraConnect is an independent project in development. Public information will be published only after its source and verification status are checked. It is not an official government service.</p></div></section>
    <footer className="footer container"><a className="brand" href="#"><span className="brand-mark">P</span><span>Pushkara<span className="brand-light">Connect</span></span></a><span>Made with care for the Godavari community · 2026</span></footer>
  </main>;
}

export default App;
