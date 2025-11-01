import type { Metadata } from "next";
import { DM_Sans, Poppins } from "next/font/google";

import "./globals.css";
import { env } from "@/lib/env";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmSansMono = DM_Sans({
  variable: "--font-dm-sans-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteName = "AIR Verifier";
const siteDescription = "Verify once and unlock trading rewards";
const siteUrl = env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  appleWebApp: {
    capable: true,
    title: siteName,
  },
  openGraph: {
    siteName,
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: siteName,
    title: siteName,
    description: siteDescription,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmSansMono.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
