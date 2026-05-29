"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Snackbar from "@/components/Snackbar";

export default function LoginClient() {
  const router = useRouter();
  const { user, isGuest, login, continueAsGuest, logout } = useAuth();
  const [email, setEmail] = useState("user@techcart.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState<{ message: string; type: "success" | "error" | "info" }>({ message: "", type: "info" });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const isSuccess = login(email, password);
    if (!isSuccess) {
      const message = "Invalid email or password. Please check your credentials.";
      setError(message);
      setSnackbar({ message, type: "error" });
      return;
    }
    setSnackbar({ message: "Login successful. Redirecting to products...", type: "success" });
    setTimeout(() => router.push("/products"), 550);
  };

  const handleGuest = () => {
    continueAsGuest();
    setSnackbar({ message: "Continuing as guest. You can still browse and add products.", type: "info" });
    setTimeout(() => router.push("/products"), 450);
  };

  const handleForgotPassword = () => {
    setSnackbar({ message: "Demo password hint: use 123456 for user@techcart.com.", type: "info" });
  };

  return (
    <section className="grid min-h-screen items-center px-4 py-6 sm:py-8">
      <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-300/70 lg:grid lg:grid-cols-[.95fr_1.05fr]">
        <div className="brand-gradient p-7 text-white sm:p-10">
          <Link href="/" className="inline-flex items-center gap-3 font-black text-white">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15">TC</span>
            TechCart
          </Link>
          <p className="mt-8 text-sm font-black uppercase tracking-wide text-cyan-100">Secure demo access</p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">Login or Continue as Guest</h1>
          <p className="mt-4 leading-7 text-white/85">
            Browse products as a guest or login with static JSON demo data. Session is handled using localStorage.
          </p>
          <div className="mt-7 grid gap-3 text-sm font-bold text-white/85 sm:grid-cols-2 lg:grid-cols-1">
            <p>✓ Static JSON user login</p>
            <p>✓ Guest mode supported</p>
            <p>✓ LocalStorage session</p>
            <p>✓ Sign up demo</p>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.18 }} className="p-6 sm:p-10">
          {user ? (
            <div className="rounded-3xl bg-green-50 p-6 text-center">
              <h2 className="text-2xl font-black text-green-800">Logged in as {user.name}</h2>
              <p className="mt-2 text-green-700">{user.email}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/products" className="flex-1 rounded-2xl bg-green-700 px-5 py-3 font-black text-white hover:bg-green-800">
                  Browse Products
                </Link>
                <button onClick={logout} className="flex-1 rounded-2xl bg-white px-5 py-3 font-black text-green-700 hover:bg-green-100">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-5 rounded-2xl bg-blue-50 p-4 text-sm text-blue-800">
                Current mode: <strong>{isGuest ? "Guest User" : "Not logged in"}</strong>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-black text-slate-700">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 font-semibold focus-ring focus:bg-white"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-black text-slate-700">Password</span>
                  <div className="flex rounded-2xl border border-slate-300 bg-slate-50 focus-within:bg-white focus-within:outline focus-within:outline-3 focus-within:outline-blue-200">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="min-w-0 flex-1 rounded-l-2xl bg-transparent px-4 py-3 font-semibold outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="rounded-r-2xl px-4 text-sm font-black brand-text hover:brand-soft"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </label>
                <button type="button" onClick={handleForgotPassword} className="text-sm font-black brand-text hover:underline">
                  Forgot Password?
                </button>
                {error && <p className="text-sm font-bold text-red-600">{error}</p>}
                <button type="submit" className="brand-gradient w-full rounded-2xl px-4 py-4 font-black text-white shadow-lg shadow-blue-700/20 hover:-translate-y-0.5">
                  Login
                </button>
              </form>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button onClick={handleGuest} className="rounded-2xl bg-slate-100 px-4 py-3 font-black text-slate-700 hover:bg-slate-200">
                  Continue as Guest
                </button>
                <Link href="/signup" className="rounded-2xl border brand-border px-4 py-3 text-center font-black brand-text hover:brand-soft">
                  Create Account
                </Link>
              </div>
              <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                Demo login: <strong>user@techcart.com</strong> / <strong>123456</strong>
              </p>
            </>
          )}
        </motion.div>
      </div>
    <Snackbar message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar({ message: "", type: "info" })} />
    </section>
  );
}
