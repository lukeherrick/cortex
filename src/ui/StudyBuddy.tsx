import {
  TECHNIQUES,
  TIER_LABEL,
  type Technique,
  type Tier,
} from '@/focus/techniques';
import { Sparkle } from '@/ui/art';

interface Props {
  chosenId: string;
  onChoose: (id: string) => void;
  /** Jump straight to the timer after picking one. */
  onOpenTimer: () => void;
}

function minutesOf(ms: number): number {
  return Math.round(ms / 60_000);
}

function TechniqueCard({
  t,
  chosen,
  onChoose,
  onOpenTimer,
}: {
  t: Technique;
  chosen: boolean;
  onChoose: (id: string) => void;
  onOpenTimer: () => void;
}) {
  return (
    <article className={`technique tier-${t.tier} ${chosen ? 'is-chosen' : ''}`}>
      <header>
        <h3>{t.name}</h3>
        <span className="chip">{t.tag}</span>
        {chosen && <span className="chip chosen-chip">Your buddy</span>}
      </header>

      <p className="technique-what">{t.what}</p>

      <dl>
        <div>
          <dt>Why it works</dt>
          <dd>{t.why}</dd>
        </div>
        <div>
          <dt>Best for</dt>
          <dd>{t.bestFor}</dd>
        </div>
        <div className="watch">
          <dt>Watch out</dt>
          <dd>{t.watchOut}</dd>
        </div>
      </dl>

      {t.timer ? (
        <div className="technique-actions">
          <p className="technique-timing">
            {minutesOf(t.timer.focus)} min focus · {minutesOf(t.timer.shortBreak)}{' '}
            min break
          </p>
          {chosen ? (
            <button type="button" className="primary" onClick={onOpenTimer}>
              <Sparkle /> Open the timer
            </button>
          ) : (
            <button type="button" onClick={() => onChoose(t.id)}>
              Use this one
            </button>
          )}
        </div>
      ) : (
        <p className="technique-note">
          A habit rather than a timing pattern — no clock needed, just do it.
        </p>
      )}
    </article>
  );
}

export default function StudyBuddy({ chosenId, onChoose, onOpenTimer }: Props) {
  const tiers: readonly Tier[] = ['proven', 'useful', 'avoid'];

  return (
    <section className="buddy">
      <header className="card buddy-intro">
        <h2>
          <Sparkle /> Study buddy
        </h2>
        <p className="score-sub">
          Pick one and it runs your timer — the right block length, and its
          reminders on screen while you work.
        </p>
        <p className="nudge">
          Ordered by how well each one actually holds up, not by how popular it
          is. Every entry says what it is bad for too.
        </p>
      </header>

      {tiers.map((tier) => (
        <section key={tier} className="buddy-tier">
          <h3 className={`tier-heading tier-${tier}`}>{TIER_LABEL[tier]}</h3>
          {TECHNIQUES.filter((t) => t.tier === tier).map((t) => (
            <TechniqueCard
              key={t.id}
              t={t}
              chosen={t.id === chosenId}
              onChoose={onChoose}
              onOpenTimer={onOpenTimer}
            />
          ))}
        </section>
      ))}

      <footer className="home-footer">
        <p>
          The two at the top come from Dunlosky et al. (2013), which rated ten
          common techniques across 242 studies and found exactly two to be high
          utility. Highlighting and rereading were not among them.
        </p>
      </footer>
    </section>
  );
}
