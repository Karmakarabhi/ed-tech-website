"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Brain, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface Question {
  id: number;
  text: string;
  options: { label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "When you face a stressful situation, what is your first instinct?",
    options: [
      { label: "Shut down and withdraw", score: 1 },
      { label: "Get irritable or snap at people", score: 2 },
      { label: "Try to think it through logically", score: 3 },
      { label: "Acknowledge the emotion and sit with it", score: 4 },
    ],
  },
  {
    id: 2,
    text: "How often do you feel in control of your emotional reactions?",
    options: [
      { label: "Rarely — emotions control me", score: 1 },
      { label: "Sometimes — depends on the day", score: 2 },
      { label: "Most of the time", score: 3 },
      { label: "Almost always — I have reliable strategies", score: 4 },
    ],
  },
  {
    id: 3,
    text: "When someone criticises you, how do you typically respond?",
    options: [
      { label: "Take it personally and ruminate for days", score: 1 },
      { label: "Get defensive or shut the conversation down", score: 2 },
      { label: "Feel hurt but try to evaluate if it's valid", score: 3 },
      { label: "Listen calmly, extract what's useful, discard the rest", score: 4 },
    ],
  },
  {
    id: 4,
    text: "How would you describe your self-discipline with habits and routines?",
    options: [
      { label: "I start strong then quit within a week", score: 1 },
      { label: "Inconsistent — good stretches followed by long breaks", score: 2 },
      { label: "Fairly consistent but I still rely heavily on willpower", score: 3 },
      { label: "I have systems that run on autopilot", score: 4 },
    ],
  },
  {
    id: 5,
    text: "How comfortable are you being vulnerable with people you trust?",
    options: [
      { label: "Extremely uncomfortable — I never open up", score: 1 },
      { label: "I can, but only in very rare situations", score: 2 },
      { label: "I'm getting better at it over time", score: 3 },
      { label: "I see vulnerability as a strength and practise it", score: 4 },
    ],
  },
  {
    id: 6,
    text: "When you feel anxious, can you identify what triggered it?",
    options: [
      { label: "No — it feels like it comes out of nowhere", score: 1 },
      { label: "Sometimes, but only after the fact", score: 2 },
      { label: "Usually — I can trace it to a thought or event", score: 3 },
      { label: "Yes — and I can intervene before it spirals", score: 4 },
    ],
  },
  {
    id: 7,
    text: "What does 'working on yourself' currently look like for you?",
    options: [
      { label: "Watching motivational videos when I feel low", score: 1 },
      { label: "Reading self-help books but rarely applying them", score: 2 },
      { label: "Journaling, therapy, or structured reflection occasionally", score: 3 },
      { label: "A consistent practice with frameworks I trust", score: 4 },
    ],
  },
];

interface ScoreBand {
  min: number;
  max: number;
  title: string;
  description: string;
  recommendation: string;
  slug: string;
  color: string;
}

const scoreBands: ScoreBand[] = [
  {
    min: 7,
    max: 13,
    title: "Foundation Stage",
    description:
      "You're at the beginning of your psychological growth journey. The good news? Awareness is the first step — and you just took it. You'd benefit most from structured frameworks that help you understand *why* you react the way you do.",
    recommendation: "The Anxiety Blueprint",
    slug: "the-anxiety-blueprint",
    color: "text-red-500",
  },
  {
    min: 14,
    max: 20,
    title: "Developing Awareness",
    description:
      "You have some self-awareness but lack the tools to turn insight into lasting change. You understand something needs to shift, but you're stuck between knowing and doing. A structured emotional intelligence framework will bridge that gap.",
    recommendation: "Emotional Intelligence for Men",
    slug: "emotional-intelligence-for-men",
    color: "text-amber-500",
  },
  {
    min: 21,
    max: 24,
    title: "Active Growth",
    description:
      "You've done real work on yourself and it shows. Your next edge is building systems that sustain this growth without relying on willpower or motivation. You're ready for identity-level change.",
    recommendation: "Discipline & Identity",
    slug: "discipline-and-identity",
    color: "text-emerald-500",
  },
  {
    min: 25,
    max: 28,
    title: "Psychological Strength",
    description:
      "You operate with rare emotional clarity and self-regulation. You're in the top tier of self-mastery. Consider deepening your practice or mentoring others — the advanced material in our programs will challenge you in the best way.",
    recommendation: "Discipline & Identity",
    slug: "discipline-and-identity",
    color: "text-primary",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function StrengthAssessment() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(questions.length).fill(null)
  );
  const [direction, setDirection] = useState<1 | -1>(1);

  const totalScore = useMemo(
    () => answers.reduce<number>((s, a) => s + (a ?? 0), 0),
    [answers]
  );

  const band = useMemo(
    () => scoreBands.find((b) => totalScore >= b.min && totalScore <= b.max) ?? scoreBands[0],
    [totalScore]
  );

  const completed = answers.every((a) => a !== null);
  const progress = ((current + (answers[current] !== null ? 1 : 0)) / questions.length) * 100;

  const handleSelect = (score: number) => {
    const next = [...answers];
    next[current] = score;
    setAnswers(next);

    // Auto-advance after a short delay
    if (current < questions.length - 1) {
      setTimeout(() => {
        setDirection(1);
        setCurrent((c) => c + 1);
      }, 300);
    }
  };

  const reset = () => {
    setStarted(false);
    setCurrent(0);
    setAnswers(new Array(questions.length).fill(null));
  };

  /* ── Intro Screen ── */
  if (!started) {
    return (
      <section id="method" className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Brain className="h-7 w-7 text-primary" />
            </div>

            <p className="font-accent mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Free Assessment
            </p>
            <h2 className="font-heading text-3xl text-foreground sm:text-4xl lg:text-5xl">
              What&apos;s Your Psychological
              <br />
              Strength Score?
            </h2>
            <p className="font-body mt-4 text-base leading-relaxed text-muted-foreground">
              Answer 7 quick questions to discover where you are on the self-mastery spectrum
              — and which program fits your current stage.
            </p>

            <Button
              size="lg"
              className="mt-8 gap-2 text-base"
              onClick={() => setStarted(true)}
            >
              Take the Assessment
              <ArrowRight className="h-4 w-4" />
            </Button>

            <p className="font-body mt-3 text-xs text-muted-foreground">
              Takes less than 2 minutes · No sign-up required
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ── Results Screen ── */
  if (completed) {
    const pct = Math.round((totalScore / 28) * 100);
    return (
      <section id="method" className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="font-accent mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Your Result
            </p>
            <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
              {band.title}
            </h2>

            {/* Score ring */}
            <div className="relative mx-auto mt-8 h-40 w-40">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="44"
                  fill="none"
                  className="stroke-border"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="50" cy="50" r="44"
                  fill="none"
                  className="stroke-primary"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 44}
                  initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 44 * (1 - pct / 100) }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading text-3xl font-bold text-foreground">{totalScore}</span>
                <span className="font-accent text-xs text-muted-foreground">/ 28</span>
              </div>
            </div>

            <p className="font-body mt-6 text-base leading-relaxed text-muted-foreground">
              {band.description}
            </p>

            <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="font-accent text-xs font-semibold uppercase tracking-widest text-primary">
                Recommended Program
              </p>
              <p className="font-heading mt-2 text-xl text-foreground">
                {band.recommendation}
              </p>
              <Button size="lg" className="mt-4 gap-2 text-base" asChild>
                <Link href={`/courses/${band.slug}`}>
                  View Program
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <button
              onClick={reset}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Retake Assessment
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ── Quiz Screen ── */
  const q = questions[current];
  return (
    <section id="method" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* Progress bar */}
          <div className="mb-2 flex items-center justify-between">
            <span className="font-accent text-xs text-muted-foreground">
              Question {current + 1} of {questions.length}
            </span>
            <span className="font-accent text-xs text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="mb-10 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Question */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={q.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                {q.text}
              </h3>

              <div className="mt-6 space-y-3">
                {q.options.map((opt, i) => {
                  const selected = answers[current] === opt.score;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(opt.score)}
                      className={`w-full rounded-xl border px-5 py-4 text-left text-sm font-medium transition-all
                        ${
                          selected
                            ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary/30"
                            : "border-border bg-card text-foreground/80 hover:border-primary/40 hover:bg-secondary"
                        }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              disabled={current === 0}
              onClick={() => {
                setDirection(-1);
                setCurrent((c) => c - 1);
              }}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            {current < questions.length - 1 ? (
              <Button
                size="sm"
                disabled={answers[current] === null}
                onClick={() => {
                  setDirection(1);
                  setCurrent((c) => c + 1);
                }}
                className="gap-1"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                disabled={!completed}
                className="gap-1"
              >
                See My Results
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
