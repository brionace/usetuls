"use client";
import { NextUIProvider } from "@nextui-org/react";

export default async function UIProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
