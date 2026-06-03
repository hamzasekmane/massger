import { useState } from "react";
import type { ShopifyImage } from "../../types/shopify";
import { cn } from "../../lib/utils/cn";

export function ProductGallery({ images, title }: { images: ShopifyImage[]; title: string }) {
  const [active, setActive] = useState(0);
  if (!images.length) return <div className="aspect-square rounded-3xl bg-[#f4f4f3]" />;
  const main = images[active];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto no-scrollbar lg:overflow-visible">
        {images.map((img, i) => (
          <button
            key={img.url + i}
            onClick={() => setActive(i)}
            className={cn(
              "flex-none h-20 w-20 rounded-2xl overflow-hidden bg-[#f4f4f3] transition-all",
              active === i ? "ring-2 ring-[#0a0a0a]" : "opacity-70 hover:opacity-100"
            )}
          >
            <img src={img.url} alt={img.altText ?? title} className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 relative aspect-square rounded-3xl overflow-hidden bg-[#f4f4f3]">
        <img
          key={main.url}
          src={main.url}
          alt={main.altText ?? title}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
        />
      </div>
    </div>
  );
}
