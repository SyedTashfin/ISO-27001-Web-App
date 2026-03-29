import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clauseExplorerEntries, compareFrameworks, learningModules } from "@/lib/platform-data";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { ModuleGrid } from "@/components/app/module-grid";
import { ProgressOverview } from "@/components/app/progress-overview";

export default function LearnPage() {
  const primaryLinkClass =
    "inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-slate-950 px-5 text-sm font-medium text-white transition hover:bg-slate-800";
  const secondaryLinkClass =
    "inline-flex h-10 items-center justify-center rounded-full border border-slate-300 bg-white/70 px-5 text-sm font-medium text-slate-700 transition hover:bg-white";

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Guided learning path
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-slate-950">
            Learn ISO 27001 step by step, from zero to practical implementation and audit fluency
          </h1>
          <BilingualCopy
            value={{
              en: "The guided path now connects twelve modules to deeper practice: realistic case studies, an end-to-end implementation journey, richer SoA reasoning, stronger audit evidence drills, and a larger nonconformity library.",
              fr: "Le parcours guidé relie désormais douze modules à une pratique plus profonde : études de cas réalistes, parcours de mise en oeuvre bout en bout, raisonnement SoA enrichi, exercices de preuve d'audit renforcés et bibliothèque de non-conformités plus large.",
            }}
          />
          <div className="flex flex-wrap gap-3">
            <Link href="/learn/what-is-iso-27001" className={primaryLinkClass}>
              Start from zero
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/learn/clauses" className={secondaryLinkClass}>
              Open the clause explorer
            </Link>
            <Link href="/implementation-journey" className={secondaryLinkClass}>
              Open the implementation journey
            </Link>
          </div>
        </div>
        <ProgressOverview totalModules={learningModules.length} />
      </section>

      <section className="mt-12">
        <ModuleGrid />
      </section>

      <section className="mt-16 grid gap-5 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_30px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Clause map
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">
            Clauses 4 to 10 in one operational view
          </h2>
          <div className="mt-6 grid gap-3">
            {clauseExplorerEntries.map((clause) => (
              <div
                key={clause.clause}
                className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/70 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    {clause.clause}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-950">{clause.title.en}</div>
                    <div className="text-sm text-slate-500">{clause.title.fr}</div>
                  </div>
                </div>
                <BilingualCopy
                  value={clause.businessMeaning}
                  compact
                  containerClassName="mt-4 rounded-2xl border border-slate-200 bg-white p-4"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_30px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Keep the standards straight
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">
            ISO 27001, ISO 27002, ISO 19011, and adjacent frameworks do different jobs
          </h2>
          <div className="mt-6 space-y-4">
            {compareFrameworks.slice(0, 4).map((comparison) => (
              <div
                key={comparison.name}
                className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/70 p-4"
              >
                <div className="text-lg font-semibold text-slate-950">{comparison.name}</div>
                <div className="mt-1 text-sm text-slate-500">{comparison.title.en}</div>
                <div className="mt-4 space-y-3">
                  <BilingualCopy value={comparison.type} compact />
                  <BilingualCopy value={comparison.purpose} compact />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-5 xl:grid-cols-2">
        <article className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_30px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Practical depth
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">
            Move from concepts into realistic organizational scenarios
          </h2>
          <BilingualCopy
            value={{
              en: "Case studies now show why organizations pursue ISO 27001, how the ISMS works in business terms, and where evidence and audit-readiness become difficult in real projects.",
              fr: "Les études de cas montrent désormais pourquoi les organisations poursuivent l'ISO 27001, comment le SMSI fonctionne en termes métier et où la preuve et la préparation d'audit deviennent difficiles dans les projets réels.",
            }}
            containerClassName="mt-5"
          />
          <Link href="/case-studies" className={primaryLinkClass}>
            Explore case studies
            <ArrowRight className="size-4" />
          </Link>
        </article>

        <article className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_30px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            End-to-end flow
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">
            Follow the full implementation journey from scope to continual improvement
          </h2>
          <BilingualCopy
            value={{
              en: "The implementation journey ties context, scope, leadership, risk, SoA, evidence, internal audit, management review, certification readiness, and corrective action into one realistic sequence.",
              fr: "Le parcours de mise en oeuvre relie le contexte, le périmètre, la direction, le risque, la SoA, la preuve, l'audit interne, la revue de direction, la préparation à la certification et l'action corrective dans une seule séquence réaliste.",
            }}
            containerClassName="mt-5"
          />
          <Link href="/implementation-journey" className={primaryLinkClass}>
            Walk the journey
            <ArrowRight className="size-4" />
          </Link>
        </article>
      </section>
    </main>
  );
}
