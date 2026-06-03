import { Link } from "react-router-dom";
import { Camera, Send, Play } from "lucide-react";
import { SITE } from "../../lib/utils/constants";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

const cols = [
  {
    title: "Shop",
    links: [
      { label: "Bestsellers", href: "/" },
      { label: "New Arrivals", href: "/" },
      { label: "Gift Cards", href: "/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/" },
      { label: "Shipping", href: "/" },
      { label: "Returns", href: "/" },
      { label: "Warranty", href: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Sustainability", href: "/" },
      { label: "Press", href: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="text-3xl font-bold tracking-tight">
              {SITE.name}<sup className="text-[0.5em] font-medium ml-0.5">™</sup>
            </div>
            <p className="mt-3 text-white/60 text-sm max-w-sm">
              {SITE.description}
            </p>
            <form className="mt-6 flex gap-2 max-w-md" onSubmit={(e) => e.preventDefault()}>
              <Input
                placeholder="Enter your email"
                className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-white"
              />
              <Button variant="secondary" className="bg-white text-black hover:bg-white/90">
                Subscribe
              </Button>
            </form>
            <p className="mt-3 text-xs text-white/40">
              Join 80,000+ readers. No spam. Unsubscribe anytime.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-3 gap-6">
            {cols.map((col) => (
              <div key={col.title}>
                <div className="text-sm font-semibold mb-4">{col.title}</div>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.href} className="text-sm text-white/60 hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-white/50">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            {[Camera, Send, Play].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 grid place-items-center" aria-label="Social">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
