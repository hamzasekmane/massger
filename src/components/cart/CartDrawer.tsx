import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X, ShoppingBag, ArrowRight, Lock } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../lib/utils/formatPrice";
import { Button } from "../ui/Button";
import { CartItem } from "./CartItem";

export function CartDrawer() {
  const { isOpen, closeCart, items, subtotal, currency, checkout } = useCart();
  const freeShippingTarget = 50;
  const remaining = Math.max(0, freeShippingTarget - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingTarget) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 z-50"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-white z-50 flex flex-col"
          >
            <div className="h-16 px-5 flex items-center justify-between border-b border-[#e7e7e6]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <h2 className="text-lg font-semibold tracking-tight">Your bag</h2>
                <span className="text-sm text-[#6b6b6b]">
                  ({items.reduce((s, i) => s + i.quantity, 0)})
                </span>
              </div>
              <button onClick={closeCart} className="p-2 rounded-xl hover:bg-[#f4f4f3]" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Free shipping bar */}
            {items.length > 0 && (
              <div className="px-5 pt-4">
                <div className="text-xs text-[#6b6b6b] mb-2">
                  {remaining > 0
                    ? <>You're <span className="font-semibold text-[#0a0a0a]">{formatPrice(remaining, currency)}</span> away from free shipping</>
                    : <span className="font-semibold text-emerald-700">You unlocked free shipping 🎉</span>}
                </div>
                <div className="h-1.5 rounded-full bg-[#f4f4f3] overflow-hidden">
                  <div className="h-full bg-[#0a0a0a] transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-5">
              {items.length === 0 ? (
                <EmptyState onClose={closeCart} />
              ) : (
                <ul className="divide-y divide-[#e7e7e6]">
                  {items.map((it) => (
                    <CartItem key={it.variantId} item={it} compact />
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[#e7e7e6] p-5 space-y-3 pb-safe">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6b6b6b]">Subtotal</span>
                  <span className="font-semibold tabular-nums">{formatPrice(subtotal, currency)}</span>
                </div>
                <Button size="xl" fullWidth onClick={checkout}>
                  <Lock className="h-4 w-4" />
                  Secure checkout
                </Button>
                <Link to="/cart" onClick={closeCart} className="block">
                  <Button size="md" variant="ghost" fullWidth>
                    View bag <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <div className="h-full grid place-items-center text-center py-12">
      <div>
        <div className="mx-auto h-16 w-16 rounded-2xl bg-[#f4f4f3] grid place-items-center">
          <ShoppingBag className="h-7 w-7 text-[#6b6b6b]" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">Your bag is empty</h3>
        <p className="mt-1 text-sm text-[#6b6b6b]">Add something beautiful to get started.</p>
        <Link to="/" onClick={onClose} className="inline-block mt-5">
          <Button size="md">Continue shopping</Button>
        </Link>
      </div>
    </div>
  );
}
