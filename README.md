# Ruta Colombia

Content hub / magazine site about Colombia — part of The Maia Group ecosystem.

Built with Next.js 14 (App Router), Tailwind CSS, MDX articles, and static export for Netlify.

## Tech Stack

- **Framework:** Next.js 14 (App Router, static export)
- **Styling:** Tailwind CSS
- **Content:** MDX files with gray-matter frontmatter
- **Deployment:** Netlify (static)
- **Monetization:** Google AdSense (ca-pub-2469196723812841) + internal Maia Group brand banners

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Articles

Create a new `.mdx` file in `src/content/articles/` with the following frontmatter:

```mdx
---
title: "Article Title"
excerpt: "Brief excerpt for cards and meta description"
category: "things-to-do"  # must match a slug in src/lib/categories.ts
date: "2026-04-01"
author: "Author Name"
readingTime: "8 min"
featured: false
tags: ["tag1", "tag2"]
metaTitle: "SEO Title"
metaDescription: "SEO meta description"
---

Article content in Markdown...
```

**Available categories:** real-estate, legal, food-drink, jobs, marine, things-to-do, community

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # Reusable UI components
├── content/       # MDX article files
└── lib/           # Utilities (article loading, category config)
```

## Deployment

Push to GitHub and connect to Netlify. The `netlify.toml` is pre-configured. Make sure to set `NODE_VERSION=20` in environment variables.

## Maia Group Brand Integration

Each article category has a mapped Maia Group brand that appears in:
- Article sidebars (`MaiaAd variant="sidebar"`)
- Mid-article inline banners (`MaiaAd variant="inline"`)
- Category page sidebars

Brand mapping is configured in `src/lib/categories.ts`.
