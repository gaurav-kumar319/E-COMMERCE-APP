import { useState } from "react";
import axios from "axios";
import "../App.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://ecommerce-backend-ps5d.onrender.com/api/auth/register", form);

      alert("Registered Successfully ✅");

      setForm({
        name: "",
        email: "",
        password: "",
      });

      window.location.href = "/login";
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          value={form.name}
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          value={form.email}
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          value={form.password}
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;