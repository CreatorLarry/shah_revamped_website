import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const title = "Shah Lalji Nangpar Academy | Cambridge School in Nakuru";
const description =
  "Shah Lalji Nangpar Academy is a Cambridge Curriculum International School in Nakuru, Kenya, serving learners from Early Years to A-Level.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https");
  const origin = host ? `${protocol}://${host}` : "https://shahlalji.ac.ke";
  const socialImage = `${origin}/og.png`;

  return {
    metadataBase: new URL(origin),
    title,
    description,
    applicationName: "Shah Lalji Nangpar Academy",
    keywords: [
      "Shah Lalji Nangpar Academy",
      "Cambridge school Nakuru",
      "international school Nakuru",
      "Cambridge Curriculum Kenya",
      "Early Years to A-Level",
    ],
    authors: [{ name: "Shah Lalji Nangpar Academy" }],
    creator: "Shah Lalji Nangpar Academy",
    icons: {
      icon: "/images/school-logo.png",
      shortcut: "/images/school-logo.png",
      apple: "/images/school-logo.png",
    },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_KE",
      title,
      description,
      siteName: "Shah Lalji Nangpar Academy",
      url: origin,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Shah Lalji Nangpar Academy — An Education That Inspires Excellence",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#062f5f",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
