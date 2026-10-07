/**
 * The atmosphere behind everything.
 *
 * Three layers, back to front: a warm gradient sky, soft blurred colour orbs
 * that drift, and a hand-drawn landscape. Deliberately very low contrast —
 * a background that competes with question text is a defect, not decoration,
 * so every element here sits well under the threshold where it could pull the
 * eye off a prompt.
 *
 * Fixed, aria-hidden and pointer-inert. All drift stops under
 * prefers-reduced-motion.
 */
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      {/* Blurred ambient orbs. CSS filters rather than SVG blur, which is
          far cheaper to composite on a phone. */}
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />

      <svg
        className="backdrop-art"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bd-hill-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className="bd-far-top" />
            <stop offset="100%" className="bd-far-bottom" />
          </linearGradient>
          <linearGradient id="bd-hill-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className="bd-near-top" />
            <stop offset="100%" className="bd-near-bottom" />
          </linearGradient>
          <radialGradient id="bd-glow">
            <stop offset="0%" className="bd-glow-in" />
            <stop offset="100%" className="bd-glow-out" />
          </radialGradient>
        </defs>

        {/* Sun and its glow. Kept near the horizontal middle: a phone only
            sees the central slice of this viewBox, and a sun parked out at
            x=1010 would simply not exist on the device this runs on. */}
        <circle cx="760" cy="140" r="200" fill="url(#bd-glow)" />
        <circle cx="760" cy="140" r="58" className="bd-sun" />

        {/* drifting clouds */}
        <g className="bd-cloud drift-slow">
          <ellipse cx="470" cy="150" rx="70" ry="30" />
          <ellipse cx="522" cy="138" rx="50" ry="36" />
          <ellipse cx="420" cy="162" rx="44" ry="22" />
        </g>
        <g className="bd-cloud drift-slower">
          <ellipse cx="660" cy="250" rx="56" ry="24" />
          <ellipse cx="704" cy="242" rx="40" ry="30" />
        </g>
        <g className="bd-cloud drift">
          <ellipse cx="180" cy="120" rx="62" ry="26" />
          <ellipse cx="228" cy="110" rx="44" ry="32" />
        </g>
        <g className="bd-cloud drift-slow">
          <ellipse cx="1040" cy="196" rx="58" ry="25" />
          <ellipse cx="1086" cy="186" rx="42" ry="30" />
        </g>

        {/* distant mountains */}
        <path
          d="M0 470l150-110 110 80 130-130 140 120 120-70 150 110 140-90 160 120v380H0Z"
          className="bd-mountains"
        />

        {/* layered hills */}
        <path
          d="M0 560q160-96 320-44t320-56 300 36 260-48v432H0Z"
          className="bd-hill-far"
          fill="url(#bd-hill-far)"
        />
        <path
          d="M0 652q200-80 400-24t340-30 300 54 160-18v446H0Z"
          className="bd-hill-near"
          fill="url(#bd-hill-near)"
        />

        {/* molecules floating in the middle distance */}
        <g className="bd-mol drift">
          <circle cx="500" cy="380" r="16" />
          <circle cx="556" cy="350" r="11" />
          <circle cx="552" cy="414" r="11" />
          <path d="M500 380l56-30M500 380l52 34" />
        </g>
        <g className="bd-mol drift-slow">
          <circle cx="716" cy="440" r="13" />
          <circle cx="766" cy="414" r="9" />
          <path d="M716 440l50-26" />
        </g>
        <g className="bd-mol drift-slower">
          <circle cx="250" cy="330" r="14" />
          <circle cx="302" cy="304" r="10" />
          <path d="M250 330l52-26" />
        </g>

        {/* bubbles */}
        <g className="bd-bubble">
          <circle cx="560" cy="300" r="8" />
          <circle cx="620" cy="240" r="5" />
          <circle cx="516" cy="236" r="4" />
          <circle cx="1060" cy="340" r="7" />
          <circle cx="250" cy="232" r="5" />
          <circle cx="730" cy="330" r="4" />
          <circle cx="646" cy="470" r="6" />
          <circle cx="470" cy="470" r="5" />
          <circle cx="700" cy="196" r="4" />
        </g>

        {/* grass and little flowers on the near hill */}
        <g className="bd-tuft">
          <path d="M120 690q7-28 14 0M142 696q7-30 14 0M452 676q7-28 14 0M476 682q7-30 14 0M600 690q7-28 14 0M624 696q7-30 14 0M720 682q7-28 14 0M744 688q7-30 14 0M940 704q7-28 14 0M966 710q7-30 14 0" />
        </g>
        <g className="bd-flower">
          <circle cx="300" cy="688" r="6" />
          <circle cx="528" cy="700" r="5" />
          <circle cx="672" cy="712" r="6" />
          <circle cx="770" cy="696" r="5" />
          <circle cx="1090" cy="684" r="6" />
        </g>
      </svg>

      {/* A whisper of grain, which stops the large flat gradients banding. */}
      <div className="backdrop-grain" />
    </div>
  );
}
