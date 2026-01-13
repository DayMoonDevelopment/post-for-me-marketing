import { solutions } from "./data/solutions";

/**
 * Sitemap generation configuration
 * Centralized settings for sitemap batch sizes and performance tuning
 */

export const SITEMAP_CONFIG = {
  /**
   * Number of URLs per sitemap page
   * Smaller batches = faster API queries but more sitemap files
   * Larger batches = fewer sitemap files but slower API queries
   *
   * Google's maximum recommendation: 50,000 URLs per sitemap
   * Current optimized setting: 1,000 URLs for fastest query performance
   */
  URLS_PER_PAGE: 1000,

  /**
   * Base URL for the application
   */
  BASE_URL: "https://www.postforme.dev",

  /**
   * Sitemap URLs
   */
  SITEMAP_URLS: {
    STATIC: "/sitemap/static.xml",
    RESOURCES: (page: number) => `/sitemap/resources/${page}.xml`,
    BLOG: (page: number) => `/sitemap/blog/${page}.xml`,
  },

  /**
   * Cache control settings for sitemap responses
   */
  CACHE: {
    /** Cache duration for successful sitemap responses (24 hours) */
    SUCCESS_MAX_AGE: 86400,
    /** Cache duration for error responses (1 hour) */
    ERROR_MAX_AGE: 3600,
  },

  /**
   * Resources (blog posts) sitemap specific settings
   */
  RESOURCES: {
    /** Number of URLs per resources sitemap page (MarbleCMS API max: 100) */
    PAGE_SIZE: 100,
    /** URL change frequency for resource pages */
    CHANGE_FREQ: "weekly" as const,
    /** Priority for resource pages in sitemap */
    PRIORITY: "0.7",
  },

  /**
   * Blog sitemap specific settings
   */
  BLOG: {
    /** Number of URLs per blog sitemap page (MarbleCMS API max: 100) */
    PAGE_SIZE: 100,
    /** URL change frequency for blog pages */
    CHANGE_FREQ: "weekly" as const,
    /** Priority for blog pages in sitemap */
    PRIORITY: "0.8",
  },

  /**
   * Static sitemap specific settings
   */
  STATIC: {
    /** Homepage settings */
    HOMEPAGE: {
      CHANGE_FREQ: "weekly" as const,
      PRIORITY: "1.0",
    },
    /** Main marketing pages settings */
    MARKETING: {
      CHANGE_FREQ: "monthly" as const,
      PRIORITY: "0.8",
    },
    /** Solutions pages settings */
    SOLUTIONS: {
      CHANGE_FREQ: "monthly" as const,
      PRIORITY: "0.9",
    },
    /** Resources index page settings */
    RESOURCES_INDEX: {
      CHANGE_FREQ: "daily" as const,
      PRIORITY: "0.8",
    },
    /** Blog index page settings */
    BLOG_INDEX: {
      CHANGE_FREQ: "daily" as const,
      PRIORITY: "0.9",
    },
  },
} as const;

/**
 * Sitemap URL entry
 */
export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

/**
 * Generate all static sitemap URLs
 * Reads solutions and comparisons data at runtime
 */
export function generateStaticSitemapUrls(): SitemapUrl[] {
  const currentDate = new Date().toISOString().split("T")[0];
  const urls: SitemapUrl[] = [];

  // Homepage
  urls.push({
    loc: SITEMAP_CONFIG.BASE_URL,
    lastmod: currentDate,
    changefreq: SITEMAP_CONFIG.STATIC.HOMEPAGE.CHANGE_FREQ,
    priority: SITEMAP_CONFIG.STATIC.HOMEPAGE.PRIORITY,
  });

  // Marketing pages
  const marketingPages = [
    "/about",
    "/day-moon-development",
    "/pricing",
    "/faq",
    "/contact",
    "/developers",
    "/privacy",
    "/terms",
  ];

  urls.push(
    ...marketingPages.map((path) => ({
      loc: `${SITEMAP_CONFIG.BASE_URL}${path}`,
      lastmod: currentDate,
      changefreq: SITEMAP_CONFIG.STATIC.MARKETING.CHANGE_FREQ,
      priority: SITEMAP_CONFIG.STATIC.MARKETING.PRIORITY,
    })),
  );

  // Solutions index page
  urls.push({
    loc: `${SITEMAP_CONFIG.BASE_URL}/solutions`,
    lastmod: currentDate,
    changefreq: SITEMAP_CONFIG.STATIC.SOLUTIONS.CHANGE_FREQ,
    priority: SITEMAP_CONFIG.STATIC.SOLUTIONS.PRIORITY,
  });

  // Individual solution pages (read synchronously from solutions data)
  urls.push(
    ...Object.keys(solutions).map((solutionId) => ({
      loc: `${SITEMAP_CONFIG.BASE_URL}/solutions/${solutionId}`,
      lastmod: currentDate,
      changefreq: SITEMAP_CONFIG.STATIC.SOLUTIONS.CHANGE_FREQ,
      priority: SITEMAP_CONFIG.STATIC.SOLUTIONS.PRIORITY,
    })),
  );

  // todo : finish the design/layout and then add
  // Individual comparison pages (read synchronously from comparisons data)
  // urls.push(
  //   ...Object.keys(comparisons).map((comparisonId) => ({
  //     loc: `${SITEMAP_CONFIG.BASE_URL}/comparison/${comparisonId}`,
  //     lastmod: currentDate,
  //     changefreq: SITEMAP_CONFIG.STATIC.MARKETING.CHANGE_FREQ,
  //     priority: SITEMAP_CONFIG.STATIC.MARKETING.PRIORITY,
  //   })),
  // );

  // Resources index page
  urls.push({
    loc: `${SITEMAP_CONFIG.BASE_URL}/resources`,
    lastmod: currentDate,
    changefreq: SITEMAP_CONFIG.STATIC.RESOURCES_INDEX.CHANGE_FREQ,
    priority: SITEMAP_CONFIG.STATIC.RESOURCES_INDEX.PRIORITY,
  });

  // Blog index page
  urls.push({
    loc: `${SITEMAP_CONFIG.BASE_URL}/blog`,
    lastmod: currentDate,
    changefreq: SITEMAP_CONFIG.STATIC.BLOG_INDEX.CHANGE_FREQ,
    priority: SITEMAP_CONFIG.STATIC.BLOG_INDEX.PRIORITY,
  });

  return urls;
}
