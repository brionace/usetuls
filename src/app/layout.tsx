import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UIProvider from "./ui-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Usetuls - Useful web tools",
  description:
    "A hub of powerfully useful and effective digital tools and online utilities for developers, designers, finance experts, project and product managers to make quality projects easily and quickly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark text-foreground bg-background">
      <body className={inter.className}>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
