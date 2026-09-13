import { useEffect, useRef, useState } from "react";

/**
 * Scramble-reveal text, inspired by anime.js's scrambleText effect — reworked
 * as a small dependency-free React component instead of pulling in a second
 * animation library (this project uses Framer Motion everywhere else).
 *
 * Every character starts cycling through random glyphs; each one "settles"
 * into its real letter at a staggered frame, spreading outward from the
 * center by default — the terminal/decoding look already established by
 * MonitorIntro's CRT boot-up and the site's green-on-black brand voice.
 */

const DEFAULT_CHARSET = "░▒▓█#%$&*+=-<>/\\?01ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
  charset?: string;
  /** ms between frames — lower is faster/twitchier. */
  frameRate?: number;
  /** frames a character sits scrambling before it's allowed to settle. */
  baseSettle?: number;
  /** extra settle frames added per character, scaled by distance from origin. */
  stagger?: number;
  /** where the reveal wave starts from. */
  revealFrom?: "center" | "left" | "right";
  /** flips to re-run the animation (e.g. when scrolled into view). */
  triggerKey?: string | number;
}

export function ScrambleText({
  text,
  className,
  style,
  as: Tag = "span",
  charset = DEFAULT_CHARSET,
  frameRate = 35,
  baseSettle = 8,
  stagger = 2.2,
  revealFrom = "center",
  triggerKey,
}: ScrambleTextProps) {
  // Lazy-init so the very first paint is already scrambled — no flash of the
  // real text before the effect below kicks off.
  const [display, setDisplay] = useState(() =>
    text
      .split("")
      .map((c) => (c === " " ? " " : charset[Math.floor(Math.random() * charset.length)]))
      .join(""),
  );
  const timerRef = useRef<number>();

  useEffect(() => {
    const chars = text.split("");
    const origin =
      revealFrom === "left" ? 0 : revealFrom === "right" ? chars.length - 1 : (chars.length - 1) / 2;

    const endFrame = chars.map((_, i) => Math.round(baseSettle + Math.abs(i - origin) * stagger));
    const maxFrame = Math.max(...endFrame, 0);
    let frame = 0;

    const tick = () => {
      let out = "";
      let settled = 0;
      for (let i = 0; i < chars.length; i++) {
        const target = chars[i];
        if (target === " " || frame >= endFrame[i]) {
          out += target;
          settled++;
        } else {
          out += charset[Math.floor(Math.random() * charset.length)];
        }
      }
      setDisplay(out);
      if (settled === chars.length || frame > maxFrame) return;
      frame++;
      timerRef.current = window.setTimeout(tick, frameRate);
    };
    tick();

    return () => window.clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, triggerKey]);

  return (
    <Tag className={className} style={style} aria-label={text}>
      {display}
    </Tag>
  );
}
