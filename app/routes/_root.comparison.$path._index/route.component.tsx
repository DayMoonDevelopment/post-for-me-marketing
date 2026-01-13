import { Conclusion } from "./components/conclusion";
import { FeatureComparison } from "./components/feature-comparison";
import { Hero } from "./components/hero";
import { IdealFor } from "./components/ideal-for";
import { Overview } from "./components/overview";
import { PricingComparison } from "./components/pricing-comparison";

export function Component() {
  return (
    <div className="flex flex-col pt-16">
      <Hero />
      <Overview />
      <FeatureComparison />
      <PricingComparison />
      <IdealFor />
      <Conclusion />
    </div>
  );
}
