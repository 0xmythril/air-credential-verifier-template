"use client";
import { Header } from "@/components/common/Header";
import { AnnouncementBar } from "@/components/common/AnnouncementBar";
import { Toaster } from "@/components/ui/sonner";
import dynamic from "next/dynamic";

const Providers = dynamic(
  () => import("../../lib/providers").then((m) => m.Providers),
  {
    ssr: false,
  }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Providers>
        <AnnouncementBar />
        <Header />

        {children}
      </Providers>
      <Toaster position="top-center" />
    </>
  );
}
