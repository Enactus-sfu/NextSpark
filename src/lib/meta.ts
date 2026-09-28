import { useEffect } from "react";

type PageMeta = {
  title: string;
  /** Also written to the og: and twitter: descriptions, so a share matches the page. */
  description?: string;
  /** Keep the route out of search: the 404, and the landing page drafts under /v. */
  noindex?: boolean;
};

/**
 * Sets the title, description and share tags while a route is mounted, then puts
 * back what index.html shipped with. The whole site is served from that one file,
 * so without this every route shares the landing page's tags.
 */
export function usePageMeta({ title, description, noindex = false }: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const undo: Array<() => void> = [];
    const set = (selector: string, content: string) => {
      const tag = document.querySelector<HTMLMetaElement>(selector);
      if (!tag) return;
      const previous = tag.content;
      tag.content = content;
      undo.push(() => {
        tag.content = previous;
      });
    };

    set('meta[property="og:title"]', title);
    set('meta[name="twitter:title"]', title);
    if (description) {
      set('meta[name="description"]', description);
      set('meta[property="og:description"]', description);
      set('meta[name="twitter:description"]', description);
    }

    // vercel.json rewrites every unknown path to index.html, so these routes
    // answer 200 and are indexable unless they say otherwise.
    let robots: HTMLMetaElement | null = null;
    if (noindex) {
      robots = document.createElement("meta");
      robots.name = "robots";
      robots.content = "noindex";
      document.head.appendChild(robots);
    }

    return () => {
      document.title = previousTitle;
      for (const restore of undo) restore();
      robots?.remove();
    };
  }, [title, description, noindex]);
}
