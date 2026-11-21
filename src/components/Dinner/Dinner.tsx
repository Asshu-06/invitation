import { CalendarDays, Clock, MapPin } from "lucide-react";
import floralSpray from "@/assets/floral-spray.png";
import { useReveal } from "@/hooks/useReveal";
import { OrnamentDivider } from "@/components/Decor/Ornament";
import { SECTION_IDS, weddingDetails } from "@/data/weddingDetails";

export function Dinner() {
  const ref = useReveal<HTMLElement>();
  const { dinner } = weddingDetails;

  const rows = [
    { icon: CalendarDays, label: "Date", value: `${dinner.dayLabel}, ${dinner.dateLabel}` },
    { icon: Clock, label: "Time", value: dinner.timeLabel },
    { icon: MapPin, label: "Venue", value: dinner.venueName },
  ];

  return (
    <section ref={ref} id={SECTION_IDS.dinner} className="velvet section-pad relative scroll-mt-20 overflow-hidden text-ivory">
      <div className="pointer-events-none absolute inset-4 border border-gold/40 sm:inset-8" aria-hidden />
      <div className="relative mx-auto max-w-3xl text-center">
        <div data-reveal>
          <p className="label-caps text-xs text-gold-light">You are cordially invited to</p>
          <h2 className="mt-3 font-script text-6xl leading-tight text-gold-foil animate-shimmer sm:text-7xl">Wedding Dinner</h2>
          <OrnamentDivider className="mx-auto mt-4 text-gold" />
          <p className="mx-auto mt-6 max-w-xl text-xl italic text-ivory/85">
            Join us for an evening of togetherness, blessings and celebration.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-3">
          {rows.map(({ icon: Icon, label, value }, i) => (
            <li
              key={label}
              data-reveal
              data-reveal-delay={i * 0.1}
              className="arch flex flex-col items-center gap-3 border border-gold/50 bg-maroon/40 px-5 pb-8 pt-10 backdrop-blur-sm"
            >
              <Icon className="h-6 w-6 text-gold" aria-hidden />
              <span className="label-caps text-[0.65rem] text-gold-light">{label}</span>
              <span className="font-display text-xl text-ivory">{value}</span>
            </li>
          ))}
        </ul>

        <img src={floralSpray} alt="" className="floral-blend mx-auto mt-12 w-64 opacity-90" data-reveal />
      </div>
    </section>
  );
}
