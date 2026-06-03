import { Truck, Shield, Sparkles } from "lucide-react";

const items = [
  { icon: Truck, text: "Free worldwide shipping over $50" },
  { icon: Shield, text: "30-day money-back guarantee" },
  { icon: Sparkles, text: "Save 47% — Today only" },
  { icon: Truck, text: "Ships within 24 hours" },
];

export function AnnouncementBar() {
  return (
    <div className="bg-[#0a0a0a] text-white text-xs sm:text-sm h-9 overflow-hidden relative">
      <div className="absolute inset-0 flex items-center whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((it, i) => {
          const Icon = it.icon;
          return (
            <span key={i} className="inline-flex items-center gap-2 px-6">
              <Icon className="h-3.5 w-3.5 opacity-80" />
              <span className="tracking-tight">{it.text}</span>
              <span className="opacity-40 ml-6">•</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
