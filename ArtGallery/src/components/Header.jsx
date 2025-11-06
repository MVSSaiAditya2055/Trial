import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // read session user
  useEffect(() => {
    const raw = sessionStorage.getItem("loggedInUser");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

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
        <Link to="/cart">Cart</Link>
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
        {user && user.role === "admin" && <Link to="/admin-dashboard">Admin</Link>}
        {user && user.role === "artist" && <Link to="/artist-dashboard">Artist</Link>}
      </div>
    </header>
  );
}
