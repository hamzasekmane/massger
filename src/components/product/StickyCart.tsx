import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import type { ShopifyProduct, ShopifyVariant } from "../../types/shopify";
import { Button } from "../ui/Button";
import { formatPrice } from "../../lib/utils/formatPrice";
import { useCart } from "../../hooks/useCart";
import { useToast } from "../ui/Toast";

interface Props { product: ShopifyProduct; variant: ShopifyVariant }

export function StickyCart({ product, variant }: Props) {
  const [show, setShow] = useState(false);
  const { addToCart } = useCart();
  const toast = useToast();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAdd = async () => {
    await addToCart({
      variantId: variant.id,
      productHandle: product.handle,
      productTitle: product.title,
      variantTitle: variant.title,
      image: variant.image?.url ?? product.featuredImage?.url ?? null,
      price: parseFloat(variant.price.amount),
      currency: variant.price.currencyCode,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });
    toast.show("Added to cart");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-xl border-t border-[#e7e7e6] pb-safe"
        >
          <div className="px-4 py-3 flex items-center gap-3">
            <img
              src={variant.image?.url ?? product.featuredImage?.url ?? ""}
              alt={product.title}
              className="h-12 w-12 rounded-xl object-cover bg-[#f4f4f3]"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{product.title}</div>
              <div className="text-xs text-[#6b6b6b]">
                {formatPrice(variant.price.amount, variant.price.currencyCode)}
              </div>
            </div>
            <Button onClick={handleAdd} size="md" className="flex-none">
              <ShoppingBag className="h-4 w-4" />
              Add
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
