import { XMLBuilder } from "fast-xml-parser";

import { MarbleCMS } from "~/lib/.server/marble";
import { SITEMAP_CONFIG } from "~/lib/.server/sitemap.config";
import type { Route } from "./+types/route";

const builder = new XMLBuilder({
  format: true,
  suppressEmptyNode: true,
  attributeNamePrefix: "@_",
  ignoreAttributes: false,
});

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const baseUrl = url.origin;
  const currentDate = new Date().toISOString();

  const sitemaps = [
    {
      loc: `${baseUrl}${SITEMAP_CONFIG.SITEMAP_URLS.STATIC}`,
      lastmod: currentDate,
    },
  ];

  // Calculate how many resource sitemap pages we need
  try {
    const marble = new MarbleCMS();
    const response = await marble.posts().limit("all").get();

    if (response?.posts) {
      const publishedPosts = response.posts.filter((post) => post.publishedAt);
      const totalPages = Math.ceil(
        publishedPosts.length / SITEMAP_CONFIG.URLS_PER_PAGE,
      );

      // Add resource sitemap pages
      for (let page = 1; page <= totalPages; page++) {
        sitemaps.push({
          loc: `${baseUrl}${SITEMAP_CONFIG.SITEMAP_URLS.RESOURCES(page)}`,
          lastmod: currentDate,
        });
      }
    }
  } catch (error) {
    console.error("Error generating sitemap index:", error);
    // Continue with just static sitemap on error
  }

  const sitemapIndex = {
    sitemapindex: {
      "@_xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
      sitemap: sitemaps,
    },
  };

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n${builder.build(sitemapIndex)}`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": `public, max-age=${SITEMAP_CONFIG.CACHE.SUCCESS_MAX_AGE}, s-maxage=${SITEMAP_CONFIG.CACHE.SUCCESS_MAX_AGE}`,
      "Content-Length": xml.length.toString(),
    },
  });
}
