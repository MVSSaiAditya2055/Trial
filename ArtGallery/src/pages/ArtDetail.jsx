import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { paintings as demoPaintings } from "../data";

function readArtworks() {
  return JSON.parse(localStorage.getItem("artworks")) || [];
}

export default function ArtDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [art, setArt] = useState(null);

  useEffect(() => {
    const list = readArtworks();
    let a = list.find((x) => String(x.id) === String(id));
    if (!a) {
      // fallback to demo paintings (they use numeric ids)
      a = demoPaintings.find((p) => String(p.id) === String(id));
      if (a) {
        // normalize demo painting fields to match artwork shape
        a = { ...a, description: a.desc || "", ownerName: "", price: undefined };
      }
    }
    if (!a) {
      setArt(null);
      return;
    }
    setArt(a);
  }, [id]);

  if (!art) return <div style={{ padding: 24 }}>Artwork not found.</div>;

  const isForSale = typeof art.price === "number" && !Number.isNaN(art.price);

  const addToCart = () => {
    if (!isForSale) return alert("This artwork is not for sale.");
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const exists = cart.find((i) => i.id === art.id);
    if (exists) {
      exists.qty = (exists.qty || 1) + 1;
    } else {
      cart.push({ id: art.id, title: art.title, price: art.price, image: art.image, qty: 1 });
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
    navigate("/cart");
  };

  const buyNow = () => {
    if (!isForSale) return alert("This artwork is not for sale.");
    // simple simulated purchase
    addToCart();
    // Normally redirect to checkout; here simply show confirmation
    alert(`Purchased ${art.title} for $${art.price}. Thank you!`);
    sessionStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <div className="art-detail" style={{ maxWidth: 1100, margin: "20px auto", padding: 12 }}>
      <div className="art-card">
        <div className="art-card-image">
          <div className="image-card">
            <img src={art.image} alt={art.title} />
          </div>
        </div>

        <div className="art-card-meta">
          <h2 className="art-title">{art.title}</h2>
          {art.ownerName || art.ownerEmail ? (
            <p className="muted">
              by {art.ownerName ? <Link to={`/artist/${encodeURIComponent(art.ownerEmail)}`}>{art.ownerName}</Link> : art.ownerEmail}
            </p>
          ) : null}

          <div className="price" style={{ marginTop: 8 }}>
            {isForSale ? <strong>₹{art.price}</strong> : <em>Not for sale</em>}
          </div>

          <div className="description" style={{ marginTop: 12 }}>{art.description}</div>

          <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
            <button className="btn primary" onClick={addToCart} disabled={!isForSale}>
              Add to Cart
            </button>
            <button className="btn secondary" onClick={buyNow} disabled={!isForSale}>
              Buy Now
            </button>
          </div>

          <div style={{ marginTop: 20 }}>
            <h4>Media</h4>
            <p className="muted">No videos. You can insert interview clips or synthesis videos here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
