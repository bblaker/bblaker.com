/**
 * Single source of truth for identity. Everything that needs a name, a handle
 * or a URL reads it from here, so changing one is a one-line edit.
 */
export const site = {
  name: 'Ben Blaker',
  /** Wordmark in the nav. Deliberately the handle, not the full name. */
  wordmark: 'bblaker',
  url: 'https://bblaker.com',
  tagline: 'I build software, and the infrastructure and machines it runs on.',
  description:
    'Systems engineer working in Go and TypeScript. Software projects, homelab infrastructure, and 3D printing.',

  // TODO(ben): confirm the handle — assumed from the wordmark, never verified.
  github: 'https://github.com/bblaker',
  email: 'bblaker@gmail.com',
} as const;

export interface Social {
  label: string;
  href: string;
  rel?: string;
}

export const socials: Social[] = [
  { label: 'GitHub', href: site.github, rel: 'me' },
  { label: 'Email', href: `mailto:${site.email}` },
];
