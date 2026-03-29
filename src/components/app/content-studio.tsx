"use client";

import { useMemo, useState } from "react";
import { FilePenLine, Layers3 } from "lucide-react";
import {
  glossaryEntries,
  learningModules,
  nonconformityCases,
  practiceQuestions,
  riskLabScenarios,
} from "@/lib/platform-data";
import {
  readContentStudioDrafts,
  writeContentStudioDrafts,
} from "@/lib/learning-insights";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type CollectionKey = "lessons" | "glossary" | "quizzes" | "scenarios" | "nonconformities";

type EditableRecord = {
  id: string;
  label: string;
  fields: Array<{
    key: string;
    label: string;
    value: string;
    multiline?: boolean;
  }>;
};

const collectionLabels: Record<CollectionKey, string> = {
  lessons: "Lessons",
  glossary: "Glossary",
  quizzes: "Quiz questions",
  scenarios: "Scenarios",
  nonconformities: "Nonconformity cases",
};

function buildCollections(): Record<CollectionKey, EditableRecord[]> {
  return {
    lessons: learningModules.map((module) => ({
      id: module.slug,
      label: module.title.en,
      fields: [
        { key: "title_en", label: "Title (EN)", value: module.title.en },
        { key: "title_fr", label: "Title (FR)", value: module.title.fr },
        { key: "summary_en", label: "Summary (EN)", value: module.summary.en, multiline: true },
        { key: "summary_fr", label: "Summary (FR)", value: module.summary.fr, multiline: true },
      ],
    })),
    glossary: glossaryEntries.map((entry) => ({
      id: entry.slug,
      label: entry.term.en,
      fields: [
        { key: "term_en", label: "Term (EN)", value: entry.term.en },
        { key: "term_fr", label: "Term (FR)", value: entry.term.fr },
        {
          key: "plain_en",
          label: "Plain explanation (EN)",
          value: entry.plainExplanation.en,
          multiline: true,
        },
        {
          key: "plain_fr",
          label: "Plain explanation (FR)",
          value: entry.plainExplanation.fr,
          multiline: true,
        },
      ],
    })),
    quizzes: practiceQuestions.map((question) => ({
      id: question.id,
      label: question.prompt.en,
      fields: [
        { key: "prompt_en", label: "Prompt (EN)", value: question.prompt.en, multiline: true },
        { key: "prompt_fr", label: "Prompt (FR)", value: question.prompt.fr, multiline: true },
        {
          key: "explanation_en",
          label: "Explanation (EN)",
          value: question.explanation.en,
          multiline: true,
        },
        {
          key: "explanation_fr",
          label: "Explanation (FR)",
          value: question.explanation.fr,
          multiline: true,
        },
      ],
    })),
    scenarios: riskLabScenarios.map((scenario) => ({
      id: scenario.id,
      label: scenario.title.en,
      fields: [
        { key: "title_en", label: "Title (EN)", value: scenario.title.en },
        { key: "title_fr", label: "Title (FR)", value: scenario.title.fr },
        { key: "context_en", label: "Context (EN)", value: scenario.context.en, multiline: true },
        { key: "context_fr", label: "Context (FR)", value: scenario.context.fr, multiline: true },
      ],
    })),
    nonconformities: nonconformityCases.map((item) => ({
      id: item.id,
      label: item.title.en,
      fields: [
        { key: "title_en", label: "Title (EN)", value: item.title.en },
        { key: "title_fr", label: "Title (FR)", value: item.title.fr },
        { key: "why_en", label: "Why (EN)", value: item.why.en, multiline: true },
        { key: "why_fr", label: "Why (FR)", value: item.why.fr, multiline: true },
      ],
    })),
  };
}

export function ContentStudio() {
  const collections = useMemo(() => buildCollections(), []);
  const [activeCollection, setActiveCollection] = useState<CollectionKey>("lessons");
  const [selectedId, setSelectedId] = useState(collections.lessons[0]?.id);
  const [drafts, setDrafts] = useState<Record<string, unknown>>(() => readContentStudioDrafts());

  const activeItems = collections[activeCollection];
  const activeRecord =
    activeItems.find((item) => item.id === selectedId) ?? activeItems[0];
  const draftKey = `${activeCollection}:${activeRecord?.id ?? "none"}`;
  const currentDraft = (drafts[draftKey] as Record<string, string> | undefined) ?? {};

  function updateDraft(fieldKey: string, value: string) {
    setDrafts((current) => ({
      ...current,
      [draftKey]: {
        ...(current[draftKey] as Record<string, string> | undefined),
        [fieldKey]: value,
      },
    }));
  }

  function saveDrafts() {
    writeContentStudioDrafts(drafts);
    toast.success("Content Studio drafts saved locally.");
  }

  function resetCurrent() {
    setDrafts((current) => {
      const next = { ...current };
      delete next[draftKey];
      return next;
    });
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[0.76fr_1.24fr]">
      <aside className="space-y-5 rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Content collections
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950">
            Basic internal content studio
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(collectionLabels) as CollectionKey[]).map((collection) => (
            <button
              key={collection}
              type="button"
              className={cn(
                "rounded-full border px-3 py-2 text-sm transition",
                activeCollection === collection
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white",
              )}
              onClick={() => {
                setActiveCollection(collection);
                setSelectedId(collections[collection][0]?.id);
              }}
            >
              {collectionLabels[collection]}
            </button>
          ))}
        </div>

        <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <Layers3 className="size-3.5 text-slate-700" />
            Items
          </div>
          <div className="mt-4 max-h-[28rem] space-y-2 overflow-y-auto pr-1">
            {activeItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cn(
                  "w-full rounded-[1.25rem] border p-3 text-left transition",
                  item.id === activeRecord?.id
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                )}
                onClick={() => setSelectedId(item.id)}
              >
                <div className="text-sm font-medium">{item.label}</div>
                <div className="mt-1 text-xs opacity-75">{item.id}</div>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
        {activeRecord ? (
          <>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Editing
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-950">
                  {activeRecord.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This studio is intentionally simple: it supports bilingual field edits and local
                  draft persistence so the app can evolve toward a fuller CMS later.
                </p>
              </div>
              <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
                {collectionLabels[activeCollection]}
              </Badge>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {activeRecord.fields.map((field) => {
                const value = currentDraft[field.key] ?? field.value;

                return (
                  <label key={field.key} className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">{field.label}</span>
                    {field.multiline ? (
                      <Textarea
                        rows={6}
                        value={value}
                        onChange={(event) => updateDraft(field.key, event.target.value)}
                      />
                    ) : (
                      <Input
                        value={value}
                        onChange={(event) => updateDraft(field.key, event.target.value)}
                      />
                    )}
                  </label>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button type="button" className="rounded-full" onClick={saveDrafts}>
                <FilePenLine className="size-4" />
                Save drafts
              </Button>
              <Button type="button" variant="outline" className="rounded-full" onClick={resetCurrent}>
                Reset current draft
              </Button>
              <p className="text-sm text-slate-500">
                Drafts are stored locally so future CMS work can preserve edits without changing the
                live seed data yet.
              </p>
            </div>
          </>
        ) : (
          <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50/70 p-6 text-sm text-slate-500">
            No editable item selected.
          </div>
        )}
      </div>
    </section>
  );
}
