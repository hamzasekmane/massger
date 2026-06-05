import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import type { ShopifyProduct, ShopifyVariant } from "../../types/shopify";
import { Button } from "../ui/Button";
import { formatPrice } from "../../lib/utils/formatPrice";
import { useCart } from "../../hooks/useCart";
import { useToast } from "../ui/Toast";

interface Props { 
  product: ShopifyProduct; 
  variant: ShopifyVariant; 
}

export function StickyCart({ product, variant }: Props) {
  const [show, setShow] = useState(false);
  const { addToCart } = useCart();
  const toast = useToast();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const onScroll = () => {
      // Show when user scrolls past fold, hide on desktop configurations entirely
      setShow(window.scrollY > 600 && window.innerWidth < 1024);
    };
    
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleAdd = () => {
    startTransition(async () => {
      try {
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
      } catch (error) {
        console.error("Cart addition failure:", error);
        toast.show("Failed to update cart");
      }
    });
  };

  const currentPrice = formatPrice(variant.price.amount, variant.price.currencyCode);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 35 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/75 backdrop-blur-lg border-t border-gold-100/40 pb-safe shadow-[0_-8px_32px_rgba(142,123,94,0.06)]"
        >
          <div className="max-w-md mx-auto px-5 py-3.5 flex items-center gap-4">
            
            {/* Architectural Micro Thumbnail Frame */}
            <div className="h-12 w-12 rounded-xl overflow-hidden bg-cream border border-gold-100/20 shrink-0 shadow-3xs">
              <img
                src={variant.image?.url ?? product.featuredImage?.url ?? ""}
                alt={`${product.title} sticky presentation thumbnail`}
                className="h-full w-full object-cover select-none"
              />
            </div>

            {/* Typography Content Identity Layer */}
            <div className="flex-1 min-w-0 space-y-0.5">
              <div className="font-sans font-700 text-sm tracking-tight text-stone-900 truncate">
                {product.title}
              </div>
              <div className="font-sans font-600 text-xs text-gold-600/90 tracking-wide">
                {currentPrice}
              </div>
            </div>

            {/* High Conversion CTA Action Input Trigger */}
            <Button 
              onClick={handleAdd} 
              disabled={isPending}
              size="md" 
              className="flex-none bg-stone-950 text-white hover:bg-stone-800 transition-all duration-200 px-5 rounded-xl font-sans font-700 text-xs tracking-wider uppercase flex items-center gap-2 h-11 shadow-sm disabled:opacity-50"
            >
              <ShoppingBag className="h-3.5 w-3.5" strokeWidth={2.5} />
              <span>{isPending ? "Adding..." : "Add"}</span>
            </Button>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
