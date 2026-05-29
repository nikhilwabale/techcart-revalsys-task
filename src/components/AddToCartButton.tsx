"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }: { product: Product }) {
  const { items, addToCart, updateQuantity } = useCart();
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  if (quantity > 0) {
    return (
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex w-full items-center justify-between rounded-2xl border brand-border brand-soft p-1.5"
      >
        <button
          type="button"
          onClick={() => updateQuantity(product.id, quantity - 1)}
          className="grid h-10 w-10 place-items-center rounded-xl bg-white text-xl font-black brand-text shadow-sm hover:brand-bg hover:text-white focus-ring"
          aria-label={`Decrease ${product.name} quantity`}
        >
          −
        </button>
        <span className="px-4 text-sm font-black brand-text">{quantity} in cart</span>
        <button
          type="button"
          onClick={() => updateQuantity(product.id, quantity + 1)}
          className="grid h-10 w-10 place-items-center rounded-xl brand-bg text-xl font-black text-white shadow-sm hover:opacity-90 focus-ring"
          aria-label={`Increase ${product.name} quantity`}
        >
          +
        </button>
      </motion.div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => addToCart(product)}
      className="w-full rounded-2xl brand-gradient px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/20 hover:-translate-y-0.5 hover:shadow-xl focus-ring"
    >
      Add to Cart
    </button>
  );
}
