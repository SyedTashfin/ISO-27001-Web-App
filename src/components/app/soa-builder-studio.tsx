"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import {
  controlCategoryOverview,
  controlLibraryEntries,
  riskLabScenarios,
} from "@/lib/platform-data";
import {
  getSoaGuidanceForControl,
  soaTeachingCardsDetailed,
} from "@/lib/practical-learning-data";
import { readSimulationStore, writeSimulationStore } from "@/lib/learning-insights";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { WorkplacePhrasingPanel } from "@/components/app/workplace-phrasing-panel";
import { cn } from "@/lib/utils";

type Applicability = "applicable" | "not-applicable" | "pending";
type ImplementationStatus = "not-started" | "planned" | "in-progress" | "implemented";

type SoaEntryState = Record<
  string,
  {
    applicability: Applicability;
    justification: string;
    implementationStatus: ImplementationStatus;
    implementationNote: string;
    evidenceNote: string;
    linkedRisks: string[];
  }
>;

type StoredRiskRegisterState = {
  scenarioId?: string;
  entries?: Array<{
    asset: string;
    threat: string;
    vulnerability: string;
    treatment?: string;
  }>;
};

const implementationStatusOptions: Array<{
  value: ImplementationStatus;
  label: string;
}> = [
  { value: "not-started", label: "Not started" },
  { value: "planned", label: "Planned" },
  { value: "in-progress", label: "In progress" },
  { value: "implemented", label: "Implemented" },
];

const categoryFilters = ["All", "Organizational", "People", "Physical", "Technological"] as const;

function createDefaultEntry() {
  return {
    applicability: "pending" as const,
    justification: "",
    implementationStatus: "planned" as const,
    implementationNote: "",
    evidenceNote: "",
    linkedRisks: [],
  };
}

export function SoaBuilderStudio({
  initialScenarioId,
}: {
  initialScenarioId?: string;
}) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [activeCategory, setActiveCategory] = useState<(typeof categoryFilters)[number]>("All");
  const [scenarioId, setScenarioId] = useState(() => {
    const store = readSimulationStore();
    const bucket = store.soa_builder as { scenarioId?: string } | undefined;

    return initialScenarioId ?? bucket?.scenarioId ?? riskLabScenarios[0]?.id;
  });
  const [selectedCode, setSelectedCode] = useState(() => {
    const store = readSimulationStore();
    const bucket = store.soa_builder as { selectedCode?: string } | undefined;

    return bucket?.selectedCode ?? controlLibraryEntries[0]?.code;
  });
  const [entries, setEntries] = useState<SoaEntryState>(() => {
    const store = readSimulationStore();
    const bucket = store.soa_builder as { entries?: SoaEntryState } | undefined;

    return bucket?.entries ?? {};
  });

  const activeScenario =
    riskLabScenarios.find((scenario) => scenario.id === scenarioId) ?? riskLabScenarios[0];

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const nextState = {
        ...readSimulationStore(),
        soa_builder: {
          scenarioId,
          selectedCode,
          entries,
        },
      };

      writeSimulationStore(nextState);

      void fetch("/api/simulations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          simulationType: "soa_builder",
          simulationKey: scenarioId,
          payload: {
            scenarioId,
            selectedCode,
            entries,
          },
        }),
      }).catch(() => undefined);
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [entries, scenarioId, selectedCode]);

  const filteredControls = useMemo(() => {
    return controlLibraryEntries.filter((control) => {
      const matchesCategory = activeCategory === "All" || control.category === activeCategory;
      const target =
        `${control.code} ${control.name.en} ${control.name.fr} ${control.businessTheme.en} ${control.controlType}`.toLowerCase();
      const matchesQuery = deferredQuery ? target.includes(deferredQuery.toLowerCase()) : true;

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, deferredQuery]);

  const activeControl =
    filteredControls.find((control) => control.code === selectedCode) ?? filteredControls[0];
  const activeGuidance = activeControl ? getSoaGuidanceForControl(activeControl.code) : undefined;
  const activeEntry = activeControl ? entries[activeControl.code] ?? createDefaultEntry() : null;

  const linkedRiskOptions = useMemo(() => {
    const riskLabBucket = readSimulationStore().risk_lab as StoredRiskRegisterState | undefined;
    const liveRiskOptions =
      riskLabBucket?.scenarioId === scenarioId
        ? (riskLabBucket.entries ?? []).map(
            (item) =>
              `${item.asset} -> ${item.threat} (${item.vulnerability})${item.treatment ? ` [${item.treatment}]` : ""}`,
          )
        : [];

    return Array.from(
      new Set([
        ...liveRiskOptions,
        ...(activeGuidance?.relatedRisks.map((item) => item.en) ?? []),
        ...activeScenario.threats.map((item) => item.en),
        ...activeScenario.teachingFocus.map((item) => item.en),
      ]),
    );
  }, [activeGuidance, activeScenario.teachingFocus, activeScenario.threats, scenarioId]);

  const summaryRows = useMemo(() => {
    return controlLibraryEntries
      .map((control) => ({
        control,
        state: entries[control.code],
      }))
      .filter((item) => item.state && item.state.applicability !== "pending");
  }, [entries]);

  const summaryInsights = useMemo(() => {
    const applicableRows = summaryRows.filter((item) => item.state?.applicability === "applicable");
    const weakJustificationCount = applicableRows.filter(
      (item) => (item.state?.justification.trim().length ?? 0) < 45,
    ).length;
    const unlinkedRiskCount = applicableRows.filter(
      (item) => (item.state?.linkedRisks.length ?? 0) === 0,
    ).length;
    const missingImplementationNoteCount = applicableRows.filter((item) => {
      const status = item.state?.implementationStatus;

      return (
        (status === "in-progress" || status === "implemented") &&
        (item.state?.implementationNote.trim().length ?? 0) === 0
      );
    }).length;
    const missingEvidenceCount = applicableRows.filter(
      (item) => (item.state?.evidenceNote.trim().length ?? 0) === 0,
    ).length;

    return {
      applicableCount: applicableRows.length,
      weakJustificationCount,
      unlinkedRiskCount,
      missingImplementationNoteCount,
      missingEvidenceCount,
    };
  }, [summaryRows]);

  function updateActiveEntry(nextValue: Partial<NonNullable<typeof activeEntry>>) {
    if (!activeControl || !activeEntry) {
      return;
    }

    setEntries((current) => ({
      ...current,
      [activeControl.code]: {
        ...activeEntry,
        ...nextValue,
      },
    }));
  }

  function toggleLinkedRisk(riskLabel: string) {
    if (!activeEntry) {
      return;
    }

    const linkedRisks = activeEntry.linkedRisks.includes(riskLabel)
      ? activeEntry.linkedRisks.filter((item) => item !== riskLabel)
      : [...activeEntry.linkedRisks, riskLabel];

    updateActiveEntry({ linkedRisks });
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-4">
        {soaTeachingCardsDetailed.map((card) => (
          <article
            key={card.title.en}
            className="rounded-[1.75rem] border border-white/70 bg-white/82 p-4 shadow-[0_24px_72px_-48px_rgba(15,23,42,0.35)] backdrop-blur-sm"
          >
            <div className="text-sm font-semibold text-slate-950">{card.title.en}</div>
            <div className="text-sm text-slate-500">{card.title.fr}</div>
            <BilingualCopy
              value={card.body}
              compact
              containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
            />
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <aside className="space-y-5 rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Scenario
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              Choose business context
            </h3>
          </div>
          <div className="space-y-2">
            {riskLabScenarios.map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                className={cn(
                  "w-full rounded-[1.5rem] border p-4 text-left transition",
                  scenario.id === activeScenario.id
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white",
                )}
                onClick={() => setScenarioId(scenario.id)}
              >
                <div className="font-medium">{scenario.title.en}</div>
                <div className="text-sm opacity-80">{scenario.title.fr}</div>
              </button>
            ))}
          </div>

          <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <Search className="size-3.5 text-slate-700" />
              Find controls
            </div>
            <Input
              className="mt-4"
              value={query}
              placeholder="Search by code, control, or theme..."
              onChange={(event) => setQuery(event.target.value)}
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {categoryFilters.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={cn(
                    "rounded-full border px-3 py-2 text-sm transition",
                    activeCategory === category
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                  )}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {filteredControls.slice(0, 18).map((control) => (
              <button
                key={control.code}
                type="button"
                className={cn(
                  "w-full rounded-[1.4rem] border p-3 text-left transition",
                  control.code === activeControl?.code
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                )}
                onClick={() => setSelectedCode(control.code)}
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full",
                      control.code === activeControl?.code
                        ? "border-white/30 bg-white/10 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-700",
                    )}
                  >
                    {control.code}
                  </Badge>
                  <span className="text-xs uppercase tracking-[0.18em] opacity-70">
                    {control.category}
                  </span>
                </div>
                <div className="mt-2 font-medium">{control.name.en}</div>
                <div className="text-sm opacity-80">{control.name.fr}</div>
              </button>
            ))}
          </div>
        </aside>

        <div className="space-y-5 rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
          {activeControl && activeEntry ? (
            <>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="rounded-full bg-slate-950 text-white">{activeControl.code}</Badge>
                <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
                  {activeControl.category}
                </Badge>
                <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
                  {activeControl.controlType}
                </Badge>
              </div>

              <div>
                <h3 className="text-3xl font-semibold text-slate-950">{activeControl.name.en}</h3>
                <p className="mt-2 text-lg text-slate-500">{activeControl.name.fr}</p>
              </div>

              <BilingualCopy value={activeControl.shortExplanation} />

              <div className="grid gap-4 lg:grid-cols-2">
                <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Applicability
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(
                      [
                        ["applicable", "Applicable"],
                        ["not-applicable", "Not applicable"],
                        ["pending", "Needs decision"],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        className={cn(
                          "rounded-full border px-3 py-2 text-sm transition",
                          activeEntry.applicability === value
                            ? "border-slate-950 bg-slate-950 text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                        )}
                        onClick={() => updateActiveEntry({ applicability: value })}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Implementation status
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {implementationStatusOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={cn(
                          "rounded-full border px-3 py-2 text-sm transition",
                          activeEntry.implementationStatus === option.value
                            ? "border-sky-700 bg-sky-50 text-sky-900"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                        )}
                        onClick={() => updateActiveEntry({ implementationStatus: option.value })}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </article>

                <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Link to treatment logic
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {linkedRiskOptions.map((risk) => (
                      <button
                        key={risk}
                        type="button"
                        className={cn(
                          "rounded-full border px-3 py-2 text-sm transition",
                          activeEntry.linkedRisks.includes(risk)
                            ? "border-emerald-700 bg-emerald-50 text-emerald-900"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                        )}
                        onClick={() => toggleLinkedRisk(risk)}
                      >
                        {risk}
                      </button>
                    ))}
                  </div>
                </article>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Business meaning
                  </div>
                  <BilingualCopy
                    value={activeControl.businessMeaning}
                    compact
                    containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
                  />
                </article>
                <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Example implementation
                  </div>
                  <BilingualCopy
                    value={activeControl.exampleImplementation}
                    compact
                    containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
                  />
                </article>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Good rationale
                  </div>
                  <BilingualCopy
                    value={activeGuidance?.goodRationale ?? activeControl.businessMeaning}
                    compact
                    containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
                  />
                  <div className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Weak rationale
                  </div>
                  <BilingualCopy
                    value={
                      activeGuidance?.weakRationale ??
                      {
                        en: "This control is applicable because it is generally useful.",
                        fr: "Cette mesure est applicable parce qu'elle est généralement utile.",
                      }
                    }
                    compact
                    containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
                  />
                </article>
                <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Expected evidence
                  </div>
                  <ul className="mt-4 space-y-3 text-sm text-slate-700">
                    {(activeGuidance?.expectedEvidence ?? activeControl.relatedEvidence).map((item) => (
                      <li key={item.en}>
                        <span className="font-medium text-slate-950">{item.en}</span>
                        <span className="text-slate-400"> / {item.fr}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Auditor challenge
                  </div>
                  <BilingualCopy
                    value={
                      activeGuidance?.auditorChallenge ??
                      {
                        en: "Show how this control position is reflected in sampled evidence, not only in design documents.",
                        fr: "Montrez comment cette position de contrôle se reflète dans la preuve échantillonnée, pas seulement dans les documents de conception.",
                      }
                    }
                    compact
                    containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
                  />
                </article>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Applicability rationale
                  </span>
                  <Textarea
                    rows={5}
                    value={activeEntry.justification}
                    placeholder="Explain why this control applies or does not apply in this scenario..."
                    onChange={(event) => updateActiveEntry({ justification: event.target.value })}
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Implementation status rationale
                  </span>
                  <Textarea
                    rows={5}
                    value={activeEntry.implementationNote}
                    placeholder="Explain what is implemented today, what is still planned, and where the boundary of current maturity sits..."
                    onChange={(event) =>
                      updateActiveEntry({ implementationNote: event.target.value })
                    }
                  />
                </label>
              </div>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-700">
                  Evidence expectation or current proof
                </span>
                <Textarea
                  rows={4}
                  value={activeEntry.evidenceNote}
                  placeholder="Name the evidence you expect an auditor to sample or the evidence that already exists..."
                  onChange={(event) => updateActiveEntry({ evidenceNote: event.target.value })}
                />
              </label>

              <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Common SoA mistakes
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(activeGuidance?.commonMistakes ?? []).map((item) => (
                    <Badge
                      key={item.en}
                      variant="outline"
                      className="rounded-full border-slate-200 bg-white px-3 py-2 text-slate-700"
                    >
                      {item.en}
                    </Badge>
                  ))}
                </div>
              </article>

              <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Learner-friendly SoA summary
                    </p>
                    <h4 className="mt-2 text-xl font-semibold text-slate-950">
                      {summaryRows.length} controls with explicit decisions
                    </h4>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => window.print()}
                  >
                    <Download className="size-4" />
                    Export summary
                  </Button>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  <SummaryInsightCard
                    label="Applicable controls"
                    value={String(summaryInsights.applicableCount)}
                  />
                  <SummaryInsightCard
                    label="Weak rationales"
                    value={String(summaryInsights.weakJustificationCount)}
                    tone={summaryInsights.weakJustificationCount ? "warn" : "neutral"}
                  />
                  <SummaryInsightCard
                    label="Missing risk links"
                    value={String(summaryInsights.unlinkedRiskCount)}
                    tone={summaryInsights.unlinkedRiskCount ? "warn" : "neutral"}
                  />
                  <SummaryInsightCard
                    label="Missing evidence notes"
                    value={String(summaryInsights.missingEvidenceCount)}
                    tone={summaryInsights.missingEvidenceCount ? "warn" : "neutral"}
                  />
                </div>

                <div className="mt-5 max-h-[22rem] space-y-3 overflow-y-auto pr-1">
                  {summaryRows.length > 0 ? (
                    summaryRows.map(({ control, state }) => (
                      <div
                        key={control.code}
                        className="rounded-[1.35rem] border border-slate-200 bg-white p-4"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className="rounded-full bg-slate-950 text-white">
                            {control.code}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="rounded-full border-slate-200 bg-slate-50"
                          >
                            {state?.applicability}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="rounded-full border-slate-200 bg-slate-50"
                          >
                            {state?.implementationStatus}
                          </Badge>
                          {(state?.linkedRisks.length ?? 0) === 0 &&
                          state?.applicability === "applicable" ? (
                            <Badge className="rounded-full bg-amber-100 text-amber-900">
                              Missing risk link
                            </Badge>
                          ) : null}
                        </div>
                        <div className="mt-3 font-medium text-slate-950">{control.name.en}</div>
                        {state?.justification ? (
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {state.justification}
                          </p>
                        ) : null}
                        {state?.implementationNote ? (
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            <span className="font-medium text-slate-950">Status note:</span>{" "}
                            {state.implementationNote}
                          </p>
                        ) : null}
                        {state?.evidenceNote ? (
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            <span className="font-medium text-slate-950">Evidence:</span>{" "}
                            {state.evidenceNote}
                          </p>
                        ) : null}
                        {state?.linkedRisks.length ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {state.linkedRisks.map((risk) => (
                              <Badge
                                key={risk}
                                variant="outline"
                                className="rounded-full border-slate-200 bg-slate-50"
                              >
                                {risk}
                              </Badge>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[1.35rem] border border-dashed border-slate-300 bg-white/70 p-4 text-sm text-slate-500">
                      Start marking controls as applicable or not applicable to generate the SoA
                      summary.
                    </div>
                  )}
                </div>
              </article>

              <WorkplacePhrasingPanel
                title="Bilingual SoA language"
                description="Useful phrasing for explaining applicability, traceability, and evidence quality during workshops or audits."
                ids={["soa-too-generic", "risk-not-traceable", "control-partial"]}
              />
            </>
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50/70 p-6 text-sm text-slate-500">
              No control matches the current filter.
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {controlCategoryOverview.map((category) => (
          <article
            key={category.category}
            className="rounded-[1.75rem] border border-white/70 bg-white/82 p-4 shadow-[0_24px_72px_-48px_rgba(15,23,42,0.35)] backdrop-blur-sm"
          >
            <div className="text-sm font-semibold text-slate-950">{category.category}</div>
            <div className="mt-1 text-3xl font-semibold text-slate-950">{category.count}</div>
            <BilingualCopy
              value={category.businessLens}
              compact
              containerClassName="mt-3 border-0 bg-transparent p-0 shadow-none"
            />
          </article>
        ))}
      </div>
    </section>
  );
}

function SummaryInsightCard({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "warn";
}) {
  return (
    <div
      className={cn(
        "rounded-[1.35rem] border p-4",
        tone === "warn" ? "border-amber-200 bg-amber-50/80" : "border-slate-200 bg-white",
      )}
    >
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-3xl font-semibold text-slate-950">{value}</div>
    </div>
  );
}
