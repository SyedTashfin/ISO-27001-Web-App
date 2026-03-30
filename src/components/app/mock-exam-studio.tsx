"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  AlarmClock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Clock3,
  FileCheck2,
  Flag,
  Languages,
  Sparkles,
  Target,
} from "lucide-react";
import { toast } from "sonner";
import {
  readMockExamSessions,
  readPracticeAttempts,
  type MockExamSession,
  writeMockExamSessions,
} from "@/lib/learning-insights";
import {
  getDefinition,
  mockExamDefinitions,
  mockExamQuestions,
  mockExamTopicLabels,
  type MockExamDefinition,
  type MockExamMode,
  type MockExamQuestion,
} from "@/lib/mock-exam-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { LocalizedInline } from "@/components/app/localized-inline";
import { useLanguageMode } from "@/components/app/language-provider";
import { cn } from "@/lib/utils";

type ExamStatus = "idle" | "running" | "finished";

type AnswerValue = string | string[] | undefined;

type SessionResult = {
  session: MockExamSession;
  questions: MockExamQuestion[];
  answers: Record<string, AnswerValue>;
  flagged: string[];
};

function isCorrect(question: MockExamQuestion, answer: AnswerValue) {
  if (question.type === "multiple-select") {
    const selected = Array.isArray(answer) ? [...answer].sort() : [];
    return JSON.stringify(selected) === JSON.stringify([...question.correctOptionIds].sort());
  }

  return typeof answer === "string" && question.correctOptionIds[0] === answer;
}

function shuffle<T>(items: T[]) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
}

function buildExam(mode: MockExamMode) {
  const definition = getDefinition(mode);
  const practiceAttempts = readPracticeAttempts().attempts;
  const weakTopicSet = new Set(
    practiceAttempts
      .filter((attempt) => !attempt.correct)
      .map((attempt) => attempt.topic)
      .slice(-8),
  );

  let candidates = mockExamQuestions.filter((question) => question.modes.includes(mode));

  if (mode === "weak-areas" && weakTopicSet.size > 0) {
    candidates = candidates.filter((question) => {
      if (question.topic === "clauses") return weakTopicSet.has("clauses");
      if (question.topic === "annex-a") return weakTopicSet.has("controls");
      if (question.topic === "audit" || question.topic === "evidence" || question.topic === "nonconformity") {
        return weakTopicSet.has("audit");
      }
      if (question.topic === "risk" || question.topic === "soa") return weakTopicSet.has("risk");
      if (question.topic === "terminology") return weakTopicSet.has("glossary");
      return true;
    });
  }

  if (candidates.length < definition.questionCount) {
    candidates = mockExamQuestions.filter((question) =>
      definition.topics.includes(question.topic),
    );
  }

  return shuffle(candidates).slice(0, definition.questionCount);
}

export function MockExamStudio() {
  const { mode: languageMode } = useLanguageMode();
  const [selectedMode, setSelectedMode] = useState<MockExamMode>("timed");
  const [status, setStatus] = useState<ExamStatus>("idle");
  const [definition, setDefinition] = useState<MockExamDefinition>(getDefinition("timed"));
  const [questions, setQuestions] = useState<MockExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [flagged, setFlagged] = useState<string[]>([]);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [result, setResult] = useState<SessionResult | null>(null);
  const [sessionHistory, setSessionHistory] = useState<MockExamSession[]>(() => readMockExamSessions());

  const currentQuestion = questions[currentIndex];
  const answeredCount = useMemo(
    () => Object.values(answers).filter((value) => (Array.isArray(value) ? value.length > 0 : Boolean(value))).length,
    [answers],
  );
  const completion = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;
  const latestResult = result?.session ?? sessionHistory[0] ?? null;

  function startExam(mode: MockExamMode) {
    const nextDefinition = getDefinition(mode);
    const nextQuestions = buildExam(mode);

    setSelectedMode(mode);
    setDefinition(nextDefinition);
    setQuestions(nextQuestions);
    setCurrentIndex(0);
    setAnswers({});
    setFlagged([]);
    setRemainingSeconds(nextDefinition.minutes * 60);
    setResult(null);
    setStatus("running");
    toast.success("Mock exam started.");
  }

  function updateAnswer(questionId: string, value: AnswerValue) {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  }

  function toggleFlag(questionId: string) {
    setFlagged((current) =>
      current.includes(questionId)
        ? current.filter((id) => id !== questionId)
        : [...current, questionId],
    );
  }

  const finishExam = useCallback(() => {
    if (questions.length === 0) {
      return;
    }

    const score = questions.reduce((total, question) => total + Number(isCorrect(question, answers[question.id])), 0);
    const domainScores = questions.reduce<Record<string, { correct: number; total: number }>>((accumulator, question) => {
      const entry = accumulator[question.topic] ?? { correct: 0, total: 0 };
      entry.total += 1;
      entry.correct += Number(isCorrect(question, answers[question.id]));
      accumulator[question.topic] = entry;
      return accumulator;
    }, {});
    const session: MockExamSession = {
      id: crypto.randomUUID(),
      mode: selectedMode,
      score,
      maxScore: questions.length,
      percent: Math.round((score / questions.length) * 100),
      completedAt: new Date().toISOString(),
      domainScores,
    };

    const nextHistory = [session, ...sessionHistory].slice(0, 12);
    writeMockExamSessions(nextHistory);
    setSessionHistory(nextHistory);
    setRemainingSeconds(null);
    setStatus("finished");
    setResult({ session, questions, answers, flagged });
    toast.success("Mock exam submitted.");
  }, [answers, flagged, questions, selectedMode, sessionHistory]);

  useEffect(() => {
    if (status !== "running" || remainingSeconds === null) {
      return;
    }

    if (remainingSeconds <= 0) {
      const autoSubmit = window.setTimeout(() => {
        finishExam();
      }, 0);

      return () => window.clearTimeout(autoSubmit);
    }

    const timer = window.setTimeout(() => {
      setRemainingSeconds((current) => (current === null ? current : current - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [finishExam, remainingSeconds, status]);

  const weakDomains = latestResult
    ? Object.entries(latestResult.domainScores)
        .map(([topic, value]) => ({
          topic,
          percent: value.total > 0 ? Math.round((value.correct / value.total) * 100) : 0,
          total: value.total,
        }))
        .sort((left, right) => left.percent - right.percent)
        .slice(0, 3)
    : [];

  return (
    <section className="space-y-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/82 p-6 shadow-[0_34px_90px_-56px_rgba(15,23,42,0.42)] backdrop-blur-sm md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <Badge className="rounded-full bg-slate-950 text-white">Mock Exam</Badge>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              <LocalizedInline value={{ en: "Test your ISO 27001 readiness", fr: "Testez votre niveau de préparation ISO 27001" }} />
            </h1>
            <BilingualCopy
              value={{
                en: "This is the exam-prep layer of the app: realistic questions, timed pressure, bilingual understanding, and detailed explanations that teach after scoring.",
                fr: "Il s'agit de la couche préparation à l'examen de l'application : questions réalistes, pression temporelle, compréhension bilingue et explications détaillées qui enseignent après la notation.",
              }}
              containerClassName="mt-4"
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <FeatureChip icon={<Clock3 className="size-4" />} label="Timed exam flow" />
              <FeatureChip icon={<Target className="size-4" />} label="Scenario-heavy questions" />
              <FeatureChip icon={<Languages className="size-4" />} label={`Language mode: ${languageMode}`} />
            </div>
          </div>

          <div className="grid min-w-[280px] gap-3 rounded-[2rem] border border-slate-200/80 bg-slate-50/80 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Latest signal</div>
            <div className="text-3xl font-semibold text-slate-950">
              {latestResult ? `${latestResult.percent}%` : "No score yet"}
            </div>
            <p className="text-sm text-slate-600">
              {latestResult
                ? `${latestResult.score}/${latestResult.maxScore} in ${getDefinition(latestResult.mode as MockExamMode).title.en}`
                : "Complete a mock exam to surface weak domains and raise readiness scoring."}
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-950"
            >
              View dashboard impact
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-5">
        {mockExamDefinitions.map((item) => (
          <button
            key={item.id}
            type="button"
            className={cn(
              "rounded-[2rem] border p-5 text-left shadow-[0_24px_72px_-48px_rgba(15,23,42,0.3)] transition hover:-translate-y-0.5",
              selectedMode === item.id
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-white/70 bg-white/82 text-slate-950",
            )}
            onClick={() => setSelectedMode(item.id)}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">
                  <LocalizedInline value={item.title} />
                </div>
                <div className={cn("mt-2 text-sm leading-6", selectedMode === item.id ? "text-white/80" : "text-slate-600")}>
                  <LocalizedInline value={item.description} />
                </div>
              </div>
              <div className={cn("rounded-full px-3 py-1 text-xs font-semibold", selectedMode === item.id ? "bg-white/15 text-white" : "bg-slate-100 text-slate-700")}>
                {item.questionCount} q / {item.minutes} min
              </div>
            </div>
          </button>
        ))}
      </section>

      {status !== "running" ? (
        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-violet-600" />
              <h2 className="text-2xl font-semibold text-slate-950">
                <LocalizedInline value={getDefinition(selectedMode).title} />
              </h2>
            </div>
            <BilingualCopy value={getDefinition(selectedMode).description} containerClassName="mt-3" />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <ExamMetaCard label="Duration" value={`${getDefinition(selectedMode).minutes} minutes`} />
              <ExamMetaCard label="Question set" value={`${getDefinition(selectedMode).questionCount} questions`} />
              <ExamMetaCard label="Review" value="Detailed explanations after submission" />
              <ExamMetaCard label="Focus" value={getDefinition(selectedMode).topics.map((topic) => mockExamTopicLabels[topic].en).slice(0, 2).join(" + ")} />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => startExam(selectedMode)} className="rounded-full">
                Start exam
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Link href="/practice" className="inline-flex h-10 items-center rounded-full border border-slate-300 bg-white/70 px-5 text-sm font-medium text-slate-700 transition hover:bg-white">
                Go to practice lab
              </Link>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <FileCheck2 className="size-5 text-slate-900" />
              <h2 className="text-2xl font-semibold text-slate-950">What makes this credible</h2>
            </div>
            <div className="mt-5 space-y-3">
              {[
                "Questions are heavily scenario-based rather than pure memorization.",
                "Results break weak domains out by topic so the dashboard can react.",
                "The review mode explains why correct answers are right and why bad instincts fail.",
                "The bilingual mode keeps the exam useful for English/French work contexts in France.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 text-sm leading-6 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
            {weakDomains.length > 0 ? (
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
                <div className="text-sm font-semibold text-amber-900">Weakest recent domains</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {weakDomains.map((entry) => (
                    <Badge key={entry.topic} className="rounded-full bg-white text-amber-900">
                      {mockExamTopicLabels[entry.topic as keyof typeof mockExamTopicLabels]?.en ?? entry.topic}: {entry.percent}%
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}
          </article>
        </section>
      ) : null}

      {status === "running" && currentQuestion ? (
        <section className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
          <aside className="space-y-5 rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Live exam</div>
                <div className="mt-1 text-xl font-semibold text-slate-950">
                  <LocalizedInline value={definition.title} />
                </div>
              </div>
              <div className="rounded-full bg-slate-950 px-3 py-1.5 text-sm font-medium text-white">
                <AlarmClock className="mr-1 inline size-4" />
                {formatRemaining(remainingSeconds ?? 0)}
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                <span>Progress</span>
                <span>{answeredCount}/{questions.length}</span>
              </div>
              <Progress value={completion} className="h-2.5 bg-slate-200" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {questions.map((question, index) => {
                const isAnswered = Boolean(Array.isArray(answers[question.id]) ? answers[question.id]?.length : answers[question.id]);
                const isFlagged = flagged.includes(question.id);
                const isCurrent = index === currentIndex;

                return (
                  <button
                    key={question.id}
                    type="button"
                    className={cn(
                      "rounded-xl border px-3 py-2 text-sm transition",
                      isCurrent && "border-slate-950 bg-slate-950 text-white",
                      !isCurrent && isAnswered && "border-emerald-200 bg-emerald-50 text-emerald-900",
                      !isCurrent && !isAnswered && "border-slate-200 bg-slate-50 text-slate-700",
                    )}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span>{index + 1}</span>
                      {isFlagged ? <Flag className="size-3.5" /> : null}
                    </div>
                  </button>
                );
              })}
            </div>
            <Button variant="outline" className="w-full rounded-full" onClick={finishExam}>
              Submit exam now
            </Button>
          </aside>

          <article className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="rounded-full bg-slate-950 text-white">Question {currentIndex + 1}</Badge>
              <Badge variant="outline" className="rounded-full border-slate-200 bg-white">
                {mockExamTopicLabels[currentQuestion.topic].en}
              </Badge>
              <Badge variant="outline" className="rounded-full border-slate-200 bg-white">
                {currentQuestion.difficulty}
              </Badge>
            </div>

            {currentQuestion.scenario ? (
              <BilingualCopy value={currentQuestion.scenario} containerClassName="mt-5 rounded-2xl border border-slate-200/80 bg-slate-50/75 p-4" />
            ) : null}

            <BilingualCopy value={currentQuestion.prompt} containerClassName="mt-5" className="text-xl font-medium text-slate-950" />

            <div className="mt-6 grid gap-3">
              {currentQuestion.options.map((option) => {
                const currentAnswer = answers[currentQuestion.id];
                const selected = Array.isArray(currentAnswer)
                  ? currentAnswer.includes(option.id)
                  : currentAnswer === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    className={cn(
                      "rounded-[1.5rem] border p-4 text-left transition",
                      selected
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                    )}
                    onClick={() => {
                      if (currentQuestion.type === "multiple-select") {
                        const base = Array.isArray(currentAnswer) ? currentAnswer : [];
                        updateAnswer(
                          currentQuestion.id,
                          base.includes(option.id)
                            ? base.filter((value) => value !== option.id)
                            : [...base, option.id],
                        );
                        return;
                      }

                      updateAnswer(currentQuestion.id, option.id);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <CircleDot className="mt-0.5 size-4 shrink-0" />
                      <div>
                        <div className="font-medium">{option.label.en}</div>
                        <div className={cn("mt-1 text-sm", selected ? "text-white/75" : "text-slate-500")}>
                          {option.label.fr}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <Button variant="outline" className="rounded-full" onClick={() => toggleFlag(currentQuestion.id)}>
                <Flag className="mr-2 size-4" />
                {flagged.includes(currentQuestion.id) ? "Unmark review" : "Mark for review"}
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-full" onClick={() => setCurrentIndex((current) => Math.max(0, current - 1))} disabled={currentIndex === 0}>
                  <ArrowLeft className="mr-2 size-4" />
                  Previous
                </Button>
                <Button className="rounded-full" onClick={() => setCurrentIndex((current) => Math.min(questions.length - 1, current + 1))}>
                  Next
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </div>
          </article>
        </section>
      ) : null}

      {status === "finished" && result ? (
        <section className="space-y-6">
          <article className="rounded-[2rem] border border-emerald-200 bg-emerald-50/85 p-6 shadow-[0_30px_80px_-48px_rgba(16,185,129,0.35)]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-emerald-900">
                  <CheckCircle2 className="size-5" />
                  <span className="text-sm font-semibold uppercase tracking-[0.24em]">Exam complete</span>
                </div>
                <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                  {result.session.percent}% readiness on this attempt
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {result.session.score}/{result.session.maxScore} correct in {definition.title.en}. Use the review below to tighten weak domains.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-emerald-200 bg-white/80 p-4 text-sm text-slate-700">
                <div>Latest mode: {definition.title.en}</div>
                <div className="mt-1">Flagged for review: {result.flagged.length}</div>
                <div className="mt-1">Completed: {new Date(result.session.completedAt).toLocaleString()}</div>
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {Object.entries(result.session.domainScores)
                .sort((left, right) => left[0].localeCompare(right[0]))
                .map(([topic, value]) => {
                  const percent = value.total > 0 ? Math.round((value.correct / value.total) * 100) : 0;
                  return (
                    <div key={topic} className="rounded-2xl border border-white/70 bg-white/75 p-4">
                      <div className="text-sm font-semibold text-slate-900">
                        {mockExamTopicLabels[topic as keyof typeof mockExamTopicLabels]?.en ?? topic}
                      </div>
                      <div className="mt-2 text-2xl font-semibold text-slate-950">{percent}%</div>
                      <div className="mt-1 text-sm text-slate-500">{value.correct}/{value.total} correct</div>
                    </div>
                  );
                })}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button onClick={() => startExam(selectedMode)} className="rounded-full">Retake this exam</Button>
              <Button variant="outline" className="rounded-full" onClick={() => setStatus("idle")}>Choose another mode</Button>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-slate-950">Detailed review</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This is where the feature becomes useful: every question teaches after scoring.
            </p>
            <Accordion className="mt-6">
              {result.questions.map((question, index) => {
                const answer = result.answers[question.id];
                const correct = isCorrect(question, answer);
                return (
                  <AccordionItem key={question.id} value={question.id}>
                    <AccordionTrigger className="py-4">
                      <div className="pr-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={cn("rounded-full", correct ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900")}>{correct ? "Correct" : "Review"}</Badge>
                          <Badge variant="outline" className="rounded-full border-slate-200 bg-white">Q{index + 1}</Badge>
                          <Badge variant="outline" className="rounded-full border-slate-200 bg-white">{mockExamTopicLabels[question.topic].en}</Badge>
                        </div>
                        <BilingualCopy value={question.prompt} containerClassName="mt-3" className="font-medium text-slate-900" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-slate-50/75 p-4">
                        {question.scenario ? <BilingualCopy value={question.scenario} /> : null}
                        <div>
                          <div className="text-sm font-semibold text-slate-900">Correct answer</div>
                          <div className="mt-2 space-y-2">
                            {question.options
                              .filter((option) => question.correctOptionIds.includes(option.id))
                              .map((option) => (
                                <div key={option.id} className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
                                  {option.label.en} / {option.label.fr}
                                </div>
                              ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">Explanation</div>
                          <BilingualCopy value={question.explanation} containerClassName="mt-2" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">Practical takeaway</div>
                          <BilingualCopy value={question.takeaway} containerClassName="mt-2" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">References</div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {question.references.map((reference) => (
                              <Badge key={reference.en} variant="outline" className="rounded-full border-slate-200 bg-white">
                                {reference.en}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </article>
        </section>
      ) : null}
    </section>
  );
}

function FeatureChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-700">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function ExamMetaCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/75 p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm font-medium text-slate-900">{value}</div>
    </div>
  );
}

function formatRemaining(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
