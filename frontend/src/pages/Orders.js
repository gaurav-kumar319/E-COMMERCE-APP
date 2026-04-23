import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://ecommerce-backend-ps5d.onrender.com/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOrders(res.data))
      .catch(() => alert("Error loading orders"));
  }, []);

  return (
    <div className="orders-page">
      <h2>My Orders 📦</h2>

      {orders.length === 0 ? (
        <h3>No orders yet 😢</h3>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h3>Order ID: {order._id}</h3>

            <p>
              <strong>Name:</strong>{" "}
              {order.customer?.name}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order.customer?.phone}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {order.customer?.address}
            </p>

            <p>
              <strong>Total:</strong> $
              {order.totalPrice}
            </p>

            <h4>Products:</h4>

            {order.orderItems.map((item, index) => (
              <div key={index} className="order-item">
                <img src={item.image} alt="" />

                <div>
                  <p>{item.title}</p>
                  <p>
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;