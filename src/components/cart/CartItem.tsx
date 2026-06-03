import { Minus, Plus, X } from "lucide-react";
import type { LocalCartItem } from "../../types/cart";
import { formatPrice } from "../../lib/utils/formatPrice";
import { useCart } from "../../hooks/useCart";

export function CartItem({ item, compact = false }: { item: LocalCartItem; compact?: boolean }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <li className="flex gap-4 py-4">
      <div className={`flex-none ${compact ? "h-20 w-20" : "h-24 w-24"} rounded-2xl overflow-hidden bg-[#f4f4f3]`}>
        {item.image && (
          <img src={item.image} alt={item.productTitle} className="h-full w-full object-cover" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-medium tracking-tight truncate">{item.productTitle}</div>
            {/* ← FIX: Safely handle selectedOptions */}
            {item.selectedOptions && item.selectedOptions.length > 0 && (
              <div className="text-xs text-[#6b6b6b] mt-0.5">
                {item.selectedOptions.map((o) => `${o.name}: ${o.value}`).join(" · ")}
              </div>
            )}
          </div>
          <button
            onClick={() => removeItem(item.variantId)}
            className="p-1.5 rounded-lg hover:bg-[#f4f4f3] text-[#6b6b6b]"
            aria-label="Remove"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="inline-flex items-center h-9 rounded-xl border border-[#e7e7e6] overflow-hidden">
            <button
              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
              className="h-full w-9 grid place-items-center hover:bg-[#f4f4f3]"
              aria-label="Decrease"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
              className="h-full w-9 grid place-items-center hover:bg-[#f4f4f3]"
              aria-label="Increase"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="text-sm font-semibold tabular-nums">
            {formatPrice(item.price * item.quantity, item.currency)}
          </div>
        </div>
      </div>
    </li>
  );
}