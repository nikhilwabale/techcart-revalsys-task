import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-12 text-center">
      <div>
        <h1 className="text-4xl font-bold text-slate-950">Page Not Found</h1>
        <p className="mt-4 text-slate-600">The page you are looking for does not exist.</p>
        <Link href="/" className="mt-6 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800">
          Go Home
        </Link>
      </div>
    </section>
  );
}
