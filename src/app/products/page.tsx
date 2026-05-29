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
  return (
    <section className="container-page">
      <SectionHero
        eyebrow="Product Listing"
        title="Find your next favorite device"
        description="Explore handpicked laptops, mobiles, accessories, wearables, and monitors with quick search and clean category filtering."
      />
      <Suspense fallback={<div className="rounded-3xl bg-white p-8 font-bold text-slate-700 shadow-sm dark-surface">Loading products...</div>}><ProductFilters products={products as Product[]} /></Suspense>
    </section>
  );
}
