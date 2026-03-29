"use client";

import { useDeferredValue, useMemo, useState, useTransition, type ReactNode } from "react";
import { CheckCircle2, Filter, Search, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import {
  evidenceStrengthLabels,
  nonconformityCaseStudies,
  type EvidenceStrength,
} from "@/lib/practical-learning-data";
import { readSimulationStore, writeSimulationStore } from "@/lib/learning-insights";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { WorkplacePhrasingPanel } from "@/components/app/workplace-phrasing-panel";
import { cn } from "@/lib/utils";
import type { FindingSeverity } from "@/lib/course-data";

const severityOptions: Array<{
  id: FindingSeverity;
  label: string;
}> = [
  { id: "major", label: "Major nonconformity" },
  { id: "minor", label: "Minor nonconformity" },
  { id: "observation", label: "Observation" },
];

const evidenceOptions: EvidenceStrength[] = ["sufficient", "weak", "partial", "absent"];

type CaseAnswer = {
  classification?: FindingSeverity;
  evidenceAssessment?: EvidenceStrength;
};

type CaseAnswers = Record<string, CaseAnswer>;

export function NonconformityLab() {
  const [answers, setAnswers] = useState<CaseAnswers>(() => {
    const simulationStore = readSimulationStore();
    const bucket = simulationStore.nonconformity_lab as
      | {
          answers?: CaseAnswers;
        }
      | undefined;

    return bucket?.answers ?? {};
  });
  const [submitted, setSubmitted] = useState<boolean>(() => {
    const simulationStore = readSimulationStore();
    const bucket = simulationStore.nonconformity_lab as
      | {
          submitted?: boolean;
        }
      | undefined;

    return bucket?.submitted ?? false;
  });
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [severityFilter, setSeverityFilter] = useState<"all" | FindingSeverity>("all");
  const [clauseFilter, setClauseFilter] = useState("all");
  const [isPending, startTransition] = useTransition();

  const clauseOptions = useMemo(
    () =>
      Array.from(
        new Set(
          nonconformityCaseStudies.flatMap((item) =>
            item.relatedClauses.map((clause) => clause.split(".")[0]),
          ),
        ),
      ).sort(),
    [],
  );

  const filteredCases = useMemo(() => {
    return nonconformityCaseStudies.filter((item) => {
      const target = [
        item.title.en,
        item.title.fr,
        item.businessContext.en,
        item.businessContext.fr,
        item.scenario.en,
        item.scenario.fr,
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = deferredQuery ? target.includes(deferredQuery.toLowerCase()) : true;
      const matchesSeverity =
        severityFilter === "all" || item.classification === severityFilter;
      const matchesClause =
        clauseFilter === "all" ||
        item.relatedClauses.some((clause) => clause.split(".")[0] === clauseFilter);

      return matchesQuery && matchesSeverity && matchesClause;
    });
  }, [clauseFilter, deferredQuery, severityFilter]);

  const score = nonconformityCaseStudies.reduce((total, item) => {
    const current = answers[item.id];

    return (
      total +
      Number(current?.classification === item.classification) +
      Number(current?.evidenceAssessment === item.evidenceAssessment)
    );
  }, 0);

  async function persist() {
    const existing = readSimulationStore();
    const nextState = {
      ...existing,
      nonconformity_lab: {
        answers,
        submitted: true,
        score,
        maxScore: nonconformityCaseStudies.length * 2,
      },
    };

    writeSimulationStore(nextState);

    await fetch("/api/simulations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        simulationType: "nonconformity_lab",
        simulationKey: "finding-library",
        payload: {
          answers,
          score,
          maxScore: nonconformityCaseStudies.length * 2,
        },
      }),
    }).catch(() => undefined);
  }

  function handleSubmit() {
    const isComplete = nonconformityCaseStudies.every((item) => {
      const current = answers[item.id];

      return current?.classification && current?.evidenceAssessment;
    });

    if (!isComplete) {
      toast.error("Classify every case and judge the evidence quality before submitting.");
      return;
    }

    setSubmitted(true);

    startTransition(() => {
      void persist();
    });

    toast.success("Nonconformity reasoning saved.");
  }

  function updateAnswer(caseId: string, nextValue: Partial<CaseAnswer>) {
    setAnswers((current) => ({
      ...current,
      [caseId]: {
        ...current[caseId],
        ...nextValue,
      },
    }));
  }

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Nonconformity library
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              Twenty realistic ISO 27001 findings with evidence, auditor logic, and stronger
              corrective responses
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              For each case, judge the likely classification and the strength of the evidence. Then
              review what made the issue systemic or isolated, what an auditor would ask next, and
              how a good response differs from a weak one.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 px-4 py-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Score
            </div>
            <div className="mt-1 text-3xl font-semibold text-slate-950">
              {submitted ? `${score}/${nonconformityCaseStudies.length * 2}` : "In progress"}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <label className="space-y-2">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <Search className="size-3.5 text-slate-700" />
              Search the library
            </span>
            <Input
              value={query}
              placeholder="Try SoA, supplier, restore, scope, management review..."
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label className="space-y-2">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <Filter className="size-3.5 text-slate-700" />
              Severity
            </span>
            <select
              className="h-11 min-w-44 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400"
              value={severityFilter}
              onChange={(event) =>
                setSeverityFilter(event.target.value as "all" | FindingSeverity)
              }
            >
              <option value="all">All severities</option>
              {severityOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Clause
            </span>
            <select
              className="h-11 min-w-36 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400"
              value={clauseFilter}
              onChange={(event) => setClauseFilter(event.target.value)}
            >
              <option value="all">All clauses</option>
              {clauseOptions.map((option) => (
                <option key={option} value={option}>
                  Clause {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="space-y-5">
        {filteredCases.map((item, index) => {
          const current = answers[item.id] ?? {};
          const classificationCorrect = submitted
            ? current.classification === item.classification
            : false;
          const evidenceCorrect = submitted
            ? current.evidenceAssessment === item.evidenceAssessment
            : false;

          return (
            <article
              key={item.id}
              className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="rounded-full bg-slate-950 text-white">Case {index + 1}</Badge>
                {item.relatedClauses.map((clause) => (
                  <Badge
                    key={clause}
                    variant="outline"
                    className="rounded-full border-slate-200 bg-slate-50"
                  >
                    Clause {clause}
                  </Badge>
                ))}
              </div>

              <div className="mt-4">
                <div className="text-2xl font-semibold text-slate-950">{item.title.en}</div>
                <div className="text-sm text-slate-500">{item.title.fr}</div>
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-[0.88fr_1.12fr]">
                <article className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/75 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Business context
                  </div>
                  <BilingualCopy
                    value={item.businessContext}
                    compact
                    containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
                  />
                </article>
                <article className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/75 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Scenario
                  </div>
                  <BilingualCopy
                    value={item.scenario}
                    compact
                    containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
                  />
                </article>
              </div>

              <QuestionSection title="Would this likely be major, minor, or observation?">
                {severityOptions.map((option) => (
                  <ChoiceButton
                    key={option.id}
                    isSelected={current.classification === option.id}
                    onClick={() => updateAnswer(item.id, { classification: option.id })}
                  >
                    {option.label}
                  </ChoiceButton>
                ))}
              </QuestionSection>

              <QuestionSection title="Is the available evidence sufficient, weak, partial, or absent?">
                {evidenceOptions.map((option) => (
                  <ChoiceButton
                    key={option}
                    isSelected={current.evidenceAssessment === option}
                    onClick={() => updateAnswer(item.id, { evidenceAssessment: option })}
                  >
                    {evidenceStrengthLabels[option].en}
                  </ChoiceButton>
                ))}
              </QuestionSection>

              {submitted ? (
                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  <ResultCard
                    title={
                      classificationCorrect
                        ? "Classification aligned"
                        : `Expected: ${item.classification}`
                    }
                    success={classificationCorrect}
                  >
                    <BilingualCopy
                      value={item.why}
                      compact
                      containerClassName="border-0 bg-transparent p-0 shadow-none"
                    />
                  </ResultCard>
                  <ResultCard
                    title={
                      evidenceCorrect
                        ? "Evidence judgment aligned"
                        : `Expected evidence quality: ${evidenceStrengthLabels[item.evidenceAssessment].en}`
                    }
                    success={evidenceCorrect}
                  >
                    <BilingualCopy
                      value={item.systemicSignal}
                      compact
                      containerClassName="border-0 bg-transparent p-0 shadow-none"
                    />
                  </ResultCard>
                </div>
              ) : null}

              <details className="mt-5 rounded-[1.75rem] border border-slate-200/80 bg-slate-50/70 p-4">
                <summary className="cursor-pointer list-none">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                    <ShieldAlert className="size-4 text-slate-700" />
                    Open the full auditor view
                  </div>
                  <div className="mt-2 text-sm text-slate-500">
                    Evidence available, what the auditor notices, follow-up questions, corrective
                    action, and response quality.
                  </div>
                </summary>

                <div className="mt-5 space-y-5">
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Evidence available
                    </div>
                    <div className="mt-4 space-y-3">
                      {item.evidenceAvailable.map((evidenceItem) => (
                        <div
                          key={evidenceItem.label.en}
                          className="rounded-2xl border border-slate-200 bg-slate-50/75 p-4"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant="outline"
                              className="rounded-full border-slate-200 bg-white"
                            >
                              {evidenceItem.category}
                            </Badge>
                            {submitted ? (
                              <Badge
                                className={cn(
                                  "rounded-full",
                                  evidenceItem.strength === "sufficient"
                                    ? "bg-emerald-100 text-emerald-900"
                                    : evidenceItem.strength === "partial"
                                      ? "bg-sky-100 text-sky-900"
                                      : evidenceItem.strength === "weak"
                                        ? "bg-amber-100 text-amber-900"
                                        : "bg-rose-100 text-rose-900",
                                )}
                              >
                                {evidenceStrengthLabels[evidenceItem.strength].en}
                              </Badge>
                            ) : null}
                          </div>
                          <div className="mt-3 font-medium text-slate-950">
                            {evidenceItem.label.en}
                          </div>
                          <div className="text-sm text-slate-500">{evidenceItem.label.fr}</div>
                          <BilingualCopy
                            value={evidenceItem.note}
                            compact
                            containerClassName="mt-3 border-0 bg-transparent p-0 shadow-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        What the auditor notices
                      </div>
                      <BilingualCopy
                        value={item.auditorNotice}
                        compact
                        containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
                      />
                    </article>
                    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        What makes it systemic or isolated
                      </div>
                      <BilingualCopy
                        value={item.systemicSignal}
                        compact
                        containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
                      />
                    </article>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
                    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Follow-up questions
                      </div>
                      <ul className="mt-4 space-y-3 text-sm text-slate-700">
                        {item.followUpQuestions.map((question) => (
                          <li key={question.en}>
                            <span className="font-medium text-slate-950">{question.en}</span>
                            <span className="text-slate-400"> / {question.fr}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Recommended corrective action
                      </div>
                      <ul className="mt-4 space-y-3 text-sm text-slate-700">
                        {item.recommendedCorrectiveAction.map((step) => (
                          <li key={step.en}>
                            <span className="font-medium text-slate-950">{step.en}</span>
                            <span className="text-slate-400"> / {step.fr}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <article className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50/80 p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
                        Good response
                      </div>
                      <BilingualCopy
                        value={item.goodResponse}
                        compact
                        containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
                      />
                    </article>
                    <article className="rounded-[1.5rem] border border-amber-200 bg-amber-50/80 p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">
                        Weak response
                      </div>
                      <BilingualCopy
                        value={item.weakResponse}
                        compact
                        containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
                      />
                    </article>
                  </div>

                  <WorkplacePhrasingPanel
                    title="Bilingual wording for this case"
                    description="Language you can use in close-out meetings, walkthroughs, or readiness reviews."
                    ids={item.phraseIds}
                    limit={2}
                  />
                </div>
              </details>
            </article>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" className="rounded-full" disabled={isPending} onClick={handleSubmit}>
          Submit finding judgments
        </Button>
        {submitted ? (
          <p className="text-sm text-slate-600">
            Strong ISO 27001 judgment comes from the combination of evidence quality and systemic
            impact, not from labels alone.
          </p>
        ) : null}
      </div>
    </section>
  );
}

function QuestionSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-5">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {title}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function ChoiceButton({
  children,
  isSelected,
  onClick,
}: {
  children: ReactNode;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition",
        isSelected
          ? "border-slate-950 bg-slate-950 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function ResultCard({
  title,
  success,
  children,
}: {
  title: string;
  success: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.5rem] border p-4",
        success ? "border-emerald-200 bg-emerald-50/80" : "border-amber-200 bg-amber-50/80",
      )}
    >
      <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
        <CheckCircle2 className="size-4" />
        {title}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
