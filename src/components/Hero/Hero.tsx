import { useRef, useState } from "react";
import { ChevronDown, RotateCcw } from "lucide-react";
import floralCorner from "@/assets/floral-corner.png";
import { Envelope, type EnvelopeHandle, type EnvelopeState } from "@/components/Envelope/Envelope";
import { Particles } from "@/components/Decor/Particles";
import { InvitationFull, InvitationPeek } from "./InvitationCard";
import { SECTION_IDS, weddingDetails } from "@/data/weddingDetails";

interface HeroProps {
  onStateChange: (state: EnvelopeState) => void;
}

export function Hero({ onStateChange }: HeroProps) {
  const envelopeRef = useRef<EnvelopeHandle>(null);
  const [state, setState] = useState<EnvelopeState>("closed");

  const handleState = (next: EnvelopeState) => {
    setState(next);
    onStateChange(next);
  };

  const replay = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    envelopeRef.current?.reset();
  };

  return (
    <section
      id={SECTION_IDS.home}
      data-state={state}
      className="env-hero paper relative z-10 grid min-h-svh grid-rows-[1fr_auto_1fr] justify-items-center px-4"
      aria-label="Wedding invitation"
    >
      <div className="hero-glow" aria-hidden />
      <Particles />
      <img src={floralCorner} alt="" className="hero-floral hero-floral--tl floral-blend" />
      <img src={floralCorner} alt="" className="hero-floral hero-floral--br floral-blend" />

      <div className="hero-fade-closed relative flex flex-col items-center justify-end pb-[clamp(1.5rem,5svh,3.5rem)] text-center">
        <p className="font-script text-3xl text-gold-deep sm:text-4xl">
          {weddingDetails.groom.shortName} &amp; {weddingDetails.bride.shortName}
        </p>
        <p className="label-caps mt-2 text-xs text-burgundy sm:text-sm">{weddingDetails.heroTagline}</p>
      </div>

      <div className="env-float relative">
        <Envelope
          ref={envelopeRef}
          monogram={`${weddingDetails.monogram.first}${weddingDetails.monogram.second}`}
          peek={<InvitationPeek />}
          onStateChange={handleState}
        >
          <InvitationFull />
        </Envelope>
      </div>

      <div className="relative flex w-full flex-col items-center justify-between pb-[5.5rem] pt-[clamp(2rem,7svh,4rem)] sm:pb-24">
        <button
          type="button"
          className="hero-fade-closed btn-royal"
          onClick={() => envelopeRef.current?.open()}
          disabled={state !== "closed"}
        >
          {weddingDetails.openPrompt}
        </button>

        <div className="hero-fade-open flex items-center gap-5">
          <a href={`#${SECTION_IDS.countdown}`} className="label-caps flex items-center gap-1.5 text-[0.65rem] text-burgundy">
            Scroll to explore <ChevronDown className="animate-bob h-4 w-4 text-gold-deep" aria-hidden />
          </a>
          <span className="h-4 w-px bg-gold/60" aria-hidden />
          <button type="button" onClick={replay} className="label-caps flex items-center gap-1.5 text-[0.65rem] text-muted-foreground hover:text-burgundy">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Replay
          </button>
        </div>
      </div>
    </section>
  );
}
