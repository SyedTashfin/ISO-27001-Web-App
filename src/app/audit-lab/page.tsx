import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { AuditSimulator } from "@/components/app/audit-simulator";

const secondaryLinkClass =
  "inline-flex h-10 items-center justify-center rounded-full border border-slate-300 bg-white/70 px-5 text-sm font-medium text-slate-700 transition hover:bg-white";

export default function AuditLabPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/82 p-6 shadow-[0_34px_90px_-56px_rgba(15,23,42,0.42)] backdrop-blur-sm md:p-8">
        <Badge className="rounded-full bg-slate-950 text-white">Audit lab</Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950">
          Learn internal audit, external audit, evidence review, and finding classification
        </h1>
        <BilingualCopy
          value={{
            en: "The Audit Lab combines two modes. Internal audit mode focuses on planning, sampling, interviewing, and improvement. External audit mode focuses on certification logic, scope verification, evidence validation, and proportional classification of nonconformities.",
            fr: "L'Audit Lab combine deux modes. Le mode audit interne se concentre sur la planification, l'échantillonnage, les entretiens et l'amélioration. Le mode audit externe se concentre sur la logique de certification, la vérification du périmètre, la validation des preuves et la qualification proportionnée des non-conformités.",
          }}
          containerClassName="mt-6"
        />
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "Internal audit mode",
            text: "Purpose, planning, sampling, interviews, evidence collection, gap identification, and improvement orientation before certification pressure arrives.",
          },
          {
            title: "External audit mode",
            text: "Scope verification, document review, evidence review, control implementation validation, management review, and proportional classification of findings.",
          },
          {
            title: "Evidence-centered drills",
            text: "Ask what evidence comes next, whether the sample is sufficient, what makes the weakness systemic, and what follow-up question the auditor would ask.",
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
        <Link href="/practice/nonconformity-lab" className={secondaryLinkClass}>
          Open the nonconformity lab
          <ArrowRight className="ml-2 size-4" />
        </Link>
        <Link href="/practice/audit-evidence" className={secondaryLinkClass}>
          Practice audit evidence
          <ArrowRight className="ml-2 size-4" />
        </Link>
        <Link href="/compare" className={secondaryLinkClass}>
          Compare ISO 19011 and ISO 27001
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </section>

      <section className="mt-10">
        <AuditSimulator />
      </section>
    </main>
  );
}
