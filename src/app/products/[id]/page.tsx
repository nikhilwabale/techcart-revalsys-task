import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import products from "@/data/products.json";
import type { Product } from "@/types/product";
import AddToCartButton from "@/components/AddToCartButton";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

function getProduct(id: string) {
  return (products as Product[]).find((product) => product.id === Number(id));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found on TechCart.",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: product.name,
    description: `${product.description} Buy ${product.name} at ₹${product.price.toLocaleString("en-IN")} on TechCart.`,
    keywords: [product.name, product.category, "buy online", "TechCart", "electronics"],
    openGraph: {
      title: `${product.name} | TechCart`,
      description: product.description,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  return (products as Product[]).map((product) => ({ id: product.id.toString() }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) notFound();

  return (
    <section className="container-page">
      <Link href="/products" className="mb-6 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700 hover:bg-blue-700 hover:text-white">
        ← Back to products
      </Link>
      <div className="grid gap-8 overflow-hidden rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-200/80 dark-surface dark-border lg:grid-cols-[.95fr_1.05fr] lg:p-8">
        <div className="relative min-h-[360px] overflow-hidden rounded-[1.5rem] bg-slate-100 sm:min-h-[480px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center p-2 sm:p-4">
          <p className="text-sm font-black uppercase tracking-wide text-blue-700">{product.category}</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 dark-text sm:text-5xl">{product.name}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark-muted">{product.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <p className="rounded-2xl bg-slate-950 px-5 py-3 text-3xl font-black text-white">₹{product.price.toLocaleString("en-IN")}</p>
            <p className="rounded-2xl bg-amber-50 px-4 py-3 font-black text-amber-700">★ {product.rating}</p>
            <p className="rounded-2xl bg-green-50 px-4 py-3 font-black text-green-700">Stock: {product.stock}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-black text-slate-900 dark-text">Key Features</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li key={feature} className="rounded-2xl bg-slate-50 p-4 font-semibold text-slate-700 dark-soft dark-text">
                  <span className="mr-2 text-blue-700">✓</span>{feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 max-w-sm">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}
