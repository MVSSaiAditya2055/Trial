import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Calendar from "./components/Calendar";
import Header from "./components/Header";
import SearchResults from "./pages/SearchResults";
import ArtDetail from "./pages/ArtDetail";
import Cart from "./pages/Cart";
import { paintings as demoPaintings, events as demoEvents, demoUsers, demoArtworks } from "./data";

// Home component contains the original App UI (keeps previous layout)
function Home() {
  // use shared demo data
  const paintings = demoPaintings;
  const events = demoEvents;
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("artworks")) || demoArtworks || [];
    // if none in localStorage and demoArtworks provided, seed
    if ((arr || []).length === 0 && (demoArtworks || []).length > 0) {
      localStorage.setItem("artworks", JSON.stringify(demoArtworks));
      setArtworks(demoArtworks);
    } else setArtworks(arr);
  }, []);

  // respond to uploads from ArtistDashboard (dispatches 'artworksUpdated')
  useEffect(() => {
    const handler = () => {
      const arr = JSON.parse(localStorage.getItem("artworks")) || [];
      setArtworks(arr);
      setCarouselIndex(0);
    };
    window.addEventListener("artworksUpdated", handler);
    return () => window.removeEventListener("artworksUpdated", handler);
  }, []);

  // carousel & featured logic
  const [carouselIndex, setCarouselIndex] = useState(0);
  // combine newest artworks first, then demo paintings
  const sortedArtworks = [...(artworks || [])].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  const combined = [...sortedArtworks, ...paintings];
  const carouselItems = combined.slice(0, 5);
  const featured = combined.slice(0, 3);

  return (
    <>

      {/* ===== MAIN CONTENT ===== */}
      <main>
        {/* ===== LEFT COLUMN ===== */}
        <section>
          {/* Carousel */}
          <div className="carousel">
            <div className="carousel-stage" style={{ position: "relative" }}>
              {carouselItems.length > 0 ? (
                <>
                  <button
                    onClick={() => setCarouselIndex((i) => (i - 1 + carouselItems.length) % carouselItems.length)}
                    style={{ position: "absolute", left: 6, top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
                  >
                    ◀
                  </button>
                  <img
                    src={carouselItems[carouselIndex].image}
                    alt={carouselItems[carouselIndex].title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                  />
                  <div className="carousel-caption">{carouselItems[carouselIndex].title}</div>
                  <button
                    onClick={() => setCarouselIndex((i) => (i + 1) % carouselItems.length)}
                    style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
                  >
                    ▶
                  </button>
                </>
              ) : (
                <div className="carousel-stage">No images</div>
              )}
            </div>
          </div>

          {/* Featured Paintings (mix of uploads and demo paintings) */}
          <div className="section">
            <h2>Featured Paintings</h2>
            {featured.map((it, idx) => (
              <div key={(it.id || idx) + "-feat"} className="list-row">
                <div className="thumb">
                  <img src={it.image} alt={it.title} />
                </div>
                <div className="meta">
                  <h4>
                    {it.ownerEmail ? (
                      <Link to={`/art/${it.id}`}>{it.title}</Link>
                    ) : (
                      it.title
                    )}
                  </h4>
                  <p className="muted">{it.desc || (it.price ? `$${it.price}` : "")}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Market - artworks uploaded by artists */}
          <div className="section">
            <h2>Artwork Market</h2>
            {artworks.length === 0 && <p className="muted">No artworks available.</p>}
            {artworks.map((a) => (
              <div key={a.id} className="list-row">
                <div className="thumb">
                  <img src={a.image} alt={a.title} />
                </div>
                <div className="meta">
                  <h4>
                    <Link to={`/art/${a.id}`}>{a.title}</Link>
                  </h4>
                  <p className="muted">${a.price} · by {a.ownerName || a.ownerEmail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Note: event details are intentionally not shown here — they appear when clicking dates in the calendar */}
        </section>

        {/* ===== RIGHT SIDEBAR (Calendar) ===== */}
        <aside className="calendar">
          <Calendar events={events} month={10} year={2025} />
        </aside>
      </main>

      {/* ===== FOOTER ===== */}
      <footer>
        <p>© 2025 ArtistryHub. All rights reserved.</p>
      </footer>
    </>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const rawSession = sessionStorage.getItem("loggedInUser");
    if (!rawSession) {
      navigate("/login");
      return;
    }
    try {
      const u = JSON.parse(rawSession);
      if (u.role !== "admin") {
        navigate("/");
        return;
      }
    } catch (err) {
      navigate("/login");
      return;
    }

    const raw = JSON.parse(localStorage.getItem("users")) || [];
    if (raw.length === 0) {
      // seed demo users if none
      localStorage.setItem("users", JSON.stringify(demoUsers));
      setUsers(demoUsers);
    } else setUsers(raw);
  }, [navigate]);

  const save = (next) => {
    setUsers(next);
    localStorage.setItem("users", JSON.stringify(next));
  };

  const changeRole = (email, role) => {
    const next = users.map((u) => (u.email === email ? { ...u, role } : u));
    save(next);
  };

  const removeUser = (email) => {
    if (!confirm("Delete user? This cannot be undone.")) return;
    const next = users.filter((u) => u.email !== email);
    save(next);
  };

  // artwork management for admin
  const [artworks, setArtworks] = useState([]);
  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("artworks")) || [];
    setArtworks(arr);
  }, []);

  const removeArtwork = (id) => {
    if (!confirm("Delete artwork?")) return;
    const next = artworks.filter((a) => a.id !== id);
    setArtworks(next);
    localStorage.setItem("artworks", JSON.stringify(next));
  };

  const changePrice = (id, price) => {
    const next = artworks.map((a) => (a.id === id ? { ...a, price: Number(price) } : a));
    setArtworks(next);
    localStorage.setItem("artworks", JSON.stringify(next));
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Dashboard — User & Artwork Management</h2>
      <div className="section admin-grid">
        <h3>Users</h3>
        {users.map((u) => (
          <div key={u.email} style={{ padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{u.name}</strong>
                <div className="muted">{u.email}</div>
                <div className="muted">Role: {u.role}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn" onClick={() => changeRole(u.email, "visitor")}>
                  Visitor
                </button>
                <button className="btn" onClick={() => changeRole(u.email, "artist")}>
                  Artist
                </button>
                <button className="btn secondary" onClick={() => changeRole(u.email, "admin")}>
                  Admin
                </button>
                <button className="btn" style={{ background: "#c82333" }} onClick={() => removeUser(u.email)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <h3>Artworks</h3>
        {artworks.length === 0 && <p className="muted">No artworks uploaded yet.</p>}
        {artworks.map((a) => (
          <div key={a.id} className="list-row">
            <div className="thumb">
              <img src={a.image} alt={a.title} />
            </div>
            <div className="meta">
              <h4>{a.title}</h4>
              <p className="muted">Owner: {a.ownerName || a.ownerEmail}</p>
              <p className="muted">${a.price}</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input type="number" defaultValue={a.price} onBlur={(e) => changePrice(a.id, e.target.value)} />
              <button className="btn" style={{ background: "#c82333" }} onClick={() => removeArtwork(a.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArtistDashboard() {
  const [uploads, setUploads] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("artworks")) || [];
    setUploads(arr);
  }, []);

  const handleFile = (file) => {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result);
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) return alert("Please upload an image file");
    const dataUrl = await handleFile(f);
    const arr = JSON.parse(localStorage.getItem("artworks")) || [];
    const nextId = arr.length ? Math.max(...arr.map((a) => a.id)) + 1 : 1;
    const ownerRaw = sessionStorage.getItem("loggedInUser");
    const owner = ownerRaw ? JSON.parse(ownerRaw) : { email: "anonymous", name: "Anonymous" };
  const art = { id: nextId, title: title || f.name, image: dataUrl, price: Number(price || 0), description, ownerEmail: owner.email, ownerName: owner.name, createdAt: Date.now() };
    arr.push(art);
    localStorage.setItem("artworks", JSON.stringify(arr));
    setUploads(arr);
    setTitle("");
    setPrice(0);
    setDescription("");
    alert("Upload successful");
    // notify other components (Home) that artworks changed
    try {
      window.dispatchEvent(new Event("artworksUpdated"));
    } catch (e) {
      // ignore
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Artist Dashboard — Upload Artwork</h2>
      <div className="section">
        <div className="form">
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input placeholder="Price (USD)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="file" accept="image/*" onChange={handleUpload} />
        </div>
      </div>

      <div className="section">
        <h3>Your Uploads</h3>
        {uploads.length === 0 && <p className="muted">No uploads yet.</p>}
        {uploads.map((a) => (
          <div key={a.id} className="list-row">
            <div className="thumb">
              <img src={a.image} alt={a.title} />
            </div>
            <div className="meta">
              <h4>{a.title}</h4>
              <p className="muted">${a.price}</p>
              <p className="muted">{a.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/visitor-home" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/artist-dashboard" element={<ArtistDashboard />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </>
  );
}
