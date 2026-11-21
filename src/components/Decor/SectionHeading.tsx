import { OrnamentDivider } from "./Ornament";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  script: string;
  title: string;
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({ script, title, tone = "light", className }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <header className={cn("mx-auto flex max-w-2xl flex-col items-center text-center", className)} data-reveal>
      <p className={cn("font-script text-4xl leading-none sm:text-5xl", dark ? "text-gold-light" : "text-gold-deep")}>{script}</p>
      <h2 className={cn("mt-3 font-display text-3xl font-medium tracking-wide sm:text-4xl", dark ? "text-ivory" : "text-burgundy")}>
        {title}
      </h2>
      <OrnamentDivider className={cn("mt-5", dark ? "text-gold" : "text-gold-deep")} />
    </header>
  );
}
