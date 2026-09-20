import FrameScrubber, { type ScrubMode } from "./FrameScrubber";

const frames = import.meta.glob("../../assets/renders/turntable/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

/** True once the rendered frame sequence has been added to the bundle. */
export const hasTurntable = Object.keys(frames).length > 0;

const Turntable = (props: { mode?: ScrubMode; turns?: number; className?: string; imgClassName?: string }) => (
  <FrameScrubber
    frames={frames}
    alt="3D render of the NextSpark hand-crank generator, rotatable"
    hint="Drag to rotate"
    {...props}
  />
);

export default Turntable;
