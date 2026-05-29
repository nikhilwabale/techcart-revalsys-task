import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to TechCart using static JSON user data or continue as guest.",
  robots: { index: false, follow: false }
};

export default function LoginPage() {
  return <LoginClient />;
}
