import type { ShopifyCart, ShopifyCartLine } from "./shopify";

export type Cart = ShopifyCart;
export type CartLine = ShopifyCartLine;

export interface LocalCartItem {
  variantId: string;
  lineId?: string; 
  productHandle: string;
  productTitle: string;
  variantTitle: string;
  image: string | null;
  price: number;
  currency: string;
  quantity: number;
  selectedOptions: { name: string; value: string }[];
  
}