"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Appearance, FontSize, useThemeColor } from "@/context/ThemeContext";
import { Button } from "@/components/Button";

const appearanceOptions: { value: Appearance; label: string; helper: string }[] = [
  { value: "light", label: "White Theme", helper: "Clean and bright shopping UI" },
  { value: "dark", label: "Black Theme", helper: "Premium dark browsing mode" },
];

const fontOptions: { value: FontSize; label: string; helper: string }[] = [
  { value: "compact", label: "Compact", helper: "More content on screen" },
  { value: "comfortable", label: "Comfortable", helper: "Balanced reading size" },
  { value: "large", label: "Large", helper: "Bigger readable text" },
];

export default function SettingsDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { appearance, setAppearance, fontSize, setFontSize, resetPreferences } = useThemeColor();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            role="button"
            tabIndex={0}
            aria-label="Close settings drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            onKeyDown={(event) => { if (event.key === "Escape" || event.key === "Enter") onClose(); }}
            className="drawer-backdrop fixed inset-0 z-[9998]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed right-0 top-0 z-[9999] h-dvh w-full max-w-md overflow-y-auto border-l border-slate-200 bg-white p-6 shadow-2xl dark-surface dark-border"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-wide brand-text">Preferences</p>
                <h2 className="mt-2 text-3xl font-black text-slate-950 dark-text">Display Settings</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark-muted">
                  Customize website appearance and reading size. Settings are saved in your browser.
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-2xl bg-slate-100 px-4 py-2 text-xl font-black text-slate-700 hover:bg-slate-200 dark-soft"
                aria-label="Close drawer"
              >
                ×
              </button>
            </div>

            <div className="mt-8 space-y-8">
              <section>
                <h3 className="text-lg font-black text-slate-950 dark-text">Theme</h3>
                <div className="mt-4 grid gap-3">
                  {appearanceOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setAppearance(option.value)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left ${
                        appearance === option.value
                          ? "brand-border brand-soft shadow-sm"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white dark-soft dark-border dark-text"
                      }`}
                    >
                      <span>
                        <span className="block font-black">{option.label}</span>
                        <span className="mt-1 block text-sm font-semibold opacity-75">{option.helper}</span>
                      </span>
                      <span className="text-xl">{appearance === option.value ? "✓" : "○"}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-black text-slate-950 dark-text">Font Size</h3>
                <div className="mt-4 space-y-3">
                  {fontOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFontSize(option.value)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left ${
                        fontSize === option.value
                          ? "brand-border brand-soft shadow-sm"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white dark-soft dark-border dark-text"
                      }`}
                    >
                      <span>
                        <span className="block font-black">{option.label}</span>
                        <span className="mt-1 block text-sm font-semibold opacity-75">{option.helper}</span>
                      </span>
                      <span className="text-xl">{fontSize === option.value ? "✓" : "○"}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark-soft dark-border">
                <h3 className="font-black text-slate-950 dark-text">Recommended</h3>
                <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-slate-600 dark-muted">
                  <li>• White theme is best for product browsing.</li>
                  <li>• Black theme gives a premium electronics feel.</li>
                  <li>• Comfortable font size is best for evaluation.</li>
                </ul>
              </section>

              <div className="flex gap-3 border-t border-slate-200 pt-6 dark-border">
                <Button type="button" variant="ghost" className="flex-1" onClick={resetPreferences}>Reset</Button>
                <Button type="button" variant="primary" className="flex-1" onClick={onClose}>Apply</Button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
