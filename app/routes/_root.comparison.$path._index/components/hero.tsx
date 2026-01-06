import { useLoaderData } from "react-router";

import { Link } from "~/components/link";
import { Button } from "~/ui/button";
import { IconArrowUpRight } from "@central-icons/outlined";

import type { Route } from "../+types/route";

export const Hero = () => {
  const { comparison } = useLoaderData<Route.ComponentProps["loaderData"]>();

  return (
    <div className="bg-background">
      <div className="max-w-(--breakpoint-xl) w-full flex flex-col items-center py-16 px-4 mx-auto">
        <div className="flex flex-col gap-6 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em]">
            {comparison.hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            {comparison.hero.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link to="https://app.postforme.dev">
                Try Post for Me
                <IconArrowUpRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="https://api.postforme.dev/docs">View API Docs</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
