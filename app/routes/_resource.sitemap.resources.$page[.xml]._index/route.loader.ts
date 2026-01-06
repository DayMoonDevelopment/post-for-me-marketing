import { XMLBuilder } from "fast-xml-parser";
import type { LoaderFunctionArgs } from "react-router";

import { MarbleCMS } from "~/lib/.server/marble";
import { SITEMAP_CONFIG } from "~/lib/.server/sitemap.config";

const builder = new XMLBuilder({
  format: true,
  suppressEmptyNode: true,
  attributeNamePrefix: "@_",
  ignoreAttributes: false,
});

export async function loader({ params }: LoaderFunctionArgs) {
  const pageParam = params.page;

  if (!pageParam || isNaN(Number(pageParam))) {
    throw new Response("Not found", { status: 404 });
  }

  const pageNumber = Number(pageParam);

  if (pageNumber < 1) {
    throw new Response("Not found", { status: 404 });
  }

  try {
    // Fetch all published posts from MarbleCMS
    const marble = new MarbleCMS();
    const response = await marble.posts().limit("all").get();

    if (!response?.posts) {
      throw new Error("Failed to fetch posts from MarbleCMS");
    }

    // Filter only published posts
    const publishedPosts = response.posts.filter((post) => post.publishedAt);

    const totalPosts = publishedPosts.length;
    const totalPages = Math.ceil(totalPosts / SITEMAP_CONFIG.URLS_PER_PAGE);

    // Check if page exists
    if (pageNumber > totalPages) {
      throw new Response("Not found", { status: 404 });
    }

    // Calculate pagination
    const startIndex = (pageNumber - 1) * SITEMAP_CONFIG.URLS_PER_PAGE;
    const endIndex = startIndex + SITEMAP_CONFIG.URLS_PER_PAGE;
    const paginatedPosts = publishedPosts.slice(startIndex, endIndex);

    // Generate XML sitemap URLs for posts
    const resourceUrls = paginatedPosts.map((post) => ({
      loc: `${SITEMAP_CONFIG.BASE_URL}/resources/${post.slug}`,
      lastmod: new Date(post.publishedAt).toISOString().split("T")[0],
      changefreq: SITEMAP_CONFIG.RESOURCES.CHANGE_FREQ,
      priority: SITEMAP_CONFIG.RESOURCES.PRIORITY,
    }));

    // Generate sitemap XML
    const sitemapData = {
      urlset: {
        "@_xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
        ...(resourceUrls.length > 0 && { url: resourceUrls }),
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n${builder.build(sitemapData)}`;

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": `public, max-age=${SITEMAP_CONFIG.CACHE.SUCCESS_MAX_AGE}, s-maxage=${SITEMAP_CONFIG.CACHE.SUCCESS_MAX_AGE}`,
        "Content-Length": xml.length.toString(),
        "X-Sitemap-Page": pageNumber.toString(),
        "X-Total-Resources": totalPosts.toString(),
        "X-Total-Pages": totalPages.toString(),
      },
    });
  } catch (error) {
    console.error("Error generating resources sitemap:", error);

    // Return empty sitemap on error
    const emptySitemap = {
      urlset: {
        "@_xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n${builder.build(emptySitemap)}`;

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": `public, max-age=${SITEMAP_CONFIG.CACHE.ERROR_MAX_AGE}`,
        "Content-Length": xml.length.toString(),
      },
    });
  }
}
