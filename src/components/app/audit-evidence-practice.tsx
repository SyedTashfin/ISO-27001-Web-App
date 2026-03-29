"use client";

import { useState, useTransition, type ReactNode } from "react";
import { CheckCircle2, SearchCheck } from "lucide-react";
import { toast } from "sonner";
import {
  evidenceReasoningDrills,
  evidenceStrengthLabels,
  systemicVerdictLabels,
  type EvidenceStrength,
  type SystemicVerdict,
} from "@/lib/practical-learning-data";
import { readSimulationStore, writeSimulationStore } from "@/lib/learning-insights";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { WorkplacePhrasingPanel } from "@/components/app/workplace-phrasing-panel";
import { cn } from "@/lib/utils";

type DrillAnswer = {
  nextEvidenceId?: string;
  sufficiency?: EvidenceStrength;
  systemicVerdict?: SystemicVerdict;
  followUpId?: string;
};

type DrillAnswers = Record<string, DrillAnswer>;

const sufficiencyOptions: EvidenceStrength[] = ["sufficient", "weak", "partial", "absent"];
const systemicOptions: SystemicVerdict[] = ["systemic", "isolated", "needs-more-sampling"];

export function AuditEvidencePractice() {
  const [answers, setAnswers] = useState<DrillAnswers>(() => {
    const store = readSimulationStore();
    const bucket = store.audit_evidence_practice as { answers?: DrillAnswers } | undefined;

    return bucket?.answers ?? {};
  });
  const [submitted, setSubmitted] = useState(() => {
    const store = readSimulationStore();
    const bucket = store.audit_evidence_practice as { submitted?: boolean } | undefined;

    return bucket?.submitted ?? false;
  });
  const [isPending, startTransition] = useTransition();

  const score = evidenceReasoningDrills.reduce((total, drill) => {
    const current = answers[drill.id];

    return (
      total +
      Number(current?.nextEvidenceId === drill.correctNextEvidenceId) +
      Number(current?.sufficiency === drill.sufficiency) +
      Number(current?.systemicVerdict === drill.systemicVerdict) +
      Number(current?.followUpId === drill.correctFollowUpId)
    );
  }, 0);

  async function persist() {
    const nextState = {
      ...readSimulationStore(),
      audit_evidence_practice: {
        answers,
        submitted: true,
        score,
        maxScore: evidenceReasoningDrills.length * 4,
      },
    };

    writeSimulationStore(nextState);

    await fetch("/api/simulations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        simulationType: "audit_evidence_practice",
        simulationKey: "auditor-thinking",
        payload: {
          answers,
          score,
          maxScore: evidenceReasoningDrills.length * 4,
        },
      }),
    }).catch(() => undefined);
  }

  function handleSubmit() {
    const isComplete = evidenceReasoningDrills.every((drill) => {
      const current = answers[drill.id];

      return (
        current?.nextEvidenceId &&
        current?.sufficiency &&
        current?.systemicVerdict &&
        current?.followUpId
      );
    });

    if (!isComplete) {
      toast.error("Complete every evidence-reasoning prompt before submitting.");
      return;
    }

    setSubmitted(true);

    startTransition(() => {
      void persist();
    });

    toast.success("Audit evidence practice saved.");
  }

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Auditor thinking
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              Ask for the next evidence, judge quality, and test whether the issue is systemic
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              ISO 27001 audits are not checklist theatre. The skill is knowing what to request
              next, how strong the evidence really is, and when a sampled weakness points to a
              broader system problem.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 px-4 py-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Score
            </div>
            <div className="mt-1 text-3xl font-semibold text-slate-950">
              {submitted ? `${score}/${evidenceReasoningDrills.length * 4}` : "In progress"}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {evidenceReasoningDrills.map((drill, index) => {
          const current = answers[drill.id] ?? {};
          const nextEvidenceCorrect = submitted
            ? current.nextEvidenceId === drill.correctNextEvidenceId
            : false;
          const sufficiencyCorrect = submitted
            ? current.sufficiency === drill.sufficiency
            : false;
          const systemicCorrect = submitted
            ? current.systemicVerdict === drill.systemicVerdict
            : false;
          const followUpCorrect = submitted
            ? current.followUpId === drill.correctFollowUpId
            : false;

          return (
            <article
              key={drill.id}
              className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="rounded-full bg-slate-950 text-white">Drill {index + 1}</Badge>
                {drill.relatedClauses.map((clause) => (
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
                <div className="text-2xl font-semibold text-slate-950">{drill.title.en}</div>
                <div className="text-sm text-slate-500">{drill.title.fr}</div>
              </div>
              <BilingualCopy value={drill.context} containerClassName="mt-5" />

              <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-slate-50/75 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <SearchCheck className="size-3.5 text-slate-700" />
                  Available evidence
                </div>
                <div className="mt-4 space-y-3">
                  {drill.availableEvidence.map((item) => (
                    <div key={item.label.en} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
                          {item.category}
                        </Badge>
                        <Badge
                          className={cn(
                            "rounded-full",
                            item.strength === "sufficient"
                              ? "bg-emerald-100 text-emerald-900"
                              : item.strength === "partial"
                                ? "bg-sky-100 text-sky-900"
                                : item.strength === "weak"
                                  ? "bg-amber-100 text-amber-900"
                                  : "bg-rose-100 text-rose-900",
                          )}
                        >
                          {evidenceStrengthLabels[item.strength].en}
                        </Badge>
                      </div>
                      <div className="mt-3 font-medium text-slate-950">{item.label.en}</div>
                      <div className="text-sm text-slate-500">{item.label.fr}</div>
                      <BilingualCopy
                        value={item.note}
                        compact
                        containerClassName="mt-3 border-0 bg-transparent p-0 shadow-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <QuestionBlock title="What evidence would you ask for next?">
                {drill.nextEvidenceOptions.map((option) => (
                  <ChoiceButton
                    key={option.id}
                    isSelected={current.nextEvidenceId === option.id}
                    onClick={() =>
                      setAnswers((existing) => ({
                        ...existing,
                        [drill.id]: {
                          ...existing[drill.id],
                          nextEvidenceId: option.id,
                        },
                      }))
                    }
                  >
                    {option.label.en}
                  </ChoiceButton>
                ))}
              </QuestionBlock>

              <QuestionBlock title="Is the current evidence sufficient, weak, partial, or absent?">
                {sufficiencyOptions.map((option) => (
                  <ChoiceButton
                    key={option}
                    isSelected={current.sufficiency === option}
                    onClick={() =>
                      setAnswers((existing) => ({
                        ...existing,
                        [drill.id]: {
                          ...existing[drill.id],
                          sufficiency: option,
                        },
                      }))
                    }
                  >
                    {evidenceStrengthLabels[option].en}
                  </ChoiceButton>
                ))}
              </QuestionBlock>

              <QuestionBlock title="What does the sample suggest: systemic, isolated, or more sampling needed?">
                {systemicOptions.map((option) => (
                  <ChoiceButton
                    key={option}
                    isSelected={current.systemicVerdict === option}
                    onClick={() =>
                      setAnswers((existing) => ({
                        ...existing,
                        [drill.id]: {
                          ...existing[drill.id],
                          systemicVerdict: option,
                        },
                      }))
                    }
                  >
                    {systemicVerdictLabels[option].en}
                  </ChoiceButton>
                ))}
              </QuestionBlock>

              <QuestionBlock title="What follow-up question would an auditor ask?">
                {drill.followUpOptions.map((option) => (
                  <ChoiceButton
                    key={option.id}
                    isSelected={current.followUpId === option.id}
                    onClick={() =>
                      setAnswers((existing) => ({
                        ...existing,
                        [drill.id]: {
                          ...existing[drill.id],
                          followUpId: option.id,
                        },
                      }))
                    }
                  >
                    {option.label.en}
                  </ChoiceButton>
                ))}
              </QuestionBlock>

              {submitted ? (
                <div className="mt-5 space-y-4">
                  <div
                    className={cn(
                      "rounded-[1.5rem] border p-4",
                      nextEvidenceCorrect &&
                        sufficiencyCorrect &&
                        systemicCorrect &&
                        followUpCorrect
                        ? "border-emerald-200 bg-emerald-50/80"
                        : "border-amber-200 bg-amber-50/80",
                    )}
                  >
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                      <CheckCircle2 className="size-4" />
                      {nextEvidenceCorrect &&
                      sufficiencyCorrect &&
                      systemicCorrect &&
                      followUpCorrect
                        ? "Reasoning aligned"
                        : `Expected next evidence, sufficiency ${evidenceStrengthLabels[drill.sufficiency].en}, ${systemicVerdictLabels[drill.systemicVerdict].en}, and a stronger follow-up question`}
                    </div>
                    <BilingualCopy
                      value={drill.rationale}
                      compact
                      containerClassName="mt-3 border-0 bg-transparent p-0 shadow-none"
                    />
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge className="rounded-full bg-slate-950 text-white">
                        Likely severity: {drill.likelySeverity}
                      </Badge>
                    </div>
                  </div>
                  <WorkplacePhrasingPanel
                    title="Bilingual audit phrasing"
                    description="Language you can use to explain the reasoning behind this sample."
                    ids={drill.phraseIds}
                  />
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" className="rounded-full" disabled={isPending} onClick={handleSubmit}>
          Submit auditor reasoning
        </Button>
        {submitted ? (
          <p className="text-sm text-slate-600">
            Evidence quality, not document count alone, drives audit confidence.
          </p>
        ) : null}
      </div>
    </section>
  );
}

function QuestionBlock({
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
