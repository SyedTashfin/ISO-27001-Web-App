import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PracticeEngine } from "@/components/app/practice-engine";
import { BilingualCopy } from "@/components/app/bilingual-copy";

const secondaryLinkClass =
  "inline-flex h-10 items-center justify-center rounded-full border border-slate-300 bg-white/70 px-5 text-sm font-medium text-slate-700 transition hover:bg-white";

export default function PracticePage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/82 p-6 shadow-[0_34px_90px_-56px_rgba(15,23,42,0.42)] backdrop-blur-sm md:p-8">
        <Badge className="rounded-full bg-slate-950 text-white">Practice</Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950">
          Drill clauses, controls, audit reasoning, glossary recall, and scenario judgement
        </h1>
        <BilingualCopy
          value={{
            en: "Practice is where the platform stops being a reading experience and becomes an operational learning system. Use the adaptive engine, then move into the SoA builder and nonconformity lab for deeper scenario work.",
            fr: "La section pratique est l'endroit où la plateforme cesse d'être une simple lecture et devient un système d'apprentissage opérationnel. Utilisez le moteur adaptatif puis passez au générateur de SoA et au laboratoire de non-conformité pour des scénarios plus profonds.",
          }}
          containerClassName="mt-6"
        />
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-4">
        {[
          {
            title: "Adaptive practice",
            text: "Weak clause, control, glossary, risk, or audit topics surface automatically as you answer questions.",
          },
          {
            title: "SoA builder",
            text: "Turn treatment decisions into applicability, justification, implementation status, and linked-risk logic.",
          },
          {
            title: "Nonconformity lab",
            text: "Classify major, minor, and observation cases using realistic evidence and corrective action reasoning.",
          },
          {
            title: "Audit evidence practice",
            text: "Train the auditor mindset: what to ask for next, whether evidence is strong enough, and when a sample suggests a systemic issue.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-[1.75rem] border border-white/70 bg-white/82 p-5 shadow-[0_28px_72px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {item.title}
            </div>
            <div className="mt-3 text-base leading-7 text-slate-700">{item.text}</div>
          </article>
        ))}
      </section>

      <section className="mt-8 flex flex-wrap gap-3">
        <Link href="/practice/soa-builder" className={secondaryLinkClass}>
          Open the SoA builder
          <ArrowRight className="ml-2 size-4" />
        </Link>
        <Link href="/practice/nonconformity-lab" className={secondaryLinkClass}>
          Open the nonconformity lab
          <ArrowRight className="ml-2 size-4" />
        </Link>
        <Link href="/practice/audit-evidence" className={secondaryLinkClass}>
          Open audit evidence practice
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </section>

      <section className="mt-10">
        <PracticeEngine />
      </section>
    </main>
  );
}
