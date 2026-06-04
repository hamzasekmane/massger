import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-white px-6 py-12 selection:bg-stone-950 selection:text-white">
      <div className="max-w-md w-full text-center relative">
        
        {/* Background Decorative Type Frame */}
        <div className="absolute inset-0 -top-16 flex justify-center items-center pointer-events-none select-none opacity-[0.04]">
          <div className="font-display font-800 text-[26rem] leading-none text-gold-500">404</div>
        </div>

        <div className="relative z-10 space-y-6 reveal">
          <span className="text-[10px] font-800 tracking-[0.25em] uppercase text-gold-600 bg-gold-50 px-3 py-1.5 rounded-full border border-gold-100/60">
            Error Code 404
          </span>
          <h1 className="font-display font-700 text-4xl sm:text-5xl tracking-tight text-stone-900 mt-2">
            Page Not Found
          </h1>
          <p className="text-stone-500 text-sm max-w-xs mx-auto leading-relaxed">
            The page you are looking for has been moved, archived, or doesn't exist anymore.
          </p>
          <div className="pt-4">
            <Link to="/" className="inline-block">
              <Button size="lg" className="bg-stone-900 text-white hover:bg-stone-800 shadow-md shadow-stone-900/10 hover:shadow-xl hover:shadow-stone-900/15 transition-all duration-300 transform hover:-translate-y-0.5 px-8 rounded-xl">
                Take me home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
