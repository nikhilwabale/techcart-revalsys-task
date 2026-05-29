import type { Metadata } from "next";
import siteContent from "@/data/siteContent.json";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about TechCart — a customer-friendly electronics showcase for smart devices, accessories and everyday technology products.",
  openGraph: {
    title: "About TechCart",
    description: "Learn about TechCart, built with Next.js and TypeScript as a product showcase.",
  },
};

export default function AboutPage() {
  return (
    <section className="container-page">
      <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl dark-surface shadow-slate-200/80">
        <div className="brand-gradient p-8 text-white sm:p-12 lg:p-14">
          <p className="text-sm font-black uppercase tracking-wide text-cyan-100">About</p>
          <h1 className="mt-4 text-4xl font-black sm:text-5xl">{siteContent.about.title}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-9 text-white/90">{siteContent.about.description}</p>
        </div>
        <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4 lg:p-10">
          {siteContent.about.highlights.map((highlight, index) => (
            <div key={highlight} className="rounded-3xl border border-slate-200 bg-slate-50 p-7 dark-soft hover:-translate-y-1 hover:brand-border hover:bg-white hover:shadow-lg">
              <span className="brand-gradient grid h-12 w-12 place-items-center rounded-2xl font-black text-white">{index + 1}</span>
              <h2 className="mt-6 text-lg font-black leading-8 text-slate-950 dark-text">{highlight}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
