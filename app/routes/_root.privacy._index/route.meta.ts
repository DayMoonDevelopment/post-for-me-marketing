import type { Route } from "./+types/route";

export const meta: Route.MetaFunction = () => {
  const canonicalUrl = "https://www.postforme.dev/privacy";

  return [
    { title: "Privacy Policy — Post for Me" },
    {
      name: "description",
      content:
        "Privacy policy for the Post for Me social media API platform. How we handle your data, OAuth tokens, and account information.",
    },
    { tagName: "link", rel: "canonical", href: canonicalUrl },

    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${canonicalUrl}/#webpage`,
        name: "Privacy Policy",
        url: canonicalUrl,
        isPartOf: { "@id": "https://www.postforme.dev/#website" },
      },
    },
  ];
};
