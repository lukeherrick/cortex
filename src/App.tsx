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
import { allAttempts, type AttemptRecord } from '@/data/attempts';
import { lastExportAt as readLastExport } from '@/data/backup';
import { cardMap, type CardRecord } from '@/data/cards';
import { dayMap, recordAnswer } from '@/data/days';
import { entryMap, loadHabits, setEntry } from '@/data/habits';
import { getSetting, setSetting, TECHNIQUE_KEY } from '@/data/settings';
import { DEFAULT_TECHNIQUE_ID, techniqueById } from '@/focus/techniques';
import { toDateKey } from '@/habits/dates';
import type { EntryMap } from '@/habits/logic';
import type { Habit } from '@/habits/types';
import {
  cramQueue,
  dueCount,
  reviewQueue,
  DEFAULT_DAILY_CAP,
  type QueueEntry,
  type TopicItems,
} from '@/scheduler/queue';
import { accuracyOf, coverage, recentAccuracy, weakestTopics } from '@/stats/accuracy';
import {
  clearedToday as wasClearedToday,
  longestStreak,
  studyStreak,
  studyTotals,
  type DayRecord,
} from '@/stats/streak';
import Backdrop from '@/ui/Backdrop';
import BackupPanel from '@/ui/BackupPanel';
import DuePanel from '@/ui/DuePanel';
import FocusTimer from '@/ui/FocusTimer';
import Habits from '@/ui/Habits';
import Home, { InstallHint } from '@/ui/Home';
import SessionView, { type SessionMode } from '@/ui/SessionView';
import StatsPanel from '@/ui/StatsPanel';
import StreakBanner from '@/ui/StreakBanner';
import StudyBuddy from '@/ui/StudyBuddy';
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

type Tab = 'study' | 'focus' | 'buddy' | 'habits' | 'backup';

const TABS: readonly { id: Tab; label: string }[] = [
  { id: 'study', label: 'Study' },
  { id: 'focus', label: 'Focus' },
  { id: 'buddy', label: 'Buddy' },
  { id: 'habits', label: 'Habits' },
  { id: 'backup', label: 'Backup' },
];

export default function App() {
  const bundle = loadBundle();
  const [view, setView] = useState<View>({ kind: 'home' });
  const [tab, setTab] = useState<Tab>('study');

  const [cards, setCards] = useState<Map<string, CardRecord>>(new Map());
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [days, setDays] = useState<Map<string, DayRecord>>(new Map());
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitEntries, setHabitEntries] = useState<EntryMap>(new Map());
  const [lastExport, setLastExport] = useState<number | null>(null);
  const [techniqueId, setTechniqueId] = useState<string>(DEFAULT_TECHNIQUE_ID);
  const [reloads, setReloads] = useState(0);

  // Reloaded whenever a session ends or a habit is logged, so every number on
  // screen reflects what just happened.
  useEffect(() => {
    let live = true;
    void (async () => {
      const now = Date.now();
      const [c, a, d, h, e, x, t] = await Promise.all([
        cardMap(),
        allAttempts(),
        dayMap(),
        loadHabits(now),
        entryMap(),
        readLastExport(),
        getSetting<string>(TECHNIQUE_KEY, DEFAULT_TECHNIQUE_ID),
      ]);
      if (!live) return;
      setCards(c);
      setAttempts(a);
      setDays(d);
      setHabits(h);
      setHabitEntries(e);
      setLastExport(x);
      setTechniqueId(t);
    })();
    return () => {
      live = false;
    };
  }, [reloads]);

  const refresh = useCallback(() => setReloads((n) => n + 1), []);

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
  const today = toDateKey(now);
  const queueInput = { topics: topicItems, cards, now };

  const due = dueCount(queueInput);
  const perSubject = SUBJECTS.map((subject) => ({
    subject,
    due: dueCount({
      ...queueInput,
      topics: topicItems.filter((t) => t.topic.subject === subject),
    }),
  }));
  const totalItems = topicItems.reduce((n, { items }) => n + items.length, 0);
  const unseen = topicItems.reduce(
    (n, { items }) => n + items.filter((i) => !cards.has(i.id)).length,
    0,
  );

  const topicTitles = useMemo(
    () => new Map(bundle.topics.map((t) => [t.id, t.title])),
    [bundle],
  );

  /**
   * Called after every answer that counts toward scheduling.
   *
   * Cards are re-read rather than derived from state because the state in this
   * closure is a session old. `cleared` has to be captured now: due-ness is a
   * property of the present and cannot be reconstructed later.
   */
  const handleAnswered = useCallback(async () => {
    const fresh = await cardMap();
    const at = Date.now();
    const stillDue = dueCount({ topics: topicItems, cards: fresh, now: at });
    await recordAnswer(toDateKey(at), stillDue, at);
  }, [topicItems]);

  const handleSetHabit = useCallback(
    (habitId: string, date: string, value: number) => {
      void (async () => {
        await setEntry(habitId, date, value, Date.now());
        setHabitEntries(await entryMap());
      })();
    },
    [],
  );

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
        cardsAtStart={cards}
        streak={studyStreak(days, today)}
        onAnswered={handleAnswered}
        onExit={() => {
          refresh();
          setView(view.back);
        }}
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

  const tabs = (
    <nav className="tabs" aria-label="Sections">
      {TABS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={tab === id ? 'on' : ''}
          onClick={() => setTab(id)}
        >
          {label}
        </button>
      ))}
    </nav>
  );

  if (tab === 'focus') {
    return shell(
      <>
        {tabs}
        <FocusTimer
          technique={techniqueById(techniqueId)}
          onOpenBuddy={() => setTab('buddy')}
        />
      </>,
    );
  }

  if (tab === 'buddy') {
    return shell(
      <>
        {tabs}
        <StudyBuddy
          chosenId={techniqueId}
          onChoose={(id) => {
            setTechniqueId(id);
            void setSetting(TECHNIQUE_KEY, id);
          }}
          onOpenTimer={() => setTab('focus')}
        />
      </>,
    );
  }

  if (tab === 'backup') {
    return shell(
      <>
        {tabs}
        <InstallHint />
        <BackupPanel
          lastExportAt={lastExport}
          hasProgress={cards.size > 0 || habitEntries.size > 0}
          onChanged={refresh}
        />
      </>,
    );
  }

  if (tab === 'habits') {
    return shell(
      <>
        {tabs}
        <Habits
          habits={habits}
          entries={habitEntries}
          today={today}
          hour={new Date(now).getHours()}
          onSet={handleSetHabit}
        />
      </>,
    );
  }

  const weakest = weakestTopics(attempts).map((row) => ({
    ...row,
    title: topicTitles.get(row.topicId) ?? row.topicId,
  }));

  return shell(
    <>
      {tabs}
      <StreakBanner
        streak={studyStreak(days, today)}
        longest={longestStreak(days)}
        clearedToday={wasClearedToday(days, today)}
        days={days}
        today={today}
      />
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
      <StatsPanel
        streak={studyStreak(days, today)}
        longest={longestStreak(days)}
        clearedToday={wasClearedToday(days, today)}
        totals={studyTotals(days)}
        accuracy={accuracyOf(attempts)}
        recent={recentAccuracy(attempts, now, 7)}
        coverage={coverage(totalItems, [...cards.values()])}
        weakest={weakest}
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
