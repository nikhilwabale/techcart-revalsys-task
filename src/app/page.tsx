/**
 * Home Page — Server Component (SSG)
 *
 * RENDERING STRATEGY: Static Site Generation (SSG)
 * - No "use client" directive → this is a SERVER component
 * - Runs on server at BUILD TIME (npm run build), not on every request
 * - Data (products, siteContent) imported directly from JSON — no fetch() needed
 * - Next.js pre-builds this page as static HTML once → served instantly to all users
 *
 * SSR vs SSG — what's the difference here?
 * - SSR: server builds HTML on EVERY request → fresh but slower
 * - SSG: server builds HTML ONCE at build time → instant, cached, same for everyone
 * - This page uses SSG because product data doesn't change per request
 *
 * HYDRATION:
 * - Server sends complete HTML with hero, stats, featured products
 * - Browser displays everything immediately (no blank flash)
 * - React hydrates in background → ProductCard animations activate
 * - "use client" components (ProductCard, AddToCartButton) hydrate separately
 *
 * PERFORMANCE:
 * - priority on hero image → browser preloads it immediately (improves LCP score)
 * - prefetch on CTA link → /products page pre-fetched in background
 * - Static data import → zero network requests for data
 * - All featured products rendered server-side → zero layout shift
 *
 * SEO:
 * - metadata exported → Next.js injects <title> and <meta description> in <head>
 * - openGraph → social media preview cards (LinkedIn, WhatsApp, Twitter)
 * - h1 for main heading, h2 for "Featured Products" section — proper hierarchy
 * - All content in server HTML → Google crawler reads it without running JS
 */

import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import products from "@/data/products.json";
import siteContent from "@/data/siteContent.json";
import ProductCard from "@/components/ProductCard";
import { LinkButton } from "@/components/Button";
import type { Product } from "@/types/product";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Explore premium featured electronics on TechCart — laptops, mobiles, wearables and accessories. Fast, responsive Next.js product showcase.",
  openGraph: {
    title: "TechCart | Electronics Product Showcase",
    description: "Explore featured laptops, mobiles, wearables and accessories on TechCart.",
  },
};

// This function runs on SERVER at build time — never in the browser
export default function HomePage() {
  const featuredProducts = (products as Product[]).filter((p) => p.featured);
  const heroProduct = featuredProducts[0];
  const categories = Array.from(new Set((products as Product[]).map((p) => p.category)));

  return (
    <div>
      {/* ── HERO SECTION ── Server-rendered, no JS needed to display */}
      <section className="relative overflow-hidden bg-slate-950 text-white" aria-label="Hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(37,99,235,.35),transparent_30rem),radial-gradient(circle_at_86%_10%,rgba(6,182,212,.24),transparent_28rem)]" />
        <div className="container-page relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.02fr_.98fr] lg:py-20 xl:py-24">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-cyan-100 backdrop-blur">
              {siteContent.hero.subtitle}
            </p>
            {/* h1 — one per page, main page heading for SEO */}
            <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              {siteContent.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {siteContent.hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {/* prefetch — Next.js silently loads /products page in background */}
              <Link
                href="/products"
                prefetch
                className="rounded-2xl bg-white px-7 py-4 text-center font-black text-slate-950 dark-text shadow-xl hover:-translate-y-0.5 hover:bg-cyan-50"
              >
                {siteContent.hero.ctaText}
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              {siteContent.hero.stats.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
                  <p className="text-sm font-black text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur-xl sm:p-4">
            <div className="rounded-[1.5rem] bg-white p-3 text-slate-950 dark-text dark-surface shadow-2xl sm:p-4">
              <div className="relative h-64 overflow-hidden rounded-3xl bg-slate-100 sm:h-80 lg:h-96">
                <Image
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  fill
                  priority        // ← PERFORMANCE: preloads hero image — improves LCP
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 45vw"  // ← PERFORMANCE: correct size per viewport
                  className="object-cover"
                />
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-sm font-black uppercase tracking-wide text-blue-700">Featured deal</p>
                <h2 className="mt-2 text-2xl font-black sm:text-3xl">{heroProduct.name}</h2>
                <p className="mt-2 leading-7 text-slate-600 dark-muted">{heroProduct.description}</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4 dark-soft">
                  <span className="text-2xl font-black">₹{heroProduct.price.toLocaleString("en-IN")}</span>
                  <span className="rounded-full bg-amber-50 px-3 py-1 font-bold text-amber-700">★ {heroProduct.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY SECTION ── Server-rendered links, SEO-friendly */}
      <section className="container-page home-category-section py-10 sm:py-14" aria-label="Product categories">
        <h2 className="sr-only">Browse by Category</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              prefetch
              className="rounded-3xl border border-slate-200 bg-white p-7 text-center font-black text-slate-800 shadow-sm hover:-translate-y-1 hover:brand-border hover:brand-text hover:shadow-lg dark-surface dark-border dark-text"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── 
          Server renders product cards as static HTML
          React hydrates each ProductCard (client component) for animations + cart
      */}
      <section className="container-page home-featured-section pb-12 sm:pb-14" aria-label="Featured products">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-wide brand-text">Curated products</p>
            {/* h2 — section heading, correctly below h1 */}
            <h2 className="mt-2 text-3xl font-black text-slate-950 dark-text sm:text-4xl">Featured Products</h2>
            <p className="mt-3 max-w-2xl text-slate-600 dark-muted">
              Explore popular electronics selected for daily productivity, entertainment and smart living.
            </p>
          </div>
          <LinkButton href="/products" variant="soft" size="md">
            View all products →
          </LinkButton>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            // ProductCard is memoized (React.memo) — only re-renders if product changes
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
