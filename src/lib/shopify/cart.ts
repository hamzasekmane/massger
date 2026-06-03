import type { ShopifyCart } from "../../types/shopify";
import { isConfigured, shopifyFetch } from "./client";
import {
  CART_CREATE,
  CART_LINES_ADD,
  CART_LINES_REMOVE,
  CART_LINES_UPDATE,
} from "./mutations";
import { GET_CART } from "./queries";

function normalizeCart(cart: any): ShopifyCart {
  return {
    ...cart,
    lines: cart.lines?.edges?.map((e: any) => e.node) ?? [],
  };
}

export async function createCart(): Promise<ShopifyCart | null> {
  if (!isConfigured()) return null;
  const res = await shopifyFetch<{ cartCreate: { cart: any } }>({
    query: CART_CREATE,
    variables: { input: {} },
  });
  if ("error" in res) return null;
  return normalizeCart(res.data.cartCreate.cart);
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  if (!isConfigured()) return null;
  const res = await shopifyFetch<{ cart: any }>({
    query: GET_CART,
    variables: { cartId },
  });
  if ("error" in res || !res.data.cart) return null;
  return normalizeCart(res.data.cart);
}

export async function addLines(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart | null> {
  if (!isConfigured()) return null;
  const res = await shopifyFetch<{ cartLinesAdd: { cart: any } }>({
    query: CART_LINES_ADD,
    variables: { cartId, lines },
  });
  if ("error" in res) return null;
  return normalizeCart(res.data.cartLinesAdd.cart);
}

export async function updateLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<ShopifyCart | null> {
  if (!isConfigured()) return null;
  const res = await shopifyFetch<{ cartLinesUpdate: { cart: any } }>({
    query: CART_LINES_UPDATE,
    variables: { cartId, lines },
  });
  if ("error" in res) return null;
  return normalizeCart(res.data.cartLinesUpdate.cart);
}

export async function removeLines(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart | null> {
  if (!isConfigured()) return null;
  const res = await shopifyFetch<{ cartLinesRemove: { cart: any } }>({
    query: CART_LINES_REMOVE,
    variables: { cartId, lineIds },
  });
  if ("error" in res) return null;
  return normalizeCart(res.data.cartLinesRemove.cart);
}
