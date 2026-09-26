import { Play } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface VideoPlaceholderProps {
  /** Short ordinal shown above the title, e.g. "Lesson 1". */
  label: string;
  title: string;
  /** What the video will cover once it is filmed. */
  description: string;
  icon: LucideIcon;
  tint?: "primary" | "secondary";
}

/**
 * Stands in for a lesson or assembly video until the real one exists. The frame
 * keeps a 16:9 box so dropping an embed in later does not move the page around.
 */
const VideoPlaceholder = ({ label, title, description, icon: Icon, tint = "primary" }: VideoPlaceholderProps) => (
  <article className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-base">
    <div className="aspect-video bg-muted flex flex-col items-center justify-center gap-3 border-b border-border">
      <span aria-hidden="true" className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
        <Play className="w-6 h-6 text-primary translate-x-0.5" />
      </span>
      <span className="text-sm font-semibold text-muted-foreground">Video coming soon</span>
    </div>

    <div className="p-6">
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`w-12 h-12 rounded-lg ${tint === "secondary" ? "bg-secondary/20" : "bg-primary/10"} flex items-center justify-center flex-shrink-0`}
        >
          <Icon aria-hidden="true" className={`w-6 h-6 ${tint === "secondary" ? "text-secondary" : "text-primary"}`} />
        </div>
        <div>
          <div className="text-sm font-semibold text-primary-dark mb-1">{label}</div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </article>
);

export default VideoPlaceholder;
