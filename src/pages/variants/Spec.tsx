import { useCallback, useEffect, useState } from "react";
import { Target, Users, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Turntable, { hasTurntable } from "@/components/render/Turntable";
import ExplodedReveal from "@/components/render/ExplodedReveal";
import heroRender from "@/assets/renders/hero.webp";
import heroSm from "@/assets/renders/hero-sm.webp";

/**
 * "Spec sheet" variant — the kit documented like a piece of engineering, for
 * teachers and funders. Same palette and copy as the main site, laid out as a
 * datasheet: thin rules, a real parts manifest, figures in tabular mono.
 */

/* The teardown sequence is added to the bundle once the renders finish; until
   then ExplodedReveal draws nothing, so the figure falls back to the still. */
const explodedFrames = import.meta.glob("../../assets/renders/exploded/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const hasExploded = Object.keys(explodedFrames).length > 0;

const headline = [
  { value: "6", label: "Hand-Wound Coils" },
  { value: "12", label: "Magnets" },
  { value: "3:1", label: "Gear Ratio" },
];

const specs = [
  { label: "Overall size", value: "100 × 107 × 166 mm", note: "assembled envelope" },
  { label: "Printed parts", value: "81", note: "separately printed and assembled" },
  { label: "Rotor magnets", value: "12", note: "spaced 30° apart at a 24.7 mm radius" },
  { label: "Coil stations", value: "6", note: "spaced 60° apart" },
  { label: "Winding", value: "6 layers", note: "each coil wound by hand" },
  { label: "Gear ratio", value: "3:1", note: "84.5 mm spur gear, 30.5 mm pinion" },
  { label: "Structural material", value: "PLA", note: "3D printed by Enactus SFU students" },
];

const callouts = [
  {
    id: "01",
    title: "Frame and Housing",
    figure: "81 parts",
    text: "Every structural part is 3D printed in PLA by Enactus SFU students, who keep improving the parts with each version.",
  },
  {
    id: "02",
    title: "Crank and Gear Train",
    figure: "3:1 ratio",
    text: "The hand crank turns an 84.5 mm spur gear against a 30.5 mm pinion. Students fit the gears themselves and feel the ratio in the handle.",
  },
  {
    id: "03",
    title: "Rotor",
    figure: "12 magnets",
    text: "Twelve magnets sit 30° apart on a 24.7 mm radius. Swapping some of them out later is what turns the kit into an experiment.",
  },
  {
    id: "04",
    title: "Stator Coils",
    figure: "6 stations",
    text: "Six coil stations 60° apart, each hand-wound in six layers, so students see exactly where the current comes from.",
  },
];

const manifest = [
  { assembly: "Rotor magnets", count: "12", detail: "30° apart, 24.7 mm radius" },
  { assembly: "Coil stations", count: "6", detail: "60° apart, six layers, wound by hand" },
  { assembly: "Spur gear", count: "1", detail: "84.5 mm, PLA" },
  { assembly: "Pinion", count: "1", detail: "30.5 mm, PLA" },
  { assembly: "Printed and assembled parts", count: "81", detail: "every structural part in PLA" },
];

const cards = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To make STEM something high school students can hold, build and test, not just read about in a textbook.",
  },
  {
    icon: Wrench,
    title: "Why Hands-On",
    text: "Parts are hard to find and online projects can feel too complex to start. We give students a complete kit and a guided session, so they can focus on the science.",
  },
  {
    icon: Users,
    title: "Built by Students",
    text: "Enactus SFU students design, 3D print and assemble every kit, and keep improving the parts with each version.",
  },
];

const steps = [
  {
    step: "Step 1",
    title: "Build the Generator",
    description:
      "Working in groups of two or three, students wind copper coils, load a rotor with magnets, fit the gears and put together a 3D-printed hand-crank generator.",
    outcomes: ["Wind six copper coils", "Assemble the rotor, stator and gears", "Learn what each part does"],
  },
  {
    step: "Step 2",
    title: "Make Electricity",
    description: "Students turn the crank to light an LED, then connect a multimeter and read the output themselves.",
    outcomes: ["Light an LED by hand", "Measure output with a multimeter"],
  },
  {
    step: "Step 3",
    title: "Test the Science",
    description:
      "Students swap in fewer magnets and change the crank speed, then compare the readings to see electromagnetic induction at work.",
    outcomes: ["Compare 12, 8 and 6 magnets", "Try different crank speeds", "Connect the results to Faraday's law"],
  },
];

const takeaways = ["Hands-On Building", "Real Measurements", "Physics You Can See", "Teamwork"];

const eyebrow = "font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground";
const gridPaper = {
  backgroundImage:
    "linear-gradient(to right, hsl(var(--border) / 0.7) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.7) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

const SectionHead = ({ index, title, lead }: { index: string; title: string; lead?: string }) => (
  <header className="mb-10 border-b border-border pb-5">
    <div className="flex items-baseline gap-4">
      <span aria-hidden="true" className={`${eyebrow} tabular-nums`}>
        {index}
      </span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl">{title}</h2>
    </div>
    {lead ? <p className="mt-4 max-w-3xl text-base md:text-lg text-muted-foreground">{lead}</p> : null}
  </header>
);

const Spec = () => {
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleProgress = useCallback((p: number) => {
    setProgress((prev) => (Math.abs(prev - p) < 0.004 ? prev : p));
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  /* The teardown only drives the callouts when it is actually playing. */
  const tracking = hasExploded && !reduceMotion;
  const activeIndex = tracking ? Math.min(callouts.length - 1, Math.floor(progress * callouts.length)) : -1;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-16 md:pt-20">
        {/* Document strip */}
        <div className="border-b border-border bg-muted/40">
          <div className={`container mx-auto flex flex-wrap justify-between gap-x-8 gap-y-1 px-4 py-3 ${eyebrow}`}>
            <span>NextSpark · Enactus SFU</span>
            <span>Technical Overview</span>
            <span className="tabular-nums">81 parts · 100 × 107 × 166 mm</span>
          </div>
        </div>

        {/* Title block */}
        <section id="hero" className="gradient-subtle border-b border-border py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="order-2 lg:order-1 lg:col-span-7">
                <p className={`${eyebrow} mb-5`}>Hand-Crank Generator Kit</p>

                <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl animate-fade-in-up">
                  A generator students <span className="text-gradient">build themselves</span>
                </h1>

                <p className="mb-8 max-w-2xl text-lg md:text-xl text-muted-foreground animate-fade-in-up">
                  NextSpark is an after-school program for high school students. Students build a real hand-crank
                  generator from a kit, then use it to see how electricity is made. This page documents what is in the
                  kit and what a session covers.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" onClick={() => scrollToSection("program")}>
                    See How It Works
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
                    Get in Touch
                  </Button>
                </div>

                <dl className="mt-12 grid grid-cols-3 divide-x divide-border border-y border-border">
                  {headline.map((fact) => (
                    <div key={fact.label} className="px-3 py-5 first:pl-0">
                      <dd className="mb-1 font-mono text-2xl sm:text-3xl font-bold tabular-nums text-primary">
                        {fact.value}
                      </dd>
                      <dt className="text-xs sm:text-sm text-muted-foreground">{fact.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Fig. 1 — the assembled kit, inspectable */}
              <figure className="order-1 lg:order-2 lg:col-span-5 animate-scale-in">
                <div className="rounded-lg border border-border bg-background p-4 sm:p-6" style={gridPaper}>
                  {hasTurntable ? (
                    <Turntable mode="drag" className="mx-auto w-full max-w-[20rem] lg:max-w-none" />
                  ) : (
                    <img
                      src={heroRender}
                      srcSet={`${heroSm} 700w, ${heroRender} 1200w`}
                      sizes="(min-width: 1024px) 26rem, 20rem"
                      alt="3D render of the NextSpark hand-crank generator"
                      className="mx-auto w-full max-w-[20rem] lg:max-w-none"
                      width={1200}
                      height={1499}
                    />
                  )}
                </div>
                <figcaption className={`${eyebrow} mt-3 flex flex-wrap justify-between gap-x-6 gap-y-1`}>
                  <span>Fig. 1 — Assembled kit</span>
                  {hasTurntable ? <span>Drag to rotate</span> : null}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 01 — Specifications */}
        <section id="specs" className="border-b border-border py-16 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHead
              index="01"
              title="Specifications"
              lead="Every figure below is measured from the kit's CAD. Nothing here is a target or an estimate."
            />

            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <table className="w-full text-left">
                  <caption className="sr-only">NextSpark hand-crank generator kit specifications</caption>
                  <tbody className="divide-y divide-border border-y border-border">
                    {specs.map(({ label, value, note }) => (
                      <tr key={label} className="align-top">
                        <th scope="row" className="w-[45%] py-4 pr-4 text-sm font-semibold text-foreground">
                          {label}
                        </th>
                        <td className="py-4 text-right">
                          <span className="block font-mono text-sm font-semibold tabular-nums text-foreground">
                            {value}
                          </span>
                          <span className="mt-1 block text-xs text-muted-foreground">{note}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <aside className="lg:col-span-5">
                <div className="rounded-lg border border-border bg-muted/40 p-6">
                  <h3 className={`${eyebrow} mb-3`}>On electrical output</h3>
                  <p className="text-sm text-muted-foreground">
                    Output voltage is deliberately not listed. Students connect a multimeter and read it themselves,
                    then compare 12, 8 and 6 magnets and different crank speeds to see electromagnetic induction at
                    work. The measurement is the lesson.
                  </p>
                </div>
                <div className="mt-6 rounded-lg border border-border p-6">
                  <h3 className={`${eyebrow} mb-3`}>Who makes it</h3>
                  <p className="text-sm text-muted-foreground">
                    Enactus SFU students design, 3D print and assemble every kit, and keep improving the parts with each
                    version.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* 02 — Anatomy */}
        <section id="anatomy" className="border-b border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHead
              index="02"
              title="Anatomy of the Kit"
              lead={
                tracking
                  ? "Scroll to separate the assembly. Each numbered callout matches a group of parts students put together in the session."
                  : "Each numbered callout matches a group of parts students put together in the session."
              }
            />

            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <figure className="lg:col-span-6">
                <div className="rounded-lg border border-border bg-background p-4 sm:p-6" style={gridPaper}>
                  {hasExploded ? (
                    <ExplodedReveal onProgress={handleProgress} className="mx-auto w-full max-w-[22rem] lg:max-w-none" />
                  ) : (
                    <img
                      src={heroRender}
                      srcSet={`${heroSm} 700w, ${heroRender} 1200w`}
                      sizes="(min-width: 1024px) 30rem, 22rem"
                      alt="3D render of the NextSpark hand-crank generator"
                      className="mx-auto w-full max-w-[22rem] lg:max-w-none"
                      width={1200}
                      height={1499}
                    />
                  )}
                </div>
                <figcaption className={`${eyebrow} mt-3`}>
                  Fig. 2 — {hasExploded ? "Exploded view, 81 parts" : "Assembled kit, 81 parts"}
                </figcaption>
              </figure>

              <div className="lg:col-span-6">
                <ol className="border-t border-border">
                  {callouts.map(({ id, title, figure, text }, i) => {
                    const on = i === activeIndex;
                    return (
                      <li
                        key={id}
                        className={`border-b border-border px-4 py-5 transition-colors duration-300 ${
                          on ? "bg-primary/5" : "bg-transparent"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <span
                            aria-hidden="true"
                            className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border font-mono text-xs font-semibold tabular-nums transition-colors duration-300 ${
                              on
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background text-muted-foreground"
                            }`}
                          >
                            {id}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                              <h3 className="text-lg md:text-xl">
                                <span className="sr-only">{id}. </span>
                                {title}
                              </h3>
                              <span className="font-mono text-xs font-semibold tabular-nums text-primary-dark">
                                {figure}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{text}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — Parts manifest */}
        <section id="parts" className="border-b border-border py-16 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHead
              index="03"
              title="Parts Manifest"
              lead="What ships in one kit. Quantities are listed only where they are fixed by the design."
            />

            <table className="w-full text-left">
              <caption className="sr-only">Parts manifest for one NextSpark generator kit</caption>
              <thead>
                <tr className={`${eyebrow} border-y border-border`}>
                  <th scope="col" className="py-3 pr-3 font-medium">
                    Assembly
                  </th>
                  <th scope="col" className="py-3 pr-3 text-right font-medium">
                    Qty
                  </th>
                  <th scope="col" className="py-3 font-medium">
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {manifest.map(({ assembly, count, detail }) => (
                  <tr key={assembly} className="align-top">
                    <th scope="row" className="py-4 pr-3 text-sm font-semibold text-foreground">
                      {assembly}
                    </th>
                    <td className="py-4 pr-3 text-right font-mono text-sm tabular-nums text-foreground">{count}</td>
                    <td className="py-4 text-sm text-muted-foreground">{detail}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border">
                  <th scope="row" className="py-4 pr-3 text-sm font-semibold text-foreground">
                    Assembled envelope
                  </th>
                  <td className="py-4 pr-3 text-right font-mono text-sm tabular-nums text-foreground">—</td>
                  <td className="py-4 font-mono text-sm tabular-nums text-muted-foreground">100 × 107 × 166 mm</td>
                </tr>
              </tfoot>
            </table>

            <p className="mt-6 max-w-2xl text-xs text-muted-foreground">
              Wire gauge, mass and build time are not listed because they are not fixed across versions. We would rather
              leave a row out than publish a number we have not measured.
            </p>
          </div>
        </section>

        {/* 04 — Session */}
        <section id="program" className="border-b border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHead
              index="04"
              title="How NextSpark Works"
              lead="A simple after-school session built around one kit. Students put it together themselves, then use it to find out how it works."
            />

            <ol className="grid gap-8 md:grid-cols-3">
              {steps.map(({ step, title, description, outcomes }) => (
                <li key={title} className="border-t-2 border-primary pt-5">
                  <p className={`${eyebrow} mb-2`}>{step}</p>
                  <h3 className="mb-3 text-lg md:text-xl">{title}</h3>
                  <p className="mb-5 text-sm text-muted-foreground">{description}</p>
                  <ul role="list" className="divide-y divide-border border-y border-border">
                    {outcomes.map((outcome) => (
                      <li key={outcome} className="py-2.5 text-sm">
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            <div className="mt-12 rounded-lg border border-border bg-background p-6 md:p-8">
              <h3 className={`${eyebrow} mb-4`}>What students learn</h3>
              <p className="mb-6 max-w-3xl text-base md:text-lg">
                How to build a working generator with their own hands, and how electricity is actually made.
              </p>
              <ul role="list" className="flex flex-wrap gap-2">
                {takeaways.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-secondary/20 px-3 py-1.5 text-sm font-semibold text-secondary-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 05 — Vision */}
        <section id="about" className="border-b border-border py-16 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHead
              index="05"
              title="Our Vision"
              lead="We envision a future where every student feels confident exploring STEM. We aim to inspire curiosity, creativity and problem-solving through hands-on learning. By empowering youth with practical skills, we help shape future innovators and leaders. Together we strive to create a lasting social impact in BC and beyond."
            />

            <div className="grid gap-8 md:grid-cols-3">
              {cards.map(({ icon: Icon, title, text }) => (
                <div key={title} className="border-t border-border pt-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Icon aria-hidden="true" className="h-4 w-4 text-primary" />
                    <h3 className="text-lg md:text-xl">{title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>

            <p className="mt-12 text-center text-base font-semibold text-primary-dark">
              Build it · Test it · Understand it
            </p>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default Spec;
