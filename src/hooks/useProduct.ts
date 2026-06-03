import { useEffect, useState } from "react";
import type { ShopifyProduct } from "../types/shopify";
import { getProductByHandle } from "../lib/shopify/products";

export function useProduct(handle: string | undefined) {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!handle) {
      setError("No product handle provided");
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setProduct(null);

    getProductByHandle(handle)
      .then((p) => {
        if (cancelled) return;

        if (!p) {
          setError(`Product with handle "${handle}" not found`);
          return;
        }

        setProduct(p);
      })
      .catch((e) => {
        if (!cancelled) {
          setError(
            e?.message ||
            `Failed to fetch product with handle "${handle}"`
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [handle]);

  return { product, loading, error };
}