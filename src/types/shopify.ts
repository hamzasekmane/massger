// Shopify Storefront API type definitions (subset used in storefront)

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyPriceRange {
  minVariantPrice: ShopifyMoney;
  maxVariantPrice: ShopifyMoney;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  selectedOptions: { name: string; value: string }[];
  image?: ShopifyImage | null;
}

export interface ShopifyProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  vendor: string;
  tags: string[];
  availableForSale: boolean;
  options: ShopifyProductOption[];
  priceRange: ShopifyPriceRange;
  compareAtPriceRange?: ShopifyPriceRange;
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: { title: string; handle: string; featuredImage: ShopifyImage | null };
    price: ShopifyMoney;
    selectedOptions: { name: string; value: string }[];
  };
  cost: { totalAmount: ShopifyMoney };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: ShopifyCartLine[];
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
    totalTaxAmount: ShopifyMoney | null;
  };
}
