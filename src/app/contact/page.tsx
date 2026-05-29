import type { Metadata } from "next";
import siteContent from "@/data/siteContent.json";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with TechCart. Contact us for product queries, support, or general information about our electronics showcase.",
  openGraph: {
    title: "Contact TechCart",
    description: "Reach out to TechCart for product queries and support.",
  },
};

export default function ContactPage() {
  return (
    <section className="container-page">
      <div className="grid gap-8 lg:grid-cols-[1fr_440px]">
        <div className="rounded-[2rem] brand-gradient p-8 text-white shadow-xl sm:p-12">
          <p className="text-sm font-black uppercase tracking-wide text-cyan-200">Contact</p>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">Get in Touch</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            Have questions about products, orders or support? Send us a message and our team will help you choose the right electronics for your needs.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
              <p className="font-black">Email</p>
              <p className="mt-2 text-slate-200">{siteContent.contact.email}</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
              <p className="font-black">Phone</p>
              <p className="mt-2 text-slate-200">{siteContent.contact.phone}</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
              <p className="font-black">Address</p>
              <p className="mt-2 text-slate-200">{siteContent.contact.address}</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
              <p className="font-black">Working Hours</p>
              <p className="mt-2 text-slate-200">{siteContent.contact.workingHours}</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
