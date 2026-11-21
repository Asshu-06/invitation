import { CalendarDays, Clock, MapPin } from "lucide-react";
import floralSpray from "@/assets/floral-spray.png";
import floralCorner from "@/assets/floral-corner.png";
import { useReveal } from "@/hooks/useReveal";
import { CornerFlourish, OrnamentDivider } from "@/components/Decor/Ornament";
import { SECTION_IDS, weddingDetails } from "@/data/weddingDetails";

export function WeddingDetails() {
  const ref = useReveal<HTMLElement>();
  const { groom, bride, muhurtham, venue } = weddingDetails;

  return (
    <section ref={ref} id={SECTION_IDS.details} className="section-pad relative scroll-mt-20 bg-cream/60">
      <div
        data-reveal
        className="paper relative mx-auto max-w-3xl overflow-hidden px-6 py-16 text-center shadow-lift sm:px-14 sm:py-20"
      >
        <div className="pointer-events-none absolute inset-3 border border-gold/70 sm:inset-5" aria-hidden />
        <div className="pointer-events-none absolute inset-[18px] border border-gold/40 sm:inset-[26px]" aria-hidden />
        <CornerFlourish className="right-7 top-7 rotate-90 text-gold-deep sm:right-9 sm:top-9" />
        <CornerFlourish className="bottom-7 left-7 -rotate-90 text-gold-deep sm:bottom-9 sm:left-9" />
        <img src={floralCorner} alt="" className="floral-blend absolute -left-6 -top-6 w-36 opacity-90 sm:w-48" />
        <img src={floralCorner} alt="" className="floral-blend absolute -bottom-6 -right-6 w-36 rotate-180 opacity-90 sm:w-48" />

        <div className="relative">
          <img src={floralSpray} alt="" className="floral-blend mx-auto w-56 sm:w-72" />
          <p className="label-caps mt-2 text-xs text-gold-deep">Shubha Muhurtham</p>
          <h2 className="mt-2 font-script text-6xl leading-tight text-burgundy sm:text-7xl">Sumuhurtham</h2>
          <OrnamentDivider className="mx-auto mt-4" />

          <p className="mt-8 font-serif text-lg italic text-muted-foreground">{weddingDetails.invitationLine}</p>

          <div className="mt-8 flex flex-col items-center gap-1">
            <p className="font-script text-4xl text-burgundy sm:text-5xl">{groom.fullName}</p>
            <p className="label-caps text-xs text-gold-deep">weds</p>
            <p className="font-script text-4xl text-burgundy sm:text-5xl">{bride.fullName}</p>
          </div>

          <OrnamentDivider className="mx-auto mt-8" />

          <dl className="mx-auto mt-8 grid max-w-xl gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2">
              <CalendarDays className="h-5 w-5 text-gold-deep" aria-hidden />
              <dt className="label-caps text-[0.65rem] text-muted-foreground">Date</dt>
              <dd className="font-display text-lg text-burgundy">
                {muhurtham.dayLabel}
                <br />
                {muhurtham.dateLabel}
              </dd>
            </div>
            <div className="flex flex-col items-center gap-2 sm:border-x sm:border-gold/40">
              <Clock className="h-5 w-5 text-gold-deep" aria-hidden />
              <dt className="label-caps text-[0.65rem] text-muted-foreground">Muhurtham</dt>
              <dd className="font-display text-lg text-burgundy">{muhurtham.timeLabel}</dd>
              {muhurtham.note && <dd className="text-sm italic text-muted-foreground">{muhurtham.note}</dd>}
            </div>
            <div className="flex flex-col items-center gap-2">
              <MapPin className="h-5 w-5 text-gold-deep" aria-hidden />
              <dt className="label-caps text-[0.65rem] text-muted-foreground">Venue</dt>
              <dd className="font-display text-lg text-burgundy">{venue.name}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
