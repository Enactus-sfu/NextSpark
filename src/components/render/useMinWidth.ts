import { useEffect, useState } from "react";

/**
 * True once the viewport is at least `px` wide. Starts false so the server-less
 * first paint matches the narrow layout, then corrects on mount.
 */
export function useMinWidth(px: number) {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${px}px)`);
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [px]);

  return wide;
}
