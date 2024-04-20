import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import UIProvider from "./ui-provider";
import GoogleAnalytics from "@/components/googleAnalytics";
import { DataProvider } from "./data-provider";

const fonts = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Discover useful digital tools",
  description:
    "Find web tools that help you get things done smarter and quicker",
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
