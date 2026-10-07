import type { Phase } from '@/focus/timer';

interface Props {
  phase: Phase;
  running: boolean;
}

/**
 * A meadow with bunnies, for the focus screen.
 *
 * It changes with the phase: during focus the bunny sits and studies, during a
 * break it hops and the sun comes out. That is the whole point — the scene is
 * the thing you glance at to know where you are, so it has to read instantly
 * from across a desk without any text.
 *
 * All motion stops under prefers-reduced-motion, and nothing here is
 * interactive.
 */
export default function MeadowScene({ phase, running }: Props) {
  const resting = phase !== 'focus';

  return (
    <div
      className={`meadow phase-${phase} ${running ? 'is-running' : ''}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMax slice">
        <rect width="400" height="220" className="meadow-sky" />

        <circle cx="330" cy="46" r="26" className="meadow-sun" />
        <circle cx="330" cy="46" r="40" className="meadow-sun-halo" />

        <g className="meadow-cloud">
          <ellipse cx="90" cy="48" rx="34" ry="16" />
          <ellipse cx="118" cy="42" rx="24" ry="18" />
          <ellipse cx="62" cy="54" rx="22" ry="12" />
        </g>
        <g className="meadow-cloud slow">
          <ellipse cx="240" cy="34" rx="26" ry="12" />
          <ellipse cx="262" cy="30" rx="18" ry="14" />
        </g>

        {/* rolling hills */}
        <path d="M0 150q90-42 190-10t210-22v102H0Z" className="meadow-hill-far" />
        <path d="M0 176q110-34 220-6t180-14v64H0Z" className="meadow-hill-near" />

        {/* grass tufts */}
        <g className="meadow-grass">
          <path d="M30 196q5-20 10 0M44 199q5-22 10 0M300 193q5-20 10 0M316 197q5-22 10 0M212 200q5-18 10 0" />
        </g>

        {/* flowers */}
        <g className="meadow-flowers">
          <g transform="translate(70 190)">
            <path d="M0 10V2" />
            <circle cx="0" cy="0" r="4" className="petal-a" />
          </g>
          <g transform="translate(128 198)">
            <path d="M0 10V2" />
            <circle cx="0" cy="0" r="3.4" className="petal-b" />
          </g>
          <g transform="translate(268 196)">
            <path d="M0 10V2" />
            <circle cx="0" cy="0" r="3.8" className="petal-a" />
          </g>
          <g transform="translate(352 192)">
            <path d="M0 10V2" />
            <circle cx="0" cy="0" r="3.4" className="petal-b" />
          </g>
        </g>

        {/* the studying bunny */}
        <g className={`bunny bunny-main ${resting ? 'is-resting' : ''}`} transform="translate(176 150)">
          <ellipse cx="22" cy="46" rx="20" ry="5" className="bunny-shadow" />
          <ellipse cx="22" cy="32" rx="17" ry="14" className="bunny-body" />
          <circle cx="22" cy="15" r="11" className="bunny-head" />
          <ellipse cx="15" cy="1" rx="4" ry="12" className="bunny-ear" />
          <ellipse cx="29" cy="1" rx="4" ry="12" className="bunny-ear" />
          <ellipse cx="15" cy="2" rx="1.8" ry="8" className="bunny-ear-inner" />
          <ellipse cx="29" cy="2" rx="1.8" ry="8" className="bunny-ear-inner" />
          <circle cx="18" cy="15" r="1.6" className="bunny-eye" />
          <circle cx="26" cy="15" r="1.6" className="bunny-eye" />
          <circle cx="22" cy="19" r="1.4" className="bunny-nose" />
          <circle cx="13" cy="19" r="2.6" className="bunny-blush" />
          <circle cx="31" cy="19" r="2.6" className="bunny-blush" />
          <circle cx="40" cy="36" r="6" className="bunny-tail" />
          {/* a little book, only while focusing */}
          {!resting && (
            <g className="bunny-book">
              <rect x="10" y="33" width="24" height="14" rx="2" />
              <path d="M22 33v14" />
            </g>
          )}
        </g>

        {/* a second bunny, which only hops out during breaks */}
        <g className="bunny bunny-friend" transform="translate(96 164)">
          <ellipse cx="14" cy="34" rx="14" ry="4" className="bunny-shadow" />
          <ellipse cx="14" cy="24" rx="12" ry="10" className="bunny-body" />
          <circle cx="14" cy="12" r="8" className="bunny-head" />
          <ellipse cx="9" cy="1" rx="3" ry="9" className="bunny-ear" />
          <ellipse cx="19" cy="1" rx="3" ry="9" className="bunny-ear" />
          <circle cx="11" cy="12" r="1.3" className="bunny-eye" />
          <circle cx="17" cy="12" r="1.3" className="bunny-eye" />
          <circle cx="24" cy="27" r="4.5" className="bunny-tail" />
        </g>

        {/* butterflies drift about on breaks */}
        <g className="meadow-butterfly">
          <g transform="translate(290 120)">
            <path d="M0 0c-6-6-10-2-6 3 2 3 5 2 6-3Z" />
            <path d="M0 0c6-6 10-2 6 3-2 3-5 2-6-3Z" />
          </g>
        </g>
      </svg>
    </div>
  );
}
