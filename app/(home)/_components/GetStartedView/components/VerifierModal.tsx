"use client";

import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";
import { useAirkit } from "@/lib/hooks/useAirkit";
import axios from "axios";
import { ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";
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

        if (result.authStatus === "COMPLIANT") {
          updateStatus("success");
        } else {
          // NON_COMPLIANT, PENDING, REVOKING, REVOKED, EXPIRED, NOT_FOUND
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

  return (
    <div className="container max-w-3xl">
      {status === "success" ? (
        <div className="flex justify-center">
          <div className="relative w-full max-w-[520px] overflow-hidden rounded-[28px] border border-primary/20 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/20 text-primary-foreground shadow-2xl">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative flex flex-col items-center gap-6 px-10 py-12 text-secondary-foreground">
              <div className="flex items-center gap-2 rounded-full border border-primary/40 bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary/80 shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4 animate-pulse" />
                Reward unlocked
              </div>

              <div className="flex flex-col items-center gap-3 text-center">
                <h3 className="text-2xl font-bold tracking-tight text-secondary-foreground">
                  You are eligible for 10% rebate trading on Aster!
                </h3>
                <p className="max-w-[360px] text-sm text-muted-foreground">
                  Redeem your exclusive trading rebate and explore premium perks curated for verified members.
                </p>
              </div>

              <Link
                href={env.NEXT_PUBLIC_REFERRAL_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-full flex-col items-center gap-3 rounded-2xl border border-primary/40 bg-background/70 p-6 text-secondary-foreground transition hover:border-primary/80 hover:bg-background"
              >
                <div className="flex w-full items-center justify-between text-lg font-semibold tracking-wide text-primary">
                  <span>Claim your rebate</span>
                  <ExternalLink className="h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Secure 10% back on your trading fees when you sign up through this referral portal.
                </p>
              </Link>
            </div>
          </div>
        </div>
      ) : status === "failure" ? (
        <div className="flex justify-center">
          <div className="relative w-full max-w-[520px] overflow-hidden rounded-[28px] border border-destructive/20 bg-gradient-to-br from-destructive/5 via-destructive/10 to-destructive/20 shadow-2xl">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-destructive/30 blur-3xl" />
            <div className="relative flex flex-col items-center gap-6 px-10 py-12 text-secondary-foreground">
              <div className="flex flex-col items-center gap-3 text-center">
                <h3 className="text-2xl font-bold tracking-tight text-secondary-foreground">
                  Unfortunately you are not eligible for the 10% rebate trading on Aster.
                </h3>
                <p className="max-w-[400px] text-sm text-muted-foreground">
                  Please make sure you have a greater than 500 Ethos Score and try again. If this is a mistake please re-issue your credential again.
                </p>
              </div>

              <Link
                href={env.NEXT_PUBLIC_ISSUER_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-full flex-col items-center gap-3 rounded-2xl border border-primary/40 bg-background/70 p-6 text-secondary-foreground transition hover:border-primary/80 hover:bg-background"
              >
                <div className="flex w-full items-center justify-between text-lg font-semibold tracking-wide text-primary">
                  <span>Re-issue my Ethos credential</span>
                  <ExternalLink className="h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <div className="px-8 pt-8 pb-8 rounded-3xl flex flex-col items-center gap-4">
            <Button
              size="lg"
              onClick={onContinue}
              disabled={isLoading}
              className="relative min-w-[220px] overflow-hidden border border-primary/50 bg-[linear-gradient(115deg,_rgba(59,130,246,0.95),_rgba(14,165,233,0.9))] text-white shadow-[0_18px_40px_-18px_rgba(56,189,248,0.8)] transition-transform hover:scale-[1.03] hover:shadow-[0_20px_45px_-18px_rgba(59,130,246,0.95)] disabled:opacity-50"
            >
              <span className="pointer-events-none absolute inset-0 opacity-70 [animation:glowPulse_2.4s_ease-in-out_infinite]" />
              <span className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.5),transparent)]" />
              <span className="relative flex items-center justify-center gap-2 text-base font-semibold uppercase tracking-wide">
                {isLoading ? "Verifying" : "Verify eligibility"}
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
