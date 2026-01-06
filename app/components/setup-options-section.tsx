import {
  IconRocket,
  IconTag,
  IconCheckmark1,
  IconExclamationCircle,
} from "@central-icons/outlined";

import { Link } from "~/components/link";

const setupOptions = [
  {
    icon: IconRocket,
    title: "Quickstart Project",
    tagline: "Start posting in minutes",
    description:
      "Use Post for Me developer credentials across every social platform to start posting immediately without requiring certification on each platform.",
    benefits: [
      "Instant access to all platforms",
      "No platform approval process needed",
      "Start building immediately",
      "Unlimited account connections",
      "Full access to feeds & analytics",
    ],
    tradeoff: {
      title: "OAuth Display",
      description:
        'Users will see "Connect your account to Post for Me" during the OAuth flow',
    },
  },
  {
    icon: IconTag,
    title: "White Label Project",
    tagline: "Your brand, your credentials",
    description:
      "Get approved as a developer on every platform and connect your own credentials so users see your app name throughout the OAuth experience.",
    benefits: [
      "Full brand customization in OAuth",
      "Complete ownership of credentials",
      "Professional user experience",
      "Unlimited account connections",
      "Full access to feeds & analytics",
    ],
    tradeoff: {
      title: "Platform Approval",
      description:
        "Requires going through developer approval process on each platform",
    },
  },
];

export const SetupOptionsSection = () => {
  return (
    <div className="max-w-(--breakpoint-lg) w-full mx-auto px-4 py-16">
      <div className="text-center mb-12 text-balance">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] mb-4 text-foreground">
          Setup options for speed and customization
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the approach that fits your timeline and branding needs. Both
          options follow the same pricing tiers based on post volume.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {setupOptions.map(
          (
            { title, tagline, description, benefits, tradeoff, icon: Icon },
            index,
          ) => (
            <div
              key={index}
              className="bg-card text-card-foreground rounded-2xl p-8 border-2 border-border hover:border-primary/20 transition-colors"
            >
              <div className="mb-6">
                <Icon className="size-12 text-pop mb-4" />
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                  {tagline}
                </p>
              </div>

              <p className="text-base text-muted-foreground mb-6">
                {description}
              </p>

              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 text-foreground">
                  {`What's included:`}
                </h4>
                <ul className="space-y-2">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <IconCheckmark1 className="size-5 text-affirmative shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="flex items-start gap-2">
                  <IconExclamationCircle className="size-5 text-highlight shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-1">
                      {tradeoff.title}
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      {tradeoff.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          {`Both project types support unlimited scaling and follow the same `}
          <Link
            to="/pricing"
            className="text-primary underline underline-offset-2"
          >
            pricing tiers
          </Link>
          {` based on your monthly post volume.`}
        </p>
      </div>
    </div>
  );
};
