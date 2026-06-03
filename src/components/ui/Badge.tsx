import type { ReactNode } from "react";
import { cn } from "../../lib/utils/cn";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "dark" | "success" | "warning" | "outline";
  className?: string;
}

const styles = {
  default: "bg-[#f4f4f3] text-[#0a0a0a]",
  dark: "bg-[#0a0a0a] text-white",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  outline: "bg-white text-[#0a0a0a] border border-[#e7e7e6]",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-tight",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
