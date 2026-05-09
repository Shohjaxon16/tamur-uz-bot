import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tamur_cart')) || [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('tamur_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, size, colorIndex) => {
    setItems(prev => {
      const key = `${product.id}-${size}-${colorIndex}`;
      const exists = prev.find(i => i.key === key);
      if (exists) return prev.map(i => i.key === key ? {...i, qty: i.qty + 1} : i);
      return [...prev, { ...product, size, colorIndex, qty: 1, key }];
    });
  };

  const removeItem = (key) => setItems(prev => prev.filter(i => i.key !== key));

  const updateQty = (key, qty) => {
    if (qty < 1) return removeItem(key);
    setItems(prev => prev.map(i => i.key === key ? {...i, qty} : i));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQty, clearCart,
      totalItems, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
