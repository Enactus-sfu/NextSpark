import FrameScrubber, { type ScrubMode } from "./FrameScrubber";
import stillSrc from "@/assets/renders/hero.webp";
import stillSmall from "@/assets/renders/hero-sm.webp";

const frames = import.meta.glob("../../assets/renders/turntable/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

/** True once the rendered frame sequence has been added to the bundle. */
export const hasTurntable = Object.keys(frames).length > 0;

const ALT = "3D render of the NextSpark hand-crank generator";

/**
 * Falls back to the static render when the frame sequence is absent, so the
 * component never renders an empty box.
 */
const Turntable = ({
  className = "",
  imgClassName = "",
  ...rest
}: { mode?: ScrubMode; turns?: number; className?: string; imgClassName?: string; initialFrame?: number }) => {
  if (!hasTurntable) {
    return (
      <img
        src={stillSrc}
        srcSet={`${stillSmall} 700w, ${stillSrc} 1200w`}
        sizes="(max-width: 1024px) 80vw, 40vw"
        alt={ALT}
        width={1200}
        height={1499}
        className={`w-full h-auto ${className} ${imgClassName}`}
      />
    );
  }
  // frame 20 of 24 is the 300 degree three-quarter view: crank readable, logo visible
  return <FrameScrubber frames={frames} alt={`${ALT}, rotatable`} hint="Drag to rotate" initialFrame={20} className={className} imgClassName={imgClassName} {...rest} />;
};

export default Turntable;
