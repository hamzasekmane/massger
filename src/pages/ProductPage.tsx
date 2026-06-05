import { useEffect, useState, useTransition } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { getAllProducts } from "../lib/shopify/products";
import { Skeleton } from "../components/ui/Loader";
import { ProductGallery } from "../components/product/ProductGallery";
import { ProductInfo } from "../components/product/ProductInfo";
import { AddToCart } from "../components/product/AddToCart";
import { StickyCart } from "../components/product/StickyCart";
import { Reviews } from "../components/product/Reviews";
import { FAQ } from "../components/home/FAQ";
import { Shipping } from "../components/home/Shipping";
import { Button } from "../components/ui/Button";
import { Sparkles, ShieldCheck, Zap, RefreshCw } from "lucide-react";

export function ProductPage() {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(handle);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!product || Object.keys(selected).length > 0) return;
    
    const init: Record<string, string> = {};
    product.variants[0]?.selectedOptions.forEach((o) => {
      init[o.name] = o.value;
    });
    setSelected(init);
  }, [product, selected]);

  useEffect(() => {
    if (!loading && error && !product) {
      let isMounted = true;
      console.warn(`[ProductPage] Handle "${handle}" not found. Redirecting to first available product.`);
      
      getAllProducts(1).then((items) => {
        if (isMounted && items.length > 0) {
          navigate(`/products/${items[0].handle}`, { replace: true });
        }
      });
      return () => { isMounted = false; };
    }
  }, [loading, error, product, handle, navigate]);

  if (loading) return <ProductSkeleton />;

  if (error || !product) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-cream/30 selection:bg-gold-200">
        <div className="max-w-md w-full text-center space-y-6 p-10 rounded-3xl bg-white border border-gold-100 shadow-xl shadow-gold-900/[0.02] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-50 text-gold-600 mb-2 border border-gold-100">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="font-display font-700 text-3xl text-stone-900 tracking-tight">Collection Artifact Missing</h2>
          <p className="text-stone-500 text-sm leading-relaxed font-sans font-400">
            The specific luxury device you are looking for is currently unavailable or has been relocated within our registry.
          </p>
          <code className="block bg-sand/30 rounded-xl px-4 py-3 text-xs font-mono text-stone-600 border border-gold-100/60 break-all select-all">
            "{handle ?? 'undefined'}"
          </code>
          <div className="pt-2">
            <Link to="/" className="block">
              <Button className="w-full bg-stone-900 text-white hover:bg-stone-800 transition-all duration-300 py-3.5 rounded-xl font-sans font-600 text-sm tracking-wider uppercase shadow-sm">
                Return to Atelier
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const variant = product.variants.find((v) =>
    v.selectedOptions.every((o) => selected[o.name] === o.value)
  ) ?? product.variants[0];

  return (
    <div className="bg-white min-h-screen antialiased selection:bg-stone-950 selection:text-white">
      {/* Editorial Breadcrumb Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 text-[10px] tracking-[0.2em] uppercase text-stone-400 font-700">
        <Link to="/" className="hover:text-gold-600 transition-colors duration-150">Home</Link>
        <span className="mx-3 text-stone-300">·</span>
        <span className="hover:text-gold-600 transition-colors duration-150">Wellness Devices</span>
        <span className="mx-3 text-stone-300">/</span>
        <span className="text-stone-900 font-800">{product.title}</span>
      </nav>

      {/* Main Split Layout Block */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 pb-36 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 items-start">
          
          {/* Left: Interactive Media Wall Layer */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 lg:self-start">
            <div className="relative group rounded-3xl overflow-hidden bg-cream border border-gold-100/40 shadow-sm p-4 sm:p-6 lg:p-8">
              <ProductGallery images={product.images} title={product.title} />
              
              {/* Luxury Product USP Tag Overlays for 2026 Conversion Rates */}
              <div className="hidden sm:flex items-center gap-6 mt-8 pt-6 border-t border-gold-100/40 text-[11px] font-600 text-stone-500 tracking-wider uppercase justify-center">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-gold-600" strokeWidth={1.5} />
                  <span>Microcurrent Therapy</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-gold-600" strokeWidth={1.5} />
                  <span>Sonic Kinetic Vibration</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold-600" strokeWidth={1.5} />
                  <span>Dermatologist Approved</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Architectural Checkout/Configuration Column */}
          <div className="lg:col-span-5 space-y-10 lg:pt-2">
            <div className="space-y-8 bg-cream/20 border border-gold-100/30 rounded-3xl p-6 sm:p-8 shadow-2xs">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-800 tracking-[0.25em] uppercase text-gold-600 bg-gold-50 border border-gold-100 px-2.5 py-1 rounded-md">
                  ✦ Next-Gen Skincare Essential
                </span>
                <ProductInfo
                  product={product}
                  selectedVariant={variant}
                  selectedOptions={selected}
                  onSelectOption={(name, value) => {
                    startTransition(() => {
                      setSelected((s) => ({ ...s, [name]: value }));
                    });
                  }}
                />
              </div>
              
              <div className="pt-6 border-t border-gold-100/40">
                <AddToCart product={product} variant={variant} />
              </div>
            </div>

            {/* Content Narrative Block */}
            <div id="story" className="border border-stone-100 bg-white rounded-3xl p-6 sm:p-8 shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <h3 className="text-[11px] font-700 tracking-[0.2em] uppercase text-gold-600">
                  The Device & Architecture
                </h3>
                <span className="font-mono text-[10px] text-stone-400">MODEL RE-2026</span>
              </div>
              <div
                className="text-stone-700 leading-relaxed text-sm prose prose-stone max-w-none 
                  prose-p:mb-4 prose-p:leading-relaxed prose-headings:font-display prose-headings:text-stone-900 prose-strong:text-stone-900"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Proof & Verification Layer */}
        <section className="mt-32 pt-20 border-t border-stone-100">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
              <span className="text-[10px] font-700 tracking-[0.3em] uppercase text-gold-600 block">Verified Experience</span>
              <h2 className="font-display font-700 text-3xl sm:text-4xl text-stone-900 tracking-tight">Real Results, Absolute Luxury</h2>
            </div>
            <Reviews />
          </div>
        </section>
      </main>

      {/* Editorial Accordion Support System */}
      <div className="bg-cream/40 border-t border-gold-100/50 py-10">
        <Shipping />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gold-100/30">
          <FAQ />
        </div>
      </div>

      {/* Smart Contextual Persistent Action Overlay */}
      <StickyCart product={product} variant={variant} />
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 animate-pulse">
      <div className="lg:col-span-7">
        <Skeleton className="aspect-square w-full rounded-3xl bg-cream border border-gold-100/30" />
        <div className="flex gap-4 mt-6 justify-center">
          <Skeleton className="h-4 w-28 bg-sand/40 rounded" />
          <Skeleton className="h-4 w-28 bg-sand/40 rounded" />
          <Skeleton className="h-4 w-28 bg-sand/40 rounded" />
        </div>
      </div>
      <div className="lg:col-span-5 space-y-8 bg-cream/10 border border-gold-100/20 rounded-3xl p-8">
        <div className="space-y-4">
          <Skeleton className="h-4 w-1/4 bg-gold-200/50 rounded" />
          <Skeleton className="h-12 w-11/12 bg-stone-100 rounded-xl" />
          <Skeleton className="h-6 w-1/3 bg-sand/40 rounded" />
        </div>
        <div className="h-px bg-gold-100/40 my-6" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-16 bg-sand/40 rounded" />
          <div className="flex gap-3">
            <Skeleton className="h-11 w-24 bg-stone-50 rounded-xl" />
            <Skeleton className="h-11 w-24 bg-stone-50 rounded-xl" />
          </div>
        </div>
        <Skeleton className="h-14 w-full bg-stone-900/10 rounded-xl mt-8" />
        <div className="space-y-3 pt-6 border-t border-gold-100/20">
          <Skeleton className="h-4 bg-sand/30 w-full rounded" />
          <Skeleton className="h-4 bg-sand/30 w-5/6 rounded" />
        </div>
      </div>
    </div>
  );
}
