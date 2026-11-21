import { Sparkles, UtensilsCrossed } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeading } from "@/components/Decor/SectionHeading";
import { SECTION_IDS, weddingDetails } from "@/data/weddingDetails";

const { muhurtham, dinner, venue } = weddingDetails;

// Built only from confirmed details in weddingDetails.ts — no invented events or times.
const EVENTS = [
  {
    title: "Sumuhurtham",
    icon: Sparkles,
    when: `${muhurtham.dayLabel}, ${muhurtham.dateLabel}`,
    time: muhurtham.timeLabel,
    where: venue.name,
    href: `#${SECTION_IDS.details}`,
  },
  {
    title: "Wedding Dinner",
    icon: UtensilsCrossed,
    when: `${dinner.dayLabel}, ${dinner.dateLabel}`,
    time: dinner.timeLabel,
    where: dinner.venueName,
    href: `#${SECTION_IDS.dinner}`,
  },
];

export function Timeline() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id={SECTION_IDS.timeline} className="section-pad relative scroll-mt-20">
      <SectionHeading script="The celebrations" title="Wedding Day" />

      <ol className="relative mx-auto mt-14 max-w-3xl">
        <span
          className="absolute bottom-6 left-6 top-6 w-px bg-gradient-to-b from-gold/0 via-gold to-gold/0 sm:left-1/2"
          aria-hidden
        />
        {EVENTS.map((event, i) => {
          const Icon = event.icon;
          const right = i % 2 === 1;
          return (
            <li key={event.title} data-reveal className="relative mb-12 grid grid-cols-[3rem_1fr] gap-5 last:mb-0 sm:grid-cols-2 sm:gap-16">
              <span className="relative z-10 col-start-1 row-start-1 flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-paper shadow-gold sm:absolute sm:left-1/2 sm:top-6 sm:-translate-x-1/2">
                <Icon className="h-5 w-5 text-burgundy" aria-hidden />
              </span>
              <a
                href={event.href}
                className={`paper group col-start-2 row-start-1 block rounded-sm p-6 text-left shadow-paper ornate-frame transition-transform duration-500 hover:-translate-y-1 sm:p-8 ${
                  right ? "sm:col-start-2" : "sm:col-start-1 sm:text-right"
                }`}
              >
                <p className="label-caps text-[0.65rem] text-gold-deep">{event.when}</p>
                <h3 className="mt-2 font-display text-2xl text-burgundy">{event.title}</h3>
                <p className="mt-1 font-script text-3xl text-gold-deep">{event.time}</p>
                <p className="mt-2 text-muted-foreground">{event.where}</p>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
