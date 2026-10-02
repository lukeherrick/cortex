/**
 * A faded cartoon landscape behind everything.
 *
 * Fixed, non-interactive and aria-hidden — it is pure atmosphere. Kept very
 * low contrast on purpose: a background that competes with the question text
 * is a bug, not decoration. Colours come from theme tokens so it follows
 * light and dark.
 */
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* sun / glow */}
        <circle cx="1010" cy="130" r="72" className="bd-sun" />
        <circle cx="1010" cy="130" r="112" className="bd-sun-halo" />

        {/* clouds */}
        <g className="bd-cloud">
          <ellipse cx="180" cy="135" rx="62" ry="30" />
          <ellipse cx="228" cy="124" rx="44" ry="34" />
          <ellipse cx="135" cy="146" rx="40" ry="22" />
        </g>
        <g className="bd-cloud">
          <ellipse cx="700" cy="88" rx="52" ry="24" />
          <ellipse cx="742" cy="80" rx="36" ry="28" />
        </g>

        {/* floating molecules — two atoms and a bond */}
        <g className="bd-mol">
          <circle cx="330" cy="300" r="15" />
          <circle cx="382" cy="272" r="11" />
          <circle cx="378" cy="332" r="11" />
          <path d="M330 300l52-28M330 300l48 32" />
        </g>
        <g className="bd-mol">
          <circle cx="880" cy="380" r="13" />
          <circle cx="928" cy="356" r="9" />
          <path d="M880 380l48-24" />
        </g>
        <g className="bd-mol">
          <circle cx="140" cy="430" r="11" />
          <circle cx="186" cy="452" r="8" />
          <path d="M140 430l46 22" />
        </g>

        {/* bubbles */}
        <g className="bd-bubble">
          <circle cx="560" cy="250" r="7" />
          <circle cx="612" cy="196" r="5" />
          <circle cx="520" cy="188" r="4" />
          <circle cx="1040" cy="330" r="6" />
          <circle cx="250" cy="236" r="5" />
          <circle cx="770" cy="300" r="4" />
        </g>

        {/* far hills */}
        <path
          className="bd-hill-far"
          d="M0 560q150-90 300-40t300-60 300 30 300-50v420H0Z"
        />
        {/* near hills */}
        <path
          className="bd-hill-near"
          d="M0 650q180-80 360-20t340-30 300 50 200-10v380H0Z"
        />

        {/* grass tufts on the near hill */}
        <g className="bd-tuft">
          <path d="M120 646q6-24 12 0M138 650q6-26 12 0" />
          <path d="M520 636q6-24 12 0M538 640q6-26 12 0" />
          <path d="M900 664q6-24 12 0M918 668q6-26 12 0" />
        </g>
      </svg>
    </div>
  );
}
