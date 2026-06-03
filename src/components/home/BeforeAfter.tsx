import { useRef, useState } from "react";
import { motion } from "framer-motion";

const BEFORE = "/images/before.jpg";
const AFTER = "/images/after.jpg";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (clientX: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  };

  return (
    <section className="py-20 sm:py-28 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#9a9a9a] mb-3">The difference</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em]">
            Then. vs. Now.
          </h2>
          <p className="mt-4 text-lg text-[#6b6b6b]">
            Drag to compare your old earbuds with Valora™.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          ref={ref}
          className="relative aspect-[16/10] sm:aspect-[16/8] rounded-[2rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] cursor-ew-resize select-none"
          onMouseMove={(e) => onMove(e.clientX)}
          onTouchMove={(e) => onMove(e.touches[0].clientX)}
        >
          <img src={AFTER} alt="Valora — after" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${pos}%` }}
          >
            <img
              src={BEFORE}
              alt="Old earbuds — before"
              className="absolute inset-0 h-full object-cover"
              style={{ width: `${10000 / pos}%`, maxWidth: "none" }}
              draggable={false}
            />
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0 w-px bg-white"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white grid place-items-center shadow-lg">
              <div className="flex gap-1">
                <span className="h-3 w-0.5 bg-[#0a0a0a]" />
                <span className="h-3 w-0.5 bg-[#0a0a0a]" />
              </div>
            </div>
          </div>

          <span className="absolute top-4 left-4 bg-black/60 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full">
            Before
          </span>
          <span className="absolute top-4 right-4 bg-white/90 backdrop-blur text-black text-xs px-3 py-1.5 rounded-full font-medium">
            After
          </span>
        </motion.div>
      </div>
    </section>
  );
}
