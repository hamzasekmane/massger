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

/* ─── Data Configurations ─── */
const productHighlights = [
  { icon: Gauge, title: "9-Level Suction", sub: "Adjustment Matrix" },
  { icon: Flame, title: "Intelligent", sub: "Thermal Heat Relay" },
  { icon: Battery, title: "1200mAh", sub: "Extended Life Cell" },
];

const trustBadges = [
  { icon: Shield, label: "30-Day Evaluation" },
  { icon: Truck, label: "Complimentary Shipping" },
  { icon: RotateCcw, label: "Unconditional Returns" },
];

const benefits = [
  { icon: Activity, title: "Deep Kinetic Relaxation" },
  { icon: Heart, title: "Subdermal Circulation" },
  { icon: Zap, title: "Fatigue Decompression" },
  { icon: Droplets, title: "Lymphatic Drainage Support" },
  { icon: Wind, title: "Tension & Stress Release" },
  { icon: Home, title: "At-Home Atelier Spa" },
];

/* ─── Premium Motion Timings ─── */
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const DEMO_VIDEO_URL = "/images/demo.mp4";

export function Hero({ product }: HeroProps) {
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAt = parseFloat(product.compareAtPriceRange?.minVariantPrice.amount ?? "0");
  const discount = discountPercent(price, compareAt);
  const currency = product.priceRange.minVariantPrice.currencyCode;

  const description =
    product.description?.slice(0, 150) ?? "Professional microcurrent therapy and heat massage built for whole body relaxation.";
  const hasMoreDesc = (product.description?.length ?? 0) > 150;

  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openVideo = () => setShowVideo(true);
  const closeVideo = () => {
    setShowVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section id="top" className="relative overflow-hidden bg-stone-950 selection:bg-gold-500 selection:text-stone-950">
      
      {/* Immersive Atmospheric Video Canvas Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 select-none overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-35 filter brightness-[0.4] contrast-[1.05]"
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
      </div>

      {/* Luxury Radial Lighting Overlays */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-transparent lg:w-3/5" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40" />

      {/* Main Container Workspace */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[90vh] items-center gap-16 py-20 lg:grid-cols-12 lg:py-24">
          
          {/* LEFT COLUMN: Editorial Configuration Content */}
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl lg:col-span-7 space-y-7">
            
            {/* Identity Badge Component */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-md bg-gold-400/10 border border-gold-500/20 px-3.5 py-1.5 text-[9px] font-800 uppercase tracking-[0.25em] text-gold-400 backdrop-blur-md">
                <Star className="h-3 w-3 fill-gold-400 text-gold-400" />
                No·1 Medical-Grade Wellness Device
              </span>
            </motion.div>

            {/* Title Display Header */}
            <div className="space-y-4">
              <motion.h1
                variants={item}
                className="font-display text-4xl font-700 leading-[1.1] tracking-tighter text-white sm:text-5xl lg:text-6xl uppercase"
              >
                Smart Electric <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200">
                  Gua Sha Massager
                </span>
              </motion.h1>

              <motion.p variants={item} className="max-w-md font-sans font-400 text-sm sm:text-base leading-relaxed text-stone-300/90">
                {description}
                {hasMoreDesc && "..."}
              </motion.p>
            </div>

            {/* Performance Parameters Matrix */}
            <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {productHighlights.map((f) => (
                <div
                  key={f.title}
                  className="flex items-center gap-3.5 rounded-xl bg-white/[0.03] p-3.5 backdrop-blur-xl border border-white/5 shadow-2xs"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/20">
                    <f.icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <span className="text-left leading-tight">
                    <span className="block font-700 text-xs text-white tracking-wide">{f.title}</span>
                    <span className="text-[10px] text-stone-400 font-500 tracking-wide mt-0.5 block">{f.sub}</span>
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Social Proof Dynamic Score */}
            <motion.div variants={item} className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-full px-4 py-2 w-max backdrop-blur-xs">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <span className="text-xs font-700 tracking-wider text-stone-200">
                4.9/5 <span className="text-stone-500 font-500 ml-1">({(8420).toLocaleString()}+ Reviews)</span>
              </span>
            </motion.div>

            {/* Pricing Structures Segment */}
            <motion.div variants={item} className="flex items-center gap-4 pt-2">
              <span className="font-sans font-700 text-4xl tracking-tight text-white">
                {formatPrice(price, currency)}
              </span>
              {compareAt > 0 && (
                <div className="flex items-center gap-2.5">
                  <span className="text-lg font-500 text-stone-500 line-through">
                    {formatPrice(compareAt, currency)}
                  </span>
                  <span className="rounded-md bg-red-500/10 px-2.5 py-0.5 text-[10px] font-800 uppercase tracking-widest text-red-400 border border-red-500/20">
                    Save {discount}%
                  </span>
                </div>
              )}
            </motion.div>

            {/* Action Checkout Call-to-Actions */}
            <motion.div variants={item} className="flex flex-col gap-3.5 sm:flex-row pt-2">
              <Link to={`/products/${product.handle}`} className="flex-1 sm:flex-none">
                <button className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-white px-8 h-14 text-xs font-800 uppercase tracking-[0.15em] text-stone-950 shadow-xl shadow-white/5 transition-all duration-300 hover:bg-gold-400 hover:shadow-gold-500/10 cursor-pointer">
                  <span>Explore Atelier Collection</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                </button>
              </Link>

              <button
                onClick={openVideo}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-white/[0.04] px-8 h-14 text-xs font-800 uppercase tracking-[0.15em] text-white backdrop-blur-md border border-white/10 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 sm:w-auto cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-white" />
                <span>Watch Experience Film</span>
              </button>
            </motion.div>

            {/* Quality Seals Sub-shelf */}
            <motion.div variants={item} className="flex flex-wrap gap-x-6 gap-y-3 pt-3 border-t border-white/5">
              {trustBadges.map((t) => (
                <span key={t.label} className="flex items-center gap-2 text-[11px] font-600 tracking-wide text-stone-400">
                  <t.icon className="h-3.5 w-3.5 text-gold-400/90" strokeWidth={2} />
                  {t.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Asymmetric Dynamic Product Display Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative flex items-center justify-center lg:col-span-5"
          >
            {/* Dynamic Floating Discount Overlay */}
            {discount > 0 && (
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 4 }}
                transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.7 }}
                className="absolute -right-2 top-2 z-20 flex h-22 w-22 flex-col items-center justify-center rounded-full bg-gold-400 text-stone-950 shadow-2xl border-4 border-stone-950 select-none"
              >
                <span className="text-[9px] font-800 uppercase tracking-widest opacity-80">Special</span>
                <span className="text-2xl font-900 leading-none tracking-tight">-{discount}%</span>
                <span className="text-[9px] font-800 uppercase tracking-widest opacity-80">Off Limit</span>
              </motion.div>
            )}

            {/* Sculptural Base Geometric Frame Container */}
            <div className="relative w-full rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent p-6 sm:p-10 shadow-3xl shadow-black/80 border border-white/10 backdrop-blur-md overflow-hidden group">
              
              {/* Premium Background Lighting Mesh Spark */}
              <div className="absolute top-0 left-1/4 h-36 w-36 bg-gold-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-gold-500/15 transition-all duration-500" />

              {product.featuredImage && (
                <motion.img
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText ?? product.title}
                  className="relative z-10 h-auto w-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] select-none pointer-events-none"
                  loading="eager"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {/* Integrated Sonic Energy Therapy LED Aura Rings */}
              <div className="absolute bottom-4 left-1/2 z-0 flex -translate-x-1/2 gap-12 opacity-40 blur-2xl pointer-events-none select-none">
                <div className="h-10 w-10 rounded-full bg-red-500 animate-pulse" />
                <div className="h-10 w-10 rounded-full bg-blue-500 animate-pulse [animation-delay:1.5s]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Horizontal Running Benefits Strip ─── */}
      <div className="relative z-10 border-t border-white/5 bg-stone-950/60 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-6 items-start">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="flex flex-col items-center gap-3 text-center group"
              >
                <div className="text-stone-500 group-hover:text-gold-400 transition-colors duration-300">
                  <b.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-700 uppercase tracking-widest text-stone-400 leading-normal max-w-[120px] block">
                  {b.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Luxury Video Immersive Cinema Modal ─── */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/90 backdrop-blur-2xl px-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeVideo();
            }}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="relative w-full max-w-4xl rounded-2xl bg-stone-900 border border-white/10 shadow-3xl overflow-hidden"
            >
              {/* Modal Node Dismiss Overlay Triggers */}
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/80 border border-white/10 transition-all duration-200 hover:bg-black/80 hover:text-white cursor-pointer"
                aria-label="Dismiss experience clip window"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>

              {/* Responsive Video Window Core */}
              <div className="aspect-video w-full bg-black relative">
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src={DEMO_VIDEO_URL} type="video/mp4" />
                  Your device legacy parser does not support secure HTML5 video delivery loops.
                </video>
              </div>

              {/* Structural Footer Caption Tag */}
              <div className="px-6 py-3.5 bg-stone-950 border-t border-white/5 text-center">
                <p className="text-[10px] tracking-[0.2em] font-700 text-gold-400 uppercase">
                  SculptGlow™ Smart Gua Sha Massager Treatment Film
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
