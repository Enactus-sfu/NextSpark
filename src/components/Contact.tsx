import { Instagram, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FEEDBACK_FORM_URL, INSTAGRAM_URL } from "@/lib/links";

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-6 animate-fade-in">Get in Touch</h2>
            <p className="text-xl text-muted-foreground animate-fade-in-up">
              Follow along on Instagram, or tell us how NextSpark went for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-8 border border-border flex flex-col animate-fade-in">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Instagram aria-hidden="true" className="w-7 h-7 text-primary" />
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

            <div className="bg-card rounded-2xl p-8 border border-border flex flex-col animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center mb-6">
                <MessageSquare aria-hidden="true" className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Leave Feedback</h3>
              <p className="text-muted-foreground mb-6 flex-1">
                Took part in NextSpark? Tell us what worked and what we should improve. It takes about 2 minutes, with no sign-in needed.
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
  );
};

export default Contact;
