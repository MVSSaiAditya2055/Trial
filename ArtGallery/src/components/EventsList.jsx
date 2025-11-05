const events = [
  { id: 1, title: "Art Expo 2025", date: "2025-10-12", location: "New Delhi" },
  { id: 2, title: "Modern Art Talk", date: "2025-10-20", location: "Mumbai" },
  { id: 3, title: "Painting Workshop", date: "2025-11-02", location: "Online" },
];

export default function EventsList() {
  return (
    <div className="section">
      <h2>Upcoming Events</h2>
      {events.map((e) => (
        <div key={e.id} className="list-row">
          <div className="thumb">🎨</div>
          <div className="meta">
            <h4>{e.title}</h4>
            <p className="muted">
              {new Date(e.date).toDateString()} · {e.location}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
