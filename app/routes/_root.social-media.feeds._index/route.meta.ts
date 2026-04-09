import type { Route } from "./+types/route";

export const meta: Route.MetaFunction = () => {
  const canonicalUrl = "https://www.postforme.dev/social-media/feeds";

  return [
    {
      title:
        "Social Media Feeds API — Fetch Posts From Connected Accounts | Post for Me",
    },
    {
      name: "description",
      content:
        "Pull social media posts from connected accounts across 9 platforms through one API. Display user content in your product without building platform-specific integrations.",
    },
    { rel: "canonical", href: canonicalUrl },

    // Open Graph
    { property: "og:type", content: "website" },
    {
      property: "og:title",
      content:
        "Social Media Feeds API — Fetch Posts From Connected Accounts | Post for Me",
    },
    {
      property: "og:description",
      content:
        "Pull social media posts from connected accounts across 9 platforms through one API. Display user content in your product without building platform-specific integrations.",
    },
    { property: "og:url", content: canonicalUrl },
    {
      property: "og:image",
      content: "https://www.postforme.dev/og-image.png",
    },
    {
      property: "og:image:alt",
      content: "Social Media Feeds API — Post for Me",
    },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content:
        "Social Media Feeds API — Fetch Posts From Connected Accounts | Post for Me",
    },
    {
      name: "twitter:description",
      content:
        "Pull social media posts from connected accounts across 9 platforms through one API.",
    },
    {
      name: "twitter:image",
      content: "https://www.postforme.dev/og-image.png",
    },

    // Keywords
    {
      name: "keywords",
      content:
        "social media feeds API, fetch social media posts API, read social media content, social media content API, user feed API, social media posts, social media integration, TikTok feeds API, Instagram feeds API, Facebook feeds API, unified social feeds",
    },

    // Structured Data — WebPage
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Social Media Feeds API — Fetch Posts From Connected Accounts",
        description:
          "Pull social media posts from connected accounts across 9 platforms through one API. Display user content in your product without building platform-specific integrations.",
        url: canonicalUrl,
        about: { "@id": "https://www.postforme.dev/#product" },
        isPartOf: { "@id": "https://www.postforme.dev/#website" },
      },
    },

    // BreadcrumbList
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.postforme.dev",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Social Media",
            item: "https://www.postforme.dev/social-media",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Feeds",
            item: canonicalUrl,
          },
        ],
      },
    },

    // FAQPage structured data
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What does the feeds API return?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The feeds API returns posts from connected social media accounts. Each post includes the caption, media URLs, publish date, platform, and post type in a unified format across all 9 supported platforms.",
            },
          },
          {
            "@type": "Question",
            name: "Which platforms support feed reading?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Feeds are available across all 9 supported platforms: TikTok, Facebook, Instagram, X, LinkedIn, Pinterest, Bluesky, Threads, and YouTube. All platforms return posts in the same unified format.",
            },
          },
          {
            "@type": "Question",
            name: "Can I display feed content in my own product?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The feeds API is designed for exactly this. Fetch posts from connected accounts and render them in your own UI, dashboard, or internal tool. You get structured data including captions, media, timestamps, and metadata.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need platform credentials to read feeds?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Post for Me provides managed OAuth credentials so you can start reading feeds immediately. When you're ready for production, you can bring your own credentials for full control.",
            },
          },
          {
            "@type": "Question",
            name: "How far back can I fetch posts?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The depth of available content depends on each platform's API limitations. Post for Me fetches as far back as each platform allows and returns everything in a consistent format.",
            },
          },
        ],
      },
    },
  ];
};
