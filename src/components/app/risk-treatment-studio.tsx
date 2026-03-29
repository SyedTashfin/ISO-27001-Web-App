"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, ShieldPlus } from "lucide-react";
import {
  controlLibraryEntries,
  riskLabScenarios,
  type RiskLabScenario,
} from "@/lib/platform-data";
import { readSimulationStore, writeSimulationStore } from "@/lib/learning-insights";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { cn } from "@/lib/utils";

type TreatmentValue = "mitigate" | "avoid" | "transfer" | "accept";

type RiskRegisterEntry = {
  id: string;
  asset: string;
  threat: string;
  vulnerability: string;
  likelihood: number;
  impact: number;
  treatment: TreatmentValue;
  controls: string[];
};

const treatmentOptions: Array<{
  value: TreatmentValue;
  label: string;
  description: string;
}> = [
  { value: "mitigate", label: "Mitigate", description: "Reduce likelihood or impact with controls." },
  { value: "avoid", label: "Avoid", description: "Change the activity so the risk is removed." },
  { value: "transfer", label: "Transfer", description: "Shift part of the exposure through contracts or insurance." },
  { value: "accept", label: "Accept", description: "Keep the residual risk knowingly." },
];

function createEntry(scenario: RiskLabScenario, index: number): RiskRegisterEntry {
  return {
    id: `${scenario.id}-${index}`,
    asset: scenario.assets[0]?.en ?? "",
    threat: scenario.threats[0]?.en ?? "",
    vulnerability: scenario.vulnerabilities[0]?.en ?? "",
    likelihood: 3,
    impact: 3,
    treatment: "mitigate",
    controls: scenario.recommendedControls.slice(0, 2),
  };
}

function scoreBand(score: number) {
  if (score >= 16) {
    return "Severe";
  }

  if (score >= 10) {
    return "High";
  }

  if (score >= 5) {
    return "Medium";
  }

  return "Low";
}

export function RiskTreatmentStudio({
  initialScenarioId,
}: {
  initialScenarioId?: string;
}) {
  const [scenarioId, setScenarioId] = useState(() => {
    const store = readSimulationStore();
    const bucket = store.risk_lab as { scenarioId?: string } | undefined;

    return initialScenarioId ?? bucket?.scenarioId ?? riskLabScenarios[0]?.id;
  });

  const activeScenario =
    riskLabScenarios.find((scenario) => scenario.id === scenarioId) ?? riskLabScenarios[0];

  const [entries, setEntries] = useState<RiskRegisterEntry[]>(() => {
    const store = readSimulationStore();
    const bucket = store.risk_lab as { entries?: RiskRegisterEntry[] } | undefined;

    return bucket?.entries?.length ? bucket.entries : [createEntry(activeScenario, 1)];
  });

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const nextState = {
        ...readSimulationStore(),
        risk_lab: {
          scenarioId,
          entries,
        },
      };

      writeSimulationStore(nextState);

      void fetch("/api/simulations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          simulationType: "risk_lab",
          simulationKey: scenarioId,
          payload: {
            scenarioId,
            entries,
          },
        }),
      }).catch(() => undefined);
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [entries, scenarioId]);

  function loadScenario(scenario: RiskLabScenario) {
    setScenarioId(scenario.id);
    setEntries([createEntry(scenario, 1)]);
  }

  function updateEntry(entryId: string, nextValue: Partial<RiskRegisterEntry>) {
    setEntries((current) =>
      current.map((entry) => (entry.id === entryId ? { ...entry, ...nextValue } : entry)),
    );
  }

  function addEntry() {
    setEntries((current) => [...current, createEntry(activeScenario, current.length + 1)]);
  }

  function removeEntry(entryId: string) {
    setEntries((current) => current.filter((entry) => entry.id !== entryId));
  }

  function toggleControl(entryId: string, controlCode: string) {
    setEntries((current) =>
      current.map((entry) => {
        if (entry.id !== entryId) {
          return entry;
        }

        return {
          ...entry,
          controls: entry.controls.includes(controlCode)
            ? entry.controls.filter((item) => item !== controlCode)
            : [...entry.controls, controlCode],
        };
      }),
    );
  }

  const registerRows = useMemo(
    () =>
      entries.map((entry) => ({
        ...entry,
        riskScore: entry.likelihood * entry.impact,
        band: scoreBand(entry.likelihood * entry.impact),
      })),
    [entries],
  );

  const selectedControlCount = new Set(entries.flatMap((entry) => entry.controls)).size;

  return (
    <section className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <aside className="space-y-4 rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Company scenarios
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              Start with business context
            </h3>
          </div>
          {riskLabScenarios.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              className={cn(
                "w-full rounded-[1.6rem] border p-4 text-left transition",
                scenario.id === activeScenario.id
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white",
              )}
              onClick={() => loadScenario(scenario)}
            >
              <div className="flex items-center justify-between gap-3">
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full",
                    scenario.id === activeScenario.id
                      ? "border-white/30 bg-white/10 text-white"
                      : "border-slate-200 bg-white text-slate-700",
                  )}
                >
                  {scenario.company}
                </Badge>
                <span className="text-xs uppercase tracking-[0.18em] opacity-75">
                  {scenario.sector.en}
                </span>
              </div>
              <div className="mt-3 font-medium">{scenario.title.en}</div>
              <div className="text-sm opacity-80">{scenario.title.fr}</div>
            </button>
          ))}
        </aside>

        <div className="space-y-5 rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="rounded-full bg-slate-950 text-white">{activeScenario.company}</Badge>
            <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
              {activeScenario.location.en}
            </Badge>
            <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
              {activeScenario.sector.en}
            </Badge>
          </div>

          <BilingualCopy value={activeScenario.context} />

          <div className="grid gap-4 lg:grid-cols-3">
            <MiniListCard
              title="Assets"
              items={activeScenario.assets.map((item) => `${item.en} / ${item.fr}`)}
            />
            <MiniListCard
              title="Threats"
              items={activeScenario.threats.map((item) => `${item.en} / ${item.fr}`)}
            />
            <MiniListCard
              title="Vulnerabilities"
              items={activeScenario.vulnerabilities.map((item) => `${item.en} / ${item.fr}`)}
            />
          </div>
        </div>
      </div>

      <section className="space-y-5 rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Risk register builder
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              Build risk statements with treatment and controls
            </h3>
          </div>
          <Button type="button" className="rounded-full" onClick={addEntry}>
            Add risk row
          </Button>
        </div>

        <div className="space-y-5">
          {registerRows.map((entry, index) => (
            <article
              key={entry.id}
              className="rounded-[1.85rem] border border-slate-200/80 bg-slate-50/70 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Badge className="rounded-full bg-slate-950 text-white">Risk {index + 1}</Badge>
                  <Badge variant="outline" className="rounded-full border-slate-200 bg-white">
                    Score {entry.riskScore}
                  </Badge>
                  <Badge
                    className={cn(
                      "rounded-full",
                      entry.band === "Severe"
                        ? "bg-rose-100 text-rose-900"
                        : entry.band === "High"
                          ? "bg-amber-100 text-amber-900"
                          : entry.band === "Medium"
                            ? "bg-sky-100 text-sky-900"
                            : "bg-emerald-100 text-emerald-900",
                    )}
                  >
                    {entry.band}
                  </Badge>
                </div>
                {entries.length > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => removeEntry(entry.id)}
                  >
                    Remove
                  </Button>
                ) : null}
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                <SelectField
                  label="Asset"
                  value={entry.asset}
                  options={activeScenario.assets.map((item) => item.en)}
                  onChange={(value) => updateEntry(entry.id, { asset: value })}
                />
                <SelectField
                  label="Threat"
                  value={entry.threat}
                  options={activeScenario.threats.map((item) => item.en)}
                  onChange={(value) => updateEntry(entry.id, { threat: value })}
                />
                <SelectField
                  label="Vulnerability"
                  value={entry.vulnerability}
                  options={activeScenario.vulnerabilities.map((item) => item.en)}
                  onChange={(value) => updateEntry(entry.id, { vulnerability: value })}
                />
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <SliderField
                  label="Likelihood"
                  value={entry.likelihood}
                  onChange={(value) => updateEntry(entry.id, { likelihood: value })}
                />
                <SliderField
                  label="Impact"
                  value={entry.impact}
                  onChange={(value) => updateEntry(entry.id, { impact: value })}
                />
              </div>

              <div className="mt-5">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Treatment
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {treatmentOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={cn(
                        "rounded-full border px-3 py-2 text-sm transition",
                        entry.treatment === option.value
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                      )}
                      title={option.description}
                      onClick={() => updateEntry(entry.id, { treatment: option.value })}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Map controls to this treated risk
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeScenario.recommendedControls.map((controlCode) => (
                    <button
                      key={controlCode}
                      type="button"
                      className={cn(
                        "rounded-full border px-3 py-2 text-sm transition",
                        entry.controls.includes(controlCode)
                          ? "border-sky-700 bg-sky-50 text-sky-900"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                      )}
                      onClick={() => toggleControl(entry.id, controlCode)}
                    >
                      {controlCode}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.06fr_0.94fr]">
        <article className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Calculator className="size-5 text-slate-700" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Risk register view
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950">
                Generated learner-friendly register
              </h3>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {registerRows.map((entry) => (
              <div
                key={entry.id}
                className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/75 p-4"
              >
                <div className="text-sm font-medium text-slate-950">
                  {entry.asset} exposed to {entry.threat}
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  Vulnerability: {entry.vulnerability}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="outline" className="rounded-full border-slate-200 bg-white">
                    Likelihood {entry.likelihood}
                  </Badge>
                  <Badge variant="outline" className="rounded-full border-slate-200 bg-white">
                    Impact {entry.impact}
                  </Badge>
                  <Badge variant="outline" className="rounded-full border-slate-200 bg-white">
                    Treatment {entry.treatment}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <ShieldPlus className="size-5 text-sky-700" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                SoA linkage
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950">
                Move treated risks into applicability logic
              </h3>
            </div>
          </div>
          <div className="mt-5 rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
            <div className="text-sm font-medium text-slate-950">
              {selectedControlCount} unique controls selected
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-600">
              Use the dedicated SoA builder to mark controls as applicable or not applicable, add
              justification, and export a learner-friendly SoA summary.
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {Array.from(new Set(entries.flatMap((entry) => entry.controls))).map((code) => {
                const control = controlLibraryEntries.find((item) => item.code === code);

                return (
                  <Badge key={code} variant="outline" className="rounded-full border-slate-200 bg-white">
                    {code}
                    {control ? ` ${control.name.en}` : ""}
                  </Badge>
                );
              })}
            </div>
          </div>
          <Link
            href={`/practice/soa-builder?scenario=${activeScenario.id}`}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Open the SoA builder
            <ArrowRight className="size-4" />
          </Link>
        </article>
      </section>
    </section>
  );
}

function MiniListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/75 p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <select
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function SliderField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <Badge variant="outline" className="rounded-full border-slate-200 bg-white">
          {value}
        </Badge>
      </div>
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={value}
        className="w-full accent-slate-950"
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
