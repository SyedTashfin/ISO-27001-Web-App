import { Badge } from "@/components/ui/badge";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { ClauseExplorer } from "@/components/app/clause-explorer";

export default function ClauseExplorerPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/82 p-6 shadow-[0_34px_90px_-56px_rgba(15,23,42,0.42)] backdrop-blur-sm md:p-8">
        <Badge className="rounded-full bg-slate-950 text-white">Clause explorer</Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950">
          Explore clauses 4 to 10 with business meaning, evidence, and example nonconformities
        </h1>
        <BilingualCopy
          value={{
            en: "Each clause page explains the simple meaning, formal meaning, business impact, expected evidence, common mistakes, and linked controls that frequently appear around that clause.",
            fr: "Chaque page de clause explique le sens simple, le sens formel, l'impact métier, les preuves attendues, les erreurs fréquentes et les mesures liées qui apparaissent souvent autour de cette clause.",
          }}
          containerClassName="mt-6"
        />
      </section>

      <section className="mt-10">
        <ClauseExplorer />
      </section>
    </main>
  );
}
