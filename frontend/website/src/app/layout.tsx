import type { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "নাগরিক — বাংলাদেশ নাগরিক উন্নয়ন পরিষদ",
    template: "%s | নাগরিক",
  },
  description:
    "নাগরিক অ্যাপ দিয়ে আপনার এলাকার সমস্যা জানান, জরুরি সাহায্য পান, রক্তদান নেটওয়ার্কে যুক্ত হন। অরাজনৈতিক নাগরিক সংগঠন।",
  keywords: ["নাগরিক", "বাংলাদেশ", "নাগরিক সেবা", "সমস্যা সমাধান", "রক্তদান", "জরুরি সাহায্য"],
  authors: [{ name: "বাংলাদেশ নাগরিক উন্নয়ন পরিষদ" }],
  openGraph: {
    type: "website",
    locale: "bn_BD",
    siteName: "নাগরিক",
    title: "নাগরিক — বাংলাদেশ নাগরিক উন্নয়ন পরিষদ",
    description: "এলাকার সমস্যা জানান, জরুরি সাহায্য পান, রক্তদান নেটওয়ার্কে যুক্ত হন।",
  },
  twitter: {
    card: "summary_large_image",
    title: "নাগরিক — বাংলাদেশ নাগরিক উন্নয়ন পরিষদ",
    description: "এলাকার সমস্যা জানান, জরুরি সাহায্য পান।",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
