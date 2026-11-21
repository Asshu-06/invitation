import { cn } from "@/lib/utils";

/** Gold lotus divider used between headings and text. */
export function OrnamentDivider({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 24" className={cn("h-5 w-48 text-gold-deep", className)} aria-hidden fill="none">
      <path d="M2 12h86" stroke="currentColor" strokeWidth="0.8" />
      <path d="M152 12h86" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="92" cy="12" r="1.6" fill="currentColor" />
      <circle cx="148" cy="12" r="1.6" fill="currentColor" />
      <path d="M100 12c6-1 10-4 12-9 2 5 6 8 12 9-6 1-10 4-12 9-2-5-6-8-12-9Z" fill="currentColor" opacity="0.9" />
      <path d="M104 12c-3-3-7-4-10-3 2 2 5 3 10 3Zm32 0c3-3 7-4 10-3-2 2-5 3-10 3Z" fill="currentColor" opacity="0.7" />
      <circle cx="120" cy="12" r="2" fill="var(--paper)" />
    </svg>
  );
}

/** Corner filigree for framed panels. Rotate via className for each corner. */
export function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={cn("pointer-events-none absolute h-14 w-14 text-gold", className)} aria-hidden fill="none">
      <path d="M4 76V20C4 11 11 4 20 4h56" stroke="currentColor" strokeWidth="1" />
      <path d="M10 76V26c0-9 7-16 16-16h50" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
      <path d="M18 18c6 0 10 3 12 9-6-1-10-4-12-9Zm0 0c0 6 3 10 9 12-1-6-4-10-9-12Z" fill="currentColor" />
      <circle cx="18" cy="18" r="2.2" fill="currentColor" />
      <path d="M34 4c2 4 6 6 10 6M4 34c4 2 6 6 6 10" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

export function FourCorners({ className }: { className?: string }) {
  return (
    <>
      <CornerFlourish className={cn("left-3 top-3", className)} />
      <CornerFlourish className={cn("right-3 top-3 rotate-90", className)} />
      <CornerFlourish className={cn("bottom-3 right-3 rotate-180", className)} />
      <CornerFlourish className={cn("bottom-3 left-3 -rotate-90", className)} />
    </>
  );
}
