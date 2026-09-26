import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Factory,
  Gauge,
  Magnet,
  Mic,
  PlugZap,
  Ruler,
  Wrench,
  Zap,
} from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VideoPlaceholder from "@/components/learning/VideoPlaceholder";
import { Button } from "@/components/ui/button";

const PAGE_TITLE = "Learning | Lessons and Assembly Videos | NextSpark";
const PAGE_DESCRIPTION =
  "Lesson and assembly videos for the NextSpark hand-crank generator, how the build lines up with the BC Physics 12 curriculum, and where electromagnetic induction shows up at full scale.";

const lessonVideos = [
  {
    label: "Lesson 1",
    title: "What Makes Electricity",
    icon: Magnet,
    tint: "primary" as const,
    description:
      "Magnetic fields, magnetic flux and why a magnet only produces current while it is moving. Sets up Faraday's law and Lenz's law before the kit comes out of the box.",
  },
  {
    label: "Lesson 2",
    title: "Inside the Generator",
    icon: Wrench,
    tint: "secondary" as const,
    description:
      "A part-by-part walkthrough of the kit: what the six coils do, why the rotor carries twelve magnets, and what the 3:1 gear ratio changes about the crank.",
  },
  {
    label: "Lesson 3",
    title: "Reading Your Results",
    icon: Gauge,
    tint: "primary" as const,
    description:
      "How to take a multimeter reading from the generator, and how to compare runs at 12, 8 and 6 magnets and at different crank speeds without guessing.",
  },
];

const assemblyVideos = [
  {
    label: "Assembly 1",
    title: "What's in the Kit",
    icon: Wrench,
    tint: "secondary" as const,
    description:
      "Every part laid out and named, plus the tools each group needs on the table before they start.",
  },
  {
    label: "Assembly 2",
    title: "Winding the Coils",
    icon: Zap,
    tint: "primary" as const,
    description:
      "Winding the six copper coils by hand, keeping the turns tight and even, and why the winding direction matters once they are wired together.",
  },
  {
    label: "Assembly 3",
    title: "Rotor, Stator and Magnets",
    icon: Magnet,
    tint: "secondary" as const,
    description:
      "Loading the twelve magnets into the rotor and seating the coils so they face it, with the gap kept small enough to get a usable reading.",
  },
  {
    label: "Assembly 4",
    title: "Gears and First Light",
    icon: PlugZap,
    tint: "primary" as const,
    description:
      "Fitting the gear train, closing up the housing and turning the crank until the LED lights for the first time.",
  },
];

const curriculumLinks = [
  {
    topic: "Magnetic field",
    expectation:
      "Vector field, induced by moving charges, interacts with polarity (north/south), attractive or repulsive; permanent magnets, straight wires and solenoids.",
    inTheKit:
      "The kit is these two things facing each other: permanent magnets in the rotor, and six hand-wound coils that are solenoids. Students can map the field before they ever turn the crank.",
  },
  {
    topic: "Magnetic force and the right-hand rules",
    expectation:
      "Force acting on a moving charge or current-carrying wire within a magnetic field; right-hand rules.",
    inTheKit:
      "Students predict which way current should run in a coil using a right-hand rule, then check the prediction against the sign on the multimeter.",
  },
  {
    topic: "Electromagnetic induction",
    expectation:
      "Faraday's law, Lenz's law, current induced by a change in magnetic flux; moving a bar, wire, coil or charge within a changing magnetic field (strength, polarity or area).",
    inTheKit:
      "Turning the crank changes the flux through each coil. Changing the number of magnets changes field strength and changing crank speed changes how fast the flux changes, so the two experiments in the session are Faraday's law with one variable moved at a time.",
  },
  {
    topic: "Applications of electromagnetic induction",
    expectation: "Back electromotive force (EMF), DC motors, generators and transformers.",
    inTheKit:
      "The kit is a generator, and back EMF is something students feel rather than read: the crank gets noticeably harder to turn the moment the LED is connected, because the induced current opposes the change that made it.",
  },
  {
    topic: "Electric potential difference",
    expectation: "Electric potential energy, electric potential and electric potential difference.",
    inTheKit:
      "The multimeter reading is a potential difference. Recording it across several runs gives students their own data set instead of a textbook value.",
  },
  {
    topic: "Rotational equilibrium and circular motion",
    expectation:
      "Static equilibrium: sum of all torques equals zero; uniform circular motion, centripetal force and acceleration.",
    inTheKit:
      "The gear train is a torque argument. A 3:1 ratio spins the rotor faster than the crank but asks for more force at the handle, and the magnets riding the rotor are a visible case of circular motion.",
  },
  {
    topic: "First Peoples knowledge and applications of forces",
    expectation:
      "First Peoples knowledge and applications of forces in traditional technologies, for example the salmon wheel, canoe paddle design and deadfall traps.",
    inTheKit:
      "The salmon wheel turns the steady motion of a river into useful work through a rotating machine, the same conversion the crank makes by hand and the same one a run-of-river station makes at scale. It is a natural discussion to open alongside the build.",
  },
];

const applications = [
  {
    icon: Factory,
    title: "Every Power Station",
    tint: "primary" as const,
    text: "Hydro dams, wind turbines and gas or steam plants all do exactly what the kit does: move magnets past coils. BC Hydro's dams swap the crank for falling water and one student's arm for a turbine, and the output goes from milliwatts to megawatts. Nothing about the physics changes.",
  },
  {
    icon: PlugZap,
    title: "Transformers and the Grid",
    tint: "secondary" as const,
    text: "A transformer has no moving parts at all. A changing current in one coil changes the flux through a second coil, which induces a voltage in it. That is how power is stepped up for long transmission lines and back down for a house.",
  },
  {
    icon: Gauge,
    title: "Regenerative Braking",
    tint: "primary" as const,
    text: "Electric cars and electric trains slow down by running their motors as generators, sending current back to the battery. The drag students feel in the crank when the LED lights is the same effect doing the braking.",
  },
  {
    icon: Zap,
    title: "Wireless Charging and Induction Cooktops",
    tint: "secondary" as const,
    text: "A coil in the charging pad or under the cooktop carries a changing current, which induces current in the coil in the phone or in the base of the pan. Energy crosses the gap with nothing plugged in, because a changing magnetic field is enough.",
  },
  {
    icon: Mic,
    title: "Microphones and Guitar Pickups",
    tint: "primary" as const,
    text: "A dynamic microphone is a tiny generator: sound moves a coil near a magnet and the induced current becomes the signal. A guitar pickup works the other way around, with the vibrating string disturbing the field. Both are Faraday's law at the scale of a whisper.",
  },
  {
    icon: Ruler,
    title: "The Only Difference Is Scale",
    tint: "secondary" as const,
    text: "Between a hand-crank kit and a generating station there is no new law to learn, only bigger magnets, more turns of wire and a stronger thing doing the turning. That is the point of building one small enough to hold.",
  },
];

/** Sets the page title and meta description while this route is mounted. */
const useDocumentMeta = (title: string, description: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    const tag = document.querySelector('meta[name="description"]');
    const previousDescription = tag?.getAttribute("content") ?? null;

    document.title = title;
    tag?.setAttribute("content", description);

    return () => {
      document.title = previousTitle;
      if (previousDescription !== null) tag?.setAttribute("content", previousDescription);
    };
  }, [title, description]);
};

const Learning = () => {
  useDocumentMeta(PAGE_TITLE, PAGE_DESCRIPTION);

  // React Router keeps the previous scroll position across a route change, and
  // most links into this page come from a footer far down the landing page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Intro */}
        <section className="pt-28 pb-16 md:pt-32 md:pb-24 gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="inline-block mb-6 px-4 py-2 bg-secondary/20 rounded-full animate-fade-in">
                <span className="text-sm font-semibold text-secondary-foreground">Learning · Hand-Crank Generator</span>
              </div>

              <h1 className="mb-6 animate-fade-in-up">Lessons &amp; Assembly Videos</h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                Everything a class needs to run the NextSpark kit on its own: what to teach before the build, how to put the generator together, and where the same physics turns up outside the classroom.
              </p>

              <p className="text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                The videos are still being filmed. The placeholders below show what each one will cover, and they will be replaced as the recordings are finished. Lessons for future kits will be added to this page too.
              </p>
            </div>
          </div>
        </section>

        {/* Lesson videos */}
        <section id="lessons" className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span aria-hidden="true" className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-primary" />
                </span>
                <h2>Lesson Videos</h2>
              </div>
              <p className="text-xl text-muted-foreground">
                The science behind the kit, in the order a session covers it. Each one is short enough to play in class before the students start building.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lessonVideos.map((video) => (
                <VideoPlaceholder key={video.title} {...video} />
              ))}
            </div>
          </div>
        </section>

        {/* Assembly videos */}
        <section id="assembly" className="py-20 md:py-28 gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span aria-hidden="true" className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-6 h-6 text-secondary" />
                </span>
                <h2>Assembly Videos</h2>
              </div>
              <p className="text-xl text-muted-foreground">
                The build itself, step by step, so a group that falls behind can catch up without stopping the room.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {assemblyVideos.map((video) => (
                <VideoPlaceholder key={video.title} {...video} />
              ))}
            </div>
          </div>
        </section>

        {/* BC curriculum */}
        <section id="curriculum" className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-12">
              <h2 className="mb-6">Where It Fits in the BC Curriculum</h2>
              <p className="text-xl text-muted-foreground mb-4">
                The hand-crank generator is not an add-on to the BC Physics 12 course. It is a physical version of the content students are already expected to know, and most of a unit can be taught from the kit on the table.
              </p>
              <p className="text-muted-foreground">
                Each row below quotes what the curriculum expects, then says where that shows up in the build.
              </p>
            </div>

            <ul role="list" className="max-w-4xl space-y-6">
              {curriculumLinks.map(({ topic, expectation, inTheKit }, index) => (
                <li
                  key={topic}
                  className="bg-card rounded-2xl p-6 md:p-8 border border-border hover:shadow-lg transition-base animate-fade-in"
                  style={{ animationDelay: `${Math.min(index, 4) * 0.05}s` }}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-3">{topic}</h3>
                  <p className="text-muted-foreground border-l-2 border-primary/40 pl-4 mb-4 italic">
                    {expectation}
                  </p>
                  <p>
                    <span className="font-semibold text-primary-dark">In the kit: </span>
                    <span className="text-muted-foreground">{inTheKit}</span>
                  </p>
                </li>
              ))}
            </ul>

            <p className="max-w-4xl mt-8 text-sm text-muted-foreground">
              Quoted expectations are from the BC science curriculum's senior physics content on forces, fields and electromagnetic induction.
            </p>
          </div>
        </section>

        {/* Real-world applications */}
        <section id="applications" className="py-20 md:py-28 gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-12">
              <h2 className="mb-6">The Same Physics, Much Larger</h2>
              <p className="text-xl text-muted-foreground">
                Faraday's law is not a classroom-sized idea. Almost all of the electricity in use anywhere was made by moving a magnet past a coil, and the kit is that process small enough to hold.
              </p>
            </div>

            <ul role="list" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {applications.map(({ icon: Icon, title, text, tint }, index) => (
                <li
                  key={title}
                  className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-base animate-scale-in"
                  style={{ animationDelay: `${Math.min(index, 4) * 0.1}s` }}
                >
                  <div
                    className={`w-14 h-14 rounded-xl ${tint === "secondary" ? "bg-secondary/20" : "bg-primary/10"} flex items-center justify-center mb-6`}
                  >
                    <Icon aria-hidden="true" className={`w-7 h-7 ${tint === "secondary" ? "text-secondary" : "text-primary"}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{title}</h3>
                  <p className="text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Close */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-accent rounded-2xl p-8 md:p-12 text-center shadow-glow">
              <h2 className="text-3xl font-bold mb-4 text-secondary-foreground">Want the Kit in Your Classroom?</h2>
              <p className="text-lg mb-8 text-secondary-foreground">
                See how a NextSpark session runs from start to finish, then get in touch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="outline">
                  <Link to="/#program">How NextSpark Works</Link>
                </Button>
                <Button asChild size="lg">
                  <Link to="/#contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Learning;
