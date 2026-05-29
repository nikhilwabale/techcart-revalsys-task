"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import Logo from "@/components/Logo";
import { Button, LinkButton } from "@/components/Button";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ onOpenSettings }: { onOpenSettings: () => void }) {
  const pathname = usePathname();
  const { user, isGuest, logout } = useAuth();
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is open — portrait AND landscape
  useEffect(() => {
    if (!isOpen) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl dark-surface dark-border">
      <nav className="container-page flex min-h-[88px] items-center justify-between gap-4 py-4 sm:min-h-[96px] sm:py-5">
        <Logo compact />

        <div className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch
                className={`rounded-full px-5 py-3 text-base font-bold ${
                  active ? "brand-soft" : "text-slate-700 hover:bg-slate-100 hover:brand-text dark-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button type="button" onClick={onOpenSettings} variant="ghost" size="md" aria-label="Open display settings">
            ⚙ Settings
          </Button>
          <LinkButton href="/cart" variant="dark" size="md" className="px-6 text-base">
            Cart <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs text-slate-950">{totalItems}</span>
          </LinkButton>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="max-w-36 truncate rounded-full bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
                Hi, {user.name.split(" ")[0]}
              </span>
              <Button onClick={logout} variant="danger" size="md">Logout</Button>
            </div>
          ) : (
            <LinkButton href="/login" variant="primary" size="md" className="px-6 text-base">
              {isGuest ? "Guest / Login" : "Login / Sign Up"}
            </LinkButton>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-2xl font-black text-slate-900 shadow-sm lg:hidden dark-surface dark-border dark-text"
          aria-label="Open navigation menu"
        >
          ☰
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Full-screen overlay — fixed, covers entire viewport including address bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[9997] bg-white/95 backdrop-blur-2xl lg:hidden dark-surface"
              style={{ height: "100dvh", overflowY: "auto", WebkitOverflowScrolling: "touch" }}
            >
              {/* Inner container — min-height ensures footer sticks to bottom on tall screens,
                  but the outer div scrolls freely on short/landscape screens */}
              <div className="container-page flex min-h-full flex-col py-5">

                {/* Header row */}
                <div className="flex items-center justify-between gap-4">
                  <Logo compact />
                  <button
                    onClick={closeMenu}
                    className="rounded-2xl bg-slate-100 px-4 py-2 text-2xl font-black text-slate-800 dark-soft dark-text"
                    aria-label="Close navigation menu"
                  >
                    ×
                  </button>
                </div>

                {/* Nav links */}
                <div className="mt-8 grid gap-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      prefetch
                      onClick={closeMenu}
                      className={`rounded-3xl border px-6 py-5 text-2xl font-black shadow-sm ${
                        pathname === link.href
                          ? "brand-soft brand-border"
                          : "border-slate-200 bg-slate-50 text-slate-900 dark-soft dark-border dark-text"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <button
                    onClick={() => { onOpenSettings(); closeMenu(); }}
                    className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5 text-left text-2xl font-black text-slate-900 shadow-sm dark-soft dark-border dark-text"
                  >
                    ⚙ Settings
                  </button>
                  <Link
                    href="/cart"
                    prefetch
                    onClick={closeMenu}
                    className="rounded-3xl bg-slate-950 px-6 py-5 text-2xl font-black text-white shadow-lg"
                  >
                    Cart ({totalItems})
                  </Link>
                </div>

                {/* Auth footer — pushed to bottom on tall screens, flows naturally on short screens */}
                <div className="mt-auto space-y-4 pt-8">
                  {user ? (
                    <button
                      onClick={() => { logout(); closeMenu(); }}
                      className="w-full rounded-3xl bg-red-50 px-6 py-5 text-left text-xl font-black text-red-700"
                    >
                      Logout ({user.name})
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      prefetch
                      onClick={closeMenu}
                      className="brand-gradient block rounded-3xl px-6 py-5 text-center text-xl font-black text-white shadow-lg"
                    >
                      Login / Sign Up
                    </Link>
                  )}
                  <p className="text-center text-sm font-semibold text-slate-500 dark-muted">
                    TechCart · Smart electronics store
                  </p>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
