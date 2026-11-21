import { useState } from "react";
import { useCountdown } from "@/hooks/useCountdown";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeading } from "@/components/Decor/SectionHeading";
import { SECTION_IDS, weddingDetails } from "@/data/weddingDetails";
import { ScratchCard } from "./ScratchCard";
import { FlowerShower } from "./FlowerShower";

const UNITS = [
  { key: "days",    label: "Days" },
  { key: "hours",   label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

export function Countdown() {
  const ref = useReveal<HTMLElement>();
  const timeLeft = useCountdown(weddingDetails.muhurtham.isoDateTime);
  const { muhurtham } = weddingDetails;

  const [scratched, setScratched] = useState<Set<string>>(new Set());
  const [showShower, setShowShower] = useState(false);

  function handleRevealed(key: string) {
    setScratched((prev) => {
      const next = new Set(prev).add(key);
      if (next.size === UNITS.length) {
        // slight delay so the last card's reveal animation completes first
        setTimeout(() => setShowShower(true), 300);
      }
      return next;
    });
  }

  const allScratched = scratched.size === UNITS.length;

  return (
    <>
      <FlowerShower active={showShower} duration={5000} />

      <section ref={ref} id={SECTION_IDS.countdown} className="section-pad relative scroll-mt-20 overflow-hidden">
        <SectionHeading script="Counting the moments" title="Until We Say I Do" />

        {/* Scratch hint */}
        {!allScratched && !timeLeft?.isPast && (
          <p className="mx-auto mt-4 max-w-sm text-center text-sm italic text-muted-foreground" data-reveal>
            Scratch each card to reveal the countdown ✦
          </p>
        )}

        {timeLeft?.isPast ? (
          <div className="mx-auto mt-12 max-w-xl text-center" data-reveal>
            <p className="font-script text-4xl text-burgundy sm:text-5xl">The auspicious day has arrived</p>
            <p className="mt-4 text-lg text-muted-foreground">
              Thank you for your love and blessings as {weddingDetails.groom.shortName} &amp;{" "}
              {weddingDetails.bride.shortName} begin their new chapter.
            </p>
          </div>
        ) : (
          <div
            className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-6"
            role="timer"
            aria-live="off"
          >
            {UNITS.map((unit, i) => (
              <div
                key={unit.key}
                data-reveal
                data-reveal-delay={i * 0.08}
                className="arch paper aspect-[4/5] shadow-paper ornate-frame overflow-hidden"
                style={{ position: "relative" }}
              >
                <ScratchCard
                  label={unit.label}
                  onRevealed={() => handleRevealed(unit.key)}
                  forceReveal={allScratched}
                >
                  <span className="font-display text-5xl font-medium tabular-nums text-burgundy sm:text-6xl">
                    {timeLeft ? String(timeLeft[unit.key]).padStart(2, "0") : "--"}
                  </span>
                  <span className="label-caps mt-3 text-[0.65rem] text-gold-deep sm:text-xs">{unit.label}</span>
                </ScratchCard>
              </div>
            ))}
          </div>
        )}

        <p className="label-caps mt-12 text-center text-xs text-burgundy" data-reveal>
          {muhurtham.dayLabel}, {muhurtham.dateLabel} · {muhurtham.timeLabel}
        </p>
      </section>
    </>
  );
}
