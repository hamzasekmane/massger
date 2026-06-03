import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQ_ITEMS } from "../../lib/data/faq";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#9a9a9a] mb-3">FAQ</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em]">
            Got Questions? <span className="text-[#c9a962]">Answered.</span>
          </h2>
          <p className="mt-4 text-lg text-[#6b6b6b]">
            We've got answers. Still curious? Email us anytime.
          </p>
        </div>
        <div className="divide-y divide-[#e7e7e6] border-y border-[#e7e7e6]">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  className="w-full py-5 flex items-center justify-between text-left gap-4"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="text-base sm:text-lg font-medium tracking-tight">{item.q}</span>
                  <span className={`h-9 w-9 rounded-full grid place-items-center bg-[#f4f4f3] transition-transform ${isOpen ? "rotate-45" : ""}`}>
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="pb-6 pr-12 text-[#6b6b6b] leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}