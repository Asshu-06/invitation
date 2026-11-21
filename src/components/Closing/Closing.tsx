import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrnamentDivider, FourCorners } from "@/components/Decor/Ornament";

gsap.registerPlugin(ScrollTrigger);

// ── All background collage photos ────────────────────────────────────
const BG_PHOTOS = [
  // couple/
  { src: "/couple/couple-1.jpeg",  top:  2, left: -2,  width: 22, rotate:  -4 },
  { src: "/couple/couple-2.jpeg",  top: 10, left: 72,  width: 20, rotate:   5 },
  { src: "/couple/couple-3.jpeg",  top: 55, left: -3,  width: 18, rotate:  -6 },
  { src: "/couple/couple-4.jpeg",  top: 60, left: 76,  width: 21, rotate:   4 },
  { src: "/couple/couple-5.jpeg",  top: 80, left: 36,  width: 19, rotate:  -2 },
  // couple images/
  { src: "/couple images/WhatsApp Image 2026-11-21 at 10.45.09 AM.jpeg",     top:  0, left: 24, width: 17, rotate:  3 },
  { src: "/couple images/WhatsApp Image 2026-11-21 at 10.45.10 AM.jpeg",     top: 30, left: 80, width: 16, rotate: -5 },
  { src: "/couple images/WhatsApp Image 2026-11-21 at 10.45.10 AM (1).jpeg", top: 72, left:  2, width: 17, rotate:  6 },
  { src: "/couple images/WhatsApp Image 2026-11-21 at 10.45.11 AM.jpeg",     top: 85, left: 64, width: 16, rotate: -3 },
  { src: "/couple images/WhatsApp Image 2026-11-21 at 10.45.11 AM (1).jpeg", top: 42, left: -2, width: 15, rotate:  4 },
  // closing/ extra together shots
  { src: "/closing/WhatsApp Image 2026-11-21 at 1.20.00 PM.jpeg",    top:  5, left: 50, width: 18, rotate: -3 },
  { src: "/closing/WhatsApp Image 2026-11-21 at 1.20.01 PM.jpeg",    top: 48, left: 70, width: 20, rotate:  7 },
  { src: "/closing/WhatsApp Image 2026-11-21 at 1.20.01 PM (1).jpeg",top: 68, left: 48, width: 16, rotate: -5 },
  { src: "/closing/WhatsApp Image 2026-11-21 at 1.20.02 PM.jpeg",    top: 20, left: -1, width: 19, rotate:  5 },
  // top-level individuals
  { src: "/arun.jpeg",    top: 88, left: 15, width: 14, rotate: -4 },
  { src: "/grashma.jpeg", top: 88, left: 74, width: 14, rotate:  3 },
];

const PETALS = ["🌸", "✨", "🌺", "💮", "🌼", "✦", "❀"];

function FloatingPetals() {
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    symbol: PETALS[i % PETALS.length],
    left: 4 + ((i * 73) % 92),
    delay: (i * 1.4) % 9,
    duration: 8 + ((i * 1.9) % 7),
    size: 0.7 + ((i * 0.19) % 0.55),
  }));

  return (
    <div className="closing-petals" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="closing-petal"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}rem`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}

export function Closing() {
  const sectionRef = useRef<HTMLElement>(null);
  const groomRef   = useRef<HTMLDivElement>(null);
  const brideRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const groom   = groomRef.current;
    const bride   = brideRef.current;
    if (!section || !groom || !bride) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Portrait entrance animations only — collage is CSS-visible by default
      gsap.set(groom, { x: -80, autoAlpha: 0 });
      gsap.set(bride, { x:  80, autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });

      tl.to(groom, { x: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out" })
        .to(bride,  { x: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out" }, "<0.15")
        .to(groom,  { x:  6, duration: 0.9, ease: "power2.inOut" }, "+=0.1")
        .to(bride,  { x: -6, duration: 0.9, ease: "power2.inOut" }, "<");

      // Slow parallax drift on the whole collage layer
      gsap.to(".closing-bg-collage", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="closing-section section-pad relative overflow-hidden"
      aria-label="Wedding closing — Two Souls, One Forever"
    >
      {/* ── Layer 1: background photo collage (always visible, CSS-only) ── */}
      <div className="closing-bg-collage" aria-hidden>
        {BG_PHOTOS.map((p, i) => (
          <img
            key={i}
            src={p.src}
            alt=""
            loading="lazy"
            className="closing-bg-photo"
            style={{
              top:       `${p.top}%`,
              left:      `${p.left}%`,
              width:     `${p.width}%`,
              transform: `rotate(${p.rotate}deg)`,
            }}
          />
        ))}
        {/* Cream tint over photos so text stays legible */}
        <div className="closing-bg-wash" />
      </div>

      {/* ── Layer 2: floating petals ── */}
      <FloatingPetals />

      {/* ── Layer 3: foreground content ── */}

      {/* Heading */}
      <header className="closing-header mx-auto flex max-w-2xl flex-col items-center text-center" data-reveal>
        <p className="font-script text-5xl leading-none text-gold-deep sm:text-6xl">Two Souls</p>
        <p className="font-script text-4xl leading-tight text-burgundy sm:text-5xl">One Forever</p>
        <OrnamentDivider className="mt-5 text-gold-deep" />
        <p className="mt-5 max-w-lg font-serif text-base italic leading-relaxed text-maroon/80 sm:text-lg">
          Two beautiful journeys, one special moment, and a lifetime of togetherness.
        </p>
      </header>

      {/* Portrait pair */}
      <div className="closing-portraits mx-auto mt-14 flex max-w-4xl items-end justify-center gap-6 sm:gap-10 lg:gap-16">

        {/* Groom */}
        <div ref={groomRef} className="closing-portrait-wrap">
          <div className="closing-portrait ornate-frame relative">
            <FourCorners />
            <img src="/closing/arun.jpeg" alt="Arun Sai Durga Reddy" className="closing-photo" loading="lazy" />
          </div>
          <p className="mt-4 text-center font-script text-2xl text-burgundy sm:text-3xl" data-reveal data-reveal-delay="0.3">
            Arun Sai Durga Reddy
          </p>
          <p className="mt-1 text-center label-caps text-[0.6rem] text-gold-deep" data-reveal data-reveal-delay="0.4">
            The Groom
          </p>
        </div>

        {/* Heart divider */}
        <div className="closing-heart-col flex flex-col items-center gap-3 pb-20" aria-hidden>
          <div className="closing-heart-line" />
          <span className="closing-heart-icon">💍</span>
          <div className="closing-heart-line" />
        </div>

        {/* Bride */}
        <div ref={brideRef} className="closing-portrait-wrap">
          <div className="closing-portrait ornate-frame relative">
            <FourCorners />
            <img src="/closing/grashma.jpeg" alt="Grashma Aniswa" className="closing-photo" loading="lazy" />
          </div>
          <p className="mt-4 text-center font-script text-2xl text-burgundy sm:text-3xl" data-reveal data-reveal-delay="0.35">
            Grashma Aniswa
          </p>
          <p className="mt-1 text-center label-caps text-[0.6rem] text-gold-deep" data-reveal data-reveal-delay="0.45">
            The Bride
          </p>
        </div>
      </div>

      {/* Thank-you message */}
      <div className="closing-message mx-auto mt-16 flex max-w-xl flex-col items-center text-center" data-reveal>
        <OrnamentDivider className="text-gold-deep" />
        <p className="mt-6 font-display text-xl font-medium text-burgundy sm:text-2xl">
          Thank you for being a part of our special beginning.
        </p>
        <p className="mt-4 font-script text-3xl text-gold-deep sm:text-4xl">With love, Arun &amp; Grashma</p>
        <p className="label-caps mt-3 text-xs tracking-widest text-maroon/70">02 December 2026</p>
      </div>

      {/* Ornamental footer */}
      <footer className="closing-footer mx-auto mt-14 flex max-w-sm flex-col items-center gap-3" data-reveal>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden />
        <p className="font-serif text-sm italic text-muted-foreground">Made with love, for a lifetime of memories.</p>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden />
      </footer>
    </section>
  );
}
