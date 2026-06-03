import { cn } from "../../lib/utils/cn";

export function Loader({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block h-5 w-5 rounded-full border-2 border-[#0a0a0a] border-r-transparent animate-spin",
        className
      )}
      aria-label="Loading"
    />
  );
}

export function PageLoader() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="flex flex-col items-center gap-3 text-[#6b6b6b]">
        <Loader />
        <span className="text-sm">Loading…</span>
      </div>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-2xl", className)} />;
}
