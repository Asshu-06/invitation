import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";

export type EnvelopeState = "closed" | "opening" | "open";

export interface EnvelopeHandle {
  open: () => void;
  reset: () => void;
}

interface EnvelopeProps {
  monogram: string;
  /** Shown on the card while it is still tucked inside the envelope. */
  peek: ReactNode;
  /** The full invitation, revealed once the card settles. */
  children: ReactNode;
  onStateChange?: (state: EnvelopeState) => void;
}

function GoldGradientDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="var(--gold-deep)" />
        <stop offset="0.35" stopColor="var(--gold-light)" />
        <stop offset="0.6" stopColor="var(--gold)" />
        <stop offset="1" stopColor="var(--gold-deep)" />
      </linearGradient>
    </defs>
  );
}

export const Envelope = forwardRef<EnvelopeHandle, EnvelopeProps>(function Envelope(
  { monogram, peek, children, onStateChange },
  ref,
) {
  const [state, setState] = useState<EnvelopeState>("closed");
  const stateRef = useRef<EnvelopeState>("closed");
  const busyRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const pocketRef = useRef<HTMLDivElement>(null);
  const flapShadowRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const flapFrontRef = useRef<HTMLDivElement>(null);
  const flapBackRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const peekRef = useRef<HTMLDivElement>(null);
  const fullRef = useRef<HTMLDivElement>(null);

  const updateState = useCallback(
    (next: EnvelopeState) => {
      stateRef.current = next;
      setState(next);
      onStateChange?.(next);
    },
    [onStateChange],
  );

  const open = useCallback(() => {
    if (busyRef.current || stateRef.current !== "closed") return;
    const stage = stageRef.current;
    const card = cardRef.current;
    const target = targetRef.current;
    const flap = flapRef.current;
    const seal = sealRef.current;
    if (!stage || !card || !target || !flap || !seal) return;

    busyRef.current = true;
    updateState("opening");

    const W = stage.offsetWidth;
    const H = stage.offsetHeight;
    const finalW = target.offsetWidth;
    const finalH = target.offsetHeight;
    const parts = [groundRef.current, backRef.current, leftRef.current, rightRef.current, pocketRef.current, flapShadowRef.current, flap].filter(
      (el): el is HTMLDivElement => el !== null,
    );
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        // Hand the final layout to CSS so the card stays centred on resize.
        gsap.set(card, { clearProps: "left,top,width,height,transform,zIndex,rotation" });
        gsap.set([peekRef.current, fullRef.current], { clearProps: "opacity,visibility,transform" });
        busyRef.current = false;
        updateState("open");
      },
    });
    tlRef.current = tl;
    if (reduceMotion) tl.timeScale(2.5);

    // 1. Seal presses in, then lifts away.
    tl.to(seal, { scale: 0.92, duration: 0.14, ease: "power1.in" })
      .to(seal, { scale: 1.12, duration: 0.18, ease: "power1.out" })
      .to(seal, { scale: 0.3, rotation: 40, y: -H * 0.35, autoAlpha: 0, duration: 0.55, ease: "back.in(1.4)" })
      // 2. Flap folds open: scaleY 1→0 (front squishes), swap face, 0→-1 (back revealed, tip now points up = folded behind).
      .to(flapShadowRef.current, { autoAlpha: 0, duration: 0.35 }, "-=0.25")
      .set(flap, { transformOrigin: "50% 0%" })
      .to(flap, { scaleY: 0, duration: 0.5, ease: "power2.in" }, "<")
      .set(flapFrontRef.current, { autoAlpha: 0 })
      .set(flapBackRef.current, { autoAlpha: 1 })
      .to(flap, { scaleY: -1, duration: 0.55, ease: "power2.out" })
      .set(flap, { zIndex: 1 })
      // 3. Card slides up out of the pocket while the envelope settles lower.
      .to(parts, { y: H * 0.3, duration: 1.2, ease: "power2.inOut" }, "+=0.05")
      .to(card, { y: -H * 0.62, rotation: -1.2, duration: 1.2, ease: "power2.inOut" }, "<")
      // 4. Card comes forward and unfolds into its readable size.
      .set(card, { zIndex: 20 })
      .to(parts, { y: H * 1.15, autoAlpha: 0, duration: 0.95, ease: "power2.in" })
      .to(
        card,
        {
          left: (W - finalW) / 2,
          top: (H - finalH) / 2,
          width: finalW,
          height: finalH,
          y: 0,
          rotation: 0,
          duration: 1.25,
          ease: "power3.inOut",
        },
        "<0.1",
      )
      .to(peekRef.current, { autoAlpha: 0, duration: 0.35 }, "<")
      // 5. Reveal the invitation text.
      .fromTo(fullRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out" }, "-=0.45");
  }, [updateState]);

  const reset = useCallback(() => {
    if (busyRef.current || stateRef.current !== "open") return;
    const stage = stageRef.current;
    if (!stage) return;
    busyRef.current = true;
    gsap.to(stage, {
      autoAlpha: 0,
      y: 16,
      duration: 0.45,
      ease: "power2.in",
      onComplete: () => {
        tlRef.current?.kill();
        tlRef.current = null;
        const all = [
          groundRef.current,
          backRef.current,
          leftRef.current,
          rightRef.current,
          pocketRef.current,
          flapShadowRef.current,
          flapRef.current,
          sealRef.current,
          cardRef.current,
          peekRef.current,
          fullRef.current,
        ].filter((el): el is HTMLDivElement => el !== null);
        gsap.set(all, { clearProps: "all" });
        // Restore back face to hidden after reset
        if (flapBackRef.current) gsap.set(flapBackRef.current, { autoAlpha: 0 });
        if (flapFrontRef.current) gsap.set(flapFrontRef.current, { autoAlpha: 1 });
        updateState("closed");
        gsap.fromTo(
          stage,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            clearProps: "all",
            onComplete: () => {
              busyRef.current = false;
            },
          },
        );
      },
    });
  }, [updateState]);

  useImperativeHandle(ref, () => ({ open, reset }), [open, reset]);

  useEffect(() => () => void tlRef.current?.kill(), []);

  const isClosed = state === "closed";

  return (
    <div
      ref={stageRef}
      className="env-stage"
      data-state={state}
      role={isClosed ? "button" : undefined}
      tabIndex={isClosed ? 0 : -1}
      aria-label={isClosed ? "Open your wedding invitation" : undefined}
      onClick={isClosed ? open : undefined}
      onKeyDown={(e) => {
        if (isClosed && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          open();
        }
      }}
    >
      <div ref={groundRef} className="env-ground env-part" aria-hidden />
      <div ref={backRef} className="env-back env-part" aria-hidden />

      <div ref={cardRef} className="env-card">
        <div ref={peekRef} className="env-card-peek" aria-hidden={!isClosed}>
          {peek}
        </div>
        <div ref={fullRef} className="env-card-full" aria-hidden={state !== "open"}>
          {children}
        </div>
      </div>
      <div ref={targetRef} className="env-card-target" aria-hidden />

      <div ref={leftRef} className="env-layer env-fold-left env-part" aria-hidden>
        <div className="env-shape" />
        <svg className="env-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <GoldGradientDefs id="gold-l" />
          <polyline points="0,0 53,55 0,100" fill="none" stroke="url(#gold-l)" strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div ref={rightRef} className="env-layer env-fold-right env-part" aria-hidden>
        <div className="env-shape" />
        <svg className="env-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <GoldGradientDefs id="gold-r" />
          <polyline points="100,0 47,55 100,100" fill="none" stroke="url(#gold-r)" strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div ref={pocketRef} className="env-layer env-pocket env-part" aria-hidden>
        <div className="env-shape" />
        <svg className="env-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <GoldGradientDefs id="gold-p" />
          <polyline points="0,99 50,43 100,99" fill="none" stroke="url(#gold-p)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
          <polyline points="7,100 50,52 93,100" fill="none" stroke="url(#gold-p)" strokeWidth="0.8" strokeOpacity="0.75" vectorEffect="non-scaling-stroke" />
          <rect x="0.4" y="0.6" width="99.2" height="98.8" rx="0.8" fill="none" stroke="url(#gold-p)" strokeOpacity="0.5" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div ref={flapShadowRef} className="env-flap-shadow env-part" aria-hidden />
      <div ref={flapRef} className="env-flap env-part" aria-hidden>
        <div ref={flapFrontRef} className="env-flap-front" />
        <div ref={flapBackRef} className="env-flap-back" />
      </div>

      <button
        ref={sealRef}
        type="button"
        className="env-seal"
        tabIndex={-1}
        aria-label="Break the wax seal"
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
      >
        <span className="env-seal-mono">{monogram}</span>
      </button>
    </div>
  );
});
