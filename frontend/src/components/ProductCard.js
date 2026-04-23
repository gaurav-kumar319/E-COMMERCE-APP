import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAdd = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first ❌");
      return;
    }

    addToCart(product);
  };

  return (
    <div className="card">
      <img
        src={product.image}
        alt={product.title}
        className="product-img"
      />

      <h4 className="product-title">{product.title}</h4>

      <p className="price">${product.price}</p>

      <button className="cart-btn" onClick={handleAdd}>
        Add to Cart 🛒
      </button>
    </div>
  );
};

export default ProductCard;