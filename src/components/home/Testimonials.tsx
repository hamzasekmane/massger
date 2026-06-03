import { Star } from "lucide-react";
import { TESTIMONIALS } from "../../lib/data/testimonials";

export function Testimonials() {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#9a9a9a] mb-3">Loved by 80,000+</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em]">
              The reviews speak for themselves.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#0a0a0a] text-[#0a0a0a]" />
              ))}
            </div>
            <div className="text-sm">
              <span className="font-semibold">4.9 / 5</span>
              <span className="text-[#6b6b6b] ml-1.5">8,420 verified reviews</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.name}
              className="bg-white rounded-3xl p-7 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_8px_24px_rgba(0,0,0,0.04)]"
            >
              <div className="flex mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#0a0a0a] text-[#0a0a0a]" />
                ))}
              </div>
              <p className="text-[#0a0a0a] text-[15px] leading-relaxed">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-[#6b6b6b]">{t.location} · Verified buyer</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
