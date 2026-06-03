import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LocalCartItem } from "../types/cart";

interface CartState {
  items: LocalCartItem[];
  isOpen: boolean;
  shopifyCartId: string | null;
  shopifyCheckoutUrl: string | null;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  addItem: (item: LocalCartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clear: () => void;

  setShopifyCart: (id: string | null, checkoutUrl: string | null) => void;
  updateItemLineId: (variantId: string, lineId: string) => void; 

  // Selectors
  getTotalQuantity: () => number;
  getSubtotal: () => number;
  getCurrency: () => string;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      shopifyCartId: null,
      shopifyCheckoutUrl: null,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.variantId === item.variantId
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              isOpen: true,
            };
          }
          return { items: [...state.items, item], isOpen: true };
        }),

      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),

      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.variantId === variantId
                ? { ...i, quantity: Math.max(0, quantity) }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      clear: () => set({ items: [] }),

      setShopifyCart: (id, checkoutUrl) =>
        set({ shopifyCartId: id, shopifyCheckoutUrl: checkoutUrl }),

      // ← ADD THIS METHOD
      updateItemLineId: (variantId, lineId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId ? { ...i, lineId } : i
          ),
        })),

      getTotalQuantity: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getCurrency: () => get().items[0]?.currency ?? "USD",
    }),
    {
      name: "valora-cart",
      partialize: (s) => ({
        items: s.items,
        shopifyCartId: s.shopifyCartId,
        shopifyCheckoutUrl: s.shopifyCheckoutUrl,
        // Note: lineId is part of items, so it's persisted automatically
      }),
    }
  )
);