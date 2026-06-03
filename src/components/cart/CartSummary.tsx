import { Lock } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../lib/utils/formatPrice";
import { Button } from "../ui/Button";

export function CartSummary({ onCheckout }: { onCheckout?: () => void }) {
  const { subtotal, currency, checkout, items } = useCart();
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 4.95;
  const total = subtotal + shipping;

  return (
    <div className="rounded-3xl bg-[#fafaf9] p-6">
      <div className="space-y-2.5 text-sm">
        <Row label="Subtotal" value={formatPrice(subtotal, currency)} />
        <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping, currency)} />
        <Row label="Estimated tax" value="Calculated at checkout" muted />
      </div>
      <div className="my-5 h-px bg-[#e7e7e6]" />
      <div className="flex items-center justify-between text-base font-semibold">
        <span>Total</span>
        <span className="tabular-nums">{formatPrice(total, currency)}</span>
      </div>

      <Button
        size="xl"
        fullWidth
        className="mt-6"
        disabled={!items.length}
        onClick={() => { onCheckout?.(); checkout(); }}
      >
        <Lock className="h-4 w-4" />
        Secure checkout
      </Button>
      <p className="mt-3 text-xs text-[#9a9a9a] text-center">
        Shipping, taxes, and discount codes calculated at checkout.
      </p>
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#6b6b6b]">{label}</span>
      <span className={muted ? "text-[#9a9a9a]" : "font-medium tabular-nums"}>{value}</span>
    </div>
  );
}
