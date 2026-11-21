import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/data/gallery";

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const image = images[index];
  const count = images.length;
  const prev = () => onNavigate((index - 1 + count) % count);
  const next = () => onNavigate((index + 1) % count);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      previousFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNavigate((index + 1) % count);
      else if (e.key === "ArrowLeft") onNavigate((index - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onClose, onNavigate]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${count}: ${image.caption}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-maroon/92 p-4 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        const end = e.changedTouches[0]?.clientX;
        touchX.current = null;
        if (start == null || end == null) return;
        const dx = end - start;
        if (Math.abs(dx) > 50) {
          if (dx < 0) next();
          else prev();
        }
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-ivory transition hover:bg-gold/20"
        aria-label="Close gallery"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 text-ivory transition hover:bg-gold/20 sm:left-6"
        aria-label="Previous photo"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 text-ivory transition hover:bg-gold/20 sm:right-6"
        aria-label="Next photo"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <figure className="flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          className="max-h-[78svh] w-auto max-w-full rounded-sm border border-gold/50 object-contain shadow-lift animate-in fade-in zoom-in-95 duration-500"
        />
        <figcaption className="mt-4 text-center text-ivory">
          <span className="font-script text-3xl text-gold-light">{image.caption}</span>
          <span className="label-caps ml-3 text-[0.65rem] text-ivory/70">
            {index + 1} / {count}
            {image.placeholder ? " · placeholder" : ""}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
