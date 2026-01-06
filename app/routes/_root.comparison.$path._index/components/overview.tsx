import { useLoaderData } from "react-router";

import { PostForMeBrandIcon } from "~/components/post-for-me-brand-icons";

import type { Route } from "../+types/route";

export const Overview = () => {
  const { comparison } = useLoaderData<Route.ComponentProps["loaderData"]>();

  return (
    <div className="flex items-center justify-center py-14 bg-background">
      <div className="max-w-(--breakpoint-xl) w-full px-6">
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-center max-w-3xl text-balance mx-auto mb-12">
          Platform Overview
        </h2>
        <div className="max-w-(--breakpoint-lg) grid md:grid-cols-2 gap-8 mx-auto">
          {/* Post for Me */}
          <div className="flex flex-col border rounded-xl p-8 bg-card">
            <div className="flex flex-row gap-3 items-center mb-6">
              <div className="flex flex-col gap-2 items-center justify-center size-10 bg-muted rounded-full">
                <PostForMeBrandIcon className="size-6" />
              </div>
              <h3 className="text-2xl font-semibold">Post for Me</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {comparison.overview.postForMe}
            </p>
          </div>

          {/* Competitor */}
          <div className="flex flex-col border rounded-xl p-8 bg-card">
            <div className="flex flex-row gap-3 items-center mb-6">
              <div className="flex flex-col gap-2 items-center justify-center size-10 bg-muted rounded-full text-lg">
                <span className="text-sm font-bold">
                  {comparison.competitor.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">
                {comparison.competitor.name}
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {comparison.overview.competitor}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
