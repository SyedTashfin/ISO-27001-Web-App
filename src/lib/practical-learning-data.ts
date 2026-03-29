import type { FindingSeverity, LocalizedText } from "@/lib/course-data";

const t = (en: string, fr: string): LocalizedText => ({ en, fr });

export type EvidenceStrength = "sufficient" | "weak" | "partial" | "absent";

export type EvidenceCategory =
  | "policy-standard"
  | "risk-register"
  | "soa"
  | "approval-record"
  | "meeting-minutes"
  | "training-attendance"
  | "ticket-workflow"
  | "access-review-record"
  | "asset-inventory"
  | "supplier-review-record"
  | "incident-record"
  | "restore-test-evidence"
  | "internal-audit-report"
  | "management-review-minutes"
  | "system-log";

export type SystemicVerdict = "systemic" | "isolated" | "needs-more-sampling";

export type InsightCard = {
  title: LocalizedText;
  body: LocalizedText;
};

export type EvidenceItem = {
  category: EvidenceCategory;
  label: LocalizedText;
  strength: EvidenceStrength;
  note: LocalizedText;
};

export type EvidenceCategoryGuide = {
  category: EvidenceCategory;
  title: LocalizedText;
  description: LocalizedText;
  strongSignal: LocalizedText;
  weakSignal: LocalizedText;
};

export type WorkplacePhraseEntry = {
  id: string;
  category:
    | "meeting"
    | "evidence"
    | "audit"
    | "nonconformity"
    | "implementation"
    | "risk"
    | "soa";
  situation: LocalizedText;
  english: string;
  french: string;
  note: LocalizedText;
};

export type OrganizationCaseStudy = {
  id: string;
  company: string;
  title: LocalizedText;
  sector: LocalizedText;
  location: LocalizedText;
  driver: LocalizedText;
  scopeFocus: LocalizedText;
  whyIso27001: LocalizedText;
  ismsInBusinessTerms: LocalizedText;
  keyRisks: LocalizedText[];
  evidencePriorities: LocalizedText[];
  likelyPitfalls: LocalizedText[];
  phraseIds: string[];
};

export type NonconformityCaseStudy = {
  id: string;
  title: LocalizedText;
  businessContext: LocalizedText;
  scenario: LocalizedText;
  evidenceAvailable: EvidenceItem[];
  auditorNotice: LocalizedText;
  evidenceAssessment: EvidenceStrength;
  classification: FindingSeverity;
  why: LocalizedText;
  systemicSignal: LocalizedText;
  relatedClauses: string[];
  relatedControls: string[];
  followUpQuestions: LocalizedText[];
  recommendedCorrectiveAction: LocalizedText[];
  goodResponse: LocalizedText;
  weakResponse: LocalizedText;
  phraseIds: string[];
};

export type EvidenceReasoningDrill = {
  id: string;
  title: LocalizedText;
  context: LocalizedText;
  availableEvidence: EvidenceItem[];
  nextEvidenceOptions: Array<{
    id: string;
    label: LocalizedText;
  }>;
  correctNextEvidenceId: string;
  sufficiency: EvidenceStrength;
  systemicVerdict: SystemicVerdict;
  followUpOptions: Array<{
    id: string;
    label: LocalizedText;
  }>;
  correctFollowUpId: string;
  likelySeverity: FindingSeverity;
  relatedClauses: string[];
  rationale: LocalizedText;
  phraseIds: string[];
};

export type SoaGuidanceExample = {
  controlCode: string;
  title: LocalizedText;
  businessContext: LocalizedText;
  applicability: "applicable" | "not-applicable";
  goodRationale: LocalizedText;
  weakRationale: LocalizedText;
  implementationRationale: LocalizedText;
  relatedRisks: LocalizedText[];
  expectedEvidence: LocalizedText[];
  commonMistakes: LocalizedText[];
  auditorChallenge: LocalizedText;
};

export type ClausePracticeLens = {
  clause: string;
  realisticExample: LocalizedText;
  quickPractice: LocalizedText;
  auditorMindset: LocalizedText;
  phraseIds: string[];
};

export type ImplementationJourneyScenario = {
  company: string;
  title: LocalizedText;
  sector: LocalizedText;
  location: LocalizedText;
  driver: LocalizedText;
  scope: LocalizedText;
  operatingModel: LocalizedText;
};

export type JourneyStep = {
  id: string;
  step: number;
  title: LocalizedText;
  simple: LocalizedText;
  professional: LocalizedText;
  realisticExample: LocalizedText;
  evidenceExpectations: LocalizedText[];
  commonMistakes: LocalizedText[];
  outputs: LocalizedText[];
  checkpoint: LocalizedText;
  phraseIds: string[];
};

const evidence = (
  category: EvidenceCategory,
  strength: EvidenceStrength,
  enLabel: string,
  frLabel: string,
  enNote: string,
  frNote: string,
): EvidenceItem => ({
  category,
  strength,
  label: t(enLabel, frLabel),
  note: t(enNote, frNote),
});

const phrase = (
  id: string,
  category: WorkplacePhraseEntry["category"],
  enSituation: string,
  frSituation: string,
  english: string,
  french: string,
  enNote: string,
  frNote: string,
): WorkplacePhraseEntry => ({
  id,
  category,
  situation: t(enSituation, frSituation),
  english,
  french,
  note: t(enNote, frNote),
});

export const evidenceStrengthLabels: Record<EvidenceStrength, LocalizedText> = {
  sufficient: t("Sufficient", "Suffisant"),
  weak: t("Weak", "Faible"),
  partial: t("Partial", "Partiel"),
  absent: t("Absent", "Absent"),
};

export const systemicVerdictLabels: Record<SystemicVerdict, LocalizedText> = {
  systemic: t("Systemic", "Systémique"),
  isolated: t("Isolated", "Isolé"),
  "needs-more-sampling": t("Needs more sampling", "Demande plus d'échantillonnage"),
};

export const evidenceCategoryGuides: EvidenceCategoryGuide[] = [
  {
    category: "policy-standard",
    title: t("Policy or standard", "Politique ou standard"),
    description: t(
      "Shows intended direction, accountabilities, and rules. It does not prove that the process is operating.",
      "Montre l'orientation attendue, les responsabilités et les règles. Cela ne prouve pas que le processus fonctionne.",
    ),
    strongSignal: t(
      "Current, approved, scoped to the actual operating model, and referenced by teams during walkthroughs.",
      "À jour, approuvé, aligné sur le modèle opérationnel réel et cité par les équipes pendant les walkthroughs.",
    ),
    weakSignal: t(
      "Outdated copy, generic template language, or no evidence that teams know it exists.",
      "Copie obsolète, langage de modèle générique ou absence de preuve que les équipes savent qu'il existe.",
    ),
  },
  {
    category: "risk-register",
    title: t("Risk register", "Registre des risques"),
    description: t(
      "Shows how the organization identifies, evaluates, owns, and treats risk inside the ISMS.",
      "Montre comment l'organisation identifie, évalue, attribue et traite le risque dans le SMSI.",
    ),
    strongSignal: t(
      "Current entries with criteria, owners, treatment decisions, target dates, and links to controls or projects.",
      "Entrées à jour avec critères, responsables, décisions de traitement, dates cibles et liens vers des mesures ou projets.",
    ),
    weakSignal: t(
      "Static spreadsheet with scores only, no clear treatment logic, or no connection to real operating changes.",
      "Tableur statique avec seulement des scores, sans logique de traitement claire ou sans lien avec les changements opérationnels réels.",
    ),
  },
  {
    category: "soa",
    title: t("Statement of Applicability", "Déclaration d'applicabilité"),
    description: t(
      "Shows which Annex A controls apply, why they apply or not, and how implementation stands.",
      "Montre quelles mesures de l'Annexe A s'appliquent, pourquoi elles s'appliquent ou non et où en est la mise en oeuvre.",
    ),
    strongSignal: t(
      "Rationales are specific, tied to treatment decisions, and supported by implementation evidence.",
      "Les justifications sont spécifiques, reliées aux décisions de traitement et soutenues par des preuves de mise en oeuvre.",
    ),
    weakSignal: t(
      "Blanket statements such as 'not relevant' or 'best practice' with no linkage to business context or risk.",
      "Des formulations globales comme « non pertinent » ou « bonne pratique » sans lien avec le contexte métier ou le risque.",
    ),
  },
  {
    category: "approval-record",
    title: t("Approval record", "Trace d'approbation"),
    description: t(
      "Shows that a decision, method, or artifact was formally reviewed and accepted by the right authority.",
      "Montre qu'une décision, une méthode ou un artefact a été formellement revu et accepté par la bonne autorité.",
    ),
    strongSignal: t(
      "Named approver, approval date, version reference, and decision context are easy to trace.",
      "Le nom de l'approbateur, la date, la version et le contexte de la décision sont faciles à tracer.",
    ),
    weakSignal: t(
      "Informal chat message, unclear approver, or no version linkage to the document being relied upon.",
      "Message informel, approbateur flou ou absence de lien de version avec le document invoqué.",
    ),
  },
  {
    category: "meeting-minutes",
    title: t("Meeting minutes", "Comptes rendus"),
    description: t(
      "Show that governance discussions happened and that actions, decisions, and escalations were captured.",
      "Montrent que les échanges de gouvernance ont eu lieu et que les actions, décisions et escalades ont été capturées.",
    ),
    strongSignal: t(
      "Specific agenda, attendees, decisions, action owners, deadlines, and references to supporting evidence.",
      "Agenda précis, participants, décisions, responsables d'action, échéances et références vers les preuves associées.",
    ),
    weakSignal: t(
      "High-level notes with no decisions, no owners, or no indication that required inputs were reviewed.",
      "Notes très générales sans décisions, sans responsables ou sans indication que les intrants requis ont été examinés.",
    ),
  },
  {
    category: "training-attendance",
    title: t("Training attendance", "Présence en formation"),
    description: t(
      "Shows who completed awareness or competence activities during the sampled period.",
      "Montre qui a réalisé les activités de sensibilisation ou de compétence pendant la période échantillonnée.",
    ),
    strongSignal: t(
      "Attendance or completion data is complete, timely, and tied to role populations or target groups.",
      "Les données de présence ou de réalisation sont complètes, à jour et reliées aux populations ou rôles visés.",
    ),
    weakSignal: t(
      "Only the slide deck exists, with no attendance, no completion tracking, or no effectiveness follow-up.",
      "Seul le support existe, sans présence, sans suivi de réalisation ou sans suivi d'efficacité.",
    ),
  },
  {
    category: "ticket-workflow",
    title: t("Ticket or workflow evidence", "Preuve issue d'un ticket ou workflow"),
    description: t(
      "Shows execution in the day-to-day system of record, not only in policy text.",
      "Montre l'exécution dans le système opérationnel de référence, pas seulement dans la politique.",
    ),
    strongSignal: t(
      "Tickets show approvers, timestamps, linked evidence, and closure aligned with the documented process.",
      "Les tickets montrent approbateurs, horodatages, preuves liées et clôture alignée sur le processus documenté.",
    ),
    weakSignal: t(
      "Changes happen in chat or email with no durable workflow trail or inconsistent metadata.",
      "Les changements passent par chat ou email sans piste durable de workflow ou avec des métadonnées incohérentes.",
    ),
  },
  {
    category: "access-review-record",
    title: t("Access review record", "Trace de revue d'accès"),
    description: t(
      "Shows who reviewed which entitlements, when, and what decisions were taken.",
      "Montre qui a revu quels droits, quand, et quelles décisions ont été prises.",
    ),
    strongSignal: t(
      "Review population, reviewer, exceptions, follow-up actions, and completion dates are clear.",
      "La population revue, le relecteur, les exceptions, les actions de suivi et les dates de réalisation sont claires.",
    ),
    weakSignal: t(
      "Manager says the review happened, but there is no export, sign-off, or record of removals.",
      "Le manager affirme que la revue a eu lieu, mais il n'y a ni export, ni validation, ni trace des suppressions.",
    ),
  },
  {
    category: "asset-inventory",
    title: t("Asset inventory", "Inventaire des actifs"),
    description: t(
      "Shows the systems, information assets, and supporting components the ISMS is really managing.",
      "Montre les systèmes, actifs d'information et composants support que le SMSI gère réellement.",
    ),
    strongSignal: t(
      "Covers in-scope services, owners, data types, environments, and links to key dependencies.",
      "Couvre les services dans le périmètre, les responsables, les types de données, les environnements et les dépendances clés.",
    ),
    weakSignal: t(
      "Critical systems are missing, ownership is unclear, or the inventory is disconnected from the real architecture.",
      "Des systèmes critiques manquent, la responsabilité est floue ou l'inventaire est déconnecté de l'architecture réelle.",
    ),
  },
  {
    category: "supplier-review-record",
    title: t("Supplier review record", "Trace de revue fournisseur"),
    description: t(
      "Shows that supplier security due diligence or periodic review actually happened.",
      "Montre que la due diligence sécurité fournisseur ou la revue périodique a réellement eu lieu.",
    ),
    strongSignal: t(
      "Criticality, review criteria, evidence collected, risk decisions, and renewal dates are recorded.",
      "La criticité, les critères de revue, les preuves collectées, les décisions de risque et les dates de renouvellement sont enregistrées.",
    ),
    weakSignal: t(
      "The process is claimed in policy, but there is no completed review package for sampled suppliers.",
      "Le processus est annoncé dans la politique, mais il n'existe pas de dossier de revue complété pour les fournisseurs échantillonnés.",
    ),
  },
  {
    category: "incident-record",
    title: t("Incident record", "Enregistrement d'incident"),
    description: t(
      "Shows whether security events are logged, assessed, escalated, and learned from as defined.",
      "Montre si les événements sécurité sont enregistrés, évalués, escaladés et exploités conformément au dispositif défini.",
    ),
    strongSignal: t(
      "Ticket contains severity, timeline, owner, communications, containment, and lesson-learned output.",
      "Le ticket contient la sévérité, la chronologie, le responsable, les communications, le confinement et le retour d'expérience.",
    ),
    weakSignal: t(
      "The team handled the event informally with no ticket, no severity, and no evidence of closure.",
      "L'équipe a géré l'événement de manière informelle, sans ticket, sans sévérité et sans preuve de clôture.",
    ),
  },
  {
    category: "restore-test-evidence",
    title: t("Restore test evidence", "Preuve de test de restauration"),
    description: t(
      "Shows that backups are not only running but can be restored within business expectations.",
      "Montre que les sauvegardes ne se contentent pas de tourner mais peuvent être restaurées selon les attentes métier.",
    ),
    strongSignal: t(
      "Recent test report shows scope, method, timings, result, issues found, and follow-up action.",
      "Un rapport récent montre le périmètre, la méthode, les délais, le résultat, les problèmes trouvés et les actions de suivi.",
    ),
    weakSignal: t(
      "Only backup job success exists, with no recent restore exercise for sampled critical systems.",
      "Seules les réussites de jobs existent, sans exercice récent de restauration pour les systèmes critiques échantillonnés.",
    ),
  },
  {
    category: "internal-audit-report",
    title: t("Internal audit report", "Rapport d'audit interne"),
    description: t(
      "Shows whether the organization has independently checked its ISMS and followed through on findings.",
      "Montre si l'organisation a vérifié son SMSI de manière indépendante et assuré le suivi des constats.",
    ),
    strongSignal: t(
      "Programme, plan, report, evidence, findings, and closure of corrective actions are easy to trace.",
      "Le programme, le plan, le rapport, les preuves, les constats et la clôture des actions correctives sont faciles à tracer.",
    ),
    weakSignal: t(
      "A schedule exists, but there is no report, no sampling record, and no closure trail for prior issues.",
      "Un planning existe, mais sans rapport, sans trace d'échantillonnage et sans piste de clôture pour les sujets précédents.",
    ),
  },
  {
    category: "management-review-minutes",
    title: t("Management review minutes", "Compte rendu de revue de direction"),
    description: t(
      "Shows whether leadership reviewed required inputs and made decisions on the ISMS.",
      "Montre si la direction a examiné les intrants requis et pris des décisions sur le SMSI.",
    ),
    strongSignal: t(
      "Inputs, trends, resource needs, actions, and improvements are explicitly captured with owners.",
      "Les intrants, tendances, besoins en ressources, actions et améliorations sont explicitement capturés avec des responsables.",
    ),
    weakSignal: t(
      "A leadership meeting happened, but minutes do not show the required ISMS topics or resulting decisions.",
      "Une réunion de direction a eu lieu, mais le compte rendu ne montre pas les thèmes SMSI requis ni les décisions associées.",
    ),
  },
];

export const workplacePhraseEntries: WorkplacePhraseEntry[] = [
  phrase(
    "control-partial",
    "implementation",
    "Describing control maturity",
    "Décrire la maturité d'une mesure",
    "The control is partially implemented.",
    "La mesure est partiellement mise en oeuvre.",
    "Useful when the design exists but execution or evidence is still incomplete.",
    "Utile lorsque le dispositif existe mais que l'exécution ou la preuve reste incomplète.",
  ),
  phrase(
    "evidence-sampled-period",
    "evidence",
    "Explaining an evidence gap",
    "Expliquer un manque de preuve",
    "Evidence was not available for the sampled period.",
    "La preuve n'était pas disponible pour la période échantillonnée.",
    "A neutral but precise way to explain why a process claim is not yet supported.",
    "Une manière neutre mais précise d'expliquer pourquoi une affirmation de processus n'est pas encore démontrée.",
  ),
  phrase(
    "finding-clause-9-2",
    "audit",
    "Linking a finding to a clause",
    "Rattacher un constat à une clause",
    "This finding relates to Clause 9.2.",
    "Ce constat est rattaché à la clause 9.2.",
    "Helps learners speak with clause discipline during internal and external audits.",
    "Aide les apprenants à parler avec discipline de clause pendant les audits internes et externes.",
  ),
  phrase(
    "process-not-evidenced",
    "evidence",
    "Explaining inconsistent execution",
    "Expliquer une exécution incohérente",
    "The process exists but is not consistently evidenced.",
    "Le processus existe mais n'est pas démontré de manière cohérente.",
    "This phrasing is stronger than saying the process is missing when the real issue is execution discipline.",
    "Cette formulation est plus juste que de dire que le processus est absent lorsque le vrai sujet est la discipline d'exécution.",
  ),
  phrase(
    "risk-not-traceable",
    "risk",
    "Explaining poor traceability",
    "Expliquer une mauvaise traçabilité",
    "The risk treatment decision is not traceable.",
    "La décision de traitement du risque n'est pas traçable.",
    "Useful when a register exists but treatment logic cannot be linked to owners, dates, or controls.",
    "Utile lorsqu'un registre existe mais que la logique de traitement ne peut être reliée ni aux responsables, ni aux dates, ni aux mesures.",
  ),
  phrase(
    "ask-for-sampled-evidence",
    "audit",
    "Requesting operational proof",
    "Demander une preuve opérationnelle",
    "Please show the sampled evidence, not only the procedure.",
    "Merci de montrer la preuve échantillonnée, pas seulement la procédure.",
    "A practical sentence for audit prep and live walkthroughs.",
    "Une phrase pratique pour la préparation d'audit et les walkthroughs en direct.",
  ),
  phrase(
    "systemic-vs-isolated",
    "nonconformity",
    "Describing a pattern",
    "Décrire un schéma",
    "This looks systemic rather than isolated.",
    "Cela semble systémique plutôt qu'isolé.",
    "Use this when similar weaknesses appear across teams, systems, or periods.",
    "À utiliser lorsque des faiblesses similaires apparaissent sur plusieurs équipes, systèmes ou périodes.",
  ),
  phrase(
    "mgmt-review-inputs",
    "audit",
    "Challenging management review quality",
    "Questionner la qualité de la revue de direction",
    "The minutes do not show the required management review inputs.",
    "Le compte rendu ne montre pas les intrants requis de la revue de direction.",
    "This keeps the discussion evidence-based instead of turning it into a debate about meeting labels.",
    "Cela maintient la discussion sur la preuve au lieu d'en faire un débat sur l'intitulé de la réunion.",
  ),
  phrase(
    "soa-too-generic",
    "soa",
    "Commenting on SoA quality",
    "Commenter la qualité de la SoA",
    "The SoA rationale is too generic for audit reliance.",
    "La justification de la SoA est trop générique pour être fiable en audit.",
    "Useful when applicability statements are broad, unsupported, or disconnected from risk treatment.",
    "Utile lorsque les justifications d'applicabilité sont larges, non étayées ou déconnectées du traitement du risque.",
  ),
  phrase(
    "restore-test-missing",
    "evidence",
    "Talking about continuity evidence",
    "Parler de preuve de continuité",
    "Backup jobs are visible, but restore testing was not evidenced.",
    "Les jobs de sauvegarde sont visibles, mais le test de restauration n'a pas été démontré.",
    "This distinguishes activity output from effectiveness evidence.",
    "Cela distingue une sortie d'activité d'une preuve d'efficacité.",
  ),
  phrase(
    "good-corrective-action",
    "nonconformity",
    "Explaining a stronger response",
    "Expliquer une réponse plus solide",
    "A strong corrective action addresses root cause, ownership, and closure evidence.",
    "Une action corrective solide traite la cause racine, la responsabilité et la preuve de clôture.",
    "Useful when coaching teams to move beyond immediate fixes.",
    "Utile pour coacher les équipes à aller au-delà du simple correctif immédiat.",
  ),
  phrase(
    "scope-boundary",
    "meeting",
    "Clarifying ISMS scope",
    "Clarifier le périmètre du SMSI",
    "The scope includes the customer platform and support operations, but not every corporate function.",
    "Le périmètre inclut la plateforme client et les opérations de support, mais pas toutes les fonctions corporate.",
    "Good for kickoff and audit-readiness discussions where boundaries must stay explicit.",
    "Utile lors des kickoffs et des préparations d'audit lorsque les frontières doivent rester explicites.",
  ),
  phrase(
    "why-iso27001",
    "meeting",
    "Explaining business value",
    "Expliquer la valeur métier",
    "We pursue ISO 27001 to make security decisions repeatable, credible, and governable.",
    "Nous poursuivons l'ISO 27001 pour rendre les décisions de sécurité répétables, crédibles et pilotables.",
    "This keeps the discussion focused on management-system value rather than only certification optics.",
    "Cela maintient la discussion sur la valeur du système de management plutôt que sur la seule optique de certification.",
  ),
];

export const practicalLearningCards: InsightCard[] = [
  {
    title: t("ISO 27001 is an operating system for decisions", "L'ISO 27001 est un système opératoire de décision"),
    body: t(
      "The standard matters because it makes scope, risk, governance, control selection, evidence, audit, and improvement hang together as one management system.",
      "La norme compte parce qu'elle fait tenir ensemble le périmètre, le risque, la gouvernance, le choix des mesures, la preuve, l'audit et l'amélioration comme un seul système de management.",
    ),
  },
  {
    title: t("Annex A is not the ISMS", "L'Annexe A n'est pas le SMSI"),
    body: t(
      "Annex A gives a control catalogue. The ISMS decides why controls matter, who owns them, how they operate, and what evidence proves effectiveness.",
      "L'Annexe A fournit un catalogue de mesures. Le SMSI décide pourquoi elles comptent, qui les porte, comment elles fonctionnent et quelle preuve démontre leur efficacité.",
    ),
  },
  {
    title: t("Auditors test credibility, not theatre", "Les auditeurs testent la crédibilité, pas le théâtre"),
    body: t(
      "A beautiful policy set is not enough. Auditors compare documents, interviews, records, and sampled evidence to see whether the system actually works.",
      "Un bel ensemble de politiques ne suffit pas. Les auditeurs comparent documents, entretiens, enregistrements et preuves échantillonnées pour voir si le système fonctionne réellement.",
    ),
  },
  {
    title: t("France-based learners need workplace language", "Les apprenants basés en France ont besoin d'un langage de travail"),
    body: t(
      "The hard part is often not literal translation but being able to explain evidence gaps, scope choices, and audit findings naturally in English and French.",
      "La difficulté n'est souvent pas la traduction littérale mais la capacité à expliquer naturellement en anglais et en français les écarts de preuve, les choix de périmètre et les constats d'audit.",
    ),
  },
];

export const organizationalCaseStudies: OrganizationCaseStudy[] = [
  {
    id: "case-saas-enterprise",
    company: "NordQuai Cloud",
    title: t("French SaaS provider moving upmarket", "Éditeur SaaS français qui monte en gamme"),
    sector: t("B2B SaaS", "SaaS B2B"),
    location: t("Paris, France", "Paris, France"),
    driver: t(
      "Enterprise prospects now require a credible ISMS, not only a generic security deck.",
      "Les prospects grands comptes exigent désormais un SMSI crédible, pas seulement un deck sécurité générique.",
    ),
    scopeFocus: t(
      "Customer platform, support, engineering change flow, and critical cloud suppliers.",
      "Plateforme client, support, flux de changement engineering et fournisseurs cloud critiques.",
    ),
    whyIso27001: t(
      "Leadership wants repeatable security governance, stronger customer assurance, and a structured way to prioritize funding decisions.",
      "La direction veut une gouvernance sécurité répétable, une meilleure assurance client et un moyen structuré de prioriser les décisions de financement.",
    ),
    ismsInBusinessTerms: t(
      "The ISMS becomes the operating model that connects customer promises, engineering controls, and leadership decisions.",
      "Le SMSI devient le modèle opératoire qui relie les promesses clients, les mesures engineering et les décisions de direction.",
    ),
    keyRisks: [
      t("Weak supplier oversight for the cloud stack", "Pilotage fournisseur insuffisant sur la pile cloud"),
      t("Fast production changes with uneven evidence", "Changements de production rapides avec une preuve inégale"),
      t("Access and logging discipline under growth pressure", "Discipline d'accès et de journalisation sous pression de croissance"),
    ],
    evidencePriorities: [
      t("Risk method, SoA, change tickets, access reviews, and management review outputs.", "Méthode de risque, SoA, tickets de changement, revues d'accès et sorties de revue de direction."),
      t("Supplier review records for the hosting and support stack.", "Traces de revue fournisseur pour l'hébergement et la chaîne de support."),
    ],
    likelyPitfalls: [
      t("Treating ISO 27001 as a sales badge rather than a management system.", "Traiter l'ISO 27001 comme un badge commercial plutôt que comme un système de management."),
      t("Writing polished policies before agreeing scope and risk method.", "Rédiger de belles politiques avant de s'accorder sur le périmètre et la méthode de risque."),
    ],
    phraseIds: ["why-iso27001", "scope-boundary", "soa-too-generic"],
  },
  {
    id: "case-managed-services",
    company: "Helios Managed Ops",
    title: t("Managed services firm facing tender pressure", "Prestataire de services managés sous pression des appels d'offres"),
    sector: t("Managed services", "Services managés"),
    location: t("Lille, France", "Lille, France"),
    driver: t(
      "Public-sector tenders and cyber insurers are now asking for demonstrable governance, not only technical tooling.",
      "Les appels d'offres publics et les assureurs cyber demandent maintenant une gouvernance démontrable, pas seulement des outils techniques.",
    ),
    scopeFocus: t(
      "Service desk, remote administration, privileged access, customer change control, and supplier-managed tooling.",
      "Service desk, administration à distance, accès à privilèges, contrôle des changements clients et outillage géré par des fournisseurs.",
    ),
    whyIso27001: t(
      "The company needs a disciplined way to govern shared-service risk across customers, contractors, and supporting teams.",
      "L'entreprise a besoin d'un moyen discipliné de piloter le risque de services partagés entre clients, prestataires et équipes de support.",
    ),
    ismsInBusinessTerms: t(
      "The ISMS clarifies who decides, who approves, and what evidence proves service delivery is controlled.",
      "Le SMSI clarifie qui décide, qui approuve et quelle preuve démontre que la prestation est maîtrisée.",
    ),
    keyRisks: [
      t("Privileged access spread across many customers", "Accès à privilèges réparti sur de nombreux clients"),
      t("Informal change approvals during incidents", "Approvals de changement informels pendant les incidents"),
      t("Dependence on third-party tooling and subcontractors", "Dépendance à de l'outillage tiers et à des sous-traitants"),
    ],
    evidencePriorities: [
      t("Access reviews, ticket workflows, emergency change evidence, and supplier reviews.", "Revues d'accès, workflows de tickets, preuves de changements urgents et revues fournisseurs."),
      t("Internal audit evidence that challenges the real operating model.", "Preuves d'audit interne qui challengent le modèle opérationnel réel."),
    ],
    likelyPitfalls: [
      t("Writing scope too narrowly to avoid shared-service complexity.", "Écrire un périmètre trop étroit pour éviter la complexité des services partagés."),
      t("Assuming customer-specific controls remove the need for central governance evidence.", "Supposer que les mesures propres aux clients suppriment le besoin de preuves de gouvernance centrale."),
    ],
    phraseIds: ["systemic-vs-isolated", "ask-for-sampled-evidence", "risk-not-traceable"],
  },
  {
    id: "case-industrial",
    company: "Aster Forge",
    title: t("Industrial manufacturer with hybrid IT/OT reality", "Industriel avec une réalité hybride IT/OT"),
    sector: t("Manufacturing", "Industrie"),
    location: t("Lyon region, France", "Région lyonnaise, France"),
    driver: t(
      "Customers want assurance that production continuity, supplier maintenance, and site access are governed coherently.",
      "Les clients veulent être rassurés sur le fait que la continuité de production, la maintenance fournisseur et l'accès au site sont pilotés de façon cohérente.",
    ),
    scopeFocus: t(
      "Production planning systems, industrial networks, contractor access, and key third-party maintenance relationships.",
      "Systèmes de planification de production, réseaux industriels, accès prestataires et relations de maintenance critiques.",
    ),
    whyIso27001: t(
      "Leadership needs one management language to connect plant operations, physical security, cyber teams, and supplier risk.",
      "La direction a besoin d'un langage de management unique pour relier opérations d'usine, sécurité physique, équipes cyber et risque fournisseur.",
    ),
    ismsInBusinessTerms: t(
      "The ISMS becomes the decision frame for continuity, access, maintenance risk, and evidence across both offices and sites.",
      "Le SMSI devient le cadre de décision pour la continuité, l'accès, le risque de maintenance et la preuve sur les bureaux comme sur les sites.",
    ),
    keyRisks: [
      t("Incomplete asset visibility for OT-connected systems", "Visibilité incomplète des actifs connectés à l'OT"),
      t("Supplier maintenance paths with weak review evidence", "Chemins de maintenance fournisseurs avec peu de preuves de revue"),
      t("Continuity assumptions not backed by restore or recovery testing", "Hypothèses de continuité non démontrées par des tests de restauration ou de reprise"),
    ],
    evidencePriorities: [
      t("Asset inventory, visitor controls, supplier review records, and restore test evidence.", "Inventaire des actifs, contrôles visiteurs, traces de revue fournisseur et preuves de test de restauration."),
      t("Management review decisions covering operational resilience, not only office IT topics.", "Décisions de revue de direction couvrant la résilience opérationnelle, pas seulement les sujets IT de bureau."),
    ],
    likelyPitfalls: [
      t("Assuming OT-specific realities justify weak evidence discipline.", "Supposer que les réalités OT justifient une faible discipline de preuve."),
      t("Separating cyber and physical access governance too far from business continuity.", "Séparer excessivement la gouvernance cyber et l'accès physique de la continuité métier."),
    ],
    phraseIds: ["restore-test-missing", "scope-boundary", "good-corrective-action"],
  },
  {
    id: "case-health-data",
    company: "Clinibase Services",
    title: t("Healthcare processor under contractual scrutiny", "Prestataire santé sous forte pression contractuelle"),
    sector: t("Health data services", "Services de données de santé"),
    location: t("Toulouse, France", "Toulouse, France"),
    driver: t(
      "Hospital customers and major partners need assurance that security decisions are controlled, evidenced, and reviewed by leadership.",
      "Les clients hospitaliers et les grands partenaires veulent être assurés que les décisions sécurité sont maîtrisées, démontrées et revues par la direction.",
    ),
    scopeFocus: t(
      "Patient-support platform, hosted environments, support operations, and subcontractors handling regulated data flows.",
      "Plateforme de support patient, environnements hébergés, opérations de support et sous-traitants manipulant des flux de données réglementés.",
    ),
    whyIso27001: t(
      "The organization wants a disciplined frame that joins security, contractual obligations, and operational assurance instead of managing them in silos.",
      "L'organisation veut un cadre discipliné qui relie sécurité, obligations contractuelles et assurance opérationnelle au lieu de les gérer en silos.",
    ),
    ismsInBusinessTerms: t(
      "The ISMS turns security from a specialist concern into a governed business system with evidence, ownership, and review.",
      "Le SMSI transforme la sécurité d'un sujet d'experts en système métier piloté, avec preuve, responsabilité et revue.",
    ),
    keyRisks: [
      t("Contractual security commitments drifting away from operational reality", "Engagements sécurité contractuels qui s'éloignent de la réalité opérationnelle"),
      t("Training and incident evidence not covering all support populations", "Preuves de formation et d'incident ne couvrant pas toutes les populations support"),
      t("Shared suppliers affecting multiple in-scope workflows", "Fournisseurs partagés impactant plusieurs workflows dans le périmètre"),
    ],
    evidencePriorities: [
      t("Requirements register, incident records, training completion, and supplier reviews tied to contract risk.", "Registre des exigences, enregistrements d'incidents, réalisation des formations et revues fournisseurs reliées au risque contractuel."),
      t("Management review evidence showing decisions on resource and compliance pressure.", "Preuves de revue de direction montrant les décisions sur les ressources et la pression de conformité."),
    ],
    likelyPitfalls: [
      t("Confusing compliance vocabulary with actual ISMS evidence.", "Confondre vocabulaire conformité et preuve réelle de SMSI."),
      t("Keeping obligations in legal trackers without feeding them into risk and control decisions.", "Garder les obligations dans des tableaux juridiques sans les injecter dans les décisions de risque et de mesure."),
    ],
    phraseIds: ["process-not-evidenced", "evidence-sampled-period", "why-iso27001"],
  },
];

export const annexAPracticalCards: InsightCard[] = [
  {
    title: t("Controls are selected, not worshipped", "Les mesures sont sélectionnées, pas vénérées"),
    body: t(
      "Annex A gives options. A mature ISMS explains why each option matters in this business, which risks it addresses, and how operation will be evidenced.",
      "L'Annexe A propose des options. Un SMSI mature explique pourquoi chaque option compte dans ce métier, quels risques elle traite et comment son fonctionnement sera démontré.",
    ),
  },
  {
    title: t("Applicability must be specific", "L'applicabilité doit être spécifique"),
    body: t(
      "A control should not be marked applicable because it sounds good. It should be applicable because the organization has a context, obligation, dependency, or risk that makes it relevant.",
      "Une mesure ne doit pas être marquée applicable parce qu'elle sonne bien. Elle doit l'être parce que l'organisation a un contexte, une obligation, une dépendance ou un risque qui la rend pertinente.",
    ),
  },
  {
    title: t("Evidence must show operation", "La preuve doit montrer le fonctionnement"),
    body: t(
      "For Annex A controls, strong evidence usually combines design proof and execution proof: for example a procedure plus records, logs, tickets, or reviews.",
      "Pour les mesures de l'Annexe A, une preuve solide combine souvent preuve de conception et preuve d'exécution : par exemple une procédure plus des enregistrements, logs, tickets ou revues.",
    ),
  },
  {
    title: t("The SoA is the bridge", "La SoA est le pont"),
    body: t(
      "The Statement of Applicability is where Annex A stops being a catalogue and becomes a business-specific control position that an auditor can test.",
      "La déclaration d'applicabilité est l'endroit où l'Annexe A cesse d'être un catalogue pour devenir une position de contrôle spécifique à l'entreprise qu'un auditeur peut tester.",
    ),
  },
];

export const soaTeachingCardsDetailed: InsightCard[] = [
  {
    title: t("What the SoA really is", "Ce qu'est réellement la SoA"),
    body: t(
      "The SoA is the organization's control position. It records which Annex A controls apply, why they apply or do not apply, and what implementation status the organization can stand behind.",
      "La SoA est la position de contrôle de l'organisation. Elle enregistre quelles mesures de l'Annexe A s'appliquent, pourquoi elles s'appliquent ou non, et quel état de mise en oeuvre l'organisation peut réellement soutenir.",
    ),
  },
  {
    title: t("Why auditors care", "Pourquoi les auditeurs y tiennent"),
    body: t(
      "Auditors use the SoA to test traceability. If applicability and implementation cannot be linked to risks, obligations, or context, confidence in the ISMS drops quickly.",
      "Les auditeurs utilisent la SoA pour tester la traçabilité. Si l'applicabilité et la mise en oeuvre ne peuvent pas être reliées aux risques, obligations ou au contexte, la confiance dans le SMSI baisse rapidement.",
    ),
  },
  {
    title: t("What weak SoA practice looks like", "À quoi ressemble une pratique SoA faible"),
    body: t(
      "Weak SoA practice uses blanket statements, generic 'best practice' logic, no risk linkage, and no evidence expectation for implemented controls.",
      "Une pratique SoA faible utilise des déclarations globales, une logique générique de « bonne pratique », aucun lien avec le risque et aucune attente de preuve pour les mesures mises en oeuvre.",
    ),
  },
  {
    title: t("What good SoA practice looks like", "À quoi ressemble une bonne pratique SoA"),
    body: t(
      "Good SoA practice explains the reason for applicability, names the business context or risk, shows implementation status honestly, and points to evidence an auditor can sample.",
      "Une bonne pratique SoA explique la raison d'applicabilité, nomme le contexte métier ou le risque, présente honnêtement l'état de mise en oeuvre et pointe vers la preuve qu'un auditeur peut échantillonner.",
    ),
  },
];

export const soaGuidanceExamples: SoaGuidanceExample[] = [
  {
    controlCode: "5.15",
    title: t("Access control policy position", "Position SoA sur la politique de contrôle d'accès"),
    businessContext: t(
      "A growing SaaS provider needs to manage staff, support, and contractor access to customer environments.",
      "Un éditeur SaaS en croissance doit piloter les accès du personnel, du support et des prestataires aux environnements clients.",
    ),
    applicability: "applicable",
    goodRationale: t(
      "Applicable because the platform relies on role-based access across production, support, and administration. The control supports treatment decisions for unauthorized access and privileged misuse.",
      "Applicable car la plateforme repose sur des accès fondés sur les rôles sur la production, le support et l'administration. La mesure soutient les décisions de traitement liées à l'accès non autorisé et à l'usage abusif des privilèges.",
    ),
    weakRationale: t(
      "Applicable because access control is important for all companies.",
      "Applicable parce que le contrôle d'accès est important pour toutes les entreprises.",
    ),
    implementationRationale: t(
      "Implemented for core business systems with quarterly review and ticketed provisioning; legacy tooling remains in progress.",
      "Mis en oeuvre pour les systèmes métier clés avec revue trimestrielle et provisioning tracé dans les tickets ; l'outillage historique reste en cours d'alignement.",
    ),
    relatedRisks: [
      t("Unauthorized access to customer data", "Accès non autorisé aux données clients"),
      t("Privilege misuse during support activity", "Usage abusif de privilèges pendant l'activité de support"),
    ],
    expectedEvidence: [
      t("Access control policy and role model", "Politique de contrôle d'accès et matrice de rôles"),
      t("Provisioning or removal tickets", "Tickets de création ou de suppression d'accès"),
      t("Quarterly access review records", "Traces de revue d'accès trimestrielle"),
    ],
    commonMistakes: [
      t("Treating the control as implemented because an SSO tool exists", "Considérer la mesure comme mise en oeuvre simplement parce qu'un outil SSO existe"),
      t("Not linking access policy scope to contractors or privileged support teams", "Ne pas relier le périmètre de la politique d'accès aux prestataires ou aux équipes support à privilèges"),
    ],
    auditorChallenge: t(
      "Show how the policy position turns into actual joiner, mover, leaver, and review evidence for sampled systems.",
      "Montrez comment cette position de politique se transforme en preuves réelles pour les arrivées, mobilités, départs et revues sur les systèmes échantillonnés.",
    ),
  },
  {
    controlCode: "5.19",
    title: t("Supplier relationship control position", "Position SoA sur la relation fournisseur"),
    businessContext: t(
      "Critical hosting, support tooling, and payment services are outsourced to third parties.",
      "L'hébergement critique, l'outillage support et les services de paiement sont externalisés à des tiers.",
    ),
    applicability: "applicable",
    goodRationale: t(
      "Applicable because the organization depends on external providers for in-scope services and needs risk-based due diligence, contract expectations, and periodic review.",
      "Applicable car l'organisation dépend de prestataires externes pour des services dans le périmètre et a besoin d'une due diligence fondée sur le risque, d'exigences contractuelles et de revues périodiques.",
    ),
    weakRationale: t(
      "Applicable because we use suppliers.",
      "Applicable parce que nous utilisons des fournisseurs.",
    ),
    implementationRationale: t(
      "In progress: critical suppliers now have standard review templates and risk ratings, but reassessment cadence is not yet complete for legacy vendors.",
      "En cours : les fournisseurs critiques ont désormais des modèles de revue et une notation de risque, mais la cadence de réévaluation n'est pas encore complète pour les fournisseurs historiques.",
    ),
    relatedRisks: [
      t("Weak third-party security assurance", "Assurance sécurité tiers insuffisante"),
      t("Unclear contractual expectations for incidents or logging", "Attentes contractuelles floues pour les incidents ou la journalisation"),
    ],
    expectedEvidence: [
      t("Supplier criticality list", "Liste de criticité des fournisseurs"),
      t("Completed due diligence or review records", "Traces de due diligence ou de revue complétées"),
      t("Contracts or security clauses", "Contrats ou clauses de sécurité"),
    ],
    commonMistakes: [
      t("Assuming procurement approval equals security review", "Supposer qu'une validation achats équivaut à une revue sécurité"),
      t("Failing to re-review suppliers after major service changes", "Ne pas requalifier les fournisseurs après des changements de service majeurs"),
    ],
    auditorChallenge: t(
      "For the sampled critical suppliers, show the last review package, the risk decision taken, and who approved continued use.",
      "Pour les fournisseurs critiques échantillonnés, montrez le dernier dossier de revue, la décision de risque prise et qui a approuvé la poursuite d'usage.",
    ),
  },
  {
    controlCode: "5.23",
    title: t("Cloud services control position", "Position SoA sur les services cloud"),
    businessContext: t(
      "The organization runs its customer platform fully on public cloud and uses multiple managed services.",
      "L'organisation exploite entièrement sa plateforme client sur cloud public et utilise plusieurs services managés.",
    ),
    applicability: "applicable",
    goodRationale: t(
      "Applicable because cloud configuration, tenancy, and provider responsibilities directly affect confidentiality, availability, and change control for in-scope services.",
      "Applicable car la configuration cloud, la multi-location et la répartition des responsabilités fournisseur impactent directement la confidentialité, la disponibilité et le contrôle des changements des services dans le périmètre.",
    ),
    weakRationale: t(
      "Applicable because we are in the cloud.",
      "Applicable parce que nous sommes dans le cloud.",
    ),
    implementationRationale: t(
      "Implemented through baseline guardrails, account separation, and quarterly architecture review; evidence remains patchy for smaller shared services.",
      "Mis en oeuvre via des garde-fous de base, une séparation des comptes et une revue d'architecture trimestrielle ; la preuve reste inégale pour les petits services partagés.",
    ),
    relatedRisks: [
      t("Misconfiguration of cloud resources", "Mauvaise configuration des ressources cloud"),
      t("Unclear provider responsibility boundaries", "Frontières de responsabilité fournisseur peu claires"),
    ],
    expectedEvidence: [
      t("Cloud architecture baseline", "Référentiel d'architecture cloud"),
      t("Account or tenant segregation records", "Preuves de séparation des comptes ou tenants"),
      t("Review outputs for high-risk managed services", "Sorties de revue pour les services managés à haut risque"),
    ],
    commonMistakes: [
      t("Copying provider certifications into the SoA rationale instead of explaining local responsibilities", "Copier les certifications du fournisseur dans la justification SoA au lieu d'expliquer les responsabilités locales"),
      t("Ignoring smaller cloud services that still support the in-scope platform", "Ignorer les petits services cloud qui supportent pourtant la plateforme dans le périmètre"),
    ],
    auditorChallenge: t(
      "Explain how the SoA position reflects shared-responsibility reality rather than just the provider's marketing assurances.",
      "Expliquez comment la position SoA reflète la réalité du partage de responsabilités plutôt que les seules assurances marketing du fournisseur.",
    ),
  },
  {
    controlCode: "8.13",
    title: t("Information backup control position", "Position SoA sur la sauvegarde de l'information"),
    businessContext: t(
      "Customer data, finance records, and key production systems rely on recoverable backups.",
      "Les données clients, les enregistrements financiers et les systèmes de production clés dépendent de sauvegardes restaurables.",
    ),
    applicability: "applicable",
    goodRationale: t(
      "Applicable because the organization treats continuity and data recoverability as core risks for in-scope systems. The control supports treatment for ransomware, operator error, and service outage scenarios.",
      "Applicable car l'organisation traite la continuité et la récupérabilité des données comme des risques centraux pour les systèmes dans le périmètre. La mesure soutient le traitement des scénarios de ransomware, d'erreur opérateur et d'indisponibilité de service.",
    ),
    weakRationale: t(
      "Applicable because backups are a best practice.",
      "Applicable parce que les sauvegardes sont une bonne pratique.",
    ),
    implementationRationale: t(
      "Partially implemented: backup jobs are automated and monitored, but restore evidence is complete only for the customer database and not for every critical platform component.",
      "Partiellement mise en oeuvre : les jobs de sauvegarde sont automatisés et surveillés, mais la preuve de restauration est complète seulement pour la base client et pas pour chaque composant critique de la plateforme.",
    ),
    relatedRisks: [
      t("Data loss or corruption", "Perte ou corruption de données"),
      t("Extended outage after service failure", "Indisponibilité prolongée après incident de service"),
    ],
    expectedEvidence: [
      t("Backup scope and retention records", "Preuves de périmètre et de rétention des sauvegardes"),
      t("Monitoring reports for failed jobs", "Rapports de surveillance des jobs en échec"),
      t("Recent restore test reports", "Rapports récents de tests de restauration"),
    ],
    commonMistakes: [
      t("Treating successful backup jobs as proof of recoverability", "Considérer que la réussite des jobs de sauvegarde prouve la restaurabilité"),
      t("Leaving restore responsibilities unclear between infrastructure and application teams", "Laisser floues les responsabilités de restauration entre les équipes infrastructure et applicatives"),
    ],
    auditorChallenge: t(
      "Show recent restore evidence for sampled critical systems and explain what was learned from the test.",
      "Montrez une preuve récente de restauration pour les systèmes critiques échantillonnés et expliquez ce qui a été appris du test.",
    ),
  },
  {
    controlCode: "8.15",
    title: t("Logging control position", "Position SoA sur la journalisation"),
    businessContext: t(
      "The organization depends on privileged operations, customer support actions, and cloud administration that require traceability.",
      "L'organisation dépend d'opérations à privilèges, d'actions de support client et d'administration cloud qui exigent de la traçabilité.",
    ),
    applicability: "applicable",
    goodRationale: t(
      "Applicable because privileged and high-risk operational activity must be traceable for incident response, investigation, and oversight in the in-scope environment.",
      "Applicable car les activités opérationnelles à privilèges et à haut risque doivent être traçables pour la réponse à incident, l'investigation et la supervision dans l'environnement du périmètre.",
    ),
    weakRationale: t(
      "Applicable because our systems generate logs.",
      "Applicable parce que nos systèmes génèrent des logs.",
    ),
    implementationRationale: t(
      "In progress: central collection is implemented, but periodic review and evidencing of review decisions are not yet consistent across all privileged workflows.",
      "En cours : la collecte centralisée est mise en place, mais la revue périodique et la preuve de revue ne sont pas encore cohérentes sur tous les workflows à privilèges.",
    ),
    relatedRisks: [
      t("Undetected misuse of privileged access", "Usage abusif non détecté d'accès à privilèges"),
      t("Weak incident reconstruction", "Reconstruction d'incident insuffisante"),
    ],
    expectedEvidence: [
      t("Logging standard and scoping decisions", "Standard de journalisation et décisions de périmètre"),
      t("Sampled log review records", "Traces échantillonnées de revue des logs"),
      t("Escalation or investigation records based on log findings", "Traces d'escalade ou d'investigation issues des logs"),
    ],
    commonMistakes: [
      t("Confusing log retention with actual log review", "Confondre rétention des logs et revue réelle des logs"),
      t("Leaving privileged activity out of the review cadence", "Laisser les activités à privilèges hors de la cadence de revue"),
    ],
    auditorChallenge: t(
      "Show not only that logs exist, but that someone reviews the right events and follows up when anomalies appear.",
      "Montrez non seulement que les logs existent, mais aussi que quelqu'un revoit les bons événements et assure le suivi lorsque des anomalies apparaissent.",
    ),
  },
  {
    controlCode: "5.30",
    title: t("ICT readiness for continuity control position", "Position SoA sur la préparation ICT à la continuité"),
    businessContext: t(
      "The company wants to claim resilience to customers, but relies on a small operations team and outsourced infrastructure.",
      "L'entreprise veut revendiquer de la résilience auprès des clients, mais s'appuie sur une petite équipe opérations et une infrastructure externalisée.",
    ),
    applicability: "applicable",
    goodRationale: t(
      "Applicable because continuity objectives for in-scope services depend on tested recovery, communication paths, and operational readiness across internal and external teams.",
      "Applicable car les objectifs de continuité des services dans le périmètre dépendent d'une reprise testée, de circuits de communication et d'une préparation opérationnelle entre équipes internes et externes.",
    ),
    weakRationale: t(
      "Applicable because resilience is important.",
      "Applicable parce que la résilience est importante.",
    ),
    implementationRationale: t(
      "Planned for the next quarter: dependency mapping exists, but coordinated continuity exercises and evidence packs are not yet established.",
      "Prévu pour le prochain trimestre : la cartographie des dépendances existe, mais les exercices coordonnés de continuité et les dossiers de preuve ne sont pas encore établis.",
    ),
    relatedRisks: [
      t("Extended customer outage after supplier failure", "Indisponibilité client prolongée après défaillance fournisseur"),
      t("Poor coordination during major disruptions", "Coordination insuffisante pendant une perturbation majeure"),
    ],
    expectedEvidence: [
      t("Continuity objectives for in-scope services", "Objectifs de continuité des services dans le périmètre"),
      t("Exercise plans and post-test actions", "Plans d'exercice et actions post-test"),
      t("Dependency map for key ICT services", "Cartographie des dépendances des services ICT clés"),
    ],
    commonMistakes: [
      t("Assuming supplier resilience removes the need for internal readiness evidence", "Supposer que la résilience fournisseur supprime le besoin de preuve de préparation interne"),
      t("Leaving continuity claims unsupported by coordinated tests", "Laisser des promesses de continuité sans tests coordonnés pour les démontrer"),
    ],
    auditorChallenge: t(
      "If continuity is presented as a business capability, show the tested evidence that supports that claim.",
      "Si la continuité est présentée comme une capacité métier, montrez la preuve testée qui soutient cette affirmation.",
    ),
  },
];

export const clausePracticeLenses: ClausePracticeLens[] = [
  {
    clause: "4",
    realisticExample: t(
      "A French SaaS company first wants to certify only engineering, but customer support, HR joiners/leavers, and cloud suppliers keep affecting the same service. Clause 4 forces the team to define context, interested parties, and a credible scope boundary.",
      "Un éditeur SaaS français veut d'abord certifier seulement l'engineering, mais le support client, les arrivées/départs RH et les fournisseurs cloud continuent d'affecter le même service. La clause 4 force l'équipe à définir le contexte, les parties intéressées et une frontière de périmètre crédible.",
    ),
    quickPractice: t(
      "Ask yourself: if this activity were excluded from scope, could it still materially affect the in-scope service or security commitments?",
      "Posez-vous la question : si cette activité était exclue du périmètre, pourrait-elle quand même affecter de manière significative le service dans le périmètre ou les engagements de sécurité ?",
    ),
    auditorMindset: t(
      "Auditors use Clause 4 to test whether the ISMS boundary is honest and whether supporting interfaces have been thought through.",
      "Les auditeurs utilisent la clause 4 pour tester si la frontière du SMSI est honnête et si les interfaces de support ont bien été prises en compte.",
    ),
    phraseIds: ["scope-boundary", "why-iso27001"],
  },
  {
    clause: "5",
    realisticExample: t(
      "Leadership signs the policy, but no one can explain who approves risk acceptance or who decides when a corrective action is overdue. Clause 5 is where security becomes a leadership system rather than a specialist hobby.",
      "La direction signe la politique, mais personne ne peut expliquer qui approuve l'acceptation du risque ou qui décide lorsqu'une action corrective est en retard. La clause 5 est l'endroit où la sécurité devient un système de direction plutôt qu'un hobby de spécialistes.",
    ),
    quickPractice: t(
      "Name one decision that leadership must own directly in your ISMS. If nobody can name it, Clause 5 is probably weak.",
      "Nommez une décision que la direction doit porter directement dans votre SMSI. Si personne ne peut la nommer, la clause 5 est probablement faible.",
    ),
    auditorMindset: t(
      "Auditors look for evidence that leadership direction changes priorities, resource decisions, and accountability in practice.",
      "Les auditeurs recherchent la preuve que la direction fait évoluer en pratique les priorités, les décisions de ressources et la responsabilité.",
    ),
    phraseIds: ["mgmt-review-inputs", "good-corrective-action"],
  },
  {
    clause: "6",
    realisticExample: t(
      "A scale-up knows its top concerns informally, but different teams score risk differently and the SoA has been assembled from old templates. Clause 6 is where planning becomes traceable and defensible.",
      "Une scale-up connaît ses principales préoccupations de manière informelle, mais les équipes notent le risque différemment et la SoA a été assemblée à partir de vieux modèles. La clause 6 est l'endroit où la planification devient traçable et défendable.",
    ),
    quickPractice: t(
      "Can you draw a clear line from risk criteria to risk treatment to control applicability? If not, Clause 6 needs work.",
      "Pouvez-vous tracer une ligne claire des critères de risque au traitement puis à l'applicabilité des mesures ? Si non, la clause 6 doit être renforcée.",
    ),
    auditorMindset: t(
      "Clause 6 tells auditors whether the ISMS is actually planned or whether decisions are being made ad hoc.",
      "La clause 6 dit aux auditeurs si le SMSI est réellement planifié ou si les décisions sont prises au fil de l'eau.",
    ),
    phraseIds: ["risk-not-traceable", "soa-too-generic"],
  },
  {
    clause: "7",
    realisticExample: t(
      "The process exists on paper, but teams cannot show who was trained, which version is current, or where responsibilities are formally assigned. Clause 7 is the support engine of the ISMS.",
      "Le processus existe sur le papier, mais les équipes ne peuvent pas montrer qui a été formé, quelle version est à jour ou où les responsabilités sont formellement attribuées. La clause 7 est le moteur support du SMSI.",
    ),
    quickPractice: t(
      "Pick one role in scope and ask: what competence, documented information, and communication evidence would prove the role is supported properly?",
      "Choisissez un rôle dans le périmètre et demandez-vous : quelles preuves de compétence, d'information documentée et de communication démontreraient que ce rôle est correctement soutenu ?",
    ),
    auditorMindset: t(
      "Auditors test whether the organization can support the ISMS repeatably with competent people, usable documents, and clear communication.",
      "Les auditeurs testent si l'organisation peut soutenir le SMSI de manière répétable avec des personnes compétentes, des documents utilisables et une communication claire.",
    ),
    phraseIds: ["control-partial", "evidence-sampled-period"],
  },
  {
    clause: "8",
    realisticExample: t(
      "A team says the control is in place, but access reviews, supplier reviews, incident logs, or change tickets are incomplete for the sampled period. Clause 8 is where the ISMS meets the operating reality.",
      "Une équipe dit que la mesure est en place, mais les revues d'accès, revues fournisseurs, journaux d'incident ou tickets de changement sont incomplets sur la période échantillonnée. La clause 8 est l'endroit où le SMSI rencontre la réalité opérationnelle.",
    ),
    quickPractice: t(
      "When someone says 'the process exists', ask what record would prove the process actually operated last month.",
      "Lorsque quelqu'un dit « le processus existe », demandez quel enregistrement prouverait que le processus a réellement fonctionné le mois dernier.",
    ),
    auditorMindset: t(
      "Clause 8 is tested through sampled execution evidence. This is where checklist theatre usually collapses.",
      "La clause 8 est testée via des preuves d'exécution échantillonnées. C'est là que le théâtre de checklist s'effondre le plus souvent.",
    ),
    phraseIds: ["ask-for-sampled-evidence", "process-not-evidenced"],
  },
  {
    clause: "9",
    realisticExample: t(
      "A governance meeting happens every quarter, but there is no internal audit trail, no review of objectives, and no evidence that findings or changes reach leadership decisions. Clause 9 is about performance visibility.",
      "Une réunion de gouvernance a lieu chaque trimestre, mais il n'existe ni piste d'audit interne, ni revue des objectifs, ni preuve que les constats ou changements alimentent les décisions de direction. La clause 9 porte sur la visibilité de la performance.",
    ),
    quickPractice: t(
      "If an auditor asked for performance evidence today, which three records would you show first and why?",
      "Si un auditeur demandait aujourd'hui une preuve de performance, quels trois enregistrements montreriez-vous d'abord et pourquoi ?",
    ),
    auditorMindset: t(
      "Auditors use Clause 9 to test whether the ISMS is measured, reviewed, and challenged rather than simply documented.",
      "Les auditeurs utilisent la clause 9 pour tester si le SMSI est mesuré, revu et challengé plutôt que simplement documenté.",
    ),
    phraseIds: ["finding-clause-9-2", "mgmt-review-inputs"],
  },
  {
    clause: "10",
    realisticExample: t(
      "A finding is raised and the immediate symptom is fixed, but the owner, root cause, and closure evidence are vague, so the same weakness comes back in the next audit cycle. Clause 10 is about disciplined improvement.",
      "Un constat est levé et le symptôme immédiat est corrigé, mais le responsable, la cause racine et la preuve de clôture restent flous ; la même faiblesse réapparaît au cycle d'audit suivant. La clause 10 porte sur une amélioration disciplinée.",
    ),
    quickPractice: t(
      "Take one repeated issue and ask whether your corrective action would stop it from returning or only make it look quieter for a month.",
      "Prenez un problème récurrent et demandez-vous si votre action corrective empêcherait réellement son retour ou si elle le rendrait seulement plus discret pendant un mois.",
    ),
    auditorMindset: t(
      "Clause 10 is where auditors distinguish short-term fixes from a management system that learns and improves.",
      "La clause 10 est l'endroit où les auditeurs distinguent les correctifs de court terme d'un système de management qui apprend et s'améliore.",
    ),
    phraseIds: ["good-corrective-action", "systemic-vs-isolated"],
  },
];

export const implementationJourneyScenario: ImplementationJourneyScenario = {
  company: "Rivage Cloud Operations",
  title: t("Certification journey for a France-based B2B platform", "Parcours de certification d'une plateforme B2B basée en France"),
  sector: t("B2B platform and managed support", "Plateforme B2B et support managé"),
  location: t("Paris and Nantes, France", "Paris et Nantes, France"),
  driver: t(
    "Rivage is selling into regulated and enterprise accounts. Customers no longer accept generic security promises; they want a governed, auditable security system.",
    "Rivage vend à des comptes régulés et grands comptes. Les clients n'acceptent plus des promesses de sécurité génériques ; ils veulent un système de sécurité piloté et auditable.",
  ),
  scope: t(
    "The initial scope covers the customer platform, customer support, the change-management flow for production, and key cloud and support suppliers.",
    "Le périmètre initial couvre la plateforme client, le support client, le flux de gestion des changements de production et les fournisseurs cloud et support clés.",
  ),
  operatingModel: t(
    "Engineering, support, cloud operations, procurement, HR, and leadership all touch the same service promise. The journey is therefore cross-functional from the start.",
    "L'engineering, le support, les opérations cloud, les achats, les RH et la direction touchent tous à la même promesse de service. Le parcours est donc transversal dès le départ.",
  ),
};

export const implementationJourneySteps: JourneyStep[] = [
  {
    id: "journey-context",
    step: 1,
    title: t("Understand context and interested parties", "Comprendre le contexte et les parties intéressées"),
    simple: t(
      "Start by understanding the business, the services that matter, and who expects what from security.",
      "Commencez par comprendre le métier, les services qui comptent et qui attend quoi de la sécurité.",
    ),
    professional: t(
      "Define internal and external issues, interested parties, and relevant requirements so the ISMS is anchored in real business drivers rather than generic security ambition.",
      "Définissez les enjeux internes et externes, les parties intéressées et les exigences pertinentes pour ancrer le SMSI dans de vrais moteurs métier plutôt que dans une ambition sécurité générique.",
    ),
    realisticExample: t(
      "Rivage learns that enterprise buyers care about supplier control and incident handling almost as much as technical hardening.",
      "Rivage découvre que les acheteurs grands comptes se soucient du pilotage fournisseur et de la gestion d'incident presque autant que du durcissement technique.",
    ),
    evidenceExpectations: [
      t("Context analysis and interested-party map", "Analyse de contexte et cartographie des parties intéressées"),
      t("Requirements list covering customers, contracts, and regulators", "Liste d'exigences couvrant clients, contrats et régulateurs"),
    ],
    commonMistakes: [
      t("Copying a generic list of interested parties with no link to the real service", "Copier une liste générique de parties intéressées sans lien avec le service réel"),
      t("Ignoring shared functions that still affect the scoped service", "Ignorer des fonctions partagées qui affectent pourtant le service dans le périmètre"),
    ],
    outputs: [
      t("Context and requirements baseline", "Base de contexte et d'exigences"),
      t("Named assumptions for scope discussions", "Hypothèses nommées pour les discussions de périmètre"),
    ],
    checkpoint: t(
      "Could a new executive explain why the ISMS exists in business terms after reading the context pack?",
      "Un nouveau dirigeant pourrait-il expliquer en termes métier pourquoi le SMSI existe après lecture du dossier de contexte ?",
    ),
    phraseIds: ["why-iso27001", "scope-boundary"],
  },
  {
    id: "journey-scope",
    step: 2,
    title: t("Define scope", "Définir le périmètre"),
    simple: t(
      "Choose a boundary that is realistic, supportable, and honest about dependencies.",
      "Choisissez une frontière réaliste, soutenable et honnête sur ses dépendances.",
    ),
    professional: t(
      "Document scope in terms of services, locations, systems, activities, and interfaces so certification boundaries are credible under audit.",
      "Documentez le périmètre en termes de services, lieux, systèmes, activités et interfaces afin que les frontières de certification soient crédibles en audit.",
    ),
    realisticExample: t(
      "Rivage keeps payroll out of scope, but leaves HR joiner/leaver activity in scope because access changes affect the customer platform.",
      "Rivage laisse la paie hors périmètre, mais garde les activités RH d'arrivée/départ dans le périmètre car les changements d'accès affectent la plateforme client.",
    ),
    evidenceExpectations: [
      t("Approved scope statement", "Déclaration de périmètre approuvée"),
      t("Boundary and interface notes for shared functions and suppliers", "Notes de frontière et d'interface pour les fonctions partagées et fournisseurs"),
    ],
    commonMistakes: [
      t("Writing the smallest possible scope instead of a defendable one", "Écrire le plus petit périmètre possible au lieu d'un périmètre défendable"),
      t("Forgetting dependencies that can materially affect the scoped service", "Oublier des dépendances qui peuvent affecter matériellement le service dans le périmètre"),
    ],
    outputs: [
      t("Scope statement and boundary narrative", "Déclaration de périmètre et récit de frontière"),
      t("List of shared interfaces that require control", "Liste des interfaces partagées qui demandent un contrôle"),
    ],
    checkpoint: t(
      "If an auditor sampled one supporting process tomorrow, would the team know why it is in or out of scope?",
      "Si un auditeur échantillonnait demain un processus support, l'équipe saurait-elle expliquer pourquoi il est dans ou hors périmètre ?",
    ),
    phraseIds: ["scope-boundary"],
  },
  {
    id: "journey-leadership",
    step: 3,
    title: t("Set leadership expectations and policy", "Définir les attentes de direction et la politique"),
    simple: t(
      "Leadership must do more than sign documents. It must own direction, accountability, and priority.",
      "La direction doit faire plus que signer des documents. Elle doit porter la direction, la responsabilité et la priorité.",
    ),
    professional: t(
      "Establish policy, assign responsibilities, and make clear which security decisions leadership owns directly inside the ISMS.",
      "Établissez la politique, attribuez les responsabilités et rendez explicites les décisions de sécurité que la direction porte directement dans le SMSI.",
    ),
    realisticExample: t(
      "Rivage formalizes who approves risk acceptance, who signs management review outputs, and who can declare a corrective action overdue.",
      "Rivage formalise qui approuve l'acceptation du risque, qui signe les sorties de revue de direction et qui peut déclarer une action corrective en retard.",
    ),
    evidenceExpectations: [
      t("Approved policy and responsibility matrix", "Politique approuvée et matrice de responsabilités"),
      t("Leadership decisions tied to resourcing and priorities", "Décisions de direction reliées aux ressources et aux priorités"),
    ],
    commonMistakes: [
      t("Treating leadership as ceremonial sign-off only", "Traiter la direction comme une simple validation cérémonielle"),
      t("Leaving ownership of key ISMS decisions ambiguous", "Laisser ambiguë la propriété des décisions clés du SMSI"),
    ],
    outputs: [
      t("Policy and RACI-style ownership", "Politique et responsabilités de type RACI"),
      t("Named leadership decisions and escalation paths", "Décisions de direction nommées et circuits d'escalade"),
    ],
    checkpoint: t(
      "Would process owners answer the same way if asked who approves risk acceptance or overdue actions?",
      "Les responsables de processus répondraient-ils de la même manière si on leur demandait qui approuve l'acceptation du risque ou les actions en retard ?",
    ),
    phraseIds: ["good-corrective-action"],
  },
  {
    id: "journey-risk-method",
    step: 4,
    title: t("Define the risk methodology", "Définir la méthodologie de risque"),
    simple: t(
      "Agree how the organization will identify, score, and decide on risk before building the register.",
      "Accordez-vous sur la façon dont l'organisation identifiera, notera et décidera du risque avant de construire le registre.",
    ),
    professional: t(
      "Document criteria, scoring logic, ownership, acceptance rules, and review cadence so risk assessment outputs are repeatable and auditable.",
      "Documentez les critères, la logique de notation, la responsabilité, les règles d'acceptation et la cadence de revue pour que les sorties de l'analyse de risque soient répétables et auditables.",
    ),
    realisticExample: t(
      "Rivage stops using ad hoc 'high/medium/low' labels from different teams and adopts one approved method for impact, likelihood, and treatment.",
      "Rivage cesse d'utiliser les libellés ad hoc « haut/moyen/faible » de différentes équipes et adopte une méthode approuvée unique pour l'impact, la vraisemblance et le traitement.",
    ),
    evidenceExpectations: [
      t("Approved risk method and criteria", "Méthode et critères de risque approuvés"),
      t("Training or communication for risk owners", "Formation ou communication pour les propriétaires de risque"),
    ],
    commonMistakes: [
      t("Confusing a risk template with a risk method", "Confondre un modèle de registre avec une méthode de risque"),
      t("Skipping risk acceptance rules and ownership", "Sauter les règles d'acceptation du risque et la responsabilité"),
    ],
    outputs: [
      t("Risk method and scoring model", "Méthode de risque et modèle de notation"),
      t("Owner guidance for workshops", "Guide pour les ateliers avec les responsables"),
    ],
    checkpoint: t(
      "Could two different teams assess the same risk and reach comparable conclusions using the method?",
      "Deux équipes différentes pourraient-elles évaluer le même risque et aboutir à des conclusions comparables avec la méthode ?",
    ),
    phraseIds: ["risk-not-traceable"],
  },
  {
    id: "journey-risk-assessment",
    step: 5,
    title: t("Run risk assessment", "Mener l'analyse des risques"),
    simple: t(
      "Identify what matters, what can go wrong, and why the business should care.",
      "Identifiez ce qui compte, ce qui peut mal tourner et pourquoi le métier doit s'en soucier.",
    ),
    professional: t(
      "Assess assets, threats, vulnerabilities, impact, likelihood, and current safeguards so treatment decisions can be prioritized credibly.",
      "Évaluez actifs, menaces, vulnérabilités, impact, vraisemblance et garde-fous existants afin de prioriser de manière crédible les décisions de traitement.",
    ),
    realisticExample: t(
      "Rivage's workshop surfaces that weak supplier review and rushed production changes are more material to the scoped service than several generic cyber buzzwords.",
      "L'atelier de Rivage fait ressortir que la faiblesse des revues fournisseurs et la précipitation des changements de production sont plus matérielles pour le service dans le périmètre que plusieurs buzzwords cyber génériques.",
    ),
    evidenceExpectations: [
      t("Current risk register with owners and scores", "Registre de risques à jour avec responsables et scores"),
      t("Workshop notes or evidence showing how risks were identified", "Notes d'atelier ou preuves montrant comment les risques ont été identifiés"),
    ],
    commonMistakes: [
      t("Listing technology issues without business impact", "Lister des sujets techniques sans impact métier"),
      t("Leaving risks generic so treatment cannot become specific", "Laisser les risques trop génériques pour empêcher un traitement spécifique"),
    ],
    outputs: [
      t("Scored risk register", "Registre des risques scoré"),
      t("Business-backed risk statements", "Énoncés de risque étayés par le métier"),
    ],
    checkpoint: t(
      "Can each high-priority risk be explained in one sentence that a business owner would recognize?",
      "Chaque risque prioritaire peut-il être expliqué en une phrase qu'un responsable métier reconnaîtrait ?",
    ),
    phraseIds: ["why-iso27001", "risk-not-traceable"],
  },
  {
    id: "journey-treatment",
    step: 6,
    title: t("Select treatment and build the SoA", "Choisir le traitement et construire la SoA"),
    simple: t(
      "Decide what to do about each risk, then make Annex A applicability explicit.",
      "Décidez quoi faire pour chaque risque, puis rendez explicite l'applicabilité de l'Annexe A.",
    ),
    professional: t(
      "Convert assessed risks into treatment decisions, implementation actions, and a Statement of Applicability that explains control logic clearly.",
      "Transformez les risques évalués en décisions de traitement, actions de mise en oeuvre et déclaration d'applicabilité qui explique clairement la logique des mesures.",
    ),
    realisticExample: t(
      "Rivage links supplier-review, cloud, access, and logging controls directly to treatment decisions instead of importing a consultant's generic SoA.",
      "Rivage relie directement les mesures de revue fournisseur, cloud, accès et journalisation aux décisions de traitement au lieu d'importer une SoA générique de consultant.",
    ),
    evidenceExpectations: [
      t("Treatment plan with owners and dates", "Plan de traitement avec responsables et dates"),
      t("SoA with explicit applicability rationale and status", "SoA avec justification d'applicabilité explicite et statut"),
    ],
    commonMistakes: [
      t("Marking controls applicable with generic rationales", "Marquer les mesures applicables avec des justifications génériques"),
      t("Failing to show why a control is not applicable in this operating model", "Ne pas montrer pourquoi une mesure n'est pas applicable dans ce modèle opérationnel"),
    ],
    outputs: [
      t("Treatment decisions and implementation backlog", "Décisions de traitement et backlog de mise en oeuvre"),
      t("Auditable SoA baseline", "Base SoA auditable"),
    ],
    checkpoint: t(
      "If an auditor picked one control at random, could the team trace it back to context, risk, or obligation?",
      "Si un auditeur choisissait une mesure au hasard, l'équipe pourrait-elle la relier au contexte, au risque ou à l'obligation ?",
    ),
    phraseIds: ["soa-too-generic", "risk-not-traceable"],
  },
  {
    id: "journey-implement-controls",
    step: 7,
    title: t("Implement controls", "Mettre en oeuvre les mesures"),
    simple: t(
      "Turn treatment decisions into real operating habits, not only project plans.",
      "Transformez les décisions de traitement en habitudes opérationnelles réelles, pas seulement en plans de projet.",
    ),
    professional: t(
      "Implement organizational, people, physical, and technological controls with owners, workflow, and measurable execution points.",
      "Mettez en oeuvre les mesures organisationnelles, humaines, physiques et technologiques avec des responsables, des workflows et des points d'exécution mesurables.",
    ),
    realisticExample: t(
      "Rivage standardizes access-review cadence, supplier review templates, logging review ownership, and emergency change handling inside existing workflows.",
      "Rivage standardise la cadence de revue d'accès, les modèles de revue fournisseur, la responsabilité de revue des logs et la gestion des changements urgents dans les workflows existants.",
    ),
    evidenceExpectations: [
      t("Operational workflows or tickets showing control execution", "Workflows opérationnels ou tickets montrant l'exécution des mesures"),
      t("Named owners for each key control activity", "Responsables nommés pour chaque activité de contrôle clé"),
    ],
    commonMistakes: [
      t("Treating implementation as policy writing only", "Traiter la mise en oeuvre comme un simple exercice de rédaction de politique"),
      t("Adding controls without defining who will run them month after month", "Ajouter des mesures sans définir qui les pilotera mois après mois"),
    ],
    outputs: [
      t("Control operating model", "Modèle opératoire des mesures"),
      t("Owner-ready workflows and templates", "Workflows et modèles prêts pour les responsables"),
    ],
    checkpoint: t(
      "Would an operator know exactly what to do next week to keep the control alive?",
      "Un opérateur saurait-il exactement quoi faire la semaine prochaine pour maintenir la mesure en vie ?",
    ),
    phraseIds: ["control-partial", "process-not-evidenced"],
  },
  {
    id: "journey-evidence",
    step: 8,
    title: t("Gather evidence", "Collecter la preuve"),
    simple: t(
      "Decide early what proof will show that controls are really working.",
      "Décidez tôt quelle preuve montrera que les mesures fonctionnent réellement.",
    ),
    professional: t(
      "Build an evidence model that combines design records, operating records, and sampled outputs so audit readiness is part of operations rather than a late scramble.",
      "Construisez un modèle de preuve qui combine enregistrements de conception, enregistrements d'exploitation et sorties échantillonnées pour faire de la préparation d'audit une partie des opérations plutôt qu'une course de dernière minute.",
    ),
    realisticExample: t(
      "Rivage adds evidence checkpoints to access reviews, emergency changes, supplier reviews, and restore tests instead of trying to reconstruct history before audit.",
      "Rivage ajoute des points de contrôle de preuve aux revues d'accès, changements urgents, revues fournisseurs et tests de restauration au lieu d'essayer de reconstruire l'historique avant audit.",
    ),
    evidenceExpectations: [
      t("Evidence map showing what records support each key process", "Cartographie de preuve montrant quels enregistrements soutiennent chaque processus clé"),
      t("Sampled records from the current operating period", "Enregistrements échantillonnés sur la période d'exploitation courante"),
    ],
    commonMistakes: [
      t("Collecting documents but not execution records", "Collecter des documents mais pas les enregistrements d'exécution"),
      t("Waiting until the audit calendar to decide what evidence matters", "Attendre le calendrier d'audit pour décider de la preuve pertinente"),
    ],
    outputs: [
      t("Evidence inventory by process", "Inventaire des preuves par processus"),
      t("Sample-ready evidence pack", "Pack de preuve prêt pour l'échantillonnage"),
    ],
    checkpoint: t(
      "Could the team show sampled evidence from the last quarter without rebuilding it from memory?",
      "L'équipe pourrait-elle montrer une preuve échantillonnée du dernier trimestre sans la reconstruire de mémoire ?",
    ),
    phraseIds: ["ask-for-sampled-evidence", "evidence-sampled-period"],
  },
  {
    id: "journey-internal-audit",
    step: 9,
    title: t("Perform internal audit", "Réaliser l'audit interne"),
    simple: t(
      "Use internal audit to challenge reality before certification does it for you.",
      "Utilisez l'audit interne pour challenger la réalité avant que la certification ne le fasse à votre place.",
    ),
    professional: t(
      "Run an internal audit programme that samples scope boundaries, evidence quality, and control operation independently enough to create credible findings.",
      "Menez un programme d'audit interne qui échantillonne les frontières de périmètre, la qualité de la preuve et l'opération des mesures avec assez d'indépendance pour produire des constats crédibles.",
    ),
    realisticExample: t(
      "Rivage's internal audit discovers that access reviews are strong for core systems but weak for smaller support tools and contractors.",
      "L'audit interne de Rivage découvre que les revues d'accès sont solides pour les systèmes centraux mais faibles pour les petits outils support et les prestataires.",
    ),
    evidenceExpectations: [
      t("Audit programme, plan, notes, report, and follow-up", "Programme d'audit, plan, notes, rapport et suivi"),
      t("Evidence showing sampling and independent challenge", "Preuves montrant l'échantillonnage et le challenge indépendant"),
    ],
    commonMistakes: [
      t("Using internal audit as a document-only review", "Utiliser l'audit interne comme une simple revue documentaire"),
      t("Avoiding hard questions because the team feels too close to the process", "Éviter les questions difficiles parce que l'équipe se sent trop proche du processus"),
    ],
    outputs: [
      t("Internal audit report and findings", "Rapport d'audit interne et constats"),
      t("Action list linked to owners", "Liste d'actions reliée à des responsables"),
    ],
    checkpoint: t(
      "Would a certification auditor see that internal audit really tested operation and not just document existence?",
      "Un auditeur de certification verrait-il que l'audit interne a vraiment testé l'opération et pas seulement l'existence des documents ?",
    ),
    phraseIds: ["finding-clause-9-2", "systemic-vs-isolated"],
  },
  {
    id: "journey-management-review",
    step: 10,
    title: t("Run management review", "Mener la revue de direction"),
    simple: t(
      "Bring evidence to leadership so decisions, priorities, and resources can move.",
      "Apportez la preuve à la direction pour faire bouger les décisions, les priorités et les ressources.",
    ),
    professional: t(
      "Review required inputs, trends, performance, findings, changes, and resource needs so leadership decisions shape the next phase of the ISMS.",
      "Examinez les intrants requis, tendances, performances, constats, changements et besoins en ressources afin que les décisions de direction orientent la prochaine phase du SMSI.",
    ),
    realisticExample: t(
      "Rivage uses the management review to decide on supplier-review resourcing, logging maturity targets, and acceptance of a temporary residual risk.",
      "Rivage utilise la revue de direction pour décider du dimensionnement des revues fournisseurs, des objectifs de maturité sur les logs et de l'acceptation temporaire d'un risque résiduel.",
    ),
    evidenceExpectations: [
      t("Agenda and minutes showing required inputs", "Agenda et compte rendu montrant les intrants requis"),
      t("Actions, decisions, and resource commitments", "Actions, décisions et engagements de ressources"),
    ],
    commonMistakes: [
      t("Relabeling a normal steering meeting as management review without covering the required inputs", "Rebaptiser une réunion de pilotage normale en revue de direction sans couvrir les intrants requis"),
      t("Capturing discussion but not decisions and actions", "Capturer la discussion mais pas les décisions ni les actions"),
    ],
    outputs: [
      t("Management review minutes", "Compte rendu de revue de direction"),
      t("Leadership-backed action decisions", "Décisions d'action portées par la direction"),
    ],
    checkpoint: t(
      "If an auditor read the minutes cold, would they see that leadership reviewed the ISMS and made decisions on it?",
      "Si un auditeur lisait le compte rendu à froid, verrait-il que la direction a réellement revu le SMSI et pris des décisions à son sujet ?",
    ),
    phraseIds: ["mgmt-review-inputs"],
  },
  {
    id: "journey-readiness",
    step: 11,
    title: t("Prepare for certification audit", "Se préparer à l'audit de certification"),
    simple: t(
      "Make sure the story, the documents, and the sampled evidence all say the same thing.",
      "Assurez-vous que le récit, les documents et la preuve échantillonnée racontent tous la même chose.",
    ),
    professional: t(
      "Check readiness across scope credibility, clause evidence, SoA quality, operational records, and interview alignment before facing the external audit sample.",
      "Vérifiez la préparation sur la crédibilité du périmètre, la preuve de clause, la qualité de la SoA, les enregistrements opérationnels et l'alignement des entretiens avant d'affronter l'échantillon d'audit externe.",
    ),
    realisticExample: t(
      "Rivage rehearses scope explanations, samples current-period records, and finds that one supplier review file is still missing a decision record before Stage 1.",
      "Rivage répète les explications de périmètre, échantillonne les enregistrements de la période courante et découvre qu'un dossier de revue fournisseur manque encore d'une trace de décision avant le Stage 1.",
    ),
    evidenceExpectations: [
      t("Current evidence pack by clause and process", "Pack de preuve courant par clause et processus"),
      t("Dry-run interview notes and issue list", "Notes d'entretien à blanc et liste d'écarts"),
    ],
    commonMistakes: [
      t("Relying on last year's evidence or consultant templates", "S'appuyer sur les preuves de l'an dernier ou sur des modèles de consultant"),
      t("Treating readiness as a document tidy-up instead of a consistency test", "Traiter la préparation comme un simple rangement documentaire au lieu d'un test de cohérence"),
    ],
    outputs: [
      t("Audit-readiness gap list", "Liste des écarts de préparation d'audit"),
      t("Sampled evidence deck for Stage 1 and Stage 2", "Jeu de preuves échantillonnées pour Stage 1 et Stage 2"),
    ],
    checkpoint: t(
      "Can the team answer the same question consistently across scope, risk, SoA, and sampled evidence?",
      "L'équipe peut-elle répondre de manière cohérente à la même question sur le périmètre, le risque, la SoA et la preuve échantillonnée ?",
    ),
    phraseIds: ["ask-for-sampled-evidence", "soa-too-generic"],
  },
  {
    id: "journey-improvement",
    step: 12,
    title: t("Handle nonconformities and improve", "Traiter les non-conformités et améliorer"),
    simple: t(
      "Use findings to improve the management system, not only to get through the audit.",
      "Utilisez les constats pour améliorer le système de management, pas seulement pour passer l'audit.",
    ),
    professional: t(
      "Classify findings proportionally, investigate root cause, implement corrective action, verify closure, and feed learning back into the ISMS cycle.",
      "Qualifiez les constats de manière proportionnée, analysez la cause racine, mettez en oeuvre l'action corrective, vérifiez la clôture et réinjectez l'apprentissage dans le cycle SMSI.",
    ),
    realisticExample: t(
      "Rivage treats a weak supplier-review trail as a systemic issue, redesigns ownership and evidence checkpoints, and verifies closure in the next internal audit.",
      "Rivage traite une piste de revue fournisseur faible comme un sujet systémique, revoit la responsabilité et les points de preuve, puis vérifie la clôture au prochain audit interne.",
    ),
    evidenceExpectations: [
      t("Finding record with root cause and action owner", "Trace de constat avec cause racine et responsable d'action"),
      t("Closure evidence showing the issue was really addressed", "Preuve de clôture montrant que le sujet a réellement été traité"),
    ],
    commonMistakes: [
      t("Fixing the symptom without correcting the management-system weakness", "Corriger le symptôme sans traiter la faiblesse du système de management"),
      t("Closing actions without checking whether evidence quality improved", "Clôturer les actions sans vérifier si la qualité de la preuve s'est améliorée"),
    ],
    outputs: [
      t("Corrective action plan and closure record", "Plan d'action corrective et preuve de clôture"),
      t("Updated ISMS priorities and lessons learned", "Priorités SMSI mises à jour et retours d'expérience"),
    ],
    checkpoint: t(
      "Would the same weakness be less likely to recur next quarter because of the action taken?",
      "La même faiblesse aurait-elle moins de chances de réapparaître au prochain trimestre grâce à l'action menée ?",
    ),
    phraseIds: ["good-corrective-action", "systemic-vs-isolated"],
  },
];

export const nonconformityCaseStudies: NonconformityCaseStudy[] = [
  {
    id: "nc-risk-method",
    title: t("No formal risk assessment methodology exists", "Aucune méthodologie formelle d'analyse des risques n'existe"),
    businessContext: t(
      "A Paris-based SaaS provider is preparing for its first certification audit after several enterprise deals asked for ISO 27001 evidence.",
      "Un éditeur SaaS parisien prépare son premier audit de certification après que plusieurs contrats grands comptes ont demandé des preuves ISO 27001.",
    ),
    scenario: t(
      "The team can point to a spreadsheet of 'top risks', but there is no approved method, no defined criteria, and no current ISMS risk register that covers the scoped service.",
      "L'équipe peut montrer un tableur de « risques principaux », mais il n'existe ni méthode approuvée, ni critères définis, ni registre de risques SMSI à jour couvrant le service dans le périmètre.",
    ),
    evidenceAvailable: [
      evidence(
        "risk-register",
        "partial",
        "Old spreadsheet with unscored concerns from the previous year",
        "Ancien tableur avec préoccupations non notées datant de l'année précédente",
        "It lists issues, but not current risk ownership, scoring criteria, or treatment logic.",
        "Il liste des sujets, mais sans responsable de risque à jour, critères de notation ni logique de traitement.",
      ),
      evidence(
        "approval-record",
        "absent",
        "No approved risk methodology",
        "Aucune méthodologie de risque approuvée",
        "Interviewed staff could not name who approved the method because no approval exists.",
        "Les personnes interrogées n'ont pas pu nommer l'approbateur de la méthode car aucune approbation n'existe.",
      ),
      evidence(
        "meeting-minutes",
        "weak",
        "Steering notes mention 'high risks' without a defined scoring basis",
        "Les notes du comité évoquent des « risques élevés » sans base de notation définie",
        "Management language exists, but the underlying method does not.",
        "Le langage de management existe, mais la méthode sous-jacente n'existe pas.",
      ),
    ],
    auditorNotice: t(
      "Control and treatment decisions appear to have been made on intuition rather than through a repeatable ISMS planning process.",
      "Les décisions de mesure et de traitement semblent avoir été prises à l'intuition plutôt que via un processus de planification SMSI répétable.",
    ),
    evidenceAssessment: "absent",
    classification: "major",
    why: t(
      "Clause 6 planning is materially ineffective when there is no formal method for identifying, evaluating, and treating risk. This is a core system capability, not a peripheral gap.",
      "La planification de la clause 6 est matériellement inefficace lorsqu'il n'existe aucune méthode formelle pour identifier, évaluer et traiter le risque. Il s'agit d'une capacité centrale du système, pas d'un écart périphérique.",
    ),
    systemicSignal: t(
      "Different teams described different scoring approaches and no one could show a common decision model. That points to a systemic gap rather than a single missed record.",
      "Différentes équipes ont décrit des approches de notation différentes et personne n'a pu montrer un modèle de décision commun. Cela pointe vers une lacune systémique plutôt qu'un simple enregistrement manquant.",
    ),
    relatedClauses: ["6.1.2", "6.1.3"],
    relatedControls: ["5.7", "8.8"],
    followUpQuestions: [
      t("How were current treatment decisions approved if the method does not exist?", "Comment les décisions actuelles de traitement ont-elles été approuvées si la méthode n'existe pas ?"),
      t("Who owns the risk criteria for the scoped service today?", "Qui porte aujourd'hui les critères de risque du service dans le périmètre ?"),
    ],
    recommendedCorrectiveAction: [
      t("Approve a formal risk methodology with scoring criteria and acceptance rules.", "Approuver une méthodologie de risque formelle avec critères de notation et règles d'acceptation."),
      t("Run a scoped risk assessment using nominated owners and current business context.", "Mener une analyse des risques sur le périmètre avec des responsables nommés et le contexte métier actuel."),
      t("Create a maintained risk register linked to treatment actions and SoA decisions.", "Créer un registre de risques maintenu, relié aux actions de traitement et aux décisions SoA."),
    ],
    goodResponse: t(
      "A strong response acknowledges that the current spreadsheet is not a valid ISMS method, commits to approving one method quickly, and shows a dated plan for re-running the assessment and rebuilding treatment traceability.",
      "Une bonne réponse reconnaît que le tableur actuel n'est pas une méthode SMSI valide, s'engage à approuver rapidement une méthode unique et montre un plan daté pour relancer l'analyse et reconstruire la traçabilité du traitement.",
    ),
    weakResponse: t(
      "A weak response argues that experienced staff already know the risks and that formal methodology would only add bureaucracy.",
      "Une réponse faible affirme que les équipes expérimentées connaissent déjà les risques et qu'une méthodologie formelle n'ajouterait que de la bureaucratie.",
    ),
    phraseIds: ["risk-not-traceable", "why-iso27001"],
  },
  {
    id: "nc-soa-misaligned",
    title: t("The SoA exists but is not aligned with treatment decisions", "La SoA existe mais n'est pas alignée avec les décisions de traitement"),
    businessContext: t(
      "A cloud services company refreshed its Statement of Applicability shortly before the audit using an inherited template.",
      "Une société de services cloud a rafraîchi sa déclaration d'applicabilité juste avant l'audit en utilisant un modèle hérité.",
    ),
    scenario: t(
      "The SoA marks several controls as applicable with generic language, but the treatment plan uses different wording, omits owner linkage, and does not explain why a few supplier and logging controls are marked not applicable.",
      "La SoA marque plusieurs mesures comme applicables avec un langage générique, mais le plan de traitement utilise un vocabulaire différent, omet les liens de responsabilité et n'explique pas pourquoi certaines mesures liées aux fournisseurs et aux logs sont marquées non applicables.",
    ),
    evidenceAvailable: [
      evidence(
        "soa",
        "weak",
        "SoA with blanket rationales such as 'best practice' and 'not relevant'",
        "SoA avec justifications génériques comme « bonne pratique » et « non pertinent »",
        "The artifact exists, but the reasoning is too shallow for audit reliance.",
        "L'artefact existe, mais le raisonnement est trop superficiel pour servir de base fiable en audit.",
      ),
      evidence(
        "risk-register",
        "partial",
        "Treatment plan with local project labels that do not match control language",
        "Plan de traitement avec libellés de projet qui ne correspondent pas au langage des mesures",
        "Some decisions exist, but they are hard to trace into the SoA.",
        "Certaines décisions existent, mais elles sont difficiles à tracer jusque dans la SoA.",
      ),
      evidence(
        "approval-record",
        "weak",
        "Consultant-issued version with no internal approval context",
        "Version émise par le consultant sans contexte d'approbation interne",
        "The organization cannot show who accepted the control position.",
        "L'organisation ne peut pas montrer qui a accepté la position de contrôle.",
      ),
    ],
    auditorNotice: t(
      "The SoA looks like a document produced for the audit rather than a reliable statement of the organization's real control position.",
      "La SoA ressemble à un document produit pour l'audit plutôt qu'à une déclaration fiable de la position réelle de contrôle de l'organisation.",
    ),
    evidenceAssessment: "weak",
    classification: "major",
    why: t(
      "The SoA is a core artifact for traceability between risk treatment and Annex A. If the artifact exists but cannot be relied on, the system remains materially weak.",
      "La SoA est un artefact central pour la traçabilité entre traitement du risque et Annexe A. Si l'artefact existe mais n'est pas fiable, le système reste matériellement faible.",
    ),
    systemicSignal: t(
      "The same traceability weakness affects multiple control families, not one isolated control entry. That makes the issue systemic.",
      "La même faiblesse de traçabilité affecte plusieurs familles de mesures, pas une seule entrée isolée. Cela rend le sujet systémique.",
    ),
    relatedClauses: ["6.1.3", "6.1.4"],
    relatedControls: ["5.19", "5.23", "8.15"],
    followUpQuestions: [
      t("Which risk or obligation made these controls applicable or not applicable?", "Quel risque ou quelle obligation a rendu ces mesures applicables ou non applicables ?"),
      t("Who reviewed and approved the current SoA position?", "Qui a revu et approuvé la position SoA actuelle ?"),
    ],
    recommendedCorrectiveAction: [
      t("Rebuild applicability rationales from current context, obligations, and treatment decisions.", "Reconstruire les justifications d'applicabilité à partir du contexte actuel, des obligations et des décisions de traitement."),
      t("Link each high-relevance control decision to a risk, obligation, or boundary condition.", "Relier chaque décision de mesure à forte pertinence à un risque, une obligation ou une condition de frontière."),
      t("Record ownership, approval, and implementation status with evidence expectations.", "Enregistrer la responsabilité, l'approbation et l'état de mise en oeuvre avec des attentes de preuve."),
    ],
    goodResponse: t(
      "A strong response admits that the current SoA is not decision-grade, then shows how the organization will re-baseline it against real treatment logic instead of defending generic wording.",
      "Une bonne réponse admet que la SoA actuelle n'est pas au niveau attendu pour une décision, puis montre comment l'organisation va la rebaseliner contre une logique réelle de traitement au lieu de défendre un wording générique.",
    ),
    weakResponse: t(
      "A weak response argues that the SoA is only a formality because the controls exist somewhere in operations anyway.",
      "Une réponse faible affirme que la SoA n'est qu'une formalité parce que les mesures existent quelque part dans les opérations.",
    ),
    phraseIds: ["soa-too-generic", "risk-not-traceable"],
  },
  {
    id: "nc-scope-vague",
    title: t("The scope statement is vague and inconsistent with operations", "La déclaration de périmètre est vague et incohérente avec les opérations"),
    businessContext: t(
      "A managed services provider wants to certify a customer-facing service while keeping shared support complexity outside the conversation.",
      "Un prestataire de services managés veut certifier un service orienté client tout en gardant la complexité du support partagé hors de la discussion.",
    ),
    scenario: t(
      "The scope says 'managed services activity in France', but sampled evidence shows a foreign NOC, shared HR joiner/leaver activity, and common supplier tooling materially affect the same service.",
      "Le périmètre dit « activité de services managés en France », mais les preuves échantillonnées montrent qu'un NOC étranger, des activités RH d'arrivée/départ partagées et un outillage fournisseur commun affectent matériellement le même service.",
    ),
    evidenceAvailable: [
      evidence(
        "policy-standard",
        "weak",
        "Scope statement with broad wording and no boundary narrative",
        "Déclaration de périmètre avec wording large et sans récit de frontière",
        "It names a service, but not the interfaces that support it.",
        "Elle nomme un service, mais pas les interfaces qui le soutiennent.",
      ),
      evidence(
        "asset-inventory",
        "partial",
        "Inventory includes shared systems outside the written scope",
        "L'inventaire inclut des systèmes partagés hors du périmètre écrit",
        "The asset view contradicts the scope narrative.",
        "La vue des actifs contredit le récit de périmètre.",
      ),
      evidence(
        "meeting-minutes",
        "weak",
        "Kickoff notes mention support interfaces but there is no final decision trail",
        "Les notes de kickoff mentionnent des interfaces support mais il n'existe pas de trace finale de décision",
        "The issue was noticed internally but never resolved clearly.",
        "Le sujet a été remarqué en interne mais jamais résolu clairement.",
      ),
    ],
    auditorNotice: t(
      "The organization appears to be describing a marketing boundary rather than a defensible ISMS boundary.",
      "L'organisation semble décrire une frontière marketing plutôt qu'une frontière SMSI défendable.",
    ),
    evidenceAssessment: "weak",
    classification: "major",
    why: t(
      "Clause 4.3 requires the scope to be credible in relation to activities, interfaces, and dependencies. If the written scope contradicts operating reality, confidence in the whole ISMS is weakened.",
      "La clause 4.3 exige que le périmètre soit crédible au regard des activités, interfaces et dépendances. Si le périmètre écrit contredit la réalité opérationnelle, la confiance dans l'ensemble du SMSI est affaiblie.",
    ),
    systemicSignal: t(
      "The inconsistency affects governance, assets, and supporting processes. It is not one bad sentence but a broader boundary problem.",
      "L'incohérence affecte la gouvernance, les actifs et les processus support. Il ne s'agit pas d'une mauvaise phrase isolée mais d'un problème plus large de frontière.",
    ),
    relatedClauses: ["4.3"],
    relatedControls: ["5.9", "5.19"],
    followUpQuestions: [
      t("Why are these shared support activities excluded when they materially affect the scoped service?", "Pourquoi ces activités de support partagées sont-elles exclues alors qu'elles affectent matériellement le service dans le périmètre ?"),
      t("Who approved the final scope boundary and on what basis?", "Qui a approuvé la frontière finale du périmètre et sur quelle base ?"),
    ],
    recommendedCorrectiveAction: [
      t("Rewrite the scope with explicit services, locations, interfaces, and dependencies.", "Réécrire le périmètre avec des services, lieux, interfaces et dépendances explicites."),
      t("Document why shared functions are in or out of scope and how they are controlled.", "Documenter pourquoi les fonctions partagées sont dans ou hors périmètre et comment elles sont maîtrisées."),
      t("Approve the revised scope through leadership governance.", "Approuver le périmètre révisé via la gouvernance de direction."),
    ],
    goodResponse: t(
      "A strong response accepts that the current scope wording is too broad and shows a practical plan to redefine boundaries honestly, even if that makes the audit conversation harder in the short term.",
      "Une bonne réponse accepte que le wording actuel du périmètre est trop vague et montre un plan pratique pour redéfinir honnêtement les frontières, même si cela rend la discussion d'audit plus difficile à court terme.",
    ),
    weakResponse: t(
      "A weak response insists that everyone 'understands what we mean' and that a more explicit scope would only create unnecessary attention on shared teams.",
      "Une réponse faible insiste sur le fait que « tout le monde comprend ce que nous voulons dire » et qu'un périmètre plus explicite attirerait seulement une attention inutile sur les équipes partagées.",
    ),
    phraseIds: ["scope-boundary"],
  },
  {
    id: "nc-internal-audit-paper-only",
    title: t("The internal audit programme exists on paper but not in evidence", "Le programme d'audit interne existe sur le papier mais pas dans la preuve"),
    businessContext: t(
      "An organization approaching recertification says it performs internal audits annually.",
      "Une organisation approchant sa recertification affirme réaliser des audits internes chaque année.",
    ),
    scenario: t(
      "An audit schedule exists, but no recent audit plans, reports, sampling records, opening or closing meeting notes, or corrective-action follow-up can be produced for the current cycle.",
      "Un planning d'audit existe, mais aucun plan récent, rapport, trace d'échantillonnage, note d'ouverture ou de clôture, ni suivi d'action corrective ne peut être produit pour le cycle en cours.",
    ),
    evidenceAvailable: [
      evidence(
        "internal-audit-report",
        "absent",
        "No report or working papers for the current audit cycle",
        "Aucun rapport ni papier de travail pour le cycle d'audit en cours",
        "The programme is claimed, but execution cannot be demonstrated.",
        "Le programme est revendiqué, mais son exécution ne peut pas être démontrée.",
      ),
      evidence(
        "meeting-minutes",
        "weak",
        "Calendar invite labeled 'internal audit prep'",
        "Invitation calendrier intitulée « préparation audit interne »",
        "Preparation activity exists, but not the audit evidence itself.",
        "Une activité de préparation existe, mais pas la preuve de l'audit lui-même.",
      ),
      evidence(
        "approval-record",
        "partial",
        "Previous-year programme approval",
        "Approbation du programme de l'année précédente",
        "Approval exists historically, but not current execution.",
        "L'approbation existe historiquement, mais pas l'exécution actuelle.",
      ),
    ],
    auditorNotice: t(
      "The organization cannot show that it independently checked the ISMS before the external audit sample.",
      "L'organisation ne peut pas montrer qu'elle a vérifié le SMSI de manière indépendante avant l'échantillon d'audit externe.",
    ),
    evidenceAssessment: "absent",
    classification: "major",
    why: t(
      "Clause 9.2 requires internal audit to operate as a real assurance mechanism. When only the programme exists and no execution evidence exists, a core performance-evaluation requirement is missing.",
      "La clause 9.2 exige que l'audit interne fonctionne comme un véritable mécanisme d'assurance. Lorsque seul le programme existe sans aucune preuve d'exécution, une exigence centrale d'évaluation de la performance manque.",
    ),
    systemicSignal: t(
      "The absence covers the entire audit cycle, not a missing page in one report. That points to non-execution rather than isolated filing weakness.",
      "L'absence couvre l'ensemble du cycle d'audit, pas une page manquante dans un rapport. Cela pointe vers une non-exécution plutôt qu'une faiblesse isolée d'archivage.",
    ),
    relatedClauses: ["9.2", "10.1"],
    relatedControls: ["5.35"],
    followUpQuestions: [
      t("Who performed the internal audit and how was competence or independence ensured?", "Qui a réalisé l'audit interne et comment la compétence ou l'indépendance a-t-elle été assurée ?"),
      t("What findings from the last internal audit cycle were tracked to closure?", "Quels constats du dernier cycle d'audit interne ont été suivis jusqu'à leur clôture ?"),
    ],
    recommendedCorrectiveAction: [
      t("Re-establish the internal audit programme with named auditors, scope, and timing.", "Réétablir le programme d'audit interne avec auditeurs nommés, périmètre et calendrier."),
      t("Execute the audit with working papers, sampled evidence, and report output.", "Exécuter l'audit avec papiers de travail, preuves échantillonnées et rapport formel."),
      t("Track audit findings through corrective action and closure verification.", "Suivre les constats d'audit via l'action corrective et la vérification de clôture."),
    ],
    goodResponse: t(
      "A strong response stops defending the calendar and admits that execution evidence is missing, then lays out when the audit will be completed and how independence will be ensured.",
      "Une bonne réponse cesse de défendre le calendrier et admet que la preuve d'exécution manque, puis expose quand l'audit sera réalisé et comment l'indépendance sera assurée.",
    ),
    weakResponse: t(
      "A weak response says the team was too busy this year but everyone knows the environment well enough already.",
      "Une réponse faible dit que l'équipe a été trop occupée cette année mais que tout le monde connaît déjà suffisamment l'environnement.",
    ),
    phraseIds: ["finding-clause-9-2", "ask-for-sampled-evidence"],
  },
  {
    id: "nc-mgmt-review-incomplete",
    title: t("Management review is claimed, but the minutes are incomplete", "La revue de direction est revendiquée, mais le compte rendu est incomplet"),
    businessContext: t(
      "Leadership says its quarterly steering committee also serves as the management review for the ISMS.",
      "La direction affirme que son comité de pilotage trimestriel sert aussi de revue de direction du SMSI.",
    ),
    scenario: t(
      "The minutes discuss security budget and customer issues, but sampled records do not show internal-audit inputs, objective performance, changes in context, or resulting decisions on improvement and resources.",
      "Le compte rendu traite du budget sécurité et de sujets clients, mais les enregistrements échantillonnés ne montrent ni intrants d'audit interne, ni performance des objectifs, ni changements de contexte, ni décisions résultantes sur l'amélioration et les ressources.",
    ),
    evidenceAvailable: [
      evidence(
        "management-review-minutes",
        "partial",
        "Quarterly steering deck and summary minutes",
        "Deck de comité trimestriel et compte rendu synthétique",
        "A leadership forum exists, but the required ISMS inputs are only partly visible.",
        "Une instance de direction existe, mais les intrants SMSI requis ne sont visibles qu'en partie.",
      ),
      evidence(
        "meeting-minutes",
        "weak",
        "Action list on commercial and project topics only",
        "Liste d'actions portant uniquement sur des sujets commerciaux et projets",
        "The record does not show whether ISMS outcomes were decided.",
        "La trace ne montre pas si des décisions SMSI ont été prises.",
      ),
      evidence(
        "internal-audit-report",
        "partial",
        "Prior internal audit report was available but not referenced in management review",
        "Le précédent rapport d'audit interne est disponible mais non référencé dans la revue de direction",
        "An important input exists but does not visibly feed leadership review.",
        "Un intrant important existe mais n'alimente pas visiblement la revue de direction.",
      ),
    ],
    auditorNotice: t(
      "The organization may have a leadership meeting, but the record does not show that leadership is reviewing the ISMS as ISO 27001 expects.",
      "L'organisation a peut-être une réunion de direction, mais la trace ne montre pas que la direction revoit le SMSI comme l'attend l'ISO 27001.",
    ),
    evidenceAssessment: "partial",
    classification: "minor",
    why: t(
      "The mechanism exists, but required inputs and outputs are incomplete in the evidence trail. This weakens, rather than eliminates, confidence in Clause 9.3 performance.",
      "Le mécanisme existe, mais les intrants et sorties requis sont incomplets dans la piste de preuve. Cela affaiblit, plutôt qu'annule, la confiance dans la performance de la clause 9.3.",
    ),
    systemicSignal: t(
      "This looks like a design and evidence-quality issue in one governance mechanism, not an absence of all leadership review activity.",
      "Cela ressemble à un problème de conception et de qualité de preuve dans un mécanisme de gouvernance, pas à une absence totale de revue de direction.",
    ),
    relatedClauses: ["9.3"],
    relatedControls: ["5.1"],
    followUpQuestions: [
      t("Where in the record can we see review of audit results, objective performance, and improvement needs?", "Où, dans la trace, voit-on la revue des résultats d'audit, de la performance des objectifs et des besoins d'amélioration ?"),
      t("What leadership decisions were made for the ISMS after this review?", "Quelles décisions de direction ont été prises pour le SMSI à la suite de cette revue ?"),
    ],
    recommendedCorrectiveAction: [
      t("Add a clear management-review agenda aligned to required ISO 27001 inputs.", "Ajouter un agenda de revue de direction aligné sur les intrants requis par l'ISO 27001."),
      t("Capture decisions, owners, and deadlines in the minutes.", "Capturer les décisions, responsables et échéances dans le compte rendu."),
      t("Ensure internal-audit results, objective trends, and context changes are explicitly reviewed.", "Veiller à ce que les résultats d'audit interne, les tendances d'objectifs et les changements de contexte soient explicitement revus."),
    ],
    goodResponse: t(
      "A strong response accepts that the current meeting record is not enough and proposes a better agenda and minute structure rather than arguing about the meeting title.",
      "Une bonne réponse accepte que la trace de réunion actuelle ne suffit pas et propose un meilleur agenda et une meilleure structure de compte rendu au lieu de débattre sur l'intitulé de la réunion.",
    ),
    weakResponse: t(
      "A weak response insists that the committee is obviously the management review because the same executives attend it.",
      "Une réponse faible insiste sur le fait que le comité est évidemment la revue de direction puisque les mêmes dirigeants y participent.",
    ),
    phraseIds: ["mgmt-review-inputs"],
  },
  {
    id: "nc-access-review",
    title: t("The access review process is documented but not evidenced consistently", "Le processus de revue d'accès est documenté mais pas démontré de manière cohérente"),
    businessContext: t(
      "A support-heavy SaaS provider runs quarterly access reviews across multiple business systems.",
      "Un éditeur SaaS avec forte activité support réalise des revues d'accès trimestrielles sur plusieurs systèmes métier.",
    ),
    scenario: t(
      "Three sampled applications have review exports and sign-off, but two smaller support tools rely on verbal manager confirmation and no documented follow-up for stale accounts exists.",
      "Trois applications échantillonnées disposent d'exports et de validations de revue, mais deux petits outils support reposent sur une confirmation verbale du manager et aucune trace de suivi des comptes obsolètes n'existe.",
    ),
    evidenceAvailable: [
      evidence(
        "access-review-record",
        "partial",
        "Quarterly review records for core systems only",
        "Traces de revue trimestrielle uniquement pour les systèmes centraux",
        "The control works in part of the scope but not all of it.",
        "La mesure fonctionne sur une partie du périmètre mais pas sur l'ensemble.",
      ),
      evidence(
        "ticket-workflow",
        "weak",
        "No ticket trail for removals from smaller tools",
        "Aucune piste de ticket pour les suppressions sur les petits outils",
        "Execution is hard to prove for the weaker systems.",
        "L'exécution est difficile à prouver pour les systèmes les plus faibles.",
      ),
      evidence(
        "policy-standard",
        "sufficient",
        "Documented quarterly review procedure",
        "Procédure de revue trimestrielle documentée",
        "The design exists and is known by managers.",
        "La conception existe et est connue des managers.",
      ),
    ],
    auditorNotice: t(
      "The organization has a control design, but execution and proof are uneven across the scoped tooling estate.",
      "L'organisation dispose d'une conception de contrôle, mais l'exécution et la preuve sont inégales selon les outils du périmètre.",
    ),
    evidenceAssessment: "partial",
    classification: "minor",
    why: t(
      "The process exists and is operating in part of the scope, which points to inconsistency rather than total absence. The weakness is still material enough to classify as a minor nonconformity.",
      "Le processus existe et fonctionne sur une partie du périmètre, ce qui pointe vers une incohérence plutôt qu'une absence totale. La faiblesse reste suffisamment matérielle pour être qualifiée de non-conformité mineure.",
    ),
    systemicSignal: t(
      "The gap affects more than one tool, but not the entire environment. It looks broader than an isolated sample and narrower than a fully systemic collapse.",
      "L'écart affecte plus d'un outil, mais pas l'ensemble de l'environnement. Il est plus large qu'un échantillon isolé et plus étroit qu'un effondrement totalement systémique.",
    ),
    relatedClauses: ["8.1"],
    relatedControls: ["5.15", "5.18"],
    followUpQuestions: [
      t("How do you know smaller support tools have actually been reviewed this quarter?", "Comment savez-vous que les petits outils support ont réellement été revus ce trimestre ?"),
      t("Where is the evidence that identified removals were completed?", "Où se trouve la preuve que les suppressions identifiées ont bien été réalisées ?"),
    ],
    recommendedCorrectiveAction: [
      t("Extend the review format and evidence expectations to all in-scope tools.", "Étendre le format de revue et les attentes de preuve à tous les outils dans le périmètre."),
      t("Require traceable removal follow-up for any exception identified during review.", "Exiger un suivi traçable des suppressions pour toute exception identifiée pendant la revue."),
      t("Monitor missed or incomplete reviews centrally.", "Surveiller de manière centralisée les revues manquées ou incomplètes."),
    ],
    goodResponse: t(
      "A strong response admits that the process is stronger for major systems than for long-tail tooling and commits to closing the evidence gap with one standard review model.",
      "Une bonne réponse admet que le processus est plus robuste pour les systèmes majeurs que pour l'outillage périphérique et s'engage à fermer l'écart de preuve avec un modèle de revue unique.",
    ),
    weakResponse: t(
      "A weak response argues that smaller tools are low risk and therefore do not need the same review evidence.",
      "Une réponse faible soutient que les petits outils sont peu risqués et n'ont donc pas besoin du même niveau de preuve de revue.",
    ),
    phraseIds: ["process-not-evidenced", "ask-for-sampled-evidence"],
  },
  {
    id: "nc-offboarding",
    title: t("Onboarding exists, but offboarding evidence is inconsistent", "L'onboarding existe, mais la preuve d'offboarding est incohérente"),
    businessContext: t(
      "A consulting and support organization handles frequent employee and contractor churn.",
      "Une organisation de conseil et de support gère un turnover fréquent de salariés et de prestataires.",
    ),
    scenario: t(
      "Joiner and mover steps are documented, but one terminated contractor kept VPN group access for 12 days and two sampled leaver cases have no revocation evidence attached to the HR trigger.",
      "Les étapes d'arrivée et de mobilité sont documentées, mais un prestataire parti a conservé l'accès au groupe VPN pendant 12 jours et deux cas de départ échantillonnés n'ont aucune preuve de révocation rattachée au déclencheur RH.",
    ),
    evidenceAvailable: [
      evidence(
        "ticket-workflow",
        "partial",
        "HR-triggered access tickets exist for joiners but not consistently for leavers",
        "Des tickets d'accès déclenchés par les RH existent pour les arrivées mais pas de manière cohérente pour les départs",
        "The process is stronger on entry than on exit.",
        "Le processus est plus robuste à l'entrée qu'à la sortie.",
      ),
      evidence(
        "access-review-record",
        "weak",
        "Quarterly review later found a stale account",
        "La revue trimestrielle a détecté plus tard un compte obsolète",
        "The stale account shows delayed control effectiveness.",
        "Le compte obsolète montre une efficacité retardée du contrôle.",
      ),
      evidence(
        "policy-standard",
        "sufficient",
        "Documented joiner-mover-leaver process",
        "Processus arrivées-mobilités-départs documenté",
        "The control design and intended workflow exist.",
        "La conception du contrôle et le workflow visé existent.",
      ),
    ],
    auditorNotice: t(
      "The organization has a documented lifecycle process, but leaver execution and proof are not strong enough to prevent avoidable residual access risk.",
      "L'organisation a un processus de cycle de vie documenté, mais l'exécution et la preuve sur les départs ne sont pas assez robustes pour éviter un risque résiduel d'accès évitable.",
    ),
    evidenceAssessment: "partial",
    classification: "minor",
    why: t(
      "The process exists and operates in part, but there is a material execution gap for offboarding. This is a localized but important weakness rather than total absence of control.",
      "Le processus existe et fonctionne en partie, mais il existe un écart matériel d'exécution sur les départs. Il s'agit d'une faiblesse localisée mais importante plutôt que d'une absence totale de contrôle.",
    ),
    systemicSignal: t(
      "Multiple sampled leaver cases show the same weak evidence pattern, so the issue is broader than one forgotten account.",
      "Plusieurs cas de départ échantillonnés montrent la même faiblesse de preuve ; le sujet est donc plus large qu'un seul compte oublié.",
    ),
    relatedClauses: ["8.1", "7.2"],
    relatedControls: ["5.11", "5.18", "6.5"],
    followUpQuestions: [
      t("Who is accountable for proving access removal after HR signals a departure?", "Qui est responsable de démontrer la suppression d'accès après le signalement RH d'un départ ?"),
      t("How do you detect a missed offboarding action before the quarterly review?", "Comment détectez-vous une action d'offboarding manquée avant la revue trimestrielle ?"),
    ],
    recommendedCorrectiveAction: [
      t("Align HR and IT triggers so every leaver case creates a traceable revocation workflow.", "Aligner les déclencheurs RH et IT afin que chaque départ crée un workflow de révocation traçable."),
      t("Require closure evidence for critical access removal.", "Exiger une preuve de clôture pour les suppressions d'accès critiques."),
      t("Add monitoring for stale accounts or unclosed leaver tasks.", "Ajouter une surveillance des comptes obsolètes ou des tâches de départ non clôturées."),
    ],
    goodResponse: t(
      "A strong response accepts that the stale account reveals a process weakness, then strengthens trigger, ownership, and evidence capture rather than treating the case as a one-off mistake.",
      "Une bonne réponse accepte que le compte obsolète révèle une faiblesse de processus, puis renforce le déclenchement, la responsabilité et la capture de preuve au lieu de traiter le cas comme une erreur ponctuelle.",
    ),
    weakResponse: t(
      "A weak response focuses only on disabling the one sampled account and insists the general process is already good enough.",
      "Une réponse faible se limite à désactiver le compte échantillonné et insiste sur le fait que le processus général est déjà suffisamment bon.",
    ),
    phraseIds: ["control-partial", "good-corrective-action"],
  },
  {
    id: "nc-asset-inventory",
    title: t("The asset inventory is incomplete for in-scope systems", "L'inventaire des actifs est incomplet pour les systèmes dans le périmètre"),
    businessContext: t(
      "An e-commerce company moved quickly into new SaaS tools and cloud components while building its ISMS.",
      "Une entreprise e-commerce a adopté rapidement de nouveaux outils SaaS et composants cloud pendant la construction de son SMSI.",
    ),
    scenario: t(
      "The formal inventory covers the webshop, ERP, and office tooling, but omits the analytics warehouse, CI/CD runners, and a support integration that all touch the scoped customer service.",
      "L'inventaire formel couvre la boutique, l'ERP et l'outillage bureautique, mais omet l'entrepôt analytique, les runners CI/CD et une intégration de support qui touchent tous le service client dans le périmètre.",
    ),
    evidenceAvailable: [
      evidence(
        "asset-inventory",
        "partial",
        "Formal inventory missing several active components",
        "Inventaire formel omettant plusieurs composants actifs",
        "The artifact exists but does not reflect the real technical estate.",
        "L'artefact existe mais ne reflète pas l'environnement technique réel.",
      ),
      evidence(
        "system-log",
        "partial",
        "Deployment logs reference CI/CD runners not listed in the inventory",
        "Les logs de déploiement référencent des runners CI/CD non listés dans l'inventaire",
        "Operations reveal dependencies that the inventory misses.",
        "Les opérations révèlent des dépendances que l'inventaire manque.",
      ),
      evidence(
        "meeting-minutes",
        "weak",
        "Architecture notes mention the omitted tools informally",
        "Les notes d'architecture mentionnent les outils omis de manière informelle",
        "Knowledge exists, but not in a controlled inventory process.",
        "La connaissance existe, mais pas dans un processus d'inventaire maîtrisé.",
      ),
    ],
    auditorNotice: t(
      "The organization cannot show complete visibility over the systems and services that support the in-scope environment.",
      "L'organisation ne peut pas montrer une visibilité complète sur les systèmes et services qui soutiennent l'environnement dans le périmètre.",
    ),
    evidenceAssessment: "partial",
    classification: "minor",
    why: t(
      "An inventory exists, so the control objective is recognized, but it is incomplete enough to weaken downstream risk, supplier, and evidence decisions. This supports a minor nonconformity.",
      "Un inventaire existe, donc l'objectif de contrôle est bien reconnu, mais il est assez incomplet pour fragiliser les décisions de risque, fournisseur et preuve en aval. Cela soutient une non-conformité mineure.",
    ),
    systemicSignal: t(
      "The issue affects several omitted components tied to the same service, suggesting a weak process for keeping the inventory aligned with change.",
      "Le sujet affecte plusieurs composants omis liés au même service, ce qui suggère un processus faible pour maintenir l'inventaire aligné sur les changements.",
    ),
    relatedClauses: ["8.1"],
    relatedControls: ["5.9", "5.12"],
    followUpQuestions: [
      t("How do new systems get added to the inventory after technical change?", "Comment les nouveaux systèmes sont-ils ajoutés à l'inventaire après un changement technique ?"),
      t("Which risk or control decisions may already be incomplete because these assets are missing?", "Quelles décisions de risque ou de contrôle peuvent déjà être incomplètes parce que ces actifs manquent ?"),
    ],
    recommendedCorrectiveAction: [
      t("Refresh the inventory against the real architecture and service dependencies.", "Rafraîchir l'inventaire par rapport à l'architecture réelle et aux dépendances de service."),
      t("Link inventory updates to the change-management flow.", "Relier les mises à jour d'inventaire au flux de gestion des changements."),
      t("Assign owners and review cadence for inventory completeness.", "Attribuer des responsables et une cadence de revue pour la complétude de l'inventaire."),
    ],
    goodResponse: t(
      "A strong response accepts that asset visibility must follow the operating model and then closes the gap through a controlled update process, not a one-time spreadsheet cleanup.",
      "Une bonne réponse accepte que la visibilité des actifs doit suivre le modèle opérationnel puis ferme l'écart via un processus de mise à jour maîtrisé, pas un nettoyage ponctuel de tableur.",
    ),
    weakResponse: t(
      "A weak response treats the omitted components as too technical or too minor to matter for the ISMS.",
      "Une réponse faible considère les composants omis comme trop techniques ou trop mineurs pour compter pour le SMSI.",
    ),
    phraseIds: ["scope-boundary", "process-not-evidenced"],
  },
  {
    id: "nc-supplier-review",
    title: t("Supplier security review is claimed, but no review records exist", "La revue sécurité fournisseur est revendiquée, mais aucune trace de revue n'existe"),
    businessContext: t(
      "A technology-enabled service provider depends on multiple third parties for hosting, support tooling, and payment processing.",
      "Un prestataire technologique dépend de plusieurs tiers pour l'hébergement, l'outillage support et le traitement des paiements.",
    ),
    scenario: t(
      "Supplier review is described in the policy, but there are no completed due diligence packs, no renewal reassessment records, and no formal risk decisions for sampled critical suppliers.",
      "La revue fournisseur est décrite dans la politique, mais il n'existe ni dossiers de due diligence complétés, ni traces de réévaluation au renouvellement, ni décisions formelles de risque pour les fournisseurs critiques échantillonnés.",
    ),
    evidenceAvailable: [
      evidence(
        "supplier-review-record",
        "absent",
        "No completed review records for sampled critical suppliers",
        "Aucune trace de revue complétée pour les fournisseurs critiques échantillonnés",
        "The process claim exists, but execution evidence does not.",
        "L'affirmation de processus existe, mais pas la preuve d'exécution.",
      ),
      evidence(
        "policy-standard",
        "sufficient",
        "Supplier security review procedure",
        "Procédure de revue sécurité fournisseur",
        "The organization knows what it intended to do.",
        "L'organisation sait ce qu'elle voulait faire.",
      ),
      evidence(
        "approval-record",
        "weak",
        "Purchase approvals without any visible security decision",
        "Validations d'achat sans décision sécurité visible",
        "Commercial approval is being mistaken for security review.",
        "Une validation commerciale est confondue avec une revue sécurité.",
      ),
    ],
    auditorNotice: t(
      "Supplier governance is being asserted but not demonstrated for dependencies that materially affect the scoped service.",
      "La gouvernance fournisseur est affirmée mais pas démontrée pour des dépendances qui affectent matériellement le service dans le périmètre.",
    ),
    evidenceAssessment: "absent",
    classification: "major",
    why: t(
      "The gap affects critical suppliers and there is no operating evidence that the claimed control is functioning. That creates a systemic weakness in how external dependencies are governed.",
      "L'écart affecte des fournisseurs critiques et aucune preuve opérationnelle ne montre que la mesure revendiquée fonctionne. Cela crée une faiblesse systémique dans la gouvernance des dépendances externes.",
    ),
    systemicSignal: t(
      "No sampled critical supplier had a review trail. This is not one missing file; it indicates that the supplier review process is not operating as claimed.",
      "Aucun fournisseur critique échantillonné n'avait de piste de revue. Ce n'est pas un simple dossier manquant ; cela indique que le processus de revue fournisseur ne fonctionne pas comme revendiqué.",
    ),
    relatedClauses: ["8.1", "6.1.3"],
    relatedControls: ["5.19", "5.20", "5.22"],
    followUpQuestions: [
      t("How do you decide a supplier is acceptable if there is no security review record?", "Comment décidez-vous qu'un fournisseur est acceptable s'il n'existe aucune trace de revue sécurité ?"),
      t("Which suppliers are considered critical to the scoped service today?", "Quels fournisseurs sont considérés comme critiques pour le service dans le périmètre aujourd'hui ?"),
    ],
    recommendedCorrectiveAction: [
      t("Identify critical suppliers and define review criteria based on service and risk exposure.", "Identifier les fournisseurs critiques et définir des critères de revue basés sur le service et l'exposition au risque."),
      t("Execute initial and renewal reviews with retained evidence and approval decisions.", "Exécuter les revues initiales et de renouvellement avec conservation des preuves et des décisions d'approbation."),
      t("Feed supplier review outcomes into the risk register and SoA where relevant.", "Alimenter le registre de risques et la SoA avec les sorties de revue fournisseur lorsque c'est pertinent."),
    ],
    goodResponse: t(
      "A strong response accepts that policy without review records is not enough, then focuses on standing up a real supplier-governance workflow for critical suppliers first.",
      "Une bonne réponse accepte qu'une politique sans traces de revue ne suffit pas, puis se concentre sur la mise en place d'un vrai workflow de gouvernance fournisseur en commençant par les fournisseurs critiques.",
    ),
    weakResponse: t(
      "A weak response says that large well-known suppliers are already secure and therefore do not require internal review evidence.",
      "Une réponse faible affirme que les grands fournisseurs bien connus sont déjà sûrs et ne nécessitent donc pas de preuve interne de revue.",
    ),
    phraseIds: ["ask-for-sampled-evidence", "systemic-vs-isolated"],
  },
  {
    id: "nc-incident-process",
    title: t("The incident process exists, but incidents were not logged or escalated as defined", "Le processus d'incident existe, mais les incidents n'ont pas été enregistrés ni escaladés comme défini"),
    businessContext: t(
      "A fintech startup has documented incident handling to reassure customers and investors.",
      "Une startup fintech a documenté la gestion d'incident pour rassurer clients et investisseurs.",
    ),
    scenario: t(
      "A phishing event was handled in Slack, the affected mailbox was reset, and the issue was considered closed. No incident ticket, no severity assignment, and no lesson-learned record were created.",
      "Un événement de phishing a été traité dans Slack, la boîte mail concernée a été réinitialisée et le sujet a été considéré clos. Aucun ticket d'incident, aucune sévérité, aucun retour d'expérience n'ont été créés.",
    ),
    evidenceAvailable: [
      evidence(
        "incident-record",
        "absent",
        "No incident ticket or formal record for the sampled event",
        "Aucun ticket d'incident ni enregistrement formel pour l'événement échantillonné",
        "The documented process was bypassed in practice.",
        "Le processus documenté a été contourné dans la pratique.",
      ),
      evidence(
        "policy-standard",
        "sufficient",
        "Documented incident response workflow",
        "Workflow documenté de réponse à incident",
        "The intended process is clear on paper.",
        "Le processus visé est clair sur le papier.",
      ),
      evidence(
        "system-log",
        "partial",
        "Mail-security logs showing the event occurred",
        "Logs de sécurité mail montrant que l'événement a eu lieu",
        "Operational evidence exists, but not the governance trail around response.",
        "Une preuve opérationnelle existe, mais pas la piste de gouvernance autour de la réponse.",
      ),
    ],
    auditorNotice: t(
      "The organization can describe the process, but the sampled incident shows that real execution may still depend on informal habits.",
      "L'organisation peut décrire le processus, mais l'incident échantillonné montre que l'exécution réelle peut encore dépendre d'habitudes informelles.",
    ),
    evidenceAssessment: "partial",
    classification: "minor",
    why: t(
      "The process exists and people responded, so this is not total absence. However, the bypassed logging and escalation trail weakens confidence in consistent operational control and supports a minor nonconformity.",
      "Le processus existe et les personnes ont réagi ; ce n'est donc pas une absence totale. Cependant, l'absence de piste d'enregistrement et d'escalade affaiblit la confiance dans la maîtrise opérationnelle cohérente et soutient une non-conformité mineure.",
    ),
    systemicSignal: t(
      "One sample alone is not enough to prove full system collapse, but the reliance on informal channels suggests the issue may extend beyond one event.",
      "Un seul échantillon ne suffit pas à prouver un effondrement complet du système, mais la dépendance à des canaux informels suggère que le sujet peut dépasser un seul événement.",
    ),
    relatedClauses: ["8.1"],
    relatedControls: ["5.24", "5.25", "5.27"],
    followUpQuestions: [
      t("How do you know future incidents will be logged and escalated formally rather than in chat?", "Comment savez-vous que les incidents futurs seront enregistrés et escaladés formellement plutôt que dans le chat ?"),
      t("Where are lesson-learned outputs captured for management review or improvement?", "Où sont capturés les retours d'expérience pour la revue de direction ou l'amélioration ?"),
    ],
    recommendedCorrectiveAction: [
      t("Require formal incident logging for the defined event categories.", "Exiger un enregistrement formel des incidents pour les catégories d'événements définies."),
      t("Train responders and managers on the expected escalation path.", "Former les intervenants et managers sur le circuit d'escalade attendu."),
      t("Review recent incidents to confirm whether the weakness is broader than one case.", "Revoir les incidents récents pour confirmer si la faiblesse dépasse un seul cas."),
    ],
    goodResponse: t(
      "A strong response treats the sampled event as evidence of a workflow weakness, then checks whether other incidents show the same pattern before claiming the issue is isolated.",
      "Une bonne réponse traite l'événement échantillonné comme la preuve d'une faiblesse de workflow, puis vérifie si d'autres incidents montrent le même schéma avant d'affirmer que le sujet est isolé.",
    ),
    weakResponse: t(
      "A weak response says the team solved the problem quickly, so documentation was unnecessary.",
      "Une réponse faible affirme que l'équipe a résolu le problème rapidement et que la documentation était donc inutile.",
    ),
    phraseIds: ["process-not-evidenced", "ask-for-sampled-evidence"],
  },
  {
    id: "nc-restore-test",
    title: t("The backup process exists, but restore testing evidence is missing", "Le processus de sauvegarde existe, mais la preuve de test de restauration manque"),
    businessContext: t(
      "A payroll processor relies on nightly backups to support customer continuity commitments.",
      "Un prestataire paie s'appuie sur des sauvegardes nocturnes pour soutenir ses engagements de continuité client.",
    ),
    scenario: t(
      "Monitoring shows backup jobs completing successfully, but there is no restore test report for the ERP or customer database in the last 14 months and no documented learning from any exercise.",
      "La supervision montre que les jobs de sauvegarde se terminent correctement, mais il n'existe aucun rapport de test de restauration pour l'ERP ou la base client sur les 14 derniers mois, ni aucun apprentissage documenté issu d'un exercice.",
    ),
    evidenceAvailable: [
      evidence(
        "system-log",
        "sufficient",
        "Nightly backup-job success reports",
        "Rapports de réussite des jobs de sauvegarde nocturnes",
        "There is good evidence that backups run regularly.",
        "Il existe une bonne preuve que les sauvegardes tournent régulièrement.",
      ),
      evidence(
        "restore-test-evidence",
        "absent",
        "No recent restore test record for sampled critical systems",
        "Aucune trace récente de test de restauration pour les systèmes critiques échantillonnés",
        "Recoverability is being assumed rather than demonstrated.",
        "La restaurabilité est supposée plutôt que démontrée.",
      ),
      evidence(
        "meeting-minutes",
        "weak",
        "Continuity meeting notes mention testing as a future action",
        "Les notes de réunion continuité mentionnent les tests comme une action future",
        "Awareness exists, but not a current evidence trail.",
        "La conscience du sujet existe, mais pas la piste de preuve actuelle.",
      ),
    ],
    auditorNotice: t(
      "The organization can prove backup activity, but not recoverability for sampled critical systems.",
      "L'organisation peut prouver l'activité de sauvegarde, mais pas la restaurabilité des systèmes critiques échantillonnés.",
    ),
    evidenceAssessment: "partial",
    classification: "minor",
    why: t(
      "The control design is in place and backups run, but a key element of effectiveness evidence is missing. This is typically a minor nonconformity rather than total absence of control.",
      "La conception du contrôle est en place et les sauvegardes tournent, mais un élément clé de preuve d'efficacité manque. Il s'agit typiquement d'une non-conformité mineure plutôt que d'une absence totale de contrôle.",
    ),
    systemicSignal: t(
      "The missing restore evidence affects more than one critical system and one period, which suggests a recurring execution gap rather than a single paperwork miss.",
      "L'absence de preuve de restauration affecte plus d'un système critique et plus d'une période, ce qui suggère un écart récurrent d'exécution plutôt qu'un simple oubli documentaire.",
    ),
    relatedClauses: ["8.1"],
    relatedControls: ["8.13", "5.30"],
    followUpQuestions: [
      t("Which critical systems have been restored successfully in the last year and where is that evidence?", "Quels systèmes critiques ont été restaurés avec succès l'an dernier et où est la preuve ?"),
      t("What did the organization learn from the most recent continuity exercise?", "Qu'a appris l'organisation du dernier exercice de continuité ?"),
    ],
    recommendedCorrectiveAction: [
      t("Plan and execute restore tests for sampled critical systems.", "Planifier et exécuter des tests de restauration pour les systèmes critiques échantillonnés."),
      t("Document scope, timing, outcome, and follow-up actions for each exercise.", "Documenter le périmètre, le timing, le résultat et les actions de suivi pour chaque exercice."),
      t("Integrate restore testing into the continuity review cadence.", "Intégrer les tests de restauration à la cadence de revue de continuité."),
    ],
    goodResponse: t(
      "A strong response distinguishes backup-job evidence from restore-test evidence and commits to proving recoverability rather than defending job success alone.",
      "Une bonne réponse distingue la preuve de job de sauvegarde de la preuve de test de restauration et s'engage à démontrer la restaurabilité plutôt qu'à défendre la seule réussite des jobs.",
    ),
    weakResponse: t(
      "A weak response says backups are obviously fine because the monitoring dashboard is green.",
      "Une réponse faible affirme que les sauvegardes vont évidemment bien parce que le tableau de supervision est vert.",
    ),
    phraseIds: ["restore-test-missing", "ask-for-sampled-evidence"],
  },
  {
    id: "nc-awareness-evidence",
    title: t("The awareness programme exists, but attendance and effectiveness evidence is weak", "Le programme de sensibilisation existe, mais la preuve de présence et d'efficacité est faible"),
    businessContext: t(
      "An insurance broker runs annual security awareness for office and remote sales populations.",
      "Un courtier en assurance réalise une sensibilisation sécurité annuelle pour les équipes bureau et les commerciaux distants.",
    ),
    scenario: t(
      "The awareness deck exists and office attendance is tracked, but remote sales populations are missing from the attendance data and no quiz, phishing, or effectiveness indicator is available.",
      "Le support de sensibilisation existe et la présence des équipes bureau est suivie, mais les populations commerciales distantes manquent des données de présence et aucun quiz, test de phishing ni indicateur d'efficacité n'est disponible.",
    ),
    evidenceAvailable: [
      evidence(
        "training-attendance",
        "weak",
        "Attendance list covers only part of the target population",
        "La liste de présence ne couvre qu'une partie de la population cible",
        "Completion is not visible for everyone in scope.",
        "La réalisation n'est pas visible pour toute la population dans le périmètre.",
      ),
      evidence(
        "policy-standard",
        "sufficient",
        "Documented annual awareness programme",
        "Programme annuel de sensibilisation documenté",
        "The programme exists and has assigned timing.",
        "Le programme existe et une cadence lui est affectée.",
      ),
      evidence(
        "meeting-minutes",
        "weak",
        "No review of training effectiveness in governance notes",
        "Aucune revue de l'efficacité de la formation dans les notes de gouvernance",
        "Completion may be tracked partially, but effectiveness is not being challenged.",
        "La réalisation est peut-être partiellement suivie, mais l'efficacité n'est pas challengée.",
      ),
    ],
    auditorNotice: t(
      "The programme exists, but the organization cannot yet show complete reach or whether the learning changed behavior.",
      "Le programme existe, mais l'organisation ne peut pas encore montrer une couverture complète ni si l'apprentissage a changé les comportements.",
    ),
    evidenceAssessment: "weak",
    classification: "observation",
    why: t(
      "There is evidence of an awareness programme, but the coverage and effectiveness model should be strengthened before the weakness grows into a broader control failure. This fits an observation in many audits.",
      "Il existe des preuves d'un programme de sensibilisation, mais le modèle de couverture et d'efficacité doit être renforcé avant que la faiblesse ne devienne une défaillance plus large. Cela correspond souvent à une observation en audit.",
    ),
    systemicSignal: t(
      "The weakness is visible across some populations, but there is still meaningful programme activity. The issue is better described as an improvement opportunity than as full nonconformity at this stage.",
      "La faiblesse est visible sur certaines populations, mais il existe encore une activité réelle de programme. Le sujet se décrit mieux comme une opportunité d'amélioration que comme une non-conformité pleine à ce stade.",
    ),
    relatedClauses: ["7.2", "7.3"],
    relatedControls: ["6.3"],
    followUpQuestions: [
      t("How do you confirm completion for remote populations?", "Comment confirmez-vous la réalisation pour les populations distantes ?"),
      t("How do you know the programme improved awareness rather than only attendance?", "Comment savez-vous que le programme a amélioré la sensibilisation plutôt que seulement la présence ?"),
    ],
    recommendedCorrectiveAction: [
      t("Expand attendance capture to all target populations.", "Étendre la capture de présence à toutes les populations cibles."),
      t("Add a light effectiveness measure such as quiz results or phishing outcomes.", "Ajouter une mesure simple d'efficacité comme les résultats de quiz ou de phishing."),
      t("Review awareness outcomes in governance rather than tracking completion alone.", "Revoir les résultats de sensibilisation en gouvernance plutôt que de suivre seulement la réalisation."),
    ],
    goodResponse: t(
      "A strong response accepts that awareness is not only about content delivery and commits to closing both the population-coverage and effectiveness gaps.",
      "Une bonne réponse accepte que la sensibilisation ne se limite pas à la diffusion d'un contenu et s'engage à fermer à la fois les écarts de couverture de population et d'efficacité.",
    ),
    weakResponse: t(
      "A weak response says the policy exists and therefore the awareness control should be considered complete.",
      "Une réponse faible affirme que la politique existe et que la mesure de sensibilisation doit donc être considérée comme complète.",
    ),
    phraseIds: ["control-partial", "evidence-sampled-period"],
  },
  {
    id: "nc-capa-closure",
    title: t("Corrective actions are raised, but not tracked to closure", "Les actions correctives sont ouvertes, mais pas suivies jusqu'à la clôture"),
    businessContext: t(
      "An organization uses internal audits and reviews, but struggles to keep improvement work visible across teams.",
      "Une organisation utilise audits internes et revues, mais peine à rendre visible le travail d'amélioration entre équipes.",
    ),
    scenario: t(
      "A corrective-action tracker exists with owners, but several items have no due date, no verification note, and the same access-review issue appears again in a later audit sample.",
      "Un suivi d'actions correctives existe avec des responsables, mais plusieurs éléments n'ont ni date d'échéance, ni note de vérification, et le même sujet de revue d'accès réapparaît dans un échantillon d'audit ultérieur.",
    ),
    evidenceAvailable: [
      evidence(
        "ticket-workflow",
        "partial",
        "Tracker with open items but weak closure evidence",
        "Suivi avec éléments ouverts mais preuve de clôture faible",
        "Actions are being recorded, but not fully controlled through completion.",
        "Les actions sont enregistrées, mais pas entièrement maîtrisées jusqu'à leur réalisation.",
      ),
      evidence(
        "internal-audit-report",
        "partial",
        "Repeated finding visible across audit cycles",
        "Constat récurrent visible sur plusieurs cycles d'audit",
        "Recurrence suggests closure discipline is weak.",
        "La récurrence suggère que la discipline de clôture est faible.",
      ),
      evidence(
        "approval-record",
        "weak",
        "No clear sign-off on completed actions",
        "Pas de validation claire des actions terminées",
        "The organization cannot show who verified effectiveness.",
        "L'organisation ne peut pas montrer qui a vérifié l'efficacité.",
      ),
    ],
    auditorNotice: t(
      "The organization raises actions, but the management-system loop from finding to verified improvement is not reliably closed.",
      "L'organisation ouvre des actions, mais la boucle de système de management allant du constat à l'amélioration vérifiée n'est pas clôturée de manière fiable.",
    ),
    evidenceAssessment: "partial",
    classification: "minor",
    why: t(
      "Corrective-action management exists, but verification and closure evidence are weak enough to reduce confidence in Clause 10 effectiveness. This supports a minor nonconformity.",
      "La gestion des actions correctives existe, mais la vérification et la preuve de clôture sont assez faibles pour réduire la confiance dans l'efficacité de la clause 10. Cela soutient une non-conformité mineure.",
    ),
    systemicSignal: t(
      "The recurrence of the same issue across audit cycles suggests the weakness is broader than one overdue task.",
      "La récurrence du même sujet sur plusieurs cycles d'audit suggère que la faiblesse dépasse une simple tâche en retard.",
    ),
    relatedClauses: ["10.1", "10.2"],
    relatedControls: ["5.35"],
    followUpQuestions: [
      t("Who verifies that an action really addressed the root cause before closure?", "Qui vérifie qu'une action a réellement traité la cause racine avant clôture ?"),
      t("Why did the same issue reappear if the previous action had been marked complete?", "Pourquoi le même sujet a-t-il réapparu si l'action précédente avait été marquée comme terminée ?"),
    ],
    recommendedCorrectiveAction: [
      t("Define mandatory closure evidence and verification criteria.", "Définir une preuve de clôture obligatoire et des critères de vérification."),
      t("Add due dates, escalation, and ageing review for open actions.", "Ajouter dates d'échéance, escalade et revue d'ancienneté des actions ouvertes."),
      t("Check repeated issues for weak root-cause analysis.", "Examiner les sujets récurrents sous l'angle d'une analyse de cause racine insuffisante."),
    ],
    goodResponse: t(
      "A strong response focuses on root cause, verification, and recurrence prevention rather than only updating the tracker status field.",
      "Une bonne réponse se concentre sur la cause racine, la vérification et la prévention de récurrence au lieu de simplement mettre à jour le statut dans le suivi.",
    ),
    weakResponse: t(
      "A weak response closes overdue actions administratively because the responsible person says the issue is 'handled'.",
      "Une réponse faible clôture administrativement les actions en retard parce que le responsable dit que le sujet est « traité ».",
    ),
    phraseIds: ["good-corrective-action", "systemic-vs-isolated"],
  },
  {
    id: "nc-risk-treatment-traceability",
    title: t("The risk register exists, but treatment decisions are not traceable", "Le registre des risques existe, mais les décisions de traitement ne sont pas traçables"),
    businessContext: t(
      "A manufacturing group has spent time on risk scoring but less time on formalizing treatment logic.",
      "Un groupe industriel a consacré du temps à la notation des risques mais moins à la formalisation de la logique de traitement.",
    ),
    scenario: t(
      "The register lists dozens of scored risks, but the treatment column contains phrases such as 'handled' or 'monitor', with no decision owner, no target date, no residual-risk view, and no link to selected controls.",
      "Le registre liste des dizaines de risques scorés, mais la colonne de traitement contient des mentions comme « traité » ou « surveiller », sans responsable de décision, sans date cible, sans vue du risque résiduel et sans lien vers les mesures sélectionnées.",
    ),
    evidenceAvailable: [
      evidence(
        "risk-register",
        "weak",
        "Scored register with shallow treatment wording",
        "Registre scoré avec wording de traitement superficiel",
        "Assessment exists, but treatment logic is not decision-grade.",
        "L'évaluation existe, mais la logique de traitement n'est pas au niveau attendu pour une décision.",
      ),
      evidence(
        "soa",
        "partial",
        "Some control decisions exist, but not linked back to register items",
        "Certaines décisions de mesures existent, mais sans lien retour vers les entrées du registre",
        "The bridge between risk and controls is weak.",
        "Le pont entre risque et mesures est faible.",
      ),
      evidence(
        "approval-record",
        "absent",
        "No visible approval of individual treatment decisions",
        "Aucune approbation visible des décisions individuelles de traitement",
        "Decision authority is not evidenced.",
        "L'autorité de décision n'est pas démontrée.",
      ),
    ],
    auditorNotice: t(
      "The organization can show assessed risk, but not how assessment became owned treatment decisions that drive implementation.",
      "L'organisation peut montrer un risque évalué, mais pas comment cette évaluation est devenue des décisions de traitement portées et pilotant la mise en oeuvre.",
    ),
    evidenceAssessment: "weak",
    classification: "major",
    why: t(
      "When treatment decisions are not traceable, the ISMS loses the decision pathway between risk assessment, control selection, and implementation. This is a core planning weakness.",
      "Lorsque les décisions de traitement ne sont pas traçables, le SMSI perd la chaîne de décision entre analyse de risque, sélection des mesures et mise en oeuvre. Il s'agit d'une faiblesse centrale de planification.",
    ),
    systemicSignal: t(
      "The weakness affects the entire register structure and its linkage to controls, not one badly filled cell.",
      "La faiblesse affecte toute la structure du registre et son lien vers les mesures, pas une seule cellule mal remplie.",
    ),
    relatedClauses: ["6.1.3", "6.1.4"],
    relatedControls: ["5.7", "8.8"],
    followUpQuestions: [
      t("Who approved the treatment path for this high-priority risk?", "Qui a approuvé le choix de traitement pour ce risque prioritaire ?"),
      t("Which control or project shows that this treatment decision is being implemented?", "Quelle mesure ou quel projet montre que cette décision de traitement est en cours de mise en oeuvre ?"),
    ],
    recommendedCorrectiveAction: [
      t("Define mandatory fields for treatment owner, decision, due date, and control linkage.", "Définir des champs obligatoires pour le responsable de traitement, la décision, l'échéance et le lien vers les mesures."),
      t("Link high-priority risks to SoA positions and implementation actions.", "Relier les risques prioritaires aux positions SoA et aux actions de mise en oeuvre."),
      t("Approve treatment decisions through a visible governance step.", "Approuver les décisions de traitement via une étape de gouvernance visible."),
    ],
    goodResponse: t(
      "A strong response treats the register as a decision system, not a scoring archive, and rebuilds treatment traceability accordingly.",
      "Une bonne réponse traite le registre comme un système de décision, pas comme une archive de scores, et reconstruit la traçabilité du traitement en conséquence.",
    ),
    weakResponse: t(
      "A weak response argues that the scoring column is the important part and that treatment wording can stay informal.",
      "Une réponse faible affirme que seule la colonne de score compte et que le wording de traitement peut rester informel.",
    ),
    phraseIds: ["risk-not-traceable", "soa-too-generic"],
  },
  {
    id: "nc-change-management",
    title: t("Change management exists informally, but not consistently in the system of record", "La gestion des changements existe de manière informelle, mais pas de façon cohérente dans le système de référence"),
    businessContext: t(
      "A fast-moving engineering team ships often and relies on chat and shared calendars to coordinate production changes.",
      "Une équipe engineering très rapide déploie fréquemment et s'appuie sur le chat et des calendriers partagés pour coordonner les changements en production.",
    ),
    scenario: t(
      "Major releases usually have tickets, but emergency changes and higher-risk operational changes are often approved in chat with no durable approval or rollback evidence attached to the formal workflow.",
      "Les versions majeures ont généralement des tickets, mais les changements urgents et certains changements opérationnels à risque sont souvent approuvés dans le chat sans preuve durable d'approbation ni de rollback rattachée au workflow formel.",
    ),
    evidenceAvailable: [
      evidence(
        "ticket-workflow",
        "partial",
        "Formal change tickets for standard releases",
        "Tickets de changement formels pour les versions standard",
        "The process exists for planned work, but not consistently for higher-pressure cases.",
        "Le processus existe pour les travaux planifiés, mais pas de manière cohérente pour les cas sous pression.",
      ),
      evidence(
        "approval-record",
        "weak",
        "Chat approvals for emergency changes",
        "Approbations dans le chat pour les changements urgents",
        "Approval exists informally, but the audit trail is weak.",
        "L'approbation existe de manière informelle, mais la piste d'audit est faible.",
      ),
      evidence(
        "meeting-minutes",
        "partial",
        "Post-release reviews note rushed changes but do not link them back to workflow gaps",
        "Les revues post-release notent des changements précipités sans les relier aux lacunes de workflow",
        "The weakness is noticed, but not controlled.",
        "La faiblesse est remarquée, mais pas maîtrisée.",
      ),
    ],
    auditorNotice: t(
      "The organization has a change process, but its discipline weakens precisely when risk is highest.",
      "L'organisation dispose d'un processus de changement, mais sa discipline s'affaiblit précisément lorsque le risque est le plus élevé.",
    ),
    evidenceAssessment: "partial",
    classification: "minor",
    why: t(
      "The process exists and is used in part of the sample, but high-risk cases are not consistently controlled or evidenced. This is a classic minor nonconformity pattern.",
      "Le processus existe et est utilisé sur une partie de l'échantillon, mais les cas à haut risque ne sont pas maîtrisés ni démontrés de manière cohérente. C'est un schéma classique de non-conformité mineure.",
    ),
    systemicSignal: t(
      "The issue appears when speed and pressure increase, which suggests a recurring control-design or discipline weakness rather than one forgotten ticket.",
      "Le sujet apparaît lorsque la vitesse et la pression augmentent, ce qui suggère une faiblesse récurrente de conception ou de discipline du contrôle plutôt qu'un ticket oublié.",
    ),
    relatedClauses: ["8.1"],
    relatedControls: ["8.32"],
    followUpQuestions: [
      t("How are emergency changes approved and evidenced today?", "Comment les changements urgents sont-ils approuvés et démontrés aujourd'hui ?"),
      t("Where is rollback readiness or post-change review captured for higher-risk changes?", "Où la préparation au rollback ou la revue post-changement est-elle capturée pour les changements à plus haut risque ?"),
    ],
    recommendedCorrectiveAction: [
      t("Bring emergency and high-risk changes into the formal workflow with minimum mandatory fields.", "Faire entrer les changements urgents et à haut risque dans le workflow formel avec un minimum de champs obligatoires."),
      t("Retain approval and rollback evidence in the system of record.", "Conserver la preuve d'approbation et de rollback dans le système de référence."),
      t("Review recent emergency changes to see whether the weakness is broader than sampled cases.", "Revoir les changements urgents récents pour voir si la faiblesse dépasse les cas échantillonnés."),
    ],
    goodResponse: t(
      "A strong response recognizes that high-pressure changes need the strongest evidence discipline, not the weakest, and adjusts the workflow accordingly.",
      "Une bonne réponse reconnaît que les changements sous pression ont besoin de la discipline de preuve la plus forte, pas la plus faible, et ajuste le workflow en conséquence.",
    ),
    weakResponse: t(
      "A weak response says documenting emergency changes would slow the team down too much.",
      "Une réponse faible dit que documenter les changements urgents ralentirait trop l'équipe.",
    ),
    phraseIds: ["control-partial", "process-not-evidenced"],
  },
  {
    id: "nc-policy-outdated",
    title: t("The information security policy is outdated and misaligned with the current context", "La politique de sécurité de l'information est obsolète et désalignée du contexte actuel"),
    businessContext: t(
      "A company expanded through acquisition and moved to a cloud-first operating model during the certification cycle.",
      "Une entreprise s'est développée par acquisition et est passée à un modèle cloud-first pendant le cycle de certification.",
    ),
    scenario: t(
      "The policy still names a departed leader, describes a pre-acquisition scope, and has not been re-approved since major organizational and technical changes were introduced.",
      "La politique nomme encore un dirigeant parti, décrit un périmètre antérieur à l'acquisition et n'a pas été réapprouvée depuis que d'importants changements organisationnels et techniques ont été introduits.",
    ),
    evidenceAvailable: [
      evidence(
        "policy-standard",
        "weak",
        "Policy version approved before major scope and leadership changes",
        "Version de politique approuvée avant de grands changements de périmètre et de leadership",
        "The document exists, but no longer matches the operating reality.",
        "Le document existe, mais ne correspond plus à la réalité opérationnelle.",
      ),
      evidence(
        "approval-record",
        "absent",
        "No re-approval after the operating-model change",
        "Aucune réapprobation après le changement de modèle opérationnel",
        "Direction has not visibly reconfirmed policy direction.",
        "La direction n'a pas visiblement reconfirmé la direction de la politique.",
      ),
      evidence(
        "meeting-minutes",
        "partial",
        "Leadership discussions acknowledge change, but not policy refresh",
        "Les discussions de direction reconnaissent les changements, mais pas l'actualisation de la politique",
        "The gap is known, but not formally addressed.",
        "L'écart est connu, mais pas formellement traité.",
      ),
    ],
    auditorNotice: t(
      "The policy still exists, but it no longer represents the system leadership says it is governing.",
      "La politique existe toujours, mais elle ne représente plus le système que la direction dit piloter.",
    ),
    evidenceAssessment: "weak",
    classification: "minor",
    why: t(
      "There is still a policy and direction, so this is not total absence. However, the lack of refresh and approval after major change weakens confidence in leadership alignment and document control.",
      "Il existe encore une politique et une orientation ; ce n'est donc pas une absence totale. Cependant, l'absence d'actualisation et d'approbation après un changement majeur affaiblit la confiance dans l'alignement de la direction et la maîtrise documentaire.",
    ),
    systemicSignal: t(
      "The problem concerns one core policy artifact, not every clause mechanism, so it is important but not necessarily systemic across the full ISMS.",
      "Le problème concerne un artefact de politique central, pas tous les mécanismes de clause ; il est donc important sans être forcément systémique à l'ensemble du SMSI.",
    ),
    relatedClauses: ["5.2", "7.5"],
    relatedControls: ["5.1"],
    followUpQuestions: [
      t("When was leadership last asked to confirm the policy direction against the current context?", "Quand la direction a-t-elle été sollicitée pour confirmer la politique au regard du contexte actuel ?"),
      t("How do teams know which version is authoritative today?", "Comment les équipes savent-elles quelle version fait autorité aujourd'hui ?"),
    ],
    recommendedCorrectiveAction: [
      t("Refresh the policy to reflect the current scope, leadership structure, and operating model.", "Actualiser la politique pour refléter le périmètre, la structure de direction et le modèle opérationnel actuels."),
      t("Re-approve and communicate the refreshed policy.", "Réapprouver et communiquer la politique actualisée."),
      t("Tie future policy review to major organizational or scope changes.", "Lier les futures revues de politique aux changements majeurs d'organisation ou de périmètre."),
    ],
    goodResponse: t(
      "A strong response recognizes that policy credibility depends on current context and quickly refreshes both content and approval rather than defending the old version.",
      "Une bonne réponse reconnaît que la crédibilité de la politique dépend du contexte actuel et actualise rapidement le contenu comme l'approbation au lieu de défendre l'ancienne version.",
    ),
    weakResponse: t(
      "A weak response says the policy still expresses the same values, so a formal update is unnecessary.",
      "Une réponse faible dit que la politique exprime toujours les mêmes valeurs et qu'une mise à jour formelle est donc inutile.",
    ),
    phraseIds: ["control-partial", "mgmt-review-inputs"],
  },
  {
    id: "nc-objectives-not-measurable",
    title: t("Security objectives are stated but not measurable or monitored", "Les objectifs sécurité sont énoncés mais ni mesurables ni suivis"),
    businessContext: t(
      "A logistics company wants to show that its ISMS drives performance, not only documentation.",
      "Une entreprise logistique veut montrer que son SMSI pilote la performance, pas seulement la documentation.",
    ),
    scenario: t(
      "Objectives such as 'improve security culture' and 'strengthen resilience' are documented, but there are no measures, target values, review cadence, or owner accountability visible in the evidence trail.",
      "Des objectifs comme « améliorer la culture sécurité » et « renforcer la résilience » sont documentés, mais il n'existe ni mesures, ni valeurs cibles, ni cadence de revue, ni responsabilité visible dans la piste de preuve.",
    ),
    evidenceAvailable: [
      evidence(
        "policy-standard",
        "partial",
        "Objectives page with aspirational wording only",
        "Page d'objectifs avec un wording uniquement aspirational",
        "Objectives exist in theory, but not in measurable form.",
        "Les objectifs existent en théorie, mais pas sous une forme mesurable.",
      ),
      evidence(
        "management-review-minutes",
        "weak",
        "No trend review against objectives",
        "Aucune revue de tendance contre les objectifs",
        "Management review cannot show whether objectives are progressing.",
        "La revue de direction ne peut pas montrer si les objectifs progressent.",
      ),
      evidence(
        "approval-record",
        "partial",
        "Leadership endorsed the objectives list but not any metrics or target thresholds",
        "La direction a validé la liste d'objectifs, mais pas de métriques ni seuils cibles",
        "Direction approved aspiration, not measurement.",
        "La direction a validé l'intention, pas la mesure.",
      ),
    ],
    auditorNotice: t(
      "The organization can say what it wants, but not how it knows whether the ISMS is performing against those aims.",
      "L'organisation peut dire ce qu'elle veut, mais pas comment elle sait si le SMSI performe au regard de ces objectifs.",
    ),
    evidenceAssessment: "weak",
    classification: "minor",
    why: t(
      "The objective mechanism exists, but the lack of measurable monitoring weakens Clause 6.2 and downstream performance review. This is typically classified as minor when the rest of the system exists.",
      "Le mécanisme d'objectifs existe, mais l'absence de suivi mesurable affaiblit la clause 6.2 et la revue de performance en aval. Cela est typiquement classé mineur lorsque le reste du système existe.",
    ),
    systemicSignal: t(
      "The weakness is structural across the objective set rather than a single missing KPI.",
      "La faiblesse est structurelle sur l'ensemble des objectifs plutôt qu'un KPI isolé manquant.",
    ),
    relatedClauses: ["6.2", "9.1"],
    relatedControls: ["5.1"],
    followUpQuestions: [
      t("How do you know whether these objectives improved during the sampled period?", "Comment savez-vous si ces objectifs se sont améliorés pendant la période échantillonnée ?"),
      t("Who owns the target level and review cadence for each objective?", "Qui porte le niveau cible et la cadence de revue pour chaque objectif ?"),
    ],
    recommendedCorrectiveAction: [
      t("Add measurable indicators, targets, owners, and review cadence for each objective.", "Ajouter pour chaque objectif des indicateurs mesurables, des cibles, des responsables et une cadence de revue."),
      t("Review objective performance formally in management review.", "Revoir formellement la performance des objectifs en revue de direction."),
      t("Remove objectives that cannot be translated into decision-useful measures.", "Retirer les objectifs qui ne peuvent pas être traduits en mesures utiles à la décision."),
    ],
    goodResponse: t(
      "A strong response turns vague ambition into a small number of decision-useful metrics and shows where leadership will review them.",
      "Une bonne réponse transforme l'ambition vague en un petit nombre de métriques utiles à la décision et montre où la direction les reverra.",
    ),
    weakResponse: t(
      "A weak response argues that security objectives are naturally qualitative and therefore cannot be monitored in a meaningful way.",
      "Une réponse faible affirme que les objectifs sécurité sont naturellement qualitatifs et ne peuvent donc pas être suivis de manière utile.",
    ),
    phraseIds: ["mgmt-review-inputs", "why-iso27001"],
  },
  {
    id: "nc-roles-unclear",
    title: t("ISMS roles and responsibilities are unclear", "Les rôles et responsabilités du SMSI sont flous"),
    businessContext: t(
      "An early-stage AI platform has grown fast and formalized some security practices later than the business would like.",
      "Une plateforme IA en phase de croissance a grandi vite et a formalisé certaines pratiques sécurité plus tard qu'elle ne l'aurait souhaité.",
    ),
    scenario: t(
      "Teams disagree on who approves risk acceptance, who owns supplier reviews, and who is responsible for coordinating internal audits. Everyone says 'security handles it', but no formal responsibility record exists.",
      "Les équipes ne sont pas d'accord sur qui approuve l'acceptation du risque, qui porte les revues fournisseurs et qui coordonne les audits internes. Tout le monde dit que « la sécurité gère », mais aucun enregistrement formel de responsabilité n'existe.",
    ),
    evidenceAvailable: [
      evidence(
        "policy-standard",
        "weak",
        "Policy references leadership commitment but not clear role allocation",
        "La politique évoque l'engagement de la direction mais pas une répartition claire des rôles",
        "Direction is expressed, but responsibilities are not made operational.",
        "La direction est exprimée, mais les responsabilités ne sont pas rendues opérationnelles.",
      ),
      evidence(
        "approval-record",
        "absent",
        "No RACI or responsibility matrix approved",
        "Aucune matrice RACI ou de responsabilités approuvée",
        "Ownership is assumed rather than defined.",
        "La responsabilité est supposée plutôt que définie.",
      ),
      evidence(
        "meeting-minutes",
        "partial",
        "Repeated discussion on who should own specific ISMS tasks",
        "Discussions répétées sur qui devrait porter certaines tâches SMSI",
        "The ambiguity is visible in practice.",
        "L'ambiguïté est visible dans la pratique.",
      ),
    ],
    auditorNotice: t(
      "The system may have committed individuals, but it lacks a clear ownership model for core ISMS decisions and activities.",
      "Le système dispose peut-être de personnes engagées, mais il manque d'un modèle clair de responsabilité pour les décisions et activités centrales du SMSI.",
    ),
    evidenceAssessment: "weak",
    classification: "minor",
    why: t(
      "Responsibility ambiguity weakens leadership and support clauses, but the rest of the system may still exist. This is usually a minor nonconformity unless it has already caused widespread breakdown.",
      "L'ambiguïté des responsabilités affaiblit les clauses de direction et de support, mais le reste du système peut tout de même exister. C'est généralement une non-conformité mineure sauf si cela a déjà causé une rupture généralisée.",
    ),
    systemicSignal: t(
      "The ambiguity affects several recurring decisions, which makes the issue structurally important even if the system still functions around it.",
      "L'ambiguïté affecte plusieurs décisions récurrentes, ce qui rend le sujet structurellement important même si le système continue de fonctionner autour de lui.",
    ),
    relatedClauses: ["5.3", "7.1"],
    relatedControls: ["5.1"],
    followUpQuestions: [
      t("Who is accountable for approving residual-risk acceptance today?", "Qui est responsable d'approuver l'acceptation du risque résiduel aujourd'hui ?"),
      t("Where are ISMS roles and responsibilities formally communicated?", "Où les rôles et responsabilités SMSI sont-ils formellement communiqués ?"),
    ],
    recommendedCorrectiveAction: [
      t("Define and approve role ownership for key ISMS decisions and activities.", "Définir et approuver la responsabilité des décisions et activités SMSI clés."),
      t("Communicate the responsibility model to process owners and leadership.", "Communiquer le modèle de responsabilité aux responsables de processus et à la direction."),
      t("Use internal audit or review to test whether the assigned roles are working in practice.", "Utiliser l'audit interne ou la revue pour tester si les rôles attribués fonctionnent dans la pratique."),
    ],
    goodResponse: t(
      "A strong response clarifies decision ownership quickly and makes it visible enough that different teams answer consistently when asked.",
      "Une bonne réponse clarifie rapidement la propriété des décisions et la rend suffisamment visible pour que différentes équipes répondent de manière cohérente lorsqu'on les interroge.",
    ),
    weakResponse: t(
      "A weak response says everyone collaborates anyway, so formal ownership is not necessary.",
      "Une réponse faible dit que tout le monde collabore de toute façon et que la formalisation des responsabilités n'est pas nécessaire.",
    ),
    phraseIds: ["why-iso27001", "good-corrective-action"],
  },
  {
    id: "nc-requirements-register",
    title: t("The legal and contractual requirements register is outdated", "Le registre des exigences légales et contractuelles est obsolète"),
    businessContext: t(
      "A French BPO serves EU clients with evolving contract clauses and incident-reporting expectations.",
      "Un BPO français sert des clients européens avec des clauses contractuelles et des attentes de notification d'incident qui évoluent.",
    ),
    scenario: t(
      "The obligations register omits newer customer logging clauses, a revised incident-notification expectation, and an updated internal privacy escalation requirement tied to French regulatory practice.",
      "Le registre des obligations omet de nouvelles clauses clients sur la journalisation, une exigence révisée de notification d'incident et une règle interne mise à jour d'escalade liée à la pratique réglementaire française.",
    ),
    evidenceAvailable: [
      evidence(
        "policy-standard",
        "partial",
        "Requirements register last updated before recent contract changes",
        "Registre des exigences mis à jour avant les récents changements contractuels",
        "The register exists but has fallen behind operational reality.",
        "Le registre existe mais a pris du retard sur la réalité opérationnelle.",
      ),
      evidence(
        "meeting-minutes",
        "weak",
        "Commercial reviews mention new commitments without formal ISMS update",
        "Les revues commerciales mentionnent de nouveaux engagements sans mise à jour formelle du SMSI",
        "The business knows requirements changed, but the ISMS record did not catch up.",
        "Le métier sait que les exigences ont changé, mais la trace SMSI n'a pas suivi.",
      ),
      evidence(
        "approval-record",
        "absent",
        "No ownership evidence for periodic requirements review",
        "Aucune preuve de responsabilité pour la revue périodique des exigences",
        "Review responsibility is not visible.",
        "La responsabilité de revue n'est pas visible.",
      ),
    ],
    auditorNotice: t(
      "The organization may understand obligations commercially, but it cannot show a controlled ISMS mechanism that keeps requirements current and actionable.",
      "L'organisation comprend peut-être ses obligations commercialement, mais elle ne peut pas montrer un mécanisme SMSI maîtrisé maintenant les exigences à jour et actionnables.",
    ),
    evidenceAssessment: "weak",
    classification: "minor",
    why: t(
      "The requirements mechanism exists, but the update discipline is weak enough to create risk in treatment, control, and evidence decisions. That typically supports a minor nonconformity.",
      "Le mécanisme d'exigences existe, mais la discipline de mise à jour est assez faible pour créer un risque dans les décisions de traitement, de mesure et de preuve. Cela soutient typiquement une non-conformité mineure.",
    ),
    systemicSignal: t(
      "Several changed obligations were missed, which indicates a recurring maintenance weakness rather than one missed line item.",
      "Plusieurs obligations modifiées ont été manquées, ce qui indique une faiblesse récurrente de maintien plutôt qu'une simple ligne oubliée.",
    ),
    relatedClauses: ["4.2", "6.1.3"],
    relatedControls: ["5.31"],
    followUpQuestions: [
      t("Who reviews changed customer security obligations and how often?", "Qui revoit les évolutions des obligations de sécurité client et à quelle fréquence ?"),
      t("How are new obligations fed into risk treatment and control decisions?", "Comment les nouvelles obligations alimentent-elles le traitement du risque et les décisions de mesure ?"),
    ],
    recommendedCorrectiveAction: [
      t("Refresh the requirements register against current contracts and internal obligations.", "Mettre à jour le registre des exigences par rapport aux contrats actuels et obligations internes."),
      t("Assign ownership and review cadence for ongoing maintenance.", "Assigner une responsabilité et une cadence de revue pour le maintien continu."),
      t("Link changed requirements to risk, SoA, or operational actions where needed.", "Relier les exigences modifiées au risque, à la SoA ou aux actions opérationnelles lorsque nécessaire."),
    ],
    goodResponse: t(
      "A strong response treats the register as a live decision input and reconnects it to risk and control changes rather than filing it as a legal appendix.",
      "Une bonne réponse traite le registre comme un intrant vivant de décision et le reconnecte aux changements de risque et de mesures au lieu de le ranger comme une annexe juridique.",
    ),
    weakResponse: t(
      "A weak response says account managers know the customer expectations anyway, so formal maintenance of the register is not critical.",
      "Une réponse faible dit que les account managers connaissent de toute façon les attentes clients et que la maintenance formelle du registre n'est pas critique.",
    ),
    phraseIds: ["risk-not-traceable", "why-iso27001"],
  },
  {
    id: "nc-logging-review",
    title: t("Logging exists, but review evidence for privileged activity is inconsistent", "La journalisation existe, mais la preuve de revue des activités à privilèges est incohérente"),
    businessContext: t(
      "A cloud operations team retains central logs for privileged and production activity.",
      "Une équipe d'opérations cloud conserve des logs centralisés pour les activités à privilèges et de production.",
    ),
    scenario: t(
      "The SIEM collects admin events, but sampled months show only ad hoc notes of review, with no clear review cadence, no documented anomalies, and no evidence for one high-risk production change window.",
      "Le SIEM collecte les événements admin, mais les mois échantillonnés montrent seulement des notes ad hoc de revue, sans cadence claire, sans anomalies documentées et sans preuve pour une fenêtre de changement de production à haut risque.",
    ),
    evidenceAvailable: [
      evidence(
        "system-log",
        "sufficient",
        "Centralized privileged-activity logs",
        "Logs centralisés d'activité à privilèges",
        "The data source exists and appears technically robust.",
        "La source de données existe et semble techniquement robuste.",
      ),
      evidence(
        "meeting-minutes",
        "weak",
        "Ad hoc review notes with no owner or cadence",
        "Notes de revue ad hoc sans responsable ni cadence",
        "Review happens informally, not as a controlled activity.",
        "La revue a lieu de manière informelle, pas comme une activité maîtrisée.",
      ),
      evidence(
        "ticket-workflow",
        "partial",
        "One anomaly was investigated, but no consistent review record exists",
        "Une anomalie a été investiguée, mais aucune trace cohérente de revue n'existe",
        "Reactive evidence exists, proactive evidence is weaker.",
        "Une preuve réactive existe, la preuve proactive est plus faible.",
      ),
    ],
    auditorNotice: t(
      "The organization can prove log collection, but not a reliable review discipline for high-risk privileged activity.",
      "L'organisation peut prouver la collecte des logs, mais pas une discipline fiable de revue pour les activités à privilèges à haut risque.",
    ),
    evidenceAssessment: "weak",
    classification: "observation",
    why: t(
      "The control is clearly present and partly used, but the evidence model for consistent review is still maturing. This can credibly be framed as an observation if the rest of the logging process is stable.",
      "La mesure est clairement présente et partiellement utilisée, mais le modèle de preuve pour une revue cohérente est encore en maturation. Cela peut être formulé de manière crédible comme une observation si le reste du processus de journalisation est stable.",
    ),
    systemicSignal: t(
      "The weakness is visible in cadence and documentation, but not necessarily in the underlying technical control. That makes it more of a maturity issue than a control collapse.",
      "La faiblesse est visible dans la cadence et la documentation, mais pas nécessairement dans le contrôle technique sous-jacent. Cela en fait davantage un sujet de maturité qu'un effondrement de contrôle.",
    ),
    relatedClauses: ["8.1", "9.1"],
    relatedControls: ["8.15", "8.16"],
    followUpQuestions: [
      t("Who reviews privileged-activity logs, how often, and what evidence is retained?", "Qui revoit les logs d'activité à privilèges, à quelle fréquence et quelle preuve est conservée ?"),
      t("How do you know anomalies will be spotted in periods where no incident has yet been raised?", "Comment savez-vous que des anomalies seront détectées pendant les périodes où aucun incident n'a encore été signalé ?"),
    ],
    recommendedCorrectiveAction: [
      t("Define a documented review cadence and retained evidence for privileged-activity review.", "Définir une cadence de revue documentée et une preuve conservée pour la revue des activités à privilèges."),
      t("Add owner accountability and anomaly follow-up records.", "Ajouter une responsabilité nominative et des traces de suivi des anomalies."),
      t("Sample the last few months to confirm whether the weakness is wider than the audit sample.", "Échantillonner les derniers mois pour confirmer si la faiblesse dépasse l'échantillon d'audit."),
    ],
    goodResponse: t(
      "A strong response acknowledges that log existence and log review are not the same thing, then builds a sustainable review trail.",
      "Une bonne réponse reconnaît que l'existence des logs et leur revue sont deux choses différentes, puis construit une piste de revue durable.",
    ),
    weakResponse: t(
      "A weak response says the SIEM already stores everything, so review evidence is optional.",
      "Une réponse faible dit que le SIEM stocke déjà tout et que la preuve de revue est donc facultative.",
    ),
    phraseIds: ["process-not-evidenced", "ask-for-sampled-evidence"],
  },
];

export const evidenceReasoningDrills: EvidenceReasoningDrill[] = [
  {
    id: "drill-scope",
    title: t("Audit the scope boundary", "Auditer la frontière de périmètre"),
    context: t(
      "A managed services provider says only its French operations are in scope, but shared tooling and an overseas NOC support the same customer service.",
      "Un prestataire de services managés dit que seules ses opérations françaises sont dans le périmètre, mais un outillage partagé et un NOC à l'étranger soutiennent le même service client.",
    ),
    availableEvidence: [
      evidence(
        "policy-standard",
        "weak",
        "Broad scope statement with no interface detail",
        "Déclaration de périmètre large sans détail d'interface",
        "The boundary is named, but not made operational.",
        "La frontière est nommée, mais pas rendue opérationnelle.",
      ),
      evidence(
        "asset-inventory",
        "partial",
        "Inventory includes shared systems outside the written boundary",
        "L'inventaire inclut des systèmes partagés hors de la frontière écrite",
        "The operating estate looks wider than the statement.",
        "L'environnement opérationnel semble plus large que la déclaration.",
      ),
    ],
    nextEvidenceOptions: [
      { id: "supplier-review", label: t("Ask for the latest supplier review pack", "Demander le dernier dossier de revue fournisseur") },
      { id: "scope-approval", label: t("Ask for the approved scope rationale and interface decisions", "Demander le rationnel de périmètre approuvé et les décisions sur les interfaces") },
      { id: "training", label: t("Ask for awareness attendance records", "Demander les présences en sensibilisation") },
    ],
    correctNextEvidenceId: "scope-approval",
    sufficiency: "weak",
    systemicVerdict: "systemic",
    followUpOptions: [
      { id: "who-approved", label: t("Who approved this boundary despite the shared support model?", "Qui a approuvé cette frontière malgré le modèle de support partagé ?") },
      { id: "latest-phishing", label: t("What was the latest phishing incident?", "Quel a été le dernier incident de phishing ?") },
      { id: "backup-retention", label: t("What is the backup retention period?", "Quelle est la durée de rétention des sauvegardes ?") },
    ],
    correctFollowUpId: "who-approved",
    likelySeverity: "major",
    relatedClauses: ["4.3"],
    rationale: t(
      "The first gap is the credibility of the boundary itself. Before exploring controls further, the auditor needs the decision record that explains scope and interfaces.",
      "Le premier écart concerne la crédibilité de la frontière elle-même. Avant d'aller plus loin sur les mesures, l'auditeur a besoin de la trace de décision expliquant le périmètre et les interfaces.",
    ),
    phraseIds: ["scope-boundary", "systemic-vs-isolated"],
  },
  {
    id: "drill-management-review",
    title: t("Challenge management review evidence", "Challenger la preuve de revue de direction"),
    context: t(
      "Leadership says the quarterly steering committee is also the ISMS management review.",
      "La direction dit que le comité trimestriel sert aussi de revue de direction du SMSI.",
    ),
    availableEvidence: [
      evidence(
        "management-review-minutes",
        "partial",
        "Minutes cover budget and projects but not clear ISMS inputs",
        "Le compte rendu couvre budget et projets, mais pas des intrants SMSI clairement identifiables",
        "A leadership forum exists, but the required review content is incomplete.",
        "Une instance de direction existe, mais le contenu de revue requis est incomplet.",
      ),
      evidence(
        "internal-audit-report",
        "partial",
        "Internal audit report exists separately",
        "Un rapport d'audit interne existe séparément",
        "It is not visibly used in the leadership record.",
        "Il n'est pas visiblement utilisé dans la trace de direction.",
      ),
    ],
    nextEvidenceOptions: [
      { id: "agenda-inputs", label: t("Ask for the agenda and required-input mapping", "Demander l'agenda et la cartographie des intrants requis") },
      { id: "restore-test", label: t("Ask for the last restore test report", "Demander le dernier rapport de test de restauration") },
      { id: "badge-logs", label: t("Ask for physical badge logs", "Demander les logs de badges physiques") },
    ],
    correctNextEvidenceId: "agenda-inputs",
    sufficiency: "partial",
    systemicVerdict: "needs-more-sampling",
    followUpOptions: [
      { id: "which-decisions", label: t("Which ISMS decisions and resource actions came out of this review?", "Quelles décisions SMSI et actions de ressource sont sorties de cette revue ?") },
      { id: "when-soc2", label: t("When will the SOC 2 report be renewed?", "Quand le rapport SOC 2 sera-t-il renouvelé ?") },
      { id: "supplier-list", label: t("What are your top suppliers?", "Quels sont vos principaux fournisseurs ?") },
    ],
    correctFollowUpId: "which-decisions",
    likelySeverity: "minor",
    relatedClauses: ["9.3"],
    rationale: t(
      "The evidence suggests a real governance forum exists, but the auditor still needs proof that required ISMS inputs and decisions were covered. That usually points to partial evidence, not absence.",
      "La preuve suggère qu'une véritable instance de gouvernance existe, mais l'auditeur a encore besoin de démontrer que les intrants et décisions SMSI requis ont bien été couverts. Cela pointe généralement vers une preuve partielle, pas une absence.",
    ),
    phraseIds: ["mgmt-review-inputs", "ask-for-sampled-evidence"],
  },
  {
    id: "drill-restore",
    title: t("Separate backup activity from recoverability evidence", "Distinguer l'activité de sauvegarde de la preuve de restaurabilité"),
    context: t(
      "Backup dashboards are green for all sampled days, but no restore report is available for critical systems.",
      "Les tableaux de sauvegarde sont au vert tous les jours échantillonnés, mais aucun rapport de restauration n'est disponible pour les systèmes critiques.",
    ),
    availableEvidence: [
      evidence(
        "system-log",
        "sufficient",
        "Automated backup success logs",
        "Logs de réussite automatisée des sauvegardes",
        "These prove jobs ran, not that recovery is effective.",
        "Ils prouvent que les jobs ont tourné, pas que la reprise est efficace.",
      ),
      evidence(
        "restore-test-evidence",
        "absent",
        "No restore report for sampled critical services",
        "Aucun rapport de restauration pour les services critiques échantillonnés",
        "The effectiveness question remains open.",
        "La question d'efficacité reste ouverte.",
      ),
    ],
    nextEvidenceOptions: [
      { id: "restore-report", label: t("Ask for the last restore or recovery exercise report", "Demander le dernier rapport d'exercice de restauration ou de reprise") },
      { id: "policy", label: t("Ask for the backup policy only", "Demander uniquement la politique de sauvegarde") },
      { id: "training", label: t("Ask for training attendance records", "Demander les présences en formation") },
    ],
    correctNextEvidenceId: "restore-report",
    sufficiency: "partial",
    systemicVerdict: "systemic",
    followUpOptions: [
      { id: "what-learned", label: t("What was learned from the most recent restore exercise?", "Qu'a-t-on appris du dernier exercice de restauration ?") },
      { id: "who-ciso", label: t("Who is the CISO?", "Qui est le RSSI ?") },
      { id: "office-scope", label: t("Is payroll in scope?", "La paie est-elle dans le périmètre ?") },
    ],
    correctFollowUpId: "what-learned",
    likelySeverity: "minor",
    relatedClauses: ["8.1"],
    rationale: t(
      "The auditor already knows jobs run. The next evidence should test effectiveness. Missing restore evidence across critical systems usually signals a recurring weakness, not a single bad sample.",
      "L'auditeur sait déjà que les jobs tournent. La prochaine preuve doit tester l'efficacité. L'absence de preuve de restauration sur des systèmes critiques signale généralement une faiblesse récurrente, pas un simple mauvais échantillon.",
    ),
    phraseIds: ["restore-test-missing"],
  },
  {
    id: "drill-access-review",
    title: t("Judge evidence quality for access review", "Évaluer la qualité de preuve pour la revue d'accès"),
    context: t(
      "Core business systems have signed access reviews, but smaller support tools rely on verbal manager confirmations.",
      "Les systèmes métier centraux ont des revues d'accès signées, mais les petits outils support reposent sur des confirmations verbales des managers.",
    ),
    availableEvidence: [
      evidence(
        "access-review-record",
        "partial",
        "Formal review records for the largest systems",
        "Traces de revue formelles pour les plus gros systèmes",
        "The process works in part of the environment.",
        "Le processus fonctionne sur une partie de l'environnement.",
      ),
      evidence(
        "ticket-workflow",
        "weak",
        "No removal tickets for smaller tools",
        "Aucun ticket de suppression pour les petits outils",
        "Execution evidence is weak where governance is lighter.",
        "La preuve d'exécution est faible là où la gouvernance est plus légère.",
      ),
    ],
    nextEvidenceOptions: [
      { id: "support-tools", label: t("Ask for sampled review evidence for the smaller support tools", "Demander la preuve échantillonnée de revue pour les petits outils support") },
      { id: "marketing-deck", label: t("Ask for the sales security deck", "Demander le deck sécurité commercial") },
      { id: "scope-statement", label: t("Ask for the scope statement only", "Demander uniquement la déclaration de périmètre") },
    ],
    correctNextEvidenceId: "support-tools",
    sufficiency: "partial",
    systemicVerdict: "needs-more-sampling",
    followUpOptions: [
      { id: "how-detect", label: t("How do you detect missed reviews before the next quarter?", "Comment détectez-vous les revues manquées avant le trimestre suivant ?") },
      { id: "who-ceo", label: t("Who is the CEO?", "Qui est le CEO ?") },
      { id: "which-law", label: t("Which law applies here?", "Quelle loi s'applique ici ?") },
    ],
    correctFollowUpId: "how-detect",
    likelySeverity: "minor",
    relatedClauses: ["8.1"],
    rationale: t(
      "The auditor has enough to know the control exists, so the next move is to test the weak edge of the population. The evidence is partial rather than absent.",
      "L'auditeur a assez d'éléments pour savoir que le contrôle existe ; le mouvement suivant consiste donc à tester la partie faible de la population. La preuve est partielle plutôt qu'absente.",
    ),
    phraseIds: ["process-not-evidenced", "ask-for-sampled-evidence"],
  },
  {
    id: "drill-soa",
    title: t("Test SoA traceability", "Tester la traçabilité de la SoA"),
    context: t(
      "The SoA exists, but the rationales are broad and do not map cleanly to the treatment register.",
      "La SoA existe, mais les justifications sont larges et ne se rattachent pas proprement au registre de traitement.",
    ),
    availableEvidence: [
      evidence(
        "soa",
        "weak",
        "Generic rationales such as 'best practice'",
        "Justifications génériques du type « bonne pratique »",
        "The artifact exists, but the reasoning is shallow.",
        "L'artefact existe, mais le raisonnement est superficiel.",
      ),
      evidence(
        "risk-register",
        "partial",
        "Treatment actions exist but are not linked to control positions",
        "Des actions de traitement existent mais sans lien avec les positions de contrôle",
        "The bridge between risk and control choice is weak.",
        "Le pont entre risque et choix de mesure est faible.",
      ),
    ],
    nextEvidenceOptions: [
      { id: "trace-link", label: t("Ask for one sampled trace from risk to treatment to SoA decision", "Demander une trace échantillonnée du risque vers le traitement puis la décision SoA") },
      { id: "visitor-log", label: t("Ask for visitor logs", "Demander les registres visiteurs") },
      { id: "training", label: t("Ask for the awareness deck", "Demander le support de sensibilisation") },
    ],
    correctNextEvidenceId: "trace-link",
    sufficiency: "weak",
    systemicVerdict: "systemic",
    followUpOptions: [
      { id: "who-approved-soa", label: t("Who approved the current SoA position and on what basis?", "Qui a approuvé la position SoA actuelle et sur quelle base ?") },
      { id: "what-office", label: t("Which office is in Nantes?", "Quel bureau se trouve à Nantes ?") },
      { id: "which-vendor", label: t("Which laptop vendor do you use?", "Quel fournisseur d'ordinateurs utilisez-vous ?") },
    ],
    correctFollowUpId: "who-approved-soa",
    likelySeverity: "major",
    relatedClauses: ["6.1.3", "6.1.4"],
    rationale: t(
      "The missing traceability affects the whole logic of applicability. Auditors usually move from broad weakness to a single sampled trace to confirm whether the issue is systemic.",
      "Le manque de traçabilité affecte toute la logique d'applicabilité. Les auditeurs passent généralement de cette faiblesse générale à une trace échantillonnée pour confirmer si le sujet est systémique.",
    ),
    phraseIds: ["soa-too-generic", "risk-not-traceable"],
  },
  {
    id: "drill-supplier",
    title: t("Judge whether supplier review is operating", "Évaluer si la revue fournisseur fonctionne réellement"),
    context: t(
      "The supplier review procedure exists, but no completed review package is available for sampled critical vendors.",
      "La procédure de revue fournisseur existe, mais aucun dossier de revue complété n'est disponible pour les fournisseurs critiques échantillonnés.",
    ),
    availableEvidence: [
      evidence(
        "policy-standard",
        "sufficient",
        "Supplier review procedure",
        "Procédure de revue fournisseur",
        "The organization has defined what it says should happen.",
        "L'organisation a défini ce qui est censé se passer.",
      ),
      evidence(
        "supplier-review-record",
        "absent",
        "No review records for sampled critical suppliers",
        "Aucune trace de revue pour les fournisseurs critiques échantillonnés",
        "Execution evidence is missing where the risk is highest.",
        "La preuve d'exécution manque là où le risque est le plus élevé.",
      ),
    ],
    nextEvidenceOptions: [
      { id: "criticality-list", label: t("Ask for the critical-supplier list and the last completed review pack", "Demander la liste des fournisseurs critiques et le dernier dossier de revue complété") },
      { id: "badge-logs", label: t("Ask for site badge logs", "Demander les logs de badges du site") },
      { id: "backup-policy", label: t("Ask for the backup policy", "Demander la politique de sauvegarde") },
    ],
    correctNextEvidenceId: "criticality-list",
    sufficiency: "absent",
    systemicVerdict: "systemic",
    followUpOptions: [
      { id: "how-acceptable", label: t("How do you decide a supplier is acceptable without review evidence?", "Comment décidez-vous qu'un fournisseur est acceptable sans preuve de revue ?") },
      { id: "which-logo", label: t("Which customer logo is biggest?", "Quel est le plus gros logo client ?") },
      { id: "who-trains", label: t("Who runs the annual awareness session?", "Qui anime la sensibilisation annuelle ?") },
    ],
    correctFollowUpId: "how-acceptable",
    likelySeverity: "major",
    relatedClauses: ["8.1", "6.1.3"],
    rationale: t(
      "For critical suppliers, procedure alone is not enough. The auditor should immediately ask for the decision and review package that proves the control is truly operating.",
      "Pour des fournisseurs critiques, la procédure seule ne suffit pas. L'auditeur doit immédiatement demander la décision et le dossier de revue qui prouvent que la mesure fonctionne réellement.",
    ),
    phraseIds: ["ask-for-sampled-evidence", "systemic-vs-isolated"],
  },
];

export function getWorkplacePhrasesByIds(ids: string[]) {
  const uniqueIds = new Set(ids);

  return workplacePhraseEntries.filter((entry) => uniqueIds.has(entry.id));
}

export function getClausePracticeLens(clause: string) {
  return clausePracticeLenses.find((entry) => entry.clause === clause);
}

export function getSoaGuidanceForControl(controlCode: string) {
  return soaGuidanceExamples.find((entry) => entry.controlCode === controlCode);
}
