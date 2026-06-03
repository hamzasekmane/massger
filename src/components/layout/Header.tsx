import { Link } from "react-router-dom";
import { Menu, ShoppingBag, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useScroll } from "../../hooks/useScroll";
import { NAV_LINKS, SITE } from "../../lib/utils/constants";
import { cn } from "../../lib/utils/cn";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const { totalQuantity, openCart } = useCart();
  const { scrolled } = useScroll(20);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 to-rose-600 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2.5 text-center text-xs font-semibold tracking-[0.5px] sm:text-sm">
          <Sparkles className="h-4 w-4 shrink-0" />
          <span>
            LIMITED TIME: <span className="font-bold">50% OFF</span> + FREE SHIPPING — ENDS SOON
          </span>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-stone-200 bg-white/90 backdrop-blur-2xl shadow-sm"
            : "bg-white/70 backdrop-blur-md"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Left: Logo + Mobile Menu */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setMenuOpen(true)}
                className="rounded-2xl p-3 -ml-3 transition hover:bg-stone-100 lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6 text-stone-700" />
              </button>

              <Link to="/" className="group flex items-center gap-1">
                <span className="font-display text-3xl font-semibold tracking-tighter text-stone-900">
                  VALORA
                </span>
                <span className="text-4xl leading-none text-amber-500 group-hover:rotate-12 transition">✦</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-10 lg:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-medium text-sm tracking-wide text-stone-600 hover:text-amber-600 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-amber-500 after:transition-all hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              <button
                className="hidden rounded-2xl p-3 text-stone-700 transition hover:bg-stone-100 hover:text-amber-600 sm:flex"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              <button
                onClick={openCart}
                className="relative rounded-2xl p-3 text-stone-700 transition hover:bg-stone-100 hover:text-amber-600"
                aria-label="Open cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalQuantity > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-bold text-white shadow">
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}