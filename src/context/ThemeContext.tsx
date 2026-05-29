"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Appearance = "light" | "dark";
export type FontSize = "comfortable" | "compact" | "large";

interface ThemeContextValue {
  appearance: Appearance;
  fontSize: FontSize;
  setAppearance: (appearance: Appearance) => void;
  setFontSize: (size: FontSize) => void;
  resetPreferences: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const APPEARANCE_STORAGE_KEY = "techcart_appearance";
const FONT_STORAGE_KEY = "techcart_font_size";
const appearances: Appearance[] = ["light", "dark"];
const fontSizes: FontSize[] = ["compact", "comfortable", "large"];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearanceState] = useState<Appearance>("light");
  const [fontSize, setFontSizeState] = useState<FontSize>("comfortable");

  useEffect(() => {
    const savedAppearance = window.localStorage.getItem(APPEARANCE_STORAGE_KEY) as Appearance | null;
    const savedFont = window.localStorage.getItem(FONT_STORAGE_KEY) as FontSize | null;
    if (savedAppearance && appearances.includes(savedAppearance)) setAppearanceState(savedAppearance);
    if (savedFont && fontSizes.includes(savedFont)) setFontSizeState(savedFont);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.appearance = appearance;
    window.localStorage.setItem(APPEARANCE_STORAGE_KEY, appearance);
  }, [appearance]);

  useEffect(() => {
    document.documentElement.dataset.fontSize = fontSize;
    window.localStorage.setItem(FONT_STORAGE_KEY, fontSize);
  }, [fontSize]);

  const resetPreferences = () => {
    setAppearanceState("light");
    setFontSizeState("comfortable");
    window.localStorage.removeItem(APPEARANCE_STORAGE_KEY);
    window.localStorage.removeItem(FONT_STORAGE_KEY);
  };

  const value = useMemo(
    () => ({ appearance, fontSize, setAppearance: setAppearanceState, setFontSize: setFontSizeState, resetPreferences }),
    [appearance, fontSize]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeColor() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeColor must be used inside ThemeProvider");
  return context;
}
