import type { MasteryStage } from '@/stats/mastery';

/**
 * A little plant showing how well a topic is known.
 *
 * Drawn from real scheduling state rather than a question count, so it is an
 * honest picture of memory rather than a participation badge. It is also the
 * thing that makes the home screen worth reopening: a list that visibly grows.
 */
export function GrowthIcon({
  stage,
  size = 26,
}: {
  stage: MasteryStage;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`growth growth-${stage}`}
      role="img"
      aria-label={LABEL[stage]}
    >
      {/* soil */}
      <path d="M6 27h20" className="growth-soil" />

      {stage === 'untouched' && <circle cx="16" cy="24" r="2.5" className="growth-seed" />}

      {stage !== 'untouched' && (
        <path d="M16 27v-8" className="growth-stem" />
      )}

      {(stage === 'seedling' || stage === 'sprout') && (
        <path d="M16 21c-4 0-6-2-6-5 3 0 6 1 6 5Z" className="growth-leaf" />
      )}

      {(stage === 'sprout' || stage === 'budding' || stage === 'flowering') && (
        <>
          <path d="M16 20c-5 0-8-2-8-6 4 0 8 2 8 6Z" className="growth-leaf" />
          <path d="M16 23c5 0 8-2 8-6-4 0-8 2-8 6Z" className="growth-leaf" />
        </>
      )}

      {stage === 'budding' && <circle cx="16" cy="13" r="4" className="growth-bud" />}

      {stage === 'flowering' && (
        <g className="growth-bloom">
          <circle cx="16" cy="9" r="3.6" />
          <circle cx="11" cy="12" r="3.2" />
          <circle cx="21" cy="12" r="3.2" />
          <circle cx="13" cy="17" r="3" />
          <circle cx="19" cy="17" r="3" />
          <circle cx="16" cy="13" r="3" className="growth-centre" />
        </g>
      )}
    </svg>
  );
}

const LABEL: Record<MasteryStage, string> = {
  untouched: 'Not started',
  seedling: 'Just started',
  sprout: 'Getting there',
  budding: 'Nearly there',
  flowering: 'Mastered',
};
