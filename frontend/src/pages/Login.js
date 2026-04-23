import { useState } from "react";
import axios from "axios";
import "../App.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://ecommerce-backend-ps5d.onrender.com/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful ✅");
      window.location.href = "/";
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input type="password" placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;