import { MetadataComposer } from "~/lib/meta";

import type { Route } from "./+types/route";

export function meta({ data }: Route.MetaArgs) {
  const metadata = new MetadataComposer();
  metadata.title = "Blog — Post for Me Developer Guides";
  metadata.description =
    "Technical guides, integration tutorials, and insights for developers building social media automation with the Post for Me API.";
  metadata.canonical = "https://www.postforme.dev/blog";

  // Add ItemList schema for blog posts
  let itemListSchema: Record<string, unknown> | null = null;
  if (data?.posts && data.posts.length > 0) {
    itemListSchema = metadata.createItemListSchema({
      title: "Post For Me Blog",
      description:
        "Technical guides and tutorials for social media API integration",
      items: data.posts.map((post) => ({
        name: post.title,
        description: post.description,
        url: `https://www.postforme.dev/blog/${post.slug}`,
        datePublished: post.publishedAt.toISOString(),
        image: post.coverImage || undefined,
      })),
    });
    itemListSchema["@id"] = "https://www.postforme.dev/blog/#itemlist";
    metadata.addSchema(itemListSchema);
  }

  // Add Collection Page schema
  const collectionSchema = metadata.createCollectionPageSchema({
    title: "Post For Me Blog",
    description:
      "Technical guides and tutorials for social media API integration",
    canonical: "https://www.postforme.dev/blog",
  });
  collectionSchema["@id"] = "https://www.postforme.dev/blog/#webpage";
  if (itemListSchema) {
    collectionSchema.mainEntity = {
      "@id": "https://www.postforme.dev/blog/#itemlist",
    };
  }
  metadata.addSchema(collectionSchema);

  return metadata.build();
}
