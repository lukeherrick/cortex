import type { AttemptRecord } from '@/data/attempts';
import type { CardRecord } from '@/data/cards';
import { toDateKey } from '@/habits/dates';

export interface Accuracy {
  attempted: number;
  correct: number;
  /** 0 to 1, or null when nothing has been attempted. */
  rate: number | null;
}

export function accuracyOf(attempts: readonly AttemptRecord[]): Accuracy {
  const attempted = attempts.length;
  const correct = attempts.filter((a) => a.correct).length;
  return {
    attempted,
    correct,
    rate: attempted === 0 ? null : correct / attempted,
  };
}

/** Accuracy over the most recent `days` calendar days, including today. */
export function recentAccuracy(
  attempts: readonly AttemptRecord[],
  now: number,
  days: number,
): Accuracy {
  const cutoff = now - (days - 1) * 86_400_000;
  const todayKey = toDateKey(now);
  return accuracyOf(
    attempts.filter(
      (a) => a.answeredAt >= cutoff || toDateKey(a.answeredAt) === todayKey,
    ),
  );
}

export interface TopicStat {
  topicId: string;
  attempted: number;
  correct: number;
  rate: number;
}

/**
 * Per-topic accuracy, worst first.
 *
 * Deliberately requires a minimum number of attempts: ranking a topic as your
 * weakest off one wrong answer would be noise presented as insight.
 */
export function weakestTopics(
  attempts: readonly AttemptRecord[],
  minAttempts = 4,
): TopicStat[] {
  const byTopic = new Map<string, { attempted: number; correct: number }>();

  for (const attempt of attempts) {
    const row = byTopic.get(attempt.topicId) ?? { attempted: 0, correct: 0 };
    row.attempted += 1;
    if (attempt.correct) row.correct += 1;
    byTopic.set(attempt.topicId, row);
  }

  return [...byTopic.entries()]
    .filter(([, row]) => row.attempted >= minAttempts)
    .map(([topicId, row]) => ({
      topicId,
      attempted: row.attempted,
      correct: row.correct,
      rate: row.correct / row.attempted,
    }))
    .sort((a, b) => a.rate - b.rate);
}

export interface CoverageStat {
  total: number;
  started: number;
  /** Items answered correctly at least once. */
  learned: number;
}

export function coverage(
  totalItems: number,
  cards: readonly CardRecord[],
): CoverageStat {
  return {
    total: totalItems,
    started: cards.length,
    learned: cards.filter((c) => c.everCorrect).length,
  };
}
