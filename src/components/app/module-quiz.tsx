"use client";

import { useMemo, useState, useTransition } from "react";
import { CheckCircle2, CircleHelp, RefreshCcw, Trophy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { QuizQuestion } from "@/lib/course-data";
import { storageKeys } from "@/lib/storage";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { cn } from "@/lib/utils";

type AttemptSnapshot = {
  score: number;
  maxScore: number;
  answers: Record<string, string>;
  completed: boolean;
  updatedAt: string;
};

type AttemptStore = Record<string, AttemptSnapshot>;
type ProgressStore = Record<
  string,
  {
    completed?: boolean;
    progressPercent?: number;
    updatedAt?: string;
  }
>;

export function ModuleQuiz({
  moduleSlug,
  questions,
}: {
  moduleSlug: string;
  questions: QuizQuestion[];
}) {
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") {
      return {};
    }

    const savedAttempts = window.localStorage.getItem(storageKeys.quizAttempts);

    if (!savedAttempts) {
      return {};
    }

    try {
      const parsed = JSON.parse(savedAttempts) as AttemptStore;
      return parsed[moduleSlug]?.answers ?? {};
    } catch {
      return {};
    }
  });
  const [result, setResult] = useState<AttemptSnapshot | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const savedAttempts = window.localStorage.getItem(storageKeys.quizAttempts);

    if (!savedAttempts) {
      return null;
    }

    try {
      const parsed = JSON.parse(savedAttempts) as AttemptStore;
      return parsed[moduleSlug] ?? null;
    } catch {
      return null;
    }
  });
  const [isPending, startTransition] = useTransition();

  const answeredCount = useMemo(
    () => Object.keys(answers).filter((key) => answers[key]).length,
    [answers],
  );

  const completionPercent = useMemo(
    () => Math.round((answeredCount / questions.length) * 100),
    [answeredCount, questions.length],
  );

  function saveLocally(snapshot: AttemptSnapshot) {
    const existingAttempts = window.localStorage.getItem(storageKeys.quizAttempts);
    const attempts = existingAttempts ? (JSON.parse(existingAttempts) as AttemptStore) : {};
    attempts[moduleSlug] = snapshot;
    window.localStorage.setItem(storageKeys.quizAttempts, JSON.stringify(attempts));

    const existingProgress = window.localStorage.getItem(storageKeys.moduleProgress);
    const progress = existingProgress ? (JSON.parse(existingProgress) as ProgressStore) : {};
    progress[moduleSlug] = {
      completed: snapshot.completed,
      progressPercent: snapshot.completed ? 100 : Math.max(70, completionPercent),
      updatedAt: snapshot.updatedAt,
    };
    window.localStorage.setItem(storageKeys.moduleProgress, JSON.stringify(progress));
  }

  async function persistRemotely(snapshot: AttemptSnapshot) {
    await Promise.allSettled([
      fetch("/api/quiz-attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleSlug,
          score: snapshot.score,
          maxScore: snapshot.maxScore,
          answers: snapshot.answers,
        }),
      }),
      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleSlug,
          progressPercent: snapshot.completed ? 100 : Math.max(70, completionPercent),
          completed: snapshot.completed,
          source: "module_quiz",
        }),
      }),
    ]);
  }

  function handleSubmit() {
    if (answeredCount !== questions.length) {
      toast.error("Answer every question before submitting.");
      return;
    }

    const score = questions.reduce((total, question) => {
      return total + Number(answers[question.id] === question.correctOptionId);
    }, 0);
    const maxScore = questions.length;
    const completed = score / maxScore >= 0.6;
    const snapshot: AttemptSnapshot = {
      score,
      maxScore,
      answers,
      completed,
      updatedAt: new Date().toISOString(),
    };

    setResult(snapshot);
    saveLocally(snapshot);

    startTransition(() => {
      void persistRemotely(snapshot);
    });

    toast.success(
      completed
        ? "Module progress saved."
        : "Quiz saved. Review the explanations and try again.",
    );
  }

  function handleReset() {
    setAnswers({});
    setResult(null);
  }

  return (
    <section className="rounded-[2rem] border border-white/65 bg-white/80 p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Interactive exercise
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950">Module checkpoint</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Answer in either language. The quiz uses the same underlying concept, not literal duplicated wording.
          </p>
        </div>
        <div className="min-w-56 rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            <span>Answered</span>
            <span>{answeredCount}/{questions.length}</span>
          </div>
          <Progress value={completionPercent} className="mt-3 h-2.5 bg-slate-200" />
          {result ? (
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-700">
              <Trophy className="size-4 text-amber-500" />
              Score {result.score}/{result.maxScore}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {questions.map((question, index) => {
          const answer = answers[question.id];
          const isCorrect = result ? answer === question.correctOptionId : false;

          return (
            <article
              key={question.id}
              className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/65 p-4"
            >
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="rounded-full border-slate-200 bg-white">
                  Q{index + 1}
                </Badge>
                <CircleHelp className="size-4 text-slate-500" />
              </div>
              <div className="mt-4">
                <BilingualCopy value={question.prompt} />
              </div>
              <div className="mt-4 grid gap-3">
                {question.options.map((option) => {
                  const isSelected = answer === option.id;
                  const isRightAnswer = question.correctOptionId === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={cn(
                        "rounded-[1.5rem] border p-4 text-left transition",
                        isSelected
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                        result && isRightAnswer && "border-emerald-500 bg-emerald-50 text-slate-950",
                        result && isSelected && !isCorrect && "border-rose-300 bg-rose-50 text-slate-950",
                      )}
                      onClick={() =>
                        setAnswers((current) => ({
                          ...current,
                          [question.id]: option.id,
                        }))
                      }
                    >
                      <div className="text-sm font-semibold">{option.label.en}</div>
                      <div className="mt-1 text-sm opacity-80">{option.label.fr}</div>
                    </button>
                  );
                })}
              </div>
              {result ? (
                <div
                  className={cn(
                    "mt-4 rounded-2xl border p-4",
                    isCorrect
                      ? "border-emerald-200 bg-emerald-50/80"
                      : "border-amber-200 bg-amber-50/80",
                  )}
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                    <CheckCircle2 className="size-4" />
                    {isCorrect ? "Correct" : "Review the reasoning"}
                  </div>
                  <BilingualCopy value={question.explanation} compact containerClassName="mt-3 border-0 bg-transparent p-0 shadow-none" />
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button type="button" className="rounded-full" disabled={isPending} onClick={handleSubmit}>
          Submit quiz
        </Button>
        <Button type="button" variant="outline" className="rounded-full" onClick={handleReset}>
          <RefreshCcw className="size-4" />
          Reset
        </Button>
        {result ? (
          <p className="text-sm text-slate-600">
            {result.completed
              ? "This module is marked as completed."
              : "A score of 60% or more marks the module as completed."}
          </p>
        ) : null}
      </div>
    </section>
  );
}
