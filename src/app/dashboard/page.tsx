import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DashboardOverview } from "@/components/app/dashboard-overview";
import { BilingualCopy } from "@/components/app/bilingual-copy";

const secondaryLinkClass =
  "inline-flex h-10 items-center justify-center rounded-full border border-slate-300 bg-white/70 px-5 text-sm font-medium text-slate-700 transition hover:bg-white";

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/82 p-6 shadow-[0_34px_90px_-56px_rgba(15,23,42,0.42)] backdrop-blur-sm md:p-8">
        <Badge className="rounded-full bg-slate-950 text-white">Dashboard</Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950">
          Track completed modules, weak areas, quiz history, vocabulary growth, and readiness
        </h1>
        <BilingualCopy
          value={{
            en: "The dashboard is designed as an operational learning view. It shows what has been completed, where the weak areas are emerging, and how close the learner is to practical ISO 27001 readiness.",
            fr: "Le tableau de bord est conçu comme une vue d'apprentissage opérationnel. Il montre ce qui a été terminé, où les zones faibles émergent et à quel point l'apprenant se rapproche d'une préparation pratique à l'ISO 27001.",
          }}
          containerClassName="mt-6"
        />
      </section>

      <section className="mt-8 flex flex-wrap gap-3">
        <Link href="/practice" className={secondaryLinkClass}>
          Return to practice
          <ArrowRight className="ml-2 size-4" />
        </Link>
        <Link href="/learn" className={secondaryLinkClass}>
          Continue the learning path
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </section>

      <section className="mt-10">
        <DashboardOverview />
      </section>
    </main>
  );
}
