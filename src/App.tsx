import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  findTopic,
  itemsAtDepth,
  loadBundle,
  topicsForUnit,
  unitForTopic,
  unitsForSubject,
} from '@/content';
import type { Depth, Subject, Topic, Unit } from '@/content/types';
import { cardMap, type CardRecord } from '@/data/cards';
import {
  cramQueue,
  dueCount,
  reviewQueue,
  DEFAULT_DAILY_CAP,
  type QueueEntry,
  type TopicItems,
} from '@/scheduler/queue';
import Backdrop from '@/ui/Backdrop';
import DuePanel from '@/ui/DuePanel';
import Home from '@/ui/Home';
import SessionView, { type SessionMode } from '@/ui/SessionView';
import TopicView from '@/ui/TopicView';
import '@/ui/styles.css';

export const appName = 'Cortex';

/**
 * Which depth each subject is studied at.
 *
 * Biology is AP-only: Level 1 Biology was dropped because the owner cannot take
 * AP Biology at school, so there is no reason to learn a reduced version first.
 */
const DEPTH: Record<Subject, Depth> = { bio: 'ap', chem: 'honors' };

const SUBJECTS: readonly Subject[] = ['bio', 'chem'];

type View =
  | { kind: 'home' }
  | { kind: 'topic'; topic: Topic }
  | {
      kind: 'session';
      title: string;
      mode: SessionMode;
      entries: readonly QueueEntry[];
      biome: Unit['biome'];
      back: View;
    };

export default function App() {
  const bundle = loadBundle();
  const [view, setView] = useState<View>({ kind: 'home' });
  const [cards, setCards] = useState<Map<string, CardRecord>>(new Map());
  const [reloads, setReloads] = useState(0);

  // Reloaded whenever a session ends, so due counts reflect what just happened.
  useEffect(() => {
    let live = true;
    void cardMap().then((loaded) => {
      if (live) setCards(loaded);
    });
    return () => {
      live = false;
    };
  }, [reloads]);

  const subjects = useMemo(
    () =>
      SUBJECTS.map((subject) => ({
        subject,
        units: unitsForSubject(bundle, subject).map((unit) => ({
          unit,
          topics: topicsForUnit(bundle, unit.id),
        })),
      })),
    [bundle],
  );

  const topicItems: TopicItems[] = useMemo(
    () =>
      bundle.topics.map((topic) => ({
        topic,
        items: itemsAtDepth(topic, DEPTH[topic.subject]),
      })),
    [bundle],
  );

  const now = Date.now();
  const queueInput = { topics: topicItems, cards, now };

  const due = dueCount(queueInput);
  const perSubject = SUBJECTS.map((subject) => ({
    subject,
    due: dueCount({
      ...queueInput,
      topics: topicItems.filter((t) => t.topic.subject === subject),
    }),
  }));
  const unseen = topicItems.reduce(
    (n, { items }) => n + items.filter((i) => !cards.has(i.id)).length,
    0,
  );

  const finishSession = useCallback((back: View) => {
    setReloads((n) => n + 1);
    setView(back);
  }, []);

  const shell = (children: React.ReactNode) => (
    <>
      <Backdrop />
      <main>{children}</main>
    </>
  );

  if (view.kind === 'session') {
    return shell(
      <SessionView
        key={`${view.mode}-${view.title}-${reloads}`}
        title={view.title}
        mode={view.mode}
        entries={view.entries}
        biome={view.biome}
        onExit={() => finishSession(view.back)}
      />,
    );
  }

  if (view.kind === 'topic') {
    const { topic } = view;
    const unit = unitForTopic(bundle, topic);
    const items = itemsAtDepth(topic, DEPTH[topic.subject]);
    const prereqs = topic.prereqs
      .map((id) => findTopic(bundle, id))
      .filter((t): t is Topic => t !== undefined)
      .map((t) => ({ id: t.id, title: t.title }));

    return shell(
      <TopicView
        key={topic.id}
        topic={topic}
        unit={unit}
        items={items}
        prereqs={prereqs}
        onStart={() =>
          setView({
            kind: 'session',
            title: topic.title,
            mode: 'learn',
            entries: cramQueue([{ topic, items }]),
            biome: unit?.biome ?? 'meadow',
            back: { kind: 'topic', topic },
          })
        }
        onBack={() => setView({ kind: 'home' })}
      />,
    );
  }

  return shell(
    <>
      <DuePanel
        due={due}
        perSubject={perSubject}
        unseen={unseen}
        cap={DEFAULT_DAILY_CAP}
        onStartReview={() =>
          setView({
            kind: 'session',
            title: "Today's review",
            mode: 'review',
            entries: reviewQueue(queueInput),
            biome: 'meadow',
            back: { kind: 'home' },
          })
        }
      />
      <Home
        subjects={subjects}
        cards={cards}
        onPick={(topic) => setView({ kind: 'topic', topic })}
        onCram={(unit, topics) =>
          setView({
            kind: 'session',
            title: `Cram: ${unit.title}`,
            mode: 'cram',
            entries: cramQueue(
              topics.map((topic) => ({
                topic,
                items: itemsAtDepth(topic, DEPTH[topic.subject]),
              })),
            ),
            biome: unit.biome,
            back: { kind: 'home' },
          })
        }
      />
    </>,
  );
}
