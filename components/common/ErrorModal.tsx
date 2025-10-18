"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useCallback } from "react";

interface ErrorModalProps {
  error: Error;
  onRetry?: () => void;
}

export function ErrorModal({ error, onRetry }: ErrorModalProps) {
  const handleRetry = useCallback(() => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  }, [onRetry]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-[520px] overflow-hidden rounded-[28px] border border-destructive/20 bg-gradient-to-br from-destructive/5 via-destructive/10 to-destructive/20 shadow-2xl mx-4">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-destructive/30 blur-3xl" />
        <div className="relative flex flex-col items-center gap-6 px-10 py-12 text-secondary-foreground">
          <div className="flex items-center gap-3 rounded-full border border-destructive/40 bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-destructive/80 shadow-sm backdrop-blur">
            <AlertCircle className="h-4 w-4" />
            Service Error
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-secondary-foreground">
              Unable to initialize service
            </h3>
            <p className="max-w-[400px] text-sm text-muted-foreground">
              We encountered an error while initializing the verification service. Please try again or contact support if the problem persists.
            </p>
            {process.env.NODE_ENV === "development" && (
              <details className="w-full">
                <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
                  Error details
                </summary>
                <pre className="mt-2 overflow-auto rounded bg-muted p-3 text-xs text-muted-foreground whitespace-pre-wrap break-words">
                  {error.message}
                </pre>
              </details>
            )}
          </div>

          <Button
            onClick={handleRetry}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 p-3 text-secondary-foreground transition hover:border-destructive/80 hover:bg-destructive/20"
          >
            <RefreshCw className="h-4 w-4 transition group-hover:rotate-180" />
            <span className="text-base font-semibold">Try Again</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
