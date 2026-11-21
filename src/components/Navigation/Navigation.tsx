import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SECTION_IDS, weddingDetails } from "@/data/weddingDetails";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Home", id: SECTION_IDS.home },
  { label: "Wedding Details", id: SECTION_IDS.details },
  { label: "Venue", id: SECTION_IDS.venue },
  { label: "Gallery", id: SECTION_IDS.gallery },
  { label: "Contact", id: SECTION_IDS.contact },
];

/** Appears once the guest has opened the invitation and scrolled past the envelope. */
export function Navigation({ enabled }: { enabled: boolean }) {
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.getElementById(SECTION_IDS.home);
      const threshold = hero ? hero.offsetHeight * 0.75 : window.innerHeight * 0.75;
      setPastHero(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const visible = enabled && pastHero;
  useEffect(() => {
    if (!visible) setMenuOpen(false);
  }, [visible]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0",
      )}
    >
      <nav className="mx-3 mt-3 rounded-full border border-gold/50 bg-paper/85 shadow-paper backdrop-blur-md sm:mx-auto sm:max-w-4xl" aria-label="Main">
        <div className="flex items-center justify-between px-5 py-2.5">
          <a href={`#${SECTION_IDS.home}`} className="font-script text-2xl text-burgundy" tabIndex={visible ? 0 : -1}>
            {weddingDetails.monogram.first} <span className="text-gold-deep">&amp;</span> {weddingDetails.monogram.second}
          </a>
          <ul className="hidden items-center gap-6 md:flex">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  tabIndex={visible ? 0 : -1}
                  className="label-caps relative text-[0.66rem] text-burgundy transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold-deep after:transition-transform hover:text-gold-deep hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-burgundy md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            tabIndex={visible ? 0 : -1}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      <div
        id="mobile-menu"
        className={cn(
          "mx-3 mt-2 overflow-hidden rounded-2xl border border-gold/50 bg-paper/95 shadow-lift backdrop-blur-md transition-all duration-500 md:hidden",
          menuOpen ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 border-transparent opacity-0",
        )}
      >
        <ul className="flex flex-col py-3">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
                className="label-caps block px-6 py-3 text-xs text-burgundy hover:bg-cream"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
