import type { Route } from "./+types/route";

export const meta: Route.MetaFunction = () => {
  const canonicalUrl = "https://www.postforme.dev/solutions";

  return [
    {
      title: "Solutions for Every Developer | Post for Me",
    },
    {
      name: "description",
      content:
        "See how Post for Me powers social media features for schedulers, AI tools, games, SaaS products, CRMs, e-commerce platforms, and more.",
    },
    { tagName: "link", rel: "canonical", href: canonicalUrl },

    // Open Graph
    { property: "og:type", content: "website" },
    {
      property: "og:title",
      content: "Solutions for Every Developer | Post for Me",
    },
    {
      property: "og:description",
      content:
        "From schedulers to AI tools, games to SaaS products—see how developers use Post for Me's unified API to build social features across 9 platforms without the infrastructure overhead.",
    },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: "https://www.postforme.dev/og-image.png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Solutions for Every Developer | Post for Me",
    },
    {
      name: "twitter:description",
      content:
        "One API for social media features across schedulers, AI tools, games, SaaS, e-commerce, and more. From $10/mo for 1,000 posts.",
    },
    {
      name: "twitter:image",
      content: "https://www.postforme.dev/twitter-card.png",
    },

    // Keywords
    {
      name: "keywords",
      content:
        "social media API, developer solutions, scheduler API, AI content API, game social sharing, SaaS social features, e-commerce social, influencer management API, CRM social integration, DAM publishing, news distribution API, event promotion API",
    },

    // Structured Data
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#collection`,
        name: "Post for Me Solutions",
        description:
          "Explore how developers across industries use Post for Me to add social media features without infrastructure overhead.",
        url: canonicalUrl,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: 11,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Social Media Scheduler", url: `${canonicalUrl}/social-media-scheduler` },
            { "@type": "ListItem", position: 2, name: "AI Content Generation", url: `${canonicalUrl}/ai-content-generation` },
            { "@type": "ListItem", position: 3, name: "Multi-Account Management", url: `${canonicalUrl}/multi-account-management` },
            { "@type": "ListItem", position: 4, name: "Game Development", url: `${canonicalUrl}/games` },
            { "@type": "ListItem", position: 5, name: "SaaS Products", url: `${canonicalUrl}/saas-products` },
            { "@type": "ListItem", position: 6, name: "E-commerce Platforms", url: `${canonicalUrl}/e-commerce-platforms` },
            { "@type": "ListItem", position: 7, name: "Influencer Management", url: `${canonicalUrl}/influencer-management` },
            { "@type": "ListItem", position: 8, name: "CRM Systems", url: `${canonicalUrl}/crm-systems` },
            { "@type": "ListItem", position: 9, name: "Digital Asset Management", url: `${canonicalUrl}/dam-tools` },
            { "@type": "ListItem", position: 10, name: "News & Media Publishers", url: `${canonicalUrl}/news-media-publishers` },
            { "@type": "ListItem", position: 11, name: "Event Management", url: `${canonicalUrl}/event-management` },
          ],
        },
        breadcrumb: {
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
              name: "Solutions",
              item: canonicalUrl,
            },
          ],
        },
      },
    },
  ];
};
