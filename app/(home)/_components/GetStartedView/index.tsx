import { DebuggingInfo, VerifierModal } from "./components";
import type { VerificationStatus } from "./components";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
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

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16 lg:px-12">
        <div
          className={
            showHero
              ? "grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
              : "flex justify-center"
          }
        >
          {showHero && (
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Powered by AIR
              </div>

              <div className="space-y-5 text-balance">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Verify your Twitter account with over 100 followers to get 30% rebate in AIR SP for your Surfshark VPN purchase
                </h1>
                <p className="max-w-xl text-base text-white/80 sm:text-lg">
                  Quick verification. Exclusive AIR rewards for Surfshark subscribers.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl border border-white/15 bg-black/20 p-4 backdrop-blur">
                  <div className="mt-1 rounded-full bg-primary/20 p-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold text-white">Twitter Verification</p>
                    <p className="text-white/70">
                      Verify your Twitter account and unlock 30% AIR SP rebate on every Surfshark VPN purchase.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-white/15 bg-black/20 p-4 backdrop-blur">
                  <div className="mt-1 rounded-full bg-primary/20 p-2">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold text-white">Instant AIR Rewards</p>
                    <p className="text-white/70">
                      30% of your Surfshark purchase amount will be airdropped to you in AIR SP tokens.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center lg:justify-end">
            <VerifierModal onStatusChange={setStatus} />
          </div>
        </div>

        {showHero && (
          <div className="mt-12 flex justify-center">
            <DebuggingInfo />
          </div>
        )}
      </div>
    </div>
  );
};
