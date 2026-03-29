"use client";

import type { LocalizedText } from "@/lib/course-data";
import { useLanguageMode } from "@/components/app/language-provider";

type LocalizedInlineProps = {
  value: LocalizedText;
  className?: string;
  secondaryClassName?: string;
  dualMode?: "slash" | "stack";
};

export function LocalizedInline({
  value,
  className,
}: LocalizedInlineProps) {
  const { mode } = useLanguageMode();
  const lang = mode === "fr" ? "fr" : "en";

  return <span className={className}>{value[lang]}</span>;
}
