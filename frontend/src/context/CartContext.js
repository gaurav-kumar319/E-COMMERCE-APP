import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Add to cart with quantity logic
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    alert("Added to cart ✅");
  };

  // ✅ Increase quantity
  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);
  };

  // ✅ Decrease quantity
  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  // ✅ Remove item completely
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // ✅ Clear cart after order
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};