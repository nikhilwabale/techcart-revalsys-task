"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function SignupClient() {
  const router = useRouter();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim().length < 2) {
      setMessage("Please enter your full name.");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }
    const result = signup(name.trim(), email.trim(), password);
    setMessage(result.message);
    if (result.success) router.push("/products");
  };

  return (
    <section className="grid min-h-screen items-center px-4 py-6 sm:py-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }} className="mx-auto w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-300/70 sm:p-9">
        <Link href="/" className="mb-7 inline-flex items-center gap-3 font-black text-slate-950">
          <span className="brand-gradient grid h-11 w-11 place-items-center rounded-2xl text-white">TC</span>
          TechCart
        </Link>
        <p className="text-sm font-black uppercase tracking-wide brand-text">Create account</p>
        <h1 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Sign Up</h1>
        <p className="mt-3 text-slate-600">Demo user data is stored in localStorage for this frontend assignment.</p>
        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-black text-slate-700">Full Name</span>
            <input value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 font-semibold focus-ring focus:bg-white" required />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-black text-slate-700">Email</span>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 font-semibold focus-ring focus:bg-white" required />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-black text-slate-700">Password</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 font-semibold focus-ring focus:bg-white" required />
          </label>
          {message && <p className="rounded-2xl bg-blue-50 p-3 text-sm font-bold text-blue-700">{message}</p>}
          <button type="submit" className="brand-gradient w-full rounded-2xl px-4 py-4 font-black text-white shadow-lg shadow-blue-700/20 hover:-translate-y-0.5">
            Create Account
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600">
          Already have an account? <Link href="/login" className="font-black brand-text">Login</Link>
        </p>
      </motion.div>
    </section>
  );
}
