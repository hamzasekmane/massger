import { useState, useRef } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Flame,
  Battery,
  Gauge,
  Play,
  X,
  Activity,
  Heart,
  Zap,
  Droplets,
  Wind,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { ShopifyProduct } from "../../types/shopify";
import { formatPrice, discountPercent } from "../../lib/utils/formatPrice";

interface HeroProps {
  product: ShopifyProduct;
}

/* ─── Data ─── */
const productHighlights = [
  { icon: Gauge, title: "9-Level Suction", sub: "Adjustment" },
  { icon: Flame, title: "Intelligent", sub: "Heat Therapy" },
  { icon: Battery, title: "1200mAh", sub: "Rechargeable" },
];

const trustBadges = [
  { icon: Shield, label: "30-Day Guarantee" },
  { icon: Truck, label: "Free Shipping" },
  { icon: RotateCcw, label: "Easy Returns" },
];

const benefits = [
  { icon: Activity, title: "Deep Muscle Relaxation" },
  { icon: Heart, title: "Improve Blood Circulation" },
  { icon: Zap, title: "Reduce Body Fatigue" },
  { icon: Droplets, title: "Support Lymphatic Drainage" },
  { icon: Wind, title: "Relieve Stress & Tension" },
  { icon: Home, title: "Spa Experience At Home" },
];

/* ─── Animation ─── */
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ─── Demo Video URL (replace with your actual video) ─── */
const DEMO_VIDEO_URL = "/images/demo.mp4"; // or external URL

export function Hero({ product }: HeroProps) {
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAt = parseFloat(product.compareAtPriceRange?.minVariantPrice.amount ?? "0");
  const discount = discountPercent(price, compareAt);
  const currency = product.priceRange.minVariantPrice.currencyCode;

  const description =
    product.description?.slice(0, 150) ?? "Professional cupping therapy and heat massage for whole body relaxation.";
  const hasMoreDesc = (product.description?.length ?? 0) > 150;

  // ─── Video modal state ───
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openVideo = () => {
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
    // Pause video when closing
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section id="top" className="relative overflow-hidden bg-stone-950">
      {/* 🎬 Background Video (existing) */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/images/vid.mp4" type="video/mp4" />
        <source src="/videos/hero-bg.webm" type="video/webm" />
      </video>

      {/* 🌑 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-950/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/30" />

      {/* ─── Hero Content ─── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[85vh] items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">
          
          {/* LEFT: Copy */}
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
            
            {/* Badge */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-400 ring-1 ring-gold-500/30 backdrop-blur-sm">
                <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                1 Best Seller
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
            >
              Smart Electric <br />
              <span className="text-gold-400">Gua Sha Massager</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={item} className="mt-5 max-w-md text-base leading-relaxed text-stone-300 sm:text-lg">
              {description}
              {hasMoreDesc ? "..." : ""}
            </motion.p>

            {/* Feature Pills */}
            <motion.div variants={item} className="mt-7 flex flex-wrap gap-3">
              {productHighlights.map((f) => (
                <div
                  key={f.title}
                  className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-md ring-1 ring-white/10"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-400 ring-1 ring-gold-500/20">
                    <f.icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="text-[13px] leading-tight">
                    <span className="block font-bold text-white">{f.title}</span>
                    <span className="text-stone-400">{f.sub}</span>
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Rating */}
            <motion.div variants={item} className="mt-6 flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-stone-200">
                4.9/5 <span className="text-stone-500">(8,420+ Reviews)</span>
              </span>
            </motion.div>

            {/* Price */}
            <motion.div variants={item} className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-4xl font-bold text-white">
                {formatPrice(price, currency)}
              </span>
              {compareAt > 0 && (
                <>
                  <span className="text-lg text-stone-500 line-through">
                    {formatPrice(compareAt, currency)}
                  </span>
                  <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-bold text-red-300 ring-1 ring-red-500/30">
                    Save {discount}%
                  </span>
                </>
              )}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to={`/products/${product.handle}`} className="flex-1 sm:flex-none">
                <button className="group flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-stone-950 shadow-xl shadow-gold-500/20 transition-all hover:bg-gold-400 hover:shadow-gold-500/30 hover:-translate-y-0.5">
                  Buy Now
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </Link>

              {/* ▶️ Updated Watch Demo button — now opens video modal */}
              <button
                onClick={openVideo}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md ring-1 ring-white/15 transition-all hover:bg-white/10 hover:ring-white/25 sm:w-auto"
              >
                <Play className="h-4 w-4 fill-white" />
                Watch Demo video
              </button>
            </motion.div>

            {/* Trust */}
            <motion.div variants={item} className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              {trustBadges.map((t) => (
                <span key={t.label} className="flex items-center gap-2 text-xs font-semibold text-stone-400">
                  <t.icon className="h-4 w-4 text-gold-400" />
                  {t.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Product Image (unchanged) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            {/* Discount Badge */}
            {discount > 0 && (
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: 6 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.8 }}
                className="absolute right-4 top-4 z-20 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-gold-500 text-stone-950 shadow-lg sm:h-24 sm:w-24"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">Up To</span>
                <span className="text-2xl font-extrabold leading-none sm:text-3xl">{discount}%</span>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">Off</span>
              </motion.div>
            )}

            {/* Image Container */}
            <div className="relative w-full rounded-[2.5rem] bg-white/5 p-8 shadow-2xl shadow-black/40 ring-1 ring-white/10 backdrop-blur-sm sm:p-12">
              {product.featuredImage && (
                <motion.img
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText ?? product.title}
                  className="relative z-10 h-auto w-full object-contain drop-shadow-2xl"
                  loading="eager"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {/* Red/Blue magnetic glow at base */}
              <div className="absolute bottom-8 left-1/2 z-0 flex -translate-x-1/2 gap-8 opacity-60 blur-2xl">
                <div className="h-8 w-8 rounded-full bg-red-500 sm:h-10 sm:w-10" />
                <div className="h-8 w-8 rounded-full bg-blue-600 sm:h-10 sm:w-10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Benefits Bar ─── */}
      <div className="relative z-10 border-t border-white/10 bg-stone-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-y-6 md:grid-cols-3 lg:grid-cols-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-2 text-center"
              >
                <b.icon className="h-6 w-6 text-gold-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  {b.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── 🎥 VIDEO MODAL ─── */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl"
            onClick={(e) => {
              // Close if clicking the backdrop (not the video container)
              if (e.target === e.currentTarget) closeVideo();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative mx-4 w-full max-w-4xl rounded-2xl bg-black shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={closeVideo}
                className="absolute -top-12 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all hover:bg-white/20 hover:text-white sm:-top-14"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Video player */}
              <div className="aspect-video overflow-hidden rounded-2xl">
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src={DEMO_VIDEO_URL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Optional caption */}
              <p className="mt-3 text-center text-xs tracking-widest text-white/40">
                SculptGlow™ Electric Gua Sha Massager Relaxing Demo Video
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
