import { useState, useMemo } from "react";

// Calendar component
// Props:
// - events: array of { id, title, date (ISO 'YYYY-MM-DD'), location? }
// - month: 1-12 (default: current month)
// - year: full year (default: current year)
export default function Calendar({ events = [], month, year }) {
  const today = new Date();
  const displayYear = year || today.getFullYear();
  const displayMonth = month || today.getMonth() + 1; // 1-12

  const [selectedDate, setSelectedDate] = useState(null);

  // normalize events into a lookup by YYYY-MM-DD
  const eventsByDate = useMemo(() => {
    const map = new Map();
    (events || []).forEach((ev) => {
      // accept either Date or ISO string
      const dateStr = ev.date instanceof Date ? ev.date.toISOString().slice(0, 10) : String(ev.date);
      if (!map.has(dateStr)) map.set(dateStr, []);
      map.get(dateStr).push(ev);
    });
    return map;
  }, [events]);

  const firstOfMonth = new Date(displayYear, displayMonth - 1, 1);
  const daysInMonth = new Date(displayYear, displayMonth, 0).getDate();
  const startWeekday = firstOfMonth.getDay(); // 0 (Sun) - 6 (Sat)

  const allDays = [];
  // add leading blanks
  for (let i = 0; i < startWeekday; i++) allDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) allDays.push(d);

  const openEventsFor = (day) => {
    const key = `${displayYear}-${String(displayMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return eventsByDate.get(key) || [];
  };

  return (
    <>
      <div className="month-title">
        <strong>
          {firstOfMonth.toLocaleString(undefined, { month: "long" })} {displayYear}
        </strong>
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
        {allDays.map((day, idx) => {
          if (day === null) return <div key={`blank-${idx}`} />;
          const eventsHere = openEventsFor(day);
          return (
            <div
              key={day}
              className={`cal-day ${eventsHere.length ? "highlight" : ""}`}
              onClick={() => (eventsHere.length ? setSelectedDate({ day, events: eventsHere }) : setSelectedDate(null))}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* event panel/modal */}
      {selectedDate && (
        <div className="event-modal" onClick={() => setSelectedDate(null)}>
          <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedDate(null)}>
              ✕
            </button>
            <h4>
              Events on {selectedDate.day} {firstOfMonth.toLocaleString(undefined, { month: "short" })} {displayYear}
            </h4>
            <div className="event-list">
              {selectedDate.events.map((ev) => (
                <div key={ev.id || ev.title} className="event-item">
                  <h5>{ev.title}</h5>
                  {ev.location && <p className="muted">{ev.location}</p>}
                  {ev.time && <p className="muted">{ev.time}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
