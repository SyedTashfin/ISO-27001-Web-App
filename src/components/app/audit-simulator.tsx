"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, FileSearch, Scale } from "lucide-react";
import { toast } from "sonner";
import { auditExercises, findingExamples, type FindingSeverity } from "@/lib/course-data";
import { readSimulationStore, writeSimulationStore } from "@/lib/learning-insights";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { cn } from "@/lib/utils";

const severityOptions: { value: FindingSeverity; label: string }[] = [
  { value: "major", label: "Major NC" },
  { value: "minor", label: "Minor NC" },
  { value: "observation", label: "Observation" },
];

const clauseOptions = ["4", "5", "6", "7", "8", "9", "10"] as const;

const exerciseMeta: Record<
  string,
  {
    clause: (typeof clauseOptions)[number];
    followUpQuestion: string;
  }
> = {
  "audit-1": {
    clause: "8",
    followUpQuestion:
      "Show me one real incident from the last quarter and walk me through the defined escalation path versus what actually happened.",
  },
  "audit-2": {
    clause: "8",
    followUpQuestion:
      "How do you detect a missed access review before an auditor samples it?",
  },
  "audit-3": {
    clause: "9",
    followUpQuestion:
      "How does management turn those trend observations into decisions or corrective actions?",
  },
};

type AuditMode = "internal" | "external";
type AuditAnswers = Record<
  string,
  {
    severity?: FindingSeverity;
    clause?: string;
  }
>;

export function AuditSimulator() {
  const [mode, setMode] = useState<AuditMode>("internal");
  const [answers, setAnswers] = useState<AuditAnswers>(() => {
    const store = readSimulationStore();
    const bucket = store.audit_lab as { answers?: AuditAnswers } | undefined;

    return bucket?.answers ?? {};
  });
  const [submitted, setSubmitted] = useState(() => {
    const store = readSimulationStore();
    const bucket = store.audit_lab as { submitted?: boolean } | undefined;

    return bucket?.submitted ?? false;
  });
  const [isPending, startTransition] = useTransition();

  const score = auditExercises.reduce((total, exercise) => {
    const current = answers[exercise.id];
    const clauseCorrect = current?.clause === exerciseMeta[exercise.id]?.clause;
    const severityCorrect = current?.severity === exercise.correctSeverity;

    return total + Number(Boolean(clauseCorrect)) + Number(Boolean(severityCorrect));
  }, 0);

  async function persist() {
    const nextState = {
      ...readSimulationStore(),
      audit_lab: {
        answers,
        submitted: true,
        mode,
        score,
        maxScore: auditExercises.length * 2,
      },
    };

    writeSimulationStore(nextState);

    await fetch("/api/simulations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        simulationType: "audit_lab",
        simulationKey: mode,
        payload: {
          answers,
          score,
          maxScore: auditExercises.length * 2,
        },
      }),
    }).catch(() => undefined);
  }

  function handleSubmit() {
    const isComplete = auditExercises.every(
      (exercise) => answers[exercise.id]?.severity && answers[exercise.id]?.clause,
    );

    if (!isComplete) {
      toast.error("Complete the severity and clause answers for every case.");
      return;
    }

    setSubmitted(true);

    startTransition(() => {
      void persist();
    });

    toast.success("Audit lab progress saved.");
  }

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
        <div className="flex flex-wrap gap-2">
          {(["internal", "external"] as const).map((value) => (
            <button
              key={value}
              type="button"
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition",
                mode === value
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white",
              )}
              onClick={() => setMode(value)}
            >
              {value === "internal" ? "Internal Audit" : "External Audit"}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <ModeCard
            title={mode === "internal" ? "Purpose of internal audit" : "Certification mindset"}
            body={
              mode === "internal"
                ? "Plan sampling, challenge the operating reality, interview process owners, and surface improvement opportunities before certification pressure does it for you."
                : "Verify scope, review sampled evidence, validate control implementation, and classify gaps proportionally against the certifiable ISMS requirements."
            }
          />
          <ModeCard
            title={mode === "internal" ? "What to focus on" : "What auditors test"}
            body={
              mode === "internal"
                ? "Process consistency, root causes, weak ownership, and whether the evidence trail is usable for management improvement."
                : "Scope credibility, document review, evidence reliability, management review quality, and whether controls are operating as claimed."
            }
          />
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
        <div className="space-y-4 rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Audit exercises
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950">
                Evidence, clause impact, and finding classification
              </h3>
            </div>
            <Scale className="size-5 text-sky-700" />
          </div>

          {auditExercises.map((exercise, index) => {
            const answer = answers[exercise.id];
            const clauseCorrect = submitted
              ? answer?.clause === exerciseMeta[exercise.id]?.clause
              : false;
            const severityCorrect = submitted
              ? answer?.severity === exercise.correctSeverity
              : false;

            return (
              <article
                key={exercise.id}
                className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/70 p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="rounded-full border-slate-200 bg-white">
                    Case {index + 1}
                  </Badge>
                  <Badge variant="outline" className="rounded-full border-slate-200 bg-white">
                    Mode {mode}
                  </Badge>
                </div>
                <div className="mt-4">
                  <BilingualCopy
                    value={exercise.title}
                    compact
                    containerClassName="border-0 bg-transparent p-0 shadow-none"
                  />
                </div>
                <div className="mt-4">
                  <BilingualCopy value={exercise.context} />
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    What evidence would you ask for?
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {exercise.evidence.map((item) => (
                      <li key={item.en}>
                        <span className="font-medium text-slate-950">{item.en}</span>
                        <span className="text-slate-400"> / {item.fr}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Which clause is affected?
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {clauseOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={cn(
                          "rounded-full border px-3 py-2 text-sm transition",
                          answer?.clause === option
                            ? "border-sky-700 bg-sky-50 text-sky-900"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50",
                        )}
                        onClick={() =>
                          setAnswers((current) => ({
                            ...current,
                            [exercise.id]: {
                              ...current[exercise.id],
                              clause: option,
                            },
                          }))
                        }
                      >
                        Clause {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Is this major, minor, or an observation?
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {severityOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={cn(
                          "rounded-full border px-3 py-2 text-sm transition",
                          answer?.severity === option.value
                            ? "border-slate-950 bg-slate-950 text-white"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50",
                        )}
                        onClick={() =>
                          setAnswers((current) => ({
                            ...current,
                            [exercise.id]: {
                              ...current[exercise.id],
                              severity: option.value,
                            },
                          }))
                        }
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {submitted ? (
                  <div className="mt-5 space-y-3">
                    <div
                      className={cn(
                        "rounded-2xl border p-4",
                        clauseCorrect && severityCorrect
                          ? "border-emerald-200 bg-emerald-50/80"
                          : "border-amber-200 bg-amber-50/80",
                      )}
                    >
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                        <CheckCircle2 className="size-4" />
                        {clauseCorrect && severityCorrect
                          ? "Reasoning aligned"
                          : `Expected clause ${exerciseMeta[exercise.id]?.clause}, severity ${exercise.correctSeverity}`}
                      </div>
                      <BilingualCopy
                        value={exercise.rationale}
                        compact
                        containerClassName="mt-3 border-0 bg-transparent p-0 shadow-none"
                      />
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                      <div className="font-medium text-slate-950">
                        What follow-up question would an auditor ask?
                      </div>
                      <p className="mt-2 leading-6 text-slate-600">
                        {exerciseMeta[exercise.id]?.followUpQuestion}
                      </p>
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}

          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" disabled={isPending} className="rounded-full" onClick={handleSubmit}>
              Submit audit review
            </Button>
            {submitted ? (
              <p className="text-sm text-slate-600">
                Score {score}/{auditExercises.length * 2}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-4 rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <FileSearch className="size-5 text-slate-700" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Severity guide
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">
                What auditors typically mean
              </h3>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50/70 p-4">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-800">
              Major nonconformity
            </div>
            <BilingualCopy
              value={findingExamples.major}
              compact
              containerClassName="mt-3 border-0 bg-transparent p-0 shadow-none"
            />
          </div>
          <div className="rounded-[1.75rem] border border-amber-200 bg-amber-50/80 p-4">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">
              Minor nonconformity
            </div>
            <BilingualCopy
              value={findingExamples.minor}
              compact
              containerClassName="mt-3 border-0 bg-transparent p-0 shadow-none"
            />
          </div>
          <div className="rounded-[1.75rem] border border-sky-200 bg-sky-50/80 p-4">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-800">
              Observation
            </div>
            <BilingualCopy
              value={findingExamples.observation}
              compact
              containerClassName="mt-3 border-0 bg-transparent p-0 shadow-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ModeCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/75 p-4">
      <div className="text-sm font-semibold text-slate-950">{title}</div>
      <div className="mt-2 text-sm leading-6 text-slate-600">{body}</div>
    </div>
  );
}
