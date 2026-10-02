import matter from 'gray-matter';
import type { z } from 'zod';
import { topicSchema, unitSchema } from './schema';
import type { Topic, Unit } from './types';

function fail(path: string, error: z.ZodError): never {
  const issues = error.issues
    .map((i) => `  ${i.path.join('.') || '(root)'}: ${i.message}`)
    .join('\n');
  throw new Error(`Invalid content in ${path}:\n${issues}`);
}

/** Parse one topic file: frontmatter is metadata plus items, body is the concept. */
export function parseTopicFile(markdown: string, path: string): Topic {
  const { data, content } = matter(markdown);
  const result = topicSchema.safeParse({ ...data, concept: content.trim() });
  if (!result.success) fail(path, result.error);
  return result.data;
}

/** Parse a `_unit.md` file. */
export function parseUnitFile(markdown: string, path: string): Unit {
  const { data } = matter(markdown);
  const result = unitSchema.safeParse(data);
  if (!result.success) fail(path, result.error);
  return result.data;
}
