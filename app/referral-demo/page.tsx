"use client";

import { env } from "@/lib/env";
import { Info, ExternalLink } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ReferralDemoContent() {
  const searchParams = useSearchParams();
  const forcePlaceholder = searchParams.get("preview") === "placeholder";
  const hasReferralUrl = !!env.NEXT_PUBLIC_REFERRAL_URL;

  // If referral URL is set and not forcing placeholder, redirect or show message
  if (hasReferralUrl && !forcePlaceholder) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-950 to-blue-950 text-white">
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 py-8">
          <div className="flex flex-col items-center gap-6 text-center w-full">
            <div className="rounded-full border border-green-400/30 bg-green-500/10 px-6 py-3 backdrop-blur">
              <Info className="h-6 w-6 text-green-200" />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-200 via-emerald-200 to-teal-200">
                Referral URL Configured
              </h1>
              <p className="text-base md:text-lg text-purple-100/90 max-w-2xl mx-auto leading-snug">
                The referral URL is set. Users will be redirected to the configured referral page after verification.
              </p>
              <p className="text-sm text-purple-200/70 max-w-xl mx-auto">
                To preview the placeholder, use{" "}
                <code className="bg-purple-500/20 px-2 py-1 rounded text-purple-100 font-mono text-xs">
                  ?preview=placeholder
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-950 to-blue-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-purple-500/30 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.15),_transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 py-8">
        <div className="flex flex-col items-center gap-6 text-center w-full">
          <div className="rounded-full border border-purple-400/30 bg-purple-500/10 px-6 py-3 backdrop-blur">
            <Info className="h-6 w-6 text-purple-200" />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200">
              Referral Page
            </h1>

            <div className="space-y-3">
              <p className="text-base md:text-lg text-purple-100/90 max-w-2xl mx-auto leading-snug">
                This will be a referral page once the referral link has been
                set up
              </p>
              <p className="text-sm text-purple-200/70 max-w-xl mx-auto">
                To configure this page, set{" "}
                <code className="bg-purple-500/20 px-2 py-1 rounded text-purple-100 font-mono text-xs">
                  NEXT_PUBLIC_REFERRAL_URL
                </code>{" "}
                in your environment variables.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReferralDemoPage() {
  return (
    <Suspense fallback={
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-950 to-blue-950 text-white flex items-center justify-center">
        <div className="text-purple-200">Loading...</div>
      </div>
    }>
      <ReferralDemoContent />
    </Suspense>
  );
}

