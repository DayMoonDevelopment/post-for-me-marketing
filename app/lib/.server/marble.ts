import type {
  Category,
  MarbleCategoryListResponse,
  MarblePostListResponse,
  MarblePostResponse,
  MarbleTagListResponse,
  Tag,
} from "./marble.types";

// Base query builder with common pagination
abstract class BaseQueryBuilder<T> {
  protected params: URLSearchParams = new URLSearchParams();
  protected baseUrl: string;
  protected apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  /**
   * Set the maximum number of items per page (1-200) or "all" for all items
   */
  limit(value: number | "all"): this {
    this.params.set("limit", String(value));
    return this;
  }

  /**
   * Set the page number to return (starts at 1)
   */
  page(value: number): this {
    this.params.set("page", String(value));
    return this;
  }

  protected async fetch<R>(endpoint: string): Promise<R | undefined> {
    try {
      const url = new URL(endpoint, this.baseUrl);
      url.search = this.params.toString();

      console.log(`Fetching: ${url.toString()}`);

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`MarbleCMS API error (${response.status}):`, errorText);
        return undefined;
      }

      const data: R = await response.json();
      return data;
    } catch (error) {
      console.error("MarbleCMS fetch error:", error);
      return undefined;
    }
  }

  abstract get(): Promise<T | undefined>;
}

// Posts query builder with all filtering, sorting, and search options
export class PostsQueryBuilder extends BaseQueryBuilder<MarblePostListResponse> {
  private endpoint: string;

  constructor(baseUrl: string, apiKey: string, endpoint = "/v1/posts") {
    super(baseUrl, apiKey);
    this.endpoint = endpoint;
  }

  /**
   * Sort order by publishedAt date (default: "desc")
   */
  order(value: "asc" | "desc"): this {
    this.params.set("order", value);
    return this;
  }

  /**
   * Filter by category slugs (comma-separated)
   */
  categories(...slugs: string[]): this {
    if (slugs.length > 0) {
      this.params.set("categories", slugs.join(","));
    }
    return this;
  }

  /**
   * Exclude category slugs (comma-separated)
   */
  excludeCategories(...slugs: string[]): this {
    if (slugs.length > 0) {
      this.params.set("excludeCategories", slugs.join(","));
    }
    return this;
  }

  /**
   * Filter by tag slugs (comma-separated, matches any)
   */
  tags(...slugs: string[]): this {
    if (slugs.length > 0) {
      this.params.set("tags", slugs.join(","));
    }
    return this;
  }

  /**
   * Exclude tag slugs (comma-separated)
   */
  excludeTags(...slugs: string[]): this {
    if (slugs.length > 0) {
      this.params.set("excludeTags", slugs.join(","));
    }
    return this;
  }

  /**
   * Full-text search across title and content
   */
  search(query: string): this {
    if (query.trim()) {
      this.params.set("query", query);
    }
    return this;
  }

  /**
   * Format of the content field (default: "html")
   */
  format(format: "html" | "markdown"): this {
    this.params.set("format", format);
    return this;
  }

  /**
   * Execute the query and fetch posts
   */
  async get(): Promise<MarblePostListResponse | undefined> {
    return this.fetch<MarblePostListResponse>(this.endpoint);
  }
}

// Single post query builder
export class SinglePostQueryBuilder extends BaseQueryBuilder<MarblePostResponse> {
  private identifier: string;

  constructor(baseUrl: string, apiKey: string, identifier: string) {
    super(baseUrl, apiKey);
    this.identifier = identifier;
  }

  /**
   * Format of the content field (default: "html")
   */
  format(format: "html" | "markdown"): this {
    this.params.set("format", format);
    return this;
  }

  /**
   * Execute the query and fetch the post
   */
  async get(): Promise<MarblePostResponse | undefined> {
    return this.fetch<MarblePostResponse>(`/v1/posts/${this.identifier}`);
  }
}

// Categories query builder
export class CategoriesQueryBuilder extends BaseQueryBuilder<MarbleCategoryListResponse> {
  constructor(baseUrl: string, apiKey: string) {
    super(baseUrl, apiKey);
  }

  /**
   * Execute the query and fetch categories
   */
  async get(): Promise<MarbleCategoryListResponse | undefined> {
    return this.fetch<MarbleCategoryListResponse>("/v1/categories");
  }
}

// Single category query builder
export class SingleCategoryQueryBuilder extends BaseQueryBuilder<{
  category: Category;
}> {
  private identifier: string;

  constructor(baseUrl: string, apiKey: string, identifier: string) {
    super(baseUrl, apiKey);
    this.identifier = identifier;
  }

  /**
   * Execute the query and fetch the category
   */
  async get(): Promise<{ category: Category } | undefined> {
    return this.fetch<{ category: Category }>(
      `/v1/categories/${this.identifier}`,
    );
  }
}

// Tags query builder
export class TagsQueryBuilder extends BaseQueryBuilder<MarbleTagListResponse> {
  constructor(baseUrl: string, apiKey: string) {
    super(baseUrl, apiKey);
  }

  /**
   * Execute the query and fetch tags
   */
  async get(): Promise<MarbleTagListResponse | undefined> {
    return this.fetch<MarbleTagListResponse>("/v1/tags");
  }
}

// Single tag query builder
export class SingleTagQueryBuilder extends BaseQueryBuilder<{ tag: Tag }> {
  private identifier: string;

  constructor(baseUrl: string, apiKey: string, identifier: string) {
    super(baseUrl, apiKey);
    this.identifier = identifier;
  }

  /**
   * Execute the query and fetch the tag
   */
  async get(): Promise<{ tag: Tag } | undefined> {
    return this.fetch<{ tag: Tag }>(`/v1/tags/${this.identifier}`);
  }
}

// Main MarbleCMS client with query builder methods
export class MarbleCMS {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.MARBLE_API_URL!;
    this.apiKey = process.env.MARBLE_API_KEY!;

    if (!this.baseUrl || !this.apiKey) {
      console.error("MarbleCMS: Missing environment variables!");
      console.error("MARBLE_API_URL:", this.baseUrl || "(not set)");
      console.error(
        "MARBLE_API_KEY:",
        this.apiKey ? "(set)" : "(not set)",
      );
    }
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
    return new PostsQueryBuilder(this.baseUrl, this.apiKey);
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
    return new SinglePostQueryBuilder(this.baseUrl, this.apiKey, identifier);
  }

  /**
   * Query categories with pagination
   * @example
   * ```ts
   * const categories = await marble.categories().limit(20).get();
   * ```
   */
  categories(): CategoriesQueryBuilder {
    return new CategoriesQueryBuilder(this.baseUrl, this.apiKey);
  }

  /**
   * Get a single category by slug or ID
   * @example
   * ```ts
   * const category = await marble.category("tutorials").get();
   * ```
   */
  category(identifier: string): SingleCategoryQueryBuilder {
    return new SingleCategoryQueryBuilder(
      this.baseUrl,
      this.apiKey,
      identifier,
    );
  }

  /**
   * Query tags with pagination
   * @example
   * ```ts
   * const tags = await marble.tags().limit(50).get();
   * ```
   */
  tags(): TagsQueryBuilder {
    return new TagsQueryBuilder(this.baseUrl, this.apiKey);
  }

  /**
   * Get a single tag by slug or ID
   * @example
   * ```ts
   * const tag = await marble.tag("beginner").get();
   * ```
   */
  tag(identifier: string): SingleTagQueryBuilder {
    return new SingleTagQueryBuilder(this.baseUrl, this.apiKey, identifier);
  }

  // Legacy methods for backward compatibility (deprecated)
  /**
   * @deprecated Use marble.posts().get() instead
   */
  async getPosts(): Promise<MarblePostListResponse | undefined> {
    return this.posts().get();
  }

  /**
   * @deprecated Use marble.tags().get() instead
   */
  async getTags(): Promise<MarbleTagListResponse | undefined> {
    return this.tags().get();
  }

  /**
   * @deprecated Use marble.post(slug).get() instead
   */
  async getSinglePost(slug: string): Promise<MarblePostResponse | undefined> {
    return this.post(slug).get();
  }

  /**
   * @deprecated Use marble.categories().get() instead
   */
  async getCategories(): Promise<MarbleCategoryListResponse | undefined> {
    return this.categories().get();
  }

  /**
   * @deprecated Use marble.posts().categories(categorySlug).tags(tagSlug).get() instead
   */
  async getPostsByTag(
    tagSlug: string,
    categorySlug: string = "resources",
  ): Promise<MarblePostListResponse | undefined> {
    return this.posts().categories(categorySlug).tags(tagSlug).get();
  }

  /**
   * @deprecated Use marble.tag(tagSlug).get() instead
   */
  async getTagBySlug(tagSlug: string): Promise<{ tag: Tag } | undefined> {
    return this.tag(tagSlug).get();
  }
}
