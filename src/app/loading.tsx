// loading.tsx — Next.js shows this automatically while a page is loading
// This is part of Next.js Streaming + Suspense architecture
// It prevents a blank screen during server-side data fetching

export default function RootLoading() {
  return (
    <div className="container-page py-20 text-center">
      <div className="inline-flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        <p className="font-black text-slate-600">Loading TechCart...</p>
      </div>
    </div>
  );
}
