import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import BrowserWarningBanner from "@/components/parts/incompatBanner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "fgraph",
  description: "weather forecast app with a location picker and a lot of cool graphs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-w-[405px]`}
      >
        <BrowserWarningBanner />
        <div className="max-w-4xl mx-auto">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
