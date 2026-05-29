import Link from "next/link";
import siteContent from "@/data/siteContent.json";

const linkMap: Record<string, string> = {
  Products: "/products",
  About: "/about",
  Contact: "/contact",
  Cart: "/cart",
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-[1.25fr_.85fr_.9fr_1.2fr] xl:gap-16 xl:items-start">
          <div className="max-w-md">
            <div className="flex items-center gap-5 pt-1">
              <span className="brand-gradient grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-2xl font-black text-white shadow-lg shadow-black/20">
                TC
              </span>
              <div>
                <p className="text-3xl font-black leading-tight">{siteContent.brand}</p>
                <p className="mt-1 text-base text-slate-400">{siteContent.tagline}</p>
              </div>
            </div>
            <p className="mt-9 max-w-sm text-base leading-8 text-slate-300">
              {siteContent.footer.description}
            </p>
          </div>

          <div className="min-w-0 pt-2">
            <h2 className="text-xl font-black">Quick Links</h2>
            <ul className="mt-7 space-y-4 text-slate-300">
              {siteContent.footer.quickLinks.map((item) => (
                <li key={item}>
                  <Link href={linkMap[item] ?? "/"} className="inline-flex hover:text-cyan-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 pt-2">
            <h2 className="text-xl font-black">Categories</h2>
            <ul className="mt-7 space-y-4 text-slate-300">
              {siteContent.footer.categories.map((item) => (
                <li key={item} className="leading-7">
                  <Link href={`/products?category=${encodeURIComponent(item)}`} className="inline-flex hover:text-cyan-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 pt-2">
            <h2 className="text-xl font-black">Contact</h2>
            <div className="mt-7 space-y-4 leading-7 text-slate-300">
              <p className="break-words">{siteContent.contact.email}</p>
              <p>{siteContent.contact.phone}</p>
              <p>{siteContent.contact.address}</p>
              <p>{siteContent.contact.workingHours}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="container-page flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>{siteContent.footer.copyright}</p>
          <p>Powered by Next.js, TypeScript and JSON content.</p>
        </div>
      </div>
    </footer>
  );
}
