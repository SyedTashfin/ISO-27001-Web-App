"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Briefcase,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Languages,
  LayoutGrid,
  Network,
  Rocket,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { learningModules, type LearningModule } from "@/lib/platform-data";
import { storageKeys } from "@/lib/storage";
import { useMemo, useState } from "react";
import { useLanguageMode } from "@/components/app/language-provider";
import { cn } from "@/lib/utils";

const iconMap = {
  AlertTriangle,
  ClipboardCheck,
  BookOpen,
  Briefcase,
  FileText,
  GraduationCap,
  Languages,
  LayoutGrid,
  Network,
  Rocket,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
} as const;

type ProgressRecord = Record<
  string,
  {
    completed?: boolean;
    progressPercent?: number;
  }
>;

export function ModuleGrid({
  modules = learningModules,
  className,
}: {
  modules?: LearningModule[];
  className?: string;
}) {
  const { mode } = useLanguageMode();
  const lang = mode === "fr" ? "fr" : "en";

  const [progress] = useState<ProgressRecord>(() => {
    if (typeof window === "undefined") {
      return {};
    }

    const saved = window.localStorage.getItem(storageKeys.moduleProgress);

    if (!saved) {
      return {};
    }

    try {
      return JSON.parse(saved) as ProgressRecord;
    } catch {
      return {};
    }
  });

  const cards = useMemo(
    () =>
      modules.map((module, index) => {
        const Icon = iconMap[module.icon as keyof typeof iconMap] ?? ShieldCheck;
        const moduleProgress = progress[module.slug]?.progressPercent ?? 0;
        const isComplete = progress[module.slug]?.completed ?? false;

        return (
          <motion.article
            key={module.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: index * 0.03 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-5 transition hover:border-slate-300 hover:bg-white hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-slate-950 group-hover:text-white">
                  <Icon className="size-5" />
                </div>
                <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50 text-xs text-slate-600">
                  {module.level[lang]}
                </Badge>
              </div>
              <span className="text-xs text-slate-400">{module.durationMinutes} min</span>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-slate-950">{module.title[lang]}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-500">
                {module.summary[lang]}
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{isComplete ? "Completed" : "Progress"}</span>
                <span>{isComplete ? "100%" : `${moduleProgress}%`}</span>
              </div>
              <Progress
                value={isComplete ? 100 : moduleProgress}
                className={cn("h-1.5 bg-slate-100", isComplete && "[&>div]:bg-emerald-600")}
              />
            </div>

            <Link
              href={`/learn/${module.slug}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 transition group-hover:text-slate-950"
            >
              {lang === "fr" ? "Ouvrir" : "Open module"}
              <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
            </Link>
          </motion.article>
        );
      }),
    [modules, progress, lang],
  );

  return <div className={cn("grid gap-4 lg:grid-cols-2 xl:grid-cols-3", className)}>{cards}</div>;
}
