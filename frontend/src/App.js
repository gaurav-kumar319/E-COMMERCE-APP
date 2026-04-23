import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";

function App() {
  const { cart } = useContext(CartContext);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <Link to="/">E-Shop 🛒</Link>

        <div style={{ display: "flex", gap: "15px" }}>
          <Link to="/cart">Cart ({cart.length})</Link>
          <Link to="/orders">Orders</Link>

          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;