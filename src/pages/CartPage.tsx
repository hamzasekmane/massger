import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { CartItem } from "../components/cart/CartItem";
import { CartSummary } from "../components/cart/CartSummary";
import { Button } from "../components/ui/Button";
import { ShoppingBag } from "lucide-react";

export function CartPage() {
  const { items } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em]">Your bag</h1>
      <p className="mt-2 text-[#6b6b6b]">
        {items.length === 0
          ? "Your bag is empty."
          : `${items.reduce((s, i) => s + i.quantity, 0)} item${items.length === 1 ? "" : "s"}`}
      </p>

      {items.length === 0 ? (
        <div className="mt-16 max-w-md mx-auto text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-[#f4f4f3] grid place-items-center">
            <ShoppingBag className="h-7 w-7 text-[#6b6b6b]" />
          </div>
          <h2 className="mt-5 text-xl font-semibold">Nothing here yet</h2>
          <p className="mt-2 text-[#6b6b6b]">Discover Valora™ and add your first piece.</p>
          <Link to="/" className="inline-block mt-6">
            <Button size="lg">Continue shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <ul className="divide-y divide-[#e7e7e6] border-y border-[#e7e7e6]">
              {items.map((it) => (
                <CartItem key={it.variantId} item={it} />
              ))}
            </ul>
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}
