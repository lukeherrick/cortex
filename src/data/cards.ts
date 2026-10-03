import { db, type CardRecord } from '@/data/db';

export type { CardRecord };

/** The card for one item, or undefined if it has never been studied. */
export async function getCard(itemId: string): Promise<CardRecord | undefined> {
  return db.cards.get(itemId);
}

export async function allCards(): Promise<CardRecord[]> {
  return db.cards.toArray();
}

/** Every card, keyed by item id — the shape the queue builder wants. */
export async function cardMap(): Promise<Map<string, CardRecord>> {
  const cards = await allCards();
  return new Map(cards.map((c) => [c.id, c]));
}

export async function saveCard(card: CardRecord): Promise<void> {
  await db.cards.put(card);
}

export async function cardsForTopic(topicId: string): Promise<CardRecord[]> {
  return db.cards.where('topicId').equals(topicId).toArray();
}

/** Cards whose due time has arrived. */
export async function dueCards(now: number): Promise<CardRecord[]> {
  return db.cards.where('due').belowOrEqual(now).toArray();
}

export async function clearCards(): Promise<void> {
  await db.cards.clear();
}
