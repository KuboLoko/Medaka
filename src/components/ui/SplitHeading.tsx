import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  as?: "h1" | "h2" | "h3" | "p";
  text: string;
  /** Split into words (default) or single characters. */
  mode?: "words" | "chars";
  /**
   * "load" plays a pure CSS rise as the page loads (for text already on screen).
   * "scroll" marks the heading so the page script reveals it as it arrives.
   */
  trigger?: "load" | "scroll";
  id?: string;
  className?: string;
};

/**
 * A heading whose words or characters are wrapped for a staggered reveal.
 * The heading carries an aria-label with the full text and the split spans are hidden
 * from assistive technology, so it reads as one normal heading.
 */
export function SplitHeading({
  as: Tag = "h2",
  text,
  mode = "words",
  trigger = "scroll",
  id,
  className,
}: Props) {
  const words = text.split(" ");
  let index = 0;
  const parts: ReactNode[] = words.map((word, w) => {
    const inner =
      mode === "chars"
        ? Array.from(word).map((ch) => (
            <span
              key={index}
              className="split-inner"
              style={{ ["--i" as string]: index++ }}
            >
              {ch}
            </span>
          ))
        : (
            <span className="split-inner" style={{ ["--i" as string]: index++ * 3 }}>
              {word}
            </span>
          );
    return (
      <span key={w}>
        <span className="split-word">{inner}</span>
        {w < words.length - 1 ? " " : null}
      </span>
    );
  });

  return (
    <Tag
      id={id}
      aria-label={text}
      className={cn(trigger === "load" && "split-css", className)}
      {...(trigger === "scroll" ? { "data-split": mode } : {})}
    >
      <span aria-hidden>{parts}</span>
    </Tag>
  );
}
