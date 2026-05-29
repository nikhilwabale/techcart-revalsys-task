"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SettingsDrawer from "@/components/SettingsDrawer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const [settingsOpen, setSettingsOpen] = useState(false);

  if (isAuthPage) {
    return <main className="auth-page min-h-screen">{children}</main>;
  }

  return (
    <>
      <div
        className={`min-h-screen transition duration-200 ${
          settingsOpen ? "pointer-events-none select-none blur-2xl brightness-50 scale-[0.995]" : ""
        }`}
        aria-hidden={settingsOpen}
      >
        <Navbar onOpenSettings={() => setSettingsOpen(true)} />
        <main className="site-main">{children}</main>
        <Footer />
      </div>
      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
