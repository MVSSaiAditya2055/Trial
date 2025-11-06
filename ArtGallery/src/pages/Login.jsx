import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    // Save session
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    alert(`Welcome ${user.name}! You are logged in as ${user.role}`);

    // Navigate based on role
    if (user.role === "admin") navigate("/admin-dashboard");
    else if (user.role === "artist") navigate("/artist-dashboard");
    else navigate("/visitor-home");
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account?{" "}
        <span onClick={() => navigate("/signup")} style={{ color: "blue", cursor: "pointer" }}>
          Sign up
        </span>
      </p>
    </div>
  );
}
