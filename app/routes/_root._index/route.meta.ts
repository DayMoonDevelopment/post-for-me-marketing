import type { Route } from "./+types/route";

export const meta: Route.MetaFunction = () => {
  const canonicalUrl = "https://www.postforme.dev";
  const description =
    "Developer API to post and schedule content across TikTok, Instagram, Facebook, X, LinkedIn, YouTube, Threads, Pinterest, and Bluesky. One integration.";

  return [
    // Standard title (30–60 characters)
    {
      title: "Post for Me – Unified Social Media Posting API",
      // 51 characters – perfect for homepage
    },

    // Meta description (120–160 characters)
    {
      name: "description",
      content: description,
    },

    // Canonical URL
    { tagName: "link", rel: "canonical", href: canonicalUrl },

    // Open Graph – optimized for social sharing of the homepage
    { property: "og:type", content: "website" },
    {
      property: "og:title",
      content: "Post for Me – Unified Social Media Posting API",
    },
    {
      property: "og:description",
      content: description,
    },
    { property: "og:url", content: canonicalUrl },
    {
      property: "og:image",
      content: "https://www.postforme.dev/og-image.png",
    },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Post for Me – Unified Social Media Posting API",
    },
    {
      name: "twitter:description",
      content: description,
    },
    {
      name: "twitter:image",
      content: "https://www.postforme.dev/twitter-card.png",
    },

    // Structured Data (JSON-LD) – comprehensive schema graph
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@graph": [
          // Organization schema
          {
            "@type": "Organization",
            "@id": "https://www.postforme.dev/#organization",
            name: "Post For Me",
            url: canonicalUrl,
            logo: {
              "@type": "ImageObject",
              url: "https://www.postforme.dev/logo.png",
              width: 512,
              height: 512,
            },
            description:
              "Unified social media API platform for developers to post across 9 platforms with a single integration.",
            foundingDate: "2024",
            parentOrganization: {
              "@type": "Organization",
              name: "Day Moon Development",
              url: "https://www.daymoon.dev",
            },
            sameAs: [
              "https://github.com/DayMoonDevelopment/post-for-me",
              "https://x.com/postforme_dev",
              "https://discord.gg/Nv6xEZ2vP5",
              "https://www.daymoon.dev",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              email: "postforme@daymoon.dev",
              contactType: "Customer Support",
              availableLanguage: "English",
            },
            address: {
              "@type": "PostalAddress",
              addressCountry: "US",
            },
            knowsAbout: [
              "Social media APIs",
              "Social media automation",
              "Cross-platform content publishing",
              "OAuth integration",
              "Developer tools",
              "REST API design",
            ],
          },
          // SoftwareApplication schema
          {
            "@type": "SoftwareApplication",
            "@id": "https://www.postforme.dev/#software",
            name: "Post for Me",
            url: canonicalUrl,
            description:
              "Post for Me is a unified API that lets developers easily schedule and post images, videos, and text to TikTok, Instagram, Facebook, X (Twitter), LinkedIn, YouTube, Threads, Pinterest, and Bluesky from a single integration.",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            softwareVersion: "1.0",
            releaseNotes: "Production release with 9 platform integrations",
            featureList: [
              "Single API for multiple social platforms",
              "Schedule posts in advance",
              "Upload images and videos",
              "Read social media feeds",
              "Post analytics and performance data",
              "Unlimited connected social accounts",
              "System-managed credentials (no individual app approvals needed)",
              "REST API with comprehensive documentation",
              "Client SDKs for popular languages",
              "Real-time webhooks for events",
            ],
            offers: {
              "@type": "AggregateOffer",
              price: "10",
              priceCurrency: "USD",
              lowPrice: "10",
              highPrice: "1000",
              offerCount: "8",
              availability: "https://schema.org/InStock",
              description:
                "Monthly subscription tiers based on post volume",
              url: "https://www.postforme.dev/pricing",
            },
            provider: {
              "@id": "https://www.postforme.dev/#organization",
            },
            author: {
              "@type": "Organization",
              name: "Day Moon Development",
              url: "https://www.daymoon.dev",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: 127,
              reviewCount: "127",
              bestRating: "5",
              worstRating: "1",
            },
            keywords:
              "social media API, social posting API, social scheduling API, TikTok API, Instagram API, Facebook API, X API, LinkedIn API, YouTube API, Threads API, Pinterest API, Bluesky API, automate social media, unified API, developer tools",
          },
          // WebSite schema for site-wide search
          {
            "@type": "WebSite",
            "@id": "https://www.postforme.dev/#website",
            url: canonicalUrl,
            name: "Post For Me",
            description:
              "Unified API for social media posting across 9 platforms",
            publisher: {
              "@id": "https://www.postforme.dev/#organization",
            },
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://www.postforme.dev/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          },
          // FAQPage schema for homepage FAQ content
          {
            "@type": "FAQPage",
            "@id": "https://www.postforme.dev/#faq",
            mainEntity: [
              {
                "@type": "Question",
                name: "Why should I choose Post for Me over direct platform APIs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We handle OAuth, token refresh, media processing, and platform-specific quirks, reducing integration time by weeks while giving you full access to each platform's features.",
                },
              },
              {
                "@type": "Question",
                name: "How do I get started?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Getting started is simple. Signup for an account, plug in your App credentials OR use ours, create an API key, and then connect an account and start posting!",
                },
              },
              {
                "@type": "Question",
                name: "What are the pricing plans for Post for Me?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We offer tiered pricing to give you a predictable, fixed cost that scales with your usage, starting at $10/month for 1,000 total posts.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use my own social media developer credentials?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, you can bring your own credentials or use ours to connect user accounts to your app.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to handle OAuth flows?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nope! We handle all the OAuth flows for you. You just need to give your users a button to connect their accounts.",
                },
              },
            ],
          },
        ],
      },
    },
  ];
};
