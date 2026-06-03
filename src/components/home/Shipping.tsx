import { Package, MapPin, RefreshCw, ShieldCheck } from "lucide-react";

const items = [
  { icon: Package, title: "Ships in 24 hours", desc: "Place your order before 6PM and it leaves the same day." },
  { icon: MapPin, title: "60+ countries", desc: "Tracked, duties-prepaid, doorstep delivery anywhere." },
  { icon: RefreshCw, title: "30-day returns", desc: "Don't love it? Send it back. We'll cover return shipping." },
  { icon: ShieldCheck, title: "2-year warranty", desc: "Manufacturing defects? Free repair or replacement." },
];

export function Shipping() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#9a9a9a] mb-4">Hassle-free buying</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em]">
              Risk-free. Always.
            </h2>
            <p className="mt-4 text-lg text-[#6b6b6b] max-w-md">
              We back every Valora™ with the best policies in the industry — because we trust the product.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((it) => {
              const Icon = it.icon;
              return (
                <div key={it.title} className="rounded-3xl bg-[#fafaf9] p-6">
                  <div className="h-11 w-11 rounded-2xl bg-white grid place-items-center mb-4 border border-[#e7e7e6]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold tracking-tight">{it.title}</h3>
                  <p className="mt-1.5 text-sm text-[#6b6b6b] leading-relaxed">{it.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
