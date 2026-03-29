"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguageMode } from "@/components/app/language-provider";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { mode, setMode } = useLanguageMode();

  const nextMode = mode === "en" ? "fr" : "en";
  const label = mode === "en" ? "FR" : "EN";

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      className={cn(
        "gap-2 rounded-full border-slate-200 bg-white/80 px-3.5 text-xs font-semibold text-slate-700 backdrop-blur-sm hover:bg-white hover:text-slate-950",
        className,
      )}
      onClick={() => setMode(nextMode)}
      aria-label={`Switch to ${nextMode === "en" ? "English" : "French"}`}
    >
      <Globe className="size-3.5" />
      {label}
    </Button>
  );
}
