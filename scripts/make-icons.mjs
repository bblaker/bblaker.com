/**
 * Generates the favicon set from the site's own wordmark.
 *
 * Uses satori to lay out real IBM Plex Condensed glyphs (converted to paths, so
 * no font is needed at render time) and resvg to rasterise. Re-run with
 * `node scripts/make-icons.mjs` if the mark ever changes.
 */
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const cond = await readFile(resolve('src/assets/fonts/plex-cond-700.ttf'));

const BG = '#0A0C0D';
const INK = '#E3E8E9';
const ACCENT = '#63C8EC';

/** @param {number} size */
const mark = (size) => ({
  type: 'div',
  props: {
    style: {
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: BG,
      // A hairline inset edge, the same device the whole site uses.
      boxShadow: `inset 0 0 0 ${Math.max(1, Math.round(size * 0.016))}px #1F2629`,
    },
    children: [
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            alignItems: 'baseline',
            fontFamily: 'Plex Condensed',
            fontSize: size * 0.84,
            lineHeight: 1,
            letterSpacing: size * -0.035,
            // Optical centring: the 'b' ascender sits high, so nudge down.
            transform: `translateY(${size * 0.068}px)`,
          },
          children: [
            { type: 'div', props: { style: { color: INK }, children: 'b' } },
            { type: 'div', props: { style: { color: ACCENT }, children: '.' } },
          ],
        },
      },
    ],
  },
});

async function svg(size) {
  return satori(mark(size), {
    width: size,
    height: size,
    fonts: [{ name: 'Plex Condensed', data: cond, weight: 700, style: 'normal' }],
  });
}

const png = (s, size) =>
  new Resvg(s, { fitTo: { mode: 'width', value: size } }).render().asPng();

// Scalable source, used by modern browsers.
const source = await svg(512);
await writeFile('public/favicon.svg', source);

for (const [name, size] of [
  ['public/favicon-32.png', 32],
  ['public/favicon-96.png', 96],
  ['public/apple-touch-icon.png', 180],
  ['public/icon-192.png', 192],
  ['public/icon-512.png', 512],
]) {
  await writeFile(name, png(await svg(size), size));
  console.log(`${name}  ${size}×${size}`);
}
console.log('public/favicon.svg  scalable');
