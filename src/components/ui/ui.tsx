import type { ReactNode } from "react";

export function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <div className="flex items-center gap-0.5 text-gold-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className={className}>
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={className}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-500">
      {children}
    </p>
  );
}

type IconProps = { className?: string };

export const Icons = {
  levels: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" {...p}>
      <line x1="4" y1="7" x2="20" y2="7" /><circle cx="9" cy="7" r="2.2" fill="currentColor" stroke="none" />
      <line x1="4" y1="12" x2="20" y2="12" /><circle cx="15" cy="12" r="2.2" fill="currentColor" stroke="none" />
      <line x1="4" y1="17" x2="20" y2="17" /><circle cx="8" cy="17" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  heat: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3c1 2-1.5 3-1.5 5a1.5 1.5 0 003 0c0-.8.4-1.4.4-1.4C16 9 16.5 11 16.5 13a4.5 4.5 0 11-9 0c0-3 2.5-4 2.5-6 0-1.5-.5-2.5 2-4z" />
    </svg>
  ),
  suction: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  touch: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 11V6a1.5 1.5 0 013 0v5" /><path d="M12 11V4.5a1.5 1.5 0 013 0V12" /><path d="M15 12v-1.5a1.5 1.5 0 013 0V16a5 5 0 01-5 5h-1.5a5 5 0 01-4.2-2.3L5 15a1.6 1.6 0 012.6-1.8L9 15" />
    </svg>
  ),
  shield: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
  truck: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 7h11v8H3z" /><path d="M14 10h4l3 3v2h-7z" /><circle cx="7" cy="17" r="1.8" /><circle cx="17" cy="17" r="1.8" />
    </svg>
  ),
  refresh: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 12a9 9 0 01-15.5 6.3M3 12A9 9 0 0118.5 5.7" /><path d="M3 4v5h5M21 20v-5h-5" />
    </svg>
  ),
  check: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12l4.5 4.5L19 7" />
    </svg>
  ),
  arrow: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  user: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="8" r="3.5" /><path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
    </svg>
  ),
  cart: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 4h2l2.2 11.5a1.5 1.5 0 001.5 1.2h8.3a1.5 1.5 0 001.5-1.2L20.5 8H6" /><circle cx="9" cy="20" r="1.3" /><circle cx="18" cy="20" r="1.3" />
    </svg>
  ),
  bolt: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" /></svg>
  ),
};
