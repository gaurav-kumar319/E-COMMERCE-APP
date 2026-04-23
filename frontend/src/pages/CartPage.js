import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // 🔐 Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // 💰 Total
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 📦 Place Order
  const handleOrder = async () => {
    const { name, email, phone, address } = form;

    if (!name || !email || !phone || !address) {
      alert("Please fill all details ❌");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://ecommerce-backend-ps5d.onrender.com/api/orders",
        {
          customer: form,
          orderItems: cart,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully ✅");

      clearCart();

      navigate("/success");
    } catch (error) {
      alert("Error placing order");
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <h3>Your cart is empty 😢</h3>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-card">
              <img src={item.image} alt="" />

              <div className="cart-info">
                <h4>{item.title}</h4>
                <p>${item.price}</p>

                <div className="qty-box">
                  <button onClick={() => decreaseQty(item.id)}>
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQty(item.id)}>
                    +
                  </button>
                </div>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove ❌
              </button>
            </div>
          ))}

          <h2>Total: ${totalPrice.toFixed(2)}</h2>

          {/* Checkout Form */}
          <div className="checkout-box">
            <h3>Checkout Details</h3>

            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <textarea
              placeholder="Full Address"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />

            <button className="order-btn" onClick={handleOrder}>
              Place Order ✅
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;