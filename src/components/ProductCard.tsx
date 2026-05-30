"use client";

/**
 * ProductCard — Client Component
 *
 * HYDRATION NOTE:
 * This component is marked "use client" because it uses:
 * - framer-motion animations (needs browser APIs)
 * - AddToCartButton (needs CartContext which is client-side)
 *
 * HOW HYDRATION WORKS HERE:
 * 1. Server renders static HTML shell of this card (fast, SEO-readable)
 * 2. Next.js sends that HTML to browser immediately
 * 3. React then "hydrates" — attaches event listeners and motion animations
 * 4. Card becomes interactive (hover effects, add to cart)
 *
 * PERFORMANCE:
 * - Wrapped in React.memo so card only re-renders if its product prop changes
 * - whileInView animation fires only when card enters viewport (lazy animation)
 * - viewport: { once: true } means animation plays only once, not on every scroll
 * - Image uses sizes prop so browser fetches correct size for viewport
 */

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.28 }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-200/70 dark-surface dark-border"
    >
      <Link href={`/products/${product.id}`} aria-label={`View details for ${product.name}`}>
        <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark-soft">
          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black brand-text shadow-sm backdrop-blur">
            {product.category}
          </span>
        </div>
      </Link>
      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-lg font-black text-slate-950 dark-text transition group-hover:brand-text">{product.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark-muted">{product.description}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-xl font-black text-slate-950 dark-text">₹{product.price.toLocaleString("en-IN")}</p>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-700">★ {product.rating}</span>
        </div>
        <AddToCartButton product={product} />
      </div>
    </motion.article>
  );
});

export default ProductCard;
