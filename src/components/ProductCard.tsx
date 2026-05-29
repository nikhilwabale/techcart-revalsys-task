"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
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
}
