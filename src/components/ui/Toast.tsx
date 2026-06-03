import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

interface ToastItem { id: number; message: string }
interface ToastCtx { show: (msg: string) => void }

const Ctx = createContext<ToastCtx>({ show: () => {} });

export function useToast() { return useContext(Ctx); }

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
  }, []);

  useEffect(() => {
    if (!toasts.length) return;
    const timers = toasts.map((t) =>
      setTimeout(() => setToasts((curr) => curr.filter((x) => x.id !== t.id)), 2400)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts]);

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pointer-events-auto bg-[#0a0a0a] text-white px-4 py-3 rounded-2xl shadow-lg flex items-center gap-2.5 text-sm font-medium"
            >
              <span className="h-5 w-5 rounded-full bg-emerald-500 grid place-items-center">
                <Check className="h-3 w-3" />
              </span>
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}
