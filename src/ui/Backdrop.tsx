/**
 * A cartoon forest floor along the bottom of every screen.
 *
 * Built chunky on purpose: thick rounded shapes with gradient fills and a
 * grain pass over the top, which is how current cute-nature illustration
 * reads. Earlier versions of this file were thin outlines in pale colours,
 * and from a phone they were indistinguishable from a plain background.
 *
 * Two constraints shape the composition:
 *
 * - `slice` crops roughly 69% of this viewBox's width on a phone, so the
 *   mushrooms, bushes and ferns all sit in the central band. The things out
 *   at the edges are there for a desktop window and nothing is lost without
 *   them.
 * - It is weighted to the bottom. Cards are opaque and cover the middle of
 *   the screen, so the illustration can be genuinely saturated down there
 *   while the upper sky stays quiet behind headings and body text.
 *
 * Fixed, aria-hidden and pointer-inert. Drift stops under
 * prefers-reduced-motion via the global rule.
 */
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="orb orb-a" />
      <div className="orb orb-b" />

      <svg
        className="backdrop-art"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bd-hill-1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className="bd-h1-top" />
            <stop offset="100%" className="bd-h1-bot" />
          </linearGradient>
          <linearGradient id="bd-hill-2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className="bd-h2-top" />
            <stop offset="100%" className="bd-h2-bot" />
          </linearGradient>
          <linearGradient id="bd-hill-3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className="bd-h3-top" />
            <stop offset="100%" className="bd-h3-bot" />
          </linearGradient>
          <linearGradient id="bd-canopy" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" className="bd-can-top" />
            <stop offset="100%" className="bd-can-bot" />
          </linearGradient>
          <linearGradient id="bd-cap" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" className="bd-cap-top" />
            <stop offset="100%" className="bd-cap-bot" />
          </linearGradient>
          <radialGradient id="bd-sunglow">
            <stop offset="0%" className="bd-glow-in" />
            <stop offset="100%" className="bd-glow-out" />
          </radialGradient>
        </defs>

        {/* sun, low and warm */}
        <circle cx="690" cy="210" r="210" fill="url(#bd-sunglow)" />
        <circle cx="690" cy="210" r="62" className="bd-sun" />

        {/* chunky clouds */}
        <g className="bd-cloud drift-slow">
          <rect x="398" y="128" width="190" height="62" rx="31" />
          <circle cx="452" cy="134" r="36" />
          <circle cx="516" cy="126" r="46" />
        </g>
        <g className="bd-cloud drift-slower">
          <rect x="760" y="196" width="150" height="50" rx="25" />
          <circle cx="806" cy="200" r="30" />
          <circle cx="856" cy="194" r="37" />
        </g>

        {/* far hill */}
        <path
          d="M0 560q150-70 300-40t300 10 300-50 300 20v320H0Z"
          fill="url(#bd-hill-1)"
        />

        {/* round little trees on the far hill */}
        <g className="bd-tree">
          <rect x="446" y="520" width="13" height="46" rx="6" />
          <circle cx="452" cy="506" r="38" fill="url(#bd-canopy)" />
          <rect x="556" y="534" width="11" height="40" rx="5" />
          <circle cx="561" cy="522" r="29" fill="url(#bd-canopy)" />
          <rect x="716" y="516" width="14" height="48" rx="7" />
          <circle cx="723" cy="500" r="42" fill="url(#bd-canopy)" />
          <rect x="196" y="540" width="12" height="42" rx="6" />
          <circle cx="202" cy="528" r="32" fill="url(#bd-canopy)" />
          <rect x="1010" y="544" width="12" height="40" rx="6" />
          <circle cx="1016" cy="532" r="30" fill="url(#bd-canopy)" />
        </g>

        {/* middle hill */}
        <path
          d="M0 648q180-62 360-26t320-18 280 34 240-16v258H0Z"
          fill="url(#bd-hill-2)"
        />

        {/* rounded bushes */}
        <g className="bd-bush">
          <circle cx="408" cy="664" r="30" />
          <circle cx="440" cy="656" r="38" />
          <circle cx="476" cy="668" r="28" />
          <circle cx="828" cy="676" r="26" />
          <circle cx="856" cy="666" r="34" />
          <circle cx="886" cy="678" r="24" />
          <circle cx="120" cy="690" r="30" />
          <circle cx="156" cy="682" r="36" />
        </g>

        {/* near hill, the foreground floor */}
        <path
          d="M0 730q200-44 400-14t340-20 260 30 200-10v184H0Z"
          fill="url(#bd-hill-3)"
        />

        {/* toadstools, dead centre so a phone always gets them */}
        <g className="bd-shroom">
          <rect x="556" y="742" width="17" height="38" rx="8" className="bd-stem" />
          <path
            d="M520 746a44 34 0 0 1 88 0Z"
            fill="url(#bd-cap)"
          />
          <circle className="bd-spot" cx="546" cy="730" r="6" />
          <circle className="bd-spot" cx="574" cy="722" r="7.5" />
          <circle className="bd-spot" cx="592" cy="736" r="4.5" />

          <rect x="638" y="756" width="12" height="28" rx="6" className="bd-stem" />
          <path
            d="M614 758a30 23 0 0 1 60 0Z"
            fill="url(#bd-cap)"
          />
          <circle className="bd-spot" cx="632" cy="746" r="4.5" />
          <circle className="bd-spot" cx="654" cy="742" r="5.5" />

          <rect x="446" y="760" width="11" height="26" rx="5" className="bd-stem" />
          <path d="M424 762a27 21 0 0 1 54 0Z" fill="url(#bd-cap)" />
          <circle className="bd-spot" cx="442" cy="752" r="4" />
          <circle className="bd-spot" cx="462" cy="748" r="5" />
        </g>

        {/* ferns and grass blades */}
        <g className="bd-fern">
          <path d="M700 782q6-40 30-56M700 782q10-28 2-54M700 782q-4-34-26-48" />
          <path d="M498 788q5-34 26-48M498 788q8-24 2-46" />
          <path d="M880 784q6-36 28-50M880 784q9-26 2-48" />
          <path d="M300 790q5-32 24-45M300 790q7-22 1-42" />
        </g>

        {/* fireflies */}
        <g className="bd-fly drift">
          <circle cx="620" cy="620" r="5" />
          <circle cx="528" cy="586" r="3.5" />
          <circle cx="760" cy="604" r="4.5" />
          <circle cx="452" cy="612" r="3" />
          <circle cx="836" cy="572" r="4" />
        </g>
      </svg>

      <div className="backdrop-grain" />
    </div>
  );
}
