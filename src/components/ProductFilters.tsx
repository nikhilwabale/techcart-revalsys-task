"use client";

/**
 * ProductFilters — Client Component
 *
 * WHY "use client"?
 * - useState for search text and selected category — needs browser state
 * - useEffect to sync URL params — needs browser APIs
 * - onChange handlers on inputs — needs event listeners
 *
 * SSG + CSR COMBINATION (how this page works):
 * 1. Products page (server) pre-builds static HTML at build time (SSG)
 * 2. ProductFilters (client) is wrapped in <Suspense> 
 * 3. Server streams the page shell + SectionHero immediately
 * 4. ProductFilters hydrates in browser → search and filter become interactive
 * 5. User types in search → useState updates → useMemo refilters → re-renders
 *
 * This pattern = best of both worlds:
 * - Static HTML for SEO (crawlers see product content)
 * - Dynamic filtering in browser (no page reload needed)
 *
 * PERFORMANCE:
 * - categories useMemo → only recomputes when products array changes (never, it's static)
 * - filteredProducts useMemo → only recomputes when searchText or selectedCategory changes
 * - WITHOUT useMemo: filter runs on EVERY render (typing, clicking, any state change)
 * - WITH useMemo: filter only runs when its specific dependencies change
 *
 * HYDRATION NOTE:
 * - initialCategory from URL params is read AFTER hydration
 * - Before hydration: all products shown (server default)
 * - After hydration: filtered by URL category param if present
 */

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

interface ProductFiltersProps {
  products: Product[];
}

export default function ProductFilters({ products }: ProductFiltersProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "All";
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Sync category when URL changes (e.g. clicking category from home page)
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") ?? "All");
  }, [searchParams]);

  // useMemo — categories list only recomputed when products array changes
  // In this project products never change, so this runs exactly ONCE
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  // useMemo — filtered list only recomputed when search or category changes
  // PERFORMANCE: prevents re-filtering on every single keystroke if category didn't change
  const filteredProducts = useMemo(() => {
    const search = searchText.toLowerCase();
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search);
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchText, selectedCategory]);

  return (
    <section aria-label="Product search and filter" className="space-y-8 sm:space-y-10">
      {/* Search + Filter controls — interactive after hydration */}
      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7 dark-surface dark-border">
        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <label className="block">
            <span className="mb-2 block text-sm font-black text-slate-700 dark-text">Search Products</span>
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search laptop, mobile, headphones..."
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 dark-soft font-semibold focus-ring focus:bg-white"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-black text-slate-700 dark-text">Category</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 dark-soft font-semibold focus-ring focus:bg-white"
            >
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
        </div>
        {/* Category pill buttons */}
        <div className="mt-6 flex flex-wrap gap-3 py-3 sm:mt-7">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-3 text-sm font-black shadow-sm ${
                selectedCategory === category
                  ? "brand-bg text-white"
                  : "bg-slate-100 text-slate-700 dark-text hover:brand-soft dark-soft dark-text"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <p className="font-bold text-slate-600 dark-muted">
        Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
      </p>

      {filteredProducts.length > 0 ? (
        // motion.div layout — animates grid when items are filtered in/out
        <motion.div layout className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            // ProductCard wrapped in React.memo — won't re-render unless product changes
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      ) : (
        <div className="rounded-3xl bg-white p-12 dark-surface text-center shadow-sm">
          <p className="text-xl font-black text-slate-900 dark-text">No products found</p>
          <p className="mt-2 text-slate-600 dark-muted">Try another search term or category.</p>
        </div>
      )}
    </section>
  );
}
