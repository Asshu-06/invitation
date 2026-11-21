import { ArrowUp, Phone } from "lucide-react";
import floralCorner from "@/assets/floral-corner.png";
import floralSpray from "@/assets/floral-spray.png";
import { useReveal } from "@/hooks/useReveal";
import { OrnamentDivider } from "@/components/Decor/Ornament";
import { SECTION_IDS, weddingDetails } from "@/data/weddingDetails";

export function Footer() {
  const ref = useReveal<HTMLElement>();
  const { sender, bestCompliments, closingMessage, groom, bride } = weddingDetails;

  return (
    <footer ref={ref} id={SECTION_IDS.contact} className="section-pad relative scroll-mt-20 overflow-hidden bg-cream/70">
      <img src={floralCorner} alt="" className="floral-blend absolute -left-8 -top-8 w-40 sm:w-60" />
      <img src={floralCorner} alt="" className="floral-blend absolute -bottom-8 -right-8 w-40 rotate-180 sm:w-60" />

      <div className="relative mx-auto max-w-3xl text-center">
        <img src={floralSpray} alt="" className="floral-blend mx-auto w-60 sm:w-72" data-reveal />
        <p className="mx-auto mt-6 max-w-2xl font-script text-4xl leading-snug text-burgundy sm:text-5xl" data-reveal>
          {closingMessage}
        </p>
        <OrnamentDivider className="mx-auto mt-8" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div data-reveal className="paper relative flex flex-col items-center px-6 py-8 shadow-paper ornate-frame">
            <p className="label-caps text-[0.65rem] text-gold-deep">With love from</p>
            <p className="mt-3 font-display text-2xl text-burgundy">{sender.name}</p>
            <p className="mt-1 font-script text-2xl text-gold-deep">({sender.nickname})</p>
            <p className="label-caps mt-2 text-xs text-muted-foreground">{sender.place}</p>
            <a href={`tel:${sender.phone}`} className="btn-ghost-gold mt-5">
              <Phone className="h-3.5 w-3.5" aria-hidden /> Cell: {sender.phone}
            </a>
          </div>
          <div data-reveal className="paper relative flex flex-col items-center px-6 py-8 shadow-paper ornate-frame">
            <p className="label-caps text-[0.65rem] text-gold-deep">Best Compliments</p>
            <p className="mb-5 mt-3 font-display text-2xl text-burgundy">{bestCompliments.name}</p>
            <a href={`tel:${bestCompliments.phone}`} className="btn-ghost-gold mt-auto">
              <Phone className="h-3.5 w-3.5" aria-hidden /> {bestCompliments.phone}
            </a>
          </div>
        </div>

        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="btn-royal mt-14" data-reveal>
          <ArrowUp className="h-4 w-4" aria-hidden /> Back to Top
        </button>

        <p className="mt-12 font-script text-3xl text-gold-deep">
          {groom.shortName} &amp; {bride.shortName}
        </p>
        <p className="label-caps mt-1 text-[0.6rem] text-muted-foreground">02 · 12 · 2026</p>
      </div>
    </footer>
  );
}
