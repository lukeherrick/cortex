/**
 * Inline SVG art. Inline rather than files so it inherits theme colours via
 * `currentColor` and CSS variables, and so a published build has no image
 * requests to fail.
 */

/** A tiny four-point sparkle, for buttons and section headings. */
export function Sparkle({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="sparkle"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 1.5l2.2 7.1 7.1 2.2-7.1 2.2L12 20.1l-2.2-7.1L2.7 10.8l7.1-2.2Z"
        fill="currentColor"
      />
      <circle cx="20" cy="4" r="1.6" fill="currentColor" opacity="0.7" />
      <circle cx="4.2" cy="18.5" r="1.2" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

export function FlaskArt({ size = 68 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="A bubbling flask"
    >
      <path
        d="M26 8h12v14l12 24a8 8 0 0 1-7 12H21a8 8 0 0 1-7-12l12-24V8Z"
        fill="var(--flask-soft)"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 40h27l4.5 6a8 8 0 0 1-7 12H21a8 8 0 0 1-7-12l4.5-6Z"
        fill="var(--flask)"
      />
      <path d="M24 6h16" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="27" cy="48" r="3" fill="var(--sun)" />
      <circle cx="37" cy="52" r="2" fill="var(--sun)" />
      <circle cx="33" cy="44" r="1.5" fill="var(--sun)" />
    </svg>
  );
}

export function LeafArt({ size = 68 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="A leaf and a water droplet"
    >
      <path
        d="M52 10C30 10 14 22 14 40c0 6 2 11 5 14 3-20 14-30 29-34-12 7-20 17-23 34 20 1 31-14 31-32 0-5-1-9-4-12Z"
        fill="var(--leaf-soft)"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M19 54c3-20 14-30 29-34-12 7-20 17-23 34"
        fill="var(--leaf)"
      />
      <circle cx="46" cy="46" r="5" fill="var(--flask)" />
    </svg>
  );
}

/** A flask that fills up as a session progresses. */
export function FlaskProgress({
  done,
  total,
}: {
  done: number;
  total: number;
}) {
  const ratio = total === 0 ? 0 : Math.min(1, done / total);
  const top = 50 - 32 * ratio;

  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 64 64"
      role="img"
      aria-label={`${done} of ${total} answered`}
    >
      <defs>
        <clipPath id="flask-body">
          <path d="M26 8h12v14l12 24a8 8 0 0 1-7 12H21a8 8 0 0 1-7-12l12-24V8Z" />
        </clipPath>
      </defs>
      <path
        d="M26 8h12v14l12 24a8 8 0 0 1-7 12H21a8 8 0 0 1-7-12l12-24V8Z"
        fill="var(--card)"
        stroke="var(--ink-soft)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect
        x="10"
        y={top}
        width="44"
        height="60"
        fill="var(--leaf)"
        clipPath="url(#flask-body)"
      />
      <path
        d="M24 6h16"
        stroke="var(--ink-soft)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
