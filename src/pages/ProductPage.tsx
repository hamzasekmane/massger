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
      <div className="min-h-[75vh] flex items-center justify-center px-4 bg-cream/50 selection:bg-gold-200">
        <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-white border border-gold-100 shadow-sm reveal">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold-50 text-gold-600 mb-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="font-display font-700 text-3xl text-stone-900 tracking-tight">Product not found</h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            We couldn't track down the specific piece you are looking for. It might have sold out or changed locations.
          </p>
          <code className="block bg-sand/40 rounded-xl px-4 py-3 text-xs font-mono text-stone-700 border border-gold-100 break-all select-all">
            "{handle ?? 'undefined'}"
          </code>
          <div className="pt-2">
            <Link to="/" className="block">
              <Button className="w-full bg-stone-900 text-white hover:bg-stone-800 transition-all duration-200 py-3 rounded-xl shadow-sm">
                ← Back to Home
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
    <div className="bg-white min-h-screen antialiased selection:bg-gold-900 selection:text-white">
      {/* Breadcrumb Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-[11px] tracking-widest uppercase text-stone-400 font-600">
        <Link to="/" className="hover:text-gold-600 transition-colors duration-150">Home</Link>
        <span className="mx-3 text-stone-300">/</span>
        <span className="text-stone-900 font-700">{product.title}</span>
      </nav>

      {/* Main Structural Block */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14 pb-36 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
          
          {/* Gallery Deck */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 lg:self-start reveal">
            <div className="overflow-hidden rounded-3xl bg-cream border border-gold-100/40">
              <ProductGallery images={product.images} title={product.title} />
            </div>
          </div>

          {/* Action Details Hub */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div className="space-y-8">
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
              
              <div className="pt-4 border-t border-stone-100">
                <AddToCart product={product} variant={variant} />
              </div>
            </div>

            {/* Content Context Block */}
            <div id="story" className="pt-8 border-t border-stone-100">
              <h3 className="text-[11px] font-700 tracking-widest uppercase text-gold-600 mb-4">The Story & Details</h3>
              <div
                className="text-stone-800 leading-relaxed text-[15px] prose prose-stone max-w-none 
                  prose-p:mb-4 prose-headings:font-display prose-headings:text-stone-900"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </div>
          </div>
        </div>

        {/* Reviews section context */}
        <section className="mt-28 pt-16 border-t border-stone-100">
          <div className="max-w-4xl mx-auto">
            <Reviews />
          </div>
        </section>
      </main>

      <div className="bg-cream/40 border-t border-gold-100/60">
        <Shipping />
        <FAQ />
      </div>

      <StickyCart product={product} variant={variant} />
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
      <div className="lg:col-span-7">
        <Skeleton className="aspect-[4/5] sm:aspect-square w-full rounded-3xl bg-sand/40" />
      </div>
      <div className="lg:col-span-5 space-y-6 py-2">
        <Skeleton className="h-4 w-1/4 bg-sand/60 rounded" />
        <Skeleton className="h-10 w-3/4 bg-stone-100 rounded-xl" />
        <Skeleton className="h-5 w-1/3 bg-sand/40 rounded" />
        <div className="h-px bg-stone-100 my-8" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-16 bg-sand/50 rounded" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-20 bg-stone-50 rounded-lg" />
            <Skeleton className="h-10 w-20 bg-stone-50 rounded-lg" />
          </div>
        </div>
        <Skeleton className="h-14 w-full bg-stone-900/5 rounded-2xl mt-8" />
        <div className="space-y-3 pt-8">
          <Skeleton className="h-4 bg-sand/30 w-full rounded" />
          <Skeleton className="h-4 bg-sand/30 w-5/6 rounded" />
          <Skeleton className="h-4 bg-sand/30 w-2/3 rounded" />
        </div>
      </div>
    </div>
  );
}
