/**
 * Fisher-Yates shuffle, returning a new array.
 *
 * Multiple-choice options are shuffled on every presentation. With a fixed
 * order you eventually recall "the answer is the third one" instead of the
 * chemistry, which quietly turns retrieval practice into position memory.
 */
export function shuffle<T>(
  items: readonly T[],
  random: () => number = Math.random,
): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
