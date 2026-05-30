/**
 * Products Page — SERVER COMPONENT (SSG - Static Site Generation)
 *
 * RENDERING STRATEGY: Static Site Generation (SSG)
 * - This page has NO dynamic data — products come from a static JSON file
 * - Next.js pre-renders this page once at BUILD TIME
 * - The same pre-built HTML is served instantly to every user
 * - No server computation happens on each request → very fast
 *
 * SSR vs SSG vs CSR in this project:
 * - This page (SSG): built once at build time, served as static HTML
 * - ProductFilters (CSR): search/filter runs in browser with useState
 * - Product Detail (SSG): generateStaticParams pre-builds all product pages
 *
 * HYDRATION:
 * - Server sends pre-built HTML → browser displays immediately
 * - React hydrates ProductFilters (client component) → search becomes interactive
 * - Suspense boundary shows skeleton while ProductFilters hydrates
 *
 * SEO:
 * - Static metadata export → Next.js injects title + description in <head>
 * - Page content is in server HTML → search crawlers read it immediately
 * - No waiting for JavaScript to load before content is visible to crawlers
 */

import { Suspense } from "react";
import type { Metadata } from "next";
import products from "@/data/products.json";
import ProductFilters from "@/components/ProductFilters";
import SectionHero from "@/components/SectionHero";
import type { Product } from "@/types/product";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse, search, and filter our full range of electronics on TechCart — laptops, mobiles, accessories, wearables and monitors.",
  openGraph: {
    title: "Products | TechCart",
    description: "Browse and filter electronics products on TechCart.",
  },
};

export default function ProductsPage() {
  // This runs on the SERVER at build time — not in the browser
  // Direct JSON import works in server components — no fetch() needed
  const allProducts = products as Product[];

  return (
    <section className="container-page">
      <SectionHero
        eyebrow="Product Listing"
        title="Find your next favorite device"
        description="Explore handpicked laptops, mobiles, accessories, wearables, and monitors with quick search and clean category filtering."
      />
      {/*
        Suspense boundary:
        - Shows loading skeleton while ProductFilters (client component) hydrates
        - Prevents the whole page from blocking while JS loads
        - This is Next.js streaming — server sends HTML above the Suspense
          boundary first, then streams in the ProductFilters content
      */}
      <Suspense
        fallback={
          <div className="space-y-4">
            <div className="h-36 animate-pulse rounded-3xl bg-slate-100" />
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-72 animate-pulse rounded-3xl bg-slate-100" />
              ))}
            </div>
          </div>
        }
      >
        <ProductFilters products={allProducts} />
      </Suspense>
    </section>
  );
}
