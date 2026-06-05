import { useEffect, useState } from "react";
import type { ShopifyProduct } from "../types/shopify";
import { getAllProducts } from "../lib/shopify/products";
import { Hero } from "../components/home/Hero";
import { TrustBar } from "../components/home/TrustBar";
import Features from "../components/home/Features";
import { BeforeAfter } from "../components/home/BeforeAfter";
import { Testimonials } from "../components/home/Testimonials";
import { Offer } from "../components/home/Offer";
import { Shipping } from "../components/home/Shipping";
import { FAQ } from "../components/home/FAQ";
import BodyParts from "../components/home/BodyParts";

export function HomePage() {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getAllProducts(1)
      .then((items) => {
        if (isMounted) setProduct(items[0] ?? null);
      })
      .catch((err) => console.error("[HomePage] Loading Error:", err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  if (loading || !product) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-stone-100" />
            <div className="absolute inset-0 rounded-full border-2 border-stone-900 border-t-transparent animate-spin" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-stone-400">
            Loading Experience
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen selection:bg-stone-900 selection:text-white overflow-x-hidden">
      {/* Hero & Identity Area */}
      <header className="relative">
        <Hero product={product} />
        <TrustBar />
      </header>

      {/* Main Interactive Flow */}
      <main>
        <section className="py-4 md:py-10">
          <BodyParts />
        </section>

        <section className="bg-stone-50 py-16 md:py-24 border-y border-stone-100/80">
          <Features />
        </section>

        <section className="py-16 md:py-24">
          <BeforeAfter />
        </section>

        <section className="py-12 bg-gradient-to-b from-white to-stone-50">
          <Offer handle={product.handle} />
        </section>

        <section className="py-16 md:py-24 bg-stone-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-12 overflow-hidden shadow-2xl">
          <Testimonials />
        </section>
      </main>

      {/* Footer Support Elements */}
      <footer className="bg-stone-50 border-t border-stone-100 mt-12">
        <Shipping />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-200/50">
          <FAQ />
        </div>
      </footer>
    </div>
  );
}
