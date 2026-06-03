import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils/cn";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...rest }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-2xl border border-[#e7e7e6] bg-white px-4 text-sm text-[#0a0a0a] placeholder:text-[#9a9a9a] focus:outline-none focus:border-[#0a0a0a] transition-colors",
        className
      )}
      {...rest}
    />
  )
);
Input.displayName = "Input";
