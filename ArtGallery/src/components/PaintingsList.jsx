const paintings = [
  {
    id: 1,
    title: "Sunset Over Mountains",
    image: "https://via.placeholder.com/84x64?text=Sunset",
    desc: "A serene sunset captured with oil on canvas.",
  },
  {
    id: 2,
    title: "Morning Dew",
    image: "https://via.placeholder.com/84x64?text=Morning+Dew",
    desc: "A delicate play of light and shadow.",
  },
];

export default function PaintingsList() {
  return (
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
  );
}
