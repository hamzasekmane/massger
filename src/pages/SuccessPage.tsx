import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Package } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { Button } from "../components/ui/Button";

export function SuccessPage() {
  const clear = useCartStore((s) => s.clear);

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="min-h-[70vh] grid place-items-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto h-20 w-20 rounded-full bg-emerald-500 text-white grid place-items-center mb-6 shadow-[0_20px_60px_-10px_rgba(16,185,129,0.5)]"
        >
          <Check className="h-10 w-10" strokeWidth={3} />
        </motion.div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em]">Order confirmed</h1>
        <p className="mt-3 text-[#6b6b6b] text-lg">
          Thank you for choosing Valora™. Your order is on its way.
        </p>

        <div className="mt-8 rounded-3xl bg-[#fafaf9] p-6 text-left flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-white grid place-items-center border border-[#e7e7e6]">
            <Package className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">Estimated delivery</div>
            <div className="text-xs text-[#6b6b6b]">3–5 business days · Tracking sent by email</div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link to="/">
            <Button size="lg" variant="outline" fullWidth>Continue shopping</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
