import { useState } from 'react';
import { itemsAtDepth, loadBundle, topicsForSubject } from '@/content';
import type { Depth, Subject, Topic } from '@/content/types';
import SessionView from '@/ui/SessionView';
import TopicList from '@/ui/TopicList';
import '@/ui/styles.css';

export const appName = 'Cortex';

const DEPTH: Record<Subject, Depth> = { bio: 'level1', chem: 'honors' };

export default function App() {
  const bundle = loadBundle();
  const [active, setActive] = useState<Topic | null>(null);

  if (active) {
    return (
      <main>
        <SessionView
          topic={active}
          items={itemsAtDepth(active, DEPTH[active.subject])}
          onExit={() => setActive(null)}
        />
      </main>
    );
  }

  return (
    <main>
      <h1>{appName}</h1>
      <TopicList
        subject="bio"
        topics={topicsForSubject(bundle, 'bio')}
        onPick={setActive}
      />
      <TopicList
        subject="chem"
        topics={topicsForSubject(bundle, 'chem')}
        onPick={setActive}
      />
    </main>
  );
}
