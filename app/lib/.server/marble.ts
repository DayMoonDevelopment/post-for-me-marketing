import { Marble } from "@usemarble/sdk";

import type {
  CategoriesListResponse,
  CategoryResponse,
  PostsListResponse,
  PostResponse,
  TagResponse,
  TagsListResponse,
} from "@usemarble/sdk/models";
import type { Post, Category, Tag } from "@usemarble/sdk/models";

/**
 * MarbleCMS client wrapper around the official @usemarble/sdk
 *
 * This provides a convenient API for fetching blog posts, categories, and tags
 * from MarbleCMS with automatic error handling and pagination support.
 */
export class MarbleCMS {
  private client: Marble;
  private showDrafts: boolean;

  constructor() {
    const apiKey = process.env.MARBLE_API_KEY;

    if (!apiKey) {
      console.error("MarbleCMS: Missing MARBLE_API_KEY environment variable!");
      console.error("MARBLE_API_KEY:", apiKey ? "(set)" : "(not set)");
    }

    this.client = new Marble({
      apiKey: apiKey ?? "",
    });

    // Only show drafts if explicitly set to 'true'
    this.showDrafts = process.env.MARBLE_SHOW_DRAFTS === "true";
  }

  /**
   * Query posts with filtering, sorting, and pagination
   * @example
   * ```ts
   * const posts = await marble.posts()
   *   .categories("resources")
   *   .tags("tutorial", "beginner")
   *   .order("desc")
   *   .limit(10)
   *   .get();
   * ```
   */
  posts(): PostsQueryBuilder {
    return new PostsQueryBuilder(this.client, this.showDrafts);
  }

  /**
   * Get a single post by slug or ID
   * @example
   * ```ts
   * const post = await marble.post("my-post-slug").get();
   * const postAsMarkdown = await marble.post("my-post-slug").format("markdown").get();
   * ```
   */
  post(identifier: string): SinglePostQueryBuilder {
    return new SinglePostQueryBuilder(this.client, identifier, this.showDrafts);
  }

  /**
   * Query categories with pagination
   * @example
   * ```ts
   * const categories = await marble.categories().limit(20).get();
   * ```
   */
  categories(): CategoriesQueryBuilder {
    return new CategoriesQueryBuilder(this.client);
  }

  /**
   * Get a single category by slug or ID
   * @example
   * ```ts
   * const category = await marble.category("tutorials").get();
   * ```
   */
  category(identifier: string): SingleCategoryQueryBuilder {
    return new SingleCategoryQueryBuilder(this.client, identifier);
  }

  /**
   * Query tags with pagination
   * @example
   * ```ts
   * const tags = await marble.tags().limit(50).get();
   * ```
   */
  tags(): TagsQueryBuilder {
    return new TagsQueryBuilder(this.client);
  }

  /**
   * Get a single tag by slug or ID
   * @example
   * ```ts
   * const tag = await marble.tag("beginner").get();
   * ```
   */
  tag(identifier: string): SingleTagQueryBuilder {
    return new SingleTagQueryBuilder(this.client, identifier);
  }
}

// Posts query builder with all filtering, sorting, and search options
export class PostsQueryBuilder {
  private client: Marble;
  private showDrafts: boolean;
  private options: {
    limit?: number | "all";
    page?: number;
    order?: "asc" | "desc";
    categories?: string;
    excludeCategories?: string;
    tags?: string;
    excludeTags?: string;
    query?: string;
    format?: "html" | "markdown";
    featured?: "true" | "false";
  } = {};

  constructor(client: Marble, showDrafts: boolean = false) {
    this.client = client;
    this.showDrafts = showDrafts;
  }

  /**
   * Set the maximum number of items per page (1-200) or "all" for all items
   */
  limit(value: number | "all"): this {
    this.options.limit = value;
    return this;
  }

  /**
   * Set the page number to return (starts at 1)
   */
  page(value: number): this {
    this.options.page = value;
    return this;
  }

  /**
   * Sort order by publishedAt date (default: "desc")
   */
  order(value: "asc" | "desc"): this {
    this.options.order = value;
    return this;
  }

  /**
   * Filter by category slugs (comma-separated)
   */
  categories(...slugs: string[]): this {
    if (slugs.length > 0) {
      this.options.categories = slugs.join(",");
    }
    return this;
  }

  /**
   * Exclude category slugs (comma-separated)
   */
  excludeCategories(...slugs: string[]): this {
    if (slugs.length > 0) {
      this.options.excludeCategories = slugs.join(",");
    }
    return this;
  }

  /**
   * Filter by tag slugs (comma-separated, matches any)
   */
  tags(...slugs: string[]): this {
    if (slugs.length > 0) {
      this.options.tags = slugs.join(",");
    }
    return this;
  }

  /**
   * Exclude tag slugs (comma-separated)
   */
  excludeTags(...slugs: string[]): this {
    if (slugs.length > 0) {
      this.options.excludeTags = slugs.join(",");
    }
    return this;
  }

  /**
   * Full-text search across title and content
   */
  search(query: string): this {
    if (query.trim()) {
      this.options.query = query;
    }
    return this;
  }

  /**
   * Format of the content field (default: "html")
   */
  format(format: "html" | "markdown"): this {
    this.options.format = format;
    return this;
  }

  /**
   * Filter by featured status
   */
  featured(value: boolean): this {
    this.options.featured = value ? "true" : "false";
    return this;
  }

  /**
   * Execute the query and fetch posts
   */
  async get(): Promise<PostsListResponse | undefined> {
    try {
      const fetchAll = this.options.limit === "all";
      const limit: number | undefined = fetchAll ? 100 : (this.options.limit as number | undefined);

      const result = await this.client.posts.list({
        ...(limit !== undefined && { limit }),
        ...(this.options.page !== undefined && { page: this.options.page }),
        ...(this.options.order && { order: this.options.order }),
        ...(this.options.categories && {
          categories: this.options.categories.split(","),
        }),
        ...(this.options.excludeCategories && {
          excludeCategories: this.options.excludeCategories.split(","),
        }),
        ...(this.options.tags && { tags: this.options.tags.split(",") }),
        ...(this.options.excludeTags && {
          excludeTags: this.options.excludeTags.split(","),
        }),
        ...(this.options.query && { query: this.options.query }),
        ...(this.options.format && { format: this.options.format }),
        ...(this.options.featured && { featured: this.options.featured }),
        ...(this.showDrafts && { draft: "true" }),
      });

      // If fetchAll is true, collect all pages
      if (fetchAll) {
        const allPosts: Post[] = [];

        for await (const page of result) {
          const pageData = page.result as PostsListResponse;
          allPosts.push(...pageData.posts);
        }

        return {
          posts: allPosts,
          pagination: {
            limit: allPosts.length,
            currentPage: 1,
            nextPage: null,
            previousPage: null,
            totalItems: allPosts.length,
            totalPages: 1,
          },
        };
      }

      // Otherwise, return just the first page
      for await (const page of result) {
        return page.result as PostsListResponse;
      }

      return undefined;
    } catch (error) {
      console.error("MarbleCMS fetch error:", error);
      return undefined;
    }
  }
}

// Single post query builder
export class SinglePostQueryBuilder {
  private client: Marble;
  private identifier: string;
  private showDrafts: boolean;
  private options: {
    format?: "html" | "markdown";
  } = {};

  constructor(client: Marble, identifier: string, showDrafts: boolean = false) {
    this.client = client;
    this.identifier = identifier;
    this.showDrafts = showDrafts;
  }

  /**
   * Format of the content field (default: "html")
   */
  format(format: "html" | "markdown"): this {
    this.options.format = format;
    return this;
  }

  /**
   * Execute the query and fetch the post
   */
  async get(): Promise<PostResponse | undefined> {
    try {
      const response = await this.client.posts.get({
        identifier: this.identifier,
        ...(this.options.format && { format: this.options.format }),
        ...(this.showDrafts && { draft: "true" }),
      });

      return response as PostResponse;
    } catch (error) {
      console.error("MarbleCMS fetch error:", error);
      return undefined;
    }
  }
}

// Categories query builder
export class CategoriesQueryBuilder {
  private client: Marble;
  private options: {
    limit?: number | "all";
    page?: number;
  } = {};

  constructor(client: Marble) {
    this.client = client;
  }

  /**
   * Set the maximum number of items per page (1-200) or "all" for all items
   */
  limit(value: number | "all"): this {
    this.options.limit = value;
    return this;
  }

  /**
   * Set the page number to return (starts at 1)
   */
  page(value: number): this {
    this.options.page = value;
    return this;
  }

  /**
   * Execute the query and fetch categories
   */
  async get(): Promise<CategoriesListResponse | undefined> {
    try {
      const fetchAll = this.options.limit === "all";
      const limit: number | undefined = fetchAll ? 100 : (this.options.limit as number | undefined);

      const result = await this.client.categories.list({
        ...(limit !== undefined && { limit }),
        ...(this.options.page !== undefined && { page: this.options.page }),
      });

      // If fetchAll is true, collect all pages
      if (fetchAll) {
        const allCategories: Category[] = [];

        for await (const page of result) {
          const pageData = page.result as CategoriesListResponse;
          allCategories.push(...pageData.categories);
        }

        return {
          categories: allCategories,
          pagination: {
            limit: allCategories.length,
            currentPage: 1,
            nextPage: null,
            previousPage: null,
            totalItems: allCategories.length,
            totalPages: 1,
          },
        };
      }

      // Otherwise, return just the first page
      for await (const page of result) {
        return page.result as CategoriesListResponse;
      }

      return undefined;
    } catch (error) {
      console.error("MarbleCMS fetch error:", error);
      return undefined;
    }
  }
}

// Single category query builder
export class SingleCategoryQueryBuilder {
  private client: Marble;
  private identifier: string;

  constructor(client: Marble, identifier: string) {
    this.client = client;
    this.identifier = identifier;
  }

  /**
   * Execute the query and fetch the category
   */
  async get(): Promise<CategoryResponse | undefined> {
    try {
      const response = await this.client.categories.get({
        identifier: this.identifier,
      });
      return response as CategoryResponse;
    } catch (error) {
      console.error("MarbleCMS fetch error:", error);
      return undefined;
    }
  }
}

// Tags query builder
export class TagsQueryBuilder {
  private client: Marble;
  private options: {
    limit?: number | "all";
    page?: number;
  } = {};

  constructor(client: Marble) {
    this.client = client;
  }

  /**
   * Set the maximum number of items per page (1-200) or "all" for all items
   */
  limit(value: number | "all"): this {
    this.options.limit = value;
    return this;
  }

  /**
   * Set the page number to return (starts at 1)
   */
  page(value: number): this {
    this.options.page = value;
    return this;
  }

  /**
   * Execute the query and fetch tags
   */
  async get(): Promise<TagsListResponse | undefined> {
    try {
      const fetchAll = this.options.limit === "all";
      const limit: number | undefined = fetchAll ? 100 : (this.options.limit as number | undefined);

      const result = await this.client.tags.list({
        ...(limit !== undefined && { limit }),
        ...(this.options.page !== undefined && { page: this.options.page }),
      });

      // If fetchAll is true, collect all pages
      if (fetchAll) {
        const allTags: Tag[] = [];

        for await (const page of result) {
          const pageData = page.result as TagsListResponse;
          allTags.push(...pageData.tags);
        }

        return {
          tags: allTags,
          pagination: {
            limit: allTags.length,
            currentPage: 1,
            nextPage: null,
            previousPage: null,
            totalItems: allTags.length,
            totalPages: 1,
          },
        };
      }

      // Otherwise, return just the first page
      for await (const page of result) {
        return page.result as TagsListResponse;
      }

      return undefined;
    } catch (error) {
      console.error("MarbleCMS fetch error:", error);
      return undefined;
    }
  }
}

// Single tag query builder
export class SingleTagQueryBuilder {
  private client: Marble;
  private identifier: string;

  constructor(client: Marble, identifier: string) {
    this.client = client;
    this.identifier = identifier;
  }

  /**
   * Execute the query and fetch the tag
   */
  async get(): Promise<TagResponse | undefined> {
    try {
      const response = await this.client.tags.get({
        identifier: this.identifier,
      });
      return response as TagResponse;
    } catch (error) {
      console.error("MarbleCMS fetch error:", error);
      return undefined;
    }
  }
}
