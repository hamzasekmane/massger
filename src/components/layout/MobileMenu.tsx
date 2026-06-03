import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { NAV_LINKS, SITE } from "../../lib/utils/constants";

interface Props { open: boolean; onClose: () => void }

export function MobileMenu({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50 md:hidden"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 bottom-0 w-[84%] max-w-sm bg-white z-50 md:hidden flex flex-col"
          >
            <div className="h-16 px-5 flex items-center justify-between border-b border-[#e7e7e6]">
              <Link to="/" onClick={onClose} className="text-xl font-bold tracking-tight">
                {SITE.name}<sup className="text-[0.5em] font-medium ml-0.5">™</sup>
              </Link>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-[#f4f4f3]" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 p-5 flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={onClose}
                  className="px-4 py-4 rounded-2xl text-lg font-medium hover:bg-[#f4f4f3]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="p-5 border-t border-[#e7e7e6] text-xs text-[#6b6b6b]">
              © {new Date().getFullYear()} {SITE.name}. {SITE.tagline}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
