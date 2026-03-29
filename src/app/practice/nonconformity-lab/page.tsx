import { Badge } from "@/components/ui/badge";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { NonconformityLab } from "@/components/app/nonconformity-lab";

export default function PracticeNonconformityLabPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/82 p-6 shadow-[0_34px_90px_-56px_rgba(15,23,42,0.42)] backdrop-blur-sm md:p-8">
        <Badge className="rounded-full bg-slate-950 text-white">Nonconformity lab</Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950">
          Classify twenty realistic ISO 27001 findings and judge the strength of the sampled evidence
        </h1>
        <BilingualCopy
          value={{
            en: "Use this dedicated lab to decide whether a gap is major, minor, or an observation, then review whether the evidence is sufficient, what makes the issue systemic, and what a stronger corrective response would look like.",
            fr: "Utilisez ce laboratoire dédié pour décider si un écart est majeur, mineur ou une observation, puis revoir si la preuve est suffisante, ce qui rend le sujet systémique et à quoi ressemblerait une réponse corrective plus solide.",
          }}
          containerClassName="mt-6"
        />
      </section>

      <section className="mt-10">
        <NonconformityLab />
      </section>
    </main>
  );
}
