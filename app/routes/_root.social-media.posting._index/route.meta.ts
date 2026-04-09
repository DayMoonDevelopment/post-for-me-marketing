import type { Route } from "./+types/route";

export const meta: Route.MetaFunction = () => {
  const canonicalUrl = "https://www.postforme.dev/social-media/posting";

  return [
    {
      title:
        "Social Media Posting API — Publish, Schedule & Customize Across 9 Platforms | Post for Me",
    },
    {
      name: "description",
      content:
        "Post text, images, and video to TikTok, Instagram, Facebook, X, LinkedIn, and more through one API. Schedule posts, customize per platform, and handle media automatically.",
    },
    { rel: "canonical", href: canonicalUrl },

    // Open Graph
    { property: "og:type", content: "website" },
    {
      property: "og:title",
      content:
        "Social Media Posting API — Publish, Schedule & Customize Across 9 Platforms | Post for Me",
    },
    {
      property: "og:description",
      content:
        "Post text, images, and video to TikTok, Instagram, Facebook, X, LinkedIn, and more through one API. Schedule posts, customize per platform, and handle media automatically.",
    },
    { property: "og:url", content: canonicalUrl },
    {
      property: "og:image",
      content: "https://www.postforme.dev/og-image.png",
    },
    {
      property: "og:image:alt",
      content: "Social Media Posting API — Post for Me",
    },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content:
        "Social Media Posting API — Publish, Schedule & Customize Across 9 Platforms | Post for Me",
    },
    {
      name: "twitter:description",
      content:
        "Post text, images, and video to TikTok, Instagram, Facebook, X, LinkedIn, and more through one API.",
    },
    {
      name: "twitter:image",
      content: "https://www.postforme.dev/og-image.png",
    },

    // Keywords
    {
      name: "keywords",
      content:
        "social media posting API, schedule social media posts API, post to multiple platforms API, social media scheduling, cross-platform posting, TikTok posting API, Instagram posting API, Facebook posting API, X posting API, LinkedIn posting API, social media automation API",
    },

    // Structured Data — WebPage
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Social Media Posting API — Publish, Schedule & Customize Across 9 Platforms",
        description:
          "Post text, images, and video to TikTok, Instagram, Facebook, X, LinkedIn, and more through one API. Schedule posts, customize per platform, and handle media automatically.",
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
            name: "Posting",
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
            name: "What content types can I post through the API?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can post text captions, images, and video. Post for Me handles media validation, transcoding, and platform-specific format requirements automatically.",
            },
          },
          {
            "@type": "Question",
            name: "Can I schedule posts for future publishing?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Include a publish_at timestamp in your API call and Post for Me publishes at the specified time, with timezone normalization and platform-specific scheduling rules handled for you.",
            },
          },
          {
            "@type": "Question",
            name: "Can I customize posts per platform?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Post for Me supports per-platform overrides so you can set YouTube titles, choose Instagram content types (feed, reel, story), post to specific Pinterest boards, create X polls, and more, all in the same API call.",
            },
          },
          {
            "@type": "Question",
            name: "Can I post to multiple accounts at once?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. A single API call can target multiple connected accounts across different platforms. Each account receives the post with any platform-specific customizations you define.",
            },
          },
          {
            "@type": "Question",
            name: "What is draft mode?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Draft mode lets you create posts without publishing them immediately. Drafts can be reviewed, edited, and published later through the API or dashboard. On TikTok, drafts can be sent to the TikTok app for manual review and publishing.",
            },
          },
        ],
      },
    },
  ];
};
