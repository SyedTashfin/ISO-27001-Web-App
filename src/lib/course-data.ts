export type Locale = "en" | "fr";
export type DisplayMode = Locale | "dual";

export type LocalizedText = {
  en: string;
  fr: string;
};

export type QuizOption = {
  id: string;
  label: LocalizedText;
};

export type QuizQuestion = {
  id: string;
  prompt: LocalizedText;
  explanation: LocalizedText;
  correctOptionId: string;
  options: QuizOption[];
};

export type LessonModule = {
  slug: string;
  icon: string;
  level: LocalizedText;
  durationMinutes: number;
  eyebrow: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  simple: LocalizedText;
  professional: LocalizedText;
  practical: LocalizedText;
  exercise: LocalizedText;
  keyArtifacts: LocalizedText[];
  outcomes: LocalizedText[];
  relatedLinks: { href: string; label: LocalizedText }[];
  quiz: QuizQuestion[];
};

export type ClauseCard = {
  clause: string;
  title: LocalizedText;
  simple: LocalizedText;
  professional: LocalizedText;
  evidence: LocalizedText[];
};

export type ComparisonCard = {
  standard: string;
  title: LocalizedText;
  role: LocalizedText;
  whenToUse: LocalizedText;
  watchOut: LocalizedText;
};

export type GlossaryTerm = {
  slug: string;
  term: LocalizedText;
  definition: LocalizedText;
  workExample: LocalizedText;
};

export type PhraseCard = {
  situation: LocalizedText;
  english: string;
  french: string;
  note: LocalizedText;
};

export type ScenarioTemplate = {
  slug: string;
  company: string;
  industry: LocalizedText;
  title: LocalizedText;
  context: LocalizedText;
  challenge: LocalizedText;
  goodMoves: LocalizedText[];
  riskyMoves: LocalizedText[];
};

export type RiskItem = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  impact: "low" | "medium" | "high";
  likelihood: "low" | "medium" | "high";
  recommendedTreatment: "avoid" | "mitigate" | "transfer" | "accept";
  recommendedControls: string[];
  soaReason: LocalizedText;
};

export type RiskScenario = {
  id: string;
  company: string;
  sector: LocalizedText;
  context: LocalizedText;
  risks: RiskItem[];
};

export type FindingSeverity = "major" | "minor" | "observation";

export type AuditExercise = {
  id: string;
  title: LocalizedText;
  context: LocalizedText;
  evidence: LocalizedText[];
  correctSeverity: FindingSeverity;
  rationale: LocalizedText;
};

export type AnnexControlCategory =
  | "Organizational"
  | "People"
  | "Physical"
  | "Technological";

export type AnnexControl = {
  code: string;
  category: AnnexControlCategory;
  title: LocalizedText;
  focus: LocalizedText;
  evidenceHint: LocalizedText;
};

const t = (en: string, fr: string): LocalizedText => ({ en, fr });

const controlEvidenceByCategory: Record<AnnexControlCategory, LocalizedText> = {
  Organizational: t(
    "Typical evidence: policy versions, approved procedures, governance minutes, supplier clauses, or exception records.",
    "Preuves typiques : versions de politiques, procédures approuvées, comptes rendus de gouvernance, clauses fournisseurs ou registres d'exception.",
  ),
  People: t(
    "Typical evidence: HR records, onboarding packs, training completion, signed acknowledgements, or reporting workflows.",
    "Preuves typiques : dossiers RH, packs d'onboarding, validations de formation, accusés signés ou circuits de signalement.",
  ),
  Physical: t(
    "Typical evidence: visitor logs, badge reports, floor plans, CCTV coverage, equipment handling records, or disposal certificates.",
    "Preuves typiques : registres visiteurs, rapports de badges, plans de sites, couverture CCTV, preuves de manipulation du matériel ou certificats de destruction.",
  ),
  Technological: t(
    "Typical evidence: system settings, tickets, scan results, logs, backup reports, code review records, or test outputs.",
    "Preuves typiques : paramètres systèmes, tickets, résultats de scans, journaux, rapports de sauvegarde, traces de revue de code ou résultats de tests.",
  ),
};

const control = (
  code: string,
  category: AnnexControlCategory,
  enTitle: string,
  frTitle: string,
  enFocus: string,
  frFocus: string,
): AnnexControl => ({
  code,
  category,
  title: t(enTitle, frTitle),
  focus: t(enFocus, frFocus),
  evidenceHint: controlEvidenceByCategory[category],
});

export const siteNavigation = [
  {
    href: "/",
    label: t("Overview", "Vue d'ensemble"),
    shortLabel: t("Overview", "Vue"),
  },
  { href: "/learn", label: t("Learn", "Apprendre"), shortLabel: t("Learn", "Apprendre") },
  { href: "/compare", label: t("Compare", "Comparer"), shortLabel: t("Compare", "Comparer") },
  { href: "/annex-a", label: t("Annex A", "Annexe A"), shortLabel: t("Annex A", "Annexe A") },
  { href: "/risk-lab", label: t("Risk Lab", "Laboratoire Risques"), shortLabel: t("Risk Lab", "Risques") },
  { href: "/audit-lab", label: t("Audit Lab", "Laboratoire Audit"), shortLabel: t("Audit Lab", "Audit") },
  {
    href: "/dashboard",
    label: t("Dashboard", "Tableau de bord"),
    shortLabel: t("Dashboard", "Dashboard"),
  },
  {
    href: "/admin",
    label: t("Content Studio", "Studio de contenu"),
    shortLabel: t("Studio", "Studio"),
  },
  { href: "/glossary", label: t("Glossary", "Glossaire"), shortLabel: t("Glossary", "Glossaire") },
] as const;

export const platformStats = [
  {
    value: "7",
    label: t("guided modules", "modules guidés"),
  },
  {
    value: "93",
    label: t("Annex A controls", "mesures Annexe A"),
  },
  {
    value: "3",
    label: t("realistic business simulations", "simulations métier réalistes"),
  },
  {
    value: "2",
    label: t("languages in one workspace", "langues dans le même espace"),
  },
] as const;

export const learningModules: LessonModule[] = [
  {
    slug: "foundations",
    icon: "ShieldCheck",
    level: t("Beginner", "Débutant"),
    durationMinutes: 18,
    eyebrow: t("Start Here", "Point de départ"),
    title: t("What ISO 27001 really is", "Ce qu'est réellement l'ISO 27001"),
    summary: t(
      "Understand ISO/IEC 27001 as a management system standard, not a stack of security tools or a checklist of controls.",
      "Comprendre l'ISO/IEC 27001 comme une norme de système de management, pas comme un empilement d'outils de sécurité ou une simple checklist.",
    ),
    simple: t(
      "ISO 27001 gives an organization a structured way to decide how it will protect information, prove that it takes security seriously, and improve over time.",
      "L'ISO 27001 donne à une organisation une manière structurée de décider comment elle protège l'information, de prouver qu'elle prend la sécurité au sérieux et de s'améliorer dans le temps.",
    ),
    professional: t(
      "ISO/IEC 27001:2022 specifies certifiable requirements for establishing, implementing, maintaining, and continually improving an Information Security Management System. Certification is about whether the ISMS works in context, not whether every possible control exists.",
      "L'ISO/IEC 27001:2022 définit des exigences certifiables pour établir, mettre en oeuvre, maintenir et améliorer en continu un système de management de la sécurité de l'information. La certification porte sur l'efficacité du SMSI dans son contexte, pas sur l'existence de toutes les mesures imaginables.",
    ),
    practical: t(
      "A French SaaS company pursues ISO 27001 to shorten enterprise sales cycles, respond credibly to customer security questionnaires, and align teams around risk and evidence instead of ad hoc promises.",
      "Une société SaaS française poursuit l'ISO 27001 pour raccourcir ses cycles de vente grands comptes, répondre de manière crédible aux questionnaires sécurité des clients et aligner les équipes autour du risque et de la preuve plutôt que sur des promesses ad hoc.",
    ),
    exercise: t(
      "Explain ISO 27001 in one sentence to a non-technical manager. Then explain it again to an auditor without using the words checklist or certificate.",
      "Expliquez l'ISO 27001 en une phrase à un manager non technique. Puis expliquez-la à un auditeur sans utiliser les mots checklist ou certificat.",
    ),
    keyArtifacts: [
      t("ISMS scope statement", "Déclaration de périmètre du SMSI"),
      t("Leadership commitment and governance rhythm", "Engagement de la direction et rythme de gouvernance"),
      t("Risk treatment decisions backed by evidence", "Décisions de traitement du risque appuyées par des preuves"),
    ],
    outcomes: [
      t("Describe ISO 27001 in plain language", "Décrire l'ISO 27001 en langage simple"),
      t("Explain why businesses pursue certification", "Expliquer pourquoi les entreprises visent la certification"),
      t("Separate management-system requirements from control implementation", "Distinguer exigences du système de management et mise en oeuvre des mesures"),
    ],
    relatedLinks: [
      { href: "/learn/isms-core", label: t("Go to ISMS core", "Aller au coeur du SMSI") },
      { href: "/glossary", label: t("Review key vocabulary", "Revoir le vocabulaire clé") },
    ],
    quiz: [
      {
        id: "foundation-q1",
        prompt: t(
          "What is the core object of ISO/IEC 27001 certification?",
          "Quel est l'objet central de la certification ISO/IEC 27001 ?",
        ),
        explanation: t(
          "Certification evaluates whether the ISMS is established, operating, and improving in context.",
          "La certification évalue si le SMSI est établi, fonctionne et s'améliore dans son contexte.",
        ),
        correctOptionId: "b",
        options: [
          { id: "a", label: t("A fixed list of technical tools", "Une liste fixe d'outils techniques") },
          { id: "b", label: t("The Information Security Management System", "Le système de management de la sécurité de l'information") },
          { id: "c", label: t("Only the Statement of Applicability", "Uniquement la déclaration d'applicabilité") },
        ],
      },
      {
        id: "foundation-q2",
        prompt: t(
          "Why do businesses often pursue ISO 27001?",
          "Pourquoi les entreprises poursuivent-elles souvent l'ISO 27001 ?",
        ),
        explanation: t(
          "The standard supports trust, governance, and operational discipline alongside commercial benefits.",
          "La norme soutient la confiance, la gouvernance et la discipline opérationnelle en plus des bénéfices commerciaux.",
        ),
        correctOptionId: "c",
        options: [
          { id: "a", label: t("To remove all security risk", "Pour supprimer tout risque de sécurité") },
          { id: "b", label: t("To avoid documenting anything", "Pour éviter toute documentation") },
          { id: "c", label: t("To show a repeatable, risk-based security approach", "Pour démontrer une approche sécurité répétable et basée sur le risque") },
        ],
      },
    ],
  },
  {
    slug: "isms-core",
    icon: "Network",
    level: t("Beginner to Intermediate", "Débutant à intermédiaire"),
    durationMinutes: 22,
    eyebrow: t("Operating Model", "Modèle de fonctionnement"),
    title: t("How an ISMS works in practice", "Comment un SMSI fonctionne en pratique"),
    summary: t(
      "Move from the abstract idea of a management system to the day-to-day reality of scope, governance, roles, metrics, and improvement.",
      "Passez de l'idée abstraite d'un système de management à la réalité quotidienne du périmètre, de la gouvernance, des rôles, des métriques et de l'amélioration.",
    ),
    simple: t(
      "An ISMS is the operating system for information security decisions. It tells the business who decides, what is in scope, what risks matter, and how improvements are tracked.",
      "Un SMSI est le système d'exploitation des décisions de sécurité de l'information. Il indique à l'entreprise qui décide, ce qui est dans le périmètre, quels risques comptent et comment les améliorations sont suivies.",
    ),
    professional: t(
      "In professional terms, the ISMS is a controlled framework of context, scope, leadership, support, operations, performance evaluation, and improvement mechanisms. It connects business objectives, legal obligations, assets, risk criteria, and treatment actions into one auditable system.",
      "En termes professionnels, le SMSI est un cadre maîtrisé de contexte, périmètre, leadership, support, opérations, évaluation de la performance et mécanismes d'amélioration. Il relie objectifs métiers, obligations légales, actifs, critères de risque et actions de traitement dans un système unique et auditable.",
    ),
    practical: t(
      "In a consulting firm, the ISMS might cover client delivery, laptops, cloud collaboration, HR onboarding, incident handling, and supplier assurance. It does not need to cover the cafeteria supplier if that relationship is irrelevant to information security risk.",
      "Dans un cabinet de conseil, le SMSI peut couvrir la production client, les laptops, la collaboration cloud, l'onboarding RH, la gestion des incidents et l'assurance fournisseurs. Il n'a pas besoin de couvrir le prestataire de cafétéria si cette relation n'est pas pertinente pour le risque de sécurité de l'information.",
    ),
    exercise: t(
      "Write a short scope statement for a 50-person software company in Paris. Include what is in scope, what is out of scope, and why that boundary is credible.",
      "Rédigez une courte déclaration de périmètre pour une entreprise logicielle de 50 personnes à Paris. Incluez ce qui est dans le périmètre, ce qui est hors périmètre et pourquoi cette frontière est crédible.",
    ),
    keyArtifacts: [
      t("Context and interested parties analysis", "Analyse du contexte et des parties intéressées"),
      t("Scope statement and asset coverage logic", "Déclaration de périmètre et logique de couverture des actifs"),
      t("Roles, meetings, KPIs, corrective actions", "Rôles, réunions, KPI, actions correctives"),
    ],
    outcomes: [
      t("Define what an ISMS includes", "Définir ce qu'inclut un SMSI"),
      t("Explain scope and governance boundaries", "Expliquer les frontières de périmètre et de gouvernance"),
      t("Connect security operations to management review", "Relier les opérations sécurité à la revue de direction"),
    ],
    relatedLinks: [
      { href: "/learn/clauses-4-to-10", label: t("Explore clauses 4 to 10", "Explorer les clauses 4 à 10") },
      { href: "/risk-lab", label: t("Practice risk treatment", "Pratiquer le traitement du risque") },
    ],
    quiz: [
      {
        id: "isms-q1",
        prompt: t(
          "What makes an ISMS different from a set of security tools?",
          "Qu'est-ce qui différencie un SMSI d'un ensemble d'outils de sécurité ?",
        ),
        explanation: t(
          "A management system defines governance, decision-making, monitoring, and improvement, not just technical capability.",
          "Un système de management définit la gouvernance, la prise de décision, le suivi et l'amélioration, pas seulement la capacité technique.",
        ),
        correctOptionId: "a",
        options: [
          { id: "a", label: t("It links risk, governance, evidence, and improvement", "Il relie risque, gouvernance, preuve et amélioration") },
          { id: "b", label: t("It bans all suppliers", "Il interdit tous les fournisseurs") },
          { id: "c", label: t("It replaces management decisions with automation", "Il remplace les décisions de management par l'automatisation") },
        ],
      },
      {
        id: "isms-q2",
        prompt: t(
          "A strong scope statement should mainly be:",
          "Une bonne déclaration de périmètre doit surtout être :",
        ),
        explanation: t(
          "Auditors want a scope that is clear, justified, and aligned with risk and business reality.",
          "Les auditeurs attendent un périmètre clair, justifié et aligné sur le risque et la réalité métier.",
        ),
        correctOptionId: "c",
        options: [
          { id: "a", label: t("As broad as possible, even if inaccurate", "La plus large possible, même si elle est inexacte") },
          { id: "b", label: t("Hidden from customers", "Cachée aux clients") },
          { id: "c", label: t("Explicit, defensible, and tied to context", "Explicite, défendable et liée au contexte") },
        ],
      },
    ],
  },
  {
    slug: "clauses-4-to-10",
    icon: "ScrollText",
    level: t("Intermediate", "Intermédiaire"),
    durationMinutes: 28,
    eyebrow: t("Certifiable Core", "Noyau certifiable"),
    title: t("Clauses 4 to 10, clause by clause", "Clauses 4 à 10, clause par clause"),
    summary: t(
      "Learn what each certifiable clause is trying to achieve, what evidence commonly supports it, and how the clauses connect to each other.",
      "Apprenez ce que chaque clause certifiable cherche à obtenir, quelles preuves la soutiennent habituellement et comment les clauses s'articulent entre elles.",
    ),
    simple: t(
      "Clauses 4 to 10 are the backbone of the standard. They move from context and leadership to planning, support, operation, evaluation, and improvement.",
      "Les clauses 4 à 10 sont la colonne vertébrale de la norme. Elles vont du contexte et du leadership jusqu'à la planification, le support, l'exploitation, l'évaluation et l'amélioration.",
    ),
    professional: t(
      "These clauses define the certifiable management-system requirements. Annex A controls support treatment decisions, but the audit basis is still clauses 4 through 10. Mature implementations show traceability between these clauses instead of treating them as isolated chapters.",
      "Ces clauses définissent les exigences certifiables du système de management. Les mesures de l'Annexe A soutiennent les décisions de traitement, mais la base d'audit reste les clauses 4 à 10. Les mises en oeuvre matures montrent une traçabilité entre ces clauses au lieu de les traiter comme des chapitres isolés.",
    ),
    practical: t(
      "If clause 9 performance evaluation is weak, management review becomes shallow. If clause 6 planning is weak, the Statement of Applicability becomes arbitrary. The clauses operate as one system.",
      "Si la clause 9 sur l'évaluation de la performance est faible, la revue de direction devient superficielle. Si la clause 6 sur la planification est faible, la déclaration d'applicabilité devient arbitraire. Les clauses fonctionnent comme un seul système.",
    ),
    exercise: t(
      "Take one real process, like onboarding or incident response, and map which clauses shape it. Then identify the evidence an auditor would ask for.",
      "Prenez un vrai processus, comme l'onboarding ou la réponse à incident, et cartographiez les clauses qui le structurent. Puis identifiez les preuves qu'un auditeur demanderait.",
    ),
    keyArtifacts: [
      t("Clause map with inputs and outputs", "Carte des clauses avec intrants et extrants"),
      t("Management review and KPI cadence", "Cadence de revue de direction et des KPI"),
      t("Corrective action loop", "Boucle d'action corrective"),
    ],
    outcomes: [
      t("Explain clauses 4 to 10 in order", "Expliquer les clauses 4 à 10 dans l'ordre"),
      t("Recognize evidence for each clause", "Reconnaître les preuves de chaque clause"),
      t("Understand why clauses are the audit spine", "Comprendre pourquoi les clauses sont la colonne vertébrale de l'audit"),
    ],
    relatedLinks: [
      { href: "/audit-lab", label: t("Practice audit classification", "Pratiquer la qualification d'audit") },
      { href: "/annex-a", label: t("Connect clauses to controls", "Relier les clauses aux mesures") },
    ],
    quiz: [
      {
        id: "clauses-q1",
        prompt: t(
          "Which part of ISO 27001 contains the main certifiable requirements?",
          "Quelle partie de l'ISO 27001 contient les principales exigences certifiables ?",
        ),
        explanation: t(
          "Annex A is important, but clauses 4 through 10 are the certifiable ISMS requirements.",
          "L'Annexe A est importante, mais ce sont les clauses 4 à 10 qui portent les exigences certifiables du SMSI.",
        ),
        correctOptionId: "b",
        options: [
          { id: "a", label: t("Only the glossary", "Uniquement le glossaire") },
          { id: "b", label: t("Clauses 4 to 10", "Les clauses 4 à 10") },
          { id: "c", label: t("Only Annex A", "Uniquement l'Annexe A") },
        ],
      },
      {
        id: "clauses-q2",
        prompt: t(
          "What is the best way to think about the relationship between clauses and Annex A controls?",
          "Quelle est la meilleure façon de penser la relation entre les clauses et les mesures de l'Annexe A ?",
        ),
        explanation: t(
          "The clauses define the ISMS requirements; Annex A helps operationalize treatment decisions.",
          "Les clauses définissent les exigences du SMSI ; l'Annexe A aide à opérationnaliser les décisions de traitement.",
        ),
        correctOptionId: "c",
        options: [
          { id: "a", label: t("Controls replace the clauses", "Les mesures remplacent les clauses") },
          { id: "b", label: t("Clauses are optional if controls exist", "Les clauses sont optionnelles si les mesures existent") },
          { id: "c", label: t("Clauses govern the system, controls support treatment", "Les clauses pilotent le système, les mesures soutiennent le traitement") },
        ],
      },
    ],
  },
  {
    slug: "risk-and-soa",
    icon: "ShieldAlert",
    level: t("Intermediate", "Intermédiaire"),
    durationMinutes: 26,
    eyebrow: t("Risk Logic", "Logique de risque"),
    title: t("Risk assessment, treatment, and the SoA", "Évaluation du risque, traitement et déclaration d'applicabilité"),
    summary: t(
      "Learn how risk criteria, treatment choices, and Annex A controls connect into the Statement of Applicability.",
      "Apprenez comment les critères de risque, les choix de traitement et les mesures de l'Annexe A se relient dans la déclaration d'applicabilité.",
    ),
    simple: t(
      "Risk assessment decides what matters. Risk treatment decides what to do. The SoA records which Annex A controls are applicable, why, and how they are implemented or excluded.",
      "L'évaluation du risque décide de ce qui compte. Le traitement du risque décide quoi faire. La déclaration d'applicabilité enregistre quelles mesures de l'Annexe A sont applicables, pourquoi, et comment elles sont mises en oeuvre ou écartées.",
    ),
    professional: t(
      "The Statement of Applicability is a governance artifact that links treatment decisions to Annex A controls. It should reflect scope, risk criteria, legal obligations, business context, and justified exclusions. It is not a pre-filled catalogue.",
      "La déclaration d'applicabilité est un artefact de gouvernance qui relie les décisions de traitement aux mesures de l'Annexe A. Elle doit refléter le périmètre, les critères de risque, les obligations légales, le contexte métier et les exclusions justifiées. Ce n'est pas un catalogue prérempli.",
    ),
    practical: t(
      "A cloud-native startup may decide that some physical controls are still applicable because laptops, badge access, and secure disposal still matter. 'We are in the cloud' is not a valid blanket justification.",
      "Une startup cloud-native peut décider que certaines mesures physiques restent applicables parce que les laptops, les badges et la destruction sécurisée comptent toujours. 'Nous sommes dans le cloud' n'est pas une justification globale valable.",
    ),
    exercise: t(
      "Choose a real business process. Identify the asset, threat, vulnerability, impact, treatment option, and one Annex A control you would reference in the SoA.",
      "Choisissez un vrai processus métier. Identifiez l'actif, la menace, la vulnérabilité, l'impact, l'option de traitement et une mesure de l'Annexe A que vous référenceriez dans la déclaration d'applicabilité.",
    ),
    keyArtifacts: [
      t("Risk methodology and scoring criteria", "Méthodologie de risque et critères de notation"),
      t("Risk register and treatment plan", "Registre des risques et plan de traitement"),
      t("Statement of Applicability with justified inclusions and exclusions", "Déclaration d'applicabilité avec inclusions et exclusions justifiées"),
    ],
    outcomes: [
      t("Describe risk assessment and treatment clearly", "Décrire clairement l'évaluation et le traitement du risque"),
      t("Explain why control selection must be risk-based", "Expliquer pourquoi la sélection des mesures doit être fondée sur le risque"),
      t("Build a credible SoA rationale", "Construire une logique crédible de déclaration d'applicabilité"),
    ],
    relatedLinks: [
      { href: "/risk-lab", label: t("Open the risk lab", "Ouvrir le laboratoire risques") },
      { href: "/annex-a", label: t("Inspect control categories", "Inspecter les catégories de mesures") },
    ],
    quiz: [
      {
        id: "risk-q1",
        prompt: t(
          "What is the main purpose of the Statement of Applicability?",
          "Quel est l'objectif principal de la déclaration d'applicabilité ?",
        ),
        explanation: t(
          "It explains which Annex A controls are applicable, why, and their implementation status in light of treatment decisions.",
          "Elle explique quelles mesures de l'Annexe A sont applicables, pourquoi, et leur état de mise en oeuvre au regard des décisions de traitement.",
        ),
        correctOptionId: "a",
        options: [
          { id: "a", label: t("Map treatment decisions to applicable controls", "Relier les décisions de traitement aux mesures applicables") },
          { id: "b", label: t("Replace the risk register", "Remplacer le registre des risques") },
          { id: "c", label: t("Avoid documenting exclusions", "Éviter de documenter les exclusions") },
        ],
      },
      {
        id: "risk-q2",
        prompt: t(
          "Which phrase best reflects good ISO 27001 logic?",
          "Quelle phrase reflète le mieux une bonne logique ISO 27001 ?",
        ),
        explanation: t(
          "The standard expects justified, risk-based choices rather than blind control adoption.",
          "La norme attend des choix justifiés et fondés sur le risque, pas une adoption aveugle des mesures.",
        ),
        correctOptionId: "c",
        options: [
          { id: "a", label: t("Apply every Annex A control, no matter what", "Appliquer toutes les mesures de l'Annexe A quoi qu'il arrive") },
          { id: "b", label: t("Ignore controls if time is short", "Ignorer les mesures si le temps manque") },
          { id: "c", label: t("Select and justify controls based on risk and context", "Sélectionner et justifier les mesures selon le risque et le contexte") },
        ],
      },
    ],
  },
  {
    slug: "annex-a-controls",
    icon: "LayoutGrid",
    level: t("Intermediate", "Intermédiaire"),
    durationMinutes: 24,
    eyebrow: t("Control Landscape", "Paysage des mesures"),
    title: t("Annex A and the 93 controls", "Annexe A et les 93 mesures"),
    summary: t(
      "Understand the four control groupings, the role of Annex A, and how ISO/IEC 27002 helps with implementation guidance.",
      "Comprendre les quatre regroupements de mesures, le rôle de l'Annexe A et la manière dont l'ISO/IEC 27002 aide à la mise en oeuvre.",
    ),
    simple: t(
      "Annex A gives you a structured control library. The controls are grouped into Organizational, People, Physical, and Technological areas, but they are selected because of risk, not because the list exists.",
      "L'Annexe A vous donne une bibliothèque structurée de mesures. Elles sont regroupées en mesures organisationnelles, humaines, physiques et technologiques, mais elles sont sélectionnées à cause du risque, pas simplement parce que la liste existe.",
    ),
    professional: t(
      "Annex A in the 2022 edition contains 93 controls aligned to the implementation guidance in ISO/IEC 27002:2022. ISO 27001 tells you that controls must be selected and justified. ISO 27002 helps you interpret and implement those controls in practice.",
      "L'Annexe A dans l'édition 2022 contient 93 mesures alignées sur les recommandations de mise en oeuvre de l'ISO/IEC 27002:2022. L'ISO 27001 vous dit que les mesures doivent être sélectionnées et justifiées. L'ISO 27002 vous aide à les interpréter et à les mettre en oeuvre dans la pratique.",
    ),
    practical: t(
      "A team can have strong technological controls yet fail an audit because supplier governance, training records, or asset inventory are weak. Annex A is deliberately broader than pure technical security.",
      "Une équipe peut avoir de bonnes mesures technologiques et échouer quand même à l'audit parce que la gouvernance fournisseurs, les traces de formation ou l'inventaire des actifs sont faibles. L'Annexe A est volontairement plus large que la sécurité purement technique.",
    ),
    exercise: t(
      "Pick one risk, such as leaked customer data, and identify at least one organizational, people, physical, and technological control that could reduce it.",
      "Prenez un risque, par exemple une fuite de données clients, et identifiez au moins une mesure organisationnelle, humaine, physique et technologique qui pourrait le réduire.",
    ),
    keyArtifacts: [
      t("Control category map", "Carte des catégories de mesures"),
      t("Control implementation notes from ISO 27002", "Notes de mise en oeuvre issues de l'ISO 27002"),
      t("Links between controls and actual business evidence", "Liens entre mesures et preuves métier réelles"),
    ],
    outcomes: [
      t("Recognize all four control categories", "Reconnaître les quatre catégories de mesures"),
      t("Explain the difference between ISO 27001 and ISO 27002", "Expliquer la différence entre ISO 27001 et ISO 27002"),
      t("Use Annex A as a control library rather than a blind checklist", "Utiliser l'Annexe A comme bibliothèque de mesures et non comme checklist aveugle"),
    ],
    relatedLinks: [
      { href: "/annex-a", label: t("Explore all 93 controls", "Explorer les 93 mesures") },
      { href: "/learn/audit-and-certification", label: t("Prepare for audits", "Se préparer aux audits") },
    ],
    quiz: [
      {
        id: "annex-q1",
        prompt: t(
          "How many controls are in Annex A of ISO/IEC 27001:2022?",
          "Combien de mesures figurent dans l'Annexe A de l'ISO/IEC 27001:2022 ?",
        ),
        explanation: t(
          "The 2022 structure contains 93 controls grouped into four categories.",
          "La structure 2022 contient 93 mesures regroupées en quatre catégories.",
        ),
        correctOptionId: "b",
        options: [
          { id: "a", label: t("114", "114") },
          { id: "b", label: t("93", "93") },
          { id: "c", label: t("77", "77") },
        ],
      },
      {
        id: "annex-q2",
        prompt: t(
          "What is ISO/IEC 27002 used for?",
          "À quoi sert l'ISO/IEC 27002 ?",
        ),
        explanation: t(
          "ISO 27002 provides implementation and interpretation guidance for controls.",
          "L'ISO 27002 fournit des recommandations de mise en oeuvre et d'interprétation des mesures.",
        ),
        correctOptionId: "c",
        options: [
          { id: "a", label: t("It replaces risk assessment", "Elle remplace l'évaluation du risque") },
          { id: "b", label: t("It certifies organizations by itself", "Elle certifie les organisations à elle seule") },
          { id: "c", label: t("It guides how to implement and interpret controls", "Elle guide la mise en oeuvre et l'interprétation des mesures") },
        ],
      },
    ],
  },
  {
    slug: "audit-and-certification",
    icon: "ClipboardCheck",
    level: t("Intermediate to Advanced", "Intermédiaire à avancé"),
    durationMinutes: 24,
    eyebrow: t("Audit Readiness", "Préparation à l'audit"),
    title: t("Internal audit, external audit, and findings", "Audit interne, audit externe et constats"),
    summary: t(
      "Understand the audit cycle, evidence expectations, and how to distinguish observations, minor nonconformities, and major nonconformities.",
      "Comprendre le cycle d'audit, les attentes en matière de preuve et la différence entre observations, non-conformités mineures et non-conformités majeures.",
    ),
    simple: t(
      "Internal audits help the organization test its own system before certification or surveillance audits. External auditors assess conformity and effectiveness using evidence, interviews, and sampling.",
      "Les audits internes aident l'organisation à tester son propre système avant la certification ou les audits de surveillance. Les auditeurs externes évaluent la conformité et l'efficacité à partir de preuves, d'entretiens et d'échantillonnage.",
    ),
    professional: t(
      "ISO 19011 provides audit guidance, while ISO 27001 defines the requirements being audited. Audit evidence includes documents, records, system outputs, observations, and staff interviews. Findings should be proportional to risk and systemic impact.",
      "L'ISO 19011 fournit les lignes directrices d'audit, tandis que l'ISO 27001 définit les exigences auditées. Les preuves d'audit incluent documents, enregistrements, sorties systèmes, observations et entretiens avec le personnel. Les constats doivent être proportionnés au risque et à l'impact systémique.",
    ),
    practical: t(
      "Missing one training record for one employee might be minor if the process exists and is mostly effective. Having no defined incident process at all for a high-risk scope area can become a major nonconformity.",
      "L'absence d'une preuve de formation pour un employé peut être mineure si le processus existe et fonctionne globalement. L'absence totale de processus de gestion d'incident sur un périmètre à fort risque peut devenir une non-conformité majeure.",
    ),
    exercise: t(
      "Read an evidence gap and classify it. Ask: is the process absent, inconsistently followed, or just an improvement opportunity?",
      "Lisez un écart de preuve et qualifiez-le. Demandez-vous : le processus est-il absent, appliqué de façon incohérente, ou s'agit-il seulement d'une piste d'amélioration ?",
    ),
    keyArtifacts: [
      t("Internal audit programme", "Programme d'audit interne"),
      t("Audit plan, sampling notes, and evidence references", "Plan d'audit, notes d'échantillonnage et références de preuve"),
      t("Corrective action and follow-up records", "Actions correctives et suivi"),
    ],
    outcomes: [
      t("Distinguish internal and external audits", "Distinguer audit interne et audit externe"),
      t("Recognize strong audit evidence", "Reconnaître une preuve d'audit solide"),
      t("Classify common findings credibly", "Qualifier de façon crédible les constats courants"),
    ],
    relatedLinks: [
      { href: "/audit-lab", label: t("Open the audit lab", "Ouvrir le laboratoire audit") },
      { href: "/learn/french-for-practice", label: t("Practice bilingual explanations", "Pratiquer les explications bilingues") },
    ],
    quiz: [
      {
        id: "audit-q1",
        prompt: t(
          "Which standard is mainly referenced for audit guidance?",
          "Quelle norme est principalement utilisée pour guider l'audit ?",
        ),
        explanation: t(
          "ISO 19011 provides general guidance on auditing management systems.",
          "L'ISO 19011 fournit les lignes directrices générales pour l'audit des systèmes de management.",
        ),
        correctOptionId: "b",
        options: [
          { id: "a", label: t("ISO/IEC 27002", "ISO/IEC 27002") },
          { id: "b", label: t("ISO 19011", "ISO 19011") },
          { id: "c", label: t("ISO 9004", "ISO 9004") },
        ],
      },
      {
        id: "audit-q2",
        prompt: t(
          "A major nonconformity usually means:",
          "Une non-conformité majeure signifie généralement :",
        ),
        explanation: t(
          "Major issues are systemic, severe, or undermine trust in the ISMS's ability to achieve intended outcomes.",
          "Les constats majeurs sont systémiques, sévères ou remettent en cause la capacité du SMSI à atteindre ses résultats attendus.",
        ),
        correctOptionId: "a",
        options: [
          { id: "a", label: t("A systemic or serious failure affecting the ISMS", "Une défaillance systémique ou sérieuse affectant le SMSI") },
          { id: "b", label: t("Any typo in a policy", "Toute coquille dans une politique") },
          { id: "c", label: t("A suggestion with no evidence gap", "Une suggestion sans écart de preuve") },
        ],
      },
    ],
  },
  {
    slug: "french-for-practice",
    icon: "Languages",
    level: t("All levels", "Tous niveaux"),
    durationMinutes: 14,
    eyebrow: t("Workplace Language", "Langage professionnel"),
    title: t("Explain ISO 27001 in English and French", "Expliquer l'ISO 27001 en anglais et en français"),
    summary: t(
      "Build credible bilingual phrasing for interviews, meetings, customer calls, and audit conversations in France.",
      "Construire des formulations bilingues crédibles pour les entretiens, réunions, appels clients et échanges d'audit en France.",
    ),
    simple: t(
      "Good bilingual explanation is not literal translation. It keeps the business meaning intact while sounding natural in each language.",
      "Une bonne explication bilingue n'est pas une traduction littérale. Elle conserve le sens métier tout en restant naturelle dans chaque langue.",
    ),
    professional: t(
      "In practice, bilingual ISO work requires more than vocabulary. You need to explain concepts like scope, applicability, evidence, and nonconformity using the phrasing that French stakeholders actually use in meetings and reports.",
      "En pratique, le travail ISO bilingue demande plus que du vocabulaire. Il faut expliquer des concepts comme le périmètre, l'applicabilité, la preuve et la non-conformité avec les formulations réellement utilisées par les parties prenantes françaises en réunion et dans les rapports.",
    ),
    practical: t(
      "For example, 'scope' often becomes 'périmètre du SMSI' in French business usage, not just 'scope' left untranslated. 'Statement of Applicability' is frequently explained as 'déclaration d'applicabilité' plus a plain-language description of why controls are retained or excluded.",
      "Par exemple, 'scope' devient souvent 'périmètre du SMSI' dans l'usage métier français, et pas simplement 'scope'. 'Statement of Applicability' s'explique souvent comme 'déclaration d'applicabilité' complétée par une description simple de pourquoi les mesures sont retenues ou exclues.",
    ),
    exercise: t(
      "Try a two-part answer: first explain ISO 27001 to a French client in business language, then reframe the same point in English for an international security team.",
      "Essayez une réponse en deux temps : expliquez d'abord l'ISO 27001 à un client français avec un langage métier, puis reformulez le même point en anglais pour une équipe sécurité internationale.",
    ),
    keyArtifacts: [
      t("Bilingual meeting phrases", "Phrases bilingues de réunion"),
      t("Common audit vocabulary", "Vocabulaire d'audit courant"),
      t("Natural French equivalents for core ISO terms", "Équivalents français naturels des termes ISO clés"),
    ],
    outcomes: [
      t("Speak naturally about ISO 27001 in both languages", "Parler naturellement de l'ISO 27001 dans les deux langues"),
      t("Avoid literal but awkward translations", "Éviter les traductions littérales mais maladroites"),
      t("Handle interviews and customer questions with confidence", "Gérer les entretiens et questions clients avec assurance"),
    ],
    relatedLinks: [
      { href: "/glossary", label: t("Study the glossary", "Étudier le glossaire") },
      { href: "/learn/foundations", label: t("Revisit the foundation story", "Revoir les fondamentaux") },
    ],
    quiz: [
      {
        id: "bilingual-q1",
        prompt: t(
          "What makes bilingual ISO communication credible?",
          "Qu'est-ce qui rend une communication ISO bilingue crédible ?",
        ),
        explanation: t(
          "Credibility comes from preserving the business meaning and using natural professional phrasing in each language.",
          "La crédibilité vient de la conservation du sens métier et de l'usage d'une formulation professionnelle naturelle dans chaque langue.",
        ),
        correctOptionId: "b",
        options: [
          { id: "a", label: t("Word-for-word translation only", "Une traduction mot à mot uniquement") },
          { id: "b", label: t("Natural phrasing with the same management intent", "Une formulation naturelle avec la même intention de management") },
          { id: "c", label: t("Using English terms everywhere", "Utiliser des termes anglais partout") },
        ],
      },
      {
        id: "bilingual-q2",
        prompt: t(
          "How is 'Statement of Applicability' best handled in French business conversation?",
          "Comment gérer au mieux 'Statement of Applicability' dans une conversation métier en français ?",
        ),
        explanation: t(
          "Use the French term and explain the artifact's role in plain language.",
          "Utilisez le terme français et expliquez le rôle du document en langage simple.",
        ),
        correctOptionId: "c",
        options: [
          { id: "a", label: t("Never mention it", "Ne jamais le mentionner") },
          { id: "b", label: t("Translate it literally without context", "Le traduire littéralement sans contexte") },
          { id: "c", label: t("Say 'déclaration d'applicabilité' and explain what it decides", "Dire 'déclaration d'applicabilité' et expliquer ce qu'elle décide") },
        ],
      },
    ],
  },
];

export const clauseCards: ClauseCard[] = [
  {
    clause: "4",
    title: t("Context of the organization", "Contexte de l'organisation"),
    simple: t(
      "Understand the business context, interested parties, and what the ISMS should cover.",
      "Comprendre le contexte métier, les parties intéressées et ce que le SMSI doit couvrir.",
    ),
    professional: t(
      "Clause 4 anchors the ISMS in real organizational context, internal and external issues, stakeholder expectations, and scope boundaries.",
      "La clause 4 ancre le SMSI dans le contexte réel de l'organisation, ses enjeux internes et externes, les attentes des parties prenantes et les limites du périmètre.",
    ),
    evidence: [
      t("Context analysis and stakeholder map", "Analyse du contexte et cartographie des parties prenantes"),
      t("Approved scope statement", "Déclaration de périmètre approuvée"),
    ],
  },
  {
    clause: "5",
    title: t("Leadership", "Leadership"),
    simple: t(
      "Management must set direction, assign responsibilities, and support the ISMS visibly.",
      "La direction doit donner l'orientation, attribuer les responsabilités et soutenir le SMSI de façon visible.",
    ),
    professional: t(
      "Clause 5 is about accountability, policy direction, role clarity, and demonstrable management commitment.",
      "La clause 5 porte sur la redevabilité, l'orientation politique, la clarté des rôles et un engagement démontrable de la direction.",
    ),
    evidence: [
      t("Security policy and governance roles", "Politique de sécurité et rôles de gouvernance"),
      t("Management review inputs and decisions", "Intrants et décisions de revue de direction"),
    ],
  },
  {
    clause: "6",
    title: t("Planning", "Planification"),
    simple: t(
      "Define risk methods, objectives, and how changes will be handled.",
      "Définir les méthodes de risque, les objectifs et la façon de gérer les changements.",
    ),
    professional: t(
      "Clause 6 sets the logic for risk assessment, treatment planning, objectives, and planned changes to the ISMS.",
      "La clause 6 définit la logique d'évaluation du risque, de planification du traitement, d'objectifs et des changements planifiés du SMSI.",
    ),
    evidence: [
      t("Risk methodology and treatment plan", "Méthodologie de risque et plan de traitement"),
      t("Security objectives with owners and dates", "Objectifs sécurité avec responsables et échéances"),
    ],
  },
  {
    clause: "7",
    title: t("Support", "Support"),
    simple: t(
      "Make sure people, skills, awareness, communication, and documentation support the ISMS.",
      "S'assurer que les personnes, compétences, sensibilisation, communication et documents soutiennent le SMSI.",
    ),
    professional: t(
      "Clause 7 covers resources, competence, awareness, communication, and documented information needed for operational effectiveness.",
      "La clause 7 couvre les ressources, les compétences, la sensibilisation, la communication et l'information documentée nécessaires à l'efficacité opérationnelle.",
    ),
    evidence: [
      t("Training records and awareness campaigns", "Traces de formation et campagnes de sensibilisation"),
      t("Controlled documentation and versioning", "Documentation maîtrisée et versionnée"),
    ],
  },
  {
    clause: "8",
    title: t("Operation", "Fonctionnement"),
    simple: t(
      "Run the risk processes and controls in day-to-day operations.",
      "Faire fonctionner les processus de risque et les mesures au quotidien.",
    ),
    professional: t(
      "Clause 8 is where planned risk assessment and treatment become operational reality across the scoped environment.",
      "La clause 8 est l'endroit où l'évaluation et le traitement du risque planifiés deviennent une réalité opérationnelle sur le périmètre défini.",
    ),
    evidence: [
      t("Operational records, tickets, and approvals", "Enregistrements opérationnels, tickets et validations"),
      t("Control execution evidence", "Preuves d'exécution des mesures"),
    ],
  },
  {
    clause: "9",
    title: t("Performance evaluation", "Évaluation de la performance"),
    simple: t(
      "Measure, audit, and review whether the ISMS is working.",
      "Mesurer, auditer et revoir si le SMSI fonctionne.",
    ),
    professional: t(
      "Clause 9 requires monitoring, measurement, internal audit, and management review to assess ISMS suitability, adequacy, and effectiveness.",
      "La clause 9 exige le suivi, la mesure, l'audit interne et la revue de direction pour évaluer la pertinence, l'adéquation et l'efficacité du SMSI.",
    ),
    evidence: [
      t("KPIs, audit reports, and management review minutes", "KPI, rapports d'audit et comptes rendus de revue de direction"),
      t("Follow-up actions and decisions", "Actions de suivi et décisions"),
    ],
  },
  {
    clause: "10",
    title: t("Improvement", "Amélioration"),
    simple: t(
      "Correct problems and improve the system over time.",
      "Corriger les problèmes et améliorer le système dans le temps.",
    ),
    professional: t(
      "Clause 10 closes the loop with nonconformity handling, corrective action, and continual improvement of the ISMS.",
      "La clause 10 boucle le système avec le traitement des non-conformités, l'action corrective et l'amélioration continue du SMSI.",
    ),
    evidence: [
      t("Corrective action records", "Traces d'actions correctives"),
      t("Root cause analysis and effectiveness checks", "Analyse de cause racine et vérification d'efficacité"),
    ],
  },
];

export const standardComparisons: ComparisonCard[] = [
  {
    standard: "ISO/IEC 27001",
    title: t("Requirements standard", "Norme d'exigences"),
    role: t(
      "Defines the certifiable ISMS requirements and references Annex A controls.",
      "Définit les exigences certifiables du SMSI et référence les mesures de l'Annexe A.",
    ),
    whenToUse: t(
      "Use it when building, operating, certifying, or auditing an ISMS.",
      "À utiliser pour construire, exploiter, certifier ou auditer un SMSI.",
    ),
    watchOut: t(
      "Do not confuse it with a how-to manual for every control.",
      "Ne pas la confondre avec un mode d'emploi détaillé pour chaque mesure.",
    ),
  },
  {
    standard: "ISO/IEC 27002",
    title: t("Guidance standard", "Norme de recommandations"),
    role: t(
      "Explains how to interpret and implement the control themes behind Annex A.",
      "Explique comment interpréter et mettre en oeuvre les thèmes de contrôle derrière l'Annexe A.",
    ),
    whenToUse: t(
      "Use it when designing control implementation, evidence, and operational depth.",
      "À utiliser pour concevoir la mise en oeuvre des mesures, les preuves et la profondeur opérationnelle.",
    ),
    watchOut: t(
      "It supports ISO 27001 but is not itself the certifiable requirement set.",
      "Elle soutient l'ISO 27001 mais n'est pas elle-même l'ensemble d'exigences certifiables.",
    ),
  },
  {
    standard: "ISO 19011",
    title: t("Audit guidance standard", "Norme de lignes directrices d'audit"),
    role: t(
      "Provides general guidance for auditing management systems, including planning, competence, and audit conduct.",
      "Fournit des lignes directrices générales pour auditer les systèmes de management, y compris la planification, la compétence et la conduite de l'audit.",
    ),
    whenToUse: t(
      "Use it to structure internal audit programmes and improve audit technique.",
      "À utiliser pour structurer les programmes d'audit interne et améliorer la technique d'audit.",
    ),
    watchOut: t(
      "It tells you how to audit, not what ISO 27001 requires.",
      "Elle explique comment auditer, pas ce qu'exige l'ISO 27001.",
    ),
  },
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "isms",
    term: t("ISMS", "SMSI"),
    definition: t(
      "The Information Security Management System: the policies, processes, responsibilities, and improvement mechanisms used to manage information security.",
      "Le système de management de la sécurité de l'information : l'ensemble des politiques, processus, responsabilités et mécanismes d'amélioration utilisés pour piloter la sécurité de l'information.",
    ),
    workExample: t(
      "In a steering meeting, you might say: 'Our ISMS scope covers customer support, engineering, and HR onboarding.'",
      "En comité de pilotage, vous pouvez dire : 'Le périmètre de notre SMSI couvre le support client, l'ingénierie et l'onboarding RH.'",
    ),
  },
  {
    slug: "scope",
    term: t("Scope", "Périmètre"),
    definition: t(
      "The documented boundary of what the ISMS includes and excludes.",
      "La frontière documentée de ce que le SMSI inclut et exclut.",
    ),
    workExample: t(
      "A strong scope explains why the Paris office and AWS production environment are included, while a separate low-risk subsidiary is excluded.",
      "Un bon périmètre explique pourquoi le bureau de Paris et l'environnement de production AWS sont inclus, tandis qu'une filiale séparée à faible risque est exclue.",
    ),
  },
  {
    slug: "risk-assessment",
    term: t("Risk assessment", "Évaluation du risque"),
    definition: t(
      "The method used to identify threats, vulnerabilities, impacts, and likelihood in order to prioritize treatment decisions.",
      "La méthode utilisée pour identifier menaces, vulnérabilités, impacts et vraisemblance afin de prioriser les décisions de traitement.",
    ),
    workExample: t(
      "The team assessed credential theft as high impact because it could expose regulated customer data.",
      "L'équipe a évalué le vol d'identifiants comme impact élevé car il pourrait exposer des données clients réglementées.",
    ),
  },
  {
    slug: "risk-treatment",
    term: t("Risk treatment", "Traitement du risque"),
    definition: t(
      "The decision to avoid, mitigate, transfer, or accept a risk, usually with clear owners and target dates.",
      "La décision d'éviter, réduire, transférer ou accepter un risque, généralement avec des responsables et des échéances.",
    ),
    workExample: t(
      "The business chose to mitigate phishing risk through MFA, awareness training, and mailbox monitoring.",
      "L'entreprise a choisi de réduire le risque de phishing par le MFA, la sensibilisation et la surveillance des messageries.",
    ),
  },
  {
    slug: "soa",
    term: t("Statement of Applicability", "Déclaration d'applicabilité"),
    definition: t(
      "A core ISMS artifact showing which Annex A controls are applicable, why they are included or excluded, and their implementation status.",
      "Un artefact central du SMSI montrant quelles mesures de l'Annexe A sont applicables, pourquoi elles sont incluses ou exclues, et leur état de mise en oeuvre.",
    ),
    workExample: t(
      "During audit, the SoA helped explain why cloud security controls were applicable and why one control was not relevant to the scoped activities.",
      "Pendant l'audit, la déclaration d'applicabilité a permis d'expliquer pourquoi les mesures cloud étaient applicables et pourquoi une mesure n'était pas pertinente pour les activités du périmètre.",
    ),
  },
  {
    slug: "evidence",
    term: t("Audit evidence", "Preuve d'audit"),
    definition: t(
      "Documented or observable proof showing that the ISMS requirements and controls are operating as claimed.",
      "Une preuve documentée ou observable montrant que les exigences du SMSI et les mesures fonctionnent comme annoncé.",
    ),
    workExample: t(
      "An approved policy alone is not enough if there are no logs, records, or interviews showing the process works.",
      "Une politique approuvée seule ne suffit pas s'il n'y a pas de journaux, d'enregistrements ou d'entretiens montrant que le processus fonctionne.",
    ),
  },
  {
    slug: "nonconformity",
    term: t("Nonconformity", "Non-conformité"),
    definition: t(
      "A failure to meet a requirement or a breakdown in how the ISMS should operate.",
      "Un manquement à une exigence ou une rupture dans la manière dont le SMSI devrait fonctionner.",
    ),
    workExample: t(
      "No evidence of internal audits during the planned period can trigger a nonconformity.",
      "L'absence de preuve d'audits internes sur la période prévue peut déclencher une non-conformité.",
    ),
  },
  {
    slug: "observation",
    term: t("Observation", "Observation"),
    definition: t(
      "A concern or improvement opportunity that does not yet amount to a nonconformity.",
      "Une préoccupation ou une opportunité d'amélioration qui ne constitue pas encore une non-conformité.",
    ),
    workExample: t(
      "A well-run process with one unclear metric definition may be recorded as an observation.",
      "Un processus bien maîtrisé avec une définition de métrique peu claire peut être noté comme observation.",
    ),
  },
  {
    slug: "control",
    term: t("Control", "Mesure"),
    definition: t(
      "A governance, procedural, physical, or technical measure selected to treat information security risk.",
      "Une mesure de gouvernance, procédurale, physique ou technique sélectionnée pour traiter le risque de sécurité de l'information.",
    ),
    workExample: t(
      "Supplier due diligence is a control just like endpoint encryption is a control.",
      "La diligence raisonnable fournisseur est une mesure au même titre que le chiffrement des terminaux.",
    ),
  },
  {
    slug: "management-review",
    term: t("Management review", "Revue de direction"),
    definition: t(
      "A recurring leadership review of ISMS performance, changes, risks, issues, and improvement priorities.",
      "Une revue périodique par la direction de la performance du SMSI, des changements, des risques, des problèmes et des priorités d'amélioration.",
    ),
    workExample: t(
      "The management review agenda covered incidents, supplier issues, audit results, and objective status.",
      "L'ordre du jour de la revue de direction couvrait les incidents, les problèmes fournisseurs, les résultats d'audit et l'état des objectifs.",
    ),
  },
  {
    slug: "internal-audit",
    term: t("Internal audit", "Audit interne"),
    definition: t(
      "An audit performed on behalf of the organization to evaluate conformity and effectiveness before or between external audits.",
      "Un audit réalisé pour le compte de l'organisation afin d'évaluer la conformité et l'efficacité avant ou entre les audits externes.",
    ),
    workExample: t(
      "An internal auditor sampled joiner and leaver records before the certification body visited.",
      "Un auditeur interne a échantillonné les dossiers d'arrivée et de départ avant la visite de l'organisme certificateur.",
    ),
  },
];

export const bilingualPhrases: PhraseCard[] = [
  {
    situation: t("Explaining the ISMS scope", "Expliquer le périmètre du SMSI"),
    english: "The ISMS scope covers our customer-facing SaaS platform, supporting cloud infrastructure, and the teams that operate them.",
    french:
      "Le périmètre du SMSI couvre notre plateforme SaaS orientée client, l'infrastructure cloud associée et les équipes qui l'exploitent.",
    note: t(
      "Natural French keeps the business boundary explicit instead of translating every noun literally.",
      "Un français naturel garde la frontière métier explicite au lieu de traduire chaque nom littéralement.",
    ),
  },
  {
    situation: t("Defending the SoA", "Défendre la déclaration d'applicabilité"),
    english: "We selected these controls because they address the risks retained in our treatment plan and the obligations attached to customer data.",
    french:
      "Nous avons retenu ces mesures parce qu'elles répondent aux risques conservés dans notre plan de traitement et aux obligations liées aux données clients.",
    note: t(
      "The emphasis is on risk logic and obligation, not on copying the Annex A list.",
      "L'accent est mis sur la logique de risque et les obligations, pas sur la copie de la liste de l'Annexe A.",
    ),
  },
  {
    situation: t("Presenting an internal audit finding", "Présenter un constat d'audit interne"),
    english: "The process exists, but sampling showed inconsistent evidence of execution, so we classified it as a minor nonconformity.",
    french:
      "Le processus existe, mais l'échantillonnage a montré des preuves d'exécution incohérentes ; nous l'avons donc classé en non-conformité mineure.",
    note: t(
      "French audit language often sounds more direct and formal than literal translation from English.",
      "Le langage d'audit français est souvent plus direct et plus formel qu'une traduction littérale de l'anglais.",
    ),
  },
  {
    situation: t("Positioning ISO 27001 commercially", "Positionner l'ISO 27001 commercialement"),
    english: "ISO 27001 helps us answer security due diligence with repeatable evidence instead of one-off promises.",
    french:
      "L'ISO 27001 nous aide à répondre aux due diligences sécurité avec des preuves répétables plutôt qu'avec des promesses ponctuelles.",
    note: t(
      "This version sounds natural for customer meetings in France while keeping the same business message.",
      "Cette version sonne naturellement en rendez-vous client en France tout en gardant le même message métier.",
    ),
  },
];

export const scenarioTemplates: ScenarioTemplate[] = [
  {
    slug: "meddata-cloud",
    company: "MedData Cloud",
    industry: t("Digital health SaaS", "SaaS santé numérique"),
    title: t("Scaling into enterprise healthcare", "Accélération vers la santé grand compte"),
    context: t(
      "A Lyon-based SaaS platform processes health-adjacent scheduling data for clinics and wants enterprise contracts in France and Belgium.",
      "Une plateforme SaaS basée à Lyon traite des données de planification liées à la santé pour des cliniques et vise des contrats grands comptes en France et en Belgique.",
    ),
    challenge: t(
      "The company has strong engineering practices but weak formal governance. Sales needs trustworthy answers on suppliers, risk ownership, and audit readiness.",
      "L'entreprise a de bonnes pratiques d'ingénierie mais une gouvernance formelle faible. Les ventes ont besoin de réponses fiables sur les fournisseurs, les responsabilités de risque et la préparation à l'audit.",
    ),
    goodMoves: [
      t("Define a realistic ISMS scope tied to the product and support teams", "Définir un périmètre SMSI réaliste lié au produit et aux équipes support"),
      t("Build supplier assurance around cloud and support providers", "Construire une assurance fournisseurs autour du cloud et des prestataires support"),
      t("Use the SoA to justify cloud, access, and privacy controls", "Utiliser la déclaration d'applicabilité pour justifier les mesures cloud, d'accès et de confidentialité"),
    ],
    riskyMoves: [
      t("Assume cloud means physical controls do not matter", "Supposer que le cloud rend les mesures physiques inutiles"),
      t("Treat customer questionnaires as a substitute for risk management", "Traiter les questionnaires clients comme un substitut à la gestion des risques"),
    ],
  },
  {
    slug: "logifleet",
    company: "LogiFleet",
    industry: t("Transport and logistics", "Transport et logistique"),
    title: t("Securing field operations and warehouses", "Sécuriser les opérations terrain et entrepôts"),
    context: t(
      "A transport company operates warehouses, handheld scanners, driver accounts, and third-party maintenance contracts across France.",
      "Une entreprise de transport exploite des entrepôts, des scanners mobiles, des comptes chauffeurs et des contrats de maintenance tiers en France.",
    ),
    challenge: t(
      "The biggest risks are not only technical. Physical access, joiner/leaver delays, and incomplete asset records create audit exposure.",
      "Les risques les plus importants ne sont pas uniquement techniques. Les accès physiques, les retards dans les arrivées/départs et des inventaires incomplets créent une exposition d'audit.",
    ),
    goodMoves: [
      t("Connect physical, people, and technology controls in one treatment plan", "Relier les mesures physiques, humaines et technologiques dans un même plan de traitement"),
      t("Use spot checks to verify warehouse and endpoint practices", "Utiliser des contrôles ponctuels pour vérifier les pratiques d'entrepôt et des terminaux"),
      t("Build evidence from badge logs, scanner inventory, and onboarding records", "Construire la preuve à partir des logs de badges, de l'inventaire des scanners et des dossiers d'onboarding"),
    ],
    riskyMoves: [
      t("Focus only on SOC tooling and ignore warehouse realities", "Se concentrer uniquement sur les outils SOC et ignorer la réalité des entrepôts"),
      t("Keep supplier responsibilities vague in contracts", "Laisser les responsabilités fournisseurs vagues dans les contrats"),
    ],
  },
  {
    slug: "finops-advisory",
    company: "FinOps Advisory",
    industry: t("Consulting and managed services", "Conseil et services managés"),
    title: t("From informal trust to formal evidence", "Passer de la confiance informelle à la preuve formelle"),
    context: t(
      "A Paris consulting boutique handles sensitive client financial exports and collaborates through Microsoft 365, laptops, and external contractors.",
      "Un cabinet de conseil parisien manipule des exports financiers sensibles de clients et collabore via Microsoft 365, laptops et prestataires externes.",
    ),
    challenge: t(
      "Leadership is engaged, but processes live in people's heads. Auditors will expect repeatability, training proof, and clearer responsibility splits.",
      "La direction est engagée, mais les processus vivent dans la tête des personnes. Les auditeurs attendront de la répétabilité, des preuves de formation et des responsabilités mieux réparties.",
    ),
    goodMoves: [
      t("Formalize documented operating procedures and segregation of duties", "Formaliser les procédures opérationnelles documentées et la séparation des tâches"),
      t("Track corrective actions after internal audits", "Suivre les actions correctives après les audits internes"),
      t("Use bilingual reporting to keep French clients and international staff aligned", "Utiliser un reporting bilingue pour aligner clients français et équipes internationales"),
    ],
    riskyMoves: [
      t("Assume senior staff memory is enough evidence", "Supposer que la mémoire des seniors suffit comme preuve"),
      t("Skip awareness refreshers because the team is experienced", "Sauter les rappels de sensibilisation parce que l'équipe est expérimentée"),
    ],
  },
];

export const riskScenarios: RiskScenario[] = [
  {
    id: "meddata-risk",
    company: "MedData Cloud",
    sector: t("Digital health SaaS", "SaaS santé numérique"),
    context: t(
      "The company stores appointment and practitioner metadata in AWS and uses a third-party support desk provider.",
      "L'entreprise stocke des métadonnées de rendez-vous et de praticiens sur AWS et utilise un prestataire externe de support.",
    ),
    risks: [
      {
        id: "r1",
        title: t("Compromised support account", "Compte support compromis"),
        description: t(
          "A support engineer account could expose customer records if MFA and role scoping are weak.",
          "Un compte d'ingénieur support pourrait exposer des données clients si le MFA et le périmètre des rôles sont faibles.",
        ),
        impact: "high",
        likelihood: "medium",
        recommendedTreatment: "mitigate",
        recommendedControls: ["5.15", "5.16", "5.18", "8.2", "8.5", "8.15"],
        soaReason: t(
          "Customer data access is a core business and contractual risk, so access and logging controls are clearly applicable.",
          "L'accès aux données clients est un risque métier et contractuel central ; les mesures d'accès et de journalisation sont donc clairement applicables.",
        ),
      },
      {
        id: "r2",
        title: t("Weak supplier assurance", "Assurance fournisseur insuffisante"),
        description: t(
          "The outsourced support provider may not handle incidents or deletion requests as expected.",
          "Le prestataire de support externalisé peut ne pas gérer les incidents ou les demandes d'effacement comme attendu.",
        ),
        impact: "high",
        likelihood: "medium",
        recommendedTreatment: "mitigate",
        recommendedControls: ["5.19", "5.20", "5.22", "5.23", "8.10"],
        soaReason: t(
          "Supplier obligations directly affect service trust and privacy commitments, so contractual and monitoring controls must be retained.",
          "Les obligations fournisseurs impactent directement la confiance de service et les engagements de confidentialité ; les mesures contractuelles et de suivi doivent donc être retenues.",
        ),
      },
      {
        id: "r3",
        title: t("Residual outage risk", "Risque résiduel d'indisponibilité"),
        description: t(
          "A regional cloud outage could delay service restoration even when backups exist.",
          "Une panne régionale cloud pourrait retarder la remise en service même si des sauvegardes existent.",
        ),
        impact: "medium",
        likelihood: "medium",
        recommendedTreatment: "accept",
        recommendedControls: ["5.30", "8.13", "8.14"],
        soaReason: t(
          "The business may accept some residual recovery delay, but resilience and backup controls still remain applicable and should be tracked.",
          "L'entreprise peut accepter un certain délai résiduel de reprise, mais les mesures de résilience et de sauvegarde restent applicables et doivent être suivies.",
        ),
      },
    ],
  },
  {
    id: "logifleet-risk",
    company: "LogiFleet",
    sector: t("Transport and logistics", "Transport et logistique"),
    context: t(
      "Warehouse scanners, loading-bay access, and temporary staff turnover create security and availability pressure.",
      "Les scanners d'entrepôt, les accès aux quais de chargement et le turnover du personnel temporaire créent une pression sécurité et disponibilité.",
    ),
    risks: [
      {
        id: "r4",
        title: t("Untracked handheld devices", "Terminaux mobiles non tracés"),
        description: t(
          "Missing inventory records make it hard to know which devices hold data and who is responsible.",
          "L'absence d'inventaire rend difficile de savoir quels terminaux contiennent des données et qui en est responsable.",
        ),
        impact: "high",
        likelihood: "high",
        recommendedTreatment: "mitigate",
        recommendedControls: ["5.9", "5.10", "7.8", "7.9", "8.1"],
        soaReason: t(
          "Without a credible asset baseline, the business cannot manage device exposure or accountability.",
          "Sans base crédible sur les actifs, l'entreprise ne peut pas gérer l'exposition des terminaux ni la responsabilité associée.",
        ),
      },
      {
        id: "r5",
        title: t("Badge misuse in warehouse zones", "Mauvaise utilisation des badges dans les zones d'entrepôt"),
        description: t(
          "Shared or poorly revoked badges may allow unauthorized physical entry near operational systems.",
          "Des badges partagés ou mal révoqués peuvent permettre un accès physique non autorisé à proximité des systèmes opérationnels.",
        ),
        impact: "high",
        likelihood: "medium",
        recommendedTreatment: "mitigate",
        recommendedControls: ["6.5", "7.1", "7.2", "7.4"],
        soaReason: t(
          "Physical access is part of the scoped risk environment, so entry and monitoring controls must remain in the SoA.",
          "L'accès physique fait partie de l'environnement de risque du périmètre ; les mesures d'entrée et de surveillance doivent rester dans la déclaration d'applicabilité.",
        ),
      },
      {
        id: "r6",
        title: t("Carrier service dependency", "Dépendance à un transporteur/prestataire"),
        description: t(
          "One logistics partner handles a large share of routes and outage escalation relies on them.",
          "Un partenaire logistique gère une grande part des tournées et l'escalade en cas de panne dépend de lui.",
        ),
        impact: "medium",
        likelihood: "medium",
        recommendedTreatment: "transfer",
        recommendedControls: ["5.19", "5.20", "5.22"],
        soaReason: t(
          "The business can transfer some operational exposure contractually, but governance and review controls remain applicable.",
          "L'entreprise peut transférer une partie de l'exposition opérationnelle par contrat, mais les mesures de gouvernance et de revue restent applicables.",
        ),
      },
    ],
  },
];

export const findingExamples = {
  major: t(
    "Example major nonconformity: the organization states that internal audits are performed annually, but there is no audit programme, no reports, and no evidence of any internal audits in the certification cycle.",
    "Exemple de non-conformité majeure : l'organisation déclare réaliser des audits internes annuels, mais il n'existe aucun programme d'audit, aucun rapport et aucune preuve d'audit interne sur le cycle de certification.",
  ),
  minor: t(
    "Example minor nonconformity: the access review process exists, is documented, and is mostly followed, but one sampled team has no evidence for its latest periodic review.",
    "Exemple de non-conformité mineure : le processus de revue des accès existe, est documenté et globalement appliqué, mais une équipe échantillonnée n'a aucune preuve de sa dernière revue périodique.",
  ),
  observation: t(
    "Example observation: the incident dashboard works, but trend analysis could be clearer to help management review identify recurring issues earlier.",
    "Exemple d'observation : le tableau de bord des incidents fonctionne, mais l'analyse des tendances pourrait être plus claire pour aider la revue de direction à identifier plus tôt les sujets récurrents.",
  ),
} as const;

export const auditExercises: AuditExercise[] = [
  {
    id: "audit-1",
    title: t("No incident process in scoped operations", "Aucun processus d'incident sur les opérations du périmètre"),
    context: t(
      "During audit interviews, three teams describe different incident escalation paths. No single documented process or training record exists.",
      "Pendant les entretiens d'audit, trois équipes décrivent des circuits d'escalade différents. Aucun processus documenté unique ni aucune preuve de formation n'existent.",
    ),
    evidence: [
      t("Conflicting interview answers", "Réponses d'entretien contradictoires"),
      t("No documented incident workflow", "Aucun workflow incident documenté"),
      t("No awareness evidence", "Aucune preuve de sensibilisation"),
    ],
    correctSeverity: "major",
    rationale: t(
      "This is systemic and directly affects the ISMS's ability to respond consistently to security events.",
      "C'est systémique et cela affecte directement la capacité du SMSI à répondre de façon cohérente aux événements de sécurité.",
    ),
  },
  {
    id: "audit-2",
    title: t("One late access review", "Une revue d'accès en retard"),
    context: t(
      "The access review process is documented and operating, but one sampled business unit missed its quarterly review window.",
      "Le processus de revue des accès est documenté et fonctionne, mais une unité métier échantillonnée a manqué sa fenêtre de revue trimestrielle.",
    ),
    evidence: [
      t("Process exists and is approved", "Le processus existe et est approuvé"),
      t("Three teams have current evidence", "Trois équipes ont des preuves à jour"),
      t("One team is missing the latest record", "Une équipe n'a pas la dernière trace"),
    ],
    correctSeverity: "minor",
    rationale: t(
      "The control exists, but execution is inconsistent in part of the scope.",
      "La mesure existe, mais son exécution est incohérente sur une partie du périmètre.",
    ),
  },
  {
    id: "audit-3",
    title: t("Management review trend analysis could improve", "L'analyse de tendance de la revue de direction pourrait être améliorée"),
    context: t(
      "Management reviews happen on schedule and cover required topics, but the report could show recurring trends more clearly.",
      "Les revues de direction ont lieu au rythme prévu et couvrent les thèmes requis, mais le rapport pourrait montrer plus clairement les tendances récurrentes.",
    ),
    evidence: [
      t("Meeting cadence is respected", "La cadence des réunions est respectée"),
      t("Required inputs are present", "Les intrants requis sont présents"),
      t("Opportunity to improve data storytelling", "Possibilité d'améliorer la lisibilité des données"),
    ],
    correctSeverity: "observation",
    rationale: t(
      "This is an improvement opportunity, not evidence that the requirement is failing.",
      "Il s'agit d'une opportunité d'amélioration, pas d'une preuve d'échec de l'exigence.",
    ),
  },
];

const organizationalControls = [
  control("5.1", "Organizational", "Policies for information security", "Politiques de sécurité de l'information", "Set the direction and rules for information security.", "Définir l'orientation et les règles de la sécurité de l'information."),
  control("5.2", "Organizational", "Information security roles and responsibilities", "Rôles et responsabilités en sécurité de l'information", "Make ownership and accountability explicit.", "Rendre explicites la propriété et la responsabilité."),
  control("5.3", "Organizational", "Segregation of duties", "Séparation des tâches", "Reduce fraud or error by splitting sensitive responsibilities.", "Réduire la fraude ou l'erreur en séparant les responsabilités sensibles."),
  control("5.4", "Organizational", "Management responsibilities", "Responsabilités de la direction", "Ensure leadership enforces security responsibilities through management action.", "Veiller à ce que la direction fasse appliquer les responsabilités sécurité."),
  control("5.5", "Organizational", "Contact with authorities", "Relations avec les autorités", "Know when and how to engage regulators, law enforcement, or supervisory bodies.", "Savoir quand et comment contacter régulateurs, autorités ou forces de l'ordre."),
  control("5.6", "Organizational", "Contact with special interest groups", "Relations avec des groupes d'intérêt spécialisés", "Stay connected to security communities for insight and coordination.", "Rester connecté aux communautés sécurité pour obtenir des informations et se coordonner."),
  control("5.7", "Organizational", "Threat intelligence", "Renseignement sur les menaces", "Track relevant threats so decisions reflect the real threat landscape.", "Suivre les menaces pertinentes pour aligner les décisions sur la réalité des attaques."),
  control("5.8", "Organizational", "Information security in project management", "Sécurité de l'information dans la gestion de projet", "Build security into projects from the start, not after delivery.", "Intégrer la sécurité dans les projets dès le départ."),
  control("5.9", "Organizational", "Inventory of information and other associated assets", "Inventaire des informations et autres actifs associés", "Know what assets exist, who owns them, and why they matter.", "Savoir quels actifs existent, qui en est responsable et pourquoi ils comptent."),
  control("5.10", "Organizational", "Acceptable use of information and other associated assets", "Usage acceptable des informations et autres actifs associés", "Set expected behavior for using information, systems, and equipment.", "Définir le comportement attendu pour l'utilisation des informations, systèmes et équipements."),
  control("5.11", "Organizational", "Return of assets", "Restitution des actifs", "Recover company assets when roles change or employment ends.", "Récupérer les actifs de l'entreprise lors d'un changement de rôle ou d'un départ."),
  control("5.12", "Organizational", "Classification of information", "Classification de l'information", "Label information by sensitivity so handling reflects value and risk.", "Classer l'information par sensibilité pour adapter la manipulation au risque."),
  control("5.13", "Organizational", "Labelling of information", "Étiquetage de l'information", "Make information classification visible in practical use.", "Rendre visible la classification de l'information dans l'usage quotidien."),
  control("5.14", "Organizational", "Information transfer", "Transfert d'information", "Protect information when it is shared internally or externally.", "Protéger l'information lorsqu'elle est partagée en interne ou en externe."),
  control("5.15", "Organizational", "Access control", "Contrôle d'accès", "Define the business rules that govern who gets access to what.", "Définir les règles métier qui gouvernent les accès."),
  control("5.16", "Organizational", "Identity management", "Gestion des identités", "Manage lifecycle, uniqueness, and ownership of identities.", "Gérer le cycle de vie, l'unicité et la propriété des identités."),
  control("5.17", "Organizational", "Authentication information", "Informations d'authentification", "Protect credentials and other authentication factors properly.", "Protéger correctement les identifiants et autres facteurs d'authentification."),
  control("5.18", "Organizational", "Access rights", "Droits d'accès", "Grant, review, and remove access according to business need.", "Accorder, revoir et retirer les accès selon le besoin métier."),
  control("5.19", "Organizational", "Information security in supplier relationships", "Sécurité de l'information dans les relations fournisseurs", "Treat supplier exposure as part of the security system, not as an afterthought.", "Traiter l'exposition fournisseur comme une partie du système de sécurité."),
  control("5.20", "Organizational", "Addressing information security within supplier agreements", "Prise en compte de la sécurité de l'information dans les accords fournisseurs", "Write security expectations directly into contractual arrangements.", "Inscrire les attentes sécurité directement dans les accords contractuels."),
  control("5.21", "Organizational", "Managing information security in the ICT supply chain", "Gestion de la sécurité de l'information dans la chaîne d'approvisionnement TIC", "Look beyond direct suppliers to upstream technology dependencies.", "Regarder au-delà des fournisseurs directs vers les dépendances technologiques en amont."),
  control("5.22", "Organizational", "Monitoring, review and change management of supplier services", "Surveillance, revue et gestion des changements des services fournisseurs", "Verify that supplier services stay secure as they evolve.", "Vérifier que les services fournisseurs restent sûrs lorsqu'ils évoluent."),
  control("5.23", "Organizational", "Information security for use of cloud services", "Sécurité de l'information pour l'usage des services cloud", "Apply explicit governance to cloud adoption, configuration, and oversight.", "Appliquer une gouvernance explicite à l'adoption, à la configuration et au pilotage du cloud."),
  control("5.24", "Organizational", "Information security incident management planning and preparation", "Planification et préparation de la gestion des incidents de sécurité de l'information", "Prepare before incidents happen so response is not improvised.", "Se préparer avant les incidents pour éviter l'improvisation."),
  control("5.25", "Organizational", "Assessment and decision on information security events", "Évaluation et décision relatives aux événements de sécurité de l'information", "Assess events quickly and decide whether they are incidents.", "Évaluer rapidement les événements et décider s'il s'agit d'incidents."),
  control("5.26", "Organizational", "Response to information security incidents", "Réponse aux incidents de sécurité de l'information", "Coordinate containment, communication, and recovery actions.", "Coordonner confinement, communication et reprise."),
  control("5.27", "Organizational", "Learning from information security incidents", "Apprentissage tiré des incidents de sécurité de l'information", "Turn incidents into improvements instead of repeating the same failure.", "Transformer les incidents en améliorations au lieu de répéter les mêmes erreurs."),
  control("5.28", "Organizational", "Collection of evidence", "Collecte des preuves", "Preserve evidence so investigations and legal steps remain credible.", "Préserver les preuves pour garder des investigations et suites légales crédibles."),
  control("5.29", "Organizational", "Information security during disruption", "Sécurité de l'information pendant les perturbations", "Maintain security when operations are degraded or disrupted.", "Maintenir la sécurité lorsque l'activité est dégradée ou perturbée."),
  control("5.30", "Organizational", "ICT readiness for business continuity", "Préparation des TIC à la continuité d'activité", "Make ICT services resilient enough to support continuity objectives.", "Rendre les services TIC suffisamment résilients pour soutenir la continuité."),
  control("5.31", "Organizational", "Legal, statutory, regulatory and contractual requirements", "Exigences légales, statutaires, réglementaires et contractuelles", "Keep the security system aligned with obligations and commitments.", "Maintenir le système de sécurité aligné sur les obligations et engagements."),
  control("5.32", "Organizational", "Intellectual property rights", "Droits de propriété intellectuelle", "Protect software, content, and knowledge assets lawfully.", "Protéger logiciels, contenus et actifs de connaissance conformément au droit."),
  control("5.33", "Organizational", "Protection of records", "Protection des enregistrements", "Protect records from loss, tampering, and unauthorized disclosure.", "Protéger les enregistrements contre perte, altération et divulgation non autorisée."),
  control("5.34", "Organizational", "Privacy and protection of PII", "Vie privée et protection des PII", "Protect personally identifiable information in line with privacy obligations.", "Protéger les données à caractère personnel conformément aux obligations de confidentialité."),
  control("5.35", "Organizational", "Independent review of information security", "Revue indépendante de la sécurité de l'information", "Ensure the security approach is challenged beyond day-to-day ownership.", "Veiller à ce que l'approche sécurité soit revue au-delà de l'exploitation quotidienne."),
  control("5.36", "Organizational", "Compliance with policies, rules and standards for information security", "Conformité aux politiques, règles et normes de sécurité de l'information", "Check whether people actually follow the defined security rules.", "Vérifier que les personnes suivent réellement les règles de sécurité définies."),
  control("5.37", "Organizational", "Documented operating procedures", "Procédures opérationnelles documentées", "Describe operational steps clearly enough to be repeated and audited.", "Décrire les étapes opérationnelles de façon assez claire pour être répétées et auditées."),
] satisfies AnnexControl[];

const peopleControls = [
  control("6.1", "People", "Screening", "Vérifications préalables", "Assess trustworthiness before granting sensitive roles or access.", "Évaluer la fiabilité avant d'accorder des rôles ou accès sensibles."),
  control("6.2", "People", "Terms and conditions of employment", "Conditions d'emploi", "Make security responsibilities explicit in employment arrangements.", "Rendre explicites les responsabilités sécurité dans les relations de travail."),
  control("6.3", "People", "Information security awareness, education and training", "Sensibilisation, éducation et formation à la sécurité de l'information", "Ensure people understand what secure behavior looks like.", "Faire en sorte que chacun comprenne à quoi ressemble un comportement sûr."),
  control("6.4", "People", "Disciplinary process", "Processus disciplinaire", "Define consequences when security obligations are intentionally ignored.", "Définir les conséquences lorsque les obligations sécurité sont ignorées volontairement."),
  control("6.5", "People", "Responsibilities after termination or change of employment", "Responsabilités après la fin ou le changement d'emploi", "Manage security duties when people leave or change roles.", "Gérer les obligations sécurité lors d'un départ ou d'un changement de poste."),
  control("6.6", "People", "Confidentiality or non-disclosure agreements", "Accords de confidentialité ou de non-divulgation", "Formalize confidentiality expectations for staff and third parties.", "Formaliser les attentes de confidentialité pour le personnel et les tiers."),
  control("6.7", "People", "Remote working", "Télétravail", "Control the risks introduced by home or remote work environments.", "Maîtriser les risques introduits par le télétravail."),
  control("6.8", "People", "Information security event reporting", "Signalement des événements de sécurité de l'information", "Make it easy for people to report suspicious security events quickly.", "Faciliter le signalement rapide des événements suspects."),
] satisfies AnnexControl[];

const physicalControls = [
  control("7.1", "Physical", "Physical security perimeters", "Périmètres de sécurité physiques", "Define secure physical boundaries around sensitive areas.", "Définir des frontières physiques sûres autour des zones sensibles."),
  control("7.2", "Physical", "Physical entry", "Entrée physique", "Control and record entry into secured locations.", "Contrôler et tracer l'entrée dans les lieux sécurisés."),
  control("7.3", "Physical", "Securing offices, rooms and facilities", "Sécurisation des bureaux, salles et installations", "Protect workspaces and facilities from unauthorized access or misuse.", "Protéger les espaces de travail et installations contre l'accès ou l'usage non autorisé."),
  control("7.4", "Physical", "Physical security monitoring", "Surveillance de la sécurité physique", "Use monitoring to detect and investigate physical security issues.", "Utiliser la surveillance pour détecter et investiguer les problèmes de sécurité physique."),
  control("7.5", "Physical", "Protecting against physical and environmental threats", "Protection contre les menaces physiques et environnementales", "Reduce damage from fire, water, power, temperature, and similar hazards.", "Réduire les dommages liés au feu, à l'eau, à l'énergie, à la température et risques similaires."),
  control("7.6", "Physical", "Working in secure areas", "Travail dans des zones sécurisées", "Apply stricter rules where sensitive processing happens.", "Appliquer des règles renforcées là où les traitements sensibles ont lieu."),
  control("7.7", "Physical", "Clear desk and clear screen", "Bureau propre et écran verrouillé", "Prevent incidental exposure of information in shared environments.", "Éviter l'exposition accidentelle d'informations dans les environnements partagés."),
  control("7.8", "Physical", "Equipment siting and protection", "Positionnement et protection des équipements", "Place and protect equipment to reduce damage or unauthorized access.", "Positionner et protéger les équipements pour réduire dommages et accès non autorisés."),
  control("7.9", "Physical", "Security of assets off-premises", "Sécurité des actifs hors site", "Protect assets when they leave company-controlled locations.", "Protéger les actifs lorsqu'ils quittent les sites contrôlés par l'entreprise."),
  control("7.10", "Physical", "Storage media", "Supports de stockage", "Handle storage media to avoid data leakage or loss.", "Gérer les supports de stockage pour éviter fuite ou perte de données."),
  control("7.11", "Physical", "Supporting utilities", "Services de support", "Keep power, cooling, and utilities reliable enough for secure operations.", "Maintenir énergie, refroidissement et utilités à un niveau fiable pour des opérations sûres."),
  control("7.12", "Physical", "Cabling security", "Sécurité du câblage", "Protect network and power cabling from interference or unauthorized access.", "Protéger le câblage réseau et électrique contre interférences ou accès non autorisés."),
  control("7.13", "Physical", "Equipment maintenance", "Maintenance des équipements", "Maintain equipment securely throughout its lifecycle.", "Maintenir les équipements en sécurité tout au long de leur cycle de vie."),
  control("7.14", "Physical", "Secure disposal or re-use of equipment", "Élimination sécurisée ou réutilisation des équipements", "Erase or destroy information before equipment is reused or disposed of.", "Effacer ou détruire l'information avant réutilisation ou destruction des équipements."),
] satisfies AnnexControl[];

const technologicalControls = [
  control("8.1", "Technological", "User endpoint devices", "Terminaux utilisateurs", "Secure laptops, mobiles, and workstations that end users rely on.", "Sécuriser les laptops, mobiles et postes de travail utilisés par les collaborateurs."),
  control("8.2", "Technological", "Privileged access rights", "Droits d'accès privilégiés", "Restrict and monitor high-privilege access tightly.", "Restreindre et surveiller strictement les accès à privilèges."),
  control("8.3", "Technological", "Information access restriction", "Restriction d'accès à l'information", "Enforce access limits according to classification and business need.", "Appliquer les restrictions d'accès selon la classification et le besoin métier."),
  control("8.4", "Technological", "Access to source code", "Accès au code source", "Protect source code from unauthorized change or disclosure.", "Protéger le code source contre modification ou divulgation non autorisée."),
  control("8.5", "Technological", "Secure authentication", "Authentification sécurisée", "Use authentication mechanisms appropriate to risk.", "Utiliser des mécanismes d'authentification adaptés au risque."),
  control("8.6", "Technological", "Capacity management", "Gestion de capacité", "Prevent resource exhaustion from becoming a security or availability issue.", "Éviter que l'épuisement des ressources ne devienne un problème de sécurité ou de disponibilité."),
  control("8.7", "Technological", "Protection against malware", "Protection contre les logiciels malveillants", "Reduce the risk of malicious code across endpoints and services.", "Réduire le risque de code malveillant sur les terminaux et services."),
  control("8.8", "Technological", "Management of technical vulnerabilities", "Gestion des vulnérabilités techniques", "Identify, assess, and remediate technical weaknesses promptly.", "Identifier, évaluer et corriger rapidement les faiblesses techniques."),
  control("8.9", "Technological", "Configuration management", "Gestion de configuration", "Keep secure baselines and controlled changes for systems.", "Maintenir des configurations de référence sécurisées et maîtriser les changements."),
  control("8.10", "Technological", "Information deletion", "Suppression d'information", "Delete information safely when it is no longer needed.", "Supprimer l'information de manière sûre lorsqu'elle n'est plus nécessaire."),
  control("8.11", "Technological", "Data masking", "Masquage des données", "Reduce exposure by hiding sensitive data where full values are unnecessary.", "Réduire l'exposition en masquant les données sensibles lorsque les valeurs complètes ne sont pas nécessaires."),
  control("8.12", "Technological", "Data leakage prevention", "Prévention de fuite de données", "Detect or block unauthorized data exfiltration paths.", "Détecter ou bloquer les chemins d'exfiltration non autorisés."),
  control("8.13", "Technological", "Information backup", "Sauvegarde de l'information", "Back up important information and verify recoverability.", "Sauvegarder l'information importante et vérifier la restaurabilité."),
  control("8.14", "Technological", "Redundancy of information processing facilities", "Redondance des installations de traitement de l'information", "Build resilience into critical processing capacity.", "Construire de la résilience dans les capacités de traitement critiques."),
  control("8.15", "Technological", "Logging", "Journalisation", "Record relevant events to support detection, investigation, and accountability.", "Enregistrer les événements pertinents pour soutenir détection, investigation et traçabilité."),
  control("8.16", "Technological", "Monitoring activities", "Activités de surveillance", "Monitor systems and services for abnormal or risky behavior.", "Surveiller systèmes et services pour détecter des comportements anormaux ou risqués."),
  control("8.17", "Technological", "Clock synchronization", "Synchronisation des horloges", "Keep system time aligned so logs and evidence remain usable.", "Maintenir l'heure des systèmes alignée pour rendre journaux et preuves exploitables."),
  control("8.18", "Technological", "Use of privileged utility programs", "Usage des programmes utilitaires privilégiés", "Control tools that can override normal safeguards.", "Contrôler les outils capables de contourner les protections normales."),
  control("8.19", "Technological", "Installation of software on operational systems", "Installation de logiciels sur les systèmes opérationnels", "Control what software can be introduced into production environments.", "Maîtriser les logiciels introduits dans les environnements de production."),
  control("8.20", "Technological", "Network security", "Sécurité des réseaux", "Protect network paths, devices, and communication flows.", "Protéger les chemins réseau, équipements et flux de communication."),
  control("8.21", "Technological", "Security of network services", "Sécurité des services réseau", "Define and verify security expectations for network services.", "Définir et vérifier les attentes de sécurité pour les services réseau."),
  control("8.22", "Technological", "Segregation of networks", "Segregation des réseaux", "Separate network zones to limit propagation and exposure.", "Séparer les zones réseau pour limiter la propagation et l'exposition."),
  control("8.23", "Technological", "Web filtering", "Filtrage web", "Reduce exposure to malicious or inappropriate web destinations.", "Réduire l'exposition aux destinations web malveillantes ou inappropriées."),
  control("8.24", "Technological", "Use of cryptography", "Usage de la cryptographie", "Apply encryption and key management according to risk and obligation.", "Appliquer le chiffrement et la gestion de clés selon le risque et les obligations."),
  control("8.25", "Technological", "Secure development life cycle", "Cycle de vie de développement sécurisé", "Integrate security throughout planning, coding, testing, and release.", "Intégrer la sécurité tout au long de la planification, du code, des tests et des releases."),
  control("8.26", "Technological", "Application security requirements", "Exigences de sécurité des applications", "Define security expectations before building or buying applications.", "Définir les attentes de sécurité avant de construire ou d'acheter une application."),
  control("8.27", "Technological", "Secure system architecture and engineering principles", "Architecture système sécurisée et principes d'ingénierie", "Use architectural choices that reduce attack surface and failure modes.", "Utiliser des choix d'architecture qui réduisent la surface d'attaque et les modes de défaillance."),
  control("8.28", "Technological", "Secure coding", "Codage sécurisé", "Write code with practices that reduce common security weaknesses.", "Écrire du code avec des pratiques qui réduisent les faiblesses de sécurité courantes."),
  control("8.29", "Technological", "Security testing in development and acceptance", "Tests de sécurité en développement et en recette", "Test security before systems go live or major changes are accepted.", "Tester la sécurité avant la mise en production ou l'acceptation des changements majeurs."),
  control("8.30", "Technological", "Outsourced development", "Développement externalisé", "Apply equivalent security expectations to external development providers.", "Appliquer des exigences sécurité équivalentes aux prestataires de développement externes."),
  control("8.31", "Technological", "Separation of development, test and production environments", "Séparation des environnements de développement, test et production", "Avoid risky mixing of environments with different trust levels.", "Éviter le mélange risqué d'environnements de niveaux de confiance différents."),
  control("8.32", "Technological", "Change management", "Gestion des changements", "Assess and control changes so security is not broken by delivery speed.", "Évaluer et maîtriser les changements pour que la vitesse de livraison ne casse pas la sécurité."),
  control("8.33", "Technological", "Test information", "Données de test", "Protect test data so it does not create a hidden data exposure route.", "Protéger les données de test pour qu'elles ne créent pas une voie cachée d'exposition."),
  control("8.34", "Technological", "Protection of information systems during audit testing", "Protection des systèmes d'information pendant les tests d'audit", "Keep audit testing from damaging or disrupting live systems.", "Éviter que les tests d'audit n'endommagent ou ne perturbent les systèmes en production."),
] satisfies AnnexControl[];

export const annexControls: AnnexControl[] = [
  ...organizationalControls,
  ...peopleControls,
  ...physicalControls,
  ...technologicalControls,
];

export const controlCategorySummaries = [
  {
    category: "Organizational" as const,
    count: organizationalControls.length,
    summary: t(
      "Governance, policy, supplier oversight, incident management, continuity, compliance, and documented operating discipline.",
      "Gouvernance, politique, pilotage fournisseur, gestion d'incident, continuité, conformité et discipline opérationnelle documentée.",
    ),
  },
  {
    category: "People" as const,
    count: peopleControls.length,
    summary: t(
      "Hiring, awareness, confidentiality, remote work, and reporting behaviors that make the human layer reliable.",
      "Recrutement, sensibilisation, confidentialité, télétravail et comportements de signalement qui rendent la couche humaine fiable.",
    ),
  },
  {
    category: "Physical" as const,
    count: physicalControls.length,
    summary: t(
      "Premises, access, equipment handling, environmental protection, and disposal controls that protect the real-world operating environment.",
      "Locaux, accès, gestion des équipements, protection environnementale et destruction sécurisée qui protègent l'environnement d'exploitation réel.",
    ),
  },
  {
    category: "Technological" as const,
    count: technologicalControls.length,
    summary: t(
      "Endpoints, identity, logging, vulnerabilities, cryptography, networks, development, and operational technology safeguards.",
      "Terminaux, identité, journalisation, vulnérabilités, cryptographie, réseaux, développement et protections technologiques opérationnelles.",
    ),
  },
];

export const moduleMap = new Map(learningModules.map((module) => [module.slug, module]));

export function getModuleBySlug(slug: string) {
  return moduleMap.get(slug);
}
