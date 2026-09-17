import { Button } from "@/components/ui/button";
import heroImage from "@/assets/kit-parts.jpg";

const facts = [
  { value: "6", label: "Hand-Wound Coils" },
  { value: "12", label: "Magnets" },
  { value: "3:1", label: "Gear Ratio" },
];

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Parts for the NextSpark hand-crank generator kit laid out on a table"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-block mb-6 px-4 py-2 bg-secondary/20 rounded-full animate-fade-in">
            <span className="text-sm font-semibold text-secondary-foreground">After-School STEM · Enactus SFU</span>
          </div>

          <h1 className="mb-6 animate-fade-in-up">
            Learn STEM by <span className="text-gradient">Building It</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            NextSpark is an after-school program for high school students. Students build a real hand-crank generator from a kit, then use it to see how electricity is made.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("program")} className="text-lg px-8 py-6 h-auto">
              See How It Works
            </Button>
          </div>

          {/* Kit facts */}
          <dl className="mt-12 grid grid-cols-3 gap-8 max-w-2xl animate-fade-in" style={{ animationDelay: "0.6s" }}>
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col">
                <dt className="order-2 text-sm text-muted-foreground">{fact.label}</dt>
                <dd className="order-1 text-3xl md:text-4xl font-bold text-primary mb-1">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Hero;
