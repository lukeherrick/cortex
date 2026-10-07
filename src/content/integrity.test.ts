import { describe, expect, it } from 'vitest';
import { itemsAtDepth, loadBundle } from '@/content';
import { STUDY_DEPTH } from '@/content/depth';
import type { Item } from '@/content/types';
import { gradeChoice } from '@/grading/choice';
import { gradeNumeric } from '@/grading/numeric';
import { countSigFigs } from '@/grading/sigfigs';

/**
 * Checks on the real shipped content, not on fixtures.
 *
 * Unit tests prove the app behaves; they cannot prove the chemistry is true.
 * These close the gap where a machine can: an item that the grader itself
 * would mark wrong, a question with no reachable correct answer, a worked
 * solution that is not actually worked. Factual accuracy still needs a human
 * rechecking the arithmetic.
 */

const bundle = loadBundle();
const allItems: { topicId: string; item: Item }[] = bundle.topics.flatMap((t) =>
  t.items.map((item) => ({ topicId: t.id, item })),
);

describe('shipped content', () => {
  it('has items to check', () => {
    expect(allItems.length).toBeGreaterThan(20);
  });
});

describe('every numeric item is answerable as authored', () => {
  const numeric = allItems.filter(({ item }) => item.type === 'numeric');

  it('has numeric items', () => {
    expect(numeric.length).toBeGreaterThan(0);
  });

  it.each(numeric.map(({ item }) => [item.id, item] as const))(
    '%s accepts its own answer written to the authored sig figs',
    (_id, item) => {
      if (item.type !== 'numeric') throw new Error('filtered wrong');
      const { value, unit, sigFigs } = item.answer;

      // Write the answer the way a correct learner would: the authored value,
      // rounded to the authored number of significant figures.
      const text = sigFigs === null ? String(value) : value.toPrecision(sigFigs);
      const response = unit === null ? text : `${text} ${unit}`;

      const verdict = gradeNumeric(response, item.answer);
      expect(
        verdict,
        `grader rejected its own authored answer "${response}"`,
      ).toMatchObject({ overall: true });
    },
  );

  it.each(numeric.map(({ item }) => [item.id, item] as const))(
    '%s has a sigFigs count the authored value can actually express',
    (_id, item) => {
      if (item.type !== 'numeric') throw new Error('filtered wrong');
      const { value, sigFigs } = item.answer;
      if (sigFigs === null) return;

      // If the authored value carries fewer sig figs than required, no learner
      // can ever satisfy both the value and the sig-fig check at once.
      expect(countSigFigs(value.toPrecision(sigFigs))).toBe(sigFigs);
    },
  );
});

describe('every multiple-choice item has a reachable correct answer', () => {
  const mcq = allItems.filter(({ item }) => item.type === 'mcq');

  it('has multiple-choice items', () => {
    expect(mcq.length).toBeGreaterThan(0);
  });

  it.each(mcq.map(({ item }) => [item.id, item] as const))(
    '%s grades its own correctId as correct',
    (_id, item) => {
      if (item.type !== 'mcq') throw new Error('filtered wrong');
      expect(gradeChoice(item.answer.correctId, item.answer).correct).toBe(true);
    },
  );

  it.each(mcq.map(({ item }) => [item.id, item] as const))(
    '%s explains every distractor',
    (_id, item) => {
      if (item.type !== 'mcq') throw new Error('filtered wrong');
      const unexplained = item.answer.options
        .filter((o) => o.id !== item.answer.correctId && !o.why)
        .map((o) => o.id);
      expect(unexplained).toEqual([]);
    },
  );
});

describe('every written item can be self-graded against something', () => {
  const written = allItems.filter(
    ({ item }) => item.type === 'frq' || item.type === 'recall',
  );

  it('has written items', () => {
    expect(written.length).toBeGreaterThan(0);
  });

  it.each(written.map(({ item }) => [item.id, item] as const))(
    '%s has a model answer and a rubric',
    (_id, item) => {
      if (item.type !== 'frq' && item.type !== 'recall') {
        throw new Error('filtered wrong');
      }
      expect(item.answer.model.length).toBeGreaterThan(40);
      expect(item.answer.rubric.length).toBeGreaterThan(0);
    },
  );
});

describe('every item is actually worked, not just answered', () => {
  it.each(allItems.map(({ item }) => [item.id, item] as const))(
    '%s shows real reasoning steps',
    (_id, item) => {
      // A one-line "solution" that restates the answer teaches nothing. Harder
      // tiers get a higher bar because that is where the reasoning lives.
      const minimum = item.tier === 'warmup' ? 2 : 3;
      expect(item.solution.length).toBeGreaterThanOrEqual(minimum);
      for (const step of item.solution) {
        expect(step.text.trim().length).toBeGreaterThan(10);
      }
    },
  );
});

describe('content hygiene', () => {
  it.each(allItems.map(({ item }) => [item.id, item] as const))(
    '%s has no placeholder or corrupted text',
    (_id, item) => {
      const blobs = [
        item.prompt,
        ...item.solution.map((s) => s.text),
        ...(item.type === 'frq' || item.type === 'recall'
          ? [item.answer.model, ...item.answer.rubric]
          : []),
        ...(item.type === 'mcq'
          ? item.answer.options.flatMap((o) => [o.text, o.why ?? ''])
          : []),
      ].join('\n');

      expect(blobs).not.toMatch(/\bTODO\b|\bTBD\b|\bFIXME\b|lorem ipsum/i);
      // Caught a real corrupted prompt once; cheap to guard against.
      expect(blobs).not.toMatch(/\bgranted contains\b/);
    },
  );

  it.each(bundle.topics.map((t) => [t.id, t] as const))(
    '%s teaches before it tests',
    (_id, topic) => {
      // The concept body is the only teaching the owner gets for AP Biology,
      // where no class exists. A stub body is a content bug.
      expect(topic.concept.trim().length).toBeGreaterThan(200);
    },
  );
});

/**
 * Content the app never shows is content that does not exist.
 *
 * Each subject is studied at one configured depth, and `itemsAtDepth` drops
 * anything outside it. That filter is silent: four AP-depth chemistry
 * problems once sat in the bundle, passed every other check here, and were
 * unreachable in the app for as long as they existed. Authoring an item at a
 * depth its own subject is not studied at is always a mistake, so it fails
 * the build now instead of quietly disappearing.
 */
describe('every authored item is reachable in the app', () => {
  it('has no item hidden by its subject depth', () => {
    const unreachable = bundle.topics.flatMap((topic) => {
      const shown = new Set(
        itemsAtDepth(topic, STUDY_DEPTH[topic.subject]).map((i) => i.id),
      );
      return topic.items
        .filter((i) => !shown.has(i.id))
        .map((i) => `${i.id} (depth ${i.depth}, subject ${topic.subject})`);
    });
    expect(unreachable).toEqual([]);
  });

  it('shows every item in the bundle', () => {
    const reachable = bundle.topics.reduce(
      (n, topic) => n + itemsAtDepth(topic, STUDY_DEPTH[topic.subject]).length,
      0,
    );
    expect(reachable).toBe(allItems.length);
  });
});
