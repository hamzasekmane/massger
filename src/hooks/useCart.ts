import { useCallback, useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import { addLines, createCart, updateLines, removeLines } from "../lib/shopify/cart";
import { isConfigured } from "../lib/shopify/client";
import type { LocalCartItem } from "../types/cart";

export function useCart() {
  // Selectors
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const shopifyCartId = useCartStore((s) => s.shopifyCartId);
  const shopifyCheckoutUrl = useCartStore((s) => s.shopifyCheckoutUrl);
  
  // Actions
  const openCart = useCartStore((s) => s.openCart);
  const closeCart = useCartStore((s) => s.closeCart);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const addItem = useCartStore((s) => s.addItem);
  const removeItemLocal = useCartStore((s) => s.removeItem);
  const updateQuantityLocal = useCartStore((s) => s.updateQuantity);
  const clear = useCartStore((s) => s.clear);
  const setShopifyCart = useCartStore((s) => s.setShopifyCart);
  const updateItemLineId = useCartStore((s) => s.updateItemLineId);

  // Derived
  const totalQuantity = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const currency = items[0]?.currency ?? "USD";

  // Sync local cart to Shopify on mount (best-effort)
  useEffect(() => {
    if (!isConfigured() || !shopifyCartId || items.length === 0) return;
    
    // Optionally: refetch cart from Shopify to ensure sync
    // For now, we trust local state and sync on mutations
  }, [shopifyCartId, items.length]);

  const addToCart = useCallback(
    async (item: Omit<LocalCartItem, "lineId">) => {
      // 1. Optimistic local add
      const itemWithLineId: LocalCartItem = { ...item, lineId: undefined };
      addItem(itemWithLineId);

      if (!isConfigured()) return;

      try {
        let cartId = shopifyCartId;

        // 2. Create Shopify cart if needed
        if (!cartId) {
          const cart = await createCart();
          if (!cart) return;
          cartId = cart.id;
          setShopifyCart(cart.id, cart.checkoutUrl);
        }

        // 3. Add line to Shopify
        const updated = await addLines(cartId, [
          { merchandiseId: item.variantId, quantity: item.quantity },
        ]);

        if (updated) {
          setShopifyCart(updated.id, updated.checkoutUrl);

          // 4. Capture lineId from response
          const line = updated.lines?.find(
            (l: any) => l.merchandise?.id === item.variantId
          );
          if (line?.id) {
            updateItemLineId(item.variantId, line.id);
          }
        }
      } catch (err) {
        console.error("Failed to sync cart to Shopify", err);
        // Local cart still works
      }
    },
    [shopifyCartId, setShopifyCart, addItem, updateItemLineId]
  );

  const updateQuantity = useCallback(
    async (variantId: string, quantity: number) => {
      // 1. Update local state
      updateQuantityLocal(variantId, quantity);

      if (!isConfigured() || !shopifyCartId || quantity <= 0) return;

      // 2. Find lineId
      const item = items.find((i) => i.variantId === variantId);
      if (!item?.lineId) {
        console.warn("No lineId for variant", variantId);
        return;
      }

      // 3. Sync to Shopify
      try {
        await updateLines(shopifyCartId, [{ id: item.lineId, quantity }]);
      } catch (err) {
        console.error("Failed to update line", err);
      }
    },
    [shopifyCartId, items, updateQuantityLocal]
  );

  const removeItem = useCallback(
    async (variantId: string) => {
      const item = items.find((i) => i.variantId === variantId);

      // 1. Remove from local state
      removeItemLocal(variantId);

      if (!isConfigured() || !shopifyCartId || !item?.lineId) return;

      // 2. Remove from Shopify
      try {
        await removeLines(shopifyCartId, [item.lineId]);
      } catch (err) {
        console.error("Failed to remove line", err);
      }
    },
    [shopifyCartId, items, removeItemLocal]
  );

const checkout = useCallback(() => {
  if (shopifyCheckoutUrl) {
    const url = shopifyCheckoutUrl.replace(
      /^https?:\/\/[^/]+/,
      "https://valora-10106.myshopify.com"
    );
    window.location.href = url;
  } else {
    window.location.href = "/success";
  }
}, [shopifyCheckoutUrl]);
  const clearCart = useCallback(() => {
    clear();
    // Optionally abandon Shopify cart by clearing ID
    // setShopifyCart(null, null);
  }, [clear, setShopifyCart]);

  return {
    isOpen,
    items,
    totalQuantity,
    subtotal,
    currency,
    openCart,
    closeCart,
    toggleCart,
    addToCart,
    updateQuantity,
    removeItem,
    clear: clearCart,
    checkout,
  };
}
