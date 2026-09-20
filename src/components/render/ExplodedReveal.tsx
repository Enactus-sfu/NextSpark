import FrameScrubber, { type ScrubMode } from "./FrameScrubber";

const frames = import.meta.glob("../../assets/renders/exploded/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

/**
 * Scroll-driven teardown: the kit separates into its 81 parts as the section
 * passes through the viewport. Plays once and holds rather than looping.
 */
const ExplodedReveal = (props: {
  mode?: ScrubMode;
  className?: string;
  imgClassName?: string;
  onProgress?: (p: number) => void;
}) => (
  <FrameScrubber
    frames={frames}
    mode="scroll"
    loop={false}
    alt="Exploded view of the NextSpark generator showing its 6 coils and 12 magnets"
    {...props}
  />
);

export default ExplodedReveal;
