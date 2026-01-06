import { Hero } from "./components/hero";
import { SocialMediaLogos } from "./components/social-media-logos";
import { ValueProps } from "./components/value-props";
import { Integration } from "./components/integration";
import { SetupOptionsSection } from "~/components/setup-options-section";
import { Solutions } from "./components/solutions";
import { FAQ } from "./components/faq";
import { OpenSource } from "~/components/open-source-section";

export function Component() {
  return (
    <div className="relative flex flex-col gap-0">
      <div className="relative">
        <Hero />
      </div>

      <SocialMediaLogos />

      <ValueProps />

      <Integration />

      <SetupOptionsSection />

      <Solutions />

      <FAQ />

      <OpenSource />
    </div>
  );
}
