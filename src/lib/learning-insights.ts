import { glossaryEntries, learningModules, practiceQuestions, type PracticeTopic } from "@/lib/platform-data";
import { readStorageJson, storageKeys, writeStorageJson } from "@/lib/storage";

export type ModuleProgressRecord = Record<
  string,
  {
    completed?: boolean;
    progressPercent?: number;
    updatedAt?: string;
  }
>;

export type ModuleQuizAttemptRecord = Record<
  string,
  {
    score: number;
    maxScore: number;
    answers: Record<string, string>;
    completed: boolean;
    updatedAt: string;
  }
>;

export type PracticeConfidence = "low" | "medium" | "high";

export type StoredPracticeAttempt = {
  questionId: string;
  topic: PracticeTopic;
  type: string;
  correct: boolean;
  confidence: PracticeConfidence;
  answeredAt: string;
};

export type PracticeAttemptsState = {
  attempts: StoredPracticeAttempt[];
};

export type SimulationStore = Record<string, unknown>;

export type MockExamSession = {
  id: string;
  mode: string;
  score: number;
  maxScore: number;
  percent: number;
  completedAt: string;
  domainScores: Record<string, { correct: number; total: number }>;
};

export type DashboardSnapshot = {
  completedModules: number;
  inProgressModules: number;
  averageModuleProgress: number;
  quizHistoryCount: number;
  weakTopics: Array<{
    topic: PracticeTopic;
    accuracy: number;
    attempts: number;
  }>;
  strengths: Array<{
    topic: PracticeTopic;
    accuracy: number;
    attempts: number;
  }>;
  scenarioCompletions: number;
  vocabularyProgress: number;
  readinessScore: number;
  mockExamAttempts: number;
  latestMockExamScore: number | null;
  bestMockExamScore: number | null;
};

export function readModuleProgress() {
  return readStorageJson<ModuleProgressRecord>(storageKeys.moduleProgress, {});
}

export function readModuleQuizAttempts() {
  return readStorageJson<ModuleQuizAttemptRecord>(storageKeys.quizAttempts, {});
}

export function readPracticeAttempts() {
  return readStorageJson<PracticeAttemptsState>(storageKeys.practiceAttempts, { attempts: [] });
}

export function writePracticeAttempts(state: PracticeAttemptsState) {
  writeStorageJson(storageKeys.practiceAttempts, state);
}

export function readSimulationStore() {
  return readStorageJson<SimulationStore>(storageKeys.simulations, {});
}

export function writeSimulationStore(state: SimulationStore) {
  writeStorageJson(storageKeys.simulations, state);
}

export function readMockExamSessions() {
  return readStorageJson<MockExamSession[]>(storageKeys.mockExamSessions, []);
}

export function writeMockExamSessions(state: MockExamSession[]) {
  writeStorageJson(storageKeys.mockExamSessions, state);
}

export function readContentStudioDrafts() {
  return readStorageJson<Record<string, unknown>>(storageKeys.contentStudioDrafts, {});
}

export function writeContentStudioDrafts(state: Record<string, unknown>) {
  writeStorageJson(storageKeys.contentStudioDrafts, state);
}

export function getTopicAccuracy(attempts: StoredPracticeAttempt[]) {
  const grouped = new Map<
    PracticeTopic,
    {
      attempts: number;
      correct: number;
    }
  >();

  for (const attempt of attempts) {
    const current = grouped.get(attempt.topic) ?? { attempts: 0, correct: 0 };
    current.attempts += 1;
    current.correct += Number(attempt.correct);
    grouped.set(attempt.topic, current);
  }

  const topics = Array.from(grouped.entries()).map(([topic, value]) => ({
    topic,
    attempts: value.attempts,
    accuracy: value.attempts > 0 ? Math.round((value.correct / value.attempts) * 100) : 0,
  }));

  return {
    weakTopics: topics
      .filter((entry) => entry.attempts > 0)
      .sort((left, right) => left.accuracy - right.accuracy || right.attempts - left.attempts),
    strengths: topics
      .filter((entry) => entry.attempts > 0)
      .sort((left, right) => right.accuracy - left.accuracy || right.attempts - left.attempts),
  };
}

export function buildDashboardSnapshot(): DashboardSnapshot {
  const progress = readModuleProgress();
  const quizAttempts = readModuleQuizAttempts();
  const practiceState = readPracticeAttempts();
  const simulations = readSimulationStore();
  const mockExamSessions = readMockExamSessions();

  const progressValues = Object.values(progress);
  const completedModules = progressValues.filter((entry) => entry.completed).length;
  const inProgressModules = progressValues.filter(
    (entry) => !entry.completed && (entry.progressPercent ?? 0) > 0,
  ).length;
  const averageModuleProgress =
    progressValues.length > 0
      ? Math.round(
          progressValues.reduce((sum, entry) => sum + (entry.progressPercent ?? 0), 0) /
            progressValues.length,
        )
      : 0;

  const { weakTopics, strengths } = getTopicAccuracy(practiceState.attempts);

  const scenarioCompletions = Object.keys(simulations).filter((key) =>
    [
      "risk_lab",
      "soa_builder",
      "audit_lab",
      "nonconformity_lab",
      "audit_evidence_practice",
      "implementation_journey",
    ].includes(key),
  ).length;

  const vocabularyAttempts = practiceState.attempts.filter(
    (attempt) => attempt.topic === "glossary",
  ).length;
  const vocabularyProgress = Math.min(
    100,
    Math.round((vocabularyAttempts / Math.max(1, glossaryEntries.length)) * 100),
  );

  const quizHistoryCount = Object.keys(quizAttempts).length + practiceState.attempts.length;
  const moduleReadiness =
    learningModules.length > 0 ? Math.round((completedModules / learningModules.length) * 100) : 0;
  const practiceAccuracy =
    practiceState.attempts.length > 0
      ? Math.round(
          (practiceState.attempts.filter((attempt) => attempt.correct).length /
            practiceState.attempts.length) *
            100,
        )
      : 0;
  const practiceCoverage = Math.round(
    (new Set(practiceState.attempts.map((attempt) => attempt.questionId)).size /
      practiceQuestions.length) *
      100,
  );

  const latestMockExamScore = mockExamSessions[0]?.percent ?? null;
  const bestMockExamScore =
    mockExamSessions.length > 0
      ? Math.max(...mockExamSessions.map((session) => session.percent))
      : null;
  const mockExamSignal = bestMockExamScore ?? latestMockExamScore ?? 0;

  const readinessScore = Math.round(
    moduleReadiness * 0.35 +
      averageModuleProgress * 0.1 +
      practiceAccuracy * 0.18 +
      practiceCoverage * 0.08 +
      vocabularyProgress * 0.09 +
      mockExamSignal * 0.2,
  );

  return {
    completedModules,
    inProgressModules,
    averageModuleProgress,
    quizHistoryCount,
    weakTopics: weakTopics.slice(0, 3),
    strengths: strengths.slice(0, 3),
    scenarioCompletions,
    vocabularyProgress,
    readinessScore,
    mockExamAttempts: mockExamSessions.length,
    latestMockExamScore,
    bestMockExamScore,
  };
}
