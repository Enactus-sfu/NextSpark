import { useEffect } from "react";
import FrameScrubber, { type ScrubMode } from "./FrameScrubber";
import stillSrc from "@/assets/renders/hero.webp";

const frames = import.meta.glob("../../assets/renders/exploded/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

/** True once the teardown sequence has been added to the bundle. */
export const hasExploded = Object.keys(frames).length > 0;

const ALT = "The NextSpark generator assembling from its separate parts: 6 coils, 12 magnets, rotor and gear train";

type Props = {
  mode?: ScrubMode;
  className?: string;
  imgClassName?: string;
  onProgress?: (p: number) => void;
  /** Non-sticky ancestor to measure scroll progress against. */
  trackRef?: React.RefObject<HTMLElement | null>;
  /** Default: scrolling assembles the kit. Pass false to take it apart instead. */
  assemble?: boolean;
  /** Measure progress over the sticky pin window rather than the whole pass. */
  pin?: boolean;
  /** Finish this fraction early and hold the assembled kit on screen. */
  holdEnd?: number;
};

/**
 * Scroll-driven teardown: the kit separates into its parts as the section
 * passes through the viewport. Plays once and holds rather than looping.
 * Falls back to the assembled still when the sequence is absent.
 */
const ExplodedReveal = ({ className = "", imgClassName = "", onProgress, trackRef, assemble = true, pin = false, holdEnd = 0, ...rest }: Props) => {
  // Keep callers that drive captions off progress in a sane state without frames.
  useEffect(() => {
    if (!hasExploded) onProgress?.(0);
  }, [onProgress]);

  if (!hasExploded) {
    return (
      <img
        src={stillSrc}
        alt="3D render of the assembled NextSpark hand-crank generator"
        width={1200}
        height={1499}
        className={`w-full h-auto ${className} ${imgClassName}`}
      />
    );
  }
  return (
    <FrameScrubber
      frames={frames}
      mode="scroll"
      loop={false}
      alt={ALT}
      className={className}
      imgClassName={imgClassName}
      onProgress={onProgress}
      trackRef={trackRef}
      reverse={assemble}
      pin={pin}
      holdEnd={holdEnd}
      initialFrame={0}
      {...rest}
    />
  );
};

export default ExplodedReveal;
