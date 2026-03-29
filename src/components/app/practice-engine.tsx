"use client";

import { useMemo, useState, useTransition } from "react";
import { ArrowRight, Brain, Gauge, Target } from "lucide-react";
import { toast } from "sonner";
import {
  practiceQuestions,
  practiceTopicLabels,
  type PracticeQuestion,
  type PracticeTopic,
} from "@/lib/platform-data";
import {
  getTopicAccuracy,
  readPracticeAttempts,
  type PracticeConfidence,
  type StoredPracticeAttempt,
  writePracticeAttempts,
} from "@/lib/learning-insights";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { cn } from "@/lib/utils";

const confidenceOptions: Array<{
  value: PracticeConfidence;
  label: string;
}> = [
  { value: "low", label: "Low confidence" },
  { value: "medium", label: "Medium confidence" },
  { value: "high", label: "High confidence" },
];

type ActiveFilter = "recommended" | "all" | PracticeTopic;

type MatchingAnswer = Record<string, string>;
type DraftAnswerValue = string | boolean | MatchingAnswer | undefined;

function resolveCorrect(question: PracticeQuestion, answer: DraftAnswerValue) {
  if (question.type === "true-false") {
    return answer === question.correctValue;
  }

  if (question.type === "matching") {
    if (!answer || typeof answer !== "object" || Array.isArray(answer)) {
      return false;
    }

    return Object.entries(question.correctMatches).every(
      ([promptId, optionId]) => answer[promptId] === optionId,
    );
  }

  return answer === question.correctOptionId;
}

function accuracyPercent(attempts: StoredPracticeAttempt[]) {
  if (attempts.length === 0) {
    return 0;
  }

  return Math.round(
    (attempts.filter((attempt) => attempt.correct).length / attempts.length) * 100,
  );
}

export function PracticeEngine() {
  const [attempts, setAttempts] = useState(() => readPracticeAttempts().attempts);
  const [draftAnswers, setDraftAnswers] = useState<Record<string, DraftAnswerValue>>({});
  const [confidenceByQuestion, setConfidenceByQuestion] = useState<
    Record<string, PracticeConfidence>
  >({});
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("recommended");
  const [activeQuestionId, setActiveQuestionId] = useState(practiceQuestions[0]?.id);
  const [submittedQuestionId, setSubmittedQuestionId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const { weakTopics, strengths } = useMemo(() => getTopicAccuracy(attempts), [attempts]);
  const recommendedTopic = weakTopics[0]?.topic;

  const filteredQuestions = useMemo(() => {
    if (activeFilter === "all") {
      return practiceQuestions;
    }

    if (activeFilter === "recommended") {
      if (!recommendedTopic) {
        return practiceQuestions;
      }

      return practiceQuestions.filter((question) => question.topic === recommendedTopic);
    }

    return practiceQuestions.filter((question) => question.topic === activeFilter);
  }, [activeFilter, recommendedTopic]);

  const resolvedActiveQuestionId = filteredQuestions.some(
    (question) => question.id === activeQuestionId,
  )
    ? activeQuestionId
    : filteredQuestions[0]?.id;

  const activeQuestion =
    filteredQuestions.find((question) => question.id === resolvedActiveQuestionId) ??
    filteredQuestions[0];
  const activeAnswer = activeQuestion ? draftAnswers[activeQuestion.id] : undefined;
  const activeConfidence = activeQuestion
    ? confidenceByQuestion[activeQuestion.id] ?? "medium"
    : "medium";

  const answeredQuestionIds = new Set(attempts.map((attempt) => attempt.questionId));
  const practiceCoverage = Math.round(
    (answeredQuestionIds.size / practiceQuestions.length) * 100,
  );

  async function persistPractice(nextAttempts: StoredPracticeAttempt[]) {
    writePracticeAttempts({ attempts: nextAttempts });

    await fetch("/api/simulations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        simulationType: "practice_lab",
        simulationKey: "core_practice",
        payload: {
          attempts: nextAttempts,
          accuracy: accuracyPercent(nextAttempts),
        },
      }),
    }).catch(() => undefined);
  }

  function submitCurrentQuestion() {
    if (!activeQuestion) {
      return;
    }

    if (typeof activeAnswer === "undefined") {
      toast.error("Answer the current question before submitting.");
      return;
    }

    const isCorrect = resolveCorrect(activeQuestion, activeAnswer);
    const nextAttempt: StoredPracticeAttempt = {
      questionId: activeQuestion.id,
      topic: activeQuestion.topic,
      type: activeQuestion.type,
      correct: isCorrect,
      confidence: activeConfidence,
      answeredAt: new Date().toISOString(),
    };
    const nextAttempts = [...attempts, nextAttempt];

    setAttempts(nextAttempts);
    setSubmittedQuestionId(activeQuestion.id);

    startTransition(() => {
      void persistPractice(nextAttempts);
    });

    toast.success(isCorrect ? "Practice answer saved." : "Saved. Review the explanation.");
  }

  function nextQuestion() {
    if (!activeQuestion) {
      return;
    }

    const currentIndex = filteredQuestions.findIndex((question) => question.id === activeQuestion.id);
    const next = filteredQuestions[currentIndex + 1] ?? filteredQuestions[0];

    setActiveQuestionId(next?.id);
    setSubmittedQuestionId(null);
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
      <div className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Practice engine
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              Mixed-format drills with adaptive focus
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              The engine mixes multiple choice, true/false, matching, scenario classification,
              clause-control linking, and glossary recall. Recommended practice follows your
              weakest topic.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Current recommendation
            </div>
            <div className="mt-2 text-lg font-semibold text-slate-950">
              {recommendedTopic ? practiceTopicLabels[recommendedTopic].en : "Balanced review"}
            </div>
            <div className="text-sm text-slate-500">
              {recommendedTopic
                ? practiceTopicLabels[recommendedTopic].fr
                : "Aucune faiblesse dominante pour le moment"}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {(["recommended", "all", "clauses", "controls", "audit", "risk", "glossary"] as const).map(
            (filter) => (
              <button
                key={filter}
                type="button"
                className={cn(
                  "rounded-full border px-3 py-2 text-sm transition",
                  activeFilter === filter
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white",
                )}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === "recommended"
                  ? "Recommended"
                  : filter === "all"
                    ? "All topics"
                    : practiceTopicLabels[filter].en}
              </button>
            ),
          )}
        </div>

        {activeQuestion ? (
          <article className="mt-6 rounded-[1.85rem] border border-slate-200/80 bg-slate-50/70 p-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="rounded-full bg-slate-950 text-white">
                {practiceTopicLabels[activeQuestion.topic].en}
              </Badge>
              <Badge variant="outline" className="rounded-full border-slate-200 bg-white">
                {activeQuestion.type}
              </Badge>
            </div>

            <BilingualCopy
              value={activeQuestion.prompt}
              containerClassName="mt-5 border-0 bg-transparent p-0 shadow-none"
            />

            <div className="mt-5">
              <QuestionInput
                question={activeQuestion}
                answer={activeAnswer}
                onAnswerChange={(value) =>
                  setDraftAnswers((current) => ({
                    ...current,
                    [activeQuestion.id]: value,
                  }))
                }
              />
            </div>

            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Confidence
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {confidenceOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={cn(
                      "rounded-full border px-3 py-2 text-sm transition",
                      activeConfidence === option.value
                        ? "border-sky-700 bg-sky-50 text-sky-900"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                    )}
                    onClick={() =>
                      setConfidenceByQuestion((current) => ({
                        ...current,
                        [activeQuestion.id]: option.value,
                      }))
                    }
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {submittedQuestionId === activeQuestion.id ? (
              <div
                className={cn(
                  "mt-6 rounded-2xl border p-4",
                  resolveCorrect(activeQuestion, activeAnswer)
                    ? "border-emerald-200 bg-emerald-50/80"
                    : "border-amber-200 bg-amber-50/80",
                )}
              >
                <div className="text-sm font-medium text-slate-900">
                  {resolveCorrect(activeQuestion, activeAnswer)
                    ? "Correct"
                    : "Review the reasoning"}
                </div>
                <BilingualCopy
                  value={activeQuestion.explanation}
                  compact
                  containerClassName="mt-3 border-0 bg-transparent p-0 shadow-none"
                />
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button type="button" className="rounded-full" disabled={isPending} onClick={submitCurrentQuestion}>
                Submit answer
              </Button>
              <Button type="button" variant="outline" className="rounded-full" onClick={nextQuestion}>
                Next question
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </article>
        ) : (
          <div className="mt-6 rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50/70 p-6 text-sm text-slate-500">
            No questions match the current filter.
          </div>
        )}
      </div>

      <aside className="space-y-5">
        <article className="rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Practice metrics
              </p>
              <h4 className="mt-2 text-xl font-semibold text-slate-950">Progress and mastery</h4>
            </div>
            <Gauge className="size-5 text-sky-700" />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <MetricCard label="Attempts" value={String(attempts.length)} />
            <MetricCard label="Accuracy" value={`${accuracyPercent(attempts)}%`} />
            <MetricCard label="Coverage" value={`${practiceCoverage}%`} />
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Brain className="size-5 text-slate-700" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Weak areas
              </p>
              <h4 className="mt-2 text-xl font-semibold text-slate-950">
                Adaptive practice focus
              </h4>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {weakTopics.length > 0 ? (
              weakTopics.slice(0, 3).map((topic) => (
                <TopicAccuracyCard
                  key={topic.topic}
                  label={practiceTopicLabels[topic.topic]}
                  accuracy={topic.accuracy}
                  attempts={topic.attempts}
                />
              ))
            ) : (
              <p className="text-sm leading-6 text-slate-600">
                Start answering questions and the engine will surface more clause, control, risk,
                audit, or glossary practice where needed.
              </p>
            )}
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Target className="size-5 text-emerald-700" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Strong topics
              </p>
              <h4 className="mt-2 text-xl font-semibold text-slate-950">What is sticking</h4>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {strengths.length > 0 ? (
              strengths.slice(0, 3).map((topic) => (
                <TopicAccuracyCard
                  key={topic.topic}
                  label={practiceTopicLabels[topic.topic]}
                  accuracy={topic.accuracy}
                  attempts={topic.attempts}
                />
              ))
            ) : (
              <p className="text-sm leading-6 text-slate-600">
                Strong topics appear after repeated correct answers.
              </p>
            )}
          </div>
        </article>
      </aside>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3">
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-950">{value}</div>
    </div>
  );
}

function TopicAccuracyCard({
  label,
  accuracy,
  attempts,
}: {
  label: { en: string; fr: string };
  accuracy: number;
  attempts: number;
}) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/70 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-medium text-slate-950">{label.en}</div>
          <div className="text-sm text-slate-500">{label.fr}</div>
        </div>
        <div className="text-sm font-semibold text-slate-700">{accuracy}%</div>
      </div>
      <Progress value={accuracy} className="mt-3 h-2.5 bg-slate-200" />
      <div className="mt-2 text-xs text-slate-500">{attempts} attempts</div>
    </div>
  );
}

function QuestionInput({
  question,
  answer,
  onAnswerChange,
}: {
  question: PracticeQuestion;
  answer: DraftAnswerValue;
  onAnswerChange: (value: DraftAnswerValue) => void;
}) {
  if (question.type === "true-false") {
    return (
      <div className="flex flex-wrap gap-2">
        {[true, false].map((value) => (
          <button
            key={String(value)}
            type="button"
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition",
              answer === value
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
            )}
            onClick={() => onAnswerChange(value)}
          >
            {value ? "True" : "False"}
          </button>
        ))}
      </div>
    );
  }

  if (question.type === "matching") {
    const matchingAnswer =
      answer && typeof answer === "object" && !Array.isArray(answer) ? (answer as MatchingAnswer) : {};

    return (
      <div className="space-y-4">
        {question.prompts.map((prompt) => (
          <div key={prompt.id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-sm font-medium text-slate-950">{prompt.label.en}</div>
            <div className="text-sm text-slate-500">{prompt.label.fr}</div>
            <select
              className="mt-3 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400"
              value={matchingAnswer[prompt.id] ?? ""}
              onChange={(event) =>
                onAnswerChange({
                  ...matchingAnswer,
                  [prompt.id]: event.target.value,
                })
              }
            >
              <option value="">Select a match</option>
              {question.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label.en} / {option.label.fr}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    );
  }

  if (question.type === "scenario-classification") {
    return (
      <div className="space-y-4">
        <BilingualCopy
          value={question.caseContext}
          containerClassName="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-none"
        />
        <div className="flex flex-wrap gap-2">
          {question.options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition",
                answer === option.id
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
              )}
              onClick={() => onAnswerChange(option.id)}
            >
              {option.label.en}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === "clause-control-link") {
    return (
      <div className="space-y-4">
        <BilingualCopy
          value={question.leftLabel}
          containerClassName="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-none"
        />
        <div className="grid gap-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={cn(
                "rounded-[1.5rem] border p-4 text-left transition",
                answer === option.id
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
              )}
              onClick={() => onAnswerChange(option.id)}
            >
              <div className="font-medium">{option.label.en}</div>
              <div className="text-sm opacity-80">{option.label.fr}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === "glossary-recall") {
    return (
      <div className="space-y-4">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
          <div className="text-xl font-semibold text-slate-950">{question.term.en}</div>
          <div className="text-sm text-slate-500">{question.term.fr}</div>
        </div>
        <div className="grid gap-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={cn(
                "rounded-[1.5rem] border p-4 text-left transition",
                answer === option.id
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
              )}
              onClick={() => onAnswerChange(option.id)}
            >
              <div className="font-medium">{option.label.en}</div>
              <div className="text-sm opacity-80">{option.label.fr}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {question.options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={cn(
            "rounded-[1.5rem] border p-4 text-left transition",
            answer === option.id
              ? "border-slate-950 bg-slate-950 text-white"
              : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
          )}
          onClick={() => onAnswerChange(option.id)}
        >
          <div className="font-medium">{option.label.en}</div>
          <div className="text-sm opacity-80">{option.label.fr}</div>
        </button>
      ))}
    </div>
  );
}
