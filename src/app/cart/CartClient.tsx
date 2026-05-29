"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import SectionHero from "@/components/SectionHero";
import QuantityStepper from "@/components/QuantityStepper";

export default function CartClient() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  return (
    <section className="container-page">
      <SectionHero
        eyebrow="Shopping Cart"
        title="Review your selected products"
        description="Check quantities, remove items, and review your order summary before checkout. Your cart is saved locally for guest and logged-in browsing."
      />

      {items.length === 0 ? (
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm dark-surface">
          <h2 className="text-2xl font-black text-slate-950 dark-text">Your cart is empty</h2>
          <p className="mt-3 text-slate-600 dark-muted">Browse products and add items to your cart.</p>
          <Link href="/products" className="mt-6 inline-flex rounded-2xl bg-blue-700 px-6 py-3 font-black text-white hover:-translate-y-0.5 hover:bg-blue-800">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {items.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-4 rounded-[2rem] bg-white p-4 shadow-sm dark-surface sm:grid-cols-[140px_1fr]"
              >
                <div className="relative h-32 overflow-hidden rounded-3xl bg-slate-100">
                  <Image src={item.image} alt={item.name} fill unoptimized sizes="140px" className="object-contain" />
                </div>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h2 className="text-xl font-black text-slate-950 dark-text">{item.name}</h2>
                    <p className="mt-1 text-sm font-bold text-blue-700">{item.category}</p>
                    <p className="mt-3 text-lg font-black text-slate-900 dark-text">₹{item.price.toLocaleString("en-IN")}</p>
                    <p className="mt-1 text-sm text-slate-500 dark-muted">Item total: ₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <QuantityStepper
                      value={item.quantity}
                      onMinus={() => updateQuantity(item.id, item.quantity - 1)}
                      onPlus={() => updateQuantity(item.id, item.quantity + 1)}
                    />
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-black text-red-700 hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <aside className="h-fit rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/80 dark-surface lg:sticky lg:top-28">
            <h2 className="text-2xl font-black text-slate-950 dark-text">Order Summary</h2>
            <div className="mt-6 space-y-4 text-slate-700 dark-muted">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span className="font-black">{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-black">₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-black text-green-700">Free</span>
              </div>
              <div className="border-t border-slate-200 pt-4 text-xl font-black text-slate-950 dark-text">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
            <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 px-4 py-4 font-black text-white shadow-lg shadow-blue-700/20 hover:-translate-y-0.5">
              Proceed to Checkout
            </button>
            <button onClick={clearCart} className="mt-3 w-full rounded-2xl bg-slate-100 px-4 py-4 font-black text-slate-700 dark-soft dark-text dark-muted hover:bg-slate-200">
              Clear Cart
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}
