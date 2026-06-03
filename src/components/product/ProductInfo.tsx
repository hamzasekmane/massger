import { Star, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import type { ShopifyProduct, ShopifyVariant } from "../../types/shopify";
import { Badge } from "../ui/Badge";
import { discountPercent, formatPrice } from "../../lib/utils/formatPrice";
import { cn } from "../../lib/utils/cn";

interface Props {
  product: ShopifyProduct;
  selectedVariant: ShopifyVariant;
  onSelectOption: (name: string, value: string) => void;
  selectedOptions: Record<string, string>;
}

export function ProductInfo({ product, selectedVariant, onSelectOption, selectedOptions }: Props) {
  const price = parseFloat(selectedVariant.price.amount);
  const compareAt = selectedVariant.compareAtPrice
    ? parseFloat(selectedVariant.compareAtPrice.amount)
    : 0;
  const discount = discountPercent(price, compareAt);

  return (
    <div>
      <Badge variant="dark" className="mb-4">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-soft-pulse" />
        In stock · Ships in 24h
      </Badge>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-tight">
        {product.title}
      </h1>

      <div className="mt-3 flex items-center gap-2 text-sm">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[#0a0a0a] text-[#0a0a0a]" />
          ))}
        </div>
        <span className="font-medium">4.9</span>
        <span className="text-[#6b6b6b]">(8,420)</span>
      </div>

      <div className="mt-5 flex items-baseline gap-3">
        <span className="text-3xl font-bold tracking-tight">
          {formatPrice(price, selectedVariant.price.currencyCode)}
        </span>
        {compareAt > 0 && (
          <>
            <span className="text-lg text-[#9a9a9a] line-through">
              {formatPrice(compareAt, selectedVariant.price.currencyCode)}
            </span>
            <Badge variant="success">Save {discount}%</Badge>
          </>
        )}
      </div>

      <p className="mt-6 text-[#6b6b6b] leading-relaxed">{product.description}</p>

      {/* Variants */}
      {product.options.map((opt) => (
        <div key={opt.id} className="mt-7">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">
              {opt.name}: <span className="text-[#6b6b6b] font-normal">{selectedOptions[opt.name]}</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {opt.values.map((v) => {
              const selected = selectedOptions[opt.name] === v;
              return (
                <button
                  key={v}
                  onClick={() => onSelectOption(opt.name, v)}
                  className={cn(
                    "px-4 h-11 rounded-2xl border text-sm font-medium transition-all",
                    selected
                      ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                      : "border-[#e7e7e6] bg-white text-[#0a0a0a] hover:border-[#0a0a0a]"
                  )}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Inline guarantees */}
      <div className="mt-8 grid grid-cols-3 gap-3">
        {[
          { icon: Truck, t: "Free shipping" },
          { icon: RefreshCw, t: "30-day returns" },
          { icon: ShieldCheck, t: "2-yr warranty" },
        ].map((g) => {
          const Icon = g.icon;
          return (
            <div key={g.t} className="flex flex-col items-center text-center gap-2 p-3 rounded-2xl bg-[#fafaf9]">
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{g.t}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
