import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import UIProvider from "./ui-provider";
import GoogleAnalytics from "@/components/googleAnalytics";
import { DataProvider } from "./data-provider";

const fonts = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Usetuls - Find digital Tools & Utilities",
  description:
    "Discover digital Tools & online Utilities to get things done smarter, quicker and simplify your life & work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fonts.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <UIProvider>
          <DataProvider>{children}</DataProvider>
        </UIProvider>
      </body>
    </html>
  );
}
