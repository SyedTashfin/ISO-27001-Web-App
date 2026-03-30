import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  FlaskConical,
  LayoutDashboard,
  Map,
  Search,
} from "lucide-react";
import { learningModules, platformStats } from "@/lib/platform-data";
import { LocalizedInline } from "@/components/app/localized-inline";
import { ModuleGrid } from "@/components/app/module-grid";
import { ProgressOverview } from "@/components/app/progress-overview";

const quickLinks = [
  {
    href: "/mock-exam",
    icon: FileCheck2,
    title: { en: "Mock Exam", fr: "Examen blanc" },
    desc: { en: "Timed ISO 27001 readiness exams", fr: "Examens chronometres de preparation ISO 27001" },
  },
  {
    href: "/learn/what-is-iso-27001",
    icon: BookOpen,
    title: { en: "Start learning", fr: "Commencer" },
    desc: { en: "From zero to practical understanding", fr: "De zero a la comprehension pratique" },
  },
  {
    href: "/implementation-journey",
    icon: Map,
    title: { en: "Implementation journey", fr: "Parcours de mise en oeuvre" },
    desc: { en: "Walk the full ISO 27001 flow", fr: "Suivez le flux complet ISO 27001" },
  },
  {
    href: "/risk-lab",
    icon: FlaskConical,
    title: { en: "Risk Lab", fr: "Lab risque" },
    desc: { en: "Risk analysis and treatment", fr: "Analyse et traitement des risques" },
  },
  {
    href: "/audit-lab",
    icon: ClipboardList,
    title: { en: "Audit Lab", fr: "Lab audit" },
    desc: { en: "Internal and external audit practice", fr: "Pratique d'audit interne et externe" },
  },
  {
    href: "/control-library",
    icon: Search,
    title: { en: "Control Library", fr: "Bibliotheque de mesures" },
    desc: { en: "All 93 Annex A controls", fr: "Les 93 mesures de l'Annexe A" },
  },
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    title: { en: "Dashboard", fr: "Tableau de bord" },
    desc: { en: "Track your progress", fr: "Suivez votre progression" },
  },
] as const;

const highlights = [
  { en: "Timed mock exams with realistic ISO 27001-style questions", fr: "Examens blancs chronometres avec questions de style ISO 27001 realistes" },
  { en: "12 guided modules from foundations to capstone", fr: "12 modules guides des fondamentaux au capstone" },
  { en: "93 Annex A controls with evidence guidance", fr: "93 mesures Annexe A avec guide de preuves" },
  { en: "Risk, SoA, audit, and nonconformity labs", fr: "Labs risque, SoA, audit et non-conformite" },
] as const;

export default function HomePage() {
  return (
    <main className="space-y-12 pb-16">
      {/* Hero */}
      <section className="border-b border-white/50 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.08),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(56,189,248,0.08),transparent_22%)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              <LocalizedInline
                value={{
                  en: "Practical ISO 27001 learning",
                  fr: "Apprentissage pratique ISO 27001",
                }}
              />
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
              <LocalizedInline
                value={{
                  en: "Learn ISO/IEC 27001 as it is actually used in projects, audits, risk workshops, and certification-readiness work.",
                  fr: "Apprenez l'ISO/IEC 27001 tel qu'il est utilise dans les projets, les audits, les ateliers risque et la preparation a la certification.",
                }}
              />
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/mock-exam"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                <LocalizedInline value={{ en: "Take a mock exam", fr: "Passer un examen blanc" }} />
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/learn/what-is-iso-27001"
                className="inline-flex h-11 items-center rounded-full border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                <LocalizedInline value={{ en: "Start from zero", fr: "Commencer de zero" }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-lg"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-slate-950 group-hover:text-white">
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-slate-950">
                    <LocalizedInline value={link.title} />
                  </div>
                  <div className="mt-0.5 text-sm text-slate-500">
                    <LocalizedInline value={link.desc} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats row */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {platformStats.map((stat) => (
            <div
              key={stat.label.en}
              className="rounded-2xl border border-slate-200/80 bg-white/80 p-4"
            >
              <div className="text-3xl font-bold text-slate-950">{stat.value}</div>
              <div className="mt-1 text-sm text-slate-500">
                <LocalizedInline value={stat.label} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights + Progress */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-950">
              <LocalizedInline value={{ en: "What you will learn", fr: "Ce que vous apprendrez" }} />
            </h2>
            <div className="space-y-2.5">
              {highlights.map((item) => (
                <div key={item.en} className="flex gap-3 rounded-xl border border-slate-200/80 bg-white/80 p-4">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                  <p className="text-sm leading-6 text-slate-700">
                    <LocalizedInline value={item} />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <ProgressOverview totalModules={learningModules.length} />
        </div>
      </section>

      {/* Module preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              <LocalizedInline value={{ en: "Modules", fr: "Modules" }} />
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-950">
              <LocalizedInline value={{ en: "Guided learning path", fr: "Parcours d'apprentissage guide" }} />
            </h2>
          </div>
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            <LocalizedInline value={{ en: "View all", fr: "Voir tout" }} />
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <ModuleGrid modules={learningModules.slice(0, 6)} />
      </section>
    </main>
  );
}
