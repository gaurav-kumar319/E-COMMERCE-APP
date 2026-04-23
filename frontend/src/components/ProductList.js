import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch(() => alert("Error loading products"));
  }, []);

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h2 style={{ textAlign: "center", width: "100%" }}>
            No products found 😢
          </h2>
        )}
      </div>
    </div>
  );
};

export default ProductList;