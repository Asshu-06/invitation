import { useEffect, useState } from "react";
import { getTimeLeft, type TimeLeft } from "@/lib/countdown";

/** Live countdown; returns null until mounted so server and client markup match. */
export function useCountdown(isoTarget: string): TimeLeft | null {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const target = new Date(isoTarget);
    const tick = () => setTimeLeft(getTimeLeft(target, new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [isoTarget]);

  return timeLeft;
}
