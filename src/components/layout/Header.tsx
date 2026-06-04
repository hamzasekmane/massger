import { Link } from "react-router-dom";
import { Menu, ShoppingBag, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useScroll } from "../../hooks/useScroll";
import { NAV_LINKS } from "../../lib/utils/constants";
import { cn } from "../../lib/utils/cn";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const { totalQuantity, openCart } = useCart();
  const { scrolled } = useScroll(20);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar - Luxury Warm Gold Gradient */}
      <div className="bg-gradient-to-r from-gold-700 via-gold-600 to-gold-700 text-gold-50 border-b border-gold-600/20">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-[11px] tracking-[0.15em] font-700 uppercase sm:text-xs">
          <Sparkles className="h-3.5 w-3.5 text-gold-200 shrink-0 animate-pulse" />
          <span>
            Limited Time: <span className="text-white font-800 underline decoration-gold-300 underline-offset-4">50% Off</span> + Complimentary Shipping
          </span>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-gold-100/60 bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-cream/90 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            
            {/* Left Side: Brand Logo and Responsive Drawer Button */}
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={() => setMenuOpen(true)}
                className="rounded-xl p-2.5 -ml-2.5 text-stone-700 transition-colors hover:bg-sand/60 lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5.5 w-5.5" />
              </button>

              <Link to="/" className="group flex items-center gap-1.5 select-none">
                <span className="font-display text-2xl sm:text-3xl font-700 tracking-tighter text-stone-900 transition-colors group-hover:text-gold-700">
                  VALORA
                </span>
                <span className="text-xl leading-none text-gold-500 transform transition-transform duration-300 ease-out group-hover:rotate-45 group-hover:scale-110">
                  ✦
                </span>
              </Link>
            </div>

            {/* Center Desktop Context Links */}
            <nav className="hidden items-center gap-8 lg:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-sans font-600 text-[13px] tracking-widest uppercase text-stone-600 hover:text-gold-600 transition-colors duration-200 relative py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side Interface Control Nodes */}
            <div className="flex items-center gap-1">
              <button
                className="hidden rounded-xl p-2.5 text-stone-700 transition-colors hover:bg-sand/60 hover:text-gold-600 sm:flex"
                aria-label="Search Collection"
              >
                <Search className="h-4.5 w-4.5" />
              </button>

              <button
                onClick={openCart}
                className="relative rounded-xl p-2.5 text-stone-700 transition-colors hover:bg-sand/60 hover:text-gold-600"
                aria-label="Open bag details"
              >
                <ShoppingBag className="h-4.5 w-4.5" />
                
                {totalQuantity > 0 && (
                  <span className="absolute right-1 top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-stone-900 px-1 text-[9px] font-700 text-white shadow-sm ring-2 ring-white animate-in zoom-in-50 duration-200">
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Responsive Drawer Overlay */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
