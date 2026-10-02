import { z } from 'zod';

export const subjectSchema = z.enum(['bio', 'chem']);
export const depthSchema = z.enum(['level1', 'honors', 'ap', 'both']);
export const tierSchema = z.enum(['warmup', 'standard', 'challenge', 'ap']);
export const sourceSchema = z.enum(['openstax', 'original', 'ai-generated']);

export const solutionStepSchema = z.object({
  text: z.string().min(1),
});

const numericAnswerSchema = z.object({
  value: z.number().finite(),
  unit: z.string().min(1).nullable(),
  acceptedUnits: z.array(z.string().min(1)).optional(),
  sigFigs: z.number().int().positive().nullable(),
  tolerance: z.number().positive().optional(),
});

const choiceOptionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  why: z.string().min(1).optional(),
});

const choiceAnswerSchema = z.object({
  correctId: z.string().min(1),
  options: z.array(choiceOptionSchema).min(2),
});

const writtenAnswerSchema = z.object({
  model: z.string().min(1),
  rubric: z.array(z.string().min(1)).min(1),
});

const base = {
  id: z.string().min(1),
  tier: tierSchema,
  depth: depthSchema,
  prompt: z.string().min(1),
  solution: z.array(solutionStepSchema).min(1),
  source: sourceSchema,
  attribution: z.string().min(1).optional(),
  verified: z.boolean().default(false),
};

export const itemSchema = z.discriminatedUnion('type', [
  z.object({ ...base, type: z.literal('numeric'), answer: numericAnswerSchema }),
  z.object({ ...base, type: z.literal('mcq'), answer: choiceAnswerSchema }),
  z.object({ ...base, type: z.literal('frq'), answer: writtenAnswerSchema }),
  z.object({ ...base, type: z.literal('recall'), answer: writtenAnswerSchema }),
]);

export const topicSchema = z.object({
  id: z.string().min(1),
  unit: z.string().min(1),
  subject: subjectSchema,
  title: z.string().min(1),
  depth: depthSchema,
  ced: z.array(z.string().min(1)).default([]),
  prereqs: z.array(z.string().min(1)).default([]),
  concept: z.string().min(1),
  items: z.array(itemSchema).min(1),
});

export const unitSchema = z.object({
  id: z.string().min(1),
  subject: subjectSchema,
  title: z.string().min(1),
  order: z.number().int().nonnegative(),
});
