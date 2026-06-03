const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const publicAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION || "2025-07";

export function isConfigured(): boolean {
  return Boolean(storeDomain);
}

function normalizeStoreDomain(domain: string): string {
  return domain
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
}

if (import.meta.env.DEV) {
  console.log("🔧 Shopify Configuration:", {
    storeDomain: storeDomain || "❌ NOT SET",
    hasToken: Boolean(publicAccessToken),
    tokenPreview: publicAccessToken
      ? `${publicAccessToken.substring(0, 8)}...${publicAccessToken.substring(publicAccessToken.length - 4)}`
      : "⚠️ No token — using tokenless access",
    apiVersion,
  });
}

export interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
  apiVersion?: string;
  headers?: Record<string, string | string[]>;
  retries?: number;
}

type ShopifyFetchResult<T> = { data: T } | { error: string };

export async function shopifyFetch<T>({
  query,
  variables,
  apiVersion: versionOverride,
}: ShopifyFetchOptions): Promise<ShopifyFetchResult<T>> {
  if (!storeDomain) {
    return { error: "Shopify store domain not configured" };
  }

  const version = versionOverride || apiVersion;
  const domain = normalizeStoreDomain(storeDomain);
  const url = `https://${domain}/api/${version}/graphql.json`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (publicAccessToken) {
    headers["X-Shopify-Storefront-Access-Token"] = publicAccessToken;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (!res.ok) {
      console.error(`❌ Shopify HTTP ${res.status}:`, json);
      return { error: `HTTP ${res.status}` };
    }

    if (json.errors) {
      console.error("❌ Shopify GraphQL Error:", json.errors);
      return { error: json.errors[0]?.message ?? "GraphQL error" };
    }

    if (!json.data) {
      return { error: "No data returned from Shopify" };
    }

    return { data: json.data as T };
  } catch (error) {
    console.error("❌ Shopify Fetch Error:", error);
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
}