"use client";

import { createContext, ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";

export function UIProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

export const ThemeContext = createContext("light");
export const SearchContext = createContext(false);
export const AuthContext = createContext(null);
