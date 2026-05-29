import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "dark" | "light" | "ghost" | "soft" | "danger";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "brand-gradient text-white shadow-lg shadow-blue-700/20 hover:-translate-y-0.5",
  dark: "bg-slate-950 text-white hover:-translate-y-0.5 hover:brand-bg",
  light: "bg-white text-slate-950 shadow-sm hover:-translate-y-0.5 hover:bg-slate-50",
  ghost: "border border-slate-200 bg-white text-slate-700 shadow-sm hover:-translate-y-0.5 hover:shadow-md dark-surface dark-border dark-text",
  soft: "brand-soft hover:brand-bg hover:text-white",
  danger: "bg-red-50 text-red-700 hover:bg-red-100"
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-base"
};

function classes(variant: Variant, size: Size, className = "") {
  return `inline-flex items-center justify-center rounded-full font-black ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: Variant; size?: Size }) {
  return <button className={classes(variant, size, className)} {...props}>{children}</button>;
}

export function LinkButton({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; href: string; variant?: Variant; size?: Size }) {
  return <Link href={href} prefetch className={classes(variant, size, className)} {...props}>{children}</Link>;
}
