import { Button } from "@/components/ui/button";
import heroRender from "@/assets/renders/hero.webp";
import heroRenderSm from "@/assets/renders/hero-sm.webp";

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

          {/* Still, not interactive: the kit is taken apart and put back together
              further down the page, and a second thing to play with up here only
              competes with it. */}
          <div className="order-1 lg:order-2 relative animate-scale-in">
            <div aria-hidden="true" className="kit-pedestal" />
            <img
              src={heroRender}
              srcSet={`${heroRenderSm} 700w, ${heroRender} 1200w`}
              sizes="(max-width: 1024px) 78vw, 40vw"
              alt="3D render of the NextSpark hand-crank generator"
              width={1200}
              height={1499}
              className="relative mx-auto w-full max-w-[21rem] lg:max-w-[27rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
