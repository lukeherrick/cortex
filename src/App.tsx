import { useState } from 'react';
import {
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

export default function App() {
  const bundle = loadBundle();
  const [active, setActive] = useState<Topic | null>(null);

  if (active) {
    const unit = unitForTopic(bundle, active);
    return (
      <>
        <Backdrop />
        <main>
          <SessionView
            key={active.id}
            topic={active}
            items={itemsAtDepth(active, DEPTH[active.subject])}
            biome={unit?.biome ?? 'meadow'}
            onExit={() => setActive(null)}
          />
        </main>
      </>
    );
  }

  const subjects = SUBJECTS.map((subject) => ({
    subject,
    units: unitsForSubject(bundle, subject).map((unit) => ({
      unit,
      topics: topicsForUnit(bundle, unit.id),
    })),
  }));

  return (
    <>
      <Backdrop />
      <main>
        <Home subjects={subjects} onPick={setActive} />
      </main>
    </>
  );
}
