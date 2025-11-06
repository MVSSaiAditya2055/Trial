import { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { paintings } from "../data";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const q = useQuery().get("q") || "";
  const term = q.trim().toLowerCase();

  const results = useMemo(() => {
    if (!term) return [];
    return paintings.filter((p) => (p.title + " " + p.desc).toLowerCase().includes(term));
  }, [term]);

  return (
    <div style={{ maxWidth: 900, margin: "24px auto" }}>
      <h2>Search results for "{q}"</h2>
      {!term && <p>Enter a search term in the header to find artworks.</p>}
      {term && results.length === 0 && <p>No artworks found.</p>}
      {results.map((p) => (
        <div key={p.id} className="list-row">
          <div className="thumb">
            <img src={p.image} alt={p.title} />
          </div>
          <div className="meta">
            <h4>
              <Link to={`/art/${p.id}`}>{p.title}</Link>
            </h4>
            <p className="muted">{p.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
