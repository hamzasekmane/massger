export const SITE = {
  name: "Valora",
  tagline: "Crafted for the bold.",
  description:
    "The next-generation luxury essential. Engineered for those who demand more.",
  url: "https://valoraerpy.com",
  email: "support@valoraerpy.com",
  currency: "USD",
} as const;

export const SHOPIFY = {
  domain:
    (import.meta as any).env?.VITE_SHOPIFY_STORE_DOMAIN ||
    "mock-store.myshopify.com",
  token:
    (import.meta as any).env?.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
  apiVersion: "2024-10",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/products/valora-signature" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
] as const;
