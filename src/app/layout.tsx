import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: {
    default: "TechCart | Electronics Product Showcase",
    template: "%s | TechCart"
  },
  description: "TechCart is a responsive electronics product showcase built with Next.js and TypeScript. Browse laptops, mobiles, accessories, wearables and monitors.",
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
    <html lang="en">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
