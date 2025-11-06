import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function readArtworks() {
  return JSON.parse(localStorage.getItem("artworks")) || [];
}

export default function ArtDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [art, setArt] = useState(null);

  useEffect(() => {
    const list = readArtworks();
    const a = list.find((x) => String(x.id) === String(id));
    if (!a) return;
    setArt(a);
  }, [id]);

  if (!art) return <div style={{ padding: 24 }}>Artwork not found.</div>;

  const addToCart = () => {
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
    // simple simulated purchase
    addToCart();
    // Normally redirect to checkout; here simply show confirmation
    alert(`Purchased ${art.title} for $${art.price}. Thank you!`);
    sessionStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: 12 }}>
      <div style={{ display: "flex", gap: 18 }}>
        <div style={{ width: 420, maxWidth: '45%' }}>
          <img
            src={art.image}
            alt={art.title}
            style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: 8 }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h2>{art.title}</h2>
          <p className="muted">by {art.ownerName || art.ownerEmail}</p>
          <p style={{ fontSize: 20, marginTop: 8 }}>${art.price}</p>
          <p style={{ marginTop: 12 }}>{art.description}</p>

          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <button className="btn" onClick={addToCart}>
              Add to cart
            </button>
            <button className="btn" style={{ background: "#28a745" }} onClick={buyNow}>
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
