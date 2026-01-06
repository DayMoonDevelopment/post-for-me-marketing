import type { ComparisonData } from "./comparisons";

export const hootsuite: ComparisonData = {
  id: "hootsuite",
  competitor: {
    name: "Hootsuite",
    description: "Enterprise social media management platform",
  },
  meta: {
    title: "Post for Me vs Hootsuite: API Developer Comparison | Post for Me",
    description:
      "Compare Post for Me and Hootsuite for developers. API capabilities, pricing models, developer experience, and integration options.",
  },
  hero: {
    headline: "Post for Me vs Hootsuite",
    subheadline:
      "Developer-first API vs enterprise social media platform",
  },
  overview: {
    postForMe:
      "Post for Me provides a modern, developer-first API for social media posting across 9 platforms. Built for integration, with comprehensive SDKs, webhooks, and straightforward usage-based pricing.",
    competitor:
      "Hootsuite is an enterprise social media management platform with extensive features for teams. Their API exists to support their platform but isn't designed as a primary integration product.",
  },
  features: [
    {
      name: "Developer SDKs",
      postForMe: {
        available: true,
        description:
          "Native SDKs for TypeScript, Python, Go, Ruby, and Kotlin",
      },
      competitor: {
        available: false,
        description: "REST API only with limited documentation",
      },
    },
    {
      name: "Webhook support",
      postForMe: {
        available: true,
        description:
          "Real-time webhooks for post events, analytics, and status updates",
      },
      competitor: {
        available: false,
        description: "No webhook support",
      },
    },
    {
      name: "Unified API design",
      postForMe: {
        available: true,
        description:
          "Consistent interface across all 9 supported platforms",
      },
      competitor: {
        available: false,
        description: "API mirrors complex platform structure",
      },
    },
    {
      name: "Media processing",
      postForMe: {
        available: true,
        description:
          "Automatic format conversion and optimization per platform",
      },
      competitor: {
        available: true,
        description: "Media upload supported via API",
      },
    },
    {
      name: "Transparent pricing",
      postForMe: {
        available: true,
        description: "Clear usage-based pricing published online",
      },
      competitor: {
        available: false,
        description: "Enterprise pricing requires sales contact",
      },
    },
    {
      name: "Team management",
      postForMe: {
        available: true,
        description: "Unlimited team members on all plans",
      },
      competitor: {
        available: true,
        description: "Team features with per-seat pricing",
      },
    },
  ],
  pricing: {
    postForMe: {
      startingPrice: "$10/mo",
      model: "Usage-based",
      details: [
        "Starter: $10/mo for 1,000 posts",
        "Growth: $50/mo for 5,000 posts",
        "Scale: $1,000/mo for 200,000 posts",
        "No per-seat fees",
        "No platform limits",
        "Transparent pricing online",
      ],
    },
    competitor: {
      startingPrice: "$99/mo",
      model: "Per-seat + platform tiers",
      details: [
        "Professional: $99/mo for 1 user",
        "Team: $249/mo for 3 users",
        "Enterprise: Custom pricing",
        "Additional users cost extra",
        "Limited social profiles on lower tiers",
        "Contact sales for API access details",
      ],
    },
  },
  idealFor: {
    postForMe: [
      "Developers building social features into products",
      "Startups wanting predictable API costs",
      "Teams needing modern SDK support",
      "Products requiring webhook integrations",
      "Projects with variable posting volumes",
    ],
    competitor: [
      "Large enterprises with dedicated social teams",
      "Organizations needing approval workflows",
      "Teams wanting comprehensive UI features",
      "Companies with complex team structures",
    ],
  },
  conclusion: {
    headline: "Different tools for different needs",
    description:
      "Post for Me is built for developers who need a clean API to integrate social posting into their products. Hootsuite is designed for enterprise social media teams who want a feature-rich management platform with collaboration tools.",
    cta: "Try Post for Me for developers",
  },
};
