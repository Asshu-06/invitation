/** Deterministic floating gold dust (no randomness, so server and client markup match). */
export function Particles({ count = 22 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const left = (i * 37 + 11) % 100;
        const size = 3 + ((i * 7) % 6);
        const duration = 14 + ((i * 13) % 12);
        const delay = -((i * 17) % 24);
        const drift = ((i % 5) - 2) * 18;
        const opacity = 0.35 + ((i * 3) % 5) / 10;
        return (
          <span
            key={i}
            className="particle"
            style={
              {
                left: `${left}%`,
                width: size,
                height: size,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                "--p-drift": `${drift}px`,
                "--p-opacity": opacity,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
