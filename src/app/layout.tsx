/**
 * Root Layout — Server Component
 *
 * RENDERING: This is a SERVER COMPONENT by default in Next.js App Router.
 * It runs on the server, never in the browser.
 *
 * WHAT HAPPENS HERE (SSR + Hydration flow):
 * 1. Server renders this layout shell with <html>, <head>, <body>
 * 2. Next.js injects all metadata (<title>, <meta>, <link>) into <head> automatically
 * 3. Complete HTML is sent to browser → page is visible immediately (SSR benefit)
 * 4. React JS bundle loads in browser
 * 5. React HYDRATES the page → Providers (CartContext, AuthContext, ThemeContext) 
 *    become active, event listeners attach, page becomes interactive
 *
 * SEO:
 * - metadata object here is the GLOBAL default for all pages
 * - Each page can override with its own metadata export
 * - template: "%s | TechCart" means page title becomes "Products | TechCart"
 * - lang="en" on <html> — required for screen readers and search crawlers
 * - openGraph tags — used by social media (LinkedIn, Twitter, WhatsApp previews)
 * - robots: index+follow — tells Google to crawl and index all public pages
 */

import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: {
    default: "TechCart | Electronics Product Showcase",
    template: "%s | TechCart",
  },
  description:
    "TechCart is a responsive electronics product showcase built with Next.js 15 and TypeScript. Browse laptops, mobiles, accessories, wearables and monitors.",
  keywords: ["electronics", "laptops", "mobiles", "wearables", "accessories", "TechCart", "Next.js", "TypeScript"],
  authors: [{ name: "Nikhil Wable" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "TechCart",
    title: "TechCart | Electronics Product Showcase",
    description: "Browse premium electronics — laptops, mobiles, wearables and accessories on TechCart.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // lang="en" — tells crawlers and screen readers the page language (SEO + accessibility)
    <html lang="en">
      <body>
        {/*
          Providers — wraps entire app with:
          - CartProvider   → global cart state (client-side, localStorage)
          - AuthProvider   → global auth state (client-side, localStorage)
          - ThemeProvider  → global theme state (client-side)

          All Providers are CLIENT components — they hydrate after server HTML arrives.
          Children (pages) can be server OR client components independently.
        */}
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
