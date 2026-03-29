"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, FileSearch, Link2 } from "lucide-react";
import { clauseExplorerEntries } from "@/lib/platform-data";
import { getClausePracticeLens } from "@/lib/practical-learning-data";
import { Badge } from "@/components/ui/badge";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { cn } from "@/lib/utils";

export function ClauseExplorer({ initialClause = "4" }: { initialClause?: string }) {
  const [selectedClause, setSelectedClause] = useState(initialClause);

  const activeClause = useMemo(
    () =>
      clauseExplorerEntries.find((entry) => entry.clause === selectedClause) ??
      clauseExplorerEntries[0],
    [selectedClause],
  );
  const practiceLens = getClausePracticeLens(activeClause.clause);

  return (
    <section className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
      <div className="space-y-4 rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Clause explorer
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950">
            Clauses 4 to 10, one by one
          </h3>
        </div>
        <div className="space-y-2.5">
          {clauseExplorerEntries.map((entry) => (
            <button
              key={entry.clause}
              type="button"
              onClick={() => setSelectedClause(entry.clause)}
              className={cn(
                "w-full rounded-[1.5rem] border p-4 text-left transition",
                entry.clause === activeClause.clause
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-slate-50/85 hover:border-slate-300 hover:bg-white",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full",
                    entry.clause === activeClause.clause
                      ? "border-white/30 bg-white/10 text-white"
                      : "border-slate-200 bg-white text-slate-700",
                  )}
                >
                  Clause {entry.clause}
                </Badge>
                <ArrowRight className="size-4 opacity-60" />
              </div>
              <div className="mt-3 text-base font-semibold">{entry.title.en}</div>
              <div className="text-sm opacity-80">{entry.title.fr}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5 rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="rounded-full bg-slate-950 text-white">Clause {activeClause.clause}</Badge>
          <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
            {activeClause.title.en}
          </Badge>
        </div>

        <div>
          <h3 className="text-3xl font-semibold text-slate-950">{activeClause.title.en}</h3>
          <p className="mt-2 text-lg text-slate-500">{activeClause.title.fr}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Simple explanation
            </p>
            <BilingualCopy
              value={activeClause.simple}
              containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
            />
          </article>
          <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Professional explanation
            </p>
            <BilingualCopy
              value={activeClause.professional}
              containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
            />
          </article>
        </div>

        <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <BadgeCheck className="size-3.5 text-sky-700" />
            What it means in business
          </div>
          <BilingualCopy
            value={activeClause.businessMeaning}
            containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
          />
        </article>

        {practiceLens ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Realistic example
              </div>
              <BilingualCopy
                value={practiceLens.realisticExample}
                containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
              />
            </article>
            <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Quick practice
              </div>
              <BilingualCopy
                value={practiceLens.quickPractice}
                containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
              />
            </article>
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <FileSearch className="size-3.5 text-slate-700" />
              Evidence auditors may expect
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {activeClause.auditorEvidence.map((item) => (
                <li key={item.en}>
                  <span className="font-medium text-slate-950">{item.en}</span>
                  <span className="text-slate-400"> / {item.fr}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <BadgeCheck className="size-3.5 text-amber-700" />
              Common mistakes
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {activeClause.commonMistakes.map((item) => (
                <li key={item.en}>
                  <span className="font-medium text-slate-950">{item.en}</span>
                  <span className="text-slate-400"> / {item.fr}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Example nonconformities
          </div>
          <div className="mt-4 space-y-3">
            {activeClause.exampleNonconformities.map((item) => (
              <div key={item.detail.en} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="flex items-center gap-2">
                  <Badge className="rounded-full bg-slate-950 text-white">{item.severity}</Badge>
                </div>
                <BilingualCopy
                  value={item.detail}
                  compact
                  containerClassName="mt-3 border-0 bg-transparent p-0 shadow-none"
                />
              </div>
            ))}
          </div>
        </article>

        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <Link2 className="size-3.5 text-sky-700" />
              Linked controls
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {activeClause.linkedControls.map((control) => (
                <Link
                  key={control}
                  href={`/control-library?control=${control}`}
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  {control}
                </Link>
              ))}
            </div>
          </article>
          <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Terminology panel
            </div>
            <div className="mt-4 space-y-3">
              {activeClause.terminology.map((entry) => (
                <div key={entry.term.en} className="rounded-2xl border border-slate-200 bg-white p-3">
                  <div className="font-medium text-slate-950">{entry.term.en}</div>
                  <div className="text-sm text-slate-500">{entry.term.fr}</div>
                  <BilingualCopy
                    value={entry.explanation}
                    compact
                    containerClassName="mt-3 border-0 bg-transparent p-0 shadow-none"
                  />
                </div>
              ))}
            </div>
          </article>
        </div>

        {practiceLens ? (
          <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Auditor mindset
            </div>
            <BilingualCopy
              value={practiceLens.auditorMindset}
              containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
            />
          </article>
        ) : null}
      </div>
    </section>
  );
}
