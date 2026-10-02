import Dexie, { type EntityTable } from 'dexie';

export interface AttemptRecord {
  id: string;
  itemId: string;
  topicId: string;
  answeredAt: number;
  correct: boolean;
  response: string;
  updatedAt: number;
}

export interface SettingRecord {
  id: string;
  value: unknown;
  updatedAt: number;
}

export const db = new Dexie('cortex') as Dexie & {
  attempts: EntityTable<AttemptRecord, 'id'>;
  settings: EntityTable<SettingRecord, 'id'>;
};

db.version(1).stores({
  attempts: 'id, itemId, topicId, answeredAt',
  settings: 'id',
});
