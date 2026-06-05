import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ShopifyImage } from "../../types/shopify";
import { cn } from "../../lib/utils/cn";

interface ProductGalleryProps {
  images: ShopifyImage[];
  title: string;
}

// Directional variants for editorial sliding transitions
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [[page, direction], setPage] = useState([0, 0]);

  if (!images.length) {
    return (
      <div className="aspect-square w-full rounded-3xl bg-cream border border-gold-100/40 animate-pulse" />
    );
  }

  const activeIndex = page;
  const main = images[activeIndex];

  const handleStep = (newIndex: number) => {
    const nextDirection = newIndex > activeIndex ? 1 : -1;
    setPage([newIndex, nextDirection]);
  };

  // Drag handlers for immersive touch-swipe navigation
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-6">
      
      {/* Editorial Thumbnail Rail Layout */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto no-scrollbar lg:overflow-y-auto max-h-[520px] py-1 px-1">
        {images.map((img, i) => {
          const isActive = activeIndex === i;
          return (
            <button
              key={`${img.url}-${i}`}
              onClick={() => handleStep(i)}
              className={cn(
                "flex-none h-18 w-18 sm:h-20 sm:w-20 rounded-xl overflow-hidden bg-cream border focus:outline-none cursor-pointer relative transition-colors duration-300",
                isActive ? "border-transparent" : "border-gold-100/60 opacity-60 hover:opacity-100 hover:border-gold-300"
              )}
              aria-label={`View perspective image module ${i + 1}`}
            >
              <img
                src={img.url}
                alt={img.altText ?? `${title} thumbnail view perspective ${i + 1}`}
                className="h-full w-full object-cover transform scale-100 hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              
              {/* Premium Layout Tracking Frame */}
              {isActive && (
                <motion.div
                  layoutId="activeLuxuryRing"
                  className="absolute inset-0 ring-2 ring-gold-600/70 rounded-xl pointer-events-none z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Fluid Main Showcase Block */}
      <div className="flex-1 relative aspect-square rounded-3xl overflow-hidden bg-cream border border-gold-100/30 shadow-2xs group cursor-grab active:cursor-grabbing">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={page}
            src={main.url}
            alt={main.altText ?? title}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 32 },
              opacity: { duration: 0.35 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold && activeIndex < images.length - 1) {
                handleStep(activeIndex + 1);
              } else if (swipe > swipeConfidenceThreshold && activeIndex > 0) {
                handleStep(activeIndex - 1);
              }
            }}
            className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
          />
        </AnimatePresence>
        
        {/* Decorative Ambient Accents */}
        <div className="absolute top-5 right-5 h-6 w-6 pointer-events-none select-none opacity-25 text-gold-900 font-display text-sm flex items-center justify-center mix-blend-difference">
          ✦
        </div>

        {/* Index Floating Counter */}
        <div className="absolute bottom-5 right-5 px-3 py-1 bg-stone-950/40 backdrop-blur-md border border-white/10 rounded-full font-mono text-[9px] text-white/90 tracking-widest select-none shadow-2xs">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

    </div>
  );
}
