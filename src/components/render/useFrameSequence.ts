import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Loads a Vite-globbed frame sequence and reports decode progress.
 * Frames are pre-rendered stills, so there is no WebGL context to lose and
 * nothing to fall back from — a partially loaded sequence still scrubs.
 */
export function useFrameSequence(modules: Record<string, string>) {
  const urls = useMemo(
    () =>
      Object.keys(modules)
        .sort()
        .map((k) => modules[k]),
    [modules],
  );

  const images = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    let cancelled = false;
    images.current = urls.map((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      img.onload = () => {
        if (!cancelled) setLoaded((n) => n + 1);
      };
      img.onerror = () => {
        if (!cancelled) setLoaded((n) => n + 1);
      };
      return img;
    });
    return () => {
      cancelled = true;
    };
  }, [urls]);

  return { urls, images, loaded, total: urls.length, ready: loaded >= urls.length };
}

/** Wrap an arbitrary integer into [0, n). */
export const wrap = (i: number, n: number) => ((i % n) + n) % n;
