import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "@/components/Hero/Hero";
import type { EnvelopeState } from "@/components/Envelope/Envelope";
import { Navigation } from "@/components/Navigation/Navigation";
import { Countdown } from "@/components/Countdown/Countdown";
import { WeddingDetails } from "@/components/WeddingDetails/WeddingDetails";
import { Timeline } from "@/components/Timeline/Timeline";
import { Venue } from "@/components/Venue/Venue";
import { Dinner } from "@/components/Dinner/Dinner";
import { Gallery } from "@/components/Gallery/Gallery";
import { Closing } from "@/components/Closing/Closing";
import { MusicPlayer } from "@/components/MusicPlayer/MusicPlayer";
import { Footer } from "@/components/Footer/Footer";
import { IntroExperience } from "@/components/Intro/IntroExperience";

export function WeddingPage() {
  const [introComplete, setIntroComplete] = useState(false);
  const [envelopeState, setEnvelopeState] = useState<EnvelopeState>("closed");
  const opened = envelopeState === "open";

  // On every fresh load: scroll to top immediately so the envelope is always
  // the first thing the guest sees, regardless of browser scroll restoration.
  useEffect(() => {
    // Disable browser scroll restoration so it never jumps to a saved position.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // Lock scroll from the start via class (intro also holds the lock)
    document.documentElement.classList.add("scroll-locked");
  }, []);

  // Keep scroll locked while intro is showing or envelope is closed.
  useEffect(() => {
    if (opened) {
      document.documentElement.classList.remove("scroll-locked");
      ScrollTrigger.refresh();
    } else {
      document.documentElement.classList.add("scroll-locked");
    }
    return () => {
      document.documentElement.classList.remove("scroll-locked");
    };
  }, [opened]);

  return (
    <>
      {/* Introduction overlay — sits above WeddingPage until dismissed */}
      {!introComplete && (
        <IntroExperience onComplete={() => setIntroComplete(true)} />
      )}

      <Navigation enabled={opened} />
      <main>
        <Hero onStateChange={setEnvelopeState} />
        <Countdown />
        <WeddingDetails />
        <Timeline />
        <Venue />
        <Dinner />
        <Gallery />
        <Closing />
      </main>
      <Footer />
      <MusicPlayer visible={opened} autoPlay={opened} />
    </>
  );
}
