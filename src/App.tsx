import { useState } from 'react';
import {
  findTopic,
  itemsAtDepth,
  loadBundle,
  topicsForUnit,
  unitForTopic,
  unitsForSubject,
} from '@/content';
import type { Depth, Subject, Topic } from '@/content/types';
import Backdrop from '@/ui/Backdrop';
import Home from '@/ui/Home';
import SessionView from '@/ui/SessionView';
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

/**
 * Three screens: the unit list, a topic's notes, then a practice session.
 *
 * The topic screen exists because the authored notes are the only teaching the
 * owner gets for AP Biology. Going straight from the list into questions hid
 * all of it.
 */
type View =
  | { kind: 'home' }
  | { kind: 'topic'; topic: Topic }
  | { kind: 'session'; topic: Topic };

export default function App() {
  const bundle = loadBundle();
  const [view, setView] = useState<View>({ kind: 'home' });

  const shell = (children: React.ReactNode) => (
    <>
      <Backdrop />
      <main>{children}</main>
    </>
  );

  if (view.kind === 'session') {
    const unit = unitForTopic(bundle, view.topic);
    return shell(
      <SessionView
        key={view.topic.id}
        topic={view.topic}
        items={itemsAtDepth(view.topic, DEPTH[view.topic.subject])}
        biome={unit?.biome ?? 'meadow'}
        onExit={() => setView({ kind: 'topic', topic: view.topic })}
      />,
    );
  }

  if (view.kind === 'topic') {
    const { topic } = view;
    const prereqs = topic.prereqs
      .map((id) => findTopic(bundle, id))
      .filter((t): t is Topic => t !== undefined)
      .map((t) => ({ id: t.id, title: t.title }));

    return shell(
      <TopicView
        key={topic.id}
        topic={topic}
        unit={unitForTopic(bundle, topic)}
        items={itemsAtDepth(topic, DEPTH[topic.subject])}
        prereqs={prereqs}
        onStart={() => setView({ kind: 'session', topic })}
        onBack={() => setView({ kind: 'home' })}
      />,
    );
  }

  const subjects = SUBJECTS.map((subject) => ({
    subject,
    units: unitsForSubject(bundle, subject).map((unit) => ({
      unit,
      topics: topicsForUnit(bundle, unit.id),
    })),
  }));

  return shell(
    <Home
      subjects={subjects}
      onPick={(topic) => setView({ kind: 'topic', topic })}
    />,
  );
}
