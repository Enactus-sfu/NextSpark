import { useCallback, useEffect, useRef, useState } from "react";
import { useFrameSequence, wrap } from "./useFrameSequence";

export type ScrubMode = "drag" | "scroll";

type Props = {
  frames: Record<string, string>;
  /** "drag" = user spins it; "scroll" = position in viewport drives the frame. */
  mode?: ScrubMode;
  /** scroll mode: how many passes through the sequence across one scroll span. */
  turns?: number;
  /** scroll mode: play once 0..n-1 and hold (explode), vs looping (turntable). */
  loop?: boolean;
  alt: string;
  hint?: string;
  className?: string;
  imgClassName?: string;
  onProgress?: (p: number) => void;
};

/**
 * Scrubs a pre-rendered frame sequence. No WebGL and no 3D runtime: the whole
 * interaction is swapping <img> opacity, which keeps it usable on the low-end
 * hardware this site's audience actually browses on, and leaves a static first
 * frame when JS is unavailable.
 */
const FrameScrubber = ({
  frames,
  mode = "drag",
  turns = 1,
  loop = true,
  alt,
  hint = "Drag to rotate",
  className = "",
  imgClassName = "",
  onProgress,
}: Props) => {
  const { urls, loaded, total } = useFrameSequence(frames);
  const [index, setIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const host = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; start: number } | null>(null);

  useEffect(() => {
    if (mode !== "scroll" || !total) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setIndex(loop ? 0 : total - 1);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = host.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const span = r.height + window.innerHeight;
        const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / span));
        onProgress?.(p);
        setIndex(loop ? wrap(Math.round(p * turns * total), total) : Math.min(total - 1, Math.round(p * (total - 1))));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mode, total, turns, loop, onProgress]);

  const onDown = useCallback(
    (e: React.PointerEvent) => {
      if (mode !== "drag" || !total) return;
      drag.current = { x: e.clientX, start: index };
      (e.target as Element).setPointerCapture?.(e.pointerId);
      setShowHint(false);
    },
    [index, mode, total],
  );

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      const d = drag.current;
      if (!d || !total) return;
      const w = host.current?.clientWidth || 400;
      setIndex(wrap(Math.round(d.start - ((e.clientX - d.x) / w) * total), total));
    },
    [total],
  );

  const onUp = useCallback(() => {
    drag.current = null;
  }, []);

  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (mode !== "drag" || !total) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); setIndex((i) => wrap(i - 1, total)); setShowHint(false); }
      if (e.key === "ArrowRight") { e.preventDefault(); setIndex((i) => wrap(i + 1, total)); setShowHint(false); }
    },
    [mode, total],
  );

  if (!total) return null;
  const interactive = mode === "drag";

  return (
    <div
      ref={host}
      className={`relative select-none ${interactive ? "cursor-grab active:cursor-grabbing" : ""} ${className}`}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onKeyDown={onKey}
      tabIndex={interactive ? 0 : -1}
      role={interactive ? "slider" : undefined}
      aria-label={interactive ? alt : undefined}
      aria-valuenow={interactive ? Math.round((index / total) * 360) : undefined}
      aria-valuemin={interactive ? 0 : undefined}
      aria-valuemax={interactive ? 360 : undefined}
    >
      {urls.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          aria-hidden={i !== 0}
          draggable={false}
          className={`w-full h-auto ${imgClassName} ${i === index ? "opacity-100 relative" : "opacity-0 absolute inset-0"}`}
        />
      ))}

      {interactive && showHint && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-foreground/70 text-background text-xs font-medium backdrop-blur-sm">
          {hint}
        </div>
      )}

      {loaded < total && (
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-0.5 bg-primary/60 transition-[width] duration-200"
          style={{ width: `${(loaded / total) * 100}%` }}
        />
      )}
    </div>
  );
};

export default FrameScrubber;
