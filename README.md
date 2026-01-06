<p style="text-align:center;" align="center">
  <img src="./post-for-me-logo.png" alt="Post For Me Logo" width="200"/>
</p>

**A single, unified API for social media posting, feeds, and analytics.**

Post For Me is a unified API for social media integrations. Instead of wrestling with TikTok's API, Facebook's Graph API, X's OAuth quirks, and 6 other platform-specific implementations, you integrate once with Post For Me.

## What You Can Build

- **Social Media Schedulers** - Ship with 9 platforms instead of spending months per integration
- **AI Content Tools** - Generate content and publish it everywhere with a single API call
- **Marketing Dashboards** - Pull analytics and manage posts across all platforms in one place
- **Mobile Games** - Let players share achievements to their favorite platforms
- **B2B SaaS** - Add social features without derailing your roadmap

## Why Developers Choose Post For Me

**Ship in hours, not weeks**
One API replaces dozens. Get your first post live the same day you start integrating.

**9 platforms, zero maintenance**
We track API changes, handle deprecations, and manage OAuth flows. You write code once.

**Your brand, not ours**
Bring your own OAuth credentials. Your users see your app name, not ours. True white-label support.

**Transparent pricing**
$10/month for 1,000 posts. $1,000/month for 200,000 posts. No per-seat fees, no account limits, no surprises.

**Open source**
Our codebase is public on GitHub. Self-host if you want, contribute if you'd like, or use our hosted version.

## Supported Platforms

TikTok • Facebook • Instagram • X • LinkedIn • Pinterest • Bluesky • Threads • YouTube

## What You Get

- **Posting** - Create, schedule, and publish text, images, and video across platforms
- **Media Processing** - Auto-optimize media for each platform's requirements
- **OAuth** - Simplified auth flows with automatic token refresh
- **Feeds** - Fetch and display content in a unified format
- **Analytics** - Track engagement across all platforms in one place
- **Webhooks** - Real-time notifications for post status and account connections

## How to Integrate

Choose your integration method:

**REST API** - Single endpoint, consistent interface across all platforms
**SDKs** - TypeScript, Python, Go, Ruby, Kotlin with automatic auth handling
**MCP Server** - AI tool integration for seamless content generation pipelines

Check out the [API documentation](https://api.postforme.dev) to get started.

## Links

- **Website**: [postforme.dev](https://postforme.dev)
- **Dashboard**: [app.postforme.dev](https://app.postforme.dev)
- **API Docs**: [api.postforme.dev](https://api.postforme.dev)
- **GitHub**: [github.com/DayMoonDevelopment](https://github.com/DayMoonDevelopment)
- **Email**: [postforme@daymoon.dev](mailto:postforme@daymoon.dev)

## Getting Started

### Prerequisites

This marketing site is part of a monorepo. The site is standalone but shares components with the dashboard.

### Installation

From the project root:

```bash
bun install
```

### Development

Start the marketing site development server:

```bash
# From project root (recommended)
bun run dev

# Or start just the marketing site (from marketing/ directory)
bun run dev
```

The marketing site will be available at `http://localhost:5174`.

### Environment Setup

Create a `.env.local` file with:

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=

POST_HOG_API_KEY=
POST_HOG_API_HOST=
```

## Content Management

### Adding Blog Posts

1. Create a new `.mdx` file in `app/routes/blog/`
2. Add frontmatter with metadata:

```markdown
---
title: "Your Blog Post Title"
description: "SEO description"
publishedAt: "2024-01-01"
author: "Author Name"
tags: ["social-media", "automation"]
---

Your content here...
```

### Updating Features

Feature content is managed in `app/lib/content/features.ts` with type-safe definitions.

### Pricing Updates

Pricing plans are defined in `app/lib/content/pricing.ts` with structured data for easy updates.

## Building for Production

Create a production build:

```bash
bun run build
```

## Testing

Run the test suite:

```bash
# Run tests once
bun run test

# Watch mode for development
bun run test:watch
```

## Code Quality

```bash
# Lint code
bun run lint

# Fix linting issues
bun run lint:fix

# Type checking
bun run typecheck
```

## SEO Optimization

The marketing site includes:

- **Meta Tags** - Dynamic meta tags for each page
- **Open Graph** - Social media sharing optimization
- **Structured Data** - JSON-LD for search engines
- **Sitemap** - Auto-generated XML sitemap
- **Performance** - Optimized images and lazy loading
- **Accessibility** - WCAG compliant components

## Analytics & Tracking

- **PostHog Integration** - User behavior and conversion tracking
- **Performance Monitoring** - Core Web Vitals tracking
- **A/B Testing** - Feature flags for conversion optimization
- **Conversion Funnels** - Track user journey from landing to signup

## Deployment

### Vercel (Recommended)

The marketing site is optimized for Vercel deployment:

```bash
# Deploy to Vercel
vercel --prod
```

### Other Platforms

The site can be deployed to:

- Netlify
- AWS Amplify
- Google Cloud Run
- Railway
- Fly.io

## Project Structure

```
marketing/
├── app/
│   ├── components/     # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utilities and content
│   ├── providers/     # Context providers
│   ├── routes/        # Page components and routing
│   └── ui/            # Shadcn/ui components
├── public/            # Static assets and images
└── build/             # Production build output
```

## Performance

The marketing site is optimized for:

- **Core Web Vitals** - LCP, FID, and CLS optimization
- **Image Optimization** - WebP format with lazy loading
- **Code Splitting** - Route-based code splitting
- **Caching** - Aggressive caching strategies
- **Bundle Size** - Minimal JavaScript footprint

## Contributing

1. Follow the existing design system and component patterns
2. Optimize for performance and SEO
3. Test on multiple devices and browsers
4. Update content types when adding new content structures
5. Ensure accessibility compliance

---

Built with ❤️ using React Router v7, Tailwind CSS, and modern web technologies.
