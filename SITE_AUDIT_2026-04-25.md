# Ruta Colombia — Full Site Audit
**Date:** 2026-04-25  
**Audited by:** Claude (Cowork)  
**Scope:** All source files in repo excluding node_modules, .git, .next, out/

---

## Summary

| Severity | Count |
|----------|-------|
| 🔴 CRITICAL | 5 |
| 🟠 HIGH | 7 |
| 🟡 MEDIUM | 6 |
| 🔵 LOW | 4 |

---

## 🔴 CRITICAL

---

### C-1 — Wrong WhatsApp number in Next.js app shell
**File:** `src/app/layout.tsx` — **Line 96**  
**Code found:**
```
href="https://wa.me/573226026526"
```
**Should be:** `https://wa.me/19034598763`

Every single page served by the Next.js app (all city, category, and article pages) has a floating WhatsApp button pointing to the **wrong number** (`+57 322 602 6526`). All 11 blog HTML files and `index.html` already use the correct number (`19034598763`). This is the single most urgent fix — every visitor who clicks the WhatsApp button on any Next.js-served page reaches the wrong contact.

**Fix:** Change line 96 of `layout.tsx`:
```tsx
href="https://wa.me/19034598763"
```

---

### C-2 — GA4 tag entirely absent from Next.js app
**File:** `src/app/layout.tsx` — **No GA4/GTM tag exists**

`layout.tsx` loads AdSense and fonts but has **zero analytics tracking**. There is no `gtag`, no GTM, no `next/third-parties/google` tag — nothing. Every page in the Next.js app (all `/medellin/`, `/bogota/`, `/cartagena/`, `/santa-marta/`, and all article pages) fires **no analytics whatsoever**.

This is separate from the blog file issue below (C-3). The Next.js app and the legacy blog/index are two different surfaces; both are broken, in different ways.

**Fix:** Add GA4 to `layout.tsx` using Next.js's `Script` component (afterInteractive):
```tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-H5TBPYHRWE"
  strategy="afterInteractive"
/>
<Script id="ga4-init" strategy="afterInteractive">
  {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-H5TBPYHRWE',{anonymize_ip:true});`}
</Script>
```

---

### C-3 — GA4 placeholder `G-XXXXXXXXXX` in all legacy HTML files (22 occurrences)
**Files:** All 11 blog HTML files + `index.html` — **2 occurrences per file**

Every legacy file still has the unset placeholder instead of the real Measurement ID. Analytics data for all blog traffic is being silently discarded.

| File | Lines |
|------|-------|
| `blog/bogota-3-dias-itinerario.html` | 57, 62 |
| `blog/cano-cristales-como-llegar.html` | 57, 62 |
| `blog/villa-de-leyva-que-ver.html` | 57, 62 |
| `blog/colombia-10-dias-itinerario.html` | 47, 52 |
| `blog/eje-cafetero-que-hacer.html` | 47, 52 |
| `blog/guatape-desde-medellin.html` | 47, 52 |
| `blog/itinerario-cartagena-3-dias.html` | 47, 52 |
| `blog/mejor-epoca-viajar-colombia.html` | 23, 28 |
| `blog/parque-tayrona-como-llegar.html` | 23, 28 |
| `blog/salento-valle-cocora.html` | 23, 28 |
| `blog/san-andres-que-hacer.html` | 23, 28 |
| `index.html` | 51, 56 |

**Fix:** Global find-and-replace `G-XXXXXXXXXX` → `G-H5TBPYHRWE` across all 12 files.

---

### C-4 — Consent banner links to non-existent page
**File:** `consent-banner.js` — **Line 81**  
**Code found:**
```html
<a href="/privacidad.html" target="_blank">políticas de privacidad</a>
```
The path `/privacidad.html` **does not exist** in this Next.js static export. The actual privacy page is at `/privacy/`. Every user who clicks the privacy policy link inside the consent banner gets a 404. This is a GDPR/Ley 1581 compliance failure — the consent banner must link to a working privacy policy.

**Fix:** Change to `href="/privacy/"` on line 81 of `consent-banner.js`.

---

### C-5 — Consent banner not loaded in Next.js app at all
**File:** `src/app/layout.tsx` — **No reference to consent-banner.js**

`consent-banner.js` is loaded in `index.html` (line 50) and all 11 blog HTML files. It is **not loaded anywhere in the Next.js app**. This means every visitor landing on any city, category, or article page receives **no cookie consent banner** — a direct violation of GDPR and Colombia's Ley 1581 de 2012.

**Fix:** Add to `layout.tsx` `<head>` or as an afterInteractive Script:
```tsx
<Script src="/consent-banner.js" strategy="afterInteractive" />
```

---

## 🟠 HIGH

---

### H-1 — No favicon.ico
**File:** `src/app/layout.tsx` — **Line 75**  
```tsx
<link rel="icon" href="/favicon.ico" />
```
There is no `favicon.ico` anywhere in the `public/` directory or the repo root. All browsers will display a broken/default tab icon and make a failing 404 request on every page load.

**Fix:** Add a `favicon.ico` (or `favicon.png`) to `public/`.

---

### H-2 — OG image missing from global metadata
**File:** `src/app/layout.tsx` — **Lines 39–47**

The `openGraph` metadata block has `type`, `locale`, `url`, `siteName`, `title`, and `description` — but **no `images` array**. Social shares of any page on ruta-colombia.com will show a blank/default preview card with no image. This significantly degrades click-through rate from social media.

**Fix:** Add an OG image to the metadata in `layout.tsx`:
```tsx
openGraph: {
  ...
  images: [{ url: 'https://ruta-colombia.com/og-default.jpg', width: 1200, height: 630 }],
},
```
Then add a corresponding image at `public/og-default.jpg`.

---

### H-3 — Category navigation hardcoded to Medellín
**Files:**  
- `src/components/Header.tsx` — **Lines 96, 137**  
- `src/components/Footer.tsx` — **Line 66**

All category links in the desktop nav bar, mobile nav, and footer link to `/medellin/{category}/`. A user browsing the Bogotá or Cartagena section who clicks "Real Estate" or "Food & Drink" in the nav is silently redirected to Medellín's content. This affects every page on the site.

**Fix:** The category nav should either (a) link to a top-level category hub page, or (b) be context-aware using the current city from the URL. At minimum, consider removing the city prefix from the nav bar links until a proper solution is in place.

---

### H-4 — "santa-marta-insider" old brand name persists in codebase
**Files:**  
- `src/app/globals.css` — **Line 2** (file path comment: `/* File: santa-marta-insider/src/app/globals.css */`)  
- `package-lock.json` — **Lines 2, 8** (`"name": "santa-marta-insider"`)

The old brand name is visible in the CSS file header comment (visible to anyone who inspects source) and is embedded in the lock file. While `package.json` itself is correctly named `ruta-colombia`, the lock file will confuse contributors and may surface in tooling.

**Fix:**
- `globals.css` line 2: Update comment to `/* File: ruta-colombia/src/app/globals.css */`
- Run `npm install` after updating `package.json` if it hasn't been re-locked since the rename, or manually update the `"name"` field in `package-lock.json` lines 2 and 8.

---

### H-5 — Duplicate content MDX files causing SEO cannibalization risk
Multiple cities have two versions of the same article — old slugs and new 2026/renamed slugs. If both are rendered as live pages, Google will see duplicate content competing for the same keywords.

| City | Duplicate pair |
|------|---------------|
| Barranquilla | `cost-of-living-barranquilla.mdx` + `cost-of-living-barranquilla-2026.mdx` |
| Bogotá | `cost-of-living-bogota.mdx` + `cost-of-living-bogota-2026.mdx` |
| Bogotá | `best-neighbourhoods-bogota.mdx` + `best-neighborhoods-bogota-expats.mdx` |
| Cartagena | `cost-of-living-cartagena.mdx` + `cost-of-living-cartagena-2026.mdx` |
| Cartagena | `best-neighbourhoods-cartagena.mdx` + `best-neighborhoods-cartagena.mdx` |
| Medellín | `cost-of-living-medellan.mdx` + `cost-of-living-medellin-2026.mdx` |
| Medellín | `best-neighbourhoods-medellan.mdx` + `best-neighborhoods-medellin-expats.mdx` |
| Santa Marta | `cost-of-living-santa-marta.mdx` + `costo-de-vida-santa-marta-2026.mdx` |
| Santa Marta | `best-restaurants-santa-marta.mdx` + `mejores-restaurantes-santa-marta.mdx` |
| Santa Marta | `best-neighbourhoods-santa-marta.mdx` + `guia-barrios-santa-marta.mdx` |

**Fix:** For each pair, decide which slug is canonical. Delete or unpublish the old one. If the old URL has backlinks, add a 301 redirect in `netlify.toml`.

---

### H-6 — Medellín filename typo across 5 article files
**Directory:** `src/content/articles/medellin/`

Five files use the typo `medellan` (missing the second `l`) in their filenames. These will generate URLs with the typo if the slug is derived from the filename:

- `best-neighbourhoods-medellan.mdx`
- `best-restaurants-medellan.mdx`
- `cost-of-living-medellan.mdx`
- `digital-nomad-guide-medellan.mdx`
- `nightlife-medellan.mdx`
- `things-to-do-medellan.mdx`

**Fix:** Rename all six files (`medellan` → `medellin`). Add 301 redirects in `netlify.toml` for each old URL if the pages are already indexed.

---

### H-7 — `globals.css.bak` backup file in production repo
**File:** `src/app/globals.css.bak`

A `.bak` backup of the main stylesheet is committed to the repo. It contains old teal color values (`#0d9488`) that differ from the current design system. This file should never be in a production repo — it will confuse contributors, may be accidentally imported, and exposes design system history unnecessarily.

**Fix:** Delete `src/app/globals.css.bak` and add `*.bak` to `.gitignore`.

---

## 🟡 MEDIUM

---

### M-1 — "Coming soon" visible on city and about pages
**Files:**  
- `src/app/[city]/page.tsx` — **Line 149**: text `"Content coming soon"` rendered when an article grid slot has no content  
- `src/app/about/page.tsx` — **Line 52**: `<strong>Cartagena, Bogotá, Cali</strong> — Coming soon.`

Both are visible to real users on production pages. The About page explicitly tells visitors that three major cities aren't covered yet, which undermines credibility. The city page slot renders an empty/placeholder card.

**Fix:** Either populate the content or redesign these states to gracefully exclude the empty slot rather than showing "coming soon" text.

---

### M-2 — `lang="en"` hardcoded for Spanish-language pages
**File:** `src/app/layout.tsx` — **Line 72**
```tsx
<html lang="en">
```
Multiple articles are in Spanish (e.g., `guia-parque-tayrona`, `costo-de-vida-santa-marta-2026`, `visa-para-vivir-en-colombia`, `mejores-restaurantes-santa-marta`). Setting `lang="en"` on Spanish content causes accessibility tools to mispronounce content and hurts SEO for Spanish-language search queries.

**Fix:** The article page template (`src/app/[city]/[category]/[slug]/page.tsx`) should detect the article's language from frontmatter and set `<html lang="es">` or `<html lang="en">` accordingly. As a stopgap, since the site targets bilingual (EN/ES) content, consider `lang="es"` as the default or `lang="es-CO"`.

---

### M-3 — No Twitter/X card image in metadata
**File:** `src/app/layout.tsx` — **Lines 48–52**

The `twitter` metadata object has `card: 'summary_large_image'` but no `images` property. Declaring `summary_large_image` without an image causes Twitter/X to fall back to a small card, defeating the purpose. Requires the same OG image fix as H-2.

**Fix:** Add `images: ['https://ruta-colombia.com/og-default.jpg']` to the twitter metadata block.

---

### M-4 — Footer category links broken for non-Medellín visitors (UX impact)
*(Overlaps with H-3, but specifically the footer — which persists on every page)*  
**File:** `src/components/Footer.tsx` — **Line 66**  
```tsx
href={`/medellin/${cat.slug}/`}
```
The footer's "Categories" column always links to Medellín's version. A user on the Bogotá section who clicks "Nightlife" in the footer lands on Medellín nightlife. This is a subtle but consistent UX failure that affects every page.

---

### M-5 — Static `sitemap.xml` conflicts with dynamic `src/app/sitemap.ts`
**Files:**  
- `sitemap.xml` (repo root, static)  
- `src/app/sitemap.ts` (Next.js dynamic sitemap)  
- `out/sitemap.xml` (built output)

There are three sitemap files. It's unclear whether the static root `sitemap.xml` is deployed or if the built `out/sitemap.xml` is the authoritative one. If Netlify serves the static one, it may be stale and miss dynamically generated article pages.

**Fix:** Confirm which sitemap Netlify serves. If the Next.js dynamic `sitemap.ts` is generating the correct output at build time, delete the static root `sitemap.xml` and root `robots.txt` to avoid confusion (the `public/` versions will be used instead).

---

### M-6 — `html lang` mismatch also affects blog files
**Files:** All 11 blog HTML files

Quick sample check: the blog files use `<html lang="es">` (correct for Spanish content) while `layout.tsx` uses `lang="en"` globally. This is inconsistent — confirm and align.

---

## 🔵 LOW

---

### L-1 — `package-lock.json` still carries old name
**File:** `package-lock.json` — **Lines 2, 8**  
`"name": "santa-marta-insider"` — the lock file was generated before the project rename. `package.json` itself is correct (`"name": "ruta-colombia"`). Low risk but worth cleaning up for contributor clarity. Fix by deleting `package-lock.json` and running `npm install` to regenerate it.

---

### L-2 — Unsplash hero images not locally hosted
**File:** `src/app/page.tsx` and `src/components/PhotoCarousel.tsx`  
Carousel images use Unsplash CDN URLs with specific photo IDs. If Unsplash removes a photo or the CDN has an outage, hero images go blank. Consider downloading key hero images and hosting them in `public/images/` for reliability.

---

### L-3 — `globals.css` contains developer implementation notes
**File:** `src/app/globals.css` — **Lines 7–41**  
Comments like `/* FIX: Changed --teal-primary... */` and inline refactoring notes are committed in the production CSS. They're harmless but add weight and expose internal decisions. Move to a `docs/` file or a GitHub issue.

---

### L-4 — Footer "Categories" column hardlinks don't include all cities
**File:** `src/components/Footer.tsx` — **Line 66**  
Categories in the footer always go to `/medellin/{cat.slug}/`. If a category doesn't have any Medellín articles yet, the user lands on an empty page with no explanation. A better UX would be a category hub page at `/{category}/` that lists all cities.

---

## ✅ Things Working Correctly

| Area | Status |
|------|--------|
| Viewport meta tag | ✅ `layout.tsx:8–12` — width, initialScale, viewportFit all set |
| Mobile hamburger nav | ✅ `Header.tsx:75–87` — present, accessible, 44px min touch target |
| Mobile touch targets | ✅ All mobile nav items use `min-h-[44px]` |
| Title & meta description | ✅ `layout.tsx:19–24` — full title template and description |
| OG title/description/url | ✅ Present in layout.tsx (image missing, see H-2) |
| Privacy page | ✅ Exists at `src/app/privacy/page.tsx` |
| Terms page | ✅ Exists at `src/app/terms/page.tsx` |
| Privacy/Terms in footer | ✅ `Footer.tsx:116–118` — both linked |
| Schema.org structured data | ✅ `SchemaOrg.tsx` with WebSite + Article schemas |
| Static export config | ✅ `next.config.mjs` — `output: 'export'`, `trailingSlash: true` |
| robots.txt | ✅ `public/robots.txt` — permissive, correct sitemap URL |
| ads.txt | ✅ Valid AdSense publisher ID `pub-2469196723812841` |
| Consent banner JS logic | ✅ Well-structured, GDPR + Ley 1581 compliant flow |
| Blog HTML WhatsApp | ✅ All 11 blog files use correct `19034598763` |
| `index.html` WhatsApp | ✅ Correct `19034598763` |
| No Lorem Ipsum / TBD content | ✅ None found in article MDX files |
| No `console.log` in production | ✅ None found in `src/` |
| No hardcoded localhost URLs | ✅ None found in `src/` |
| Horizontal scroll risk | ✅ No fixed-width overflow patterns found |

---

## Priority Fix Order

1. **Right now:** Fix WhatsApp number in `layout.tsx:96` — 5-second change, highest user impact
2. **Right now:** Add GA4 to `layout.tsx` — currently zero analytics on all app pages
3. **Right now:** Replace all `G-XXXXXXXXXX` → `G-H5TBPYHRWE` in 12 legacy files
4. **Right now:** Fix consent banner privacy link (`/privacidad.html` → `/privacy/`)
5. **Right now:** Add consent banner Script to `layout.tsx`
6. **Next deploy:** Add `favicon.ico` to `public/`
7. **Next deploy:** Add OG image to `layout.tsx` metadata + create `public/og-default.jpg`
8. **Soon:** Fix category nav hardcoded to `/medellin/`
9. **Soon:** Resolve duplicate MDX file pairs (10 pairs)
10. **Soon:** Rename 6 `medellan`-typo article files
11. **Cleanup:** Delete `globals.css.bak`, update globals.css comment, regenerate package-lock.json
