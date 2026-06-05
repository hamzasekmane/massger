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
    <div className="space-y-6">
      
      {/* Premium Status Banner */}
      <div>
        <Badge variant="dark" className="bg-stone-900 text-white border-none rounded-full px-3 py-1 text-[10px] tracking-widest uppercase font-700 inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
          In stock · Curated Shipment Within 24h
        </Badge>
      </div>

      {/* Luxury Display Title & Social Proof Layer */}
      <div className="space-y-3">
        <h1 className="font-display font-700 text-3xl sm:text-4xl text-stone-900 tracking-tight leading-[1.15]">
          {product.title}
        </h1>

        <div className="flex items-center gap-2.5 text-xs font-sans tracking-wider">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
            ))}
          </div>
          <span className="font-700 text-stone-900">4.9</span>
          <span className="text-stone-400 font-500">({(8420).toLocaleString()} Reviews)</span>
        </div>
      </div>

      {/* Dynamic Tiered Price Structure */}
      <div className="flex items-baseline gap-4 pt-2">
        <span className="font-sans font-700 text-3xl tracking-tight text-stone-900">
          {formatPrice(price, selectedVariant.price.currencyCode)}
        </span>
        {compareAt > 0 && (
          <div className="flex items-center gap-2.5">
            <span className="font-sans font-500 text-base text-stone-400 line-through">
              {formatPrice(compareAt, selectedVariant.price.currencyCode)}
            </span>
            <Badge variant="success" className="bg-gold-50 text-gold-700 border border-gold-200/50 rounded-md font-sans font-700 text-[10px] uppercase tracking-wider px-2 py-0.5">
              Save {discount}%
            </Badge>
          </div>
        )}
      </div>

      {/* Product Narrative Intro */}
      <p className="font-sans font-400 text-stone-600 text-[14px] sm:text-base leading-relaxed border-t border-stone-100 pt-5">
        {product.description}
      </p>

      {/* Shopify Variants Selection Matrix */}
      <div className="space-y-5 pt-3">
        {product.options.map((opt) => (
          <div key={opt.id} className="space-y-3">
            <div className="text-xs font-700 tracking-widest uppercase text-stone-900">
              {opt.name}: <span className="text-gold-600 font-600 ml-1">{selectedOptions[opt.name]}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {opt.values.map((v) => {
                const isSelected = selectedOptions[opt.name] === v;
                return (
                  <button
                    key={v}
                    onClick={() => onSelectOption(opt.name, v)}
                    className={cn(
                      "px-5 h-11 rounded-xl text-xs font-700 tracking-wider uppercase transition-all duration-300 border focus:outline-none cursor-pointer",
                      isSelected
                        ? "border-stone-950 bg-stone-950 text-white shadow-sm"
                        : "border-stone-200 bg-white text-stone-800 hover:border-stone-400 hover:text-stone-950"
                    )}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Editorial Identity Trust Guarantees */}
      <div className="grid grid-cols-3 gap-0.5 border-t border-b border-stone-100 py-6 mt-8">
        {[
          { icon: Truck, t: "Complimentary Shipping" },
          { icon: RefreshCw, t: "30-Day Evaluation" },
          { icon: ShieldCheck, t: "2-Year Warranty" },
        ].map((g) => {
          const Icon = g.icon;
          return (
            <div key={g.t} className="flex flex-col items-center justify-center text-center p-2 space-y-2 group">
              <div className="text-stone-400 group-hover:text-gold-600 transition-colors duration-300">
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </div>
              <span className="text-[10px] font-700 tracking-wide uppercase text-stone-500 block">
                {g.t}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
