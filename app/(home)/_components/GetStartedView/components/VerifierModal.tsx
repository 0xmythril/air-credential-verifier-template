"use client";

import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";
import { useAirkit } from "@/lib/hooks/useAirkit";
import axios from "axios";
import { ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type AuthTokenResponse = {
  authToken: string;
};

export type VerificationStatus = "success" | "error" | "loading" | "initial" | "failure";

type VerifierModalProps = {
  onStatusChange?: (status: VerificationStatus) => void;
};

export function VerifierModal({ onStatusChange }: VerifierModalProps = {}) {
  const { airService, isInitialized } = useAirkit();
  const searchParams = useSearchParams();
  const shouldPreviewSuccess =
    searchParams.get("previewSuccess")?.toLowerCase() === "true" ||
    searchParams.get("previewReward")?.toLowerCase() === "true";
  const shouldPreviewFailure =
    searchParams.get("previewFailure")?.toLowerCase() === "true";
  const [status, setStatus] = useState<VerificationStatus>(() => {
    if (shouldPreviewSuccess) return "success";
    if (shouldPreviewFailure) return "failure";
    return "initial";
  });
  const [userAirAddress, setUserAirAddress] = useState<string | null>(null);

  useEffect(() => {
    let next: VerificationStatus = "initial";
    if (shouldPreviewSuccess) next = "success";
    if (shouldPreviewFailure) next = "failure";
    setStatus(next);
    onStatusChange?.(next);
  }, [onStatusChange, shouldPreviewSuccess, shouldPreviewFailure]);

  const updateStatus = (nextStatus: VerificationStatus) => {
    setStatus(nextStatus);
    onStatusChange?.(nextStatus);
  };

  const buildReferralUrl = (airAddress: string | null): string => {
    console.log("Building referral URL with AIR address:", airAddress);
    const url = `${env.NEXT_PUBLIC_REFERRAL_URL}${airAddress || ""}`;
    console.log("Generated referral URL:", url);
    return url;
  };

  const onContinue = async () => {
    updateStatus("loading");

    try {
      try {
        while (!airService.isLoggedIn) {
          await airService.login();
        }
      } catch (error) {
        updateStatus("initial");
        throw error;
      }

      try {
        const { authToken } = (
          await axios.get<AuthTokenResponse>("/api/auth-token")
        ).data;

        const result = await airService.verifyCredential({
          authToken,
          programId: env.NEXT_PUBLIC_VERIFIER_PROGRAM_ID,
          redirectUrl: env.NEXT_PUBLIC_ISSUER_URL,
        });

        console.log("Verification result:", result);

        // Extract AIR address from result
        const address = result.address || result.airAddress || null;
        setUserAirAddress(address);
        console.log("Extracted AIR address:", address);

        if (result.authStatus === "COMPLIANT") {
          updateStatus("success");
        } else {
          updateStatus("failure");
        }
      } catch (error) {
        updateStatus("failure");
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isLoading = status === "loading" || !isInitialized;
  const referralUrl = buildReferralUrl(userAirAddress);
  console.log("Final referral URL:", referralUrl);

  return (
    <div className="container max-w-lg">
      {status === "success" ? (
        <div className="flex justify-center">
          <div className="relative w-full overflow-hidden rounded-[32px] border border-primary/20 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/20 text-primary-foreground shadow-2xl">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative flex flex-col items-center gap-8 px-8 py-16 text-secondary-foreground">
              <div className="flex items-center gap-2 rounded-full border border-primary/40 bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary/80 shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4 animate-pulse" />
                Verified
              </div>

              <div className="flex flex-col items-center gap-4 text-center">
                <h3 className="text-3xl font-bold tracking-tight text-secondary-foreground">
                  You've Earned 30% AIR SP
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Sign up with this link and we'll airdrop 30% of your Surfshark purchase to you in AIR SP tokens.
                </p>
              </div>

              <Link
                href={referralUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-full flex-col items-center gap-4 rounded-2xl border border-primary/40 bg-background/70 p-6 text-secondary-foreground transition hover:border-primary/80 hover:bg-background"
              >
                <div className="flex w-full items-center justify-between text-lg font-semibold tracking-wide text-primary">
                  <span>Claim Your Reward</span>
                  <ExternalLink className="h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Get 30% of your Surfshark VPN purchase as AIR SP tokens
                </p>
              </Link>
            </div>
          </div>
        </div>
      ) : status === "failure" ? (
        <div className="flex justify-center">
          <div className="relative w-full overflow-hidden rounded-[32px] border border-destructive/20 bg-gradient-to-br from-destructive/5 via-destructive/10 to-destructive/20 shadow-2xl">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-destructive/30 blur-3xl" />
            <div className="relative flex flex-col items-center gap-8 px-8 py-16 text-secondary-foreground">
              <div className="flex flex-col items-center gap-4 text-center">
                <h3 className="text-3xl font-bold tracking-tight text-secondary-foreground">
                  Almost There
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Your X account doesn't meet the 100+ followers requirement. You can still sign up with your referral link and enjoy Surfshark VPN.
                </p>
              </div>

              <Link
                href={referralUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-full flex-col items-center gap-4 rounded-2xl border border-primary/40 bg-background/70 p-6 text-secondary-foreground transition hover:border-primary/80 hover:bg-background"
              >
                <div className="flex w-full items-center justify-between text-lg font-semibold tracking-wide text-primary">
                  <span>Sign Up for Surfshark</span>
                  <ExternalLink className="h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Use your referral link (standard rewards apply)
                </p>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-6">
          <div className="rounded-3xl flex flex-col items-center gap-8">
            {/* Logo Partnership Display - ONLY in initial state */}
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 p-3">
                <Image
                  src="/x-logo/logo.svg"
                  alt="X"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
              <div className="text-4xl font-light text-white/30">+</div>
              <div className="h-20 w-20 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 p-3">
                <Image
                  src="/surfshark-logo/Surfshark_Symbol_Pos.svg"
                  alt="Surfshark"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
            </div>

            <Button
              size="lg"
              onClick={onContinue}
              disabled={isLoading}
              className="relative w-full overflow-hidden border border-primary/50 bg-[linear-gradient(115deg,_rgba(59,130,246,0.95),_rgba(14,165,233,0.9))] text-white shadow-[0_18px_40px_-18px_rgba(56,189,248,0.8)] transition-transform hover:scale-[1.02] hover:shadow-[0_20px_45px_-18px_rgba(59,130,246,0.95)] disabled:opacity-50 h-14 text-base font-semibold"
            >
              <span className="pointer-events-none absolute inset-0 opacity-70 [animation:glowPulse_2.4s_ease-in-out_infinite]" />
              <span className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.5),transparent)]" />
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? "Verifying..." : "Verify Credential"}
                {!isLoading && (
                  <span className="inline-block h-2 w-2 animate-ping rounded-full bg-white/80" />
                )}
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
