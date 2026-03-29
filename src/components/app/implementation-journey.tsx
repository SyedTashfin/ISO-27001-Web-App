"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Circle, Route } from "lucide-react";
import {
  implementationJourneyScenario,
  implementationJourneySteps,
} from "@/lib/practical-learning-data";
import { readSimulationStore, writeSimulationStore } from "@/lib/learning-insights";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { WorkplacePhrasingPanel } from "@/components/app/workplace-phrasing-panel";
import { cn } from "@/lib/utils";

type JourneyState = {
  selectedStepId?: string;
  completedStepIds?: string[];
};

export function ImplementationJourney() {
  const [selectedStepId, setSelectedStepId] = useState(() => {
    const store = readSimulationStore();
    const bucket = store.implementation_journey as JourneyState | undefined;

    return bucket?.selectedStepId ?? implementationJourneySteps[0]?.id;
  });
  const [completedStepIds, setCompletedStepIds] = useState<string[]>(() => {
    const store = readSimulationStore();
    const bucket = store.implementation_journey as JourneyState | undefined;

    return bucket?.completedStepIds ?? [];
  });

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      writeSimulationStore({
        ...readSimulationStore(),
        implementation_journey: {
          selectedStepId,
          completedStepIds,
        },
      });
    }, 150);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [completedStepIds, selectedStepId]);

  const activeStep =
    implementationJourneySteps.find((step) => step.id === selectedStepId) ??
    implementationJourneySteps[0];
  const completionPercent = useMemo(
    () =>
      Math.round((completedStepIds.length / Math.max(1, implementationJourneySteps.length)) * 100),
    [completedStepIds.length],
  );
  const isCompleted = activeStep ? completedStepIds.includes(activeStep.id) : false;

  function toggleComplete(stepId: string) {
    setCompletedStepIds((current) =>
      current.includes(stepId)
        ? current.filter((item) => item !== stepId)
        : [...current, stepId],
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="rounded-full bg-slate-950 text-white">
            {implementationJourneyScenario.company}
          </Badge>
          <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
            {implementationJourneyScenario.sector.en}
          </Badge>
          <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
            {completionPercent}% complete
          </Badge>
        </div>
        <h2 className="mt-4 text-3xl font-semibold text-slate-950">
          {implementationJourneyScenario.title.en}
        </h2>
        <p className="mt-2 text-lg text-slate-500">{implementationJourneyScenario.title.fr}</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <BilingualCopy value={implementationJourneyScenario.driver} />
          <BilingualCopy value={implementationJourneyScenario.scope} />
          <BilingualCopy value={implementationJourneyScenario.operatingModel} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
        <aside className="space-y-4 rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Route className="size-4" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Journey map
              </div>
              <div className="text-sm text-slate-600">
                Twelve steps from context to continual improvement.
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {implementationJourneySteps.map((step) => {
              const stepCompleted = completedStepIds.includes(step.id);

              return (
                <button
                  key={step.id}
                  type="button"
                  className={cn(
                    "w-full rounded-[1.5rem] border p-4 text-left transition",
                    activeStep?.id === step.id
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white",
                  )}
                  onClick={() => setSelectedStepId(step.id)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-full",
                        activeStep?.id === step.id
                          ? "border-white/30 bg-white/10 text-white"
                          : "border-slate-200 bg-white text-slate-700",
                      )}
                    >
                      Step {step.step}
                    </Badge>
                    {stepCompleted ? (
                      <CheckCircle2 className="size-4 text-emerald-300" />
                    ) : (
                      <Circle className="size-4 opacity-50" />
                    )}
                  </div>
                  <div className="mt-3 text-base font-semibold">{step.title.en}</div>
                  <div className="text-sm opacity-80">{step.title.fr}</div>
                </button>
              );
            })}
          </div>
        </aside>

        {activeStep ? (
          <div className="space-y-5 rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Step {activeStep.step}
                </div>
                <h3 className="mt-2 text-3xl font-semibold text-slate-950">
                  {activeStep.title.en}
                </h3>
                <div className="text-lg text-slate-500">{activeStep.title.fr}</div>
              </div>
              <Button
                type="button"
                className="rounded-full"
                variant={isCompleted ? "outline" : "default"}
                onClick={() => toggleComplete(activeStep.id)}
              >
                {isCompleted ? "Mark as active" : "Mark step complete"}
              </Button>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Plain explanation
                </div>
                <BilingualCopy
                  value={activeStep.simple}
                  containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
                />
              </article>
              <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Professional explanation
                </div>
                <BilingualCopy
                  value={activeStep.professional}
                  containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
                />
              </article>
            </div>

            <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Realistic example
              </div>
              <BilingualCopy
                value={activeStep.realisticExample}
                containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
              />
            </article>

            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Evidence expectations
                </div>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  {activeStep.evidenceExpectations.map((item) => (
                    <li key={item.en}>
                      <span className="font-medium text-slate-950">{item.en}</span>
                      <span className="text-slate-400"> / {item.fr}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Common mistakes
                </div>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  {activeStep.commonMistakes.map((item) => (
                    <li key={item.en}>
                      <span className="font-medium text-slate-950">{item.en}</span>
                      <span className="text-slate-400"> / {item.fr}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
              <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Expected outputs
                </div>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  {activeStep.outputs.map((item) => (
                    <li key={item.en}>
                      <span className="font-medium text-slate-950">{item.en}</span>
                      <span className="text-slate-400"> / {item.fr}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-[1.75rem] border border-slate-950 bg-slate-950 p-5 text-white">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Checkpoint
                </div>
                <BilingualCopy
                  value={activeStep.checkpoint}
                  containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
                  className="text-white/90"
                />
              </article>
            </div>

            <WorkplacePhrasingPanel
              title="Bilingual meeting language"
              description="Phrasing you can reuse when discussing this stage with English- and French-speaking stakeholders."
              ids={activeStep.phraseIds}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
