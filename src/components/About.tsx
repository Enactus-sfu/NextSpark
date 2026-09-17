import { Target, Wrench, Users } from "lucide-react";

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

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="mb-6 animate-fade-in">Our Vision</h2>
          <p className="text-xl text-muted-foreground animate-fade-in-up">
            We envision a future where every student feels confident exploring STEM. We aim to inspire curiosity, creativity and problem-solving through hands-on learning. By empowering youth with practical skills, we help shape future innovators and leaders. Together we strive to create a lasting social impact in BC and beyond.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {cards.map(({ icon: Icon, title, text, tint }, index) => (
            <div
              key={title}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-base animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl ${tint === "secondary" ? "bg-secondary/20" : "bg-primary/10"} flex items-center justify-center mb-6`}>
                <Icon aria-hidden="true" className={`w-7 h-7 ${tint === "secondary" ? "text-secondary" : "text-primary"}`} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{title}</h3>
              <p className="text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-accent rounded-full mb-6 animate-glow">
            <span className="text-lg font-semibold text-secondary-foreground">Build it · Test it · Understand it</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
