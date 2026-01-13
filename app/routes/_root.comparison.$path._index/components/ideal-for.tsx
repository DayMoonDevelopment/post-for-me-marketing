import { IconArrowRight } from "@central-icons/outlined";
import { useLoaderData } from "react-router";

import { PostForMeBrandIcon } from "~/components/post-for-me-brand-icons";

import type { Route } from "../+types/route";

export const IdealFor = () => {
  const { comparison } = useLoaderData<Route.ComponentProps["loaderData"]>();

  return (
    <div className="flex items-center justify-center py-14 bg-muted">
      <div className="max-w-(--breakpoint-xl) w-full px-6">
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-center max-w-3xl text-balance mx-auto mb-4">
          Which is right for you?
        </h2>
        <p className="text-lg text-muted-foreground text-center text-balance max-w-2xl mx-auto mb-10">
          Choose the platform that best fits your use case
        </p>

        <div className="max-w-(--breakpoint-lg) grid md:grid-cols-2 gap-8 mx-auto">
          {/* Post for Me ideal for */}
          <div className="flex flex-col border rounded-xl p-8 bg-card">
            <div className="flex flex-row gap-3 items-center mb-6">
              <div className="flex flex-col gap-2 items-center justify-center size-10 bg-muted rounded-full">
                <PostForMeBrandIcon className="size-6" />
              </div>
              <h3 className="text-2xl font-semibold">Post for Me is ideal for</h3>
            </div>

            <ul className="space-y-3">
              {comparison.idealFor.postForMe.map((item, index) => (
                <li
                  key={index}
                  className="text-foreground flex flex-row gap-2 items-baseline"
                >
                  <IconArrowRight className="text-pop size-5 pt-1.5" />
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Competitor ideal for */}
          <div className="flex flex-col border rounded-xl p-8 bg-card">
            <div className="flex flex-row gap-3 items-center mb-6">
              <div className="flex flex-col gap-2 items-center justify-center size-10 bg-muted rounded-full text-lg">
                <span className="text-sm font-bold">
                  {comparison.competitor.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">
                {comparison.competitor.name} is ideal for
              </h3>
            </div>

            <ul className="space-y-3">
              {comparison.idealFor.competitor.map((item, index) => (
                <li
                  key={index}
                  className="text-foreground flex flex-row gap-2 items-baseline"
                >
                  <IconArrowRight className="text-muted-foreground size-5 pt-1.5" />
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
