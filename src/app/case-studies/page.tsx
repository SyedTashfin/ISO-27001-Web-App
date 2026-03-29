import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  nonconformityCaseStudies,
  organizationalCaseStudies,
  practicalLearningCards,
} from "@/lib/practical-learning-data";
import { Badge } from "@/components/ui/badge";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { WorkplacePhrasingPanel } from "@/components/app/workplace-phrasing-panel";

const secondaryLinkClass =
  "inline-flex h-10 items-center justify-center rounded-full border border-slate-300 bg-white/70 px-5 text-sm font-medium text-slate-700 transition hover:bg-white";

export default function CaseStudiesPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/82 p-6 shadow-[0_34px_90px_-56px_rgba(15,23,42,0.42)] backdrop-blur-sm md:p-8">
        <Badge className="rounded-full bg-slate-950 text-white">Case studies</Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950">
          Realistic organizations, realistic audit patterns, and realistic implementation tradeoffs
        </h1>
        <BilingualCopy
          value={{
            en: "These case studies explain ISO 27001 in business terms. They show why organizations pursue it, how the ISMS changes daily decisions, and where evidence and audit readiness usually become difficult.",
            fr: "Ces études de cas expliquent l'ISO 27001 en termes métier. Elles montrent pourquoi les organisations la poursuivent, comment le SMSI change les décisions quotidiennes et où la preuve et la préparation d'audit deviennent généralement difficiles.",
          }}
          containerClassName="mt-6"
        />
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {practicalLearningCards.map((card) => (
          <article
            key={card.title.en}
            className="rounded-[1.75rem] border border-white/70 bg-white/82 p-5 shadow-[0_24px_72px_-48px_rgba(15,23,42,0.35)] backdrop-blur-sm"
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
      </section>

      <section className="mt-10 space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Organizational scenarios
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">
            Why real organizations pursue ISO 27001 and what their ISMS must solve
          </h2>
        </div>
        <div className="grid gap-5 xl:grid-cols-2">
          {organizationalCaseStudies.map((study) => (
            <article
              key={study.id}
              className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="rounded-full bg-slate-950 text-white">{study.company}</Badge>
                <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
                  {study.sector.en}
                </Badge>
                <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
                  {study.location.en}
                </Badge>
              </div>
              <div className="mt-4 text-2xl font-semibold text-slate-950">{study.title.en}</div>
              <div className="text-sm text-slate-500">{study.title.fr}</div>

              <div className="mt-5 grid gap-4">
                <BilingualCopy value={study.driver} />
                <BilingualCopy value={study.whyIso27001} />
                <BilingualCopy value={study.ismsInBusinessTerms} />
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50/75 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Scope focus
                  </div>
                  <BilingualCopy
                    value={study.scopeFocus}
                    compact
                    containerClassName="mt-4 border-0 bg-transparent p-0 shadow-none"
                  />
                </article>
                <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50/75 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Key risks
                  </div>
                  <ul className="mt-4 space-y-3 text-sm text-slate-700">
                    {study.keyRisks.map((item) => (
                      <li key={item.en}>
                        <span className="font-medium text-slate-950">{item.en}</span>
                        <span className="text-slate-400"> / {item.fr}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <article className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Evidence priorities
                  </div>
                  <ul className="mt-4 space-y-3 text-sm text-slate-700">
                    {study.evidencePriorities.map((item) => (
                      <li key={item.en}>
                        <span className="font-medium text-slate-950">{item.en}</span>
                        <span className="text-slate-400"> / {item.fr}</span>
                      </li>
                    ))}
                  </ul>
                </article>
                <article className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Likely pitfalls
                  </div>
                  <ul className="mt-4 space-y-3 text-sm text-slate-700">
                    {study.likelyPitfalls.map((item) => (
                      <li key={item.en}>
                        <span className="font-medium text-slate-950">{item.en}</span>
                        <span className="text-slate-400"> / {item.fr}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <WorkplacePhrasingPanel
          title="Bilingual workplace language"
          description="Phrasing that helps France-based learners explain ISO 27001, evidence, and findings naturally in English and French."
          ids={[
            "why-iso27001",
            "scope-boundary",
            "process-not-evidenced",
            "risk-not-traceable",
          ]}
        />
      </section>

      <section className="mt-10 space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Findings preview
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              The nonconformity lab goes deeper into twenty realistic findings
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/practice/nonconformity-lab" className={secondaryLinkClass}>
              Open the nonconformity lab
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link href="/implementation-journey" className={secondaryLinkClass}>
              Open the implementation journey
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {nonconformityCaseStudies.slice(0, 6).map((item) => (
            <article
              key={item.id}
              className="rounded-[1.75rem] border border-white/70 bg-white/82 p-5 shadow-[0_24px_72px_-48px_rgba(15,23,42,0.35)] backdrop-blur-sm"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-full bg-slate-950 text-white">{item.classification}</Badge>
                {item.relatedClauses.slice(0, 1).map((clause) => (
                  <Badge
                    key={clause}
                    variant="outline"
                    className="rounded-full border-slate-200 bg-slate-50"
                  >
                    Clause {clause}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 text-lg font-semibold text-slate-950">{item.title.en}</div>
              <div className="text-sm text-slate-500">{item.title.fr}</div>
              <BilingualCopy
                value={item.scenario}
                compact
                containerClassName="mt-4 rounded-2xl border border-slate-200 bg-slate-50/75 p-4"
              />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
