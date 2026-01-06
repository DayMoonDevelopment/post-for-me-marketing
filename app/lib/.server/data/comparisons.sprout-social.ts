import type { ComparisonData } from "./comparisons";

export const sproutSocial: ComparisonData = {
  id: "sprout-social",
  competitor: {
    name: "Sprout Social",
    description: "Social media management and analytics platform",
  },
  meta: {
    title:
      "Post for Me vs Sprout Social: Developer API Comparison | Post for Me",
    description:
      "Compare Post for Me and Sprout Social for building social media integrations. API features, developer tools, pricing, and best use cases.",
  },
  hero: {
    headline: "Post for Me vs Sprout Social",
    subheadline:
      "API-first development platform vs full-featured social media suite",
  },
  overview: {
    postForMe:
      "Post for Me is purpose-built for developers integrating social media capabilities into their applications. With multi-language SDKs, comprehensive webhooks, and usage-based pricing, it's designed to be embedded in your product.",
    competitor:
      "Sprout Social is a comprehensive social media management platform with rich analytics and team collaboration features. While they offer API access, it's designed to extend their platform rather than serve as a standalone integration tool.",
  },
  features: [
    {
      name: "Multi-language SDKs",
      postForMe: {
        available: true,
        description:
          "Official SDKs for TypeScript, Python, Go, Ruby, and Kotlin with full type support",
      },
      competitor: {
        available: false,
        description: "REST API with limited SDK support",
      },
    },
    {
      name: "Real-time webhooks",
      postForMe: {
        available: true,
        description:
          "Event-driven architecture with webhooks for all post and analytics events",
      },
      competitor: {
        available: false,
        description: "Polling-based updates only",
      },
    },
    {
      name: "Platform coverage",
      postForMe: {
        available: true,
        description:
          "9 platforms: TikTok, Instagram, Facebook, X, LinkedIn, Pinterest, Bluesky, Threads, YouTube",
      },
      competitor: {
        available: true,
        description: "Major social platforms supported",
      },
    },
    {
      name: "Media processing",
      postForMe: {
        available: true,
        description:
          "Intelligent media optimization and format conversion per platform",
      },
      competitor: {
        available: true,
        description: "Media library and asset management",
      },
    },
    {
      name: "Self-service pricing",
      postForMe: {
        available: true,
        description: "Usage-based pricing starting at $10/mo, sign up online",
      },
      competitor: {
        available: false,
        description: "Enterprise pricing, requires sales contact",
      },
    },
    {
      name: "Analytics API",
      postForMe: {
        available: true,
        description: "Programmatic access to engagement and performance metrics",
      },
      competitor: {
        available: true,
        description: "Comprehensive analytics via API",
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
        "Scale: $500/mo for 100,000 posts",
        "All features included",
        "Unlimited team members",
        "No hidden fees",
      ],
    },
    competitor: {
      startingPrice: "$249/mo",
      model: "Per-seat pricing",
      details: [
        "Standard: $249/mo per seat",
        "Professional: $399/mo per seat",
        "Advanced: $499/mo per seat",
        "Enterprise: Custom pricing",
        "Minimum commitment required",
        "API access in higher tiers",
      ],
    },
  },
  idealFor: {
    postForMe: [
      "SaaS products adding social media features",
      "Developers building custom integrations",
      "Startups with variable usage patterns",
      "Teams needing webhook-driven automation",
      "Projects requiring SDK support",
    ],
    competitor: [
      "Enterprise marketing teams",
      "Agencies managing multiple client accounts",
      "Organizations needing deep analytics",
      "Teams wanting comprehensive social listening",
      "Companies with large social media budgets",
    ],
  },
  conclusion: {
    headline: "Choose based on your primary use case",
    description:
      "Post for Me excels for developers building social media capabilities into products with clean APIs, modern SDKs, and predictable costs. Sprout Social is ideal for enterprise marketing teams who need a full-featured platform with advanced analytics and team collaboration.",
    cta: "Get started with Post for Me",
  },
};
