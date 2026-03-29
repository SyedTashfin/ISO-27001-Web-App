import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { clauseExplorerEntries } from "@/lib/platform-data";
import { getClausePracticeLens } from "@/lib/practical-learning-data";
import { Badge } from "@/components/ui/badge";
import { BilingualCopy } from "@/components/app/bilingual-copy";

type ClausePageProps = {
  params: Promise<{
    clause: string;
  }>;
};

export function generateStaticParams() {
  return clauseExplorerEntries.map((entry) => ({
    clause: entry.clause,
  }));
}

export async function generateMetadata({ params }: ClausePageProps): Promise<Metadata> {
  const { clause } = await params;
  const entry = clauseExplorerEntries.find((item) => item.clause === clause);

  return {
    title: entry ? `Clause ${entry.clause} ${entry.title.en}` : "Clause not found",
  };
}

export default async function ClausePage({ params }: ClausePageProps) {
  const { clause } = await params;
  const entry = clauseExplorerEntries.find((item) => item.clause === clause);
  const practiceLens = entry ? getClausePracticeLens(entry.clause) : undefined;

  if (!entry) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/82 p-6 shadow-[0_34px_90px_-56px_rgba(15,23,42,0.42)] backdrop-blur-sm md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="rounded-full bg-slate-950 text-white">Clause {entry.clause}</Badge>
          <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
            {entry.title.en}
          </Badge>
        </div>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950">
          {entry.title.en}
        </h1>
        <p className="mt-3 text-xl text-slate-500">{entry.title.fr}</p>
        <BilingualCopy value={entry.professional} containerClassName="mt-6" />
      </section>

      <section className="mt-10 grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
        <div className="space-y-5">
          <article className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Simple explanation
            </p>
            <BilingualCopy value={entry.simple} containerClassName="mt-4" />
          </article>
          <article className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              What it means in business
            </p>
            <BilingualCopy value={entry.businessMeaning} containerClassName="mt-4" />
          </article>
          {practiceLens ? (
            <>
              <article className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Realistic example
                </p>
                <BilingualCopy value={practiceLens.realisticExample} containerClassName="mt-4" />
              </article>
              <article className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Quick practice
                </p>
                <BilingualCopy value={practiceLens.quickPractice} containerClassName="mt-4" />
              </article>
            </>
          ) : null}
          <article className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Example nonconformities
            </p>
            <div className="mt-4 space-y-3">
              {entry.exampleNonconformities.map((item) => (
                <div key={item.detail.en} className="rounded-[1.5rem] border border-slate-200 bg-slate-50/75 p-4">
                  <Badge className="rounded-full bg-slate-950 text-white">{item.severity}</Badge>
                  <BilingualCopy
                    value={item.detail}
                    compact
                    containerClassName="mt-3 border-0 bg-transparent p-0 shadow-none"
                  />
                </div>
              ))}
            </div>
          </article>
        </div>

        <aside className="space-y-5">
          <article className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Evidence auditors may expect
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {entry.auditorEvidence.map((item) => (
                <li key={item.en}>
                  <span className="font-medium text-slate-950">{item.en}</span>
                  <span className="text-slate-400"> / {item.fr}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Common mistakes
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {entry.commonMistakes.map((item) => (
                <li key={item.en}>
                  <span className="font-medium text-slate-950">{item.en}</span>
                  <span className="text-slate-400"> / {item.fr}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              English and French terminology
            </p>
            <div className="mt-4 space-y-3">
              {entry.terminology.map((term) => (
                <div key={term.term.en} className="rounded-[1.5rem] border border-slate-200 bg-slate-50/75 p-4">
                  <div className="font-medium text-slate-950">{term.term.en}</div>
                  <div className="text-sm text-slate-500">{term.term.fr}</div>
                  <BilingualCopy
                    value={term.explanation}
                    compact
                    containerClassName="mt-3 border-0 bg-transparent p-0 shadow-none"
                  />
                </div>
              ))}
            </div>
          </article>
          {practiceLens ? (
            <article className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Auditor mindset
              </p>
              <BilingualCopy value={practiceLens.auditorMindset} containerClassName="mt-4" />
            </article>
          ) : null}
        </aside>
      </section>
    </main>
  );
}
