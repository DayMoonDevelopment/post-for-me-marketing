import { Hero } from "./components/hero";
import { ValueProposition } from "./components/value-proposition";
import { CoreFeatures } from "./components/core-features";
import { DeveloperExperience } from "./components/developer-experience";
import { SetupOptionsSection as SetupOptions } from "~/components/setup-options-section";
import { Pricing } from "./components/pricing";
import { FAQ } from "./components/faq";

export function Component() {
  return (
    <div className="flex flex-col pt-16">
      <Hero />
      <ValueProposition />
      <CoreFeatures />
      <DeveloperExperience />
      <SetupOptions />
      <Pricing />
      <FAQ />
    </div>
  );
}
