import { parseTopicFile, parseUnitFile } from '../src/content/parse';
import { validateBundle } from '../src/content/validate';
import type { ContentBundle, Topic, Unit } from '../src/content/types';

/** Build and validate a bundle from path -> file-contents. Pure; no disk access. */
export function collectBundle(
  files: ReadonlyMap<string, string>,
): ContentBundle {
  const units: Unit[] = [];
  const topics: Topic[] = [];

  for (const [path, contents] of files) {
    if (!path.endsWith('.md')) continue;
    if (path.endsWith('_unit.md')) {
      units.push(parseUnitFile(contents, path));
    } else {
      topics.push(parseTopicFile(contents, path));
    }
  }

  units.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
  topics.sort((a, b) => a.id.localeCompare(b.id));

  const bundle: ContentBundle = { units, topics };
  const errors = validateBundle(bundle);
  if (errors.length > 0) {
    throw new Error(
      `Content validation failed:\n${errors.map((e) => `  ${e}`).join('\n')}`,
    );
  }
  return bundle;
}
