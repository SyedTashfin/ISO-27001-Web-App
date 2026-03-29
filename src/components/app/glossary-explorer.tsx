"use client";

import { useDeferredValue, useMemo, useState, type ReactNode } from "react";
import { Search, Volume2 } from "lucide-react";
import { glossaryEntries } from "@/lib/platform-data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BilingualCopy } from "@/components/app/bilingual-copy";

export function GlossaryExplorer() {
  const [query, setQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState("All topics");
  const deferredQuery = useDeferredValue(query);
  const topics = useMemo(
    () => ["All topics", ...new Set(glossaryEntries.map((entry) => entry.topic.en))],
    [],
  );

  const filteredTerms = useMemo(() => {
    return glossaryEntries.filter((term) => {
      const matchesTopic = topicFilter === "All topics" || term.topic.en === topicFilter;
      const target =
        `${term.term.en} ${term.term.fr} ${term.plainExplanation.en} ${term.professionalExplanation.en} ${term.exampleInContext.en}`.toLowerCase();
      const matchesQuery = deferredQuery ? target.includes(deferredQuery.toLowerCase()) : true;

      return matchesTopic && matchesQuery;
    });
  }, [deferredQuery, topicFilter]);

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <Search className="size-4" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Search the glossary
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              Browse plain and professional definitions
            </h3>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_16rem]">
          <Input
            value={query}
            placeholder="Search ISMS, SoA, management review, nonconformity..."
            onChange={(event) => setQuery(event.target.value)}
          />
          <select
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400"
            value={topicFilter}
            onChange={(event) => setTopicFilter(event.target.value)}
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {filteredTerms.map((term) => (
          <article
            key={term.slug}
            className="rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm"
          >
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <div className="text-2xl font-semibold text-slate-950">{term.term.en}</div>
                <div className="text-base text-slate-500">{term.term.fr}</div>
              </div>
              <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
                {term.topic.en}
              </Badge>
            </div>

            <div className="mt-4 grid gap-4">
              <Section title="Plain explanation">
                <BilingualCopy
                  value={term.plainExplanation}
                  compact
                  containerClassName="border-0 bg-transparent p-0 shadow-none"
                />
              </Section>
              <Section title="Professional explanation">
                <BilingualCopy
                  value={term.professionalExplanation}
                  compact
                  containerClassName="border-0 bg-transparent p-0 shadow-none"
                />
              </Section>
              <Section title="Example in context">
                <BilingualCopy
                  value={term.exampleInContext}
                  compact
                  containerClassName="border-0 bg-transparent p-0 shadow-none"
                />
              </Section>
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/75 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <Volume2 className="size-3.5 text-slate-700" />
                  Audio placeholder architecture
                </div>
                <div className="mt-3 text-sm text-slate-700">{term.audioStatus.en}</div>
                <div className="text-sm text-slate-500">{term.audioStatus.fr}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/75 p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {title}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
