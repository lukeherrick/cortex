// Rasterise assets/icon.svg into the PNG sizes a PWA install needs.
//
// Run with `npm run icons`. The outputs are committed, so a normal build and a
// fresh clone never need sharp — it is only here for regenerating the icons
// when the source SVG changes.
//
// Sizes, and why each exists:
//   192 / 512  — the Web App Manifest minimum for an installable PWA
//   maskable   — Android crops icons to its own shape; this one has padding
//   180        — apple-touch-icon, which is what iOS uses on the home screen
//                and the only one that matters for the owner's phone
//   32         — browser tab favicon

import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const SOURCE = resolve('assets/icon.svg');
const OUT = resolve('public');

const targets = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'icon-maskable-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-32.png', size: 32 },
];

await mkdir(OUT, { recursive: true });

for (const { name, size } of targets) {
  const png = await sharp(SOURCE, { density: 384 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(resolve(OUT, name), png);
  console.log(`  ${name}  ${size}x${size}  ${(png.length / 1024).toFixed(1)} kB`);
}

console.log(`\nWrote ${targets.length} icons to public/`);
