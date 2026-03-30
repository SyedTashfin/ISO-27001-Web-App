"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Gauge, Radar, Sparkles, Target } from "lucide-react";
import type { LocalizedText } from "@/lib/course-data";
import {
  buildDashboardSnapshot,
  readModuleProgress,
  type DashboardSnapshot,
} from "@/lib/learning-insights";
import { learningModules, type PracticeTopic } from "@/lib/platform-data";
import { storageKeys, subscribeToStorageKey } from "@/lib/storage";
import { useLanguageMode } from "@/components/app/language-provider";

const text = (en: string, fr: string): LocalizedText => ({ en, fr });

const topicLabels: Record<PracticeTopic, LocalizedText> = {
  clauses: text("Clauses", "Clauses"),
  controls: text("Controls", "Mesures"),
  audit: text("Audit", "Audit"),
  risk: text("Risk", "Risque"),
  glossary: text("Glossary", "Glossaire"),
};

const emptyDashboardSnapshot: DashboardSnapshot = {
  completedModules: 0,
  inProgressModules: 0,
  averageModuleProgress: 0,
  quizHistoryCount: 0,
  weakTopics: [],
  strengths: [],
  scenarioCompletions: 0,
  vocabularyProgress: 0,
  readinessScore: 0,
  mockExamAttempts: 0,
  latestMockExamScore: null,
  bestMockExamScore: null,
};

type HomePulseSnapshot = {
  dashboard: DashboardSnapshot;
  nextModuleSlug: string;
  started: boolean;
};

const learningSignalKeys = [
  storageKeys.moduleProgress,
  storageKeys.quizAttempts,
  storageKeys.simulations,
  storageKeys.practiceAttempts,
  storageKeys.mockExamSessions,
] as const;

const defaultNextModuleSlug = learningModules[0]?.slug ?? "what-is-iso-27001";

const emptyHomePulseSnapshot: HomePulseSnapshot = {
  dashboard: emptyDashboardSnapshot,
  nextModuleSlug: defaultNextModuleSlug,
  started: false,
};

const emptyLearningSignalCacheKey = learningSignalKeys.map(() => "").join("::");

let cachedHomePulseKey = emptyLearningSignalCacheKey;
let cachedHomePulseSnapshot = emptyHomePulseSnapshot;

function subscribeToLearningSignals(callback: () => void) {
  const unsubscribes = learningSignalKeys.map((key) => subscribeToStorageKey(key, callback));

  return () => {
    for (const unsubscribe of unsubscribes) {
      unsubscribe();
    }
  };
}

function getHomePulseSnapshot(): HomePulseSnapshot {
  if (typeof window === "undefined") {
    return emptyHomePulseSnapshot;
  }

  const cacheKey = learningSignalKeys
    .map((key) => window.localStorage.getItem(key) ?? "")
    .join("::");

  if (cacheKey === cachedHomePulseKey) {
    return cachedHomePulseSnapshot;
  }

  const dashboard = buildDashboardSnapshot();
  const progress = readModuleProgress();
  const nextModule =
    learningModules.find((module) => !progress[module.slug]?.completed) ?? learningModules[0];

  const started =
    dashboard.completedModules > 0 ||
    dashboard.inProgressModules > 0 ||
    dashboard.quizHistoryCount > 0 ||
    dashboard.scenarioCompletions > 0 ||
    dashboard.mockExamAttempts > 0 ||
    Object.keys(progress).length > 0;

  cachedHomePulseKey = cacheKey;
  cachedHomePulseSnapshot = {
    dashboard,
    nextModuleSlug: nextModule.slug,
    started,
  };

  return cachedHomePulseSnapshot;
}

export function HomeLearningPulse() {
  const prefersReducedMotion = useReducedMotion();
  const { mode } = useLanguageMode();
  const lang = mode === "fr" ? "fr" : "en";

  const { dashboard, nextModuleSlug, started } = useSyncExternalStore<HomePulseSnapshot>(
    subscribeToLearningSignals,
    getHomePulseSnapshot,
    () => emptyHomePulseSnapshot,
  );

  const nextModule =
    learningModules.find((module) => module.slug === nextModuleSlug) ?? learningModules[0];
  const strongestTopic = dashboard.strengths[0];
  const weakestTopic = dashboard.weakTopics[0];
  const readinessBarWidth = started ? Math.max(dashboard.readinessScore, 6) : 18;

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#081120] p-6 text-white shadow-[0_35px_120px_-48px_rgba(2,6,23,0.95)] sm:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_28%),linear-gradient(140deg,rgba(255,255,255,0.05),transparent_45%)]"
      />
      <div className="relative space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
              {lang === "fr" ? "Signal d'apprentissage" : "Learning pulse"}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              {started
                ? lang === "fr"
                  ? "Votre progression devient visible"
                  : "Your progress becomes visible"
                : lang === "fr"
                  ? "Le tableau de bord commencera ici"
                  : "Your dashboard starts here"}
            </h3>
          </div>
          <div className="rounded-full border border-white/10 bg-white/6 p-3 text-cyan-100">
            <Gauge className="size-5" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-5xl font-semibold tracking-tight text-white">
                {started ? `${dashboard.readinessScore}%` : lang === "fr" ? "Pret" : "Ready"}
              </div>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-300">
                {started
                  ? lang === "fr"
                    ? "Ce score combine modules, exercices, simulations et examens blancs enregistres dans ce navigateur."
                    : "This score combines modules, practice, simulations, and mock exams saved in this browser."
                  : lang === "fr"
                    ? "Terminez un module, lancez un lab ou faites un examen blanc pour transformer cette zone en signal en temps reel."
                    : "Finish a module, launch a lab, or take a mock exam to turn this area into a live progress signal."}
              </p>
            </div>
            <Sparkles className="hidden size-5 text-cyan-200/70 sm:block" />
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-[linear-gradient(90deg,#22d3ee,#38bdf8,#f59e0b)]"
              initial={{ width: 0 }}
              animate={{ width: `${readinessBarWidth}%` }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
            <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
              {lang === "fr" ? "Modules termines" : "Modules done"}
            </div>
            <div className="mt-3 text-3xl font-semibold text-white">{dashboard.completedModules}</div>
          </div>
          <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
            <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
              {lang === "fr" ? "Simulations bouclees" : "Simulations run"}
            </div>
            <div className="mt-3 text-3xl font-semibold text-white">{dashboard.scenarioCompletions}</div>
          </div>
          <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
            <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
              {lang === "fr" ? "Meilleur examen blanc" : "Best mock exam"}
            </div>
            <div className="mt-3 text-3xl font-semibold text-white">
              {dashboard.bestMockExamScore === null ? "--" : `${dashboard.bestMockExamScore}%`}
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-[1.4rem] border border-emerald-400/20 bg-emerald-400/8 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-emerald-200/80">
              <Target className="size-3.5" />
              {lang === "fr" ? "Prochaine etape" : "Next best move"}
            </div>
            <p className="mt-3 text-base font-semibold text-white">
              {started
                ? nextModule.title[lang]
                : lang === "fr"
                  ? "Commencer par les fondamentaux ISO 27001"
                  : "Start with the ISO 27001 foundations"}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {started
                ? lang === "fr"
                  ? "Reprenez le prochain module incomplet pour garder une progression coherente."
                  : "Resume the next incomplete module to keep momentum coherent."
                : lang === "fr"
                  ? "La meilleure entree est d'abord de comprendre le systeme de management, puis le pourquoi business."
                  : "The best entry point is understanding the management system first, then the business reason behind it."}
            </p>
          </div>

          <div className="rounded-[1.4rem] border border-cyan-400/20 bg-cyan-400/8 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-cyan-100/80">
              <Radar className="size-3.5" />
              {lang === "fr" ? "Signal de competence" : "Skill signal"}
            </div>
            <div className="mt-3 space-y-3 text-sm text-slate-300">
              <p>
                <span className="font-semibold text-white">
                  {lang === "fr" ? "Point fort" : "Strength"}:
                </span>{" "}
                {strongestTopic
                  ? `${topicLabels[strongestTopic.topic][lang]} ${
                      lang === "fr" ? `a ${strongestTopic.accuracy}%` : `at ${strongestTopic.accuracy}%`
                    }`
                  : lang === "fr"
                    ? "Aucune donnee encore. Les premieres bonnes reponses apparaitront ici."
                    : "No data yet. Your first correct answers will appear here."}
              </p>
              <p>
                <span className="font-semibold text-white">
                  {lang === "fr" ? "A surveiller" : "Watch next"}:
                </span>{" "}
                {weakestTopic
                  ? `${topicLabels[weakestTopic.topic][lang]} ${
                      lang === "fr" ? `a ${weakestTopic.accuracy}%` : `at ${weakestTopic.accuracy}%`
                    }`
                  : lang === "fr"
                    ? "Essayez un quiz ou un lab pour faire apparaitre vos angles morts."
                    : "Try a quiz or lab to surface your blind spots."}
              </p>
            </div>
          </div>
        </div>

        <Link
          href={started ? "/dashboard" : `/learn/${nextModule.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-50"
        >
          {started
            ? lang === "fr"
              ? "Ouvrir mon tableau de bord"
              : "Open my dashboard"
            : lang === "fr"
              ? "Commencer le premier module"
              : "Begin the first module"}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
