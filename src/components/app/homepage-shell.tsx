"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  ClipboardCheck,
  FileCheck2,
  Radar,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { LocalizedText } from "@/lib/course-data";
import { HomeLearningPulse } from "@/components/app/home-learning-pulse";
import { LocalizedInline } from "@/components/app/localized-inline";
import { ModuleGrid } from "@/components/app/module-grid";
import { useLanguageMode } from "@/components/app/language-provider";
import { learningModules, platformStats } from "@/lib/platform-data";

const text = (en: string, fr: string): LocalizedText => ({ en, fr });

type LocalizedCard = {
  eyebrow: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
};

type HeroSignal = {
  title: LocalizedText;
  body: LocalizedText;
  tag: LocalizedText;
  icon: LucideIcon;
};

type GuidedRoute = {
  href: string;
  title: LocalizedText;
  body: LocalizedText;
  eyebrow: LocalizedText;
  icon: LucideIcon;
};

const heroSignals: HeroSignal[] = [
  {
    title: text("Daily digital life creates exposure", "La vie numerique quotidienne cree de l'exposition"),
    body: text(
      "Payroll, email, banking, healthcare, and SaaS tools all rely on information being handled responsibly.",
      "Paie, email, banque, sante et outils SaaS reposent tous sur une gestion responsable de l'information.",
    ),
    tag: text("Context", "Contexte"),
    icon: Users,
  },
  {
    title: text("Cybersecurity needs more than tools", "La cybersecurite demande plus que des outils"),
    body: text(
      "Access controls, incident response, supplier reviews, and evidence all need ownership and repeatable decisions.",
      "Les acces, la reponse a incident, les revues fournisseurs et les preuves ont besoin de responsabilites et de decisions repetables.",
    ),
    tag: text("Operations", "Operations"),
    icon: Shield,
  },
  {
    title: text("ISO 27001 organizes the system", "L'ISO 27001 organise le systeme"),
    body: text(
      "It ties governance, risk, controls, and review into one management model that people can explain and audit.",
      "Elle relie gouvernance, risque, mesures et revue dans un modele de management explicable et auditable.",
    ),
    tag: text("Governance", "Gouvernance"),
    icon: ClipboardCheck,
  },
  {
    title: text("Trust becomes visible", "La confiance devient visible"),
    body: text(
      "Customers, auditors, and teams can see whether security is systematic or just talk.",
      "Clients, auditeurs et equipes peuvent voir si la securite est systematique ou simplement discursive.",
    ),
    tag: text("Proof", "Preuve"),
    icon: Sparkles,
  },
];

const whyItMatters: LocalizedCard[] = [
  {
    eyebrow: text("For regular people", "Pour tout le monde"),
    title: text("Your data already lives inside security decisions", "Vos donnees vivent deja dans des decisions securite"),
    body: text(
      "Banks, clinics, schools, employers, and apps all hold information that can hurt people when access, retention, or response is weak. ISO 27001 helps you understand what a serious security program looks like behind the screen.",
      "Banques, cliniques, ecoles, employeurs et applications detiennent tous des informations qui peuvent nuire lorsque l'acces, la retention ou la reponse sont faibles. L'ISO 27001 aide a reconnaitre ce qu'est un programme securite serieux derriere l'ecran.",
    ),
  },
  {
    eyebrow: text("For modern work", "Pour le travail moderne"),
    title: text("You do not need to be an auditor to need this language", "Pas besoin d'etre auditeur pour avoir besoin de ce langage"),
    body: text(
      "Founders, product managers, operations teams, HR, sales, and customer success all run into security questionnaires, vendor due diligence, policy decisions, and incident expectations.",
      "Fondateurs, product managers, operations, RH, sales et customer success rencontrent tous des questionnaires securite, de la due diligence fournisseur, des decisions de politique et des attentes de reponse a incident.",
    ),
  },
  {
    eyebrow: text("For better judgment", "Pour mieux juger"),
    title: text("It teaches you how to separate real security from vague claims", "Elle apprend a separer la vraie securite des promesses vagues"),
    body: text(
      "ISO 27001 is useful because it asks who owns risk, what is in scope, what evidence exists, and how improvement happens. That makes cybersecurity easier to evaluate in the real world.",
      "L'ISO 27001 est utile parce qu'elle demande qui porte le risque, ce qui est dans le perimetre, quelles preuves existent et comment l'amelioration se produit. Cela rend la cybersecurite plus facile a evaluer dans le monde reel.",
    ),
  },
];

const cybersecurityLayers: Array<LocalizedCard & { step: string }> = [
  {
    step: "01",
    eyebrow: text("The surface", "La surface"),
    title: text("Cybersecurity starts with real assets and real exposure", "La cybersecurite commence par de vrais actifs et de vraies expositions"),
    body: text(
      "Accounts, laptops, cloud data, customer records, suppliers, and employees all create risk. This is the raw material of security work.",
      "Comptes, laptops, donnees cloud, dossiers clients, fournisseurs et employes creent tous du risque. C'est la matiere premiere du travail securite.",
    ),
  },
  {
    step: "02",
    eyebrow: text("The controls", "Les mesures"),
    title: text("Technical safeguards reduce the blast radius", "Les sauvegardes techniques reduisent le rayon d'impact"),
    body: text(
      "MFA, logging, backups, access reviews, encryption, and monitoring matter, but they only solve part of the problem if nobody governs how they are selected and reviewed.",
      "MFA, journaux, sauvegardes, revues d'acces, chiffrement et supervision comptent, mais ils ne resolvent qu'une partie du probleme si personne ne gouverne leur choix et leur revision.",
    ),
  },
  {
    step: "03",
    eyebrow: text("The system", "Le systeme"),
    title: text("ISO 27001 is the management layer inside cybersecurity", "L'ISO 27001 est la couche de management dans la cybersecurite"),
    body: text(
      "It connects context, risk criteria, roles, policy, treatment decisions, internal audit, and management review. That is why it belongs in cybersecurity, not outside it.",
      "Elle relie contexte, criteres de risque, roles, politique, decisions de traitement, audit interne et revue de direction. C'est pourquoi elle appartient a la cybersecurite, pas a cote d'elle.",
    ),
  },
  {
    step: "04",
    eyebrow: text("The outcome", "Le resultat"),
    title: text("The result is trust that can be defended", "Le resultat est une confiance defendable"),
    body: text(
      "When the system works, security answers become consistent, audits become more meaningful, and customers can see evidence instead of slogans.",
      "Quand le systeme fonctionne, les reponses securite deviennent coherentes, les audits gagnent en sens et les clients voient des preuves au lieu de slogans.",
    ),
  },
];

const guidedRoutes: GuidedRoute[] = [
  {
    href: "/learn/what-is-iso-27001",
    eyebrow: text("Foundation", "Fondation"),
    title: text("Start from zero", "Commencer de zero"),
    body: text(
      "Learn the plain-language explanation first, then step into how the system actually works.",
      "Apprenez d'abord l'explication simple, puis entrez dans le fonctionnement reel du systeme.",
    ),
    icon: BookOpen,
  },
  {
    href: "/learn/why-businesses-pursue-iso-27001",
    eyebrow: text("Business case", "Valeur metier"),
    title: text("Understand why companies care", "Comprendre pourquoi les entreprises s'y interessent"),
    body: text(
      "See how sales, governance, procurement, and trust make the standard commercially relevant.",
      "Voyez comment ventes, gouvernance, achats et confiance rendent la norme commercialement pertinente.",
    ),
    icon: BriefcaseBusiness,
  },
  {
    href: "/implementation-journey",
    eyebrow: text("Practice flow", "Flux pratique"),
    title: text("Walk through implementation work", "Parcourir le travail de mise en oeuvre"),
    body: text(
      "Move from theory to scope, risk, evidence, and decision-making with guided simulations.",
      "Passez de la theorie au perimetre, au risque, a la preuve et aux decisions avec des simulations guidees.",
    ),
    icon: Radar,
  },
  {
    href: "/mock-exam",
    eyebrow: text("Readiness", "Preparation"),
    title: text("Stress test what you know", "Tester ce que vous savez"),
    body: text(
      "Use timed mock exams to turn reading into recall, judgment, and certification-style pressure.",
      "Utilisez des examens blancs chronometres pour transformer la lecture en rappel, jugement et pression de type certification.",
    ),
    icon: FileCheck2,
  },
];

function FadeInSection({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

export function HomePageShell() {
  const prefersReducedMotion = useReducedMotion();
  const { mode } = useLanguageMode();
  const lang = mode === "fr" ? "fr" : "en";

  return (
    <main className="overflow-hidden pb-20">
      <section className="relative isolate overflow-hidden border-b border-slate-200/70 bg-[#06111f] text-white">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-16 top-10 size-72 rounded-full bg-cyan-400/18 blur-3xl"
          animate={
            prefersReducedMotion
              ? undefined
              : { x: [0, 28, -8, 0], y: [0, -12, 16, 0], opacity: [0.5, 0.9, 0.55, 0.5] }
          }
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-0 top-16 size-96 rounded-full bg-sky-500/14 blur-3xl"
          animate={
            prefersReducedMotion
              ? undefined
              : { x: [0, -24, 12, 0], y: [0, 20, -10, 0], opacity: [0.45, 0.75, 0.4, 0.45] }
          }
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:78px_78px] opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.92fr)] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-200/75">
                <LocalizedInline
                  value={text(
                    "ISO 27001 Lab",
                    "ISO 27001 Lab",
                  )}
                />
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                <LocalizedInline
                  value={text(
                    "ISO 27001 is the part of cybersecurity that makes trust operational.",
                    "L'ISO 27001 est la partie de la cybersecurite qui rend la confiance operationnelle.",
                  )}
                />
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                <LocalizedInline
                  value={text(
                    "This homepage now explains the bigger picture: ISO 27001 is not boring compliance paperwork. It is how organizations turn security promises into accountable systems, evidence, and decisions that regular people can feel in real life.",
                    "Cette page d'accueil explique maintenant le cadre complet : l'ISO 27001 n'est pas une paperasse de conformite ennuyeuse. C'est la facon dont les organisations transforment des promesses securite en systemes, preuves et decisions tangibles pour les gens.",
                  )}
                />
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/learn/what-is-iso-27001"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-50"
                >
                  <LocalizedInline
                    value={text("Start with the foundations", "Commencer par les fondamentaux")}
                  />
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/implementation-journey"
                  className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-cyan-200/35 hover:bg-white/6"
                >
                  <LocalizedInline
                    value={text("See the implementation flow", "Voir le flux de mise en oeuvre")}
                  />
                </Link>
              </div>

              <div className="mt-10 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2 xl:grid-cols-4">
                {platformStats.map((stat, index) => (
                  <motion.div
                    key={stat.label.en}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.5, delay: 0.14 + index * 0.08, ease: [0.22, 1, 0.36, 1] }
                    }
                    className="min-w-0"
                  >
                    <div className="text-3xl font-semibold tracking-tight text-white">{stat.value}</div>
                    <div className="mt-1 text-sm leading-6 text-slate-300">
                      <LocalizedInline value={stat.label} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98, y: prefersReducedMotion ? 0 : 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.06] p-5 shadow-[0_40px_120px_-48px_rgba(2,6,23,0.96)] backdrop-blur sm:p-6"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_90%_12%,rgba(14,165,233,0.15),transparent_22%)]"
              />
              <div className="relative">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/70">
                  <ShieldCheck className="size-4" />
                  <LocalizedInline
                    value={text("Cybersecurity map", "Carte cybersecurite")}
                  />
                </div>
                <div className="mt-6 space-y-3">
                  {heroSignals.map((signal, index) => {
                    const Icon = signal.icon;

                    return (
                      <motion.div
                        key={signal.title.en}
                        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { duration: 0.45, delay: 0.18 + index * 0.08, ease: [0.22, 1, 0.36, 1] }
                        }
                        className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-slate-950/34 p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                      >
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-white/8 text-cyan-100">
                          <Icon className="size-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="font-semibold text-white">{signal.title[lang]}</div>
                          <p className="text-sm leading-6 text-slate-300">{signal.body[lang]}</p>
                        </div>
                        <div className="inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-cyan-100/90">
                          {signal.tag[lang]}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="mt-5 rounded-[1.6rem] border border-cyan-300/14 bg-cyan-300/6 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                    <LocalizedInline
                      value={text("The simple takeaway", "Le point cle")}
                    />
                  </p>
                  <p className="mt-3 text-base leading-7 text-white">
                    <LocalizedInline
                      value={text(
                        "ISO 27001 belongs inside cybersecurity because it governs how security is scoped, justified, reviewed, and improved. It is not outside the work. It is the system that makes the work coherent.",
                        "L'ISO 27001 appartient a la cybersecurite parce qu'elle gouverne la facon dont la securite est cadree, justifiee, revue et amelioree. Elle n'est pas en dehors du travail. C'est le systeme qui rend ce travail coherent.",
                      )}
                    />
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <FadeInSection className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-700/75">
            <LocalizedInline value={text("Why it matters", "Pourquoi c'est utile")} />
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            <LocalizedInline
              value={text(
                "Why regular people should care about learning ISO 27001",
                "Pourquoi tout le monde devrait s'interesser a l'ISO 27001",
              )}
            />
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            <LocalizedInline
              value={text(
                "The goal is not to turn everyone into an auditor. The goal is to make cybersecurity easier to understand, easier to question, and easier to trust in real organizations.",
                "Le but n'est pas de transformer tout le monde en auditeur. Le but est de rendre la cybersecurite plus simple a comprendre, a questionner et a faire confiance dans les vraies organisations.",
              )}
            />
          </p>
        </div>

        <div className="mt-10 grid gap-8 border-y border-slate-200/75 py-8 md:grid-cols-3 md:gap-10">
          {whyItMatters.map((item) => (
            <article key={item.title.en} className="border-t border-slate-200/80 pt-5 md:border-t-0 md:pt-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                {item.eyebrow[lang]}
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">
                {item.title[lang]}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                {item.body[lang]}
              </p>
            </article>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-white/75 bg-white/82 p-6 shadow-[0_32px_100px_-56px_rgba(15,23,42,0.4)] backdrop-blur-sm md:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-700/75">
                <LocalizedInline
                  value={text("Cybersecurity context", "Contexte cybersecurite")}
                />
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                <LocalizedInline
                  value={text(
                    "A quick rundown of where ISO 27001 sits",
                    "Un apercu rapide de la place de l'ISO 27001",
                  )}
                />
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                <LocalizedInline
                  value={text(
                    "Cybersecurity is not only about blocking attackers. It is also about how an organization chooses protections, assigns responsibility, proves performance, and improves after mistakes. ISO 27001 covers that management layer.",
                    "La cybersecurite ne consiste pas seulement a bloquer des attaquants. Elle concerne aussi la facon dont une organisation choisit ses protections, assigne des responsabilites, prouve sa performance et s'ameliore apres ses erreurs. L'ISO 27001 couvre cette couche de management.",
                  )}
                />
              </p>
              <div className="mt-8 rounded-[1.6rem] border border-slate-200/80 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-600">
                <span className="font-semibold text-slate-950">
                  <LocalizedInline
                    value={text("Think of it like this:", "Imaginez-le comme ceci :")}
                  />
                </span>{" "}
                <LocalizedInline
                  value={text(
                    "controls do the protecting, but ISO 27001 makes the whole protection system explainable, reviewable, and sustainable.",
                    "les mesures protegent, mais l'ISO 27001 rend l'ensemble du systeme de protection explicable, revisable et durable.",
                  )}
                />
              </div>
            </div>

            <div className="space-y-5">
              {cybersecurityLayers.map((layer, index) => (
                <motion.article
                  key={layer.step}
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.45, delay: index * 0.05 }}
                  className="grid gap-4 rounded-[1.75rem] border border-slate-200/80 bg-slate-50/70 p-5 sm:grid-cols-[auto_1fr]"
                >
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-950 text-lg font-semibold text-white">
                    {layer.step}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                      {layer.eyebrow[lang]}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
                      {layer.title[lang]}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      {layer.body[lang]}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)] lg:items-start">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-700/75">
              <LocalizedInline value={text("Live experience", "Experience vivante")} />
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              <LocalizedInline
                value={text(
                  "The homepage should feel like a working product, not a static brochure",
                  "La page d'accueil doit ressembler a un produit vivant, pas a une brochure statique",
                )}
              />
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              <LocalizedInline
                value={text(
                  "This surface now reacts to the learner. It explains the standard, points to the right next step, and shows progress signals as soon as someone uses the app.",
                  "Cette surface reagit maintenant a l'apprenant. Elle explique la norme, pointe vers la bonne prochaine etape et montre des signaux de progression des que l'application est utilisee.",
                )}
              />
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {guidedRoutes.map((route, index) => {
                const Icon = route.icon;

                return (
                  <motion.div
                    key={route.href}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.45, delay: index * 0.05 }}
                  >
                    <Link
                      href={route.href}
                      className="group flex h-full flex-col rounded-[1.6rem] border border-slate-200/80 bg-white/90 p-5 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_60px_-44px_rgba(15,23,42,0.4)]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          {route.eyebrow[lang]}
                        </div>
                        <div className="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-white transition group-hover:bg-sky-700">
                          <Icon className="size-5" />
                        </div>
                      </div>
                      <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">
                        {route.title[lang]}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                        {route.body[lang]}
                      </p>
                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition group-hover:text-slate-950">
                        <LocalizedInline
                          value={text("Open route", "Ouvrir le parcours")}
                        />
                        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <HomeLearningPulse />
        </div>
      </FadeInSection>

      <FadeInSection className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-700/75">
              <LocalizedInline value={text("Guided modules", "Modules guides")} />
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              <LocalizedInline
                value={text(
                  "A production-ready learning path from first principles to applied judgment",
                  "Un parcours pret pour la production, des bases au jugement applique",
                )}
              />
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              <LocalizedInline
                value={text(
                  "The course moves from what ISO 27001 is to why companies pursue it, then into controls, risk, SoA decisions, audits, and realistic work situations.",
                  "Le parcours part de ce qu'est l'ISO 27001, puis du pourquoi business, avant d'entrer dans les mesures, le risque, les decisions SoA, les audits et les situations de travail realistes.",
                )}
              />
            </p>
          </div>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-950"
          >
            <LocalizedInline value={text("See the full curriculum", "Voir tout le parcours")} />
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <ModuleGrid modules={learningModules.slice(0, 6)} />
      </FadeInSection>

      <FadeInSection className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-[linear-gradient(135deg,#0f172a,#13253f_48%,#14324d)] p-8 text-white shadow-[0_34px_110px_-52px_rgba(15,23,42,0.75)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/75">
                <LocalizedInline value={text("Final CTA", "Derniere etape")} />
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                <LocalizedInline
                  value={text(
                    "If cybersecurity has felt vague, ISO 27001 is one of the best ways to make it concrete.",
                    "Si la cybersecurite vous parait vague, l'ISO 27001 est l'un des meilleurs moyens de la rendre concrete.",
                  )}
                />
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
                <LocalizedInline
                  value={text(
                    "Start with the first module, move into the labs, and use the mock exam when you want proof that the concepts actually stuck.",
                    "Commencez par le premier module, passez ensuite aux labs et utilisez l'examen blanc lorsque vous voulez verifier que les concepts ont vraiment tenu.",
                  )}
                />
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/learn/what-is-iso-27001"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-50"
              >
                <LocalizedInline value={text("Open the first lesson", "Ouvrir la premiere lecon")} />
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/mock-exam"
                className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-cyan-200/35 hover:bg-white/6"
              >
                <LocalizedInline value={text("Try a mock exam", "Essayer un examen blanc")} />
              </Link>
            </div>
          </div>
        </div>
      </FadeInSection>
    </main>
  );
}
