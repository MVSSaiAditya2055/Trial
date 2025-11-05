import { useState } from "react";

const events = [
  { date: 12, title: "Art Expo 2025" },
  { date: 20, title: "Modern Art Talk" },
  { date: 2, month: 11, title: "Painting Workshop" },
];

export default function Calendar() {
  const [selected, setSelected] = useState(null);

  return (
    <>
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
          const event = events.find((e) => e.date === day);
          return (
            <div
              key={day}
              className={`cal-day ${event ? "highlight" : ""}`}
              onClick={() => setSelected(event || null)}
            >
              {day}
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="section" style={{ marginTop: "12px" }}>
          <h4>Events on {selected.date} Oct</h4>
          <p>{selected.title}</p>
        </div>
      )}
    </>
  );
}
