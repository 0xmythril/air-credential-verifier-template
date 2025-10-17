import { DebuggingInfo, VerifierModal } from "./components";
import type { VerificationStatus } from "./components";
import { ShieldCheck, Zap } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

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
              ? "grid items-center gap-16 lg:grid-cols-[1.2fr_1fr]"
              : "flex justify-center"
          }
        >
          {showHero && (
            <div className="flex flex-col gap-10">
              {/* Logo Partnership Header */}
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 p-2">
                  <Image
                    src="/x-logo/logo.svg"
                    alt="X"
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>
                <div className="text-3xl font-light text-white/40">×</div>
                <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 p-2">
                  <Image
                    src="/surfshark-logo/Surfshark_Symbol_Pos.svg"
                    alt="Surfshark"
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>
                <div className="text-3xl font-light text-white/40">×</div>
                <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-blue-500/30 p-2">
                  <span className="text-lg font-bold text-blue-300">AIR</span>
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-4">
                <h1 className="text-6xl font-bold tracking-tight text-white lg:text-7xl">
                  Earn 30% in AIR SP
                </h1>
                <p className="text-xl text-white/70 max-w-lg">
                  Verify your X account and get instant AIR rewards on every Surfshark VPN purchase.
                </p>
                <p className="text-sm text-white/50 max-w-lg">
                  Requires 100+ X followers to qualify for the full 30% rebate in AIR SP tokens.
                </p>
              </div>

              {/* Benefits Cards */}
              <div className="grid gap-4 sm:grid-cols-2 max-w-2xl">
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur hover:border-white/20 transition">
                  <div className="rounded-xl bg-blue-500/20 p-3 flex-shrink-0">
                    <ShieldCheck className="h-6 w-6 text-blue-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white">Verified & Secure</p>
                    <p className="text-white/60 text-sm">
                      One-click verification powered by AIR credentials.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur hover:border-white/20 transition">
                  <div className="rounded-xl bg-blue-500/20 p-3 flex-shrink-0">
                    <Zap className="h-6 w-6 text-blue-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white">Instant Rewards</p>
                    <p className="text-white/60 text-sm">
                      30% airdropped as AIR SP after purchase.
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
          <div className="mt-20 flex justify-center">
            <DebuggingInfo />
          </div>
        )}
      </div>
    </div>
  );
};
