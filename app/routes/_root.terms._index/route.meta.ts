import type { Route } from "./+types/route";

export const meta: Route.MetaFunction = () => {
  const canonicalUrl = "https://www.postforme.dev/terms";

  return [
    { title: "Terms of Service — Post for Me" },
    {
      name: "description",
      content:
        "Terms of service for the Post for Me social media API platform. Usage terms, acceptable use, and service agreements.",
    },
    { tagName: "link", rel: "canonical", href: canonicalUrl },

    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${canonicalUrl}/#webpage`,
        name: "Terms of Service",
        url: canonicalUrl,
        isPartOf: { "@id": "https://www.postforme.dev/#website" },
      },
    },
  ];
};
