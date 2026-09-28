import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/lib/meta";

const NotFound = () => {
  usePageMeta({ title: "Page not found | NextSpark", noindex: true });

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
