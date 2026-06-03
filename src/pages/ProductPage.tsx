import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { getAllProducts } from "../lib/shopify/products";
import type { ShopifyProduct } from "../types/shopify";
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

  // selectedOptions: { [name]: value }
  const [selected, setSelected] = useState<Record<string, string>>({});

  // Initialize from first variant when product loads
  useMemo(() => {
    if (!product) return;
    if (Object.keys(selected).length > 0) return;

    const init: Record<string, string> = {};
    product.variants[0]?.selectedOptions.forEach((o) => {
      init[o.name] = o.value;
    });
    setSelected(init);
  }, [product]);

  // Auto-redirect to first available product if handle not found
  useEffect(() => {
    if (!loading && error && !product) {
      console.warn(`[ProductPage] Handle "${handle}" not found. Redirecting to first available product.`);
      getAllProducts(1).then((items) => {
        if (items.length > 0) {
          navigate(`/products/${items[0].handle}`, { replace: true });
        }
      });
    }
  }, [loading, error, product, handle, navigate]);

  if (loading) return <ProductSkeleton />;

  if (error || !product) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-4 text-center">
        <div className="max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-stone-900">Product not found</h2>
          <p className="mt-3 text-stone-500">
            We couldn't find a product with the handle:
          </p>
          <code className="mt-2 block bg-stone-100 rounded-lg px-4 py-2 text-sm font-mono text-stone-700 break-all">
            "{handle ?? 'undefined'}"
          </code>
          {error && (
            <p className="mt-3 text-xs text-stone-400">
              Debug: {error}
            </p>
          )}
          <p className="mt-4 text-sm text-stone-500">
            Redirecting to our featured product...
          </p>
          <Link to="/" className="inline-block mt-6">
            <Button>← Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Find variant matching all selectedOptions
  const matchVariant = (sel: Record<string, string>) =>
    product.variants.find((v) =>
      v.selectedOptions.every((o) => sel[o.name] === o.value)
    ) ?? product.variants[0];

  const variant = matchVariant(selected);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 text-xs text-stone-500">
        <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-stone-900">{product.title}</span>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-32 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* Info + Cart */}
          <div>
            <ProductInfo
              product={product}
              selectedVariant={variant}
              selectedOptions={selected}
              onSelectOption={(name, value) =>
                setSelected((s) => ({ ...s, [name]: value }))
              }
            />
            <AddToCart product={product} variant={variant} />

            {/* Description */}
            <div id="story" className="mt-10 prose prose-sm max-w-none">
              <div
                className="text-stone-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </div>
          </div>
        </div>

        {/* Sections Below */}
        <div className="mt-20">
          <Reviews />
        </div>
      </div>

      <Shipping />
      <FAQ />

      <StickyCart product={product} variant={variant} />
    </>
  );
}

function ProductSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
      <Skeleton className="aspect-square rounded-2xl" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-2/3 rounded-xl" />
        <Skeleton className="h-4 w-1/3 rounded-xl" />
        <Skeleton className="h-12 w-1/2 mt-6 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-12 mt-6 rounded-xl" />
        <Skeleton className="h-12 rounded-xl" />
      </div>
    </div>
  );
}