import { type ReactNode, createContext, useContext, useState } from "react";
import type { Donut } from "../backend.d";

export interface CartItem {
  donut: Donut;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (donut: Donut) => void;
  removeFromCart: (donutId: bigint) => void;
  updateQuantity: (donutId: bigint, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (donut: Donut) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.donut.id === donut.id);
      if (existing) {
        return prev.map((i) =>
          i.donut.id === donut.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { donut, quantity: 1 }];
    });
  };

  const removeFromCart = (donutId: bigint) => {
    setItems((prev) => prev.filter((i) => i.donut.id !== donutId));
  };

  const updateQuantity = (donutId: bigint, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(donutId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.donut.id === donutId ? { ...i, quantity } : i)),
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + Number(i.donut.price) * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
