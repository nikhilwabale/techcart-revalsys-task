"use client";

/**
 * CartContext — Client-Side Global State
 *
 * WHY "use client"?
 * - Uses useState, useEffect, useContext — React hooks need browser environment
 * - Reads/writes localStorage — browser-only API
 * - Cannot run on the server
 *
 * HYDRATION AWARENESS:
 * - On first render, server has no idea what's in the user's localStorage
 * - So we use isLoaded flag — cart starts empty, then loads from localStorage
 * - This prevents hydration mismatch errors (server HTML vs client HTML)
 * - Without isLoaded guard: server renders "Cart (0)", client has "Cart (3)" → mismatch error
 *
 * PERFORMANCE:
 * - totalItems and totalPrice use useMemo — only recomputed when items array changes
 * - Without useMemo: these would recalculate on every render even if cart didn't change
 */

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/product";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const CART_STORAGE_KEY = "techcart_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  // isLoaded prevents hydration mismatch — we don't write to localStorage 
  // until we've first READ from it
  const [isLoaded, setIsLoaded] = useState(false);

  // Step 1: Read cart from localStorage after component mounts in browser
  useEffect(() => {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart) as CartItem[]);
      } catch {
        setItems([]);
      }
    }
    setIsLoaded(true);
  }, []);

  // Step 2: Save cart to localStorage whenever it changes (after initial load)
  useEffect(() => {
    if (isLoaded) {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (product: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        // Product already in cart — increase quantity
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // New product — add with quantity 1
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((currentItems) =>
      currentItems.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  // useMemo — only recalculates when items array changes (performance optimization)
  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
