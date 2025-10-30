import { DebuggingInfo, VerifierModal } from "./components";
import type { VerificationStatus } from "./components";
import { BookOpen, GraduationCap, Award } from "lucide-react";
import { useState } from "react";

export const GetStartedView = () => {
  const [status, setStatus] = useState<VerificationStatus>("initial");
  const showHero = status !== "success" && status !== "failure";

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-950 to-blue-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-purple-500/30 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.15),_transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 py-8">
        <div
          className={
            showHero
              ? "flex flex-col items-center gap-5 w-full"
              : "flex justify-center w-full"
          }
        >
          {showHero && (
            <div className="flex flex-col items-center gap-4 text-center max-w-3xl w-full">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-200 backdrop-blur">
                <Award className="h-3 w-3" />
                Exclusive Learning Offer
              </div>

              {/* Main Content */}
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200">
                  Get 25% Off Your First Course
                </h1>
                <p className="text-base md:text-lg text-purple-100/90 max-w-2xl mx-auto leading-snug">
                  Verify your X account to unlock 25% off your first Coursera course
                </p>
                <p className="text-xs text-purple-200/70 max-w-xl mx-auto">
                  Must be following 90+ people on X to qualify
                </p>
              </div>

              {/* Benefits Cards - Horizontal Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                <div className="flex items-start gap-3 rounded-2xl border-2 border-purple-400/20 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-4 backdrop-blur">
                  <div className="rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 p-2.5 flex-shrink-0 shadow-lg">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm text-white mb-0.5">7,000+ Courses</p>
                    <p className="text-purple-100/70 text-xs leading-tight">
                      Top universities and companies
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border-2 border-orange-400/20 bg-gradient-to-r from-orange-500/10 to-pink-500/10 p-4 backdrop-blur">
                  <div className="rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 p-2.5 flex-shrink-0 shadow-lg">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm text-white mb-0.5">Instant Discount</p>
                    <p className="text-orange-100/70 text-xs leading-tight">
                      25% off first course
                    </p>
                  </div>
                </div>
              </div>

              {/* Verify Button - Moved into hero section */}
              <div className="flex justify-center w-full mt-2">
                <VerifierModal onStatusChange={setStatus} />
              </div>
            </div>
          )}

          {!showHero && (
            <div className="flex justify-center w-full">
              <VerifierModal onStatusChange={setStatus} />
            </div>
          )}
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
