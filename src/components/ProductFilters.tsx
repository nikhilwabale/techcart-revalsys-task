"use client";

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

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") ?? "All");
  }, [searchParams]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((product) => product.category)))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const search = searchText.toLowerCase();
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
      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7 dark-surface dark-border">
        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <label className="block">
            <span className="mb-2 block text-sm font-black text-slate-700 dark-text">Search Products</span>
            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search laptop, mobile, headphones..."
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 dark-soft font-semibold focus-ring focus:bg-white"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-black text-slate-700 dark-text">Category</span>
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 dark-soft font-semibold focus-ring focus:bg-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 py-3 sm:mt-7">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-3 text-sm font-black shadow-sm ${selectedCategory === category ? "brand-bg text-white" : "bg-slate-100 text-slate-700 dark-text hover:brand-soft dark-soft dark-text"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <p className="font-bold text-slate-600 dark-muted">Showing {filteredProducts.length} product(s)</p>

      {filteredProducts.length > 0 ? (
        <motion.div layout className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      ) : (
        <div className="rounded-3xl bg-white p-12 dark-surface text-center shadow-sm">
          <p className="text-xl font-black text-slate-900">No products found</p>
          <p className="mt-2 text-slate-600 dark-muted">Try another search term or category.</p>
        </div>
      )}
    </section>
  );
}
