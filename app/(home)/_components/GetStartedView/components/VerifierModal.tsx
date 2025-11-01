"use client";

import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";
import { useAirkit } from "@/lib/hooks/useAirkit";
import axios from "axios";
import { ExternalLink, CheckCircle2, GraduationCap, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ErrorModal } from "@/components/common/ErrorModal";

type AuthTokenResponse = {
  authToken: string;
};

export type VerificationStatus = "success" | "error" | "loading" | "initial" | "failure";

type VerifierModalProps = {
  onStatusChange?: (status: VerificationStatus) => void;
};

export function VerifierModal({ onStatusChange }: VerifierModalProps = {}) {
  const { airService, isInitialized, isLoggedIn, loginResult } = useAirkit();
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
  const [timeoutError, setTimeoutError] = useState<Error | null>(null);

  useEffect(() => {
    let next: VerificationStatus = "initial";
    if (shouldPreviewSuccess) next = "success";
    if (shouldPreviewFailure) next = "failure";
    setStatus(next);
    onStatusChange?.(next);
  }, [onStatusChange, shouldPreviewSuccess, shouldPreviewFailure]);

  // Extract AIR address from login result if already logged in
  useEffect(() => {
    if (isLoggedIn && loginResult?.abstractAccountAddress) {
      setUserAirAddress(loginResult.abstractAccountAddress);
      console.log("Pre-populated AIR address from loginResult:", loginResult.abstractAccountAddress);
    }
  }, [isLoggedIn, loginResult]);

  const updateStatus = (nextStatus: VerificationStatus) => {
    setStatus(nextStatus);
    onStatusChange?.(nextStatus);
  };

  const buildReferralUrl = (airAddress: string | null, isSuccess: boolean = false): string => {
    console.log("Building referral URL with AIR address:", airAddress, "isSuccess:", isSuccess);
    
    // If referral URL is not set, redirect to referral-demo page
    if (!env.NEXT_PUBLIC_REFERRAL_URL) {
      return "/referral-demo";
    }
    
    // Build referral URL with affiliate parameters
    const url = `${env.NEXT_PUBLIC_REFERRAL_URL}?affiliate_id=${airAddress || ""}&ref=air-verification&program=${env.NEXT_PUBLIC_VERIFIER_PROGRAM_ID}&eligible=${isSuccess ? "true" : "false"}`;
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

        console.log("=== VERIFICATION RESULT ===");
        console.log("Full result object:", result);
        console.log("Result keys:", Object.keys(result));
        console.log("Result stringify:", JSON.stringify(result, null, 2));

        // Extract AIR address from result - try multiple possible property names
        let address = null;
        if (result.address) {
          address = result.address;
          console.log("Found address at result.address:", address);
        } else if (result.airAddress) {
          address = result.airAddress;
          console.log("Found address at result.airAddress:", address);
        } else if (result.walletAddress) {
          address = result.walletAddress;
          console.log("Found address at result.walletAddress:", address);
        } else if (result.userAddress) {
          address = result.userAddress;
          console.log("Found address at result.userAddress:", address);
        } else if (result.abstractAccountAddress) {
          address = result.abstractAccountAddress;
          console.log("Found address at result.abstractAccountAddress:", address);
        } else if (result.user) {
          address = result.user?.address || result.user?.airAddress;
          console.log("Found address at result.user:", address);
        } else {
          console.warn("Could not find address property in result object");
          console.warn("Available properties:", Object.keys(result));
        }
        
        setUserAirAddress(address);
        console.log("Final extracted AIR address:", address);
        console.log("=== END VERIFICATION RESULT ===");

        if (result.status?.toLowerCase() === "compliant") {
          updateStatus("success");
        } else {
          updateStatus("failure");
        }
      } catch (error) {
        // Check if it's a timeout error
        if (error instanceof Error && error.message.includes("timed out")) {
          setTimeoutError(error);
          updateStatus("error");
        } else {
          // User closed modal or verification was cancelled - revert to initial state
          // so they can retry by clicking the button again
          updateStatus("initial");
          if (process.env.NODE_ENV === "development") {
            console.log("Verification cancelled by user, reverting to initial state");
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isLoading = status === "loading" || !isInitialized;
  const referralUrl = buildReferralUrl(userAirAddress, status === "success");
  const isInternalLink = referralUrl.startsWith("/");
  
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.clear();
      console.log("%c╔════════════════════════════════════════╗", "color: #00AA00; font-weight: bold;");
      console.log("%c║  REFERRAL URL - PREVIEW/DEBUG INFO    ║", "color: #00AA00; font-weight: bold;");
      console.log("%c╚════════════════════════════════════════╝", "color: #00AA00; font-weight: bold;");
      console.log("Status:", status);
      console.log("AIR Address:", userAirAddress ? userAirAddress : "(null)");
      console.log("Preview Mode:", shouldPreviewSuccess ? "SUCCESS" : shouldPreviewFailure ? "FAILURE" : "None");
      console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "color: #00AA00;");
      console.log("%cREFERRAL URL:", "font-weight: bold; color: #00AA00; font-size: 14px;");
      console.log(referralUrl);
      console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "color: #00AA00;");
    }
  }, [status, userAirAddress, referralUrl, shouldPreviewSuccess, shouldPreviewFailure]);

  const handleRetryFromTimeout = () => {
    setTimeoutError(null);
    onContinue();
  };

  return (
    <div className="container max-w-lg">
      {timeoutError && (
        <ErrorModal
          error={timeoutError}
          onRetry={handleRetryFromTimeout}
        />
      )}
      {status === "success" ? (
        <div className="flex justify-center">
          <div className="relative w-full overflow-hidden rounded-3xl border-2 border-purple-400/30 bg-gradient-to-br from-purple-600/20 via-indigo-600/20 to-pink-600/20 text-white shadow-2xl backdrop-blur">
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-500/40 blur-3xl animate-pulse" />
            <div className="relative flex flex-col items-center gap-8 px-8 py-16">
              <div className="flex items-center gap-3 rounded-full border-2 border-purple-300/50 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 px-6 py-3 text-sm font-bold uppercase tracking-wider text-purple-100 shadow-lg backdrop-blur">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                Verified & Eligible
              </div>

              <div className="flex flex-col items-center gap-5 text-center">
                <h3 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
                  You&apos;re Ready to Learn!
                </h3>
                <p className="text-lg text-purple-100/90 leading-relaxed max-w-md">
                  Get 25% off your first Coursera course. Click below to browse courses and apply your discount.
                </p>
              </div>

              <Link
                href={referralUrl}
                {...(isInternalLink ? {} : { target: "_blank", rel: "noreferrer" })}
                className="group inline-flex w-full flex-col items-center gap-4 rounded-2xl border-2 border-purple-400/40 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
              >
                <div className="flex w-full items-center justify-between text-xl font-bold">
                  <span className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6" />
                    {isInternalLink ? "View Referral Page" : "Browse Courses & Save 25%"}
                  </span>
                  {!isInternalLink && (
                    <ExternalLink className="h-6 w-6 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  )}
                </div>
                <p className="text-sm text-purple-100/90">
                  {isInternalLink
                    ? "Redirecting to the referral page"
                    : "Your discount will be applied automatically at checkout"}
                </p>
              </Link>
            </div>
          </div>
        </div>
      ) : status === "failure" ? (
        <div className="flex justify-center">
          <div className="relative w-full overflow-hidden rounded-3xl border-2 border-orange-400/30 bg-gradient-to-br from-orange-600/20 via-amber-600/20 to-yellow-600/20 text-white shadow-2xl backdrop-blur">
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-500/30 blur-3xl" />
            <div className="relative flex flex-col items-center gap-8 px-8 py-16">
              <div className="flex flex-col items-center gap-5 text-center">
                <h3 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-yellow-200">
                  Keep Growing Your Network
                </h3>
                <p className="text-lg text-orange-100/90 leading-relaxed max-w-md">
                  You need to follow 90+ people on X to unlock the discount. You can still explore Coursera&apos;s 7,000+ courses with your referral link.
                </p>
              </div>

              <Link
                href={referralUrl}
                {...(isInternalLink ? {} : { target: "_blank", rel: "noreferrer" })}
                className="group inline-flex w-full flex-col items-center gap-4 rounded-2xl border-2 border-orange-400/40 bg-gradient-to-r from-orange-600 to-amber-600 p-6 text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50"
              >
                <div className="flex w-full items-center justify-between text-xl font-bold">
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    {isInternalLink ? "View Referral Page" : "Explore Courses"}
                  </span>
                  {!isInternalLink && (
                    <ExternalLink className="h-6 w-6 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  )}
                </div>
                <p className="text-sm text-orange-100/90">
                  {isInternalLink
                    ? "Redirecting to the referral page"
                    : "Browse courses and learn from top instructors"}
                </p>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-8">
          <div className="rounded-3xl flex flex-col items-center gap-8 p-8 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-2 border-purple-400/20 backdrop-blur">
            {/* Logo Partnership Display - ONLY in initial state */}
            <div className="flex items-center gap-8">
              <div className="h-24 w-24 flex items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border-2 border-purple-400/30 p-4 shadow-lg">
                <Image
                  src="/x-logo/logo.svg"
                  alt="X"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="text-5xl font-light text-purple-300/50">×</div>
              <div className="h-24 w-24 flex items-center justify-center rounded-3xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 border-2 border-orange-400/30 p-4 shadow-lg">
                <Image
                  src="/coursera-logo/coursera-logo.svg"
                  alt="Coursera"
                  width={72}
                  height={72}
                  className="object-contain"
                />
              </div>
            </div>

            <Button
              size="lg"
              onClick={onContinue}
              disabled={isLoading}
              className="relative w-full overflow-hidden border-2 border-purple-400/50 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white shadow-[0_20px_50px_-12px_rgba(168,85,247,0.6)] transition-all hover:scale-[1.03] hover:shadow-[0_25px_60px_-12px_rgba(168,85,247,0.8)] disabled:opacity-50 h-16 text-lg font-bold"
            >
              <span className="pointer-events-none absolute inset-0 opacity-60 [animation:glowPulse_2.4s_ease-in-out_infinite]" />
              <span className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.4),transparent)]" />
              <span className="relative flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <GraduationCap className="h-5 w-5" />
                    Verify to Get 25% Off
                  </>
                )}
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
