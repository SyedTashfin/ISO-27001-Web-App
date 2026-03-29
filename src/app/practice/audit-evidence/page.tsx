import { evidenceCategoryGuides } from "@/lib/practical-learning-data";
import { Badge } from "@/components/ui/badge";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { AuditEvidencePractice } from "@/components/app/audit-evidence-practice";

export default function AuditEvidencePracticePage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/82 p-6 shadow-[0_34px_90px_-56px_rgba(15,23,42,0.42)] backdrop-blur-sm md:p-8">
        <Badge className="rounded-full bg-slate-950 text-white">Audit evidence practice</Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950">
          Learn how auditors think about evidence quality, sampling, and systemic weakness
        </h1>
        <BilingualCopy
          value={{
            en: "This route teaches evidence-centered audit reasoning: what to ask for next, how to judge whether the evidence is strong enough, and how to decide whether a sample suggests an isolated miss or a broader system issue.",
            fr: "Cette route enseigne un raisonnement d'audit centré sur la preuve : quoi demander ensuite, comment juger si la preuve est assez solide et comment décider si un échantillon suggère un écart isolé ou un sujet plus large de système.",
          }}
          containerClassName="mt-6"
        />
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {evidenceCategoryGuides.map((guide) => (
          <article
            key={guide.category}
            className="rounded-[1.75rem] border border-white/70 bg-white/82 p-5 shadow-[0_24px_72px_-48px_rgba(15,23,42,0.35)] backdrop-blur-sm"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {guide.title.en}
            </div>
            <BilingualCopy
              value={guide.description}
              compact
              containerClassName="mt-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
            />
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div>
                <span className="font-semibold text-slate-950">Strong signal:</span>{" "}
                {guide.strongSignal.en}
              </div>
              <div>
                <span className="font-semibold text-slate-950">Weak signal:</span>{" "}
                {guide.weakSignal.en}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-10">
        <AuditEvidencePractice />
      </section>
    </main>
  );
}
