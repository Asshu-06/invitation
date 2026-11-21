import { useEffect, useRef } from "react";

/* ── types ───────────────────────────────────────────────── */
interface Petal {
  x: number;
  y: number;
  vx: number;         // horizontal velocity
  vy: number;         // vertical velocity
  gravity: number;    // individual gravity pull
  drag: number;       // air resistance (0-1)
  wobble: number;     // phase for horizontal sway
  wobbleSpeed: number;
  wobbleAmp: number;
  rotation: number;
  rotationSpeed: number;
  scaleX: number;     // flip scaleX for flutter effect
  scaleY: number;
  size: number;
  opacity: number;
  color: string;
  shape: 0 | 1 | 2 | 3; // rose petal | marigold | heart | leaf
  dead: boolean;
}

/* ── palette ─────────────────────────────────────────────── */
const COLORS = [
  "#E63946","#FF4D6D","#FF6B6B",   // reds / coral
  "#FF9A3C","#FFA500","#FFB347",   // marigold orange
  "#FFD700","#FFEC8B","#FFC200",   // gold
  "#FF69B4","#FF1493","#FF85A1",   // pinks
  "#C9184A","#A4133C",             // crimson / deep rose
  "#FFB6C1","#FF007F",             // light pink / rose
];

/* ── draw shapes ─────────────────────────────────────────── */
function drawShape(ctx: CanvasRenderingContext2D, p: Petal) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.scale(p.scaleX * p.size, p.scaleY * p.size);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;

  if (p.shape === 0) {
    // Rose / flower petal — teardrop
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(6, -4, 8, -12, 0, -18);
    ctx.bezierCurveTo(-8, -12, -6, -4, 0, 0);
    ctx.fill();
    // subtle lighter highlight
    ctx.globalAlpha = p.opacity * 0.3;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(-1, -10, 2, 5, -0.3, 0, Math.PI * 2);
    ctx.fill();

  } else if (p.shape === 1) {
    // Marigold petal — rounder ellipse
    ctx.beginPath();
    ctx.ellipse(0, -7, 5, 10, 0, 0, Math.PI * 2);
    ctx.fill();

  } else if (p.shape === 2) {
    // Heart
    ctx.beginPath();
    ctx.moveTo(0, 1);
    ctx.bezierCurveTo(0, -2, -7, -7, -7, -2);
    ctx.bezierCurveTo(-7, 3, 0, 8, 0, 1);
    ctx.bezierCurveTo(0, 8, 7, 3, 7, -2);
    ctx.bezierCurveTo(7, -7, 0, -2, 0, 1);
    ctx.fill();

  } else {
    // Small 5-petal flower
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      ctx.beginPath();
      ctx.ellipse(
        Math.cos(angle) * 6,
        Math.sin(angle) * 6,
        3, 6, angle, 0, Math.PI * 2
      );
      ctx.fill();
    }
    // Center dot
    ctx.beginPath();
    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = "#FFD700";
    ctx.fill();
  }

  ctx.restore();
}

/* ── blast factory ───────────────────────────────────────── */
function blastPetals(cx: number, cy: number, count: number): Petal[] {
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 18; // explosive initial speed
    return {
      x: cx + (Math.random() - 0.5) * 60,
      y: cy + (Math.random() - 0.5) * 60,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - Math.random() * 6, // bias upward
      gravity: 0.18 + Math.random() * 0.14,
      drag: 0.97 + Math.random() * 0.02,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.03 + Math.random() * 0.05,
      wobbleAmp: 0.4 + Math.random() * 1.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.18,
      scaleX: 1,
      scaleY: 1,
      size: 0.7 + Math.random() * 1.1,
      opacity: 0.9 + Math.random() * 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: (Math.floor(Math.random() * 4)) as 0 | 1 | 2 | 3,
      dead: false,
    };
  });
}

/* ── component ───────────────────────────────────────────── */
interface Props {
  active: boolean;
  duration?: number; // ms, default 5000
}

export function FlowerShower({ active, duration = 5000 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fit canvas to viewport
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const cx = canvas.width / 2;
    const cy = canvas.height * 0.45; // blast origin near countdown

    // Three staggered blasts for density
    let petals: Petal[] = [
      ...blastPetals(cx, cy, 80),
      ...blastPetals(cx - 120, cy + 20, 40),
      ...blastPetals(cx + 120, cy + 20, 40),
    ];

    const fadeStart = duration - 1200;
    const startTime = performance.now();

    // Extra burst waves at 400ms and 800ms
    const extraBursts = [
      { delay: 400,  done: false },
      { delay: 800,  done: false },
      { delay: 1300, done: false },
    ];

    function tick(now: number) {
      if (!canvas || !ctx) return;

      // Resize guard
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const elapsed = now - startTime;

      // Fire extra bursts
      extraBursts.forEach((b) => {
        if (!b.done && elapsed >= b.delay) {
          b.done = true;
          petals.push(...blastPetals(
            cx + (Math.random() - 0.5) * 200,
            cy + (Math.random() - 0.5) * 100,
            50
          ));
        }
      });

      // Global fade after fadeStart
      const globalAlpha = elapsed > fadeStart
        ? Math.max(0, 1 - (elapsed - fadeStart) / 1200)
        : 1;

      petals.forEach((p) => {
        if (p.dead) return;

        // Physics
        p.vy    += p.gravity;
        p.vx    *= p.drag;
        p.vy    *= p.drag;
        p.wobble += p.wobbleSpeed;
        p.x     += p.vx + Math.sin(p.wobble) * p.wobbleAmp;
        p.y     += p.vy;
        p.rotation += p.rotationSpeed;

        // Flutter: flip scaleX periodically
        p.scaleX = Math.cos(p.wobble * 1.5);

        // Kill off-screen petals (only after they've had time to fall)
        if (elapsed > 1500 && p.y > canvas.height + 30) {
          p.dead = true;
          return;
        }

        const a = p.opacity * globalAlpha;
        if (a <= 0.01) return;
        const orig = p.opacity;
        p.opacity = a;
        drawShape(ctx, p);
        p.opacity = orig;
      });

      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active, duration]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    />
  );
}
