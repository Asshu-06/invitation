import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  label: string;
  onRevealed?: () => void;
  forceReveal?: boolean;
}

const SCRATCH_RADIUS = 28;
const REVEAL_THRESHOLD = 0.55;

function drawOverlay(canvas: HTMLCanvasElement, label: string) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#8B1A1A";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#F5E6C8";
  ctx.font = `bold ${Math.max(11, canvas.width * 0.07)}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("✦ Scratch ✦", canvas.width / 2, canvas.height / 2 - canvas.height * 0.07);
  ctx.font = `${Math.max(10, canvas.width * 0.06)}px serif`;
  ctx.fillText(label, canvas.width / 2, canvas.height / 2 + canvas.height * 0.07);
}

export function ScratchCard({ children, label, onRevealed, forceReveal }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const scratchingRef = useRef(false);
  const calledRef = useRef(false);

  /* ── sync canvas size to container, then draw overlay ── */
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    function sync() {
      if (!wrap || !canvas) return;
      const { width, height } = wrap.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      canvas.width = Math.round(width);
      canvas.height = Math.round(height);
      if (!revealed) drawOverlay(canvas, label);
    }

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [label, revealed]);

  /* ── force reveal ── */
  useEffect(() => {
    if (forceReveal && !revealed) completeReveal();
  }, [forceReveal]); // eslint-disable-line react-hooks/exhaustive-deps

  function completeReveal() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setRevealed(true);
    if (!calledRef.current) {
      calledRef.current = true;
      onRevealed?.();
    }
  }

  function scratch(x: number, y: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, SCRATCH_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] < 128) transparent++;
    if (transparent / (canvas.width * canvas.height) > REVEAL_THRESHOLD) completeReveal();
  }

  function getPos(canvas: HTMLCanvasElement, e: React.Touch | React.MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = "clientX" in e ? (e as React.MouseEvent).clientX : (e as React.Touch).clientX;
    const clientY = "clientY" in e ? (e as React.MouseEvent).clientY : (e as React.Touch).clientY;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  }

  const onMouseDown = () => { scratchingRef.current = true; };
  const onMouseUp   = () => { scratchingRef.current = false; };
  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!scratchingRef.current || revealed) return;
    scratch(...Object.values(getPos(e.currentTarget, e)) as [number, number]);
  };
  const onTouchStart = () => { scratchingRef.current = true; };
  const onTouchEnd   = () => { scratchingRef.current = false; };
  const onTouchMove  = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (revealed) return;
    e.preventDefault();
    scratch(...Object.values(getPos(e.currentTarget, e.touches[0])) as [number, number]);
  };

  return (
    <div ref={wrapRef} className="absolute inset-0">
      {/* revealed content underneath */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>

      {/* scratch overlay — sits exactly on top of the wrapper */}
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 w-full h-full rounded-sm cursor-crosshair touch-none transition-opacity duration-700",
          revealed ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
      />
    </div>
  );
}
