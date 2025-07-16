import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem("cart")) || [],

  addToCart: (item) =>
    set((state) => {
      const updatedCart = [...state.cart, item];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  removeFromCart: (itemId) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: [] });
  },
}));
