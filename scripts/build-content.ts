import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { collectBundle } from './collect';

const CONTENT_DIR = resolve('content');
const OUT_DIR = resolve('src/generated');
const OUT_FILE = join(OUT_DIR, 'content.json');

async function markdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const found = await Promise.all(
    entries.map(async (entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) return markdownFiles(full);
      return entry.name.endsWith('.md') ? [full] : [];
    }),
  );
  return found.flat();
}

async function main(): Promise<void> {
  const paths = await markdownFiles(CONTENT_DIR);
  const files = new Map<string, string>();
  for (const path of paths) {
    const key = relative(process.cwd(), path).replace(/\\/g, '/');
    files.set(key, await readFile(path, 'utf8'));
  }

  const bundle = collectBundle(files);
  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(OUT_FILE, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8');

  const items = bundle.topics.reduce((n, t) => n + t.items.length, 0);
  console.log(
    `Content OK: ${bundle.units.length} units, ${bundle.topics.length} topics, ${items} items`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
