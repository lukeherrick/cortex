import type { Subject } from '@/content/types';
import { Sparkle } from '@/ui/art';

interface Props {
  due: number;
  perSubject: readonly { subject: Subject; due: number }[];
  /** Items that exist but have never been studied at all. */
  unseen: number;
  cap: number;
  onStartReview: () => void;
}

const SUBJECT_NAME: Record<Subject, string> = {
  bio: 'Biology',
  chem: 'Chemistry',
};

export default function DuePanel({
  due,
  perSubject,
  unseen,
  cap,
  onStartReview,
}: Props) {
  if (due === 0) {
    return (
      <section className="card due-panel is-clear">
        <h2>
          <Sparkle /> Nothing due
        </h2>
        <p className="score-sub">
          {unseen > 0
            ? `You are caught up. There are ${unseen} questions you have never seen — pick a topic below to start one.`
            : 'You are completely caught up. Come back tomorrow.'}
        </p>
      </section>
    );
  }

  const showing = Math.min(due, cap);

  return (
    <section className="card due-panel">
      <h2>
        <Sparkle /> {due} due today
      </h2>
      <ul className="due-breakdown">
        {perSubject
          .filter((s) => s.due > 0)
          .map(({ subject, due: n }) => (
            <li key={subject}>
              <strong>{n}</strong> {SUBJECT_NAME[subject]}
            </li>
          ))}
      </ul>
      <button type="button" className="primary big" onClick={onStartReview}>
        <Sparkle /> Start today&rsquo;s review
      </button>
      {due > cap && (
        <p className="nudge">
          Showing {showing} this sitting so it stays doable. The rest stays due
          and will be waiting — nothing is lost.
        </p>
      )}
      <p className="nudge">
        These are the ones you are closest to forgetting. That is the whole
        point of doing them today rather than later.
      </p>
    </section>
  );
}
