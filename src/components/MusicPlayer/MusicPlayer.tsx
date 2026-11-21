import { useEffect, useRef, useState } from "react";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { weddingDetails } from "@/data/weddingDetails";
import { cn } from "@/lib/utils";

type Status = "idle" | "playing" | "paused" | "unavailable";

/** Small player; music starts automatically when `autoPlay` becomes true. */
export function MusicPlayer({ visible, autoPlay }: { visible: boolean; autoPlay?: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // An error that fired before hydration would otherwise be missed.
    if (audio.error) setStatus("unavailable");
  }, []);

  // Auto-start playback when the envelope is opened.
  useEffect(() => {
    if (!autoPlay) return;
    const audio = audioRef.current;
    if (!audio || status === "unavailable") return;
    audio.play().then(() => setStatus("playing")).catch(() => {
      // Browser blocked autoplay — leave as idle so the guest can tap play.
    });
  }, [autoPlay]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || status === "unavailable") return;
    if (audio.paused) {
      try {
        await audio.play();
        setStatus("playing");
      } catch {
        setStatus(audio.error ? "unavailable" : "paused");
      }
    } else {
      audio.pause();
      setStatus("paused");
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  const label =
    status === "playing" ? (muted ? "Muted" : "Now playing") : status === "unavailable" ? "Music unavailable" : status === "paused" ? "Paused" : "Play music";
  const playing = status === "playing";

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-full border border-gold/60 bg-paper/90 p-1.5 pr-3 shadow-lift backdrop-blur-md transition-all duration-700 sm:bottom-6 sm:right-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
      aria-hidden={!visible}
    >
      <audio
        ref={audioRef}
        src={weddingDetails.music.src}
        preload="metadata"
        loop
        onError={() => setStatus("unavailable")}
        onPause={() => setStatus((s) => (s === "playing" ? "paused" : s))}
      />
      <button
        type="button"
        onClick={toggle}
        disabled={status === "unavailable"}
        tabIndex={visible ? 0 : -1}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-burgundy text-ivory transition hover:brightness-110 disabled:opacity-50"
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {status === "unavailable" ? <Music className="h-4 w-4" /> : playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
      </button>
      <button
        type="button"
        onClick={toggleMute}
        disabled={status === "unavailable"}
        tabIndex={visible ? 0 : -1}
        className="flex h-10 w-10 items-center justify-center rounded-full text-burgundy transition hover:bg-cream disabled:opacity-40"
        aria-label={muted ? "Unmute music" : "Mute music"}
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
      <span className="flex items-center gap-2" aria-live="polite">
        <span className="flex h-4 items-end gap-[2px]" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn("w-[3px] rounded-full bg-gold-deep", playing && !muted ? "animate-pulse" : "")}
              style={{ height: playing && !muted ? `${8 + i * 4}px` : "4px", animationDelay: `${i * 0.2}s`, transition: "height .4s" }}
            />
          ))}
        </span>
        <span className="label-caps hidden text-[0.6rem] text-burgundy sm:inline">{label}</span>
        <span className="sr-only sm:hidden">{label}</span>
      </span>
    </div>
  );
}
