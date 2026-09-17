import { Instagram } from "lucide-react";
import logo from "@/assets/logo.png";
import { FEEDBACK_FORM_URL, INSTAGRAM_URL } from "@/lib/links";

const sections = [
  { id: "about", label: "About" },
  { id: "program", label: "Program" },
  { id: "contact", label: "Contact" },
];

const Footer = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="NextSpark" className="h-10 brightness-0 invert" />
            </div>
            <p className="text-background/80 mb-6 max-w-md">
              An after-school STEM program from Enactus SFU, where high school students build real hardware and see the science for themselves.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-base"
              aria-label="NextSpark on Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Quick Links */}
          <nav aria-labelledby="footer-links">
            <h2 id="footer-links" className="font-bold text-lg mb-4">Quick Links</h2>
            <ul className="space-y-2">
              {sections.map(({ id, label }) => (
                <li key={id}>
                  <button onClick={() => scrollToSection(id)} className="text-background/80 hover:text-background transition-base">
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <a href={FEEDBACK_FORM_URL} target="_blank" rel="noopener noreferrer" className="text-background/80 hover:text-background transition-base">
                  Leave Feedback
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row gap-2 justify-between text-center md:text-left text-background/60">
          <p>© {new Date().getFullYear()} NextSpark, an Enactus SFU project.</p>
          <p>Website by Michael Gudz</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
