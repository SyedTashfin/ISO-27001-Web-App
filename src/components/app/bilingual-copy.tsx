"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { LocalizedText } from "@/lib/course-data";
import { useLanguageMode } from "@/components/app/language-provider";

type BilingualCopyProps = {
  value: LocalizedText;
  compact?: boolean;
  hideLabels?: boolean;
  containerClassName?: string;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function BilingualCopy({
  value,
  compact = false,
  containerClassName,
  className,
  ...props
}: BilingualCopyProps) {
  const { mode } = useLanguageMode();
  const lang = mode === "fr" ? "fr" : "en";

  return (
    <div className={containerClassName} {...props}>
      <div
        className={cn(
          compact ? "text-sm text-foreground/80" : "text-base leading-7 text-foreground/85",
          className,
        )}
      >
        {value[lang]}
      </div>
    </div>
  );
}
