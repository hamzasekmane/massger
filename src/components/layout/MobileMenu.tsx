import { AnimatePresence, motion, Variants } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { NAV_LINKS, SITE } from "../../lib/utils/constants";

interface Props { 
  open: boolean; 
  onClose: () => void; 
}

// Enforcing strict Framer Motion 'Variants' types explicitly handles literal casting
const navListVariants: Variants = {
  animate: { transition: { staggerChildren: 0.06 } }
};

const navItemVariants: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15 
    } 
  },
  exit: { 
    opacity: 0, 
    y: 10, 
    transition: { 
      duration: 0.15 
    } 
  }
};

export function MobileMenu({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Immersive Blurred Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Drawer Side Sheet */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 bottom-0 w-[86%] max-w-sm bg-cream z-50 lg:hidden flex flex-col shadow-2xl border-r border-gold-100/40"
          >
            {/* Header Identity Bar */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-gold-100/60 bg-white/50">
              <Link to="/" onClick={onClose} className="group flex items-center gap-1.5 select-none">
                <span className="font-display text-2xl font-700 tracking-tighter text-stone-900 uppercase">
                  {SITE.name}
                </span>
                <span className="text-lg text-gold-500">✦</span>
              </Link>
              
              <button 
                onClick={onClose} 
                className="p-2.5 rounded-xl text-stone-500 hover:bg-sand/80 hover:text-stone-900 transition-colors duration-200" 
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Staggered Animated Links Stack */}
            <motion.nav 
              variants={navListVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 p-6 flex flex-col gap-1.5 overflow-y-auto"
            >
              {NAV_LINKS.map((l) => (
                <motion.div key={l.href} variants={navItemVariants}>
                  <Link
                    to={l.href}
                    onClick={onClose}
                    className="block px-4 py-3.5 rounded-xl font-sans font-600 text-sm tracking-widest uppercase text-stone-700 hover:text-gold-700 hover:bg-white border border-transparent hover:border-gold-100/40 shadow-none hover:shadow-sm transition-all duration-200"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* Editorial Footer Branding */}
            <div className="p-6 border-t border-gold-100/60 bg-white/30 text-[10px] tracking-wider uppercase font-600 text-stone-400 space-y-1">
              <div>
                © {new Date().getFullYear()} {SITE.name}. All Rights Reserved.
              </div>
              <div className="text-[9px] font-400 text-stone-400/80 normal-case italic">
                {SITE.tagline}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
