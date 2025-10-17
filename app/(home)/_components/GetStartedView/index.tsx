import { DebuggingInfo, VerifierModal } from "./components";
import type { VerificationStatus } from "./components";
import { ExternalLink, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

export const GetStartedView = () => {
  const [status, setStatus] = useState<VerificationStatus>("initial");
  const showHero = status !== "success" && status !== "failure";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05060F] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-[-120px] top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-16 lg:px-12">
        <div
          className={
            showHero
              ? "grid items-center gap-12 lg:grid-cols-[1fr_auto]"
              : "flex justify-center"
          }
        >
          {showHero && (
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-blue-200 backdrop-blur w-fit">
                <Sparkles className="h-3.5 w-3.5" />
                Twitter x Surfshark
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl font-bold tracking-tight text-white lg:text-6xl">
                  Get 30% AIR SP Rebate
                </h1>
                <p className="text-lg text-white/70">
                  Verify your Twitter account and unlock instant AIR rewards on every Surfshark VPN purchase.
                </p>
                <p className="text-sm text-white/50">
                  Requires 100+ Twitter followers to claim the full 30% rebate.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur hover:border-white/20 transition">
                  <div className="mt-1 rounded-lg bg-blue-500/20 p-2">
                    <ShieldCheck className="h-4 w-4 text-blue-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white text-sm">Verified & Secure</p>
                    <p className="text-white/60 text-xs">
                      One-click Twitter verification powered by AIR credentials.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur hover:border-white/20 transition">
                  <div className="mt-1 rounded-lg bg-blue-500/20 p-2">
                    <Zap className="h-4 w-4 text-blue-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white text-sm">Instant Rewards</p>
                    <p className="text-white/60 text-xs">
                      30% of your Surfshark purchase airdropped as AIR SP tokens.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center lg:justify-start">
            <VerifierModal onStatusChange={setStatus} />
          </div>
        </div>

        {showHero && (
          <div className="mt-16 flex justify-center">
            <DebuggingInfo />
          </div>
        )}
      </div>
    </div>
  );
};
