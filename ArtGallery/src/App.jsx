import "./App.css";

export default function App() {
  // Example data – you can replace with real API data later
  const paintings = [
    {
      id: 1,
      title: "Sunset Over Mountains",
      image: "https://via.placeholder.com/600x320?text=Sunset+Over+Mountains",
      desc: "A serene sunset captured with oil on canvas.",
    },
    {
      id: 2,
      title: "Morning Dew",
      image: "https://via.placeholder.com/600x320?text=Morning+Dew",
      desc: "A delicate play of light and shadow.",
    },
    {
      id: 3,
      title: "Urban Rhythm",
      image: "https://via.placeholder.com/600x320?text=Urban+Rhythm",
      desc: "Abstract take on modern city life.",
    },
  ];

  const events = [
    { id: 1, title: "Art Expo 2025", date: "Oct 12", location: "New Delhi" },
    { id: 2, title: "Modern Art Talk", date: "Oct 20", location: "Mumbai" },
    { id: 3, title: "Painting Workshop", date: "Nov 2", location: "Online" },
  ];

  return (
    <>
      {/* ===== HEADER ===== */}
      <header>
        <div className="brand">ArtistryHub</div>
        <div className="search-container">
          <div className="search">
            <input type="text" placeholder="Search artworks or artists..." />
            <button>Search</button>
          </div>
        </div>
        <div className="header-actions">
          <a href="#">Login</a>
          <a href="#">Signup</a>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main>
        {/* ===== LEFT COLUMN ===== */}
        <section>
          {/* Carousel */}
          <div className="carousel">
            <div className="carousel-stage">
              <img src={paintings[0].image} alt={paintings[0].title} />
              <div className="carousel-caption">{paintings[0].title}</div>
            </div>
          </div>

          {/* Featured Paintings */}
          <div className="section">
            <h2>Featured Paintings</h2>
            {paintings.map((p) => (
              <div key={p.id} className="list-row">
                <div className="thumb">
                  <img src={p.image} alt={p.title} />
                </div>
                <div className="meta">
                  <h4>{p.title}</h4>
                  <p className="muted">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Events */}
          <div className="section">
            <h2>Upcoming Events</h2>
            {events.map((e) => (
              <div key={e.id} className="list-row">
                <div className="thumb">🎨</div>
                <div className="meta">
                  <h4>{e.title}</h4>
                  <p className="muted">
                    {e.date} · {e.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== RIGHT SIDEBAR (Calendar) ===== */}
        <aside className="calendar">
          <div className="month-title">
            <strong>October 2025</strong>
            <span>📅</span>
          </div>

          <div className="cal-weekdays">
            <div>Su</div>
            <div>Mo</div>
            <div>Tu</div>
            <div>We</div>
            <div>Th</div>
            <div>Fr</div>
            <div>Sa</div>
          </div>

          <div className="cal-grid">
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const isEvent = events.some((e) => e.date.includes(day));
              return (
                <div
                  key={day}
                  className={`cal-day ${isEvent ? "highlight" : ""}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </aside>
      </main>

      {/* ===== FOOTER ===== */}
      <footer>
        <p>© 2025 ArtistryHub. All rights reserved.</p>
      </footer>
    </>
  );
}
