import { MetadataComposer } from "~/lib/meta";
import type { Route } from "./+types/route";

export function meta({ data }: Route.MetaArgs) {
  if (!data?.post) {
    return [{ title: "Post not found" }];
  }

  const { post } = data;
  const postUrl = `https://www.postforme.dev/blog/${post.slug}`;

  const metadata = new MetadataComposer();
  metadata.title = `${post.title} - Post For Me Blog`;
  metadata.description = post.description || post.title;
  metadata.canonical = postUrl;
  metadata.contentType = "article";
  metadata.publishedTime = post.publishedAt.toISOString();
  metadata.modifiedTime = post.updatedAt.toISOString();

  // Add featured image if available
  if (post.coverImage) {
    metadata.image = post.coverImage;
  }

  // Add author if available
  if (post.authors && post.authors.length > 0) {
    metadata.author = post.authors[0].name;
  }

  // Article Schema
  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description || post.title,
    url: postUrl,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author:
      post.authors && post.authors.length > 0
        ? {
            "@type": "Person",
            name: post.authors[0].name,
          }
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
      "@type": "WebPage",
      "@id": postUrl,
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

  // Speakable Schema - mark the main content as speakable
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: postUrl,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article h1", "article .prose"],
    },
  };

  metadata.addSchema(speakableSchema);

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
