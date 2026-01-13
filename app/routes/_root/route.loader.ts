import { NavigationManager } from "~/lib/.server/navigation-manager";

import type { Route } from "./+types/route";

export async function loader(_args: Route.LoaderArgs) {
  const navigationManager = new NavigationManager();
  return await navigationManager.getLoaderData();
}
