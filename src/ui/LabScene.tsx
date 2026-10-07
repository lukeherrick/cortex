import type { Biome } from '@/content/types';

interface Props {
  /** 0 to 1 — how far through the session. Fills the glassware. */
  progress: number;
  /** Briefly true after a correct answer, for the bubbling reaction. */
  reacting: boolean;
  biome: Biome;
}

/**
 * The bench you work at during a session.
 *
 * Sits behind the question card, not around it. Three hard rules, because a
 * scene that costs you study time is a defect rather than decoration:
 *   - it never moves anything the learner is reading
 *   - every animation is short, and all of it stops under prefers-reduced-motion
 *   - it renders from state and never writes any
 */
export default function LabScene({ progress, reacting, biome }: Props) {
  const fill = Math.max(0, Math.min(1, progress));
  // The flask body spans roughly y=120 to y=165 in this viewBox.
  const liquidTop = 165 - 45 * fill;

  return (
    <div className={`lab-scene biome-${biome}`} aria-hidden="true">
      <svg viewBox="0 0 400 180" preserveAspectRatio="xMidYMax meet">
        {/* back wall and shelf */}
        <rect x="0" y="0" width="400" height="152" className="lab-wall" />
        <rect x="0" y="146" width="400" height="6" className="lab-shelf" />

        {/* window with a hint of the unit's biome colour outside */}
        <rect x="24" y="22" width="86" height="64" rx="6" className="lab-window" />
        <path d="M24 70 q22-18 43-6 t43-2v14a6 6 0 0 1-6 6H30a6 6 0 0 1-6-6Z" className="lab-window-land" />
        <circle cx="92" cy="40" r="9" className="lab-window-sun" />
        <path d="M67 22v64M24 54h86" className="lab-window-bars" />

        {/* shelf bottles */}
        <g className="lab-bottles">
          <rect x="300" y="118" width="18" height="28" rx="3" />
          <rect x="324" y="108" width="14" height="38" rx="3" />
          <rect x="344" y="124" width="20" height="22" rx="3" />
        </g>

        {/* rack of test tubes */}
        <g className="lab-tubes">
          <rect x="140" y="112" width="9" height="34" rx="4.5" />
          <rect x="155" y="106" width="9" height="40" rx="4.5" />
          <rect x="170" y="116" width="9" height="30" rx="4.5" />
        </g>

        {/* the flask, which fills as the session progresses */}
        <g className="lab-flask">
          <clipPath id="lab-flask-body">
            <path d="M232 92h20v22l20 38a12 12 0 0 1-10 18h-40a12 12 0 0 1-10-18l20-38V92Z" />
          </clipPath>
          <rect
            x="206"
            y={liquidTop}
            width="80"
            height="60"
            clipPath="url(#lab-flask-body)"
            className="lab-liquid"
          />
          <path
            d="M232 92h20v22l20 38a12 12 0 0 1-10 18h-40a12 12 0 0 1-10-18l20-38V92Z"
            className="lab-glass"
          />
          <path d="M229 90h26" className="lab-glass-lip" />
        </g>

        {reacting && (
          <g className="lab-bubbles">
            <circle cx="236" cy="150" r="3.5" />
            <circle cx="246" cy="146" r="2.5" />
            <circle cx="255" cy="152" r="3" />
            <circle cx="242" cy="138" r="2" />
          </g>
        )}

        {/* bench top */}
        <rect x="0" y="152" width="400" height="28" className="lab-bench" />
      </svg>
    </div>
  );
}
