import { Hero } from "./components/hero";
import { Overview } from "./components/overview";
import { FeatureComparison } from "./components/feature-comparison";
import { PricingComparison } from "./components/pricing-comparison";
import { IdealFor } from "./components/ideal-for";
import { Conclusion } from "./components/conclusion";

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
