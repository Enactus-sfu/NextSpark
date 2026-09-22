import { useCallback, useState } from "react";
import { FlaskConical, Instagram, MessageSquare, Target, Users, Wrench, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Turntable from "@/components/render/Turntable";
import ExplodedReveal from "@/components/render/ExplodedReveal";
import { FEEDBACK_FORM_URL, INSTAGRAM_URL } from "@/lib/links";
import heroRender from "@/assets/renders/hero.webp";
import heroSm from "@/assets/renders/hero-sm.webp";

const facts = [
  { value: "6", label: "Hand-Wound Coils" },
  { value: "12", label: "Magnets" },
  { value: "3:1", label: "Gear Ratio" },
];

const cards = [
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
    description:
      "Students turn the crank to light an LED, then connect a multimeter and read the output themselves.",
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

/** Captions for the scroll-driven teardown, keyed to its 0..1 progress. */
const teardownCaptions = ["Assembled", "Coming apart", "Layer by layer", "Every part, laid out"];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const Editorial = () => {
  const [teardown, setTeardown] = useState(0);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  // Stable identity: FrameScrubber re-registers its scroll listener when this changes.
  const handleTeardown = useCallback((p: number) => {
    setTeardown((current) => (Math.abs(current - p) < 0.01 ? current : p));
  }, []);

  const captionIndex = Math.min(teardownCaptions.length - 1, Math.floor(teardown * teardownCaptions.length));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* ---------------------------------------------------------------- Hero */}
        <section id="hero" className="pt-28 md:pt-36 pb-16 md:pb-24 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-12 items-center gap-y-12 gap-x-10 xl:gap-x-16">
              {/* Copy — first in DOM so the h1 leads the document, second on mobile */}
              <div className="order-2 lg:order-1 lg:col-span-6 xl:col-span-6">
                <div className="inline-block mb-6 px-4 py-2 bg-secondary/20 rounded-full animate-fade-in">
                  <span className="text-sm font-semibold text-secondary-foreground">
                    After-School STEM · Enactus SFU
                  </span>
                </div>

                <h1 className="mb-6 animate-fade-in-up text-balance">
                  Learn STEM by <span className="text-gradient">Building It</span>
                </h1>

                <p
                  className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-xl animate-fade-in-up"
                  style={{ animationDelay: "0.15s" }}
                >
                  NextSpark is an after-school program for high school students. Students build a real hand-crank
                  generator from a kit, then use it to see how electricity is made.
                </p>

                <div
                  className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up"
                  style={{ animationDelay: "0.3s" }}
                >
                  <Button size="lg" onClick={() => scrollToSection("program")} className="w-full sm:w-auto">
                    See How It Works
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                      Follow @nextsparksfu
                    </a>
                  </Button>
                </div>

                <dl
                  className="mt-12 pt-8 border-t border-border grid grid-cols-3 max-w-xl animate-fade-in"
                  style={{ animationDelay: "0.45s" }}
                >
                  {facts.map((fact, index) => (
                    <div
                      key={fact.label}
                      className={`flex flex-col ${index === 0 ? "pr-3" : "border-l border-border pl-3 sm:pl-6 pr-3"}`}
                    >
                      <dt className="order-2 text-xs sm:text-sm text-muted-foreground leading-snug">{fact.label}</dt>
                      <dd className="order-1 text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-1">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Render — contained, nothing washing over it */}
              <div className="order-1 lg:order-2 lg:col-span-6">
                <div className="rounded-[1.5rem] border border-border gradient-subtle p-4 sm:p-8 animate-scale-in">
                  <Turntable
                    mode="drag"
                    className="mx-auto w-full max-w-sm lg:max-w-md rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  />
                </div>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Drag the generator to spin it, or focus it and use the left and right arrow keys.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- About */}
        <section id="about" className="py-20 md:py-32 gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-14 md:mb-20">
              <h2 className="mb-6 animate-fade-in text-balance">Our Vision</h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in-up">
                We envision a future where every student feels confident exploring STEM. We aim to inspire curiosity,
                creativity and problem-solving through hands-on learning. By empowering youth with practical skills, we
                help shape future innovators and leaders. Together we strive to create a lasting social impact in BC and
                beyond.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {cards.map(({ icon: Icon, title, text, tint }, index) => (
                <div
                  key={title}
                  className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-base motion-reduce:transition-none animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`w-14 h-14 rounded-xl ${
                      tint === "secondary" ? "bg-secondary/20" : "bg-primary/10"
                    } flex items-center justify-center mb-6`}
                  >
                    <Icon
                      aria-hidden="true"
                      className={`w-7 h-7 ${tint === "secondary" ? "text-secondary" : "text-primary"}`}
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            {/* The kit itself, on the light background the render was made for */}
            <figure className="mt-16 md:mt-24 flex flex-col items-center text-center">
              <img
                src={heroRender}
                srcSet={`${heroSm} 700w, ${heroRender} 1200w`}
                sizes="(min-width: 768px) 24rem, 70vw"
                width={1200}
                height={1499}
                loading="lazy"
                decoding="async"
                alt="The assembled NextSpark hand-crank generator: a 3D-printed frame with hand-wound copper coils, a magnet rotor and a crank handle."
                className="w-full max-w-[16rem] md:max-w-sm h-auto animate-fade-in"
              />
              <figcaption className="mt-8">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-accent rounded-full animate-glow">
                  <span className="text-base md:text-lg font-semibold text-secondary-foreground">
                    Build it · Test it · Understand it
                  </span>
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ------------------------------------------------------------- Program */}
        <section id="program" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-14 md:mb-20">
              <h2 className="mb-6 animate-fade-in text-balance">How NextSpark Works</h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in-up">
                A simple after-school session built around one kit. Students put it together themselves, then use it to
                find out how it works.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Teardown */}
              <figure className="lg:self-start m-0">
                <div className="rounded-[1.5rem] border border-border bg-muted/40 p-4 sm:p-8">
                  <ExplodedReveal onProgress={handleTeardown} className="mx-auto w-full max-w-sm lg:max-w-md" />
                </div>
                <figcaption className="mt-4 flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-0.5 flex-1 rounded-full bg-border overflow-hidden"
                  >
                    <span
                      className="block h-full bg-primary transition-[width] duration-200 motion-reduce:transition-none"
                      style={{ width: `${Math.round(teardown * 100)}%` }}
                    />
                  </span>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {teardownCaptions[captionIndex]}
                  </span>
                </figcaption>
              </figure>

              {/* Steps */}
              <ol role="list" className="space-y-6 list-none p-0 m-0">
                {steps.map(({ step, title, icon: Icon, description, outcomes, tint }, index) => (
                  <li
                    key={title}
                    className="bg-card rounded-2xl p-6 md:p-8 border border-border hover:shadow-lg transition-base motion-reduce:transition-none animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-lg ${
                          tint === "secondary" ? "bg-secondary/20" : "bg-primary/10"
                        } flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon
                          aria-hidden="true"
                          className={`w-6 h-6 ${tint === "secondary" ? "text-secondary" : "text-primary"}`}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-primary-dark mb-1">{step}</div>
                        <h3 className="text-lg md:text-xl font-bold">{title}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-5">{description}</p>
                    <ul role="list" className="space-y-2">
                      {outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-3">
                          <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className="text-sm">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------- What Students Learn */}
        <section aria-labelledby="learn-heading" className="pb-20 md:pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto bg-gradient-accent rounded-[1.5rem] p-8 md:p-14 text-center shadow-glow">
              <h2 id="learn-heading" className="text-2xl md:text-4xl font-bold mb-4 text-secondary-foreground">
                What Students Learn
              </h2>
              <p className="text-base md:text-lg mb-8 text-secondary-foreground max-w-2xl mx-auto">
                How to build a working generator with their own hands, and how electricity is actually made.
              </p>
              <ul role="list" className="flex flex-wrap justify-center gap-3 md:gap-4">
                {takeaways.map((item) => (
                  <li
                    key={item}
                    className="px-4 py-2 bg-background/20 rounded-lg backdrop-blur-sm font-semibold text-secondary-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- Contact */}
        <section id="contact" className="py-20 md:py-32 gradient-subtle border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="max-w-3xl mb-12 md:mb-16">
                <h2 className="mb-6 animate-fade-in text-balance">Get in Touch</h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in-up">
                  Follow along on Instagram, or tell us how NextSpark went for you.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                <div className="bg-card rounded-2xl p-8 border border-border flex flex-col animate-fade-in">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Instagram aria-hidden="true" className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Instagram</h3>
                  <p className="text-muted-foreground mb-6 flex-1 leading-relaxed">
                    Photos, updates and upcoming sessions. Send us a DM with any questions.
                  </p>
                  <Button asChild size="lg" variant="outline">
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                      @nextsparksfu
                    </a>
                  </Button>
                </div>

                <div
                  className="bg-card rounded-2xl p-8 border border-border flex flex-col animate-fade-in"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center mb-6">
                    <MessageSquare aria-hidden="true" className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Leave Feedback</h3>
                  <p className="text-muted-foreground mb-6 flex-1 leading-relaxed">
                    Took part in NextSpark? Tell us what worked and what we should improve. It takes about 2 minutes,
                    with no sign-in needed.
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

export default Editorial;
