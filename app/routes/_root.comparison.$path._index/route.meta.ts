import type { Route } from "./+types/route";

export const meta: Route.MetaFunction = ({ data, params }) => {
  const canonicalUrl = `https://www.postforme.dev/comparison/${params.path}`;
  const comparison = data?.comparison;

  if (!comparison) {
    return [{ title: "Comparison Not Found | Post for Me" }];
  }

  return [
    {
      title: comparison.meta.title,
    },
    {
      name: "description",
      content: comparison.meta.description,
    },
    { rel: "canonical", href: canonicalUrl },
    { property: "og:type", content: "article" },
    {
      property: "og:title",
      content: comparison.hero.headline,
    },
    {
      property: "og:description",
      content: comparison.hero.subheadline,
    },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: "https://www.postforme.dev/og-image.png" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: comparison.hero.headline,
    },
    {
      name: "twitter:description",
      content: comparison.meta.description,
    },
    {
      name: "twitter:image",
      content: "https://www.postforme.dev/twitter-card.png",
    },
    {
      name: "keywords",
      content: `Post for Me vs ${comparison.competitor.name}, ${comparison.competitor.name} alternative, social media API, developer API comparison, social media posting API`,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: comparison.hero.headline,
        description: comparison.meta.description,
        author: {
          "@type": "Organization",
          name: "Day Moon Development",
          url: "https://www.daymoon.dev",
        },
        publisher: {
          "@type": "Organization",
          name: "Day Moon Development",
          url: "https://www.daymoon.dev",
          logo: {
            "@type": "ImageObject",
            url: "https://www.daymoon.dev/logo.png",
          },
        },
        datePublished: "2024-01-01",
        dateModified: new Date().toISOString().split("T")[0],
      },
    },
  ];
};
