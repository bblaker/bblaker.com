import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { site } from '~/site';

// Resolved from the project root, not import.meta.url: this module gets bundled
// into dist/ at build time and a URL relative to the module would point nowhere.
const font = (name: string) => readFile(resolve(process.cwd(), 'src/assets/fonts', name));

const [cond, mono, sans] = await Promise.all([
  font('plex-cond-700.ttf'),
  font('plex-mono-400.ttf'),
  font('plex-sans-600.ttf'),
]);

/** Same tokens as the site. An OG card that doesn't match the page is a wasted impression. */
const C = {
  bg: '#0A0C0D',
  line: '#1F2629',
  text: '#E3E8E9',
  muted: '#8A9496',
  dim: '#5C6668',
  accent: '#63C8EC',
  software: '#7DD88F',
  infra: '#A99BFF',
  hardware: '#E8836F',
} as const;

export interface OgInput {
  /** Small mono line above the title: "LOG · 2026-09-08 · FERRY #6" */
  eyebrow: string;
  title: string;
  /** One line under the title. Truncated if long. */
  subtitle?: string;
  /** Left edge accent bar, matching the domain colour used across the site. */
  accent?: keyof typeof C;
}

/** Cut on a word boundary — "dropping a co…" reads like a rendering bug. */
const truncate = (s: string, n: number) => {
  if (s.length <= n) return s;
  const cut = s.slice(0, n);
  const space = cut.lastIndexOf(' ');
  const at = space > n * 0.6 ? space : n - 1;
  return `${cut.slice(0, at).replace(/[\s,;:—–-]+$/, '')}…`;
};

export async function renderOg({ eyebrow, title, subtitle, accent = 'accent' }: OgInput) {
  const bar = C[accent] ?? C.accent;

  const tree = {
      type: 'div',
      props: {
        style: {
          width: 1200,
          height: 630,
          display: 'flex',
          backgroundColor: C.bg,
          color: C.text,
        },
        children: [
          // Domain-coloured edge, the same 2px rule the cards use — scaled up.
          {
            type: 'div',
            props: { style: { width: 10, height: 630, backgroundColor: bar } },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '64px 72px',
                width: 1190,
                height: 630,
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flexDirection: 'column' },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontFamily: 'Plex Mono',
                            fontSize: 22,
                            letterSpacing: 3,
                            color: C.muted,
                            textTransform: 'uppercase',
                            marginBottom: 28,
                          },
                          children: eyebrow,
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontFamily: 'Plex Condensed',
                            fontSize: title.length > 52 ? 66 : 82,
                            lineHeight: 1.04,
                            letterSpacing: -1.5,
                            color: C.text,
                          },
                          children: truncate(title, 96),
                        },
                      },
                      subtitle
                        ? {
                            type: 'div',
                            props: {
                              style: {
                                fontFamily: 'Plex Sans',
                                fontSize: 28,
                                lineHeight: 1.4,
                                color: C.muted,
                                marginTop: 26,
                              },
                              children: truncate(subtitle, 130),
                            },
                          }
                        : null,
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      borderTop: `1px solid ${C.line}`,
                      paddingTop: 26,
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { fontFamily: 'Plex Condensed', fontSize: 30, color: C.text },
                          children: site.name,
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: { fontFamily: 'Plex Condensed', fontSize: 30, color: C.accent },
                          children: '.',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            marginLeft: 'auto',
                            fontFamily: 'Plex Mono',
                            fontSize: 20,
                            letterSpacing: 2,
                            color: C.dim,
                          },
                          children: 'BBLAKER.COM',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
  } as unknown as Parameters<typeof satori>[0];

  const svg = await satori(tree, {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Plex Condensed', data: cond, weight: 700, style: 'normal' },
        { name: 'Plex Mono', data: mono, weight: 400, style: 'normal' },
        { name: 'Plex Sans', data: sans, weight: 600, style: 'normal' },
      ],
  });

  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
