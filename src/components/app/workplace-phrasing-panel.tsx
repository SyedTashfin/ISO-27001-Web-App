import {
  getWorkplacePhrasesByIds,
  workplacePhraseEntries,
  type WorkplacePhraseEntry,
} from "@/lib/practical-learning-data";
import { Badge } from "@/components/ui/badge";
import { BilingualCopy } from "@/components/app/bilingual-copy";

type WorkplacePhrasingPanelProps = {
  title?: string;
  description?: string;
  ids?: string[];
  category?: WorkplacePhraseEntry["category"];
  limit?: number;
};

export function WorkplacePhrasingPanel({
  title = "Workplace phrasing",
  description = "Use this language in meetings, audits, and project discussions.",
  ids,
  category,
  limit,
}: WorkplacePhrasingPanelProps) {
  let phrases = ids?.length ? getWorkplacePhrasesByIds(ids) : workplacePhraseEntries;

  if (category) {
    phrases = phrases.filter((entry) => entry.category === category);
  }

  if (limit) {
    phrases = phrases.slice(0, limit);
  }

  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          {title}
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {phrases.map((phrase) => (
          <article
            key={phrase.id}
            className="rounded-[1.75rem] border border-white/70 bg-white/82 p-5 shadow-[0_24px_72px_-48px_rgba(15,23,42,0.35)] backdrop-blur-sm"
          >
            <div className="flex flex-wrap items-center gap-3">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {phrase.situation.en}
              </div>
              <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
                {phrase.category}
              </Badge>
            </div>
            <div className="mt-4 rounded-[1.5rem] border border-sky-200 bg-sky-50/80 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                English
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-800">{phrase.english}</p>
            </div>
            <div className="mt-4 rounded-[1.5rem] border border-emerald-200 bg-emerald-50/80 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Français
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-800">{phrase.french}</p>
            </div>
            <BilingualCopy
              value={phrase.note}
              compact
              containerClassName="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
