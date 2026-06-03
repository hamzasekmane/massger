import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[#0a0a0a] text-white hover:bg-black active:scale-[0.98] shadow-[0_8px_24px_rgba(0,0,0,0.15)]",
  secondary:
    "bg-[#f4f4f3] text-[#0a0a0a] hover:bg-[#ececeb] active:scale-[0.98]",
  ghost:
    "bg-transparent text-[#0a0a0a] hover:bg-[#f4f4f3] active:scale-[0.98]",
  outline:
    "bg-white text-[#0a0a0a] border border-[#e7e7e6] hover:border-[#0a0a0a] active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm rounded-xl",
  md: "h-11 px-5 text-sm rounded-2xl",
  lg: "h-13 px-7 text-base rounded-2xl",
  xl: "h-15 px-8 text-base rounded-2xl font-semibold",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, fullWidth, disabled, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...rest}
      >
        {loading && (
          <span className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
