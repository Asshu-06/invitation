import { useState } from "react";
import { Expand } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeading } from "@/components/Decor/SectionHeading";
import { galleryImages } from "@/data/gallery";
import { SECTION_IDS } from "@/data/weddingDetails";
import { Lightbox } from "./Lightbox";

export function Gallery() {
  const ref = useReveal<HTMLElement>();
  const [active, setActive] = useState<number | null>(null);
  const hasPlaceholders = galleryImages.some((img) => img.placeholder);

  return (
    <section ref={ref} id={SECTION_IDS.gallery} className="section-pad relative scroll-mt-20">
      <SectionHeading script="Moments to treasure" title="Gallery" />
      {hasPlaceholders && (
        <p className="mx-auto mt-5 max-w-lg text-center text-base italic text-muted-foreground" data-reveal>
          Placeholder décor images — the couple’s photographs will appear here soon.
        </p>
      )}

      <div className="mx-auto mt-12 max-w-6xl columns-1 gap-5 sm:columns-2 lg:columns-3">
        {galleryImages.map((img, i) => (
          <figure key={img.src} data-reveal className="mb-5 break-inside-avoid">
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group relative block w-full overflow-hidden rounded-sm bg-cream shadow-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              aria-label={`Open photo: ${img.caption}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="block w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
              />
              <span className="pointer-events-none absolute inset-3 border border-ivory/0 transition-colors duration-500 group-hover:border-gold-light/80" aria-hidden />
              <span className="pointer-events-none absolute inset-0 flex items-end justify-between bg-gradient-to-t from-maroon/70 via-maroon/0 to-maroon/0 p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="font-script text-3xl text-ivory">{img.caption}</span>
                <Expand className="h-5 w-5 text-gold-light" aria-hidden />
              </span>
              {img.placeholder && (
                <span className="label-caps absolute left-3 top-3 rounded-full bg-paper/85 px-2.5 py-1 text-[0.55rem] text-burgundy">
                  Placeholder
                </span>
              )}
            </button>
          </figure>
        ))}
      </div>

      {active !== null && (
        <Lightbox images={galleryImages} index={active} onClose={() => setActive(null)} onNavigate={setActive} />
      )}
    </section>
  );
}
