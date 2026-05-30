// loading.tsx for product detail page
// Next.js streams this while generateMetadata + page data loads on server

export default function ProductDetailLoading() {
  return (
    <div className="container-page py-6">
      <div className="mb-6 h-8 w-36 animate-pulse rounded-full bg-slate-200" />
      <div className="grid gap-8 overflow-hidden rounded-[2rem] bg-white p-5 shadow-xl lg:grid-cols-2 lg:p-8">
        {/* Image skeleton */}
        <div className="min-h-[360px] animate-pulse rounded-[1.5rem] bg-slate-100 sm:min-h-[480px]" />
        {/* Content skeleton */}
        <div className="flex flex-col justify-center gap-4 p-2 sm:p-4">
          <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200" />
          <div className="h-10 w-3/4 animate-pulse rounded-2xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded-full bg-slate-100" />
            <div className="h-4 w-full animate-pulse rounded-full bg-slate-100" />
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-100" />
          </div>
          <div className="flex gap-3">
            <div className="h-12 w-32 animate-pulse rounded-2xl bg-slate-200" />
            <div className="h-12 w-20 animate-pulse rounded-2xl bg-slate-100" />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
          <div className="mt-4 h-14 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
