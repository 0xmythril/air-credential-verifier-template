"use client";

import { env } from "@/lib/env";
import { AlertCircle } from "lucide-react";

export const AnnouncementBar = () => {
  const showAnnouncement = env.NEXT_PUBLIC_SHOW_BETA_ANNOUNCEMENT === "true";

  if (!showAnnouncement) {
    return null;
  }

  return (
    <div className="w-full bg-destructive/10 border-b border-destructive/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-2.5 flex items-center gap-3">
        <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
        <p className="text-sm font-medium text-destructive">
          This is currently a testing showcase, please don&apos;t take offers shown here as real
        </p>
      </div>
    </div>
  );
};
