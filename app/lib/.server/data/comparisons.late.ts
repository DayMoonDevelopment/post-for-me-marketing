import type { CompetitorComparisonData } from "./comparisons";

export const late: CompetitorComparisonData = {
  competitor: {
    name: "Late",
    slug: "late",
    productType: "API Infrastructure",
    pricingModel: "Tiered",
    websiteUrl: "https://getlate.dev",
  },
  pricing: {
    rows: [
      {
        label: "Getting Started",
        pfm: "$10/mo",
        competitor: "Free for 20 posts/mo, $19/mo for 120 posts/mo",
      },
      {
        label: "Pricing Model",
        pfm: "Fixed pricing based on post volume",
        competitor: "Tiered with capped profiles",
      },
      {
        label: "Social Media Accounts",
        pfm: "Unlimited",
        competitor: "Capped (10 Social Sets on Build tier)",
      },
      {
        label: "Analytics",
        pfm: "Included",
        competitor: "+$10/mo",
      },
      {
        label: "Media Storage",
        pfm: "Included",
        competitor: "Included",
      },
      {
        label: "Team Users",
        pfm: "Unlimited",
        competitor: "Unlimited",
      },
      {
        label: "Scaling and Growth",
        pfm: "Predictable pricing with no overage penalties",
        competitor: "Must upgrade tier for more profiles and add-ons",
      },
    ],
  },

  youMightUse: {
    competitorScenarios: [
      "You require access to a social media platform that Post for Me doesn't support (yet, we're probably working on it!).",
      "You're building a product that requires Facebook and Google Reviews.",
      "You're already integrated with Late.",
    ],
  },
  proposition: {
    title: "Stop paying a tax on your own growth.",
    description: "True infrastructure should function like a utility: you pay for what you process, not for how many users you have. Many social APIs impose arbitrary limits on \"connected accounts\" or \"social profiles,\" forcing you into expensive enterprise tiers just because you successfully onboarded more users. We believe that is fundamentally broken. It's a tax on your success.\n\nWith Post for Me, a connected user costs you $0. You can onboard ten users or ten million. We only charge you when they actually post. Build your user base without worrying about your infrastructure bill punishing you for it.",
  },
  features: {
    sdks: [
      {
        name: "TypeScript/JavaScript",
        pfmAvailable: true,
        competitorAvailable: true,
      },
      {
        name: "Python",
        pfmAvailable: true,
        competitorAvailable: true,
      },
      {
        name: "Go",
        pfmAvailable: true,
        competitorAvailable: true,
      },
      {
        name: "Ruby",
        pfmAvailable: true,
        competitorAvailable: true,
      },
    ],
  },
};
