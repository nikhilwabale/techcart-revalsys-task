"use client";

import { AnimatePresence, motion } from "framer-motion";

type SnackbarType = "success" | "error" | "info";

export default function Snackbar({ message, type = "info", onClose }: { message: string; type?: SnackbarType; onClose?: () => void }) {
  const tone = type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "brand-bg";

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-5 left-1/2 z-[120] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-4 rounded-2xl ${tone} px-5 py-4 text-sm font-bold text-white shadow-2xl`}
        >
          <span>{message}</span>
          {onClose && (
            <button type="button" onClick={onClose} className="rounded-full bg-white/20 px-2 py-1 text-xs hover:bg-white/30">
              Close
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
