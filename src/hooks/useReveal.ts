import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Fades/slides in every [data-reveal] child of the returned ref as it scrolls into view. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => {
        const delay = Number(item.dataset["revealDelay"] ?? 0);
        gsap.from(item, {
          y: 36,
          autoAlpha: 0,
          duration: 1.1,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 90%", once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
