// loading.tsx — Auto-shown by Next.js while products page loads
// Demonstrates SSR streaming — server sends shell HTML first, 
// then streams in the content progressively

export default function ProductsLoading() {
  return (
    <div className="container-page py-10">
      {/* Skeleton for SectionHero */}
      <div className="mb-10 space-y-3">
        <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200" />
        <div className="h-10 w-80 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-4 w-96 animate-pulse rounded-full bg-slate-200" />
      </div>

      {/* Skeleton for filter bar */}
      <div className="mb-8 h-36 animate-pulse rounded-3xl bg-slate-100" />

      {/* Skeleton product grid */}
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <div className="h-56 animate-pulse bg-slate-100" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-3/4 animate-pulse rounded-full bg-slate-200" />
              <div className="h-4 w-full animate-pulse rounded-full bg-slate-100" />
              <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-100" />
              <div className="h-10 animate-pulse rounded-2xl bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
