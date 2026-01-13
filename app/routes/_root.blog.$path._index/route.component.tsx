import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/route";
import { format } from "date-fns";
import { RawHtml } from "~/components/raw-html";
import { IconChevronLeft } from "@central-icons/outlined";
import { Button } from "~/ui/button";

export default function BlogPost() {
  const { post, relatedPosts } =
    useLoaderData<Route.ComponentProps["loaderData"]>();

  return (
    <div className="container mx-auto px-4 pt-24 max-w-7xl">
      {/* Article */}
      <article className="max-w-4xl mx-auto">
        <Button asChild mode="link" className="mb-6">
          <Link to="/blog">
            <IconChevronLeft />
            All posts
          </Link>
        </Button>

        {/* Featured Image */}
        {post.coverImage ? (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto aspect-video object-cover"
            />
          </div>
        ) : null}

        {/* Article Header */}
        <header className="mb-8 pb-8 border-b">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 mr-18">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-2.5 text-muted-foreground">
            {post.publishedAt ? (
              <time dateTime={post.publishedAt.toISOString()}>
                {format(post.publishedAt, "MMMM d, yyyy")}
              </time>
            ) : null}

            {post.authors && post.authors.length > 0
              ? [
                  <span key="author-dot" aria-hidden="true">
                    •
                  </span>,
                  <span key="author-name">
                    {"by "}
                    <span className="text-foreground">
                      {post.authors[0].name}
                    </span>
                  </span>,
                ]
              : null}
          </div>
        </header>

        {/* Article Content */}
        {post.content ? (
          <div className="mb-12">
            <RawHtml html={post.content} />
          </div>
        ) : null}

        {/* Tags */}
        {post.tags && post.tags.length > 0 ? (
          <div className="mb-12 pb-8 border-b">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 ? (
        <aside className="max-w-4xl mx-auto mt-16 pt-12 border-t">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Related Articles
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <article
                key={relatedPost.id}
                className="group flex flex-col border rounded-lg overflow-hidden transition-shadow hover:shadow-md"
              >
                {relatedPost.coverImage ? (
                  <Link
                    to={`/blog/${relatedPost.slug}`}
                    className="aspect-video overflow-hidden bg-muted"
                  >
                    <img
                      src={relatedPost.coverImage}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                ) : null}

                <div className="flex flex-col flex-1 p-4">
                  {/* Post Meta */}
                  {relatedPost.publishedAt ? (
                    <time
                      dateTime={relatedPost.publishedAt.toISOString()}
                      className="text-xs text-muted-foreground mb-2"
                    >
                      {format(relatedPost.publishedAt, "MMM d, yyyy")}
                    </time>
                  ) : null}

                  {/* Title */}
                  <h3 className="text-base font-semibold tracking-tight mb-2">
                    <Link to={`/blog/${relatedPost.slug}`}>
                      {relatedPost.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  {relatedPost.description ? (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.description}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </aside>
      ) : null}
    </div>
  );
}
