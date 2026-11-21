import { useEffect, useRef } from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrnamentDivider } from "@/components/Decor/Ornament";
import { SECTION_IDS, weddingDetails } from "@/data/weddingDetails";

gsap.registerPlugin(ScrollTrigger);

// ── SVG gold filigree ornament (visible on dark bg) ──────────────
function GoldFiligree({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 80"
      className={`dinner-filigree ${className}`}
      aria-hidden
      fill="none"
    >
      {/* Central lotus */}
      <path
        d="M80 40 C74 30 66 26 60 28 C66 30 72 34 76 40 C72 46 66 50 60 52 C66 54 74 50 80 40Z"
        fill="url(#dg1)" opacity="0.9"
      />
      <path
        d="M80 40 C86 30 94 26 100 28 C94 30 88 34 84 40 C88 46 94 50 100 52 C94 54 86 50 80 40Z"
        fill="url(#dg1)" opacity="0.9"
      />
      <circle cx="80" cy="40" r="3.5" fill="url(#dg1)" />
      {/* Left scroll */}
      <path d="M60 40 Q46 34 32 38 Q22 40 14 36" stroke="url(#dg1)" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M60 40 Q46 46 32 42 Q22 40 14 44" stroke="url(#dg1)" strokeWidth="0.7" strokeLinecap="round" opacity="0.6"/>
      <circle cx="14" cy="40" r="2" fill="url(#dg1)" />
      <circle cx="32" cy="40" r="1.5" fill="url(#dg1)" opacity="0.7"/>
      {/* Right scroll */}
      <path d="M100 40 Q114 34 128 38 Q138 40 146 36" stroke="url(#dg1)" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M100 40 Q114 46 128 42 Q138 40 146 44" stroke="url(#dg1)" strokeWidth="0.7" strokeLinecap="round" opacity="0.6"/>
      <circle cx="146" cy="40" r="2" fill="url(#dg1)" />
      <circle cx="128" cy="40" r="1.5" fill="url(#dg1)" opacity="0.7"/>
      {/* Top & bottom diamonds */}
      <path d="M80 28 L83 23 L80 18 L77 23Z" fill="url(#dg1)" opacity="0.8"/>
      <path d="M80 52 L83 57 L80 62 L77 57Z" fill="url(#dg1)" opacity="0.8"/>
      <defs>
        <linearGradient id="dg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.91 0.07 90)" />
          <stop offset="50%" stopColor="oklch(0.76 0.11 80)" />
          <stop offset="100%" stopColor="oklch(0.6 0.11 70)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Candle flame ─────────────────────────────────────────────────
function Candle({ className = "" }: { className?: string }) {
  return (
    <div className={`dinner-candle ${className}`} aria-hidden>
      <div className="dinner-flame">
        <div className="dinner-flame-inner" />
      </div>
      <div className="dinner-wick" />
      <div className="dinner-wax" />
    </div>
  );
}

// ── Floating gold sparks ─────────────────────────────────────────
const SPARKS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  top:  8  + ((i * 79)  % 84),
  left: 3  + ((i * 61)  % 94),
  size: 2  + ((i * 1.3) %  4),
  delay: (i * 0.41) % 5,
  duration: 1.2 + ((i * 0.23) % 1.8),
}));

function GoldSparks() {
  return (
    <div className="dinner-sparks" aria-hidden>
      {SPARKS.map((s) => (
        <span
          key={s.id}
          className="dinner-spark"
          style={{
            top:    `${s.top}%`,
            left:   `${s.left}%`,
            width:  `${s.size}px`,
            height: `${s.size}px`,
            animationDelay:    `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Detail card ──────────────────────────────────────────────────
function DetailCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <li className="dinner-card">
      <div className="dinner-card-icon">
        <Icon className="h-5 w-5 text-gold" aria-hidden />
      </div>
      <span className="label-caps text-[0.6rem] text-gold-light/80">{label}</span>
      <span className="font-display text-lg leading-tight text-ivory">{value}</span>
      {sub && <span className="mt-0.5 font-serif text-xs italic text-ivory/60">{sub}</span>}
    </li>
  );
}

export function Dinner() {
  const sectionRef  = useRef<HTMLElement>(null);
  const topLineRef  = useRef<HTMLDivElement>(null);
  const subHeadRef  = useRef<HTMLParagraphElement>(null);
  const mainHeadRef = useRef<HTMLHeadingElement>(null);
  const divRef      = useRef<HTMLDivElement>(null);
  const tagRef      = useRef<HTMLParagraphElement>(null);
  const cardsRef    = useRef<HTMLUListElement>(null);
  const candlesRef  = useRef<HTMLDivElement>(null);
  const quoteRef    = useRef<HTMLElement>(null);
  const filRef      = useRef<HTMLDivElement>(null);

  const { dinner, venue } = weddingDetails;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
        defaults: { ease: "power3.out" },
      });

      // 1. Cinematic zoom-in
      gsap.set(section, { scale: 0.96, autoAlpha: 0 });
      tl.to(section, { scale: 1, autoAlpha: 1, duration: 1.1, ease: "power2.out" });

      // 2. Filigree ornaments expand from centre
      if (filRef.current) {
        const fils = filRef.current.querySelectorAll(".dinner-filigree");
        gsap.set(fils, { scaleX: 0, autoAlpha: 0, transformOrigin: "center center" });
        tl.to(fils, { scaleX: 1, autoAlpha: 1, duration: 1.0, stagger: 0.1, ease: "power2.out" }, "-=0.5");
      }

      // 3. Top decorative line
      if (topLineRef.current) {
        gsap.set(topLineRef.current, { scaleX: 0, autoAlpha: 0, transformOrigin: "center center" });
        tl.to(topLineRef.current, { scaleX: 1, autoAlpha: 1, duration: 0.7, ease: "power2.inOut" }, "-=0.6");
      }

      // 4. Sub-heading
      if (subHeadRef.current) {
        gsap.set(subHeadRef.current, { y: 18, autoAlpha: 0 });
        tl.to(subHeadRef.current, { y: 0, autoAlpha: 1, duration: 0.65 }, "-=0.3");
      }

      // 5. Main heading
      if (mainHeadRef.current) {
        gsap.set(mainHeadRef.current, { y: 32, autoAlpha: 0 });
        tl.to(mainHeadRef.current, { y: 0, autoAlpha: 1, duration: 0.9 }, "-=0.2");
      }

      // 6. Divider
      if (divRef.current) {
        gsap.set(divRef.current, { scaleX: 0, autoAlpha: 0, transformOrigin: "center center" });
        tl.to(divRef.current, { scaleX: 1, autoAlpha: 1, duration: 0.6, ease: "power2.inOut" }, "-=0.3");
      }

      // 7. Tagline
      if (tagRef.current) {
        gsap.set(tagRef.current, { y: 16, autoAlpha: 0 });
        tl.to(tagRef.current, { y: 0, autoAlpha: 1, duration: 0.75 }, "-=0.2");
      }

      // 8. Candles pop in
      if (candlesRef.current) {
        const candles = candlesRef.current.querySelectorAll(".dinner-candle");
        gsap.set(candles, { y: 24, autoAlpha: 0, scale: 0.8 });
        tl.to(candles, { y: 0, autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.6)" }, "-=0.3");
      }

      // 9. Cards stagger up
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("li");
        gsap.set(cards, { y: 36, autoAlpha: 0 });
        tl.to(cards, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.13 }, "-=0.2");
      }

      // 10. Closing quote
      if (quoteRef.current) {
        gsap.set(quoteRef.current, { y: 20, autoAlpha: 0 });
        tl.to(quoteRef.current, { y: 0, autoAlpha: 1, duration: 0.9 }, "-=0.3");
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.dinner}
      className="velvet dinner-section section-pad relative scroll-mt-20 overflow-hidden text-ivory"
    >
      {/* Gold sparks layer */}
      <GoldSparks />

      {/* Double gold border frame */}
      <div className="pointer-events-none absolute inset-3 border border-gold/30 sm:inset-6" aria-hidden />
      <div className="pointer-events-none absolute inset-5 border border-gold/15 sm:inset-9" aria-hidden />

      {/* SVG filigree ornaments — top and bottom */}
      <div ref={filRef} className="dinner-filigrees" aria-hidden>
        <GoldFiligree className="dinner-filigree--top" />
        <GoldFiligree className="dinner-filigree--bottom" />
      </div>

      {/* ── Main content ──────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-3xl text-center" style={{ zIndex: 1 }}>

        {/* Top decorative line */}
        <div ref={topLineRef} className="dinner-rule" aria-hidden />

        {/* Sub-heading */}
        <p ref={subHeadRef} className="label-caps mt-6 text-[0.65rem] tracking-[0.3em] text-gold-light">
          A Celebration of Togetherness
        </p>

        {/* Main heading */}
        <h2
          ref={mainHeadRef}
          className="mt-3 font-script leading-tight text-gold-foil animate-shimmer"
          style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}
        >
          Dinner &amp; Celebration
        </h2>

        {/* Ornament divider */}
        <div ref={divRef}>
          <OrnamentDivider className="mx-auto mt-4 text-gold" />
        </div>

        {/* Tagline */}
        <p ref={tagRef} className="mx-auto mt-5 max-w-lg font-serif text-lg italic text-ivory/80">
          Join us for an evening of togetherness, blessings and celebration.
        </p>

        {/* Candle row */}
        <div ref={candlesRef} className="dinner-candle-row" aria-hidden>
          <Candle />
          <Candle className="dinner-candle--tall" />
          <Candle className="dinner-candle--wide" />
          <Candle className="dinner-candle--tall" />
          <Candle />
        </div>

        {/* Detail cards */}
        <ul ref={cardsRef} className="dinner-cards mt-10">
          <DetailCard
            icon={CalendarDays}
            label="Date"
            value={`${dinner.dayLabel}, ${dinner.dateLabel}`}
          />
          <DetailCard
            icon={Clock}
            label="Time"
            value={dinner.timeLabel}
          />
          <DetailCard
            icon={MapPin}
            label="Venue"
            value={dinner.venueName}
            sub={venue.address}
          />
        </ul>

        {/* Closing quote */}
        <figure ref={quoteRef} className="dinner-quote">
          <div className="dinner-rule dinner-rule--thin" aria-hidden />
          <blockquote className="mt-6 font-script text-2xl leading-snug text-gold-light sm:text-3xl">
            "Join us for an evening filled with love,<br />laughter and delicious memories."
          </blockquote>
          <figcaption className="label-caps mt-4 text-[0.6rem] text-ivory/50">
            — Arun Sai Durga Reddy &amp; Grashma Aniswa
          </figcaption>
          <div className="dinner-rule dinner-rule--thin mt-6" aria-hidden />
        </figure>
      </div>
    </section>
  );
}
