import type { Biome } from '@/content/types';

/**
 * Cartoon biome mascots. Simple shapes on purpose — they need to read at
 * 44px, work in both themes, and never pull attention off the question.
 */

function Bee() {
  return (
    <g>
      <ellipse cx="32" cy="36" rx="15" ry="12" fill="#f5c542" />
      <path d="M26 25q6 4 12 0" stroke="#2b2b2b" strokeWidth="2.5" fill="none" />
      <rect x="24" y="27" width="5" height="18" rx="2" fill="#2b2b2b" />
      <rect x="35" y="27" width="5" height="18" rx="2" fill="#2b2b2b" />
      <ellipse cx="24" cy="22" rx="9" ry="7" fill="#fff" opacity="0.85" />
      <ellipse cx="41" cy="22" rx="9" ry="7" fill="#fff" opacity="0.85" />
      <circle cx="20" cy="33" r="7" fill="#2b2b2b" />
      <circle cx="18" cy="31" r="1.6" fill="#fff" />
      <path d="M17 24l-3-6M22 23l-1-7" stroke="#2b2b2b" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function Pufferfish() {
  return (
    <g>
      <circle cx="31" cy="34" r="16" fill="#f58a6f" />
      <path d="M47 34l10-7v14l-10-7Z" fill="#e8694c" />
      <circle cx="25" cy="30" r="3.2" fill="#2b2b2b" />
      <circle cx="24" cy="29" r="1.1" fill="#fff" />
      <path d="M20 40q5 4 10 1" stroke="#2b2b2b" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path
        d="M31 18v-4M43 24l3-3M43 44l3 3M31 50v4M19 46l-3 3"
        stroke="#e8694c"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="38" cy="26" r="2" fill="#fff" opacity="0.5" />
    </g>
  );
}

function TreeFrog() {
  return (
    <g>
      <ellipse cx="32" cy="38" rx="17" ry="13" fill="#4cc46b" />
      <circle cx="23" cy="25" r="8" fill="#4cc46b" />
      <circle cx="41" cy="25" r="8" fill="#4cc46b" />
      <circle cx="23" cy="25" r="5" fill="#fff" />
      <circle cx="41" cy="25" r="5" fill="#fff" />
      <circle cx="23" cy="26" r="2.6" fill="#2b2b2b" />
      <circle cx="41" cy="26" r="2.6" fill="#2b2b2b" />
      <path d="M24 42q8 5 16 0" stroke="#2b2b2b" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="48" r="3.5" fill="#f5c542" />
      <circle cx="48" cy="48" r="3.5" fill="#f5c542" />
    </g>
  );
}

function Lizard() {
  return (
    <g>
      <path
        d="M14 40q8-10 20-9t18 6q-6 6-18 7t-20-4Z"
        fill="#e0a24a"
      />
      <circle cx="50" cy="35" r="7" fill="#e0a24a" />
      <circle cx="52" cy="33" r="2.2" fill="#2b2b2b" />
      <path
        d="M14 40q-6 2-8 8"
        stroke="#e0a24a"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M24 46l-3 6M36 47l-2 6" stroke="#e0a24a" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="30" cy="35" r="1.6" fill="#b57c2a" />
      <circle cx="38" cy="37" r="1.6" fill="#b57c2a" />
    </g>
  );
}

function Penguin() {
  return (
    <g>
      <ellipse cx="32" cy="36" rx="14" ry="17" fill="#2f3c4c" />
      <ellipse cx="32" cy="39" rx="9" ry="13" fill="#fff" />
      <circle cx="32" cy="20" r="10" fill="#2f3c4c" />
      <circle cx="28" cy="19" r="2.4" fill="#fff" />
      <circle cx="36" cy="19" r="2.4" fill="#fff" />
      <circle cx="28" cy="19" r="1.2" fill="#2b2b2b" />
      <circle cx="36" cy="19" r="1.2" fill="#2b2b2b" />
      <path d="M29 24h6l-3 4Z" fill="#f5a142" />
      <ellipse cx="27" cy="53" rx="5" ry="2.5" fill="#f5a142" />
      <ellipse cx="37" cy="53" rx="5" ry="2.5" fill="#f5a142" />
    </g>
  );
}

function Salamander() {
  return (
    <g>
      <path
        d="M16 38q8-9 20-8t17 5q-5 7-17 8t-20-5Z"
        fill="#e8694c"
      />
      <circle cx="51" cy="33" r="7" fill="#e8694c" />
      <circle cx="53" cy="31" r="2.2" fill="#2b2b2b" />
      <path
        d="M16 38q-7 1-9 7"
        stroke="#e8694c"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M26 44l-3 6M37 45l-2 6" stroke="#e8694c" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="30" cy="33" r="2" fill="#f5c542" />
      <circle cx="39" cy="35" r="2" fill="#f5c542" />
      <circle cx="23" cy="36" r="2" fill="#f5c542" />
    </g>
  );
}

const MASCOTS: Record<Biome, { draw: () => JSX.Element; alt: string }> = {
  meadow: { draw: Bee, alt: 'A bee' },
  reef: { draw: Pufferfish, alt: 'A pufferfish' },
  rainforest: { draw: TreeFrog, alt: 'A tree frog' },
  desert: { draw: Lizard, alt: 'A lizard' },
  tundra: { draw: Penguin, alt: 'A penguin' },
  volcano: { draw: Salamander, alt: 'A fire salamander' },
};

export const BIOME_LABEL: Record<Biome, string> = {
  meadow: 'Meadow',
  reef: 'Coral reef',
  rainforest: 'Rainforest',
  desert: 'Desert',
  tundra: 'Tundra',
  volcano: 'Volcano',
};

export function BiomeMascot({
  biome,
  size = 56,
}: {
  biome: Biome;
  size?: number;
}) {
  const { draw, alt } = MASCOTS[biome];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={alt}
      className="mascot"
    >
      {draw()}
    </svg>
  );
}
