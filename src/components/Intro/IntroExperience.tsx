import { useEffect, useRef, useState } from "react";
import floralCorner from "@/assets/floral-corner.png";
import "./IntroExperience.css";

/** Total number of intro scenes (1–4). Scene 4 is the envelope gateway. */
const TOTAL_SCENES = 4;

interface IntroExperienceProps {
  /** Called when the guest finishes the intro or presses Skip. */
  onComplete: () => void;
}

// Petal/heart emojis used as floating particles.
const PETALS = ["🌸", "❤️", "🌺", "💕", "✨", "🌹", "💐"];

/** A single floating particle element. */
function FloatingParticles({ count = 10 }: { count?: number }) {
  // Generate stable random positions on first render only.
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: PETALS[i % PETALS.length],
      left: 5 + ((i * 83) % 90), // 5–95 %
      delay: (i * 1.3) % 8,
      duration: 7 + ((i * 1.7) % 6),
      size: 0.75 + ((i * 0.17) % 0.6),
    })),
  ).current;

  return (
    <div className="intro-particles" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="intro-petal"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}rem`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

/** Champagne-gold photo frame with an arch top. */
function PhotoFrame({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`intro-frame ${className}`}>
      <img src={src} alt={alt} draggable={false} />
    </div>
  );
}

/** Four gold progress dots. */
function ProgressDots({ current }: { current: number }) {
  return (
    <div className="intro-progress" role="progressbar" aria-label={`Scene ${current} of ${TOTAL_SCENES}`}>
      {Array.from({ length: TOTAL_SCENES }, (_, i) => {
        const scene = i + 1;
        return (
          <div
            key={scene}
            className={[
              "intro-dot",
              scene === current ? "intro-dot--active" : "",
              scene < current ? "intro-dot--done" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden
          />
        );
      })}
    </div>
  );
}

export function IntroExperience({ onComplete }: IntroExperienceProps) {
  const [scene, setScene] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const [coupleHeartVisible, setCoupleHeartVisible] = useState(false);
  const busy = useRef(false);

  // Show the heart between photos slightly after the couple scene mounts.
  useEffect(() => {
    if (scene === 3) {
      const t = setTimeout(() => setCoupleHeartVisible(true), 350);
      return () => clearTimeout(t);
    } else {
      setCoupleHeartVisible(false);
    }
  }, [scene]);

  const advance = () => {
    if (busy.current) return;
    if (scene < TOTAL_SCENES) {
      busy.current = true;
      setScene((s) => s + 1);
      // Allow next press after transition settles.
      setTimeout(() => { busy.current = false; }, 650);
    }
  };

  const handleEnter = () => {
    if (busy.current) return;
    busy.current = true;
    // Fade the whole overlay out, then notify parent.
    setLeaving(true);
    setTimeout(() => {
      onComplete();
    }, 850);
  };

  const handleSkip = () => {
    if (busy.current) return;
    busy.current = true;
    setLeaving(true);
    setTimeout(() => {
      onComplete();
    }, 850);
  };

  return (
    <div
      className={`intro-overlay${leaving ? " intro-hidden" : ""}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Shared background decorations */}
      <div className="intro-bg-pattern" aria-hidden />
      <img src={floralCorner} alt="" className="intro-floral intro-floral--tl" aria-hidden />
      <img src={floralCorner} alt="" className="intro-floral intro-floral--br" aria-hidden />

      {/* Skip intro — hidden on scene 4 since it already IS the gateway */}
      {scene < TOTAL_SCENES && (
        <button
          type="button"
          className="intro-skip"
          onClick={handleSkip}
          aria-label="Skip introduction"
        >
          Skip Intro ✕
        </button>
      )}

      {/* ── Scene 1: Groom ──────────────────────────────────────────── */}
      <div className={`intro-scene${scene === 1 ? " intro-scene--active" : ""}`} aria-hidden={scene !== 1}>
        <FloatingParticles count={12} />

        <div className="intro-frame-wrap">
          <PhotoFrame src="/arun.jpeg" alt="Arun Sai Durga Reddy" />
        </div>

        <div className="intro-divider" aria-hidden />

        <div className="intro-text">
          <p className="intro-name">Arun Sai Durga Reddy</p>
          <p className="intro-message">
            Hi! I'm Arun Sai Durga Reddy! ❤️
            <br />
            <br />
            I have someone very special I want you to meet...
          </p>
        </div>

        <div className="intro-actions">
          <ProgressDots current={1} />
          <button
            type="button"
            className="btn-royal"
            onClick={advance}
            aria-label="Proceed to meet the bride"
          >
            Meet Someone Special →
          </button>
        </div>
      </div>

      {/* ── Scene 2: Bride ──────────────────────────────────────────── */}
      <div className={`intro-scene${scene === 2 ? " intro-scene--active" : ""}`} aria-hidden={scene !== 2}>
        <FloatingParticles count={12} />

        <div className="intro-frame-wrap">
          <PhotoFrame src="/grashma.jpeg" alt="Grashma Aniswa" />
        </div>

        <div className="intro-divider" aria-hidden />

        <div className="intro-text">
          <p className="intro-name">Grashma Aniswa</p>
          <p className="intro-message">
            Heyyy! I'm Grashma Aniswa! 💕
            <br />
            <br />
            The handsome guy you just met?
            <br />
            He's the one I'm going to marry!
            <br />
            Yes, I'm his bride! ❤️
          </p>
        </div>

        <div className="intro-actions">
          <ProgressDots current={2} />
          <button
            type="button"
            className="btn-royal"
            onClick={advance}
            aria-label="Proceed to the couple announcement"
          >
            Wanna Know Something? ✨
          </button>
        </div>
      </div>

      {/* ── Scene 3: Couple announcement ────────────────────────────── */}
      <div className={`intro-scene${scene === 3 ? " intro-scene--active" : ""}`} aria-hidden={scene !== 3}>
        <FloatingParticles count={16} />

        <div className={`intro-frames-couple${coupleHeartVisible ? " intro-heart-visible" : ""}`}>
          <PhotoFrame
            src="/arun.jpeg"
            alt="Arun Sai Durga Reddy"
            className="intro-frame--groom"
          />
          <PhotoFrame
            src="/grashma.jpeg"
            alt="Grashma Aniswa"
            className="intro-frame--bride"
          />
          <span className="intro-heart" aria-hidden>💍</span>
        </div>

        <div className="intro-divider" aria-hidden />

        <div className="intro-text">
          <p className="intro-couple-names">
            Arun Sai Durga Reddy
            <span className="intro-amp">&amp;</span>
            Grashma Aniswa
          </p>
          <p className="intro-message">
            Surprise! We're getting married! 💍
            <br />
            <br />
            We would be absolutely delighted to have you celebrate our special day with us.
          </p>
          <p className="intro-closing">
            With love,
            <br />
            Arun Sai Durga Reddy &amp; Grashma Aniswa ❤️
          </p>
        </div>

        <div className="intro-actions">
          <ProgressDots current={3} />
          <button
            type="button"
            className="btn-royal"
            onClick={advance}
            aria-label="Proceed to the wedding invitation"
          >
            Join Our Celebration →
          </button>
        </div>
      </div>

      {/* ── Scene 4: Envelope gateway ───────────────────────────────── */}
      <div className={`intro-scene${scene === 4 ? " intro-scene--active" : ""}`} aria-hidden={scene !== 4}>
        <FloatingParticles count={10} />

        <div className="intro-envelope-teaser">
          <div className="intro-envelope-icon" aria-hidden>💌</div>

          <div className="intro-divider" aria-hidden />

          <div className="intro-text">
            <p className="intro-name" style={{ fontSize: "clamp(1.3rem, 4vw, 2.2rem)" }}>
              Our celebration begins with you!
            </p>
            <p className="intro-message" style={{ marginTop: "0.25rem" }}>
              With love,
              <br />
              Arun Sai Durga Reddy &amp; Grashma Aniswa 💌
            </p>
          </div>
        </div>

        <div className="intro-actions">
          <ProgressDots current={4} />
          <button
            type="button"
            className="btn-royal"
            onClick={handleEnter}
            aria-label="Open the wedding invitation"
          >
            Open Our Wedding Invitation
          </button>
        </div>
      </div>
    </div>
  );
}
