import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";

import { siteContent } from "@/lib/site-content";

import "./variables.css";
import "./globals.css";

const bodyFont = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: siteContent.seo.title,
  description: siteContent.seo.description,
  applicationName: siteContent.seo.title,
  keywords: [
    "Summer Photo Day",
    "Summer Photo Day Warsaw",
    "photo day Warsaw",
    "outdoor photoshoot Warsaw",
    "park photoshoot Warsaw",
    "picnic photoshoot Warsaw",
    "film photography Warsaw",
    "editorial photoshoot",
    "creative photoshoot Warsaw",
  ],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    type: "website",
    locale: "ru_RU",
    siteName: siteContent.seo.title,
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.seo.title,
    description: siteContent.seo.description,
  },
  category: "photography",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={bodyFont.variable}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
