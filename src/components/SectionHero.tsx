import type { ReactNode } from "react";

export default function SectionHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return (
    <div className="mb-10 overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-950 via-blue-950 to-blue-700 p-8 text-white shadow-xl shadow-blue-700/10 sm:p-10 lg:p-12">
      <p className="text-sm font-black uppercase tracking-wide text-cyan-200">{eyebrow}</p>
      <h1 className="mt-3 max-w-5xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">{description}</p>
      {children && <div className="mt-7">{children}</div>}
    </div>
  );
}
