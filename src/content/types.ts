import type { z } from 'zod';
import type {
  biomeSchema,
  depthSchema,
  itemSchema,
  solutionStepSchema,
  sourceSchema,
  subjectSchema,
  tierSchema,
  topicSchema,
  unitSchema,
} from './schema';

export type Subject = z.infer<typeof subjectSchema>;
export type Biome = z.infer<typeof biomeSchema>;
export type Depth = z.infer<typeof depthSchema>;
export type Tier = z.infer<typeof tierSchema>;
export type Source = z.infer<typeof sourceSchema>;
export type SolutionStep = z.infer<typeof solutionStepSchema>;
export type Item = z.infer<typeof itemSchema>;
export type Topic = z.infer<typeof topicSchema>;
export type Unit = z.infer<typeof unitSchema>;

export interface ContentBundle {
  units: Unit[];
  topics: Topic[];
}
