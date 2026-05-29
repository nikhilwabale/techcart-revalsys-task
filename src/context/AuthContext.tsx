"use client";

import { createContext, useContext, useEffect, useState } from "react";
import staticUsers from "@/data/users.json";
import type { AuthUser, User } from "@/types/user";

interface AuthContextValue {
  user: AuthUser | null;
  isGuest: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => { success: boolean; message: string };
  continueAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const AUTH_STORAGE_KEY = "techcart_auth_user";
const GUEST_STORAGE_KEY = "techcart_guest_user";
const REGISTERED_USERS_KEY = "techcart_registered_users";

function getRegisteredUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    const savedUsers = window.localStorage.getItem(REGISTERED_USERS_KEY);
    return savedUsers ? (JSON.parse(savedUsers) as User[]) : [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);
    const guestMode = window.localStorage.getItem(GUEST_STORAGE_KEY) === "true";

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as AuthUser);
        setIsGuest(false);
      } catch {
        setUser(null);
      }
    } else {
      setIsGuest(guestMode);
    }
  }, []);

  const login = (email: string, password: string) => {
    const allUsers = [...(staticUsers as User[]), ...getRegisteredUsers()];
    const foundUser = allUsers.find(
      (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password
    );

    if (!foundUser) return false;

    const authUser: AuthUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email
    };

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
    window.localStorage.removeItem(GUEST_STORAGE_KEY);
    setUser(authUser);
    setIsGuest(false);
    return true;
  };

  const signup = (name: string, email: string, password: string) => {
    const allUsers = [...(staticUsers as User[]), ...getRegisteredUsers()];
    const alreadyExists = allUsers.some((item) => item.email.toLowerCase() === email.toLowerCase());

    if (alreadyExists) {
      return { success: false, message: "Email already exists. Please login instead." };
    }

    const newUser: User = {
      id: Date.now(),
      name,
      email,
      password
    };

    const updatedUsers = [...getRegisteredUsers(), newUser];
    window.localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(updatedUsers));
    login(email, password);
    return { success: true, message: "Account created successfully." };
  };

  const continueAsGuest = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    window.localStorage.setItem(GUEST_STORAGE_KEY, "true");
    setUser(null);
    setIsGuest(true);
  };

  const logout = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    window.localStorage.setItem(GUEST_STORAGE_KEY, "true");
    setUser(null);
    setIsGuest(true);
  };

  return (
    <AuthContext.Provider value={{ user, isGuest, login, signup, continueAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
