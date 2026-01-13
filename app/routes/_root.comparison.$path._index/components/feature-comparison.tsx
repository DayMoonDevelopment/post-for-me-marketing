import { IconCircleCheck, IconCircleX } from "@central-icons/outlined";
import { useLoaderData } from "react-router";

import type { Route } from "../+types/route";

export const FeatureComparison = () => {
  const { comparison } = useLoaderData<Route.ComponentProps["loaderData"]>();

  return (
    <div className="flex items-center justify-center py-14 bg-muted">
      <div className="max-w-(--breakpoint-xl) w-full px-6">
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-center max-w-3xl text-balance mx-auto mb-4">
          Feature Comparison
        </h2>
        <p className="text-lg text-muted-foreground text-center text-balance max-w-2xl mx-auto mb-10">
          See how Post for Me and {comparison.competitor.name} stack up across
          key features
        </p>

        <div className="max-w-(--breakpoint-lg) mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full border rounded-xl overflow-hidden bg-card">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold">Post for Me</th>
                  <th className="text-center p-4 font-semibold">
                    {comparison.competitor.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.features.map((feature, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-muted/20 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-medium">{feature.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col items-center gap-2">
                        {feature.postForMe.available ? (
                          <>
                            <IconCircleCheck className="size-6 text-green-600" />
                            <p className="text-sm text-muted-foreground text-center">
                              {feature.postForMe.description}
                            </p>
                          </>
                        ) : (
                          <>
                            <IconCircleX className="size-6 text-red-600" />
                            <p className="text-sm text-muted-foreground text-center">
                              {feature.postForMe.description}
                            </p>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col items-center gap-2">
                        {feature.competitor.available ? (
                          <>
                            <IconCircleCheck className="size-6 text-green-600" />
                            <p className="text-sm text-muted-foreground text-center">
                              {feature.competitor.description}
                            </p>
                          </>
                        ) : (
                          <>
                            <IconCircleX className="size-6 text-red-600" />
                            <p className="text-sm text-muted-foreground text-center">
                              {feature.competitor.description}
                            </p>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
