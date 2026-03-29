-- ISO 27001 Lab ships the full 93-control Annex A catalog in typed application seed data
-- under src/lib/course-data.ts and src/lib/platform-data.ts.
-- This SQL file mirrors the product's main relational entities with a practical starter set
-- for Supabase demos and future content migration work.

insert into public.lesson_modules (
  slug,
  title_en,
  title_fr,
  summary_en,
  summary_fr,
  level,
  duration_minutes,
  module_order,
  content
)
values
  (
    'what-is-iso-27001',
    'What is ISO 27001?',
    'Qu''est-ce que l''ISO 27001 ?',
    'Understand ISO/IEC 27001 as a certifiable ISMS standard rather than a checklist of disconnected controls.',
    'Comprendre l''ISO/IEC 27001 comme une norme de SMSI certifiable plutôt qu''une checklist de mesures déconnectées.',
    'Beginner',
    16,
    1,
    jsonb_build_object(
      'overview_en', 'ISO 27001 teaches how an organization governs information security in context.',
      'overview_fr', 'L''ISO 27001 montre comment une organisation gouverne la sécurité de l''information dans son contexte.',
      'objectives_en', jsonb_build_array('Define ISO 27001 in plain language', 'Explain what certification covers'),
      'objectives_fr', jsonb_build_array('Définir l''ISO 27001 en langage simple', 'Expliquer ce que couvre la certification')
    )
  ),
  (
    'why-businesses-pursue-iso-27001',
    'Why businesses pursue ISO 27001',
    'Pourquoi les entreprises poursuivent l''ISO 27001',
    'Learn how trust, governance, risk visibility, and sales enablement drive ISO 27001 programmes.',
    'Comprendre comment la confiance, la gouvernance, la visibilité du risque et le soutien commercial motivent les programmes ISO 27001.',
    'Beginner',
    18,
    2,
    jsonb_build_object(
      'overview_en', 'Most companies pursue ISO 27001 for business credibility, not symbolism.',
      'overview_fr', 'La plupart des entreprises poursuivent l''ISO 27001 pour leur crédibilité métier, pas pour le symbole.',
      'objectives_en', jsonb_build_array('Connect certification to business outcomes', 'Explain buyer and leadership expectations'),
      'objectives_fr', jsonb_build_array('Relier la certification aux résultats métier', 'Expliquer les attentes des acheteurs et de la direction')
    )
  ),
  (
    'isms-and-cia-triad',
    'ISMS and the CIA triad',
    'SMSI et triade CIA',
    'Connect confidentiality, integrity, and availability to business processes and management-system thinking.',
    'Relier confidentialité, intégrité et disponibilité aux processus métier et à la logique de système de management.',
    'Beginner',
    20,
    3,
    jsonb_build_object(
      'overview_en', 'The ISMS turns security principles into governed decisions, ownership, and evidence.',
      'overview_fr', 'Le SMSI transforme les principes de sécurité en décisions pilotées, responsabilités et preuves.',
      'objectives_en', jsonb_build_array('Explain the CIA triad in business language', 'Describe the purpose of an ISMS'),
      'objectives_fr', jsonb_build_array('Expliquer la triade CIA en langage métier', 'Décrire le rôle d''un SMSI')
    )
  ),
  (
    'clauses-4-to-10',
    'Clauses 4 to 10',
    'Articles 4 à 10',
    'Understand the core certifiable requirements from organizational context through continual improvement.',
    'Comprendre les exigences certifiables centrales, du contexte de l''organisation à l''amélioration continue.',
    'Intermediate',
    28,
    4,
    jsonb_build_object(
      'overview_en', 'Clauses 4 to 10 define how the ISMS is designed, run, checked, and improved.',
      'overview_fr', 'Les articles 4 à 10 définissent comment le SMSI est conçu, piloté, vérifié et amélioré.',
      'objectives_en', jsonb_build_array('Recognize each clause''s purpose', 'Link evidence to specific requirements'),
      'objectives_fr', jsonb_build_array('Reconnaître le rôle de chaque article', 'Relier les preuves aux exigences concernées')
    )
  ),
  (
    'annex-a-and-93-controls',
    'Annex A and the 93 controls',
    'Annexe A et les 93 mesures',
    'See how the 2022 controls are grouped and why control selection must stay risk-based.',
    'Voir comment les mesures 2022 sont regroupées et pourquoi leur sélection doit rester fondée sur le risque.',
    'Intermediate',
    30,
    5,
    jsonb_build_object(
      'overview_en', 'Annex A is a control library, not the whole standard.',
      'overview_fr', 'L''Annexe A est une bibliothèque de mesures, pas la totalité de la norme.',
      'objectives_en', jsonb_build_array('Name the four control categories', 'Avoid blind checklist implementation'),
      'objectives_fr', jsonb_build_array('Nommer les quatre familles de mesures', 'Éviter une mise en oeuvre en simple checklist')
    )
  ),
  (
    'risk-assessment-and-treatment',
    'Risk assessment and risk treatment',
    'Analyse et traitement des risques',
    'Practice identifying assets, threats, vulnerabilities, impact, likelihood, and treatment choices.',
    'Pratiquer l''identification des actifs, menaces, vulnérabilités, impacts, probabilités et choix de traitement.',
    'Intermediate',
    26,
    6,
    jsonb_build_object(
      'overview_en', 'Risk assessment decides what matters; treatment decides what the business will do about it.',
      'overview_fr', 'L''analyse du risque décide de ce qui compte ; le traitement décide de ce que l''entreprise va en faire.',
      'objectives_en', jsonb_build_array('Score risk consistently', 'Choose and justify treatment options'),
      'objectives_fr', jsonb_build_array('Noter le risque de manière cohérente', 'Choisir et justifier les options de traitement')
    )
  ),
  (
    'statement-of-applicability',
    'Statement of Applicability',
    'Déclaration d''applicabilité',
    'Learn why the SoA matters to auditors and how it links risk treatment to Annex A controls.',
    'Comprendre pourquoi la déclaration d''applicabilité compte pour les auditeurs et comment elle relie le traitement du risque aux mesures de l''Annexe A.',
    'Intermediate',
    20,
    7,
    jsonb_build_object(
      'overview_en', 'The SoA records which controls apply, which do not, and why.',
      'overview_fr', 'La déclaration d''applicabilité consigne quelles mesures s''appliquent, lesquelles ne s''appliquent pas et pourquoi.',
      'objectives_en', jsonb_build_array('Explain the SoA to a stakeholder', 'Spot common SoA mistakes'),
      'objectives_fr', jsonb_build_array('Expliquer la déclaration d''applicabilité à un interlocuteur', 'Repérer les erreurs fréquentes de SoA')
    )
  ),
  (
    'iso-27002-vs-iso-27001',
    'ISO 27002 and how it differs from ISO 27001',
    'ISO 27002 et sa différence avec l''ISO 27001',
    'Differentiate certifiable requirements from implementation guidance.',
    'Distinguer les exigences certifiables des guides de mise en oeuvre.',
    'Intermediate',
    18,
    8,
    jsonb_build_object(
      'overview_en', 'ISO 27001 tells you what must exist; ISO 27002 helps you interpret and implement controls.',
      'overview_fr', 'L''ISO 27001 indique ce qui doit exister ; l''ISO 27002 aide à interpréter et mettre en oeuvre les mesures.',
      'objectives_en', jsonb_build_array('Explain ISO 27001 vs ISO 27002 clearly', 'Avoid confusing requirements with guidance'),
      'objectives_fr', jsonb_build_array('Expliquer clairement ISO 27001 vs ISO 27002', 'Éviter de confondre exigences et guidance')
    )
  ),
  (
    'audit-basics-and-iso-19011',
    'Internal audit, external audit, and ISO 19011 basics',
    'Audit interne, audit externe et bases de l''ISO 19011',
    'Understand audit planning, sampling, evidence, interview technique, and certification-stage expectations.',
    'Comprendre la planification d''audit, l''échantillonnage, la preuve, la conduite d''entretien et les attentes des étapes de certification.',
    'Intermediate',
    24,
    9,
    jsonb_build_object(
      'overview_en', 'ISO 19011 guides audit practice while ISO 27001 defines the requirement set being tested.',
      'overview_fr', 'L''ISO 19011 guide la pratique d''audit tandis que l''ISO 27001 définit les exigences évaluées.',
      'objectives_en', jsonb_build_array('Differentiate internal and external audit', 'Identify credible audit evidence'),
      'objectives_fr', jsonb_build_array('Différencier audit interne et audit externe', 'Identifier une preuve d''audit crédible')
    )
  ),
  (
    'nonconformities-and-corrective-actions',
    'Nonconformities, observations, and corrective actions',
    'Non-conformités, observations et actions correctives',
    'Classify findings and connect them to root cause, correction, and corrective action.',
    'Classifier les constats et les relier à la cause racine, à la correction et à l''action corrective.',
    'Intermediate',
    18,
    10,
    jsonb_build_object(
      'overview_en', 'A major finding signals systemic breakdown; a minor finding signals partial failure; an observation highlights improvement.',
      'overview_fr', 'Une non-conformité majeure signale une rupture systémique ; une mineure indique une défaillance partielle ; une observation souligne une amélioration possible.',
      'objectives_en', jsonb_build_array('Classify findings accurately', 'Recommend proportionate corrective action'),
      'objectives_fr', jsonb_build_array('Classifier les constats correctement', 'Proposer une action corrective proportionnée')
    )
  ),
  (
    'implementation-flow',
    'Real-world implementation flow',
    'Flux réel de mise en oeuvre',
    'Follow a practical implementation sequence from scoping to audit readiness.',
    'Suivre une séquence réaliste de mise en oeuvre, du périmètre à la préparation d''audit.',
    'Intermediate',
    22,
    11,
    jsonb_build_object(
      'overview_en', 'Successful implementations move from scope and governance into risks, controls, evidence, and review cadence.',
      'overview_fr', 'Les mises en oeuvre réussies passent du périmètre et de la gouvernance vers les risques, mesures, preuves et rythmes de revue.',
      'objectives_en', jsonb_build_array('Describe a realistic implementation sequence', 'Connect artefacts to operating routines'),
      'objectives_fr', jsonb_build_array('Décrire une séquence réaliste de mise en oeuvre', 'Relier les artefacts aux routines d''exploitation')
    )
  ),
  (
    'final-capstone-simulation',
    'Final capstone simulation',
    'Simulation finale de synthèse',
    'Apply the full learning path across risk, SoA, evidence, and audit judgement.',
    'Appliquer l''ensemble du parcours sur le risque, la SoA, la preuve et le jugement d''audit.',
    'Advanced',
    35,
    12,
    jsonb_build_object(
      'overview_en', 'The capstone asks the learner to think like an implementer and an auditor.',
      'overview_fr', 'La simulation finale demande à l''apprenant de raisonner comme un responsable de mise en oeuvre et comme un auditeur.',
      'objectives_en', jsonb_build_array('Synthesize clauses, controls, and evidence', 'Explain decisions bilingually'),
      'objectives_fr', jsonb_build_array('Synthétiser articles, mesures et preuves', 'Expliquer les décisions de façon bilingue')
    )
  )
on conflict (slug) do update set
  title_en = excluded.title_en,
  title_fr = excluded.title_fr,
  summary_en = excluded.summary_en,
  summary_fr = excluded.summary_fr,
  level = excluded.level,
  duration_minutes = excluded.duration_minutes,
  module_order = excluded.module_order,
  content = excluded.content;

insert into public.clause_summaries (clause, title_en, title_fr, payload)
values
  (
    '4',
    'Context of the organization',
    'Contexte de l''organisation',
    jsonb_build_object(
      'simple_en', 'Clause 4 asks the organization to define its environment, stakeholders, scope, and ISMS boundaries.',
      'simple_fr', 'L''article 4 demande de définir l''environnement, les parties intéressées, le périmètre et les frontières du SMSI.',
      'business_meaning_en', 'Without a credible scope, every later decision becomes vague or inconsistent.',
      'business_meaning_fr', 'Sans périmètre crédible, toutes les décisions suivantes deviennent vagues ou incohérentes.',
      'auditor_evidence_en', jsonb_build_array('Documented scope statement', 'Interested-party analysis', 'Boundary decisions'),
      'auditor_evidence_fr', jsonb_build_array('Déclaration de périmètre documentée', 'Analyse des parties intéressées', 'Décisions sur les frontières du périmètre')
    )
  ),
  (
    '5',
    'Leadership',
    'Leadership',
    jsonb_build_object(
      'simple_en', 'Clause 5 covers commitment, policy, and role ownership.',
      'simple_fr', 'L''article 5 couvre l''engagement, la politique et la responsabilité des rôles.',
      'business_meaning_en', 'Security only becomes durable when leadership owns priorities and accountability.',
      'business_meaning_fr', 'La sécurité devient durable lorsque la direction assume les priorités et la responsabilité.',
      'auditor_evidence_en', jsonb_build_array('Signed policy', 'Role assignments', 'Leadership review records'),
      'auditor_evidence_fr', jsonb_build_array('Politique signée', 'Attributions de rôles', 'Preuves de revue par la direction')
    )
  ),
  (
    '6',
    'Planning',
    'Planification',
    jsonb_build_object(
      'simple_en', 'Clause 6 is where risk, objectives, and planned changes become actionable.',
      'simple_fr', 'L''article 6 est l''endroit où le risque, les objectifs et les changements planifiés deviennent actionnables.',
      'business_meaning_en', 'Planning connects what the business fears to what the ISMS will actually do.',
      'business_meaning_fr', 'La planification relie ce que l''entreprise craint à ce que le SMSI va réellement faire.',
      'auditor_evidence_en', jsonb_build_array('Risk methodology', 'Risk register', 'Objectives and plans'),
      'auditor_evidence_fr', jsonb_build_array('Méthodologie de risque', 'Registre des risques', 'Objectifs et plans')
    )
  ),
  (
    '7',
    'Support',
    'Support',
    jsonb_build_object(
      'simple_en', 'Clause 7 ensures the ISMS has resources, competence, awareness, communication, and documentation.',
      'simple_fr', 'L''article 7 garantit que le SMSI dispose de ressources, compétences, sensibilisation, communication et documentation.',
      'business_meaning_en', 'A weak support system creates audit gaps even when intent is good.',
      'business_meaning_fr', 'Un système de support faible crée des écarts d''audit même si l''intention est bonne.',
      'auditor_evidence_en', jsonb_build_array('Training records', 'Document control', 'Awareness evidence'),
      'auditor_evidence_fr', jsonb_build_array('Preuves de formation', 'Maîtrise documentaire', 'Preuves de sensibilisation')
    )
  ),
  (
    '8',
    'Operation',
    'Fonctionnement',
    jsonb_build_object(
      'simple_en', 'Clause 8 is about running risk treatments and planned controls in daily operations.',
      'simple_fr', 'L''article 8 porte sur l''exécution quotidienne des traitements de risques et des mesures planifiées.',
      'business_meaning_en', 'Operation tests whether the ISMS works outside slide decks and policies.',
      'business_meaning_fr', 'Le fonctionnement vérifie si le SMSI marche au-delà des présentations et des politiques.',
      'auditor_evidence_en', jsonb_build_array('Operational records', 'Completed control activities', 'Incident handling traces'),
      'auditor_evidence_fr', jsonb_build_array('Traces opérationnelles', 'Activités de contrôle réalisées', 'Traces de gestion d''incident')
    )
  ),
  (
    '9',
    'Performance evaluation',
    'Évaluation de la performance',
    jsonb_build_object(
      'simple_en', 'Clause 9 checks whether the ISMS is measured, audited, and reviewed by management.',
      'simple_fr', 'L''article 9 vérifie que le SMSI est mesuré, audité et revu par la direction.',
      'business_meaning_en', 'If you cannot evaluate the ISMS, you cannot credibly improve it.',
      'business_meaning_fr', 'Si vous ne pouvez pas évaluer le SMSI, vous ne pouvez pas l''améliorer de façon crédible.',
      'auditor_evidence_en', jsonb_build_array('Internal audit programme', 'Metrics and trends', 'Management review minutes'),
      'auditor_evidence_fr', jsonb_build_array('Programme d''audit interne', 'Indicateurs et tendances', 'Comptes rendus de revue de direction')
    )
  ),
  (
    '10',
    'Improvement',
    'Amélioration',
    jsonb_build_object(
      'simple_en', 'Clause 10 addresses nonconformities, corrective action, and continual improvement.',
      'simple_fr', 'L''article 10 traite les non-conformités, l''action corrective et l''amélioration continue.',
      'business_meaning_en', 'Improvement shows whether the ISMS learns from failure instead of repeating it.',
      'business_meaning_fr', 'L''amélioration montre si le SMSI apprend de ses échecs au lieu de les répéter.',
      'auditor_evidence_en', jsonb_build_array('Corrective action records', 'Root cause analysis', 'Follow-up verification'),
      'auditor_evidence_fr', jsonb_build_array('Enregistrements d''actions correctives', 'Analyse de cause racine', 'Vérification de suivi')
    )
  )
on conflict (clause) do update set
  title_en = excluded.title_en,
  title_fr = excluded.title_fr,
  payload = excluded.payload;

insert into public.annex_controls (
  code,
  category,
  title_en,
  title_fr,
  focus_en,
  focus_fr,
  payload
)
values
  (
    '5.1',
    'Organizational',
    'Policies for information security',
    'Politiques de sécurité de l''information',
    'Set the direction and rules for information security.',
    'Définir l''orientation et les règles de la sécurité de l''information.',
    jsonb_build_object(
      'business_meaning_en', 'This is the tone-setting control for the operating model.',
      'business_meaning_fr', 'Cette mesure donne le ton du modèle de fonctionnement.',
      'example_implementation_en', 'Publish a bilingual information security policy approved by leadership and reviewed annually.',
      'example_implementation_fr', 'Publier une politique de sécurité bilingue approuvée par la direction et revue annuellement.',
      'related_evidence_en', jsonb_build_array('Approved policy', 'Version history', 'Communication proof'),
      'related_evidence_fr', jsonb_build_array('Politique approuvée', 'Historique des versions', 'Preuve de communication')
    )
  ),
  (
    '5.7',
    'Organizational',
    'Threat intelligence',
    'Renseignement sur les menaces',
    'Track relevant threats so decisions reflect the real threat landscape.',
    'Suivre les menaces pertinentes pour aligner les décisions sur la réalité des attaques.',
    jsonb_build_object(
      'business_meaning_en', 'Threat monitoring prevents stale security decisions.',
      'business_meaning_fr', 'Le suivi des menaces évite les décisions de sécurité obsolètes.',
      'example_implementation_en', 'Review monthly threat briefings and map relevant themes into the risk register.',
      'example_implementation_fr', 'Revoir des briefings mensuels sur les menaces et intégrer les thèmes pertinents dans le registre des risques.',
      'related_evidence_en', jsonb_build_array('Threat briefings', 'Risk updates', 'Decision logs'),
      'related_evidence_fr', jsonb_build_array('Briefings de menace', 'Mises à jour des risques', 'Journaux de décision')
    )
  ),
  (
    '5.9',
    'Organizational',
    'Inventory of information and other associated assets',
    'Inventaire des informations et autres actifs associés',
    'Know what assets exist, who owns them, and why they matter.',
    'Savoir quels actifs existent, qui en est responsable et pourquoi ils comptent.',
    jsonb_build_object(
      'business_meaning_en', 'Asset visibility is a prerequisite for meaningful risk treatment.',
      'business_meaning_fr', 'La visibilité des actifs est un prérequis au traitement pertinent du risque.',
      'example_implementation_en', 'Maintain an owner-based asset register for data stores, systems, suppliers, and endpoints.',
      'example_implementation_fr', 'Maintenir un registre d''actifs avec responsables pour les données, systèmes, fournisseurs et terminaux.',
      'related_evidence_en', jsonb_build_array('Asset register', 'Ownership field', 'Review cadence'),
      'related_evidence_fr', jsonb_build_array('Registre d''actifs', 'Champ propriétaire', 'Cadence de revue')
    )
  ),
  (
    '5.15',
    'Organizational',
    'Access control',
    'Contrôle d''accès',
    'Define the business rules that govern who gets access to what.',
    'Définir les règles métier qui gouvernent les accès.',
    jsonb_build_object(
      'business_meaning_en', 'Access rules turn role design into enforceable decisions.',
      'business_meaning_fr', 'Les règles d''accès transforment la conception des rôles en décisions applicables.',
      'example_implementation_en', 'Document access roles, approval flow, review cadence, and offboarding removal expectations.',
      'example_implementation_fr', 'Documenter les rôles d''accès, le circuit d''approbation, la cadence de revue et les attentes de retrait en offboarding.',
      'related_evidence_en', jsonb_build_array('Access policy', 'Approval records', 'Access reviews'),
      'related_evidence_fr', jsonb_build_array('Politique d''accès', 'Preuves d''approbation', 'Revues d''accès')
    )
  ),
  (
    '5.19',
    'Organizational',
    'Information security in supplier relationships',
    'Sécurité de l''information dans les relations fournisseurs',
    'Treat supplier exposure as part of the security system, not as an afterthought.',
    'Traiter l''exposition fournisseur comme une partie du système de sécurité.',
    jsonb_build_object(
      'business_meaning_en', 'Supplier governance is part of the real operating perimeter.',
      'business_meaning_fr', 'La gouvernance fournisseur fait partie du périmètre d''exploitation réel.',
      'example_implementation_en', 'Map critical vendors to risks, obligations, contract clauses, and review owners.',
      'example_implementation_fr', 'Relier les fournisseurs critiques aux risques, obligations, clauses contractuelles et responsables de revue.',
      'related_evidence_en', jsonb_build_array('Supplier inventory', 'Security clauses', 'Vendor review notes'),
      'related_evidence_fr', jsonb_build_array('Inventaire fournisseurs', 'Clauses de sécurité', 'Notes de revue fournisseur')
    )
  ),
  (
    '5.24',
    'Organizational',
    'Information security incident management planning and preparation',
    'Planification et préparation de la gestion des incidents de sécurité de l''information',
    'Prepare before incidents happen so response is not improvised.',
    'Se préparer avant les incidents pour éviter l''improvisation.',
    jsonb_build_object(
      'business_meaning_en', 'Preparedness reduces chaos and inconsistent response quality.',
      'business_meaning_fr', 'La préparation réduit le chaos et l''incohérence de la réponse.',
      'example_implementation_en', 'Define incident severity, escalation paths, communications, and evidence handling before a crisis.',
      'example_implementation_fr', 'Définir la gravité des incidents, les circuits d''escalade, la communication et la gestion des preuves avant la crise.',
      'related_evidence_en', jsonb_build_array('Incident plan', 'Escalation matrix', 'Tabletop exercise notes'),
      'related_evidence_fr', jsonb_build_array('Plan incident', 'Matrice d''escalade', 'Notes d''exercice de crise')
    )
  ),
  (
    '6.3',
    'People',
    'Information security awareness, education and training',
    'Sensibilisation, éducation et formation à la sécurité de l''information',
    'Ensure people understand what secure behavior looks like.',
    'Faire en sorte que chacun comprenne à quoi ressemble un comportement sûr.',
    jsonb_build_object(
      'business_meaning_en', 'A policy no one understands does not operate as a control.',
      'business_meaning_fr', 'Une politique que personne ne comprend ne fonctionne pas comme une mesure.',
      'example_implementation_en', 'Run role-based training for engineering, support, HR, and leadership with tracked completion.',
      'example_implementation_fr', 'Mettre en place des formations par rôle pour l''ingénierie, le support, les RH et la direction avec suivi de complétion.',
      'related_evidence_en', jsonb_build_array('Training matrix', 'Attendance records', 'Awareness campaign logs'),
      'related_evidence_fr', jsonb_build_array('Matrice de formation', 'Preuves de présence', 'Journaux de sensibilisation')
    )
  ),
  (
    '6.7',
    'People',
    'Remote working',
    'Télétravail',
    'Control the risks introduced by home or remote work environments.',
    'Maîtriser les risques introduits par le télétravail.',
    jsonb_build_object(
      'business_meaning_en', 'Remote work expands the operating environment and must be governed deliberately.',
      'business_meaning_fr', 'Le télétravail élargit l''environnement d''exploitation et doit être piloté volontairement.',
      'example_implementation_en', 'Set secure remote access, device expectations, workspace behavior, and support escalation paths.',
      'example_implementation_fr', 'Définir l''accès distant sécurisé, les attentes sur les terminaux, les comportements attendus et les circuits de support.',
      'related_evidence_en', jsonb_build_array('Remote work standard', 'VPN or SSO controls', 'Acknowledgement records'),
      'related_evidence_fr', jsonb_build_array('Standard de télétravail', 'Contrôles VPN ou SSO', 'Preuves d''accusé de réception')
    )
  ),
  (
    '7.2',
    'Physical',
    'Physical entry',
    'Entrée physique',
    'Control and record entry into secured locations.',
    'Contrôler et tracer l''entrée dans les lieux sécurisés.',
    jsonb_build_object(
      'business_meaning_en', 'Physical access can undermine digital controls if it is weak.',
      'business_meaning_fr', 'Un accès physique faible peut neutraliser les contrôles numériques.',
      'example_implementation_en', 'Use badging, visitor logs, escort rules, and periodic access review for secure areas.',
      'example_implementation_fr', 'Utiliser badges, registres visiteurs, règles d''escorte et revues périodiques d''accès pour les zones sécurisées.',
      'related_evidence_en', jsonb_build_array('Badge report', 'Visitor log', 'Access review evidence'),
      'related_evidence_fr', jsonb_build_array('Rapport de badges', 'Registre visiteurs', 'Preuves de revue d''accès')
    )
  ),
  (
    '7.14',
    'Physical',
    'Secure disposal or re-use of equipment',
    'Élimination sécurisée ou réutilisation des équipements',
    'Erase or destroy information before equipment is reused or disposed of.',
    'Effacer ou détruire l''information avant réutilisation ou destruction des équipements.',
    jsonb_build_object(
      'business_meaning_en', 'Retired hardware remains a data risk until sanitised.',
      'business_meaning_fr', 'Le matériel retiré reste un risque de données jusqu''à sa purge.',
      'example_implementation_en', 'Require wipe certificates or destruction proofs before laptops and disks leave custody.',
      'example_implementation_fr', 'Exiger des certificats d''effacement ou de destruction avant la sortie des laptops et disques du périmètre.',
      'related_evidence_en', jsonb_build_array('Disposal log', 'Certificate of destruction', 'Asset status update'),
      'related_evidence_fr', jsonb_build_array('Journal de destruction', 'Certificat de destruction', 'Mise à jour du statut d''actif')
    )
  ),
  (
    '8.5',
    'Technological',
    'Secure authentication',
    'Authentification sécurisée',
    'Use authentication mechanisms appropriate to risk.',
    'Utiliser des mécanismes d''authentification adaptés au risque.',
    jsonb_build_object(
      'business_meaning_en', 'Authentication is one of the clearest control choices tied to business risk.',
      'business_meaning_fr', 'L''authentification est l''un des choix de contrôle les plus directement liés au risque métier.',
      'example_implementation_en', 'Enforce MFA for privileged accounts and external-facing systems with central identity governance.',
      'example_implementation_fr', 'Imposer le MFA pour les comptes privilégiés et systèmes exposés avec une gouvernance d''identité centralisée.',
      'related_evidence_en', jsonb_build_array('Identity provider settings', 'MFA rollout records', 'Admin account review'),
      'related_evidence_fr', jsonb_build_array('Paramétrage IAM/IdP', 'Traces de déploiement MFA', 'Revue des comptes administrateurs')
    )
  ),
  (
    '8.8',
    'Technological',
    'Management of technical vulnerabilities',
    'Gestion des vulnérabilités techniques',
    'Identify, assess, and remediate technical weaknesses promptly.',
    'Identifier, évaluer et corriger rapidement les faiblesses techniques.',
    jsonb_build_object(
      'business_meaning_en', 'A vulnerability process links external threats to practical remediation discipline.',
      'business_meaning_fr', 'Le processus de vulnérabilité relie les menaces externes à une discipline de remédiation concrète.',
      'example_implementation_en', 'Track vulnerability intake, severity thresholds, ownership, and remediation SLAs.',
      'example_implementation_fr', 'Suivre l''entrée des vulnérabilités, les seuils de gravité, les responsables et les SLA de remédiation.',
      'related_evidence_en', jsonb_build_array('Scanner results', 'Remediation tickets', 'Exception approvals'),
      'related_evidence_fr', jsonb_build_array('Résultats de scan', 'Tickets de correction', 'Approbations d''exception')
    )
  ),
  (
    '8.13',
    'Technological',
    'Information backup',
    'Sauvegarde de l''information',
    'Back up important information and verify recoverability.',
    'Sauvegarder l''information importante et vérifier la restaurabilité.',
    jsonb_build_object(
      'business_meaning_en', 'Backups matter only if restoration works inside the recovery objective.',
      'business_meaning_fr', 'Les sauvegardes n''ont de valeur que si la restauration fonctionne dans l''objectif de reprise.',
      'example_implementation_en', 'Schedule backups, monitor failures, and test restoration for scoped critical systems.',
      'example_implementation_fr', 'Planifier les sauvegardes, suivre les échecs et tester la restauration des systèmes critiques du périmètre.',
      'related_evidence_en', jsonb_build_array('Backup reports', 'Restore test results', 'Retention settings'),
      'related_evidence_fr', jsonb_build_array('Rapports de sauvegarde', 'Résultats de test de restauration', 'Paramètres de rétention')
    )
  ),
  (
    '8.15',
    'Technological',
    'Logging',
    'Journalisation',
    'Record relevant events to support detection, investigation, and accountability.',
    'Enregistrer les événements pertinents pour soutenir détection, investigation et traçabilité.',
    jsonb_build_object(
      'business_meaning_en', 'Logging supports both operations and auditability.',
      'business_meaning_fr', 'La journalisation soutient à la fois l''exploitation et l''auditabilité.',
      'example_implementation_en', 'Capture admin actions, authentication failures, security alerts, and incident timelines in retained logs.',
      'example_implementation_fr', 'Capturer les actions d''administration, les échecs d''authentification, les alertes de sécurité et les chronologies d''incident dans des journaux conservés.',
      'related_evidence_en', jsonb_build_array('SIEM or log platform screenshots', 'Retention policy', 'Sample investigation trail'),
      'related_evidence_fr', jsonb_build_array('Captures SIEM ou plateforme de logs', 'Politique de rétention', 'Exemple de piste d''investigation')
    )
  ),
  (
    '8.25',
    'Technological',
    'Secure development life cycle',
    'Cycle de vie de développement sécurisé',
    'Integrate security throughout planning, coding, testing, and release.',
    'Intégrer la sécurité tout au long de la planification, du code, des tests et des releases.',
    jsonb_build_object(
      'business_meaning_en', 'This turns software delivery into a governed security activity rather than a post-release cleanup.',
      'business_meaning_fr', 'Cette mesure transforme la livraison logicielle en activité de sécurité pilotée plutôt qu''en nettoyage après mise en production.',
      'example_implementation_en', 'Define security requirements, code review expectations, security testing gates, and release approvals.',
      'example_implementation_fr', 'Définir les exigences de sécurité, les attentes de revue de code, les gates de tests de sécurité et les approbations de release.',
      'related_evidence_en', jsonb_build_array('SDLC standard', 'Pull request templates', 'Security test outputs'),
      'related_evidence_fr', jsonb_build_array('Standard SDLC', 'Templates de pull request', 'Résultats de tests de sécurité')
    )
  )
on conflict (code) do update set
  category = excluded.category,
  title_en = excluded.title_en,
  title_fr = excluded.title_fr,
  focus_en = excluded.focus_en,
  focus_fr = excluded.focus_fr,
  payload = excluded.payload;

insert into public.glossary_terms (
  slug,
  term_en,
  term_fr,
  definition_en,
  definition_fr,
  payload
)
values
  (
    'isms',
    'Information Security Management System',
    'Système de management de la sécurité de l''information',
    'The management system used to govern information security.',
    'Le système de management utilisé pour piloter la sécurité de l''information.',
    jsonb_build_object(
      'professional_en', 'An ISMS is the combination of policies, objectives, governance, processes, and evidence used to manage information security.',
      'professional_fr', 'Un SMSI est la combinaison de politiques, objectifs, gouvernance, processus et preuves utilisée pour piloter la sécurité de l''information.',
      'example_en', 'The ISMS defines who owns risk decisions and how improvement is tracked.',
      'example_fr', 'Le SMSI définit qui détient les décisions de risque et comment l''amélioration est suivie.',
      'audio_status', 'placeholder'
    )
  ),
  (
    'risk-assessment',
    'Risk assessment',
    'Analyse des risques',
    'The process of identifying and evaluating risk.',
    'Le processus d''identification et d''évaluation du risque.',
    jsonb_build_object(
      'professional_en', 'Risk assessment considers assets, threats, vulnerabilities, likelihood, and impact against defined criteria.',
      'professional_fr', 'L''analyse des risques considère actifs, menaces, vulnérabilités, probabilité et impact selon des critères définis.',
      'example_en', 'A SaaS team scores the risk of a compromised support account as high impact and medium likelihood.',
      'example_fr', 'Une équipe SaaS note le risque d''un compte support compromis à impact élevé et probabilité moyenne.',
      'audio_status', 'placeholder'
    )
  ),
  (
    'risk-treatment',
    'Risk treatment',
    'Traitement du risque',
    'The decision on what the organization will do about a risk.',
    'La décision sur ce que l''organisation fera face à un risque.',
    jsonb_build_object(
      'professional_en', 'Treatment options typically include mitigation, avoidance, transfer, or acceptance of residual exposure.',
      'professional_fr', 'Les options de traitement incluent généralement l''atténuation, l''évitement, le transfert ou l''acceptation de l''exposition résiduelle.',
      'example_en', 'The team mitigates credential theft risk by enforcing MFA and logging.',
      'example_fr', 'L''équipe atténue le risque de vol d''identifiants en imposant MFA et journalisation.',
      'audio_status', 'placeholder'
    )
  ),
  (
    'soa',
    'Statement of Applicability',
    'Déclaration d''applicabilité',
    'The document that records which Annex A controls apply and why.',
    'Le document qui consigne quelles mesures de l''Annexe A s''appliquent et pourquoi.',
    jsonb_build_object(
      'professional_en', 'The SoA maps risk treatment, legal obligations, and justified exclusions to Annex A applicability.',
      'professional_fr', 'La déclaration d''applicabilité relie traitement du risque, obligations légales et exclusions justifiées à l''applicabilité de l''Annexe A.',
      'example_en', 'A cloud-first SaaS justifies strong access, supplier, and logging controls as applicable.',
      'example_fr', 'Un SaaS cloud justifie l''applicabilité forte des mesures d''accès, fournisseurs et journalisation.',
      'audio_status', 'placeholder'
    )
  ),
  (
    'nonconformity',
    'Nonconformity',
    'Non-conformité',
    'A requirement is not fulfilled.',
    'Une exigence n''est pas respectée.',
    jsonb_build_object(
      'professional_en', 'A nonconformity is a failure to meet an ISO 27001 requirement or the organization''s own defined arrangements.',
      'professional_fr', 'Une non-conformité est une défaillance à satisfaire une exigence ISO 27001 ou les dispositions définies par l''organisation.',
      'example_en', 'The internal audit programme is required but no evidence exists for the current cycle.',
      'example_fr', 'Le programme d''audit interne est requis mais aucune preuve n''existe sur le cycle en cours.',
      'audio_status', 'placeholder'
    )
  ),
  (
    'audit-evidence',
    'Audit evidence',
    'Preuve d''audit',
    'Information used to verify whether a requirement is met.',
    'Information utilisée pour vérifier si une exigence est respectée.',
    jsonb_build_object(
      'professional_en', 'Evidence can include records, system settings, interviews, observation, and corroborated outputs.',
      'professional_fr', 'La preuve peut inclure enregistrements, paramétrages, entretiens, observation et sorties corroborées.',
      'example_en', 'A screenshot alone is weaker than a controlled record plus interview confirmation.',
      'example_fr', 'Une simple capture est moins forte qu''un enregistrement contrôlé confirmé en entretien.',
      'audio_status', 'placeholder'
    )
  ),
  (
    'control',
    'Control',
    'Mesure',
    'A means of modifying risk.',
    'Un moyen de modifier le risque.',
    jsonb_build_object(
      'professional_en', 'In ISO 27001, a control is a governance, people, physical, or technological measure used to address risk.',
      'professional_fr', 'En ISO 27001, une mesure est un dispositif organisationnel, humain, physique ou technologique utilisé pour traiter le risque.',
      'example_en', 'MFA is a technological control used to reduce account compromise risk.',
      'example_fr', 'Le MFA est une mesure technologique utilisée pour réduire le risque de compromission de compte.',
      'audio_status', 'placeholder'
    )
  ),
  (
    'scope',
    'Scope',
    'Périmètre',
    'The documented boundary of the ISMS.',
    'La frontière documentée du SMSI.',
    jsonb_build_object(
      'professional_en', 'Scope defines included activities, locations, teams, systems, and interfaces relevant to the ISMS.',
      'professional_fr', 'Le périmètre définit les activités, sites, équipes, systèmes et interfaces inclus dans le SMSI.',
      'example_en', 'A company may scope its SaaS platform, support, and cloud operations but exclude a legacy subsidiary.',
      'example_fr', 'Une entreprise peut inclure sa plateforme SaaS, le support et les opérations cloud mais exclure une filiale historique.',
      'audio_status', 'placeholder'
    )
  ),
  (
    'management-review',
    'Management review',
    'Revue de direction',
    'A formal review where leadership evaluates ISMS performance.',
    'Une revue formelle où la direction évalue la performance du SMSI.',
    jsonb_build_object(
      'professional_en', 'Management review is a periodic governance mechanism used to assess performance, risks, changes, and improvement actions.',
      'professional_fr', 'La revue de direction est un mécanisme périodique de gouvernance visant à évaluer performance, risques, changements et actions d''amélioration.',
      'example_en', 'Leadership reviews audit results, incidents, KPIs, and change context every quarter.',
      'example_fr', 'La direction examine résultats d''audit, incidents, KPI et contexte de changement chaque trimestre.',
      'audio_status', 'placeholder'
    )
  ),
  (
    'major-nonconformity',
    'Major nonconformity',
    'Non-conformité majeure',
    'A severe or systemic failure in the ISMS.',
    'Une défaillance grave ou systémique du SMSI.',
    jsonb_build_object(
      'professional_en', 'A major nonconformity indicates an absent, ineffective, or broadly broken requirement that threatens ISMS effectiveness.',
      'professional_fr', 'Une non-conformité majeure indique une exigence absente, inefficace ou largement défaillante qui menace l''efficacité du SMSI.',
      'example_en', 'No formal risk assessment exists anywhere in scope.',
      'example_fr', 'Aucune analyse de risque formelle n''existe dans le périmètre.',
      'audio_status', 'placeholder'
    )
  )
on conflict (slug) do update set
  term_en = excluded.term_en,
  term_fr = excluded.term_fr,
  definition_en = excluded.definition_en,
  definition_fr = excluded.definition_fr,
  payload = excluded.payload;

insert into public.scenario_templates (
  slug,
  title_en,
  title_fr,
  context_en,
  context_fr,
  payload
)
values
  (
    'paris-saas-startup',
    'SaaS startup in Paris handling customer data',
    'Startup SaaS à Paris traitant des données clients',
    'A growing B2B SaaS company wants enterprise credibility while its support and engineering teams access customer data in production.',
    'Une entreprise SaaS B2B en croissance vise la crédibilité grands comptes alors que ses équipes support et engineering accèdent à des données clients en production.',
    jsonb_build_object(
      'assets_en', jsonb_build_array('Customer database', 'Cloud infrastructure', 'Support admin accounts'),
      'assets_fr', jsonb_build_array('Base clients', 'Infrastructure cloud', 'Comptes administrateurs support'),
      'threats_en', jsonb_build_array('Credential theft', 'Cloud misconfiguration', 'Supplier outage'),
      'threats_fr', jsonb_build_array('Vol d''identifiants', 'Mauvaise configuration cloud', 'Panne fournisseur'),
      'vulnerabilities_en', jsonb_build_array('Weak access reviews', 'Shared admin practices', 'Incomplete logging'),
      'vulnerabilities_fr', jsonb_build_array('Revues d''accès faibles', 'Pratiques admin partagées', 'Journalisation incomplète')
    )
  ),
  (
    'health-docs-company',
    'Healthcare-adjacent company with sensitive documents',
    'Entreprise proche du secteur santé avec documents sensibles',
    'A document-heavy business handles health-related records and must manage confidentiality, retention, and supplier exposure.',
    'Une activité fortement documentaire traite des dossiers liés à la santé et doit gérer confidentialité, rétention et exposition fournisseurs.',
    jsonb_build_object(
      'assets_en', jsonb_build_array('Sensitive PDFs', 'Shared drives', 'Document workflow platform'),
      'assets_fr', jsonb_build_array('PDF sensibles', 'Lecteurs partagés', 'Plateforme de workflow documentaire'),
      'threats_en', jsonb_build_array('Mis-sent documents', 'Excessive access', 'Poor disposal'),
      'threats_fr', jsonb_build_array('Documents envoyés au mauvais destinataire', 'Accès excessifs', 'Destruction insuffisante'),
      'vulnerabilities_en', jsonb_build_array('Weak classification', 'No disposal evidence', 'Manual access grants'),
      'vulnerabilities_fr', jsonb_build_array('Classification faible', 'Aucune preuve de destruction', 'Attributions d''accès manuelles')
    )
  ),
  (
    'manufacturing-office-site',
    'Manufacturing company with office and physical site',
    'Entreprise industrielle avec bureaux et site physique',
    'The company must balance office systems, production-adjacent areas, visitors, contractors, and physical access.',
    'L''entreprise doit équilibrer systèmes bureautiques, zones proches de la production, visiteurs, sous-traitants et accès physiques.',
    jsonb_build_object(
      'assets_en', jsonb_build_array('Production planning system', 'Badge system', 'Warehouse devices'),
      'assets_fr', jsonb_build_array('Système de planification', 'Système de badges', 'Terminaux d''entrepôt'),
      'threats_en', jsonb_build_array('Unauthorized site access', 'Device loss', 'Operational disruption'),
      'threats_fr', jsonb_build_array('Accès site non autorisé', 'Perte de terminal', 'Perturbation opérationnelle'),
      'vulnerabilities_en', jsonb_build_array('Shared badges', 'Untracked handheld devices', 'Weak contractor controls'),
      'vulnerabilities_fr', jsonb_build_array('Badges partagés', 'Terminaux mobiles non tracés', 'Contrôles prestataires faibles')
    )
  )
on conflict (slug) do update set
  title_en = excluded.title_en,
  title_fr = excluded.title_fr,
  context_en = excluded.context_en,
  context_fr = excluded.context_fr,
  payload = excluded.payload;

insert into public.quiz_sets (slug, title_en, title_fr, payload)
values
  (
    'foundations-checkpoint',
    'Foundations checkpoint',
    'Checkpoint fondamentaux',
    jsonb_build_object(
      'topic', 'foundations',
      'questions',
      jsonb_build_array(
        jsonb_build_object(
          'type', 'multiple-choice',
          'prompt_en', 'What does ISO 27001 certify?',
          'prompt_fr', 'Que certifie l''ISO 27001 ?',
          'answer_en', 'The effectiveness of the ISMS in context',
          'answer_fr', 'L''efficacité du SMSI dans son contexte'
        ),
        jsonb_build_object(
          'type', 'true-false',
          'prompt_en', 'Annex A is the whole ISO 27001 standard.',
          'prompt_fr', 'L''Annexe A constitue toute la norme ISO 27001.',
          'answer_en', 'False',
          'answer_fr', 'Faux'
        )
      )
    )
  ),
  (
    'clause-practice',
    'Clause practice',
    'Pratique des articles',
    jsonb_build_object(
      'topic', 'clauses',
      'questions',
      jsonb_build_array(
        jsonb_build_object(
          'type', 'matching',
          'prompt_en', 'Match the clause to its main purpose.',
          'prompt_fr', 'Associez l''article à sa finalité principale.',
          'pairs',
          jsonb_build_array(
            jsonb_build_object('left', 'Clause 4', 'right', 'Context and scope'),
            jsonb_build_object('left', 'Clause 9', 'right', 'Audit and management review')
          )
        )
      )
    )
  ),
  (
    'annex-a-checkpoint',
    'Annex A checkpoint',
    'Checkpoint Annexe A',
    jsonb_build_object(
      'topic', 'controls',
      'questions',
      jsonb_build_array(
        jsonb_build_object(
          'type', 'multiple-choice',
          'prompt_en', 'How many Annex A controls exist in the 2022 edition?',
          'prompt_fr', 'Combien de mesures de l''Annexe A existent dans l''édition 2022 ?',
          'answer_en', '93',
          'answer_fr', '93'
        ),
        jsonb_build_object(
          'type', 'multiple-choice',
          'prompt_en', 'Which category does control 8.5 belong to?',
          'prompt_fr', 'À quelle catégorie appartient la mesure 8.5 ?',
          'answer_en', 'Technological',
          'answer_fr', 'Technologique'
        )
      )
    )
  ),
  (
    'risk-treatment-drill',
    'Risk treatment drill',
    'Exercice de traitement du risque',
    jsonb_build_object(
      'topic', 'risk',
      'questions',
      jsonb_build_array(
        jsonb_build_object(
          'type', 'scenario-classification',
          'prompt_en', 'A support team shares admin credentials. Which treatment is most appropriate first?',
          'prompt_fr', 'Une équipe support partage des identifiants admin. Quel traitement est le plus approprié en premier ?',
          'answer_en', 'Mitigate',
          'answer_fr', 'Atténuer'
        )
      )
    )
  ),
  (
    'audit-findings-drill',
    'Audit findings drill',
    'Exercice constats d''audit',
    jsonb_build_object(
      'topic', 'audit',
      'questions',
      jsonb_build_array(
        jsonb_build_object(
          'type', 'scenario-classification',
          'prompt_en', 'No formal risk assessment exists anywhere in scope. How should this be classified?',
          'prompt_fr', 'Aucune analyse de risque formelle n''existe dans le périmètre. Comment classifier cela ?',
          'answer_en', 'Major nonconformity',
          'answer_fr', 'Non-conformité majeure'
        )
      )
    )
  )
on conflict (slug) do update set
  title_en = excluded.title_en,
  title_fr = excluded.title_fr,
  payload = excluded.payload;

insert into public.framework_comparisons (
  id,
  name,
  title_en,
  title_fr,
  comparison_type_en,
  comparison_type_fr,
  purpose_en,
  purpose_fr,
  who_uses_it_en,
  who_uses_it_fr,
  legal_status_en,
  legal_status_fr,
  business_relevance_en,
  business_relevance_fr,
  payload
)
values
  (
    'iso-27001',
    'ISO/IEC 27001',
    'ISO/IEC 27001',
    'ISO/IEC 27001',
    'Certifiable management-system standard',
    'Norme certifiable de système de management',
    'Define the requirements for an Information Security Management System.',
    'Définir les exigences d''un système de management de la sécurité de l''information.',
    'Organizations pursuing information-security governance and certification.',
    'Organisations recherchant gouvernance sécurité et certification.',
    'International standard, not a law.',
    'Norme internationale, pas une loi.',
    'Often used for customer trust, governance maturity, and certification readiness.',
    'Souvent utilisée pour la confiance client, la maturité de gouvernance et la préparation à la certification.',
    jsonb_build_object('notes_en', 'Clauses 4 to 10 are certifiable requirements.', 'notes_fr', 'Les articles 4 à 10 sont les exigences certifiables.')
  ),
  (
    'iso-27002',
    'ISO/IEC 27002',
    'ISO/IEC 27002',
    'ISO/IEC 27002',
    'Implementation guidance standard',
    'Norme de guidance de mise en oeuvre',
    'Explain how controls can be interpreted and implemented.',
    'Expliquer comment les mesures peuvent être interprétées et mises en oeuvre.',
    'Security teams, implementers, consultants, and control owners.',
    'Équipes sécurité, responsables de mise en oeuvre, consultants et propriétaires de mesures.',
    'Guidance standard, not certifiable and not a law.',
    'Norme de guidance, non certifiable et non légale.',
    'Useful when turning Annex A control names into practical operating measures.',
    'Utile pour transformer les noms de mesures de l''Annexe A en pratiques d''exploitation.',
    jsonb_build_object('notes_en', 'Helps interpret Annex A.', 'notes_fr', 'Aide à interpréter l''Annexe A.')
  ),
  (
    'iso-19011',
    'ISO 19011',
    'ISO 19011',
    'ISO 19011',
    'Audit guidance standard',
    'Norme de guidance d''audit',
    'Guide the principles and conduct of management-system audits.',
    'Guider les principes et la conduite des audits de systèmes de management.',
    'Internal auditors, lead auditors, and audit programme owners.',
    'Auditeurs internes, lead auditors et responsables de programme d''audit.',
    'Guidance standard, not certifiable and not a law.',
    'Norme de guidance, non certifiable et non légale.',
    'Useful for audit planning, interview technique, sampling, and auditor behaviour.',
    'Utile pour la planification d''audit, la conduite d''entretien, l''échantillonnage et le comportement auditeur.',
    jsonb_build_object('notes_en', 'Supports audit method, not ISO 27001 requirements.', 'notes_fr', 'Soutient la méthode d''audit, pas les exigences ISO 27001.')
  ),
  (
    'soc-2',
    'SOC 2',
    'SOC 2',
    'SOC 2',
    'Attestation framework',
    'Cadre d''attestation',
    'Assess controls against trust services criteria.',
    'Évaluer les contrôles contre les trust services criteria.',
    'Service organizations, especially in North America.',
    'Organisations de services, surtout en Amérique du Nord.',
    'Attestation report, not a law and not ISO certification.',
    'Rapport d''attestation, pas une loi et pas une certification ISO.',
    'Frequently compared with ISO 27001 by SaaS buyers and security questionnaires.',
    'Souvent comparé à l''ISO 27001 par les acheteurs SaaS et les questionnaires sécurité.',
    jsonb_build_object('notes_en', 'SOC 2 is opinion-based attestation rather than ISO certification.', 'notes_fr', 'SOC 2 est une attestation d''opinion plutôt qu''une certification ISO.')
  ),
  (
    'gdpr',
    'GDPR',
    'RGPD',
    'RGPD',
    'Privacy law',
    'Loi sur la protection des données',
    'Protect personal data and regulate processing activities.',
    'Protéger les données personnelles et encadrer les traitements.',
    'Any entity processing personal data of people in the EU.',
    'Toute entité traitant des données personnelles de personnes dans l''UE.',
    'Binding law and regulatory obligation.',
    'Loi contraignante et obligation réglementaire.',
    'Strongly relevant because privacy obligations influence risk, controls, and evidence.',
    'Très pertinent car les obligations privacy influencent risques, mesures et preuves.',
    jsonb_build_object('notes_en', 'GDPR is legal compliance; ISO 27001 is a management standard.', 'notes_fr', 'Le RGPD relève de la conformité légale ; l''ISO 27001 est une norme de management.')
  ),
  (
    'hipaa',
    'HIPAA',
    'HIPAA',
    'HIPAA',
    'Sectoral healthcare regulation',
    'Réglementation sectorielle santé',
    'Protect health information in the US healthcare ecosystem.',
    'Protéger les informations de santé dans l''écosystème santé américain.',
    'Covered entities and business associates in the United States.',
    'Covered entities et business associates aux États-Unis.',
    'Binding regulation in a specific jurisdiction and sector.',
    'Réglementation contraignante dans une juridiction et un secteur spécifiques.',
    'Useful for comparing ISO 27001 to legal obligations around health data handling.',
    'Utile pour comparer l''ISO 27001 aux obligations légales sur les données de santé.',
    jsonb_build_object('notes_en', 'HIPAA is not a substitute for ISO 27001 and vice versa.', 'notes_fr', 'HIPAA ne remplace pas l''ISO 27001 et inversement.')
  )
on conflict (id) do update set
  name = excluded.name,
  title_en = excluded.title_en,
  title_fr = excluded.title_fr,
  comparison_type_en = excluded.comparison_type_en,
  comparison_type_fr = excluded.comparison_type_fr,
  purpose_en = excluded.purpose_en,
  purpose_fr = excluded.purpose_fr,
  who_uses_it_en = excluded.who_uses_it_en,
  who_uses_it_fr = excluded.who_uses_it_fr,
  legal_status_en = excluded.legal_status_en,
  legal_status_fr = excluded.legal_status_fr,
  business_relevance_en = excluded.business_relevance_en,
  business_relevance_fr = excluded.business_relevance_fr,
  payload = excluded.payload;

insert into public.nonconformity_cases (
  id,
  title_en,
  title_fr,
  context_en,
  context_fr,
  classification,
  related_clause,
  payload
)
values
  (
    'no-formal-risk-assessment',
    'No formal risk assessment exists',
    'Aucune analyse de risque formelle n''existe',
    'The organization claims to manage risk but cannot show a method, register, or treatment decisions.',
    'L''organisation affirme gérer le risque mais ne peut montrer ni méthode, ni registre, ni décisions de traitement.',
    'major',
    '6',
    jsonb_build_object(
      'why_en', 'Risk-based planning is a core ISMS requirement and is effectively absent.',
      'why_fr', 'La planification fondée sur le risque est une exigence centrale du SMSI et elle est ici absente.',
      'corrective_actions_en', jsonb_build_array('Define risk criteria', 'Run initial assessment', 'Approve treatment plan'),
      'corrective_actions_fr', jsonb_build_array('Définir les critères de risque', 'Réaliser l''analyse initiale', 'Approuver le plan de traitement'),
      'related_controls', jsonb_build_array('5.9', '5.15')
    )
  ),
  (
    'soa-missing',
    'Statement of Applicability is missing',
    'La déclaration d''applicabilité est absente',
    'Risk decisions were discussed informally but the organization cannot produce a current SoA.',
    'Les décisions de risque ont été discutées de manière informelle mais l''organisation ne peut produire de SoA à jour.',
    'major',
    '6',
    jsonb_build_object(
      'why_en', 'A core artefact linking risk treatment to Annex A applicability is missing.',
      'why_fr', 'Un artefact central reliant le traitement du risque à l''applicabilité de l''Annexe A est absent.',
      'corrective_actions_en', jsonb_build_array('Create SoA structure', 'Map applicable controls', 'Approve justifications'),
      'corrective_actions_fr', jsonb_build_array('Créer la structure de SoA', 'Cartographier les mesures applicables', 'Valider les justifications'),
      'related_controls', jsonb_build_array('5.1', '5.19', '8.5')
    )
  ),
  (
    'access-reviews-not-documented',
    'Access reviews are not documented',
    'Les revues d''accès ne sont pas documentées',
    'The access review process exists verbally, but sampled teams cannot show evidence of the latest review.',
    'Le processus de revue des accès existe oralement, mais les équipes échantillonnées ne peuvent montrer la preuve de la dernière revue.',
    'minor',
    '9',
    jsonb_build_object(
      'why_en', 'The control appears to exist, but execution evidence is inconsistent.',
      'why_fr', 'La mesure semble exister, mais les preuves d''exécution sont incohérentes.',
      'corrective_actions_en', jsonb_build_array('Formalise review cadence', 'Store review records centrally', 'Check completion monthly'),
      'corrective_actions_fr', jsonb_build_array('Formaliser la cadence de revue', 'Centraliser les traces de revue', 'Contrôler la complétion chaque mois'),
      'related_controls', jsonb_build_array('5.15', '5.18')
    )
  ),
  (
    'offboarding-evidence-inconsistent',
    'Onboarding exists but offboarding evidence is inconsistent',
    'L''onboarding existe mais les preuves d''offboarding sont incohérentes',
    'HR and IT follow a checklist, yet several terminated users remain active longer than expected and records are incomplete.',
    'Les RH et l''IT suivent une checklist, mais plusieurs utilisateurs sortants restent actifs plus longtemps que prévu et les traces sont incomplètes.',
    'minor',
    '8',
    jsonb_build_object(
      'why_en', 'The process exists but is not applied consistently enough for a clean control outcome.',
      'why_fr', 'Le processus existe mais n''est pas appliqué de manière suffisamment cohérente pour produire un contrôle propre.',
      'corrective_actions_en', jsonb_build_array('Tighten offboarding SLA', 'Automate deprovisioning triggers', 'Review evidence weekly'),
      'corrective_actions_fr', jsonb_build_array('Resserer le SLA d''offboarding', 'Automatiser les déclencheurs de déprovisionnement', 'Revoir les preuves chaque semaine'),
      'related_controls', jsonb_build_array('5.11', '6.5', '5.18')
    )
  ),
  (
    'incident-process-not-followed',
    'Incident process exists but was not followed',
    'Le processus incident existe mais n''a pas été suivi',
    'An actual incident occurred, but the team bypassed the documented escalation and evidence handling steps.',
    'Un incident réel est survenu, mais l''équipe a contourné les étapes documentées d''escalade et de gestion des preuves.',
    'minor',
    '8',
    jsonb_build_object(
      'why_en', 'This shows operational inconsistency in a process that should already be established.',
      'why_fr', 'Cela montre une incohérence opérationnelle dans un processus censé être déjà établi.',
      'corrective_actions_en', jsonb_build_array('Run post-incident review', 'Refresh training', 'Verify incident handling on the next sample'),
      'corrective_actions_fr', jsonb_build_array('Réaliser un retour d''expérience', 'Rafraîchir la formation', 'Vérifier la gestion d''incident sur le prochain échantillon'),
      'related_controls', jsonb_build_array('5.24', '5.26', '5.28')
    )
  ),
  (
    'training-attendance-missing',
    'Training policy exists but attendance evidence is missing',
    'La politique de formation existe mais les preuves de présence sont manquantes',
    'The organization has awareness content and a training schedule, but attendance and completion records are incomplete.',
    'L''organisation dispose de contenus de sensibilisation et d''un calendrier de formation, mais les preuves de présence et de complétion sont incomplètes.',
    'observation',
    '7',
    jsonb_build_object(
      'why_en', 'The system may still operate, but the evidence set is weak and should improve before it becomes a minor finding.',
      'why_fr', 'Le système peut encore fonctionner, mais l''ensemble de preuves est faible et doit être renforcé avant de devenir une mineure.',
      'corrective_actions_en', jsonb_build_array('Centralise completion tracking', 'Define retention expectation', 'Report awareness completion to management'),
      'corrective_actions_fr', jsonb_build_array('Centraliser le suivi de complétion', 'Définir l''attente de conservation', 'Reporter la complétion sensibilisation à la direction'),
      'related_controls', jsonb_build_array('6.3')
    )
  )
on conflict (id) do update set
  title_en = excluded.title_en,
  title_fr = excluded.title_fr,
  context_en = excluded.context_en,
  context_fr = excluded.context_fr,
  classification = excluded.classification,
  related_clause = excluded.related_clause,
  payload = excluded.payload;
