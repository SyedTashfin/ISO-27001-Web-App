"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import {
  controlCategoryOverview,
  controlLibraryEntries,
  type ControlLibraryEntry,
} from "@/lib/platform-data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { cn } from "@/lib/utils";

const categoryFilters = ["All", "Organizational", "People", "Physical", "Technological"] as const;

export function ControlExplorer({ initialControlCode }: { initialControlCode?: string }) {
  const [activeCategory, setActiveCategory] = useState<(typeof categoryFilters)[number]>("All");
  const [query, setQuery] = useState("");
  const [activeTheme, setActiveTheme] = useState("All themes");
  const [activeType, setActiveType] = useState("All types");
  const deferredQuery = useDeferredValue(query);
  const [selectedCode, setSelectedCode] = useState(
    initialControlCode ?? controlLibraryEntries[0]?.code,
  );

  const themes = useMemo(
    () => ["All themes", ...new Set(controlLibraryEntries.map((control) => control.businessTheme.en))],
    [],
  );
  const types = useMemo(
    () => ["All types", ...new Set(controlLibraryEntries.map((control) => control.controlType))],
    [],
  );

  const filteredControls = useMemo(() => {
    return controlLibraryEntries.filter((control) => {
      const matchesCategory =
        activeCategory === "All" || control.category === activeCategory;
      const matchesTheme =
        activeTheme === "All themes" || control.businessTheme.en === activeTheme;
      const matchesType = activeType === "All types" || control.controlType === activeType;
      const matchesQuery = deferredQuery
        ? control.keywords.some((keyword) => keyword.includes(deferredQuery.toLowerCase()))
        : true;

      return matchesCategory && matchesTheme && matchesType && matchesQuery;
    });
  }, [activeCategory, activeTheme, activeType, deferredQuery]);

  const selectedControl =
    filteredControls.find((control) => control.code === selectedCode) ?? filteredControls[0];
  const categorySummary = useMemo(
    () =>
      activeCategory === "All"
        ? null
        : controlCategoryOverview.find((summary) => summary.category === activeCategory),
    [activeCategory],
  );

  return (
    <section className="grid gap-6 xl:grid-cols-[0.84fr_1.16fr]">
      <div className="space-y-5 rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <Search className="size-4" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Search controls
            </div>
            <div className="text-sm text-slate-600">
              Filter by category, business theme, control type, or control wording.
            </div>
          </div>
        </div>

        <Input
          value={query}
          placeholder="Try supplier, journalisation, identity, 8.15..."
          onChange={(event) => setQuery(event.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          {categoryFilters.map((category) => (
            <button
              key={category}
              type="button"
              className={cn(
                "rounded-full border px-3 py-2 text-sm transition",
                activeCategory === category
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white",
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Business theme
            </span>
            <select
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400"
              value={activeTheme}
              onChange={(event) => setActiveTheme(event.target.value)}
            >
              {themes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Control type
            </span>
            <select
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400"
              value={activeType}
              onChange={(event) => setActiveType(event.target.value)}
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <Filter className="size-3.5" />
            Filter result
          </div>
          <div className="mt-3 text-3xl font-semibold text-slate-950">{filteredControls.length}</div>
          <div className="text-sm text-slate-600">controls visible</div>
          {categorySummary ? (
            <BilingualCopy
              value={categorySummary.businessLens}
              compact
              containerClassName="mt-4 rounded-2xl border border-slate-200 bg-white p-4"
            />
          ) : null}
        </div>

        <div className="max-h-[30rem] space-y-2 overflow-y-auto pr-1">
          {filteredControls.map((control) => (
            <button
              key={control.code}
              type="button"
              className={cn(
                "w-full rounded-[1.5rem] border p-4 text-left transition",
                selectedControl?.code === control.code
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
              )}
              onClick={() => setSelectedCode(control.code)}
            >
              <div className="flex items-center justify-between gap-3">
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full",
                    selectedControl?.code === control.code
                      ? "border-white/30 bg-white/10 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-600",
                  )}
                >
                  {control.code}
                </Badge>
                <span className="text-xs uppercase tracking-[0.18em] opacity-70">
                  {control.controlType}
                </span>
              </div>
              <div className="mt-3 text-base font-semibold">{control.name.en}</div>
              <div className="text-sm opacity-80">{control.name.fr}</div>
              <div className="mt-2 text-xs opacity-70">{control.businessTheme.en}</div>
            </button>
          ))}
        </div>
      </div>

      <ControlDetailPanel control={selectedControl} />
    </section>
  );
}

function ControlDetailPanel({ control }: { control?: ControlLibraryEntry }) {
  if (!control) {
    return (
      <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50/70 p-8 text-sm text-slate-500">
        No control matches the current filter.
      </div>
    );
  }

  return (
    <div className="space-y-5 rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
      <div className="flex flex-wrap items-center gap-3">
        <Badge className="rounded-full bg-slate-950 text-white">{control.code}</Badge>
        <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
          {control.category}
        </Badge>
        <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
          {control.businessTheme.en}
        </Badge>
        <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
          {control.controlType}
        </Badge>
      </div>

      <div>
        <h3 className="text-3xl font-semibold text-slate-950">{control.name.en}</h3>
        <p className="mt-2 text-lg text-slate-500">{control.name.fr}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Short explanation
          </div>
          <BilingualCopy
            value={control.shortExplanation}
            compact
            containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
          />
        </article>
        <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Business meaning
          </div>
          <BilingualCopy
            value={control.businessMeaning}
            compact
            containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
          />
        </article>
      </div>

      <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-4">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Example implementation
        </div>
        <BilingualCopy
          value={control.exampleImplementation}
          compact
          containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
        />
      </article>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Related risks
          </div>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {control.relatedRisks.map((risk) => (
              <li key={risk.en}>
                <span className="font-medium text-slate-950">{risk.en}</span>
                <span className="text-slate-400"> / {risk.fr}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Related evidence
          </div>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {control.relatedEvidence.map((evidence) => (
              <li key={evidence.en}>
                <span className="font-medium text-slate-950">{evidence.en}</span>
                <span className="text-slate-400"> / {evidence.fr}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <article className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Related practice links
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {control.relatedQuizLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              {link.label.en}
            </Link>
          ))}
        </div>
      </article>
    </div>
  );
}
