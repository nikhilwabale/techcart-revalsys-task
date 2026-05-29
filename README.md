# TechCart - Next.js Product Showcase

TechCart is a mini electronics product showcase website created for the Revalsys Technologies Next.js + AI task.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static JSON data
- LocalStorage cart and authentication demo
- Framer Motion for lightweight drawer animation

## Features

- Home page with attractive hero and featured products
- Product listing page with search and category filter
- Product detail page with image, description, price and add-to-cart
- Cart with quantity increment/decrement and remove option
- Login, Sign Up and Guest user flow
- About and Contact pages
- Contact form validation with success snackbar
- Settings drawer with theme color and font-size preferences
- SEO metadata and proper heading structure
- Responsive layout for mobile, tablet, laptop and desktop

## Static Data

The website content is loaded from local JSON files:

- `src/data/products.json`
- `src/data/users.json`
- `src/data/siteContent.json`

Cart data and login state are stored in browser localStorage.

## Demo Login

```txt
Email: user@techcart.com
Password: 123456
```

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in the browser.

## Build

```bash
npm run build
npm run start
```

## SEO

Each page includes metadata using the Next.js `metadata` API and `generateMetadata` for dynamic routes:

- **Page title** — per-page title with site-wide template (`%s | TechCart`)
- **Meta description** — unique, descriptive description per page
- **OpenGraph tags** — `og:title`, `og:description`, `og:type` on all public pages
- **Keywords** — relevant per-page and per-product keywords
- **Robots control** — `noindex, nofollow` on private pages (cart, login, signup) so only public content is crawled
- **`generateMetadata`** — dynamic SEO metadata for each product detail page, including product name, description, price and category keywords
- **`generateStaticParams`** — pre-renders all product detail pages at build time for fast load and SEO
- **Proper heading hierarchy** — each page uses one `<h1>` (the page title), `<h2>` for major sections, `<h3>` for sub-sections. No heading levels are skipped.
- **Semantic HTML** — `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` used throughout
- **`lang="en"`** — set on the root `<html>` element for screen readers and crawlers

## AI Usage

AI assistance was used for:

- Planning the Next.js folder structure
- Creating reusable component ideas
- Preparing static JSON product and website data
- Improving TypeScript interfaces
- Improving SEO metadata and README content
- Refining UI spacing, responsive layout and settings drawer UX

All generated code was reviewed, adjusted and tested manually.

## Latest UI Polishing

- Added reusable UI components for buttons and brand logo.
- Replaced color theme options with White Theme and Black Theme.
- Added preferences drawer with blurred backdrop, font-size options, and reset action.
- Improved footer spacing, alignment, and business-focused content.
- Improved category spacing and consistent section padding across pages.
- Replaced external product images with local SVG assets for faster loading and smoother navigation.


## Product Images

Product images are loaded from Unsplash image URLs for a more realistic product showcase UI. Next.js Image is used with unoptimized mode for simple assignment execution.
