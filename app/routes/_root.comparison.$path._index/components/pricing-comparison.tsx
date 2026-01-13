import { IconArrowRight } from "@central-icons/outlined";
import { useLoaderData } from "react-router";

import { PostForMeBrandIcon } from "~/components/post-for-me-brand-icons";

import type { Route } from "../+types/route";

export const PricingComparison = () => {
  const { comparison } = useLoaderData<Route.ComponentProps["loaderData"]>();

  return (
    <div className="flex items-center justify-center py-14 bg-background">
      <div className="max-w-(--breakpoint-xl) w-full px-6">
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-center max-w-3xl text-balance mx-auto mb-4">
          Pricing Comparison
        </h2>
        <p className="text-lg text-muted-foreground text-center text-balance max-w-2xl mx-auto mb-10">
          Compare pricing models and what&apos;s included at each tier
        </p>

        <div className="max-w-(--breakpoint-lg) grid md:grid-cols-2 gap-8 mx-auto">
          {/* Post for Me Pricing */}
          <div className="flex flex-col border rounded-xl p-8 bg-card">
            <div className="flex flex-row gap-3 items-center mb-6">
              <div className="flex flex-col gap-2 items-center justify-center size-10 bg-muted rounded-full">
                <PostForMeBrandIcon className="size-6" />
              </div>
              <h3 className="text-2xl font-semibold">Post for Me</h3>
            </div>

            <div className="mb-4">
              <div className="text-3xl font-bold mb-1">
                {comparison.pricing.postForMe.startingPrice}
              </div>
              <div className="text-sm text-muted-foreground">
                {comparison.pricing.postForMe.model}
              </div>
            </div>

            <ul className="space-y-3">
              {comparison.pricing.postForMe.details.map((detail, index) => (
                <li
                  key={index}
                  className="text-foreground flex flex-row gap-2 items-baseline"
                >
                  <IconArrowRight className="text-pop size-5 pt-1.5" />
                  <span className="flex-1">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Competitor Pricing */}
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

            <div className="mb-4">
              <div className="text-3xl font-bold mb-1">
                {comparison.pricing.competitor.startingPrice}
              </div>
              <div className="text-sm text-muted-foreground">
                {comparison.pricing.competitor.model}
              </div>
            </div>

            <ul className="space-y-3">
              {comparison.pricing.competitor.details.map((detail, index) => (
                <li
                  key={index}
                  className="text-foreground flex flex-row gap-2 items-baseline"
                >
                  <IconArrowRight className="text-muted-foreground size-5 pt-1.5" />
                  <span className="flex-1">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
