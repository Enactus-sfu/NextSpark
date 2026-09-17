import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  useEffect(() => {
    const title = document.title;
    document.title = "Page not found | NextSpark";

    // Every unknown path is served the same index.html, so keep 404s out of search results.
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);

    return () => {
      document.title = title;
      robots.remove();
    };
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="mb-4 text-primary">404</h1>
        <p className="mb-8 text-xl text-muted-foreground">This page doesn't exist, but the rest of NextSpark does.</p>
        <Button asChild size="lg">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
};

export default NotFound;
