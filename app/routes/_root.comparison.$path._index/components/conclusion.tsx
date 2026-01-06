import { useLoaderData } from "react-router";

import { Link } from "~/components/link";
import { Button } from "~/ui/button";
import { IconArrowUpRight } from "@central-icons/outlined";

import type { Route } from "../+types/route";

export const Conclusion = () => {
  const { comparison } = useLoaderData<Route.ComponentProps["loaderData"]>();

  return (
    <div className="flex items-center justify-center py-14 bg-background">
      <div className="max-w-(--breakpoint-xl) w-full px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            {comparison.conclusion.headline}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            {comparison.conclusion.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link to="https://app.postforme.dev">
                {comparison.conclusion.cta}
                <IconArrowUpRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
