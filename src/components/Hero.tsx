import { Button } from "@/components/ui/button";
import Turntable from "@/components/render/Turntable";

const facts = [
  { value: "6", label: "Hand-Wound Coils" },
  { value: "12", label: "Magnets" },
  { value: "3:1", label: "Gear Ratio" },
];

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-32 md:pb-24 gradient-subtle overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <div className="order-2 lg:order-1 max-w-xl">
            <div className="inline-block mb-6 px-4 py-2 bg-secondary/20 rounded-full animate-fade-in">
              <span className="text-sm font-semibold text-secondary-foreground">After-School STEM · Enactus SFU</span>
            </div>

            <h1 className="mb-6 animate-fade-in-up">
              Learn STEM by <span className="text-gradient">Building It</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              NextSpark is an after-school program for high school students. Students build a real hand-crank generator from a kit, then use it to see how electricity is made.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Button size="lg" onClick={() => scrollToSection("program")} className="text-lg px-8 py-6 h-auto">
                See How It Works
              </Button>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-8 max-w-2xl animate-fade-in" style={{ animationDelay: "0.6s" }}>
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col">
                  <dt className="order-2 text-sm text-muted-foreground">{fact.label}</dt>
                  <dd className="order-1 text-3xl md:text-4xl font-bold text-primary mb-1">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Showcase: the kit lit against a dark stage, spinnable */}
          <div className="order-1 lg:order-2 animate-scale-in">
            <div className="showcase relative rounded-[1.75rem] overflow-hidden p-6 sm:p-8">
              <div aria-hidden="true" className="showcase-glow" />
              <Turntable mode="drag" className="relative mx-auto w-full max-w-[22rem] lg:max-w-[28rem]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
