import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

/**
 * Loads a Vite-globbed frame sequence and reports decode progress.
 *
 * Loading is deferred until the host element is near the viewport, so a
 * sequence further down the page does not compete with the initial render.
 * Frames are pre-rendered stills, so there is no WebGL context to lose and a
 * partially loaded sequence still scrubs — it just snaps to whatever has
 * decoded so far.
 */
export function useFrameSequence(modules: Record<string, string>, host?: RefObject<HTMLElement | null>) {
  const urls = useMemo(() => Object.keys(modules).sort().map((k) => modules[k]), [modules]);

  const images = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);
  const [start, setStart] = useState(!host);

  // Begin fetching once the component is within ~1.5 viewports.
  useEffect(() => {
    if (start) return;
    const el = host?.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setStart(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStart(true);
          io.disconnect();
        }
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [host, start]);

  useEffect(() => {
    if (!start) return;
    let cancelled = false;
    const bump = () => {
      if (!cancelled) setLoaded((n) => n + 1);
    };
    images.current = urls.map((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      img.onload = bump;
      img.onerror = bump;
      return img;
    });
    return () => {
      cancelled = true;
    };
  }, [urls, start]);

  return { urls, images, loaded, total: urls.length, ready: loaded >= urls.length, started: start };
}

/** Wrap an arbitrary integer into [0, n). */
export const wrap = (i: number, n: number) => ((i % n) + n) % n;
