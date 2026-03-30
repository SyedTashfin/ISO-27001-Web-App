import {
  annexControls,
  controlCategorySummaries,
  type AnnexControlCategory,
  type FindingSeverity,
  type LocalizedText,
  type QuizQuestion,
} from "@/lib/course-data";

const text = (en: string, fr: string): LocalizedText => ({ en, fr });

const link = (href: string, en: string, fr: string) => ({
  href,
  label: text(en, fr),
});

const quiz = (
  id: string,
  promptEn: string,
  promptFr: string,
  explanationEn: string,
  explanationFr: string,
  correctOptionId: string,
  options: Array<{ id: string; en: string; fr: string }>,
): QuizQuestion => ({
  id,
  prompt: text(promptEn, promptFr),
  explanation: text(explanationEn, explanationFr),
  correctOptionId,
  options: options.map((option) => ({
    id: option.id,
    label: text(option.en, option.fr),
  })),
});

export type SiteNavigationItem = {
  href: string;
  label: LocalizedText;
};

export type PlatformStat = {
  value: string;
  label: LocalizedText;
};

export type HomeBenefit = {
  eyebrow: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
};

export type HowItWorksStep = {
  step: string;
  title: LocalizedText;
  body: LocalizedText;
};

export type TestimonialPlaceholder = {
  name: string;
  role: LocalizedText;
  quote: LocalizedText;
};

export type LearningCallout = {
  tone: "tip" | "warning" | "evidence";
  title: LocalizedText;
  body: LocalizedText;
};

export type LearningContentBlock = {
  title: LocalizedText;
  body: LocalizedText;
};

export type LearningModule = {
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
  learningObjectives: LocalizedText[];
  contentBlocks: LearningContentBlock[];
  examples: LocalizedText[];
  callouts: LearningCallout[];
  recap: LocalizedText[];
  keyArtifacts: LocalizedText[];
  outcomes: LocalizedText[];
  relatedLinks: { href: string; label: LocalizedText }[];
  quiz: QuizQuestion[];
};

export type ClauseExplorerEntry = {
  clause: string;
  title: LocalizedText;
  simple: LocalizedText;
  professional: LocalizedText;
  businessMeaning: LocalizedText;
  auditorEvidence: LocalizedText[];
  commonMistakes: LocalizedText[];
  exampleNonconformities: Array<{
    severity: FindingSeverity;
    detail: LocalizedText;
  }>;
  linkedControls: string[];
  terminology: Array<{
    term: LocalizedText;
    explanation: LocalizedText;
  }>;
};

export type ControlType = "Directive" | "Preventive" | "Detective" | "Corrective";

export type ControlLibraryEntry = {
  code: string;
  category: AnnexControlCategory;
  name: LocalizedText;
  shortExplanation: LocalizedText;
  businessMeaning: LocalizedText;
  exampleImplementation: LocalizedText;
  relatedRisks: LocalizedText[];
  relatedEvidence: LocalizedText[];
  relatedQuizLinks: { href: string; label: LocalizedText }[];
  businessTheme: LocalizedText;
  controlType: ControlType;
  keywords: string[];
};

export type RiskLabScenario = {
  id: string;
  company: string;
  title: LocalizedText;
  sector: LocalizedText;
  location: LocalizedText;
  context: LocalizedText;
  assets: LocalizedText[];
  threats: LocalizedText[];
  vulnerabilities: LocalizedText[];
  recommendedControls: string[];
  teachingFocus: LocalizedText[];
};

export type SoaTeachingCard = {
  title: LocalizedText;
  body: LocalizedText;
};

export type NonconformityCase = {
  id: string;
  title: LocalizedText;
  context: LocalizedText;
  classification: FindingSeverity;
  why: LocalizedText;
  correctiveAction: LocalizedText[];
  relatedClause: string;
  relatedControls: string[];
  followUpQuestion: LocalizedText;
};

export type CompareFramework = {
  id: string;
  name: string;
  title: LocalizedText;
  type: LocalizedText;
  purpose: LocalizedText;
  whoUsesIt: LocalizedText;
  legalStatus: LocalizedText;
  businessRelevance: LocalizedText;
};

export type GlossaryEntry = {
  slug: string;
  term: LocalizedText;
  plainExplanation: LocalizedText;
  professionalExplanation: LocalizedText;
  exampleInContext: LocalizedText;
  topic: LocalizedText;
  audioStatus: LocalizedText;
};

export type PhraseLibraryEntry = {
  situation: LocalizedText;
  english: string;
  french: string;
  note: LocalizedText;
};

export type PracticeTopic =
  | "clauses"
  | "controls"
  | "audit"
  | "risk"
  | "glossary";

type PracticeQuestionBase = {
  id: string;
  type:
    | "multiple-choice"
    | "true-false"
    | "matching"
    | "scenario-classification"
    | "clause-control-link"
    | "glossary-recall";
  topic: PracticeTopic;
  prompt: LocalizedText;
  explanation: LocalizedText;
};

export type PracticeMultipleChoiceQuestion = PracticeQuestionBase & {
  type: "multiple-choice";
  options: Array<{ id: string; label: LocalizedText }>;
  correctOptionId: string;
};

export type PracticeTrueFalseQuestion = PracticeQuestionBase & {
  type: "true-false";
  correctValue: boolean;
};

export type PracticeMatchingQuestion = PracticeQuestionBase & {
  type: "matching";
  prompts: Array<{ id: string; label: LocalizedText }>;
  options: Array<{ id: string; label: LocalizedText }>;
  correctMatches: Record<string, string>;
};

export type PracticeScenarioClassificationQuestion = PracticeQuestionBase & {
  type: "scenario-classification";
  caseContext: LocalizedText;
  options: Array<{ id: FindingSeverity; label: LocalizedText }>;
  correctOptionId: FindingSeverity;
  relatedClause: string;
  relatedControls: string[];
};

export type PracticeLinkQuestion = PracticeQuestionBase & {
  type: "clause-control-link";
  leftLabel: LocalizedText;
  options: Array<{ id: string; label: LocalizedText }>;
  correctOptionId: string;
};

export type PracticeGlossaryRecallQuestion = PracticeQuestionBase & {
  type: "glossary-recall";
  term: LocalizedText;
  options: Array<{ id: string; label: LocalizedText }>;
  correctOptionId: string;
};

export type PracticeQuestion =
  | PracticeMultipleChoiceQuestion
  | PracticeTrueFalseQuestion
  | PracticeMatchingQuestion
  | PracticeScenarioClassificationQuestion
  | PracticeLinkQuestion
  | PracticeGlossaryRecallQuestion;

export const siteNavigation: SiteNavigationItem[] = [
  { href: "/", label: text("Home", "Accueil") },
  { href: "/learn", label: text("Learn", "Apprendre") },
  { href: "/mock-exam", label: text("Mock Exam", "Examen Blanc") },
  { href: "/implementation-journey", label: text("Journey", "Parcours") },
  { href: "/case-studies", label: text("Case Studies", "Études de cas") },
  { href: "/practice", label: text("Practice", "Pratique") },
  { href: "/risk-lab", label: text("Risk Lab", "Laboratoire Risques") },
  { href: "/audit-lab", label: text("Audit Lab", "Laboratoire Audit") },
  { href: "/control-library", label: text("Control Library", "Bibliothèque des mesures") },
  { href: "/glossary", label: text("Glossary", "Glossaire") },
  { href: "/dashboard", label: text("Dashboard", "Tableau de bord") },
];

export const platformStats: PlatformStat[] = [
  { value: "12", label: text("guided modules", "modules guidés") },
  { value: "93", label: text("Annex A controls", "mesures Annexe A") },
  { value: "20", label: text("nonconformity cases", "cas de non-conformité") },
  { value: "12", label: text("implementation checkpoints", "étapes de mise en oeuvre") },
];

export const homeBenefits: HomeBenefit[] = [
  {
    eyebrow: text("Plain first", "Simple d'abord"),
    title: text("Learn the standard without legalistic fog", "Comprendre la norme sans brouillard juridique"),
    body: text(
      "Every concept is introduced in plain language, then expanded into the professional version used in audits, customer reviews, and implementation work.",
      "Chaque concept est introduit en langage simple puis développé dans sa version professionnelle utilisée en audit, en revue client et en mise en oeuvre.",
    ),
  },
  {
    eyebrow: text("Bilingual by design", "Bilingue par conception"),
    title: text("Move between English and French naturally", "Passer naturellement de l'anglais au français"),
    body: text(
      "Use English-only, French-only, or dual mode across lessons, controls, glossary entries, and practice prompts.",
      "Utilisez le mode anglais, français ou double sur les leçons, les mesures, le glossaire et les exercices.",
    ),
  },
  {
    eyebrow: text("Operational depth", "Profondeur opérationnelle"),
    title: text("Work through risk, SoA, and audit decisions", "Travailler risque, SoA et décisions d'audit"),
    body: text(
      "The platform teaches risk-based control selection, statement of applicability logic, and evidence-led audit reasoning instead of checklist memorization.",
      "La plateforme enseigne la sélection des mesures par le risque, la logique de la déclaration d'applicabilité et le raisonnement d'audit fondé sur la preuve plutôt que la mémorisation de checklists.",
    ),
  },
];

export const homeHowItWorks: HowItWorksStep[] = [
  {
    step: "01",
    title: text("Learn the system", "Apprendre le système"),
    body: text(
      "Start with the guided path to understand what ISO 27001 is, why businesses pursue it, and how clauses 4 to 10 structure the ISMS.",
      "Commencez par le parcours guidé pour comprendre ce qu'est l'ISO 27001, pourquoi les entreprises la poursuivent et comment les clauses 4 à 10 structurent le SMSI.",
    ),
  },
  {
    step: "02",
    title: text("Practice realistic decisions", "Pratiquer des décisions réalistes"),
    body: text(
      "Use the Practice, Risk Lab, and Audit Lab sections to classify nonconformities, build risk registers, and connect treatment decisions to controls.",
      "Utilisez les sections Pratique, Risk Lab et Audit Lab pour qualifier des non-conformités, construire des registres de risques et relier les décisions de traitement aux mesures.",
    ),
  },
  {
    step: "03",
    title: text("Track your readiness", "Suivre votre progression"),
    body: text(
      "The dashboard consolidates modules, weak areas, vocabulary growth, and scenario completions so you know what still needs work.",
      "Le tableau de bord consolide modules, zones faibles, progression vocabulaire et scénarios terminés pour savoir ce qu'il reste à travailler.",
    ),
  },
];

export const testimonialPlaceholders: TestimonialPlaceholder[] = [
  {
    name: "Student profile",
    role: text("Cybersecurity student in Paris", "Étudiant cybersécurité à Paris"),
    quote: text(
      "Placeholder: explain how the platform helped connect theory to interviews and entry-level GRC work.",
      "Placeholder : expliquer comment la plateforme a relié la théorie aux entretiens et au travail GRC junior.",
    ),
  },
  {
    name: "Ops profile",
    role: text("Junior compliance analyst", "Analyste conformité junior"),
    quote: text(
      "Placeholder: describe using the bilingual mode to prepare for meetings with French stakeholders and English-speaking auditors.",
      "Placeholder : décrire l'usage du mode bilingue pour préparer des réunions avec des parties prenantes françaises et des auditeurs anglophones.",
    ),
  },
  {
    name: "Founder profile",
    role: text("SaaS founder preparing for certification", "Fondateur SaaS préparant la certification"),
    quote: text(
      "Placeholder: highlight practical value around scope, SoA, and evidence before a certification project starts.",
      "Placeholder : mettre en avant l'intérêt pratique autour du périmètre, de la SoA et de la preuve avant le lancement d'un projet de certification.",
    ),
  },
];

export const terminologySpotlight = [
  {
    term: text(
      "Information Security Management System",
      "Système de management de la sécurité de l'information",
    ),
    explanation: text(
      "The structured management framework that ISO 27001 certifies.",
      "Le cadre de management structuré que l'ISO 27001 certifie.",
    ),
  },
  {
    term: text("Risk assessment", "Analyse des risques"),
    explanation: text(
      "The process used to identify, analyze, and prioritize information security risks.",
      "Le processus utilisé pour identifier, analyser et prioriser les risques de sécurité de l'information.",
    ),
  },
  {
    term: text("Statement of Applicability", "Déclaration d’applicabilité"),
    explanation: text(
      "The core artifact linking treatment decisions to applicable Annex A controls.",
      "L'artefact central qui relie les décisions de traitement aux mesures applicables de l'Annexe A.",
    ),
  },
  {
    term: text("Nonconformity", "Non-conformité"),
    explanation: text(
      "An evidence-based gap against a requirement or expected control operation.",
      "Un écart démontré par la preuve par rapport à une exigence ou au fonctionnement attendu d'une mesure.",
    ),
  },
  {
    term: text("Control", "Mesure"),
    explanation: text(
      "A governance, people, physical, or technological safeguard selected to treat risk.",
      "Une protection organisationnelle, humaine, physique ou technologique sélectionnée pour traiter un risque.",
    ),
  },
  {
    term: text("Audit evidence", "Preuve d’audit"),
    explanation: text(
      "Records, observations, interviews, or outputs that support an audit conclusion.",
      "Des enregistrements, observations, entretiens ou sorties systèmes qui soutiennent une conclusion d'audit.",
    ),
  },
];

export const learningModules: LearningModule[] = [
  {
    slug: "what-is-iso-27001",
    icon: "ShieldCheck",
    level: text("Beginner", "Débutant"),
    durationMinutes: 16,
    eyebrow: text("Start Here", "Point de départ"),
    title: text("What is ISO 27001?", "Qu’est-ce que l’ISO 27001 ?"),
    summary: text(
      "Understand ISO/IEC 27001 as a management-system standard for governing information security, not as a loose list of controls.",
      "Comprendre l'ISO/IEC 27001 comme une norme de système de management de la sécurité de l'information, et non comme une simple liste de mesures.",
    ),
    simple: text(
      "ISO 27001 gives an organization a structured way to protect information, prove that security is managed seriously, and improve over time.",
      "L'ISO 27001 donne à une organisation une manière structurée de protéger l'information, de prouver que la sécurité est pilotée sérieusement et de s'améliorer dans le temps.",
    ),
    professional: text(
      "ISO/IEC 27001:2022 defines certifiable requirements for establishing, implementing, maintaining, and continually improving an ISMS. Certification assesses whether that system operates effectively in context.",
      "L'ISO/IEC 27001:2022 définit des exigences certifiables pour établir, mettre en oeuvre, maintenir et améliorer en continu un SMSI. La certification évalue si ce système fonctionne efficacement dans son contexte.",
    ),
    practical: text(
      "A French SaaS company often uses ISO 27001 to answer customer due diligence, align internal owners, and replace ad hoc security promises with repeatable governance.",
      "Une société SaaS française utilise souvent l'ISO 27001 pour répondre aux due diligences clients, aligner les responsables internes et remplacer les promesses sécurité ad hoc par une gouvernance répétable.",
    ),
    exercise: text(
      "Explain ISO 27001 in one sentence to a non-technical manager, then explain it again to an auditor using the words system, risk, and evidence.",
      "Expliquez l'ISO 27001 en une phrase à un manager non technique, puis réexpliquez-la à un auditeur en utilisant les mots système, risque et preuve.",
    ),
    learningObjectives: [
      text("Describe ISO 27001 in plain language.", "Décrire l'ISO 27001 en langage simple."),
      text("Separate the ISMS from the control library.", "Distinguer le SMSI de la bibliothèque de mesures."),
      text("Understand why certification is about the system working in context.", "Comprendre que la certification vise l'efficacité du système dans son contexte."),
    ],
    contentBlocks: [
      {
        title: text("The standard certifies a management system", "La norme certifie un système de management"),
        body: text(
          "The key question is not whether every possible safeguard exists. It is whether the organization built a risk-based ISMS, can operate it, and can improve it with evidence.",
          "La question clé n'est pas de savoir si toutes les protections imaginables existent. Elle est de savoir si l'organisation a construit un SMSI fondé sur le risque, sait le faire fonctionner et l'améliorer avec des preuves.",
        ),
      },
      {
        title: text("Controls support the system, they do not replace it", "Les mesures soutiennent le système, elles ne le remplacent pas"),
        body: text(
          "Annex A is important, but the certifiable backbone still lives in clauses 4 to 10. Strong organizations can explain how governance, risk, controls, and review fit together.",
          "L'Annexe A est importante, mais l'ossature certifiable reste dans les clauses 4 à 10. Les organisations matures savent expliquer comment gouvernance, risque, mesures et revue s'articulent.",
        ),
      },
    ],
    examples: [
      text("Customer security questionnaires become easier when scope, ownership, and evidence are already structured.", "Les questionnaires sécurité clients deviennent plus simples lorsque périmètre, responsabilités et preuves sont déjà structurés."),
      text("Interview answers sound more credible when teams describe the same ISMS logic instead of personal habits.", "Les réponses en entretien paraissent plus crédibles lorsque les équipes décrivent la même logique de SMSI plutôt que des habitudes individuelles."),
    ],
    callouts: [
      {
        tone: "tip",
        title: text("Plain-language elevator pitch", "Pitch simple"),
        body: text(
          "ISO 27001 is the operating system for how a business manages information security.",
          "L'ISO 27001 est le système d'exploitation de la manière dont une entreprise pilote la sécurité de l'information.",
        ),
      },
      {
        tone: "warning",
        title: text("Avoid checklist language", "Éviter le langage checklist"),
        body: text(
          "If you explain the standard as a checklist, you hide the management-system logic that auditors and employers care about.",
          "Si vous expliquez la norme comme une checklist, vous masquez la logique de système de management que les auditeurs et employeurs attendent.",
        ),
      },
    ],
    recap: [
      text("ISO 27001 is about an ISMS.", "L'ISO 27001 porte sur un SMSI."),
      text("Certification checks effectiveness in context.", "La certification vérifie l'efficacité dans le contexte."),
      text("Controls matter, but they sit inside a broader management system.", "Les mesures comptent, mais elles s'inscrivent dans un système de management plus large."),
    ],
    keyArtifacts: [
      text("ISMS scope statement", "Déclaration de périmètre du SMSI"),
      text("Security policy and governance rhythm", "Politique sécurité et rythme de gouvernance"),
      text("Evidence that risk decisions are followed", "Preuves que les décisions de risque sont suivies"),
    ],
    outcomes: [
      text("Explain ISO 27001 credibly to beginners.", "Expliquer l'ISO 27001 de façon crédible à des débutants."),
      text("Frame certification as a business operating model.", "Présenter la certification comme un mode de fonctionnement métier."),
      text("Set up the logic for the rest of the course.", "Poser la logique pour le reste du parcours."),
    ],
    relatedLinks: [
      link("/learn/why-businesses-pursue-iso-27001", "Why businesses pursue it", "Pourquoi les entreprises la poursuivent"),
      link("/glossary", "Study key terms", "Étudier les termes clés"),
    ],
    quiz: [
      quiz(
        "m1-q1",
        "What is the main thing ISO 27001 certifies?",
        "Quel est l'élément principal que certifie l'ISO 27001 ?",
        "Certification evaluates the information security management system, not a random list of tools.",
        "La certification évalue le système de management de la sécurité de l'information, pas une liste aléatoire d'outils.",
        "b",
        [
          { id: "a", en: "Only technical controls", fr: "Uniquement des mesures techniques" },
          { id: "b", en: "The Information Security Management System", fr: "Le système de management de la sécurité de l'information" },
          { id: "c", en: "Only the supplier review process", fr: "Uniquement le processus de revue fournisseurs" },
        ],
      ),
      quiz(
        "m1-q2",
        "Why is calling ISO 27001 a checklist misleading?",
        "Pourquoi est-il trompeur d'appeler l'ISO 27001 une checklist ?",
        "It hides the governance, risk, and improvement logic that makes the standard operational.",
        "Cela masque la logique de gouvernance, de risque et d'amélioration qui rend la norme opérationnelle.",
        "a",
        [
          { id: "a", en: "Because the standard is a risk-based management system", fr: "Parce que la norme est un système de management fondé sur le risque" },
          { id: "b", en: "Because checklists are illegal", fr: "Parce que les checklists sont illégales" },
          { id: "c", en: "Because controls never matter", fr: "Parce que les mesures n'ont jamais d'importance" },
        ],
      ),
    ],
  },
  {
    slug: "why-businesses-pursue-iso-27001",
    icon: "Briefcase",
    level: text("Beginner", "Débutant"),
    durationMinutes: 14,
    eyebrow: text("Business Value", "Valeur métier"),
    title: text("Why businesses pursue ISO 27001", "Pourquoi les entreprises poursuivent l’ISO 27001"),
    summary: text(
      "See the commercial, governance, and operational reasons organizations invest in ISO 27001.",
      "Voir les raisons commerciales, de gouvernance et opérationnelles qui poussent les organisations à investir dans l'ISO 27001.",
    ),
    simple: text(
      "Businesses usually do not pursue ISO 27001 just for a logo. They want trust, structure, and a repeatable way to handle information security.",
      "Les entreprises ne poursuivent généralement pas l'ISO 27001 seulement pour un logo. Elles veulent de la confiance, de la structure et une façon répétable de gérer la sécurité de l'information.",
    ),
    professional: text(
      "Drivers often include customer assurance, enterprise procurement demands, regulatory expectations, risk ownership, and the need to scale security decisions across teams.",
      "Les moteurs incluent souvent l'assurance client, les exigences des achats grands comptes, les attentes réglementaires, la responsabilisation sur le risque et le besoin de faire passer à l'échelle les décisions sécurité.",
    ),
    practical: text(
      "For a growing company in France, ISO 27001 can reduce friction in sales cycles, clarify roles for engineering and operations, and strengthen the credibility of security claims.",
      "Pour une entreprise en croissance en France, l'ISO 27001 peut réduire les frictions des cycles de vente, clarifier les rôles entre ingénierie et opérations et renforcer la crédibilité des déclarations de sécurité.",
    ),
    exercise: text(
      "List three reasons a company might pursue ISO 27001 and rank them as commercial, governance, or operational.",
      "Listez trois raisons pour lesquelles une entreprise peut poursuivre l'ISO 27001 et classez-les en commercial, gouvernance ou opérationnel.",
    ),
    learningObjectives: [
      text("Explain the business case for ISO 27001.", "Expliquer le business case de l'ISO 27001."),
      text("Differentiate trust drivers from compliance drivers.", "Différencier les leviers de confiance des leviers de conformité."),
      text("Connect certification to day-to-day operating discipline.", "Relier la certification à la discipline opérationnelle quotidienne."),
    ],
    contentBlocks: [
      {
        title: text("Commercial credibility", "Crédibilité commerciale"),
        body: text(
          "Enterprise buyers and regulated customers want more than promises. ISO 27001 gives them a structured signal that security is governed and reviewed.",
          "Les acheteurs grands comptes et clients régulés veulent plus que des promesses. L'ISO 27001 leur donne un signal structuré que la sécurité est gouvernée et revue.",
        ),
      },
      {
        title: text("Internal discipline", "Discipline interne"),
        body: text(
          "The standard forces roles, routines, review cycles, and evidence. That often creates as much value internally as it does externally.",
          "La norme impose des rôles, des routines, des cycles de revue et des preuves. Cela crée souvent autant de valeur en interne qu'en externe.",
        ),
      },
    ],
    examples: [
      text("A security questionnaire response improves when the company can reference scope, risk method, and evidence instead of one-person knowledge.", "Une réponse à questionnaire sécurité s'améliore lorsque l'entreprise peut citer périmètre, méthode de risque et preuves plutôt qu'une connaissance portée par une seule personne."),
      text("A board discussion becomes clearer when risks and controls are reviewed in a structured cadence.", "Une discussion de direction devient plus claire lorsque risques et mesures sont revus selon une cadence structurée."),
    ],
    callouts: [
      {
        tone: "evidence",
        title: text("Evidence of value", "Preuves de valeur"),
        body: text(
          "Faster procurement answers, clearer ownership, and fewer contradictory audit answers are practical signs that the ISMS is helping.",
          "Des réponses achats plus rapides, une propriété plus claire et moins de réponses d'audit contradictoires sont des signes concrets que le SMSI aide réellement.",
        ),
      },
      {
        tone: "warning",
        title: text("Do not sell certification as zero risk", "Ne pas vendre la certification comme zéro risque"),
        body: text(
          "A certified organization still has risk. The value is that it governs risk deliberately and can prove that discipline.",
          "Une organisation certifiée a toujours des risques. La valeur vient du fait qu'elle les gouverne délibérément et peut prouver cette discipline.",
        ),
      },
    ],
    recap: [
      text("Businesses pursue ISO 27001 for trust and structure.", "Les entreprises poursuivent l'ISO 27001 pour la confiance et la structure."),
      text("Commercial value and operational value usually reinforce each other.", "La valeur commerciale et la valeur opérationnelle se renforcent souvent."),
      text("The business case should stay grounded in risk and governance.", "Le business case doit rester ancré dans le risque et la gouvernance."),
    ],
    keyArtifacts: [
      text("Customer assurance narrative", "Narratif d'assurance client"),
      text("Leadership sponsorship", "Sponsoring de la direction"),
      text("Risk and control ownership map", "Cartographie des responsabilités risque et mesures"),
    ],
    outcomes: [
      text("Describe why companies invest in the standard.", "Décrire pourquoi les entreprises investissent dans la norme."),
      text("Connect certification to real business pain points.", "Relier la certification à de vrais points de douleur métier."),
      text("Speak about ISO 27001 without overclaiming.", "Parler de l'ISO 27001 sans surpromettre."),
    ],
    relatedLinks: [
      link("/learn/isms-and-cia-triad", "Move into ISMS basics", "Passer aux bases du SMSI"),
      link("/compare", "Compare with other frameworks", "Comparer avec d'autres référentiels"),
    ],
    quiz: [
      quiz(
        "m2-q1",
        "Which is a realistic reason for pursuing ISO 27001?",
        "Quelle est une raison réaliste de poursuivre l'ISO 27001 ?",
        "Organizations usually want repeatable trust and governance, not magical risk elimination.",
        "Les organisations recherchent généralement une confiance et une gouvernance répétables, pas une disparition magique du risque.",
        "c",
        [
          { id: "a", en: "To eliminate every security incident forever", fr: "Pour éliminer tous les incidents de sécurité pour toujours" },
          { id: "b", en: "To avoid documenting security decisions", fr: "Pour éviter de documenter les décisions sécurité" },
          { id: "c", en: "To show a structured, risk-based approach to security", fr: "Pour démontrer une approche structurée et fondée sur le risque" },
        ],
      ),
      quiz(
        "m2-q2",
        "What is a weak business argument for certification?",
        "Quel est un argument faible pour la certification ?",
        "Claiming that certification means no more risk misunderstands the standard.",
        "Affirmer que la certification signifie l'absence de risque montre une mauvaise compréhension de la norme.",
        "b",
        [
          { id: "a", en: "It can support enterprise sales", fr: "Elle peut soutenir les ventes grands comptes" },
          { id: "b", en: "It guarantees perfect security", fr: "Elle garantit une sécurité parfaite" },
          { id: "c", en: "It clarifies internal accountability", fr: "Elle clarifie la responsabilité interne" },
        ],
      ),
    ],
  },
  {
    slug: "isms-and-cia-triad",
    icon: "Network",
    level: text("Beginner to Intermediate", "Débutant à intermédiaire"),
    durationMinutes: 18,
    eyebrow: text("Operating Model", "Modèle de fonctionnement"),
    title: text("ISMS and the CIA triad", "Le SMSI et la triade CIA"),
    summary: text(
      "Learn how confidentiality, integrity, and availability fit inside the wider operating logic of an ISMS.",
      "Comprendre comment confidentialité, intégrité et disponibilité s'inscrivent dans la logique de fonctionnement plus large d'un SMSI.",
    ),
    simple: text(
      "The CIA triad helps explain what needs protection. The ISMS explains how the organization decides, measures, and improves that protection.",
      "La triade CIA aide à expliquer ce qu'il faut protéger. Le SMSI explique comment l'organisation décide, mesure et améliore cette protection.",
    ),
    professional: text(
      "The ISMS connects context, assets, objectives, risks, controls, competence, monitoring, and improvement. CIA is a useful security lens, but it is not the management system by itself.",
      "Le SMSI relie contexte, actifs, objectifs, risques, mesures, compétences, surveillance et amélioration. La CIA est un bon prisme sécurité, mais ce n'est pas le système de management à elle seule.",
    ),
    practical: text(
      "A payroll file may require confidentiality, an ERP workflow may depend on integrity, and a support platform may depend on availability. The ISMS helps the business decide how to balance these needs and prove the decisions.",
      "Un fichier de paie exige de la confidentialité, un workflow ERP dépend de l'intégrité et une plateforme support dépend de la disponibilité. Le SMSI aide l'entreprise à arbitrer ces besoins et à prouver ses décisions.",
    ),
    exercise: text(
      "Pick one business process and identify what confidentiality, integrity, and availability mean for it in practical terms.",
      "Choisissez un processus métier et identifiez ce que confidentialité, intégrité et disponibilité signifient pour lui en pratique.",
    ),
    learningObjectives: [
      text("Understand what the CIA triad explains well.", "Comprendre ce que la triade CIA explique bien."),
      text("Understand what the ISMS adds beyond CIA.", "Comprendre ce que le SMSI ajoute au-delà de la CIA."),
      text("Apply CIA reasoning to real business processes.", "Appliquer la logique CIA à de vrais processus métier."),
    ],
    contentBlocks: [
      {
        title: text("CIA is a protection lens", "La CIA est un prisme de protection"),
        body: text(
          "Confidentiality asks who should see information. Integrity asks whether it can be trusted. Availability asks whether it is there when needed.",
          "La confidentialité demande qui doit voir l'information. L'intégrité demande si l'on peut lui faire confiance. La disponibilité demande si elle est là au moment voulu.",
        ),
      },
      {
        title: text("The ISMS is the decision and evidence system", "Le SMSI est le système de décision et de preuve"),
        body: text(
          "The ISMS turns those protection needs into scope decisions, risk criteria, control choices, competence requirements, and review loops.",
          "Le SMSI transforme ces besoins de protection en décisions de périmètre, critères de risque, choix de mesures, exigences de compétence et boucles de revue.",
        ),
      },
    ],
    examples: [
      text("A CRM outage is mainly an availability issue, but the decision to accept recovery time is an ISMS governance question.", "Une panne de CRM est surtout un sujet de disponibilité, mais la décision d'accepter un temps de reprise est une question de gouvernance du SMSI."),
      text("Wrong customer data in a billing export is an integrity problem with risk, ownership, and evidence implications.", "Des données clients erronées dans un export de facturation représentent un problème d'intégrité avec des implications de risque, de responsabilité et de preuve."),
    ],
    callouts: [
      {
        tone: "tip",
        title: text("Use CIA to simplify discussions", "Utiliser la CIA pour simplifier les échanges"),
        body: text(
          "CIA is often the fastest way to make a security conversation understandable for non-specialists.",
          "La CIA est souvent la manière la plus rapide de rendre une discussion sécurité compréhensible pour des non-spécialistes.",
        ),
      },
      {
        tone: "warning",
        title: text("Do not confuse CIA with the full standard", "Ne pas confondre la CIA avec la norme complète"),
        body: text(
          "CIA helps frame protection goals, but ISO 27001 still expects governance, evidence, audits, and improvement.",
          "La CIA aide à cadrer les objectifs de protection, mais l'ISO 27001 attend toujours gouvernance, preuves, audits et amélioration.",
        ),
      },
    ],
    recap: [
      text("CIA explains protection priorities.", "La CIA explique les priorités de protection."),
      text("The ISMS explains how the business governs those priorities.", "Le SMSI explique comment l'entreprise gouverne ces priorités."),
      text("Both lenses are useful together.", "Les deux prismes sont utiles ensemble."),
    ],
    keyArtifacts: [
      text("Asset and process map", "Cartographie des actifs et processus"),
      text("Risk criteria linked to business impact", "Critères de risque liés à l'impact métier"),
      text("Metrics showing whether protection goals hold", "Indicateurs montrant si les objectifs de protection tiennent"),
    ],
    outcomes: [
      text("Explain CIA in practical business language.", "Expliquer la CIA en langage métier pratique."),
      text("Connect CIA to risk and governance.", "Relier la CIA au risque et à la gouvernance."),
      text("Use the ISMS as the operational wrapper around CIA.", "Utiliser le SMSI comme enveloppe opérationnelle de la CIA."),
    ],
    relatedLinks: [
      link("/learn/clauses-4-to-10", "Continue to clauses 4 to 10", "Continuer vers les clauses 4 à 10"),
      link("/risk-lab", "Apply CIA in risk scenarios", "Appliquer la CIA dans les scénarios de risque"),
    ],
    quiz: [
      quiz(
        "m3-q1",
        "What does the CIA triad mainly help explain?",
        "Que permet surtout d'expliquer la triade CIA ?",
        "CIA explains what kind of protection is needed: confidentiality, integrity, and availability.",
        "La CIA explique quel type de protection est nécessaire : confidentialité, intégrité et disponibilité.",
        "a",
        [
          { id: "a", en: "The protection objectives for information", fr: "Les objectifs de protection de l'information" },
          { id: "b", en: "The full audit programme", fr: "Le programme d'audit complet" },
          { id: "c", en: "Only the supplier contract wording", fr: "Uniquement la rédaction des contrats fournisseurs" },
        ],
      ),
      quiz(
        "m3-q2",
        "What does the ISMS add beyond the CIA triad?",
        "Qu'apporte le SMSI au-delà de la triade CIA ?",
        "The ISMS adds governance, risk decisions, monitoring, competence, and continual improvement.",
        "Le SMSI ajoute la gouvernance, les décisions de risque, la surveillance, les compétences et l'amélioration continue.",
        "c",
        [
          { id: "a", en: "Only physical security", fr: "Uniquement la sécurité physique" },
          { id: "b", en: "A list of passwords", fr: "Une liste de mots de passe" },
          { id: "c", en: "The management system that runs protection decisions", fr: "Le système de management qui pilote les décisions de protection" },
        ],
      ),
    ],
  },
  {
    slug: "clauses-4-to-10",
    icon: "ScrollText",
    level: text("Intermediate", "Intermédiaire"),
    durationMinutes: 24,
    eyebrow: text("Certifiable Core", "Noyau certifiable"),
    title: text("Clauses 4 to 10", "Clauses 4 à 10"),
    summary: text(
      "Learn the certifiable spine of the ISMS and how the clauses connect from context through improvement.",
      "Comprendre la colonne vertébrale certifiable du SMSI et la manière dont les clauses se relient du contexte à l'amélioration.",
    ),
    simple: text(
      "Clauses 4 to 10 describe how the ISMS is scoped, led, planned, supported, operated, reviewed, and improved.",
      "Les clauses 4 à 10 décrivent comment le SMSI est cadré, piloté, planifié, soutenu, exploité, revu et amélioré.",
    ),
    professional: text(
      "These clauses define the certifiable management-system requirements. Annex A helps with treatment logic, but clauses 4 to 10 remain the main audit backbone.",
      "Ces clauses définissent les exigences certifiables du système de management. L'Annexe A aide pour la logique de traitement, mais les clauses 4 à 10 restent l'ossature principale de l'audit.",
    ),
    practical: text(
      "Weak planning leads to weak risk treatment. Weak performance evaluation leads to shallow management reviews. The clauses operate as one connected system.",
      "Une planification faible mène à un traitement du risque faible. Une évaluation de la performance faible mène à des revues de direction superficielles. Les clauses fonctionnent comme un système connecté.",
    ),
    exercise: text(
      "Take one process such as onboarding and map which clauses shape it, then identify what evidence an auditor would expect.",
      "Prenez un processus comme l'onboarding, cartographiez les clauses qui le structurent puis identifiez les preuves attendues par un auditeur.",
    ),
    learningObjectives: [
      text("Explain what each clause is trying to achieve.", "Expliquer ce que chaque clause cherche à obtenir."),
      text("Recognize typical evidence by clause.", "Reconnaître les preuves typiques par clause."),
      text("See how clause weaknesses affect the whole ISMS.", "Voir comment les faiblesses d'une clause affectent tout le SMSI."),
    ],
    contentBlocks: [
      {
        title: text("The clauses are a management loop", "Les clauses forment une boucle de management"),
        body: text(
          "Context and leadership shape planning. Planning shapes operation. Performance evaluation and improvement close the loop and force correction.",
          "Le contexte et le leadership structurent la planification. La planification structure l'exploitation. L'évaluation de la performance et l'amélioration ferment la boucle et imposent la correction.",
        ),
      },
      {
        title: text("Auditors look for traceability", "Les auditeurs cherchent la traçabilité"),
        body: text(
          "A mature organization can show how objectives, risks, controls, monitoring, audits, and corrective actions link together across clauses.",
          "Une organisation mature sait montrer comment objectifs, risques, mesures, surveillance, audits et actions correctives se relient à travers les clauses.",
        ),
      },
    ],
    examples: [
      text("Clause 4 drives scope. Clause 6 drives risk treatment. Clause 9 checks whether those decisions are working.", "La clause 4 pilote le périmètre. La clause 6 pilote le traitement du risque. La clause 9 vérifie si ces décisions fonctionnent."),
      text("A missing management review is not just a paperwork gap. It weakens the improvement loop of the entire system.", "L'absence de revue de direction n'est pas qu'un manque documentaire. Elle affaiblit la boucle d'amélioration de tout le système."),
    ],
    callouts: [
      {
        tone: "evidence",
        title: text("Common clause evidence", "Preuves de clause fréquentes"),
        body: text(
          "Scope statements, risk method, objectives, competence records, operational procedures, internal audit reports, and corrective actions are all recurring evidence sources.",
          "Déclarations de périmètre, méthode de risque, objectifs, preuves de compétence, procédures opérationnelles, rapports d'audit interne et actions correctives sont des sources de preuve récurrentes.",
        ),
      },
      {
        tone: "tip",
        title: text("Think in inputs and outputs", "Penser en intrants et extrants"),
        body: text(
          "Each clause receives inputs from earlier clauses and produces outputs for later ones. That view makes audits far easier to explain.",
          "Chaque clause reçoit des intrants des clauses précédentes et produit des extrants pour les suivantes. Cette vue rend les audits beaucoup plus faciles à expliquer.",
        ),
      },
    ],
    recap: [
      text("Clauses 4 to 10 are the certifiable backbone.", "Les clauses 4 à 10 forment l'ossature certifiable."),
      text("They function as one connected loop.", "Elles fonctionnent comme une boucle connectée."),
      text("Good evidence usually shows traceability between clauses.", "Une bonne preuve montre généralement une traçabilité entre les clauses."),
    ],
    keyArtifacts: [
      text("Clause map", "Carte des clauses"),
      text("Internal audit and management review cadence", "Cadence d'audit interne et de revue de direction"),
      text("Corrective action register", "Registre des actions correctives"),
    ],
    outcomes: [
      text("Walk someone through clauses 4 to 10.", "Faire parcourir à quelqu'un les clauses 4 à 10."),
      text("Connect clause requirements to audit evidence.", "Relier les exigences de clause à la preuve d'audit."),
      text("Prepare for the clause explorer and audit lab.", "Préparer l'explorateur de clauses et l'audit lab."),
    ],
    relatedLinks: [
      link("/learn/clauses", "Open the clause explorer", "Ouvrir l'explorateur de clauses"),
      link("/audit-lab", "Practice audit evidence", "Pratiquer la preuve d'audit"),
    ],
    quiz: [
      quiz(
        "m4-q1",
        "Where are the main certifiable requirements of ISO 27001?",
        "Où se trouvent les principales exigences certifiables de l'ISO 27001 ?",
        "The main certifiable requirements sit in clauses 4 to 10.",
        "Les principales exigences certifiables se situent dans les clauses 4 à 10.",
        "b",
        [
          { id: "a", en: "Only in Annex A", fr: "Uniquement dans l'Annexe A" },
          { id: "b", en: "In clauses 4 to 10", fr: "Dans les clauses 4 à 10" },
          { id: "c", en: "Only in ISO 19011", fr: "Uniquement dans l'ISO 19011" },
        ],
      ),
      quiz(
        "m4-q2",
        "Why is a missing management review serious?",
        "Pourquoi l'absence de revue de direction est-elle sérieuse ?",
        "Management review is part of the system's performance and improvement loop, not just an administrative task.",
        "La revue de direction fait partie de la boucle de performance et d'amélioration du système, pas seulement d'une tâche administrative.",
        "c",
        [
          { id: "a", en: "Because it always affects only HR", fr: "Parce qu'elle n'affecte que les RH" },
          { id: "b", en: "Because it replaces risk assessment", fr: "Parce qu'elle remplace l'analyse des risques" },
          { id: "c", en: "Because it weakens performance evaluation and improvement", fr: "Parce qu'elle affaiblit l'évaluation de la performance et l'amélioration" },
        ],
      ),
    ],
  },
  {
    slug: "annex-a-and-93-controls",
    icon: "LayoutGrid",
    level: text("Intermediate", "Intermédiaire"),
    durationMinutes: 20,
    eyebrow: text("Control Library", "Bibliothèque des mesures"),
    title: text("Annex A and the 93 controls", "L’Annexe A et les 93 mesures"),
    summary: text(
      "Understand how the 2022 control set is grouped and why the control library should be used through a risk-based lens.",
      "Comprendre comment le jeu de mesures 2022 est structuré et pourquoi la bibliothèque de mesures doit être utilisée au travers d'un prisme fondé sur le risque.",
    ),
    simple: text(
      "Annex A gives you 93 possible controls grouped into organizational, people, physical, and technological categories.",
      "L'Annexe A vous donne 93 mesures possibles regroupées en catégories organisationnelles, humaines, physiques et technologiques.",
    ),
    professional: text(
      "The 2022 version reorganized controls into four categories and expects organizations to justify applicability based on risk treatment, not blind adoption.",
      "La version 2022 réorganise les mesures en quatre catégories et attend des organisations qu'elles justifient l'applicabilité par le traitement du risque, et non par une adoption aveugle.",
    ),
    practical: text(
      "A startup may justify strong technological and supplier controls, while a manufacturing business also needs deeper physical controls. The control set is the same; the applicability pattern differs.",
      "Une startup peut justifier des mesures technologiques et fournisseurs fortes, alors qu'une entreprise industrielle aura aussi besoin de mesures physiques plus profondes. Le jeu de mesures est le même ; le schéma d'applicabilité diffère.",
    ),
    exercise: text(
      "Pick one scenario and identify which category of controls is likely to be most important first, then explain why that is still not enough by itself.",
      "Choisissez un scénario et identifiez quelle catégorie de mesures est probablement la plus importante au départ, puis expliquez pourquoi cela ne suffit toujours pas à elle seule.",
    ),
    learningObjectives: [
      text("Recognize the four Annex A categories.", "Reconnaître les quatre catégories de l'Annexe A."),
      text("Understand why control selection must be justified.", "Comprendre pourquoi la sélection des mesures doit être justifiée."),
      text("Use the control library as an implementation aid, not a checklist.", "Utiliser la bibliothèque de mesures comme aide à la mise en oeuvre, pas comme checklist."),
    ],
    contentBlocks: [
      {
        title: text("A shared library, not a shared answer", "Une bibliothèque commune, pas une réponse commune"),
        body: text(
          "Every organization sees the same 93 controls, but not every organization applies them in the same way or to the same depth.",
          "Chaque organisation voit les mêmes 93 mesures, mais toutes ne les appliquent pas de la même façon ni à la même profondeur.",
        ),
      },
      {
        title: text("Risk treatment drives applicability", "Le traitement du risque pilote l'applicabilité"),
        body: text(
          "The control library becomes useful when each selected control can be traced back to risk, legal obligations, contractual expectations, or strategic decisions.",
          "La bibliothèque devient utile lorsque chaque mesure retenue peut être reliée au risque, aux obligations légales, aux attentes contractuelles ou aux décisions stratégiques.",
        ),
      },
    ],
    examples: [
      text("Control 5.19 matters heavily when supplier exposure is material to the service.", "La mesure 5.19 pèse fortement lorsque l'exposition fournisseur est importante pour le service."),
      text("Physical controls become central when the business runs warehouses, labs, or visitor-access areas.", "Les mesures physiques deviennent centrales lorsque l'entreprise exploite des entrepôts, des laboratoires ou des zones à visiteurs."),
    ],
    callouts: [
      {
        tone: "warning",
        title: text("Blind control selection is weak governance", "La sélection aveugle des mesures est une mauvaise gouvernance"),
        body: text(
          "Auditors expect a rationale for why a control is applicable, excluded, or only partly implemented.",
          "Les auditeurs attendent une justification sur le caractère applicable, exclu ou partiellement mis en oeuvre d'une mesure.",
        ),
      },
      {
        tone: "tip",
        title: text("Use ISO 27002 as the interpretation layer", "Utiliser l'ISO 27002 comme couche d'interprétation"),
        body: text(
          "ISO 27002 helps teams understand what a control can look like in real implementation rather than just reading the short title.",
          "L'ISO 27002 aide les équipes à comprendre à quoi peut ressembler une mesure en implémentation réelle, au lieu de lire seulement son intitulé court.",
        ),
      },
    ],
    recap: [
      text("Annex A contains 93 controls in the 2022 version.", "L'Annexe A contient 93 mesures dans la version 2022."),
      text("Controls are grouped into four categories.", "Les mesures sont regroupées en quatre catégories."),
      text("Applicability must stay tied to risk and context.", "L'applicabilité doit rester liée au risque et au contexte."),
    ],
    keyArtifacts: [
      text("Control applicability rationale", "Rationnel d'applicabilité des mesures"),
      text("Implementation notes informed by ISO 27002", "Notes de mise en oeuvre éclairées par l'ISO 27002"),
      text("Evidence references for selected controls", "Références de preuve pour les mesures retenues"),
    ],
    outcomes: [
      text("Navigate the 93 controls confidently.", "Parcourir les 93 mesures avec assurance."),
      text("Explain why control categories differ by scenario.", "Expliquer pourquoi les catégories de mesures diffèrent selon le scénario."),
      text("Prepare for the control library and SoA work.", "Se préparer à la bibliothèque de mesures et au travail de SoA."),
    ],
    relatedLinks: [
      link("/control-library", "Open the control library", "Ouvrir la bibliothèque des mesures"),
      link("/learn/iso-27002-vs-iso-27001", "See ISO 27002 in context", "Voir l'ISO 27002 dans son contexte"),
    ],
    quiz: [
      quiz(
        "m5-q1",
        "How many controls are in Annex A of ISO/IEC 27001:2022?",
        "Combien de mesures figurent dans l'Annexe A de l'ISO/IEC 27001:2022 ?",
        "The 2022 structure contains 93 controls.",
        "La structure 2022 contient 93 mesures.",
        "b",
        [
          { id: "a", en: "114", fr: "114" },
          { id: "b", en: "93", fr: "93" },
          { id: "c", en: "64", fr: "64" },
        ],
      ),
      quiz(
        "m5-q2",
        "What should mainly decide whether a control is applicable?",
        "Qu'est-ce qui doit principalement décider si une mesure est applicable ?",
        "Applicability should come from risk treatment, context, and obligations.",
        "L'applicabilité doit venir du traitement du risque, du contexte et des obligations.",
        "a",
        [
          { id: "a", en: "Risk treatment and business context", fr: "Le traitement du risque et le contexte métier" },
          { id: "b", en: "What another company did", fr: "Ce qu'une autre entreprise a fait" },
          { id: "c", en: "The desire to include every control", fr: "L'envie d'inclure toutes les mesures" },
        ],
      ),
    ],
  },
  {
    slug: "risk-assessment-and-treatment",
    icon: "ShieldAlert",
    level: text("Intermediate", "Intermédiaire"),
    durationMinutes: 22,
    eyebrow: text("Risk Logic", "Logique de risque"),
    title: text("Risk assessment and risk treatment", "Analyse des risques et traitement du risque"),
    summary: text(
      "Move from identifying assets, threats, and vulnerabilities to selecting a treatment path and linked controls.",
      "Passer de l'identification des actifs, menaces et vulnérabilités à la sélection d'un traitement et des mesures associées.",
    ),
    simple: text(
      "Risk assessment asks what could go wrong, why it matters, and how likely it is. Risk treatment asks what the business will do about it.",
      "L'analyse des risques demande ce qui pourrait mal tourner, pourquoi cela compte et à quel point c'est probable. Le traitement du risque demande ce que l'entreprise va faire à ce sujet.",
    ),
    professional: text(
      "A usable method identifies assets, threat scenarios, vulnerabilities, likelihood, impact, and risk criteria, then records treatment choices such as mitigate, avoid, transfer, or accept.",
      "Une méthode exploitable identifie actifs, scénarios de menace, vulnérabilités, vraisemblance, impact et critères de risque, puis enregistre des choix de traitement tels que réduire, éviter, transférer ou accepter.",
    ),
    practical: text(
      "A company may accept a low-risk marketing website issue, mitigate privileged-access risk, transfer some supplier outage exposure, and avoid a risky unsupported legacy workflow altogether.",
      "Une entreprise peut accepter un sujet faible sur un site marketing, réduire un risque d'accès privilégié, transférer une partie de l'exposition liée à un fournisseur et éviter complètement un workflow legacy trop risqué.",
    ),
    exercise: text(
      "For one scenario, list an asset, a threat, and a vulnerability, then choose a treatment and justify it in business language.",
      "Pour un scénario, listez un actif, une menace et une vulnérabilité, puis choisissez un traitement et justifiez-le en langage métier.",
    ),
    learningObjectives: [
      text("Build a basic risk scenario correctly.", "Construire correctement un scénario de risque de base."),
      text("Understand likelihood and impact scoring.", "Comprendre la cotation vraisemblance et impact."),
      text("Connect treatment choices to controls and evidence.", "Relier les choix de traitement aux mesures et à la preuve."),
    ],
    contentBlocks: [
      {
        title: text("A risk statement needs structure", "Une déclaration de risque a besoin de structure"),
        body: text(
          "Good risk assessment does not stop at vague danger words. It names the asset, threat, vulnerability, consequence, and owner clearly enough to support treatment.",
          "Une bonne analyse de risque ne s'arrête pas à des mots vagues. Elle nomme l'actif, la menace, la vulnérabilité, la conséquence et le responsable avec assez de clarté pour soutenir le traitement.",
        ),
      },
      {
        title: text("Treatment is a business decision", "Le traitement est une décision métier"),
        body: text(
          "Mitigate, avoid, transfer, and accept are not just labels. They are management decisions that must fit cost, exposure, and business reality.",
          "Réduire, éviter, transférer et accepter ne sont pas que des étiquettes. Ce sont des décisions de management qui doivent correspondre au coût, à l'exposition et à la réalité métier.",
        ),
      },
    ],
    examples: [
      text("Logging and access review are strong mitigation responses for privileged-access abuse risk.", "La journalisation et la revue des accès sont de bonnes réponses de réduction pour un risque d'abus d'accès privilégié."),
      text("Cyber insurance may transfer part of the financial exposure of certain incidents, but it does not replace governance or evidence.", "Une cyberassurance peut transférer une partie de l'exposition financière de certains incidents, mais elle ne remplace ni la gouvernance ni la preuve."),
    ],
    callouts: [
      {
        tone: "tip",
        title: text("Keep the method teachable", "Garder la méthode compréhensible"),
        body: text(
          "A simple, consistently used method is better than a complex method nobody can explain in an audit.",
          "Une méthode simple et utilisée de façon cohérente vaut mieux qu'une méthode complexe qu'aucune équipe ne peut expliquer en audit.",
        ),
      },
      {
        tone: "evidence",
        title: text("Auditors look for logic, not theatrics", "Les auditeurs cherchent une logique, pas du théâtre"),
        body: text(
          "They usually want to see consistent criteria, a clear register, ownership, and evidence that treatment actions are tracked.",
          "Ils veulent généralement voir des critères cohérents, un registre clair, des responsables et des preuves que les actions de traitement sont suivies.",
        ),
      },
    ],
    recap: [
      text("Risk assessment identifies and evaluates exposure.", "L'analyse des risques identifie et évalue l'exposition."),
      text("Risk treatment records the response choice.", "Le traitement du risque enregistre le choix de réponse."),
      text("Selected controls should trace back to treated risks.", "Les mesures retenues doivent pouvoir être reliées aux risques traités."),
    ],
    keyArtifacts: [
      text("Risk method", "Méthode de risque"),
      text("Risk register", "Registre des risques"),
      text("Treatment plan with owners", "Plan de traitement avec responsables"),
    ],
    outcomes: [
      text("Build a credible learner-friendly risk register.", "Construire un registre de risques crédible et pédagogique."),
      text("Choose between mitigate, avoid, transfer, and accept.", "Choisir entre réduire, éviter, transférer et accepter."),
      text("Prepare for the Risk Lab and SoA builder.", "Se préparer au Risk Lab et au générateur de SoA."),
    ],
    relatedLinks: [
      link("/risk-lab", "Open the risk lab", "Ouvrir le risk lab"),
      link("/practice/soa-builder", "Turn risk into SoA logic", "Transformer le risque en logique de SoA"),
    ],
    quiz: [
      quiz(
        "m6-q1",
        "What comes first in a sensible risk workflow?",
        "Qu'est-ce qui vient en premier dans un flux de risque cohérent ?",
        "You first identify and assess the risk scenario before choosing treatment.",
        "On identifie et évalue d'abord le scénario de risque avant de choisir le traitement.",
        "a",
        [
          { id: "a", en: "Asset, threat, vulnerability, likelihood, and impact analysis", fr: "L'analyse actif, menace, vulnérabilité, vraisemblance et impact" },
          { id: "b", en: "Randomly selecting controls", fr: "La sélection aléatoire de mesures" },
          { id: "c", en: "Writing the audit report", fr: "La rédaction du rapport d'audit" },
        ],
      ),
      quiz(
        "m6-q2",
        "What does risk treatment decide?",
        "Que décide le traitement du risque ?",
        "It determines how the organization will respond to the assessed risk.",
        "Il détermine comment l'organisation va répondre au risque évalué.",
        "c",
        [
          { id: "a", en: "Only whether an audit is external", fr: "Uniquement si un audit est externe" },
          { id: "b", en: "Only what the glossary should contain", fr: "Uniquement ce que doit contenir le glossaire" },
          { id: "c", en: "Whether to mitigate, avoid, transfer, or accept", fr: "S'il faut réduire, éviter, transférer ou accepter" },
        ],
      ),
    ],
  },
  {
    slug: "statement-of-applicability",
    icon: "FileText",
    level: text("Intermediate", "Intermédiaire"),
    durationMinutes: 18,
    eyebrow: text("Core Artifact", "Artefact clé"),
    title: text("Statement of Applicability", "Déclaration d’applicabilité"),
    summary: text(
      "Understand what the SoA is, why auditors care about it, and how it turns risk treatment into a control position.",
      "Comprendre ce qu'est la SoA, pourquoi les auditeurs y tiennent et comment elle transforme le traitement du risque en position sur les mesures.",
    ),
    simple: text(
      "The Statement of Applicability lists which Annex A controls are applicable, why they are included or excluded, and how they stand in implementation.",
      "La déclaration d'applicabilité indique quelles mesures de l'Annexe A sont applicables, pourquoi elles sont incluses ou exclues et où elles en sont dans leur mise en oeuvre.",
    ),
    professional: text(
      "A credible SoA reflects scope, risk treatment, obligations, control applicability, justification, and implementation status in a traceable way.",
      "Une SoA crédible reflète le périmètre, le traitement du risque, les obligations, l'applicabilité des mesures, leur justification et leur état de mise en oeuvre de manière traçable.",
    ),
    practical: text(
      "If an organization excludes a control, it should be able to explain why that exclusion is justified in its context. If a control is applicable, the organization should know the implementation status and related evidence.",
      "Si une organisation exclut une mesure, elle doit pouvoir expliquer pourquoi cette exclusion est justifiée dans son contexte. Si une mesure est applicable, l'organisation doit connaître son état de mise en oeuvre et les preuves associées.",
    ),
    exercise: text(
      "Take one control such as logging or supplier security and write a short applicability statement and justification for a chosen scenario.",
      "Prenez une mesure comme la journalisation ou la sécurité fournisseur et rédigez une courte déclaration d'applicabilité et justification pour un scénario choisi.",
    ),
    learningObjectives: [
      text("Explain the SoA in plain and professional language.", "Expliquer la SoA en langage simple et professionnel."),
      text("Connect the SoA to risk treatment and scope.", "Relier la SoA au traitement du risque et au périmètre."),
      text("Recognize weak SoA patterns auditors dislike.", "Reconnaître les schémas de SoA faibles que les auditeurs n'apprécient pas."),
    ],
    contentBlocks: [
      {
        title: text("The SoA is a decision map", "La SoA est une carte de décision"),
        body: text(
          "It shows how the organization moved from risk and obligations to a position on control applicability and implementation.",
          "Elle montre comment l'organisation est passée du risque et des obligations à une position sur l'applicabilité et la mise en oeuvre des mesures.",
        ),
      },
      {
        title: text("Weak SoAs usually look generic", "Les SoA faibles paraissent souvent génériques"),
        body: text(
          "If every control is simply marked yes without rationale, or no without explanation, the artifact stops being useful as an audit and management tool.",
          "Si chaque mesure est simplement marquée oui sans rationnel, ou non sans explication, l'artefact cesse d'être utile comme outil d'audit et de management.",
        ),
      },
    ],
    examples: [
      text("A SaaS company can justify extensive network, logging, and supplier controls while still explaining why some physical measures have lighter depth.", "Une société SaaS peut justifier des mesures fortes sur le réseau, la journalisation et les fournisseurs tout en expliquant pourquoi certaines mesures physiques ont une profondeur plus légère."),
      text("A healthcare-adjacent company should be able to link confidentiality-sensitive risks directly to applicable controls and evidence.", "Une entreprise proche du secteur santé doit pouvoir relier des risques sensibles en confidentialité directement aux mesures applicables et aux preuves."),
    ],
    callouts: [
      {
        tone: "warning",
        title: text("Do not treat the SoA as an afterthought", "Ne pas traiter la SoA comme une pensée après coup"),
        body: text(
          "If the SoA is prepared only at the end, it often reveals that risk treatment was never truly structured.",
          "Si la SoA n'est préparée qu'à la fin, elle révèle souvent que le traitement du risque n'a jamais été réellement structuré.",
        ),
      },
      {
        tone: "evidence",
        title: text("What auditors care about", "Ce qui intéresse les auditeurs"),
        body: text(
          "Auditors usually care about traceability, justification, implementation status, and whether the SoA matches real practice.",
          "Les auditeurs s'intéressent généralement à la traçabilité, à la justification, à l'état de mise en oeuvre et à la cohérence entre la SoA et la pratique réelle.",
        ),
      },
    ],
    recap: [
      text("The SoA maps risk treatment decisions to control applicability.", "La SoA relie les décisions de traitement du risque à l'applicabilité des mesures."),
      text("It should include justification and implementation status.", "Elle doit inclure justification et état de mise en oeuvre."),
      text("A weak SoA usually signals weak underlying governance.", "Une SoA faible signale généralement une gouvernance sous-jacente faible."),
    ],
    keyArtifacts: [
      text("Statement of Applicability", "Déclaration d'applicabilité"),
      text("Risk treatment records", "Enregistrements de traitement du risque"),
      text("Control evidence references", "Références de preuve des mesures"),
    ],
    outcomes: [
      text("Explain what the SoA does and does not do.", "Expliquer ce que fait la SoA et ce qu'elle ne fait pas."),
      text("Write learner-friendly applicability justifications.", "Rédiger des justifications d'applicabilité pédagogiques."),
      text("Use the SoA builder with confidence.", "Utiliser le générateur de SoA avec assurance."),
    ],
    relatedLinks: [
      link("/practice/soa-builder", "Open the SoA builder", "Ouvrir le générateur de SoA"),
      link("/control-library", "Browse all controls", "Parcourir toutes les mesures"),
    ],
    quiz: [
      quiz(
        "m7-q1",
        "What does a strong SoA usually contain?",
        "Que contient généralement une bonne SoA ?",
        "A strong SoA records applicability, rationale, and implementation status in a traceable way.",
        "Une bonne SoA enregistre l'applicabilité, le rationnel et l'état de mise en oeuvre de manière traçable.",
        "a",
        [
          { id: "a", en: "Applicable or not, justification, and implementation status", fr: "Applicable ou non, justification et état de mise en oeuvre" },
          { id: "b", en: "Only a list of laws", fr: "Uniquement une liste de lois" },
          { id: "c", en: "Only a screenshot of the audit calendar", fr: "Uniquement une capture du calendrier d'audit" },
        ],
      ),
      quiz(
        "m7-q2",
        "Why do auditors pay attention to the SoA?",
        "Pourquoi les auditeurs accordent-ils de l'attention à la SoA ?",
        "It shows whether treatment decisions, applicability, and implementation logic are coherent.",
        "Elle montre si les décisions de traitement, la logique d'applicabilité et la mise en oeuvre sont cohérentes.",
        "c",
        [
          { id: "a", en: "Because it replaces internal audits", fr: "Parce qu'elle remplace les audits internes" },
          { id: "b", en: "Because it is the only required document", fr: "Parce que c'est le seul document requis" },
          { id: "c", en: "Because it connects risk decisions to the control set", fr: "Parce qu'elle relie les décisions de risque au jeu de mesures" },
        ],
      ),
    ],
  },
  {
    slug: "iso-27002-vs-iso-27001",
    icon: "BookOpen",
    level: text("Intermediate", "Intermédiaire"),
    durationMinutes: 14,
    eyebrow: text("Standards Logic", "Logique des normes"),
    title: text("ISO 27002 and how it differs from ISO 27001", "L’ISO 27002 et sa différence avec l’ISO 27001"),
    summary: text(
      "Understand the difference between certifiable requirements and implementation guidance.",
      "Comprendre la différence entre exigences certifiables et recommandations de mise en oeuvre.",
    ),
    simple: text(
      "ISO 27001 tells you what the management system must do. ISO 27002 helps you interpret and implement controls more effectively.",
      "L'ISO 27001 vous dit ce que le système de management doit faire. L'ISO 27002 vous aide à interpréter et mettre en oeuvre les mesures plus efficacement.",
    ),
    professional: text(
      "ISO/IEC 27001 contains the certifiable ISMS requirements and Annex A control list. ISO/IEC 27002 provides implementation guidance, interpretation detail, and examples for the control set.",
      "L'ISO/IEC 27001 contient les exigences certifiables du SMSI et la liste de mesures de l'Annexe A. L'ISO/IEC 27002 fournit des guides de mise en oeuvre, des précisions d'interprétation et des exemples pour ce jeu de mesures.",
    ),
    practical: text(
      "Teams often read a short control title in ISO 27001 and then use ISO 27002 to understand what good implementation might look like for their size and context.",
      "Les équipes lisent souvent un titre de mesure court dans l'ISO 27001 puis utilisent l'ISO 27002 pour comprendre à quoi pourrait ressembler une bonne mise en oeuvre pour leur taille et leur contexte.",
    ),
    exercise: text(
      "Take one control title such as vulnerability management and write what ISO 27001 gives you versus what ISO 27002 adds.",
      "Prenez un intitulé de mesure comme la gestion des vulnérabilités et écrivez ce que donne l'ISO 27001 par rapport à ce qu'ajoute l'ISO 27002.",
    ),
    learningObjectives: [
      text("Explain the role of ISO 27002 clearly.", "Expliquer clairement le rôle de l'ISO 27002."),
      text("Avoid confusing guidance with certifiable requirements.", "Éviter de confondre recommandations et exigences certifiables."),
      text("Use ISO 27002 as a practical interpretation layer.", "Utiliser l'ISO 27002 comme couche d'interprétation pratique."),
    ],
    contentBlocks: [
      {
        title: text("Requirement versus guidance", "Exigence versus guide"),
        body: text(
          "A requirement tells you what must exist. Guidance helps you decide how to make it real and what good practice could look like.",
          "Une exigence dit ce qui doit exister. Un guide aide à décider comment le rendre réel et à quoi peut ressembler une bonne pratique.",
        ),
      },
      {
        title: text("27002 supports implementation choices", "La 27002 soutient les choix de mise en oeuvre"),
        body: text(
          "It becomes especially useful when a control title is short but the organization needs examples, interpretation, and implementation depth.",
          "Elle devient particulièrement utile lorsqu'un titre de mesure est court mais que l'organisation a besoin d'exemples, d'interprétation et de profondeur de mise en oeuvre.",
        ),
      },
    ],
    examples: [
      text("A logging control title is short; ISO 27002 can help teams think through retention, review, and operational use.", "Un intitulé de mesure sur la journalisation est court ; l'ISO 27002 peut aider les équipes à réfléchir à la rétention, à la revue et à l'usage opérationnel."),
      text("Supplier security control guidance becomes more actionable when interpretation examples are available.", "La sécurité fournisseur devient plus actionnable lorsque des exemples d'interprétation sont disponibles."),
    ],
    callouts: [
      {
        tone: "tip",
        title: text("Use 27002 to enrich implementation workshops", "Utiliser la 27002 pour enrichir les ateliers de mise en oeuvre"),
        body: text(
          "It is especially valuable when translating a control title into process, ownership, and evidence expectations.",
          "Elle est particulièrement utile lorsqu'il faut traduire un intitulé de mesure en processus, responsabilités et attentes de preuve.",
        ),
      },
      {
        tone: "warning",
        title: text("27002 is not the certification target", "La 27002 n'est pas la cible de certification"),
        body: text(
          "Certification still sits on the ISO 27001 requirements even when 27002 strongly informs implementation.",
          "La certification reste fondée sur les exigences de l'ISO 27001 même lorsque la 27002 éclaire fortement la mise en oeuvre.",
        ),
      },
    ],
    recap: [
      text("ISO 27001 defines the certifiable requirement set.", "L'ISO 27001 définit le jeu d'exigences certifiables."),
      text("ISO 27002 gives control guidance.", "L'ISO 27002 donne un guide sur les mesures."),
      text("The two are complementary, not interchangeable.", "Les deux sont complémentaires, pas interchangeables."),
    ],
    keyArtifacts: [
      text("Control interpretation notes", "Notes d'interprétation des mesures"),
      text("Implementation workshop outputs", "Sorties des ateliers de mise en oeuvre"),
      text("Evidence expectations by control", "Attentes de preuve par mesure"),
    ],
    outcomes: [
      text("Separate standards logic cleanly.", "Séparer proprement la logique des normes."),
      text("Know when to open ISO 27002.", "Savoir quand ouvrir l'ISO 27002."),
      text("Prepare for the compare section.", "Se préparer à la section comparatif."),
    ],
    relatedLinks: [
      link("/compare", "Compare the frameworks", "Comparer les référentiels"),
      link("/control-library", "Apply the logic in the control library", "Appliquer la logique dans la bibliothèque des mesures"),
    ],
    quiz: [
      quiz(
        "m8-q1",
        "What is ISO 27002 mainly used for?",
        "À quoi sert principalement l'ISO 27002 ?",
        "ISO 27002 provides guidance on implementing and interpreting controls.",
        "L'ISO 27002 fournit un guide pour mettre en oeuvre et interpréter les mesures.",
        "c",
        [
          { id: "a", en: "To certify organizations by itself", fr: "À certifier les organisations à elle seule" },
          { id: "b", en: "To replace risk assessment", fr: "À remplacer l'analyse des risques" },
          { id: "c", en: "To guide control implementation and interpretation", fr: "À guider la mise en oeuvre et l'interprétation des mesures" },
        ],
      ),
      quiz(
        "m8-q2",
        "Which standard remains the certification basis?",
        "Quelle norme reste la base de certification ?",
        "Certification is based on ISO 27001.",
        "La certification est basée sur l'ISO 27001.",
        "a",
        [
          { id: "a", en: "ISO 27001", fr: "ISO 27001" },
          { id: "b", en: "ISO 27002", fr: "ISO 27002" },
          { id: "c", en: "ISO 19011", fr: "ISO 19011" },
        ],
      ),
    ],
  },
  {
    slug: "audit-basics-and-iso-19011",
    icon: "ClipboardCheck",
    level: text("Intermediate", "Intermédiaire"),
    durationMinutes: 20,
    eyebrow: text("Audit Readiness", "Préparation à l'audit"),
    title: text("Internal audit, external audit, and ISO 19011 basics", "Audit interne, audit externe et bases de l’ISO 19011"),
    summary: text(
      "Understand how audits are planned, sampled, evidenced, and guided in practice.",
      "Comprendre comment les audits sont planifiés, échantillonnés, étayés par la preuve et guidés en pratique.",
    ),
    simple: text(
      "Internal audits help the organization test itself. External audits test whether the ISMS meets certification expectations. ISO 19011 helps guide the audit approach.",
      "Les audits internes aident l'organisation à se tester elle-même. Les audits externes testent si le SMSI répond aux attentes de certification. L'ISO 19011 aide à guider l'approche d'audit.",
    ),
    professional: text(
      "Internal audits focus on self-challenge, sampling, evidence collection, and improvement. External audits focus on certification logic, scope verification, document review, interviews, and control validation. ISO 19011 supports the audit method.",
      "Les audits internes se concentrent sur l'auto-challenge, l'échantillonnage, la collecte de preuves et l'amélioration. Les audits externes se concentrent sur la logique de certification, la vérification du périmètre, la revue documentaire, les entretiens et la validation des mesures. L'ISO 19011 soutient la méthode d'audit.",
    ),
    practical: text(
      "A strong internal audit often surfaces gaps before the certification body does. A strong external audit discussion usually depends on clear scope, consistent evidence, and interview-ready owners.",
      "Un bon audit interne fait souvent remonter les écarts avant que l'organisme certificateur ne le fasse. Une bonne discussion d'audit externe dépend généralement d'un périmètre clair, de preuves cohérentes et de responsables prêts pour les entretiens.",
    ),
    exercise: text(
      "Choose one control or clause and list what evidence you would review internally versus what an external auditor might sample.",
      "Choisissez une mesure ou une clause et listez les preuves que vous reverriez en interne versus celles qu'un auditeur externe pourrait échantillonner.",
    ),
    learningObjectives: [
      text("Distinguish internal and external audit goals.", "Distinguer les objectifs de l'audit interne et de l'audit externe."),
      text("Recognize good audit evidence.", "Reconnaître une bonne preuve d'audit."),
      text("Understand the place of ISO 19011.", "Comprendre la place de l'ISO 19011."),
    ],
    contentBlocks: [
      {
        title: text("Internal audit is improvement-oriented", "L'audit interne est orienté amélioration"),
        body: text(
          "Its purpose is not just to generate findings. It should test whether the system is really operating and give management usable insight before external scrutiny.",
          "Son but n'est pas seulement de produire des constats. Il doit tester si le système fonctionne réellement et fournir à la direction des informations utiles avant le regard externe.",
        ),
      },
      {
        title: text("External audit is evidence-oriented", "L'audit externe est orienté preuve"),
        body: text(
          "Certification auditors want defensible scope, sampled records, consistent interviews, and signs that the ISMS is operating rather than staged for the visit.",
          "Les auditeurs de certification veulent un périmètre défendable, des enregistrements échantillonnés, des entretiens cohérents et des signes que le SMSI fonctionne réellement plutôt qu'il n'est mis en scène pour la visite.",
        ),
      },
    ],
    examples: [
      text("Internal audit may test a full process flow end to end. External audit may sample one slice and follow the evidence trail.", "L'audit interne peut tester un flux de processus de bout en bout. L'audit externe peut échantillonner une tranche et suivre la piste de preuve."),
      text("ISO 19011 helps frame planning, competence, sampling, and reporting discipline for the audit process.", "L'ISO 19011 aide à cadrer la planification, la compétence, l'échantillonnage et la discipline de reporting du processus d'audit."),
    ],
    callouts: [
      {
        tone: "tip",
        title: text("Evidence can be more than documents", "La preuve ne se limite pas aux documents"),
        body: text(
          "Logs, screenshots, records, observations, interviews, and live system walkthroughs can all form audit evidence when used carefully.",
          "Des logs, captures, enregistrements, observations, entretiens et démonstrations live peuvent tous constituer des preuves d'audit lorsqu'ils sont utilisés avec soin.",
        ),
      },
      {
        tone: "warning",
        title: text("Avoid performative audit prep", "Éviter la préparation d'audit performative"),
        body: text(
          "If teams only prepare scripts for the audit day, inconsistencies usually appear quickly when sampling and follow-up questions start.",
          "Si les équipes ne préparent que des scripts pour le jour de l'audit, les incohérences apparaissent vite lorsque l'échantillonnage et les questions de suivi commencent.",
        ),
      },
    ],
    recap: [
      text("Internal audit prepares the organization honestly.", "L'audit interne prépare l'organisation de façon honnête."),
      text("External audit tests conformity and effectiveness.", "L'audit externe teste la conformité et l'efficacité."),
      text("ISO 19011 guides the audit method.", "L'ISO 19011 guide la méthode d'audit."),
    ],
    keyArtifacts: [
      text("Audit programme", "Programme d'audit"),
      text("Sampling and evidence notes", "Notes d'échantillonnage et de preuve"),
      text("Audit report and follow-up", "Rapport d'audit et suivi"),
    ],
    outcomes: [
      text("Speak clearly about audit types and evidence.", "Parler clairement des types d'audit et de la preuve."),
      text("Prepare for audit interviews more effectively.", "Mieux se préparer aux entretiens d'audit."),
      text("Use the audit lab with the right mindset.", "Utiliser l'audit lab avec le bon état d'esprit."),
    ],
    relatedLinks: [
      link("/audit-lab", "Open the audit lab", "Ouvrir l'audit lab"),
      link("/practice/nonconformity-lab", "Classify findings", "Qualifier les constats"),
    ],
    quiz: [
      quiz(
        "m9-q1",
        "Which standard mainly provides auditing guidance?",
        "Quelle norme fournit principalement les lignes directrices d'audit ?",
        "ISO 19011 provides general guidance on auditing management systems.",
        "L'ISO 19011 fournit les lignes directrices générales pour l'audit des systèmes de management.",
        "b",
        [
          { id: "a", en: "ISO 27002", fr: "ISO 27002" },
          { id: "b", en: "ISO 19011", fr: "ISO 19011" },
          { id: "c", en: "GDPR", fr: "RGPD" },
        ],
      ),
      quiz(
        "m9-q2",
        "What is a strong purpose of internal audit?",
        "Quel est un objectif fort de l'audit interne ?",
        "Internal audit should challenge the system and support improvement before external review.",
        "L'audit interne doit challenger le système et soutenir l'amélioration avant la revue externe.",
        "a",
        [
          { id: "a", en: "To test the ISMS and improve it before certification review", fr: "Tester le SMSI et l'améliorer avant la revue de certification" },
          { id: "b", en: "To avoid gathering evidence", fr: "Éviter de rassembler des preuves" },
          { id: "c", en: "To replace management review", fr: "Remplacer la revue de direction" },
        ],
      ),
    ],
  },
  {
    slug: "nonconformities-and-corrective-actions",
    icon: "AlertTriangle",
    level: text("Intermediate", "Intermédiaire"),
    durationMinutes: 16,
    eyebrow: text("Findings Logic", "Logique des constats"),
    title: text("Nonconformities, observations, and corrective actions", "Non-conformités, observations et actions correctives"),
    summary: text(
      "Learn how to classify findings credibly and turn them into corrective action instead of defensive paperwork.",
      "Comprendre comment qualifier des constats de manière crédible et les transformer en actions correctives plutôt qu'en papier défensif.",
    ),
    simple: text(
      "A major nonconformity is serious or systemic. A minor nonconformity means the system exists but is not consistently followed. An observation is an improvement signal.",
      "Une non-conformité majeure est sérieuse ou systémique. Une non-conformité mineure signifie que le système existe mais n'est pas suivi de façon cohérente. Une observation est un signal d'amélioration.",
    ),
    professional: text(
      "Classification should reflect the severity of the gap, its systemic reach, and whether confidence in the ISMS is materially undermined. Corrective action should address root cause, not only surface evidence.",
      "La qualification doit refléter la gravité de l'écart, sa portée systémique et le fait qu'elle remette ou non matériellement en cause la confiance dans le SMSI. L'action corrective doit traiter la cause racine, pas seulement la preuve de surface.",
    ),
    practical: text(
      "If access reviews exist but one team missed a cycle, that may be minor. If no risk assessment exists at all, the issue can become major because the system lacks a core requirement.",
      "Si des revues d'accès existent mais qu'une équipe a manqué un cycle, cela peut être mineur. Si aucune analyse des risques n'existe, le sujet peut devenir majeur car le système manque une exigence centrale.",
    ),
    exercise: text(
      "Read a gap and decide whether it is systemic, partial, or just an observation. Then propose a corrective action that changes the system, not only the report.",
      "Lisez un écart et décidez s'il est systémique, partiel ou seulement une observation. Puis proposez une action corrective qui change le système, pas seulement le rapport.",
    ),
    learningObjectives: [
      text("Classify major, minor, and observation cases.", "Qualifier majeur, mineur et observation."),
      text("Understand why justification matters.", "Comprendre pourquoi la justification compte."),
      text("Propose corrective actions that address root cause.", "Proposer des actions correctives qui traitent la cause racine."),
    ],
    contentBlocks: [
      {
        title: text("Classification is about impact on confidence", "La qualification porte sur l'impact sur la confiance"),
        body: text(
          "The real question is whether the gap shows a partial miss, a systemic weakness, or a chance to improve something that already fundamentally works.",
          "La vraie question est de savoir si l'écart montre un raté partiel, une faiblesse systémique ou une possibilité d'améliorer quelque chose qui fonctionne déjà fondamentalement.",
        ),
      },
      {
        title: text("Corrective action should repair the system", "L'action corrective doit réparer le système"),
        body: text(
          "Writing a missing record after the audit is rarely enough. Better corrective action changes roles, process design, control steps, or monitoring so the gap is less likely to repeat.",
          "Écrire un enregistrement manquant après l'audit suffit rarement. Une meilleure action corrective modifie les rôles, la conception du processus, les étapes de contrôle ou la surveillance pour rendre la répétition du problème moins probable.",
        ),
      },
    ],
    examples: [
      text("No formal risk assessment existing in a scoped environment is typically far more serious than one overdue evidence sample.", "L'absence totale d'analyse des risques dans un périmètre est généralement bien plus sérieuse qu'un échantillon de preuve en retard."),
      text("An observation can still matter if it points to an issue that may become a future nonconformity.", "Une observation peut tout de même compter si elle pointe un sujet susceptible de devenir une future non-conformité."),
    ],
    callouts: [
      {
        tone: "warning",
        title: text("Do not classify by emotion", "Ne pas qualifier à l'émotion"),
        body: text(
          "The classification should follow evidence and systemic effect, not how uncomfortable the conversation feels.",
          "La qualification doit suivre la preuve et l'effet systémique, pas l'inconfort ressenti pendant la discussion.",
        ),
      },
      {
        tone: "tip",
        title: text("Ask what confidence remains", "Demander quel niveau de confiance reste"),
        body: text(
          "That question often makes it easier to distinguish a major gap from a minor one.",
          "Cette question aide souvent à distinguer un écart majeur d'un écart mineur.",
        ),
      },
    ],
    recap: [
      text("Major means serious or systemic.", "Majeur signifie sérieux ou systémique."),
      text("Minor means the system exists but execution or evidence is inconsistent.", "Mineur signifie que le système existe mais que l'exécution ou la preuve est incohérente."),
      text("Corrective action should treat root cause.", "L'action corrective doit traiter la cause racine."),
    ],
    keyArtifacts: [
      text("Finding record", "Enregistrement de constat"),
      text("Root cause analysis", "Analyse de cause racine"),
      text("Corrective action plan", "Plan d'action corrective"),
    ],
    outcomes: [
      text("Classify findings more confidently.", "Qualifier les constats avec plus d'assurance."),
      text("Write better corrective actions.", "Rédiger de meilleures actions correctives."),
      text("Prepare for the nonconformity lab.", "Se préparer au laboratoire de non-conformité."),
    ],
    relatedLinks: [
      link("/practice/nonconformity-lab", "Open the nonconformity lab", "Ouvrir le laboratoire de non-conformité"),
      link("/audit-lab", "Use the broader audit lab", "Utiliser l'audit lab complet"),
    ],
    quiz: [
      quiz(
        "m10-q1",
        "Which finding is more likely to be major?",
        "Quel constat a le plus de chances d'être majeur ?",
        "The absence of a core required process is usually more serious than one isolated missing sample.",
        "L'absence d'un processus cœur requis est généralement plus grave qu'un échantillon isolé manquant.",
        "b",
        [
          { id: "a", en: "One missing training attendance record", fr: "Une preuve de présence en formation manquante" },
          { id: "b", en: "No formal risk assessment exists in scope", fr: "Aucune analyse des risques formelle n'existe dans le périmètre" },
          { id: "c", en: "An improvement note on report formatting", fr: "Une note d'amélioration sur la mise en forme d'un rapport" },
        ],
      ),
      quiz(
        "m10-q2",
        "What makes a corrective action weak?",
        "Qu'est-ce qui rend une action corrective faible ?",
        "A weak action only patches the evidence gap without changing the underlying system.",
        "Une action faible ne colmate que l'écart de preuve sans modifier le système sous-jacent.",
        "a",
        [
          { id: "a", en: "It fixes the missing record but not the root cause", fr: "Elle corrige l'enregistrement manquant mais pas la cause racine" },
          { id: "b", en: "It updates process ownership and monitoring", fr: "Elle met à jour la responsabilité du processus et la surveillance" },
          { id: "c", en: "It reduces repetition risk", fr: "Elle réduit le risque de répétition" },
        ],
      ),
    ],
  },
  {
    slug: "implementation-flow",
    icon: "Rocket",
    level: text("Intermediate", "Intermédiaire"),
    durationMinutes: 18,
    eyebrow: text("Real Delivery", "Mise en oeuvre réelle"),
    title: text("Real-world implementation flow", "Flux de mise en oeuvre réel"),
    summary: text(
      "See how a practical ISO 27001 programme usually unfolds from scoping through readiness and continual improvement.",
      "Voir comment un programme ISO 27001 pragmatique se déroule généralement du cadrage à la préparation puis à l'amélioration continue.",
    ),
    simple: text(
      "Implementation usually moves through scope, context, leadership, risk, control decisions, documentation, internal audit, management review, and readiness for external audit.",
      "La mise en oeuvre passe généralement par le périmètre, le contexte, le leadership, le risque, les choix de mesures, la documentation, l'audit interne, la revue de direction et la préparation à l'audit externe.",
    ),
    professional: text(
      "A mature implementation sequence is iterative rather than purely linear. Teams often refine scope, risk criteria, SoA logic, documentation, and evidence production in several loops before certification readiness is credible.",
      "Une séquence de mise en oeuvre mature est itérative plutôt que purement linéaire. Les équipes affinent souvent périmètre, critères de risque, logique de SoA, documentation et production de preuve en plusieurs boucles avant qu'une préparation crédible à la certification n'émerge.",
    ),
    practical: text(
      "The best programmes combine governance and operations early: ownership, evidence, risk workshops, supplier reviews, training, and internal audit are planned as one programme rather than isolated projects.",
      "Les meilleurs programmes combinent tôt gouvernance et opérations : responsabilités, preuves, ateliers de risque, revues fournisseurs, formation et audit interne sont pensés comme un seul programme plutôt que comme des projets isolés.",
    ),
    exercise: text(
      "Draft a simple implementation timeline with five phases and explain what must exist before moving to external audit preparation.",
      "Rédigez une chronologie simple de mise en oeuvre en cinq phases et expliquez ce qui doit exister avant de passer à la préparation de l'audit externe.",
    ),
    learningObjectives: [
      text("Understand a credible implementation sequence.", "Comprendre une séquence de mise en oeuvre crédible."),
      text("Recognize what should happen in parallel.", "Reconnaître ce qui doit se faire en parallèle."),
      text("Know what readiness really looks like.", "Savoir à quoi ressemble réellement la préparation."),
    ],
    contentBlocks: [
      {
        title: text("Start with scope and ownership", "Commencer par le périmètre et les responsabilités"),
        body: text(
          "Without credible scope and named owners, later artifacts often become disconnected from business reality.",
          "Sans périmètre crédible et responsables nommés, les artefacts suivants deviennent souvent déconnectés de la réalité métier.",
        ),
      },
      {
        title: text("Readiness means the system is operating", "La préparation signifie que le système fonctionne"),
        body: text(
          "A ready organization is not simply documented. It has risk treatment underway, evidence available, and review loops already running.",
          "Une organisation prête n'est pas simplement documentée. Elle a un traitement du risque en cours, des preuves disponibles et des boucles de revue déjà actives.",
        ),
      },
    ],
    examples: [
      text("A management review held only the week before stage 1 audit rarely feels mature to auditors.", "Une revue de direction tenue seulement la semaine précédant l'audit de stage 1 paraît rarement mature aux auditeurs."),
      text("Internal audit produces much more value when it happens before the external audit plan is fixed.", "L'audit interne produit beaucoup plus de valeur lorsqu'il intervient avant que le plan d'audit externe ne soit figé."),
    ],
    callouts: [
      {
        tone: "tip",
        title: text("Think programme, not paperwork sprint", "Penser programme, pas sprint documentaire"),
        body: text(
          "The strongest implementations deliberately build routines, owners, and evidence over time.",
          "Les mises en oeuvre les plus solides construisent délibérément routines, responsables et preuves dans le temps.",
        ),
      },
      {
        tone: "warning",
        title: text("Documentation without operation is fragile", "La documentation sans exploitation est fragile"),
        body: text(
          "Auditors usually notice quickly when documents exist but teams cannot show the operating reality behind them.",
          "Les auditeurs remarquent généralement vite lorsque les documents existent mais que les équipes ne peuvent pas montrer la réalité opérationnelle derrière.",
        ),
      },
    ],
    recap: [
      text("Implementation is iterative, not purely linear.", "La mise en oeuvre est itérative, pas purement linéaire."),
      text("Readiness requires operating evidence.", "La préparation exige des preuves de fonctionnement."),
      text("Internal audit and management review are part of the implementation flow, not an afterthought.", "L'audit interne et la revue de direction font partie du flux de mise en oeuvre, pas d'un appendice."),
    ],
    keyArtifacts: [
      text("Implementation roadmap", "Feuille de route de mise en oeuvre"),
      text("Ownership matrix", "Matrice des responsabilités"),
      text("Readiness checklist linked to evidence", "Checklist de préparation reliée à la preuve"),
    ],
    outcomes: [
      text("Sequence an implementation programme more realistically.", "Séquençer un programme de mise en oeuvre de façon plus réaliste."),
      text("Know when an organization is actually ready.", "Savoir quand une organisation est réellement prête."),
      text("Prepare for the capstone simulation.", "Se préparer à la simulation finale."),
    ],
    relatedLinks: [
      link("/dashboard", "Track readiness on the dashboard", "Suivre la préparation sur le tableau de bord"),
      link("/learn/final-capstone-simulation", "Finish with the capstone", "Terminer avec la simulation finale"),
    ],
    quiz: [
      quiz(
        "m11-q1",
        "What is a sign of genuine audit readiness?",
        "Quel est un signe d'une vraie préparation à l'audit ?",
        "Readiness means the system is operating with evidence, not just documented.",
        "La préparation signifie que le système fonctionne avec des preuves, pas seulement qu'il est documenté.",
        "b",
        [
          { id: "a", en: "Only having drafted policies", fr: "Avoir seulement rédigé des politiques" },
          { id: "b", en: "Having operating evidence, internal review, and active treatment actions", fr: "Avoir des preuves de fonctionnement, une revue interne et des actions de traitement actives" },
          { id: "c", en: "Waiting for the auditor to define the scope", fr: "Attendre que l'auditeur définisse le périmètre" },
        ],
      ),
      quiz(
        "m11-q2",
        "Which activity should not be left to the end?",
        "Quelle activité ne doit pas être laissée à la fin ?",
        "Internal audit should happen early enough to influence the programme before external review.",
        "L'audit interne doit intervenir assez tôt pour influencer le programme avant la revue externe.",
        "a",
        [
          { id: "a", en: "Internal audit", fr: "L'audit interne" },
          { id: "b", en: "Changing the app language", fr: "Changer la langue de l'application" },
          { id: "c", en: "Writing glossary examples", fr: "Rédiger des exemples de glossaire" },
        ],
      ),
    ],
  },
  {
    slug: "final-capstone-simulation",
    icon: "GraduationCap",
    level: text("Advanced", "Avancé"),
    durationMinutes: 20,
    eyebrow: text("Capstone", "Capstone"),
    title: text("Final capstone simulation", "Simulation finale"),
    summary: text(
      "Bring clauses, risk, controls, SoA, and audit reasoning together in one realistic business exercise.",
      "Assembler clauses, risque, mesures, SoA et raisonnement d'audit dans un exercice métier réaliste.",
    ),
    simple: text(
      "The capstone asks you to think like someone preparing a real organization for ISO 27001, not just someone recalling definitions.",
      "La simulation finale vous demande de penser comme quelqu'un qui prépare réellement une organisation à l'ISO 27001, et non comme quelqu'un qui récite des définitions.",
    ),
    professional: text(
      "The goal is synthesis: explain scope, identify major risks, justify control applicability, anticipate audit evidence requests, and classify gaps proportionally.",
      "L'objectif est la synthèse : expliquer le périmètre, identifier les risques majeurs, justifier l'applicabilité des mesures, anticiper les demandes de preuve d'audit et qualifier les écarts de façon proportionnée.",
    ),
    practical: text(
      "A good capstone answer sounds like a project meeting with leadership, operations, and an auditor in the room: clear, contextual, and evidence-aware.",
      "Une bonne réponse de capstone ressemble à une réunion de projet avec la direction, les opérations et un auditeur dans la salle : claire, contextualisée et consciente de la preuve.",
    ),
    exercise: text(
      "Choose a sample scenario, define the first risks, choose the first controls, draft two SoA positions, and classify one likely nonconformity.",
      "Choisissez un scénario type, définissez les premiers risques, sélectionnez les premières mesures, rédigez deux positions de SoA et qualifiez une non-conformité probable.",
    ),
    learningObjectives: [
      text("Synthesize the end-to-end learning path.", "Synthétiser l'ensemble du parcours d'apprentissage."),
      text("Practice interview-style operational explanations.", "Pratiquer des explications opérationnelles de type entretien."),
      text("Self-assess readiness for project or audit conversations.", "S'auto-évaluer pour des conversations de projet ou d'audit."),
    ],
    contentBlocks: [
      {
        title: text("The capstone is about integration", "La simulation finale porte sur l'intégration"),
        body: text(
          "Strong answers connect clause logic, risk, control selection, SoA reasoning, and audit evidence without treating them as separate chapters.",
          "Les bonnes réponses relient la logique des clauses, le risque, la sélection des mesures, le raisonnement de SoA et la preuve d'audit sans les traiter comme des chapitres séparés.",
        ),
      },
      {
        title: text("Business fluency matters", "L'aisance métier compte"),
        body: text(
          "A technically correct answer is stronger when it also sounds usable in a real meeting with founders, legal, operations, or customers.",
          "Une réponse techniquement correcte est plus forte lorsqu'elle paraît aussi exploitable dans une vraie réunion avec fondateurs, juristes, opérations ou clients.",
        ),
      },
    ],
    examples: [
      text("Explaining why a control is applicable is often more valuable than simply naming the control number.", "Expliquer pourquoi une mesure est applicable a souvent plus de valeur que de citer simplement son numéro."),
      text("A realistic capstone response usually references ownership, evidence, and next action.", "Une réponse réaliste de capstone cite généralement responsabilité, preuve et prochaine action."),
    ],
    callouts: [
      {
        tone: "tip",
        title: text("Use both languages strategically", "Utiliser les deux langues de façon stratégique"),
        body: text(
          "Try switching between English and French when the audience changes, while keeping the same business meaning.",
          "Essayez de basculer entre anglais et français lorsque l'audience change, tout en gardant le même sens métier.",
        ),
      },
      {
        tone: "evidence",
        title: text("Readiness is shown through reasoning", "La préparation se montre par le raisonnement"),
        body: text(
          "If you can justify why a decision was made and what evidence supports it, you are much closer to practical readiness.",
          "Si vous savez justifier pourquoi une décision a été prise et quelle preuve la soutient, vous êtes beaucoup plus proche d'une vraie préparation.",
        ),
      },
    ],
    recap: [
      text("The capstone checks synthesis, not memorization.", "La simulation finale teste la synthèse, pas la mémorisation."),
      text("Good answers connect system, risk, controls, and evidence.", "Les bonnes réponses relient système, risque, mesures et preuve."),
      text("Bilingual clarity is part of practical readiness.", "La clarté bilingue fait partie de la préparation pratique."),
    ],
    keyArtifacts: [
      text("Scenario briefing", "Brief scénario"),
      text("Risk and control rationale", "Rationnel risque et mesures"),
      text("Evidence and corrective action notes", "Notes de preuve et d'action corrective"),
    ],
    outcomes: [
      text("Finish the app able to explain ISO 27001 end to end.", "Finir l'application capable d'expliquer l'ISO 27001 de bout en bout."),
      text("Prepare for interviews, audits, and project meetings.", "Se préparer aux entretiens, audits et réunions de projet."),
      text("See remaining weak areas on the dashboard.", "Voir les zones faibles restantes sur le tableau de bord."),
    ],
    relatedLinks: [
      link("/practice", "Go to the practice engine", "Aller au moteur d'exercices"),
      link("/dashboard", "Review your readiness score", "Revoir votre score de préparation"),
    ],
    quiz: [
      quiz(
        "m12-q1",
        "What makes a strong capstone answer?",
        "Qu'est-ce qui fait une bonne réponse de simulation finale ?",
        "A strong answer integrates clause logic, risk reasoning, control decisions, and evidence awareness.",
        "Une bonne réponse intègre logique des clauses, raisonnement de risque, décisions de mesures et conscience de la preuve.",
        "c",
        [
          { id: "a", en: "Only listing as many controls as possible", fr: "Lister uniquement le plus de mesures possible" },
          { id: "b", en: "Only translating terms literally", fr: "Traduire uniquement les termes littéralement" },
          { id: "c", en: "Connecting scope, risk, controls, SoA, and evidence", fr: "Relier périmètre, risque, mesures, SoA et preuve" },
        ],
      ),
      quiz(
        "m12-q2",
        "What is the best sign that the user finished the learning path well?",
        "Quel est le meilleur signe que l'utilisateur a bien terminé le parcours ?",
        "The strongest sign is being able to explain and justify ISO 27001 decisions in realistic business language.",
        "Le meilleur signe est la capacité à expliquer et justifier des décisions ISO 27001 dans un langage métier réaliste.",
        "b",
        [
          { id: "a", en: "Knowing every clause number by heart only", fr: "Connaître tous les numéros de clause par coeur uniquement" },
          { id: "b", en: "Being able to explain and justify decisions in work situations", fr: "Être capable d'expliquer et justifier les décisions en situation de travail" },
          { id: "c", en: "Using only English terms", fr: "Utiliser uniquement des termes anglais" },
        ],
      ),
    ],
  },
];

export const moduleMap = new Map(learningModules.map((module) => [module.slug, module]));

export function getModuleBySlug(slug: string) {
  return moduleMap.get(slug);
}

export const clauseExplorerEntries: ClauseExplorerEntry[] = [
  {
    clause: "4",
    title: text("Context of the organization", "Contexte de l’organisation"),
    simple: text(
      "Clause 4 asks what business reality the ISMS must actually respond to.",
      "La clause 4 demande à quelle réalité métier le SMSI doit réellement répondre.",
    ),
    professional: text(
      "It covers internal and external issues, interested parties, scope definition, and the need to establish the ISMS in a context that can be defended.",
      "Elle couvre les enjeux internes et externes, les parties intéressées, la définition du périmètre et la nécessité d'établir un SMSI dans un contexte défendable.",
    ),
    businessMeaning: text(
      "If the company cannot explain what business, people, systems, and obligations are in scope, later controls and evidence usually become confused.",
      "Si l'entreprise ne peut pas expliquer quels métiers, personnes, systèmes et obligations sont dans le périmètre, les mesures et preuves qui suivent deviennent généralement confuses.",
    ),
    auditorEvidence: [
      text("Context analysis and stakeholder map", "Analyse du contexte et cartographie des parties intéressées"),
      text("Approved scope statement", "Déclaration de périmètre approuvée"),
      text("Rationale for what is out of scope", "Justification de ce qui est hors périmètre"),
    ],
    commonMistakes: [
      text("Writing a scope that sounds broad but is not actually defendable.", "Rédiger un périmètre qui semble large mais n'est pas réellement défendable."),
      text("Ignoring customers, regulators, or key suppliers as interested parties.", "Ignorer clients, régulateurs ou fournisseurs clés comme parties intéressées."),
    ],
    exampleNonconformities: [
      {
        severity: "major",
        detail: text(
          "The organization cannot explain a coherent ISMS scope and different teams describe different boundaries.",
          "L'organisation ne peut pas expliquer un périmètre cohérent du SMSI et différentes équipes décrivent des limites différentes.",
        ),
      },
      {
        severity: "minor",
        detail: text(
          "The scope exists but has not been updated after a significant business or technical change.",
          "Le périmètre existe mais n'a pas été mis à jour après un changement métier ou technique important.",
        ),
      },
    ],
    linkedControls: ["5.1", "5.9", "5.19"],
    terminology: [
      {
        term: text("Interested parties", "Parties intéressées"),
        explanation: text("The stakeholders whose expectations matter to the ISMS.", "Les parties prenantes dont les attentes comptent pour le SMSI."),
      },
      {
        term: text("Scope", "Périmètre"),
        explanation: text("The documented boundary of the ISMS.", "La frontière documentée du SMSI."),
      },
    ],
  },
  {
    clause: "5",
    title: text("Leadership", "Leadership"),
    simple: text("Clause 5 asks whether leadership is visibly driving the ISMS.", "La clause 5 demande si la direction pilote visiblement le SMSI."),
    professional: text(
      "It covers leadership commitment, policy direction, assigned responsibilities, and management accountability for the operation of the ISMS.",
      "Elle couvre l'engagement de la direction, l'orientation donnée par la politique, l'attribution des responsabilités et la responsabilité du management dans le fonctionnement du SMSI.",
    ),
    businessMeaning: text(
      "Without leadership ownership, information security often remains a side topic carried by one team instead of a managed business system.",
      "Sans appropriation par la direction, la sécurité de l'information reste souvent un sujet porté par une seule équipe au lieu d'être un système métier piloté.",
    ),
    auditorEvidence: [
      text("Approved policy and leadership communication", "Politique approuvée et communication de la direction"),
      text("Named roles and governance cadence", "Rôles nommés et cadence de gouvernance"),
      text("Management review participation", "Participation à la revue de direction"),
    ],
    commonMistakes: [
      text("A policy exists but managers cannot explain their responsibilities.", "Une politique existe mais les managers ne savent pas expliquer leurs responsabilités."),
      text("Leadership signs documents but does not review outcomes or risks.", "La direction signe des documents mais ne revoit ni résultats ni risques."),
    ],
    exampleNonconformities: [
      {
        severity: "major",
        detail: text(
          "Leadership commitment is absent in practice and no accountable governance rhythm exists.",
          "L'engagement de la direction est absent en pratique et aucun rythme de gouvernance responsable n'existe.",
        ),
      },
      {
        severity: "minor",
        detail: text(
          "Roles are assigned but sampled managers cannot explain their specific ISMS responsibilities.",
          "Les rôles sont attribués mais les managers échantillonnés ne savent pas expliquer leurs responsabilités SMSI spécifiques.",
        ),
      },
    ],
    linkedControls: ["5.1", "5.2", "5.4"],
    terminology: [
      {
        term: text("Leadership commitment", "Engagement de la direction"),
        explanation: text("Visible management backing for the ISMS.", "Le soutien visible du management au SMSI."),
      },
      {
        term: text("Policy", "Politique"),
        explanation: text("The directional statement for the ISMS.", "La déclaration d'orientation du SMSI."),
      },
    ],
  },
  {
    clause: "6",
    title: text("Planning", "Planification"),
    simple: text("Clause 6 asks how the organization plans risk treatment and security objectives.", "La clause 6 demande comment l'organisation planifie le traitement du risque et les objectifs sécurité."),
    professional: text(
      "It covers actions to address risks and opportunities, information security objectives, planning to achieve them, and managing changes deliberately.",
      "Elle couvre les actions face aux risques et opportunités, les objectifs de sécurité de l'information, leur planification et la gestion délibérée des changements.",
    ),
    businessMeaning: text(
      "This clause is where vague intent becomes a method: what risks are assessed, what gets treated, which objectives matter, and how progress is tracked.",
      "Cette clause est l'endroit où l'intention vague devient méthode : quels risques sont évalués, lesquels sont traités, quels objectifs comptent et comment les progrès sont suivis.",
    ),
    auditorEvidence: [
      text("Risk assessment method and criteria", "Méthode et critères d'analyse des risques"),
      text("Risk treatment plan and objective tracking", "Plan de traitement et suivi des objectifs"),
      text("Change planning records", "Enregistrements de planification des changements"),
    ],
    commonMistakes: [
      text("Risks are listed but there is no consistent treatment logic.", "Les risques sont listés mais il n'y a pas de logique cohérente de traitement."),
      text("Objectives exist on paper but are not reviewed or owned.", "Les objectifs existent sur le papier mais ne sont ni revus ni portés."),
    ],
    exampleNonconformities: [
      {
        severity: "major",
        detail: text(
          "No formal risk assessment process exists for the scoped ISMS.",
          "Aucun processus formel d'analyse des risques n'existe pour le SMSI dans le périmètre.",
        ),
      },
      {
        severity: "minor",
        detail: text(
          "Risk methodology exists but recent treatments are not linked to owners or dates.",
          "La méthodologie de risque existe mais les traitements récents ne sont pas reliés à des responsables ni à des dates.",
        ),
      },
    ],
    linkedControls: ["5.7", "5.19", "8.8", "8.15"],
    terminology: [
      {
        term: text("Risk treatment", "Traitement du risque"),
        explanation: text("The selected response to evaluated risk.", "La réponse retenue au risque évalué."),
      },
      {
        term: text("Objective", "Objectif"),
        explanation: text("A tracked security outcome the organization plans to achieve.", "Un résultat sécurité suivi que l'organisation planifie d'atteindre."),
      },
    ],
  },
  {
    clause: "7",
    title: text("Support", "Support"),
    simple: text("Clause 7 asks whether people, resources, awareness, communication, and documented information support the ISMS.", "La clause 7 demande si les personnes, ressources, sensibilisation, communication et informations documentées soutiennent le SMSI."),
    professional: text(
      "It covers resources, competence, awareness, communication, and documented information needed to run the ISMS credibly.",
      "Elle couvre les ressources, la compétence, la sensibilisation, la communication et les informations documentées nécessaires pour faire fonctionner le SMSI de façon crédible.",
    ),
    businessMeaning: text(
      "Even a well-designed system fails if the organization cannot prove who is competent, what people know, what they communicate, and how documents are controlled.",
      "Même un système bien conçu échoue si l'organisation ne peut pas prouver qui est compétent, ce que les personnes savent, ce qu'elles communiquent et comment les documents sont maîtrisés.",
    ),
    auditorEvidence: [
      text("Training and awareness records", "Enregistrements de formation et sensibilisation"),
      text("Document control practices", "Pratiques de maîtrise documentaire"),
      text("Competence or onboarding evidence", "Preuves de compétence ou d'onboarding"),
    ],
    commonMistakes: [
      text("Training policy exists but attendance evidence is missing.", "La politique de formation existe mais les preuves de présence manquent."),
      text("Critical documents circulate without version control.", "Des documents critiques circulent sans contrôle de version."),
    ],
    exampleNonconformities: [
      {
        severity: "minor",
        detail: text(
          "Awareness material exists but sampled attendance evidence is incomplete.",
          "Le matériel de sensibilisation existe mais les preuves de participation échantillonnées sont incomplètes.",
        ),
      },
      {
        severity: "observation",
        detail: text(
          "Document templates are usable but could better distinguish approved versus draft material.",
          "Les modèles documentaires sont utilisables mais pourraient mieux distinguer documents approuvés et brouillons.",
        ),
      },
    ],
    linkedControls: ["6.3", "6.5", "6.7"],
    terminology: [
      {
        term: text("Competence", "Compétence"),
        explanation: text("The ability to perform assigned security responsibilities.", "La capacité à exercer les responsabilités sécurité attribuées."),
      },
      {
        term: text("Documented information", "Information documentée"),
        explanation: text("Controlled information needed to run and evidence the ISMS.", "L'information maîtrisée nécessaire pour faire fonctionner et prouver le SMSI."),
      },
    ],
  },
  {
    clause: "8",
    title: text("Operation", "Fonctionnement"),
    simple: text("Clause 8 asks whether the organization is actually running the planned security activities.", "La clause 8 demande si l'organisation exécute réellement les activités sécurité planifiées."),
    professional: text(
      "It focuses on operational planning, risk assessment execution, treatment execution, and control of outsourced processes where relevant.",
      "Elle se concentre sur la planification opérationnelle, l'exécution de l'analyse des risques, l'exécution du traitement et la maîtrise des processus externalisés lorsque c'est pertinent.",
    ),
    businessMeaning: text(
      "This is where theory must become behavior. Risks must be assessed, treatments must run, suppliers must be handled, and exceptions must be visible.",
      "C'est ici que la théorie doit devenir comportement. Les risques doivent être évalués, les traitements exécutés, les fournisseurs maîtrisés et les exceptions visibles.",
    ),
    auditorEvidence: [
      text("Operational procedures and records", "Procédures et enregistrements opérationnels"),
      text("Executed treatment actions", "Actions de traitement exécutées"),
      text("Supplier oversight or operational tickets", "Pilotage fournisseur ou tickets opérationnels"),
    ],
    commonMistakes: [
      text("Procedures look good on paper but the sampled team does not follow them.", "Les procédures paraissent bonnes sur le papier mais l'équipe échantillonnée ne les suit pas."),
      text("Supplier security is contractually mentioned but not reviewed operationally.", "La sécurité fournisseur est mentionnée contractuellement mais n'est pas revue opérationnellement."),
    ],
    exampleNonconformities: [
      {
        severity: "major",
        detail: text(
          "The incident process exists in policy form but sampled teams follow conflicting escalation paths in practice.",
          "Le processus d'incident existe sous forme de politique mais les équipes échantillonnées suivent en pratique des escalades contradictoires.",
        ),
      },
      {
        severity: "minor",
        detail: text(
          "A treatment plan exists but several due actions have no operational evidence of completion.",
          "Un plan de traitement existe mais plusieurs actions échues n'ont aucune preuve opérationnelle d'achèvement.",
        ),
      },
    ],
    linkedControls: ["5.19", "5.24", "8.8", "8.15", "8.32"],
    terminology: [
      {
        term: text("Operational control", "Maîtrise opérationnelle"),
        explanation: text("The disciplined execution of planned activities.", "L'exécution disciplinée des activités planifiées."),
      },
      {
        term: text("Outsourced process", "Processus externalisé"),
        explanation: text("A scoped activity performed through a third party that still affects the ISMS.", "Une activité du périmètre réalisée via un tiers qui affecte néanmoins le SMSI."),
      },
    ],
  },
  {
    clause: "9",
    title: text("Performance evaluation", "Évaluation de la performance"),
    simple: text("Clause 9 asks how the organization knows whether the ISMS is working.", "La clause 9 demande comment l'organisation sait si le SMSI fonctionne."),
    professional: text(
      "It covers monitoring, measurement, analysis, evaluation, internal audit, and management review as core performance mechanisms.",
      "Elle couvre la surveillance, la mesure, l'analyse, l'évaluation, l'audit interne et la revue de direction comme mécanismes centraux de performance.",
    ),
    businessMeaning: text(
      "Without clause 9, the ISMS becomes faith-based. The organization needs evidence that controls, treatment decisions, and governance routines are actually delivering outcomes.",
      "Sans clause 9, le SMSI devient affaire de foi. L'organisation a besoin de preuves que les mesures, décisions de traitement et routines de gouvernance produisent réellement des résultats.",
    ),
    auditorEvidence: [
      text("KPI or monitoring outputs", "Sorties KPI ou de surveillance"),
      text("Internal audit programme and reports", "Programme et rapports d'audit interne"),
      text("Management review records", "Enregistrements de revue de direction"),
    ],
    commonMistakes: [
      text("Collecting indicators without any management interpretation.", "Collecter des indicateurs sans interprétation par le management."),
      text("Running internal audits as a paper exercise with no useful challenge.", "Exécuter l'audit interne comme un exercice papier sans vrai challenge."),
    ],
    exampleNonconformities: [
      {
        severity: "major",
        detail: text(
          "No internal audit programme or evidence exists during the certification cycle.",
          "Aucun programme d'audit interne ni aucune preuve n'existent pendant le cycle de certification.",
        ),
      },
      {
        severity: "observation",
        detail: text(
          "Management reviews happen, but trend analysis could be clearer and more decision-oriented.",
          "Les revues de direction ont lieu, mais l'analyse de tendance pourrait être plus claire et plus orientée décision.",
        ),
      },
    ],
    linkedControls: ["5.24", "8.15", "8.16"],
    terminology: [
      {
        term: text("Internal audit", "Audit interne"),
        explanation: text("The organization's own review of whether the ISMS is working as intended.", "La revue par l'organisation elle-même de la capacité du SMSI à fonctionner comme prévu."),
      },
      {
        term: text("Management review", "Revue de direction"),
        explanation: text("Leadership review of ISMS inputs, performance, and improvement needs.", "La revue par la direction des intrants, de la performance et des besoins d'amélioration du SMSI."),
      },
    ],
  },
  {
    clause: "10",
    title: text("Improvement", "Amélioration"),
    simple: text("Clause 10 asks how the organization reacts to issues and improves the ISMS over time.", "La clause 10 demande comment l'organisation réagit aux problèmes et améliore le SMSI dans le temps."),
    professional: text(
      "It covers nonconformity response, corrective action, and continual improvement of the suitability, adequacy, and effectiveness of the ISMS.",
      "Elle couvre la réponse aux non-conformités, l'action corrective et l'amélioration continue de la pertinence, de l'adéquation et de l'efficacité du SMSI.",
    ),
    businessMeaning: text(
      "A mature ISMS does not merely record gaps. It learns from them, changes the operating model, and demonstrates that the same issues are less likely to repeat.",
      "Un SMSI mature ne se contente pas d'enregistrer les écarts. Il en tire des apprentissages, modifie le mode de fonctionnement et démontre que les mêmes problèmes sont moins susceptibles de se répéter.",
    ),
    auditorEvidence: [
      text("Corrective action records", "Enregistrements d'actions correctives"),
      text("Root cause analysis", "Analyse de cause racine"),
      text("Follow-up verification", "Vérification de suivi"),
    ],
    commonMistakes: [
      text("Closing findings by updating documents only, without changing the process.", "Clore les constats en mettant seulement à jour les documents, sans changer le processus."),
      text("Treating repeated issues as isolated cases each time.", "Traiter les problèmes répétés comme des cas isolés à chaque fois."),
    ],
    exampleNonconformities: [
      {
        severity: "major",
        detail: text(
          "Repeated findings recur across audit cycles with no meaningful root-cause treatment.",
          "Des constats répétés reviennent sur plusieurs cycles d'audit sans traitement significatif de la cause racine.",
        ),
      },
      {
        severity: "minor",
        detail: text(
          "Corrective actions are opened but follow-up verification is inconsistently recorded.",
          "Des actions correctives sont ouvertes mais la vérification de suivi est enregistrée de façon incohérente.",
        ),
      },
    ],
    linkedControls: ["5.24", "5.27", "8.8"],
    terminology: [
      {
        term: text("Corrective action", "Action corrective"),
        explanation: text("Action to eliminate the cause of a detected nonconformity.", "Action visant à éliminer la cause d'une non-conformité détectée."),
      },
      {
        term: text("Continual improvement", "Amélioration continue"),
        explanation: text("Ongoing enhancement of the ISMS over time.", "Amélioration continue du SMSI dans le temps."),
      },
    ],
  },
];

const themeForControl = (code: string, category: AnnexControlCategory): LocalizedText => {
  if (category === "People") {
    return text("People and culture", "Personnes et culture");
  }
  if (category === "Physical") {
    return text("Sites and assets", "Sites et actifs");
  }
  if (code.startsWith("5.19") || code.startsWith("5.20") || code.startsWith("5.21") || code.startsWith("5.22") || code.startsWith("5.23")) {
    return text("Suppliers and cloud", "Fournisseurs et cloud");
  }
  if (code.startsWith("8.15") || code.startsWith("8.16") || code.startsWith("8.17")) {
    return text("Monitoring and evidence", "Surveillance et preuve");
  }
  if (code.startsWith("8.25") || code.startsWith("8.26") || code.startsWith("8.27") || code.startsWith("8.28") || code.startsWith("8.29") || code.startsWith("8.30") || code.startsWith("8.31") || code.startsWith("8.32") || code.startsWith("8.33")) {
    return text("Secure engineering", "Ingénierie sécurisée");
  }
  if (code.startsWith("5.15") || code.startsWith("5.16") || code.startsWith("5.17") || code.startsWith("5.18") || code.startsWith("8.5")) {
    return text("Identity and access", "Identité et accès");
  }
  if (code.startsWith("8.7") || code.startsWith("8.8") || code.startsWith("8.9")) {
    return text("Vulnerability and hardening", "Vulnérabilité et durcissement");
  }
  return category === "Organizational"
    ? text("Governance and compliance", "Gouvernance et conformité")
    : text("Technology operations", "Opérations technologiques");
};

const typeForControl = (code: string, category: AnnexControlCategory): ControlType => {
  if (category === "People") {
    return "Preventive";
  }
  if (code.startsWith("8.15") || code.startsWith("8.16") || code.startsWith("5.24")) {
    return "Detective";
  }
  if (code.startsWith("5.27") || code.startsWith("5.30") || code.startsWith("8.13") || code.startsWith("8.14")) {
    return "Corrective";
  }
  if (code.startsWith("5.1") || code.startsWith("5.2") || code.startsWith("5.4") || code.startsWith("5.31") || code.startsWith("5.32") || code.startsWith("5.33") || code.startsWith("5.34") || code.startsWith("5.35") || code.startsWith("5.36") || code.startsWith("5.37")) {
    return "Directive";
  }
  return "Preventive";
};

const relatedRisksForControl = (code: string, category: AnnexControlCategory): LocalizedText[] => {
  const theme = themeForControl(code, category).en;

  if (theme === "Suppliers and cloud") {
    return [
      text("Unmanaged supplier exposure creates hidden security dependency.", "Une exposition fournisseur non maîtrisée crée une dépendance sécurité cachée."),
      text("Service disruption or data handling gaps arise through third parties.", "Des interruptions de service ou des lacunes de traitement de données apparaissent via des tiers."),
    ];
  }

  if (theme === "Identity and access") {
    return [
      text("Excessive or stale access lets users exceed their business need.", "Des accès excessifs ou obsolètes permettent aux utilisateurs de dépasser leur besoin métier."),
      text("Weak authentication increases the chance of account misuse.", "Une authentification faible augmente la probabilité d'un usage abusif des comptes."),
    ];
  }

  if (theme === "Monitoring and evidence") {
    return [
      text("Attacks or misuse go unnoticed when records are missing or unreviewed.", "Les attaques ou usages abusifs passent inaperçus lorsque les traces manquent ou ne sont pas revues."),
      text("Investigations fail when evidence is incomplete or time is inconsistent.", "Les investigations échouent lorsque les preuves sont incomplètes ou que les horodatages sont incohérents."),
    ];
  }

  if (theme === "Secure engineering") {
    return [
      text("Security weaknesses enter production through poor design or release discipline.", "Des faiblesses de sécurité entrent en production via une conception ou une discipline de livraison insuffisantes."),
      text("Development shortcuts create recurring vulnerabilities and audit gaps.", "Des raccourcis de développement créent des vulnérabilités récurrentes et des écarts d'audit."),
    ];
  }

  if (category === "People") {
    return [
      text("People create avoidable exposure when expectations are unclear or unpracticed.", "Les personnes créent une exposition évitable lorsque les attentes sont floues ou non pratiquées."),
      text("Offboarding or remote work gaps can leave access and data unmanaged.", "Des lacunes d'offboarding ou de télétravail peuvent laisser des accès et données non maîtrisés."),
    ];
  }

  if (category === "Physical") {
    return [
      text("Physical access or equipment handling gaps can expose information in the real world.", "Des lacunes d'accès physique ou de manipulation des équipements peuvent exposer l'information dans le monde réel."),
      text("Visitors, sites, or disposal activities can bypass digital safeguards if not controlled.", "Les visiteurs, sites ou activités de destruction peuvent contourner les protections numériques s'ils ne sont pas maîtrisés."),
    ];
  }

  return [
    text("Weak governance creates inconsistent control execution and unclear accountability.", "Une gouvernance faible crée une exécution incohérente des mesures et une responsabilité floue."),
    text("Unclear rules or exceptions make security decisions hard to defend in audits.", "Des règles ou exceptions floues rendent les décisions sécurité difficiles à défendre en audit."),
  ];
};

const exampleImplementationForControl = (
  name: LocalizedText,
  code: string,
  category: AnnexControlCategory,
): LocalizedText => {
  if (category === "People") {
    return text(
      `For ${name.en.toLowerCase()}, a practical implementation often includes HR triggers, manager accountability, and evidence captured during onboarding, role change, or periodic training.`,
      `Pour ${name.fr.toLowerCase()}, une mise en oeuvre pratique inclut souvent des déclencheurs RH, la responsabilité managériale et des preuves capturées lors de l'onboarding, des changements de rôle ou des formations périodiques.`,
    );
  }
  if (category === "Physical") {
    return text(
      `For ${name.en.toLowerCase()}, organizations often use badge control, visitor processes, equipment handling steps, and disposal evidence linked to sites or rooms in scope.`,
      `Pour ${name.fr.toLowerCase()}, les organisations utilisent souvent un contrôle par badge, des processus visiteurs, des étapes de manipulation des équipements et des preuves de destruction liées aux sites ou salles dans le périmètre.`,
    );
  }
  if (code.startsWith("8.25") || code.startsWith("8.26") || code.startsWith("8.27") || code.startsWith("8.28") || code.startsWith("8.29") || code.startsWith("8.30") || code.startsWith("8.31") || code.startsWith("8.32") || code.startsWith("8.33")) {
    return text(
      `For ${name.en.toLowerCase()}, a realistic implementation often combines design review, ticket workflow, pull-request discipline, and evidence from testing or deployment.`,
      `Pour ${name.fr.toLowerCase()}, une mise en oeuvre réaliste combine souvent revue de conception, workflow de tickets, discipline de pull request et preuves issues des tests ou du déploiement.`,
    );
  }
  return text(
    `For ${name.en.toLowerCase()}, a typical implementation combines a documented rule, an operational owner, and recurring evidence that the rule is actually followed.`,
    `Pour ${name.fr.toLowerCase()}, une mise en oeuvre typique combine une règle documentée, un responsable opérationnel et des preuves récurrentes que la règle est réellement suivie.`,
  );
};

export const controlLibraryEntries: ControlLibraryEntry[] = annexControls.map((control) => {
  const theme = themeForControl(control.code, control.category);
  const type = typeForControl(control.code, control.category);

  return {
    code: control.code,
    category: control.category,
    name: control.title,
    shortExplanation: control.focus,
    businessMeaning: text(
      `${control.title.en} matters in business terms because it makes ${theme.en.toLowerCase()} decisions repeatable, reviewable, and easier to defend with evidence.`,
      `${control.title.fr} compte en termes métier car elle rend les décisions de ${theme.fr.toLowerCase()} répétables, revues et plus faciles à défendre avec des preuves.`,
    ),
    exampleImplementation: exampleImplementationForControl(
      control.title,
      control.code,
      control.category,
    ),
    relatedRisks: relatedRisksForControl(control.code, control.category),
    relatedEvidence: [
      control.evidenceHint,
      text(
        `Evidence should show who owns control ${control.code}, how it is performed, and how exceptions are tracked.`,
        `La preuve doit montrer qui porte la mesure ${control.code}, comment elle est exécutée et comment les exceptions sont suivies.`,
      ),
    ],
    relatedQuizLinks: [
      link("/practice", "Practice related questions", "Pratiquer les questions liées"),
      link("/practice/soa-builder", "Test SoA applicability", "Tester l'applicabilité dans la SoA"),
    ],
    businessTheme: theme,
    controlType: type,
    keywords: [
      control.code.toLowerCase(),
      control.category.toLowerCase(),
      control.title.en.toLowerCase(),
      control.title.fr.toLowerCase(),
      theme.en.toLowerCase(),
      type.toLowerCase(),
    ],
  };
});

export const controlCategoryOverview = controlCategorySummaries.map((summary) => ({
  ...summary,
  businessLens:
    summary.category === "Organizational"
      ? text("Policies, governance, supplier oversight, incident management, continuity, and compliance.", "Politiques, gouvernance, pilotage fournisseur, gestion d'incident, continuité et conformité.")
      : summary.category === "People"
        ? text("Awareness, hiring, offboarding, remote work, and human behavior.", "Sensibilisation, recrutement, offboarding, télétravail et comportement humain.")
        : summary.category === "Physical"
          ? text("Premises, visitors, equipment, disposal, and environmental protection.", "Locaux, visiteurs, équipements, destruction et protection environnementale.")
          : text("Identity, logging, vulnerabilities, backups, networks, and secure development.", "Identité, journalisation, vulnérabilités, sauvegardes, réseaux et développement sécurisé."),
}));

export const riskLabScenarios: RiskLabScenario[] = [
  {
    id: "paris-saas",
    company: "CloudPilot",
    title: text("SaaS startup in Paris handling customer data", "Startup SaaS à Paris traitant des données clients"),
    sector: text("B2B SaaS", "SaaS B2B"),
    location: text("Paris, France", "Paris, France"),
    context: text(
      "A fast-growing SaaS startup stores customer data, uses cloud infrastructure, ships product weekly, and is under pressure from enterprise buyers asking for ISO 27001 alignment.",
      "Une startup SaaS en forte croissance stocke des données clients, utilise une infrastructure cloud, livre le produit chaque semaine et subit la pression d'acheteurs grands comptes demandant un alignement ISO 27001.",
    ),
    assets: [
      text("Customer production database", "Base de données de production client"),
      text("Source code repository", "Dépôt de code source"),
      text("Customer support platform", "Plateforme de support client"),
      text("Cloud administration accounts", "Comptes d'administration cloud"),
    ],
    threats: [
      text("Credential theft", "Vol d'identifiants"),
      text("Production misconfiguration", "Mauvaise configuration de production"),
      text("Supplier outage", "Panne fournisseur"),
      text("Unauthorized code change", "Modification de code non autorisée"),
    ],
    vulnerabilities: [
      text("Inconsistent access review", "Revue des accès incohérente"),
      text("Weak logging review discipline", "Discipline de revue des logs faible"),
      text("Limited supplier due diligence", "Due diligence fournisseur limitée"),
      text("Shared admin practices", "Pratiques d'administration partagées"),
    ],
    recommendedControls: ["5.15", "5.18", "5.19", "8.5", "8.8", "8.15", "8.25", "8.32"],
    teachingFocus: [
      text("Identity and access decisions", "Décisions identité et accès"),
      text("Cloud and supplier dependence", "Dépendance cloud et fournisseur"),
      text("Secure development and logging", "Développement sécurisé et journalisation"),
    ],
  },
  {
    id: "healthcare-docs",
    company: "MedArchive",
    title: text("Healthcare-adjacent company with sensitive documents", "Entreprise proche de la santé avec documents sensibles"),
    sector: text("Healthcare services", "Services de santé"),
    location: text("Lille, France", "Lille, France"),
    context: text(
      "A document-processing company handles sensitive healthcare-adjacent records, relies on scanning operations, and must protect confidentiality while keeping retrieval fast for authorized staff.",
      "Une entreprise de traitement documentaire manipule des dossiers sensibles proches du secteur santé, dépend d'opérations de numérisation et doit protéger la confidentialité tout en gardant un accès rapide pour le personnel autorisé.",
    ),
    assets: [
      text("Sensitive document archive", "Archive documentaire sensible"),
      text("Scanning workstation fleet", "Parc de postes de numérisation"),
      text("Shared file repositories", "Référentiels de fichiers partagés"),
      text("Visitor-access office areas", "Zones de bureau accessibles aux visiteurs"),
    ],
    threats: [
      text("Unauthorized viewing of records", "Consultation non autorisée des dossiers"),
      text("Improper disposal of paper or devices", "Destruction inadaptée de papier ou d'équipements"),
      text("Loss of availability during archive retrieval", "Perte de disponibilité lors de la recherche d'archives"),
      text("Social engineering against staff", "Ingénierie sociale contre le personnel"),
    ],
    vulnerabilities: [
      text("Weak confidentiality reminders", "Rappels de confidentialité faibles"),
      text("Shared workspace practices", "Pratiques d'espaces partagés"),
      text("Unclear retention and disposal rules", "Règles de conservation et destruction floues"),
      text("Insufficient visitor handling", "Gestion visiteurs insuffisante"),
    ],
    recommendedControls: ["5.12", "5.13", "5.10", "6.3", "7.2", "7.10", "7.14", "8.10", "8.24"],
    teachingFocus: [
      text("Confidentiality-heavy risk reasoning", "Raisonnement de risque fortement orienté confidentialité"),
      text("Physical and document handling controls", "Mesures physiques et de gestion documentaire"),
      text("People awareness and disposal evidence", "Sensibilisation des personnes et preuve de destruction"),
    ],
  },
  {
    id: "manufacturing-site",
    company: "NordFab",
    title: text("Manufacturing company with office and physical site", "Entreprise industrielle avec bureaux et site physique"),
    sector: text("Manufacturing", "Industrie"),
    location: text("Lyon region, France", "Région lyonnaise, France"),
    context: text(
      "A manufacturer operates offices, a production site, contractors, and supplier-managed equipment. The company needs to balance cyber governance with physical access and continuity realities.",
      "Un industriel exploite des bureaux, un site de production, des prestataires et des équipements gérés par des fournisseurs. L'entreprise doit équilibrer gouvernance cyber, accès physique et réalités de continuité.",
    ),
    assets: [
      text("Production planning system", "Système de planification de production"),
      text("Site network and industrial endpoints", "Réseau du site et terminaux industriels"),
      text("Badge-controlled plant areas", "Zones d'usine contrôlées par badge"),
      text("Supplier-maintained machinery records", "Dossiers des machines maintenues par des fournisseurs"),
    ],
    threats: [
      text("Unauthorized physical entry", "Entrée physique non autorisée"),
      text("Production interruption", "Interruption de production"),
      text("Supplier maintenance abuse", "Abus lors d'une maintenance fournisseur"),
      text("Inadequate network segregation", "Segmentation réseau inadéquate"),
    ],
    vulnerabilities: [
      text("Outdated visitor and contractor process", "Processus visiteurs et prestataires obsolète"),
      text("Weak environmental or site monitoring", "Surveillance environnementale ou site insuffisante"),
      text("Unclear machinery access ownership", "Responsabilité d'accès aux machines floue"),
      text("Limited continuity testing", "Tests de continuité limités"),
    ],
    recommendedControls: ["5.19", "5.24", "5.30", "7.1", "7.2", "7.4", "7.7", "8.20", "8.22", "8.13"],
    teachingFocus: [
      text("Physical and technological control interplay", "Interaction entre mesures physiques et technologiques"),
      text("Supplier-managed operational risk", "Risque opérationnel piloté par les fournisseurs"),
      text("Continuity and site access evidence", "Preuve de continuité et d'accès au site"),
    ],
  },
];

export const soaTeachingCards: SoaTeachingCard[] = [
  {
    title: text("What the SoA is", "Ce qu’est la SoA"),
    body: text(
      "A Statement of Applicability is the learner-friendly map of which Annex A controls apply, why they apply or not, and how implementation stands.",
      "Une déclaration d'applicabilité est la carte pédagogique des mesures de l'Annexe A qui s'appliquent, de la raison pour laquelle elles s'appliquent ou non et de l'état de leur mise en oeuvre.",
    ),
  },
  {
    title: text("Why auditors care", "Pourquoi les auditeurs y tiennent"),
    body: text(
      "Auditors use the SoA to test whether the organization can trace control applicability back to risk, obligations, and actual implementation.",
      "Les auditeurs utilisent la SoA pour vérifier si l'organisation sait relier l'applicabilité des mesures au risque, aux obligations et à la mise en oeuvre réelle.",
    ),
  },
  {
    title: text("How it relates to risk treatment", "Comment elle se relie au traitement du risque"),
    body: text(
      "The SoA should not invent controls independently of the risk process. It should reflect the decisions already made in risk treatment and business context analysis.",
      "La SoA ne doit pas inventer les mesures indépendamment du processus de risque. Elle doit refléter les décisions déjà prises dans le traitement du risque et l'analyse du contexte métier.",
    ),
  },
  {
    title: text("Common mistakes", "Erreurs fréquentes"),
    body: text(
      "Common mistakes include generic yes/no decisions, no justification, no implementation status, and poor alignment with the real operating model.",
      "Parmi les erreurs fréquentes figurent des décisions oui/non génériques, l'absence de justification, l'absence d'état de mise en oeuvre et un mauvais alignement avec le mode de fonctionnement réel.",
    ),
  },
];

export const nonconformityCases: NonconformityCase[] = [
  {
    id: "nc-1",
    title: text("No formal risk assessment exists", "Aucune analyse des risques formelle n’existe"),
    context: text(
      "The organization claims to manage risk, but sampled teams cannot show a defined method, documented criteria, or a current risk register for the ISMS scope.",
      "L'organisation affirme gérer le risque, mais les équipes échantillonnées ne peuvent montrer ni méthode définie, ni critères documentés, ni registre de risque à jour pour le périmètre du SMSI.",
    ),
    classification: "major",
    why: text(
      "Risk assessment is a core part of ISO 27001 planning. Without it, the ISMS lacks a central decision mechanism.",
      "L'analyse des risques fait partie du coeur de la planification ISO 27001. Sans elle, le SMSI manque d'un mécanisme de décision central.",
    ),
    correctiveAction: [
      text("Define and approve a formal risk method.", "Définir et approuver une méthode de risque formelle."),
      text("Run the first scoped assessment with owners and criteria.", "Exécuter la première analyse sur le périmètre avec responsables et critères."),
      text("Create a maintained risk register and treatment plan.", "Créer un registre de risques maintenu et un plan de traitement."),
    ],
    relatedClause: "6",
    relatedControls: ["5.7", "8.8"],
    followUpQuestion: text(
      "How were current control decisions made if no formal risk method existed?",
      "Comment les décisions actuelles sur les mesures ont-elles été prises si aucune méthode de risque formelle n'existait ?",
    ),
  },
  {
    id: "nc-2",
    title: text("Statement of Applicability is missing", "La déclaration d’applicabilité est absente"),
    context: text(
      "The team can name some implemented controls but cannot show a current Statement of Applicability or a document explaining applicability decisions.",
      "L'équipe peut citer quelques mesures mises en oeuvre mais ne peut montrer ni déclaration d'applicabilité à jour ni document expliquant les décisions d'applicabilité.",
    ),
    classification: "major",
    why: text(
      "The SoA is a core ISO 27001 artifact linking treatment decisions to the Annex A control set. Its absence undermines traceability.",
      "La SoA est un artefact clé de l'ISO 27001 reliant les décisions de traitement au jeu de mesures de l'Annexe A. Son absence fragilise la traçabilité.",
    ),
    correctiveAction: [
      text("Build an SoA from the current risk treatment position.", "Construire une SoA à partir de la position actuelle de traitement du risque."),
      text("Record applicability, justification, and implementation status.", "Enregistrer applicabilité, justification et état de mise en oeuvre."),
      text("Review the SoA through governance before audit use.", "Revoir la SoA dans la gouvernance avant usage en audit."),
    ],
    relatedClause: "6",
    relatedControls: ["5.1", "5.19", "8.15"],
    followUpQuestion: text(
      "What logic is the organization using today to decide which controls matter?",
      "Quelle logique l'organisation utilise-t-elle aujourd'hui pour décider quelles mesures comptent ?",
    ),
  },
  {
    id: "nc-3",
    title: text("Access reviews are not documented", "Les revues d’accès ne sont pas documentées"),
    context: text(
      "Managers say they review access quarterly, but the sampled evidence trail is incomplete and one business unit has no current review record.",
      "Les managers indiquent revoir les accès trimestriellement, mais la piste de preuve échantillonnée est incomplète et une unité métier n'a aucun enregistrement à jour.",
    ),
    classification: "minor",
    why: text(
      "The process appears to exist, but the evidence of consistent execution is incomplete in part of the scope.",
      "Le processus semble exister, mais la preuve de son exécution cohérente est incomplète sur une partie du périmètre.",
    ),
    correctiveAction: [
      text("Clarify who owns each review cycle.", "Clarifier qui porte chaque cycle de revue."),
      text("Standardize the evidence capture format.", "Standardiser le format de capture de preuve."),
      text("Add monitoring for missed review windows.", "Ajouter une surveillance des fenêtres de revue manquées."),
    ],
    relatedClause: "8",
    relatedControls: ["5.15", "5.18"],
    followUpQuestion: text(
      "How would you know next quarter if a review had been missed again?",
      "Comment sauriez-vous au prochain trimestre qu'une revue a de nouveau été manquée ?",
    ),
  },
  {
    id: "nc-4",
    title: text("Onboarding exists but offboarding evidence is inconsistent", "L’onboarding existe mais la preuve d’offboarding est incohérente"),
    context: text(
      "Joiner and mover steps are documented, but leaver evidence is inconsistent across sampled teams and one terminated user still appears in an active roster.",
      "Les étapes arrivées et mobilités sont documentées, mais la preuve de départ est incohérente sur les équipes échantillonnées et un utilisateur parti apparaît encore dans une liste active.",
    ),
    classification: "minor",
    why: text(
      "The control structure exists, but the execution gap creates avoidable residual access risk.",
      "La structure de contrôle existe, mais l'écart d'exécution crée un risque d'accès résiduel évitable.",
    ),
    correctiveAction: [
      text("Align offboarding triggers between HR and IT.", "Aligner les déclencheurs d'offboarding entre RH et IT."),
      text("Make access revocation evidence mandatory.", "Rendre obligatoire la preuve de révocation des accès."),
      text("Review stale account detection monthly.", "Revoir mensuellement la détection des comptes obsolètes."),
    ],
    relatedClause: "7",
    relatedControls: ["5.11", "5.18", "6.5"],
    followUpQuestion: text(
      "Which role is accountable for proving access removal after a departure?",
      "Quel rôle est responsable de prouver la suppression des accès après un départ ?",
    ),
  },
  {
    id: "nc-5",
    title: text("Incident process exists but was not followed", "Le processus d’incident existe mais n’a pas été suivi"),
    context: text(
      "An incident response workflow is documented, but a sampled security event was escalated through informal channels and no formal post-incident evidence exists.",
      "Un workflow de réponse à incident est documenté, mais un événement sécurité échantillonné a été escaladé par des canaux informels et aucune preuve post-incident formelle n'existe.",
    ),
    classification: "minor",
    why: text(
      "The process exists, yet the sampled breakdown shows operational inconsistency that weakens confidence in real execution.",
      "Le processus existe, mais la rupture constatée sur l'échantillon montre une incohérence opérationnelle qui affaiblit la confiance dans l'exécution réelle.",
    ),
    correctiveAction: [
      text("Re-train responders on the approved escalation path.", "Former à nouveau les intervenants sur le circuit d'escalade approuvé."),
      text("Capture post-incident evidence and lessons learned consistently.", "Capturer systématiquement la preuve post-incident et les retours d'expérience."),
      text("Monitor future incidents for use of the defined process.", "Surveiller les incidents futurs pour vérifier l'usage du processus défini."),
    ],
    relatedClause: "8",
    relatedControls: ["5.24", "5.27", "8.15"],
    followUpQuestion: text(
      "How does management know whether the formal incident process is being used consistently?",
      "Comment la direction sait-elle si le processus formel d'incident est utilisé de façon cohérente ?",
    ),
  },
  {
    id: "nc-6",
    title: text("Training policy exists but attendance evidence is missing", "La politique de formation existe mais la preuve de présence manque"),
    context: text(
      "Security awareness is formally planned, but attendance evidence for two sampled teams is absent and refresher completion is not centrally tracked.",
      "La sensibilisation sécurité est formellement planifiée, mais la preuve de présence pour deux équipes échantillonnées est absente et la réalisation des refreshers n'est pas suivie centralement.",
    ),
    classification: "observation",
    why: text(
      "The policy and programme exist, but the evidence model and central tracking should be strengthened before the weakness grows into a broader execution gap.",
      "La politique et le programme existent, mais le modèle de preuve et le suivi central doivent être renforcés avant que la faiblesse ne devienne un écart d'exécution plus large.",
    ),
    correctiveAction: [
      text("Define a single attendance evidence format.", "Définir un format unique de preuve de présence."),
      text("Track refresher completion centrally.", "Suivre centralement la réalisation des refreshers."),
      text("Escalate overdue completion to line managers.", "Escalader les retards de réalisation aux managers."),
    ],
    relatedClause: "7",
    relatedControls: ["6.3"],
    followUpQuestion: text(
      "If attendance evidence is missing today, how will you demonstrate competence and awareness next quarter?",
      "Si la preuve de présence manque aujourd'hui, comment démontrerez-vous compétence et sensibilisation au prochain trimestre ?",
    ),
  },
];

export const compareFrameworks: CompareFramework[] = [
  {
    id: "iso-27001",
    name: "ISO/IEC 27001",
    title: text("Certifiable ISMS standard", "Norme certifiable de SMSI"),
    type: text("International standard", "Norme internationale"),
    purpose: text("Define certifiable requirements for an information security management system.", "Définir des exigences certifiables pour un système de management de la sécurité de l'information."),
    whoUsesIt: text("Organizations wanting a structured and certifiable ISMS.", "Les organisations qui veulent un SMSI structuré et certifiable."),
    legalStatus: text("Standard, not a law.", "Norme, pas une loi."),
    businessRelevance: text("Useful for customer assurance, governance, and operational discipline.", "Utile pour l'assurance client, la gouvernance et la discipline opérationnelle."),
  },
  {
    id: "iso-27002",
    name: "ISO/IEC 27002",
    title: text("Control implementation guidance", "Guide de mise en oeuvre des mesures"),
    type: text("Guidance standard", "Norme guide"),
    purpose: text("Explain and interpret the control set used alongside ISO 27001.", "Expliquer et interpréter le jeu de mesures utilisé aux côtés de l'ISO 27001."),
    whoUsesIt: text("Security, compliance, and implementation teams.", "Les équipes sécurité, conformité et mise en oeuvre."),
    legalStatus: text("Guidance standard, not a certification by itself.", "Norme guide, pas une certification en soi."),
    businessRelevance: text("Helps teams make control implementation more practical and consistent.", "Aide les équipes à rendre la mise en oeuvre des mesures plus pratique et cohérente."),
  },
  {
    id: "iso-19011",
    name: "ISO 19011",
    title: text("Audit guidance for management systems", "Guide d’audit des systèmes de management"),
    type: text("Guidance standard", "Norme guide"),
    purpose: text("Provide principles and guidance for auditing management systems.", "Fournir des principes et lignes directrices pour l'audit des systèmes de management."),
    whoUsesIt: text("Internal auditors, audit programme owners, and audit teams.", "Les auditeurs internes, responsables de programmes d'audit et équipes d'audit."),
    legalStatus: text("Guidance standard, not a law or attestation.", "Norme guide, pas une loi ni une attestation."),
    businessRelevance: text("Useful for planning, sampling, evidence gathering, and audit discipline.", "Utile pour la planification, l'échantillonnage, la collecte de preuves et la discipline d'audit."),
  },
  {
    id: "soc2",
    name: "SOC 2",
    title: text("Attestation framework", "Référentiel d’attestation"),
    type: text("Attestation report", "Rapport d'attestation"),
    purpose: text("Assess controls against Trust Services Criteria through an auditor report.", "Évaluer les contrôles vis-à-vis des Trust Services Criteria via un rapport d'auditeur."),
    whoUsesIt: text("Mostly SaaS and service organizations selling into North American markets.", "Surtout les SaaS et prestataires vendant sur des marchés nord-américains."),
    legalStatus: text("Attestation, not a law.", "Attestation, pas une loi."),
    businessRelevance: text("Often requested by customers as a control attestation rather than an ISMS certification.", "Souvent demandé par les clients comme attestation de contrôles plutôt que comme certification de SMSI."),
  },
  {
    id: "gdpr",
    name: "GDPR",
    title: text("EU data protection law", "Règlement européen sur la protection des données"),
    type: text("Law", "Loi"),
    purpose: text("Protect personal data and govern lawful processing, rights, and accountability.", "Protéger les données personnelles et encadrer la licéité du traitement, les droits et la responsabilité."),
    whoUsesIt: text("Any organization handling personal data in the EU context.", "Toute organisation manipulant des données personnelles dans le contexte européen."),
    legalStatus: text("Law and regulatory obligation.", "Loi et obligation réglementaire."),
    businessRelevance: text("Highly relevant in France because security, privacy, and accountability overlap in many projects.", "Très pertinent en France car sécurité, vie privée et responsabilité se recoupent dans de nombreux projets."),
  },
  {
    id: "hipaa",
    name: "HIPAA",
    title: text("US healthcare privacy and security law", "Loi américaine de confidentialité et sécurité santé"),
    type: text("Law", "Loi"),
    purpose: text("Protect healthcare information in the US through privacy and security requirements.", "Protéger l'information de santé aux États-Unis via des exigences de confidentialité et de sécurité."),
    whoUsesIt: text("US healthcare entities and business associates.", "Les entités de santé américaines et leurs partenaires."),
    legalStatus: text("US law.", "Loi américaine."),
    businessRelevance: text("Relevant mainly when a French or European business serves US healthcare-related clients or markets.", "Pertinent surtout lorsqu'une entreprise française ou européenne sert des clients ou marchés santé américains."),
  },
];

export const glossaryEntries: GlossaryEntry[] = [
  {
    slug: "isms",
    term: text("Information Security Management System", "Système de management de la sécurité de l'information"),
    plainExplanation: text("The operating system for how a company manages information security.", "Le système d'exploitation de la manière dont une entreprise pilote la sécurité de l'information."),
    professionalExplanation: text("A structured management framework for establishing, operating, monitoring, and improving information security in context.", "Un cadre de management structuré pour établir, exploiter, surveiller et améliorer la sécurité de l'information dans son contexte."),
    exampleInContext: text("In a meeting: 'Our ISMS covers the customer platform, support process, and supplier oversight.'", "En réunion : « Notre SMSI couvre la plateforme client, le processus support et le pilotage fournisseur. »"),
    topic: text("Core concept", "Concept coeur"),
    audioStatus: text("Audio pronunciation placeholder", "Emplacement réservé à la prononciation audio"),
  },
  {
    slug: "risk-assessment",
    term: text("Risk assessment", "Analyse des risques"),
    plainExplanation: text("The method used to decide what could go wrong and how serious it is.", "La méthode utilisée pour décider ce qui pourrait mal tourner et à quel point c'est sérieux."),
    professionalExplanation: text("A repeatable process for identifying assets, threats, vulnerabilities, likelihood, impact, and treatment priority.", "Un processus répétable d'identification des actifs, menaces, vulnérabilités, vraisemblance, impact et priorité de traitement."),
    exampleInContext: text("In a workshop: 'We need to refresh the risk assessment before changing the cloud architecture.'", "En atelier : « Nous devons rafraîchir l'analyse des risques avant de modifier l'architecture cloud. »"),
    topic: text("Risk", "Risque"),
    audioStatus: text("Audio pronunciation placeholder", "Emplacement réservé à la prononciation audio"),
  },
  {
    slug: "risk-treatment",
    term: text("Risk treatment", "Traitement du risque"),
    plainExplanation: text("The choice of what the company will do about a risk.", "Le choix de ce que l'entreprise va faire face à un risque."),
    professionalExplanation: text("The formal decision to mitigate, avoid, transfer, or accept evaluated risk based on criteria and business context.", "La décision formelle de réduire, éviter, transférer ou accepter un risque évalué selon des critères et le contexte métier."),
    exampleInContext: text("In project review: 'The risk is accepted temporarily while the mitigation project is funded.'", "En revue projet : « Le risque est accepté temporairement pendant le financement du projet de réduction. »"),
    topic: text("Risk", "Risque"),
    audioStatus: text("Audio pronunciation placeholder", "Emplacement réservé à la prononciation audio"),
  },
  {
    slug: "soa",
    term: text("Statement of Applicability", "Déclaration d’applicabilité"),
    plainExplanation: text("The map showing which Annex A controls matter and why.", "La carte qui montre quelles mesures de l'Annexe A comptent et pourquoi."),
    professionalExplanation: text("A core ISO 27001 artifact documenting control applicability, justification, and implementation status in relation to treatment decisions.", "Un artefact central de l'ISO 27001 documentant l'applicabilité des mesures, leur justification et leur état de mise en oeuvre par rapport aux décisions de traitement."),
    exampleInContext: text("In audit prep: 'Let's confirm the SoA still matches our current supplier and logging decisions.'", "En préparation d'audit : « Vérifions que la SoA correspond toujours à nos décisions actuelles sur les fournisseurs et la journalisation. »"),
    topic: text("Core artifact", "Artefact clé"),
    audioStatus: text("Audio pronunciation placeholder", "Emplacement réservé à la prononciation audio"),
  },
  {
    slug: "nonconformity",
    term: text("Nonconformity", "Non-conformité"),
    plainExplanation: text("A proven gap between what should happen and what actually happens.", "Un écart prouvé entre ce qui devrait se passer et ce qui se passe réellement."),
    professionalExplanation: text("An evidence-based failure against a stated requirement, expected process, or claimed control operation.", "Une défaillance étayée par la preuve par rapport à une exigence, un processus attendu ou un fonctionnement de mesure revendiqué."),
    exampleInContext: text("In an audit: 'This is a nonconformity because the process exists on paper but was not followed in the sample.'", "En audit : « Il s'agit d'une non-conformité car le processus existe sur le papier mais n'a pas été suivi dans l'échantillon. »"),
    topic: text("Audit", "Audit"),
    audioStatus: text("Audio pronunciation placeholder", "Emplacement réservé à la prononciation audio"),
  },
  {
    slug: "audit-evidence",
    term: text("Audit evidence", "Preuve d’audit"),
    plainExplanation: text("The proof an auditor uses to support a conclusion.", "La preuve qu'un auditeur utilise pour soutenir une conclusion."),
    professionalExplanation: text("Records, observations, interviews, logs, configurations, or outputs that establish whether requirements or controls are operating as claimed.", "Des enregistrements, observations, entretiens, logs, configurations ou sorties systèmes qui établissent si les exigences ou mesures fonctionnent comme annoncé."),
    exampleInContext: text("In a walkthrough: 'Show me the evidence for the latest access review, not only the procedure.'", "Lors d'un walkthrough : « Montrez-moi la preuve de la dernière revue des accès, pas seulement la procédure. »"),
    topic: text("Audit", "Audit"),
    audioStatus: text("Audio pronunciation placeholder", "Emplacement réservé à la prononciation audio"),
  },
  {
    slug: "control",
    term: text("Control", "Mesure"),
    plainExplanation: text("A safeguard chosen to reduce, detect, guide, or correct security risk.", "Une protection choisie pour réduire, détecter, guider ou corriger un risque sécurité."),
    professionalExplanation: text("An organizational, people, physical, or technological measure selected through risk treatment and implemented with evidence.", "Une mesure organisationnelle, humaine, physique ou technologique sélectionnée via le traitement du risque et mise en oeuvre avec des preuves."),
    exampleInContext: text("In design review: 'Which control will actually reduce this supplier-access risk?'", "En revue de conception : « Quelle mesure réduira réellement ce risque d'accès fournisseur ? »"),
    topic: text("Controls", "Mesures"),
    audioStatus: text("Audio pronunciation placeholder", "Emplacement réservé à la prononciation audio"),
  },
  {
    slug: "scope",
    term: text("Scope", "Périmètre"),
    plainExplanation: text("The boundary of what the ISMS covers.", "La frontière de ce que couvre le SMSI."),
    professionalExplanation: text("The documented boundary of the ISMS in terms of business activities, locations, assets, systems, and interfaces.", "La frontière documentée du SMSI en termes d'activités métier, lieux, actifs, systèmes et interfaces."),
    exampleInContext: text("In a kickoff: 'The scope covers the SaaS product and support operations, not every corporate service.'", "En kickoff : « Le périmètre couvre le produit SaaS et les opérations support, pas tous les services corporate. »"),
    topic: text("Core concept", "Concept coeur"),
    audioStatus: text("Audio pronunciation placeholder", "Emplacement réservé à la prononciation audio"),
  },
  {
    slug: "management-review",
    term: text("Management review", "Revue de direction"),
    plainExplanation: text("The formal moment when leadership reviews whether the ISMS is working.", "Le moment formel où la direction revoit si le SMSI fonctionne."),
    professionalExplanation: text("A clause 9 mechanism for leadership to review performance inputs, outcomes, changes, and improvement needs of the ISMS.", "Un mécanisme de clause 9 permettant à la direction de revoir les intrants de performance, résultats, changements et besoins d'amélioration du SMSI."),
    exampleInContext: text("In governance: 'The management review should discuss trends, findings, and resource needs.'", "En gouvernance : « La revue de direction doit discuter tendances, constats et besoins en ressources. »"),
    topic: text("Governance", "Gouvernance"),
    audioStatus: text("Audio pronunciation placeholder", "Emplacement réservé à la prononciation audio"),
  },
  {
    slug: "minor-nonconformity",
    term: text("Minor nonconformity", "Non-conformité mineure"),
    plainExplanation: text("A gap where the system exists but is not followed or evidenced consistently.", "Un écart où le système existe mais n'est pas suivi ou prouvé de façon cohérente."),
    professionalExplanation: text("A finding showing partial or localized failure without undermining confidence in the whole ISMS.", "Un constat montrant une défaillance partielle ou localisée sans remettre en cause la confiance dans l'ensemble du SMSI."),
    exampleInContext: text("In a close-out meeting: 'This is minor because the process exists, but the sample was incomplete.'", "En réunion de clôture : « C'est mineur parce que le processus existe, mais l'échantillon était incomplet. »"),
    topic: text("Audit", "Audit"),
    audioStatus: text("Audio pronunciation placeholder", "Emplacement réservé à la prononciation audio"),
  },
  {
    slug: "major-nonconformity",
    term: text("Major nonconformity", "Non-conformité majeure"),
    plainExplanation: text("A serious or systemic gap that weakens confidence in the ISMS.", "Un écart sérieux ou systémique qui affaiblit la confiance dans le SMSI."),
    professionalExplanation: text("A significant failure showing that a core requirement or system capability is absent or materially ineffective.", "Une défaillance significative montrant qu'une exigence centrale ou une capacité système est absente ou matériellement inefficace."),
    exampleInContext: text("In audit review: 'This is major because there is no formal risk assessment method at all.'", "En revue d'audit : « C'est majeur car il n'existe aucune méthode formelle d'analyse des risques. »"),
    topic: text("Audit", "Audit"),
    audioStatus: text("Audio pronunciation placeholder", "Emplacement réservé à la prononciation audio"),
  },
];

export const phraseLibrary: PhraseLibraryEntry[] = [
  {
    situation: text("Explaining ISO 27001 in a meeting", "Expliquer l’ISO 27001 en réunion"),
    english:
      "ISO 27001 is the management system that helps us govern security decisions, not just a list of tools.",
    french:
      "L’ISO 27001 est le système de management qui nous aide à piloter les décisions sécurité, pas seulement une liste d’outils.",
    note: text(
      "Use this when you need a plain but credible explanation for mixed technical and non-technical audiences.",
      "À utiliser lorsque vous avez besoin d'une explication simple mais crédible pour une audience mixte technique et non technique.",
    ),
  },
  {
    situation: text("Describing the SoA", "Décrire la SoA"),
    english:
      "The Statement of Applicability shows which Annex A controls we retain, why they apply, and how far implementation has progressed.",
    french:
      "La déclaration d’applicabilité montre quelles mesures de l’Annexe A nous retenons, pourquoi elles s’appliquent et jusqu’où leur mise en oeuvre a progressé.",
    note: text(
      "Useful in project meetings and audit preparation when someone asks why a control is included or excluded.",
      "Utile en réunion projet et en préparation d'audit lorsque quelqu'un demande pourquoi une mesure est incluse ou exclue.",
    ),
  },
  {
    situation: text("Talking about audit evidence", "Parler de preuve d’audit"),
    english:
      "We need evidence that the process is operating, not only the procedure document.",
    french:
      "Nous avons besoin de preuves que le processus fonctionne, pas seulement du document de procédure.",
    note: text(
      "This phrasing is especially helpful when coaching operational teams before audits.",
      "Cette formulation est particulièrement utile pour préparer les équipes opérationnelles avant les audits.",
    ),
  },
  {
    situation: text("Explaining risk treatment", "Expliquer le traitement du risque"),
    english:
      "We assessed the risk, selected mitigation, and linked it to access review and logging controls.",
    french:
      "Nous avons évalué le risque, choisi une réduction et l’avons relié à des mesures de revue des accès et de journalisation.",
    note: text(
      "Use this sentence when you need to connect risk language to concrete control action.",
      "Utilisez cette phrase lorsque vous devez relier le langage du risque à une action concrète sur les mesures.",
    ),
  },
];

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: "practice-1",
    type: "multiple-choice",
    topic: "clauses",
    prompt: text("Which clause is most directly concerned with risk treatment planning?", "Quelle clause est la plus directement liée à la planification du traitement du risque ?"),
    explanation: text("Clause 6 covers planning, including risks, opportunities, and objectives.", "La clause 6 couvre la planification, y compris les risques, opportunités et objectifs."),
    correctOptionId: "6",
    options: [
      { id: "4", label: text("Clause 4", "Clause 4") },
      { id: "6", label: text("Clause 6", "Clause 6") },
      { id: "10", label: text("Clause 10", "Clause 10") },
    ],
  },
  {
    id: "practice-2",
    type: "true-false",
    topic: "controls",
    prompt: text("True or false: Annex A should be applied as a blind checklist in every organization.", "Vrai ou faux : l’Annexe A doit être appliquée comme une checklist aveugle dans chaque organisation."),
    explanation: text("False. Control applicability should be justified through risk, context, and obligations.", "Faux. L'applicabilité des mesures doit être justifiée par le risque, le contexte et les obligations."),
    correctValue: false,
  },
  {
    id: "practice-3",
    type: "matching",
    topic: "clauses",
    prompt: text("Match each clause to its main management role.", "Associez chaque clause à son rôle principal de management."),
    explanation: text("Clause 4 frames context, clause 9 reviews performance, and clause 10 drives improvement.", "La clause 4 cadre le contexte, la clause 9 revoit la performance et la clause 10 pilote l'amélioration."),
    prompts: [
      { id: "4", label: text("Clause 4", "Clause 4") },
      { id: "9", label: text("Clause 9", "Clause 9") },
      { id: "10", label: text("Clause 10", "Clause 10") },
    ],
    options: [
      { id: "context", label: text("Context and scope", "Contexte et périmètre") },
      { id: "performance", label: text("Performance evaluation", "Évaluation de la performance") },
      { id: "improvement", label: text("Improvement and corrective action", "Amélioration et action corrective") },
    ],
    correctMatches: {
      "4": "context",
      "9": "performance",
      "10": "improvement",
    },
  },
  {
    id: "practice-4",
    type: "scenario-classification",
    topic: "audit",
    prompt: text("Classify the finding.", "Qualifiez le constat."),
    explanation: text("If the SoA is missing entirely, traceability to the control set is materially weakened.", "Si la SoA est totalement absente, la traçabilité vers le jeu de mesures est matériellement affaiblie."),
    caseContext: text("The organization cannot show any Statement of Applicability, although it claims to have implemented Annex A controls.", "L'organisation ne peut montrer aucune déclaration d'applicabilité alors qu'elle affirme avoir mis en oeuvre des mesures de l'Annexe A."),
    options: [
      { id: "major", label: text("Major nonconformity", "Non-conformité majeure") },
      { id: "minor", label: text("Minor nonconformity", "Non-conformité mineure") },
      { id: "observation", label: text("Observation", "Observation") },
    ],
    correctOptionId: "major",
    relatedClause: "6",
    relatedControls: ["5.1", "8.15"],
  },
  {
    id: "practice-5",
    type: "clause-control-link",
    topic: "controls",
    prompt: text("Which control best supports the need to review and remove access rights?", "Quelle mesure soutient le mieux le besoin de revoir et retirer les droits d’accès ?"),
    explanation: text("Control 5.18 focuses specifically on access rights lifecycle and review.", "La mesure 5.18 se concentre spécifiquement sur le cycle de vie et la revue des droits d'accès."),
    leftLabel: text("Access rights review", "Revue des droits d'accès"),
    options: [
      { id: "5.18", label: text("5.18 Access rights", "5.18 Droits d'accès") },
      { id: "6.3", label: text("6.3 Awareness", "6.3 Sensibilisation") },
      { id: "7.2", label: text("7.2 Physical entry", "7.2 Entrée physique") },
    ],
    correctOptionId: "5.18",
  },
  {
    id: "practice-6",
    type: "glossary-recall",
    topic: "glossary",
    prompt: text("Choose the best explanation for this term.", "Choisissez la meilleure explication pour ce terme."),
    explanation: text("The SoA is the artifact that maps applicability decisions to Annex A controls.", "La SoA est l'artefact qui relie les décisions d'applicabilité aux mesures de l'Annexe A."),
    term: text("Statement of Applicability", "Déclaration d’applicabilité"),
    options: [
      { id: "soa", label: text("The artifact mapping treatment decisions to Annex A control applicability", "L'artefact qui relie les décisions de traitement à l'applicabilité des mesures de l'Annexe A") },
      { id: "scope", label: text("The boundary of the ISMS", "La frontière du SMSI") },
      { id: "audit", label: text("The report issued after an external audit", "Le rapport émis après un audit externe") },
    ],
    correctOptionId: "soa",
  },
  {
    id: "practice-7",
    type: "multiple-choice",
    topic: "risk",
    prompt: text("Which treatment option means the organization knowingly keeps the residual risk?", "Quelle option de traitement signifie que l’organisation conserve sciemment le risque résiduel ?"),
    explanation: text("Acceptance means the business knowingly keeps the remaining risk after evaluation.", "L'acceptation signifie que l'entreprise conserve sciemment le risque restant après évaluation."),
    correctOptionId: "accept",
    options: [
      { id: "avoid", label: text("Avoid", "Éviter") },
      { id: "accept", label: text("Accept", "Accepter") },
      { id: "transfer", label: text("Transfer", "Transférer") },
    ],
  },
  {
    id: "practice-8",
    type: "true-false",
    topic: "audit",
    prompt: text("True or false: Internal audit exists only to create paperwork before an external audit.", "Vrai ou faux : l’audit interne existe seulement pour créer du papier avant un audit externe."),
    explanation: text("False. Internal audit should challenge the system and support improvement.", "Faux. L'audit interne doit challenger le système et soutenir l'amélioration."),
    correctValue: false,
  },
  {
    id: "practice-9",
    type: "scenario-classification",
    topic: "audit",
    prompt: text("Classify the finding.", "Qualifiez le constat."),
    explanation: text("The process exists, but sampled evidence is incomplete for one team, which points to a minor nonconformity.", "Le processus existe, mais la preuve échantillonnée est incomplète pour une équipe, ce qui renvoie à une non-conformité mineure."),
    caseContext: text("Access review is documented and used, but one business unit has no evidence for the latest quarterly review.", "La revue des accès est documentée et utilisée, mais une unité métier n'a aucune preuve pour la dernière revue trimestrielle."),
    options: [
      { id: "major", label: text("Major nonconformity", "Non-conformité majeure") },
      { id: "minor", label: text("Minor nonconformity", "Non-conformité mineure") },
      { id: "observation", label: text("Observation", "Observation") },
    ],
    correctOptionId: "minor",
    relatedClause: "8",
    relatedControls: ["5.18", "8.15"],
  },
  {
    id: "practice-10",
    type: "clause-control-link",
    topic: "clauses",
    prompt: text("Which clause is most directly linked to internal audit and management review?", "Quelle clause est la plus directement liée à l’audit interne et à la revue de direction ?"),
    explanation: text("Clause 9 covers performance evaluation, which includes internal audit and management review.", "La clause 9 couvre l'évaluation de la performance, qui comprend l'audit interne et la revue de direction."),
    leftLabel: text("Internal audit and management review", "Audit interne et revue de direction"),
    options: [
      { id: "7", label: text("Clause 7 Support", "Clause 7 Support") },
      { id: "9", label: text("Clause 9 Performance evaluation", "Clause 9 Évaluation de la performance") },
      { id: "10", label: text("Clause 10 Improvement", "Clause 10 Amélioration") },
    ],
    correctOptionId: "9",
  },
];

export const practiceTopicLabels: Record<PracticeTopic, LocalizedText> = {
  clauses: text("Clauses", "Clauses"),
  controls: text("Controls", "Mesures"),
  audit: text("Audit", "Audit"),
  risk: text("Risk", "Risque"),
  glossary: text("Glossary", "Glossaire"),
};
