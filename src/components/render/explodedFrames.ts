const frames = import.meta.glob("../../assets/renders/exploded/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export const explodedFrames = frames;

/** True once the teardown sequence has been added to the bundle. */
export const hasExploded = Object.keys(frames).length > 0;

/**
 * The fully assembled frame, for places that want the finished kit as a plain
 * still rather than loading the whole sequence.
 */
export const assembledStill = Object.keys(frames).sort().map((k) => frames[k])[0];
