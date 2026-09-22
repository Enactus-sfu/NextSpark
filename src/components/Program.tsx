import { useCallback, useRef, useState } from "react";
import { Wrench, Zap, FlaskConical } from "lucide-react";
import ExplodedReveal from "@/components/render/ExplodedReveal";
import { assembledStill } from "@/components/render/explodedFrames";
import { useMinWidth } from "@/components/render/useMinWidth";

const steps = [
  {
    step: "Step 1",
    title: "Build the Generator",
    icon: Wrench,
    description: "Working in groups of two or three, students wind copper coils, load a rotor with magnets, fit the gears and put together a 3D-printed hand-crank generator.",
    outcomes: ["Wind six copper coils", "Assemble the rotor, stator and gears", "Learn what each part does"],
    tint: "primary",
  },
  {
    step: "Step 2",
    title: "Make Electricity",
    icon: Zap,
    description: "Students turn the crank to light an LED, then connect a multimeter and read the output themselves.",
    outcomes: ["Light an LED by hand", "Measure output with a multimeter"],
    tint: "secondary",
  },
  {
    step: "Step 3",
    title: "Test the Science",
    icon: FlaskConical,
    description: "Students swap in fewer magnets and change the crank speed, then compare the readings to see electromagnetic induction at work.",
    outcomes: ["Compare 12, 8 and 6 magnets", "Try different crank speeds", "Connect the results to Faraday's law"],
    tint: "primary",
  },
];

const takeaways = ["Hands-On Building", "Real Measurements", "Physics You Can See", "Teamwork"];

const Program = () => {
  // The teardown column is sticky, so progress is measured against this outer
  // wrapper: a stuck element's top stops changing and would freeze the sequence.
  const track = useRef<HTMLDivElement>(null);
  // Pin and animate only where there is room to do it without the step cards
  // sliding over the kit. Below this the kit is simply a still.
  const pinned = useMinWidth(1024);
  const [progress, setProgress] = useState(0);
  const onProgress = useCallback((p: number) => {
    setProgress((cur) => (Math.abs(cur - p) < 0.01 ? cur : p));
  }, []);
  // Which of the three steps the teardown is currently sitting in.
  const active = Math.min(steps.length - 1, Math.floor(progress * steps.length));

  return (
    <section id="program" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="mb-6 animate-fade-in">How NextSpark Works</h2>
          <p className="text-xl text-muted-foreground animate-fade-in-up">
            A simple after-school session built around one kit. Students put it together themselves, then use it to find out how it works.
          </p>
        </div>

        {/* The tracked wrapper is this whole block, not the kit's column: a sticky
            element only pins while its containing block is taller than it is, and
            the kit's own column is exactly its own height. Measuring here also
            makes the mobile stack work, where there is no grid to stretch it. */}
        <div ref={track} className="lg:grid lg:grid-cols-2 lg:gap-8 mb-12">
          {/* The kit assembles as the steps scroll past. Pinned for the whole
              section, so the camera never appears to move and the finished
              generator is fully in frame when it lands. */}
          <div className="animate-fade-in lg:sticky lg:top-0 lg:h-screen flex items-center">
            <div className="w-full">
              {pinned ? (
                <ExplodedReveal
                  trackRef={track}
                  pin
                  holdEnd={0.28}
                  onProgress={onProgress}
                  className="mx-auto w-full max-w-[30rem]"
                />
              ) : (
                <img
                  src={assembledStill}
                  alt="3D render of the assembled NextSpark hand-crank generator"
                  className="mx-auto w-full max-w-[17rem] sm:max-w-[22rem]"
                />
              )}
              {pinned && (
                <p className="mt-2 text-sm text-muted-foreground text-center">
                  Six coils, twelve magnets and the gear train. Scroll to put it together.
                </p>
              )}
            </div>
          </div>

          {/* Steps: each one takes a slice of the scroll, which is what gives the
              pinned kit beside it room to stay pinned. */}
          <div className="space-y-6 lg:space-y-0 relative">
            {steps.map(({ step, title, icon: Icon, description, outcomes, tint }, index) => (
              <div
                key={title}
                className={`flex items-center ${index === steps.length - 1 ? "lg:min-h-[58vh]" : "lg:min-h-[82vh]"}`}
              >
              <div
                className={`w-full bg-card rounded-xl p-6 border transition-base animate-slide-in motion-reduce:transition-none ${
                  index === active ? "border-primary shadow-lg" : "border-border hover:shadow-lg"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg ${tint === "secondary" ? "bg-secondary/20" : "bg-primary/10"} flex items-center justify-center flex-shrink-0`}>
                    <Icon aria-hidden="true" className={`w-6 h-6 ${tint === "secondary" ? "text-secondary" : "text-primary"}`} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary-dark mb-1">{step}</div>
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{description}</p>
                <ul role="list" className="space-y-2">
                  {outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-center gap-2">
                      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
              </div>
            ))}
          </div>
        </div>

        {/* Takeaways */}
        <div className="max-w-4xl mx-auto bg-gradient-accent rounded-2xl p-8 md:p-12 text-center shadow-glow">
          <h3 className="text-3xl font-bold mb-4 text-secondary-foreground">What Students Learn</h3>
          <p className="text-lg mb-6 text-secondary-foreground">
            How to build a working generator with their own hands, and how electricity is actually made.
          </p>
          <ul role="list" className="flex flex-wrap justify-center gap-4">
            {takeaways.map((item) => (
              <li key={item} className="px-4 py-2 bg-background/20 rounded-lg backdrop-blur-sm font-semibold text-secondary-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Program;
