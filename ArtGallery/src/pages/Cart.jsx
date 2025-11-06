import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setItems(cart);
  }, []);

  const remove = (id) => {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    sessionStorage.setItem("cart", JSON.stringify(next));
  };

  const checkout = () => {
    if (items.length === 0) return alert("Cart is empty");
    // simulate purchase
    alert(`Thank you for your purchase: ${items.length} item(s).`);
    sessionStorage.removeItem("cart");
    setItems([]);
    navigate("/");
  };

  const total = items.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0);

  return (
    <div style={{ maxWidth: 900, margin: "24px auto" }}>
      <h2>Your Cart</h2>
      {items.length === 0 && <p>Your cart is empty.</p>}
      {items.map((it) => (
        <div key={it.id} className="list-row">
          <div className="thumb">
            <img src={it.image} alt={it.title} />
          </div>
          <div className="meta">
            <h4>{it.title}</h4>
            <p className="muted">Qty: {it.qty || 1} • ${it.price}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button className="btn" onClick={() => remove(it.id)} style={{ background: "#c82333" }}>
              Remove
            </button>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <h3>Total: ${total}</h3>
          <button className="btn" onClick={checkout} style={{ background: "#28a745" }}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
