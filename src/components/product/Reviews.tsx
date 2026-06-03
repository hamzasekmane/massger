import { Star } from "lucide-react";
import { TESTIMONIALS } from "../../lib/data/testimonials";

const breakdown = [
  { stars: 5, pct: 92 },
  { stars: 4, pct: 6 },
  { stars: 3, pct: 1 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 1 },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-16 border-t border-[#e7e7e6]">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em]">Customer reviews</h2>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Summary */}
        <div>
          <div className="text-6xl font-bold tracking-tight">4.9</div>
          <div className="flex mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-[#0a0a0a] text-[#0a0a0a]" />
            ))}
          </div>
          <div className="mt-2 text-sm text-[#6b6b6b]">Based on 8,420 verified reviews</div>

          <div className="mt-6 space-y-2">
            {breakdown.map((b) => (
              <div key={b.stars} className="flex items-center gap-3 text-sm">
                <span className="w-6 text-[#6b6b6b]">{b.stars}★</span>
                <div className="flex-1 h-2 rounded-full bg-[#f4f4f3] overflow-hidden">
                  <div className="h-full bg-[#0a0a0a]" style={{ width: `${b.pct}%` }} />
                </div>
                <span className="w-10 text-right tabular-nums text-[#6b6b6b]">{b.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent reviews */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TESTIMONIALS.slice(0, 4).map((t) => (
            <article key={t.name} className="rounded-3xl bg-[#fafaf9] p-6">
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-9 w-9 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-[#6b6b6b]">{t.location}</div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#0a0a0a] text-[#0a0a0a]" />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed">"{t.text}"</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
