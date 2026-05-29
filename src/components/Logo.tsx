import Link from "next/link";
import siteContent from "@/data/siteContent.json";

export default function Logo({ href = "/", compact = false, inverse = false }: { href?: string; compact?: boolean; inverse?: boolean }) {
  const titleClass = inverse ? "text-white" : "text-slate-950 dark-text";
  const taglineClass = inverse ? "text-slate-400" : "text-slate-500 dark-muted";
  const content = (
    <>
      <span className={`${compact ? "h-14 w-14 text-xl" : "h-16 w-16 text-2xl"} brand-gradient grid shrink-0 place-items-center rounded-2xl font-black text-white shadow-lg shadow-blue-700/20`}>
        TC
      </span>
      <span className="min-w-0">
        <span className={`${compact ? "text-2xl" : "text-3xl"} block truncate font-black leading-tight tracking-tight ${titleClass} group-hover:brand-text`}>
          {siteContent.brand}
        </span>
        <span className={`mt-1 block text-sm font-semibold ${taglineClass}`}>
          {siteContent.tagline}
        </span>
      </span>
    </>
  );

  if (!href) return <div className="flex items-center gap-4">{content}</div>;

  return (
    <Link href={href} prefetch className="group flex min-w-0 items-center gap-4">
      {content}
    </Link>
  );
}
