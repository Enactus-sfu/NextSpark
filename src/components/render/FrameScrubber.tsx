import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  /** Frame shown before any interaction. Lets a hero open on a flattering angle. */
  initialFrame?: number;
  /** Play the sequence backwards, e.g. scroll to assemble rather than explode. */
  reverse?: boolean;
  /**
   * Map progress to the window in which a sticky child is actually pinned,
   * rather than to the track's whole pass through the viewport. Without this the
   * sequence is still mid-way when the element unsticks and scrolls off.
   */
  pin?: boolean;
  /**
   * Finish the sequence this fraction early and hold the last frame for the rest
   * of the scroll, so the finished state gets a beat on screen before the
   * section releases instead of completing as it leaves.
   */
  holdEnd?: number;
  /**
   * Element whose position drives scroll progress. Pass a non-sticky ancestor
   * when the scrubber itself is position:sticky -- a stuck element's top stops
   * changing, which would freeze progress partway through the sequence.
   */
  trackRef?: React.RefObject<HTMLElement | null>;
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
  initialFrame = 0,
  trackRef,
  reverse = false,
  pin = false,
  holdEnd = 0,
}: Props) => {
  const host = useRef<HTMLDivElement>(null);
  const { urls: rawUrls, loaded, total, started } = useFrameSequence(frames, host);
  const urls = useMemo(() => (reverse ? [...rawUrls].reverse() : rawUrls), [rawUrls, reverse]);
  const [index, setIndex] = useState(initialFrame);
  const [showHint, setShowHint] = useState(true);
  const drag = useRef<{ x: number; start: number; lastX: number; lastT: number; v: number } | null>(null);
  const spin = useRef<number>(0);          // frames per second, decaying after release
  const raf = useRef<number>(0);

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
        const el = trackRef?.current ?? host.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // pin: 0 when the track's top reaches the viewport top, 1 when its bottom
        // reaches the viewport bottom -- exactly the span a sticky child is stuck.
        // through: the track's whole pass across the viewport.
        const span = pin ? Math.max(1, r.height - vh) : r.height + vh;
        const travelled = pin ? -r.top : vh - r.top;
        const p = Math.min(1, Math.max(0, travelled / span));
        onProgress?.(p);
        if (loop) {
          setIndex(wrap(Math.round(p * turns * total), total));
        } else {
          const q = holdEnd > 0 && holdEnd < 1 ? Math.min(1, p / (1 - holdEnd)) : p;
          setIndex(Math.min(total - 1, Math.round(q * (total - 1))));
        }
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
  }, [mode, total, turns, loop, onProgress, trackRef, pin, holdEnd]);

  const onDown = useCallback(
    (e: React.PointerEvent) => {
      if (mode !== "drag" || !total) return;
      cancelAnimationFrame(raf.current);
      spin.current = 0;
      drag.current = { x: e.clientX, start: index, lastX: e.clientX, lastT: performance.now(), v: 0 };
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
      const now = performance.now();
      const dt = Math.max(16, now - d.lastT);
      // frames/second, for the coast after release
      d.v = (-(e.clientX - d.lastX) / w) * total * (1000 / dt);
      d.lastX = e.clientX;
      d.lastT = now;
      setIndex(wrap(Math.round(d.start - ((e.clientX - d.x) / w) * total), total));
    },
    [total],
  );

  // Coast on release, decaying to a stop. A turntable that halts the instant you
  // let go feels like a slider; one that carries a little momentum feels like an
  // object. Skipped entirely under prefers-reduced-motion.
  const onUp = useCallback(() => {
    const d = drag.current;
    drag.current = null;
    if (!d || !total) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (Math.abs(d.v) < 1.5) return;
    spin.current = Math.max(-total * 2, Math.min(total * 2, d.v));
    let prev = performance.now();
    let acc = 0;
    const step = (t: number) => {
      const dt = (t - prev) / 1000;
      prev = t;
      acc += spin.current * dt;
      const whole = Math.trunc(acc);
      if (whole !== 0) {
        acc -= whole;
        setIndex((i) => wrap(i + whole, total));
      }
      spin.current *= Math.exp(-3.4 * dt);   // settles in about a second
      if (Math.abs(spin.current) > 0.6) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, [total]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

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
          loading={i === 0 ? "eager" : "lazy"}
          className={`w-full h-auto ${imgClassName} ${i === index ? "opacity-100 relative" : "opacity-0 absolute inset-0"}`}
        />
      ))}

      {interactive && showHint && (
        <div className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[0.7rem] font-medium tracking-wide text-muted-foreground/80">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M9 6 5 12l4 6M15 6l4 6-4 6" />
          </svg>
          {hint}
        </div>
      )}

      {started && loaded < total && (
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-0.5 bg-primary/60 transition-[width] duration-200"
          style={{ width: `${(loaded / total) * 100}%` }}
        />
      )}
    </div>
  );
};

export default FrameScrubber;
