"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const initialForm = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [showToast, setShowToast] = useState(false);

  const validate = () => {
    const nextErrors: Errors = {};
    if (form.name.trim().length < 2) nextErrors.name = "Name must be at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) nextErrors.message = "Message must be at least 10 characters.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setForm(initialForm);
    setErrors({});
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/80 sm:p-8 dark-surface dark-border">
        <h2 className="text-2xl font-black text-slate-950 dark-text">Send a Message</h2>
        <p className="mt-2 text-sm text-slate-600 dark-muted">Fill the form and get a demo success snackbar.</p>
        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-black text-slate-700 dark-text">Name</span>
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 font-semibold focus-ring focus:bg-white dark-soft dark-soft ${errors.name ? "border-red-400" : "border-slate-300"}`}
              placeholder="Your name"
            />
            {errors.name && <p className="mt-2 text-sm font-bold text-red-600">{errors.name}</p>}
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-black text-slate-700 dark-text">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 font-semibold focus-ring focus:bg-white dark-soft dark-soft ${errors.email ? "border-red-400" : "border-slate-300"}`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-2 text-sm font-bold text-red-600">{errors.email}</p>}
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-black text-slate-700 dark-text">Message</span>
            <textarea
              rows={5}
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 font-semibold focus-ring focus:bg-white dark-soft dark-soft ${errors.message ? "border-red-400" : "border-slate-300"}`}
              placeholder="Write your message"
            />
            {errors.message && <p className="mt-2 text-sm font-bold text-red-600">{errors.message}</p>}
          </label>
          <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 px-4 py-4 font-black text-white shadow-lg shadow-blue-700/20 hover:-translate-y-0.5 hover:shadow-xl">
            Submit Message
          </button>
        </div>
      </form>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl bg-green-600 px-5 py-4 text-center font-bold text-white shadow-2xl"
          >
            Message sent successfully! We will contact you soon.
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
