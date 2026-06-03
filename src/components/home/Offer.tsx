import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { ArrowRight, Check } from "lucide-react";

function useCountdown(target: Date) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  return {
    hours: Math.floor(diff / 3.6e6),
    minutes: Math.floor((diff / 6e4) % 60),
    seconds: Math.floor((diff / 1e3) % 60),
  };
}

export function Offer({ handle }: { handle: string }) {
  // End of today
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const { hours, minutes, seconds } = useCountdown(end);
  const pad = (n: number) => n.toString().padStart(2, "0");

  const productDetails = [
    "Smart Cupping & Scraping Massager",
    "USB Charging Cable + User Manual",
    "Free Worldwide Shipping",
    "30-Day Money-Back Guarantee",
  ];

  return (
    <section id="offer" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-[2rem] overflow-hidden bg-[#0a0a0a] text-white relative">
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              poster="/images/1.jpg"
            >
              <source src="/images/vid.mp4" type="video/mp4" />
              {/* Fallback: You can replace with your own video URL */}
              {/* <source src="/videos/offer-bg.mp4" type="video/mp4" /> */}
            </video>
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />
          </div>

          {/* Subtle background glow */}
          <div className="absolute inset-0 opacity-20 z-[1] [background:radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_80%_100%,rgba(255,255,255,0.18),transparent_45%)]" />
          
          <div className="relative z-10 px-6 sm:px-12 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: Content */}
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-soft-pulse" />
                Flash drop ends in
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.05]">
                Save 47% — for the<br />next few hours.
              </h2>
              
              <p className="mt-5 text-white/70">
                Once the timer hits zero, prices return to retail. No restocks at this price for the rest of the year.
              </p>

              {/* Product Details / Trust Checklist */}
              <ul className="mt-6 space-y-3">
                {productDetails.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/85">
                    <Check className="h-4 w-4 shrink-0 text-green-400" />
                    <span className="text-sm sm:text-base font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Link to={`/products/${handle}`} className="inline-block mt-8">
                <Button size="xl" variant="secondary" className="bg-white text-black hover:bg-white/90">
                  Claim your Valora™
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Right: Countdown */}
            <div className="flex justify-center lg:justify-end">
              <div className="grid grid-cols-3 gap-3 sm:gap-5">
                {[
                  { label: "Hours", value: pad(hours) },
                  { label: "Minutes", value: pad(minutes) },
                  { label: "Seconds", value: pad(seconds) },
                ].map((u) => (
                  <div key={u.label} className="bg-white/5 backdrop-blur rounded-2xl px-5 sm:px-8 py-5 text-center min-w-[88px]">
                    <div className="text-4xl sm:text-5xl font-bold tabular-nums tracking-tight">{u.value}</div>
                    <div className="mt-1.5 text-[10px] sm:text-xs uppercase tracking-widest text-white/50">{u.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}