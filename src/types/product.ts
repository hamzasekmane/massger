import type { ShopifyProduct, ShopifyVariant } from "./shopify";

export type Product = ShopifyProduct;
export type Variant = ShopifyVariant;

export interface ProductBenefit {
  icon: string;
  title: string;
  description: string;
}
