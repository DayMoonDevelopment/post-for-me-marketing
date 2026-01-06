import { Header } from "./components/header";
import { FeatureCards } from "./components/feature-cards";
import { CodeExamplesSection } from "./components/code-examples-section";
import { SetupOptionsSection } from "~/components/setup-options-section";
import { OpenSource } from "~/components/open-source-section";

export function Component() {
  return (
    <div className="flex flex-col pt-16">
      <Header />
      <FeatureCards />
      <CodeExamplesSection />
      <SetupOptionsSection />
      <OpenSource />
    </div>
  );
}
