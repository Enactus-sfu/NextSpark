import { useCallback, useEffect, useState } from "react";
import { FlaskConical, Instagram, MessageSquare, Target, Users, Wrench, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ExplodedReveal from "@/components/render/ExplodedReveal";
import Turntable from "@/components/render/Turntable";
import heroRender from "@/assets/renders/hero.webp";
import heroSm from "@/assets/renders/hero-sm.webp";
import { FEEDBACK_FORM_URL, INSTAGRAM_URL } from "@/lib/links";

/** Kit facts, kept identical to the main hero so the numbers never drift. */
const facts = [
  { value: "6", label: "Hand-Wound Coils" },
  { value: "12", label: "Magnets" },
  { value: "3:1", label: "Gear Ratio" },
];

/** The three session steps, driven off the teardown's scroll progress. */
const steps = [
  {
    step: "Step 1",
    title: "Build the Generator",
    icon: Wrench,
    description:
      "Working in groups of two or three, students wind copper coils, load a rotor with magnets, fit the gears and put together a 3D-printed hand-crank generator.",
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
    description:
      "Students swap in fewer magnets and change the crank speed, then compare the readings to see electromagnetic induction at work.",
    outcomes: ["Compare 12, 8 and 6 magnets", "Try different crank speeds", "Connect the results to Faraday's law"],
    tint: "primary",
  },
];

const takeaways = ["Hands-On Building", "Real Measurements", "Physics You Can See", "Teamwork"];

const missionCards = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To make STEM something high school students can hold, build and test, not just read about in a textbook.",
    tint: "primary",
  },
  {
    icon: Wrench,
    title: "Why Hands-On",
    text: "Parts are hard to find and online projects can feel too complex to start. We give students a complete kit and a guided session, so they can focus on the science.",
    tint: "secondary",
  },
  {
    icon: Users,
    title: "Built by Students",
    text: "Enactus SFU students design, 3D print and assemble every kit, and keep improving the parts with each version.",
    tint: "primary",
  },
];

/** Tracks the OS "reduce motion" setting so the teardown can fall back to a static diagram. */
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
};

/** A kit fact reused as a section anchor, so the same three numbers recur down the page. */
const StatAnchor = ({ value, label }: { value: string; label: string }) => (
  <p className="flex items-baseline gap-2 mb-4">
    <span className="text-3xl font-bold text-primary">{value}</span>
    <span className="text-sm font-semibold uppercase tracking-widest text-primary-dark">{label}</span>
  </p>
);

const Teardown = () => {
  const reduceMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  // Quantised so a scroll only re-renders the page ~50 times across the whole teardown.
  const handleProgress = useCallback((p: number) => {
    const next = Math.round(p * 50) / 50;
    setProgress((prev) => (prev === next ? prev : next));
  }, []);

  // With reduced motion the sequence jumps to the final exploded frame and never
  // reports progress, so every caption stays lit and the section reads as a diagram.
  const activeStep = progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2;
  const isLit = (index: number) => reduceMotion || activeStep === index;
  const barWidth = reduceMotion ? 100 : Math.round(progress * 100);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <main>
        {/* Hero */}
        <section id="hero" className="relative overflow-hidden gradient-subtle pt-28 pb-16 md:pt-36 md:pb-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-24 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-3xl"
          />

          <div className="container relative mx-auto px-4">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_minmax(0,1fr)] lg:gap-16">
              <div>
                <div className="inline-block mb-6 px-4 py-2 bg-secondary/20 rounded-full animate-fade-in">
                  <span className="text-sm font-semibold text-secondary-foreground">After-School STEM · Enactus SFU</span>
                </div>

                <h1 className="mb-6 animate-fade-in-up">
                  Learn STEM by <span className="text-gradient">Building It</span>
                </h1>

                <p
                  className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl animate-fade-in-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  NextSpark is an after-school program for high school students. Students build a real hand-crank
                  generator from a kit, then use it to see how electricity is made.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                  <Button size="lg" onClick={() => scrollToSection("program")} className="text-lg px-8 py-6 h-auto">
                    Take It Apart
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
                    <a href={FEEDBACK_FORM_URL} target="_blank" rel="noopener noreferrer">
                      Leave Feedback
                    </a>
                  </Button>
                </div>
              </div>

              <div className="relative animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <img
                  src={heroRender}
                  srcSet={`${heroSm} 700w, ${heroRender} 1200w`}
                  sizes="(min-width: 1024px) 40vw, 85vw"
                  width={1200}
                  height={1499}
                  decoding="async"
                  alt="3D render of the assembled NextSpark hand-crank generator, with its crank, gears and 3D-printed housing"
                  className="relative mx-auto w-full max-w-[24rem] lg:max-w-none h-auto"
                />
              </div>
            </div>

            {/* Kit facts — the same three numbers anchor the sections below */}
            <dl
              className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8 sm:gap-8 md:mt-16 animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col">
                  <dt className="order-2 text-xs sm:text-sm text-muted-foreground">{fact.label}</dt>
                  <dd className="order-1 text-3xl md:text-4xl font-bold text-primary mb-1">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* The teardown — scroll-driven exploded view with the three steps in step */}
        <section id="program" className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <header className="max-w-3xl">
              <StatAnchor value="6" label="Hand-Wound Coils" />
              <h2 className="mb-6">You Cannot See the Coils Until You Take It Apart</h2>
              <p className="text-xl text-muted-foreground">
                Assembled, the six hand-wound coils sit inside the housing, hidden behind the rotor and the gears. Pulling
                it apart is the only way to see them. Scroll, and the generator comes apart in the same three steps
                students work through in a session.
              </p>
            </header>

            <div className="mt-10 grid gap-6 md:mt-14 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-12">
              {/* Captions: a bar under the nav on small screens, a pinned rail beside the render on large ones */}
              <aside
                aria-label="Teardown steps"
                className="sticky top-16 z-20 self-start rounded-2xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur-sm md:top-24 lg:top-28 lg:order-2 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none"
              >
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <p className="text-sm font-semibold text-primary-dark">Teardown</p>
                  <p className="text-sm text-muted-foreground">
                    {reduceMotion ? "All three steps" : `Step ${activeStep + 1} of 3`}
                  </p>
                </div>

                <div aria-hidden="true" className="h-1 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-gradient-accent transition-[width] duration-200"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>

                <ol className="mt-4 space-y-2 lg:space-y-4">
                  {steps.map(({ step, title, icon: Icon, description, tint }, index) => {
                    const lit = isLit(index);
                    return (
                      <li key={title} aria-current={!reduceMotion && activeStep === index ? "step" : undefined}>
                        <div
                          className={`flex items-start gap-3 rounded-xl border p-3 transition-base lg:p-4 ${
                            lit
                              ? "border-primary/40 bg-card shadow-lg"
                              : "border-transparent bg-transparent opacity-40"
                          }`}
                        >
                          <div
                            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg lg:h-11 lg:w-11 ${
                              tint === "secondary" ? "bg-secondary/20" : "bg-primary/10"
                            }`}
                          >
                            <Icon
                              aria-hidden="true"
                              className={`h-5 w-5 ${tint === "secondary" ? "text-secondary" : "text-primary"}`}
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-primary-dark">{step}</div>
                            <h3 className="text-lg font-bold lg:text-xl">{title}</h3>
                            <p className={`mt-2 text-sm text-muted-foreground ${reduceMotion ? "" : "hidden lg:block"}`}>
                              {description}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </aside>

              {/* Stage: the render travels through this frame and separates as it goes */}
              <div className="lg:order-1">
                <div className="relative flex min-h-[45vh] items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted/40 p-4 md:min-h-[70vh] md:p-8">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
                      backgroundSize: "44px 44px",
                    }}
                  />
                  <ExplodedReveal
                    onProgress={handleProgress}
                    className="relative w-full max-w-[34rem]"
                    imgClassName="mx-auto"
                  />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Every part of the kit is 3D printed and assembled by Enactus SFU students.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What students do — the outcomes behind each step */}
        <section className="py-20 md:py-28 gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-12">
              <StatAnchor value="12" label="Magnets" />
              <h2 className="mb-6">What Students Do</h2>
              <p className="text-xl text-muted-foreground">
                A simple after-school session built around one kit. Students put it together themselves, then use it to
                find out how it works.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              {steps.map(({ step, title, outcomes, tint }) => (
                <div key={title} className="rounded-2xl border border-border bg-card p-6 transition-base hover:shadow-lg">
                  <div className="text-sm font-semibold text-primary-dark mb-1">{step}</div>
                  <h3 className="text-xl font-bold mb-4">{title}</h3>
                  <ul role="list" className="space-y-2">
                    {outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className={`mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                            tint === "secondary" ? "bg-secondary" : "bg-primary"
                          }`}
                        />
                        <span className="text-sm">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Put it back together — drag turntable */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <StatAnchor value="3:1" label="Gear Ratio" />
                <h2 className="mb-6">Put It Back Together</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Closed up, it is a crank, a gear train and a housing. Drag the generator to turn it over and look at it
                  from any angle, the way students do once the build is finished.
                </p>
                <ul role="list" className="flex flex-wrap gap-3">
                  {takeaways.map((item) => (
                    <li key={item} className="rounded-lg bg-muted px-4 py-2 text-sm font-semibold">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Turntable
                mode="drag"
                className="mx-auto w-full max-w-[26rem] rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                imgClassName="mx-auto"
              />
            </div>
          </div>
        </section>

        {/* Who builds it */}
        <section id="about" className="py-20 md:py-28 gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="mb-6">Our Vision</h2>
              <p className="text-xl text-muted-foreground">
                We envision a future where every student feels confident exploring STEM. We aim to inspire curiosity,
                creativity and problem-solving through hands-on learning. By empowering youth with practical skills, we
                help shape future innovators and leaders. Together we strive to create a lasting social impact in BC and
                beyond.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 mb-16">
              {missionCards.map(({ icon: Icon, title, text, tint }) => (
                <div key={title} className="rounded-2xl border border-border bg-card p-8 transition-base hover:shadow-lg">
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${
                      tint === "secondary" ? "bg-secondary/20" : "bg-primary/10"
                    }`}
                  >
                    <Icon
                      aria-hidden="true"
                      className={`h-7 w-7 ${tint === "secondary" ? "text-secondary" : "text-primary"}`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{title}</h3>
                  <p className="text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3">
                <span className="text-lg font-semibold text-secondary-foreground">Build it · Test it · Understand it</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="mb-6">Get in Touch</h2>
                <p className="text-xl text-muted-foreground">
                  Follow along on Instagram, or tell us how NextSpark went for you.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex flex-col rounded-2xl border border-border bg-card p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Instagram aria-hidden="true" className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Instagram</h3>
                  <p className="text-muted-foreground mb-6 flex-1">
                    Photos, updates and upcoming sessions. Send us a DM with any questions.
                  </p>
                  <Button asChild size="lg" variant="outline">
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                      @nextsparksfu
                    </a>
                  </Button>
                </div>

                <div className="flex flex-col rounded-2xl border border-border bg-card p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/20">
                    <MessageSquare aria-hidden="true" className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Leave Feedback</h3>
                  <p className="text-muted-foreground mb-6 flex-1">
                    Took part in NextSpark? Tell us what worked and what we should improve. It takes about 2 minutes, with
                    no sign-in needed.
                  </p>
                  <Button asChild size="lg">
                    <a href={FEEDBACK_FORM_URL} target="_blank" rel="noopener noreferrer">
                      Open Feedback Form
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Teardown;
