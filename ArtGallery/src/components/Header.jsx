import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header>
      <Link to="/" className="brand">
        ArtistryHub
      </Link>

      <div className="search-container">
        <form className="search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search artworks or artists..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="header-actions">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </header>
  );
}
