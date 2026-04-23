import { MetadataComposer } from "~/lib/meta";

import type { Route } from "./+types/route";

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "...";
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.post) {
    return [{ title: "Post not found" }];
  }

  const { post } = data;
  const postUrl = `https://www.postforme.dev/blog/${post.slug}`;

  const metadata = new MetadataComposer();
  metadata.title = truncate(`${post.title} — Post for Me`, 60);
  metadata.description = truncate(
    post.description || post.title,
    160,
  );
  metadata.canonical = postUrl;
  metadata.contentType = "article";
  metadata.publishedTime = post.publishedAt.toISOString();
  metadata.modifiedTime = post.updatedAt.toISOString();

  // Add featured image if available
  if (post.coverImage) {
    metadata.image = post.coverImage;
  }

  // Add author if available (use primary author for metadata)
  if (post.authors.length > 0) {
    metadata.author = post.authors[0].name;
  }

  // Build author schema helper
  const buildAuthorSchema = (author: (typeof post.authors)[number]) => ({
    "@type": "Person" as const,
    name: author.name,
    ...(author.image && { image: author.image }),
    ...(author.bio && { description: author.bio }),
    ...(author.socials.length > 0 && {
      url: author.socials[0].url,
      sameAs: author.socials.map((s) => s.url),
    }),
  });

  // Article Schema
  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${postUrl}/#article`,
    headline: post.title,
    description: post.description || post.title,
    url: postUrl,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author:
      post.authors.length > 0
        ? post.authors.length === 1
          ? buildAuthorSchema(post.authors[0])
          : post.authors.map(buildAuthorSchema)
        : {
            "@type": "Organization",
            name: "Post For Me",
            url: "https://www.postforme.dev",
          },
    publisher: {
      "@type": "Organization",
      name: "Post For Me",
      url: "https://www.postforme.dev",
      logo: {
        "@type": "ImageObject",
        url: "https://www.postforme.dev/logo.png",
      },
    },
    mainEntityOfPage: {
      "@id": `${postUrl}/#webpage`,
    },
  };

  // Add featured image to article schema
  if (post.coverImage) {
    articleSchema.image = {
      "@type": "ImageObject",
      url: post.coverImage,
    };
  }

  metadata.addSchema(articleSchema);

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${postUrl}/#breadcrumb`,
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
        name: "Blog",
        item: "https://www.postforme.dev/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  metadata.addSchema(breadcrumbSchema);

  // WebPage Schema with speakable
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${postUrl}/#webpage`,
    name: post.title,
    description: post.description || post.title,
    url: postUrl,
    isPartOf: { "@id": "https://www.postforme.dev/#website" },
    breadcrumb: { "@id": `${postUrl}/#breadcrumb` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article h1", "article .prose"],
    },
  };

  metadata.addSchema(webPageSchema);

  // Video Schema - check if content contains YouTube embed
  if (post.content) {
    const youtubeRegex =
      /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = post.content.match(youtubeRegex);

    if (match) {
      const videoId = match[1];
      const videoSchema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "@id": `${postUrl}/#video`,
        name: post.title,
        description: post.description || post.title,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        uploadDate: post.publishedAt.toISOString(),
        contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
      };

      metadata.addSchema(videoSchema);
    }
  }

  return metadata.build();
}
