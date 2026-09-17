import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { FEEDBACK_FORM_URL } from "@/lib/links";

const sections = [
  { id: "about", label: "About" },
  { id: "program", label: "Program" },
  { id: "contact", label: "Contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button type="button" aria-label="NextSpark home" className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <img src={logo} alt="" className="h-8 md:h-10" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {sections.map(({ id, label }) => (
              <button key={id} onClick={() => scrollToSection(id)} className="text-foreground hover:text-primary transition-base">
                {label}
              </button>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <Button asChild size="lg">
              <a href={FEEDBACK_FORM_URL} target="_blank" rel="noopener noreferrer">
                Leave Feedback
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {sections.map(({ id, label }) => (
                <button key={id} onClick={() => scrollToSection(id)} className="text-left py-2 text-foreground hover:text-primary transition-base">
                  {label}
                </button>
              ))}
              <Button asChild className="w-full" size="lg">
                <a href={FEEDBACK_FORM_URL} target="_blank" rel="noopener noreferrer">
                  Leave Feedback
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
