"use client";

import { useCallback, useRef, useSyncExternalStore, type ReactNode } from "react";
import { BookCheck, Brain, FileCheck2, Languages, Radar, Trophy } from "lucide-react";
import { buildDashboardSnapshot, type DashboardSnapshot } from "@/lib/learning-insights";
import { practiceTopicLabels } from "@/lib/platform-data";
import { storageKeys, subscribeToStorageKey } from "@/lib/storage";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const emptySnapshot = buildDashboardSnapshot();

export function DashboardOverview() {
  const cachedRef = useRef<{ serialized: string; snapshot: DashboardSnapshot } | null>(null);

  const getSnapshot = useCallback((): DashboardSnapshot => {
    const next = buildDashboardSnapshot();
    const serialized = JSON.stringify(next);
    if (cachedRef.current && cachedRef.current.serialized === serialized) {
      return cachedRef.current.snapshot;
    }
    cachedRef.current = { serialized, snapshot: next };
    return next;
  }, []);

  const snapshot = useSyncExternalStore(
    subscribeToDashboardStorage,
    getSnapshot,
    () => emptySnapshot,
  );

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <StatCard
          icon={<BookCheck className="size-5 text-sky-700" />}
          label="Completed modules"
          value={String(snapshot.completedModules)}
          helper={`${snapshot.inProgressModules} in progress`}
        />
        <StatCard
          icon={<Trophy className="size-5 text-amber-600" />}
          label="Quiz history"
          value={String(snapshot.quizHistoryCount)}
          helper="module and practice attempts"
        />
        <StatCard
          icon={<Radar className="size-5 text-emerald-700" />}
          label="Scenario completions"
          value={String(snapshot.scenarioCompletions)}
          helper="risk, SoA, audit, nonconformity"
        />
        <StatCard
          icon={<Languages className="size-5 text-slate-700" />}
          label="Vocabulary progress"
          value={`${snapshot.vocabularyProgress}%`}
          helper="bilingual terminology growth"
        />
        <StatCard
          icon={<FileCheck2 className="size-5 text-violet-700" />}
          label="Mock exams"
          value={String(snapshot.mockExamAttempts)}
          helper={
            snapshot.bestMockExamScore !== null
              ? `best score ${snapshot.bestMockExamScore}%`
              : "no mock exam completed yet"
          }
        />
        <StatCard
          icon={<Brain className="size-5 text-rose-700" />}
          label="Readiness score"
          value={`${snapshot.readinessScore}%`}
          helper="overall operational learning signal"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <article className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Readiness pulse
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950">
            Learning momentum across modules and drills
          </h3>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <ProgressPanel
              label="Module completion"
              value={snapshot.completedModules > 0 ? snapshot.readinessScore : 0}
              helper={`${snapshot.completedModules} modules completed`}
            />
            <ProgressPanel
              label="Average module progress"
              value={snapshot.averageModuleProgress}
              helper="readiness inside the guided path"
            />
            <ProgressPanel
              label="Vocabulary growth"
              value={snapshot.vocabularyProgress}
              helper="glossary and bilingual terminology"
            />
            <ProgressPanel
              label="Final readiness score"
              value={snapshot.readinessScore}
              helper="combined module, drill, and vocab signal"
            />
          </div>
        </article>

        <div className="space-y-6">
          <article className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Weak areas
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              Where to focus next
            </h3>
            <div className="mt-5 space-y-3">
              {snapshot.weakTopics.length > 0 ? (
                snapshot.weakTopics.map((topic) => (
                  <TopicCard
                    key={topic.topic}
                    label={practiceTopicLabels[topic.topic]}
                    accuracy={topic.accuracy}
                    attempts={topic.attempts}
                    tone="weak"
                  />
                ))
              ) : (
                <p className="text-sm leading-6 text-slate-600">
                  Start modules and practice drills to surface weak-topic recommendations here.
                </p>
              )}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Strengths
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              Areas that are sticking
            </h3>
            <div className="mt-5 space-y-3">
              {snapshot.strengths.length > 0 ? (
                snapshot.strengths.map((topic) => (
                  <TopicCard
                    key={topic.topic}
                    label={practiceTopicLabels[topic.topic]}
                    accuracy={topic.accuracy}
                    attempts={topic.attempts}
                    tone="strong"
                  />
                ))
              ) : (
                <p className="text-sm leading-6 text-slate-600">
                  Strength indicators appear after repeated correct practice answers.
                </p>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function subscribeToDashboardStorage(callback: () => void) {
  const unsubscribeModule = subscribeToStorageKey(storageKeys.moduleProgress, callback);
  const unsubscribeQuiz = subscribeToStorageKey(storageKeys.quizAttempts, callback);
  const unsubscribePractice = subscribeToStorageKey(storageKeys.practiceAttempts, callback);
  const unsubscribeSimulation = subscribeToStorageKey(storageKeys.simulations, callback);

  return () => {
    unsubscribeModule();
    unsubscribeQuiz();
    unsubscribePractice();
    unsubscribeSimulation();
  };
}

function StatCard({
  icon,
  label,
  value,
  helper,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <article className="rounded-[1.75rem] border border-white/70 bg-white/82 p-5 shadow-[0_24px_72px_-48px_rgba(15,23,42,0.35)] backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {label}
        </div>
        {icon}
      </div>
      <div className="mt-3 text-3xl font-semibold text-slate-950">{value}</div>
      <div className="mt-1 text-sm text-slate-500">{helper}</div>
    </article>
  );
}

function ProgressPanel({
  label,
  value,
  helper,
}: {
  label: string;
  value: number;
  helper: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/75 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-medium text-slate-950">{label}</div>
        <Badge variant="outline" className="rounded-full border-slate-200 bg-white">
          {value}%
        </Badge>
      </div>
      <Progress value={value} className="mt-4 h-2.5 bg-slate-200" />
      <div className="mt-2 text-sm text-slate-500">{helper}</div>
    </div>
  );
}

function TopicCard({
  label,
  accuracy,
  attempts,
  tone,
}: {
  label: { en: string; fr: string };
  accuracy: number;
  attempts: number;
  tone: "weak" | "strong";
}) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/75 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-medium text-slate-950">{label.en}</div>
          <div className="text-sm text-slate-500">{label.fr}</div>
        </div>
        <Badge
          className={
            tone === "weak"
              ? "rounded-full bg-amber-100 text-amber-900"
              : "rounded-full bg-emerald-100 text-emerald-900"
          }
        >
          {accuracy}%
        </Badge>
      </div>
      <div className="mt-3 text-sm text-slate-500">{attempts} attempts</div>
    </div>
  );
}
