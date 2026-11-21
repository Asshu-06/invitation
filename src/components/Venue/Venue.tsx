import { MapPin, Navigation } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeading } from "@/components/Decor/SectionHeading";
import { FourCorners } from "@/components/Decor/Ornament";
import { getDirectionsUrl, getMapEmbedUrl } from "@/lib/maps";
import { SECTION_IDS, weddingDetails } from "@/data/weddingDetails";

export function Venue() {
  const ref = useReveal<HTMLElement>();
  const { venue } = weddingDetails;
  const directions = getDirectionsUrl(venue.name, venue.address);

  return (
    <section ref={ref} id={SECTION_IDS.venue} className="section-pad relative scroll-mt-20 bg-cream/60">
      <SectionHeading script="Where we celebrate" title="The Venue" />

      <div className="mx-auto mt-14 grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_1.15fr]">
        <div data-reveal className="text-center md:text-left">
          <MapPin className="mx-auto h-7 w-7 text-gold-deep md:mx-0" aria-hidden />
          <h3 className="mt-4 font-display text-3xl text-burgundy sm:text-4xl">{venue.name}</h3>
          <p className="mt-3 text-xl text-muted-foreground">{venue.address}</p>
          <p className="mt-6 max-w-md text-lg italic text-muted-foreground md:max-w-none">
            Both the Sumuhurtham and the wedding dinner will be held here.
          </p>
          <a href={directions} target="_blank" rel="noopener noreferrer" className="btn-royal mt-8">
            <Navigation className="h-4 w-4" aria-hidden /> Get Directions
          </a>
        </div>

        <div data-reveal className="arch paper relative overflow-hidden p-3 shadow-lift ornate-frame">
          <FourCorners className="z-10 h-10 w-10 text-gold" />
          <iframe
            title={`Map showing ${venue.name}, ${venue.address}`}
            src={getMapEmbedUrl(venue.name, venue.address)}
            className="arch block aspect-[4/5] w-full border-0 sepia-[0.25] sm:aspect-[4/4]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
