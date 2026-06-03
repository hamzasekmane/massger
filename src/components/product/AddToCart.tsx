import { useState } from "react";
import { Minus, Plus, ShoppingBag, Lock } from "lucide-react";
import { Button } from "../ui/Button";
import type { ShopifyProduct, ShopifyVariant } from "../../types/shopify";
import { useCart } from "../../hooks/useCart";
import { useToast } from "../ui/Toast";

interface Props { product: ShopifyProduct; variant: ShopifyVariant }

export function AddToCart({ product, variant }: Props) {
  const { addToCart, checkout } = useCart();
  const { show } = useToast();
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAdd = async (goToCheckout = false) => {
    setLoading(true);
    try {
      await addToCart({
        variantId: variant.id,
        productHandle: product.handle,
        productTitle: product.title,
        variantTitle: variant.title,
        image: variant.image?.url ?? product.featuredImage?.url ?? null,
        price: parseFloat(variant.price.amount),
        currency: variant.price.currencyCode,
        quantity: qty,
        selectedOptions: variant.selectedOptions,
      });
      show("Added to cart");
      if (goToCheckout) checkout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-7">
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center h-13 rounded-2xl border border-[#e7e7e6] bg-white overflow-hidden">
          <button
            className="h-full w-12 grid place-items-center hover:bg-[#f4f4f3] disabled:opacity-40"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center font-medium tabular-nums">{qty}</span>
          <button
            className="h-full w-12 grid place-items-center hover:bg-[#f4f4f3]"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <Button
          size="lg"
          fullWidth
          loading={loading}
          disabled={!variant.availableForSale}
          onClick={() => handleAdd(false)}
          className="flex-1"
        >
          <ShoppingBag className="h-4 w-4" />
          {variant.availableForSale ? "Add to bag" : "Sold out"}
        </Button>
      </div>

      <Button
        size="lg"
        variant="outline"
        fullWidth
        className="mt-3"
        onClick={() => handleAdd(true)}
        disabled={!variant.availableForSale || loading}
      >
        <Lock className="h-4 w-4" />
        Buy now — secure checkout
      </Button>

      <p className="mt-3 text-xs text-[#9a9a9a] text-center">
        Pay with Apple Pay, Google Pay, Shop Pay, or any major card.
      </p>
    </div>
  );
}
