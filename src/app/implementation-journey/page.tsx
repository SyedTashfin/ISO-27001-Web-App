import { Badge } from "@/components/ui/badge";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { ImplementationJourney } from "@/components/app/implementation-journey";

export default function ImplementationJourneyPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/82 p-6 shadow-[0_34px_90px_-56px_rgba(15,23,42,0.42)] backdrop-blur-sm md:p-8">
        <Badge className="rounded-full bg-slate-950 text-white">Implementation journey</Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950">
          Walk the end-to-end ISO 27001 journey from context and scope to audit readiness and
          improvement
        </h1>
        <BilingualCopy
          value={{
            en: "This journey is built as a realistic organizational flow rather than a checklist of pages. It shows how context, scope, leadership, risk, SoA, evidence, internal audit, management review, certification, and improvement connect in practice.",
            fr: "Ce parcours est construit comme un flux organisationnel réaliste plutôt que comme une checklist de pages. Il montre comment le contexte, le périmètre, la direction, le risque, la SoA, la preuve, l'audit interne, la revue de direction, la certification et l'amélioration se relient dans la pratique.",
          }}
          containerClassName="mt-6"
        />
      </section>

      <section className="mt-10">
        <ImplementationJourney />
      </section>
    </main>
  );
}
