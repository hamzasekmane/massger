import type { ShopifyProduct } from "../../types/shopify";
import { isConfigured, shopifyFetch } from "./client";
import { GET_PRODUCT_BY_HANDLE, GET_PRODUCTS } from "./queries";

/* -------------------------------------------------------------------------- */
/*  Mock catalog (used when Shopify is not configured or API fails)          */
/* -------------------------------------------------------------------------- */

const MOCK_IMG = {
  hero1: "/hero-product.jpg",
  hero2: "/hero-product-2.jpg",
  hero3: "https://images.unsplash.com/photo-1517242810446-cc8951b2be40?q=80&w=1600&auto=format&fit=crop",
  hero4: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?q=80&w=1600&auto=format&fit=crop",
  hero5: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1600&auto=format&fit=crop",
};

function img(url: string, alt: string) {
  return { url, altText: alt, width: 1200, height: 1200 };
}

const VALORA_SIGNATURE: ShopifyProduct = {
  id: "gid://shopify/Product/1001",
  handle: "valora-signature",
  title: "Valora™ Signature Wireless Earbuds",
  description:
    "Studio-grade sound, sculpted titanium shell, 36-hour battery. Engineered for those who refuse to compromise. Valora™ delivers a cinematic audio experience that disappears into your day.",
  descriptionHtml:
    "<p>Studio-grade sound, sculpted titanium shell, 36-hour battery. Engineered for those who refuse to compromise.</p>",
  productType: "Audio",
  vendor: "Valora",
  tags: ["bestseller", "new", "premium"],
  availableForSale: true,
  options: [
    { id: "opt1", name: "Color", values: ["Midnight Black", "Pearl White", "Champagne Gold"] },
  ],
  priceRange: {
    minVariantPrice: { amount: "79.00", currencyCode: "USD" },
    maxVariantPrice: { amount: "79.00", currencyCode: "USD" },
  },
  compareAtPriceRange: {
    minVariantPrice: { amount: "149.00", currencyCode: "USD" },
    maxVariantPrice: { amount: "149.00", currencyCode: "USD" },
  },
  featuredImage: img(MOCK_IMG.hero1, "Valora Signature Earbuds"),
  images: [
    img(MOCK_IMG.hero1, "Valora — front view"),
    img(MOCK_IMG.hero2, "Valora — lifestyle"),
    img(MOCK_IMG.hero3, "Valora — case detail"),
    img(MOCK_IMG.hero4, "Valora — packaging"),
    img(MOCK_IMG.hero5, "Valora — in-ear"),
  ],
  variants: [
    {
      id: "gid://shopify/ProductVariant/2001",
      title: "Midnight Black",
      availableForSale: true,
      quantityAvailable: 128,
      price: { amount: "79.00", currencyCode: "USD" },
      compareAtPrice: { amount: "149.00", currencyCode: "USD" },
      selectedOptions: [{ name: "Color", value: "Midnight Black" }],
      image: img(MOCK_IMG.hero1, "Midnight Black"),
    },
    {
      id: "gid://shopify/ProductVariant/2002",
      title: "Pearl White",
      availableForSale: true,
      quantityAvailable: 64,
      price: { amount: "79.00", currencyCode: "USD" },
      compareAtPrice: { amount: "149.00", currencyCode: "USD" },
      selectedOptions: [{ name: "Color", value: "Pearl White" }],
      image: img(MOCK_IMG.hero2, "Pearl White"),
    },
    {
      id: "gid://shopify/ProductVariant/2003",
      title: "Champagne Gold",
      availableForSale: true,
      quantityAvailable: 22,
      price: { amount: "89.00", currencyCode: "USD" },
      compareAtPrice: { amount: "159.00", currencyCode: "USD" },
      selectedOptions: [{ name: "Color", value: "Champagne Gold" }],
      image: img(MOCK_IMG.hero4, "Champagne Gold"),
    },
  ],
};

const MOCK_PRODUCTS: ShopifyProduct[] = [VALORA_SIGNATURE];

/* -------------------------------------------------------------------------- */
/*  Normalizers                                                               */
/* -------------------------------------------------------------------------- */

function normalizeProduct(node: any): ShopifyProduct {
  return {
    ...node,
    images: node.images?.edges?.map((e: any) => e.node) ?? node.images ?? [],
    variants: node.variants?.edges?.map((e: any) => e.node) ?? node.variants ?? [],
  };
}

/* -------------------------------------------------------------------------- */
/*  Public API                                                                */
/* -------------------------------------------------------------------------- */

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  if (!isConfigured()) {
    console.log(`🔄 Using mock product for handle: ${handle}`);
    return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
  }

  console.log(`📡 Fetching product from Shopify: ${handle}`);

  const res = await shopifyFetch<{ product: any }>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
  });

  if ("error" in res) {
    console.error(`❌ Failed to fetch product "${handle}":`, res.error);
    console.log("🔄 Falling back to mock data");
    return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
  }

  if (!res.data.product) {
    console.warn(`⚠️ Product with handle "${handle}" not found in Shopify`);
    return null;
  }

  console.log(`✅ Successfully fetched product: ${handle}`);
  return normalizeProduct(res.data.product);
}

export async function getAllProducts(first = 12): Promise<ShopifyProduct[]> {
  if (!isConfigured()) {
    console.log("🔄 Using mock products catalog");
    return MOCK_PRODUCTS;
  }

  console.log(`📡 Fetching ${first} products from Shopify...`);

  const res = await shopifyFetch<{ products: { edges: { node: any }[] } }>({
    query: GET_PRODUCTS,
    variables: { first },
  });

  if ("error" in res) {
    console.error("❌ Failed to fetch products:", res.error);
    console.log("🔄 Falling back to mock products");
    return MOCK_PRODUCTS;
  }

  console.log(`✅ Successfully fetched ${res.data.products.edges.length} products`);
  return res.data.products.edges.map((e) => normalizeProduct(e.node));
}