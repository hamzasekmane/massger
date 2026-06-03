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
import { PageLoader } from "../components/ui/Loader";
import BodyParts from "../components/home/BodyParts";

export function HomePage() {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts(1)
      .then((items) => setProduct(items[0] ?? null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;
  if (!product) return <PageLoader />;

  return (
    <>
      <Hero product={product} />
      <TrustBar />
      <BodyParts />
      <Features />
      <BeforeAfter />
      <Offer handle={product.handle} />
      <Testimonials />
      <Shipping />
      <FAQ />
    </>
  );
}
